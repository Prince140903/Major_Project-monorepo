import { React, useContext, useEffect, useState } from "react";
import "./wishList.css";

import { Link } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Button } from "@mui/material";
import { QuantityBox } from "../../components";
import { MyContext } from "../../App";
import { fetchDataFromApi, deleteData } from "../../utils/api";

const Wishlist = () => {
  const [userWishlist, setUserWishlist] = useState([]);
  const Context = useContext(MyContext);
  const userId = Context.user?.userId;

  useEffect(() => {
    if (!userId) return;

    const fetchWishlist = async () => {
      try {
        const ListProds = await fetchDataFromApi(`/api/wishlist/${userId}`);
        setUserWishlist(ListProds?.items || []);
      } catch (error) {
        console.error("Error fetching Wishlist:", error);
      }
    };
    fetchWishlist();
  }, [userId]);

  const deleteProduct = (id) => {
    deleteData(`/api/wishlist/remove/${userId}/${id}`)
      .then((res) => {
        fetchDataFromApi(`/api/wishlist/${userId}`).then((res) => {
          setUserWishlist(res.items || []);
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

  const subTotal = userWishlist.reduce(
    (acc, item) => acc + item.actual_price * item.quantity,
    0
  );

  const discount =
    subTotal -
    userWishlist.reduce(
      (acc, item) => acc + item.discount_price * item.quantity,
      0
    );

  const total = subTotal - discount;

  return (
    <>
      <div className="breadcrumbWrapper mb-4">
        <div className="container-fluid">
          <ul className="breadcrumb breadcrumb2 mb-0">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Wishlist</li>
          </ul>
        </div>
      </div>

      <section className="cartSection mb-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-7">
              <div className="d-flex align-items-center w-100">
                <div className="left">
                  <h1 className="hd mb-0">Your Wishlist</h1>
                  <p>
                    There are{" "}
                    <span className="text-g">{userWishlist.length}</span>{" "}
                    products in your Wishlist.
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
                      {userWishlist?.length !== 0 &&
                        userWishlist?.map((product, index) => {
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
                                    const updatedList = userWishlist.map(
                                      (item) =>
                                        item.productId === product.productId
                                          ? { ...item, quantity: newQty }
                                          : item
                                    );
                                    setUserWishlist(updatedList);
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
export default Wishlist;
