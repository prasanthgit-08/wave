import React, { useState } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Button, Modal } from "react-bootstrap";
import { resetUserMaintenance } from "../../../../../redux/UserMaintenanceSearchFilterSlice";

function UserMaintenanceFormHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [closeShow, setCloseShow] = useState(false);

  const viewDetail = useSelector((state) => state.userMaintenanceReducer.viewDetail);

  const handleClose = () => {
    if (viewDetail) {
      navigate("/");

      dispatch(resetUserMaintenance());
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };

  const onHandleCloseYes = () => {
    navigate("/");
    dispatch(resetUserMaintenance());
    toast.success("Page Closed");
  };

  const onHandleCloseNo = () => {
    setCloseShow(false);
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleClose}
        >
          {t("dealers.list.page.advanced.close.button")}
        </button>
      </div>

      <div className="col-xs-6">
        <Modal show={closeShow} onHide={onHandleCloseNo} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100">Close User Maintenance</Modal.Title>
          </Modal.Header>
          <Modal.Body className="font-14 h-100">
            Please confirm you want to close the program without saving your changes
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={onHandleCloseYes}>
              Yes
            </Button>
            <Button variant="secondary" onClick={onHandleCloseNo}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default UserMaintenanceFormHeader;
