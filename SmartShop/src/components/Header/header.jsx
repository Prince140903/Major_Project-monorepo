import React, { useEffect, useState, useRef } from "react";
import "./header.css";
import DynamicIcon from "../../constants/icons.jsx";
import images from "../../constants/images.js";
import { Select } from "../../components";
import Button from "@mui/material/Button";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";

import Nav from "./nav/nav.jsx";

const Header = () => {
  const [isOpenDropDown, setisOpenDropDown] = useState(false);

  const headerRef = useRef();

  const [categories, setcategories] = useState([
    "Milks & Dairies",
    "Wines & Drinks",
    "Clothing & Beauty",
    "Fresh Seafood",
    "Petfoods & toys",
    "Fast Food",
    "Baking Material",
    "Fruits & Vegetables",
    "Bread & Juice",
  ]);

  const stateList = [
    "Andhra Pradesh",
    "Arunalchal Pradesh",
    "Assam",
    "Bihar",
    "Chattishgarh",
    "Goa",
    "Gujrat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerla",
    "Madhya Pradesh",
    "Maharastra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
  ];

  useEffect(() => {
    window.addEventListener("scroll", () => {
      let position = window.pageYOffset;
      if (position > 100) {
        headerRef.current.classList.add("fixed");
      } else {
        headerRef.current.classList.remove("fixed");
      }
    });
  }, []);

  return (
    <>
      <div className="headerWrapper" ref={headerRef}>
        <header>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-2">
                <img src={images.Logo} alt="logo" className="Logo" />
              </div>

              <div className="col-sm-5">
                <div className="headerSearch d-flex align-items-center">
                  <Select
                    data={categories}
                    placeholder={"All Categories"}
                    icon={false}
                  />
                  <div className="search">
                    <input type="text" placeholder="Search for items..." />
                    <DynamicIcon
                      iconName="Search"
                      className="searchIcon cursor"
                    />
                  </div>
                </div>
              </div>

              <div className="col-sm-5 d-flex align-items-center position-relative poki">
                <div className="ml-auto d-flex align-items-center">
                  <div className="stateWrapper">
                    <Select
                      data={stateList}
                      placeholder={"Your Location"}
                      icon={
                        <DynamicIcon
                          iconName="LocationOnOutlined"
                          className="Icon"
                        />
                      }
                    />
                  </div>
                  <ClickAwayListener
                    onClickAway={() => setisOpenDropDown(false)}
                  >
                    <ul className="list list-inline mb-0 headerTabs">
                      <li className="list-inline-item">
                        <span>
                          <DynamicIcon
                            iconName="LoopOutlined"
                            className="Icon"
                          />
                          Compare
                        </span>
                      </li>
                      <li className="list-inline-item">
                        <span>
                          <DynamicIcon
                            iconName="FavoriteBorder"
                            className="Icon"
                          />
                          Wishlist
                        </span>
                      </li>
                      <li className="list-inline-item">
                        <span>
                          <DynamicIcon
                            iconName="ShoppingCartOutlined"
                            className="Icon"
                          />
                          Cart
                        </span>
                      </li>
                      <li className="list-inline-item">
                        <span
                          onClick={() => setisOpenDropDown(!isOpenDropDown)}
                        >
                          <DynamicIcon
                            iconName="PersonOutlined"
                            className="Icon"
                          />
                          Account
                        </span>

                        {isOpenDropDown !== false && (
                          <ul className="dropdownMenu">
                            <li className="lists">
                              <Button>
                                <DynamicIcon
                                  iconName="PersonOutlined"
                                  className="Icon"
                                />
                                My Account
                              </Button>
                            </li>
                            <li>
                              <Button>
                                <DynamicIcon
                                  iconName="LocationOnOutlined"
                                  className="Icon"
                                />
                                Order Tracking
                              </Button>
                            </li>
                            <li>
                              <Button>
                                <DynamicIcon
                                  iconName="ShoppingCartOutlined"
                                  className="Icon"
                                />
                                My Orders
                              </Button>
                            </li>
                            <li>
                              <Button>
                                <DynamicIcon
                                  iconName="TuneOutlined"
                                  className="Icon"
                                />
                                Setting
                              </Button>
                            </li>
                            <li>
                              <Button>
                                <DynamicIcon
                                  iconName="LogoutOutlined"
                                  className="Icon"
                                />
                                Sign Out
                              </Button>
                            </li>
                          </ul>
                        )}
                      </li>
                    </ul>
                  </ClickAwayListener>
                </div>
              </div>
            </div>
          </div>
        </header>
        <Nav />
      </div>
    </>
  );
};

export default Header;
