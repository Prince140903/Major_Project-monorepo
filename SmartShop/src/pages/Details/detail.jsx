import { React, useRef, useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./detail.css";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
import Slider from "react-slick";
import { Button, capitalize, Rating } from "@mui/material";
import { Product } from "../../components";
import { NotFound } from "../../pages";
import { fetchDataFromApi, postData, trackInteraction } from "../../utils/api";
import { DynamicIcon } from "../../constants";
import { MyContext } from "../../App";

const DetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const [bigImageSize, setBigImageSize] = useState([1500, 1500]);
  const [zoomImage, setZoomImage] = useState("");

  const Context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const user = Context.user;
  const history = useNavigate();
  const hasTrackedView = useRef(false);

  const [cart, setCart] = useState([]);
  const [userWishlist, setUserWishlist] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const zoomSlider = useRef();
  const zoomSliderBig = useRef();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetchDataFromApi(`/api/products/${id}`); // Fetching product data
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const Prods = await fetchDataFromApi(`/api/products/filter`);

        const { products, total } = Prods;

        if (!products || products.length === 0) {
          setProducts([]);
          return;
        }
        setProducts(products);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.warn("API returned 404: Not Found.");
          setProducts([]);
        } else {
          console.error("Error fetching search results:", error);
        }
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setZoomImage(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    if (user && product && !hasTrackedView.current) {
      trackInteraction(user.userId, product._id, "view");
      hasTrackedView.current = true;
    }
  }, [user, product]);

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

  const addToCart = async () => {
    if (user && product) {
      trackInteraction(user.userId, product._id, "cart");
    }

    try {
      const userId = Context.user?.userId;
      const productData = {
        productId: product._id,
        name: product.name,
        actual_price: product.actual_price,
        discount_price: product.discount_price,
        delivery: product.delivery,
        quantity: quantity,
        image: product.images[0],
      };

      postData("/api/cart/add", { userId, product: productData })
        .then((res) => {
          if (res.error !== true) {
            Context.setAlertBox({
              open: true,
              error: false,
              msg: "Product added in Cart!",
            });
            setCart(res);
            setIsLoading(true);

            setTimeout(() => {
              history("/");
            }, 200);
          } else {
            setIsLoading(false);
            Context.setAlertBox({
              open: true,
              error: true,
              msg: res.msg,
            });
          }
        })
        .catch((error) => {
          console.error("API Error:", error);
          setIsLoading(false);
          Context.setAlertBox({
            open: true,
            error: true,
            msg: "Something went wrong during adding product.",
          });
        });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  const addToWishlist = async () => {
    if (user && product) {
      trackInteraction(user.userId, product._id, "wishlist");
    }

    try {
      const userId = Context.user?.userId;
      const productData = {
        productId: product._id,
        name: product.name,
        actual_price: product.actual_price,
        discount_price: product.discount_price,
        delivery: product.delivery,
        quantity: quantity,
        image: product.images[0],
      };

      postData("/api/wishlist/add", { userId, product: productData })
        .then((res) => {
          if (res.error !== true) {
            Context.setAlertBox({
              open: true,
              error: false,
              msg: "Product added in Wishlist!",
            });
            setUserWishlist(res);
            setIsLoading(true);

            // setTimeout(() => {
            //   history("/");
            // }, 200);
          } else {
            setIsLoading(false);
            Context.setAlertBox({
              open: true,
              error: true,
              msg: res.msg,
            });
          }
        })
        .catch((error) => {
          console.error("API Error:", error);
          setIsLoading(false);
          Context.setAlertBox({
            open: true,
            error: true,
            msg: "Something went wrong during adding product.",
          });
        });
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      alert("Failed to add product to wishlist.");
    }
  };

  if (!product) return <NotFound />;

  return (
    <section className="detailspage mb-5">
      <div className="breadcrumbWrapper mb-4">
        <div className="container-fluid">
          <ul className="breadcrumb breadcrumb2  mb-0">
            <li>
              <Link to={"/"}>Home </Link>
            </li>
            <li>
              <Link>{capitalize(product.main_category)}</Link>
            </li>

            <li>{capitalize(product.sub_category)}</li>
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
                {product.images.map((img, index) => (
                  <div className="item" key={index}>
                    <InnerImageZoom
                      zoomType="hover"
                      zoomScale={1}
                      src={`${img}?im=Resize=(${bigImageSize[0]},${bigImageSize[1]})`}
                      onClick={() => goto(img, index)}
                    />
                  </div>
                ))}
              </Slider>
            </div>

            {/*slider 1*/}
            <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
              {product.images.map((img, index) => (
                <div className="item" key={index}>
                  <img
                    src={`${img}?im=Resize=(${bigImageSize[0]},${bigImageSize[1]})`}
                    className="w-100"
                    onClick={() => goto(img, index)}
                  />
                </div>
              ))}
            </Slider>
          </div>
          {/* productZoom end  here */}

          <div className="col-md-7 productInfo ">
            {/* productInfo start here */}
            <h1>{product.name}</h1>
            <div className="d-flex-align-items-center mb-4 mt-3">
              <Rating
                name="half-rating-read"
                value={Math.round(parseFloat(product.ratings) * 2) / 2}
                precision={0.5}
                readOnly
              />
              <span className="text-muted pl-3">
                ({product.no_of_ratings} reviews)
              </span>
            </div>
            <div className="d-flex-align-items-center mb-4 mt-3">
              <span className="mark pl-3">By {product.company}</span>
            </div>
            <div className="priceSec d-flex align-items-center mb-3">
              <span className="text-g priceLarge">
                ₹ {product.discount_price}
              </span>
              <div className="ml-2 d-flex column">
                <span className="text-org">
                  {(
                    ((product.actual_price - product.discount_price) /
                      product.actual_price) *
                    100
                  ).toFixed(0)}
                  % Off
                </span>

                <span className="OldPrice">₹ {product.actual_price}</span>
              </div>
            </div>

            <p className="text-muted">{product.description}</p>

            <div className="addCartSection pt-4 pb-4 d-flex align-items-center">
              <div className="counterSec mr-3">
                <input type="number" value={quantity} readOnly />

                <span
                  className="arrow plus"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <DynamicIcon iconName="KeyboardArrowUp" />
                </span>
                <span
                  className="arrow minus"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <DynamicIcon iconName="KeyboardArrowDown" />
                </span>
              </div>

              <Button
                className="btn-g btn-lg addtocartbtn "
                onClick={() => addToCart()}
              >
                <DynamicIcon iconName="ShoppingCartOutlined" />
                Add to Cart
              </Button>
              <Button
                className=" btn-lg addtocartbtn ml-3 btn-border"
                onClick={() => addToWishlist()}
              >
                <DynamicIcon iconName="FavoriteBorderOutlined" />
              </Button>
              <Button className=" btn-lg addtocartbtn ml-3 btn-border">
                <Link to={"/compare"}>
                  <DynamicIcon iconName="CompareArrowsOutlined" />
                </Link>
              </Button>

              {/* productInfo end here */}
            </div>
          </div>
        </div>

        <br />
        <div className="relatedProducts pt-5 pb-4 ">
          <h2 className="hd mb-0 mt-0 ">Related Products</h2>
          <br />
          <Slider {...related} className="productSlider">
            {products?.length !== 0 &&
              products.map((prod, index) => (
                <div className="item" key={index}>
                  <Product
                    image={prod.images[0]}
                    tag={prod.company}
                    name={prod.name}
                    ratings={prod.ratings}
                    actual_price={prod.actual_price}
                    discount_price={prod.discount_price}
                    className="prod-img"
                  />
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default DetailsPage;