import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import DateInputField from "../../../../common/DateInputField";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { EditMasterUnitSelection_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import { setPageNumber } from "../../../../../redux/CustomerPlantSearchFilterSlice";
import {
  setCreditCardSortFlag,
  setCreditCardSortValue,
} from "../../../../../redux/UnitStatus/UnitStatusSlice";
import UnitStatusService from "../../../../../services/Units/UnitStatusService";
import { useParams } from "react-router-dom";
import NoRecordsMessage from "../../../../common/NoRecordsMessage";
import LoadingText from "../../../../common/LoadingText";

function CreditCard({ data }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedRow, setSelectedRow] = useState(null);
  const [changeColor, setChangeColor] = useState(false);
  const [unitCreditCardData, setUnitCreditCardData] = useState(data?.data || []);
  const [selectedCard, setSelectedCard] = useState({
    chargeAmount: "",
    cardNumber: "",
    expirationDate: "",
    billingAddress: "",
    billingZipcode: "",
    authorizationNumber: "",
    source: "",
    status: "",
    dateCharged: "",
    dateAuthorized: "",
  });
  const creditCardSortFlag = useSelector((state) => state.unitStatusReducer.creditCardSortFlag);
  const creditCardSortValue = useSelector((state) => state.unitStatusReducer.creditCardSortValue);
  const selectedId = useSelector((state) => state.unitStatusReducer.selectedId);
  const activeTab = useSelector((state) => state.unitStatusReducer.activeTab);
  const [loading, setLoading] = useState(true);

  const onhandleNormalSort = (value, val) => {
    dispatch(setCreditCardSortFlag(val));
    dispatch(setCreditCardSortValue(value));
  };
  const handleRowClick = (item) => {
    setSelectedRow(item.MonetraChargePK);
    setChangeColor(true);
    setSelectedCard({
      chargeAmount: item.ChargeAmount,
      cardNumber: item.CreditCardNumber,
      expirationDate: item.ExpirationDate,
      billingAddress: item.BillingAddress,
      billingZipcode: item.BillingZipcode,
      authorizationNumber: item.AuthorizationNumber,
      source: item.Source,
      status: item.Status,
      dateCharged: item.DateCharged,
      dateAuthorized: item.DateAuthorized,
    });
  };

  const getAllUnitNumbersList = () => {
    UnitStatusService.getUnitStatusDataForOpenBalance(
      id,
      "CreditCard",
      0,
      11,
      creditCardSortValue,
      creditCardSortFlag
    )
      .then((response) => {
        const { data } = response;
        const listingData = data.filter((item) => item.Type !== "Pagination");

        setUnitCreditCardData(listingData);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id && activeTab === "CreditCard") {
      getAllUnitNumbersList();
    }
  }, [creditCardSortValue, creditCardSortFlag, activeTab]);

  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={5}>
          <p className={`mt-2`}>Credit Card Authorized</p>
          <div className="d-flex h-400">
            <div className="w-100 border border-2 border-dark">
              <div className="fixTableHead  " style={{ height: "400px" }}>
                <table className="table table-striped f-w-600">
                  <thead>
                    <tr disabled>
                      <th
                        className="f-w-600"
                        onClick={() => {
                          onhandleNormalSort("CreditCardNumber", !creditCardSortFlag);
                        }}
                      >
                        Card Number{" "}
                        {creditCardSortFlag && creditCardSortValue === "CreditCardNumber" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!creditCardSortFlag && creditCardSortValue === "CreditCardNumber" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>

                      <th
                        className="f-w-600"
                        onClick={() => {
                          onhandleNormalSort("ChargeAmount", !creditCardSortFlag);
                        }}
                      >
                        Authorized Amount{" "}
                        {creditCardSortFlag && creditCardSortValue === "ChargeAmount" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!creditCardSortFlag && creditCardSortValue === "ChargeAmount" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {!loading &&
                      unitCreditCardData?.length > 0 &&
                      unitCreditCardData?.map((item, index) => (
                        <tr
                          key={index}
                          onClick={() => handleRowClick(item)}
                          style={{ cursor: "pointer" }}
                          className={`${
                            item.MonetraChargePK === selectedRow && changeColor ? "tableSelected" : ""
                          }`}
                        >
                          <td>
                            {"X".repeat(item.CreditCardNumber.length - 4) + item.CreditCardNumber.slice(-4)}
                          </td>
                          <td>{item.ChargeAmount}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {loading && <LoadingText smallerFont />}
                {!loading && unitCreditCardData?.length === 0 && <NoRecordsMessage />}
              </div>
            </div>
          </div>
        </Col>
        <Col xs={5} className="ps-5 ms-5">
          <Form.Group className={`mt-5 form-group  align-items-center  row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label>Charge Amount</Form.Label>
            </Col>
            <Col xs={2} className="p-0 h">
              <input className="customFormControl" type="text" value={selectedCard.chargeAmount} readOnly />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-3 form-group  align-items-center  row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label>Credit Card Number</Form.Label>
            </Col>
            <Col sm={4} md={4} xs={4} className="p-0 h">
              <input
                className="customFormControl"
                type="text"
                value={selectedCard.cardNumber}
                readOnly
                autoComplete="one-time-code"
                spellCheck={false}
                aria-autocomplete="none"
              />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-3 form-group  align-items-center  row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label>Expiration Date</Form.Label>
            </Col>
            <Col xs={1} className="p-0 h">
              <input className="customFormControl" type="text" value={selectedCard.expirationDate} readOnly />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-3 form-group  align-items-center  row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label>Billing Address</Form.Label>
            </Col>
            <Col sm={5} md={5} xs={5} className="p-0 h">
              <input className="customFormControl" type="text" value={selectedCard.billingAddress} readOnly />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-3 form-group  align-items-center  row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} width={"90px"} className="p-0">
              <Form.Label>Billing Zip</Form.Label>
            </Col>
            <Col sm={1} md={1} xs={1} className="p-0 h">
              <input className="customFormControl" type="text" value={selectedCard.billingZipcode} readOnly />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-3 form-group  align-items-center  row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label>Authorization Number</Form.Label>
            </Col>
            <Col sm={2} md={2} xs={2} className="p-0 h">
              <input
                className="customFormControl"
                type="text"
                value={selectedCard.authorizationNumber}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-3 form-group  align-items-center  row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label>Source</Form.Label>
            </Col>
            <Col xs={2} className="p-0 h">
              <input className="customFormControl" type="text" value={selectedCard.source} readOnly />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-3 form-group  align-items-center  row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label>Status</Form.Label>
            </Col>
            <Col xs={2} className="p-0 h">
              <input className="customFormControl" type="text" value={selectedCard.status} readOnly />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-3 form-group  align-items-center  row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label>Date Charged</Form.Label>
            </Col>
            <Col xs={2} className="p-0 h">
              <DateInputField
                date={selectedCard.dateCharged}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-3 form-group  align-items-center  row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              {" "}
              <Form.Label> Date Authorized</Form.Label>
            </Col>
            <Col xs={2} className="p-0 h">
              {" "}
              <DateInputField
                date={selectedCard.dateAuthorized}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default CreditCard;
