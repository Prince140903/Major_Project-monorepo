import React from "react";
import "./notFound.css";

import images from "../../constants/images";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import DynamicIcon from "../../constants/icons";

const NotFound = () => {
  return (
    <>
      <section className="notFound">
        <div className="container-fluid">
          <div className="box">
            <img src={images.Page404} alt="404" />
            <br />
            <br />
            <h1>Page Not Found</h1>
            <p>
              The link you clicked may be broken or the page may have been
              removed. <br />
              Visit the <strong>Homepage</strong> or <strong>Contact us</strong>
              about the problem.
            </p>
            <div className="d-flex">
              <Button className="btn-g m-auto">
                <Link to={"/"} className="non">
                  <DynamicIcon iconName="HomeOutlined" /> Back to Home Page
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
