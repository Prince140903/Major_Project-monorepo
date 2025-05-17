from flask import Flask, jsonify
from flask_cors import CORS  # Allows frontend to access backend
from pymongo import MongoClient
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from surprise import SVD, Dataset, Reader

app = Flask(__name__)
CORS(app)  # Enable CORS

# Connect to MongoDB
client = MongoClient("mongodb+srv://aadityarevandkar:Reliance$321@cluster0.239em.mongodb.net/Amazon_Data?retryWrites=true&w=majority&appName=Cluster0")
db = client["Amazon_Data"]
interactions_collection = db["userinteractions"]
products_collection = db["All Products"]

# Load user interactions
def fetch_interactions():
    data = list(interactions_collection.find({}, {"userId": 1, "productId": 1, "eventType": 1, "_id": 0}))
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

# Function to recommend products for a user (Collaborative Filtering)
def recommend_collaborative(user_id, num_recommendations=5):
    unique_products = df_interactions["productId"].unique()
    predictions = [(product, model.predict(user_id, product).est) for product in unique_products]
    predictions.sort(key=lambda x: x[1], reverse=True)
    return [product for product, _ in predictions[:num_recommendations]]

# Load product data
def fetch_products():
    products = list(products_collection.find({}, {"productId": 1, "category": 1, "brand": 1, "description": 1, "_id": 0}))
    return pd.DataFrame(products)

df_products = fetch_products()
df_products["features"] = df_products["category"] + " " + df_products["brand"] + " " + df_products["description"]
vectorizer = TfidfVectorizer(stop_words="english")
tfidf_matrix = vectorizer.fit_transform(df_products["features"])
cosine_sim = cosine_similarity(tfidf_matrix)

# Function to recommend products based on content (Content-Based Filtering)
def recommend_content(user_id, num_recommendations=5):
    user_interactions = list(interactions_collection.find({"userId": user_id}, {"productId": 1, "_id": 0}))
    if not user_interactions:
        return []
    interacted_products = [entry["productId"] for entry in user_interactions]
    recommendations = set()
    for product in interacted_products:
        if product in df_products["productId"].values:
            idx = df_products[df_products["productId"] == product].index[0]
            sim_scores = list(enumerate(cosine_sim[idx]))
            sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
            top_indices = [i[0] for i in sim_scores[1:num_recommendations + 1]]
            recommendations.update(df_products.iloc[top_indices]["productId"].tolist())
    return list(recommendations)[:num_recommendations]

# API routes
@app.route("/recommend/collaborative/<user_id>", methods=["GET"])
def collaborative_recommend(user_id):
    return jsonify({"userId": user_id, "recommendedProducts": recommend_collaborative(user_id)})

@app.route("/recommend/content/<user_id>", methods=["GET"])
def content_recommend(user_id):
    return jsonify({"userId": user_id, "recommendedProducts": recommend_content(user_id)})

if __name__ == "__main__":
    app.run(debug=True)
