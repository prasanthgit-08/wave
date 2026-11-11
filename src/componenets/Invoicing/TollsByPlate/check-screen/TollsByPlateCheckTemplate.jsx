import React, { useEffect, useState } from "react";
import ButtonComponent from "../../../common/Button";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import TollsByPlateCheck from "./TollsByPlateCheck";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetFields, resetOnCancel, updateField } from "../../../../redux/Invoicing/TollsByPlateSlice";
import TollByPlateService from "../../../../services/Invoicing/TollByPlateService";
import toast from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";

const TollsByPlateCheckTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showClose, setShowClose] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const reference = useSelector((state) => state.tollsByPlate.reference);
  const invoiceNumber = useSelector((state) => state.tollsByPlate.invoiceNumber);
  const amount = useSelector((state) => state.tollsByPlate.amount);
  const tollDate = useSelector((state) => state.tollsByPlate.tollDate);
  const tollAgency = useSelector((state) => state.tollsByPlate.tollAgency);

  const {
    checkPayToFK,
    checkPayToName,
    checkPayToAddress1,
    checkPayToAddress2,
    checkPayToCity,
    checkPayToState,
    checkPayToZip,
    checkPayToCanadian,
    selectedPlate,
    selectedDriver,
    selectedDriverFK,
    checkSubDetails,
    plateNumber,
    uploadedFiles,
    scannedFiles,
    checkPayToPostalCodePK,
  } = useSelector((state) => state.tollsByPlate);
  const onPrint = () => {
    dispatch(updateField({ field: "checkLoading", value: true }));
    const data = {
      Driver: selectedDriver,
      DriverFK: selectedDriverFK,
      CheckAmount: amount,
      TaxableAmount: amount,
      CheckStubText1: checkSubDetails[0] || "",
      CheckStubText2: checkSubDetails[1] || "",
      CheckStubText3: checkSubDetails[2] || "",
      CheckStubText4: checkSubDetails[3] || "",
      CheckStubText5: checkSubDetails[4] || "",
      CheckStubText6: checkSubDetails[5] || "",
      Name: checkPayToName,
      Address1: checkPayToAddress1,
      Address2: checkPayToAddress2,
      City: checkPayToCity,
      StateCode: checkPayToState,
      PostalCode: checkPayToZip,
      Canadian: checkPayToCanadian,
      TotalAmount: amount,
      OtherAmount1: amount,
      InvoiceNumber: invoiceNumber,
      Reference: reference,
      TollAgency: tollAgency,
      PlateNumber: selectedPlate || plateNumber,
      TollDate: tollDate,
      Paid: true,
    };

    TollByPlateService.onSave("Driver-Check", checkPayToFK, data, [...uploadedFiles, ...scannedFiles])
      .then(() => {
        navigate("/toll-by-plate/selection");
        dispatch(resetOnCancel());
        toast.success("Check Print Successful");
      })
      .catch((e) => {
        toast.error("Error occured while Printing Check");
      })
      .finally(() => {
        dispatch(updateField({ field: "checkLoading", value: false }));
      });
  };

  const onHandleCancelNo = () => {
    setShowCancel(false);
  };

  const onHandleCancelYes = () => {
    navigate("/toll-by-plate/selection");
    toast.success("Changes Cancelled");
    dispatch(resetOnCancel());
  };

  const onHandleCloseNo = () => {
    setShowClose(false);
  };

  const onHandleCloseYes = () => {
    dispatch(resetFields());
    toast.success("Page Closed");
    navigate("/");
  };

  useEffect(() => {
    if (!(plateNumber || selectedPlate)) {
      navigate("/toll-by-plate/selection");
    }
  }, []);

  return (
    <QuarterScreenWrapper>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            setShowClose(true);
          }}
        >
          Close
        </button>
      </div>
      <>
        <TollsByPlateCheck />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              onPrint();
            }}
            disabled={!(checkPayToAddress1 && checkPayToName && checkPayToPostalCodePK)}
          >
            Print
          </button>

          <ButtonComponent
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={() => {
              setShowCancel(true);
            }}
            label={"Cancel"}
          />
        </div>
        <ModalComponent
          show={showClose}
          onHide={onHandleCloseNo}
          title={"Close Toll By Plates"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={onHandleCloseYes}
          handleNO={onHandleCloseNo}
        />
        <ModalComponent
          show={showCancel}
          onHide={onHandleCancelNo}
          title={"Cancel Changes"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={onHandleCancelYes}
          handleNO={onHandleCancelNo}
        />
      </div>
    </QuarterScreenWrapper>
  );
};

export default TollsByPlateCheckTemplate;
