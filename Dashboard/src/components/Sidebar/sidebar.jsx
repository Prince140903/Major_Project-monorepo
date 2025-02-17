import React, { useContext, useState } from "react";
import "./sidebar.css";

import { Button } from "@mui/material";
import { DynamicIcon } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";

const Sidebar = () => {
  const [isActive, setIsActive] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const Context = useContext(MyContext);

  const isOpenSM = (index) => {
    setIsActive((prevActive) => (prevActive === index ? null : index));
  };

  const logout = () => {
    setAnchorEl(null);

    Context.setIsLogin(false);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <div className="sidebar">
      <ul className="mb-0">
        <li>
          <Link to="/">
            <Button
              className={`w-100 ${isActive === 0 ? "active" : ""}`}
              onClick={() => isOpenSM(0)}
            >
              <span className="icon">
                <DynamicIcon iconName="Dashboard" />
              </span>
              Dashboard
            </Button>
          </Link>
        </li>
        <li>
          <Button
            className={`w-100 ${isActive === 1 ? "active" : ""}`}
            onClick={() => isOpenSM(1)}
          >
            <span className="icon">
              <DynamicIcon iconName="VpnKey" />
            </span>
            Authentication
            <span className="arrow">
              <DynamicIcon iconName="KeyboardArrowRight" />
            </span>
          </Button>
          <div
            className={`submenuWrapper ${
              isActive === 1 ? "colapse" : "colapsed"
            }`}
          >
            <ul className="submenu">
              <li>
                <Link to={"/auth/login"}>Login</Link>
              </li>
              <li>
                <Link to={"/auth/register"}>Register</Link>
              </li>
              <li>
                <Link to={"/auth/forget-password"}>Forget Password</Link>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <Button
            className={`w-100 ${isActive === 2 ? "active" : ""}`}
            onClick={() => isOpenSM(2)}
          >
            <span className="icon">
              <DynamicIcon iconName="Layers" />
            </span>
            Products
            <span className="arrow">
              <DynamicIcon iconName="KeyboardArrowRight" />
            </span>
          </Button>
          <div
            className={`submenuWrapper ${
              isActive === 2 ? "colapse" : "colapsed"
            }`}
          >
            <ul className="submenu">
              <li>
                <Link to={"/product-list"}>Product List</Link>
              </li>
              <li>
                <Link to={"/product-details"}>Product View</Link>
              </li>
              <li>
                <Link to={"/product-upload"}>Product Upload</Link>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <Button
            className={`w-100 ${isActive === 3 ? "active" : ""}`}
            onClick={() => isOpenSM(3)}
          >
            <span className="icon">
              <DynamicIcon iconName="Layers" />
            </span>
            Category
            <span className="arrow">
              <DynamicIcon iconName="KeyboardArrowRight" />
            </span>
          </Button>
          <div
            className={`submenuWrapper ${
              isActive === 3 ? "colapse" : "colapsed"
            }`}
          >
            <ul className="submenu">
              <li>
                <Link to={"/category-list"}>Category List</Link>
              </li>
              <li>
                <Link to={"/category-upload"}>Category Upload</Link>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <Button
            className={`w-100 ${isActive === 4 ? "active" : ""}`}
            onClick={() => isOpenSM(4)}
          >
            <span className="icon">
              <DynamicIcon iconName="Layers" />
            </span>
            Subcategory
            <span className="arrow">
              <DynamicIcon iconName="KeyboardArrowRight" />
            </span>
          </Button>
          <div
            className={`submenuWrapper ${
              isActive === 4 ? "colapse" : "colapsed"
            }`}
          >
            <ul className="submenu">
              <li>
                <Link to={"/subcategory-list"}>Subcategory List</Link>
              </li>
              <li>
                <Link to={"/subcategory-upload"}>Subcategory Upload</Link>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <Link to={"/orders"}>
            <Button
              className={`w-100 ${isActive === 5 ? "active" : ""}`}
              onClick={() => isOpenSM(5)}
            >
              <span className="icon">
                <DynamicIcon iconName="ShoppingCart" />
              </span>
              Orders
              <span className="ml-auto badge">4</span>
            </Button>
          </Link>
        </li>
        <li>
          <Link to={"/"}>
            <Button
              className={`w-100 ${isActive === 6 ? "active" : ""}`}
              onClick={() => isOpenSM(6)}
            >
              <span className="icon">
                <DynamicIcon iconName="Message" />
              </span>
              Messages
              <span className="arrow">
                <DynamicIcon iconName="KeyboardArrowRight" />
              </span>
            </Button>
          </Link>
        </li>
        <li>
          <Link to={"/"}>
            <Button
              className={`w-100 ${isActive === 7 ? "active" : ""}`}
              onClick={() => isOpenSM(7)}
            >
              <span className="icon">
                <DynamicIcon iconName="Notifications" />
              </span>
              Notifications
              <span className="arrow">
                <DynamicIcon iconName="KeyboardArrowRight" />
              </span>
            </Button>
          </Link>
        </li>
        <li>
          <Link to={"/"}>
            <Button className="w-100">
              <span className="icon">
                <DynamicIcon iconName="Settings" />
              </span>
              Settings
            </Button>
          </Link>
        </li>
      </ul>

      <br />

      <div className="logoutWrapper">
        <div className="logoutBox">
          <Button variant="contained" onClick={logout}>
            <DynamicIcon iconName="LogoutOutlined" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
