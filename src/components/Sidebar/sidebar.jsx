import React, { useContext, useState } from "react";
import "./sidebar.css";

import { Button } from "@mui/material";
import { DynamicIcon } from "../../constants";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";

const Sidebar = () => {
  const [isActive, setisActive] = useState(0);
  const [isToggle, setIsToggle] = useState(false);

  const context = useContext(MyContext);

  const isOpenSM = (index) => {
    setisActive(index);
    setIsToggle(!isToggle);
  };

  return (
    <div className="sidebar">
      <ul className="mb-0">
        <li>
          <Link to="/">
            <Button
              className={`w-100 ${
                isActive === 0 && isToggle === true ? "active" : ""
              }`}
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
            className={`w-100 ${
              isActive === 1 && isToggle === true ? "active" : ""
            }`}
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
              isActive === 1 && isToggle === true ? "colapse" : "colapsed"
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
            className={`w-100 ${
              isActive === 2 && isToggle === true ? "active" : ""
            }`}
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
              isActive === 2 && isToggle === true ? "colapse" : "colapsed"
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
          <Link to={"/orders"}>
            <Button
              className={`w-100 ${
                isActive === 3 && isToggle === true ? "active" : ""
              }`}
              onClick={() => isOpenSM(3)}
            >
              <span className="icon">
                <DynamicIcon iconName="ShoppingCart" />
              </span>
              Orders
              <span className="ml-auto badge">3</span>
            </Button>
          </Link>
        </li>
        <li>
          <Link to={"/"}>
            <Button
              className={`w-100 ${
                isActive === 4 && isToggle === true ? "active" : ""
              }`}
              onClick={() => isOpenSM(4)}
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
              className={`w-100 ${
                isActive === 5 && isToggle === true ? "active" : ""
              }`}
              onClick={() => isOpenSM(5)}
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
          <Button variant="contained">
            <DynamicIcon iconName="LogoutOutlined" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
