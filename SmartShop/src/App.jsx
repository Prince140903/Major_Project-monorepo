import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Header, Footer } from "./components";
import {
  Home,
  Compare,
  Listing,
  NotFound,
  DetailsPage,
  Cart,
  SignIn,
  SignUp,
  Forget,
} from "./pages";
// import { fetchDataFromApi } from "./utils/api";
import { Snackbar, Alert } from "@mui/material";

export const MyContext = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState();
  const [progress, setProgress] = useState(0);

  const [alertBox, setAlertBox] = useState({
    msg: "",
    error: false,
    open: false,
  });

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
    isLogin,
    setIsLogin,
    alertBox,
    setAlertBox,
    user,
    progress,
    setProgress,
  };

  const handleClose = (reason) => {
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
        <Header />
        <Routes>
          <Route exact={true} path="/" element={<Home />} />
          <Route exact={true} path="/auth/signin" element={<SignIn />} />
          <Route exact={true} path="/auth/signup" element={<SignUp />} />
          <Route exact={true} path="/auth/forget" element={<Forget />} />
          <Route exact={true} path="/compare" element={<Compare />} />
          <Route exact={true} path="/products/listing" element={<Listing />} />
          <Route exact={true} path="/products/:id" element={<DetailsPage />} />
          <Route exact={true} path="/Cart" element={<Cart />} />
          <Route exact={true} path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
