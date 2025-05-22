import React, { useContext, useState } from "react";
import "./SignIn.css";

import { MyContext } from "../../../App.jsx";
import { DynamicIcon } from "../../../constants";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../../utils/api";
import { firebaseApp } from "../../../firebase.js";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account", //force account selection
});
const auth = getAuth(firebaseApp);

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const Context = useContext(MyContext);
  const history = useNavigate();

  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  const changeInput = (e) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [e.target.name]: e.target.value,
    }));
  };

  const signIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formFields.email === "") {
        Context.setAlertBox({
          open: true,
          error: true,
          msg: "Email Blank",
        });
        return false;
      }
      if (formFields.password === "") {
        Context.setAlertBox({
          open: true,
          error: true,
          msg: "Password Blank",
        });
        return false;
      }

      /*Add postData first *(by Aaditya) */
      postData("/api/users/signIn", formFields)
        .then((res) => {
          if (res.error) {
            setIsLoading(false);
            Context.setAlertBox({
              open: true,
              error: true,
              msg: res.msg || "Check for Incorrect Email or Password",
            });
          } else {
            if (res.user?.isAdmin === true) {
              localStorage.removeItem("user");
              localStorage.setItem("token", res?.token);
              Context.setIsLogin(true);

              const user = {
                userName: res?.user?.name,
                email: res?.user?.email,
                userId: res.user?.id,
                image: res?.user?.image?.length > 0 ? res?.user?.image[0] : "",
                isAdmin: res.user?.isAdmin,
              };
              localStorage.setItem("user", JSON.stringify(user));
            } else {
              localStorage.removeItem("user");
              localStorage.setItem("token", res?.token);
              Context.setIsLogin(true);

              const user = {
                userName: res?.user?.name,
                email: res?.user?.email,
                userId: res.user?.id,
                image: res?.user?.image?.length > 0 ? res?.user?.image[0] : "",
                isAdmin: res.user?.isAdmin,
              };
              localStorage.setItem("user", JSON.stringify(user));
            }
            Context.setAlertBox({
              open: true,
              error: false,
              msg: "Login Successful!",
            });
            setIsLoading(false);
            setTimeout(() => {
              history("/");
            }, 200);
          }
        })
        .catch((error) => {
          console.error("API Error:", error);
          setIsLoading(false);
          Context.setAlertBox({
            open: true,
            error: true,
            msg: "Something went wrong during Login.",
          });
        });
    } catch (error) {
      console.log("Errror:", error);
      setIsLoading(false);
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
          isAdmin: true,
        };

        // Send data to backend API
        postData("/api/users/authWithGoogle", fields).then((res) => {
          try {
            if (!res.error) {
              localStorage.setItem("token", res.token);

              const userData = {
                name: res.user?.name,
                email: res.user?.email,
                userId: res.user?._id,
                image:
                  res?.user?.images?.length > 0 ? res?.user?.images[0] : "",
                isAdmin: res.user?.isAdmin,
              };

              localStorage.setItem("user", JSON.stringify(userData));

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
              }, 1000);
            } else {
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
            <Button type="submit" className="btn-blue w-100">
              {isLoading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>
          </div>

          <div className="form-group p-2 d-flex justify-content-center w-100">
            <Link to="/auth/forget" className="link">
              FORGOT PASSWORD
            </Link>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-3 w-100">
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
        </form>
        <div className="wrapper mt-3 card p-3 text-center">
          <span className="tag">
            Don't have an account?
            <Link to="/auth/signup" className="link ml-2">
              Register
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default SignIn;
