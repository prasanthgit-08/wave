import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { EditMasterUnitSelection_RecordsPerPage } from "../../../../../services/constants/applicationConstants";

import { useDispatch, useSelector } from "react-redux";
import DateInputField from "../../../../common/DateInputField";
import UnitStatusService from "../../../../../services/Units/UnitStatusService";
import {
  setReroutePageNumber,
  setRerouteSortFlag,
  setRerouteSortValue,
  setRerouteTotalElements,
  setRerouteTotalPages,
} from "../../../../../redux/UnitStatus/UnitStatusSlice";
import TruncatedStringWithTooltip from "../../../../common/TruncatedStringWithTooltip";
import { useParams } from "react-router-dom";
import LoadingText from "../../../../common/LoadingText";
import NoRecordsMessage from "../../../../common/NoRecordsMessage";

function ReRoutes({ data }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedRow, setSelectedRow] = useState(null);
  const [changeColor, setChangeColor] = useState(false);

  const reroutePageNumber = useSelector((state) => state.unitStatusReducer.reroutePageNumber);
  const rerouteSortFlag = useSelector((state) => state.unitStatusReducer.rerouteSortFlag);

  const rerouteSortValue = useSelector((state) => state.unitStatusReducer.rerouteSortValue);

  const [unitReroutesData, setUnitReroutesData] = useState(data?.data || []);

  const rerouteTotalElements = useSelector((state) => state.unitStatusReducer.rerouteTotalElements);
  const rerouteTotalPages = useSelector((state) => state.unitStatusReducer.rerouteTotalPages);
  const selectedId = useSelector((state) => state.unitStatusReducer.selectedId);
  const activeTab = useSelector((state) => state.unitStatusReducer.activeTab);
  const [loading, setLoading] = useState(true);

  const [selectedRerouteRecord, setSelectedRerouteRecord] = useState({
    UnitReroutePK: "",
    OriginalLocationTable: "",
    NewLocationTable: "",
    RerouteLocation: "",
    OriginalLocationLeft: "",
    Address1: "",
    Address2: "",
    City: "",
    State: "",
    Zip: "",
    Pickup: "",
    Delivery: "",
    AuthorizedBy: "",
    DealerReroute: "",
    DealerCustomer: "",
    DealerResponcible: "",
    Notes: "",
    RerouteDate: "",
    ReroutedAt: "",
    CommonAddress1: "",
    CommonAddress2: "",
    CommonCity: "",
    CommonStateCode: "",
    CommonPostalCode: "",
    OriginalMilesInvoice: "",
    RerouteMilesInvoice: "",
    OriginalFlatRateInvoice: "",
    RerouteFlatRateInvoice: "",
    OriginalMilesDriver: "",
    RerouteMilesDriver: "",
    OriginalFlatRateDriver: "",
    RerouteFlatRateDriver: "",
  });
  const getAllRerouteList = () => {
    UnitStatusService.getUnitStatusDataForHolds(
      selectedId,
      "UnitReroutes",
      reroutePageNumber,
      7,
      rerouteSortValue,
      rerouteSortFlag
    )
      .then((response) => {
        const { data } = response;

        const listingData = data.filter((item) => item.Type !== "Pagination");
        const paginationData = data.find((item) => item.Type === "Pagination");
        setUnitReroutesData(listingData);

        // Dispatch pagination metadata
        if (paginationData) {
          dispatch(setReroutePageNumber(paginationData.PageNumber));
          dispatch(setRerouteTotalElements(paginationData.TotalElements));
          dispatch(setRerouteTotalPages(paginationData.TotalPages));
        }
      })
      .catch((error) => {
        // dispatch(setUnitsLoading(false));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setRerouteSortFlag(val));

    dispatch(setRerouteSortValue(value));
  };
  useEffect(() => {
    // if(activeTab==="UnitReroutes" ){
    if (id && activeTab === "UnitReroutes") {
      getAllRerouteList();
    }
  }, [reroutePageNumber, rerouteSortValue, rerouteSortFlag, activeTab]);

  const handleRowClick = (item) => {
    setSelectedRow(item.UnitReroutePK);

    setChangeColor(true);

    setSelectedRerouteRecord({
      UnitReroutePK: item.UnitReroutePK,
      OriginalLocationTable: item.OriginalLocationTable,
      NewLocationTable: item.NewLocationTable,
      RerouteLocation: item.RerouteLocation,
      OriginalLocationLeft: item.OriginalLocationLeft,
      Address1: item.Address1,
      Address2: item.Address2,
      City: item.City,
      State: item.State,
      Zip: item.Zip,
      Pickup: item.Pickup,
      Delivery: item.Delivery,
      AuthorizedBy: item.AuthorizedBy,
      DealerReroute: item.DealerReroute,
      DealerCustomer: item.DealerCustomer,
      DealerResponcible: item.DealerResponcible,
      Notes: item.Notes,
      RerouteDate: item.RerouteDate,
      ReroutedAt: item.ReroutedAt,
      CommonAddress1: item.CommonAddress1,
      CommonAddress2: item.CommonAddress2,
      CommonCity: item.CommonCity,
      CommonStateCode: item.CommonStateCode,
      CommonPostalCode: item.CommonPostalCode,
      OriginalMilesInvoice: item.OriginalMilesInvoice,
      RerouteMilesInvoice: item.RerouteMilesInvoice,
      OriginalFlatRateInvoice: item.OriginalFlatRateInvoice,
      RerouteFlatRateInvoice: item.RerouteFlatRateInvoice,
      OriginalMilesDriver: item.OriginalMilesDriver,
      RerouteMilesDriver: item.RerouteMilesDriver,
      OriginalFlatRateDriver: item.OriginalFlatRateDriver,
      RerouteFlatRateDriver: item.RerouteFlatRateDriver,
    });
  };
  const paginationProps = {
    pageNumber: reroutePageNumber,
    setPageNumber: setReroutePageNumber,
    totalPages: rerouteTotalPages,
    totalElements: rerouteTotalElements,
    listingData: unitReroutesData,
  };
  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={6}>
          <div className="d-flex h-300px mt-2">
            <div className="w-100 border border-2 border-dark">
              <div className="fixTableHead unitSelection">
                <table className="table table-striped f-w-600">
                  <thead>
                    <tr disabled>
                      <th
                        className="f-w-600"
                        onClick={() => {
                          onhandleNormalSort("OriginalLocationTable", !rerouteSortFlag);
                        }}
                      >
                        Original Location{" "}
                        {rerouteSortFlag && rerouteSortValue === "OriginalLocationTable" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!rerouteSortFlag && rerouteSortValue === "OriginalLocationTable" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>

                      <th
                        className="f-w-600"
                        onClick={() => {
                          onhandleNormalSort("NewLocationTable", !rerouteSortFlag);
                        }}
                      >
                        New Location{" "}
                        {rerouteSortFlag && rerouteSortValue === "NewLocationTable" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!rerouteSortFlag && rerouteSortValue === "NewLocationTable" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                      <th
                        className="f-w-600"
                        onClick={() => {
                          onhandleNormalSort("Pickup", !rerouteSortFlag);
                        }}
                      >
                        Pickup{" "}
                        {rerouteSortFlag && rerouteSortValue === "Pickup" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!rerouteSortFlag && rerouteSortValue === "Pickup" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                      <th
                        className="f-w-600"
                        onClick={() => {
                          onhandleNormalSort("Delivery", !rerouteSortFlag);
                        }}
                      >
                        Delivery
                        {rerouteSortFlag && rerouteSortValue === "Delivery" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!rerouteSortFlag && rerouteSortValue === "Delivery" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {!loading &&
                      unitReroutesData?.length > 0 &&
                      unitReroutesData.map((item, index) => (
                        <tr
                          key={index}
                          onClick={() => handleRowClick(item)}
                          className={`${item.UnitReroutePK === selectedRow && changeColor ? "tableSelected" : ""}`}
                        >
                          <td>
                            <TruncatedStringWithTooltip text={item.OriginalLocationTable} charLimit={25} />
                          </td>
                          <td>
                            <TruncatedStringWithTooltip text={item.NewLocationTable} charLimit={25} />
                          </td>
                          <td>
                            <TruncatedStringWithTooltip text={item.Pickup} charLimit={25} />
                          </td>
                          <td>
                            <TruncatedStringWithTooltip text={item.Delivery} charLimit={25} />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {loading && <LoadingText smallerFont />}
                {!loading && unitReroutesData?.length === 0 && <NoRecordsMessage />}
              </div>
            </div>
            <PaginationComponent
              {...paginationProps}
              recordsPerPage={EditMasterUnitSelection_RecordsPerPage}
              firstPage
              lastPage
              singleArrowUp
              singleArrowDown
            />
          </div>
          <div>
            <Form.Group
              className={`mt-3 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
            >
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
              </Col>

              <Col xs={3} className="p-0 h">
                <Form.Label className={` customColFormLabel col-5`} id="miscellaneousPickup">
                  Invoice
                </Form.Label>
                <Form.Label className={` customColFormLabel ms-3 col-5`} id="miscellaneousPickup">
                  Driver
                </Form.Label>
              </Col>
            </Form.Group>
            <Form.Group
              className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
            >
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                  Original Miles
                </Form.Label>
              </Col>

              <Col xs={3} className="p-0 d-flex">
                <div className="col-5">
                  <input
                    className={`customFormControl 
            `}
                    value={selectedRerouteRecord.OriginalMilesInvoice}
                    name=""
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    maxLength={30}
                    disabled
                  />
                </div>
                <div className="col-5 ms-3">
                  <input
                    className={`customFormControl 
            `}
                    value={selectedRerouteRecord.OriginalMilesDriver}

                    name=""
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    maxLength={30}
                    disabled
                  />
                </div>
              </Col>
            </Form.Group>
            <Form.Group
              className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
            >
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                  Reroute Miles
                </Form.Label>
              </Col>

              <Col xs={3} className="p-0 d-flex">
                <div className="col-5">
                  <input
                    className={`customFormControl 
            `}
                    value={selectedRerouteRecord.RerouteMilesInvoice}

                    name=""
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    maxLength={30}
                    disabled
                  />
                </div>
                <div className="col-5 ms-3">
                  <input
                    className={`customFormControl 
            `}
                    value={selectedRerouteRecord.RerouteMilesDriver}

                    name=""
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    maxLength={30}
                    disabled
                  />
                </div>
              </Col>
            </Form.Group>
            <Form.Group
              className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
            >
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                  Reroute Flatrate
                </Form.Label>
              </Col>

              <Col xs={3} className="p-0 d-flex">
                <div className="col-5">
                  <input
                    className={`customFormControl 
            `}
                    value={selectedRerouteRecord.RerouteFlatRateInvoice}

                    name=""
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    maxLength={30}
                    disabled
                  />
                </div>
                <div className="col-5 ms-3">
                  <input
                    className={`customFormControl 
            `}
                    value={selectedRerouteRecord.RerouteFlatRateDriver}

                    name=""
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    maxLength={30}
                    disabled
                  />
                </div>
              </Col>
            </Form.Group>
            <Form.Group
              className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
            >
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                  Original Flatrate
                </Form.Label>
              </Col>

              <Col xs={3} className="p-0 d-flex">
                <div className="col-5">
                  <input
                    className={`customFormControl 
            `}
                    value={selectedRerouteRecord.OriginalFlatRateInvoice}

                    name=""
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    maxLength={30}
                    disabled
                  />
                </div>
                <div className="col-5 ms-3">
                  <input
                    className={`customFormControl 
            `}
                    value={selectedRerouteRecord.OriginalFlatRateDriver}

                    name=""
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    maxLength={30}
                    disabled
                  />
                </div>
              </Col>
            </Form.Group>

            <Form.Group
              className={`mt-2 form-group  align-items-start  row  m-l-0 m-r-0 ms-0
          `}
            >
              <Col xs={3} className="p-0">
                <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                  Notes
                </Form.Label>
              </Col>

              <Col xs={8} className="p-0 mt-1">
                <textarea className="w-100" value={selectedRerouteRecord.Notes || ""} rows={6} disabled />
              </Col>
            </Form.Group>
          </div>
        </Col>
        <Col xs={6} className="ps-5">
          <Form.Group className="mt-1 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Reroute Date</Form.Label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={selectedRerouteRecord?.RerouteDate}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Authorized By
              </Form.Label>
            </Col>

            <Col xs={4} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                value={selectedRerouteRecord.AuthorizedBy}

                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Original Location</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
            `}
                value={selectedRerouteRecord.OriginalLocationLeft}

                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Address</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
            `}
                value={selectedRerouteRecord.Address1}

                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
            `}
                value={selectedRerouteRecord.Address2}

                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>City,State,Zip</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
            `}
                value={selectedRerouteRecord.City}

                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                disabled
              />
            </Col>
            <div className="px-1 w-35px">
              <input
                className="w-100 customFormControl"
                value={selectedRerouteRecord.State}
                type="text"
                disabled
              />
            </div>
            <Col xs="1" className="px-0">
              <input
                className="w-100 customFormControl"
                type="text"
                value={selectedRerouteRecord.Zip}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Rerouted At</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
            `}
                value={selectedRerouteRecord.ReroutedAt}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Address</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
            `}
                value={selectedRerouteRecord.CommonAddress1}

                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
            `}
                value={selectedRerouteRecord.CommonAddress2}

                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>City,State,Zip</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
            `}
                value={selectedRerouteRecord.CommonCity}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                disabled
              />
            </Col>
            <div className="px-1 w-35px">
              <input
                className="w-100 customFormControl"
                type="text"
                value={selectedRerouteRecord.CommonStateCode}
                disabled
              />
            </div>
            <Col xs="1" className="px-0">
              <input
                className="w-100 customFormControl"
                type="text"
                value={selectedRerouteRecord.CommonPostalCode}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Reroute Location</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
            `}
                value={selectedRerouteRecord.RerouteLocation}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Address</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
            `}
                value={selectedRerouteRecord.Address1}

                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
            `}
                value={selectedRerouteRecord.Address2}

                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>City,State,Zip</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
            `}
                value={selectedRerouteRecord.City}

                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                disabled
              />
            </Col>
            <div className="px-1 w-35px">
              <input
                className="w-100 customFormControl"
                type="text"
                value={selectedRerouteRecord.State}
                disabled
              />
            </div>
            <Col xs="1" className="px-0">
              <input
                className="w-100 customFormControl"
                type="text"
                value={selectedRerouteRecord.Zip}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-3 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Dealer Reroutes
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h-25px d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input  p-0"
                checked={selectedRerouteRecord.DealerReroute}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Dealer Customer</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
            `}
                value={selectedRerouteRecord.DealerCustomer}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="my-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Dealer Responsible Amount</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0" style={{ width: "90px" }}>
              <input
                className={`customFormControl 
            `}
                value={selectedRerouteRecord.DealerResponcible}

                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default ReRoutes;
