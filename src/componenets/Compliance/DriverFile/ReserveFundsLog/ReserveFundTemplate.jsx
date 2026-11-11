import React, { useEffect } from "react";
import styles from "../../../../styles/QuarterScreen.module.css";
import ReserveFundHeader from "./ReserveFundHeader";
import ReserveFundContent from "./ReserveFundContent";
import ReserveFundFooter from "./ReserveFundFooter";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ReserveFundTemplate = () => {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const editFormData = useSelector((state) => state.driverMaintenanceReducer.editFormData);

  useEffect(() => {
    if (!editFormData) {
      navigate(`/driver-maintenance-add/${driverId}/form`);
      return;
    }
  }, [editFormData]);

  if (!editFormData) return;

  return (
    <div className="add-form-component customContainer">
      <div className="border border-dark border-2 quarterScreenWidth">
        <ReserveFundHeader styles={styles} />
        <ReserveFundContent styles={styles} />
        <ReserveFundFooter styles={styles} />
      </div>
    </div>
  );
};

export default ReserveFundTemplate;
