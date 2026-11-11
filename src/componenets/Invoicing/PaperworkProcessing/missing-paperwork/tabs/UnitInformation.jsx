import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setEmailText,
  setMissingPaperworkObject,
  setMissingPaperworkEmailText,
  setMissingPaperworkChargeEfee,
  setMissingPaperworkAttachVideo,
  setSelectedUnitsListIndex,
  setUnitOnInvoiceHold,
  setInvoiceHoldReason,
  setNotes,
  setSelectedUnit,
  updateSelectedUnitsList,
} from "../../../../../redux/Invoicing/PaperworkProcessingSlice";
import PaperworkProcessingService from "../../../../../services/Invoicing/PaperworkProcessingService";
import LoadingIcon from "../../../../common/LoadingIcon";

function UnitInformation() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [driver, setDriver] = useState("");
  const [unitNumber, seUnitNumber] = useState("");
  const [model, setModel] = useState("");
  const [unitType, setUnitType] = useState("");
  const [specialCode, setSpecialCode] = useState("");
  const [pickup, setPickup] = useState("");
  const [delivery, setDelivery] = useState("");
  const [pickupDealerAdd2, setPickupDealerAdd2] = useState("");
  const [pickupDealerState, setPickupDealerState] = useState("");
  const [deliveryDealerAdd2, setDeliveryDealerAdd2] = useState("");
  const [deliveryDealerState, setDeliveryDealerState] = useState("");
  const [attachVideo, setAttachVideo] = useState(false);
  const [chargeEfee, setChargeEfee] = useState(false);
  const [chargeEfeeFlag, setChargeEfeeFlag] = useState(false);

  const selectedUnitsList = useSelector((state) => state.paperworkProcessing.selectedUnitsList);
  const emailText = useSelector((state) => state.paperworkProcessing.emailText);
  const companyName = useSelector((state) => state.paperworkProcessing.companyName);
  const companyFK = useSelector((state) => state.paperworkProcessing.companyFK);
  const selectedUnitsListIndex = useSelector((state) => state.paperworkProcessing.selectedUnitsListIndex);
  const missingPaperworkObject = useSelector((state) => state.paperworkProcessing.missingPaperworkObject);
  const selectedUnit = useSelector((state) => state.paperworkProcessing.selectedUnit);

  const prevUnitIdRef = useRef(null);
  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    prevUnitIdRef.current = null;
    isInitialLoadRef.current = true;
  }, []);

  const onMissingPaperworkClick = (unit, index = 0) => {
    const unitId = unit?.unitPK;
    dispatch(setSelectedUnitsListIndex(index));

    if (unit?.unitPK != null) {
      setLoading(true);
      PaperworkProcessingService.getUnitDetailsById(unit.unitPK, companyFK, companyName)
        .then((response) => {
          setLoading(false);
          const data = response?.data;
          if (data != null) {
            setDriver(data?.firstName?.trim() + " " + (data?.lastName?.trim() || ""));
            seUnitNumber(data?.unitNumber);
            setModel(data?.model?.trim());
            setUnitType(data?.descriptionLong?.trim());
            setSpecialCode(data?.specialCodeFK ? data?.description?.trim() : "");
            setPickup(
              data?.pickupDealerFK
                ? data?.pickupDealerName?.trim() + ", " + data?.pickupDealerAddress1?.trim()
                : data?.pickupCustomerPlantFK
                  ? data?.pickupPlantName?.trim() + ", " + data?.pickupPlantAddress1?.trim()
                  : data?.pickupUnitAddressFK
                    ? data?.pickupUnitAddressName?.trim() + ", " + data?.pickupUnitAddress1?.trim()
                    : ""
            );
            setPickupDealerAdd2(
              data?.pickupDealerFK
                ? data?.pickupDealerAddress2?.trim() +
                    ", " +
                    data?.pickupDealerCity?.trim() +
                    ", " +
                    data?.pickupDealerPostalCode
                : data?.pickupCustomerPlantFK
                  ? data?.pickupPlantAddress2?.trim() +
                    ", " +
                    data?.pickupPlantCity?.trim() +
                    ", " +
                    data?.pickupPlantPostalCode
                  : data?.pickupUnitAddressFK
                    ? data?.pickupUnitAddress2?.trim() +
                      ", " +
                      data?.pickupUnitAddressCity?.trim() +
                      ", " +
                      data?.pickupUnitAddressPostalCode
                    : ""
            );
            setPickupDealerState(
              data?.pickupDealerFK
                ? data?.pickupDealerStateCode?.trim()
                : data?.pickupCustomerPlantFK
                  ? data?.pickupPlantStateCode?.trim()
                  : data?.pickupUnitAddressFK
                    ? data?.pickupUnitAddressStateCode?.trim()
                    : ""
            );
            setDelivery(
              data?.deliveryDealerFK
                ? data?.deliveryDealerName?.trim() + ", " + data?.deliveryDealerAddress1?.trim()
                : data?.deliveryCustomerPlantFK
                  ? data?.deliveryPlantName?.trim() + ", " + data?.deliveryPlantAddress1?.trim()
                  : data?.deliveryUnitAddressFK
                    ? data?.deliveryUnitAddressName?.trim() + ", " + data?.deliveryUnitAddress1?.trim()
                    : ""
            );
            setDeliveryDealerAdd2(
              data?.deliveryDealerFK
                ? data?.deliveryDealerAddress2?.trim() +
                    ", " +
                    data?.deliveryDealerCity?.trim() +
                    ", " +
                    data?.deliveryDealerPostalCode
                : data?.deliveryCustomerPlantFK
                  ? data?.deliveryPlantAddress2?.trim() +
                    ", " +
                    data?.deliveryPlantCity?.trim() +
                    ", " +
                    data?.deliveryPlantPostalCode
                  : data?.deliveryUnitAddressFK
                    ? data?.deliveryUnitAddress2?.trim() +
                      ", " +
                      data?.deliveryUnitAddressCity?.trim() +
                      ", " +
                      data?.deliveryUnitAddressPostalCode
                    : ""
            );
            setDeliveryDealerState(
              data?.deliveryDealerFK
                ? data?.deliveryDealerStateCode?.trim()
                : data?.deliveryCustomerPlantFK
                  ? data?.deliveryPlantStateCode?.trim()
                  : data?.deliveryUnitAddressFK
                    ? data?.deliveryUnitAddressStateCode?.trim()
                    : ""
            );

            // Flag that controls visibility of the Charge EFee field
            const apiChargeEfee = data?.chargeEfee || false;
            setChargeEfeeFlag(apiChargeEfee);

            // Restore saved data
            const savedData = missingPaperworkObject;

            if (savedData && savedData.emailText !== undefined) {
              dispatch(setEmailText(savedData.emailText || ""));
            } else {
              dispatch(setEmailText(""));
            }

            if (savedData && savedData.attachVideo !== undefined) {
              setAttachVideo(savedData.attachVideo);
            } else {
              setAttachVideo(false);
            }

            setChargeEfee(false);
            dispatch(setMissingPaperworkChargeEfee(false));

            const apiUnitOnInvoiceHold = Boolean(data?.unitOnInvoiceHold);
            const apiInvoiceHoldReason = data?.invoiceHoldReason || "";
            const apiNotes = data?.notes || "";

            dispatch(setUnitOnInvoiceHold(apiUnitOnInvoiceHold));
            dispatch(setInvoiceHoldReason(apiInvoiceHoldReason));
            dispatch(setNotes(apiNotes));

            dispatch(
              setSelectedUnit({
                ...selectedUnit,
                ...data,
                unitOnInvoiceHold: apiUnitOnInvoiceHold,
                invoiceHoldReason: apiInvoiceHoldReason,
                unitOnInvoiceHoldUI: false,
              })
            );

            dispatch(
              updateSelectedUnitsList({
                index: index,
                payload: {
                  unitOnInvoiceHold: apiUnitOnInvoiceHold,
                  unitOnInvoiceHoldUI: false,
                },
              })
            );

            dispatch(
              setMissingPaperworkObject({
                ...savedData,
                unitOnInvoiceHold: apiUnitOnInvoiceHold,
                invoiceHoldReason: apiInvoiceHoldReason,
                notes: apiNotes,
                chargeEfee: false,
              })
            );

            prevUnitIdRef.current = unitId;
          }
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (selectedUnitsList && selectedUnitsList?.length > 0) {
      const currentIndex = selectedUnitsListIndex || 0;
      if (selectedUnitsList[currentIndex]) {
        onMissingPaperworkClick(selectedUnitsList[currentIndex], currentIndex);
      }
    }
  }, [selectedUnitsListIndex, selectedUnit?.unitPK]);

  useEffect(() => {
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      return;
    }

    dispatch(setMissingPaperworkEmailText(emailText));
    dispatch(setMissingPaperworkChargeEfee(chargeEfee));
    dispatch(setMissingPaperworkAttachVideo(attachVideo));
  }, [emailText, chargeEfee, attachVideo]);

  const handleAttachVideoChange = (checked) => {
    setAttachVideo(checked);
    dispatch(setMissingPaperworkAttachVideo(checked));
  };

  const handleChargeEfeeChange = (checked) => {
    setChargeEfee(checked);
    dispatch(setMissingPaperworkChargeEfee(checked));
  };

  return (
    <div className="p-0">
      {loading && <LoadingIcon />}
      <div className="d-flex gap-4 ps-4 mt-4">
        <div className="col-6">
          <div className="d-flex mb-3">
            <div className="col-3 ">Drivers</div>
            <div className="col-9 me-3">
              {" "}
              <input
                className="form-controlDriverService"
                type="text"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
                value={driver}
              />
            </div>
          </div>
          <div className="d-flex mb-3">
            <div className="col-3 ">Unit Number</div>
            <div className="col-5 me-3">
              {" "}
              <input
                className="form-controlDriverService"
                type="text"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
                value={unitNumber}
              />
            </div>
          </div>
          <div className="d-flex mb-3">
            <div className="col-3 ">Model</div>
            <div className="col-5 me-3">
              {" "}
              <input
                className="form-controlDriverService"
                type="text"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
                value={model}
              />
            </div>
          </div>
          <div className="d-flex mb-3">
            <div className="col-3 ">Unit Type</div>
            <div className="col-5 me-3">
              {" "}
              <input
                className="form-controlDriverService"
                type="text"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
                value={unitType}
              />
            </div>
          </div>
          <div className="d-flex mb-3">
            <div className="col-3 ">Special Code</div>
            <div className="col-5 me-3">
              {" "}
              <input
                className="form-controlDriverService"
                type="text"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
                value={specialCode}
              />
            </div>
          </div>

          <div className="d-flex mb-3">
            <div className="col-3 ">Attach Video</div>
            <div className="col-5 me-3">
              {" "}
              <input
                className=""
                type="checkbox"
                maxLength={30}
                autoComplete="off"
                checked={attachVideo}
                onChange={(e) => handleAttachVideoChange(e.target.checked)}
              />
            </div>
          </div>
          <div className={`d-flex mb-2 ${!chargeEfeeFlag ? "hide-elements" : ""}`}>
            <div className="col-3 ">Charge EFee</div>
            <div className="col-5 me-3">
              {" "}
              <input
                className=""
                type="checkbox"
                maxLength={30}
                autoComplete="off"
                checked={chargeEfee}
                onChange={(e) => handleChargeEfeeChange(e.target.checked)}
              />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex mb-3 invisible">
            <div className="col-3 "></div>
            <div className="col-9 me-3">
              {" "}
              <input
                className="form-controlDriverService"
                type="text"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                value={""}
              />
            </div>
          </div>
          <div className="d-flex ps-4 mb-3">
            <div className="col-3 ">Pickup</div>
            <div className="col-5 me-3">
              {" "}
              <input
                className="form-controlDriverService"
                type="text"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
                value={pickup}
              />
            </div>
          </div>
          <div className="d-flex ps-4 mb-3">
            <div className="col-3 "></div>
            <div className="col-5 me-3">
              {" "}
              <input
                className="form-controlDriverService"
                type="text"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
                value={pickupDealerAdd2}
              />
            </div>
            <input
              type="text"
              style={{ width: "30px" }}
              className=" form-controlDriverService"
              disabled
              value={pickupDealerState}
            />
          </div>
          <div className="d-flex mb-3 invisible">
            <div className="col-3 "></div>
            <div className="col-5 me-3">
              {" "}
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>
          </div>
          <div className="d-flex ps-4 mb-3">
            <div className="col-3 ">Delivery</div>
            <div className="col-5 me-3">
              {" "}
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
                value={delivery}
              />
            </div>
          </div>
          <div className="d-flex ps-4 mb-3">
            <div className="col-3 "></div>
            <div className="col-5 me-3">
              {" "}
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
                value={deliveryDealerAdd2}
              />
            </div>
            <input
              type="text"
              style={{ width: "30px" }}
              className=" form-controlDriverService"
              disabled
              value={deliveryDealerState}
            />
          </div>
          <div className="d-flex mb-2 invisible">
            <div className="col-3 "></div>
            <div className="col-5 me-3">
              {" "}
              <input className="" type="checkbox" maxLength={30} autoComplete="off" />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex ps-4 mb-2 col-12">
        <div className=" " style={{ width: "157px" }}>
          Email Text
        </div>
        <div className="col-10 me-3">
          {" "}
          <textarea
            className={` textColor-fromcontrol w-100 h-100 ${
              !emailText?.trim() ? "borderRed" : "borderGreen"
            } `}
            type="text"
            name=""
            id=""
            value={emailText}
            cols="30"
            rows="13"
            onChange={(e) => {
              dispatch(setEmailText(e.target.value));
            }}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default UnitInformation;
