import React, { useState } from "react";
import "./register.css";

import { DynamicIcon, Images } from "../../../constants";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
  const [ShowPassword, setShowPassword] = useState(false);
  const [ShowPassword2, setShowPassword2] = useState(false);

  return (
    <>
      <img src={Images.Pattern} className="loginPattern" />
      <section className="loginSection  register">
        <div className="row">
          <div className="col-md-8 d-flex align-items-center flex-column part1 justify-content-center">
            <h1>
              SmartShop E-commerce Dashboard & Admin Panel -{" "}
              <span className="text-sky">CupCake</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              non, ipsa tempore repellat perspiciatis vero harum obcaecati
              similique quae nisi. Odio qui explicabo molestiae itaque quaerat
              maxime ex odit molestias doloremque, quisquam sint quod.
            </p>
            <div className="w-100 mt-4">
              <Link to="/">
                <Button className="btn-blue p-3">
                  <DynamicIcon iconName="Home" /> Go to Home
                </Button>
              </Link>
            </div>
          </div>
          <div className="col-md-4 pr-0">
            <div className="loginBox">
              <div className="logo text-center">
                <img src={Images.Logo} alt="logo" width="60px" />
                <h5 className="font-weight-bold">Register a new account</h5>
              </div>

              <div className="wrapper mt-3 border p-4">
                <form>
                  <div className="form-group mb-3 position-relative">
                    <span className="icon">
                      <DynamicIcon iconName="AccountCircle" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Name"
                      autoFocus
                    />
                  </div>
                  <div className="form-group mb-3 position-relative">
                    <span className="icon">
                      <DynamicIcon iconName="Mail" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Email"
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
                    <span className="icon">
                      <DynamicIcon iconName="GppGood" />
                    </span>
                    <input
                      type={`${ShowPassword2 === true ? "text" : "password"}`}
                      className="form-control"
                      placeholder="Enter Password"
                    />

                    <span
                      className="togglePassword"
                      onClick={() => {
                        setShowPassword2(!ShowPassword2);
                      }}
                    >
                      {ShowPassword2 === true ? (
                        <DynamicIcon iconName="VisibilityOff" />
                      ) : (
                        <DynamicIcon iconName="Visibility" />
                      )}
                    </span>
                  </div>

                  <FormControlLabel
                    required
                    control={<Checkbox />}
                    style={{ color: "var(--body_color)" }}
                    label="I agree to all Terms and Conditions"
                  />

                  <div className="form-group mb-3 position-relative">
                    <Button className="btn-blue w-100">Sign Up</Button>
                  </div>

                  <div className="form-group mb-3 position-relative text-center">
                    <div className="d-flex align-items-center justify-content-center or">
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
              <div className="wrapper border footer p-3 text-center">
                <span style={{ color: "var(--body_color)" }}>
                  Already have an account?
                  <Link to={"/auth/login"} className="link color ml-2">
                    Login
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
