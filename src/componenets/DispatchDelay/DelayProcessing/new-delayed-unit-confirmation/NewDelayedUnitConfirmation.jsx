import React from "react";
import Header from "../../../common/Header";
import Content from "./Content";
import Footer from "./Footer";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import { useDispatch, useSelector } from "react-redux";
import { resetUnitSelectionFilters } from "../../../../redux/DispatchDelay/DelayProcessing/NewDelayedBrowseSlice";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  resetSaveList,
  setDispatchDelayIndex,
  setNewDelayNavigation,
} from "../../../../redux/UnitActivationSlice";
import { resetDriverCheckinState, setDriverId } from "../../../../redux/DriverCheckinSlice";

const NewDelayedUnitConfirmation = (DelayedUnit) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const newDelayNavigation = useSelector((state) => state.unitActivationReducer.newDelayNavigation);
  const dispatchDelayIndex = useSelector((state) => state.unitActivationReducer.dispatchDelayIndex);
  const dispatchDelayArrayList = useSelector((state) => state.unitActivationReducer.dispatchDelayArrayList);
  const urlNavigation = JSON.parse(localStorage.getItem("urlNavigation")) || newDelayNavigation;
  const cameFrom = urlNavigation?.from;

  const handleNavigation = () => {
    if (state?.origin === "CHECKIN") {
      toast.success("Page Closed");
      dispatch(resetDriverCheckinState());
      navigate(state?.returnTo);
      return;
    }

    if (localStorage.getItem("editYardDelay") === "true") {
      toast.success("Page Closed");
      navigate("/edit-yard-unit-selection");
      return;
    }

    if (localStorage.getItem("checkinDelay") === "true") {
      toast.success("Page Closed");
      navigate("/driver-selection");
      dispatch(setDriverId(null));
      return;
    }

    // Hanlde Unit Activation Single Delay Dispatch
    if (cameFrom === "delayDispatchMulti") {
      if (dispatchDelayArrayList?.length > 0 && dispatchDelayIndex < dispatchDelayArrayList?.length) {
        // END looping for last unit
        if (dispatchDelayIndex === dispatchDelayArrayList?.length - 1) {
          // TODO: clear states as required, show popup if rquired
          dispatch(setDispatchDelayIndex(0));
          toast.success("Page Closed");
          navigate(urlNavigation?.navigateTo);
          dispatch(setNewDelayNavigation(null));
          dispatch(resetSaveList({ key: "all" }));
        } else {
          // CONTINUE iteration, stay on same screen with next unit
          toast.success("Page Closed");
          const newIndex = dispatchDelayIndex + 1;
          dispatch(setDispatchDelayIndex(newIndex));
          navigate(
            `/delay-processing/new-delayed-unit-confirmation/${dispatchDelayArrayList?.[newIndex]?.company}/${
              dispatchDelayArrayList?.[newIndex]?.unitPK
            }/${dispatchDelayArrayList?.[newIndex]?.driverFK || 0}`
          );
        }
      }
    } else if (cameFrom === "delayDispatch") {
      // Handle Unit Activation Single Delay Dispatch
      toast.success("Page Closed");
      navigate(urlNavigation?.navigateTo);
    } else {
      // Handle Delay Processing Browse (Default)
      dispatch(resetUnitSelectionFilters());
      navigate("/delay-processing/delayed-unit-browse");
    }
  };

  return (
    <QuarterScreenWrapper>
      <Header
        programName="Delay Processing"
        closeHandler={() => handleNavigation()}
        preventNavigation={true}
      />
      <Content />
      <Footer />
    </QuarterScreenWrapper>
  );
};

export default NewDelayedUnitConfirmation;
