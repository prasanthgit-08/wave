import React from "react";
import ButtonComponent from "../../common/Button";
import ModalComponent from "../../common/ModalComponent";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetChanges,
  setCodeValid,
  setDescriptionValid,
  setViewDetail,
  toggleChangesCancelled,
} from "../../../redux/SpecialCodesSlice";
import SpecialCodesService from "../../../services/SpecialCodesService";
import { useEffect } from "react";
import LoadingIcon from "../../common/LoadingIcon";
import { Button, Modal } from "react-bootstrap";

const SpecialCodesFormFooter = () => {
  const code = useSelector((state) => state.specialCodesReducer.code);
  const description = useSelector((state) => state.specialCodesReducer.description);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disableSave, setDisableSave] = useState(true);
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const viewDetail = useSelector((state) => state.specialCodesReducer.viewDetail);
  const codesData = useSelector((state) => state.specialCodesReducer.codesData);
  const codeValid = useSelector((state) => state.specialCodesReducer.codeValid);
  const descriptionValid = useSelector((state) => state.specialCodesReducer.descriptionValid);
  const [loader, setLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [checkingCode, setCheckingCode] = useState(false);
  const [checkingDescription, setCheckingDescription] = useState(false);

  //save or update
  const saveOrUpdateSpecialCodes = () => {
    setLoader(true);
    SpecialCodesService.createSpecialCodes(codesData)
      .then((response) => {
        navigate("/special-codes-maintenance");
        if (id) {
          toast.success("Special Code Updated");
        } else {
          toast.success("Special Code Created");
        }
        dispatch(resetChanges());
      })
      .catch((error) => {
        navigate("/special-codes-maintenance");
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

  useEffect(() => {
    // Enable save if all conditions are satisfied
    if (code !== "" && codeValid && description !== "" && descriptionValid) {
      // enable save
      setDisableSave(false);
    } else {
      // disable save
      setDisableSave(true);
    }
  }, [code, codeValid, description, descriptionValid]);

  //cancel
  const handleCancelShow = () => {
    dispatch(setCodeValid(true));
    dispatch(setDescriptionValid(true));
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/special-codes-maintenance");
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    dispatch(setCodeValid(true));
    dispatch(setDescriptionValid(true));
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      toast.success("Changes Cancelled");
      dispatch(toggleChangesCancelled());
    } else {
      navigate("/special-codes-maintenance");
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      toast.success("Changes Cancelled");
    }
  };

  //delete
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    SpecialCodesService.deleteSpecialCodes(id)
      .then((response) => {
        navigate("/special-codes-maintenance");
        toast.success("Special Code Deleted");
        dispatch(resetChanges());
      })
      .catch((error) => {
        setErrorShow(true);
        setErrorMsg(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      });
    setDeleteShow(false);
  };

  const validateAndSave = () => {
    setCheckingCode(true);
    setCheckingDescription(true);
    SpecialCodesService.checkuniquesave(description, code, id)
      .then((response) => {
        if (response.data) {
          setDisableSave(response.data);
        } else {
          saveOrUpdateSpecialCodes();
        }
      })
      .catch((err) => {
        setDisableSave(true);
        setCheckingCode(false);
        setCheckingDescription(false);
      })
      .finally(() => {
        setCheckingCode(false);
        setCheckingDescription(false);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {(loader || checkingCode || checkingDescription) && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={viewDetail === true}
          // disabled={disableSave  || checkingCode || checkingDescription}
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
          onClick={() => dispatch(setViewDetail(false))}
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
          title={"Cancel Special Code Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        {/* {Modal for Delete Confirmation} */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Special Code"}
          body={"Please Confirm you want to Delete this Special Code"}
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

export default SpecialCodesFormFooter;
