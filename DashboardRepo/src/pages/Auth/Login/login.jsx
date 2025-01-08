import React, { useState } from "react";
import "./login.css";

import { DynamicIcon, Images } from "../../../constants";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  const [ShowPassword, setShowPassword] = useState(false);

  return (
    <>
      <img src={Images.Pattern} className="loginPattern" />
      <div className="loginSection">
        <div className="loginBox">
          <div className="logo text-center">
            <img src={Images.Logo} alt="logo" width="60px" />
            <h5 className="font-weight-bold">Login to CupCake</h5>
          </div>

          <div className="wrapper mt-3 card p-4">
            <form>
              <div className="form-group mb-3 position-relative">
                <span className="icon">
                  <DynamicIcon iconName="Mail" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Email"
                  autoFocus
                />
              </div>
              <div className="form-group mb-3 position-relative">
                <span className="icon">
                  <DynamicIcon iconName="Lock" />
                </span>
                <input
                  type={`${ShowPassword === true ? "text" : "password"}`}
                  className="form-control"
                  placeholder="Enter Password"
                />

                <span
                  className="togglePassword"
                  onClick={() => {
                    setShowPassword(!ShowPassword);
                  }}
                >
                  {ShowPassword === true ? (
                    <DynamicIcon iconName="VisibilityOff" />
                  ) : (
                    <DynamicIcon iconName="Visibility" />
                  )}
                </span>
              </div>

              <div className="form-group mb-3 position-relative">
                <Button className="btn-blue w-100">Sign In</Button>
              </div>

              <div className="form-group mb-3 position-relative text-center">
                <Link to={"/auth/forget-password"} className="link">
                  FORGOT PASSWORD
                </Link>
                <div className="d-flex align-items-center justify-content-center or mt-3">
                  <span className="line"></span>
                  <span className="txt">or</span>
                  <span className="line"></span>
                </div>

                <div className="Google">
                  <Button variant="outlined" className="w-100 btn-blue">
                    &nbsp; Sign in With Google
                  </Button>
                </div>
              </div>
            </form>
          </div>

          <div className="wrapper mt-3 card p-3 text-center">
            <span className="tag">
              Don't have an account?
              <Link to={"/auth/register"} className="link color ml-2">
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
