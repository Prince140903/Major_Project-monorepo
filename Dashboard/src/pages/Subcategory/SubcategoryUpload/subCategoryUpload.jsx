import React, { useState, useContext, useEffect } from "react";

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
import { fetchDataFromApi, postData } from "../../../utils/api";
import { MyContext } from "../../../App";

const SubCategoryUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [catData, setCatData] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [categoryVal, setCategoryVal] = useState("");
  const Context = useContext(MyContext);
  const history = useNavigate();
  const [formFields, setFormFields] = useState({
    name: "",
    parentId: "",
  });

  useEffect(() => {
    Context.setProgress(20);
    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res);
      Context.setProgress(100);
    });
  }, []);

  const changeInput = (e) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChange = (event) => {
    setCategoryVal(event.target.value);
    setFormFields((prevFields) => ({
      ...prevFields,
      parentId: event.target.value,
    }));
  };

  const addSubCat = (e) => {
    e.preventDefault();

    if (formFields.name !== "" && formFields.parentId !== "") {
      setIsLoading(true);

      postData("/api/category/create", formFields)
        .then((res) => {
          setIsLoading(false);
          Context.fetchCategory();

          history("/subcategory-list");
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

  // const selectCat = (cat, id) => {
  //   formFields.parentId = id;
  // };

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
                      <label>Parent Category Name</label>
                      <Select
                        value={categoryVal}
                        onChange={handleChange}
                        className="select-dropdown"
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">
                          <em value="null">None</em>
                        </MenuItem>
                        {catData?.categoryList?.map((cat, index) => {
                          return (
                            <MenuItem
                              className="text-capitalize"
                              value={cat._id}
                              key={index}
                            >
                              {capitalize(cat.name)}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Subcategory Name</label>
                      <input
                        type="text"
                        placeholder="Enter value"
                        name="name"
                        value={formFields.name}
                        onChange={changeInput}
                      />
                    </div>
                  </div>
                </div>
                <div className="row w-100 pt-3">
                  <div className="col-sm-12">
                    <Button
                      onClick={(e) => {
                        addSubCat(e);
                      }}
                      className="btn-blue p-3"
                    >
                      {isLoading === true ? (
                        <CircularProgress color="inherit" className="w-100" />
                      ) : (
                        <>
                          <DynamicIcon
                            iconName="CloudUpload"
                            className="mr-2"
                          />
                          Publish and View
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubCategoryUpload;
