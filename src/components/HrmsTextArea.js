import React from "react";
import { TextArea } from "semantic-ui-react";

const HrmsTextArea = (props) => {
  const {
    label,
    placeholder,
    value,
    name,
    onChange,
    onBlur,
    error,
    showError,
  } = props;

  return (
    <>
      <label style={{ textAlign: "left" }}>{label}</label>
      <TextArea
        placeholder={placeholder}
        style={{ minHeight: 100 }}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && (
        <div className={"ui pointing red basic label"}>{showError}</div>
      )}
    </>
  );
};

export default HrmsTextArea;
