import React from 'react';

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const QuantityBox = () => {
      const [inputValue, setinputValue] = useState(1);

      const plus = () => {
        setinputValue = inputValue + 1;
      };

      const minus = () => {
        if (inputValue !== 0) {
          setinputValue = inputValue - 1;
        }
      };

    return (
      <>
        <div className="addCartSection pt-4 pb-4 d-flex align-items-center">
          <div className="counterSec mr-3">
            <input type="number" value={inputValue} />
            <span className="arrow plus" onClick={plus}>
              <KeyboardArrowUpIcon />
            </span>
            <span className="arrow minus" onClick={minus}>
              <KeyboardArrowDownIcon />
            </span>
          </div>
        </div>
      </>
    );
}
export default QuantityBox;