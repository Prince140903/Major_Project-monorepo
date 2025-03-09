import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const QuantityBox = ({ quantity = 1, onChange }) => {
  const [inputValue, setInputValue] = useState(quantity);

  // Syncs internal state with external quantity prop
  useEffect(() => {
    setInputValue(quantity);
  }, [quantity]);

  const handleIncrease = () => {
    const newValue = inputValue + 1;
    setInputValue(newValue);
    if (onChange) onChange(newValue); // Call only if `onChange` exists
  };

  const handleDecrease = () => {
    if (inputValue > 1) {
      const newValue = inputValue - 1;
      setInputValue(newValue);
      if (onChange) onChange(newValue);
    }
  };

  const handleInputChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) value = 1; // Prevent invalid input
    setInputValue(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="addCartSection pt-4 pb-4 d-flex align-items-center">
      <div className="counterSec mr-3">
        <input type="number" value={inputValue} onChange={handleInputChange} />
        <span className="arrow plus" onClick={handleIncrease}>
          <KeyboardArrowUpIcon />
        </span>
        <span className="arrow minus" onClick={handleDecrease}>
          <KeyboardArrowDownIcon />
        </span>
      </div>
    </div>
  );
};

export default QuantityBox;
