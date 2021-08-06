import React from "react";
import { Input, Grid } from "semantic-ui-react";

const HrmsInput = (props) => {
  const {
    columnWith = "8",
    label,
    type,
    placeholder,
    value,
    maxLength,
    name,
    onChange,
    onBlur,
    error,
    showError,
    icon,
    iconPosition,
  } = props;

  return (
    <Grid.Column width={columnWith} textAlign="left">
      <label>{label}</label>
      <Input
        style={{ width: "100%" }}
        type={type}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        icon={icon}
        iconPosition={iconPosition}
      ></Input>
      {error && (
        <div className={"ui pointing red basic label"}>{showError}</div>
      )}
    </Grid.Column>
  );
};

export default HrmsInput;
