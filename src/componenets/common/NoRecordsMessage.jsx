import React from "react";

const NoRecordsMessage = ({ className, message }) => {
  return <div className={className || "noRecordsSmallerFont"}>{message || "No Records Available"}</div>;
};

export default NoRecordsMessage;
