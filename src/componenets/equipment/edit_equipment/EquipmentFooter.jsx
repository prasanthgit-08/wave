import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  resetChanges,
  setChangesCancelled,
  setViewDetail,
  setActive,
  setInputfields,
  setAvailable,
  setIsPlateStateValid,
  setIsEquipmentUnique,
} from "../../../redux/EquipmentsSlice";
import EquipmentService from "../../../services/EquipmentService";
import { Colors } from "../../../styles/values/colors";
import ButtonComponent from "../../common/Button";
import ModalComponent from "../../common/ModalComponent";
import { Button, Modal } from "react-bootstrap";
import LoadingIcon from "../../common/LoadingIcon";

function EquipmentFooter() {
  const { id, pageNumber } = useParams();
  const [activeShow, setActiveShow] = useState(false);

  const selectedEquipmentStatus = useSelector((state) => state.equipmentReducer.selectedEquipmentStatus);

  const status = selectedEquipmentStatus;
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [saveLoader, setSaveLoader] = useState(false);

  const viewDetail = useSelector((state) => state.equipmentReducer.viewDetail);
  const equipmentPK = useSelector((state) => state.equipmentReducer.equipmentPK);
  const equipmentNumber = useSelector((state) => state.equipmentReducer.equipmentNumber);
  const description = useSelector((state) => state.equipmentReducer.description);
  const serialNumber = useSelector((state) => state.equipmentReducer.serialNumber);
  const assignedToDriver = useSelector((state) => state.equipmentReducer.assignedToDriver);
  const assignToUnit = useSelector((state) => state.equipmentReducer.assignToUnit);
  const requireReserve = useSelector((state) => state.equipmentReducer.requireReserve);
  const expirationDate = useSelector((state) => state.equipmentReducer.expirationDate);
  const blockDispatch = useSelector((state) => state.equipmentReducer.blockDispatch);
  const driverFK = useSelector((state) => state.equipmentReducer.driverFK);
  const UnitPK = useSelector((state) => state.equipmentReducer.unitPK);
  const active = useSelector((state) => state.equipmentReducer.active);
  const editFormData = useSelector((state) => state.equipmentReducer.editFormData);
  const available = useSelector((state) => state.equipmentReducer.available);
  const deposit = useSelector((state) => state.equipmentReducer.deposit);
  const depositAmount = useSelector((state) => state.equipmentReducer.depositAmount);
  const isPlate = useSelector((state) => state.equipmentReducer.isPlate);
  const plateState = useSelector((state) => state.equipmentReducer.plateState);
  const isPlateStateValid = useSelector((state) => state.equipmentReducer.isPlateStateValid);
  const isDescriptionValid = useSelector((state) => state.equipmentReducer.isDescriptionValid);
  const isEquipmentUnique = useSelector((state) => state.equipmentReducer.isEquipmentUnique);
  const isAnEld = useSelector((state) => state.equipmentReducer.isAnEld);
  const reserveId = useSelector((state) => state.equipmentReducer.reserveId);
  const expirationDateValid = useSelector((state) => state.equipmentReducer.expirationDateValid);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //starting save funtionality
  const saveRecord = () => {
    setSaveLoader(true);
    EquipmentService.createOrUpdateRecord(formData)
      .then((res) => {
        navigate(`/equipment-maintenance`);
        if (id) toast.success("Equipment  Updated");
        else toast.success("Equipment  Created");
        setSaveLoader(false);
      })
      .catch((err) => {
        navigate(`/equipment-maintenance`);
        toast.error("Something went wrong");
        setSaveLoader(false);
      });
  };
  //ending save functionality...........................................

  // starting cancel functions

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate(`/equipment-maintenance`);
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
      navigate(`/equipment-maintenance`);
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      toast.success("Changes Cancelled");
    }
    // dispatch(resetChanges());
  };

  // ending cancel functions...................................................

  //starting delete functions

  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    EquipmentService.deleteRecord(id)
      .then((response) => {
        if (response.data === false || response?.data === false) {
          setErrorShow(true);
          setErrorMsg(response?.errorMsg || "Something went wrong!! Failed to delete!!");
          console.error(response?.errorMsg || "Something went wrong!! Failed to delete!!");
          return;
        }

        navigate(`/equipment-maintenance`);
        toast.success("Equipment Deleted");
        dispatch(resetChanges());
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err?.response?.data?.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(err?.response?.data?.errorMsg || "Something went wrong!! Failed to delete!!");
      });

    setDeleteShow(false);
  };
  //end delete functions..............................................

  //  starting active and deactive button functioning ................
  const activateEquipments = () => {
    let id = formData.equipmentPK;
    setSaveLoader(true);
    EquipmentService.activateEquipment(id)
      .then((response) => {
        setActiveShow(false);
        dispatch(setActive(true));

        dispatch(setAvailable(true));
        toast.success("Equipment Activated");
      })
      .catch((error) => {
        console.log("error.............");
        // dispatch(setAvailable(false))
      })
      .finally(() => {
        setSaveLoader(false);
      });
  };

  const deactivateEquipments = () => {
    let id = equipmentPK;
    setSaveLoader(true);
    EquipmentService.deactivateEquipment(id)
      .then((response) => {
        setActiveShow(false);
        dispatch(setActive(false));
        dispatch(setAvailable(false));
        toast.success("Equipment Deactivated");
      })
      .catch((error) => {})
      .finally(() => {
        setSaveLoader(false);
      });
  };

  const handleActiveClose = () => setActiveShow(false);
  const handleActiveShow = () => setActiveShow(true);

  const handleActiveSave = (e) => {
    e.preventDefault();
    if (active === true) {
      deactivateEquipments();
      dispatch(setAvailable(false));
    } else {
      activateEquipments();
      dispatch(setAvailable(true));
    }
  };

  const hanldeCheckForm = async (equipmentNumber) => {
    try {
      const res = await EquipmentService.checkEquipmentExist(equipmentNumber, id);
      return res.data;
    } catch (err) {
      console.log(err);
      return true;
    }
  };

  const isDepositAmountInvalid = (value) => {
    if (value === "." || value.toString().endsWith(".")) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (
      !isEquipmentUnique &&
      id !== "" &&
      equipmentNumber !== "" &&
      description !== "" &&
      isDescriptionValid === false &&
      (!blockDispatch || expirationDate !== "") &&
      (!isPlate || (plateState !== "" && isPlateStateValid)) &&
      !(requireReserve && !reserveId) &&
      expirationDateValid &&
      !isDepositAmountInvalid(depositAmount)
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
    requireReserve,
    reserveId,
    expirationDateValid,
    depositAmount,
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
    driverFK: driverFK,
    available: available,
    assignToUnit: assignToUnit,
    isELD: isAnEld,
    reserveFK: reserveId,
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {saveLoader && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={() => {
            navigate(`/equipment-maintenance-history/${id}`);
          }}
          hidden={!id || viewDetail === false}
        >
          History
        </button>
      </div>

      <div className="d-flex align-items-center flex-wrap">
        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={"Active"}
          hidden={!id || status === "InComplete" || viewDetail === false}
          onClick={handleActiveShow}
          // Only show red once the record has loaded; active is reset to false while it reloads, which caused a red flash
          style={active === false && editFormData ? { backgroundColor: Colors.red } : { backgroundColor: "" }}
        />
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={async () => {
            const isEquipmentExist = await hanldeCheckForm(equipmentNumber);
            if (!isEquipmentExist) {
              saveRecord();
            }
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
            dispatch(setIsPlateStateValid(true));
          }}
        />
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!id || viewDetail === false}
          onClick={handleDelete}
        >
          Delete
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
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Record"}
          body={"Please confirm you want to Delete this Equipment Item"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
        {/* model Active*/}
        <ModalComponent
          show={activeShow}
          onHide={handleActiveClose}
          title={active === true ? "Deactivate Equipment" : "Activate Equipment"}
          body={
            active === true
              ? " Please confirm you want to Deactivate this Equipment"
              : " Please confirm you want to Activate this Equipment"
          }
          handleYES={handleActiveSave}
          handleNO={handleActiveClose}
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

export default EquipmentFooter;
