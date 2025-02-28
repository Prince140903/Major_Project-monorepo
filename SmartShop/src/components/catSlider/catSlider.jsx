import React, { useState, useEffect, useContext } from "react";
import "./catSlider.css";
import Slider from "react-slick";
import { MyContext } from "../../App";
import { fetchDataFromApi } from "../../utils/api";
import { capitalize } from "@mui/material";

const CatSlider = () => {
  const [catData, setCatData] = useState([]);

  const Context = useContext(MyContext);

  useEffect(() => {
    Context.setProgress(20);
    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res);
      Context.setProgress(100);
    });
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    Speed: 500,
    slidesToShow: 8,
    Fade: false,
    arrows: true,
    autoplay: 2000,
    centerMode: false,
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
            {catData?.categoryList?.map((cat, index) => {
              return (
                <div className="item" key={index}>
                  <div
                    className="info"
                    style={{
                      mixBlendMode: "multiply",
                      background: `${cat.color}`,
                    }}
                  >
                    <img src={cat?.images?.[0]} alt="category" />
                    <h5>{capitalize(cat?.name)}</h5>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default CatSlider;
