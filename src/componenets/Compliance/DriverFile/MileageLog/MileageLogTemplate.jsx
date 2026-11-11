import React, { useEffect } from "react";
import MilageLogHeader from "./MilageLogHeader";
import MileageLogContent from "./MileageLogContent";
import MileageLogFooter from "./MileageLogFooter";
import styles from "../../../../styles/QuarterScreen.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const MileageLogTemplate = () => {
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
    <div className="add-form-component customContainer p-0">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <MilageLogHeader styles={styles} />
        <MileageLogContent styles={styles} />
        <MileageLogFooter styles={styles} />
      </div>
    </div>
  );
};

export default MileageLogTemplate;
