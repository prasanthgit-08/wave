import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../../common/ModalComponent";
import { t } from "i18next";
import ButtonComponent from "../../../../common/Button";
import {
  resetChanges,
  resetFields,
  setDescriptionValid,
  setSisterDelayCodeValid,
  setViewDetail,
  setWeather,
  toggleChangesCancelled,
} from "../../../../../redux/DelayUnitCodesSlice";
import { toast } from "react-hot-toast";
import DelayUnitCodesService from "../../../../../services/DelayUnitCodesService";
import { Button, Modal } from "react-bootstrap";
import LoadingIcon from "../../../../common/LoadingIcon";

const DelayUnitCodesFooter = () => {
  const description = useSelector((state) => state.delayedUnitCodesReducer.description);
  const delay = useSelector((state) => state.delayedUnitCodesReducer.delay);
  const damage = useSelector((state) => state.delayedUnitCodesReducer.damage);
  const breakdown = useSelector((state) => state.delayedUnitCodesReducer.breakdown);
  const weather = useSelector((state) => state.delayedUnitCodesReducer.weather);
  const roadType = useSelector((state) => state.delayedUnitCodesReducer.roadType);
  const roadcondition = useSelector((state) => state.delayedUnitCodesReducer.roadcondition);
  const sisterDelayCode = useSelector((state) => state.delayedUnitCodesReducer.sisterDelayCode);
  const viewDetail = useSelector((state) => state.delayedUnitCodesReducer.viewDetail);
  const delayedData = useSelector((state) => state.delayedUnitCodesReducer.delayedData);
  const descriptionValid = useSelector((state) => state.delayedUnitCodesReducer.descriptionValid);
  const sisterDelayCodeValid = useSelector((state) => state.delayedUnitCodesReducer.sisterDelayCodeValid);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disableSave, setDisableSave] = useState(true);
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [loader, setLoader] = useState(false);
  const [validationLoader, setValidationLoader] = useState(false);

  const saveOrEditDelayedCode = () => {
    setLoader(true);
    DelayUnitCodesService.saveOrEditDelayCode(delayedData)
      .then((response) => {
        dispatch(resetChanges());
        navigate("/delay-unit-codes-listing");
        if (id) {
          toast.success("Delayed Unit Code Updated");
        } else {
          toast.success("Delayed Unit Code Created");
        }
      })
      .catch((error) => {
        navigate("/delay-unit-codes-listing");
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
        dispatch(resetChanges());
        setLoader(false);
      });
  };

  useEffect(() => {
    if (
      description !== "" &&
      descriptionValid &&
      (delay || damage || breakdown || weather || roadType || roadcondition) &&
      (sisterDelayCode === "" ||
        sisterDelayCode === null ||
        sisterDelayCode === undefined ||
        (sisterDelayCode !== "" && sisterDelayCodeValid))
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [
    description,
    descriptionValid,
    delay,
    damage,
    breakdown,
    weather,
    roadType,
    roadcondition,
    sisterDelayCode,
    sisterDelayCodeValid,
  ]);

  //cancel
  const handleCancelShow = () => {
    dispatch(setDescriptionValid(true));
    dispatch(setSisterDelayCodeValid(true));
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(resetFields());
      dispatch(setViewDetail(false));
      navigate("/delay-unit-codes-listing");
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    dispatch(setDescriptionValid(true));
    dispatch(setSisterDelayCodeValid(true));
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      toast.success("Changes Cancelled");
      dispatch(toggleChangesCancelled());
    } else {
      navigate("/delay-unit-codes-listing");
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      toast.success("Changes Cancelled");
    }
  };

  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    setLoader(true);
    DelayUnitCodesService.deleteDelayedCode(id)
      .then((response) => {
        navigate("/delay-unit-codes-listing");
        toast.success("Delayed Unit Code Deleted");
        dispatch(resetChanges());
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => setLoader(false));
    setDeleteShow(false);
  };

  const validateAndSave = () => {
    setValidationLoader(true);
    DelayUnitCodesService.checkuniquesave(description, sisterDelayCode, id)
      .then((response) => {
        if (!response.data) {
          setDisableSave(!response.data);
        } else {
          saveOrEditDelayedCode();
        }
      })
      .catch((err) => {
        setDisableSave(true);
      })
      .finally(() => setValidationLoader(false));
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {(loader || validationLoader) && <LoadingIcon />}
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
          label={t("cancel.button")}
          type="button"
          onClick={handleCancelShow}
        >
          Cancel
        </button>
        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={t("edit.button")}
          hidden={!id || viewDetail === false}
          onClick={() => dispatch(setViewDetail(false))}
        />

        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={t("delete.button")}
          hidden={!id || viewDetail === false}
          onClick={handleDelete}
        />

        {/* {Modal for edit Cancel Confirmation}     */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Delayed Unit Code Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        {/* {Modal for Delete Confirmation} */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Delayed Unit Code"}
          body={"Please confirm you want to Delete this Delayed Unit Code"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />

        <Modal show={errorShow} onHide={() => setErrorShow(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 temp-red-color">Delete failed!</Modal.Title>
          </Modal.Header>

          <Modal.Body className="font-14 h-100">{errorMsg}</Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setErrorShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
export default DelayUnitCodesFooter;
