import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CustomerDealersService from "../../../../../services/CustomerDealersService";
import { useDispatch, useSelector } from "react-redux";
import {
  setDealerAddress1,
  setDealerAddress2,
  setDealerCity,
  setDealerName,
  setDealerState,
  setDealerZip,
} from "../../../../../redux/CustomerDealerSlice";

const DealerTab = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const id = params.id;
  const [loading, setLoading] = useState(true);

  const name = useSelector((state) => state.customerDealersFilter.dealerName);
  const address1 = useSelector((state) => state.customerDealersFilter.dealerAddress1);
  const address2 = useSelector((state) => state.customerDealersFilter.dealerAddress2);
  const city = useSelector((state) => state.customerDealersFilter.dealerCity);
  const state = useSelector((state) => state.customerDealersFilter.dealerState);
  const zip = useSelector((state) => state.customerDealersFilter.dealerZip);
  const customerLoading = useSelector((state) => state.customerDealersFilter.customerLoading);
  const plantLoading = useSelector((state) => state.customerDealersFilter.plantLoading);
  const plantGroupLoading = useSelector((state) => state.customerDealersFilter.plantGroupLoading);

  const fetchDealer = () => {
    setLoading(true);
    CustomerDealersService.fetchDealerById(id)
      .then((response) => {
        dispatch(setDealerName(response?.data?.name));
        dispatch(setDealerAddress1(response?.data?.address1));
        dispatch(setDealerAddress2(response?.data?.address2));
        dispatch(setDealerCity(response?.data?.city));
        dispatch(setDealerState(response?.data?.stateCode));
        dispatch(setDealerZip(response?.data?.postalCode));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchDealer();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, []);

  return (
    <div className={`col-8 mx-auto`}>
      <div className="p-15 w-100">
        <Row className="m-0 p-0">
          <Col sm={8} md={8} lg={8} xl={8} xs={8}>
            <Form.Group className="margin-box-1 form-group m-t-20 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
              <Col xs={1} sm={1} md={1} className="p-0">
                <Form.Label className="col-form-label dealer-label">Dealer</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className="customFormControl"
                  id="name"
                  name="name"
                  value={name}
                  maxLength={30}
                  disabled={true}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>
            <Form.Group className="margin-box-1 form-group m-t-20 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
              <Col xs={1} sm={1} md={1} className="p-0"></Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className="customFormControl"
                  id="ad1"
                  name="ad1"
                  value={address1}
                  maxLength={30}
                  disabled={true}
                  autoComplete="one-time-code"
                  aria-autocomplete="list"
                  spellCheck={false}
                />
              </Col>
            </Form.Group>

            <Form.Group className="margin-box-1 form-group m-t-20 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
              <Col xs={1} sm={1} md={1} className="p-0"></Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className="customFormControl"
                  id="ad2"
                  name="ad2"
                  value={address2}
                  maxLength={30}
                  disabled={true}
                  autoComplete="one-time-code"
                  aria-autocomplete="list"
                  spellCheck={false}
                />
              </Col>
            </Form.Group>

            <Form.Group className="margin-box-1 form-group m-t-20 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
              <Col xs={1} sm={1} md={1} className="p-0"></Col>
              <Col xs={4} md={4} sm={4} className="p-0">
                <input
                  type="text"
                  className="customFormControl"
                  id="City"
                  name="City"
                  value={city}
                  maxLength={30}
                  disabled={true}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
              <Col xs={1} md={1} sm={1} className="p-r-0">
                <input
                  type="text"
                  className="customFormControl"
                  id="State"
                  name="State"
                  value={state}
                  maxLength={30}
                  disabled={true}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>

              <Col xs={2} md={2} sm={2} className="p-r-0">
                <input
                  type="text"
                  className="customFormControl"
                  id="postalCode"
                  name="postalCode"
                  value={zip}
                  maxLength={30}
                  disabled={true}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>
            {(loading || plantGroupLoading || plantLoading || customerLoading) && (
              <div className="fade modal-backdrop show">
                <div className="pos-center">
                  <div className="loader"></div>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DealerTab;
