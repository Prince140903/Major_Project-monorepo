import React from "react";
import "./product.css";

import { Button, Rating } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";

const Product = (props) => {
  return (
    <div>
      <LazyLoad>
        <span
          className={`badge ${
            props.tag === "meesho"
              ? "new"
              : props.tag === "amazon"
              ? "sale"
              : props.tag === "flipkart"
              ? "best"
              : ""
          }`}
        >
          {props.tag}
        </span>
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
            <Link to={`/products/${props._id}`} className="link cursor">
              <VisibilityIcon />
            </Link>
          </li>
        </ul>
      </div>

      <div className="info">
        <h4 className="title">{props.name}</h4>
        <Rating
          name="half-rating-read"
          value={Math.round(parseFloat(props.ratings) * 2) / 2}
          precision={0.5}
          readOnly
        />
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <span className="price text-g font-weight-bold ">
              ₹ {props.discount_price}
            </span>
            <span className="oldPrice">
              ₹ {props.actual_price}
              {props.color}
            </span>
          </div>

          <Button className=" btn-g ml-5 transition">
            <ShoppingCartOutlinedIcon />
            ADD
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
