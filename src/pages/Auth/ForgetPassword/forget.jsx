import React, { useState } from "react";
import "./forget.css";

import { DynamicIcon, Images } from "../../../constants";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Forget = () => {
  const [ShowPassword, setShowPassword] = useState(false);

  return (
    <>
      <img src={Images.Pattern} className="loginPattern" />
      <div className="loginSection">
        <div className="loginBox">
          <div className="logo text-center">
            <img src={Images.Logo} alt="logo" width="60px" />
            <h5 className="font-weight-bold">Reset the password</h5>
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

              <div className="form-group mb-3 position-relative text-center">
                <div>
                  <Button variant="outlined" className="w-100 btn-blue">
                    &nbsp; GET LINK
                  </Button>
                </div>
              </div>
            </form>
          </div>

          <div className="wrapper mt-3 card p-3 text-center">
            <span className="tag">
              Remember the password?
              <Link to={"/auth/login"} className="link color ml-2">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forget;
