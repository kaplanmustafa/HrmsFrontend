import React from "react";
import { Dropdown, Grid } from "semantic-ui-react";

const HrmsDropdown = (props) => {
  const {
    columnWidth = "8",
    label,
    placeholder,
    value,
    options,
    onChange,
    onBlur,
    id,
    search,
    error,
    showError,
  } = props;

  return (
    <Grid.Column width={columnWidth} textAlign="left">
      <label>{label}</label>
      <Dropdown
        style={{ width: "100%" }}
        clearable
        item
        placeholder={placeholder}
        search={search}
        selection
        onChange={onChange}
        onBlur={onBlur}
        id={id}
        value={value}
        options={options}
      />
      {error && (
        <div className={"ui pointing red basic label"}>{showError}</div>
      )}
    </Grid.Column>
  );
};

export default HrmsDropdown;
