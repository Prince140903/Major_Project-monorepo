import React from "react";
import { Link } from "react-router-dom";
import "./detail.css";
import Rating from "@mui/material/Rating";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import images from "../../constants/images";
import Slider from "react-slick";
import { useRef, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import { Button } from "@mui/material";
import { Product } from "../../components";


const DetailsPage = () => {
  const [zoomImage, setZoomImage] = useState(
    `https://www.jiomart.com/images/product/original/490000363/maggi-2-minute-masala-noodles-70-g-product-images-o490000363-p490000363-0-202305292130.jpg`
  );
  const [bigImageSize, setBigImageSize] = useState([1500, 1500]);
  const [smlImageSize, setSmlImageSize] = useState([150, 150]);

  const [activeSize, setActiveSize] = useState(0);
  const [inputValue, setinputValue] = useState(1);
  const [activeTabs, setActivetabs] = useState(0);

  const zoomSlider = useRef();
  const zoomSliderBig = useRef();

  var settings2 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: false,
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
  };
  var related = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
  };

  const goto = (url, index) => {
    setZoomImage(url);
    zoomSlider.current.slickGoTo(index);
    zoomSliderBig.current.slickGoTo(index);
  };

  const isActive = (index) => {
    setActiveSize(index);
  };

  const plus = () => {
    setinputValue = inputValue + 1;
  };

  const minus = () => {
    if (inputValue !== 0) {
      setinputValue = inputValue - 1;
    }
  };

  return (
    <secction className="detailspage mb-5">
      <div className="breadcrumbWrapper mb-4">
        <div className="container-fluid">
          <ul className="breadcrumb breadcrumb2  mb-0">
            <li>
              <Link>Home </Link>
            </li>
            <li>
              <Link>Vegetables & Tubers</Link>
            </li>

            <li>Seeds Of Change Organic</li>
          </ul>
        </div>
      </div>
      <div className="container detailsContainer pt-3 pb-3">
        <div className="row ">
          {/* productZoom start here */}
          <div className="col-md-5">
            <div className="productZoom">
              <Slider
                {...settings2}
                className="zoomSliderBig"
                ref={zoomSliderBig}
              >
                <div className="item">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src={`https://www.jiomart.com/images/product/original/490000363/maggi-2-minute-masala-noodles-70-g-product-images-o490000363-p490000363-0-202305292130.jpg?im=Resize=(${bigImageSize[0]},${bigImageSize[1]})`}
                    onClick={() => goto(0)}
                  />
                </div>
                <div className="item">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src={`https://www.jiomart.com/images/product/original/490000363/maggi-2-minute-masala-noodles-70-g-product-images-o490000363-p490000363-1-202305292130.jpg?im=Resize=(${bigImageSize[0]},${bigImageSize[1]})`}
                    onClick={() => goto(1)}
                  />
                </div>
                <div className="item">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src={`https://www.jiomart.com/images/product/original/490000363/maggi-2-minute-masala-noodles-70-g-product-images-o490000363-p490000363-2-202305292130.jpg?im=Resize=(${bigImageSize[0]},${bigImageSize[1]})`}
                    onClick={() => goto(2)}
                  />
                </div>
                <div className="item">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src={`https://www.jiomart.com/images/product/original/490000363/maggi-2-minute-masala-noodles-70-g-product-images-o490000363-p490000363-3-202305292130.jpg?im=Resize=(${bigImageSize[0]},${bigImageSize[1]})`}
                    onClick={() => goto(3)}
                  />
                </div>
                <div className="item">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src={`https://www.jiomart.com/images/product/original/490000363/maggi-2-minute-masala-noodles-70-g-legal-images-o490000363-p490000363-4-202305292130.jpg?im=Resize=(${bigImageSize[0]},${bigImageSize[1]})`}
                    onClick={() => goto(4)}
                  />
                </div>
                <div className="item">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src={`https://www.jiomart.com/images/product/original/490000363/maggi-2-minute-masala-noodles-70-g-legal-images-o490000363-p490000363-4-202305292130.jpg?im=Resize=(${bigImageSize[0]},${bigImageSize[1]})`}
                    onClick={() => goto(5)}
                  />
                </div>
              </Slider>
            </div>

            {/*slider 1*/}
            <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
              <div className="item">
                <img
                  src={`https://www.jiomart.com/images/product/original/490000363/maggi-2-minute-masala-noodles-70-g-product-images-o490000363-p490000363-0-202305292130.jpg?im=Resize=(${smlImageSize[0]},${smlImageSize[1]})`}
                  className="w-100"
                  onClick={() =>
                    goto(
                      "https://www.jiomart.com/images/product/original/490000363/maggi-2-minute-masala-noodles-70-g-product-images-o490000363-p490000363-0-202305292130.jpg",
                      0
                    )
                  }
                />
              </div>
              <div className="item">
                <img
                  src={`https://www.jiomart.com/images/product/original/490000363/maggi-2-minute-masala-noodles-70-g-product-images-o490000363-p490000363-1-202305292130.jpg?im=Resize=(${smlImageSize[0]},${smlImageSize[1]})`}
                  className="w-100"
                  onClick={() =>
                    goto(
                      "https://www.jiomart.com/images/product/original/490000363/maggi-2-minute-masala-noodles-70-g-product-images-o490000363-p490000363-1-202305292130.jpg",
                      1
                    )
                  }
                />
              </div>
              <div className="item">
                <img
                  src={`https://www.jiomart.com/images/product/original/490000363/maggi-2-minute-masala-noodles-70-g-product-images-o490000363-p490000363-2-202305292130.jpg?im=Resize=(${smlImageSize[0]},${smlImageSize[1]})`}
                  className="w-100"
                  onClick={() =>
                    goto(
                      "https://www.jiomart.com/images/product/original/490000363/maggi-2-minute-masala-noodles-70-g-product-images-o490000363-p490000363-2-202305292130.jpg",
                      2
                    )
                  }
                />
              </div>
              <div className="item">
                <img
                  src={`https://www.jiomart.com/images/product/original/490000363/maggi-2-minute-masala-noodles-70-g-product-images-o490000363-p490000363-3-202305292130.jpg?im=Resize=(${smlImageSize[0]},${smlImageSize[1]})`}
                  className="w-100"
                  onClick={() =>
                    goto(
                      "https://www.jiomart.com/images/product/original/490000363/maggi-2-minute-masala-noodles-70-g-product-images-o490000363-p490000363-3-202305292130.jpg",
                      3
                    )
                  }
                />
              </div>
              <div className="item">
                <img
                  src={`https://www.jiomart.com/images/product/original/490000363/maggi-2-minute-masala-noodles-70-g-legal-images-o490000363-p490000363-4-202305292130.jpg?im=Resize=(${smlImageSize[0]},${smlImageSize[1]})`}
                  className="w-100"
                  onClick={() =>
                    goto(
                      "https://www.jiomart.com/images/product/original/490000363/maggi-2-minute-masala-noodles-70-g-legal-images-o490000363-p490000363-4-202305292130.jpg",
                      4
                    )
                  }
                />
              </div>
              <div className="item">
                <img
                  src={`https://www.jiomart.com/images/product/original/490000363/maggi-2-minute-masala-noodles-70-g-legal-images-o490000363-p490000363-4-202305292130.jpg?im=Resize=(${smlImageSize[0]},${smlImageSize[1]})`}
                  className="w-100"
                  onClick={() =>
                    goto(
                      "https://www.jiomart.com/images/product/original/490000363/maggi-2-minute-masala-noodles-70-g-legal-images-o490000363-p490000363-4-202305292130.jpg",
                      5
                    )
                  }
                />
              </div>
            </Slider>
          </div>
          {/* productZoom end  here */}

          <div className="col-md-7 productInfo ">
            {/* productInfo start here */}
            <h1>Seeds Of Chnage Organic Quinoa,Brown </h1>
            <div className="d-flex-align-items-center mb-4 mt-3">
              <Rating
                name="half-rating-read"
                defaultValue={4.5}
                precision={0.5}
                readOnly
              />
              <span className="text-muted">(32 rewies)</span>
            </div>
            <div className="priceSec d-flex align-items-center mb-3">
              <span className="text-g priceLarge">₹38</span>
              <div className="ml-2 d-flex column">
                <span className="text-org">26% Off</span>

                <span className="OldPrice">₹52</span>
              </div>
            </div>

            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.Aliquam
              rem officia,corrupti reiciendis minima nisi modi, quasi,odio minus
              dolore impedit fuga eum eligendi.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.Aliquam
              rem officia,corrupti reiciendis minima nisi modi, quasi,odio minus
              dolore impedit fuga eum eligendi.
            </p>

            <div className="productSize d-flex align-items-center">
              <span>Size / Weight:</span>
              <ul className="list list-inline mb-0 pl-4">
                <li className="list-inline-item">
                  <a
                    className={`tag ${activeSize === 0 ? `active` : ``}`}
                    onClick={() => isActive(0)}
                  >
                    50g
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className={`tag ${activeSize === 1 ? `active` : ``}`}
                    onClick={() => isActive(1)}
                  >
                    60g
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className={`tag ${activeSize === 2 ? `active` : ``}`}
                    onClick={() => isActive(2)}
                  >
                    80g
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className={`tag ${activeSize === 3 ? `active` : ``}`}
                    onClick={() => isActive(3)}
                  >
                    100g
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className={`tag ${activeSize === 4 ? `active` : ``}`}
                    onClick={() => isActive(4)}
                  >
                    150g
                  </a>
                </li>
              </ul>
            </div>

            <div className="addCartSection pt-4 pb-4 d-flex align-items-center">
              <div className="counterSec mr-3">
                <input type="number" value={inputValue} />

                <span className="arrow plus" onClick={plus}>
                  <KeyboardArrowUpIcon />
                </span>
                <span className="arrow minus" onClick={minus}>
                  <KeyboardArrowDownIcon />
                </span>
              </div>

              <button className="btn-g btn-lgaddtocartbtn ">
                <ShoppingCartOutlinedIcon />
                Add to Cart
              </button>
              <button className=" btn-lg addtocartbtn ml-3 btn-border">
                <FavoriteBorderOutlinedIcon />
              </button>
              <button className=" btn-lg addtocartbtn ml-3 btn-border">
                <CompareArrowsOutlinedIcon />
              </button>

              {/* productInfo end here */}
            </div>
          </div>
        </div>

        <div className="card mt-5 p-5 detailsPageTabs">
          <div className="customTabs">
            <ul className="list list-inline">
              <li className="list-inline-item">
                <Button
                  className={`${activeTabs == 0 && `active`}`}
                  onClick={() => setActivetabs(0)}
                >
                  Description
                </Button>
              </li>
              <li className="list-inline-item">
                <Button
                  className={`${activeTabs == 1 && `active`}`}
                  onClick={() => setActivetabs(1)}
                >
                  Additional Info
                </Button>
              </li>
              <li className="list-inline-item">
                <Button
                  className={`${activeTabs == 2 && `active`}`}
                  onClick={() => setActivetabs(2)}
                >
                  Reviews
                </Button>
              </li>
            </ul>
            <br />
            {activeTabs === 0 && (
              <div className="tabContent">
                <p>
                  Uninhibited carnally hired played in whimpered dear gorilla
                  koala depending and much yikes off far quetzal goodness and
                  from for grimaced goodness unaccountably and meadowlark near
                  unblushingly crucial scallop tightly neurotic hungrily some
                  and dear furiously this apart.
                </p>

                <p>
                  Spluttered narrowly yikes left moth in yikes bowed this that
                  grizzly much hello on spoon-fed that alas rethought much
                  decently richly and wow against the frequent fluidly at
                  formidable acceptably flapped besides and much circa far over
                  the bucolically hey precarious goldfinch mastodon goodness
                  gnashed a jellyfish and one however because.
                </p>
                <br />

                <h2>Packaging & Delivery</h2>
                <p>
                  Uninhibited carnally hired played in whimpered dear gorilla
                  koala depending and much yikes off far quetzal goodness and
                  from for grimaced goodness unaccountably and meadowlark near
                  unblushingly crucial scallop tightly neurotic hungrily some
                  and dear furiously this apart.
                </p>
                <p>
                  Spluttered narrowly yikes left moth in yikes bowed this that
                  grizzly much hello on spoon-fed that alas rethought much
                  decently richly and wow against the frequent fluidly at
                  formidable acceptably flapped besides and much circa far over
                  the bucolically hey precarious goldfinch mastodon goodness
                  gnashed a jellyfish and one however because.
                </p>
                <br />
                <h2>Packaging & Delivery</h2>
                <p>Refrigeration not necessary.</p>
                <p>Stir before serving.</p>
                <br />
                <h2>Other Ingredients</h2>
                <p>Organic raw pecans, organic raw cashews.</p>
                <p>
                  This butter was produced using a LTG (Low Temperature
                  Grinding) process
                </p>
                <p>
                  Made in machinery that processes tree nuts but does not
                  process peanuts, gluten, dairy or soy
                </p>
                <br />
                <h2>Warnings</h2>
                <p>
                  Oil separation occurs naturally. May contain pieces of shell.
                </p>
              </div>
            )}
            {activeTabs === 1 && (
              <div className="tabContent">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <table class="font-md">
                      <tbody>
                        <tr class="stand-up">
                          <th>Stand Up</th>
                          <td>
                            <p>35″L x 24″W x 37-45″H(front to back wheel)</p>
                          </td>
                        </tr>
                        <tr class="folded-wo-wheels">
                          <th>Folded (w/o wheels)</th>
                          <td>
                            <p>32.5″L x 18.5″W x 16.5″H</p>
                          </td>
                        </tr>
                        <tr class="folded-w-wheels">
                          <th>Folded (w/ wheels)</th>
                          <td>
                            <p>32.5″L x 24″W x 18.5″H</p>
                          </td>
                        </tr>
                        <tr class="door-pass-through">
                          <th>Door Pass Through</th>
                          <td>
                            <p>24</p>
                          </td>
                        </tr>
                        <tr class="frame">
                          <th>Frame</th>
                          <td>
                            <p>Aluminum</p>
                          </td>
                        </tr>
                        <tr class="weight-wo-wheels">
                          <th>Weight (w/o wheels)</th>
                          <td>
                            <p>20 LBS</p>
                          </td>
                        </tr>
                        <tr class="weight-capacity">
                          <th>Weight Capacity</th>
                          <td>
                            <p>60 LBS</p>
                          </td>
                        </tr>
                        <tr class="width">
                          <th>Width</th>
                          <td>
                            <p>24″</p>
                          </td>
                        </tr>
                        <tr class="handle-height-ground-to-handle">
                          <th>Handle height (ground to handle)</th>
                          <td>
                            <p>37-45″</p>
                          </td>
                        </tr>
                        <tr class="wheels">
                          <th>Wheels</th>
                          <td>
                            <p>12″ air / wide track slick tread</p>
                          </td>
                        </tr>
                        <tr class="seat-back-height">
                          <th>Seat back height</th>
                          <td>
                            <p>21.5″</p>
                          </td>
                        </tr>
                        <tr class="head-room-inside-canopy">
                          <th>Head room (inside canopy)</th>
                          <td>
                            <p>25″</p>
                          </td>
                        </tr>
                        <tr class="pa_color">
                          <th>Color</th>
                          <td>
                            <p>Black, Blue, Red, White</p>
                          </td>
                        </tr>
                        <tr class="pa_size">
                          <th>Size</th>
                          <td>
                            <p>M, S</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </table>
                </div>
              </div>
            )}

            {activeTabs === 2 && (
              <div className="tabContent">
                <div className="row">
                  <div className="col-md-8">
                    <h3>Customer questions & answer</h3>
                    <br />

                    <div className="card p-3 reviewsCard flex-row">
                      <div className="image">
                        <div className="rounded-circle">
                          <img src="https://nest-frontend-v6.vercel.app/assets/imgs/blog/author-2.png" />
                        </div>
                        <span className="text-g d-block text-center font-weight-bold">
                          aarohi
                        </span>
                      </div>

                      <div className="info pl-5">
                        <div className="d-flex align-items-center">
                          <h5 className="text">December 4, 2024 at 3:12 pm</h5>
                          <div className="ml-auto">
                            <Rating
                              name="half-rating-read"
                              defaultValue={4.5}
                              precision={0.5}
                              readOnly
                            />
                          </div>
                        </div>

                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Delectus, suscipit exercitationem accusantium
                          obcaecati quos voluptate nesciunt facilis itaque modi
                          commodi dignissimos sequi repudiandae minus ab
                          deleniti totam officia id incidunt?
                        </p>
                      </div>
                    </div>

                    <div className="card p-3 reviewsCard flex-row">
                      <div className="image">
                        <div className="rounded-circle">
                          <img src="https://nest-frontend-v6.vercel.app/assets/imgs/blog/author-3.png" />
                        </div>
                        <span className="text-g d-block text-center font-weight-bold">
                          nisha
                        </span>
                      </div>

                      <div className="info pl-5">
                        <div className="d-flex align-items-center">
                          <h5 className="text">December 4, 2024 at 3:12 pm</h5>
                          <div className="ml-auto">
                            <Rating
                              name="half-rating-read"
                              defaultValue={4.5}
                              precision={0.5}
                              readOnly
                            />
                          </div>
                        </div>

                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Delectus, suscipit exercitationem accusantium
                          obcaecati quos voluptate nesciunt facilis itaque modi
                          commodi dignissimos sequi repudiandae minus ab
                          deleniti totam officia id incidunt?
                        </p>
                      </div>
                    </div>
                    <div className="card p-3 reviewsCard flex-row">
                      <div className="image">
                        <div className="rounded-circle">
                          <img src="https://nest-frontend-v6.vercel.app/assets/imgs/blog/author-4.png" />
                        </div>
                        <span className="text-g d-block text-center font-weight-bold">
                          aarohi
                        </span>
                      </div>

                      <div className="info pl-5">
                        <div className="d-flex align-items-center">
                          <h5 className="text">December 4, 2024 at 3:12 pm</h5>
                          <div className="ml-auto">
                            <Rating
                              name="half-rating-read"
                              defaultValue={4.5}
                              precision={0.5}
                              readOnly
                            />
                          </div>
                        </div>

                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Delectus, suscipit exercitationem accusantium
                          obcaecati quos voluptate nesciunt facilis itaque modi
                          commodi dignissimos sequi repudiandae minus ab
                          deleniti totam officia id incidunt?
                        </p>
                      </div>
                    </div>

                    <br />

                    <br />

                    <form className="reviewForm ">
                      <h4>Add a review</h4> <br />
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          placeholder="write a review"
                        ></textarea>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Name"
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Email"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Website"
                        />
                      </div>
                      <br />
                      <div className="form-group">
                        <Button className="btn-g btn-lg">Submit Review</Button>
                      </div>
                    </form>
                  </div>

                  <div className="col-md-4 pl-5">
                    <h4>Customer Reviews</h4>

                    <div className="d-flex align-items-center mt-2">
                      <Rating
                        name="half-rating-read"
                        defaultValue={4.5}
                        precision={0.5}
                        readOnly
                      />
                      <strong className="ml-3">4.5 out of 5</strong>
                    </div>

                    <br />
                    <div className="progressBarBox d-flex align-items-center">
                      <span className="mr-3">5 Star</span>
                      <div
                        className="progress"
                        style={{ width: "85%", height: "20px" }}
                      >
                        <div
                          className="progress-bar bg-success"
                          style={{ width: "75%", height: "20px" }}
                        >
                          75%
                        </div>
                      </div>
                    </div>

                    <div className="progressBarBox d-flex align-items-center">
                      <span className="mr-3">4 Star</span>
                      <div
                        className="progress"
                        style={{ width: "85%", height: "20px" }}
                      >
                        <div
                          className="progress-bar bg-success"
                          style={{ width: "65%", height: "20px" }}
                        >
                          65%
                        </div>
                      </div>
                    </div>

                    <div className="progressBarBox d-flex align-items-center">
                      <span className="mr-3">3 Star</span>
                      <div
                        className="progress"
                        style={{ width: "85%", height: "20px" }}
                      >
                        <div
                          className="progress-bar bg-success"
                          style={{ width: "55%", height: "20px" }}
                        >
                          55%
                        </div>
                      </div>
                    </div>

                    <div className="progressBarBox d-flex align-items-center">
                      <span className="mr-3">2 Star</span>
                      <div
                        className="progress"
                        style={{ width: "85%", height: "20px" }}
                      >
                        <div
                          className="progress-bar bg-success"
                          style={{ width: "35%", height: "20px" }}
                        >
                          35%
                        </div>
                      </div>
                    </div>

                    <div className="progressBarBox d-flex align-items-center">
                      <span className="mr-3">1 Star</span>
                      <div
                        className="progress"
                        style={{ width: "85%", height: "20px" }}
                      >
                        <div
                          class="progress-bar bg-success"
                          style={{ width: "  25%", height: "20px" }}
                        >
                          25%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <br />
        <div className="relatedProducts pt-5 pb-4 ">
          <h2 className="hd mb-0 mt-0 ">Related Products</h2>
          <br />
          <Slider {...related} className="productSlider">
            <div className="item">
              <Product tag="sale" />
            </div>
            <div className="item">
              <Product tag="hot" />
            </div>
            <div className="item">
              <Product tag="new" />
            </div>
            <div className="item">
              <Product tag="sale" />
            </div>
            <div className="item">
              <Product tag="sale" />
            </div>
            <div className="item">
              <Product tag="best" />
            </div>
          </Slider>
        </div>
      </div>
    </secction>
  );
};

export default DetailsPage;
