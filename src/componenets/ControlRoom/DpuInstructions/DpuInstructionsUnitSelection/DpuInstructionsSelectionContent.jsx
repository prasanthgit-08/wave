import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setUnitNumberLast5,
  setUnitDetails,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setUnitsLoading,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setUnitNumberInput,
  setUnitNumberPK,
  setSelectId,
  setDupInstructionValid,
  setViewCancel,
} from "../../../../redux/DpuInstructionsSlice";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import DpuInstructionsService from "../../../../services/DpuInstructionsService";
import { PaginationComponent } from "../../../common/PaginationComponent";
import LookupButton from "../../../common/LookupButton";
import NoRecordsMessage from "../../../common/NoRecordsMessage";
import { DPU_Instructions_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import { customFormatDate } from "../../../../utils/validation/DateFormatUtils";
import UnitSelectionLookup from "../../../LookupScreens/UnitSelection/UnitSelectionLookup";
import LoadingIcon from "../../../common/LoadingIcon";

function DpuInstructionsSelectionContent() {
  const dispatch = useDispatch();
  const [unitNumber, setUnitNumber] = useState([]);
  const [unitNumberLoading, setUnitNumberLoading] = useState(false);
  const [showUnitSelectionLookup, setShowUnitSelectionLookup] = useState(false);
  const selectId = useSelector((state) => state.dpuInstructionsReducer.selectId);
  const unitNumberPK = useSelector((state) => state.dpuInstructionsReducer.unitNumberPK);
  const unitNumberLast5 = useSelector((state) => state.dpuInstructionsReducer.unitNumberLast5);
  const unitNumberInput = useSelector((state) => state.dpuInstructionsReducer.unitNumberInput);
  const pageNumber = useSelector((state) => state.dpuInstructionsReducer.pageNumber);
  const totalPages = useSelector((state) => state.dpuInstructionsReducer.totalPages);
  const totalElements = useSelector((state) => state.dpuInstructionsReducer.totalElements);
  const unitDetails = useSelector((state) => state.dpuInstructionsReducer.unitDetails);
  const unitsLoading = useSelector((state) => state.dpuInstructionsReducer.unitsLoading);
  const normalSortValue = useSelector((state) => state.dpuInstructionsReducer.normalSortValue);
  const normalSortFlag = useSelector((state) => state.dpuInstructionsReducer.normalSortFlag);
  const viewCancel = useSelector((state) => state.dpuInstructionsReducer.viewCancel);
  let sortValue = useSelector((state) => state.dpuInstructionsReducer.normalSortValue);
  let sortFlag = useSelector((state) => state.dpuInstructionsReducer.normalSortFlag);

  const [loading, setLoading] = useState(false);

  //Unit number autocomplete
  const getAllUnitNumbers = (string) => {
    setUnitNumberLoading(true);
    DpuInstructionsService.getAllUnitNumbersAuto(string, unitNumberLast5)
      .then((response) => {
        const data = response.data.response.DPUInstructions;
        setUnitNumber(data);
        setUnitNumberLoading(false);
      })
      .catch((error) => {
        setUnitNumberLoading(false);
        console.error("Error fetching unit numbers:", error);
      });
  };

  //Units Browse
  const getAllUnitNumbersList = () => {
    setLoading(true);
    DpuInstructionsService.getAllUnitNumbers(
      unitNumberInput,
      unitNumberLast5,
      pageNumber,
      DPU_Instructions_RecordsPerPage,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const data = response.data.response.DPUInstructions;
        const filteredList = data;

        dispatch(setUnitDetails(filteredList));
        const paginationData = response.data.response.Pagination[0];
        dispatch(setTotalElements(paginationData.TotalElements));
        dispatch(setTotalPages(paginationData.TotalPages));
        dispatch(setUnitsLoading(false));
      })
      .catch((error) => {
        dispatch(setUnitsLoading(false));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //Unit number autocomplete onselect
  const handleUnitNumberSelection = (unit) => {
    dispatch(setUnitNumberPK(unit.unitPK));
    dispatch(setUnitNumberInput(unit.unitNumber?.trim()));
    localStorage.removeItem("dpuInstructionSelectedId");
    dispatch(setSelectId(unit.unitPK));
    dispatch(setChangeColor(true));
    dispatch(setPageNumber(0));
    setShowUnitSelectionLookup(false);
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
    sortValue = value;
    sortFlag = val;
  };

  useEffect(() => {
    if ((unitNumberLast5 !== "" && unitNumberLast5.length === 5) || unitNumberLast5 === "") {
      getAllUnitNumbersList();
    }
  }, [selectId, unitNumberLast5, pageNumber, sortValue, sortFlag]);

  useEffect(() => {
    if (unitNumberLast5 && unitDetails?.length === 1) {
      dispatch(setUnitNumberPK(unitDetails[0].unitPK));
      dispatch(setUnitNumberInput(unitDetails[0].unitNumber));
    }
  }, [unitDetails]);

  useEffect(() => {
    if (unitNumberPK && unitDetails.length === 1) {
      localStorage.removeItem("dpuInstructionSelectedId");
      dispatch(setSelectId(unitNumberPK));
      if (viewCancel) {
        dispatch(setViewCancel(false));
      } else {
        dispatch(setPageNumber(0));
      }
    }
  }, [unitNumberPK, unitDetails]);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: unitDetails,
  };

  return (
    <div className="p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border halfScreenFormContentHeight">
        <Col className="p-15 mt-3 mb-3 ms-3" xs={7}>
          <Form.Group className="mt-3  align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0 text-start">
              <Form.Label htmlFor="unitNumberLast5" className="col-form-label me-4">
                Last 5
              </Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                className="customFormControl"
                id="unitNumberLast5"
                name="unitNumberLast5"
                type="text"
                value={unitNumberLast5}
                maxLength={5}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  dispatch(setUnitNumberLast5(e.target.value));
                  dispatch(setUnitNumberInput(""));
                  dispatch(setUnitNumberPK(null));
                  dispatch(setPageNumber(0));
                  dispatch(setSelectId(null));
                  localStorage.removeItem("dpuInstructionSelectedId");
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 form-group  align-items-center row m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0 text-start">
              <Form.Label className="col-form-label me-4">Unit Number</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0 d-flex">
              {/* Unit Number Autocomplete */}
              <AutoCompleteDropdown
                arrayList={unitNumber}
                searchString={unitNumberInput}
                renderItemId={(units) => units.unitPK}
                renderItemField={(units) => units.unitNumber}
                loading={unitNumberLoading}
                handleSearchString={(string) => {
                  dispatch(setUnitNumberInput(string));
                  dispatch(setPageNumber(0));
                }}
                fetchDataBySearchString={getAllUnitNumbers}
                onSelect={handleUnitNumberSelection}
                selectedId={unitNumberPK}
                clearInputCallback={() => {
                  dispatch(setUnitNumberPK(null));
                }}
                handleAutoCompleteClose={() => {
                  dispatch(setSelectId(null));
                  dispatch(setUnitNumberPK(null));
                  dispatch(setUnitNumberLast5(""));
                }}
                className={`${!unitNumberPK && unitNumberInput ? "borderRed" : ""}`}
              />
              <LookupButton onClick={() => setShowUnitSelectionLookup(true)} />
            </Col>
          </Form.Group>
        </Col>

        <Col className="px-3 mt-3 ">
          <div className="row border border-dark border-1">
            <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
              <div className="d-flex h-100">
                <div className="w-100">
                  {/* Listing of table */}
                  <div className="fixTableHead h-400px">
                    <table className="table table-striped f-w-600">
                      <thead>
                        <tr disabled>
                          <th
                            className="f-w-600"
                            onClick={() => {
                              onhandleNormalSort("unitNumber", !normalSortFlag);
                            }}
                          >
                            Unit Number
                            {normalSortFlag && normalSortValue === "unitNumber" && (
                              <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                            )}
                            {!normalSortFlag && normalSortValue === "unitNumber" && (
                              <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                            )}
                          </th>

                          <th
                            className="f-w-600"
                            onClick={() => {
                              onhandleNormalSort("model", !normalSortFlag);
                            }}
                          >
                            Model
                            {normalSortFlag && normalSortValue === "model" && (
                              <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                            )}
                            {!normalSortFlag && normalSortValue === "model" && (
                              <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                            )}
                          </th>

                          <th
                            className="f-w-600"
                            onClick={() => {
                              onhandleNormalSort("orderDate", !normalSortFlag);
                            }}
                          >
                            Order Date
                            {normalSortFlag && normalSortValue === "orderDate" && (
                              <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                            )}
                            {!normalSortFlag && normalSortValue === "orderDate" && (
                              <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                            )}
                          </th>

                          <th
                            className="f-w-600"
                            onClick={() => {
                              onhandleNormalSort("pickupPlantForDpu", !normalSortFlag);
                            }}
                          >
                            Plant
                            {normalSortFlag && normalSortValue === "pickupPlantForDpu" && (
                              <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                            )}
                            {!normalSortFlag && normalSortValue === "pickupPlantForDpu" && (
                              <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                            )}
                          </th>

                          <th
                            className="f-w-600"
                            onClick={() => {
                              onhandleNormalSort("unitTypeDescription", !normalSortFlag);
                            }}
                          >
                            Unit Type
                            {normalSortFlag && normalSortValue === "unitTypeDescription" && (
                              <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                            )}
                            {!normalSortFlag && normalSortValue === "unitTypeDescription" && (
                              <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                            )}
                          </th>
                        </tr>
                      </thead>
                      {unitsLoading
                        ? null
                        : unitDetails?.length !== 0 && (
                            <tbody>
                              {unitDetails?.map((units, index) => (
                                <tr
                                  id="rowId"
                                  key={units.unitPK}
                                  onClick={(value) => {
                                    dispatch(setSelectId(units.unitPK));
                                    dispatch(setDupInstructionValid(true));
                                  }}
                                  className={Number(selectId) === units.unitPK ? "tableSelected" : " "}
                                >
                                  <td className="f-w-600 col-2">{units.unitNumber}</td>
                                  <td className="f-w-600 col-2">{units.model}</td>
                                  <td className="f-w-600 col-2">{customFormatDate(units.orderDate)}</td>
                                  <td className="f-w-600 col-3">{units.pickupPlantForDpu}</td>
                                  <td className="f-w-600 col-3">{units.unitTypeDescription}</td>
                                </tr>
                              ))}
                            </tbody>
                          )}
                    </table>
                    {unitsLoading ? "" : unitDetails?.length === 0 && <NoRecordsMessage />}
                  </div>
                  {/* table listing ending */}
                </div>
                <PaginationComponent
                  {...paginationProps}
                  firstPage
                  lastPage
                  tripleArrowUp
                  tripleArrowDown
                  doubleArrowUp
                  doubleArrowDown
                  singleArrowUp
                  singleArrowDown
                  recordsPerPage={10}
                />
              </div>
            </div>
          </div>
        </Col>

        <UnitSelectionLookup
          MaintenanceProgram
          show={showUnitSelectionLookup}
          onHide={() => setShowUnitSelectionLookup(false)}
          handleLookupSelection={handleUnitNumberSelection}
          dpuInstructions
        />
      </div>
    </div>
  );
}
export default DpuInstructionsSelectionContent;
