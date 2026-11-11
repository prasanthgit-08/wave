import { parseLocalDate } from "../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ModalComponent from "../../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../../../redux/DelayedUnitsPendingEmailSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const FormFooter = () => {
  const selectedId = useSelector((state) => state.delayedUnitsPendingEmail.selectedId);
  const viewPage = useSelector((state) => state.delayedUnitsPendingEmail.viewPage);
  const emailBody = useSelector((state) => state.delayedUnitsPendingEmail.emailBody);
  const tempEmailBody = useSelector((state) => state.delayedUnitsPendingEmail.tempEmailBody);
  const userPermission = useSelector((state) => state.delayedUnitsPendingEmail.userPermission);
  const isSaveFlag = useSelector((state) => state.delayedUnitsPendingEmail.isSaveFlag);

  const user = useSelector((state) => state.delayedUnitsPendingEmail.user);

  const loggedInUserData = useSelector((state) => state.auth.loggedInUserData);
  const utcTime = new Date().toISOString(); // Current time in UTC
  const localTime = parseLocalDate(utcTime).toLocaleString(); // Convert to local system time

  const [tmrShow, setTmrShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const handleEdit = () => {
    updateData("viewPage", false);
    updateData("isSaveFlag", false);
  };
  const getNonEmptyLines = (str) => str?.split("\n")?.filter((line) => line?.trim() !== "");

  const hasNewNonEmptyLine = (oldStr, newStr) => {
    const oldLines = getNonEmptyLines(oldStr);
    const newLines = getNonEmptyLines(newStr);

    // Detect added lines
    const addedLines = newLines?.filter((line) => !oldLines?.includes(line));
    return addedLines?.length > 0 ? true : false;
  };

  const handleSave = () => {
    if (hasNewNonEmptyLine(emailBody, tempEmailBody)) {
      updateData("tempEmailBody", `${tempEmailBody}\n[${localTime}] ${user}\n`);
    }
    updateData("viewPage", true);
    updateData("isSaveFlag", true);
    updateData("emailBody", tempEmailBody);
    toast.success("Email text updated");
  };

  useEffect(() => {
    updateData("user", loggedInUserData.name?.trim());
  }, [userPermission]);

  const handleSend = () => {
    updateData("operationFlag", 1);
  };

  const handleCancel = () => {
    if (viewPage === false || !selectedId) {
      setCancelShow(true);
    } else {
      setCancelShow(false);

      if (!viewPage) {
        navigate(`/delay-units-pending-email/add/${selectedId}`);
      } else {
        updateData("viewPage", true);
        updateData("selectedId", null);
        navigate(`/delay-units-pending-email`);
      }

      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (!viewPage) {
      setCancelShow(false);
      navigate(`/delay-units-pending-email/add/${selectedId}`);
    } else {
      setCancelShow(false);
      navigate(`/delay-units-pending-email`);
    }
    updateData("viewPage", true);
    toast.success("Changes Cancelled");
  };

  const handleDelete = () => {
    setDeleteShow(true);
  };

  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    updateData("operationFlag", 2);
    setTimeout(() => {
      navigate(`/delay-units-pending-email`);
    }, 100);
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={handleSave}
          disabled={userPermission == 0}
          hidden={viewPage}
        >
          Save
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={handleSend}
          hidden={!viewPage}
          disabled={userPermission == 0}
        >
          Send
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={handleEdit}
          hidden={!viewPage}
          disabled={userPermission == 0}
        >
          Edit
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={!viewPage}
          disabled={userPermission == 0}
          onClick={handleDelete}
        >
          Delete
        </button>

        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Delayed Unit Pending Email Changes"}
          body={"Please confirm you want to cancel  changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        {/* Cancel confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Cancel Delayed Unit Pending Email Changes"}
          body={"Please confirm you want to cancel  changes"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />

        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Delayed Unit Pending Email Record"}
          body={"Please confirm you want to delete this Delayed Unit Pending Email Record"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
      </div>
    </div>
  );
};

export default FormFooter;
