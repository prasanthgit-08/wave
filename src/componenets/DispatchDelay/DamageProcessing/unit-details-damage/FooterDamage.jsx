import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { setNotes, setSelectedCompanyName } from "../../../../redux/EditMaster/UnitSelectionSlice";

import DelayProcessingService from "../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import {
  setActiveKey,
  setCustomerNotes,
  setDelayContact,
  setDelayContactExtension,
  setDelayContactFAX,
  setDelayContactPhone,
  setDelayCustomerNotes,
  setDelayDate,
  setDelayedUnitCodeFK,
  setDelayedUnitCodeInput,
  setDelayedUnitPK,
  setDelayInHouseNotes,
  setDeliveryCheck,
  setEditFlag,
  setEmailData,
  setEmailList,
  setInHouseNotes,
  setIsEmailClicked,
  setIsPostal,
  setLocationContact,
  setLocationPhone,
  setReported,
  setViewOnly,
} from "../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import ModalComponent from "../../../common/ModalComponent";
import DelayDamageService from "../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";
import BreakdownProcessingService from "../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";

const FooterDamage = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isReroute, setIsReroute] = useState(false);
  const [isMove, setIsMove] = useState(false);
  const [isReleaseDriver, setIsReleaseDriver] = useState(false);
  const [isReturn, setIsReturn] = useState(false);
  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });

  const [selectedCompanyName, setCompanyName] = useState(() => {
    // Initialize state from localStorage
    return localStorage.getItem("selectedCompany");
  });

  const damageData = useSelector((state) => state.delayDamage.damageData);
  const damageSaveFlag = useSelector((state) => state.delayDamage.damageSaveFlag);

  const editFlag = useSelector((state) => state.delayDamage.editFlag);
  const breakdownData = useSelector((state) => state.delayDamage.breakdown);

  const viewOnly = useSelector((state) => state.delayDamage.viewOnly);
  const user = useSelector((state) => state.delayDamage.user);
  const inHouseNotes = useSelector((state) => state.delayDamage.inHouseNotes);
  const delayedUnitCodeFK = useSelector((state) => state.delayDamage.delayedUnitCodeFK);
  const delayDate = useSelector((state) => state.delayDamage.delayDate);

  const workingUnitLocationFK = useSelector((state) => state.delayProcessing.workingUnitLocationFK);
  const reportedDate = useSelector((state) => state.delayProcessing.reported);
  const delayContact = useSelector((state) => state.delayProcessing.delayContact);
  const delayContactPhone = useSelector((state) => state.delayProcessing.delayContactPhone);
  const delayContactExtension = useSelector((state) => state.delayProcessing.delayContactExtension);
  const delayContactFAX = useSelector((state) => state.delayProcessing.delayContactFAX);
  const customerNotes = useSelector((state) => state.delayProcessing.customerNotes);
  const delayInHouseNotes = useSelector((state) => state.delayProcessing.delayInHouseNotes);
  const delayCustomerNotes = useSelector((state) => state.delayProcessing.delayCustomerNotes);
  const emailData = useSelector((state) => state.delayProcessing.emailList);
  const locationContact = useSelector((state) => state.delayProcessing.locationContact);
  const locationPhone = useSelector((state) => state.delayProcessing.locationPhone);
  const activeKey = useSelector((state) => state.delayProcessing.activeKey);
  const delayedUnitCode = useSelector((state) => state.delayProcessing.delayedUnitCodeFK);
  const isPostal = useSelector((state) => state.delayProcessing.isPostal);
  const initialEmailList = useSelector((state) => state.delayProcessing.initialEmailList);
  const isCurrentLocEmpty = useSelector((state) => state.delayProcessing.isCurrentLocEmpty);
  let dealerCity = useSelector((state) => state.editDealerReducer.dealerCity);
  let dealerState = useSelector((state) => state.editDealerReducer.dealerStatecode);
  let dealerCanadian = useSelector((state) => state.editDealerReducer.dealerCanadian);
  let dealerPost = useSelector((state) => state.editDealerReducer.dealerPostcode);
  const postalCodeOnChange = useSelector((state) => state.editDealerReducer.postalCodeOnChange);

  const currentLocation = useSelector((state) => state.delayProcessing.currentLocation);
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const [cancelShow, setCancelShow] = useState(false);
  const handleCancelNo = () => setCancelShow(false);

  const damagedUnitCodeFK = useSelector((state) => state.delayProcessing.damagedUnitCodeFK);
  const weatherUnitCodeFK = useSelector((state) => state.delayProcessing.weatherUnitCodeFK);
  const roadConditionFK = useSelector((state) => state.delayProcessing.roadConditionFK);
  const roadTypeUnitCodeFK = useSelector((state) => state.delayProcessing.roadTypeUnitCodeFK);

  const sendEmail = useSelector((state) => state.delayDamage.sendNotificationEmail);
  const updateEmailbreakdown = useSelector((state) => state.delayDamage.updateEmail);

  const saveDamage = () => {
    DelayDamageService.saveDelayDamage(damageData)
      .then((response) => {
        const damageId = response?.data?.DamageId?.response?.result[0]?.DelayedUnitDamagePK;
        if (damageId) {
          sendNotificationEmail(damageId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendNotificationEmail = (damageFK) => {
    BreakdownProcessingService.sendNotificationEmail(selectedCompanyName, "DAMAGE", damageFK)
      .then((response) => {
        const data = response?.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to determine if a button should be displayed
  const shouldHideButton = (keyword) => pathname?.includes(keyword);

  const handleCancelYes = () => {
    if (!editFlag) {
      navigate(-1); // Go back to the previous page
      dispatch(setLocationContact(null));
      dispatch(setLocationPhone(null));
    } else {
      dispatch(setDelayInHouseNotes(rowData?.delayInHouseNotes));
      dispatch(setDelayCustomerNotes(rowData?.delayCustomerNotes));
      dispatch(setDelayContact(rowData?.delayContact));
      dispatch(setDelayContactPhone(rowData?.delayContactPhone));
      dispatch(setDelayContactExtension(rowData?.delayContactExtension));
      dispatch(setDelayContactFAX(rowData?.delayContactFAX));
      dispatch(setDelayedUnitCodeFK(rowData?.delayedUnitCode?.delayedUnitCodePK));
      dispatch(setDelayedUnitCodeInput(rowData?.delayedUnitCode?.description?.trim()));
      setCancelShow(false);
      dispatch(setInHouseNotes(rowData?.inHouseNotes));
      dispatch(setCustomerNotes(rowData?.customerNotes));
      dispatch(setViewOnly(true));
      dispatch(setEditFlag(false));
      dispatch(setNotes(null));
      dispatch(setActiveKey("general"));
      dispatch(setDelayDate(rowData?.delayDate));
      dispatch(setReported(rowData?.reported));
    }
    dispatch(setSelectedCompanyName(selectedCompanyName));
    dispatch(setEmailData(initialEmailList));
    dispatch(setEmailList(initialEmailList));

    dispatch(setIsEmailClicked(false));

    toast.success("Changes Cancelled");
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("unit-details") || !viewOnly}
          disabled={isReroute === false ? true : false}
        >
          Reroute
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("unit-details") || !viewOnly}
          disabled={isMove === false ? true : false}
        >
          Move
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("unit-details") || !viewOnly}
          disabled={isReleaseDriver === false ? true : false}
        >
          Release Driver
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("unit-details") || !viewOnly}
          disabled={isReturn === false ? true : false}
        >
          Return
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("unit-details") || !viewOnly}
        >
          Breakdown
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("unit-details") || !viewOnly}
        >
          Damage
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("unit-details") || !viewOnly}
        >
          Active
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("unit-details") || rowData?.delay === false || !viewOnly}
          onClick={() => {
            dispatch(setViewOnly(false));
            dispatch(setIsPostal(false));
            dispatch(setDeliveryCheck(true));
            dispatch(setDelayInHouseNotes(""));
            dispatch(setDelayCustomerNotes(""));
            dispatch(setEditFlag(true));
            dispatch(setDelayedUnitCodeFK(null));
            if (activeKey !== "general" && activeKey !== "emails" && activeKey !== "delayComments") {
              dispatch(setActiveKey("general"));
            }
          }}
        >
          Edit
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("delayed-details") && viewOnly}
          onClick={() => {
            saveDamage();
            dispatch(setEditFlag(false));
            dispatch(setActiveKey("general"));
          }}
          disabled={!damageSaveFlag}
        >
          Save
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={() => {
            if (!viewOnly) {
              setCancelShow(true);
            } else {
              handleCancelYes();
            }
          }}
        >
          Cancel
        </button>
      </div>
      {/* Cancel Confirmation Modal */}
      <ModalComponent
        show={cancelShow}
        onHide={handleCancelNo}
        title={"Cancel Delay Processing Changes"}
        body={"Please confirm you want to cancel your changes"}
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />
    </div>
  );
};

export default FooterDamage;
