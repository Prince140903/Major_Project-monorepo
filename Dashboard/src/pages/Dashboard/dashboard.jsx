import React, { useState, useEffect } from "react";
import "./dashboard.css";

import { Box } from "../../components";
import { DynamicIcon } from "../../constants";
import { PieChart } from "@mui/x-charts/PieChart";

import {
  Button,
  FormControl,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import { fetchDataFromApi } from "../../utils/api";
import LazyLoad from "react-lazyload";

const Dashboard = () => {
  const desktopOS = [
    { id: "Windows", value: 50 },
    { id: "macOS", value: 30 },
    { id: "Linux", value: 20 },
  ];

  const valueFormatter = (value) => `${value}%`;

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
    // setPage(1);
  };
  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
    setPage(1);
  };

  return (
    <>
      <div className="right-content w-100 ">
        <div className="row boxRow">
          <div className="col-md-8">
            <div className="boxWrapper d-flex">
              <Box
                choice={true}
                color={["#1da256", "#48d483"]}
                grow={true}
                icon={<DynamicIcon iconName="AccountCircleOutlined" />}
              />
              <Box
                choice={true}
                color={["#c012e2", "#eb64fe"]}
                icon={<DynamicIcon iconName="ShoppingCartOutlined" />}
              />
              <Box
                choice={true}
                color={["#2c78e5", "#60aff5"]}
                icon={<DynamicIcon iconName="LocalMallOutlined" />}
              />
              <Box
                choice={true}
                grow={true}
                color={["#e1950e", "#f3cd29"]}
                icon={<DynamicIcon iconName="StarsOutlined" />}
              />
            </div>
          </div>

          <div className="col-md-4 pl-0">
            <div className="box graphBox">
              <div className="w-100 bottomEle">
                <h6 className="text-white mb-0">Total Sales</h6>
                <h2 className="text-white">₹3,00,000</h2>
                <PieChart
                  series={[
                    {
                      data: desktopOS,
                      highlightScope: { fade: "global", highlight: "item" },
                      faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: "gray",
                      },
                      valueFormatter,
                    },
                  ]}
                  height={200}
                  width={400}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow border-0 p-3">
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
                  <th>COMPANY</th>
                  <th>CATEGORY</th>
                  <th>SUB-CATEGORY</th>
                  <th>PRICE</th>
                  <th>RATING</th>
                  <th>SALES</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {products.length !== 0 ? (
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
                                  className="w-100"
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
                      <td>{product.company}</td>
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

export default Dashboard;
