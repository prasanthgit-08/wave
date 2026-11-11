import React, { useState } from "react";
import ButtonComponent from "../../../common/Button";
import ModalComponent from "../../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  resetData,
  setCustomerDealerId,
  setCustomerStoreCode,
  setData,
  setDpuCustomerId,
  setEditDetails,
  setNewFlag,
} from "../../../../redux/EditCustomerDealerSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import CustomerDealersService from "../../../../services/CustomerDealersService";
import {
  setActiveTab,
  setCustomerSort,
  setCustomerSortValue,
  setPlantGroupSelectionId,
  setPlantGroupSort,
  setPlantGroupSortValue,
  setPlantSelectedId,
  setPlantSort,
  setPlantSortValue,
} from "../../../../redux/CustomerDealerSlice";
import { resetSearch } from "../../../../redux/CustomerDealerRoutesSlice";

function CustomerDelaerEditFooter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const id = params.dealerId;
  const selectionId = params.selectionId;
  const group = params.group;

  const editDetails = useSelector((state) => state.editcustomerDealers.editDetails);
  const groupId = useSelector((state) => state.editcustomerDealers.selectionId);
  const newFlag = useSelector((state) => state.editcustomerDealers.newFlag);
  const customerDealerData = useSelector((state) => state.editcustomerDealers.customerDealerData);
  const customerDealer = useSelector((state) => state.editcustomerDealers.customerDealer);
  const isCanadian = useSelector((state) => state.editcustomerDealers.isCanadian);
  const activeTab = useSelector((state) => state.editcustomerDealers.activeTab);
  const validGeneralTab = useSelector((state) => state.editcustomerDealers.validGeneralTab);
  const validPOETab = useSelector((state) => state.editcustomerDealers.validPOETab);
  const validFlatratesTab = useSelector((state) => state.editcustomerDealers.validFlatratesTab);
  const customerStoreCode = useSelector((state) => state.editcustomerDealers.customerStoreCode);
  const dpuCustomerId = useSelector((state) => state.editcustomerDealers.dpuCustomerId);
  // Only a new plant record added together with a DPU customer
  const isDpuPlant = !selectionId && group === "Plant" && !!dpuCustomerId;

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDeleteModal, setShowDeletelModal] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loadng, setLoadng] = useState(false);

  const handleDeleteOnClick = () => {
    setShowDeletelModal(true);
  };
  const handleDeleteNo = () => {
    setShowDeletelModal(false);
  };

  const handleDeleteYes = () => {
    setLoadng(true);
    CustomerDealersService.deleteCustomerDealer(selectionId)
      .then(() => {
        navigate("/customer-dealers-browse/" + id + "/0");
        toast.success("Customer Dealer Deleted");
        setShowDeletelModal(false);
        setLoadng(false);
      })
      .catch((error) => {
        setLoadng(false);
        setShowDeletelModal(false);
        setErrorShow(true);
        setErrorMsg(error?.response?.data?.errorMsg || "Something went wrong!! Failed to delete!!");
      });
  };

  const handleCancelOnClick = () => {
    if (editDetails) {
      setShowCancelModal(true);
    } else {
      setTimeout(() => {
        navigate("/customer-dealers-browse/" + id + "/0");
      }, 100);
      toast.success("Changes Cancelled");
      dispatch(resetData());
    }
  };
  const handleSave = () => {
    dispatch(setNewFlag(false));
    setLoadng(true);
    CustomerDealersService.saveCustomerDealer(
      customerDealer,
      id,
      isDpuPlant ? "CustomerDPU" : group,
      groupId,
      selectionId,
      customerStoreCode,
      isDpuPlant ? dpuCustomerId : undefined
    )
      .then(() => {
        navigate("/customer-dealers-browse/" + id + "/0");
        if (selectionId) {
          toast.success("Customer Dealer Updated");
        } else {
          toast.success("Customer Dealer Saved");
          dispatch(setActiveTab("Dealer"));
          dispatch(setCustomerSort(false));
          dispatch(setCustomerSortValue(null));
          dispatch(setPlantSort(false));
          dispatch(setPlantSortValue(null));
          dispatch(setPlantGroupSort(false));
          dispatch(setPlantGroupSortValue(null));
          dispatch(setPlantGroupSelectionId());
          dispatch(setPlantSelectedId());
          dispatch(setCustomerDealerId(""));
          dispatch(setCustomerStoreCode(""));
          dispatch(setDpuCustomerId(""));
        }
        setLoadng(false);
      })
      .catch(() => {
        setLoadng(false);
      });
  };

  const handleCancelNo = () => {
    setShowCancelModal(false);
  };
  const handleCancelYes = () => {
    if (newFlag) {
      setTimeout(() => {
        navigate("/customer-dealers-browse/" + id + "/0");
      }, 100);
      toast.success("Changes Cancelled");
      dispatch(setNewFlag(false));
      dispatch(resetData());
      dispatch(setActiveTab("Dealer"));
      dispatch(setCustomerSort(false));
      dispatch(setCustomerSortValue(null));
      dispatch(setPlantSort(false));
      dispatch(setPlantSortValue(null));
      dispatch(setPlantGroupSort(false));
      dispatch(setPlantGroupSortValue(null));
      dispatch(setCustomerStoreCode(""));
    } else {
      setShowCancelModal(false);
      dispatch(setEditDetails(false));
      dispatch(setData(customerDealerData));
    }
  };
  useEffect(() => {
    if (window.location.pathname === "/add-customer-dealers-details/" + id + "/" + selectionId) {
      dispatch(setEditDetails(true));
      dispatch(setNewFlag(true));
    }
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10">
        <ButtonComponent
          route={"/customer-dealer-routes/" + selectionId + "/" + group + "/" + id}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          label={" Routes"}
          hidden={!selectionId || (editDetails && !(activeTab === "flatrate"))}
          onClick={() => {
            dispatch(resetSearch());
          }}
        />
      </div>

      <div className="d-flex align-items-center">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          disabled={!validGeneralTab || (!validPOETab && isCanadian) || !validFlatratesTab}
          hidden={!editDetails}
          onClick={handleSave}
        >
          Save
        </button>
        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          label={"Cancel"}
          onClick={handleCancelOnClick}
        />

        <div className="d-flex align-items-center flex-wrap">
          <ButtonComponent
            route={""}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
            label={"Edit"}
            hidden={editDetails}
            onClick={() => {
              dispatch(setEditDetails(true));
            }}
          />

          <ButtonComponent
            route={""}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
            label={"Delete"}
            hidden={editDetails}
            onClick={handleDeleteOnClick}
          />
          {loadng && (
            <div className="fade modal-backdrop show">
              <div className="pos-center">
                <div className="loader"></div>
              </div>
            </div>
          )}
          <ModalComponent
            show={showCancelModal}
            onHide={handleCancelOnClick}
            title={"Cancel Customer Dealer Changes"}
            body={"Please confirm you want to cancel your changes"}
            handleYES={handleCancelYes}
            handleNO={handleCancelNo}
          />
          <ModalComponent
            show={showDeleteModal}
            onHide={handleDeleteNo}
            title={"Delete Customer Dealer "}
            body={"Please confirm you want to Delete this Customer Dealer"}
            handleYES={handleDeleteYes}
            handleNO={handleDeleteNo}
          />
          <ModalComponent
            show={errorShow}
            onHide={() => {
              setErrorShow(false);
            }}
            title={"Delete failed!"}
            body={errorMsg}
            handleOK={() => {
              setErrorShow(false);
            }}
            showOK
            showError
          />
        </div>
      </div>
    </div>
  );
}

export default CustomerDelaerEditFooter;
