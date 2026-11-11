import React from "react";
import styles from "../../../../styles/QuarterScreen.module.css";
import Header from "./Header";
import Footer from "./Footer";
import ManualEntry from "./ManualEntry";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetFields } from "../../../../redux/DriverInvoiceSlice";

function ManualEntryTemplate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  window.addEventListener("popstate", () => {
    dispatch(resetFields());
    navigate(`/driver-invoice-browse`);
  });
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <Header styles={styles} />
        <ManualEntry styles={styles} />
        <Footer styles={styles} />
      </div>
    </div>
  );
}

export default ManualEntryTemplate;
