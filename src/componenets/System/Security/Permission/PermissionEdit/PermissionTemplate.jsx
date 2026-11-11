import React, { useState } from "react";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import QuarterScreenWrapper from "../../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../../common/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ModalComponent from "../../../../common/ModalComponent";
import { resetPermissionsMaintenance } from "../../../../../redux/PermissionsMaintenanceSlice";

const PermissionTemplate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [closeShow, setCloseShow] = useState(false);

  const viewDetail = useSelector((state) => state.permissionsMaintenance.viewDetail);

  const handleClose = () => {
    if (viewDetail === true) {
      navigate("/");
      toast.success("Page Closed");
      setCloseShow(false);
      dispatch(resetPermissionsMaintenance());
    } else {
      setCloseShow(true);
    }
  };

  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate("/");
    dispatch(resetPermissionsMaintenance());
    toast.success("Page Closed");
  };

  return (
    <QuarterScreenWrapper>
      <Header
        closeHandler={() => {
          handleClose();
        }}
      />
      <FormContent />
      <FormFooter />
      <ModalComponent
        show={closeShow}
        onHide={onHandleCloseNo}
        title={"Close Permission Group Changes"}
        body="Please confirm you want to close the program without saving your changes"
        handleYES={onHandleCloseYes}
        handleNO={onHandleCloseNo}
      />
    </QuarterScreenWrapper>
  );
};

export default PermissionTemplate;
