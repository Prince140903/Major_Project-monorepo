import React, { useContext, useState } from "react";
import "./register.css";

import { DynamicIcon, Images } from "../../../constants";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../../App";
import { postData } from "../../../utils/api";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../../../firebase";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account", //force account selection
});
const auth = getAuth(firebaseApp);

const Register = () => {
  const [ShowPassword, setShowPassword] = useState(false);
  const [ShowPassword2, setShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();
  const Context = useContext(MyContext);

  const [formFields, setFromFields] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
    checkBox: false,
  });

  const changeInput = (e) => {
    const { name, type, value, checked } = e.target;

    setFromFields((prevFields) => ({
      ...prevFields,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    try {
      if (formFields.name === "" || undefined) {
        Context.setAlertBox({
          open: true,
          error: true,
          msg: "Name Blank",
        });
        return false;
      }
      if (formFields.email === "" || undefined) {
        Context.setAlertBox({
          open: true,
          error: true,
          msg: "@mail Blank",
        });
        return false;
      }
      if (formFields.phone === "" || undefined) {
        Context.setAlertBox({
          open: true,
          error: true,
          msg: "Phone Blank",
        });
        return false;
      }
      if (formFields.password === "" || undefined) {
        Context.setAlertBox({
          open: true,
          error: true,
          msg: "Password Blank",
        });
        return false;
      }
      if (formFields.confirmPassword === "" || undefined) {
        Context.setAlertBox({
          open: true,
          error: true,
          msg: "Confirm-Password Blank",
        });
        return false;
      }
      if (formFields.confirmPassword !== formFields.password) {
        Context.setAlertBox({
          open: true,
          error: true,
          msg: "Password and Confirm-Password not match",
        });
        return false;
      }
      if (formFields.checkBox === false) {
        Context.setAlertBox({
          open: true,
          error: true,
          msg: "Checkbox not checked",
        });
        return false;
      }

      setIsLoading(true);

      postData("/api/users/signUp", formFields)
        .then((res) => {
          if (res.error !== true) {
            Context.setAlertBox({
              open: true,
              error: false,
              msg: "Register  Successfully!",
            });

            setIsLoading(true);

            setTimeout(() => {
              history("/auth/login");
            }, 200);
          } else {
            setIsLoading(false);
            Context.setAlertBox({
              open: true,
              error: true,
              msg: res.msg,
            });
          }
        })
        .catch((error) => {
          console.error("API Error:", error);
          setIsLoading(false);
          Context.setAlertBox({
            open: true,
            error: true,
            msg: "Something went wrong during registration.",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // Get Google Credentials
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        // Get User Details
        const user = result.user;
        const fields = {
          name: user.providerData[0]?.displayName || "",
          email: user.providerData[0]?.email || "",
          password: null,
          images: user.providerData[0]?.photoURL || "",
          phone: user.providerData[0]?.phoneNumber || "",
          isAdmin: true,
        };

        // Send data to backend API
        postData("api/users/authWithGoogle", fields).then((res) => {
          try {
            if (!res.error) {
              localStorage.setItem("token", res.token);
              console.log(res?.user);
              const userData = {
                name: res.user?.name,
                email: res.user?.email,
                userId: res.user?.id,
                image: res?.user?.images?.length > 0 ? res?.user?.image[0] : "",
                isAdmin: res.user?.isAdmin,
              };
              localStorage.setItem("users", JSON.stringify(userData)); // Fixed incorrect variable

              // Show success alert
              Context.setAlertBox({
                open: true,
                error: false,
                msg: res.msg,
              });

              setTimeout(() => {
                history("/");
                Context.setIsLogin(true);
                setIsLoading(false);

                // ✅ Close Popup if Opened
              }, 2000);
            } else {
              // Show error alert
              Context.setAlertBox({
                open: true,
                error: true,
                msg: res.msg,
              });
              setIsLoading(false);
            }
          } catch (error) {
            console.log(error);
            setIsLoading(false);
          }
        });

        console.log("User Data:", user);
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error.message);
        Context.setAlertBox({
          open: true,
          error: true,
          msg: error.message,
        });
      });
  };

  return (
    <>
      <img src={Images.Pattern} className="loginPattern" />
      <section className="loginSection  register">
        <div className="row">
          <div className="col-md-8 d-flex align-items-center flex-column part1 justify-content-center">
            <h1>
              SmartShop E-commerce Dashboard & Admin Panel -
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
                <form onSubmit={submitForm}>
                  <div className="form-group mb-3 position-relative">
                    <span className="icon">
                      <DynamicIcon iconName="AccountCircle" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Name"
                      name="name"
                      autoFocus
                      onChange={changeInput}
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
                      name="email"
                      onChange={changeInput}
                    />
                  </div>
                  <div className="form-group mb-3 position-relative">
                    <span className="icon">
                      <DynamicIcon iconName="Phone" />
                    </span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Phone"
                      name="phone"
                      onChange={changeInput}
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
                      name="confirmPassword"
                      onChange={changeInput}
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
                    control={
                      <Checkbox
                        name="checkBox"
                        checked={formFields.checkBox}
                        onChange={changeInput}
                      />
                    }
                    style={{ color: "var(--body_color)" }}
                    label="I agree to all Terms and Conditions"
                  />

                  <div className="form-group mb-3 position-relative">
                    <Button type="submit" className="btn-blue w-100">
                      {isLoading === true ? <CircularProgress /> : "Sign Up"}
                    </Button>
                  </div>

                  <div className="form-group mb-3 position-relative text-center">
                    <div className="d-flex align-items-center justify-content-center or">
                      <span className="line"></span>
                      <span className="txt">or</span>
                      <span className="line"></span>
                    </div>

                    <div className="Google">
                      <Button
                        variant="outlined"
                        className="w-100 btn-blue"
                        onClick={signInWithGoogle}
                      >
                        <DynamicIcon iconName="Google" className="icon pr-2" />
                        Sign in With Google
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
