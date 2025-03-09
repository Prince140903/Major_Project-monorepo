import { React, useContext, useEffect, useState } from "react";
import "./cart.css";

import { Link } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Button, Rating } from "@mui/material";
import { QuantityBox } from "../../components";
import { MyContext } from "../../App";
import { fetchDataFromApi, deleteData } from "../../utils/api";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const Context = useContext(MyContext);
  const userId = Context.user?.userId;

  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        const CartProds = await fetchDataFromApi(`/api/cart/${userId}`);
        setCart(CartProds?.items || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, [userId]);

  const deleteProduct = (id) => {
    deleteData(`/api/cart/remove/${userId}/${id}`)
      .then((res) => {
        fetchDataFromApi(`/api/cart/${userId}`).then((res) => {
          setCart(res.items || []);
          Context.setAlertBox({
            open: true,
            error: false,
            msg: "Product Deleted!",
          });
        });
      })
      .catch((error) => {
        console.error("Error removing product:", error);
      });
  };

  const subTotal = cart.reduce(
    (acc, item) => acc + item.actual_price * item.quantity,
    0
  );

  console.log("cart: ", cart);

  const discount =
    subTotal -
    cart.reduce((acc, item) => acc + item.discount_price * item.quantity, 0);

  const total = subTotal - discount;

  return (
    <>
      <div className="breadcrumbWrapper mb-4">
        <div className="container-fluid">
          <ul className="breadcrumb breadcrumb2 mb-0">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Cart</li>
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
                    There are <span className="text-g">{cart.length}</span>{" "}
                    products in your cart
                  </p>
                </div>
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
                      {cart?.length !== 0 &&
                        cart?.map((product, index) => {
                          return (
                            <tr key={index}>
                              <td style={{ width: "800px" }}>
                                <div className="d-flex align-items-center">
                                  <div className="img">
                                    <img
                                      src={product.image}
                                      className="w-100"
                                    />
                                  </div>
                                  <div className="info pl-4">
                                    <Link>
                                      <h4>{product.name}</h4>
                                    </Link>
                                  </div>
                                </div>
                              </td>

                              <td>
                                <span className="price">
                                  ₹ {product.discount_price}
                                </span>
                              </td>
                              <td>
                                <QuantityBox
                                  quantity={product.quantity}
                                  onChange={(newQty) => {
                                    const updatedCart = cart.map((item) =>
                                      item.productId === product.productId
                                        ? { ...item, quantity: newQty }
                                        : item
                                    );
                                    setCart(updatedCart);
                                  }}
                                />
                              </td>
                              <td>
                                <span className="text-g price">
                                  ₹ {product.discount_price * product.quantity}
                                </span>
                              </td>
                              <td>
                                <DeleteOutlinedIcon
                                  onClick={() =>
                                    deleteProduct(product.productId)
                                  }
                                  className="icon"
                                />
                              </td>
                            </tr>
                          );
                        })}
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
                    <span className="text-g">₹ {subTotal}</span>
                  </h3>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 text-muted">Shipping</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    <span className="">₹ Free</span>
                  </h3>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 text-muted">Discounts</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    <span className="">-₹ {discount}</span>
                  </h3>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 text-muted">Total</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    <span className="text-g">₹ {total}</span>
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

{
  /*  */
}
