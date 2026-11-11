import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setDescription,
  setPoNumber,
  setChargeCreditCard,
  setCreditCardAddress,
  setCreditCardExpirationDate,
  setCreditCardName,
  setCreditCardNumber,
  setCreditCardPostalCode,
  setProjectCode,
  setNotes,
  setEditModeRedux,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchCriteria,
  setSearchTerms,
  setPageNumberInvoice,
  setSelectedIdInvoice,
  setSelecteActiveType,
} from "../../../../redux/CustomerBulkInvoiceSlice";

function BulkFormHeader() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.cpk;
  const pageNum = params.pageNumber;
  const dispatch = useDispatch();
  const [closeShow, setCloseShow] = useState(false);

  const resetDatas = () => {
    dispatch(setDescription(""));
    dispatch(setPoNumber(""));
    dispatch(setProjectCode(""));
    dispatch(setChargeCreditCard(false));
    dispatch(setNotes(""));
    dispatch(setCreditCardAddress(""));
    dispatch(setCreditCardExpirationDate(""));
    dispatch(setCreditCardName(""));
    dispatch(setCreditCardNumber(""));
    dispatch(setCreditCardPostalCode(""));
    dispatch(setEditModeRedux(false));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSearchTerms(""));
    dispatch(setPageNumberInvoice(0));
    dispatch(setSelectedIdInvoice(""));

    dispatch(setSelecteActiveType("All"));
  };

  const EditMode = useSelector((state) => state.customerBulkInvoice.editModeRedux);

  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseShow = () => setCloseShow(true);

  const onHandleCloseYes = () => {
    navigate("/add-customer/" + id + "/" + pageNum);
    toast.success("Page Closed");
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSearchTerms(""));
    dispatch(setPageNumberInvoice(0));
    dispatch(setSelectedIdInvoice(""));

    dispatch(setSelecteActiveType("All"));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        {!EditMode && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={onHandleCloseShow}
          >
            Close
          </button>
        )}
        {EditMode && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={() => {
              navigate("/add-customer/" + id + "/" + pageNum);
              toast.success("Page Closed");
              resetDatas();
            }}
          >
            Close
          </button>
        )}
      </div>

      <div className="col-xs-6">
        <Modal show={closeShow} onHide={onHandleCloseNo} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100">Close Bulk Invoice Changes</Modal.Title>
          </Modal.Header>

          <Modal.Body className="font-14 h-100">
            Please confirm you want to close the program without saving your changes
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={onHandleCloseYes}>
              Yes
            </Button>
            <Button variant="secondary" onClick={onHandleCloseNo}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default BulkFormHeader;
