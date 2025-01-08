import React from "react";
import "./product.css";
import Rating from "@mui/material/Rating";

import images from "../../constants/images";
import { Value } from "sass";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Product = (props) => {
  return (
    <div className="productThumb">
      {props.tag !== null && props.tag !== undefined && (
        <span className={`badge ${props.tag}`}>{props.tag}</span>
      )}

      <Link>
        <div className="imgWrapper">
          <img src={images.product21} className="w-100" />

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
      </Link>
      <div className="info">
        <span className="d-block catName">Camera</span>
        <h4 className="title">
          <Link>Best camera ever , Best branded Camera</Link>
        </h4>
        <Rating
          name="half-rating-read"
          defaultValue={4.5}
          precision={0.5}
          readOnly
        />
        <span className="brand d-block text-g">
          By <Link className="text-g">Sony</Link>
        </span>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <span className="price text-g font-weight-bold ">₹8.85</span>
            <span className="oldPrice">₹29.8</span>
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
