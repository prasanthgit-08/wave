import { parseLocalDate } from "../../../../utils/dateUtils";
import React, { useEffect, useLayoutEffect, useState } from "react";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import DateInputField from "../../../common/DateInputField";
import { Form, Col, Row } from "react-bootstrap";
import PayDebitcardInvoiceService from "../../../../services/PayDebitcardInvoiceService";
import {
  setDebitcardIssuedId,
  setDebitcardIssuedInput,
  setDriverPay,
  setDriverpayCheckNumber,
  setInvoiceNumber,
  setPostedDate,
  setProcessFlag,
  setReimbursement,
  setReimbursementCheckNumber,
  setSaveData,
} from "../../../../redux/PayDebitcardInvoiceSlice";
import { useDispatch, useSelector } from "react-redux";
import useDebouncer from "../../../../hooks/useDebouncer";
import Input from "../../../../components/common/input";
import LoadingIcon from "../../../common/LoadingIcon";

const PayDebitCardContent = () => {
  const dispatch = useDispatch();
  const driverpayCheckNumber = useSelector((state) => state.payDebitcardInvoiceReducer.driverpayCheckNumber);
  const reimbursementCheckNumber = useSelector(
    (state) => state.payDebitcardInvoiceReducer.reimbursementCheckNumber
  );
  const debitcardIssuedId = useSelector((state) => state.payDebitcardInvoiceReducer.debitcardIssuedId);
  const debitcardIssuedInput = useSelector((state) => state.payDebitcardInvoiceReducer.debitcardIssuedInput);
  const invoiceNumber = useSelector((state) => state.payDebitcardInvoiceReducer.invoiceNumber);
  const reimbursement = useSelector((state) => state.payDebitcardInvoiceReducer.reimbursement);
  const driverPay = useSelector((state) => state.payDebitcardInvoiceReducer.driverPay);
  const postedDate = useSelector((state) => state.payDebitcardInvoiceReducer.postedDate);

  const [debitcardIssuedData, setDebitcardIssuedData] = useState([]);
  const [debitCardProcessorLoading, setDebitCardProcessorLoading] = useState(false);
  const [debitCardPageLoading, setDebitCardPageLoading] = useState(false);
  const [processLoading, setProcessLoading] = useState(false);

  // local midnight of yesterday (the old new Date("YYYY-MM-DD") form was UTC midnight)
  const yesterday = parseLocalDate(new Date(new Date().setDate(new Date().getDate() - 1)));
  yesterday.setHours(0, 0, 0, 0);
  const [isDateValidation, setIsDateValidation] = useState(true);
  const [processData, setProcessData] = useState([]);
  /**
   * Fetch Mentoring Debitcard for Autocomplete
   **/

  const fetchDebitCards = (string, showPageLoader = false) => {
    setDebitCardProcessorLoading(true);
    if (showPageLoader) setDebitCardPageLoading(true);
    let active = true;
    PayDebitcardInvoiceService.getAllDebitCardData(string, active)
      .then((response) => {
        const data = response.data.content;

        const cardList = data?.map((card) => ({
          ...card,
          name: card.provider?.trim(),
        }));
        if (cardList?.length === 1) {
          dispatch(setDebitcardIssuedId(cardList?.[0]?.debitCardPK));
          dispatch(setDebitcardIssuedInput(cardList?.[0]?.provider?.trim()));
        }
        setDebitcardIssuedData(cardList);
      })
      .finally(() => {
        setDebitCardProcessorLoading(false);
        setDebitCardPageLoading(false);
      });
  };
  /**
   * used for Debitcard  Autocomplete -Selection
   */
  const handlerDebitCardSelection = (item) => {
    dispatch(setDebitcardIssuedId(item.debitCardPK));
    dispatch(setDebitcardIssuedInput(item.provider?.trim()));
  };
  const debouncerProcessDebitCardInvoice = useDebouncer(() => {
    if (debitcardIssuedId && postedDate) {
      setProcessLoading(true);
      PayDebitcardInvoiceService.processDebitCardInvoice({
        debitCardId: debitcardIssuedId,
        postedDate: postedDate?.toString(),
        driverPay: driverPay || 0,
        reimbursement: reimbursement || 0,
        invoiceNumber: invoiceNumber,
        flag: false,
      })
        .then((response) => {
          const amountDetails = response.data.amountDetails; // Get the array
          if (amountDetails && amountDetails.length > 0) {
            dispatch(setDriverPay(amountDetails[0].DriverPay));
            dispatch(setReimbursement(amountDetails[0].Reimbursement));
          }
        })
        .catch((error) => {
          console.error("Error processing debit card invoice:", error);
        })
        .finally(() => {
          setProcessLoading(false);
        });
    }
  }, 500);

  useEffect(() => {
    fetchDebitCards("", true);
  }, []);

  useEffect(() => {
    debouncerProcessDebitCardInvoice();
  }, [debitcardIssuedId, postedDate, invoiceNumber]);

  useEffect(() => {
    const processData = {
      debitCardId: debitcardIssuedId,
      postedDate: postedDate?.toString(),
      driverPay: driverPay || 0,
      reimbursement: reimbursement || 0,
      invoiceNumber: invoiceNumber,
      flag: false,
    };

    dispatch(setSaveData(processData));
  }, [debitcardIssuedId, postedDate, invoiceNumber, driverPay, reimbursement]);

  useEffect(() => {
    if (
      debitcardIssuedId &&
      debitcardIssuedInput &&
      invoiceNumber &&
      postedDate &&
      isDateValidation &&
      !driverpayCheckNumber &&
      !reimbursementCheckNumber &&
      ((driverPay && driverPay > 0) || (reimbursement && reimbursement > 0))
    ) {
      dispatch(setProcessFlag(true));
    } else {
      dispatch(setProcessFlag(false));
    }
  }, [
    debitcardIssuedId,
    postedDate,
    invoiceNumber,
    driverPay,
    reimbursement,
    driverpayCheckNumber,
    reimbursementCheckNumber,
  ]);

  useEffect(() => {
    if (!debitcardIssuedId && !debitcardIssuedInput) {
      dispatch(setDriverPay(""));
      dispatch(setReimbursement(""));
      dispatch(setDriverpayCheckNumber(""));
      dispatch(setReimbursementCheckNumber(""));
    }
  }, [debitcardIssuedId, debitcardIssuedInput]);
  useEffect(() => {
    if (!postedDate || !isDateValidation) {
      dispatch(setDriverPay(""));
      dispatch(setReimbursement(""));
      dispatch(setDriverpayCheckNumber(""));
      dispatch(setReimbursementCheckNumber(""));
    }
  }, [postedDate, isDateValidation]);

  useEffect(() => {
    if (!isDateValidation) {
      dispatch(setDriverPay(""));
      dispatch(setReimbursement(""));
      dispatch(setDriverpayCheckNumber(""));
      dispatch(setReimbursementCheckNumber(""));
    }
  }, [isDateValidation]);
  return (
    <div className="p-2">
      {(debitCardPageLoading || processLoading) && <LoadingIcon />}
      <div className="p-15 shadow-sm rounded border quarterScreenFormContentHeight">
        <Row className="m-0 p-10">
          <Col xs={12}></Col>
        </Row>
        <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
          <Col xs={2} md={2} sm={2} className="p-0">
            <Form.Label className="col-form-label dealer-label">Debit Card Processor</Form.Label>
          </Col>
          <Col xs={3} md={3} sm={3} className={`p-0 d-flex`}>
            <AutoCompleteDropdown
              arrayList={debitcardIssuedData}
              searchString={debitcardIssuedInput}
              renderItemId={(item) => item.debitCardPK}
              renderItemField={(item) => item.name}
              handleSearchString={(string) => dispatch(setDebitcardIssuedInput(string))}
              fetchDataBySearchString={fetchDebitCards}
              onSelect={handlerDebitCardSelection}
              loading={debitCardProcessorLoading}
              clearInputCallback={() => {
                dispatch(setDebitcardIssuedId(null));
              }}
              disabled={debitcardIssuedData?.length === 1}
              selectedId={debitcardIssuedId}
              className={`customFormControl ${debitcardIssuedData?.length === 1 ? "" : debitcardIssuedId && debitcardIssuedInput ? "borderGreen" : "borderRed"}`}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
          <Col xs={2} md={2} sm={2} className="p-0">
            <Form.Label className="col-form-label dealer-label">Posting Date</Form.Label>
          </Col>

          <Col xs={2} md={2} sm={2} className="p-0 w-95px">
            <DateInputField
              date={postedDate}
              reduxSetDate={(value) => {
                dispatch(setPostedDate(value));
              }}
              setIsDateValid={setIsDateValidation}
              max={parseLocalDate(yesterday)}
              className={`customFormControl ${postedDate && isDateValidation ? "borderGreen" : "borderRed"}`}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
          <Col xs={2} md={2} sm={2} className="p-0">
            <Form.Label className="col-form-label dealer-label">Invoice Number</Form.Label>
          </Col>

          <Col xs={4} md={4} sm={4} className="p-0">
            <Input
              id="customer"
              name="customer"
              type="customer"
              maxLength={60}
              value={invoiceNumber}
              onChange={(e) => {
                dispatch(setInvoiceNumber(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
              }}
              className={`customFormControl ${invoiceNumber ? "borderGreen" : "borderRed"}`}
            />
          </Col>
        </Form.Group>

        <Form.Group className="mt-4 align-items- row  m-l-0 m-r-0">
          <Col sm={1} md={1} xs={1} className="p-0">
            <Form.Label className="col-form-label dealer-label"></Form.Label>
          </Col>
        </Form.Group>
        <Form.Group className="mt-4 row align-items-center ms-0 me-0">
          <Col xs={2} md={2} sm={2} className="p-0">
            <Form.Label className="col-form-label dealer-label">Driver Pay</Form.Label>
          </Col>

          <Col xs={2} md={2} sm={2} className={`p-0 d-flex w-75px`}>
            <Input
              id="customer"
              name="customer"
              type="text"
              className="customFormControl"
              disabled
              value={driverPay}
            />
          </Col>

          <Col xs={2} md={2} sm={2} className="p-0 text-center">
            <Form.Label className="col-form-label dealer-label w-100">Check Number</Form.Label>
          </Col>

          <Col xs={2} sm={2} md={2} className="p-0 w-100px">
            <Input disabled className="customFormControl" name="extn" value={driverpayCheckNumber} />
          </Col>
        </Form.Group>

        <Form.Group className="mt-4 row align-items-center ms-0 me-0">
          <Col xs={2} md={2} sm={2} className="p-0">
            <Form.Label className="col-form-label dealer-label">Reimbursement</Form.Label>
          </Col>

          <Col xs={2} md={2} sm={2} className={`p-0 d-flex w-75px`}>
            <Input
              id="customer"
              name="customer"
              type="text"
              className="customFormControl"
              disabled
              value={reimbursement}
            />
          </Col>

          <Col xs={2} md={2} sm={2} className="p-0 text-center">
            <Form.Label className="col-form-label dealer-label w-100">Check Number</Form.Label>
          </Col>
          <Col xs={2} sm={2} md={2} className="p-0 w-100px">
            <Input className="customFormControl" name="extn" disabled value={reimbursementCheckNumber} />
          </Col>
        </Form.Group>
      </div>
    </div>
  );
};

export default PayDebitCardContent;
