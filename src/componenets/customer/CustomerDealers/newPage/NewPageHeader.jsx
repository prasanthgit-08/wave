import React, { useState } from "react";
import ModalComponent from "../../../common/ModalComponent";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  clearAdvancedSearch,
  resetSearchSettings,
  setActiveTab,
  setCustomerID,
  setCustomerSearchString,
  setPlantGroupID,
  setPlantGroupSearchString,
  setPlantGroupSelectionId,
  setPlantID,
  setPlantSearchString,
  setPlantSelectedId,
} from "../../../../redux/CustomerDealerSlice";
import { setCustomerDealerId } from "../../../../redux/EditCustomerDealerSlice";

const NewPageHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showCloseModal, setShowCloseModal] = useState(false);

  const handleCancelOnClick = () => {
    setShowCloseModal(true);
  };

  const handleCancelNo = () => {
    setShowCloseModal(false);
  };
  const handleCancelYes = () => {
    setShowCloseModal(false);
    setTimeout(() => {
      navigate("/");
    }, 100);
    toast.success("Page Closed");
    dispatch(setPlantSearchString(""));
    dispatch(setPlantID(""));
    dispatch(setPlantGroupID(""));
    dispatch(setPlantGroupSearchString(""));
    dispatch(setCustomerID(""));
    dispatch(setCustomerSearchString(""));
    dispatch(setActiveTab("Dealer"));
    dispatch(setPlantGroupSelectionId());
    dispatch(setPlantSelectedId());
    dispatch(setCustomerDealerId());
    dispatch(resetSearchSettings());
    dispatch(clearAdvancedSearch());
  };
  return (
    <div>
      <div>
        <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={handleCancelOnClick}
          >
            Close
          </button>
        </div>

        <div className="col-xs-6"></div>
      </div>
      <ModalComponent
        show={showCloseModal}
        onHide={handleCancelNo}
        title={"Close New Page Selection"}
        body={"Please confirm you want to close the new page"}
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />
    </div>
  );
};

export default NewPageHeader;
