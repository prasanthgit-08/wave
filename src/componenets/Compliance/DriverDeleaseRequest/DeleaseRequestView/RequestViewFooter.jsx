import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DriverDeleaseRequestsService from "../../../../services/DriverDeleaseRequestsService";
import toast from "react-hot-toast";
import {
  setFlagStatus,
  setIsDeleaseCompliance,
  setPageNumber,
  setReturnFromDelease,
} from "../../../../redux/Compliance/DriverDeleaseRequestSlice";
import { setEditFormData } from "../../../../redux/DriverDeleaseSlice";
import ModalComponent from "../../../common/ModalComponent";
import { usePermission } from "../../../../hooks/usePermission";
import { PROGRAMS } from "../../../../constants/permissionConstants";

function RequestViewFooter() {
  const { deleaserequestPK, driverId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [viewDetail, setviewDetail] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const flagStatus = useSelector((state) => state.deleaseRequestReducer.flagStatus);
  const isDeleaseCompliance = useSelector((state) => state.deleaseRequestReducer.isDeleaseCompliance);
  const returnFromDelease = useSelector((state) => state.deleaseRequestReducer.returnFromDelease);
  const { checkPermission } = usePermission();

  const handleCancelShow = () => {
    if (viewDetail === true) {
      navigate(`/delease-request`);
      setCancelShow(false);
      dispatch(setFlagStatus(""));
      dispatch(setIsDeleaseCompliance(false));
      dispatch(setReturnFromDelease(false));
      toast.success("Cancelled");
    } else {
      setCancelShow(true);
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    navigate(`/delease-request`);
    setCancelShow(false);
    toast.success("Cancelled");
  };
  /******
   * Update the Selected Record's Canceled to true
   * ***/
  const handleNoDelease = (flagStatus) => {
    DriverDeleaseRequestsService.processDriverDeleaseRequest(deleaserequestPK, flagStatus)
      .then((response) => {
        navigate(`/delease-request`);
        toast.success("Driver Not Deleased");
        dispatch(setFlagStatus(""));
        dispatch(setPageNumber(0));
      })
      .catch((error) => {
        navigate(`/delease-request`);
        toast.error("Failed to Delease Driver");
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={() => {
            dispatch(setIsDeleaseCompliance(true));
            dispatch(setEditFormData(null));
            navigate(`/driver-requestview/add/${driverId}/${deleaserequestPK}`);
          }}
          disabled={!checkPermission(PROGRAMS.DELEASE_NODELEASE_EDIT, "edit")}
        >
          Delease
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={() => {
            dispatch(setFlagStatus("EDIT"));
            handleNoDelease("EDIT");
          }}
          disabled={!checkPermission(PROGRAMS.DELEASE_NODELEASE_EDIT, "edit")}
        >
          No Delease
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handleCancelShow}
        >
          Cancel
        </button>
        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Driver Delease Request"}
          body={"Please confirm you want to cancel Delease Request"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
    </div>
  );
}

export default RequestViewFooter;
