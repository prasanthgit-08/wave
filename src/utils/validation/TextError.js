import React from "react";

function TextError(props) {
  return (
    <div style={{ marginLeft: "17%", color: "red", border: "none" }} className="error">
      {props.children}
    </div>
  );
}

export default TextError;
