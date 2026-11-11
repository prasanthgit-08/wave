import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  delayResetChanges,
  resetBatchChanges,
  resetChanges,
  setBrowseUnits,
  setDelayInputArray,
  setDelayNumber,
  setSelectedDataArray,
  setSingleUnits,
} from "../../../../redux/PlantReleaseSlice";
import PlantReleaseService from "../../../../services/PlantReleaseService";
import DeleteComponent from "../../../common/DeleteComponent";

const DelayEntryHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [cancelledDelayArray, setCancelledDelayArray] = useState([]);

  const browseUnits = useSelector((state) => state.plantReleaseReducer.browseUnits);
  const singleUnits = useSelector((state) => state.plantReleaseReducer.singleUnits);
  const delayArrayIndex = useSelector((state) => state.plantReleaseReducer.delayArrayIndex);
  const delayInputArray = useSelector((state) => state.plantReleaseReducer.delayInputArray);
  let delayNumber = useSelector((state) => state.plantReleaseReducer.delayNumber);
  const onHandleCloseShow = () => {
    if (singleUnits === true) {
      navigate("/");
      toast.success("Page Closed");
      dispatch(setSingleUnits(false));
      dispatch(delayResetChanges());
      dispatch(resetChanges());
    } else if (browseUnits === true) {
      if (cancelledDelayArray?.length > 0) {
        PlantReleaseService.releaseBatchUnit(cancelledDelayArray)
          .then((response) => {
            closeShow();
          })
          .catch((err) => {
            console.log(" error", err);
            closeShow();
          });
      } else {
        closeShow();
      }
    }
  };

  const closeShow = () => {
    setShow(true);
  };
  const closeMessage = () => {
    dispatch(setDelayNumber(0));
    dispatch(delayResetChanges());
    dispatch(setBrowseUnits(false));
    dispatch(resetBatchChanges());
    dispatch(setDelayInputArray([]));
    dispatch(setSelectedDataArray([]));
    setShow(false);
    navigate("/");
    toast.success("Page Closed");
  };

  useEffect(() => {
    if (
      browseUnits &&
      delayInputArray[delayArrayIndex]?.alreadyReleased &&
      delayInputArray[delayArrayIndex]?.unitOnShuttleDelay
    ) {
      let cancelledDelayArray = delayInputArray.slice(delayArrayIndex);

      cancelledDelayArray = cancelledDelayArray
        .filter((element) => element.alreadyReleased && element.unitOnShuttleDelay)
        .map((element) => ({
          ...element,
          plantRelease: true,
        }));

      setCancelledDelayArray(cancelledDelayArray);
    }
  }, [delayInputArray, delayArrayIndex, browseUnits]);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2 ">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          onClick={onHandleCloseShow}
        >
          Close
        </button>
      </div>
      <DeleteComponent
        show={show}
        onHide={closeMessage}
        title={"Close"}
        body={"Delayed Units:" + delayNumber}
        handleOK={closeMessage}
      />
    </div>
  );
};

export default DelayEntryHeader;
