import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Row } from "react-bootstrap";
import DateInputField from "../../../../../../../common/DateInputField";
import UndispatchService from "../../../../../../../../services/UndispatchService";
import {
  setCustomerFK,
  setDispatchData,
  setPaybackAmount,
  setPostingCompanyFK,
} from "../../../../../../../../redux/UndispatchSlice";
import formatDatetimeToDate from "../../../../../../../../utils/formatDateTimeToDate";
import LoadingText from "../../../../../../../common/LoadingText";
const UnitConfirmationContent = () => {
  const dispatch = useDispatch();
  const { dispatchId, driverId } = useParams();
  const dispatchData = useSelector((state) => state.undispatchReducer.dispatchData);
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();
  const undispatchFlag = useSelector((state) => state.undispatchReducer.undispatchFlag);
  const dispatchDate = useSelector((state) => state.undispatchReducer.dispatchDate);

  const getDispatchData = () => {
    UndispatchService.getDispatchData(dispatchId)
      .then(({ data }) => {
        dispatch(setPostingCompanyFK(data?.postingCompanyFK || 0));
        dispatch(setDispatchData(data));
        dispatch(setPaybackAmount(data?.netPay - data?.payBalance || 0));
        dispatch(setCustomerFK(data?.customerFK));
      })
      .catch(() => {})
      .finally(() => {
        setLoad(false);
      });
  };

  useEffect(() => {
    setLoad(true);
    getDispatchData();
  }, []);

  useEffect(() => {
    if (!undispatchFlag) {
      navigate(`/undispatch/${driverId}`);
    }
  }, [undispatchFlag]);
  return (
    <div className="p-2">
      <div className="p-15 shadow-sm rounded border quarterScreenFormContentHeight">
        {load && <LoadingText />}
        {!load && (
          <Row className="m-0 p-10">
            <Col xs={8}>
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0 ">
                  <Form.Label className="col-form-label dealer-label">Customer</Form.Label>
                </Col>
                <Col xs={6} sm={6} md={6} className="p-0 ">
                  <input
                    className="customFormControl"
                    name="customer"
                    type="text"
                    disabled
                    value={dispatchData?.customer}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0 ">
                  <Form.Label className="col-form-label dealer-label">Pickup</Form.Label>
                </Col>
                <Col xs={6} sm={6} md={6} className="p-0 ">
                  <input
                    className="customFormControl"
                    name="pickup"
                    type="text"
                    disabled
                    value={dispatchData?.pickupName}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label"></Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="pickupadress1"
                    type="text"
                    disabled
                    value={dispatchData?.pickupAddress1}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label"></Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="pickupadress2"
                    type="text"
                    disabled
                    value={dispatchData?.pickupAddress2}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label"></Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    value={dispatchData?.pickupCity}
                    type="text"
                    maxLength={30}
                    disabled
                  />
                </Col>
                <Col xs={1} md={1} sm={1} className="p-r-0 w-40px">
                  <input
                    className="customFormControl"
                    name="pickupCity"
                    type="text"
                    disabled
                    value={dispatchData?.pickupState}
                  />
                </Col>
                <Col xs={2} md={2} sm={2} className="p-r-0 ">
                  <input
                    className="customFormControl"
                    name="pickupState"
                    type="text"
                    disabled
                    value={dispatchData?.pickupZipcode}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0 ">
                  <Form.Label className="col-form-label dealer-label">Delivery</Form.Label>
                </Col>
                <Col xs={6} sm={6} md={6} className="p-0 ">
                  <input
                    className="customFormControl"
                    name="delivery"
                    type="text"
                    disabled
                    value={dispatchData?.deliveryName}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label"></Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="ad1"
                    type="text"
                    disabled
                    value={dispatchData?.deliveryAddress1}
                    autoComplete="one-time-code"
                    spellCheck={false}
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label"></Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="ad2"
                    type="text"
                    disabled
                    value={dispatchData?.deliveryAddress2}
                    autoComplete="one-time-code"
                    spellCheck={false}
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label"></Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    name="deliveryZipcode"
                    type="text"
                    disabled
                    value={dispatchData?.deliveryCity}
                  />
                </Col>
                <Col xs={1} md={1} sm={1} className="p-r-0 w-40px">
                  <input
                    className="customFormControl"
                    name="deliveryCity"
                    type="text"
                    disabled
                    value={dispatchData?.deliveryState}
                  />
                </Col>
                <Col xs={2} md={2} sm={2} className="p-r-0 ">
                  <input
                    className="customFormControl"
                    name="deliveryState"
                    type="text"
                    disabled
                    value={dispatchData?.deliveryZipcode}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col
              sm={4}
              md={4}
              xs={4}
              className="ps-lg-
        4"
            >
              <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label"> Driver Miles</Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0  w-100px">
                  <input
                    className="customFormControl"
                    name="Miles"
                    type="text"
                    disabled
                    value={dispatchData?.miles}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label"> Dispatch Date</Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0  w-100px">
                  <DateInputField
                    disabled
                    date={dispatchDate ? formatDatetimeToDate(dispatchDate, "MM/DD/YY") : ""}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default UnitConfirmationContent;
