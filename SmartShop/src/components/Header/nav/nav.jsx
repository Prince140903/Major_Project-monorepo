import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import KeybordArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GridViewIcon from "@mui/icons-material/GridView";
import HeadphonesIcon from "@mui/icons-material/Headphones";

const Nav = () => {
  return (
    <div className="nav d-flex align-items-center">
      <div className="container-fluid">
        <div className="row position-relative">
          <div className="col-sm-2 part1 d-flex align-items-center ">
            <Button className="btn-g text-white catTab">
              <GridViewIcon /> &nbsp;Browse All Categories{" "}
              <KeybordArrowDownIcon />
            </Button>
          </div>

          <div className="col-sm-8 part2 position-static ">
            <nav>
              <ul className="list list-inline mb-0">
                <li className="list-inline-item">
                  <Button>
                    <Link>Home</Link>
                  </Button>
                </li>

                <li className="list-inline-item">
                  <Button>
                    <Link>About</Link>
                  </Button>
                </li>
                <li className="list-inline-item">
                  <Button>
                    <Link>Shop</Link>
                  </Button>
                </li>

                <li className="list-inline-item">
                  <Button>
                    <Link>Vendors</Link>
                  </Button>
                  <div className="dropdown_menu mb-0">
                    <ul>
                      <li>
                        <Button>
                          <Link to="/about">About us</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/about">Contact</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/about">My Account</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/about">Login</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/about">Register</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/about">Forgot Password</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/about">Reset Password</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/about">Purchase Guide</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/about">Privacy Policy</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/about">Terms of service</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/about">404 Page</Link>
                        </Button>
                      </li>
                      <></>
                    </ul>
                  </div>
                </li>

                <li className="list-inline-item position-static">
                  <Button>
                    <Link>
                      Mega menu
                      <KeybordArrowDownIcon />
                    </Link>
                  </Button>
                  <div className="dropdown_menu megaMenu w-100">
                    <div className="row">
                      <div className="col">
                        <h4 className="text-g">Fruit & vegetables</h4>
                        <ul className="mt-4 mb-0">
                          <li>
                            <Link to="">Meat & Poultry</Link>
                          </li>
                          <li>
                            <Link to="">Fresh vegetables</Link>
                          </li>
                          <li>
                            <Link to="">Herbs & Seasoning</Link>
                          </li>
                          <li>
                            <Link to="">cuts & Sprouts</Link>
                          </li>
                          <li>
                            <Link to="">Exotic Fruits & Veggies</Link>
                          </li>
                          <li>
                            <Link to="">Packaged Produce</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col">
                        <h4 className="text-g">BreakFast and Dairy</h4>
                        <ul className="mt-4 mb-0">
                          <li>
                            <Link to="">Meat & Poultry</Link>
                          </li>
                          <li>
                            <Link to="">Fresh vegetables</Link>
                          </li>
                          <li>
                            <Link to="">Herbs & Seasoning</Link>
                          </li>
                          <li>
                            <Link to="">cuts & Sprouts</Link>
                          </li>
                          <li>
                            <Link to="">Exotic Fruits & Veggies</Link>
                          </li>
                          <li>
                            <Link to="">Packaged Produce</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col">
                        <h4 className="text-g">Meat and Seafood</h4>
                        <ul className="mt-4 mb-0">
                          <li>
                            <Link to="">Meat & Poultry</Link>
                          </li>
                          <li>
                            <Link to="">Fresh vegetables</Link>
                          </li>
                          <li>
                            <Link to="">Herbs & Seasoning</Link>
                          </li>
                          <li>
                            <Link to="">cuts & Sprouts</Link>
                          </li>
                          <li>
                            <Link to="">Exotic Fruits & Veggies</Link>
                          </li>
                          <li>
                            <Link to="">Packaged Produce</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col">
                        <img
                          src="https://images.pexels.com/photos/3025236/pexels-photo-3025236.jpeg?cs=srgb&dl=pexels-alxs-3025236.jpg&fm=jpg"
                          className="w-100"
                        />
                      </div>
                    </div>
                  </div>
                </li>

                <li className="list-inline-item">
                  <Button>
                    <Link>Blog</Link>
                  </Button>
                </li>

                <li className="list-inline-item ">
                  <Button>
                    <Link>
                      Pages
                      <KeybordArrowDownIcon />
                    </Link>
                  </Button>
                  <div className="dropdown_menu mb-0">
                    <ul>
                      <li>
                        <Button>
                          <Link to="/about">About us</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/about">Contact</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/about">My Account</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/about">Login</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/about">Register</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/about">Forgot Password</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/about">Reset Password</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/about">Purchase Guide</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/about">Privacy Policy</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/about">Terms of service</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/about">404 Page</Link>
                        </Button>
                      </li>
                      <></>
                    </ul>
                  </div>
                </li>
                <li className="list-inline-item">
                  <Button>
                    <Link>Contact</Link>
                  </Button>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-sm-2 part3 d-flex align-items-center ">
            <div className="phNo d-flex align-items-center ml-auto">
              <span>
                <HeadphonesIcon />
              </span>
              <div className="info ml-3">
                <h3 className="text-g ">1900 - 1900</h3>
                <p className="mb-0">24/7 Support Center</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Nav;
