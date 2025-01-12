import React, { useState, useContext } from "react";
import "./productUpload.css";

import {
  Button,
  Breadcrumbs,
  styled,
  emphasize,
  Chip,
  MenuItem,
  Select,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DynamicIcon } from "../../../constants";
import {
  uploadImage,
  fetchDataFromApi,
  deleteImages,
} from "../../../utils/api";
import { MyContext } from "../../../App";

const ProductUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
    main_category: "",
    sub_category: "",
    actual_price: "",
    discount_price: "",
    extraData: "",
  });

  const context = useContext(MyContext);
  const formData = new FormData();
  const history = useNavigate();

  const changeInput = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };

  let img_arr = [];
  let uniqueArray = [];
  let selectedImages = [];

  const [previews, setPreviews] = useState([]);

  const [userImages, setUserImages] = useState([]);

  // const handleImageUpload = (e) => {
  //   const uploadedFiles = Array.from(e.target.files);
  //   const imageUrls = uploadedFiles.map((file) => URL.createObjectURL(file));
  //   setUserImages((prevImages) => [...prevImages, ...imageUrls]);
  // };

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
          // console.log(formData);
        } else {
          context.setAlertBox({
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
            context.setAlertBox({
              open: true,
              error: false,
              msg: "Image uploaded!",
            });
          }, 200);
        } else {
          console.log(error);
        }
      });
    });
  };

  const [selectedValues, setSelectedValues] = useState({
    select1: "option1",
    select2: "option1",
    select3: "option1",
    select4: "option1",
  });

  const handleRemoveImg = async (index, imgUrl) => {
    const imgIndex = previews.indexOf(imgUrl);

    deleteImages(`/api/product/deleteImage?img=${imgUrl}`).then((res) => {
      context.setAlertBox({
        open: true,
        error: false,
        msg: "Image Deleted!",
      });
    });

    if (imgIndex > -1) {
      previews.splice(index, 1);
    }

    // setUserImages(userImages.filter((_, i) => i !== index));
  };

  const handleChange = (name) => (event) => {
    setSelectedValues({
      ...selectedValues,
      [name]: event.target.value,
    });
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
                  <label>TITLE</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    onChange={changeInput}
                  />
                </div>
                <div className="form-group">
                  <label>DESCRIPTION</label>
                  <textarea
                    type="text"
                    placeholder="Type here"
                    rows={5}
                    cols={10}
                  />
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>REGULAR PRICE</label>
                      <FormControl fullWidth>
                        <Select
                          className="select-dropdown"
                          value={selectedValues.select1}
                          onChange={handleChange("select1")}
                        >
                          <MenuItem value="option1">Option 1</MenuItem>
                          <MenuItem value="option2">Option 2</MenuItem>
                          <MenuItem value="option3">Option 3</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>DISCOUNT PRICE</label>
                      <FormControl fullWidth>
                        <Select
                          className="select-dropdown"
                          value={selectedValues.select2}
                          onChange={handleChange("select2")}
                        >
                          <MenuItem value="option1">Option 1</MenuItem>
                          <MenuItem value="option2">Option 2</MenuItem>
                          <MenuItem value="option3">Option 3</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>REGULAR PRICE</label>
                      <input type="number" placeholder="Enter value" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>DISCOUNT PRICE</label>
                      <input type="number" placeholder="Enter value" />
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
                </div>
                <div className="form-group">
                  <label>TAGS</label>
                  <textarea
                    type="text"
                    placeholder="Type here"
                    rows={4}
                    cols={8}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-5">
            <div className="card p-4">
              <h5>Organization</h5>
              <form className="form">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>ADD CATEGORY</label>
                      <FormControl fullWidth>
                        <Select
                          className="select-dropdown"
                          value={selectedValues.select3}
                          onChange={handleChange("select3")}
                        >
                          <MenuItem value="option1">Option 1</MenuItem>
                          <MenuItem value="option2">Option 2</MenuItem>
                          <MenuItem value="option3">Option 3</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>ADD SUB-CATEGORY</label>
                      <FormControl fullWidth>
                        <Select
                          className="select-dropdown"
                          value={selectedValues.select3}
                          onChange={handleChange("select3")}
                        >
                          <MenuItem value="option1">Option 1</MenuItem>
                          <MenuItem value="option2">Option 2</MenuItem>
                          <MenuItem value="option3">Option 3</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
                <div className="row">
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
                <div className="row">
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
            <div className="card p-4">
              <h5>Specification</h5>
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
        </div>
      </div>
    </>
  );
};

export default ProductUpload;

// {userImages.map((image, index) => (
{
  /* <div key={index} style={{ position: "relative" }} className="imgView">
  <div className="remove" onClick={() => handleRemoveImg(index)}>
    <DynamicIcon iconName="Delete" />
  </div>
  <img
    src={img}
    alt={`Upload ${index}`}
    style={{
      width: "200px",
      height: "200px",
      objectFit: "cover",
      borderRadius: "5px",
    }}
  />
</div>; */
}
// ))}
