import React, { useState } from "react";
import ButtonComponent from "../../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import BulkReimbursementDocumentsContent from "./BulkReimbursementDocumentsContent";
import BulkReimbursementService from "../../../../services/Invoicing/BulkReimbursementService";
import ModalComponent from "../../../common/ModalComponent";
import { Button, Modal } from "react-bootstrap";
import { resetFields, resetState } from "../../../../redux/Invoicing/BulkUnitReimbursementSlice";

const BulkReimbursementDocuments = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bulkunitpk } = useParams();
  const [cancelShow, setCancelShow] = useState(false);
  const [closeShow, setCloseShow] = useState(false);
  const [loadSave, setLoadSave] = useState(false);

  const detailsData = useSelector((state) => state.bulkUnitReimbursementReducer.detailsData);
  const uploadActive = useSelector((state) => state.bulkUnitReimbursementReducer.uploadActive);
  const unitFormData = useSelector((state) => state.bulkUnitReimbursementReducer.unitFormData);
  const [showInvoiceGenerationSuccess, setShowInvoiceGenerationSuccess] = useState(false);
  const [invoiceResponseList, setInvoiceResponseList] = useState([]);

  window.addEventListener("popstate", () => {
    dispatch(resetState());
    dispatch(resetFields());

    navigate(`/bulk-reimbursement-invoice-selection`);
  });

  const handleSave = () => {
    setLoadSave(true);

    BulkReimbursementService.savePDFFileList(detailsData)
      .then((response) => {
        if (response?.data?.[0].errorCode === "0") {
          setInvoiceResponseList([
            {
              unitNumber: response?.data?.[0].unitNumber,
              invoiceNumber: response?.data?.[0].invoiceNumber,
              companyName: response?.data?.[0].companyName,
            },
          ]);
          setShowInvoiceGenerationSuccess(true);
        } else {
          toast.error("Save Failed");
        }
      })
      .catch(() => {
        toast.error("Save Failed");
      })
      .finally(() => {
        setLoadSave(false);
      });
  };
  const handleCancel = () => {
    if (uploadActive) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      setTimeout(() => navigate(`/bulk-reimbursement-invoice-selection`), 0);
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (uploadActive) {
      setCancelShow(false);
      toast.success("Changes Cancelled");
    } else {
      setTimeout(() => navigate(`/bulk-reimbursement-invoice-selection`), 0);
      toast.success("Changes Cancelled");
    }
  };

  const handleClose = () => {
    if (!uploadActive) {
      dispatch(resetState());

      navigate(`/`);
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };
  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    dispatch(resetState());

    navigate(`/`);

    toast.success("Page closed");
  };

  return (
    <div className="customContainer">
      <div className="border border-dark border-2 quarterScreenWidth " style={{ margin: "1px" }}>
        {/* Header */}

        {loadSave && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}

        <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={handleClose}
          >
            Close
          </button>
        </div>
        <div className="col-xs-6">
          <Modal show={closeShow} onHide={handleCloseNo} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title className="font-18 h-100">Close Bulk Unit Reimbursement</Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-14 h-100">
              Please confirm you want to close the program without saving your changes
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseYes}>
                Yes
              </Button>
              <Button variant="secondary" onClick={handleCloseNo}>
                No
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <>
          <BulkReimbursementDocumentsContent />
        </>

        {/* Footer */}
        <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
          <div className="d-flex align-items-center flex-wrap">
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type="button"
              onClick={handleSave}
              disabled={uploadActive === true}
            >
              {loadSave ? (
                <div className="loader-container">
                  <div className="loader_YardCheckin"></div>
                </div>
              ) : (
                "Save"
              )}

              {/* Save */}
            </button>
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type="button"
              onClick={() => navigate(`/bulk-reimbursement-detail/${bulkunitpk}`)}
            >
              Back
            </button>

            <ButtonComponent
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              onClick={handleCancel}
              label={"Cancel"}
            />
            <ModalComponent
              show={cancelShow}
              onHide={handleCancelNo}
              title={"Cancel Bulk Unit Reimbursement  Changes"}
              body={"Please confirm you want to cancel your changes"}
              handleYES={handleCancelYes}
              handleNO={handleCancelNo}
            />

            {/* Invoice Generation Success Modal */}
            <ModalComponent
              show={showInvoiceGenerationSuccess}
              onHide={() => {
                setShowInvoiceGenerationSuccess(false);
                navigate("/bulk-reimbursement-invoice-selection");
              }}
              title={"Invoice Generation Completed"}
              body={
                <div>
                  {invoiceResponseList?.length > 0 && (
                    <div style={{ maxHeight: "150px", overflowY: "auto" }} className="mt-4">
                      <table className="table table-bordered rounded">
                        <thead>
                          <tr>
                            <th className="fw-bolder">Unit Number</th>
                            <th className="fw-bolder">Invoice Number</th>
                            <th className="fw-bolder">Company</th>
                          </tr>
                        </thead>
                        <tbody className="overflow-auto">
                          {invoiceResponseList?.map((unit, index) => (
                            <tr key={index}>
                              <td>{unit?.unitNumber}</td>
                              <td>{unit?.invoiceNumber}</td>
                              <td>{unit?.companyName}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              }
              handleOK={() => {
                setShowInvoiceGenerationSuccess(false);
                navigate("/bulk-reimbursement-invoice-selection");
              }}
              showOK
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkReimbursementDocuments;
