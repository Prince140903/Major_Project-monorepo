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
  const Context = useContext(MyContext);
  const user = Context.user;
  const userId = user?.userId;

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
      {/* <Banners /> */}
      <section className="homeProducts">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <h2 className="hd mb-0 mt-0">Popular Products</h2>
            <ul className="list list-inline ml-auto filterTab mb-0">
              <li className="list list-inline-item">
                <a className="cursor">All</a>
              </li>
              <li className="list list-inline-item">
                <a className="cursor">Milks & Dairies</a>
              </li>
              <li className="list list-inline-item">
                <a className="cursor">Coffes & Teas</a>
              </li>
              <li className="list list-inline-item">
                <a className="cursor">Pet Foods</a>
              </li>
              <li className="list list-inline-item">
                <a className="cursor">Vegetable</a>
              </li>
              <li className="list list-inline-item">
                <a className="cursor">Fruits</a>
              </li>
            </ul>
          </div>

          <div className="productRow">
            {products.map((product, index) => (
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
          </div>
        </div>
      </section>
      <section className="homeProducts homeProductRow2 pt-0">
        <div className="container-fluid">
          <div className="d-flex align-items-center ml-auto">
            <h2 className="hd mb-0 mt-0">Daily Best Sells</h2>
            <Box sx={{ width: "100%" }}>
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
          <br />
          <br />
          <div className="row">
            <div className="col-md-3 pr-5 ">
              <img src={images.banner4} className="w-100" />
            </div>
            <div className="col-md-9">
              <h4>You May Like This</h4>
              <CollaborativeRecommendations setRec_prods={setRec_prods} />
              <Slider {...settings} className="productSlider">
                {rec_prods?.map((product) => (
                  <div key={product._id} className="item">
                    <Product
                      tag={product.company}
                      image={product.images?.[0]}
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
          <br /> <br />
          <div className="row">
            <div className="col-md-3 pr-5 ">
              <img src={images.banner4} className="w-100" />
            </div>

            <div className="col-md-9">
              <h4>Recommended Products</h4>
              <ContentBasedRecommendations setContent={setContent} />
              <Slider {...settings} className="productSlider">
                {content?.map((product) => (
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
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
      <section className="newsLetterSection">
        <div className="container-fluid ">
          <div className="box d-flex align-items-center">
            <div className="info">
              <h2>Stay Home & get your daily needs from our shop</h2>
              <p>Start your Daily Shopping With Nest Mart</p>
              <br /> <br />
              <Newsletter />
            </div>
            <div className="img">
              <img src={images.banner9} className="w-100" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
