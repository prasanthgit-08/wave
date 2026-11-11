import { t } from "i18next";
import React from "react";
import { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Text from "./Tabs/Text";
import Detail from "./Tabs/Detail";
import { resetFields } from "../../../../redux/DriverInvoiceSlice";
import General from "./Tabs/General";

function FormContent() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const driverInvoiceTextData = useSelector((state) => state.driverInvoiceReducer.driverInvoiceTextData);
  const invoiceDetailsData = useSelector((state) => state.driverInvoiceReducer.invoiceDetailsData);
  const sum = useSelector((state) => state.driverInvoiceReducer.sum);
  const isNonUnit = useSelector((state) => state.driverInvoiceReducer.isNonUnit);
  const descriptionValid = useSelector((state) => state.driverInvoiceReducer.descriptionValid);
  const customerEmail = useSelector((state) => state.driverInvoiceReducer.customerEmail);
  const emailFormat = useSelector((state) => state.driverInvoiceReducer.emailFormat);
  const emailToDriver = useSelector((state) => state.driverInvoiceReducer.emailToDriver);
  const emailToUser = useSelector((state) => state.driverInvoiceReducer.emailToUser);
  const print = useSelector((state) => state.driverInvoiceReducer.print);

  window.addEventListener("popstate", () => {
    dispatch(resetFields());
    navigate(`/driver-invoice-browse`);
  });

  const getTabClassName = () => {
    const noEmailActions = !print && !emailToDriver && !emailToUser;
    const invalidEmail = noEmailActions && ((customerEmail !== "" && !emailFormat) || customerEmail === "");

    const invalidNonUnit = noEmailActions && isNonUnit && !driverInvoiceTextData?.miscellaneousUnit;

    if (invalidEmail || invalidNonUnit || (customerEmail !== "" && !emailFormat)) {
      return "color-red";
    }
    return "color-green"; // default
  };

  return (
    <div className="shadow-sm rounded border quarterScreenBrowseHeight" style={{ height: "570px" }}>
      <Tabs defaultActiveKey={"General"} id="uncontrolled-tab-example" className="m-b-0">
        <Tab tabClassName={getTabClassName()} eventKey="General" title={"General"}>
          <General />
        </Tab>

        <Tab eventKey="Text" title={"Text"}>
          <Text isNonUnit={isNonUnit} />
        </Tab>

        <Tab
          tabClassName={
            invoiceDetailsData?.length >= 1 &&
            invoiceDetailsData?.every((e) => e?.description) &&
            sum > 0 &&
            descriptionValid
              ? "color-green"
              : "color-red"
          }
          eventKey="Line_Items"
          title={"Line Items"}
        >
          <Detail />
        </Tab>
      </Tabs>
    </div>
  );
}

export default FormContent;
