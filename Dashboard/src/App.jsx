import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  NotFound,
  Dashboard,
  Login,
  Registration,
  ForgetPassword,
  ProductDetails,
  ProductUpload,
  ProductList,
  Orders,
  CategoryList,
  SubcategoryList,
} from "./pages";
import { Header, Sidebar, Footer } from "./components";
import AuthLayout from "./Layouts/AuthLayouts";
import LoadingBar from "react-top-loading-bar";

import { Snackbar, Alert } from "@mui/material";
// import { fetchDataFromApi } from "./utils/api";

export const MyContext = createContext();

function App() {
  const [isToggle, setIsToggle] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState();
  const [progress, setProgress] = useState(0);

  const [ThemeMode, setThemeMode] = useState(
    () => localStorage.getItem("ThemeMode") || "light"
  );

  const [alertBox, setAlertBox] = useState({
    msg: "",
    error: false,
    open: false,
  });

  // const fetchCategory = () => {
  //   setProgress(30);
  //   fetchDataFromApi("/api/category").then((res) => {
  //     setCatData(res);
  //     setProgress(100);
  //   });
  // };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", ThemeMode);
    localStorage.setItem("ThemeMode", ThemeMode);
  }, [ThemeMode]);

  useEffect(() => {
    const token = localStorage.getItem("token");
     
    if (token !== "" && token !== undefined && token !== null) {
      setIsLogin(true);
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const values = {
    isToggle,
    setIsToggle,
    ThemeMode,
    isLogin,
    setThemeMode,
    setIsLogin,
    // alertBox,
    setAlertBox,
    user,
    progress,
    setProgress,
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertBox({
      open: false,
    });
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <Snackbar
          open={alertBox.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={alertBox.error === false ? "success" : "error"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alertBox.msg}
          </Alert>
        </Snackbar>

        <Routes>
          {/* Auth Pages */}
          <Route path="/auth/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Registration />} />
            <Route path="forget-password" element={<ForgetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Main App */}
          <Route
            path="/*"
            element={
              <>
                <LoadingBar
                  color="#f11946"
                  progress={progress}
                  onLoaderFinished={() => setProgress(0)}
                  className="topLoadingBar"
                />
                <Header />

                <div className="main d-flex">
                  <div
                    className={`sidebarWrapper ${
                      isToggle === true ? "toggle" : ""
                    }`}
                  >
                    <Sidebar />
                  </div>

                  <div
                    className={`content ${isToggle === true ? "toggle" : ""}`}
                  >
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route
                        path="/product-details"
                        element={<ProductDetails />}
                      />
                      <Route
                        path="/product-upload"
                        element={<ProductUpload />}
                      />
                      <Route path="/product-list" element={<ProductList />} />
                      <Route path="/category-list" element={<CategoryList />} />
                      <Route
                        path="/subcategory-list"
                        element={<SubcategoryList />}
                      />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                  </div>
                </div>
              </>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
