import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import {
  setCompanyFK,
  setCompanyName,
  setInvoiceData,
  setTotalElements,
  setTotalPages,
  setUnitNumber,
  setUnitNumberId,
  setUnitNumberLast5,
  setSelectedCompanyName,
  setUnitNumberData,
  setUnitFK,
  setUnitTotalElements,
  setUnitTotalPages,
  setUnitPageNumber,
  setDocumentFiles,
  setNormalSortValue,
  setNormalSortFlag,
  setSisterUnitFK,
  setIsNonUnit,
} from "../../../../../redux/DriverInvoiceSlice";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import { formatDate } from "../../../../../utils/dateUtils";
import TruncatedStringWithTooltip from "../../../../common/TruncatedStringWithTooltip";
import NoRecordsMessage from "../../../../common/NoRecordsMessage";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import UnitSelectionLookup from "../../../../LookupScreens/UnitSelection/UnitSelectionLookup";
import DriverInvoiceService from "../../../../../services/DriverInvoiceService";
import DelayProcessingService from "../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";

const DriverInvoiceUnitSelectionContent = () => {
  const dispatch = useDispatch();

  const unitPageNumber = useSelector((state) => state.driverInvoiceReducer.unitPageNumber);
  const unitTotalPages = useSelector((state) => state.driverInvoiceReducer.unitTotalPages);
  const unitTotalElements = useSelector((state) => state.driverInvoiceReducer.unitTotalElements);
  const companyFK = useSelector((state) => state.driverInvoiceReducer.companyFK);
  const invoiceData = useSelector((state) => state.driverInvoiceReducer.invoiceData);
  const companyName = useSelector((state) => state.driverInvoiceReducer.companyName);
  const unitNumberLast5 = useSelector((state) => state.driverInvoiceReducer.unitNumberLast5);
  const unitNumber = useSelector((state) => state.driverInvoiceReducer.unitNumber);
  const unitNumberId = useSelector((state) => state.driverInvoiceReducer.unitNumberId);
  const sortValue = useSelector((state) => state.driverInvoiceReducer.normalSortValue);
  const sortType = useSelector((state) => state.driverInvoiceReducer.normalSortFlag);
  const searchTerm = useSelector((state) => state.driverInvoiceReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.driverInvoiceReducer.searchCriteria);
  const selectedCompanyName = useSelector((state) => state.driverInvoiceReducer.selectedCompanyName);
  const cancelChanges = useSelector((state) => state.driverInvoiceReducer.cancelChanges);

  const unitNumberData = useSelector((state) => state.driverInvoiceReducer.unitNumberData);
  const unitFK = useSelector((state) => state.driverInvoiceReducer.unitFK);

  const [showUnitSelectionLookup, setShowUnitSelectionLookup] = useState(false);
  const [companyNames, setCompanyNames] = useState([]);
  const [unitListLoading, setUnitListLoading] = useState(false);
  const [unitAutoListLoading, setUnitAutoListLoading] = useState(false);

  const [companyLoading, setCompanyLoading] = useState(false);

  /*****
   * Get All Company Names
   * *****/
  const getCompanyNames = () => {
    DelayProcessingService.getAllCompanyData()
      .then((res) => {
        if (res?.data) {
          setCompanyNames(res?.data);

          if (!companyFK) {
            const value = res?.data?.find((item) => item.LocalCompany === true);
            dispatch(setCompanyFK(value.CompanyPK));
            dispatch(setSelectedCompanyName(value.Name));
            setCompanyLoading(false);
          }
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setCompanyLoading(false));
  };

  const fetchInvoiceData = () => {
    setUnitListLoading(true);

    if (companyFK) {
      DriverInvoiceService.getAllInvoiceBySearch(
        searchCriteria,
        unitPageNumber,
        sortType,
        sortValue,
        unitNumber,
        unitNumberLast5,
        unitNumberId,
        companyFK
      )
        .then((response) => {
          const data = response?.data;
          const invoiceData = data?.filter((item) => item?.Type !== "Pagination");

          dispatch(setInvoiceData(invoiceData));

          const paginationData = data?.find((item) => item?.Type === "Pagination");

          if (paginationData) {
            dispatch(setUnitTotalElements(paginationData?.TotalElements));
            dispatch(setUnitTotalPages(paginationData?.TotalPages));
          }
        })
        .finally(() => {
          setUnitListLoading(false);
        });
    }
  };

  const fetchUnitNumberData = (unitNumber) => {
    setUnitAutoListLoading(true);
    DriverInvoiceService.getUnitNumberAutoComplete(
      unitNumber,
      "",
      unitNumberId == null ? 0 : unitNumberId,
      companyFK
    )
      .then((response) => {
        const data = response?.data;
        const unitData = data?.filter((item) => item?.Type !== "Pagination");

        dispatch(setUnitNumberData(unitData));

        if (data?.Type === "Pagination") {
          dispatch(setTotalElements(data?.TotalElements));
          dispatch(setTotalPages(data?.TotalPages));
        }
      })
      .finally(() => {
        setUnitAutoListLoading(false);
      });
  };

  const handleunitLookupSelection = (unit) => {
    dispatch(setUnitNumber(unit.UnitNumber));
    dispatch(setUnitNumberId(unit.UnitPK));
    fetchUnitNumberData(unit.UnitNumber);
  };

  const handleUnitNumberLookupSelection = (e) => {
    const selectedUnitNumber = e?.UnitNumber;
    dispatch(setUnitNumber(selectedUnitNumber));
    dispatch(setUnitNumberId(e?.UnitPK || e?.sisterUnitFK));
    setShowUnitSelectionLookup(false);

    if (selectedUnitNumber) {
      fetchUnitNumberData(selectedUnitNumber);
    }
  };

  useEffect(() => {
    if (!unitNumberLast5 || unitNumberLast5?.length < 5) {
      dispatch(setInvoiceData([]));
    }
  }, [unitNumberLast5]);

  useEffect(() => {
    getCompanyNames();
  }, [cancelChanges]);

  useEffect(() => {
    dispatch(setCompanyName(selectedCompanyName));
  }, [selectedCompanyName]);

  useEffect(() => {
    if (unitNumberId || unitNumber !== "") {
      dispatch(setUnitNumberLast5(""));
      dispatch(setInvoiceData([]));
    }
  }, [unitNumberId, unitNumber]);

  useEffect(() => {
    if (unitNumberLast5?.length === 5) {
      dispatch(setUnitNumber(""));
      dispatch(setUnitNumberId(null));
      dispatch(setInvoiceData([]));
    }
  }, [unitNumberLast5]);

  useEffect(() => {
    if (!unitNumberLast5 && !unitNumber) {
      dispatch(setInvoiceData([]));
    }
  }, [unitNumberLast5, unitNumber]);

  const paginationProps = {
    pageNumber: unitPageNumber,
    setPageNumber: (value) => dispatch(setUnitPageNumber(value)),
    totalPages: unitTotalPages,
    totalElements: unitTotalElements,
    listingData: invoiceData,
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };
  useEffect(() => {
    if (unitNumberLast5 !== null && unitNumberLast5?.length >= 5) {
      fetchInvoiceData();
    }
  }, [unitNumberLast5, unitNumberId]);

  useEffect(() => {
    if (!unitNumber) {
      dispatch(setUnitNumberData());
    }
  }, [unitNumber]);

  useEffect(() => {
    if (!unitNumberId) {
      dispatch(setInvoiceData());
      dispatch(setNormalSortValue(""));
      dispatch(setNormalSortFlag(false));
    }
  }, [unitNumberId]);

  useEffect(() => {
    dispatch(setInvoiceData());
  }, []);

  const isSelectedUnitNotInAutocomplete =
    unitNumberId &&
    !unitNumberData?.some((unit) => unit?.UnitPK === unitNumberId || unit?.sisterUnitFK === unitNumberId);

  useEffect(() => {
    fetchInvoiceData();
  }, [searchCriteria, searchTerm, unitPageNumber, sortType, sortValue, unitNumberId, selectedCompanyName]);

  return (
    <div className="m-1">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight" style={{ height: "432px" }}>
        <div className="p-2 mb-4 ">
          <Row>
            <Col xs={6}>
              <Form.Group className="form-group mt-3 align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={3} sm={3} className="p-0">
                  <Form.Label className="col-form-label me-4"> Unit Company</Form.Label>
                </Col>
                <Col xs={8} className="p-0 ">
                  <Form.Select
                    className="customFormControl"
                    value={`${companyFK}-${selectedCompanyName}`}
                    onChange={(e) => {
                      const [companyId, companyName] = e.target.value.split("-");
                      dispatch(setSelectedCompanyName(companyName));
                      dispatch(setCompanyName(companyName));
                      dispatch(setCompanyFK(companyId));
                      dispatch(setUnitNumber(""));
                      dispatch(setUnitNumberLast5(""));
                      dispatch(setUnitNumberData([]));
                    }}
                  >
                    {companyNames.map((item) => (
                      <option value={`${item.CompanyPK}-${item.Name}`} key={item.CompanyPK}>
                        {item.Name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col xs={3} sm={3} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
                    Last 5
                  </Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="unitNumberLast5"
                    name="unitNumberLast5"
                    type="text"
                    value={unitNumberLast5}
                    maxLength={5}
                    onChange={(e) => {
                      dispatch(setUnitNumberLast5(e.target.value?.toUpperCase()));
                      dispatch(setUnitNumber(""));
                      dispatch(setUnitNumberId(null));
                      dispatch(setInvoiceData([]));
                    }}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group mt-3 align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={3} sm={3} className="p-0">
                  <Form.Label className="customColFormLabel">Unit Number</Form.Label>
                </Col>

                <Col xs={8} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={unitNumberData}
                    searchString={unitNumber}
                    renderItemId={(unit) => unit?.UnitPK}
                    renderItemField={(unit) => unit?.UnitNumber}
                    maxLength={21}
                    selectedId={unitNumberId}
                    handleSearchString={(string) => {
                      dispatch(setUnitNumber(string));
                      dispatch(setUnitNumberLast5(""));
                      dispatch(setInvoiceData([]));
                    }}
                    fetchDataBySearchString={fetchUnitNumberData}
                    allowSearchOnLength={3}
                    setArrayList={(value) => dispatch(setUnitNumberData(value))}
                    onSelect={handleunitLookupSelection}
                    clearInputCallback={() => {
                      dispatch(setUnitNumberId(0));
                    }}
                    handleAutoCompleteClose={() => {}}
                    className={`${
                      (!unitNumberId && unitNumber) || isSelectedUnitNotInAutocomplete ? "borderRed" : ""
                    }`}
                    disabled={false}
                    loading={unitAutoListLoading}
                  />

                  <LookupButton onClick={() => setShowUnitSelectionLookup(true)} />
                </Col>
              </Form.Group>
            </Col>
            <Col xs={6}></Col>
          </Row>
          <div className="d-flex h-100  mt-4 mx-2" style={{ height: "190px" }}>
            <div className="w-100 border-1 border border-dark border-right-0">
              <div className="fixTableHead " style={{ height: "250px" }}>
                <table className="table table-striped f-w-600">
                  <thead>
                    <tr>
                      <th
                        className="f-w-600 col-3"
                        onClick={() => {
                          onhandleNormalSort("UnitNumber", !sortType);
                        }}
                      >
                        Unit Number
                        {sortType && sortValue === "UnitNumber" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!sortType && sortValue === "UnitNumber" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                      <th
                        className="f-w-600 col-3"
                        onClick={() => {
                          onhandleNormalSort("DeliveredDate", !sortType);
                        }}
                      >
                        Delivery Date
                        {sortType && sortValue === "DeliveredDate" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!sortType && sortValue === "DeliveredDate" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                      <th
                        className="f-w-600 col-3"
                        onClick={() => {
                          onhandleNormalSort("PickUp", !sortType);
                        }}
                      >
                        PickUp
                        {sortType && sortValue === "PickUp" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!sortType && sortValue === "PickUp" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>

                      <th
                        className="f-w-600 col-3"
                        onClick={() => {
                          onhandleNormalSort("Delivery", !sortType);
                        }}
                      >
                        Delivery
                        {sortType && sortValue === "Delivery" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!sortType && sortValue === "Delivery" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {invoiceData?.map((invoice) => (
                      <tr
                        key={invoice?.UnitPK}
                        className={unitFK === invoice?.UnitPK ? "tableSelected" : ""}
                        onClick={() => {
                          if (selectedCompanyName !== companyName) {
                            dispatch(setSisterUnitFK(invoice?.UnitPK));
                          } else {
                            dispatch(setUnitFK(invoice?.UnitPK));
                          }
                          dispatch(setIsNonUnit(false));
                          dispatch(setDocumentFiles());
                        }}
                        onDoubleClick={() => {
                          if (selectedCompanyName !== companyName) {
                            dispatch(setSisterUnitFK(invoice?.UnitPK));
                          } else {
                            dispatch(setUnitFK(invoice?.UnitPK));
                          }
                          dispatch(setDocumentFiles());
                        }}
                      >
                        <td>
                          <TruncatedStringWithTooltip text={invoice?.UnitNumber || ""} charLimit={15} />
                        </td>
                        <td>{formatDate(invoice?.DeliveredDate)}</td>

                        <td>
                          <TruncatedStringWithTooltip text={invoice?.PickUp || ""} charLimit={20} />
                        </td>
                        <td>
                          <TruncatedStringWithTooltip text={invoice?.Delivery || ""} charLimit={20} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {unitListLoading ? (
                  <div className="fade modal-backdrop show">
                    <div className="pos-center">
                      <div className="loader"></div>
                    </div>
                  </div>
                ) : (
                  invoiceData?.length === 0 && <NoRecordsMessage />
                )}
              </div>
            </div>
            <PaginationComponent
              {...paginationProps}
              recordsPerPage={7}
              firstPage
              lastPage
              singleArrowUp
              singleArrowDown
              loading={unitListLoading}
            />
            <UnitSelectionLookup
              lookupIncludingCROSSDB
              companyName={companyName}
              show={showUnitSelectionLookup}
              onHide={() => setShowUnitSelectionLookup(false)}
              handleLookupSelection={handleUnitNumberLookupSelection}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverInvoiceUnitSelectionContent;
