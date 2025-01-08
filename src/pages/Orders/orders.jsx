import React, { useState } from "react";
import "./orders.css";

import { Images, DynamicIcon } from "../../constants";
import { Box, UserImg } from "../../components";
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

const Orders = () => {
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

  const handleChange = (event, key) => {
    setSelections((prev) => ({
      ...prev,
      [key]: event.target.value,
    }));
  };

  const [selections, setSelections] = useState({
    select1: 10,
    select2: 10,
    select3: 10,
    select4: 10,
  });

  return (
    <>
      <div className="right-content w-100 ">
        <div className="card shadow border-0 w-100 flex-row p-4 m-0">
          <h5 className="mb-0">Order List</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="/"
              label="Dashboard"
              icon={<DynamicIcon iconName="Home" />}
            />
            <StyledBreadcrumb component="a" href="/orders" label="Orders" />
            <StyledBreadcrumb component="text" label="Order List" />
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
                  <th>CLIENT</th>
                  <th>PRODUCT</th>
                  <th>AMOUNT</th>
                  <th>PAYMENT</th>
                  <th>STATUS</th>
                  <th>DATE TIME</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>#1001</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <UserImg img={Images.userImg} />
                      <div className="info pl-2">
                        <h6>Aaditya Revadkar</h6>
                      </div>
                    </div>
                  </td>
                  <td>(5) Item</td>
                  <td>₹4000</td>
                  <td>UPI</td>
                  <td><p className="badgeBg green">Received</p></td>
                  <td>10/1/2025 15:02</td>

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
                  <td>#1002</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <UserImg img={Images.userImg} />
                      <div className="info pl-2">
                        <h6>Aaditya Revadkar</h6>
                      </div>
                    </div>
                  </td>
                  <td>(3) Item</td>
                  <td>₹2050</td>
                  <td>UPI</td>
                  <td><p className="badgeBg blue">Shipped</p></td>
                  <td>10/1/2025 15:02</td>

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
                  <td>#1003</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <UserImg img={Images.userImg} />
                      <div className="info pl-2">
                        <h6>Aaditya Revadkar</h6>
                      </div>
                    </div>
                  </td>
                  <td>(1) Item</td>
                  <td>₹200</td>
                  <td>UPI</td>
                  <td>
                    <p className="badgeBg purple">Pending</p>
                  </td>
                  <td>10/1/2025 15:02</td>

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
                  <td>#1004</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <UserImg img={Images.userImg} />
                      <div className="info pl-2">
                        <h6>Aaditya Revadkar</h6>
                      </div>
                    </div>
                  </td>
                  <td>(4) Item</td>
                  <td>₹2000</td>
                  <td>UPI</td>
                  <td><p className="badgeBg blue">Shipped</p></td>
                  <td>10/1/2025 15:02</td>

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
                  <td>#1005</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <UserImg img={Images.userImg} />
                      <div className="info pl-2">
                        <h6>Aaditya Revadkar</h6>
                      </div>
                    </div>
                  </td>
                  <td>(2) Item</td>
                  <td>₹1500</td>
                  <td>UPI</td>
                  <td><p className="badgeBg red">Cancelled</p></td>
                  <td>10/1/2025 15:02</td>

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
                  <td>#1006</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <UserImg img={Images.userImg} />
                      <div className="info pl-2">
                        <h6>Aaditya Revadkar</h6>
                      </div>
                    </div>
                  </td>
                  <td>(1) Item</td>
                  <td>₹450</td>
                  <td>UPI</td>
                  <td><p className="badgeBg purple">Pending</p></td>
                  <td>10/1/2025 15:02</td>

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

export default Orders;
