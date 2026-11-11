import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  setChangeColor,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchCriteria,
  setSearchTerms,
  setSelectedStatus,
  setViewDetail,
  setChangesCancelled,
  resetChanges,
  setActive,
  setAvailable,
  setDriverFK,
  setSearchCriteriaForAdd,
  setSearchTermForAdd,
} from "../../../../redux/DriverEquipmentSlice";
import EquipmentService from "../../../../services/EquipmentService";
import ButtonComponent from "../../../common/Button";
import { Colors } from "../../../../styles/values/colors";
import ModalComponent from "../../../common/ModalComponent";
import { Button, Modal } from "react-bootstrap";
import LoadingIcon from "../../../common/LoadingIcon";

function AddEquipmentFooter() {
  const params = useParams();
  const id = params.id;
  const driverId = params.driverId;
  const [activeShow, setActiveShow] = useState(false);
  const currentURL = window.location.pathname;

  const selectedEquipmentStatus = useSelector(
    (state) => state.driverEquipmentReducer.selectedEquipmentStatus
  );

  const status = selectedEquipmentStatus;
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);

  const viewDetail = useSelector((state) => state.driverEquipmentReducer.viewDetail);
  const equipmentPK = useSelector((state) => state.driverEquipmentReducer.equipmentPK);
  const equipmentNumber = useSelector((state) => state.driverEquipmentReducer.equipmentNumber);
  const description = useSelector((state) => state.driverEquipmentReducer.description);
  const serialNumber = useSelector((state) => state.driverEquipmentReducer.serialNumber);
  const assignedToDriver = useSelector((state) => state.driverEquipmentReducer.assignedToDriver);
  const assignToUnit = useSelector((state) => state.driverEquipmentReducer.assignToUnit);
  const requireReserve = useSelector((state) => state.driverEquipmentReducer.requireReserve);
  const expirationDate = useSelector((state) => state.driverEquipmentReducer.expirationDate);
  const blockDispatch = useSelector((state) => state.driverEquipmentReducer.blockDispatch);
  const driverFK = useSelector((state) => state.driverEquipmentReducer.driverFK);
  const UnitPK = useSelector((state) => state.driverEquipmentReducer.unitPK);
  const active = useSelector((state) => state.driverEquipmentReducer.active);
  const available = useSelector((state) => state.driverEquipmentReducer.available);
  const deposit = useSelector((state) => state.driverEquipmentReducer.deposit);
  const depositAmount = useSelector((state) => state.driverEquipmentReducer.depositAmount);
  const isPlate = useSelector((state) => state.driverEquipmentReducer.isPlate);
  const plateState = useSelector((state) => state.driverEquipmentReducer.plateState);
  const isPlateStateValid = useSelector((state) => state.driverEquipmentReducer.isPlateStateValid);
  const isDescriptionValid = useSelector((state) => state.driverEquipmentReducer.isDescriptionValid);
  const isEquipmentUnique = useSelector((state) => state.driverEquipmentReducer.isEquipmentUnique);
  const isAnEld = useSelector((state) => state.driverEquipmentReducer.isAnEld);
  const reserveId = useSelector((state) => state.driverEquipmentReducer.reserveId);
  const editFormData = useSelector((state) => state.driverEquipmentReducer.editFormData);
  const pageNumber = useSelector((state) => state.driverEquipmentReducer.pageNumber);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //starting save funtionality
  const addRecord = () => {
    setLoading(true);
    EquipmentService.addEquipmentrecord(formData)
      .then((res) => {
        navigate(`/assigned-equipment/${driverId}`);
        toast.success("Equipment  Added");
      })
      .catch((err) => {
        navigate(`/assigned-equipment/${driverId}`);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const removeRecord = () => {
    setLoading(true);
    EquipmentService.removeEquipmentrecord(formData)
      .then((res) => {
        const data = res.data;
        if (data) {
          navigate(`/assigned-equipment/${driverId}`);
          toast.success("Equipment  Removed");
        } else {
          navigate(`/assigned-equipment/${driverId}`);
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        navigate(`/assigned-equipment/${driverId}`);
        toast.error("Something went wrong");
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      if (currentURL === `/assigned-equipment/${driverId}`) {
        dispatch(setSearchTermForAdd(""));
        dispatch(setSearchCriteriaForAdd("Biginning"));
      }
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      if (currentURL === `/assigned-equipment/${driverId}`) {
        dispatch(setSearchTermForAdd(""));
        dispatch(setSearchCriteriaForAdd("Biginning"));
      }
      navigate(`/assigned-equipment/${driverId}`);
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
      navigate(`/assigned-equipment/${driverId}`);
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      toast.success("Changes Cancelled");
    }
  };

  useEffect(() => {
    if (
      //save enabling
      !isEquipmentUnique &&
      id !== "" &&
      equipmentNumber !== "" &&
      description !== "" &&
      isDescriptionValid === false &&
      (!blockDispatch || expirationDate !== "") &&
      (!isPlate || (plateState !== "" && isPlateStateValid))
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [
    equipmentNumber,
    description,
    isDescriptionValid,
    isPlateStateValid,
    blockDispatch,
    expirationDate,
    isEquipmentUnique,
    id,
    isPlate,
    plateState,
  ]);

  const formData = {
    equipmentPK: equipmentPK,
    equipmentNumber: equipmentNumber,
    description: description,
    serialNumber: serialNumber,
    requireReserve: requireReserve,
    blockDispatch: blockDispatch,
    expirationDate: expirationDate,
    deposit: deposit,
    active: active,
    depositAmount: depositAmount,
    isPlate: isPlate,
    plateState: plateState,
    assignedToDriver: assignedToDriver,
    driverFK: driverId,
    available: available,
    assignToUnit: assignToUnit,
    isELD: isAnEld,
    reserveFK: reserveId || editFormData?.reserveFK,
  };
  useEffect(() => {
    dispatch(setDriverFK(driverId));
  }, [dispatch, driverId]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap"></div>

      <div className="d-flex align-items-center flex-wrap">
        {currentURL.includes("add-driver-equipment-content") && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={() => addRecord()}
          >
            Add
          </button>
        )}
        {currentURL.includes("view-driver-equipment") && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={() => removeRecord()}
          >
            Remove
          </button>
        )}

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={false}
          onClick={handleCancel}
        >
          Cancel
        </button>
        {/* model Active*/}

        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Equipment Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        {/* model Active*/}
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
        {loading && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddEquipmentFooter;
