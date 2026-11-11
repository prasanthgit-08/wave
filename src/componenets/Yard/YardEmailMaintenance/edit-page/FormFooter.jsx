import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetChanges,
  setChangesCancelled,
  setViewDetail,
  setIsNameUnique,
  setEditFormData,
  setIsEmailUnique,
} from "../../../../redux/YardEmailSlice";
import YardEmailService from "../../../../services/YardEmailService";
import ButtonComponent from "../../../common/Button";
import ModalComponent from "../../../common/ModalComponent";

function FormFooter({ styles }) {
  const { id, yardEmailPKs, pageNumber } = useParams();

  const [showDeleteError, setShowDeleteError] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  const yardFK = useSelector((state) => state.yardEmailReducer.yardFK);
  const name = useSelector((state) => state.yardEmailReducer.name);
  const email = useSelector((state) => state.yardEmailReducer.email);
  const bol = useSelector((state) => state.yardEmailReducer.bol);
  const text = useSelector((state) => state.yardEmailReducer.text);
  const batch = useSelector((state) => state.yardEmailReducer.batch);

  const bolsAsOnePDF = useSelector((state) => state.yardEmailReducer.bolsAsOnePDF);
  const isNameUnique = useSelector((state) => state.yardEmailReducer.isNameUnique);
  const returnEmailBOLs = useSelector((state) => state.yardEmailReducer.returnEmailBOLs);
  const returnTextEmail = useSelector((state) => state.yardEmailReducer.returnTextEmail);
  const isEmailUnique = useSelector((state) => state.yardEmailReducer.isEmailUnique);
  const yardEmailPK = useSelector((state) => state.yardEmailReducer.yardEmailPK);

  const formData = {
    yardEmailPK: yardEmailPK || null,
    yardFK: parseInt(id),
    name,
    email,
    bol,
    text,
    batch: batch,
    bolsAsOnePDF: bolsAsOnePDF,
    returnBOL: returnEmailBOLs,
    returnText: returnTextEmail,
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disableSave, setDisableSave] = useState(true);
  const [saveLoader, setSaveLoader] = useState(false);

  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const viewDetail = useSelector((state) => state.yardEmailReducer.viewDetail);

  const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;

  const handleCancel = () => {
    if (viewDetail === false) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate(`/yard-email-maintenance/${id}/${pageNumber}`);
      toast.success("Changes Cancelled");
    }
  };

  // save validation
  useEffect(() => {
    if (
      !isNameUnique &&
      !isEmailUnique &&
      name !== "" &&
      email !== "" &&
      String(email).match(emailRegex) &&
      (bol || text)
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [bol, email, name, text, isNameUnique, isEmailUnique]);

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    setCancelShow(false);
    dispatch(setViewDetail(true));
    dispatch(setChangesCancelled(true));
    navigate(`/yard-email-maintenance/${id}/${pageNumber}`);
    toast.success("Changes Cancelled");
  };
  const saveRecord = () => {
    setSaveLoader(true);
    YardEmailService.createOrUpdateRecord(formData)

      .then((res) => {
        if (id && yardEmailPK) {
          toast.success("Yard Email Updated");
        } else {
          toast.success("Yard Email Created");
        }
        setSaveLoader(false);

        navigate(`/yard-email-maintenance/${id}/${pageNumber}`);
      })
      .catch((err) => {
        setSaveLoader(false);

        navigate(`/yard-email-maintenance/${id}/${pageNumber}`);
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  const hanldeCheckForm = async (name) => {
    try {
      const res = await YardEmailService.checkNameExist(yardFK, yardEmailPK, name);
      return res.data;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const hanldeCheckEmail = async (email) => {
    try {
      const res = await YardEmailService.checkEmailExist(yardFK, yardEmailPK, email);
      return res.data;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    YardEmailService.deleteRecord(yardEmailPK)
      .then((response) => {
        navigate(`/yard-email-maintenance/${id}/${pageNumber}`);
        toast.success("Yard Email  Deleted");
      })
      .catch((err) => {
        setShowDeleteError(true);
        setDeleteErrorMessage(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      });
    setDeleteShow(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          type=""
          hidden={viewDetail}
          disabled={disableSave}
          onClick={async () => {
            const nameDuplicate = await hanldeCheckForm(name);
            const emailDuplicate = await hanldeCheckEmail(email);

            if (!nameDuplicate && !emailDuplicate) {
              saveRecord();
            } else {
              console.log("Duplicate name or email exists");
            }
          }}
        >
          {saveLoader === true ? (
            <div className="loader-container">
              <div className="loader_YardCheckin"></div>
            </div>
          ) : (
            "Save"
          )}
        </button>

        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={!viewDetail}
          onClick={() => {
            dispatch(setViewDetail(false));

            dispatch(setIsNameUnique(false));
          }}
          label={"Edit"}
        />

        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={!viewDetail}
          onClick={handleDelete}
          label={"Delete"}
        />

        {/* Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Yard Email  Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Yard Email "}
          body={"Please confirm you want to delete this record"}
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
      </div>
    </div>
  );
}

export default FormFooter;
