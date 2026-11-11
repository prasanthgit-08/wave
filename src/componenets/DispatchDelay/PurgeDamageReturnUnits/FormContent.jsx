import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TableListing from "./TableListing";
import { Col, Form, Row } from "react-bootstrap";
import { PaginationComponent } from "../../common/PaginationComponent";
import PurgeDamageReturnUnitsService from "../../../services/PurgeDamageReturnUnitsService";
import {
  resetPurgeDamage,
  setCompanyFK,
  setCurrentCompanyName,
  setListingData,
  setLoader,
  setNavigateByNextButton,
  setPageNumber,
  setSelectId,
  setTotalElements,
  setTotalPages,
  setUnitDetails,
  setUnitNumberInput,
  setUnitNumberLast5,
  setUnitNumberPK,
} from "../../../redux/PurgeDamageReturnUnitsSlice";
import AutoCompleteDropdown from "../../common/AutoCompleteDropdown";
import { DPU_Instructions_RecordsPerPage } from "../../../services/constants/applicationConstants";
import LookupButton from "../../common/LookupButton";
import UnitSelectionLookup from "../../LookupScreens/UnitSelection/UnitSelectionLookup";
import LoadingIcon from "../../common/LoadingIcon";
import UnitDispatchLookup from "../../LookupScreens/UnitDispatch/UnitDispatchLookup";
import UnitDispatchLookupService from "../../../services/UnitDispatchLookupService";

const FormContent = () => {
  const dispatch = useDispatch();
  const { driverId } = useParams();

  const [unitNumber, setUnitNumber] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUnitSelectionLookup, setShowUnitSelectionLookup] = useState(false);

  const listingData = useSelector((state) => state.purgeDamageReturnUnits.listingData);
  const totalPages = useSelector((state) => state.purgeDamageReturnUnits.totalPages);
  const totalElements = useSelector((state) => state.purgeDamageReturnUnits.totalElements);
  const pageNumber = useSelector((state) => state.purgeDamageReturnUnits.pageNumber);
  const sortFlag = useSelector((state) => state.purgeDamageReturnUnits.sortFlag);
  const sortValue = useSelector((state) => state.purgeDamageReturnUnits.sortValue);
  const unitNumberLast5 = useSelector((state) => state.purgeDamageReturnUnits.unitNumberLast5);
  const unitNumberPK = useSelector((state) => state.purgeDamageReturnUnits.unitNumberPK);
  const unitNumberInput = useSelector((state) => state.purgeDamageReturnUnits.unitNumberInput);
  const unitDetails = useSelector((state) => state.purgeDamageReturnUnits.unitDetails);
  const selectId = useSelector((state) => state.purgeDamageReturnUnits.selectId);
  const updateFlag = useSelector((state) => state.purgeDamageReturnUnits.updateFlag);
  const companyPK = useSelector((state) => state.purgeDamageReturnUnits.companyFK);
  const [companyNames, setCompanyNames] = useState([]);
  const [companyName, setCompanyName] = useState("");

  const [unitListLoading, setUnitListLoading] = useState(false);
  const [purgeDamageReturnUnitsFlag, setPurgeDamageReturnUnitsFlag] = useState(true);
  const navigateByNextButton = useSelector((state) => state.purgeDamageReturnUnits.navigateByNextButton);
  const currentCompanyName = useSelector((state) => state.purgeDamageReturnUnits.currentCompanyName);
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  const getAllCompanyNames = () => {
    PurgeDamageReturnUnitsService.getAllCompanyNames()
      .then((response) => {
        const data = response?.data;
        setCompanyNames(data);
        const objectWithBitTrue = data?.find((item) => item.localCompany === true);
        if (objectWithBitTrue && !currentCompanyName) {
          dispatch(setCompanyFK(objectWithBitTrue?.companyPK));
          setCompanyName(objectWithBitTrue?.name);
        }
        dispatch(setNavigateByNextButton(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Unit number autocomplete
  const getAllUnitNumbers = (string) => {
    let last5 = unitNumberLast5;
    if (unitNumberPK) {
      last5 = "";
    }
    PurgeDamageReturnUnitsService.getAllUnitNumbersAuto(string, last5)
      .then((response) => {
        const data = response?.data?.content;
        const uniqueUnits = data?.filter(
          (unit, index, arr) => arr?.findIndex((u) => u.unitPK === unit.unitPK) === index
        );
        const unitNum = uniqueUnits?.map((units) => ({ ...units, unitNumber: units.unitNumber?.trim() }));
        setUnitNumber(unitNum);
      })
      .catch((error) => {});
  };

  const fetchUnitsByUnitNumber = (string) => {
    setUnitListLoading(true);
    let last5 = unitNumberLast5;
    PurgeDamageReturnUnitsService.getAllUnitsForAutocomplete(
      companyName,
      string,
      last5,
      null,
      null,
      null,
      null,
      null,
      null,
      purgeDamageReturnUnitsFlag,
      companyPK
    )
      .then((response) => {
        const data = response?.data?.content;
        const uniqueUnits = data?.filter(
          (unit, index, arr) => arr?.findIndex((u) => u.unitPK === unit.unitPK) === index
        );
        const trimmedList = uniqueUnits?.map((unit) => ({ ...unit, unitNumber: unit.unitNumber?.trim() }));
        setUnitNumber(trimmedList);
        setUnitListLoading(false);
      })
      .catch((err) => {
        setUnitListLoading(false);
      });
  };

  //Unit number autocomplete onselect
  const handleUnitNumberSelection = (unit) => {
    dispatch(setUnitNumberPK(unit.unitPK));
    dispatch(setUnitNumberInput(unit.unitNumber?.trim()));
    localStorage.removeItem("dpuInstructionSelectedId");
    dispatch(setSelectId(unit.unitPK));
    dispatch(setPageNumber(0));
    if (!unit.unitNumberLast5?.startsWith(unitNumberLast5)) {
      dispatch(setUnitNumberLast5(""));
    }
    setShowUnitSelectionLookup(false);
  };

  useEffect(() => {
    setTimeout(() => {
      getAllCompanyNames();
    }, 25);
  }, []);

  useEffect(() => {
    currentCompanyName && setCompanyName(currentCompanyName);
  }, [navigateByNextButton]);

  useEffect(() => {
    if (!selectId && localStorage.getItem("dpuInstructionSelectedId")) {
      dispatch(setSelectId(localStorage.getItem("dpuInstructionSelectedId")));
    }
  }, [selectId]);

  useEffect(() => {
    if (unitNumberLast5 && unitDetails?.length === 1) {
      dispatch(setUnitNumberPK(unitDetails[0].unitPK));
      dispatch(setUnitNumberInput(unitDetails[0].unitNumber));
    }
  }, [unitDetails]);

  useEffect(() => {
    if (unitNumberPK && unitDetails?.length === 1) {
      localStorage.removeItem("dpuInstructionSelectedId");
      dispatch(setSelectId(unitNumberPK));
    }
  }, [unitNumberPK, unitDetails]);

  useEffect(() => {
    if (companyPK != null && companyName) {
      fetchUnitsByUnitNumber(unitNumberInput);
    }
  }, [unitNumberLast5, companyName]);

  const fetchPurgeDocuments = () => {
    PurgeDamageReturnUnitsService.getPurgeDamageReturnRecords(
      "",
      "",
      pageNumber,
      sortValue,
      sortFlag,
      "BROWSE",
      0,
      0,
      selectId ? unitNumberInput : null,
      String(unitNumberLast5).length === 5 ? unitNumberLast5 : null,
      companyPK
    )
      .then(({ data }) => {
        setLoading(false);
        if (data?.content?.length > 0 && !data?.content[0]?.dispatchPK) {
          dispatch(setListingData([]));
        } else {
          dispatch(setListingData(data?.content));
        }
        dispatch(setTotalElements(data?.totalElements));
        dispatch(setTotalPages(data?.totalPages));
        dispatch(setLoader(false));
      })
      .catch((err) => {
        dispatch(setListingData([]));
        setLoading(false);
        console.log("Error ", err);
      });
  };

  useEffect(() => {
    if (companyPK) {
      setTimeout(() => {
        fetchPurgeDocuments();
      }, 5);
    }
  }, [pageNumber, sortValue, sortFlag, selectId, unitNumberLast5, companyPK]);

  return (
    <div div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight" style={{ height: "428px" }}>
        <Row className="m-0 p-10">
          <Form.Group
            className="mt-2 form-group m-b-0 align-items-center row m-l-0 m-r-0"
            style={{ marginLeft: "100px" }}
          >
            <Col sm={3} md={3} xs={3} className="p-15" style={{ textAlign: "right", marginRight: "15px" }}>
              <Form.Label className="customColFormLabel">Last 5</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "100px" }}>
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
                  dispatch(setSelectId(null));
                  setUnitNumber(null);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className=" mt-2 form-group m-b-15 align-items-center row m-l-0 m-r-0 ">
            <Col sm={3} md={3} xs={3} className="p-15" style={{ textAlign: "right", marginRight: "15px" }}>
              <Form.Label className="customColFormLabel">Unit Number</Form.Label>
            </Col>
            <Col xs={5} md={5} sm={5} className="p-0 d-flex" style={{ width: "275px" }}>
              {/* Unit Number Autocomplete */}
              <AutoCompleteDropdown
                arrayList={unitNumber}
                searchString={unitNumberInput}
                renderItemId={(units) => units.unitPK}
                renderItemField={(units) => units.unitNumber}
                handleSearchString={(string) => {
                  dispatch(setUnitNumberInput(string));
                  dispatch(setPageNumber(0));
                }}
                fetchDataBySearchString={(searchTerm) => {
                  fetchUnitsByUnitNumber(searchTerm);
                }}
                onSelect={handleUnitNumberSelection}
                selectedId={unitNumberPK}
                clearInputCallback={() => {
                  dispatch(setUnitNumberPK(null));
                  dispatch(setSelectId(null));
                }}
                handleAutoCompleteClose={() => {
                  dispatch(setUnitNumberPK(null));
                  dispatch(setUnitNumberLast5(""));
                }}
                className={`${!unitNumberPK && unitNumberInput ? "borderRed" : ""}`}
                loading={unitListLoading}
              />

              <LookupButton onClick={() => setShowUnitSelectionLookup(true)} />
            </Col>
          </Form.Group>

          <Form.Group
            className="mt-1 form-group m-b-0 align-items-center row m-l-0 m-r-0"
            style={{ marginLeft: "100px" }}
          >
            <Col sm={3} md={3} xs={3} className="p-0" style={{ textAlign: "right", marginRight: "15px" }}>
              <Form.Label className="customColFormLabel">Company</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0 d-flex" style={{ width: "235px" }}>
              <Form.Select
                className="customFormControl p-0"
                value={`${companyPK}-${companyName}`}
                onChange={(e) => {
                  const [companyId, companyName] = e.target.value.split("-");
                  dispatch(setCompanyFK(companyId));
                  setCompanyName(companyName);
                  dispatch(setCurrentCompanyName(companyName));
                  dispatch(setUnitNumberLast5(""));
                  dispatch(setUnitNumberInput(""));
                  dispatch(setUnitNumberPK(null));
                  dispatch(setPageNumber(0));
                  dispatch(setSelectId(null));
                  setUnitNumber(null);
                }}
              >
                {companyNames?.map((item) => (
                  <option value={`${item.companyPK}-${item.name}`} key={item.companyPK}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>

          <div className="h-400px mt-4 mx-2">
            <div className="d-flex border border-1 border-dark">
              <div className="flex-grow-1">
                {loading && <LoadingIcon />}
                <TableListing />
              </div>

              <PaginationComponent
                {...paginationProps}
                firstPage
                lastPage
                singleArrowUp
                singleArrowDown
                recordsPerPage={6}
              />
            </div>
          </div>
        </Row>
        <UnitDispatchLookup
          show={showUnitSelectionLookup}
          onHide={() => setShowUnitSelectionLookup(false)}
          handleLookupSelection={handleUnitNumberSelection}
          MaintenanceProgram
          // companyName
          selectedCompanyName={companyName}
          selectedCompanyFK={companyPK}
          // PaperworkProcessing
          purgeReturnUnit
        />
      </div>
    </div>
  );
};

export default FormContent;
