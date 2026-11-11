import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../../../common/Button";
import ModalComponent from "../../../../common/ModalComponent";
import {
  setDisableSave,
  setDuplicateDescription,
  setFormData,
  setViewDetail,
} from "../../../../../redux/EmailSenderTypesSlice";
import EmailSenderTypesService from "../../../../../services/EmailSenderTypesService";
import LoadingIcon from "../../../../common/LoadingIcon";

const FormFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [showDependency, setShowDependency] = useState(false);
  const [deleteDependency, setDeleteDependency] = useState("");
  const [showDeleteError, setShowDeleteError] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  const viewDetail = useSelector((state) => state.emailSenderTypes.viewDetail);
  const disableSave = useSelector((state) => state.emailSenderTypes.disableSave);
  const emailSenderTypes = useSelector((state) => state.emailSenderTypes.emailSenderTypes);
  const [loader, setLoader] = useState(false);
  const [validationLoader, setValidationLoader] = useState(false);

  const validateAndSave = () => {
    setValidationLoader(true);
    EmailSenderTypesService.checkDuplicateDescription(emailSenderTypes.description, id)
      .then((response) => {
        if (response.data) {
          dispatch(setDisableSave(response.data));
        } else {
          handleSave();
        }
      })
      .catch((err) => {
        dispatch(setDisableSave(true));
      })
      .finally(() => {
        setValidationLoader(false);
      });
  };

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);

      dispatch(setViewDetail(false));
      navigate("/email-sender-types");
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(setDuplicateDescription(false));
      toast.success("Changes Cancelled");
    } else {
      navigate("/email-sender-types");
      dispatch(setViewDetail(false));

      toast.success("Changes Cancelled");
    }
  };

  const handleDelete = () => {
    setLoader(true);
    EmailSenderTypesService.checkDeleteDependency(id)
      .then((response) => {
        const { data } = response;
        if (data) {
          setDeleteDependency(data?.trim());
          setShowDependency(true);
        } else {
          setDeleteShow(true);
        }
      })
      .catch((err) => {
        setDeleteShow(true);
      })
      .finally(() => setLoader(false));
  };
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    setLoader(true);
    EmailSenderTypesService.deleteEmailSenderType(id)
      .then((response) => {
        navigate("/email-sender-types");
        toast.success("Email Sender Type Deleted");
        dispatch(setFormData(null));
      })
      .catch((err) => {
        setShowDeleteError(true);
        setDeleteErrorMessage(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => setLoader(false));
    setDeleteShow(false);
  };

  const handleSave = () => {
    setLoader(true);
    EmailSenderTypesService.saveEmailSenderType(emailSenderTypes)
      .then((res) => {
        navigate("/email-sender-types");
        if (id) toast.success("Email Sender Type Updated");
        else toast.success("Email Sender Type Created");
        dispatch(setFormData(null));
      })
      .catch((err) => {
        navigate("/email-sender-types");
        toast.error("Something went wrong");
      })
      .finally(() => setLoader(false));
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type=""
          hidden={viewDetail}
          disabled={disableSave}
          onClick={() => validateAndSave()}
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
          hidden={!id || !viewDetail}
          onClick={() => dispatch(setViewDetail(false))}
          label={"Edit"}
        />

        <ButtonComponent
          route={""}
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={!id || !viewDetail}
          onClick={handleDelete}
          label={"Delete"}
        />

        {/* Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Email Sender Type Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        {/* Delete Dependency Model */}
        <ModalComponent
          show={showDependency}
          onHide={() => setShowDependency(false)}
          className="modalMinWidth600px"
          title={"Dependency found in Email Formats Table"}
          body={`Sender Type cannot be deleted, it is currently in use for the Email Format "${deleteDependency}"`}
          okayButton
          showError
          handleYES={() => setShowDependency(false)}
        />

        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Email Sender Type"}
          body={"Please confirm you want to Delete this Email Sender Type"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />

        {/* Delete Error */}
        <ModalComponent
          show={showDeleteError}
          onHide={() => setShowDeleteError(false)}
          title={"Delete failed!"}
          body={deleteErrorMessage}
          showError
          closeButton
        />

        {(loader || validationLoader) && <LoadingIcon />}
      </div>
    </div>
  );
};

export default FormFooter;
