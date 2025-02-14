import React from "react";
import "./product.css";
import Rating from "@mui/material/Rating";

import { Button } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LazyLoad from "react-lazyload";

const Product = (props) => {
  return (
    <div className="productThumb">
      <span className={`badge ${props.tag}`}>{props.tag}</span>
      {/* )} */}

      <div className="imgWrapper d-flex justify-content-center h-100">
        <LazyLoad>
          <img
            src={props.image}
            className="prod-image"
            onError={(e) =>
              (e.target.src = "https://i.ibb.co/GQmxxNg/images.png")
            }
          />
        </LazyLoad>

        <div className="overlay transition">
          <ul className="list list-inline mb-0">
            <li className="list-inline-item">
              <a className="cursor" tooltip="Add to Wishlist ">
                <FavoriteBorderIcon />
              </a>
            </li>
            <li className="list-inline-item">
              <a className="cursor" tooltip="Compare">
                <CompareArrowsIcon />
              </a>
            </li>
            <li className="list-inline-item">
              <a className="cursor" tooltip="Quick View">
                <VisibilityIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="info">
        <h4 className="title">
          {props.name}
        </h4>
        {/* {console.log(props.ratings)} */}
        <Rating
          name="half-rating-read"
          defaultValue={Math.round(parseFloat(props.ratings) * 2) / 2}
          precision={0.5}
          readOnly
        />
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <span className="price text-g font-weight-bold ">
              ₹ {props.actual_price}
            </span>
            <span className="oldPrice">₹ {props.discount_price}</span>
          </div>

          <Button className=" btn-g  ml-5 transition">
            <ShoppingCartOutlinedIcon />
            ADD
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Product;
