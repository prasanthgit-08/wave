import React, { useEffect, useRef, useState } from "react";
import { Col, Form, Row, Modal, Button } from "react-bootstrap";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import TableListing from "../TableListing";
import PaperworkProcessingService from "../../../../services/Invoicing/PaperworkProcessingService";
import { useDispatch, useSelector } from "react-redux";
import numberValidation from "../../../../utils/validation/NumberValidation";
import {
  setUnitsList,
  setUnitsPageList,
  addToSelected,
  filterUnits,
  addToUnits,
  filterSelected,
  setSelectedUnit,
  setSearchTerm,
  setSearchCriteria,
  setEnableAddLoadUnitButtons,
  setResponseMessage,
  setShowUnitInactiveModal,
  setMultiUnitSeperateInvoice,
  setUnitOnInvoiceHold,
  setCompanyFK,
  setCompanyName,
  setUnitId,
  toggleChangesCancelled,
  setSelectedUnitsList,
  setMinimumDeliveryDate,
  setUnitInstructionValue,
  setIsDeliveryDateDefaultValue,
} from "../../../../redux/Invoicing/PaperworkProcessingSlice";
import UnitDispatchLookup from "../../../LookupScreens/UnitDispatch/UnitDispatchLookup";
import LoadingIcon from "../../../common/LoadingIcon";
import useDebouncer from "../../../../hooks/useDebouncer";
import CompanyService from "../../../../services/CompanyService";
import { getCurrentCompany } from "../../../../utils/utils";

const UnitSelectionContent = () => {
  /* Local States**/
  const dispatch = useDispatch();
  const didMount = useRef(false);
  const [unitListLoading, setUnitListLoading] = useState(false);
  const [bolNumber, setBolNumber] = useState("");
  const [last5, setLast5] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [showUnitLookup, setShowUnitLookup] = useState(false);
  const [loading, setLoading] = useState(false);

  /* Global States **/
  const unitsList = useSelector((state) => state.paperworkProcessing.unitsList);
  const selectedUnitsList = useSelector((state) => state.paperworkProcessing.selectedUnitsList);
  const unitsPageList = useSelector((state) => state.paperworkProcessing.unitsPageList);
  const searchTerm = useSelector((state) => state.paperworkProcessing.searchTerm);
  const searchCriteria = useSelector((state) => state.paperworkProcessing.searchCriteria);
  const selectedUnit = useSelector((state) => state.paperworkProcessing.selectedUnit);
  const changesCancelled = useSelector((state) => state.paperworkProcessing.changesCancelled);
  const { pageNumber, totalPages, totalElements } = useSelector((state) => state.paginationReducer);
  const additionalAmounts = useSelector((state) => state.paperworkProcessing.additionalAmounts);
  const responseMessage = useSelector((state) => state.paperworkProcessing.responseMessage);
  const showUnitInactiveModal = useSelector((state) => state.paperworkProcessing.showUnitInactiveModal);
  const unitOnInvoiceHold = useSelector((state) => state.paperworkProcessing.unitOnInvoiceHold);
  const companyFK = useSelector((state) => state.paperworkProcessing.companyFK);
  const companyName = useSelector((state) => state.paperworkProcessing.companyName);
  const unitId = useSelector((state) => state.paperworkProcessing.unitId);
  const minDeliveryDate = useSelector((state) => state.paperworkProcessing.minimumDeliveryDate);

  /** Handler Functions */

  const [companyNames, setCompanyNames] = useState([]);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [companyLoading, setCompanyLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);

  //Fetch All Company Names
  const getCompanyNames = () => {
    setCompanyLoading(true);
    CompanyService.getAllCompanyData()
      .then((response) => {
        const data = response?.data;
        setCompanyNames(Array.isArray(data) ? data : []);
        if (!companyFK) {
          const currentCompany = getCurrentCompany();
          if (currentCompany) {
            dispatch(setCompanyFK(currentCompany?.companyPK));
            dispatch(setCompanyName(currentCompany?.name));
          }
        }
      })
      .catch((error) => {
        setCompanyLoading(false);
      })
      .finally(() => setCompanyLoading(false));
  };

  const findBySearchTerm = (searchCriteria, searchTerm) => {
    if (searchTerm !== "") {
      setApiLoading(true);
      PaperworkProcessingService.getAllUnitsBySearch(searchCriteria, searchTerm, companyFK, companyName)
        .then((response) => {
          setApiLoading(false);
          const data = response?.data;
          let arrayToAdd = data?.filter((element) =>
            selectedUnitsList?.every((item) => item?.unitPK !== element?.unitPK)
          );
          if (arrayToAdd?.length > 0) {
            dispatch(setUnitsList(arrayToAdd));
          } else {
            dispatch(setUnitsList([]));
          }
        })
        .catch(() => {
          setApiLoading(false);
        });
    }
  };

  const onTable1RowDoubleClick = (unit) => {
    if (unit?.unitPK != null && companyFK) {
      setLoading(true);
      PaperworkProcessingService.getUnitDetailsById(unit?.unitPK, companyFK, companyName)
        .then((response) => {
          const data = response?.data;
          if (data) {
            dispatch(setIsDeliveryDateDefaultValue([data]));
          }
          if (data) dispatch(setIsDeliveryDateDefaultValue([data]));
          dispatch(setMinimumDeliveryDate(data?.minDeliveryDate));
          dispatch(setUnitInstructionValue(data?.orderEntryInstructions));
          let addUnit = true;
          if (data != null) {
            if (data?.responseMessage !== null) {
              dispatch(setShowUnitInactiveModal(true));
              dispatch(setResponseMessage(data?.responseMessage));
            } else {
              if (selectedUnitsList?.length > 0) {
                // for testing purpose
                if (
                  selectedUnit?.multiUnit &&
                  selectedUnit?.unitMultiLoadFK != null &&
                  data?.unitMultiLoadFK === selectedUnit?.unitMultiLoadFK
                ) {
                  addUnit = true;
                } else {
                  addUnit = false;
                  dispatch(setShowUnitInactiveModal(true));
                  dispatch(
                    setResponseMessage(
                      !selectedUnit?.multiUnit ? "Can't add more units" : "Cant add another unit to this load"
                    )
                  );
                }
              }
              if (addUnit) {
                // moveToBottom(data.unitPK);
                dispatch(addToSelected({ ...data }));
                dispatch(filterUnits(data?.unitPK));
                dispatch(setSelectedUnit(data));
              }
            }
          }
        })
        .finally(() => {
          setLoading(false);
        });
      // }
    }
  };

  const onTable2RowDoubleClick = (unit) => {
    if (unit?.unitPK != null) {
      moveToTop(unit?.unitPK);

      dispatch(filterSelected(unit?.unitPK));
    }
  };

  const handleUnitInactiveModalClose = () => {
    dispatch(setShowUnitInactiveModal(false));
    dispatch(setResponseMessage(null));
  };

  const moveToBottom = (id) => {
    let selectedUnit = unitsList?.find((unit) => unit?.unitPK === id);
    if (!selectedUnit) return;
    dispatch(
      addToSelected({
        ...selectedUnit,
      })
    );
  };

  const moveToTop = (id) => {
    let selectedUnit = selectedUnitsList?.find((unit) => unit?.unitPK === id);
    if (!selectedUnit) return;
    dispatch(addToUnits(selectedUnit));
  };

  /**
   * Used for Units listing By Unit Number AutoComplete
   */
  const fetchUnitsByUnitNumber = (string, bolNumber, last5, companyFK, companyName) => {
    setUnitListLoading(true);
    PaperworkProcessingService.getAllUnitsForAutocomplete(
      "Beginning",
      string,
      bolNumber,
      last5,
      pageNumber,
      companyFK,
      companyName
    )
      .then((response) => {
        const data = response?.data;
        const trimmedList = data?.map((unit) => ({ ...unit, unitNumber: unit.unitNumber?.trim() }));
        dispatch(setUnitsPageList(trimmedList));
        setUnitListLoading(false);
      })
      .catch((err) => {
        setUnitListLoading(false);
      });
  };

  const fetchUnitNumberDebouncer = useDebouncer(fetchUnitsByUnitNumber, 500);

  /**
   * Handle AutoComplete Selection
   */
  const handleUnitNumberSelection = (e, fromLookup) => {
    dispatch(setSearchCriteria("UnitNumber"));
    dispatch(setSearchTerm(e?.unitNumber));
    dispatch(setUnitId(e?.unitPK));
    setUnitNumber(e?.unitNumber);
    findBySearchTerm("UnitNumber", e?.unitNumber);
    setShowUnitLookup(false);
  };

  /** Use Effects */

  useEffect(() => {
    getCompanyNames();
  }, []);

  useEffect(() => {
    if (changesCancelled) {
      if (companyFK) return;
      const currentCompany = getCurrentCompany();
      if (!currentCompany) return;
      dispatch(setCompanyFK(currentCompany?.companyPK));
      dispatch(setCompanyName(currentCompany?.name));
    }
  }, [changesCancelled]);

  useEffect(() => {
    dispatch(setEnableAddLoadUnitButtons(false));
  }, []);

  useEffect(() => {
    if (selectedUnit) {
      dispatch(setUnitOnInvoiceHold(selectedUnit?.unitOnInvoiceHold || false));

      if (selectedUnit.multiUnit && selectedUnit.unitMultiLoadFK != null) {
        dispatch(setMultiUnitSeperateInvoice(selectedUnit.singleInvoiceMultiUnit || false));
        if (
          selectedUnitsList?.length === selectedUnit.totalUnits ||
          selectedUnitsList?.length === 0 ||
          !selectedUnitsList
        )
          dispatch(setEnableAddLoadUnitButtons(false));
        else dispatch(setEnableAddLoadUnitButtons(true));
      }
    }
    selectedUnitsList?.map((item) => dispatch(filterUnits(item?.unitPK)));
  }, [selectedUnit, selectedUnitsList]);

  useEffect(() => {
    setBolNumber("");
    setLast5("");
    setUnitNumber("");
  }, [changesCancelled]);

  useEffect(() => {
    if (searchTerm === "") {
      setBolNumber("");
      setLast5("");
      setUnitNumber("");
    }

    if (searchCriteria === "BOLNumber") {
      setBolNumber(searchTerm);
      setLast5("");
    } else if (searchCriteria === "Last5") {
      setBolNumber("");
      setLast5(searchTerm);
    } else if (searchCriteria === "UnitNumber") {
      setBolNumber("");
      setLast5("");
      if (unitId) {
        setUnitNumber(searchTerm);
      }
    }
  }, [searchTerm, searchCriteria]);

  useEffect(() => {
    if (!didMount.current) return;

    setBolNumber("");
    setLast5("");
    setUnitNumber("");

    dispatch(setSearchTerm(""));
    dispatch(setSearchCriteria(""));
    dispatch(setUnitId(null));
    dispatch(setUnitsList([]));
    dispatch(setSelectedUnit(null));
    dispatch(setSelectedUnitsList([]));
  }, [companyFK]);

  useEffect(() => {
    didMount.current = true;
  }, []);

  return (
    <div className="p-2">
      {(loading || companyLoading || apiLoading) && <LoadingIcon />}
      <div className="shadow-sm rounded border p-2 halfScreenFormContentHeight">
        <Col xs={12}>
          <Row>
            <Col className="p-15 mt-3 " xs={3}>
              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={4} className="p-0">
                  <Form.Label className="customColFormLabel">BOL Number</Form.Label>
                </Col>

                <Col xs={7} className="p-0">
                  <input
                    name="bolNumber"
                    id="bolNumber"
                    type="text"
                    className={`customFormControl`}
                    value={bolNumber}
                    onChange={(e) => {
                      dispatch(setSearchCriteria("BOLNumber"));
                      dispatch(setSearchTerm(numberValidation(e.target.value)));
                      numberValidation(e.target.value) &&
                        fetchUnitNumberDebouncer(unitNumber, e.target.value, last5, companyFK, companyName);
                    }}
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (value?.length === 6) {
                        setUnitNumber("");
                        findBySearchTerm("BOLNumber", numberValidation(value));
                      }
                    }}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
                <Col xs={4} className="p-0">
                  <Form.Label className="customColFormLabel">Last 5</Form.Label>
                </Col>

                <Col xs={4} className="p-0">
                  <input
                    name="last5"
                    id="last5"
                    type="text"
                    className={`customFormControl`}
                    onChange={(e) => {
                      const value = e.target.value;
                      dispatch(setSearchCriteria("Last5"));
                      dispatch(setSearchTerm(value));
                      if (value?.length === 5) {
                        fetchUnitNumberDebouncer(
                          unitNumber,
                          bolNumber,
                          e.target.value,
                          companyFK,
                          companyName
                        );
                      }
                    }}
                    value={last5}
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (value?.length === 5) {
                        setUnitNumber("");
                        findBySearchTerm("Last5", value);
                      }
                    }}
                    maxLength={5}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col className="p-15 mt-3 " xs={6}>
              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Unit Number</Form.Label>
                </Col>

                <Col xs={5} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={unitsPageList}
                    searchString={unitNumber}
                    renderItemId={(unit) => unit?.unitPK}
                    renderItemField={(unit) => unit.unitNumber}
                    handleSearchString={(string) => {
                      setUnitNumber(string);
                    }}
                    fetchDataBySearchString={(string) =>
                      fetchUnitsByUnitNumber(string, bolNumber, last5, companyFK, companyName)
                    }
                    loading={unitListLoading}
                    onSelect={(unit) => handleUnitNumberSelection(unit, false)}
                    selectedId={unitId}
                    clearInputCallback={() => {
                      if (didMount.current) {
                        dispatch(setUnitId(null));
                        dispatch(setUnitsList([]));
                      }
                    }}
                    className={!unitNumber || unitId ? "" : "borderRed"}
                    disabled={false}
                  />

                  <LookupButton onClick={() => setShowUnitLookup(true)} />
                  {showUnitLookup && (
                    <UnitDispatchLookup
                      show={showUnitLookup}
                      onHide={() => setShowUnitLookup(false)}
                      handleLookupSelection={(unit) => handleUnitNumberSelection(unit, true)}
                      MaintenanceProgram

                      selectedCompanyName={companyName}
                      selectedCompanyFK={companyFK}
                    />
                  )}
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={2} sm={2} className="p-0">
                  <Form.Label className="col-form-label me-4">Company</Form.Label>
                </Col>
                <Col xs={5} md={5} sm={5} className="p-0 ">
                  <Form.Select
                    className="customFormControl col"
                    value={`${companyFK}-${companyName}`}
                    onChange={(e) => {
                      const [companyId, companyName] = e.target.value.split("-");
                      dispatch(setCompanyName(companyName));
                      dispatch(setCompanyFK(companyId));
                      fetchUnitsByUnitNumber(unitNumber, bolNumber, last5, companyId, companyName);
                    }}
                  >
                    {companyNames.map((item) => (
                      <option value={`${item?.CompanyPK}-${item?.Name}`} key={item?.CompanyPK}>
                        {item?.Name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Col>

        {/* Unit Listing 1 */}
        <Row className="mx-0 p-0 mt-4">
          <Col xs={12}>
            <TableListing
              loading={false}
              listingData={unitsList}
              onTableRowDoubleClick={onTable1RowDoubleClick}
            />
          </Col>
        </Row>

        {/* Unit Listing 2 */}
        <Row className="mx-0 p-0 mt-4">
          <Col xs={12}>
            <TableListing listingData={selectedUnitsList} onTableRowDoubleClick={onTable2RowDoubleClick} />
          </Col>
        </Row>

        <Modal
          show={showUnitInactiveModal}
          onHide={handleUnitInactiveModalClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Warning !!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="font-14 h-100">
            <p style={{ color: "red" }}>{responseMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleUnitInactiveModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default UnitSelectionContent;
