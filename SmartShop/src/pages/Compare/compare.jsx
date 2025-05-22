import React, { useEffect, useState } from "react";
import "./compare.css";

import { DynamicIcon } from "../../constants";
import { Product } from "../../components";
import { Rating, capitalize } from "@mui/material";
import Slider from "react-slick";
import { fetchDataFromApi } from "../../utils/api";
import LazyLoad from "react-lazyload";

const Compare = () => {
  const [selectedProductName, setSelectedProductName] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [products3, setProducts3] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  var related = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const Prods = await fetchDataFromApi(
          `/api/products/filter?search=${searchQuery}&limit=5`
        );

        const { products, total } = Prods;

        if (!products || products.length === 0) {
          setAllProducts([]);
          return;
        }
        setAllProducts(products);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.warn("API returned 404: Not Found.");
          setProducts([]);
        } else {
          console.error("Error fetching search results:", error);
        }
      }
    };
    fetchProducts();
  }, [searchQuery]);

  function slugify(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-"); // Replace spaces with dashes
  }

  useEffect(() => {
    const fetchSameNameProducts = async () => {
      if (!selectedProductName) return;

      const slug = slugify(selectedProductName);

      try {
        const res = await fetchDataFromApi(`/api/products/filter?slug=${slug}`);
        const { products } = res;

        // Filter to exact match name (optional if your backend already filters properly)
        const exactMatch = products.filter(
          (p) => p.name === selectedProductName
        );

        // Get one product per company
        const amazon = exactMatch.find((p) => p.company === "amazon");
        const flipkart = exactMatch.find((p) => p.company === "flipkart");
        const meesho = exactMatch.find((p) => p.company === "meesho");

        setProducts(amazon ? [amazon] : []);
        setProducts2(flipkart ? [flipkart] : []);
        setProducts3(meesho ? [meesho] : []);
      } catch (err) {
        console.error("Error fetching products by name:", err);
      }
    };

    fetchSameNameProducts();
  }, [selectedProductName]);

  const handleSelect = (product) => {
    setSelectedProductName(product.name);
    setSearchQuery("");
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const calculateScore = (product) => {
    if (!product) return 0;

    // Normalize values
    const ratingScore = product.ratings * 20; // Convert 5-star rating to 100 scale
    const reviewScore = Math.log(product.no_of_ratings + 1) * 10; // Log scale to prevent very high values
    const priceScore = (1 / (product.discount_price + 1)) * 10000; // Inverse so lower price is better

    return ratingScore + reviewScore + priceScore; // Total weighted score
  };

  const allProductsArray = [products[0], products2[0], products3[0]].filter(
    Boolean
  ); // Remove empty values
  const sortedProducts = allProductsArray
    .map((product) => ({ product, score: calculateScore(product) }))
    .sort((a, b) => b.score - a.score) // Sort in descending order
    .slice(0, 2); // Pick top 2

  return (
    <>
      <div className="compareWrapper">
        <div className="container-fluid">
          <h2 className="hd mb-0 mt-4">Compare</h2>
          <div className="searchSection w-100 pb-4">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Enter here..."
              className="searchBar pl-2"
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchQuery && (
              <div className="search-dropdown1">
                {allProducts.length !== 0 ? (
                  allProducts.map((product, index) => (
                    <div
                      key={index}
                      className="search-item"
                      onClick={() => handleSelect(product)}
                    >
                      {product.name} &nbsp;
                      <p>{capitalize(product.company)}</p>
                    </div>
                  ))
                ) : (
                  <div className="no-results">No results found</div>
                )}
              </div>
            )}
            <label className="btn-g">
              Search Item <DynamicIcon iconName="Search" />
            </label>
          </div>

          <div className="comparison-wrapper">
            {/* First Section */}
            <div className="comparison-section addition">
              <h2>VS</h2>
              <div className="column p-2 col-bar">
                <div className="row name">
                  <DynamicIcon iconName="Image" className="icon" /> IMAGE
                </div>
                <div className="row">
                  <DynamicIcon iconName="Edit" className="icon" /> NAME
                </div>
                <div className="row">
                  <DynamicIcon iconName="Stars" className="icon" /> RATING
                </div>
                <div className="row">
                  <DynamicIcon iconName="Person" className="icon" /> USERS
                </div>
                <div className="row">
                  <DynamicIcon iconName="Percent" className="icon" /> DISCOUNT
                </div>
                <div className="row">
                  <DynamicIcon iconName="LocalOffer" className="icon" /> PRICE
                </div>
                <div className="row">
                  <DynamicIcon iconName="LocalShipping" className="icon" />
                  DELIVERY WITHIN
                </div>
                <div className="row">
                  <DynamicIcon iconName="CheckBox" className="icon" />
                  Suggested by us
                </div>
              </div>
            </div>
            {/* Second Comparison Section */}
            <div className="comparison-section">
              <h2>AMAZON PRODUCT</h2>
              {products[0] ? (
                <div className="column">
                  <div className="row">
                    <LazyLoad>
                      <img src={products[0].images[0]} alt="product" />
                    </LazyLoad>
                  </div>
                  <div className="row space">{products[0].name}</div>
                  <div className="row space">
                    <Rating
                      name="half-rating-read"
                      value={
                        Math.round(parseFloat(products[0].ratings) * 2) / 2
                      }
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <div className="row space">
                    {products[0].no_of_ratings} reviews
                  </div>
                  <div className="row space">
                    {(
                      ((products[0].actual_price - products[0].discount_price) /
                        products[0].actual_price) *
                      100
                    ).toFixed(0)}
                    %
                  </div>
                  <div className="row space">
                    {products[0].discount_price} ₹
                  </div>
                  <div className="row space">{products[0].delivery} days</div>
                  <div className="row space">
                    {sortedProducts.some((p) => p.product === products[0]) ? (
                      <DynamicIcon iconName="Check" className="icon" />
                    ) : (
                      <DynamicIcon iconName="Close" className="icon" />
                    )}
                  </div>
                </div>
              ) : (
                <div className="imageBox">
                  <img src="https://stores.blackberrys.com/VendorpageTheme/Enterprise/EThemeForBlackberrys/images/product-not-found.jpg" />
                </div>
              )}
            </div>

            {/* Third Comparison Section */}
            <div className="comparison-section">
              <h2>FLIPKART PRODUCT</h2>
              {products2[0] ? (
                <div className="column">
                  <div className="row">
                    <LazyLoad>
                      <img src={products2[0].images[0]} alt="product" />
                    </LazyLoad>
                  </div>
                  <div className="row space">{products2[0].name}</div>
                  <div className="row space">
                    <Rating
                      name="half-rating-read"
                      value={
                        Math.round(parseFloat(products2[0].ratings) * 2) / 2
                      }
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <div className="row space">
                    {products2[0].no_of_ratings} reviews
                  </div>
                  <div className="row space">
                    {(
                      ((products2[0].actual_price -
                        products2[0].discount_price) /
                        products2[0].actual_price) *
                      100
                    ).toFixed(0)}
                    %
                  </div>
                  <div className="row space">
                    {products2[0].discount_price} ₹
                  </div>
                  <div className="row space">{products2[0].delivery} days</div>
                  <div className="row space">
                    {sortedProducts.some((p) => p.product === products2[0]) ? (
                      <DynamicIcon iconName="Check" className="icon" />
                    ) : (
                      <DynamicIcon iconName="Close" className="icon" />
                    )}
                  </div>
                </div>
              ) : (
                <div className="imageBox">
                  <img src="https://stores.blackberrys.com/VendorpageTheme/Enterprise/EThemeForBlackberrys/images/product-not-found.jpg" />
                </div>
              )}
            </div>
            {/* Fourth Comparison Section */}
            <div className="comparison-section">
              <h2>MEESHO PRODUCT</h2>
              {products3[0] ? (
                <div className="column">
                  <div className="row">
                    <LazyLoad>
                      <img src={products3[0].images[0]} alt="product" />
                    </LazyLoad>
                  </div>
                  <div className="row space">{products3[0].name}</div>
                  <div className="row space">
                    <Rating
                      name="half-rating-read"
                      value={
                        Math.round(parseFloat(products3[0].ratings) * 2) / 2
                      }
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <div className="row space">
                    {products3[0].no_of_ratings} reviews
                  </div>
                  <div className="row space">
                    {(
                      ((products3[0].actual_price -
                        products3[0].discount_price) /
                        products3[0].actual_price) *
                      100
                    ).toFixed(0)}
                    %
                  </div>
                  <div className="row space">
                    {products3[0].discount_price} ₹
                  </div>
                  <div className="row space">{products3[0].delivery} days</div>
                  <div className="row space">
                    {sortedProducts.some((p) => p.product === products3[0]) ? (
                      <DynamicIcon iconName="Check" className="icon" />
                    ) : (
                      <DynamicIcon iconName="Close" className="icon" />
                    )}
                  </div>
                </div>
              ) : (
                <div className="imageBox">
                  <img src="https://stores.blackberrys.com/VendorpageTheme/Enterprise/EThemeForBlackberrys/images/product-not-found.jpg" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="relatedProducts p-5 pb-4 ">
        <h2 className="hd mb-0 mt-0 ">Related Products</h2>
        <br />
        <Slider {...related} className="productSlider">
          {allProducts?.length !== 0 &&
            allProducts.map((prod, index) => (
              <div className="item" key={index}>
                <Product
                  image={prod.images[0]}
                  tag={prod.company}
                  name={prod.name}
                  ratings={prod.ratings}
                  actual_price={prod.actual_price}
                  discount_price={prod.discount_price}
                  className="prod-img"
                />
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
};

export default Compare;
