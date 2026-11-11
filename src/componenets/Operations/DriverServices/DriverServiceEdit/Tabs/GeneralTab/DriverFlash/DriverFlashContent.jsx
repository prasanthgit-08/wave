import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { PaginationComponent } from "../../../../../../common/PaginationComponent";
import DriverFlashListing from "../DriverFlash/DriverFlashListing";
import {
  setFormData,
  setPageNumber,
  setStatewiseList,
  setViewDetail,
} from "../../../../../../../redux/DriverFlashSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DriverFlashService from "../../../../../../../services/DriverFlashService";
import usePagination from "../../../../../../../hooks/usePagination";
import LoadingIcon from "../../../../../../common/LoadingIcon";

const DriverFlashContent = () => {
  const dispatch = useDispatch();
  const { driverId } = useParams();
  const [totalStatesDeliveredTo, setTotalStatesDeliveredTo] = useState("");
  const [totalProvencesDeliveredTo, SetTotalProvencesDeliveredTo] = useState("");
  const [totalDeliveries, setTotalDeliveries] = useState("");
  const [totalUsDeliveredTo, setTotalUsDeliveries] = useState("");
  const [totalCanadianDeliveredTo, setTotalCanadianDeliveries] = useState("");
  const [percentageDeliveredTo, setPercentageDeliveredTo] = useState("");
  const [percentageDeliveredToSecond, setPercentageDeliveredToSecond] = useState("");
  const [lastElevenMonth, setLast11Months] = useState("");
  const [lastElevenMonthSecond, setLast11MonthsSecond] = useState("");
  const [lastElvenMonthThird, setLast11MonthsThird] = useState("");
  const [lastTwelveMonth, setLast12Months] = useState("");
  const [lastTwelveMonthSecond, setLast12MonthsSecond] = useState("");
  const [lastTwelveMonthThird, setLast12MonthsThird] = useState("");
  const [loading, setLoading] = useState(false);
  const formData = useSelector((state) => state.driverFlashSlice.formData);
  const statewiseList = useSelector((state) => state.driverFlashSlice.statewiseList);
  const pageNumber = useSelector((state) => state.driverFlashSlice.pageNumber);
  const viewDetail = useSelector((state) => state.driverFlashSlice.viewDetail);
  useEffect(() => {
    if (formData) {
      setTotalStatesDeliveredTo(formData[0]?.totalStatesDeliveredTo || "0");
      SetTotalProvencesDeliveredTo(formData[0]?.totalProvencesDeliveredTo || "0");
      setTotalDeliveries(formData[0]?.totalDeliveries || "0");
      setTotalUsDeliveries(formData[0]?.totalUsDeliveredTo || "0");
      setTotalCanadianDeliveries(formData[0]?.totalCanadianDeliveredTo || "0");
      setPercentageDeliveredTo(formData[0]?.percentageDeliveredTo || "0");
      setPercentageDeliveredToSecond(formData[0]?.percentageDeliveredToSecond || "0");
      setLast11Months(formData[0]?.lastElevenMonth || "0");
      setLast11MonthsSecond(formData[0]?.lastElevenMonthSecond || "0");
      setLast11MonthsThird(formData[0]?.lastElvenMonthThird || "0");
      setLast12Months(formData[0]?.lastTwelveMonth || "0");
      setLast12MonthsSecond(formData[0]?.lastTwelveMonthSecond || "0");
      setLast12MonthsThird(formData[0]?.lastTwelveMonthThird || "0");
      const trimmedList = (formData || []).slice(1);
      dispatch(setStatewiseList(trimmedList));
    }
  }, [formData]);

  useEffect(() => {
    setLoading(true);
    DriverFlashService.getDriverFlash(driverId)
      .then((res) => {
        dispatch(setFormData(res.data));
        dispatch(setViewDetail(true));
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  }, []);

  const driverFlashPagination = usePagination(statewiseList, pageNumber, 5);
  const { paginatedArray, totalElements, totalPages } = driverFlashPagination;
  const paginationProps = {
    setPageNumber,
    totalElements,
    totalPages,
    pageNumber,
    listingData: paginatedArray,
  };

  return (
    <div className="w-100 p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Row className="m-0 p-0">
              <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                <Row>
                  <Col sm={3} md={3} lg={3} xl={3} xs={3} style={{ width: "270px" }}>
                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b- align-items-center row m-l-0 m-r-0">
                      <Col sm={8} md={8} xs={8} className="p-0">
                        <Form.Label className="customColFormLabel">Total States Delivered To</Form.Label>
                      </Col>
                      <Col xs={4} md={4} sm={4} className="">
                        <input
                          className="customFormControl"
                          type="text"
                          value={totalStatesDeliveredTo}
                          onInput={(e) => {
                            setTotalStatesDeliveredTo(e.target.value);
                          }}
                          disabled={viewDetail}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b- align-items-center row m-l-0 m-r-0">
                      <Col sm={8} md={8} xs={8} className="p-0">
                        <Form.Label className="customColFormLabel">Total Provences Delivered To</Form.Label>
                      </Col>
                      <Col xs={4} md={4} sm={4} className="">
                        <input
                          className="customFormControl"
                          type="text"
                          value={totalProvencesDeliveredTo}
                          onInput={(e) => {
                            SetTotalProvencesDeliveredTo(e.target.value);
                          }}
                          disabled={viewDetail}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b- align-items-center row m-l-0 m-r-0">
                      <Col sm={8} md={8} xs={8} className="p-0">
                        <Form.Label className="customColFormLabel">Total Deliveries</Form.Label>
                      </Col>
                      <Col xs={4} md={4} sm={4} className="">
                        <input
                          className="customFormControl"
                          type="text"
                          value={totalDeliveries}
                          onInput={(e) => {
                            setTotalDeliveries(e.target.value);
                          }}
                          disabled={viewDetail}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b- align-items-center row m-l-0 m-r-0">
                      <Col sm={8} md={8} xs={8} className="p-0">
                        <Form.Label className="customColFormLabel">Total US Deliveries</Form.Label>
                      </Col>
                      <Col xs={4} md={4} sm={4} className="">
                        <input
                          className="customFormControl"
                          type="text"
                          value={totalUsDeliveredTo}
                          onInput={(e) => {
                            setTotalUsDeliveries(e.target.value);
                          }}
                          disabled={viewDetail}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b- align-items-center row m-l-0 m-r-0">
                      <Col sm={8} md={8} xs={8} className="p-0">
                        <Form.Label className="customColFormLabel">Total Canadian Deliveries</Form.Label>
                      </Col>
                      <Col xs={4} md={4} sm={4} className="">
                        <input
                          className="customFormControl"
                          type="text"
                          value={totalCanadianDeliveredTo}
                          onInput={(e) => {
                            setTotalCanadianDeliveries(e.target.value);
                          }}
                          disabled={viewDetail}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col sm={3} md={3} lg={3} xl={3} xs={3} style={{ width: "270px" }}>
                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b- align-items-center row m-l-0 m-r-0">
                      <Col sm={7} md={7} xs={7} className="p-0">
                        <Form.Label className="customColFormLabel">% Delivered To</Form.Label>
                      </Col>
                      <Col xs={4} md={4} sm={4} className="">
                        <input
                          className="customFormControl"
                          type="text"
                          value={percentageDeliveredTo}
                          onInput={(e) => {
                            setPercentageDeliveredTo(e.target.value);
                          }}
                          disabled={viewDetail}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b- align-items-center row m-l-0 m-r-0">
                      <Col sm={7} md={7} xs={7} className="p-0">
                        <Form.Label className="customColFormLabel">% Delivered To</Form.Label>
                      </Col>
                      <Col xs={4} md={4} sm={4} className="">
                        <input
                          className="customFormControl"
                          type="text"
                          value={percentageDeliveredToSecond}
                          onInput={(e) => {
                            setPercentageDeliveredToSecond(e.target.value);
                          }}
                          disabled={viewDetail}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b- align-items-center row m-l-0 m-r-0">
                      <Col sm={7} md={7} xs={7} className="p-0">
                        <Form.Label className="customColFormLabel">Last 11 Months</Form.Label>
                      </Col>
                      <Col xs={4} md={4} sm={4} className="">
                        <input
                          className="customFormControl"
                          type="text"
                          value={lastElevenMonth}
                          onInput={(e) => {
                            setLast11Months(e.target.value);
                          }}
                          disabled={viewDetail}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b- align-items-center row m-l-0 m-r-0">
                      <Col sm={7} md={7} xs={7} className="p-0">
                        <Form.Label className="customColFormLabel">Last 11 Months</Form.Label>
                      </Col>
                      <Col xs={4} md={4} sm={4} className="">
                        <input
                          className="customFormControl"
                          type="text"
                          value={lastElevenMonthSecond}
                          onInput={(e) => {
                            setLast11MonthsSecond(e.target.value);
                          }}
                          disabled={viewDetail}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b- align-items-center row m-l-0 m-r-0">
                      <Col sm={7} md={7} xs={7} className="p-0">
                        <Form.Label className="customColFormLabel">Last 11 Months</Form.Label>
                      </Col>
                      <Col xs={4} md={4} sm={4} className="">
                        <input
                          className="customFormControl"
                          type="text"
                          value={lastElvenMonthThird}
                          onInput={(e) => {
                            setLast11MonthsThird(e.target.value);
                          }}
                          disabled={viewDetail}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col sm={3} md={3} lg={3} xl={3} xs={3} style={{ width: "270px" }}>
                    <Col sm={5} md={5} xs={5} className="p-0 " style={{ height: "52px" }}>
                      <Form.Group className="form-group m-t-5 form-group m-t-5 m-b- align-items-center row m-l-0 m-r-0"></Form.Group>
                    </Col>
                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b- align-items-center row m-l-0 m-r-0">
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label className="customColFormLabel">Last 12 Months</Form.Label>
                      </Col>
                      <Col xs={4} md={4} sm={4} className="">
                        <input
                          className="customFormControl"
                          type="text"
                          value={lastTwelveMonth}
                          onInput={(e) => {
                            setLast12Months(e.target.value);
                          }}
                          disabled={viewDetail}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b- align-items-center row m-l-0 m-r-0">
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label className="customColFormLabel">Last 12 Months</Form.Label>
                      </Col>
                      <Col xs={4} md={4} sm={4} className="">
                        <input
                          className="customFormControl"
                          type="text"
                          value={lastTwelveMonthSecond}
                          onInput={(e) => {
                            setLast12MonthsSecond(e.target.value);
                          }}
                          disabled={viewDetail}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b- align-items-center row m-l-0 m-r-0">
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label className="customColFormLabel">Last 12 Months</Form.Label>
                      </Col>
                      <Col xs={4} md={4} sm={4} className="">
                        <input
                          className="customFormControl"
                          type="text"
                          value={lastTwelveMonthThird}
                          onInput={(e) => {
                            setLast12MonthsThird(e.target.value);
                          }}
                          disabled={viewDetail}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div className="mt-3 mx-2 d-flex p-t-5">
            <div style={{ width: "190px" }}></div>
            <div className="d-flex border border-1 border-dark w-75  " style={{ height: "222px" }}>
              <div className="flex-grow-1">
                <DriverFlashListing paginatedArray={paginatedArray} />
              </div>
              <PaginationComponent
                {...paginationProps}
                firstPage
                lastPage
                singleArrowUp
                singleArrowDown
                hideBorderBottom
                hideBorderTop
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DriverFlashContent;
