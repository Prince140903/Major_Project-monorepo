import React, { useState, useContext, useEffect } from "react";
import "./productUpload.css";

import {
  Button,
  Breadcrumbs,
  styled,
  emphasize,
  Chip,
  MenuItem,
  Select,
  CircularProgress,
  capitalize,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DynamicIcon } from "../../../constants";
import {
  uploadImage,
  fetchDataFromApi,
  deleteImages,
  deleteData,
  postData,
} from "../../../utils/api";
import { MyContext } from "../../../App";
import { Link } from "react-router-dom";

const ProductUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [categoryVal, setCategoryVal] = useState("");
  const [subCatVal, setSubCatVal] = useState("");
  const [tagInput, setTagInput] = useState("");
  const Context = useContext(MyContext);
  const formData = new FormData();
  const history = useNavigate();
  const [catData, setCatData] = useState([]);
  const [subCatData, setSubCatData] = useState([]);
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
    main_category: "",
    sub_category: "",
    actual_price: "",
    discount_price: "",
    ratings: 0.0,
    no_of_ratings: 0,
    product_link: "",
    tags: [],
    description: "",
  });

  useEffect(() => {
    fetchDataFromApi("/api/imageUpload").then((res) => {
      res?.map((item) => {
        item?.images?.map((img) => {
          deleteImages(`/api/products/deleteImages?img=${img}`).then((res) => {
            deleteData("/api/imageUpload/deleteAllImages");
          });
        });
      });
    });
  }, []);

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res);
    });
  }, [categoryVal]);

  const addProd = (e) => {
    e.preventDefault();

    const appendedArray = [...previews, ...uniqueArray];
    img_arr = [];

    formFields.images = appendedArray;

    if (previews.length !== 0) {
      setIsLoading(true);

      postData("/api/products/create", formFields)
        .then((res) => {
          setIsLoading(false);
          Context.fetchProducts();

          deleteData("/api/imageupload/deleteAllImages");

          Context.setAlertBox({
            open: true,
            error: false,
            msg: "Product added successfully!",
          });
          history("/product-list");
        })
        .catch((error) => {
          setIsLoading(false);
          Context.setAlertBox({
            open: true,
            error: true,
            msg: "Error creating Product",
          });
          console.error("Error creating Product:", error);
        });
    } else {
      Context.setAlertBox({
        open: true,
        error: true,
        msg: "Fill all details first!!",
      });
      return false;
    }
  };

  const changeInput = (e) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [e.target.name]: e.target.value,
    }));
  };

  let img_arr = [];
  let uniqueArray = [];
  let selectedImages = [];

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      const files = e.target.files;
      setUploading(true);

      for (var i = 0; i < files.length; i++) {
        //Validate files
        if (files[i]) {
          const file = files[i];
          selectedImages.push(file);
          formData.append("images", file);
        } else {
          Context.setAlertBox({
            open: true,
            error: true,
            msg: "Please select a valid JPG or PNG image file",
          });
        }
      }

      formFields.images = selectedImages;
    } catch (error) {
      console.log(error);
    }

    uploadImage(apiEndPoint, formData).then((res) => {
      fetchDataFromApi("/api/imageUpload").then((response) => {
        if (response !== undefined && response !== null && response !== "") {
          response.length !== 0 &&
            response.map((item) => {
              item?.images.length !== 0 &&
                item?.images.map((img) => {
                  img_arr.push(img);
                });
            });

          uniqueArray = img_arr.filter(
            (item, index) => img_arr.indexOf(item) === index
          );

          const appendArray = [...previews, ...uniqueArray];

          setPreviews(appendArray);
          setTimeout(() => {
            setUploading(false);
            img_arr = [];
            Context.setAlertBox({
              open: true,
              error: false,
              msg: "Image uploaded!",
            });
          }, 200);
        } else {
          console.log("Response not found");
        }
      });
    });
  };

  const handleRemoveImg = async (index, imgUrl) => {
    const imgIndex = previews.indexOf(imgUrl);

    deleteImages(`/api/product/deleteImage?img=${imgUrl}`).then((res) => {
      Context.setAlertBox({
        open: true,
        error: false,
        msg: "Image Deleted!",
      });
    });

    if (imgIndex > -1) {
      previews.splice(index, 1);
    }
  };

  const handleChange1 = (event) => {
    const selectedCategory = event.target.value;
    setCategoryVal(selectedCategory);

    const selectedCat = catData?.categoryList?.find(
      (cat) => cat.name === selectedCategory
    );

    setSubCatData(selectedCat?.children || []);

    setFormFields((prevFields) => ({
      ...prevFields,
      main_category: selectedCategory,
      sub_category: "",
    }));
  };
  const handleChange2 = (event) => {
    setSubCatVal(event.target.value);
    setFormFields((prevFields) => ({
      ...prevFields,
      sub_category: event.target.value,
    }));
  };

  const handleInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() === "") return; // Prevent empty tag
    if (formFields.tags.includes(tagInput.trim())) return; // Prevent duplicates

    setFormFields((prev) => ({
      ...prev,
      tags: [...prev.tags, tagInput.trim()], // Add new tag to the array
    }));

    setTagInput(""); // Clear input field
  };

  const handleRemoveTag = (index) => {
    setFormFields((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index), // Remove tag by index
    }));
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

  return (
    <>
      <div className="w-100 right-content">
        <div className="card shadow border-0 w-100 flex-row p-4 m-0">
          <h5 className="mb-0">Product Upload</h5>
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
              href="/product-upload"
              label="Product Upload"
            />
          </Breadcrumbs>
        </div>

        <div className="row">
          <div className="col-sm-7">
            <div className="card p-4">
              <h5>Basic Information</h5>
              <form className="form">
                <div className="form-group">
                  <label>PRODUCT NAME</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    value={formFields.name}
                    name="name"
                    onChange={changeInput}
                  />
                </div>
                <div className="form-group">
                  <label>DESCRIPTION</label>
                  <textarea
                    type="text"
                    placeholder="Type here"
                    rows={2}
                    cols={10}
                    name="description"
                    value={formFields.description}
                    onChange={changeInput}
                  />
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>REGULAR PRICE</label>
                      <input
                        type="number"
                        name="actual_price"
                        placeholder="Type here"
                        value={formFields.actual_price}
                        onChange={changeInput}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>DISCOUNT PRICE</label>
                      <input
                        type="number"
                        placeholder="Type here"
                        name="discount_price"
                        value={formFields.discount_price}
                        onChange={changeInput}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>SHIPPING FEES</label>
                      <input type="number" placeholder="Enter value" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>TAX RATE</label>
                      <input type="number" placeholder="Enter value" />
                    </div>
                  </div>
                  <div className="col-sm-9">
                    <div className="form-group">
                      <label>TAGS</label>
                      <input
                        type="text"
                        placeholder="Type here"
                        value={tagInput}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 d-flex align-items-center pt-3">
                    <Button
                      className="btn-blue p-2 w-100"
                      onClick={handleAddTag}
                    >
                      ADD
                    </Button>
                  </div>

                  {/* Preview Section */}
                  <div className="col-12 mt-3">
                    {formFields.tags.map((tag, index) => (
                      <span key={index} className="btn btn-blue m-1">
                        {tag}{" "}
                        <button
                          type="button"
                          className="btn btn-sm btn-danger ml-1"
                          onClick={() => handleRemoveTag(index)}
                        >
                          x
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-5">
            <div className="card p-4">
              <h5>Organization</h5>
              <form className="form">
                <div className="row pt-4">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>ADD CATEGORY</label>
                      <Select
                        value={categoryVal}
                        onChange={handleChange1}
                        className="select-dropdown"
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">
                          <em value="null">None</em>
                        </MenuItem>
                        {catData?.categoryList?.map((cat, index) => (
                          <MenuItem value={cat.name} key={index}>
                            {capitalize(cat.name)}
                          </MenuItem>
                        ))}
                        <MenuItem>
                          <Button className="btn-blue mr-4 ml-2 p-2">
                            <Link to="/category-upload">➕ ADD CATEGORY</Link>
                          </Button>
                        </MenuItem>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>ADD SUB-CATEGORY</label>
                      <Select
                        value={subCatVal}
                        onChange={handleChange2}
                        className="select-dropdown"
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">
                          <em value="null">None</em>
                        </MenuItem>
                        {subCatData?.map((subCat, index) => (
                          <MenuItem value={subCat.name} key={index}>
                            {capitalize(subCat.name)}
                          </MenuItem>
                        ))}
                        <MenuItem>
                          <Button className="btn-blue mr-4 ml-2 p-2">
                            <Link to="/subcategory-upload">
                              ➕ ADD SUB-CATEGORY
                            </Link>
                          </Button>
                        </MenuItem>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col-md-9">
                    <div className="form-group">
                      <label>ADD COLOR</label>
                      <input type="text" placeholder="Type here" />
                    </div>
                  </div>
                  <div className="col-md-3 d-flex align-items-center">
                    <Button className="btn-blue p-2 mt-4 w-100">ADD</Button>
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col-md-9">
                    <div className="form-group">
                      <label>ADD SIZE</label>
                      <input type="text" placeholder="Type here" />
                    </div>
                  </div>
                  <div className="col-md-3 d-flex align-items-center">
                    <Button className="btn-blue p-2 mt-4 w-100">ADD</Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <h5>Media And Published</h5>
          <div
            className="row d-flex p-4"
            style={{ alignItems: "flex-start", gap: "20px" }}
            // onClick = {}
          >
            {uploading === true ? (
              <div className="progressBar text-center d-flex align-items-center justify-content-center flex-column">
                <CircularProgress />
                <span style={{ color: "var(--sidebar_color)" }}>
                  Uploading..
                </span>
              </div>
            ) : (
              <div className="imgUpload">
                <DynamicIcon iconName="Collections" className="imagebg" />
                <label htmlFor="imageInput" className="label-size">
                  Upload image
                </label>
                <input
                  type="file"
                  className="p-4 img"
                  id="imageInput"
                  accept="image/*"
                  multiple
                  onChange={(e) => onChangeFile(e, "/api/products/upload")}
                  name="images"
                  style={{ display: "none" }}
                />
              </div>
            )}

            {/*Preview Section*/}
            <div className="imgPreview">
              {previews?.length !== 0 &&
                previews?.map((img, index) => {
                  return (
                    <div
                      key={index}
                      style={{ position: "relative" }}
                      className="imgView"
                    >
                      <div
                        className="remove"
                        onClick={() => handleRemoveImg(index, img)}
                      >
                        <DynamicIcon iconName="Delete" />
                      </div>
                      <img
                        src={img}
                        effect="blur"
                        alt={`Upload ${index}`}
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "5px",
                        }}
                      />
                    </div>
                  );
                })}
            </div>
          </div>

          <Button
            onClick={(e) => {
              addProd(e);
            }}
            className="btn-blue p-3"
          >
            {isLoading === true ? (
              <CircularProgress color="inherit" className="loader" />
            ) : (
              <>
                <DynamicIcon iconName="CloudUpload" className="mr-2" />
                Publish and View
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductUpload;
