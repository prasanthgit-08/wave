import React, { useEffect } from "react";
import styles from "../../../../styles/QuarterScreen.module.css";
import BondFundsHeader from "./BondFundsHeader";
import BondFundsContent from "./BondFundsContent";
import BondFundsFooter from "./BondFundsFooter";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const BondFundsTemplate = () => {
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
        <BondFundsHeader styles={styles} />
        <BondFundsContent styles={styles} />
        <BondFundsFooter styles={styles} />
      </div>
    </div>
  );
};

export default BondFundsTemplate;
