from flask import Flask, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from pymongo import MongoClient
import pandas as pd
from surprise import SVD, Dataset, Reader
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)

load_dotenv()

Mongo_URL = os.getenv("CONNECTION_STRING")

# Connect to MongoDB
client = MongoClient(Mongo_URL)
db = client["Amazon_Data"]
interactions_collection = db["userinteractions"]
products_collection = db["All Products"]

def fetch_interactions():
    data = list(interactions_collection.find({}, {"userId": 1, "productId": 1, "eventType": 1, "_id": 0}))
    for entry in data:
        entry["productId"] = str(entry["productId"])  # Convert ObjectId to string
    df = pd.DataFrame(data)
    rating_map = {"view": 1, "cart": 3, "wishlist": 5}
    df["rating"] = df["eventType"].map(rating_map)
    return df[["userId", "productId", "rating"]]

df_interactions = fetch_interactions()

# Train SVD Model (User-Based Filtering)
reader = Reader(rating_scale=(1, 5))
dataset = Dataset.load_from_df(df_interactions[["userId", "productId", "rating"]], reader)
trainset = dataset.build_full_trainset()
model = SVD()
model.fit(trainset)

# Identify the most popular products (based on interaction count)
popular_products = (
    df_interactions["productId"].value_counts().index.tolist()[:10]
)  # Top 10 popular products

# Function to recommend products for a user (Collaborative Filtering)
def recommend_collaborative(user_id, num_recommendations=5):
    if user_id not in df_interactions["userId"].unique():
        return popular_products[:num_recommendations]  # If no history, return popular products

    unique_products = df_interactions["productId"].unique()

    predictions = [
        (product, model.predict(user_id, product).est)
        for product in unique_products
    ]

    predictions.sort(key=lambda x: x[1], reverse=True)
    recommended = [product for product, _ in predictions[:num_recommendations]]

    # Ensure at least 5 recommendations
    while len(recommended) < num_recommendations:
        for pop_product in popular_products:
            if pop_product not in recommended:
                recommended.append(pop_product)
            if len(recommended) >= num_recommendations:
                break

    return recommended


# Load product data
def fetch_products():
    products = list(products_collection.find({}, {"_id": 1, "name": 1, "main_category": 1, "sub_category": 1, "company": 1, "description": 1, "tags": 1}))
    for product in products:
        product["_id"] = str(product["_id"])  # Convert ObjectId to string
    return pd.DataFrame(products)

df_products = fetch_products()
df_products.fillna("", inplace=True)

df_products["features"] = (
    df_products["main_category"].astype(str) + " " +
    df_products["sub_category"].astype(str) + " " +
    df_products["company"].astype(str) + " " +
    df_products["description"].astype(str) + " " +
    df_products["tags"].apply(lambda x: " ".join(x) if isinstance(x, list) else str(x))
)

vectorizer = TfidfVectorizer(stop_words="english")
tfidf_matrix = vectorizer.fit_transform(df_products["features"])
cosine_sim = cosine_similarity(tfidf_matrix)

# Function to recommend products based on content (Content-Based Filtering)
def recommend_content(user_id, num_recommendations=5):
    user_interactions = list(interactions_collection.find({"userId": user_id}, {"productId": 1, "_id": 0}))
    if not user_interactions:
        return popular_products[:num_recommendations]  # If no history, return popular products
    
    interacted_products = [entry["productId"] for entry in user_interactions]
    recommendations = set()

    for product in interacted_products:
        if product in df_products["_id"].values:
            idx = df_products[df_products["_id"] == product].index[0]
            sim_scores = list(enumerate(cosine_sim[idx]))
            sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
            top_indices = [i[0] for i in sim_scores[1:num_recommendations + 1]]
            recommendations.update(df_products.iloc[top_indices]["_id"].tolist())

    recommended = list(recommendations)[:num_recommendations]

    # Ensure at least 5 recommendations
    while len(recommended) < num_recommendations:
        for pop_product in popular_products:
            if pop_product not in recommended:
                recommended.append(pop_product)
            if len(recommended) >= num_recommendations:
                break

    return recommended

# API routes
@app.route("/recommend/collaborative/<user_id>/", methods=["GET"])
def collaborative_recommend(user_id):
    return jsonify({"userId": user_id, "recommendedProducts": recommend_collaborative(user_id)})

@app.route("/recommend/content/<user_id>/", methods=["GET"])
def content_recommend(user_id):
    return jsonify({"userId": user_id, "recommendedProducts": recommend_content(user_id)})

if __name__ == "__main__":
    app.run(debug=True)
