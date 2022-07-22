import React from "react";
import "./styles.css";
const InputBox = ({ height, width, value, onChange, placeholder, icon }) => {
  return (
    <input
      className={`input-box`}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ width: width || "100%", height: height || 32 }}
    />
  );
};

export default InputBox;
