import React, { useState, useEffect } from "react";
import "./select.css";
import DynamicIcon from "../../constants/icons.jsx";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { capitalize } from "@mui/material";

const Select = ({ data, placeholder, icon }) => {
  const [isOpenSelect, setisOpenSelect] = useState(false);
  const [selectedIndex, setselectedIndex] = useState(0);
  const [selectedItem, setselectedItem] = useState(placeholder);
  const [listData, setListData] = useState();

  const openSelect = () => {
    setisOpenSelect(!isOpenSelect);
  };

  const closeSelect = (index, name) => {
    setselectedIndex(index);
    setisOpenSelect(false);
    setselectedItem(name);
  };

  useEffect(() => {
    setListData(data);
  }, [data]);

  return (
    <ClickAwayListener onClickAway={() => setisOpenSelect(false)}>
      <div className="selectDropWrapper cursor position-relative">
        {icon}
        <span className="openSelect" onClick={openSelect}>
          {selectedItem.length > 14
            ? selectedItem.substr(0, 14) + "..."
            : selectedItem}
          <DynamicIcon iconName="KeyboardArrowDown" className="arrow" />
        </span>
        {isOpenSelect === true && (
          <div className="selectDrop">
            <ul className="searchResults">
              <li
                key={0}
                onClick={() => closeSelect(0, placeholder)}
                className={`${selectedIndex === 0 ? "active" : ""}`}
              >
                {placeholder}
              </li>
              {listData.map((item, index) => {
                return (
                  <li
                    key={index + 1}
                    onClick={() => closeSelect(index + 1, item)}
                    className={`${selectedIndex === index + 1 ? "active" : ""}`}
                  >
                    {capitalize(item)}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default Select;
