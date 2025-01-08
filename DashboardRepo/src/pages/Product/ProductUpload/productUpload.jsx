import React, { useState } from "react";
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
} from "@mui/material";
import { DynamicIcon } from "../../../constants";

const ProductUpload = () => {
  const [userImages, setUserImages] = useState([]);

  const handleImageUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const imageUrls = uploadedFiles.map((file) => URL.createObjectURL(file));
    setUserImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  const handleRemoveImg = (index) => {
    setUserImages(userImages.filter((_, i) => i !== index));
  };

  const [selectedValue, setSelectedValue] = useState("option1");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const [selectedValue2, setSelectedValue2] = useState("option1");

  const handleChange2 = (event) => {
    setSelectedValue2(event.target.value);
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
                  <input type="text" placeholder="Type here" />
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
                          value={selectedValue}
                          onChange={handleChange}
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
                          value={selectedValue2}
                          onChange={handleChange2}
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
                  <div className="col-md-9">
                    <div className="form-group">
                      <label>ADD CATEGORY</label>
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
                      <label>ADD BRAND</label>
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
          >
            <div
              className="imgUpload"
              onClick={() => document.getElementById("imageInput").click()}
            >
              <DynamicIcon iconName="Collections" className="imagebg" />
              <p>Upload image</p>
              <input
                type="file"
                className="p-4 img"
                id="imageInput"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>

            {/*Preview Section*/}
            <div className="imgPreview">
              {userImages.map((image, index) => (
                <div
                  key={index}
                  style={{ position: "relative" }}
                  className="imgView"
                >
                  <div
                    className="remove"
                    onClick={() => handleRemoveImg(index)}
                  >
                    <DynamicIcon iconName="Delete" />
                  </div>
                  <img
                    src={image}
                    alt={`Upload ${index}`}
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductUpload;
