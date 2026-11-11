import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ModalComponent from "../../../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EmailRecipientService from "../../../../../services/EmailRecipientService";
import toast from "react-hot-toast";
import { resetChanges, setViewDetail, setChangesCancelled } from "../../../../../redux/EmailRecipientSlice";
import LoadingIcon from "../../../../common/LoadingIcon";

const FormFooter = () => {
  const { emailMaintenanceId, id, pageNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRecipientPK = useSelector((state) => state.emailRecipient.emailRecipientPK);
  const recipientUserId = useSelector((state) => state.emailRecipient.recipientUserFK);
  const recipientTableField = useSelector((state) => state.emailRecipient.recipientTableField);
  const recipientSubTable = useSelector((state) => state.emailRecipient.recipientSubTable);
  const recipientFieldName = useSelector((state) => state.emailRecipient.recipientFieldName);
  const name = useSelector((state) => state.emailRecipient.name);
  const email = useSelector((state) => state.emailRecipient.email);
  const onlyEmailIf = useSelector((state) => state.emailRecipient.emailCondition);
  const isValidEmail = useSelector((state) => state.emailRecipient.isValidEmail);
  const viewDetail = useSelector((state) => state.emailRecipient.viewDetail);

  const [disableSave, setDisableSave] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [loader, setLoader] = useState(false);

  const EmailRcipientFormData = {
    emailRecipientPK,
    recipientUserId,
    emailFormatFK: emailMaintenanceId,
    recipientTableField,
    recipientSubTable,
    recipientFieldName,
    name,
    email,
    onlyEmailIf,
  };

  const saveEmailRecipients = () => {
    setLoader(true);
    EmailRecipientService.saveEmailRecipient(EmailRcipientFormData)
      .then((response) => {
        navigate("/email-recipients/" + emailMaintenanceId + "/" + pageNumber);
        if (id) {
          toast.success("Email Recipient Updated");
        } else {
          toast.success("Email Recipient Created");
        }
        dispatch(resetChanges());
      })
      .catch((error) => {
        navigate("/email-recipients/" + emailMaintenanceId + "/" + pageNumber);
        let msg = "";
        if (error.response) {
          msg = error.response.data.errorMsg;
        }
        if (msg === null || msg === "" || msg === undefined) {
          msg = "Something went wrong !! Failed to save the record !!";
        }
        toast.error(msg);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      dispatch(resetChanges());
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/email-recipients/" + emailMaintenanceId + "/" + pageNumber);
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => setCancelShow(false);

  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(setChangesCancelled(true));
      toast.success("Changes Cancelled");
    } else {
      navigate("/email-recipients/" + emailMaintenanceId + "/" + pageNumber);
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      toast.success("Changes Cancelled");
    }
  };

  const handleDelete = () => setDeleteShow(true);

  const handleDeleteNo = () => setDeleteShow(false);

  const handleDeleteYes = () => {
    setLoader(true);
    EmailRecipientService.deleteEmailRecipient(id)
      .then((response) => {
        navigate("/email-recipients/" + emailMaintenanceId + "/" + pageNumber);
        toast.success("Email Recipient Deleted");
        dispatch(resetChanges);
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        navigate("/email-recipients/" + emailMaintenanceId + "/" + pageNumber);
      })
      .finally(() => setLoader(false));
    setDeleteShow(false);
  };

  useEffect(() => {
    if (
      recipientUserId !== "" ||
      recipientFieldName !== "" ||
      (name !== "" && email !== "" && isValidEmail)
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [recipientUserId, recipientFieldName, name, email, isValidEmail]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loader && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          type="button"
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={() => {
            saveEmailRecipients();
          }}
        >
          Save
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!viewDetail}
          onClick={() => {
            dispatch(setViewDetail(false));
          }}
        >
          Edit
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!viewDetail}
          onClick={handleDelete}
        >
          Delete
        </button>

        {/* Cancel Confirmation Modal */}
        {
          <ModalComponent
            show={cancelShow}
            onHide={handleCancelNo}
            title={"Cancel Email Recipient Changes"}
            body={"Please confirm you want to cancel your changes"}
            handleYES={handleCancelYes}
            handleNO={handleCancelNo}
          />
        }
        {/*Delete confirmation Modal */}
        {
          <ModalComponent
            show={deleteShow}
            onHide={handleDeleteNo}
            title={"Delete Email Recipient"}
            body={"Please confirm you want to Delete this Email Recipient"}
            handleYES={handleDeleteYes}
            handleNO={handleDeleteNo}
          />
        }
        {
          <Modal show={errorShow} onHide={() => setErrorShow(false)} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title className="font-18 h-100 temp-red-color">Delete failed!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-14 h-100">{errorMsg}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setErrorShow(false)}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        }
      </div>
    </div>
  );
};

export default FormFooter;
