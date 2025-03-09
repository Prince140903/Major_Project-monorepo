import React, { useEffect, useContext, useState, useRef } from "react";
import "./header.css";
import { DynamicIcon, images } from "../../constants";
import { Select } from "../../components";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { Link, useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api.js";
import { MyContext } from "../../App.jsx";
import Nav from "./nav/nav.jsx";
import { Button, capitalize } from "@mui/material";

const Header = () => {
  const [isOpenDropDown, setisOpenDropDown] = useState(false);

  const headerRef = useRef();

  const [categories, setcategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const Context = useContext(MyContext);
  const navigate = useNavigate();

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
    const fetchProducts = async () => {
      try {
        const Prods = await fetchDataFromApi(
          `/api/products/filter?search=${searchQuery}&limit=5`
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
  }, [searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelect = () => {
    setSearchQuery("");
  };

  const logout = () => {
    setisOpenDropDown(false);

    Context.setIsLogin(false);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/auth/signin");
  };

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
                    <input
                      type="text"
                      placeholder="Search for items..."
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                    <DynamicIcon
                      iconName="Search"
                      className="searchIcon cursor"
                    />
                    {searchQuery && (
                      <div className="search-dropdown">
                        {products.length > 0 ? (
                          products.map((product, index) => (
                            <div key={index} className="search-item">
                              <Link
                                to={`/products/${product._id}`}
                                className="link"
                                onClick={handleSelect}
                              >
                                {product.name} &nbsp;
                              </Link>
                              <p>{capitalize(product.company)}</p>
                            </div>
                          ))
                        ) : (
                          <div className="no-results">No results found</div>
                        )}
                      </div>
                    )}
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
                        <Link to="/compare">
                          <Button>
                            <span>
                              <DynamicIcon
                                iconName="LoopOutlined"
                                className="Icon"
                              />
                              Compare
                            </span>
                          </Button>
                        </Link>
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
                        <Link to={"/cart"}>
                          <Button>
                            <span>
                              <DynamicIcon
                                iconName="ShoppingCartOutlined"
                                className="Icon"
                              />
                              Cart
                            </span>
                          </Button>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        {Context.isLogin !== true ? (
                          <div className="btn">
                            <Link to="/auth/signin">
                              <Button className="login-btn">Login</Button>
                            </Link>
                          </div>
                        ) : (
                          <Button
                            onClick={() => setisOpenDropDown(!isOpenDropDown)}
                          >
                            {Context.user?.image !== "" ? (
                              <img
                                src={Context.user.image}
                                alt="userImage"
                                className="userImage"
                              />
                            ) : (
                              <DynamicIcon
                                iconName="PersonOutlined"
                                className="Icon"
                              />
                            )}
                            {Context.user.name}
                          </Button>
                        )}
                        {/*  */}

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
                              <Button onClick={() => logout()}>
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
