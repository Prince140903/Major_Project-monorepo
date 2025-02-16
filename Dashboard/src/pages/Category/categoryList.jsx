import React, { useContext, useEffect, useState } from "react";

import { fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";
import { DynamicIcon } from "../../constants";
import { Breadcrumbs, styled, emphasize, Chip, Button } from "@mui/material";

const CategoryList = () => {
  const [catData, setCatData] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    context.setProgress(20);
    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res);
      context.setProgress(100);
    });
  });

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
          <h5 className="mb-0">Category List</h5>
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
            <Button className="btn-blue mr-4 ml-2 p-2 w-100">
              ADD CATEGORY
            </Button>
          </Breadcrumbs>
        </div>

        <div className="card shadow border-0 p-3">
          <h3 className="hd">Category List</h3>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
