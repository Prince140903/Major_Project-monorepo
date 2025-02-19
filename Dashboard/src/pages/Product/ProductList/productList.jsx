import React, { useState, useEffect } from "react";
import "./productList.css";

import { DynamicIcon } from "../../../constants";
import { Box } from "../../../components";
import {
  Button,
  Breadcrumbs,
  styled,
  emphasize,
  Chip,
  FormControl,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import { fetchDataFromApi } from "../../../utils/api";
import LazyLoad from "react-lazyload";

const ProductList = () => {
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

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const [company, setCompany] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selection, setSelection] = useState("Featured");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const Sorted = await fetchDataFromApi(
          `/api/products/filter?page=${page}&limit=${limit}&search=${searchQuery}&company=${company}&selection=${selection}`
        );

        const { products, total } = Sorted;

        if (!products || products.length === 0) {
          setTotalProducts(0);
          setProducts([]);
          return;
        }

        setProducts(products); // Update products
        setTotalProducts(total); // Update total count
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.warn("API returned 404: Not Found.");
          setProducts([]);
          setTotalProducts(0);
        } else {
          console.error("Error fetching search results:", error);
        }
      }
    };

    fetchProducts();
  }, [page, limit, company, searchQuery, selection]);

  const handleSelection = (event) => {
    setSelection(event.target.value);
    setPage(1);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
    setPage(1);
  };

  return (
    <>
      <div className="right-content w-100 ">
        <div className="card shadow border-0 w-100 flex-row p-4 m-0">
          <h5 className="mb-0">Product List</h5>
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
              href="/product-list"
              label="Product List"
            />
          </Breadcrumbs>
        </div>

        <div className="row pt-4 pb-4">
          <div className="col-md-4">
            <Box
              color={["#64b3f6", "#2b77e5"]}
              icon={
                <DynamicIcon
                  iconName="ShoppingBag"
                  style={{ color: "#96cefa" }}
                />
              }
            />
          </div>
          <div className="col-md-4">
            <Box
              color={["#ed68ff", "#be0ee1"]}
              icon={
                <DynamicIcon iconName="Category" style={{ color: "#f3a0ff" }} />
              }
            />
          </div>
          <div className="col-md-4">
            <Box
              color={["#4eda89", "#1a9f53"]}
              icon={
                <DynamicIcon iconName="Beenhere" style={{ color: "#89ecb3" }} />
              }
            />
          </div>
        </div>

        <div className="card shadow border-0 p-3 mt-0">
          <h3 className="hd">Best Selling Products</h3>

          <div className="row cardFilters mt-3">
            <div className="col-md-3">
              <h4>Show by</h4>
              <FormControl size="small" className="w-100">
                <Select
                  labelId="select1-label"
                  id="select1"
                  value={limit}
                  onChange={handleLimitChange}
                  className="w-100 drop"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3">
              <h4>Select Company</h4>
              <FormControl size="small" className="w-100">
                <Select
                  labelId="select2-label"
                  id="select2"
                  value={company}
                  onChange={handleCompanyChange}
                  className="w-100 drop"
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Amazon">Amazon</MenuItem>
                  <MenuItem value="Flipkart">Flipkart</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3">
              <h4>Sort by</h4>
              <FormControl size="small" className="w-100">
                <Select
                  labelId="select3-label"
                  id="select3"
                  value={selection}
                  onChange={handleSelection}
                  className="w-100  drop"
                >
                  <MenuItem value="Featured">Featured</MenuItem>
                  <MenuItem value="Low->High">Price: Low to High</MenuItem>
                  <MenuItem value="High->Low">Price: High to Low</MenuItem>
                  <MenuItem value="Popular">Popular</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3">
              <h4>Search by</h4>
              <FormControl size="small" className="w-100 form-group">
                <input
                  type="text"
                  name="search"
                  placeholder="Enter name"
                  onChange={handleSearch}
                  value={searchQuery}
                />
              </FormControl>
            </div>
          </div>

          <div className="table-responsive mt-3">
            <table className="table table-bordered v-align">
              <thead className="thead-dark">
                <tr>
                  <th>UID</th>
                  <th>PRODUCT</th>
                  <th>CATEGORY</th>
                  <th>SUB-CATEGORY</th>
                  <th>PRICE</th>
                  <th>RATING</th>
                  <th>SALES</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {/* {filteredProducts.slice(0, limit).map((product, index) => ( */}
                {products.length !== 0 ? (
                  // products.map((product, index) => (
                  products.map((product, index) => (
                    <tr key={index}>
                      <td>{(page - 1) * limit + index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center productBox">
                          <div className="imgWrapper">
                            <div className="img">
                              <LazyLoad>
                                <img
                                  src={
                                    product.images[0] ||
                                    "https://i.ibb.co/GQmxxNg/images.png"
                                  }
                                  alt="product-img"
                                  className="prod-list"
                                  onError={(e) => {
                                    e.target.onError = null;
                                    e.target.src =
                                      "https://i.ibb.co/GQmxxNg/images.png";
                                  }}
                                />
                              </LazyLoad>
                            </div>
                          </div>
                          <div className="info">
                            <h6>{product.name}</h6>
                            <p>{product.link}</p>
                          </div>
                        </div>
                      </td>
                      <td>{product.main_category}</td>
                      <td>{product.sub_category}</td>
                      <td>
                        <del className="old">₹ {product.actual_price}</del>
                        <span className="new text-success">
                          ₹ {product.discount_price}
                        </span>
                      </td>
                      <td>{product.ratings}</td>
                      <td>{product.no_of_ratings}</td>
                      <td>
                        <div className="d-flex actions align-items-center">
                          <Button color="secondary" className="secondary">
                            <DynamicIcon iconName="Visibility" />
                          </Button>
                          <Button color="success" className="success">
                            <DynamicIcon iconName="Create" />
                          </Button>
                          <Button color="error" className="error">
                            <DynamicIcon iconName="Delete" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <>
                    <tr>
                      <td>No Data Found</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>

            <div className="d-flex tableFooter">
              <p>
                showing <b>{products.length}</b> results
              </p>
              <Pagination
                count={Math.ceil(totalProducts / limit)}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                color="primary"
                showFirstButton
                showLastButton
                className="ml-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;

// const fetchProducts = async () => {
//   try {
//     const data = await fetchDataFromApi(
//       `/api/products?page=${page}&limit=${limit}&company=${company}`
//     );
//     setProducts(data.products);
//     setTotalProducts(data.total);
//   } catch (error) {
//     console.log(error);
//   }
// };
