import React, { useState } from "react";
import "./listing.css";

import { SideBar, Product } from "../../components";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import DynamicIcon from "../../constants/icons";

const Listing = () => {
  const [isOpenDropDown, setisOpenDropDown] = useState(false);
  const [isOpenDropDown2, setisOpenDropDown2] = useState(false);

  return (
    <section className="listingPage">
      <div className="container-fluid">
        <div className="breadcrumb flex-column">
          <h1>Snack</h1>
          <ul className="list list-inline mb-0">
            <li className="list-inline-item">
              <Link to={""}>Home</Link>
            </li>
            <li className="list-inline-item">
              <Link to={""}>Shop</Link>
            </li>
            <li className="list-inline-item">
              <Link to={""}>Snack</Link>
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
                      onClick={() => setisOpenDropDown(!isOpenDropDown)}
                    >
                      <DynamicIcon iconName="GridView" />
                      Show: 50
                    </Button>
                    {isOpenDropDown !== false && (
                      <ul className="dropdownMenu">
                        <li className="lists">
                          <Button onClick={() => setisOpenDropDown(false)}>
                            100
                          </Button>
                          <Button onClick={() => setisOpenDropDown(false)}>
                            150
                          </Button>
                          <Button onClick={() => setisOpenDropDown(false)}>
                            200
                          </Button>
                          <Button onClick={() => setisOpenDropDown(false)}>
                            All
                          </Button>
                        </li>
                      </ul>
                    )}
                  </div>
                  <div className="tab_ ml-3  position-relative">
                    <Button
                      className="btn_"
                      onClick={() => setisOpenDropDown2(!isOpenDropDown2)}
                    >
                      <DynamicIcon iconName="FilterList" />
                      Show: Featured
                    </Button>
                    {isOpenDropDown2 !== false && (
                      <ul className="dropdownMenu">
                        <li className="lists">
                          <Button onClick={() => setisOpenDropDown2(false)}>
                            Featured
                          </Button>
                          <Button onClick={() => setisOpenDropDown2(false)}>
                            Price: Low to High
                          </Button>
                          <Button onClick={() => setisOpenDropDown2(false)}>
                            Price: High to Low
                          </Button>
                          <Button onClick={() => setisOpenDropDown2(false)}>
                            Ratings
                          </Button>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <div className="productRow pl-4 pr-3">
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
                <div className="item">
                  <Product />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Listing;
