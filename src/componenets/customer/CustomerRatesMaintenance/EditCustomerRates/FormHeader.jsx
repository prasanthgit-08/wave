import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetGeneralTab,
  resetStates,
  setAdvancedSearchObject,
  setAdvancedSearchString,
  setChangeColor,
  setCustomerInvoicePercentage,
  setEditFormData,
  setIsSelectedDuplicate,
  setPageNumber,
  setSearchCriteria,
  setSearchCustomer,
  setSearchCustomerGroup,
  setSearchPlant,
  setSearchPlantGroup,
  setSearchTerms,
  setSearchedData,
  setSelectId,
  setShowAdvanceSearch,
  setSortFlag,
  setSortValue,
} from "../../../../redux/CustomerRatesSlice";
function FormHeader() {
  const viewDetail = useSelector((state) => state.customerRatesReducer.viewDetail);
  const [closeShow, setCloseShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    if (viewDetail === true) {
      navigate(`/`);
      dispatch(setEditFormData(undefined));
      dispatch(resetStates());
      dispatch(resetGeneralTab());
      dispatch(setChangeColor(false));
      dispatch(setSearchTerms(""));
      dispatch(setSearchCriteria("Beginning"));
      dispatch(setSortValue(null));
      dispatch(setSortFlag(false));
      dispatch(setShowAdvanceSearch(false));
      dispatch(setAdvancedSearchObject(null));
      dispatch(setSearchedData(null));
      dispatch(setAdvancedSearchString(""));
      dispatch(setSearchCustomerGroup(""));
      dispatch(setSearchCustomer(""));
      dispatch(setSearchPlant(""));
      dispatch(setSearchPlantGroup(""));
      dispatch(setSearchCustomerGroup(""));
      dispatch(setPageNumber(0));
      dispatch(setSelectId(null));
      dispatch(setIsSelectedDuplicate(false));
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };
  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate(`/`);
    dispatch(setEditFormData(undefined));
    dispatch(resetStates());
    dispatch(resetGeneralTab());
    dispatch(setChangeColor(false));
    dispatch(setSearchTerms(""));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSortValue(null));
    dispatch(setSortFlag(false));
    dispatch(setShowAdvanceSearch(false));
    dispatch(setAdvancedSearchObject(null));
    dispatch(setSearchedData(null));
    dispatch(setAdvancedSearchString(""));
    dispatch(setSearchCustomerGroup(""));
    dispatch(setSearchCustomer(""));
    dispatch(setSearchPlant(""));
    dispatch(setSearchPlantGroup(""));
    dispatch(setSearchCustomerGroup(""));
    dispatch(setPageNumber(0));
    dispatch(setSelectId(null));
    dispatch(setChangeColor(false));
    dispatch(setIsSelectedDuplicate(false));
    toast.success("Page closed");
  };
  return (
    <div>
      <div>
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
              <Modal.Title className="font-18 h-100">Close Customer Rate </Modal.Title>
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
      </div>
    </div>
  );
}

export default FormHeader;
