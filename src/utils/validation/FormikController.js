import React from "react";
import Input from "./Input";

function FormikController(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
    case "checkbox":
    default:
      return null;
  }
}

export default FormikController;
