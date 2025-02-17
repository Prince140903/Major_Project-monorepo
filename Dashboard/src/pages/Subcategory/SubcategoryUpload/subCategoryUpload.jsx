import React, { useState, useContext, useEffect } from "react";

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
  deleteData,
} from "../../../utils/api";
import { MyContext } from "../../../App";

const SubCategoryUpload = () => {
  // const [isLoading, setIsLoading] = useState(false);
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

  //   useEffect(() => {
  //     fetchDataFromApi("/api/imageUpload").then((res) => {
  //       res?.map((item) => {
  //         item?.images?.map((img) => {
  //           deleteImages(`/api/products/deleteImages?img=${img}`).then((res) => {
  //             deleteData("/api/imageUpload/deleteAllImages");
  //           });
  //         });
  //       });
  //     });
  //   }, []);

  const addProduct = (e) => {
    e.preventDefault();
  };

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

  // const [userImages, setUserImages] = useState([]);

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

          // console.log(...formData);
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
        console.log("Response", response);

        if (
          response !== undefined &&
          response !== null &&
          response.length !== 0 &&
          response !== ""
        ) {
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
          console.log("Response not found");
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

  //   const handleRemoveImg = async (index, imgUrl) => {
  //     const imgIndex = previews.indexOf(imgUrl);

  //     deleteImages(`/api/product/deleteImage?img=${imgUrl}`).then((res) => {
  //       context.setAlertBox({
  //         open: true,
  //         error: false,
  //         msg: "Image Deleted!",
  //       });
  //     });

  //     if (imgIndex > -1) {
  //       previews.splice(index, 1);
  //     }

  //     // setUserImages(userImages.filter((_, i) => i !== index));
  //   };

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
          <h5 className="mb-0">Subcategory Upload</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="/"
              label="Dashboard"
              icon={<DynamicIcon iconName="Home" />}
            />
            <StyledBreadcrumb
              component="a"
              href="/subcategory-list"
              label="SubCategory"
            />
            <StyledBreadcrumb
              component="a"
              href="/subcategory-upload"
              label="SubCategory Upload"
            />
          </Breadcrumbs>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="card p-4">
              <h5>Basic Information</h5>
              <form className="form">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Subcategory Name</label>
                      <input
                        type="text"
                        placeholder="Type here"
                        value={formFields.name}
                        onChange={changeInput}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Subcategory Color</label>
                      <input type="text" placeholder="Enter value" />
                    </div>
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

          <Button onClick={addProduct} className="btn-blue p-3">
            <DynamicIcon iconName="CloudUpload" className="mr-2" />
            Publish and View
          </Button>
        </div>
      </div>
    </>
  );
};

export default SubCategoryUpload;
