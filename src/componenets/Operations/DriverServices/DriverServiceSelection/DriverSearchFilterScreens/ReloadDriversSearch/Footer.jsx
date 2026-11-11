import React, { useEffect } from "react";
import { useState } from "react";
import ModalComponent from "../../../../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setDriverId,
  setUnitId,
  setChangeColor,
  setPageNumber,
  setPageNumberOfdriver,
  setMiles,
  setListOfSelectedStates,
  setDivisionStatus,
  setDriverCdlStatus,
  setCancelbtn,
  setChangeColorofdriver,
  setIsDeliveryStatesValid,
  setSelectedCustomerId,
  setDriverData,
  setUnitData,
  setPdfLoader,
  setCustomerNameInput,
} from "../../../../../../redux/DriverSearchFilterSlice";
import PreviewPopup from "../../../../../common/PreviewPopup";

import DriverService from "../../../../../../services/DriverService";
import toast from "react-hot-toast";

function Footer() {
  const currentURL = window.location.pathname;
  // Page number in the URL doesn't change when paging, so match on the route prefix only
  const isDriverScreen = currentURL.startsWith("/reload-drivers-search-driver/");
  const previousRoute = localStorage.getItem("previousRoute");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unitId = useSelector((state) => state.driverSearchFilter.unitId);
  const driverId = useSelector((state) => state.driverSearchFilter.driverId);

  const pageNumber = useSelector((state) => state.driverSearchFilter.pageNumber);
  const miles = useSelector((state) => state.driverSearchFilter.miles);
  const listOfSelectedStates = useSelector((state) => state.driverSearchFilter.listOfSelectedStates);
  const isDeliveryStatesValid = useSelector((state) => state.driverSearchFilter.isDeliveryStatesValid);
  const pageNumberOfDriver = useSelector((state) => state.driverSearchFilter.pageNumberOfDriver);
  const customerNameInput = useSelector((state) => state.driverSearchFilter.customerNameInput);
  const selectedCustomerId = useSelector((state) => state.driverSearchFilter.selectedCustomerId);
  const driverData = useSelector((state) => state.driverSearchFilter.driverData);
  const unitData = useSelector((state) => state.driverSearchFilter.unitData);
  const outputType = useSelector((state) => state.driverSearchFilter.outputType);
  const searchCriteria = useSelector((state) => state.driverSearchFilter.searchCriteria);
  const searchTerm = useSelector((state) => state.driverSearchFilter.searchTerm);
  const pageSize = useSelector((state) => state.driverSearchFilter.pageSize);
  const sortValue = useSelector((state) => state.driverSearchFilter.sortValue);
  const totalElements = useSelector((state) => state.driverSearchFilter.totalElements);
  const dispatchPK = useSelector((state) => state.driverSearchFilter.dispatchPK);

  const sortType = useSelector((state) => state.driverSearchFilter.sortType);
  const [customerPKList, setCustomerPKList] = useState([]);
  const [driveAway, setDriveaway] = useState(false);
  const [towable, setTowable] = useState(false);
  const [flatbed, setFlatbed] = useState(false);
  const divisionStatus = useSelector((state) => state.driverSearchFilter.divisionStatus);
  const driverCdlStatus = useSelector((state) => state.driverSearchFilter.driverCdlStatus);
  const changeColor = useSelector((state) => state.driverSearchFilter.changeColor);
  const totalPages = useSelector((state) => state.driverSearchFilter.totalPages);

  const [showPreview, setShowPreview] = useState(false);
  const [base64PDF, setBase64PDF] = useState();

  const [cancelShow, setCancelShow] = useState(false);
  const [showForwardModal, setShowForwardModal] = useState(false);

  const handleContinue = () => {
    if (currentURL === "/reload-drivers-search") {
      navigate(`/reload-drivers-search-unit`);
    } else if (currentURL === "/reload-drivers-search-unit") {
      if (["emailPdf", "emailExcel", "print"].includes(outputType) && dispatchPK) {
        handleOutputAction();
        return; // Stop navigation
      }

      if (unitId) {
        navigate(`/reload-drivers-search-driver/${unitId}/${pageNumberOfDriver}`);
      }
    } else if (isDriverScreen && driverId) {
      navigate(`/driver-service-selection/${driverId}/form`);
    }
  };
  const handleCancel = () => {
    dispatch(setUnitId(null));
    dispatch(setDriverId(null));
    dispatch(setChangeColor(false));
    dispatch(setChangeColorofdriver(false));
    dispatch(setPageNumber(0));
    dispatch(setCancelbtn(true));
    dispatch(setIsDeliveryStatesValid(false));
    dispatch(setDriverData([]));
    dispatch(setUnitData([]));
    dispatch(setPageNumberOfdriver(0));
    dispatch(setSelectedCustomerId(null));
    dispatch(setCustomerNameInput(""));
    dispatch(setListOfSelectedStates([]));

    if (currentURL === `/reload-drivers-search`) {
      dispatch(setCancelbtn(false));
      dispatch(setMiles(0));
      dispatch(setListOfSelectedStates([]));
      dispatch(setDivisionStatus("driveaway"));
      dispatch(setDriverCdlStatus("both"));
      dispatch(setIsDeliveryStatesValid(false));
      dispatch(setSelectedCustomerId(null));
      dispatch(setChangeColor(false));
      dispatch(setIsDeliveryStatesValid(false));
    } else {
      dispatch(setIsDeliveryStatesValid(false));

      navigate(`/reload-drivers-search`);
    }
  };

  useEffect(() => {
    const currentURL = window.location.pathname;

    if (currentURL !== "/driver-service-selection" && currentURL !== "/reload-drivers-search") {
      localStorage.removeItem("previousRoute");
    }
  }, []);

  const handleOutputAction = () => {
    dispatch(setPdfLoader(true));

    if (["emailPdf", "emailExcel", "print"].includes(outputType)) {
      const apiOutputType = outputType === "print" ? "display" : outputType;

      DriverService.fetchUnitAndDriverBasedOntheReloadSearch(
        searchCriteria,
        searchTerm,
        pageNumber,
        pageSize,
        divisionStatus,
        driverCdlStatus,
        listOfSelectedStates,
        sortValue,
        sortType,
        selectedCustomerId,
        miles,
        apiOutputType,
        dispatchPK
      )
        .then((response) => {
          const data = response?.data;
          const { errorCode, errorMessage, content } = data;
          if (errorCode === 1) {
            toast.error(errorMessage || "Something went wrong!!");
            return;
          }

          if (outputType === "print" && content) {
            setBase64PDF(content);
            setShowPreview(true);
            return;
          }

          if (outputType === "emailPdf" || outputType === "emailExcel") {
            toast.success("Mail Sent Successfully");
          }
        })
        .catch((err) => {
          console.error("API call failed", err);
          toast.error("Action failed");
        })
        .finally(() => {
          dispatch(setPdfLoader(false));
        });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2 ">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>

      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            handleContinue();
          }}
          disabled={
            (listOfSelectedStates.length > 0 && !isDeliveryStatesValid) ||
            (currentURL === "/reload-drivers-search-unit" && (unitData.length <= 0 || !dispatchPK)) ||
            (isDriverScreen && (!driverId || driverData.length <= 0)) ||
            (customerNameInput && !selectedCustomerId)
          }
        >
          Continue
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleCancel}
        >
          Cancel
        </button>

        <ModalComponent
          show={cancelShow}
          onHide={""}
          title={"Cancel  Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={""}
          handleNO={""}
        />
        <ModalComponent
          show={""}
          onHide={""}
          showOK
          title={showForwardModal ? "Warning" : "Warning"}
          body={""}
          handleYES={""}
          showError={true}
        />
        <PreviewPopup show={showPreview} onHide={() => setShowPreview(false)} base64PDF={base64PDF} />
      </div>
    </div>
  );
}

export default Footer;
