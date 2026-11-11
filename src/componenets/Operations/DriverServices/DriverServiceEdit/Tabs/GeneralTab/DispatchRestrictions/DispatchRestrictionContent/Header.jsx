import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetChanges,
  setChangeColor,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setSelectedId,
} from "../../../../../../../../redux/DispatchRestrictionsSlice";
import ModalComponent from "../../../../../../../common/ModalComponent";

function Header({ styles }) {
  const { driverId, id } = useParams();

  const [closeShow, setCloseShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editFormData = useSelector((state) => state.dispatchRestrictionsReducer.editFormData);

  const notes = useSelector((state) => state.dispatchRestrictionsReducer.notes);
  const customerId = useSelector((state) => state.dispatchRestrictionsReducer.customerId);
  const dealerId = useSelector((state) => state.dispatchRestrictionsReducer.dealerId);
  const specialCodeId = useSelector((state) => state.dispatchRestrictionsReducer.specialCodeId);
  const stateCode = useSelector((state) => state.dispatchRestrictionsReducer.stateCode);
  const allowDispatch = useSelector((state) => state.dispatchRestrictionsReducer.allowDispatch);

  const viewDetail = useSelector((state) => state.dispatchRestrictionsReducer.viewDetail);

  const handleClose = () => {
    if (viewDetail) {
      dispatch(setSelectedId(null));
      dispatch(setSearchTerm(""));
      dispatch(setSearchCriteria("Beginning"));
      dispatch(setPageNumber(0));
      dispatch(setChangeColor(false));

      navigate(`/driver-service-selection/${driverId}/form`);
      toast.success("Page Closed");
      return;
    }
    if (hasChanges()) {
      setCloseShow(true);
    } else {
      dispatch(setSelectedId(null));
      dispatch(setSearchTerm(""));
      dispatch(setSearchCriteria("Beginning"));
      dispatch(setPageNumber(0));
      dispatch(setChangeColor(false));

      navigate(`/driver-service-selection/${driverId}/form`);
      toast.success("Page Closed");
    }
  };

  const handleCloseNo = () => setCloseShow(false);

  const handleCloseYes = () => {
    dispatch(setSelectedId(null));
    dispatch(setSearchTerm(""));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setPageNumber(0));
    dispatch(setChangeColor(false));
    navigate(`/driver-service-selection/${driverId}/form`);
    toast.success("Page closed");
  };

  const hasChanges = () => {
    if (!id) {
      return (
        notes.trim() !== "" ||
        customerId !== null ||
        dealerId !== null ||
        specialCodeId !== null ||
        stateCode !== ""
      );
    }
    if (!editFormData) return false;

    return (
      (notes || "") !== (editFormData.notes || "") ||
      (customerId || null) !== (editFormData.customerFK || null) ||
      (dealerId || null) !== (editFormData.dealerFK || null) ||
      (specialCodeId || null) !== (editFormData.specialCodeFK || null) ||
      (stateCode || "") !== (editFormData.stateCode || "") ||
      (allowDispatch || false) !== (editFormData.allowDispatch || false)
    );
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={handleClose}
        >
          Close
        </button>
      </div>
      <ModalComponent
        show={closeShow}
        onHide={handleCloseNo}
        title="Close Dispatch Restriction Changes "
        body="Please confirm you want to close the program without saving your changes"
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
}

export default Header;
