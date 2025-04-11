import { React, useEffect, useState } from "react";
import "./sideBar.css";

import { Slider, Checkbox, Button, capitalize } from "@mui/material";
import { DynamicIcon } from "../../constants";
import { fetchDataFromApi } from "../../utils/api.js";

function valuetext(value) {
  return `$(value)°C`;
}

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const SideBar = ({ setSelectedCategory, selectedCategory }) => {
  const [value, setValue] = useState([200, 800]);
  const [catData, setCatData] = useState([]);
  useEffect(() => {
    fetchDataFromApi("/api/category")
      .then((res) => {
        setCatData(res?.categoryList);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="sidebar">
        <div className="card border-0 shadow">
          <h3>Category</h3>

          <div className="catList">
            <div
              className={`catItem d-flex align-items-center ${
                selectedCategory === "All" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("All")}
            >
              <span className="img">
                <img
                  src="https://cdn.pixabay.com/photo/2021/10/11/23/49/app-6702045_1280.png"
                  alt="Icon"
                  width={80}
                />
                <h4 className="mb-0 ml-3 mr-3">All Categories</h4>
              </span>
            </div>
            {catData?.map((cat) => (
              <div
                className={`catItem d-flex align-items-center ${
                  selectedCategory === cat.name ? "active" : ""
                }`}
                key={cat._id}
                onClick={() => setSelectedCategory(cat.name)}
              >
                <span className="img">
                  <img src={cat.images[0]} alt="Icon" width={80} />
                  <h4 className="mb-0 ml-3 mr-3">{capitalize(cat.name)}</h4>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card border-0 shadow">
          <h3>Fill by price</h3>
          <Slider
            step={1}
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            color="success"
          />

          <div className="d-flex pt-2 pb-2 priceRange">
            <span>
              From: <strong className="text-success">₹{value[0]}</strong>
            </span>
            <span className="ml-auto">
              To: <strong className="text-success">₹{value[1]}</strong>
            </span>
          </div>

          <div className="filters">
            <h5>Company</h5>
            <ul className="mb-0">
              <li>
                <Checkbox {...label} color="success" />
                Amazon
              </li>
              <li>
                <Checkbox {...label} color="success" />
                Flipkart
              </li>
              <li>
                <Checkbox {...label} color="success" />
                Meesho
              </li>
            </ul>
          </div>

          <div className="filters">
            <h5>Item Condition</h5>
            <ul className="mb-0">
              <li>
                <Checkbox {...label} color="success" />
                New
              </li>
              <li>
                <Checkbox {...label} color="success" />
                Old
              </li>
              <li>
                <Checkbox {...label} color="success" />
                Refurbished
              </li>
            </ul>
          </div>

          <div className="d-flex">
            <Button className="btn btn-g">
              <DynamicIcon iconName="FilterAltOutlined" />
              Filter
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
