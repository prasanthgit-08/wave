import { useEffect, useState } from "react";
import DPUInvoiceService from "../../../../services/Invoicing/DPUInvoiceService";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import { useDispatch, useSelector } from "react-redux";

import {
  setBolNumber,
  setDpuInvoiceData,
  setDpuInvoiceDataAutocomplete,
  setUnitNumber,
  setUnitNumberLast5,
  setChangeColor,
  setUnitPK,
  setDpuInvoicePayload,
  setSelectedId,
  setDpuInvoiceConfirmationData,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setIsCreditCardPrepaid,
  setCustomerFK,
  setUnitNumberConfirmation,
} from "../../../../redux/Invoicing/DPUInvoiceSlice";

import UnitSelectionLookup from "../../../LookupScreens/UnitSelection/UnitSelectionLookup";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { customFormatDate } from "../../../../utils/validation/DateFormatUtils";
import NoRecordsMessage from "../../../common/NoRecordsMessage";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import TruncatedStringWithTooltip from "../../../common/TruncatedStringWithTooltip";
import LoadingText from "../../../common/LoadingText";

const DPUInvoiceUnitSelectionContent = () => {
  const pageNumber = useSelector((state) => state.dpuInvoice.pageNumber);
  const totalPages = useSelector((state) => state.dpuInvoice.totalPages);
  const totalElements = useSelector((state) => state.dpuInvoice.totalElements);
  const pageSize = useSelector((state) => state.dpuInvoice.pageSize);
  const unitNumber = useSelector((state) => state.dpuInvoice.unitNumber);
  const unitNumberLast5 = useSelector((state) => state.dpuInvoice.unitNumberLast5);
  const bolNumber = useSelector((state) => state.dpuInvoice.bolNumber);
  const sortValue = useSelector((state) => state.dpuInvoice.sortValue);
  const sortType = useSelector((state) => state.dpuInvoice.sortType);
  const dispatch = useDispatch();
  const [showUnitSelectionLookup, setShowUnitSelectionLookup] = useState(false);
  const [tempLast5, setTempLast5] = useState("");

  const dpuInvoiceData = useSelector((state) => state.dpuInvoice.dpuInvoiceData);
  const dpuInvoiceDataAutocomplete = useSelector((state) => state.dpuInvoice.dpuInvoiceDataAutocomplete);
  const unitNumberConfirmation = useSelector((state) => state.dpuInvoice.unitNumberConfirmation);
  const [load, setload] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const changeColor = useSelector((state) => state.dpuInvoice.changeColor);
  const unitPK = useSelector((state) => state.dpuInvoice.unitPK);
  const selectedId = useSelector((state) => state.dpuInvoice.selectedId);
  const [showUnitLookup, setShowUnitLookup] = useState(false);

  const [tempBolNumber, setTempBolNumber] = useState("");
  const [tempUnitNumber, setTempUnitNumber] = useState("");

  useEffect(() => {
    setTempBolNumber(bolNumber);
  }, [bolNumber]);

  useEffect(() => {
    setTempUnitNumber(unitNumberConfirmation);
  }, [unitNumberConfirmation]);

  const [loading, setLoading] = useState(false);
  window.addEventListener("popstate", () => {
    dispatch(setBolNumber(""));
    dispatch(setUnitNumberLast5(""));
    dispatch(setDpuInvoiceData([]));
    dispatch(setUnitNumber(""));
    dispatch(setSelectedId(null));
  });

  const paginationProps = {
    pageNumber,
    setPageNumber: setPageNumber,
    totalPages,
    totalElements,
    listingData: dpuInvoiceData,
  };

  const navigate = useNavigate();

  const handleCallBack = () => {
    dispatch(setUnitPK(null));
    dispatch(setSelectedId(null));
  };

  const fetchData = () => {
    setload(true);
    DPUInvoiceService.getDpuInvoiceUnitSelection(
      unitNumberConfirmation,
      unitNumberLast5,
      bolNumber,
      pageNumber,
      pageSize,
      sortValue,
      sortType
    )
      .then((response) => {
        setload(false);
        const data = response?.data;

        const filteredList = data?.slice(0, data?.length - 1);
        const paginationData = data?.slice(data?.length - 1);
        dispatch(setDpuInvoiceData(filteredList || []));
        dispatch(setIsCreditCardPrepaid(data[0]?.CreditCardPrepaid));
        dispatch(setCustomerFK(data[0]?.CustomerFK));

        if (paginationData) {
          dispatch(setPageNumber(paginationData[0]?.PageNumber));
          dispatch(setTotalPages(paginationData[0]?.TotalPages));
          dispatch(setTotalElements(paginationData[0]?.TotalElements));
        }
      })
      .catch((error) => {
        setload(false);
        console.error("Error fetching data:", error);
      });
  };

  const fetchDataAutocomplete = (value, pageNumber, size) => {
    setLoading1(true);
    if (value && value?.length > 2) {
      const uppercaseValue = String(value).toUpperCase()?.trim();

      DPUInvoiceService.getDpuInvoiceUnitSelection(
        uppercaseValue,
        unitNumberLast5,
        bolNumber,
        pageNumber,
        size,
        sortValue,
        sortType
      )
        .then((response) => {
          const data = response?.data;
          const browse = data?.slice(0, data?.length - 1);
          dispatch(setDpuInvoiceDataAutocomplete(browse || []));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setLoading1(false);
        });
    } else {
      dispatch(setDpuInvoiceDataAutocomplete([]));
      setLoading1(false);
    }
  };

  useEffect(() => {
    dispatch(
      setDpuInvoicePayload({
        unitNumber,
      })
    );
  }, [unitNumber, pageNumber]);

  useEffect(() => {
    if ((unitNumberConfirmation && unitPK) || unitNumberLast5 || bolNumber) {
      fetchData();
    } else {
      dispatch(setBolNumber(""));
      dispatch(setUnitNumberLast5(""));
      dispatch(setDpuInvoiceData([]));
      dispatch(setUnitNumber(""));
      dispatch(setPageNumber(0));
      dispatch(setSelectedId(null));
    }
  }, [unitNumberLast5, bolNumber, unitPK]);

  useEffect(() => {
    setTempLast5(unitNumberLast5);
  }, [unitNumberLast5]);

  useEffect(() => {
    setTempBolNumber(bolNumber);
  }, [bolNumber]);

  useEffect(() => {
    if (!unitNumber || !unitPK) {
      dispatch(setDpuInvoiceData([]));
    }
  }, [unitNumber, unitPK]);

  const handleUnitNumberSelection = (e) => {
    setShowUnitSelectionLookup(false);
    dispatch(setUnitNumber(e.unitNumber)); // Change back to lowercase
    dispatch(setUnitNumberConfirmation(e.unitNumber)); // Use lowercase
    dispatch(setUnitPK(e.unitPK)); // Change back to lowercase
  };

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <Row>
          <Col xs={10} className="ps-3">
            {/* BOL Number Field */}

            <Form.Group className="mt-3 align-items-center row  m-l-10 m-r-0 ms-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="bolNumber" className="col-form-label dealer-label">
                  BOL Number
                </Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  className="customFormControl"
                  id="bolNumber"
                  name="bolNumber"
                  type="text"
                  autoComplete="off"
                  value={tempBolNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 30);
                    setTempBolNumber(value);
                  }}
                  onBlur={() => {
                    dispatch(setBolNumber(tempBolNumber));
                  }}
                  aria-autocomplete="list"
                  maxLength={9}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-center row  m-l-10 m-r-0 ms-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="unitNumberLast5" className="col-form-label dealer-label">
                  Last 5
                </Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0">
                <input
                  className="customFormControl"
                  id="unitNumberLast5"
                  name="unitNumberLast5"
                  type="text"
                  autoComplete="off"
                  value={tempLast5} // Use temporary state for input value
                  onChange={(e) => {
                    // Update temporary state only
                    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9_@.\-+]/g, "");
                    setTempLast5(value);
                  }}
                  onBlur={() => {
                    // Update Redux state and trigger API call only on blur
                    dispatch(setUnitNumberLast5(tempLast5));
                  }}
                  maxLength={5}
                />
              </Col>
            </Form.Group>

            {/* Unit Number Field (AutoComplete + Lookup) */}
            <Form.Group className="mt-3 align-items-center row  m-l-10 m-r-0 ms-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="unitNumber" className="col-form-label dealer-label">
                  Unit Number
                </Form.Label>
              </Col>
              <Col xs={5} className="p-0 d-flex">
                <AutoCompleteDropdown
                  arrayList={dpuInvoiceDataAutocomplete}
                  searchString={unitNumberConfirmation}
                  renderItemId={(item) => item.UnitNumber}
                  renderItemField={(item) => item.UnitNumber}
                  handleSearchString={(string) => dispatch(setUnitNumberConfirmation(string?.trim()))}
                  fetchDataBySearchString={(val) => fetchDataAutocomplete(val, 0, 50)}
                  maxLength={21}
                  onSelect={(item) => {
                    dispatch(setUnitNumber(item.UnitNumber));
                    dispatch(setUnitPK(item.UnitPK));
                    dispatch(setUnitNumberConfirmation(item.UnitNumber));
                  }}
                  className={unitNumberConfirmation && !unitPK ? "borderRed" : ""}
                  selectedId={unitNumber}
                  clearInputCallback={() => {
                    handleCallBack();
                  }}
                  disabled={false}
                  loading={loading1}
                />

                {/* <LookupButton /> */}

                <LookupButton onClick={() => setShowUnitSelectionLookup(true)} />

                <UnitSelectionLookup
                  MaintenanceProgram
                  show={showUnitSelectionLookup}
                  onHide={() => setShowUnitSelectionLookup(false)}
                  handleLookupSelection={handleUnitNumberSelection}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <div className={`row border border-dark border-1 mx-3 mt-3`} style={{ height: "270px" }}>
          <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
            <div className="d-flex h-100">
              <div className="w-100">
                <div className="fixTableHead">
                  <table className="table table-striped f-w-600">
                    <thead>
                      <tr>
                        <th className="f-w-600 col-2">Unit Number</th>
                        <th className="f-w-600 col-2">Order Date</th>
                        <th className="f-w-600 col-2">Pickup</th>
                        <th className="f-w-600 col-2">Delivery</th>
                      </tr>
                    </thead>

                    {loading
                      ? null
                      : dpuInvoiceData?.length >= 1 &&
                        dpuInvoiceData.map((unit, index) => (
                          <tbody>
                            <tr
                              id="rowId"
                              key={unit.UnitPK}
                              onClick={() => {
                                dispatch(setSelectedId(unit.UnitPK));
                                dispatch(setUnitNumber(unit.UnitNumber));
                                dispatch(setDpuInvoiceConfirmationData);
                                dispatch(setChangeColor(true));

                                dispatch(setUnitPK(unit.UnitPK));
                              }}
                              className={`${unit.UnitPK === selectedId && changeColor ? "tableSelected" : ""}`}
                            >
                              <td className="f-w-600">
                                {<TruncatedStringWithTooltip text={unit.UnitNumber} charLimit={20} />}
                              </td>
                              <td className="f-w-600">{customFormatDate(unit.OrderDate)}</td>
                              <td className="f-w-600">
                                {<TruncatedStringWithTooltip text={unit.Pickup} charLimit={20} />}
                              </td>
                              <td className="f-w-600">
                                {<TruncatedStringWithTooltip text={unit.Delivery} charLimit={20} />}
                              </td>
                            </tr>
                          </tbody>
                        ))}
                  </table>

                  {!load && dpuInvoiceData?.length === 0 && <NoRecordsMessage />}
                  {/* Pagination */}
                  {load && <LoadingText />}
                </div>
              </div>

              <PaginationComponent
                {...paginationProps}
                recordsPerPage={QuarterScreen_RecordsPerPage}
                firstPage
                lastPage
                singleArrowUp
                singleArrowDown
              />
            </div>
          </div>
        </div>
        {/* Unit Selection Table */}
        <UnitSelectionLookup
          show={showUnitSelectionLookup}
          onHide={() => setShowUnitSelectionLookup(false)}
          handleLookupSelection={handleUnitNumberSelection}
        />
      </div>
    </div>
  );
};

export default DPUInvoiceUnitSelectionContent;
