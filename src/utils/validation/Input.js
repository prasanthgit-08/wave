import React from "react";
import { ErrorMessage, Field } from "formik";
import TextError from "./TextError";
import { Form, Col } from "react-bootstrap";

function Input(props) {
  const { label, name, ...rest } = props;

  return (
    <Form.Group className="m-t-5 m-b-10 align-items-center row">
      <label className="col-sm-2 col-form-label dealer-label p-0" htmlFor={name}>
        {label}
      </label>
      <Col sm={7} className="p-0">
        <Field className="form-control" id={name} name={name} {...rest}></Field>
      </Col>
    </Form.Group>
  );
}

export default Input;
