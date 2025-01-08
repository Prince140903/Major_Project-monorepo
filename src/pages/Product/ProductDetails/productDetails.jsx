import React, { useState } from "react";
import "./productDetails.css";
import { Images } from "../../../constants";

import {
  Button,
  Breadcrumbs,
  styled,
  emphasize,
  Chip,
  Rating,
} from "@mui/material";
import { UserImg } from "../../../components";
import { DynamicIcon } from "../../../constants";
import Slider from "react-slick";

const ProductDetails = () => {
  const [ActiveImg, setActiveImg] = useState(1);

  const imgSlider = (index) => {
    setActiveImg(index);
  };

  const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      "&:hover, &:focus": {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      "&:active": {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  });

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <div className="w-100 right-content">
        <div className="card shadow border-0 w-100 flex-row p-4 m-0">
          <h5 className="mb-0">Product View</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="/"
              label="Dashboard"
              icon={<DynamicIcon iconName="Home" />}
            />
            <StyledBreadcrumb
              component="a"
              href="/product-list"
              label="Product"
            />
            <StyledBreadcrumb
              component="a"
              href="/product-details"
              label="Product View"
            />
          </Breadcrumbs>
        </div>

        <div className="card">
          <div className="row">
            <div className="col-md-5">
              <div className="sliderWrapper pt-3 pb-3 pr-4 pl-4">
                <h6 className="mb-4">Product Gallery</h6>
                <div className="displayImg mb-2">
                  <img
                    src={Images[`Product${ActiveImg}`]}
                    alt="display"
                    className="w-100"
                    draggable="false"
                  />
                </div>
                <Slider {...settings} className="mb-2">
                  <div className="item">
                    <img
                      src={Images.Product1}
                      alt="product"
                      className="w-100"
                      onClick={() => imgSlider(1)}
                    />
                  </div>
                  <div className="item">
                    <img
                      src={Images.Product2}
                      alt="product"
                      className="w-100"
                      onClick={() => imgSlider(2)}
                    />
                  </div>
                  <div className="item">
                    <img
                      src={Images.Product3}
                      alt="product"
                      className="w-100"
                      onClick={() => imgSlider(3)}
                    />
                  </div>
                  <div className="item">
                    <img
                      src={Images.Product4}
                      alt="product"
                      className="w-100"
                      onClick={() => imgSlider(4)}
                    />
                  </div>
                  <div className="item">
                    <img
                      src={Images.Product5}
                      alt="product"
                      className="w-100"
                      onClick={() => imgSlider(5)}
                    />
                  </div>
                </Slider>
              </div>
            </div>
            <div className="col-md-7">
              <div className="pt-3 pb-3 pr-4 pl-4">
                <h6 className="mb-4">Product Details</h6>
                <h4>
                  Formal suits for men wedding slim fit 3 piece dress business
                  party jacket
                </h4>

                <div className="productInfo mt-3">
                  <div className="row mb-2">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <DynamicIcon iconName="Store" />
                      </span>
                      <span className="name">Brand</span>
                    </div>
                    <div className="col-sm-9 d-flex align-items-center">
                      : <span>Ecasty</span>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <DynamicIcon iconName="Category" />
                      </span>
                      <span className="name">Category</span>
                    </div>
                    <div className="col-sm-9 d-flex align-items-center">
                      :{" "}
                      <span>
                        <ul className="list list-inline tags sml">
                          <li className="list-inline-item">
                            <span>SUITE</span>
                          </li>
                          <li className="list-inline-item">
                            <span>PARTY</span>
                          </li>
                          <li className="list-inline-item">
                            <span>Blazer</span>
                          </li>
                          <li className="list-inline-item">
                            <span>Casual</span>
                          </li>
                        </ul>
                      </span>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <DynamicIcon iconName="Tag" />
                      </span>
                      <span className="name">Tags</span>
                    </div>
                    <div className="col-sm-9 d-flex align-items-center">
                      :{" "}
                      <span>
                        <ul className="list list-inline tags sml">
                          <li className="list-inline-item">
                            <span>PARTY</span>
                          </li>
                          <li className="list-inline-item">
                            <span>Casual</span>
                          </li>
                        </ul>
                      </span>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <DynamicIcon iconName="ColorLens" />
                      </span>
                      <span className="name">Color</span>
                    </div>
                    <div className="col-sm-9 d-flex align-items-center">
                      :{" "}
                      <span>
                        <ul className="list list-inline tags sml">
                          <li className="list-inline-item">
                            <span>Red</span>
                          </li>
                          <li className="list-inline-item">
                            <span>Blue</span>
                          </li>
                          <li className="list-inline-item">
                            <span>Black</span>
                          </li>
                          <li className="list-inline-item">
                            <span>Grey</span>
                          </li>
                          <li className="list-inline-item">
                            <span>White</span>
                          </li>
                          <li className="list-inline-item">
                            <span>Maroon</span>
                          </li>
                        </ul>
                      </span>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <DynamicIcon iconName="FormatSize" />
                      </span>
                      <span className="name">Size</span>
                    </div>
                    <div className="col-sm-9 d-flex align-items-center">
                      :{" "}
                      <span>
                        <ul className="list list-inline tags sml">
                          <li className="list-inline-item">
                            <span>Small</span>
                          </li>
                          <li className="list-inline-item">
                            <span>Medium</span>
                          </li>
                          <li className="list-inline-item">
                            <span>Large</span>
                          </li>
                          <li className="list-inline-item">
                            <span>X-Large</span>
                          </li>
                          <li className="list-inline-item">
                            <span>XXL</span>
                          </li>
                        </ul>
                      </span>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <DynamicIcon iconName="Sell" />
                      </span>
                      <span className="name">Price</span>
                    </div>
                    <div className="col-sm-9 d-flex align-items-center">
                      : <span>₹5000.00</span>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <DynamicIcon iconName="Warehouse" />
                      </span>
                      <span className="name">Stock</span>
                    </div>
                    <div className="col-sm-9 d-flex align-items-center">
                      : <span>(18) Piece</span>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <DynamicIcon iconName="Grade" />
                      </span>
                      <span className="name">Review</span>
                    </div>
                    <div className="col-sm-9 d-flex align-items-center">
                      : <span>3.5 (200)</span>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <DynamicIcon iconName="Verified" />
                      </span>
                      <span className="name">Published</span>
                    </div>
                    <div className="col-sm-9 d-flex align-items-center">
                      : <span>14 sep 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h5 className="title mt-4 mb-3">Product Description</h5>
            <p style={{ color: "var(--sidebar_color)" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
              magnam, doloribus libero deserunt corporis, pariatur eum fugiat
              architecto, vero officiis dolores deleniti laboriosam provident
              veritatis nulla. Obcaecati laborum eligendi deserunt quo
              exercitationem est totam quia dolor similique voluptatibus?
              Laborum eos aperiam fuga sequi eveniet, assumenda architecto fugit
              repudiandae molestias autem rerum, neque culpa atque inventore
              eius molestiae, explicabo nihil dolores quibusdam soluta libero
              alias? Repellendus aperiam sequi ipsa deserunt laboriosam. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Quaerat amet
              placeat dolor possimus suscipit ab. Labore incidunt cupiditate
              nulla quod.
            </p>

            <h5 className="title mb-3 mt-4">Rating Analytics</h5>

            <div className="ratingSection">
              <div className="ratingRow d-flex align-items-center">
                <span
                  className="col1"
                  style={{ color: "var(--sidebar_color)" }}
                >
                  5 Star
                </span>
                <div className="col2">
                  <div className="progress">
                    <div className="progress-bar" style={{ width: "80%" }} />
                  </div>
                </div>
                <span
                  className="col3"
                  style={{ color: "var(--sidebar_color)" }}
                >
                  (22)
                </span>
              </div>
              <div className="ratingRow d-flex align-items-center">
                <span
                  className="col1"
                  style={{ color: "var(--sidebar_color)" }}
                >
                  4 Star
                </span>
                <div className="col2">
                  <div className="progress">
                    <div className="progress-bar" style={{ width: "60%" }} />
                  </div>
                </div>
                <span
                  className="col3"
                  style={{ color: "var(--sidebar_color)" }}
                >
                  (22)
                </span>
              </div>
              <div className="ratingRow d-flex align-items-center">
                <span
                  className="col1"
                  style={{ color: "var(--sidebar_color)" }}
                >
                  3 Star
                </span>
                <div className="col2">
                  <div className="progress">
                    <div className="progress-bar" style={{ width: "20%" }} />
                  </div>
                </div>
                <span
                  className="col3"
                  style={{ color: "var(--sidebar_color)" }}
                >
                  (22)
                </span>
              </div>
              <div className="ratingRow d-flex align-items-center">
                <span
                  className="col1"
                  style={{ color: "var(--sidebar_color)" }}
                >
                  2 Star
                </span>
                <div className="col2">
                  <div className="progress">
                    <div className="progress-bar" style={{ width: "30%" }} />
                  </div>
                </div>
                <span
                  className="col3"
                  style={{ color: "var(--sidebar_color)" }}
                >
                  (22)
                </span>
              </div>
              <div className="ratingRow d-flex align-items-center">
                <span
                  className="col1"
                  style={{ color: "var(--sidebar_color)" }}
                >
                  1 Star
                </span>
                <div className="col2">
                  <div className="progress">
                    <div className="progress-bar" style={{ width: "10%" }} />
                  </div>
                </div>
                <span
                  className="col3"
                  style={{ color: "var(--sidebar_color)" }}
                >
                  (22)
                </span>
              </div>
            </div>

            <br />

            <h5 className="title mb-3 mt-4">Customer Reviews</h5>
            <div className="reviewSection">
              <div className="reviewRow">
                <div className="row">
                  <div className="col-md-7 d-flex">
                    <div className="d-flex flex-column">
                      <div className="userInfo d-flex align-items-center mb-3">
                        <UserImg img={Images.userImg} size={true} />

                        <div className="info pl-3">
                          <h6>Aaditya Revandkar</h6>
                          <span>25 minutes ago!</span>
                        </div>
                      </div>
                      <Rating
                        name="read-only"
                        value={4.5}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-md-5 d-flex align-items-center ml-auto">
                    <Button className="btn-blue btn-style ml-auto">
                      <DynamicIcon iconName="Reply" />
                      Reply
                    </Button>
                  </div>

                  <p
                    className="mt-3 pl-4"
                    style={{ color: "var(--sidebar_color)" }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Eius repudiandae voluptates eveniet culpa maxime asperiores
                    explicabo facilis voluptatibus eum tempore eligendi ducimus,
                    sit impedit quae quas laborum dolor vero natus inventore hic
                    magnam. Nihil, aperiam!
                  </p>
                </div>
              </div>
              <div className="reviewRow reply">
                <div className="row">
                  <div className="col-md-7 d-flex">
                    <div className="userInfo d-flex align-items-center mb-3">
                      <UserImg img={Images.userImg} size={true} />

                      <div className="info pl-3">
                        <h6>Aaditya Revandkar</h6>
                        <span>25 minutes ago!</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-5 d-flex align-items-center ml-auto">
                    <Button className="btn-blue btn-style ml-auto">
                      <DynamicIcon iconName="Reply" />
                      Reply
                    </Button>
                  </div>

                  <p
                    className="mt-3 pl-4"
                    style={{ color: "var(--sidebar_color)" }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Eius repudiandae voluptates eveniet culpa maxime asperiores
                    explicabo facilis voluptatibus eum tempore eligendi ducimus,
                    sit impedit quae quas laborum dolor vero natus inventore hic
                    magnam. Nihil, aperiam!
                  </p>
                </div>
              </div>
              <div className="reviewRow">
                <div className="row">
                  <div className="col-md-7 d-flex">
                    <div className="d-flex flex-column">
                      <div className="userInfo d-flex align-items-center mb-3">
                        <UserImg img={Images.userImg} size={true} />

                        <div className="info pl-3">
                          <h6>Aaditya Revandkar</h6>
                          <span>25 minutes ago!</span>
                        </div>
                      </div>
                      <Rating
                        name="read-only"
                        value={4.5}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-md-5 d-flex align-items-center ml-auto">
                    <Button className="btn-blue btn-style ml-auto">
                      <DynamicIcon iconName="Reply" />
                      Reply
                    </Button>
                  </div>

                  <p
                    className="mt-3 pl-4"
                    style={{ color: "var(--sidebar_color)" }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Eius repudiandae voluptates eveniet culpa maxime asperiores
                    explicabo facilis voluptatibus eum tempore eligendi ducimus,
                    sit impedit quae quas laborum dolor vero natus inventore hic
                    magnam. Nihil, aperiam!
                  </p>
                </div>
              </div>
              <div className="reviewRow reply">
                <div className="row">
                  <div className="col-md-7 d-flex">
                    <div className="userInfo d-flex align-items-center mb-3">
                      <UserImg img={Images.userImg} size={true} />

                      <div className="info pl-3">
                        <h6>Aaditya Revandkar</h6>
                        <span>25 minutes ago!</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-5 d-flex align-items-center ml-auto">
                    <Button className="btn-blue btn-style ml-auto">
                      <DynamicIcon iconName="Reply" />
                      Reply
                    </Button>
                  </div>

                  <p
                    className="mt-3 pl-4"
                    style={{ color: "var(--sidebar_color)" }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Eius repudiandae voluptates eveniet culpa maxime asperiores
                    explicabo facilis voluptatibus eum tempore eligendi ducimus,
                    sit impedit quae quas laborum dolor vero natus inventore hic
                    magnam. Nihil, aperiam!
                  </p>
                </div>
              </div>
            </div>

            <h5 className="title mb-3 mt-4">Review Reply Form</h5>
            <form className="reviewForm">
              <textarea placeholder="Write here" />
              <Button className="btn-blue w-100 mt-2 p-2">
                DROP YOUR REPLIES
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
