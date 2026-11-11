import React from "react";
import QuarterScreenWrapper from "../../../../../../Templates/Screens/QuarterScreenWrapper";
import ReleaseReserve from "./ReleaseReserve";
import Header from "../../../../../../common/Header";
import ReleaseReserveFooter from "./ReleaseReserveFooter";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRefundData } from "../../../../../../../redux/ReleaseReserveSlice";

const ReleaseReserveTemplate = () => {
  const dispatch = useDispatch();
  const { driverId } = useParams();
  const navigate = useNavigate();
  const hasChanges = useSelector((state) => state.releaseReserve.hasChanges);
  return (
    <QuarterScreenWrapper>
      <Header
        confirmClose={hasChanges}

        programName="Release Reserve"
        closeModalBody="Please confirm you want to close the program without Processing"
        closeConfirmationHandler={() => {
          dispatch(setRefundData(null));
        }}
        closeNavigationURL={`/driver-service-selection/${driverId}/form`}
      />
      <ReleaseReserve />
      <ReleaseReserveFooter />
    </QuarterScreenWrapper>
  );
};

export default ReleaseReserveTemplate;
