import React from "react";
import { Link } from "react-router-dom";

const ButtonComponent = ({ className, route, onClick, label, hidden, style, disabledTest }) => (
  <Link
    to={route}
    className={className}
    onClick={onClick}
    hidden={hidden}
    style={style}
    disabled={disabledTest}
  >
    {label}
  </Link>
);

export default ButtonComponent;
