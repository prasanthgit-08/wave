import React, { useState, useEffect } from "react";
import { Col, Form } from "react-bootstrap";
import EditYardUnitSectionListing from "./EditYardUnitSelectionListing";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import {
  setChangeColor,
  setEditUnitData,
  setPageNumber,
  setShuttleSave,
  setTotalElements,
  setTotalPages,
  setUnitDetails,
  setUnitNumberInput,
  setUnitNumberLast5,
  setUnitNumberPK,
  setUnitsLoading,
} from "../../../../../redux/EditYardUnitSlice";
import LookupButton from "../../../../common/LookupButton";
import { useDispatch, useSelector } from "react-redux";
import EditYardUnitService from "../../../../../services/shuttle/process/EditYardUnitService";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import UnitSelectionLookup from "../../../../LookupScreens/UnitSelection/UnitSelectionLookup";
import LoadingIcon from "../../../../common/LoadingIcon";
import useDebouncer from "../../../../../hooks/useDebouncer";

function EditYardUnitSelectionContent() {
  const dispatch = useDispatch();

  /********************************************* Local variable declaration starts here *********************************************/
  const [unitNumber, setUnitNumber] = useState([]);
  const [showUnitSelectionLookup, setShowUnitSelectionLookup] = useState(false);
  const [unitNumberLoading, setUnitNumberLoading] = useState(false);
  const [unitBrowseLoading, setUnitBrowseLoading] = useState(false);
  /********************************************* Local variable declaration ends here ***********************************************/

  /********************************************* Redux variable declaration starts here *********************************************/
  const unitNumberPK = useSelector((state) => state.editYardUnitsReducer.unitNumberPK);
  const unitDetails = useSelector((state) => state.editYardUnitsReducer.unitDetails);
  const unitNumberLast5 = useSelector((state) => state.editYardUnitsReducer.unitNumberLast5);
  const unitNumberInput = useSelector((state) => state.editYardUnitsReducer.unitNumberInput);
  const pageNumber = useSelector((state) => state.editYardUnitsReducer.pageNumber);
  const totalPages = useSelector((state) => state.editYardUnitsReducer.totalPages);
  const totalElements = useSelector((state) => state.editYardUnitsReducer.totalElements);
  const editUnitData = useSelector((state) => state.editYardUnitsReducer.editUnitData);

  /********************************************* Redux variable declaration ends here **********************************************/

  /**********************************************  Function Definitions starts here  ***************************************************/

  /**
   *  Unit Number Autocomplete Fetch function
   **/
  const getAllUnitNumbers = (string, unitNumberLast5) => {
    setUnitNumberLoading(true);
    let last5 = unitNumberLast5;
    if (unitNumberPK) {
      last5 = "";
    }
    EditYardUnitService.getAllUnitNumbers(last5, string, 0, 100, "Autocomplete")
      .then((response) => {
        const data = response.data.content;
        const unitsList = data?.map((unit) => ({ ...unit, unitNumber: unit.unitNumber?.trim() }));
        setUnitNumber(unitsList);
        setUnitNumberLoading(false);
      })
      .catch((error) => {
        setUnitNumberLoading(false);
      });
  };

  /**
   *  Unit Selection Browse Fetch function
   **/
  const getAllUnitNumbersList = () => {
    setUnitBrowseLoading(true);
    EditYardUnitService.getAllUnitNumbers(unitNumberLast5, unitNumberInput, pageNumber, 12, "")
      .then((response) => {
        const { data } = response;
        dispatch(setUnitDetails(data.content || []));
        dispatch(setTotalElements(data.totalElements || 0));
        dispatch(setTotalPages(data.totalPages || 0));
        dispatch(setUnitsLoading(false));
        setUnitBrowseLoading(false);
      })
      .catch((error) => {
        dispatch(setUnitsLoading(false));
        setUnitBrowseLoading(false);
      })
      .finally(() => {
        setUnitBrowseLoading(false);
      });
  };

  /**
   * Unit Number Autocomplete & Lookup Handle function On select
   **/
  const handleUnitNumberSelection = (unit) => {
    dispatch(setUnitNumberPK(unit.unitPK));
    dispatch(setUnitNumberInput(unit.unitNumber));
    dispatch(setChangeColor(true));
    setShowUnitSelectionLookup(false);
    dispatch(setPageNumber(0));
    dispatch(setEditUnitData(unit));
    if (!unit.unitNumberLast5.startsWith(unitNumberLast5)) {
      dispatch(setUnitNumberLast5(""));
    }
  };

  const debounceGetAllUnitNumbersList = useDebouncer(getAllUnitNumbersList, 500);

  /**********************************************  Function Definitions ends here  ***************************************************/

  /***************************************************  UseEffects starts here  ****************************************************/
  /**
   *  call functions on page load
   **/

  useEffect(() => {
    setUnitBrowseLoading(true);
    debounceGetAllUnitNumbersList();
  }, [unitNumberLast5, unitNumberInput, pageNumber]);

  /***************************************************  UseEffects ends here  ****************************************************/

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: unitDetails,
  };

  return (
    <div className="p-2">
      {unitBrowseLoading && <LoadingIcon />}
      <div className="shadow-sm rounded border halfScreenFormContentHeight">
        <Col className="p-15 mb-3 ms-3" md={7}>
          <Form.Group className="margin-box-1 m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0 text-start">
              <Form.Label htmlFor="unitNumberLast5" className="col-form-label me-4">
                Last 5
              </Form.Label>
            </Col>

            <Col xs={4} md={1} sm={4} className="p-0">
              <input
                className="form-control"
                id="unitNumberLast5"
                name="unitNumberLast5"
                type="text"
                value={unitNumberLast5}
                maxLength={5}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  dispatch(setUnitNumberLast5(e.target.value));
                  dispatch(setUnitNumberPK(null));
                  dispatch(setUnitNumberInput(""));
                  dispatch(setPageNumber(0));
                  if (e.target.value.length === 5) {
                    getAllUnitNumbers("", e.target.value);
                  }
                }}
                disabled={unitNumberInput}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-1 form-group m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
            <Col xs={2} sm={2} className="p-0 text-start">
              <Form.Label className="col-form-label me-4">Unit Number</Form.Label>
            </Col>

            <Col xs={6} md={4} sm={7} className="p-0 d-flex">
              {/* Unit Number Autocomplete */}
              <AutoCompleteDropdown
                arrayList={unitNumber}
                searchString={unitNumberInput}
                renderItemId={(units) => units.unitPK}
                renderItemField={(units) => units.unitNumber}
                selectedId={unitNumberPK}
                handleSearchString={(string) => dispatch(setUnitNumberInput(string))}
                loading={unitNumberLoading}
                fetchDataBySearchString={(string) => getAllUnitNumbers(string, "")}
                onSelect={handleUnitNumberSelection}
                clearInputCallback={() => {
                  dispatch(setUnitNumberPK(null));
                  dispatch(setPageNumber(0));
                }}
                handleAutoCompleteClose={() => {
                  dispatch(setUnitNumberPK(null));
                  dispatch(setUnitNumberLast5(""));
                }}
                className={`${
                  unitNumberLast5 === ""
                    ? unitNumberPK === "" || unitNumberPK === null || unitNumberInput === ""
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                disabled={unitNumberLast5}
              />
              <LookupButton onClick={() => setShowUnitSelectionLookup(true)} />
            </Col>
          </Form.Group>
        </Col>

        <Col className="px-3 mx-4">
          <div className="row border border-dark border-1">
            <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
              <div className="d-flex h-100">
                <div className="w-100">
                  <EditYardUnitSectionListing />
                </div>
                <PaginationComponent
                  {...paginationProps}
                  loading={unitBrowseLoading}
                  firstPage
                  lastPage
                  tripleArrowUp
                  tripleArrowDown
                  doubleArrowUp
                  doubleArrowDown
                  singleArrowUp
                  singleArrowDown
                  recordsPerPage={12}
                  borderThin
                  hideBorderRight
                  hideBorderBottom
                  hideBorderTop
                />
              </div>
            </div>
          </div>
        </Col>

        <UnitSelectionLookup
          show={showUnitSelectionLookup}
          onHide={() => setShowUnitSelectionLookup(false)}
          EditYardUnit
          handleLookupSelection={handleUnitNumberSelection}
        />
      </div>
    </div>
  );
}

export default EditYardUnitSelectionContent;
