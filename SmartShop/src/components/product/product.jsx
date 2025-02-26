import React from "react";
import "./product.css";

import { Button, Rating } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LazyLoad from "react-lazyload";

const Product = (props) => {
  return (
    <div>
      <LazyLoad>
        <span className="badge new">{props.tag}</span>
        <img
          src={props.image}
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

      <div className="info">
        <h4 className="title">{props.name}</h4>
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
            <span className="oldPrice">
              ₹ {props.discount_price}
              {props.color}
            </span>
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
