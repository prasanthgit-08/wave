import React, { useEffect, useState } from "react";
import { Col, Form, FormGroup, Row } from "react-bootstrap";
import DateInputField from "../../../../../../../common/DateInputField";
import LoadHistoryService from "../../../../../../../../services/LoadHistoryService";
import { useDispatch, useSelector } from "react-redux";
import {
  setCheckIns,
  setCheckinSortFlag,
  setCheckinSortValue,
  setChekinPageNumber,
  setDispatchData,
} from "../../../../../../../../redux/LoadHistorySlice";
import formatDatetimeToDate from "../../../../../../../../utils/formatDateTimeToDate";
import { useParams } from "react-router-dom";
import { customFormatDate } from "../../../../../../../../utils/validation/DateFormatUtils";
import usePagination from "../../../../../../../../hooks/usePagination";
import { PaginationComponent } from "../../../../../../../common/PaginationComponent";

const DispatchDetailContent = () => {
  const dispatch = useDispatch();
  const { dispatchId } = useParams();

  const dispatchData = useSelector((state) => state.loadHistory.dispatchData);
  const checkIns = useSelector((state) => state.loadHistory.checkIns);
  const sortFlag = useSelector((state) => state.loadHistory.checkinSortFlag);
  const sortValue = useSelector((state) => state.loadHistory.checkinSortValue);

  const checkinPageNumber = useSelector((state) => state.loadHistory.checkinPageNumber);

  const postArrayListPagination = usePagination(checkIns, checkinPageNumber, 6);
  const { paginatedArray, totalElements, totalPages } = postArrayListPagination;

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const fetchViewData = () => {
    setLoading1(true);
    LoadHistoryService.getDispatchData(dispatchId)
      .then(({ data }) => {
        dispatch(setDispatchData(data));
        dispatch(setCheckIns(data.checkinList ? data.checkinList : []));
        setLoading1(false);
      })
      .catch(() => {
        setLoading1(false);
      });
  };

  const fetchChekins = () => {
    setLoading2(true);
    LoadHistoryService.getCheckinSortedList(dispatchId, sortFlag, sortValue)
      .then(({ data }) => {
        dispatch(setCheckIns(data ? data : []));
        setLoading2(false);
      })
      .catch(() => {
        setLoading2(false);
      });
  };

  const handleNormalSort = (val) => {
    dispatch(setCheckinSortValue(val));
    dispatch(setCheckinSortFlag(!sortFlag));
  };

  useEffect(() => {
    fetchViewData();
  }, []);

  useEffect(() => {
    if (sortValue) {
      fetchChekins();
    }
  }, [sortFlag, sortValue]);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border threeFourthScreenFormContentHeight">
        <div className="p-15 w-100">
          <Row className="m-0 p-0">
            <Col sm={4} md={4} lg={4} xl={4} xs={4}>
              {/* Customer Field*/}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Customer"}</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="customer"
                    type="text"
                    disabled={true}
                    value={dispatchData?.customer}
                  />
                </Col>
              </Form.Group>
              {/* Plant Field*/}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Plant"}</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="Plant"
                    type="text"
                    disabled={true}
                    value={dispatchData?.plant}
                  />
                </Col>
              </Form.Group>

              {/* Hidden Field*/}
              <Form.Group className="mt-2 align-items-center visibility-hidden row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Customer"}</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input className="customFormControl" name="customer" type="text" />
                </Col>
              </Form.Group>

              {/* Unit Number Field*/}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Unit number"}</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="Unit number"
                    type="text"
                    disabled={true}
                    value={dispatchData?.unitNumber}
                  />
                </Col>
              </Form.Group>

              {/* Model Field*/}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Model"}</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="Model"
                    type="text"
                    disabled={true}
                    value={dispatchData?.model}
                  />
                </Col>
              </Form.Group>
              {/* Unit Type Field*/}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Unit Type"}</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="Unit Type"
                    type="text"
                    disabled={true}
                    value={dispatchData?.unitType}
                  />
                </Col>
              </Form.Group>
              {/* Special Field*/}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Special"}</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="Special"
                    type="text"
                    disabled={true}
                    value={dispatchData?.special}
                  />
                </Col>
              </Form.Group>
              {/* Hidden Field*/}
              <Form.Group className="mt-2 align-items-center visibility-hidden row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Customer"}</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input className="customFormControl" name="customer" type="text" />
                </Col>
              </Form.Group>

              {/* Pickup Gate Code Field*/}
              <Form.Group
                className={`mt-2 align-items-center row  m-l-0 m-r-0 ${
                  dispatchData?.pickupYard && dispatchData?.pickupHasOpener && dispatchData?.active
                    ? ""
                    : "visibility-hidden"
                }`}
              >
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Pickup Gate Code"}</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="Pickup Gate Code"
                    type="text"
                    disabled={true}
                    value={dispatchData?.pickupGateCode}
                  />
                </Col>
              </Form.Group>
              {/* Delivery Gate Code Field*/}
              <Form.Group
                className={`mt-2 align-items-center row  m-l-0 m-r-0 ${
                  dispatchData?.deliveryYard && dispatchData?.deliveryHasOpener && dispatchData?.active
                    ? ""
                    : "visibility-hidden"
                }`}
              >
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Delivery Gate Code"}</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="Delivery Gate Code"
                    type="text"
                    disabled={true}
                    value={dispatchData?.deliveryGateCode}
                  />
                </Col>
              </Form.Group>
              {/* Hidden Field*/}
              <Form.Group className="mt-2 align-items-center visibility-hidden row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Customer"}</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input className="customFormControl" name="customer" type="text" />
                </Col>
              </Form.Group>
            </Col>

            {/* Col 2 */}
            <Col sm={5} md={5} lg={5} xl={5} xs={5}>
              {/* Pickup Field*/}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Pickup"}</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="pickup"
                    type="text"
                    disabled={true}
                    value={dispatchData?.pickupName}
                  />
                </Col>
              </Form.Group>
              {/* pickupadress1 Field*/}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{""}</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="pickupadress1"
                    type="text"
                    disabled={true}
                    value={dispatchData?.pickupAddress1}
                  />
                </Col>
              </Form.Group>
              {/* pickupadress2 Field*/}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{""}</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="pickupadress2"
                    type="text"
                    disabled={true}
                    value={dispatchData?.pickupAddress2}
                  />
                </Col>
              </Form.Group>

              {/* Pickup Postal Code */}
              <FormGroup className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{""}</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="ps-0 ">
                  <input
                    className="customFormControl"
                    name="pickupZipcode"
                    type="text"
                    disabled={true}
                    value={dispatchData?.pickupZipcode}
                  />
                </Col>
                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    className="customFormControl"
                    name="pickupCity"
                    type="text"
                    disabled={true}
                    value={dispatchData?.pickupCity}
                  />
                </Col>
                <Col xs={2} md={2} sm={2} className="" style={{ width: "75px" }}>
                  <input
                    className="customFormControl"
                    name="pickupState"
                    type="text"
                    disabled={true}
                    value={dispatchData?.pickupState}
                  />
                </Col>
              </FormGroup>

              {/* Hidden Field*/}
              <Form.Group className="mt-2 align-items-center visibility-hidden row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Customer"}</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input className="customFormControl" name="customer" type="text" />
                </Col>
              </Form.Group>

              {/* Delivery Field*/}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Delivery"}</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="delivery"
                    type="text"
                    disabled={true}
                    value={dispatchData?.deliveryName}
                  />
                </Col>
              </Form.Group>
              {/* delivery Address Field*/}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{""}</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="ad1"
                    type="text"
                    disabled={true}
                    value={dispatchData?.deliveryAddress1}
                    autoComplete="one-time-code"
                    spellCheck={false}
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              {/* Delivery Address 2 */}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{""}</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="ad2"
                    type="text"
                    disabled={true}
                    value={dispatchData?.deliveryAddress1}
                    autoComplete="one-time-code"
                    spellCheck={false}
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              {/* Pickup Postal Code */}
              <FormGroup className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{""}</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="ps-0 ">
                  <input
                    className="customFormControl"
                    name="deliveryZipcode"
                    type="text"
                    disabled={true}
                    value={dispatchData?.deliveryZipcode}
                  />
                </Col>
                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    className="customFormControl"
                    name="deliveryCity"
                    type="text"
                    disabled={true}
                    value={dispatchData?.deliveryCity}
                  />
                </Col>
                <Col xs={2} md={2} sm={2} className="" style={{ width: "75px" }}>
                  <input
                    className="customFormControl"
                    name="deliveryState"
                    type="text"
                    disabled={true}
                    value={dispatchData?.deliveryState}
                  />
                </Col>
              </FormGroup>
            </Col>

            {/* Col 3 */}
            <Col sm={3} md={3} lg={3} xl={3} xs={3}>
              {/* Miles Field*/}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Miles"}</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    className="customFormControl"
                    name="Miles"
                    type="text"
                    disabled={true}
                    value={dispatchData?.miles}
                  />
                </Col>
              </Form.Group>
              {/* Net Pay Field*/}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Net Pay"}</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    className="customFormControl"
                    name="Net Pay"
                    type="text"
                    disabled={true}
                    value={dispatchData?.netPay}
                  />
                </Col>
              </Form.Group>
              {/* Pay Balance Field*/}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Pay Balance"}</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    className="customFormControl"
                    name="Pay Balance"
                    type="text"
                    disabled={true}
                    value={dispatchData?.payBalance}
                  />
                </Col>
              </Form.Group>
              {/* Driver Qual Field*/}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Driver Qual"}</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    className="customFormControl"
                    name="Driver Qual"
                    type="text"
                    disabled={true}
                    value={dispatchData?.driverQual}
                  />
                </Col>
              </Form.Group>
              {/* Pullout Fees Field*/}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Pullout Fees"}</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    className="customFormControl"
                    name="Pullout Fees"
                    type="text"
                    disabled={true}
                    value={dispatchData?.pullOutFees}
                  />
                </Col>
              </Form.Group>
              {/* Garnishments Field*/}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Garnishments"}</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    className="customFormControl"
                    name="Garnishments"
                    type="text"
                    disabled={true}
                    value={dispatchData?.garnishments}
                  />
                </Col>
              </Form.Group>
              {/* Hidden Field*/}
              <Form.Group className="mt-2 align-items-center visibility-hidden row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Customer"}</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="customer"
                    type="text"
                    disabled={true}
                    value={dispatchData?.deliveryAddress1}
                  />
                </Col>
              </Form.Group>

              {/* Dispatch Field*/}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Dispatch"}</Form.Label>
                </Col>
                <Col xs={4} md={4} sm={4} className="p-0">
                  <DateInputField
                    disabled={true}
                    date={formatDatetimeToDate(dispatchData?.dispatchDate, "MM/DD/YY")}
                  />
                </Col>
              </Form.Group>
              {/* Pickup Field*/}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Pickup"}</Form.Label>
                </Col>
                <Col xs={4} md={4} sm={4} className="p-0">
                  <DateInputField
                    disabled={true}
                    date={formatDatetimeToDate(dispatchData?.pickupDate, "MM/DD/YY")}
                  />
                </Col>
              </Form.Group>
              {/* Delivery Field */}
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">{"Delivery"}</Form.Label>
                </Col>
                <Col xs={4} md={4} sm={4} className="p-0">
                  <DateInputField
                    disabled={true}
                    date={dispatchData ? formatDatetimeToDate(dispatchData?.deliveredDate, "MM/DD/YY") : ""}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="p-10">
              <div className={`d-flex  `}>
                <div className="w-100 border border-dark border-2 border-right-0 sixFieldHeight">
                  <div className="fixTableHead">
                    <div>
                      <div className={""}>
                        <table className="table table-striped f-w-600">
                          <thead>
                            <tr disabled>
                              <th
                                className="f-w-600"
                                onClick={() => {
                                  handleNormalSort("dateAndTime");
                                }}
                              >
                                Date & Time{" "}
                                {sortFlag && sortValue === "dateAndTime" && (
                                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                                )}
                                {!sortFlag && sortValue === "dateAndTime" && (
                                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                                )}
                              </th>
                              <th
                                className="f-w-600"
                                onClick={() => {
                                  handleNormalSort("epu");
                                }}
                              >
                                EPU
                                {sortFlag && sortValue === "epu" && (
                                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                                )}
                                {!sortFlag && sortValue === "epu" && (
                                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                                )}
                              </th>
                              <th
                                className="f-w-600"
                                onClick={() => {
                                  handleNormalSort("eta");
                                }}
                              >
                                {" "}
                                ETA
                                {sortFlag && sortValue === "eta" && (
                                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                                )}
                                {!sortFlag && sortValue === "eta" && (
                                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                                )}{" "}
                              </th>
                              <th
                                className="f-w-600"
                                onClick={() => {
                                  handleNormalSort("cityState");
                                }}
                              >
                                {" "}
                                City, State
                                {sortFlag && sortValue === "cityState" && (
                                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                                )}
                                {!sortFlag && sortValue === "cityState" && (
                                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                                )}
                              </th>
                              <th
                                className="f-w-600"
                                onClick={() => {
                                  handleNormalSort("user");
                                }}
                              >
                                Entered By user
                                {sortFlag && sortValue === "user" && (
                                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                                )}
                                {!sortFlag && sortValue === "user" && (
                                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                                )}{" "}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedArray?.map((checkin) => (
                              <tr>
                                <td className="f-w-600">
                                  {" "}
                                  {customFormatDate(checkin.dateAndTime, " MM/DD/YY  hh:mm")}{" "}
                                </td>
                                <td className="f-w-600"> {customFormatDate(checkin.epu, "MM/DD/YY")} </td>
                                <td className="f-w-600"> {customFormatDate(checkin.eta, "MM/DD/YY")} </td>
                                <td className="f-w-600"> {checkin.cityState} </td>
                                <td className="f-w-600"> {checkin.enteredBy} </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {(loading1 || loading2) && (
                  <div className="fade modal-backdrop show">
                    <div className="pos-center">
                      <div className="loader"></div>
                    </div>
                  </div>
                )}
                <PaginationComponent
                  singleArrowUp
                  singleArrowDown
                  lastPage
                  firstPage
                  pageNumber={checkinPageNumber}
                  setPageNumber={setChekinPageNumber}
                  totalElements={totalElements}
                  totalPages={totalPages}
                  listingData={paginatedArray}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default DispatchDetailContent;
