import React from "react";
import "./banners.css";

import images from "../../constants/images";
import { Button } from "@mui/material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

const Banners = () => {
  return (
    <div className="bannerSection">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="box">
              <img src={images.Banner1} className="w-100 transition" />
              <Button
                className="btn-g d-flex align-items-center "
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "35px", // Adjust this value to move the button closer or farther from the edge
                  transform: "translateY(-50%)",
                }}
              >
                Shop Now
                <ArrowForwardOutlinedIcon />
              </Button>
            </div>
          </div>

          <div className="col">
            <div className="box">
              <img src={images.Banner2} className="w-100 transition" />
              <Button
                className="btn-g d-flex align-items-center "
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "35px", // Adjust this value to move the button closer or farther from the edge
                  transform: "translateY(-50%)",
                }}
              >
                Shop Now
                <ArrowForwardOutlinedIcon />
              </Button>
            </div>
          </div>

          <div className="col">
            <div className="box">
              <img src={images.Banner3} className="w-100 transition" />
              <Button
                className="btn-g d-flex align-items-center "
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "35px", // Adjust this value to move the button closer or farther from the edge
                  transform: "translateY(-50%)",
                }}
              >
                Shop Now
                <ArrowForwardOutlinedIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banners;
