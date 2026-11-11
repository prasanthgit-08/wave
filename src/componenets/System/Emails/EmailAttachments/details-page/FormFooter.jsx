import React, { useEffect, useState } from "react";
import ButtonComponent from "../../../../common/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetEmailAttachment,
  setDisableSave,
  setIsUniqueDescription,
  setResponseData,
  setViewDetail,
} from "../../../../../redux/EmailAttachmentSlice";
import toast from "react-hot-toast";
import EmailAttachmentService from "../../../../../services/EmailAttachmentService";
import ModalComponent from "../../../../common/ModalComponent";
import { Button, Modal } from "react-bootstrap";
import LoadingIcon from "../../../../common/LoadingIcon";

const FormFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { emailMaintenanceId, id, pageNumber } = useParams();

  const viewDetail = useSelector((state) => state.emailAttachmentReducer.viewDetail);
  const onlyEmailIf = useSelector((state) => state.emailAttachmentReducer.onlyEmailIf);
  const alternateForm = useSelector((state) => state.emailAttachmentReducer.alternateForm);
  const formDescriptionId = useSelector((state) => state.emailAttachmentReducer.formDescriptionId);
  const emailAttachmentPK = useSelector((state) => state.emailAttachmentReducer.emailAttachmentPK);
  const disableSave = useSelector((state) => state.emailAttachmentReducer.disableSave);
  const documentTypeDescriptionId = useSelector(
    (state) => state.emailAttachmentReducer.documentTypeDescriptionId
  );
  const responseData = useSelector((state) => state.emailAttachmentReducer.responseData);
  const checkFormName = useSelector((state) => state.emailAttachmentReducer.checkFormName);
  const documentTypeDescription = useSelector(
    (state) => state.emailAttachmentReducer.documentTypeDescription
  );
  const formDescription = useSelector((state) => state.emailAttachmentReducer.formDescription);

  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailAttachmentData = {
    emailAttachmentPK: id,
    onlyEmailIf: onlyEmailIf,
    formFKInt: formDescriptionId,
    emailFormatFK: emailMaintenanceId,
    alternateForm: alternateForm,
    documentTypeFK: documentTypeDescriptionId,
  };

  const checkUniqueDescription = () => {
    let type;
    let description;
    let id;
    if (formDescriptionId != null && formDescriptionId !== "") {
      type = "Form";
      id = formDescriptionId;
      description = formDescription;
    } else if (documentTypeDescriptionId != null && documentTypeDescriptionId != "") {
      type = "Document";
      id = documentTypeDescriptionId;
      description = documentTypeDescription;
    } else if (alternateForm != null && alternateForm !== "") {
      type = "AlternateForm";
      description = alternateForm;
    }

    if (
      responseData === null ||
      (responseData.formDescription?.trim() !== description?.trim() &&
        responseData.alternateForm?.trim() !== alternateForm?.trim())
    ) {
      EmailAttachmentService.checkUniqueFormDescription(emailMaintenanceId, description, type, id)
        .then((response) => {
          if (response.data) {
            saveOrEditEmailAttachment();
          } else {
            dispatch(setDisableSave(true));
          }
        })
        .catch((err) => {
          dispatch(setDisableSave(true));
        });
    } else {
      saveOrEditEmailAttachment();
    }
  };

  const saveOrEditEmailAttachment = () => {
    setLoading(true);
    EmailAttachmentService.saveOrEditEmailAttachment(emailAttachmentData)
      .then((response) => {
        navigate("/email-attachment/" + emailMaintenanceId + "/" + pageNumber);
        if (id) {
          toast.success("Email Attachment Updated");
        } else {
          toast.success("Email Attachment Created");
        }
        dispatch(setResponseData(null));
      })
      .catch((error) => {
        navigate("/email-attachment/" + emailMaintenanceId + "/" + pageNumber);
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
        setLoading(false);
      });
  };

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setResponseData(null));
      dispatch(setViewDetail(false));
      navigate("/email-attachment/" + emailMaintenanceId + "/" + pageNumber);
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(setIsUniqueDescription(true));
      toast.success("Changes Cancelled");
    } else {
      navigate("/email-attachment/" + emailMaintenanceId + "/" + pageNumber);
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };

  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    setDeleteShow(false);
    setLoading(true);
    EmailAttachmentService.deleteEmailAttachment(id)
      .then((response) => {
        navigate("/email-attachment/" + emailMaintenanceId + "/" + pageNumber);
        toast.success("Email Attachment Deleted");
        dispatch(resetEmailAttachment);
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        navigate("/email-attachment/" + emailMaintenanceId + "/" + pageNumber);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10">{loading && <LoadingIcon />}</div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type=""
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={() => {
            checkUniqueDescription();
          }}
        >
          Save
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <ButtonComponent
          route={""}
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={!viewDetail}
          onClick={() => dispatch(setViewDetail(false))}
          label={"Edit"}
        />

        <ButtonComponent
          route={""}
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={!viewDetail}
          onClick={handleDelete}
          label={"Delete"}
        />

        {/* Cancel Confirmation Modal */}
        {
          <ModalComponent
            show={cancelShow}
            onHide={handleCancelNo}
            title={"Cancel Email Attachment Changes"}
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
            title={"Delete Email Attachment"}
            body={"Please confirm you want to Delete this Email Attachment"}
            handleYES={handleDeleteYes}
            handleNO={handleDeleteNo}
          />
        }

        <Modal show={errorShow} onHide={() => setErrorShow(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 temp-red-color">Delete failed!</Modal.Title>
          </Modal.Header>

          <Modal.Body className="font-14 h-100">{errorMsg}</Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={() => setErrorShow(false)}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default FormFooter;
