import React, { useEffect, useState } from "react";
import "./listing.css";

import { SideBar, Product } from "../../components";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import DynamicIcon from "../../constants/icons";
import { fetchDataFromApi } from "../../utils/api";

const Listing = () => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [isOpenDropDown2, setIsOpenDropDown2] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedValue, setSelectedValue] = useState(30);
  const [selection, setSelection] = useState("Featured");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const Prods = await fetchDataFromApi(
          `/api/products/filter?limit=${selectedValue}&selection=${selection}`
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
  }, [selectedValue, selection]);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpenDropDown(false);
  };
  const handleSelect2 = (value) => {
    setSelection(value);
    setIsOpenDropDown2(false);
  };

  return (
    <section className="listingPage">
      <div className="container-fluid">
        <div className="breadcrumb flex-column">
          <h1>Products</h1>
          <ul className="list list-inline mb-0">
            <li className="list-inline-item">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="list-inline-item">
              <Link to={""}>Shop</Link>
            </li>
            <li className="list-inline-item">
              <Link to={""}>Products</Link>
            </li>
          </ul>
        </div>

        <div className="listingData">
          <div className="row">
            <div className="col-md-3 sidebarWrapper">
              <SideBar />
            </div>

            <div className="col-md-9 rightContent homeProducts pt-0">
              <div className="topStrip d-flex align-items-center">
                <p className="mb-0">
                  We found <span className="text-success">29</span> items for
                  you !
                </p>
                <div className="ml-auto d-flex align-items-center">
                  <div className="tab_ position-relative">
                    <Button
                      className="btn_"
                      onClick={() => setIsOpenDropDown(!isOpenDropDown)}
                    >
                      <DynamicIcon iconName="GridView" />
                      Show: {selectedValue}
                    </Button>

                    {isOpenDropDown && (
                      <ul className="dropdownMenu">
                        <li className="lists">
                          {[30, 50, 80, 100].map((value) => (
                            <Button
                              key={value}
                              onClick={() => handleSelect(value)}
                            >
                              {value}
                            </Button>
                          ))}
                        </li>
                      </ul>
                    )}
                  </div>
                  <div className="tab_ position-relative">
                    <Button
                      className="btn_"
                      onClick={() => setIsOpenDropDown2(!isOpenDropDown2)}
                    >
                      <DynamicIcon iconName="GridView" />
                      Show: {selection}
                    </Button>

                    {isOpenDropDown2 && (
                      <ul className="dropdownMenu">
                        <li className="lists">
                          {[
                            "Featured",
                            "Low->High",
                            "High->Low",
                            "Popular",
                          ].map((value) => (
                            <Button
                              key={value}
                              onClick={() => handleSelect2(value)}
                            >
                              {value}
                            </Button>
                          ))}
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <div className="productRow pl-4 pr-3">
                {products.map((product, index) => (
                  <div className="item" key={index}>
                    <Product
                      tag={product.company}
                      image={product.images[0]}
                      name={product.name}
                      ratings={product.ratings}
                      actual_price={product.actual_price}
                      _id={product._id}
                      discount_price={product.discount_price}
                      className="prod-img"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Listing;
