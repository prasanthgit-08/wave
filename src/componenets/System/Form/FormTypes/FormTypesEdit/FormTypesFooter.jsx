import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ModalComponent from "../../../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FormTypesService from "../../../../../services/FormTypesService";
import toast from "react-hot-toast";
import {
  resetChanges,
  setViewDetail,
  setChangesCancelled,
  setIsDescriptionUnique,
  setIsObjectKeyUnique,
} from "../../../../../redux/FormTypesSlice";
import LoadingIcon from "../../../../common/LoadingIcon";

function FormTypesFooter() {
  const { id, pageNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const objectKey = useSelector((state) => state.formTypes.objectKey);
  const description = useSelector((state) => state.formTypes.description);
  const formTypePK = useSelector((state) => state.formTypes.formTypePK);
  const formDescriptionId = useSelector((state) => state.formTypes.formDescriptionId);
  const isDescriptionUnique = useSelector((state) => state.formTypes.isDescriptionUnique);
  const isObjectKeyUnique = useSelector((state) => state.formTypes.isObjectKeyUnique);
  const viewDetail = useSelector((state) => state.formTypes.viewDetail);
  const [disableSave, setDisableSave] = useState(true);
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [validationLoader, setValidationLoader] = useState(false);

  const formTypeData = {
    formTypePK,
    objectKey,
    description,
    formFK: formDescriptionId,
  };

  const handleCheckUniqueDescription = () => {
    setValidationLoader(true);
    FormTypesService.checkUniqueDescription(id, description)
      .then((res) => {
        dispatch(setIsDescriptionUnique(res.data));
        if (res.data) {
          handleCheckUniqueObjectKey();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setValidationLoader(false));
  };
  const handleCheckUniqueObjectKey = () => {
    setLoader(true);
    FormTypesService.checkUniqueObjectkey(id, objectKey)
      .then((res) => {
        dispatch(setIsObjectKeyUnique(res.data));
        if (res.data) {
          saveOrEditFormType();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoader(false));
  };

  const handleUnqueCheque = () => {
    handleCheckUniqueDescription();
  };

  const saveOrEditFormType = () => {
    setValidationLoader(true);
    FormTypesService.saveOrEditFormType(formTypeData)
      .then((response) => {
        setValidationLoader(false);
        navigate("/form-types");
        if (id) {
          toast.success("Form Type Updated");
        } else {
          toast.success("Form Type Created");
        }
        dispatch(resetChanges());
      })
      .catch((error) => {
        setValidationLoader(false);
        navigate("/form-types");
        let msg = "";
        if (error.response) {
          msg = error.response.data.errorMsg;
        }
        if (msg === null || msg === "" || msg === undefined) {
          msg = "Something went wrong !! Failed to save the record !!";
        }
        toast.error(msg);
      });
  };

  useEffect(() => {
    if (
      objectKey !== "" &&
      description !== "" &&
      formDescriptionId &&
      isDescriptionUnique &&
      isObjectKeyUnique
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [objectKey, description, formDescriptionId, isDescriptionUnique, isObjectKeyUnique]);

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      dispatch(setIsDescriptionUnique(true));
      dispatch(setIsObjectKeyUnique(true));
      navigate("/form-types");
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    dispatch(setIsDescriptionUnique(true));
    dispatch(setIsObjectKeyUnique(true));
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(setChangesCancelled(true));
      toast.success("Changes Cancelled");
    } else {
      navigate("/form-types");
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      toast.success("Changes Cancelled");
    }
  };

  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    setLoader(true);
    FormTypesService.deleteFormType(id)
      .then((response) => {
        setLoader(false);
        navigate("/form-types");
        toast.success("Form Type Deleted");
        dispatch(resetChanges);
      })
      .catch((err) => {
        setErrorShow(true);
        setLoader(false);
        setErrorMsg(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        navigate(`/form-types/${id}/${pageNumber}`);
      });
    setDeleteShow(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={() => {
            handleUnqueCheque();
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
            title={"Cancel Form Type Changes"}
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
            title={"Delete Form Type"}
            body={"Please confirm you want to Delete this Form Type"}
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

        {(loader || validationLoader) && <LoadingIcon />}
      </div>
    </div>
  );
}

export default FormTypesFooter;
