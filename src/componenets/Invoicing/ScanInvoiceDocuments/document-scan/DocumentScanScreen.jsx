import React, { useEffect, useState } from "react";
import DocumentScanScreenContent from "./DocumentScanScreenContent";
import ButtonComponent from "../../../common/Button";
import ScanInvoiceService from "../../../../services/Invoicing/ScanInvoiceService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetFields,
  setScanInvoiceFiles,
  setUnitSelectionReset,
} from "../../../../redux/Invoicing/ScanInvoiceSlice";
import toast from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import LoadingIcon from "../../../common/LoadingIcon";
import { useAppNavigate } from "../../../../hooks/useAppNavigate";

const DocumentScanScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { goBack } = useAppNavigate();

  const [closeShow, setCloseShow] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const scanInvoicePayload = useSelector((state) => state.scanInvoiceReducer.scanInvoicePayload);
  const disableSave = useSelector((state) => state.scanInvoiceReducer.disableSave);
  const nonUnitData = useSelector((state) => state.scanInvoiceReducer.nonUnitData);
  const unitSelectionReset = useSelector((state) => state.scanInvoiceReducer.unitSelectionReset);

  const handleSave = () => {
    setLoading(true);
    ScanInvoiceService.savePDFFileList(scanInvoicePayload)
      .then((response) => {
        if (response?.data) {
          dispatch(setScanInvoiceFiles({ actionType: "clear" }));
          toast.success("Save Completed");
          dispatch(resetFields());
          dispatch(setUnitSelectionReset(false));
          navigate("/scan-invoice/invoice-unit-selection");
        } else {
          toast.error("Scan Failed");
          dispatch(setUnitSelectionReset(false));
        }
      })
      .catch(() => {
        toast.error("Scan Failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onHandleCloseShow = () => {
    setCloseShow(true);
  };

  const onHandleCloseNo = () => {
    setCloseShow(false);
  };
  const onHandleCloseYes = () => {
    navigate("/");
    toast.success("Page Closed");
    dispatch(resetFields());
    dispatch(setUnitSelectionReset(false));
  };

  const handleCancelShow = () => {
    setCancelShow(true);
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    setCancelShow(false);
    nonUnitData?.length > 0
      ? navigate(`/scan-invoice/invoice-non-unit-selection`)
      : navigate("/scan-invoice/invoice-unit-selection");
    toast.success("Changes Cancelled");
    dispatch(resetFields());
    dispatch(setUnitSelectionReset(false));
  };
  useEffect(() => {
    if (!unitSelectionReset) {
      navigate(`/scan-invoice/invoice-unit-selection`);
    }
  }, [unitSelectionReset]);

  return (
    <div className="customContainer">
      {loading && <LoadingIcon />}
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        {/* Header */}
        <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={onHandleCloseShow}
          >
            Close
          </button>
        </div>

        <>
          <DocumentScanScreenContent />
        </>

        {/* Footer */}
        <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
          <div className="d-flex align-items-center flex-wrap">
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type="button"
              onClick={handleSave}
              disabled={disableSave}
            >
              Save
            </button>
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type="button"
              onClick={() => {
                goBack();
              }}
            >
              Back
            </button>

            <ButtonComponent
              onClick={handleCancelShow}
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              label={"Cancel"}
            />
          </div>
        </div>
        <ModalComponent
          show={closeShow}
          onHide={onHandleCloseNo}
          title={"Close Scan Invoice Documents"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={onHandleCloseYes}
          handleNO={onHandleCloseNo}
        />
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Scan Invoice Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
    </div>
  );
};

export default DocumentScanScreen;
