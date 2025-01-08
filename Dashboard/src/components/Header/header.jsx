import React, { useContext, useState } from "react";
import "./header.css";

import { UserImg } from "../../components";
import { Link } from "react-router-dom";
import { Images, DynamicIcon } from "../../constants";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { MyContext } from "../../App";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenNotify, setisOpenNotify] = useState(false);

  const [isLogin, setIsLogin] = useState(true);

  const openAcc = Boolean(anchorEl);
  const openNotify = Boolean(isOpenNotify);

  const context = useContext(MyContext);

  const handleOpenAcc = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAcc = () => {
    setAnchorEl(null);
  };

  const handleOpenNotify = () => {
    setisOpenNotify(true);
  };
  const handleCloseNotify = () => {
    setisOpenNotify(false);
  };

  const toggleTheme = () => {
    context.setThemeMode((prevTheme) =>
      prevTheme === "light" ? "dark" : "light"
    );
  };

  return (
    <>
      <header className="d-flex align-items-center">
        <div className="container-fluid w-100">
          <div className="row d-flex align-items-center m-0">
            <div className="col-sm-2 part1">
              <Link to={"/"} className="d-flex align-items-center logo">
                <img src={Images.Logo} alt="Logo" />
                <span>CUPCAKE</span>
              </Link>
            </div>

            <div className="col-sm-3 d-flex align-items-center part2 pl-4">
              <Button
                className="rounded-circle mr-3"
                onClick={() => context.setIsToggle(!context.isToggle)}
              >
                {context.isToggle === false ? (
                  <DynamicIcon iconName="MenuOpen" />
                ) : (
                  <DynamicIcon iconName="Menu" />
                )}
              </Button>
              <div className="searchBox position-relative d-flex align-items-center">
                <DynamicIcon iconName="SearchRounded" className="mr-2" />
                <input type="text" placeholder="Search here..." />
              </div>
            </div>

            <div className="col-sm-7 d-flex align-items-center justify-content-end part3">
              <Button className="rounded-circle mr-3" onClick={toggleTheme}>
                {context.ThemeMode === "light" ? (
                  <DynamicIcon iconName="LightModeOutlined" />
                ) : (
                  <DynamicIcon iconName="DarkModeOutlined" />
                )}
              </Button>
              <Button className="rounded-circle mr-3">
                <DynamicIcon iconName="ShoppingCartOutlined" />
              </Button>
              <Button className="rounded-circle mr-3">
                <DynamicIcon iconName="EmailOutlined" />
              </Button>

              <div className="notifyWrapper">
                <Button
                  className="rounded-circle mr-3"
                  onClick={handleOpenNotify}
                >
                  <DynamicIcon iconName="NotificationsOutlined" />
                </Button>
                <Menu
                  anchorEl={isOpenNotify}
                  id="Notifications"
                  open={openNotify}
                  onClose={handleCloseNotify}
                  onClick={handleCloseNotify}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "center", vertical: "top" }}
                  anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleCloseNotify}>
                    <ListItemIcon>
                      <DynamicIcon iconName="AccountCircle" fontSize="small" />
                    </ListItemIcon>
                    My Profile
                  </MenuItem>
                  <MenuItem onClick={handleCloseNotify}>
                    <ListItemIcon>
                      <DynamicIcon iconName="Settings" fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleCloseNotify}>
                    <ListItemIcon>
                      <DynamicIcon iconName="Logout" fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>

              {isLogin === false ? (
                <Link to={"/auth/login"}>
                  <Button className="btn-blue btn-style">Log In</Button>
                </Link>
              ) : (
                <div className="myAccWrapper">
                  <Button
                    className="myAcc d-flex align-items-center"
                    onClick={handleOpenAcc}
                  >
                    <UserImg img={Images.userImg} width='40' />

                    <div className="userInfo">
                      <h4>Aaditya Revandkar</h4>
                      <p className="mb-0">@Aaditya14</p>
                    </div>
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={openAcc}
                    onClose={handleCloseAcc}
                    onClick={handleCloseAcc}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={handleCloseAcc}>
                      <ListItemIcon>
                        <DynamicIcon
                          iconName="AccountCircle"
                          fontSize="small"
                        />
                      </ListItemIcon>
                      My Profile
                    </MenuItem>
                    <MenuItem onClick={handleCloseAcc}>
                      <ListItemIcon>
                        <DynamicIcon iconName="Settings" fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>
                    <MenuItem onClick={handleCloseAcc}>
                      <ListItemIcon>
                        <DynamicIcon iconName="Logout" fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
