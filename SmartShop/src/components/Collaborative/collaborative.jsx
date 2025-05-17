import { useEffect, useContext } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";

const CollaborativeRecommendations = ({ setRec_prods }) => {
  const Context = useContext(MyContext);
  const userId = Context.user?.userId;

  useEffect(() => {
    if (!userId) return;

    fetch(`http://127.0.0.1:5000/recommend/collaborative/${userId}`)
      .then((res) => res.json())

      .then((data) => {
        const productIds = data.recommendedProducts || [];
        console.log("Products: ", productIds);
        return Promise.all(
          productIds.map((id) =>
            fetchDataFromApi(`/api/products/${id}`).catch((error) => {
              console.warn(`Product with ID: ${id} not found`, error);
              return null;
            })
          )
        );
      })
      .then((products) => setRec_prods(products.filter((p) => p !== null)))
      .catch((error) => console.error("Error fetching products:", error));
  }, [userId, setRec_prods]);

  return null; // This component now only fetches data, no rendering.
};

export default CollaborativeRecommendations;
