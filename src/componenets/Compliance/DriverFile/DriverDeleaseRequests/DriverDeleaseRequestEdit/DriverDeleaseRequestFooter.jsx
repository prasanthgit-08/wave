import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setIsDeleaseProcess,
  setIsDeleaseRequestEdit,
  setIsSettingDeleaseRequestProcessed,
  setViewDetail,
  toggleChangesCancelled,
} from "../../../../../redux/DriverDeleaseRequestsSlice";
import toast from "react-hot-toast";
import ModalComponent from "../../../../common/ModalComponent";
import DriverDeleaseRequestsService from "../../../../../services/DriverDeleaseRequestsService";
import { setEditFormData } from "../../../../../redux/DriverDeleaseSlice";
import LoadingIcon from "../../../../common/LoadingIcon";

const DriverDeleaseRequestFooter = () => {
  const viewDetail = useSelector((state) => state.driverDeleaseRequestsReducer.viewDetail);
  const disableSave = useSelector((state) => state.driverDeleaseRequestsReducer.disableSave);
  const editFormData = useSelector((state) => state.driverDeleaseRequestsReducer.editFormData);
  const isDeleaseProcess = useSelector((state) => state.driverDeleaseRequestsReducer.isDeleaseProcess);
  const disableDeleaseButton = useSelector(
    (state) => state.driverDeleaseRequestsReducer.disableDeleaseButton
  );
  const driverDeleaseRequestsSaveObject = useSelector(
    (state) => state.driverDeleaseRequestsReducer.driverDeleaseRequestsSaveObject
  );
  const { deleaserequestPK, driverId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const handleCancelShow = () => {
    if (viewDetail === false || deleaserequestPK === undefined) {
      /***edit page***/
      setCancelShow(true);
    } else {
      /**view page**/
      setCancelShow(false);
      dispatch(setViewDetail(false));
      dispatch(setIsSettingDeleaseRequestProcessed(false));
      dispatch(setIsDeleaseProcess(false));
      navigate(`/driver-delease-requests/${driverId}`);
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (deleaserequestPK) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(toggleChangesCancelled());
      dispatch(setIsDeleaseRequestEdit(false));
      toast.success("Changes Cancelled");
    } else {
      navigate(`/driver-delease-requests/${driverId}`);
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };
  /*****Save Operation*****/
  const handleSave = () => {
    setLoading(true);
    DriverDeleaseRequestsService.createOrUpdateDriverDeleaseRequest(driverDeleaseRequestsSaveObject)
      .then((response) => {
        navigate(`/driver-delease-requests/${driverId}`);
        if (deleaserequestPK) {
          toast.success("Driver Delease Request Updated");
        } else {
          toast.success("Driver Delease Request Created");
        }
        dispatch(setIsDeleaseRequestEdit(false));
      })
      .catch((error) => {
        navigate(`/driver-delease-requests/${driverId}`);
        if (deleaserequestPK) {
          toast.error("Failed to Update Driver Delease Request");
        } else {
          toast.error("Failed to Create Driver Delease Request");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={!viewDetail}
          disabled={disableDeleaseButton || editFormData?.processed || editFormData?.canceled}
          onClick={() => {
            dispatch(setIsDeleaseProcess(true));
            dispatch(setViewDetail(false));
            dispatch(setEditFormData(null));
            navigate(`/driver-delease/add/${driverId}/${deleaserequestPK}`);
          }}
        >
          Delease
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={viewDetail}
          disabled={disableSave}
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handleCancelShow}
        >
          Cancel
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={(e) => {
            dispatch(setViewDetail(false));
            dispatch(setIsDeleaseRequestEdit(true));
          }}
          disabled={editFormData?.canceled || editFormData?.processed}
          hidden={!viewDetail}
        >
          Edit
        </button>

        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Driver Delease Request Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
    </div>
  );
};

export default DriverDeleaseRequestFooter;
