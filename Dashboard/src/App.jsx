import { BrowserRouter, Route, Routes } from "react-router-dom";
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

import { createContext, useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
// import { Password } from "@mui/icons-material";

const MyContext = createContext();

function App() {
  const [isToggle, setIsToggle] = useState(false);
  // const [isLogin, setLogin] = useState(false);

  const [ThemeMode, setThemeMode] = useState(
    () => localStorage.getItem("ThemeMode") || "light"
  );

  const [alertBox, setAlertBox] = useState({
    msg: "",
    error: false,
    open: false,
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", ThemeMode);
    localStorage.setItem("ThemeMode", ThemeMode);
  }, [ThemeMode]);

  const values = {
    isToggle,
    setIsToggle,
    ThemeMode,
    setThemeMode,
    alertBox,
    setAlertBox,
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
      <Snackbar
        open={alertBox.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          autoHideDuration={6000}
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
            <MyContext.Provider value={values}>
              <Header />

              <div className="main d-flex">
                <div
                  className={`sidebarWrapper ${
                    isToggle === true ? "toggle" : ""
                  }`}
                >
                  <Sidebar />
                </div>

                <div className={`content ${isToggle === true ? "toggle" : ""}`}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route
                      path="/product-details"
                      element={<ProductDetails />}
                    />
                    <Route path="/product-upload" element={<ProductUpload />} />
                    <Route path="/product-list" element={<ProductList />} />
                    <Route path="/category-list" element={<CategoryList />} />
                    <Route path="/subcategory-list" element={<SubcategoryList />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Footer />
                </div>
              </div>
            </MyContext.Provider>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
