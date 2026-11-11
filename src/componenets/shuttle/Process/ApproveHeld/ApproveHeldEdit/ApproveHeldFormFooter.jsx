import React, { useEffect, useState } from "react";
import ButtonComponent from "../../../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ApproveHeldService from "../../../../../services/ApproveHeldService";
import { toast } from "react-hot-toast";
import {
  resetApproveHeld,
  setApproveOrDeigned,
  setEditFormData,
} from "../../../../../redux/ApproveHeldSlice";
import ModalComponent from "../../../../common/ModalComponent";
import LoadingIcon from "../../../../common/LoadingIcon";

function ApproveHeldFormFooter() {
  const deignedReason = useSelector((state) => state.approveHeldShuttleReducer.deignedReason);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cancelShow, setCancelShow] = useState(false);
  const [disableDeigned, setDisableDeigned] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const approveData = useSelector((state) => state.approveHeldShuttleReducer.approveData);
  const { id } = useParams();
  const approveOrDeigned = useSelector((state) => state.approveHeldShuttleReducer.approveOrDeigned);

  const saveApproveHeld = (approve) => {
    setSaveLoading(true);
    ApproveHeldService.updateApproveHeld(approveData, approve)
      .then((response) => {
        navigate("/approve-held-shuttle-browse");
        if (approve === true) {
          toast.success("The record is approved");
        } else if (approve === false) {
          toast.success("The record is denied");
        }
        dispatch(resetApproveHeld());
        dispatch(setApproveOrDeigned(true));
      })
      .catch((error) => {
        navigate("/approve-held-shuttle-browse");
        dispatch(resetApproveHeld());
        dispatch(setApproveOrDeigned(true));
        let msg = "";
        if (error.response) {
          msg = error.response.data.errorMsg;
        }
        if (msg === null || msg === "" || msg === undefined) {
          msg = "Something went wrong !! Failed to save the record !!";
        }
        toast.error(msg);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  useEffect(() => {
    if (deignedReason !== "") {
      setDisableDeigned(false);
    } else {
      setDisableDeigned(true);
    }
  }, [deignedReason]);

  useEffect(() => {
    if (approveOrDeigned) {
      navigate("/approve-held-shuttle-browse");
    }
  }, [approveOrDeigned]);

  const handleCancelShow = () => {
    setCancelShow(true);
  };

  const handleCancelYes = () => {
    dispatch(setEditFormData(null));
    setCancelShow(false);
    toast.success("Changes Cancelled");
    navigate("/approve-held-shuttle-browse");
  };
  const handleCancelNo = () => setCancelShow(false);

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
            type="button"
            onClick={() => {
              navigate(`/approve-held-shuttle-unit-browse/${id}`);
            }}
            disabled={saveLoading}
          >
            Unit Shuttles
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
            type="button"
            disabled={saveLoading}
            onClick={() => {
              saveApproveHeld(true);
            }}
          >
            Approve
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
            type="button"
            disabled={disableDeigned || saveLoading}
            onClick={() => {
              saveApproveHeld(false);
            }}
          >
            Denied
          </button>

          <ButtonComponent
            route={""}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
            label={"Cancel"}
            onClick={handleCancelShow}
          />

          {/* edit Cancel Confirmation Modal */}
          <ModalComponent
            show={cancelShow}
            onHide={handleCancelNo}
            title={"Cancel Approve Held Shuttle Changes"}
            body={"Please confirm you want to cancel your changes"}
            handleYES={handleCancelYes}
            handleNO={handleCancelNo}
          />
        </div>
      </div>
      {saveLoading && <LoadingIcon />}
    </div>
  );
}

export default ApproveHeldFormFooter;
