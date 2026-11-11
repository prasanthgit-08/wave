import React from "react";
import FormHeader from "./FormHeader";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import QuarterScreenWrapper from "../../../../../../Templates/Screens/QuarterScreenWrapper";
import { useNavigate, useParams } from "react-router-dom";
import { resetDispatchDocument } from "../../../../../../../redux/DispatchDocumentSlice";
import { useDispatch } from "react-redux";

const DispatchDocumentForm = () => {
  const navigate = useNavigate();
  const { driverId } = useParams();
  const dispatch = useDispatch();

  const handleClose = () => {
    navigate(`/driver-service-selection/${driverId}/form`);
    dispatch(resetDispatchDocument());
  };

  return (
    <QuarterScreenWrapper>
      <FormHeader handleClose={() => handleClose()} />
      <FormContent />
      <FormFooter />
    </QuarterScreenWrapper>
  );
};

export default DispatchDocumentForm;
