import React, { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { t } from "i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import General from "./Tabs/General";
import Insurance from "./Tabs/Insurance";
import Notes from "./Tabs/Notes";
import { faX } from "@fortawesome/free-solid-svg-icons";

function FormContent() {
  const params = useParams();
  const dealerPK = params.id;
  const navigate = useNavigate();

  const inCompleteDealerPK = params.inCompleteDealerPK;

  const pageNumber = params.pageNumber;

  const dispatch = useDispatch();

  const tabIsValid = useSelector((state) => state.editDealerReducer.tabIsValid);

  const resourceTabValidation = useSelector((state) => state.editDealerReducer.isResourcesTabVaild);

  const pickupTabValidation = useSelector((state) => state.editDealerReducer.isPickUpTabVaild);

  const settingsTabValidation = useSelector((state) => state.editDealerReducer.isSettingsTabVaild);

  const deliveryTabValidation = useSelector((state) => state.editDealerReducer.isDeliveryTabVaild);

  const bolTextTabValidation = useSelector((state) => state.editDealerReducer.isBolTextTabVaild);

  const viewDetail = useSelector((state) => state.transportCompaniesReducer.viewDetail);

  const name = useSelector((state) => state.transportCompaniesReducer.name);
  const address1 = useSelector((state) => state.transportCompaniesReducer.address1);
  const address2 = useSelector((state) => state.transportCompaniesReducer.address2);
  const phone = useSelector((state) => state.transportCompaniesReducer.phone);
  const alternatePhone = useSelector((state) => state.transportCompaniesReducer.alternatePhone);
  const fAXNumber = useSelector((state) => state.transportCompaniesReducer.fAXNumber);
  const ein = useSelector((state) => state.transportCompaniesReducer.ein);
  const email = useSelector((state) => state.transportCompaniesReducer.email);
  const dispatcher = useSelector((state) => state.transportCompaniesReducer.dispatcher);
  const dispatcherPhone = useSelector((state) => state.transportCompaniesReducer.dispatcherPhone);
  const dispatcherCellPhone = useSelector((state) => state.transportCompaniesReducer.dispatcherCellPhone);
  const dispatcherEmail = useSelector((state) => state.transportCompaniesReducer.dispatcherEmail);
  const dispatchEmail = useSelector((state) => state.transportCompaniesReducer.dispatchEmail);
  const towaway = useSelector((state) => state.transportCompaniesReducer.towaway);
  const haulAndTow = useSelector((state) => state.transportCompaniesReducer.haulAndTow);
  const lowboy = useSelector((state) => state.transportCompaniesReducer.lowboy);
  const popup = useSelector((state) => state.transportCompaniesReducer.popup);
  const truckCamper = useSelector((state) => state.transportCompaniesReducer.truckCamper);
  const motorized = useSelector((state) => state.transportCompaniesReducer.motorized);
  const changesCancelled = useSelector((state) => state.transportCompaniesReducer.changesCancelled);
  const onCancel = useSelector((state) => state.transportCompaniesReducer.onCancel);
  const postalCodeOnChange = useSelector((state) => state.transportCompaniesReducer.postalCodeOnChange);
  const einFormat = useSelector((state) => state.transportCompaniesReducer.einFormat);
  const emailFormat = useSelector((state) => state.transportCompaniesReducer.emailFormat);
  const isNameExist = useSelector((state) => state.transportCompaniesReducer.isNameExist);
  const isEinExist = useSelector((state) => state.transportCompaniesReducer.isEinExist);
  const insuranceEmailValid = useSelector((state) => state.transportCompaniesReducer.insuranceEmailValid);
  const insuranceFAX = useSelector((state) => state.transportCompaniesReducer.insuranceFAX);

  const insurancePhone = useSelector((state) => state.transportCompaniesReducer.insurancePhone);

  const insuranceContact = useSelector((state) => state.transportCompaniesReducer.insuranceContact);
  const postalCodePK = useSelector((state) => state.transportCompaniesReducer.postalCodePK);
  const dispatcherEmailValid = useSelector((state) => state.transportCompaniesReducer.dispatcherEmailValid);
  const insuranceEmail = useSelector((state) => state.transportCompaniesReducer.insuranceEmail);
  const dispatchEmailValid = useSelector((state) => state.transportCompaniesReducer.dispatchEmailValid);
  const insurancePostalCodePK = useSelector((state) => state.transportCompaniesReducer.insurancePostalCodePK);
  const insurancePostalCode = useSelector((state) => state.transportCompaniesReducer.insurancePostalCode);
  const insuranceCity = useSelector((state) => state.transportCompaniesReducer.insuranceCity);
  const insuranceStateCode = useSelector((state) => state.transportCompaniesReducer.insuranceStateCode);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border halfScreenFormContentHeight">
        <Tabs defaultActiveKey="general" id="uncontrolled-tab-example" className="m-b-0">
          <Tab
            tabClassName={
              viewDetail
                ? ""
                : name &&
                    address1 &&
                    phone &&
                    ein &&
                    einFormat &&
                    dispatcherPhone &&
                    dispatcher &&
                    (towaway || haulAndTow || lowboy || popup || truckCamper || motorized) &&
                    (email ? emailFormat : true) &&
                    isEinExist &&
                    isNameExist &&
                    postalCodePK &&
                    dispatcherEmail &&
                    dispatcherEmailValid &&
                    dispatchEmail &&
                    dispatchEmailValid &&
                    (!alternatePhone || alternatePhone.length === 13) &&
                    (!phone || phone.length === 13) &&
                    (!fAXNumber || fAXNumber.length === 13) &&
                    (!dispatcherCellPhone || dispatcherCellPhone.length === 13) &&
                    (!dispatcherPhone || dispatcherPhone.length === 13)
                  ? "color-green"
                  : "color-red"
            }
            eventKey="general"
            title={t("edit.dealer.page.general.tab.heading.general")}
          >
            <General />
          </Tab>

          <Tab
            tabClassName={
              viewDetail
                ? ""
                : (!insuranceFAX || insuranceFAX.length === 13) &&
                    (!insuranceEmail || insuranceEmailValid) &&
                    (!insurancePhone || insurancePhone.length === 13 || insurancePhone?.trim() === "") &&
                    (!insuranceContact ||
                      insuranceContact.length === 13 ||
                      insuranceContact?.trim() === "") &&
                    !(
                      (insurancePostalCode?.trim() || insuranceCity?.trim() || insuranceStateCode?.trim()) &&
                      !insurancePostalCodePK
                    )
                  ? ""
                  : "color-red"
            }
            eventKey="Insurance"
            title={"Insurance"}
          >
            <Insurance />
          </Tab>

          <Tab eventKey="notes" title={t("Notes")}>
            <Notes />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
export default FormContent;
