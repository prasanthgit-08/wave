import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import HalfScreenWrapper from "../../../Templates/Screens/HalfScreenWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  setDriversEmailArray,
  setDriversEmailIndex,
  setEmailText,
  setSelectedUnitsListIndex,
} from "../../../../redux/Invoicing/PaperworkProcessingSlice";
import PaperworkProcessingService from "../../../../services/Invoicing/PaperworkProcessingService";
import { CompanyName } from "../../../../services/constants/applicationConstants";

function DriversEmailContent() {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [driver, setDriver] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
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
  const [driverEmailText, setDriverEmailText] = useState("");

  const uniqueDriversEmailList = useSelector((state) => state.paperworkProcessing.uniqueDriversEmailList);
  const driversEmailArray = useSelector((state) => state.paperworkProcessing.driversEmailArray);
  const driversEmailIndex = useSelector((state) => state.paperworkProcessing.driversEmailIndex);
  const companyName = useSelector((state) => state.paperworkProcessing.companyName);

  useEffect(() => {
    if (driversEmailArray?.length > 0 && driversEmailIndex < driversEmailArray?.length) {
      setDriver(
        driversEmailArray[driversEmailIndex]?.firstName?.trim() +
          " " +
          (driversEmailArray[driversEmailIndex]?.lastName?.trim() || "")
      );
      setUnitNumber(driversEmailArray[driversEmailIndex]?.unitNumber || "");
      setModel(driversEmailArray[driversEmailIndex]?.model?.trim() || "");
      setUnitType(driversEmailArray[driversEmailIndex]?.descriptionLong?.trim() || "");
      setSpecialCode(
        driversEmailArray[driversEmailIndex]?.specialCodeFK
          ? driversEmailArray[driversEmailIndex]?.description?.trim()
          : ""
      );
      setPickup(
        driversEmailArray[driversEmailIndex].pickupDealerFK
          ? driversEmailArray[driversEmailIndex].pickupDealerName?.trim() +
              ", " +
              driversEmailArray[driversEmailIndex].pickupDealerAddress1?.trim()
          : driversEmailArray[driversEmailIndex].customerPlantFK
            ? driversEmailArray[driversEmailIndex].pickupPlantName?.trim() +
              ", " +
              driversEmailArray[driversEmailIndex].pickupPlantAddress1?.trim()
            : driversEmailArray[driversEmailIndex].pickupUnitAddressFK
              ? driversEmailArray[driversEmailIndex].pickupUnitAddressName?.trim() +
                ", " +
                driversEmailArray[driversEmailIndex].pickupUnitAddress1?.trim()
              : ""
      );
      setPickupDealerAdd2(
        driversEmailArray[driversEmailIndex].pickupDealerFK
          ? driversEmailArray[driversEmailIndex].pickupDealerAddress2?.trim() +
              ", " +
              driversEmailArray[driversEmailIndex].pickupDealerCity?.trim() +
              ", " +
              driversEmailArray[driversEmailIndex].pickupDealerPostalCode
          : driversEmailArray[driversEmailIndex].customerPlantFK
            ? driversEmailArray[driversEmailIndex].pickupPlantAddress2?.trim() +
              ", " +
              driversEmailArray[driversEmailIndex].pickupPlantCity?.trim() +
              ", " +
              driversEmailArray[driversEmailIndex].pickupPlantPostalCode
            : driversEmailArray[driversEmailIndex].pickupUnitAddressFK
              ? driversEmailArray[driversEmailIndex].pickupUnitAddress2?.trim() +
                ", " +
                driversEmailArray[driversEmailIndex].pickupUnitAddressCity?.trim() +
                ", " +
                driversEmailArray[driversEmailIndex].pickupUnitAddressPostalCode
              : ""
      );
      setPickupDealerState(
        driversEmailArray[driversEmailIndex].pickupDealerFK
          ? driversEmailArray[driversEmailIndex].pickupDealerStateCode?.trim()
          : driversEmailArray[driversEmailIndex].customerPlantFK
            ? driversEmailArray[driversEmailIndex].pickupPlantStateCode?.trim()
            : driversEmailArray[driversEmailIndex].pickupUnitAddressFK
              ? driversEmailArray[driversEmailIndex].pickupUnitAddressStateCode?.trim()
              : ""
      );
      setDelivery(
        driversEmailArray[driversEmailIndex].deliveryDealerFK
          ? driversEmailArray[driversEmailIndex].deliveryDealerName?.trim() +
              ", " +
              driversEmailArray[driversEmailIndex].deliveryDealerAddress1?.trim()
          : driversEmailArray[driversEmailIndex].deliveryCustomerPlantFK
            ? driversEmailArray[driversEmailIndex].deliveryPlantName?.trim() +
              ", " +
              driversEmailArray[driversEmailIndex].deliveryPlantAddress1?.trim()
            : driversEmailArray[driversEmailIndex].deliveryUnitAddressFK
              ? driversEmailArray[driversEmailIndex].deliveryUnitAddressName?.trim() +
                ", " +
                driversEmailArray[driversEmailIndex].deliveryUnitAddress1?.trim()
              : ""
      );
      setDeliveryDealerAdd2(
        driversEmailArray[driversEmailIndex].deliveryDealerFK
          ? driversEmailArray[driversEmailIndex].deliveryDealerAddress2?.trim() +
              ", " +
              driversEmailArray[driversEmailIndex].deliveryDealerCity?.trim() +
              ", " +
              driversEmailArray[driversEmailIndex].deliveryDealerPostalCode
          : driversEmailArray[driversEmailIndex].deliveryCustomerPlantFK
            ? driversEmailArray[driversEmailIndex].deliveryPlantAddress2?.trim() +
              ", " +
              driversEmailArray[driversEmailIndex].deliveryPlantCity?.trim() +
              ", " +
              driversEmailArray[driversEmailIndex].deliveryPlantPostalCode
            : driversEmailArray[driversEmailIndex].deliveryUnitAddressFK
              ? driversEmailArray[driversEmailIndex].deliveryUnitAddress2?.trim() +
                ", " +
                driversEmailArray[driversEmailIndex].deliveryUnitAddressCity?.trim() +
                ", " +
                driversEmailArray[driversEmailIndex].deliveryUnitAddressPostalCode
              : ""
      );
      setDeliveryDealerState(
        driversEmailArray[driversEmailIndex].deliveryDealerFK
          ? driversEmailArray[driversEmailIndex].deliveryDealerStateCode?.trim()
          : driversEmailArray[driversEmailIndex].deliveryCustomerPlantFK
            ? driversEmailArray[driversEmailIndex].deliveryPlantStateCode?.trim()
            : driversEmailArray[driversEmailIndex].deliveryUnitAddressFK
              ? driversEmailArray[driversEmailIndex].deliveryUnitAddressStateCode?.trim()
              : ""
      );
      setAttachVideo(false);
      setChargeEfee(driversEmailArray[driversEmailIndex].chargeEfee);
      setChargeEfeeFlag(driversEmailArray[driversEmailIndex].chargeEfee);
      setDriverEmailText(driversEmailArray[driversEmailIndex].driverEmailText);
    }
  }, [driversEmailIndex]);

  useEffect(() => {
    dispatch(setDriversEmailIndex(0));
  }, []);

  const onEmailTextChange = (newEmailText) => {
    dispatch(
      setDriversEmailArray({
        type: "update",
        payload: {
          index: driversEmailIndex,
          element: { driverEmailText: newEmailText },
        },
      })
    );
  };

  return (
    <div className="p-2">
      <div className=" shadow-sm rounded border " style={{ minHeight: "601px" }}>
        <div className="d-flex gap-4 ps-4 mt-4">
          <div className="col-6">
            <div className="d-flex mb-3 mt-2">
              <div className="col-3 ">Drivers</div>
              <div className="col-9 me-3">
                {" "}
                <input
                  className="form-controlDriverService"
                  type="search"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={driver}
                  disabled
                />
              </div>
            </div>
            <div className="d-flex mb-3 mt-2">
              <div className="col-3 ">Unit Number</div>
              <div className="col-5 me-3">
                {" "}
                <input
                  className="form-controlDriverService"
                  type="search"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={unitNumber}
                  disabled
                />
              </div>
            </div>
            <div className="d-flex mb-3 mt-2">
              <div className="col-3 ">Model</div>
              <div className="col-5 me-3">
                {" "}
                <input
                  className="form-controlDriverService"
                  type="search"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={model}
                  disabled
                />
              </div>
            </div>
            <div className="d-flex mb-3">
              <div className="col-3 ">Unit Type</div>
              <div className="col-5 me-3">
                {" "}
                <input
                  className="form-controlDriverService"
                  type="search"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={unitType}
                  disabled
                />
              </div>
            </div>
            <div className="d-flex mb-3">
              <div className="col-3 ">Special Code</div>
              <div className="col-5 me-3">
                {" "}
                <input
                  className="form-controlDriverService"
                  type="search"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={specialCode}
                  disabled
                />
              </div>
            </div>

            <div className="d-flex mb-3 invisible">
              <div className="col-3 ">Attach Video</div>
              <div className="col-5 me-3">
                {" "}
                <input
                  className=""
                  type="checkbox"
                  maxLength={30}
                  autoComplete="off"
                  checked={attachVideo}
                  onChange={(e) => setAttachVideo(e.target.checked)}
                />
              </div>
            </div>
            <div className="d-flex mb-2 invisible">
              <div className="col-3 ">Charge EFee</div>
              <div className="col-5 me-3">
                {" "}
                <input
                  className=""
                  type="checkbox"
                  maxLength={30}
                  autoComplete="off"
                  checked={chargeEfee}
                  onChange={(e) => setChargeEfee(e.target.checked)}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex mb-3 invisible">
              <div className="col-3 "></div>
              <div className="col-3 me-3">
                {" "}
                <input
                  className="form-controlDriverService"
                  type="search"
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
                  value={pickup}
                  disabled
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
                  value={pickupDealerAdd2}
                  disabled
                />
              </div>
              <input
                type="text"
                style={{ width: "30px" }}
                className=" form-controlDriverService"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                value={pickupDealerState}
                disabled
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
                  value={delivery}
                  disabled
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
                  value={deliveryDealerAdd2}
                  disabled
                />
              </div>
              <input
                type="text"
                style={{ width: "30px" }}
                className=" form-controlDriverService"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                value={deliveryDealerState}
                disabled
              />
            </div>
            <div className="d-flex mb-2 invisible">
              <div className="col-3 "></div>
              <div className="col-5 me-3">
                {" "}
                <input className="" type="checkbox" maxLength={30} autoComplete="off" />
              </div>
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
                !driverEmailText ? "borderRed" : "borderGreen"
              } `}
              type="text"
              value={driverEmailText}
              name=""
              id=""
              cols="30"
              rows="10"
              onChange={(e) => {
                const updatedValue = e.target.value;
                setDriverEmailText(updatedValue);
                onEmailTextChange(updatedValue);
              }}
              onBeforeInput={(e) => {
                if (e.target.value.length === 0 && e.data === " ") {
                  e.preventDefault();
                }
              }}

              style={{ minHeight: "250px" }}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriversEmailContent;
