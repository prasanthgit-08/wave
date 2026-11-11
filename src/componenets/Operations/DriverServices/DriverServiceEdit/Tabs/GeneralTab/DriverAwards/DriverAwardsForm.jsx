import React from "react";
import FormHeader from "./FormHeader";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const DriverAwardsForm = () => {
  const navigate = useNavigate();
  const { driverId } = useParams();

  const onClose = () => {
    navigate(`/driver-service-selection/${driverId}/form`);
    toast.success("Page Closed");
  };
  return (
    <div className="customContainer">
      <div
        className="add-form-component threeFourthScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <FormHeader onClose={onClose} />
        <FormContent />
        <FormFooter />
      </div>
    </div>
  );
};

export default DriverAwardsForm;
