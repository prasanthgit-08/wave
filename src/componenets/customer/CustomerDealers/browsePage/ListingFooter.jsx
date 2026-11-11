import React from "react";
import ButtonComponent from "../../../common/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  resetDealerDetails,
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
import { setCustomerDealerId } from "../../../../redux/EditCustomerDealerSlice";

const ListingFooter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancelOnClick = () => {
    setTimeout(() => {
      navigate("/customer-dealers");
    }, 100);
    toast.success("Selection Cancelled");
    dispatch(resetDealerDetails());
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
  };
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center ">
        <div>
          <ButtonComponent
            label={"Cancel"}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={handleCancelOnClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingFooter;
