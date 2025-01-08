import React from "react";
import Slider from "react-slick";
import "./slider.css";
import images from "../../../constants/images";

import Newsletter from "../../../components/newsletter/newsletter";

const HomeSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: true,
  };

  return (
    <section className="homeSlider">
      <div className="container-fluid">
        <Slider {...settings} className="home_slider_Main">
          <div className="item">
            <img src={images.Slider1} className="w-100" />
            <div className="info">
              <h2 className="mb-4">
                Don't miss these <br /> amazing deals
              </h2>
              <p>Sign up for daily offers!</p>
            </div>
          </div>
          <div className="item">
            <img src={images.Slider2} className="w-100" />
            <div className="info">
              <h2 className="mb-3">
                Latest deals <br /> and best offers
              </h2>
              <p>Sign up for daily offers!</p>
            </div>
          </div>
        </Slider>

        <Newsletter />
      </div>
    </section>
  );
};

export default HomeSlider;
