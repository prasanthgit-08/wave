import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetFields,
  resetState,
  setDescription,
  setDetailsData,
  setDriverAmount,
  setInvoiceAmount,
  updateField,
} from "../../../../redux/Invoicing/BulkUnitReimbursementSlice";
import BulkReimbursementService from "../../../../services/Invoicing/BulkReimbursementService";
import LoadingIcon from "../../../common/LoadingIcon";

const BulkReimbursementDetails = () => {
  const { bulkunitpk } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateTabEditData = (field, value) => {
    dispatch(updateField({ field, value }));
  };
  const unitFormData = useSelector((state) => state.bulkUnitReimbursementReducer.unitFormData);
  const changesCancelled = useSelector((state) => state.bulkUnitReimbursementReducer.changesCancelled);
  const detailsData = useSelector((state) => state.bulkUnitReimbursementReducer.detailsData);
  const description = useSelector((state) => state.bulkUnitReimbursementReducer.description);
  const invoiceAmount = useSelector((state) => state.bulkUnitReimbursementReducer.invoiceAmount);
  const driverAmount = useSelector((state) => state.bulkUnitReimbursementReducer.driverAmount);

  const [loading, setLoading] = useState(false);

  window.addEventListener("popstate", () => {
    dispatch(resetState());
    dispatch(resetFields());

    navigate(`/bulk-reimbursement-invoice-selection`);
  });

  const [allDriversPayTaxable, setAllDriversPayTaxable] = useState(true);
  const [selectedOption, setSelectedOption] = useState("DriverPay");

  const fetchRecord = (bulkunitpk) => {
    setLoading(true);
    BulkReimbursementService.getById(bulkunitpk)
      .then((res) => {
        const data = res?.data;

        updateTabEditData("unitFormData", data[0]);
        updateTabEditData("viewDetail", true);
        if (data[0]?.AllDriversPayTaxable) {
          setAllDriversPayTaxable(true);
          setSelectedOption("DriverPay");
        } else {
          setAllDriversPayTaxable(false);
          setSelectedOption("Reimbursement");
        }
      })
      .catch((err) => {
        navigate(`/bulk-reimbursement-invoice-selection`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (unitFormData === undefined) {
      setAllDriversPayTaxable(true);
      setSelectedOption("DriverPay");
    }
    if (unitFormData != null) {
      setAllDriversPayTaxable(unitFormData?.AllDriversPayTaxable);
      setSelectedOption(unitFormData?.AllDriversPayTaxable ? "DriverPay" : "Reimbursement");
    }
  }, [unitFormData, changesCancelled]);

  useEffect(() => {
    dispatch(
      setDetailsData({
        description: description || "",
        invoiceAmount: invoiceAmount ?? "",
        driverAmount: driverAmount ?? "",
        bulkUnitPK: bulkunitpk || null,
        allDriversPayTaxable: allDriversPayTaxable ?? false,
      })
    );
  }, [description, invoiceAmount, driverAmount]);

  useEffect(() => {
    if (bulkunitpk) {
      fetchRecord(bulkunitpk);
    }
  }, [bulkunitpk]);

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);
    if (selectedOption === "DriverPay") {
      setAllDriversPayTaxable(true);
    } else if (selectedOption === "Reimbursement") {
      setAllDriversPayTaxable(false);
    }
  };

  return (
    <div className="p-1 ps-2 quarterScreenFormContentHeight" style={{ height: "440px" }}>
      {loading && <LoadingIcon />}
      <Row className="mt-10" style={{ marginTop: "15px" }}>
        <Col xs={12}>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
        `}
          >
            <Col xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Description
              </Form.Label>
            </Col>

            <Col xs={5} className="p-0 h">
              <input
                className={`customFormControl ${description ? "borderGreen" : "borderRed"}`}
                value={description || detailsData.description}
                onBeforeInput={(e) => {
                  if (e.data === " " && e.target.value?.trim().length === 0) {
                    e.preventDefault();
                  }
                }}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                onInput={(e) => {
                  dispatch(setDescription(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
        `}
          >
            <Col xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Invoice Amount
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0 h" style={{ width: "90px" }}>
              <input
                className={`customFormControl ${invoiceAmount && invoiceAmount > 0 ? "borderGreen" : "borderRed"}`}
                onBeforeInput={(e) => {
                  if (e.data === " " && e.target.value?.trim().length === 0) {
                    e.preventDefault();
                  }
                }}
                name=""
                type="text"
                value={invoiceAmount || detailsData.invoiceAmount}
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                onInput={(e) => {
                  let value = e.target.value;
                  if (!/^\d*\.?\d*$/.test(value)) {
                    return;
                  }
                  if (value?.includes(".")) {
                    const [integerPart, decimalPart] = value?.split(".");
                    if (integerPart?.length > 7) {
                      return;
                    }
                    if (decimalPart?.length > 2) {
                      return;
                    }
                  } else {
                    if (value?.length > 7) {
                      return;
                    }
                  }
                  dispatch(setInvoiceAmount(value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
        `}
          >
            <Col xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Driver Amount
              </Form.Label>
            </Col>
            <Col xs={5} md={5} sm={5} className={`p-0 d-flex`}>
              <Col xs={3} className="ps-0 pe-2">
                <input
                  className={`customFormControl ${driverAmount && driverAmount > 0 ? "borderGreen" : "borderRed"}`}
                  name=""
                  type="text"
                  onBeforeInput={(e) => {
                    if (e.data === " " && e.target.value?.trim().length === 0) {
                      e.preventDefault();
                    }
                  }}
                  value={driverAmount || detailsData.driverAmount}
                  autoComplete="off"
                  aria-autocomplete="list"
                  maxLength={30}
                  onInput={(e) => {
                    let value = e.target.value;
                    if (!/^\d*\.?\d*$/.test(value)) {
                      return;
                    }
                    if (value?.includes(".")) {
                      const [integerPart, decimalPart] = value?.split(".");
                      if (integerPart?.length > 7) {
                        return;
                      }
                      if (decimalPart?.length > 2) {
                        return;
                      }
                    } else {
                      if (value?.length > 7) {
                        return;
                      }
                    }
                    dispatch(setDriverAmount(value));
                  }}
                />
              </Col>

              {!loading &&
                unitFormData &&
                (!unitFormData?.AllDriversPayTaxable || unitFormData?.AllDriversPayTaxable === false) && (
                  <>
                    <Col className="d-flex ms-2 align-items-center" style={{ maxWidth: "85px" }}>
                      <input
                        type="radio"
                        name="DriverPay"
                        value={"DriverPay"}
                        checked={selectedOption === "DriverPay"}
                        onChange={handleOptionChange}
                      />
                      <label className="ms-1">Driver Pay</label>
                    </Col>

                    <Col className="d-flex align-items-center">
                      <input
                        type="radio"
                        name="Reimbursement"
                        value={"Reimbursement"}
                        checked={selectedOption === "Reimbursement"}
                        onChange={handleOptionChange}
                      />
                      <label className="ms-2">Reimbursement</label>
                    </Col>
                  </>
                )}
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default BulkReimbursementDetails;
