import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Customer from "./tabs/Customer";
import MiscCustomer from "./tabs/MiscCustomer";
import MiscDelivery from "./tabs/MiscDelivery";
import OverWidth from "./tabs/OverWidth";
import Unit from "./tabs/Unit";
import DriveBys from "./tabs/DriveBys";
import OnHold from "./tabs/OnHold";
import CreditCard from "./tabs/CreditCard";
import OpenBalances from "./tabs/OpenBalances";
import Contacts from "./tabs/Contacts";
import Notes from "./tabs/Notes";
import Instructions from "./tabs/Instructions";
import Documents from "./tabs/Documents";
import MiscPickup from "./tabs/MiscPickup";
import { useSelector } from "react-redux";
import InvoiceHold from "./tabs/InvoiceHold";
import { setActiveKey } from "../../../../redux/OrderEntryFilterSlice";
import UnitRoutes from "./tabs/UnitRoutes";
import OrderEntryFooter from "./OrderEntryFooter";
import OrderEntryHeader from "./OrderEntryHeader";

function OrderEntryContent({ styles }) {
  // const dispatch = useDispatch();

  // const activeKey = useSelector((state) => state.orderEntryReducer.activeKey);
  // const miscellaneousPickup = useSelector((state) => state.orderEntryReducer.miscellaneousPickup);
  // //Customer Tab
  // const isCustomerTabValid = useSelector((state) => state.orderEntryReducer.isCustomerTabValid);
  // //Unit Tab
  // const unitTabIsValid = useSelector((state) => state.orderEntryReducer.unitTabIsValid);
  // //Miscellaneuous Delivery checkbox state in unit tab
  // const miscellaneousDelivery = useSelector((state) => state.orderEntryReducer.miscellaneousDelivery);
  // //Misc Customer Validation flag
  // const isMiscCustomerValid = useSelector((state) => state.orderEntryReducer.miscCustomerTabIsValid);
  // const isCustomerMisc = useSelector((state) => state.orderEntryReducer.isCustomerMisc);
  // //Misc Pickup Tab Validation flag
  // const isMiscPickupDealerValid = useSelector((state) => state.orderEntryReducer.miscPickupDealerTabIsValid);
  // //Misc Delivery Tab validation flag
  // const isMiscDeliveryDealerValid = useSelector(
  //   (state) => state.orderEntryReducer.miscDeliveryDealerTabIsValid
  // );
  // //Invoice Hold in Unit Tab
  // const invoiceHold = useSelector((state) => state.orderEntryReducer.invoiceHold);
  // const invoiceHoldTabIsValid = useSelector((state) => state.orderEntryReducer.invoiceHoldTabIsValid);
  // // DriveBy Tab
  // const isDriveByValid = useSelector((state) => state.orderEntryReducer.driveByValidationFlag);
  // const enableDriveby = useSelector((state) => state.orderEntryReducer.hasDriveBy);
  // //overWidth flag
  // const overWidthLoadFromRedux = useSelector((state) => state.orderEntryReducer.overWidthLoad);
  // const isOverWidthValid = useSelector((state) => state.orderEntryReducer.overWidthValidationFlag);
  // //Instruction Tab
  // const customerOrderEntryInstructions = useSelector((state) => state.orderEntryReducer.instructions);
  // const selectedCustomerId = useSelector((state) => state.orderEntryReducer.selectedCustomerId);
  // //onHold Tab Validation flag
  // const isonHold = useSelector((state) => state.orderEntryReducer.onHoldTab);
  // const onHold = useSelector((state) => state.orderEntryReducer.onHold);
  // //Open balance tab
  // const isOpenBalanceValid = useSelector((state) => state.orderEntryReducer.isOpenBalanceValid);
  // const useOpenBalance = useSelector((state) => state.orderEntryReducer.useOpenBalance);
  // // credit card charge
  // const chargeCreditCard = useSelector((state) => state.orderEntryReducer.chargeCreditCharge);
  // // credit card tab color
  // const isMandatoryCreditCardTab = useSelector((state) => state.orderEntryReducer.isMandatoryCreditCardTab);

  return (
    <div className={styles.orderTabs}>
      {/* <OrderEntryHeader />

      <Tabs activeKey={activeKey} onSelect={(k) => dispatch(setActiveKey(k))}>
        <Tab
          eventKey={"customer"}
          title={"Customer"}
          tabClassName={isCustomerTabValid ? "color-green" : "color-red"}
        >
          <Customer styles={styles} />
        </Tab>

        <Tab
          eventKey={"misccustomer"}
          title={"Misc Customer"}
          disabled={!isCustomerMisc}
          tabClassName={isCustomerMisc ? (isMiscCustomerValid ? "color-green" : "color-red") : ""}
        >
          <MiscCustomer styles={styles} />
        </Tab>

        <Tab
          eventKey={"unit"}
          title={"Unit"}
          disabled={!isCustomerTabValid}
          tabClassName={isCustomerTabValid ? (unitTabIsValid ? "color-green" : "color-red") : ""}
        >
          <Unit styles={styles} />
        </Tab>

        <Tab
          eventKey={"miscpickup"}
          title={"Misc Pickup"}
          disabled={!miscellaneousPickup}
          tabClassName={miscellaneousPickup ? (isMiscPickupDealerValid ? "color-green" : "color-red") : ""}
        >
          <MiscPickup styles={styles} />
        </Tab>

        <Tab
          eventKey={"miscdelivery"}
          title={"Misc Delivery"}
          disabled={!miscellaneousDelivery}
          tabClassName={
            miscellaneousDelivery ? (isMiscDeliveryDealerValid ? "color-green" : "color-red") : ""
          }
        >
          <MiscDelivery styles={styles} />
        </Tab>

        <Tab
          eventKey={"overwidth"}
          title={"Over Width"}
          disabled={!overWidthLoadFromRedux}
          tabClassName={overWidthLoadFromRedux ? (isOverWidthValid ? "color-green" : "color-red") : ""}
        >
          <OverWidth styles={styles} />
        </Tab>

        <Tab eventKey={"unitRoutes"} title={"Unit Routes"} disabled={!isCustomerTabValid} tabClassName={""}>
          <UnitRoutes styles={styles} />
        </Tab>

        <Tab
          eventKey={"drivebys"}
          title={"Drive By's"}
          disabled={!enableDriveby}
          tabClassName={enableDriveby ? (isDriveByValid ? "color-green" : "color-red") : ""}
        >
          <DriveBys styles={styles} />
        </Tab>

        <Tab
          eventKey={"onhold"}
          title={"On Hold"}
          // disabled={true}
          disabled={!onHold}
          tabClassName={onHold ? (isonHold ? "color-green" : "color-red") : ""}
        >
          <OnHold styles={styles} />
        </Tab>

        <Tab
          eventKey={"creditcard"}
          title={"Credit Card"}
          //   disabled={!chargeCreditCard || !selectedCustomerId ? true:false}
          disabled={isCustomerTabValid ? (chargeCreditCard ? false : true) : true}
          tabClassName={
            !chargeCreditCard || !selectedCustomerId
              ? ""
              : isMandatoryCreditCardTab
                ? "color-green"
                : "color-red"
          }
        >
          <CreditCard styles={styles} />
        </Tab>
        <Tab
          eventKey={"openbalances"}
          title={"Open Balances"}
          disabled={isCustomerTabValid ? (useOpenBalance ? false : true) : true}
          tabClassName={
            (selectedCustomerId == null ? false : true) && useOpenBalance
              ? isOpenBalanceValid
                ? "color-green"
                : "color-red"
              : ""
          }
        >
          <OpenBalances styles={styles} />
        </Tab>

        <Tab eventKey={"contacts"} title={"Contacts"} disabled={selectedCustomerId != null ? false : true}>
          <Contacts styles={styles} />
        </Tab>

        <Tab eventKey={"notes"} title={"Notes"} disabled={selectedCustomerId != null ? false : true}>
          <Notes styles={styles} />
        </Tab>

        <Tab
          eventKey={"invoiceHold"}
          title={"Invoice Hold"}
          disabled={selectedCustomerId != null ? false : true}
          tabClassName={invoiceHold ? (invoiceHoldTabIsValid ? "color-green" : "color-red") : ""}
        >
          <InvoiceHold styles={styles} />
        </Tab>

        <Tab
          eventKey={"instructions"}
          title={"Instructions"}
          disabled={selectedCustomerId != null ? false : true}
          tabClassName={
            selectedCustomerId === null ||
            customerOrderEntryInstructions === null ||
            customerOrderEntryInstructions === ""
              ? ""
              : "tab-font-color"
          }
        >
          <Instructions styles={styles} />
        </Tab>

        <Tab eventKey={"documents"} title={"Documents"}>
          <Documents styles={styles} />
        </Tab>
      </Tabs>

      <OrderEntryFooter /> */}
    </div>
  );
}

export default OrderEntryContent;
