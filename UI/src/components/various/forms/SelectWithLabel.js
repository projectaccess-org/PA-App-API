import { Select } from "antd";
import React from "react";
import { Form } from "react-bootstrap";

const { Option } = Select;

const SelectWithLabel = ({field, touched, errors, setFieldValue, label, placeholder, options}) => {
  return <div>
    <Form.Label>{label}</Form.Label>
    <Select allowClear size={"large"}
            style={{ width: "100%" }}
            value={field.value}
            placeholder={placeholder}
            onChange={(o) => setFieldValue(field.name, o)}>
      {options.map((v) => <Option key={v} value={v}>{v}</Option>)}
    </Select>
    {touched[field.name] && errors[field.name] ? <p style={{ color: "red" }}>{errors[field.name]}</p> : null}
  </div>;
};

export default SelectWithLabel;