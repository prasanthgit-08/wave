import React from "react";
import QuarterScreenWrapper from "../../Templates/Screens/QuarterScreenWrapper";
import FormHeader from "./FormHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import { resetPurgeDamage, setSelectedId } from "../../../redux/PurgeDamageReturnUnitsSlice";
import toast from "react-hot-toast";

const PurgeDamageReturnUnitsForm = () => {
  const navigate = useNavigate();
  const { driverId } = useParams();
  const dispatch = useDispatch();

  const handleClose = () => {
    navigate(`/`);
    dispatch(resetPurgeDamage());
    dispatch(setSelectedId(null));
    toast.success("Page closed");
  };

  return (
    <QuarterScreenWrapper>
      <FormHeader handleClose={() => handleClose()} />
      <FormContent />
      <FormFooter />
    </QuarterScreenWrapper>
  );
};

export default PurgeDamageReturnUnitsForm;
