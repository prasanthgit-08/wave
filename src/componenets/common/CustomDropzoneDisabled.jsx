import React from "react";
import { Col, Row } from "react-bootstrap";

const CustomDropzoneDisabled = ({ height = "232px", invisible = false }) => {
  return (
    <Row className={`customDropzoneWrapper ${invisible ? "invisible" : ""}`} style={{ height: height }}>
      <Col xs={12} className="customDropzone customDropzoneDisabled" />
    </Row>
  );
};

export default CustomDropzoneDisabled;
