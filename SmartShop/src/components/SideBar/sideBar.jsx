import React from "react";
import "./sideBar.css";

import images from "../../constants/images";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import DynamicIcon from "../../constants/icons.jsx";

function valuetext(value) {
  return `$(value)°C`;
}

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const SideBar = () => {
  const [value, setValue] = React.useState([200, 800]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="sidebar">
        <div className="card border-0 shadow">
          <h3>Category</h3>

          <div className="catList">
            <div className="catItem d-flex align-items-center">
              <span className="img">
                <img src={images.DrinksIcon} alt="Icon" width={30} />
                <h4 className="mb-0 ml-3 mr-3">Milks & Drinks</h4>
                <span className="d-flex align-items-center justify-content-center rounded-circle ml-auto">
                  30
                </span>
              </span>
            </div>
            <div className="catItem d-flex align-items-center">
              <span className="img">
                <img src={images.ClothesIcon} alt="Icon" width={30} />
                <h4 className="mb-0 ml-3 mr-3">Clothing</h4>
                <span className="d-flex align-items-center justify-content-center rounded-circle ml-auto">
                  30
                </span>
              </span>
            </div>
            <div className="catItem d-flex align-items-center">
              <span className="img">
                <img src={images.snacksIcon} alt="Icon" width={30} />
                <h4 className="mb-0 ml-3 mr-3">Snacks</h4>
                <span className="d-flex align-items-center justify-content-center rounded-circle ml-auto">
                  30
                </span>
              </span>
            </div>
            <div className="catItem d-flex align-items-center">
              <span className="img">
                <img src={images.FruitsIcon} alt="Icon" width={30} />
                <h4 className="mb-0 ml-3 mr-3">Fresh Fruits</h4>
                <span className="d-flex align-items-center justify-content-center rounded-circle ml-auto">
                  30
                </span>
              </span>
            </div>
            <div className="catItem d-flex align-items-center">
              <span className="img">
                <img src={images.petFoodIcon} alt="Icon" width={30} />
                <h4 className="mb-0 ml-3 mr-3">Pet Foods</h4>
                <span className="d-flex align-items-center justify-content-center rounded-circle ml-auto">
                  30
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow">
          <h3>Fill by price</h3>
          <Slider
            min={0}
            step={1}
            max={1000}
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
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
            <h5>Color</h5>
            <ul className="mb-0">
              <li>
                <Checkbox {...label} color="success" />
                Red
              </li>
              <li>
                <Checkbox {...label} color="success" />
                Red
              </li>
              <li>
                <Checkbox {...label} color="success" />
                Red
              </li>
              <li>
                <Checkbox {...label} color="success" />
                Red
              </li>
              <li>
                <Checkbox {...label} color="success" />
                Red
              </li>
              <li>
                <Checkbox {...label} color="success" />
                Red
              </li>
              <li>
                <Checkbox {...label} color="success" />
                Red
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
