import React, { useContext, useEffect, useState } from "react";

import { deleteData, fetchDataFromApi } from "../../../utils/api";
import { MyContext } from "../../../App";
import { DynamicIcon } from "../../../constants";
import { Breadcrumbs, styled, emphasize, Chip, Button } from "@mui/material";
import LazyLoad from "react-lazyload";

const SubCategoryList = () => {
  const [subCatData, setSubCatData] = useState([]);

  const Context = useContext(MyContext);

  useEffect(() => {
    Context.setProgress(20);
    fetchDataFromApi("/api/category").then((res) => {
      setSubCatData(res);
      Context.setProgress(100);
    });
  }, []);

  const deleteCat = (id) => {
    Context.setProgress(30);
    deleteData(`/api/category/${id}`).then((res) => {
      Context.setProgress(100);
      fetchDataFromApi("/api/category").then((res) => {
        setSubCatData(res);
        Context.setProgress(100);
        Context.setAlertbox({
          open: true,
          error: false,
          msg: "SubCategory Deleted!",
        });
      });
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
      <div className="right-content w-100 ">
        <div className="card shadow border-0 w-100 flex-row p-4 m-0">
          <h5 className="mb-0">Subcategory List</h5>
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
            <Button className="btn-blue mr-4 ml-2 p-2 w-100">
              ADD SUBCATEGORY
            </Button>
          </Breadcrumbs>
        </div>

        <div className="card shadow border-0 p-3">
          <h3 className="hd">Subcategory List</h3>
          <div className="table-responsive mt-3">
            <table className="table table-bordered v-align">
              <thead className="thead-dark">
                <tr>
                  <th>INDEX</th>
                  <th>IMAGE</th>
                  <th>CATEGORY</th>
                  <th>COLOR</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {catData?.categoryList?.length !== 0 &&
                  catData?.categoryList?.map((cat, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="imgWrapper">
                            <div className="img">
                              <LazyLoad>
                                <img
                                  src={cat?.images?.[0]}
                                  alt="product-img"
                                  className="prod-list"
                                />
                              </LazyLoad>
                            </div>
                          </div>
                        </td>
                        <td>{cat?.name}</td>
                        <td>{cat?.color}</td>
                        <td>
                          <div className="d-flex actions align-items-center">
                            <Button color="secondary" className="secondary">
                              <DynamicIcon iconName="Visibility" />
                            </Button>
                            <Button color="success" className="success">
                              <DynamicIcon iconName="Create" />
                            </Button>
                            <Button
                              color="error"
                              className="error"
                              onClick={() => deleteCat(cat._id)}
                            >
                              <DynamicIcon iconName="Delete" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubCategoryList;
