import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  resetData,
  setCustomerDealerId,
  setCustomerStoreCode,
} from "../../../../redux/EditCustomerDealerSlice";
import {
  clearAdvancedSearch,
  resetSearchSettings,
  setActiveTab,
  setCustomerPageNumber,
  setCustomerSort,
  setCustomerSortValue,
  setPlantGroupPageNumber,
  setPlantGroupSelectionId,
  setPlantGroupSort,
  setPlantGroupSortValue,
  setPlantPageNumber,
  setPlantSelectedId,
  setPlantSort,
  setPlantSortValue,
} from "../../../../redux/CustomerDealerSlice";

function CustomerDelaerEditHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showCloseModal, setShowCloseModal] = useState(false);

  const editDetails = useSelector((state) => state.editcustomerDealers.editDetails);

  const handleCloseOnClick = () => {
    if (editDetails) {
      setShowCloseModal(true);
    } else {
      setTimeout(() => {
        navigate("/");
      }, 100);
      toast.success("Page Closed");
      dispatch(resetData());
      dispatch(setActiveTab("Dealer"));
      dispatch(setPlantGroupSelectionId());
      dispatch(setPlantSelectedId());
      dispatch(setCustomerDealerId());
      dispatch(resetSearchSettings());
      dispatch(clearAdvancedSearch());
      dispatch(setCustomerSort(false));
      dispatch(setCustomerSortValue(null));
      dispatch(setPlantSort(false));
      dispatch(setPlantSortValue(null));
      dispatch(setPlantGroupSort(false));
      dispatch(setPlantGroupSortValue(null));
      dispatch(setCustomerPageNumber(0));
      dispatch(setPlantGroupPageNumber(0));
      dispatch(setPlantPageNumber(0));
      dispatch(setCustomerStoreCode(""));
    }
  };

  const handleCloselNo = () => {
    setShowCloseModal(false);
  };
  const handleCloseYes = () => {
    setShowCloseModal(false);
    setTimeout(() => {
      navigate("/");
    }, 100);
    toast.success("Page Closed");
    dispatch(resetData());
    dispatch(resetSearchSettings());
    dispatch(clearAdvancedSearch());
    dispatch(setActiveTab("Dealer"));
    dispatch(setPlantGroupSelectionId());
    dispatch(setPlantSelectedId());
    dispatch(setCustomerDealerId());
    dispatch(setCustomerSort(false));
    dispatch(setCustomerSortValue(null));
    dispatch(setPlantSort(false));
    dispatch(setPlantSortValue(null));
    dispatch(setPlantGroupSort(false));
    dispatch(setPlantGroupSortValue(null));
    dispatch(setCustomerPageNumber(0));
    dispatch(setPlantGroupPageNumber(0));
    dispatch(setPlantPageNumber(0));
    dispatch(setCustomerStoreCode(""));
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleCloseOnClick}
        >
          Close
        </button>
      </div>

      <div className="col-xs-6">
        <ModalComponent
          show={showCloseModal}
          onHide={handleCloselNo}
          title={"Close Customer Dealer Changes"}
          body={"Please confirm you want to close the program without saving your changes"}
          handleYES={handleCloseYes}
          handleNO={handleCloselNo}
        />
      </div>
    </div>
  );
}

export default CustomerDelaerEditHeader;
