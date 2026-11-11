import React, { useEffect, useState } from "react";
import UndispatchHeader from "../UndispatchHeader";
import APUScreenContent from "./APUScreenContent";
import APUScreenFooter from "./APUScreenFooter";
import { Tab, Tabs } from "react-bootstrap";
import APUTextContent from "./APUTextContent";
import { useSelector } from "react-redux";

const APUScreenTemplate = () => {
  const [disableNext, setDisableNext] = useState(false);

  const [activeKey, setActiveKey] = useState("DetailsTab");
  const {
    driverAmount,
    invoiceAmount,
    billingCustomer,
    billingCustomerId,
    billingCustomerInput,
    apuAuthorizedBy,
    apuRemainingAmount,
    chargeCreditcard,
    creditCardData,
    apuCreditCardArrayList,
    creditCardLoder,
  } = useSelector((state) => state.undispatchReducer);

  //next button validation
  useEffect(() => {
    const toSafeString = (val) => (val != null ? String(val)?.trim() : "");

    const driverStr = toSafeString(driverAmount);
    const invoiceStr = toSafeString(invoiceAmount);

    const isValidDriverAmount =
      driverStr !== "" && driverStr !== "." && driverStr !== "0." && !/^\d+\.$/.test(driverStr);

    const isValidInvoiceAmount =
      invoiceStr !== "" && invoiceStr !== "." && invoiceStr !== "0." && !/^\d+\.$/.test(invoiceStr);

    if (
      apuAuthorizedBy &&
      isValidDriverAmount &&
      isValidInvoiceAmount &&
      billingCustomerId &&
      billingCustomerInput
    ) {
      setDisableNext(true);
    } else {
      setDisableNext(false);
    }
  }, [
    billingCustomer,
    billingCustomerId,
    billingCustomerInput,
    apuAuthorizedBy,
    driverAmount,
    invoiceAmount,
  ]);
  return (
    <div className="customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <UndispatchHeader />
        <div className="p-2">
          <div className="shadow-sm rounded border halfScreenFormContentHeight">
            <Tabs activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
              <Tab
                eventKey={"DetailsTab"}
                title={"Details Tab"}
                tabClassName={
                  creditCardLoder
                    ? ""
                    : (creditCardData?.Case === "Case1" &&
                          creditCardData?.Navigate === "Y" &&
                          Number(apuRemainingAmount) !== 0) ||
                        (creditCardData?.Case === "Case2" &&
                          creditCardData?.Navigate === "Y" &&
                          Number(apuRemainingAmount) !== 0) ||
                        (creditCardData?.Case === "Case3" &&
                          creditCardData?.Navigate === "Y" &&
                          Number(apuRemainingAmount) !== 0) ||
                        (chargeCreditcard &&
                          creditCardData?.Case === "Case3" &&
                          creditCardData?.Navigate === "P" &&
                          Number(apuRemainingAmount) !== 0 &&
                          apuCreditCardArrayList?.length !== 0) ||
                        (chargeCreditcard &&
                          creditCardData?.Case === "Case3" &&
                          creditCardData?.Navigate === "P" &&
                          apuCreditCardArrayList?.length === 0) ||
                        !disableNext
                      ? "color-red"
                      : "color-green"
                }
              >
                <APUScreenContent />
              </Tab>
              <Tab eventKey={"text"} title={"Text"}>
                <APUTextContent />
              </Tab>
            </Tabs>
          </div>
        </div>
        <APUScreenFooter />
      </div>
    </div>
  );
};

export default APUScreenTemplate;
