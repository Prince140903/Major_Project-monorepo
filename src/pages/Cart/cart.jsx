import React from "react";

import "./cart.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Button } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import QuantityBox from "../../components/quantityBox/quantity";

const Cart = () => {
  return (
    <>
      <div className="breadcrumbWrapper mb-4">
        <div className="container-fluid">
          <ul className="breadcrumb breadcrumb2 mb-0">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>shop</li>
            <li>cart</li>
          </ul>
        </div>
      </div>

      <section className="cartSection mb-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-7">
              <div className="d-flex align-items-center w-100">
                <div className="left">
                  <h1 className="hd mb-0">Your Cart</h1>
                  <p>
                    There are <span className="text-g">3</span> products in your
                    cart
                  </p>
                </div>
                <span className="ml-auto clearCart d-flex align-items-center cursor">
                  <DeleteOutlinedIcon />
                  Clear Cart
                </span>
              </div>

              <div className="cartWrapper mt-4">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Remove</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="img">
                              <img
                                src="https://nest-frontend-v6.vercel.app/assets/imgs/shop/product-1-1.jpg"
                                className="w-100"
                              />
                            </div>
                            <div className="info pl-4">
                              <Link>
                                <h4>Field Roast Chao Cheese Creamy Origin</h4>
                              </Link>
                              <Rating
                                name="half-rating-read"
                                defaultValue={4.5}
                                precision={0.5}
                                readOnly
                              />
                              <span className="text-muted">(4.5)</span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span>₹22.1</span>
                        </td>
                        <td>
                          <QuantityBox />
                        </td>
                        <td>
                          <span className="text-g">₹22.51</span>
                        </td>
                        <td>
                          <DeleteOutlinedIcon />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="img">
                              <img
                                src="https://nest-frontend-v6.vercel.app/assets/imgs/shop/product-3-1.jpg"
                                className="w-100"
                              />
                            </div>
                            <div className="info pl-4">
                              <Link>
                                <h4>Field Roast Chao Cheese Creamy Origin</h4>
                              </Link>
                              <Rating
                                name="half-rating-read"
                                defaultValue={4.5}
                                precision={0.5}
                                readOnly
                              />
                              <span className="text-muted">(4.5)</span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span>₹22.1</span>
                        </td>
                        <td>
                          <QuantityBox />
                        </td>
                        <td>
                          <span className="text-g">₹22.51</span>
                        </td>
                        <td>
                          <DeleteOutlinedIcon />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="img">
                              <img
                                src="https://nest-frontend-v6.vercel.app/assets/imgs/shop/product-1-1.jpg"
                                className="w-100"
                              />
                            </div>
                            <div className="info pl-4">
                              <Link>
                                <h4>Field Roast Chao Cheese Creamy Origin</h4>
                              </Link>
                              <Rating
                                name="half-rating-read"
                                defaultValue={4.5}
                                precision={0.5}
                                readOnly
                              />
                              <span className="text-muted">(4.5)</span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span>₹22.1</span>
                        </td>
                        <td>
                          <QuantityBox />
                        </td>
                        <td>
                          <span className="text-g">₹22.51</span>
                        </td>
                        <td>
                          <DeleteOutlinedIcon />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="img">
                              <img
                                src="https://nest-frontend-v6.vercel.app/assets/imgs/shop/product-2-1.jpg"
                                className="w-100"
                              />
                            </div>
                            <div className="info pl-4">
                              <Link>
                                <h4>Field Roast Chao Cheese Creamy Origin</h4>
                              </Link>
                              <Rating
                                name="half-rating-read"
                                defaultValue={4.5}
                                precision={0.5}
                                readOnly
                              />
                              <span className="text-muted">(4.5)</span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span>₹22.1</span>
                        </td>
                        <td>
                          <QuantityBox />
                        </td>
                        <td>
                          <span className="text-g">₹22.51</span>
                        </td>
                        <td>
                          <DeleteOutlinedIcon />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-md-5 pl-5 cartRightBox">
              <div className="card p-4  ">
                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 text-muted">Subtotal</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    <span className="text-g">₹22.31</span>
                  </h3>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 text-muted">Shipping</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    <span className="">₹Free</span>
                  </h3>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 text-muted">Estimate for</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    <span className="">United Kingdom</span>
                  </h3>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 text-muted">Total</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    <span className="text-g">₹22.31</span>
                  </h3>
                </div>
                <br />
                <Button className="btn-g btn-lg ">Proceed To CheckOut</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Cart;
