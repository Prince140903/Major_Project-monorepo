import React from "react";
import "./footer.css";

import images from "../../constants/images.js";
import { Link } from "react-router-dom";
import DynamicIcon from "../../constants/icons.jsx";

const Footer = () => {
  return (
    <div className="footerWrapper">
      <div className="footerBoxes">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="box d-flex align-items-center w-100">
                <span>
                  <img src={images.Icon1} alt="Icon1" />
                </span>
                <div className="info">
                  <h4>Best prices & offers</h4>
                  <p>Orders ₹50 or more</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="box d-flex align-items-center w-100">
                <span>
                  <img src={images.Icon2} alt="Icon2" />
                </span>
                <div className="info">
                  <h4>Free delivery</h4>
                  <p>24/7 service</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="box d-flex align-items-center w-100">
                <span>
                  <img src={images.Icon3} alt="Icon3" />
                </span>
                <div className="info">
                  <h4>Great daily deal</h4>
                  <p>on Signup</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="box d-flex align-items-center w-100">
                <span>
                  <img src={images.Icon4} alt="Icon4" />
                </span>
                <div className="info">
                  <h4>Wide assortment</h4>
                  <p>Mega Discounts</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="box d-flex align-items-center w-100">
                <span>
                  <img src={images.Icon5} alt="Icon5" />
                </span>
                <div className="info">
                  <h4>Easy returns</h4>
                  <p>Within 30 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 part1">
              <Link to="/">
                <img src={images.Logo} alt="logo" width={350} />
              </Link>
              <br />

              <div className="d-flex mb-3">
                <h3>Install App</h3>
                <Link to="/">
                  <img
                    src={images.GooglePlay}
                    alt="GooglePlay"
                    width={150}
                    className="mx-3"
                  />
                </Link>
              </div>
              <h3>Secured Payment GateWays</h3>
              <img src={images.PayMethods} alt="PayMethods" width={350} />
            </div>

            <div className="col-md-9 part2">
              <div className="row">
                <div className="col">
                  <h3>Company</h3>
                  <ul className="mb-sm-5 mb-md-0">
                    <li>
                      <Link to="#">About Us</Link>
                    </li>
                    <li>
                      <Link to="#">Delivery Information</Link>
                    </li>
                    <li>
                      <Link to="#">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to="#">Terms &amp; Conditions</Link>
                    </li>
                    <li>
                      <Link to="#">Contact Us</Link>
                    </li>
                    <li>
                      <Link to="#">Support Center</Link>
                    </li>
                    <li>
                      <Link to="#">Careers</Link>
                    </li>
                  </ul>
                </div>
                <div className="col">
                  <h3>Account</h3>
                  <ul className="mb-sm-5 mb-md-0">
                    <li>
                      <Link to="#">About Us</Link>
                    </li>
                    <li>
                      <Link to="#">Delivery Information</Link>
                    </li>
                    <li>
                      <Link to="#">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to="#">Terms &amp; Conditions</Link>
                    </li>
                    <li>
                      <Link to="#">Contact Us</Link>
                    </li>
                    <li>
                      <Link to="#">Support Center</Link>
                    </li>
                    <li>
                      <Link to="#">Careers</Link>
                    </li>
                  </ul>
                </div>
                <div className="col">
                  <h3>Corporate</h3>
                  <ul className="mb-sm-5 mb-md-0">
                    <li>
                      <Link to="#">About Us</Link>
                    </li>
                    <li>
                      <Link to="#">Delivery Information</Link>
                    </li>
                    <li>
                      <Link to="#">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to="#">Terms &amp; Conditions</Link>
                    </li>
                    <li>
                      <Link to="#">Contact Us</Link>
                    </li>
                    <li>
                      <Link to="#">Support Center</Link>
                    </li>
                    <li>
                      <Link to="#">Careers</Link>
                    </li>
                  </ul>
                </div>
                <div className="col">
                  <h3>Popular</h3>
                  <ul className="mb-sm-5 mb-md-0">
                    <li>
                      <Link to="#">About Us</Link>
                    </li>
                    <li>
                      <Link to="#">Delivery Information</Link>
                    </li>
                    <li>
                      <Link to="#">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to="#">Terms &amp; Conditions</Link>
                    </li>
                    <li>
                      <Link to="#">Contact Us</Link>
                    </li>
                    <li>
                      <Link to="#">Support Center</Link>
                    </li>
                    <li>
                      <Link to="#">Careers</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <br />
          <hr />

          <div className="row lastStrip">
            <div className="col-md-6 d-flex justify-content-center">
              <p>
                © 2024 <strong>SmartShop</strong> All copyrights reserved
              </p>
            </div>
            <div className="col-md-6 follows">
              <h5>Follow us</h5>
              <ul>
                <li className="list-inline-item">
                  <Link to={""}>
                    <DynamicIcon iconName="FacebookOutlined" />
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to={""}>
                    <DynamicIcon iconName="Instagram" />
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to={""}>
                    <DynamicIcon iconName="Twitter" />
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to={""}>
                    <DynamicIcon iconName="LinkedIn" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
