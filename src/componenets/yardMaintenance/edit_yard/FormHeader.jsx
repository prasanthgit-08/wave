import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { useSelector, useDispatch } from "react-redux";
import ButtonComponent from "../../common/Button";
import { useParams, useNavigate } from "react-router-dom";
import ModalComponent from "../../common/ModalComponent";
import { toast } from "react-hot-toast";
import styles from "../../../styles/ThreeQuarterScreen.module.css";
import { resetClose, setCheckDEscriptionExist, setClearValue } from "../../../redux/YardMaintenanceSlice";
const FormHeader = () => {
  const [closeShow, setCloseShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.yardMaintenanceReducer.viewDetail);

  const onHandleCloseShow = () => {
    if (viewDetail === true) {
      navigate("/");
      setCloseShow(false);
      toast.success("Page Closed");
      dispatch(setCheckDEscriptionExist(""));
      dispatch(setClearValue(true));
      dispatch(resetClose());
    } else {
      setCloseShow(true);
    }
  };
  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate("/");
    dispatch(setCheckDEscriptionExist(""));
    dispatch(resetClose());
    toast.success("Page Closed");
    dispatch(setClearValue(true));
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-6 m-r-5 m-b-5 `}
          onClick={onHandleCloseShow}
        >
          Close
        </button>
      </div>

      <div>
        <ModalComponent
          show={closeShow}
          onHide={onHandleCloseNo}
          title={"Close Yard Maintenance"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={onHandleCloseYes}
          handleNO={onHandleCloseNo}
        />
      </div>
    </div>
  );
};

export default FormHeader;
