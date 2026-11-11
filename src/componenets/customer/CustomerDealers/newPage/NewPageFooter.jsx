import React from "react";
import ButtonComponent from "../../../common/Button";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
import ModalComponent from "../../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  resetData,
  setDealerId,
  setDealerName,
  setDpuCustomerId,
  setNewFlag,
  setSelectionGroup,
  setSelectionId,
  setSelectionName,
} from "../../../../redux/EditCustomerDealerSlice";
import {
  setActiveTab,
  setCustomerID,
  setCustomerSearchString,
  setCustomerSort,
  setCustomerSortValue,
  setPlantGroupID,
  setPlantGroupSearchString,
  setPlantGroupSort,
  setPlantGroupSortValue,
  setPlantID,
  setPlantSearchString,
  setPlantSort,
  setPlantSortValue,
} from "../../../../redux/CustomerDealerSlice";

const NewPageFooter = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const [showCancelModal, setShowCancelModal] = useState(false);

  const id = params.id;

  const plantId = useSelector((state) => state.customerDealersFilter.plantId);
  const plantGroupId = useSelector((state) => state.customerDealersFilter.plantGroupId);
  const customerId = useSelector((state) => state.customerDealersFilter.customerId);
  const plantName = useSelector((state) => state.customerDealersFilter.plantName);
  const plantSearchString = useSelector((state) => state.customerDealersFilter.plantSearchString);

  const plantGroupName = useSelector((state) => state.customerDealersFilter.plantGroupName);
  const customerName = useSelector((state) => state.customerDealersFilter.customerName);
  const name = useSelector((state) => state.customerDealersFilter.dealerName);
  const dpuCustomer = useSelector((state) => state.editcustomerDealers.dpuCustomer);

  const handleCancelOnClick = () => {
    setShowCancelModal(true);
  };

  const handleCancelNo = () => {
    setShowCancelModal(false);
  };
  const handleCancelYes = () => {
    setShowCancelModal(false);
    setTimeout(() => {
      navigate("/customer-dealers-browse/" + id + "/0");
    }, 20);
    toast.success("Changes Cancelled");
    dispatch(setPlantSearchString(""));
    dispatch(setPlantID(""));
    dispatch(setPlantGroupID(""));
    dispatch(setPlantGroupSearchString(""));
    dispatch(setCustomerID(""));
    dispatch(setCustomerSearchString(""));
    dispatch(setActiveTab("Dealer"));
    dispatch(setCustomerSort(false));
    dispatch(setCustomerSortValue(null));
    dispatch(setPlantSort(false));
    dispatch(setPlantSortValue(null));
    dispatch(setPlantGroupSort(false));
    dispatch(setPlantGroupSortValue(null));
  };
  const handleAddOnClick = () => {
    dispatch(setDealerId(id));
    dispatch(setDealerName(name));
    dispatch(setNewFlag(true));
    dispatch(resetData());
    // DPU customer with a plant: saved as a plant record linked to that customer (selectionGroup "CustomerDPU")
    dispatch(setDpuCustomerId(plantId && customerId && dpuCustomer ? customerId : ""));
    if (plantId) {
      dispatch(setSelectionGroup("Plant"));
      dispatch(setSelectionName(plantName));
      dispatch(setSelectionId(plantId));

      setTimeout(() => {
        navigate("/add-customer-dealers-details/Plant/" + id);
      }, 20);

      dispatch(setPlantSearchString(""));
      dispatch(setPlantID(""));
    } else if (plantGroupId) {
      dispatch(setSelectionGroup("Plant Group"));
      dispatch(setSelectionId(plantGroupId));
      dispatch(setSelectionName(plantGroupName));
      setTimeout(() => {
        navigate("/add-customer-dealers-details/Plant-Group/" + id);
      }, 20);
      dispatch(setPlantGroupID(""));
      dispatch(setPlantGroupSearchString(""));
    } else if (customerId) {
      dispatch(setSelectionGroup("Customer"));
      dispatch(setSelectionName(customerName));
      dispatch(setSelectionId(customerId));
      setTimeout(() => {
        navigate("/add-customer-dealers-details/Customer/" + id);
      }, 20);
      dispatch(setCustomerID(""));
      dispatch(setCustomerSearchString(""));
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <div>
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={handleAddOnClick}
            disabled={!(plantGroupId || plantId || customerId) || (plantSearchString && !plantId)}
          >
            Add
          </button>

          <ButtonComponent
            label={"Cancel"}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={handleCancelOnClick}
          />
          <ModalComponent
            show={showCancelModal}
            onHide={handleCancelNo}
            title={"Cancel New Page Selection"}
            body={"Please confirm you want to cancel your changes"}
            handleYES={handleCancelYes}
            handleNO={handleCancelNo}
          />
        </div>
      </div>
    </div>
  );
};

export default NewPageFooter;
