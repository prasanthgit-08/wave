import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  setPartialTripArray,
  setPartialTripArraySum,
  setPartialTripIndex,
  setSplitDriverDetails,
} from "../../../../redux/Invoicing/PaperworkProcessingSlice";
import CustomRadioGroup from "../../../common/CustomRadioGroup";

const SplitTrip = () => {
  const dispatch = useDispatch();
  const partialTripArray = useSelector((state) => state.paperworkProcessing.partialTripArray);
  const partialTripIndex = useSelector((state) => state.paperworkProcessing.partialTripIndex);
  const selectedUnit = useSelector((state) => state.paperworkProcessing.selectedUnit);
  const [unitNumber, setUnitNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tolls, setTolls] = useState(0);
  const [permits, setPermits] = useState(0);
  const [wash, setWash] = useState(0);
  const [otherPay, setOtherPay] = useState(0);
  const [otherReimbursments, setOtherReimbursments] = useState(0);
  const [otherDescription, setOtherDescription] = useState("");
  const [otherRadio, setOtherRadio] = useState("");
  const [tollInvoice, setTollInvoice] = useState("");
  const [permitInvoice, setPermitInvoice] = useState("");
  const [washInvoice, setWashInvoice] = useState("");
  const [otherInvoice, setOtherInvoice] = useState("");

  useEffect(() => {
    dispatch(setPartialTripIndex(0));

    return () => {
      dispatch(setPartialTripIndex(0));
    };
  }, []);

  useEffect(() => {
    if (partialTripArray?.length > 0 && partialTripIndex < partialTripArray?.length) {
      setUnitNumber(partialTripArray[partialTripIndex]?.unitNumber?.trim() || "");
      setFirstName(partialTripArray[partialTripIndex]?.firstName?.trim() || "");
      setLastName(partialTripArray[partialTripIndex]?.lastName?.trim() || "");
      setTolls(partialTripArray[partialTripIndex]?.tolls || 0);
      if (selectedUnit?.fodInvoice) {
        setTollInvoice(0);
        setPermitInvoice(0);
        setWashInvoice(0);
        setOtherInvoice(0);
      } else {
        setTollInvoice(partialTripArray[partialTripIndex]?.tollInvoice);
        setPermitInvoice(partialTripArray[partialTripIndex]?.permitInvoice);
        setWashInvoice(partialTripArray[partialTripIndex]?.washInvoice);
        setOtherInvoice(partialTripArray[partialTripIndex]?.otherInvoice);
      }

      setPermits(partialTripArray[partialTripIndex]?.permits || 0);
      setWash(partialTripArray[partialTripIndex]?.wash || 0);
      setOtherPay(partialTripArray[partialTripIndex]?.otherPay || 0);
      setOtherReimbursments(partialTripArray[partialTripIndex]?.otherReimbursments || 0);
      setOtherDescription(partialTripArray[partialTripIndex]?.otherDescription?.trim() || "");
      setOtherRadio(
        partialTripArray[partialTripIndex]?.otherReimbursments != null &&
          partialTripArray[partialTripIndex]?.otherReimbursments > 0
          ? "Reimbursement"
          : "Pay"
      );
    }
  }, [partialTripIndex, selectedUnit?.fodInvoice]);

  useEffect(() => {
    dispatch(
      setPartialTripArray({
        type: "update",
        payload: {
          index: partialTripIndex,
          splitUpdateObject: {
            tollInvoice,
            permitInvoice,
            washInvoice,
            otherInvoice,
          },
        },
      })
    );
  }, [tollInvoice, permitInvoice, washInvoice, otherInvoice, partialTripIndex]);

  useEffect(() => {
    const arrayOfPKs = partialTripArray?.map((item) => item.driverId);
    dispatch(setSplitDriverDetails(arrayOfPKs));
  }, [partialTripArray]);

  return (
    <QuarterScreenWrapper>
      <Header splitTrip />
      <div className="p-2">
        <div className="shadow-sm rounded border">
          <div className="mt-5 ps-5" style={{ height: "380px" }}>
            <div className="d-flex mb-3">
              <div className="col-2 ">Unit Number</div>
              <div className="col-3">
                {" "}
                <input
                  className="form-controlDriverService"
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={unitNumber}
                  disabled
                />
              </div>
            </div>

            <div className="d-flex mb-3">
              <div className="col-2"></div>
              <div className="col-1 me-3">Invoice</div>
              <div className="col-1 me-3">Driver</div>
              <div className="col-5">
                {" "}
                <input
                  className="form-controlDriverService"
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={firstName + " " + lastName}
                  disabled
                />
              </div>
            </div>
            <div className="d-flex mb-3">
              <div className="col-2 ">Tolls</div>
              <div className="col-1 me-3">
                {" "}
                <input
                  // className="form-controlDriverService"
                  className={`customFormControl ${
                    tollInvoice === "." || /^\d*\.$/.test(tollInvoice) ? "borderRed" : ""
                  }`}
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={tollInvoice}
                  onInput={(e) => {
                    e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setTollInvoice(e.target.value);
                  }}
                  disabled={selectedUnit?.fodInvoice}
                />
              </div>
              <div className="col-1 me-3">
                {" "}
                <input
                  className="form-controlDriverService"
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={tolls}
                  disabled
                />
              </div>
            </div>
            <div className="d-flex mb-3">
              <div className="col-2 ">Permits</div>
              <div className="col-1 me-3">
                {" "}
                <input
                  className={`customFormControl ${
                    permitInvoice === "." || /^\d*\.$/.test(permitInvoice) ? "borderRed" : ""
                  }`}
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={permitInvoice}
                  onInput={(e) => {
                    e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setPermitInvoice(e.target.value);
                  }}
                  disabled={selectedUnit?.fodInvoice}
                />
              </div>
              <div className="col-1 me-3">
                {" "}
                <input
                  className="form-controlDriverService"
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={permits}
                  disabled
                />
              </div>
            </div>
            <div className="d-flex mb-3">
              <div className="col-2 ">Wash</div>
              <div className="col-1 me-3">
                {" "}
                <input
                  className={`customFormControl ${
                    washInvoice === "." || /^\d*\.$/.test(washInvoice) ? "borderRed" : ""
                  }`}
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={washInvoice}
                  onInput={(e) => {
                    e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setWashInvoice(e.target.value);
                  }}
                  disabled={selectedUnit?.fodInvoice}
                />
              </div>
              <div className="col-1 me-3">
                {" "}
                <input
                  className="form-controlDriverService"
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={wash}
                  disabled
                />
              </div>
            </div>
            <div className="d-flex mb-3">
              <div className="col-2 ">Other</div>
              <div className="col-1 me-3">
                {" "}
                <input
                  className={`customFormControl ${
                    otherInvoice === "." || /^\d*\.$/.test(otherInvoice) ? "borderRed" : ""
                  }`}
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={otherInvoice}
                  onInput={(e) => {
                    e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setOtherInvoice(e.target.value);
                  }}
                  disabled={selectedUnit?.fodInvoice}
                />
              </div>
              <div className="col-1 me-3">
                {" "}
                <input
                  className="form-controlDriverService"
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={
                    otherReimbursments !== null && otherReimbursments > 0 ? otherReimbursments : otherPay
                  }
                  disabled
                />
              </div>

              <div className="col-1 me-3 d-flex align-items-center">
                <CustomRadioGroup
                  options={["Pay", "Reimbursement"]}
                  selectedOption={otherRadio}
                  horizontal
                  disabled
                />
              </div>
            </div>
            <div className="d-flex mb-3">
              <div className="col-2 ">Other Description</div>
              <div className="col-6 me-3">
                {" "}
                <input
                  className="form-controlDriverService"
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={otherDescription}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer splitTrip />
    </QuarterScreenWrapper>
  );
};

export default SplitTrip;
