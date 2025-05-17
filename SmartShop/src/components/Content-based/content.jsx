import { useEffect, useContext } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";

const ContentBasedRecommendations = ({ setContent }) => {
  const Context = useContext(MyContext);
  const userId = Context.user?.userId;

  useEffect(() => {
    if (!userId) return;

    fetch(`http://127.0.0.1:5000/recommend/content/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const productIds = data.recommendedProducts || [];
        return Promise.all(
          productIds.map((id) => fetchDataFromApi(`/api/products/${id}`))
        );
      })
      .then((products) => setContent(products.filter((p) => p !== null)))
      .catch((error) => console.error("Error fetching products:", error));
  }, [userId, setContent]);

  return null;
};

export default ContentBasedRecommendations;
