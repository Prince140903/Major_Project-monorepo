import React, { useEffect, useState, useContext } from "react";
import "./home.css";
import HomeSliderBanner from "./Slider/slider.jsx";
import {
  CatSlider,
  Newsletter,
  Product,
  CollaborativeRecommendations,
  ContentBasedRecommendations,
} from "../../components";
import { images } from "../../constants";
import Slider from "react-slick";
import { MyContext } from "../../App.jsx";

import { Tab, Tabs, Box } from "@mui/material";
import { fetchDataFromApi } from "../../utils/api.js";

const Home = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
  };

  const [products, setProducts] = useState([]);
  const [rec_prods, setRec_prods] = useState([]);
  const [content, setContent] = useState([]);
  const [selection, setSelection] = useState("Featured");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const Prods = await fetchDataFromApi(
          `/api/products/filter?selection=Popular`
        );

        const { products, total } = Prods;

        if (!products || products.length === 0) {
          setProducts([]);
          return;
        }

        setProducts(products);
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
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const Prods = await fetchDataFromApi(
          `/api/products/filter?selection=${selection}`
        );

        const { products, total } = Prods;

        if (!products || products.length === 0) {
          setProducts([]);
          return;
        }

        setProducts(products);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.warn("API returned 404: Not Found.");
          setProducts([]);
        } else {
          console.error("Error fetching search results:", error);
        }
      }
    };
    fetchFilteredProducts();
  }, [selection]);

  const handleSelection = (event) => {
    setSelection(event.target.value);
  };

  return (
    <>
      <HomeSliderBanner />
      <CatSlider />

      <section className="homeProducts">
        <div className="container-fluid">
          <div className="d-flex flex-wrap align-items-center">
            <h2 className="hd mb-0 mt-0">Popular Products</h2>
            <ul className="list-inline ml-auto mb-0 flex-wrap">
              {[
                "All",
                "Milks & Dairies",
                "Coffees & Teas",
                "Pet Foods",
                "Vegetables",
                "Fruits",
              ].map((category, index) => (
                <li className="list-inline-item" key={index}>
                  <a className="cursor">{category}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="row">
            {products.map((product, index) => (
              <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
                <Product
                  tag={product.company}
                  image={product.images[0]}
                  name={product.name}
                  ratings={product.ratings}
                  actual_price={product.actual_price}
                  discount_price={product.discount_price}
                  _id={product._id}
                  className="prod-img"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="homeProducts homeProductRow2 pt-0">
        <div className="container-fluid">
          <div className="d-flex flex-wrap align-items-center">
            <h2 className="hd mb-0 mt-0">Daily Best Sells</h2>
            <Box sx={{ width: "100%" }} className="mt-3">
              <Tabs
                value={selection}
                onChange={handleSelection}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
              >
                <Tab value="Featured" label="Featured" />
                <Tab value="Popular" label="Popular" />
                <Tab value="Low->High" label="Price: Low to High" />
                <Tab value="High->Low" label="Price: High to Low" />
              </Tabs>
            </Box>
          </div>

          <div className="row mt-4">
            <div className="col-12 col-md-3 mb-4">
              <img src={images.banner4} className="img-fluid" alt="Banner" />
            </div>
            <div className="col-12 col-md-9">
              <h4>You May Like This</h4>
              <CollaborativeRecommendations setRec_prods={setRec_prods} />
              <Slider {...settings} className="productSlider">
                {rec_prods.length >= 5
                  ? rec_prods.map((product) => (
                      <div key={product._id} className="item">
                        <Product
                          tag={product.company}
                          image={product.images[0]}
                          name={product.name}
                          ratings={product.ratings}
                          actual_price={product.actual_price}
                          discount_price={product.discount_price}
                          _id={product._id}
                          className="prod-img"
                        />
                      </div>
                    ))
                  : products.slice(0, 5).map((product, index) => (
                      <div className="item" key={index}>
                        <Product
                          tag={product.company}
                          image={product.images[0]}
                          name={product.name}
                          ratings={product.ratings}
                          actual_price={product.actual_price}
                          discount_price={product.discount_price}
                          _id={product._id}
                          className="prod-img"
                        />
                      </div>
                    ))}
              </Slider>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12 col-md-3 mb-4">
              <img src={images.banner4} className="img-fluid" alt="Banner" />
            </div>
            <div className="col-12 col-md-9">
              <h4>Recommended Products</h4>
              <ContentBasedRecommendations setContent={setContent} />
              <Slider {...settings} className="productSlider">
                {content.length >= 5
                  ? content.map((product) => (
                      <div key={product._id} className="item">
                        <Product
                          tag={product.company}
                          image={product.images[0]}
                          name={product.name}
                          ratings={product.ratings}
                          actual_price={product.actual_price}
                          discount_price={product.discount_price}
                          _id={product._id}
                          className="prod-img"
                        />
                      </div>
                    ))
                  : products.slice(5, 10).map((product, index) => (
                      <div className="item" key={index}>
                        <Product
                          tag={product.company}
                          image={product.images[0]}
                          name={product.name}
                          ratings={product.ratings}
                          actual_price={product.actual_price}
                          discount_price={product.discount_price}
                          _id={product._id}
                          className="prod-img"
                        />
                      </div>
                    ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
