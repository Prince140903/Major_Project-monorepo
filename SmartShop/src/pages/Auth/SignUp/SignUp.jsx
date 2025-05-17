import React, { useContext, useState } from "react";
import "./SignUp.css";

import { MyContext } from "../../../App.jsx";
import { DynamicIcon } from "../../../constants";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../../utils/api";
import { firebaseApp } from "../../../firebase.js";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account", //force account selection
});
const auth = getAuth(firebaseApp);

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [ShowPassword2, setShowPassword2] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const Context = useContext(MyContext);
  const history = useNavigate();

  const [formFields, setFromFields] = useState({
    name: "",
    email: "",
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

  const signUpForm = (e) => {
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
              history("/auth/signin");
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
          isAdmin: false,
        };

        // Send data to backend API
        postData("/api/users/authWithGoogle", fields).then((res) => {
          try {
            if (!res.error) {
              localStorage.setItem("token", res.token);

              const userData = {
                name: res.user?.name,
                email: res.user?.email,
                userId: res.user?.id,
                image:
                  res?.user?.images?.length > 0 ? res?.user?.images[0] : "",
                isAdmin: res.user?.isAdmin,
              };
              localStorage.setItem("user", JSON.stringify(userData)); // Fixed incorrect variable

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
      <div className="loginSection">
        <form onSubmit={signUpForm}>
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
              <DynamicIcon iconName="Lock" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter Password"
              name="password"
              onChange={changeInput}
            />
            <span
              className="togglePassword"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
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
            label="I agree to all Terms and Conditions"
            className="labeled pt-3"
          />

          <div className="form-group mb-3 position-relative">
            <Button type="submit" className="btn-blue w-100">
              {isLoading ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>
          </div>

          <div className="form-group position-relative ">
            <div className="d-flex align-items-center justify-content-center mt-3 w-100">
              <span className="line"></span>
              <span className="txt">or</span>
              <span className="line"></span>
            </div>
          </div>
          <div className="Google w-100">
            <Button
              variant="outlined"
              className="w-100 btn-blue"
              onClick={signInWithGoogle}
            >
              <DynamicIcon iconName="Google" className="icon pr-2" />
              Sign Up With Google
            </Button>
          </div>
        </form>
        <div className="wrapper mt-3 card p-3 text-center">
          <span className="tag">
            Already have an account?
            <Link to="/auth/signin" className="link ml-2">
              Login
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default SignUp;
