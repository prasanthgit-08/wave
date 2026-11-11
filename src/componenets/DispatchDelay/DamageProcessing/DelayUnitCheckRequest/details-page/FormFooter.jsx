import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setChangesCancelled,
  setCompanyAmount,
  setDisableSave,
  setDriverAmount,
  setIsCancelledClicked,
  setTotalAmount,
  setViewDetail,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayUnitCheckRequestSlice";
import DelayUnitCheckRequestService from "../../../../../services/DispatchDelay/DelayProcessing/DelayUnitCheckRequestService";
import toast from "react-hot-toast";
import ModalComponent from "../../../../common/ModalComponent";
import PreviewPopup from "../../../../common/PreviewPopup";

function FormFooter() {
  const { checkRequestid, id, driverfk } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cancelShow, setCancelShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const delayRequestRecord = useSelector((state) => state.delayCheckRequest.delayRequestRecord);
  const viewDetail = useSelector((state) => state.delayCheckRequest.viewDetail);
  const delayRequestFormData = useSelector((state) => state.delayCheckRequest.delayRequestFormData);
  const disableSave = useSelector((state) => state.delayCheckRequest.disableSave);
  const driverAmount = useSelector((state) => state.delayCheckRequest.driverAmount);
  const reserveBondFundFK = useSelector((state) => state.delayCheckRequest.reserveBondFundFK);

  const [fileContent, setFileContent] = useState(null);
  const [showPreview, setshowPreview] = useState(false);
  const [printRequestFormData, setPrintRequestFormData] = useState(null);

  const checkPrintFormData = useSelector((state) => state.delayCheckRequest.checkPrintFormData);
  const description = useSelector((state) => state.delayCheckRequest.description);
  // const damageDriverFK = localStorage.getItem("damageDriverFK");
  const damageDriverFK = driverfk;
  useEffect(() => {
    if (checkRequestid && id) {
      setPrintRequestFormData({
        delayedUnitCheckRequestPK: checkRequestid,
        delayedUnitDamageFK: id,
      });
    }
  }, [checkRequestid, id]);

  /***
   *Validating the Save Operation
   ****/
  const validateAndSave = () => {
    DelayUnitCheckRequestService.checkValidDescription(description, checkRequestid)
      .then((res) => {
        if (res?.data) {
          dispatch(setDisableSave(res?.data));
        } else {
          handleSaveDelayUnitCheckRequest();
        }
      })
      .catch((err) => {
        console.log(err);
        navigate(`/delay-unit-check-request/${driverfk}/${id}`);
      });
  };

  /******Save API for Delay Unit Check Request****/
  const handleSaveDelayUnitCheckRequest = () => {
    setLoader(true);
    DelayUnitCheckRequestService.saveOrEditDelayUnitCheckRequest(delayRequestFormData)
      .then((response) => {
        navigate(`/delay-unit-check-request/${driverfk}/${id}`);
        if (checkRequestid) {
          toast.success("Delay Unit Check Request Updated");
        } else {
          toast.success("Delay Unit Check Request Created");
        }
        dispatch(setTotalAmount(""));
        setLoader(false);
      })
      .catch((error) => {
        navigate(`/delay-unit-check-request/${driverfk}/${id}`);
        if (checkRequestid) {
          toast.error("Failed to Update Delay Unit Check Request");
        } else {
          toast.error("Failed to Create Delay Unit Check Request");
        }
        dispatch(setTotalAmount(""));
        setLoader(false);
      });
  };

  /******Process and Print the Request Form *****/
  const handlePrintRequest = () => {
    setLoader(true);
    DelayUnitCheckRequestService.printRequestForm(printRequestFormData)
      .then((response) => {
        setFileContent(response?.data["letterhead1.pdf"]);
        setshowPreview(true);
        toast.success("Print Request Process Completed");
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error processing Print Request:", error);
        navigate(`/delay-unit-check-request/${driverfk}/${id}`);
        toast.error("Failed to process Print Request");
        setLoader(false);
      });
  };
  const handleCancel = () => {
    if (viewDetail === false || checkRequestid === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate(`/delay-unit-check-request/${driverfk}/${id}`);
      dispatch(setTotalAmount(""));
      dispatch(setDriverAmount(""));
      dispatch(setCompanyAmount(""));
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (checkRequestid) {
      setCancelShow(false);
      dispatch(setChangesCancelled(true));
      dispatch(setViewDetail(true));
      toast.success("Changes Cancelled");
    } else {
      navigate(`/delay-unit-check-request/${driverfk}/${id}`);
      dispatch(setViewDetail(false));
      dispatch(setTotalAmount(""));
      dispatch(setDriverAmount(""));
      dispatch(setCompanyAmount(""));
      toast.success("Changes Cancelled");
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <PreviewPopup show={showPreview} onHide={() => setshowPreview(false)} base64PDF={fileContent} />
        {loader && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5  m-b-5`}
          type="button"
          hidden={!viewDetail}
          disabled={false}
          onClick={() => {
            handlePrintRequest();
          }}
        >
          Print Request
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5  m-b-5`}
          type="button"
          disabled={
            !driverAmount ||
            driverAmount === parseFloat(0) ||
            delayRequestRecord?.DriverCheckPrinted ||
            Number(damageDriverFK) === 0 ||
            reserveBondFundFK === null
          }
          hidden={!viewDetail}
          onClick={() => {
            navigate(`/delay-unit-check-detail/${driverfk}/${id}/${checkRequestid}`);
          }}
        >
          Print Check
        </button>
        <button
          route={""}
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5  m-b-5`}
          hidden={!viewDetail}
          onClick={() => {
            dispatch(setViewDetail(false));
          }}
        >
          Edit
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5  m-b-5`}
          type="button"
          disabled={disableSave}
          onClick={validateAndSave}
          hidden={viewDetail}
        >
          Save
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={""}
          onClick={() => {
            handleCancel();
            dispatch(setIsCancelledClicked(true));
          }}
        >
          Cancel
        </button>

        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Delay Unit Check Request"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
    </div>
  );
}

export default FormFooter;
