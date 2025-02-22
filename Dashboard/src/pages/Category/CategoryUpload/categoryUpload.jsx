import React, { useState, useContext, useEffect } from "react";

import {
  Button,
  Breadcrumbs,
  styled,
  emphasize,
  Chip,
  CircularProgress,
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

const CategoryUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const Context = useContext(MyContext);
  const formData = new FormData();
  const history = useNavigate();
  const [previews, setPreviews] = useState([]);
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
    color: "",
    parentId: "",
    no_of_ratings: 0,
    ratings: 0.0,
    link: "",
  });

  useEffect(() => {
    fetchDataFromApi("/api/imageUpload").then((res) => {
      res?.map((item) => {
        item?.images?.map((img) => {
          deleteImages(`/api/category/deleteImage?img=${img}`).then((res) => {
            deleteData("/api/imageUpload/deleteAllImages");
          });
        });
      });
    });
  }, []);

  const addCat = (e) => {
    e.preventDefault();

    const appendedArray = [...previews, ...uniqueArray];
    img_arr = [];

    formFields.images = appendedArray;

    if (
      formFields.name !== "" &&
      formFields.color !== "" &&
      previews.length !== 0
    ) {
      setIsLoading(true);

      postData("/api/category/create", formFields)
        .then((res) => {
          setIsLoading(false);
          Context.fetchCategory();

          deleteData("/api/imageupload/deleteAllImages");

          history("/category-list");
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error creating category:", error);
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
    const { name, value } = e.target;

    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
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

          const appendedArray = [...previews, ...uniqueArray];

          setPreviews(appendedArray);
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

    deleteImages(`/api/category/deleteImage?img=${imgUrl}`).then((res) => {
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
          <h5 className="mb-0">Category Upload</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="/"
              label="Dashboard"
              icon={<DynamicIcon iconName="Home" />}
            />
            <StyledBreadcrumb
              component="a"
              href="/category-list"
              label="Category"
            />
            <StyledBreadcrumb
              component="a"
              href="/category-upload"
              label="Category Upload"
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
                      <label>Category Name</label>
                      <input
                        type="text"
                        placeholder="Type here"
                        name="name"
                        value={formFields.name}
                        onChange={changeInput}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Category Color</label>
                      <input
                        type="text"
                        placeholder="Enter value"
                        name="color"
                        value={formFields.color}
                        onChange={changeInput}
                      />
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
                  onChange={(e) => onChangeFile(e, "/api/category/upload")}
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
              addCat(e);
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

export default CategoryUpload;
