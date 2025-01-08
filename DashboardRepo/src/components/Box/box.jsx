import React from "react";

import { Button } from "@mui/material";
import { DynamicIcon } from "../../constants";

const Box = (props) => {
  return (
    <>
      {props.choice === true ? (
        <Button
          className="dashboardBox"
          style={{
            backgroundImage: `linear-gradient(to right, ${props.color?.[0]} , ${props.color?.[1]})`,
          }}
        >
          {props.grow === true ? (
            <span className="chart">
              <DynamicIcon iconName="TrendingUpRounded" />
            </span>
          ) : (
            <span className="chart">
              <DynamicIcon iconName="TrendingDownRounded" />
            </span>
          )}

          <div className="d-flex w-100">
            <div className="col1">
              <h4 className="text-white mb-0">Total Users</h4>
              <span className="text-white">277</span>
            </div>

            <div className="ml-auto">
              {props.icon ? (
                <span className="icon">{props.icon ? props.icon : ""}</span>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="d-flex align-items-center w-100 bottomEle">
            <h6 className="text-white mb-0 mt-0">Last Month</h6>
            <Button className="ml-auto toggleIcon">
              <DynamicIcon iconName="MoreVert" />
            </Button>
          </div>
        </Button>
      ) : (
        <Button
          className="float-btn"
          style={{
            backgroundImage: `linear-gradient(${props.color?.[0]} , ${props.color?.[1]})`,
          }}
        >
          <div className="d-flex align-items-center p-2">
            <h3>547</h3>
            <p>pending orders</p>
            {props.icon ? (
              <span className="icon">{props.icon ? props.icon : ""}</span>
            ) : (
              ""
            )}
          </div>
        </Button>
      )}
    </>
  );
};

export default Box;
