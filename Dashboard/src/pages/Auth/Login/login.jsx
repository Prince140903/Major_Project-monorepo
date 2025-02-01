import React, { useContext, useState } from "react";
import "./login.css";

import { MyContext } from "../../../App";
import { DynamicIcon, Images } from "../../../constants";
import { Button, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import { postData } from "../../utils/api";

const Login = () => {
  const [ShowPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const Context = useContext(MyContext);
  const history = useNavigate();

  const [formFields, setFromFields] = useState({
    email: "",
    Password: "",
  });
  const changeInput = (e) => {
    setFromFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };
  const signIn = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      /*Add postData first *(by Aaditya) */
      // postData("/api/user/signIn", formFields).then((res) => {
      //   if (res.user?.isAdmin) {
      //     localStorage.removeItem("user");
      //     localStorage.setItem("token", res?.token);
      //     const user = {
      //       userName: res?.user?.name,
      //       email: res?.user?.email,
      //       userId: res.user?.id,
      //       image: res?.user?.image?.length > 0 ? res?.user?.image[0] : "",
      //       isAdmin: res.user?.isAdmin,
      //     };
      //     localStorage.setItem("user", JSON.stringify(user));
      //   }
      //   if (res.error !== true) {
      //     Context.setAlertBox({
      //       open: true,
      //       error: false,
      //       msg: "Log In  Successfully!",
      //     });
      //     setTimeout(() => {
      //       setIsLoading(false);
      //       history("/");
      //     }, 200);
      //   } else {
      //     Context.setAlertBox({
      //       open: true,
      //       error: true,
      //       msg: "you are not a admin",
      //     });
      //     setIsLoading(false);
      //   }
      // });
    } catch (error) {
      console.log(error);
    }
  };

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
            <form onSubmit={signIn}>
              <div className="form-group mb-3 position-relative">
                <span className="icon">
                  <DynamicIcon iconName="Mail" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Email"
                  name="email"
                  onChange={changeInput}
                  autoFocus
                  required
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
                  name="password"
                  onChange={changeInput}
                  required
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
                <Button type="submit" className="btn-blue w-100">
                  {" "}
                  {isLoading === true ? <CircularProgress /> : "Sign In"}
                </Button>
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
