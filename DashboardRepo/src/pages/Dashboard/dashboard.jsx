import React, { useState } from "react";
import "./dashboard.css";

import { Box } from "../../components";
import { Images, DynamicIcon } from "../../constants";

import { PieChart } from "@mui/x-charts/PieChart";
import {
  Button,
  Pagination,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";

const Dashboard = () => {
  const desktopOS = [
    { id: "Windows", value: 50 },
    { id: "macOS", value: 30 },
    { id: "Linux", value: 20 },
  ];

  const valueFormatter = (value) => `${value}%`;

  const [selections, setSelections] = useState({
    select1: 10,
    select2: 10,
    select3: 10,
    select4: 10,
  });

  const handleChange = (event, key) => {
    setSelections((prev) => ({
      ...prev,
      [key]: event.target.value,
    }));
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

        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">Best Selling Products</h3>

          <div className="row cardFilters mt-3">
            <div className="col-md-3">
              <h4>Show by</h4>
              <FormControl size="small" className="w-100">
                <Select
                  labelId="select1-label"
                  id="select1"
                  value={selections["select1"] || ""}
                  onChange={(event) => handleChange(event, "select1")}
                  className="w-100 drop"
                >
                  <MenuItem value={10}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={20}>Ten</MenuItem>
                  <MenuItem value={30}>Twenty</MenuItem>
                  <MenuItem value={40}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3">
              <h4>Show by</h4>
              <FormControl size="small" className="w-100">
                <Select
                  labelId="select2-label"
                  id="select2"
                  value={selections["select2"] || ""}
                  onChange={(event) => handleChange(event, "select2")}
                  className="w-100  drop"
                >
                  <MenuItem value={10}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={20}>Ten</MenuItem>
                  <MenuItem value={30}>Twenty</MenuItem>
                  <MenuItem value={40}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3">
              <h4>Show by</h4>
              <FormControl size="small" className="w-100">
                <Select
                  labelId="select3-label"
                  id="select3"
                  value={selections["select3"] || ""}
                  onChange={(event) => handleChange(event, "select3")}
                  className="w-100  drop"
                >
                  <MenuItem value={10}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={20}>Ten</MenuItem>
                  <MenuItem value={30}>Twenty</MenuItem>
                  <MenuItem value={40}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3">
              <h4>Show by</h4>
              <FormControl size="small" className="w-100">
                <Select
                  labelId="select4-label"
                  id="select4"
                  value={selections["select4"] || ""}
                  onChange={(event) => handleChange(event, "select4")}
                  className="w-100  drop"
                >
                  <MenuItem value={10}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={20}>Ten</MenuItem>
                  <MenuItem value={30}>Twenty</MenuItem>
                  <MenuItem value={40}>Thirty</MenuItem>
                </Select>
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
                  <th>BRAND</th>
                  <th>PRICE</th>
                  <th>STOCK</th>
                  <th>RATING</th>
                  <th>ORDER</th>
                  <th>SALES</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src={Images.Skirt}
                            alt="skirt"
                            className="w-100"
                          />
                        </div>
                      </div>
                      <div className="info pl-0">
                        <h6>Tops and skirt set for Female</h6>
                        <p>
                          Women's exclusive summer Tops and skirt set for Female
                          Tops and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>womens</td>
                  <td>richman</td>
                  <td>
                    <del className="old">₹210</del>
                    <span className="new text-success">₹190</span>
                  </td>
                  <td>30</td>
                  <td>4.9</td>
                  <td>380</td>
                  <td>₹38k</td>
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
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src={Images.Skirt}
                            alt="skirt"
                            className="w-100"
                          />
                        </div>
                      </div>
                      <div className="info pl-0">
                        <h6>Tops and skirt set for Female</h6>
                        <p>
                          Women's exclusive summer Tops and skirt set for Female
                          Tops and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>womens</td>
                  <td>richman</td>
                  <td>
                    <del className="old">₹210</del>
                    <span className="new text-success">₹190</span>
                  </td>
                  <td>30</td>
                  <td>4.9</td>
                  <td>380</td>
                  <td>₹38k</td>
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
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src={Images.Skirt}
                            alt="skirt"
                            className="w-100"
                          />
                        </div>
                      </div>
                      <div className="info pl-0">
                        <h6>Tops and skirt set for Female</h6>
                        <p>
                          Women's exclusive summer Tops and skirt set for Female
                          Tops and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>womens</td>
                  <td>richman</td>
                  <td>
                    <del className="old">₹210</del>
                    <span className="new text-success">₹190</span>
                  </td>
                  <td>30</td>
                  <td>4.9</td>
                  <td>380</td>
                  <td>₹38k</td>
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
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src={Images.Skirt}
                            alt="skirt"
                            className="w-100"
                          />
                        </div>
                      </div>
                      <div className="info pl-0">
                        <h6>Tops and skirt set for Female</h6>
                        <p>
                          Women's exclusive summer Tops and skirt set for Female
                          Tops and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>womens</td>
                  <td>richman</td>
                  <td>
                    <del className="old">₹210</del>
                    <span className="new text-success">₹190</span>
                  </td>
                  <td>30</td>
                  <td>4.9</td>
                  <td>380</td>
                  <td>₹38k</td>
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
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src={Images.Skirt}
                            alt="skirt"
                            className="w-100"
                          />
                        </div>
                      </div>
                      <div className="info pl-0">
                        <h6>Tops and skirt set for Female</h6>
                        <p>
                          Women's exclusive summer Tops and skirt set for Female
                          Tops and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>womens</td>
                  <td>richman</td>
                  <td>
                    <del className="old">₹210</del>
                    <span className="new text-success">₹190</span>
                  </td>
                  <td>30</td>
                  <td>4.9</td>
                  <td>380</td>
                  <td>₹38k</td>
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
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src={Images.Skirt}
                            alt="skirt"
                            className="w-100"
                          />
                        </div>
                      </div>
                      <div className="info pl-0">
                        <h6>Tops and skirt set for Female</h6>
                        <p>
                          Women's exclusive summer Tops and skirt set for Female
                          Tops and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>womens</td>
                  <td>richman</td>
                  <td>
                    <del className="old">₹210</del>
                    <span className="new text-success">₹190</span>
                  </td>
                  <td>30</td>
                  <td>4.9</td>
                  <td>380</td>
                  <td>₹38k</td>
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
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src={Images.Skirt}
                            alt="skirt"
                            className="w-100"
                          />
                        </div>
                      </div>
                      <div className="info pl-0">
                        <h6>Tops and skirt set for Female</h6>
                        <p>
                          Women's exclusive summer Tops and skirt set for Female
                          Tops and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>womens</td>
                  <td>richman</td>
                  <td>
                    <del className="old">₹210</del>
                    <span className="new text-success">₹190</span>
                  </td>
                  <td>30</td>
                  <td>4.9</td>
                  <td>380</td>
                  <td>₹38k</td>
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
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src={Images.Skirt}
                            alt="skirt"
                            className="w-100"
                          />
                        </div>
                      </div>
                      <div className="info pl-0">
                        <h6>Tops and skirt set for Female</h6>
                        <p>
                          Women's exclusive summer Tops and skirt set for Female
                          Tops and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>womens</td>
                  <td>richman</td>
                  <td>
                    <del className="old">₹210</del>
                    <span className="new text-success">₹190</span>
                  </td>
                  <td>30</td>
                  <td>4.9</td>
                  <td>380</td>
                  <td>₹38k</td>
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
              </tbody>
            </table>

            <div className="d-flex tableFooter">
              <p>
                showing <b>12</b> of <b>60</b> results{" "}
              </p>
              <Pagination
                count={10}
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
