import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetChangesforAutoCompletes,
  setDealer,
  setEditDealer,
  setFaxBolAtDispatch,
  setFaxBolAtOrderEntry,
  setViewDetail,
} from "../../../../redux/EditDealerSlice";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import {
  setAdvanceSortedValue,
  setAdvanceSortingCriteria,
  setAdvancedSearchByPayload,
  setAdvancedSearchObject,
  setAdvancedSearchString,
  setChangeColor,
  setId,
  setNormalSortFlag,
  setNormalSortValue,
  setSearchTerms,
  setSearchedDealer,
  setSelectedDealerStatus,
  setSelectedSearchCriteria,
  setSelectedStatus,
  setShowAdvanceSearch,
  setShowAdvanceSort,
  updateAdvancedSearchByInputs,
} from "../../../../redux/DealerSearchFilterSlice";
import { setPageNumber } from "../../../../redux/PaginationSlice";

function FormHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const id = params.id;

  const [closeShow, setCloseShow] = useState(false);

  const onHandleCloseShow = () => {
    if (viewDetail === true) {
      dispatch(setFaxBolAtOrderEntry(false));
      dispatch(setFaxBolAtDispatch(false));
      navigate(`/`);
      dispatch(setNormalSortValue(null));
      dispatch(setNormalSortFlag(false));
      dispatch(setAdvanceSortingCriteria(null));
      dispatch(setAdvanceSortedValue(null));
      dispatch(setShowAdvanceSort(false));
      dispatch(setSearchTerms(""));
      dispatch(setPageNumber(0));
      dispatch(setChangeColor(false));
      dispatch(setSelectedSearchCriteria("Beginning"));
      dispatch(setSelectedStatus("Active"));
      dispatch(setSelectedDealerStatus("Complete"));
      dispatch(setAdvancedSearchObject(null)); // for clearing value in UI
      dispatch(setSearchedDealer(null)); // for clearing payload for API call
      dispatch(setAdvancedSearchString(""));
      dispatch(setAdvancedSearchByPayload(null));
      dispatch(updateAdvancedSearchByInputs("None"));
      dispatch(setShowAdvanceSearch(false));

      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };

  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    dispatch(setFaxBolAtOrderEntry(false));
    dispatch(setFaxBolAtDispatch(false));
    navigate(`/`);
    dispatch(setNormalSortValue(null));
    dispatch(setNormalSortFlag(false));
    dispatch(setAdvanceSortingCriteria(null));
    dispatch(setAdvanceSortedValue(null));
    dispatch(setShowAdvanceSort(false));
    dispatch(setSearchTerms(""));
    dispatch(setPageNumber(0));
    dispatch(setChangeColor(false));
    dispatch(setSelectedSearchCriteria("Beginning"));
    dispatch(setSelectedStatus("Active"));
    dispatch(setSelectedDealerStatus("Complete"));
    dispatch(setAdvancedSearchObject(null)); // for clearing value in UI
    dispatch(setSearchedDealer(null)); // for clearing payload for API call
    dispatch(setAdvancedSearchString(""));
    dispatch(setAdvancedSearchByPayload(null));
    dispatch(updateAdvancedSearchByInputs("None"));
    dispatch(setShowAdvanceSearch(false));
    toast.success("Page closed");
  };

  let viewDetail = useSelector((state) => state.editDealerReducer.viewDetail);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={onHandleCloseShow}
        >
          Close
        </button>
      </div>

      <Modal show={closeShow} onHide={onHandleCloseNo} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className="font-18 h-100">Close Dealer Changes</Modal.Title>
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
  );
}

export default FormHeader;
