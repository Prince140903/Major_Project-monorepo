import React, { useEffect, useState } from "react";
import "./compare.css";

import { DynamicIcon } from "../../constants";
import { FormControl, Select, MenuItem, Rating } from "@mui/material";
import Slider from "react-slick";
import { fetchDataFromApi } from "../../utils/api";
import LazyLoad from "react-lazyload";

const Compare = () => {
  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [limit, setLimit] = useState(10);
  const [company, setCompany] = useState("All");
  const [searchQuery, setSearchQuery] = useState("OnePlus");
  const [selection, setSelection] = useState("Featured");
  const [activePoduct1, setActiveProduct1] = useState(0);
  const [activePoduct2, setActiveProduct2] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const Prods = await fetchDataFromApi(
          `/api/products/filter?search=${searchQuery}&company=amazon&limit=5&selection=${selection}`
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
  }, [searchQuery, selection]);

  useEffect(() => {
    const fetchProducts2 = async () => {
      try {
        const Prods = await fetchDataFromApi(
          `/api/products/filter?search=${searchQuery}&company=flipkart&limit=5&selection=${selection}`
        );

        const { products, total } = Prods;

        if (!products || products.length === 0) {
          setProducts2([]);
          return;
        }

        setProducts2(products);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.warn("API returned 404: Not Found.");
          setProducts2([]);
        } else {
          console.error("Error fetching search results:", error);
        }
      }
    };
    fetchProducts2();
  }, [searchQuery, selection]);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };

  const productSlider1 = (index) => {
    setActiveProduct1(index);
  };
  const productSlider2 = (index) => {
    setActiveProduct2(index);
  };

  const handleSelection = (event) => {
    setSelection(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    // setPage(1);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    // setPage(1);
  };
  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
    // setPage(1);
  };

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
            <label className="btn-g">
              Search Item <DynamicIcon iconName="Search" />
            </label>
          </div>

          {/* <div className="filterSection">
            <div className="container-fluid">
              <div className="row w-100">
                <div className="col">
                  <h4>Sort By</h4>
                  <FormControl size="small" className="w-100">
                    <Select
                      labelId="select1-label"
                      id="select1"
                      value={limit}
                      onChange={handleLimitChange}
                      className="w-100 drop"
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col">
                  <h4>Select Company</h4>
                  <FormControl size="small" className="w-100">
                    <Select
                      labelId="select2-label"
                      id="select2"
                      value={company}
                      onChange={handleCompanyChange}
                      className="w-100 drop"
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="amazon">Amazon</MenuItem>
                      <MenuItem value="flipkart">Flipkart</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col">
                  <h4>Sort by</h4>
                  <FormControl size="small" className="w-100">
                    <Select
                      labelId="select3-label"
                      id="select3"
                      value={selection}
                      onChange={handleSelection}
                      className="w-100  drop"
                    >
                      <MenuItem value="Featured">Featured</MenuItem>
                      <MenuItem value="Low->High">Price: Low to High</MenuItem>
                      <MenuItem value="High->Low">Price: High to Low</MenuItem>
                      <MenuItem value="Popular">Popular</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </div> */}

          <div className="comparison-wrapper">
            {/* First Comparison Section */}
            <div className="comparison-section">
              <h2>AMAZON PRODUCT</h2>
              {products[activePoduct1] && (
                <div className="column">
                  <div className="row">
                    <LazyLoad>
                      <img
                        src={products[activePoduct1].images[0]}
                        alt="product"
                      />
                    </LazyLoad>
                  </div>
                  <div className="row space">
                    {products[activePoduct1].name}
                  </div>
                  <div className="row space">
                    <Rating
                      name="half-rating-read"
                      value={
                        Math.round(
                          parseFloat(products[activePoduct1].ratings) * 2
                        ) / 2
                      }
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <div className="row space">
                    {products[activePoduct1].no_of_ratings} reviews
                  </div>
                  <div className="row space">
                    {(
                      ((products[activePoduct1].actual_price -
                        products[activePoduct1].discount_price) /
                        products[activePoduct1].actual_price) *
                      100
                    ).toFixed(0)}
                    %
                  </div>
                  <div className="row space">
                    {products[activePoduct1].discount_price} ₹
                  </div>
                  <div className="row space">
                    {products[activePoduct1].delivery} days
                  </div>
                </div>
              )}
            </div>
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
              </div>
            </div>
            {/* Second Comparison Section */}
            <div className="comparison-section">
              <h2>FLIPKART PRODUCT</h2>
              {products2[activePoduct2] && (
                <div className="column">
                  <div className="row">
                    <LazyLoad>
                      <img
                        src={products2[activePoduct2].images[0]}
                        alt="product"
                      />
                    </LazyLoad>
                  </div>
                  <div className="row space">
                    {products2[activePoduct2].name}
                  </div>
                  <div className="row space">
                    <Rating
                      name="half-rating-read"
                      value={
                        Math.round(
                          parseFloat(products2[activePoduct2].ratings) * 2
                        ) / 2
                      }
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <div className="row space">
                    {products2[activePoduct2].no_of_ratings} reviews
                  </div>
                  <div className="row space">
                    {(
                      ((products2[activePoduct2].actual_price -
                        products2[activePoduct2].discount_price) /
                        products2[activePoduct2].actual_price) *
                      100
                    ).toFixed(0)}
                    %
                  </div>
                  <div className="row space">
                    {products2[activePoduct2].discount_price} ₹
                  </div>
                  <div className="row space">
                    {products2[activePoduct2].delivery} days
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Compare;