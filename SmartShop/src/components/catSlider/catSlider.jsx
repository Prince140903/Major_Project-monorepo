import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./catSlider.css";
import images from "../../constants/images";
//import { Speed } from "@mui/icons-material";
//import { Fade } from "@mui/material";

const CatSlider = () => {
  var settings = {
    dots: false,
    infinite: true,
    Speed: 500,
    slidesToShow: 10,
    Fade: false,
    arrows: true,
    autoplay: 2000,
    centerMode:true
  };

  return (
    <>
      <div className="catSliderSection d-flex ">
        <div className="container-fluid">
          <h2 className="hd">Featured categories</h2>
          <Slider
            {...settings}
            className="cat_Slider_Main"
            id="cat_Slider_Main"
          >
            <div className="item ">
              <div className="info">
                <img src={images.cat13} />
                <h5>Cake & Milk</h5>
                <p>26 items</p>
              </div>
            </div>

            <div className="item">
              <div className="info">
                <img src={images.cat13} />
                <h5>Cake & Milk</h5>
                <p>26 items</p>
              </div>
            </div>

            <div className="item">
              <div className="info">
                <img src={images.cat13} />
                <h5>Cake & Milk</h5>
                <p>26 items</p>
              </div>
            </div>

            <div className="item">
              <div className="info">
                <img src={images.cat13} />
                <h5>Cake & Milk</h5>
                <p>26 items</p>
              </div>
            </div>

            <div className="item">
              <div className="info">
                <img src={images.cat13} />
                <h5>Cake & Milk</h5>
                <p>26 items</p>
              </div>
            </div>

            <div className="item">
              <div className="info">
                <img src={images.cat13} />
                <h5>Cake & Milk</h5>
                <p>26 items</p>
              </div>
            </div>

            <div className="item">
              <div className="info">
                <img src={images.cat13} />
                <h5>Cake & Milk</h5>
                <p>26 items</p>
              </div>
            </div>

            <div className="item">
              <div className="info">
                <img src={images.cat13} />
                <h5>Cake & Milk</h5>
                <p>26 items</p>
              </div>
            </div>

            <div className="item">
              <div className="info">
                <img src={images.cat13} />
                <h5>Cake & Milk</h5>
                <p>26 items</p>
              </div>
            </div>

            <div className="item">
              <div className="info">
                <img src={images.cat13} />
                <h5>Cake & Milk</h5>
                <p>26 items</p>
              </div>
            </div>

          </Slider>
        </div>
      </div>
    </>
  );
}

export default CatSlider;
