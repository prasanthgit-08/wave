import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetStates,
  setChangeColor,
  setCompletedCheckFlag,
  setEditFormData,
  setIsFromDriverDelease,
  setIsStatusChangingFromInactiveToTerminated,
  setItemsPageNumber,
  setPageNumber,
  setSearchCriteria,
  setSearchTerms,
  setSortFlag,
  setSortValue,
} from "../../../../../redux/DriverDeleaseSlice";
import toast from "react-hot-toast";
import { setNormalSortFlag, setNormalSortValue } from "../../../../../redux/DeleaseItemsSlice";
import {
  setIsDeleaseProcess,
  setIsDeleaseRequestEdit,
  setIsSettingDeleaseRequestProcessed,
} from "../../../../../redux/DriverDeleaseRequestsSlice";
import {
  resetDeleaseRequest,
  setReturnFromDelease,
} from "../../../../../redux/Compliance/DriverDeleaseRequestSlice";

const FormHeader = () => {
  const { id } = useParams();
  const { driverId } = useParams();
  const [closeShow, setCloseShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewDetail = useSelector((state) => state.driverDeleaseReducer.viewDetail);
  const driverDeleaseRequestObject = useSelector(
    (state) => state.driverDeleaseRequestsReducer.driverDeleaseRequestObject
  );
  const isDeleaseProcess = useSelector((state) => state.driverDeleaseRequestsReducer.isDeleaseProcess);
  const isDeleaseCompliance = useSelector((state) => state.deleaseRequestReducer.isDeleaseCompliance);

  /****Close Button Handling ******/
  const handleClose = () => {
    if (viewDetail === true) {
      navigate(`/driver-maintenance-add/${driverId}`);
      dispatch(setEditFormData(null));
      dispatch(resetStates());
      dispatch(setChangeColor(false));
      dispatch(setSearchTerms(""));
      dispatch(setSearchCriteria("Beginning"));
      dispatch(setSortFlag(false));
      dispatch(setSortValue(null));
      dispatch(setPageNumber(0));
      dispatch(setNormalSortFlag(false));
      dispatch(setNormalSortValue(null));
      dispatch(setCompletedCheckFlag(false));
      dispatch(setItemsPageNumber(0));
      dispatch(setIsStatusChangingFromInactiveToTerminated(false));
      dispatch(setIsFromDriverDelease(false));
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };
  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    if (isDeleaseProcess) {
      dispatch(setIsDeleaseRequestEdit(false));
      navigate(`/driver-delease-requests/${driverId}/${driverDeleaseRequestObject.driverDeleaseRequestPK}`);
    } else if (isDeleaseCompliance) {
      /****Clear all states when delease is called****/
      dispatch(setReturnFromDelease(false));
      dispatch(resetDeleaseRequest());
      navigate(`/delease-request`);
    } else {
      navigate(`/driver-maintenance-add/${driverId}`);
    }
    dispatch(setEditFormData(null));
    dispatch(resetStates());
    dispatch(setChangeColor(false));
    dispatch(setSearchTerms(""));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSortFlag(false));
    dispatch(setSortValue(null));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    dispatch(setPageNumber(0));
    dispatch(setCompletedCheckFlag(false));
    dispatch(setItemsPageNumber(0));
    dispatch(setIsStatusChangingFromInactiveToTerminated(false));
    dispatch(setIsFromDriverDelease(false));
    /****From Delease Request Set the delease process flag false*****/
    toast.success("Page Closed");
  };
  return (
    <div>
      <div>
        <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={handleClose}
          >
            Close
          </button>
        </div>

        <div className="col-xs-6">
          <Modal show={closeShow} onHide={handleCloseNo} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title className="font-18 h-100">Close Driver Deleases </Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-14 h-100">
              Please confirm you want to close the program without saving your changes
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseYes}>
                Yes
              </Button>
              <Button variant="secondary" onClick={handleCloseNo}>
                No
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default FormHeader;
