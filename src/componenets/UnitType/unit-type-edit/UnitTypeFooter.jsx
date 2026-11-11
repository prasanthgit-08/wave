import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  resetChanges,
  setFormTypeId,
  setFormTypeInput,
  setIsUnitCodeUnique,
  setViewDetail,
} from "../../../redux/UnitTypeSlice";
import ButtonComponent from "../../common/Button";
import ModalComponent from "../../common/ModalComponent";
import UnitTypeService from "../../../services/UnitTypeService";
import { Button, Modal } from "react-bootstrap";
import LoadingIcon from "../../common/LoadingIcon";

function UnitTypeFooter() {
  const { id, pageNumber } = useParams();

  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [saveLoader, setSaveLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [validationLoader, setValidationLoader] = useState(false);

  const viewDetail = useSelector((state) => state.unitTypeReducer.viewDetail);
  const unitTypePK = useSelector((state) => state.unitTypeReducer.unitTypePK);

  const unitCode = useSelector((state) => state.unitTypeReducer.unitCode);
  const descriptionShort = useSelector((state) => state.unitTypeReducer.descriptionShort);
  const descriptionLong = useSelector((state) => state.unitTypeReducer.descriptionLong);
  const length = useSelector((state) => state.unitTypeReducer.length);
  const overwidth = useSelector((state) => state.unitTypeReducer.overwidth);
  const specialinstruction = useSelector((state) => state.unitTypeReducer.specialinstruction);
  const allowmultiunit = useSelector((state) => state.unitTypeReducer.allowmultiunit);
  const allowonthirtyfive = useSelector((state) => state.unitTypeReducer.allowonthirtyfive);
  const requiresflagsandsigns = useSelector((state) => state.unitTypeReducer.requiresflagsandsigns);
  const requireseld = useSelector((state) => state.unitTypeReducer.requireseld);
  const formTypeInput = useSelector((state) => state.unitTypeReducer.formTypeInput);
  const formInput = useSelector((state) => state.unitTypeReducer.formInput);
  const formTypeId = useSelector((state) => state.unitTypeReducer.formTypeId);
  const formId = useSelector((state) => state.unitTypeReducer.formId);
  const type = useSelector((state) => state.unitTypeReducer.type);
  const isUnitCodeUnique = useSelector((state) => state.unitTypeReducer.isUnitCodeUnique);
  const isDescriptionUnique = useSelector((state) => state.unitTypeReducer.isDescriptionUnique);
  const allowPopup = useSelector((state) => state.unitTypeReducer.allowPopup);
  const allowOnTruckCamperTrailor = useSelector((state) => state.unitTypeReducer.allowOnTruckCamperTrailor);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //starting save funtionality
  const saveRecord = () => {
    setSaveLoader(true);
    UnitTypeService.createOrUpdateRecord(formData)
      .then((res) => {
        navigate(`/unit-type`);
        if (id) toast.success("Unit Type  Updated");
        else toast.success("Unit Type Created");
      })
      .catch((err) => {
        navigate(`/unit-type-edit/${id}/${pageNumber}`);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setSaveLoader(false);
      });
  };
  //ending save functionality.

  // starting cancel functions

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      dispatch(setIsUnitCodeUnique(true));
      dispatch(resetChanges());
      navigate(`/unit-type`);
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(setIsUnitCodeUnique(true));
      toast.success("Changes Cancelled");
    } else {
      navigate(`/unit-type`);
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      dispatch(setIsUnitCodeUnique(true));
      toast.success("Changes Cancelled");
    }
  };

  // ending cancel functions...................................................

  //starting delete functions

  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    setDeleteLoader(true);
    UnitTypeService.deleteUnitTypeRecord(id)
      .then((response) => {
        navigate(`/unit-type`);
        toast.success("Unit Type Deleted");
        dispatch(resetChanges());
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => {
        setDeleteLoader(false);
      });
    setDeleteShow(false);
  };

  const formData = {
    unitTypePK,
    unitCode,
    descriptionShort,
    descriptionLong,
    length,
    overWidth: overwidth,
    overWidthFormTypeFK: formTypeId,
    ptiFormFK: formId,
    allowMultiUnit: allowmultiunit,
    allowOnThirtyFive: allowonthirtyfive,
    requiresFlagsAndSigns: requiresflagsandsigns,
    requiresELD: requireseld,
    allowPopup: allowPopup,
    specialInstruction: specialinstruction,
    towable: type === "Towable",
    motorized: type === "Motorized",
    allowTruckCamper: allowOnTruckCamperTrailor,
  };

  useEffect(() => {
    if (
      unitCode !== "" &&
      descriptionLong !== "" &&
      descriptionShort !== "" &&
      (!overwidth || formTypeId) &&
      formId &&
      isUnitCodeUnique &&
      isDescriptionUnique &&
      length <= 32767
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [
    unitCode,
    isUnitCodeUnique,
    isDescriptionUnique,
    descriptionLong,
    descriptionShort,
    overwidth,
    formTypeId,
    formTypeInput,
    formInput,
    formId,
    length,
  ]);

  const validateAndSave = () => {
    setValidationLoader(true);
    UnitTypeService.checkuniquesave(unitCode, descriptionLong, id)
      .then((response) => {
        if (!response.data) {
          setDisableSave(!response.data);
        } else {
          saveRecord();
        }
      })
      .catch(() => {
        setDisableSave(true);
      })
      .finally(() => setValidationLoader(false));
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {(saveLoader || deleteLoader || validationLoader) && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={() => {
            validateAndSave();
          }}
        >
          Save
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={false}
          onClick={handleCancel}
        >
          Cancel
        </button>

        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={"Edit"}
          hidden={!id || viewDetail === false}
          onClick={() => {
            dispatch(setViewDetail(false));
          }}
        />
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!id || viewDetail === false}
          onClick={handleDelete}
          disabled={""}
        >
          Delete
        </button>

        {/* model Active*/}

        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Unit Type Changes "}
          body={"Please confirm you want to cancel  changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Unit Type"}
          body={"Please confirm you want to Delete this Unit Type"}
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
}

export default UnitTypeFooter;
