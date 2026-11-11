import React from "react";
import ButtonComponent from "../../../../common/Button";
import ModalComponent from "../../../../common/ModalComponent";

import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  setDescriptionValid,
  setObjectKeyValid,
  setViewDetail,
  resetChanges,
  toggleChangesCancelled,
  setDescriptionError,
  setObjectKeyError,
} from "../../../../../redux/ReserveTypesSlice";
import { useEffect } from "react";
import ReserveTypeService from "../../../../../services/ReserveTypeService";
import { Button, Modal } from "react-bootstrap";
import LoadingIcon from "../../../../common/LoadingIcon";
const ReserveTypesFormFooter = () => {
  const objectKey = useSelector((state) => state.reserveTypesReducer.objectKey);
  const description = useSelector((state) => state.reserveTypesReducer.description);
  const required = useSelector((state) => state.reserveTypesReducer.required);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = () => setDeleteReserveType(true);
  const handleDeleteNo = () => setDeleteReserveType(false);
  const [deleteReserveTypePopUp, setDeleteReserveType] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [cancelShow, setCancelShow] = useState(false);
  const viewDetail = useSelector((state) => state.reserveTypesReducer.viewDetail);
  // const reserveTypesData = useSelector((state) => state.reserveTypesReducer.reserveTypesData);
  const objectKeyValid = useSelector((state) => state.reserveTypesReducer.objectKeyValid);
  const descriptionValid = useSelector((state) => state.specialCodesReducer.descriptionValid);
  const descriptionError = useSelector((state) => state.reserveTypesReducer.descriptionError);
  const objectKeyError = useSelector((state) => state.reserveTypesReducer.objectKeyError);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [loading, setLoading] = useState(false);
  //save or update
  const saveOrUpdateReserveTypes = () => {
    setLoading(true);
    ReserveTypeService.createReserveTypes(reserveTypesData)
      .then((response) => {
        navigate("/reserve-types");
        if (id) {
          toast.success("Reserve Type Updated");
        } else {
          toast.success("Reserve Type Created");
        }

        dispatch(resetChanges());
      })
      .catch((error) => {
        navigate("/reserve-types");
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
  const validateAndSave = () => {
    setLoading(true);
    ReserveTypeService.checkuniquesave(description, objectKey, id)
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setDisableSave(response.data);
        } else {
          saveOrUpdateReserveTypes();
        }
      })
      .catch((err) => {
        setLoading(false);
        setDisableSave(true);
      });
  };

  const reserveTypesData = {
    reserveTypePK: id,
    objectKey,
    description,
    required,
  };

  useEffect(() => {
    // Enable save if all conditions are satisfied
    if (objectKey !== "" && objectKeyError && description !== "" && descriptionError) {
      // enable save
      setDisableSave(false);
    } else {
      // disable save
      setDisableSave(true);
    }
  }, [objectKey, objectKeyError, description, descriptionError, required]);

  //cancel
  const handleCancelShow = () => {
    dispatch(setObjectKeyValid(true));
    dispatch(setDescriptionValid(true));
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/reserve-types");
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    dispatch(setObjectKeyValid(true));
    dispatch(setDescriptionValid(true));
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      toast.success("Changes Cancelled");
      dispatch(toggleChangesCancelled());
    } else {
      navigate("/reserve-types");
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      toast.success("Changes Cancelled");
    }
  };

  // handleEdit

  const handleEdit = () => {
    dispatch(setViewDetail(false));
    dispatch(setDescriptionError(true));
    dispatch(setObjectKeyError(true));
  };

  //delete
  const handleDeleteYes = () => {
    setLoading(true);
    ReserveTypeService.deleteReserveTypes(id)
      .then((response) => {
        navigate("/reserve-types");
        toast.success("Reserve Type Deleted");
        dispatch(resetChanges());
      })
      .catch((error) => {
        setErrorShow(true);
        setErrorMsg(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => setLoading(false));
    setDeleteReserveType(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={() => {
            validateAndSave();
          }}
        >
          {" "}
          Save{" "}
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={t("edit.SpecialCodes.page.resources.tab.cancel")}
          type="button"
          onClick={handleCancelShow}
        >
          Cancel
        </button>
        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={t("edit.SpecialCodes.page.resources.tab.edit")}
          hidden={!id || viewDetail === false}
          onClick={handleEdit}
        />

        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={t("edit.SpecialCodes.page.resources.tab.delete")}
          hidden={!id || viewDetail === false}
          onClick={handleDelete}
        />

        {/* {Modal for edit Cancel Confirmation}     */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Reserve Type Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        {/* {Modal for Delete Confirmation} */}
        <ModalComponent
          show={deleteReserveTypePopUp}
          onHide={handleDeleteNo}
          title={"Delete Reserve Type"}
          body={"Please Confirm you want to Delete this Reserve Type"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
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

export default ReserveTypesFormFooter;
