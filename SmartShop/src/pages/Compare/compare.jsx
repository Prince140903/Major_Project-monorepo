import React, { useEffect, useState } from "react";
import "./compare.css";

import { DynamicIcon } from "../../constants";
import { FormControl, Select, MenuItem } from "@mui/material";
import Slider from "react-slick";
import { Product } from "../../components";
import { fetchDataFromApi } from "../../utils/api";

const Compare = () => {
  const [products1, setProducts1] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [limit, setLimit] = useState(10);
  const [company, setCompany] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selection, setSelection] = useState("Featured");
  const [activePoduct, setActiveProduct] = useState(1);

  useEffect(() => {
    const fetchProducts1 = async () => {
      try {
        const Prods = await fetchDataFromApi(
          `/api/products/filter?search=${searchQuery}&company=Amazon`
        );

        const { products, total } = Prods;

        if (!products || products.length === 0) {
          setProducts1([]);
          return;
        }

        setProducts1(products);
        console.log("Amazon Products: ", products1);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.warn("API returned 404: Not Found.");
          setProducts1([]);
        } else {
          console.error("Error fetching search results:", error);
        }
      }
    };
    fetchProducts1();
  }, [searchQuery]);

  useEffect(() => {
    console.log("Amazon Products Updated: ", products1);
  }, [products1]);

  useEffect(() => {
    const fetchProducts2 = async () => {
      try {
        const Prods = await fetchDataFromApi(
          `/api/products/filter?search=${searchQuery}&company=Flipkart`
        );

        const { products, total } = Prods;

        if (!products || products.length === 0) {
          setProducts2([]);
          return;
        }

        console.log("Products: ", products);
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
  }, [searchQuery]);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };

  const productSlider = (index) => {
    setActiveProduct(index);
  };

  const handleSelection = (event) => {
    setSelection(event.target.value);
    // setPage(1);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    // setPage(1);
  };

  //   const handlePageChange = (event, value) => {
  //     setPage(value);
  //   };

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
          <div className="searchSection w-100">
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

          <div className="filterSection">
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
                      <MenuItem value="Amazon">Amazon</MenuItem>
                      <MenuItem value="Flipkart">Flipkart</MenuItem>
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
          </div>

          <div className="productCompare mt-4">
            <div className="row">
              <div className="col-custom ProductWrapper">
                {products1.length !== 0 ? (
                  <div>
                    {console.log("Product1: ", products1)}
                    {products1.map((product) => (
                      <div className="productTab">
                        <div className="displayProduct">
                          <div className="item">
                            {activePoduct ? (
                              <Product
                                // tag={product[activePoduct].company}
                                tag="Product"
                                image={product[activePoduct].images[0]}
                                name={product[activePoduct].name}
                                ratings={product[activePoduct].ratings}
                                actual_price={
                                  product[activePoduct].actual_price
                                }
                                discount_price={
                                  product[activePoduct].discount_price
                                }
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="ProductsSlider">
                          <Slider {...settings} className="mb-2">
                            <div
                              className="item"
                              onClick={() => productSlider(index)}
                            >
                              <Product
                                // tag={product.company}
                                tag="Amazon Products"
                                image={product.images[0]}
                                name={product.name}
                                ratings={product.ratings}
                                actual_price={product.actual_price}
                                discount_price={product.discount_price}
                              />
                            </div>
                          </Slider>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="products">
                    <h2>Search for Results</h2>
                  </div>
                )}
              </div>
              <div className="col-small d-flex justify-content-center">
                <div className="line">
                  <div className="imgWrap">
                    <img
                      src="https://i.ibb.co/7JThv01j/Compare.jpg"
                      alt="compare"
                    />
                  </div>
                </div>
              </div>
              <div className="col-custom ProductWrapper">
                {products2.length !== 0 ? (
                  <div>
                    {/* {console.log("Product2: ", products2)} */}
                    {products2.map((product) => (
                      <div className="productTab">
                        <div className="displayProduct">
                          <div className="item">
                            {activePoduct ? (
                              <Product
                                // tag={product[activePoduct].company}
                                tag="Product"
                                image={product[activePoduct].images[0]}
                                name={product[activePoduct].name}
                                ratings={product[activePoduct].ratings}
                                actual_price={
                                  product[activePoduct].actual_price
                                }
                                discount_price={
                                  product[activePoduct].discount_price
                                }
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="ProductsSlider">
                          <Slider {...settings} className="mb-2">
                            <div
                              className="item"
                              onClick={() => productSlider(index)}
                            >
                              <Product
                                tag="Flipkart Products"
                                image={product.images[0]}
                                name={product.name}
                                ratings={product.ratings}
                                actual_price={product.actual_price}
                                discount_price={product.discount_price}
                              />
                            </div>
                          </Slider>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="products">
                    <h2>Search for Results</h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Compare;
