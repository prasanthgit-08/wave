import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  resetChangedItems,
  resetInvalidItemDatePKs,
  resetStates,
  setChangedArray,
  setChangesCancelled,
  setCompletedCheckFlag,
  setDeleaseItemsListComplete,
  setDriverDeleaseData,
  setIsFromDriverDelease,
  setIsLetterTab,
  setIsStatusChangingFromInactiveToTerminated,
  setItemsPageNumber,
  setUserData,
  setViewDetail,
  updateitemsListingDataElement,
} from "../../../../../redux/DriverDeleaseSlice";
import ModalComponent from "../../../../common/ModalComponent";
import DriverDeleaseService from "../../../../../services/DriverDeleaseService";
import toast from "react-hot-toast";
import { setNormalSortFlag, setNormalSortValue } from "../../../../../redux/DeleaseItemsSlice";
import {
  setDisableDeleaseButton,
  setEditFormData,
  setIsDeleaseProcess,
  setIsDeleaseRequestEdit,
  setIsDoubleClick,
  setIsSettingDeleaseRequestProcessed,
} from "../../../../../redux/DriverDeleaseRequestsSlice";
import PreviewPopup from "../../../../common/PreviewPopup";
import {
  setFlagStatus,
  setIsDeleaseCompliance,
  setPageNumber,
  setReturnFromDelease,
} from "../../../../../redux/Compliance/DriverDeleaseRequestSlice";
import LoadingIcon from "../../../../common/LoadingIcon";
const FormFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [showPreview, setshowPreview] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [isLetterButtonActive, setIsLetterButtonActive] = useState(false);
  const [objectKey, setObjectKey] = useState("DELEASEPDF");
  const [fileContent, setFileContent] = useState(null);
  const { id, deleaserequestPK } = useParams();
  const { driverId } = useParams();
  const itemsPageNumber = useSelector((state) => state.driverDeleaseReducer.itemsPageNumber);
  const viewDetail = useSelector((state) => state.driverDeleaseReducer.viewDetail);
  const driverDeleaseData = useSelector((state) => state.driverDeleaseReducer.driverDeleaseData);
  const isGeneralTabValid = useSelector((state) => state.driverDeleaseReducer.isGeneralTabValid);
  const isDatesTabValid = useSelector((state) => state.driverDeleaseReducer.isDatesTabValid);
  const invalidItemDatePKs = useSelector((state) => state.driverDeleaseReducer.invalidItemDatePKs);
  const itemsListingData = useSelector((state) => state.driverDeleaseReducer.itemsListingData);
  const changedArray = useSelector((state) => state.driverDeleaseReducer.changedArray);
  const deleaseItemsListingData = useSelector((state) => state.driverDeleaseReducer.deleaseItemsListingData);
  const driverDeleasedCheckedList = useSelector(
    (state) => state.driverDeleaseReducer.driverDeleasedCheckedList
  );
  const isSettingDeleaseRequestProcessed = useSelector(
    (state) => state.driverDeleaseRequestsReducer.isSettingDeleaseRequestProcessed
  );
  const deleaseItemsListComplete = useSelector(
    (state) => state.driverDeleaseReducer.deleaseItemsListComplete
  );
  const status = useSelector((state) => state.driverDeleaseReducer.status);
  const editFormData = useSelector((state) => state.driverDeleaseReducer.editFormData);
  const [voided, setVoided] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [terminated, setTerminated] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const currentId = new URLSearchParams(location.search).get("currentId");
  const driverDeleaseRequestObject = useSelector(
    (state) => state.driverDeleaseRequestsReducer.driverDeleaseRequestObject
  );
  const isDeleaseProcess = useSelector((state) => state.driverDeleaseRequestsReducer.isDeleaseProcess);
  /****Different slice used in compliance****/
  const isDeleaseCompliance = useSelector((state) => state.deleaseRequestReducer.isDeleaseCompliance);
  const deleaseRequestRecord = useSelector((state) => state.deleaseRequestReducer.deleaseRequestRecord);

  useEffect(() => {
    if (editFormData !== null && id !== null) {
      setCompleted(editFormData.completed ? editFormData.completed : false);
      setVoided(editFormData.voided ? editFormData.voided : false);
      setTerminated(editFormData.terminated ? editFormData.terminated : false);
    }
  }, [editFormData]);
  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setNormalSortFlag(false));
      dispatch(setNormalSortValue(null));
      dispatch(setItemsPageNumber(0));
      dispatch(setViewDetail(false));
      dispatch(setIsStatusChangingFromInactiveToTerminated(false));
      dispatch(setDeleaseItemsListComplete([]));
      dispatch(setIsFromDriverDelease(false));
      if (isDeleaseProcess) {
        dispatch(setEditFormData(null));
        dispatch(setIsDeleaseRequestEdit(false));
        navigate(`/driver-delease-requests/${driverId}/${driverDeleaseRequestObject.driverDeleaseRequestPK}`);
      } else if (isDeleaseCompliance) {
        dispatch(setEditFormData(null));
        navigate(`/delease-request`);
      } else {
        navigate(`/driver-delease/${driverId}`);
      }
      /****From Delease Request Set the delease process flag false*****/
      dispatch(setIsDeleaseProcess(false));
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setChangesCancelled(true));
      dispatch(setViewDetail(true));
      /****Reset only changed items in the items tab***/
      dispatch(resetChangedItems());
      dispatch(setNormalSortFlag(false));
      dispatch(setNormalSortValue(null));
      dispatch(setUserData(null));
      dispatch(setItemsPageNumber(0));
      dispatch(setIsStatusChangingFromInactiveToTerminated(false));
      dispatch(setCompletedCheckFlag(false));
      /****From Delease Request Set the delease process flag false*****/
      dispatch(setIsDeleaseProcess(false));
      toast.success("Changes Cancelled");
    } else {
      if (isDeleaseProcess) {
        dispatch(setEditFormData(null));
        dispatch(setIsDeleaseRequestEdit(false));
        navigate(`/driver-delease-requests/${driverId}/${driverDeleaseRequestObject.driverDeleaseRequestPK}`);
      } else if (isDeleaseCompliance) {
        dispatch(setEditFormData(null));
        dispatch(setReturnFromDelease(false));
        navigate(`/delease-request`);
      } else {
        navigate(`/driver-delease/${driverId}`);
      }
      dispatch(setViewDetail(false));
      dispatch(setNormalSortFlag(false));
      dispatch(setNormalSortValue(null));
      dispatch(setItemsPageNumber(0));
      dispatch(setIsStatusChangingFromInactiveToTerminated(false));
      /****From Delease Request Set the delease process flag false*****/
      dispatch(setIsDeleaseProcess(false));
      /****From Delease Request Compliance Set the delease process flag false*****/
      dispatch(setIsDeleaseCompliance(false));
      dispatch(resetStates());
      toast.success("Changes Cancelled");
    }
  };
  /******
   * Set The Flag to Set the Processed and related Processed fields
   * in Driver Delease Request Record,
   * if it is called from Driver Delease Request Program
   ******/
  useEffect(() => {
    if (isDeleaseProcess) {
      dispatch(setIsSettingDeleaseRequestProcessed(true));
    }
  }, [isDeleaseProcess]);

  /*****Save Driver Delease Record****/
  const saveRecord = () => {
    setLoading(true);
    DriverDeleaseService.createOrUpdateDriverDelease(driverDeleaseData)
      .then((response) => {
        if (isDeleaseProcess) {
          dispatch(setIsDoubleClick(false));
          dispatch(setEditFormData(null));
          dispatch(setIsDeleaseRequestEdit(false));
          navigate(
            `/driver-delease-requests/${driverId}/${driverDeleaseRequestObject?.driverDeleaseRequestPK}`
          );
        } else if (isDeleaseCompliance) {
          dispatch(setReturnFromDelease(true));
          dispatch(setPageNumber(0));
          navigate(`/delease-request`);
        } else {
          navigate(`/driver-delease/${driverId}`);
        }
        dispatch(setDisableDeleaseButton(true));
        if (id) {
          toast.success("Driver Delease  Updated");
        } else {
          toast.success("Driver Delease Created");
        }
        dispatch(setChangedArray([]));
        dispatch(resetInvalidItemDatePKs());
        dispatch(setItemsPageNumber(0));
        dispatch(setNormalSortFlag(false));
        dispatch(setNormalSortValue(null));
        dispatch(setIsStatusChangingFromInactiveToTerminated(false));
        dispatch(setDeleaseItemsListComplete([]));
        dispatch(setIsFromDriverDelease(false));
      })
      .catch((error) => {
        if (isDeleaseProcess) {
          navigate(
            `/driver-delease-requests/${driverId}/${driverDeleaseRequestObject?.driverDeleaseRequestPK}`
          );
        } else if (isDeleaseCompliance) {
          navigate(`/driver-requestview/${driverId}/${deleaseRequestRecord.DriverDeleaseRequestPK}`);
        } else {
          navigate(`/driver-delease/${driverId}`);
        }
        if (id) {
          toast.error("Failed to Update Driver Delease");
        } else {
          toast.error("Failed to Create Driver Delease");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  /****
   * Set the changed array to driverdeleaseitems
   * array and include in the Driver Delease
   * Itemssave data
   * ******/
  const itemsTabFormData = () => {
    dispatch(
      setDriverDeleaseData({
        driverDeleaseItemsArray: changedArray,
        deleaseItemsArray: deleaseItemsListComplete,
      })
    );
  };
  useEffect(() => {
    itemsTabFormData();
  }, [changedArray, deleaseItemsListComplete]);

  /*****Save Button Validation
   * Button should be valid only if
   * Generaltab and DatesTab is valid
   * and no Items tab date is invalid
   * *****/
  useEffect(() => {
    if (isGeneralTabValid && isDatesTabValid && invalidItemDatePKs?.length === 0) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [isGeneralTabValid, isDatesTabValid, invalidItemDatePKs]);
  /*****
   * Setting and filtering the changed array to save
   *  from the browse list backend
   * *****/
  useEffect(() => {
    let currentChangedArray = itemsListingData.filter(
      (item) =>
        (item.addressed === true &&
          item.alreadyAddressed === false &&
          item.addressedDate !== item.alreadyAddressedDate) ||
        (item.addressed === true &&
          item.alreadyAddressed === false &&
          item.addressedDate === item.alreadyAddressedDate)
    );

    /****
     * Create a map to keep track of the latest `addressedDate` values
     * ****/
    const changedArrayMap = new Map();
    changedArray.forEach((item) => changedArrayMap.set(item.driverDeleaseItemPK, item));
    currentChangedArray.forEach((item) => changedArrayMap.set(item.driverDeleaseItemPK, item));
    /***Convert the map back to an array***/
    const updatedChangedArray = Array.from(changedArrayMap.values());
    dispatch(setChangedArray(updatedChangedArray));
  }, [itemsListingData, itemsPageNumber]);

  /*****
   * Set the Isletterbutton active to make the letterButton enabled
   * ******/
  const checkLetterButtonActive = () => {
    DriverDeleaseService.checkCompletedandNotTerminationLetterSent(id)
      .then((res) => {
        setIsLetterButtonActive(res.data);
      })
      .catch((err) => console.log(err));
  };
  /****Call the API to set the letter button active *****/
  useEffect(() => {
    if (id) {
      checkLetterButtonActive();
    }
  }, [id]);

  /******
   * Display the Termination for an already Deleased Driver as PDF PopUp
   ****/
  const displayTerminationLetter = () => {
    setLoading(true);
    DriverDeleaseService.displayTerminationLetter(driverId, objectKey)
      .then((res) => {
        setFileContent(res.data.fileContent);
        setshowPreview(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap"></div>

      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!viewDetail}
          onClick={() => {
            if (editFormData?.terminationLetter === false) {
              navigate(`/driver-delease/${driverId}/${id}/delease-letters`);
              dispatch(setIsLetterTab(true));
            } else {
              displayTerminationLetter();
            }
          }}
          disabled={!editFormData?.completed || voided || status === "inactive"}
        >
          Letter
        </button>
        <PreviewPopup show={showPreview} onHide={() => setshowPreview(false)} base64PDF={fileContent} />
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={viewDetail}
          onClick={() => saveRecord()}
          disabled={disableSave}
        >
          Save
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={""}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!viewDetail}
          onClick={() => {
            dispatch(setViewDetail(false));
          }}
          disabled={viewDetail && (voided || (completed && terminated))}
        >
          Edit
        </button>
        {/* Model Cancel*/}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Driver Delease Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
    </div>
  );
};

export default FormFooter;
