import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetDriverReserves,
  setActiveButton,
  setDisableSave,
  setDriverReserves,
  setFormData,
  setViewDetail,
} from "../../../../../redux/DriverReserveSlice";
import toast from "react-hot-toast";
import ModalComponent from "../../../../common/ModalComponent";
import DriverReserveService from "../../../../../services/DriverReserveService";
import { Button, Modal } from "react-bootstrap";
import ButtonComponent from "../../../../common/Button";
import { Colors } from "../../../../../styles/values/colors";
import { PermissionKeyGeneratorUtil } from "../../../../../utils/PermissionKeyGeneratorUtil";

function DriverRserveFooter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, driverFK } = useParams();
  const [cancelShow, setCancelShow] = useState(false);
  const [activateShow, setActivateShow] = useState(false);
  const [deactivateShow, setDeactivateShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [showDependency, setShowDependency] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteDependency, setDeleteDependency] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [deleteDriverReserve, setDeleteDriverReserve] = useState(false);
  const [userNotPermitted, setUserNotPermitted] = useState(false);
  const [isAjustEnable, setIsAjustEnable] = useState(false);

  const viewDetail = useSelector((state) => state.driverReserveReducer.viewDetail);
  const disableSave = useSelector((state) => state.driverReserveReducer.disableSave);
  const overrideAmounts = useSelector((state) => state.driverReserveReducer.overrideAmounts);
  const restricted = useSelector((state) => state.driverReserveReducer.restricted);
  const driverReserves = useSelector((state) => state.driverReserveReducer.driverReserves);
  const driverActive = useSelector((state) => state.driverReserveReducer.driverActive);
  const restrictedReserve = useSelector((state) => state.driverReserveReducer.restrictedReserve);
  const requiredReserve = useSelector((state) => state.driverReserveReducer.requiredReserve);
  const activeButton = useSelector((state) => state.driverReserveReducer.activeButton);
  const percentageRequired = useSelector((state) => state.driverReserveReducer.percentageRequired);
  const mileageRequired = useSelector((state) => state.driverReserveReducer.mileageRequired);
  const duplicateDescription = useSelector((state) => state.driverReserveReducer.duplicateDescription);
  const newRestricted = useSelector((state) => state.driverReserveReducer.newRestricted);

  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermission = PermissionKeyGeneratorUtil("driverreserves", "edit");
  // const objectKey="HRZN:DRVRSV:NEW";`
  const objectKey = PermissionKeyGeneratorUtil("driverreserves", "edit");

  const saveRecord = () => {
    setLoading(true);
    DriverReserveService.saveDriverReserve(driverReserves)
      .then((response) => {
        navigate(`/driver-reserve-main/${driverFK}`);
        if (id) {
          toast.success("Driver Reserve updated");
        } else {
          toast.success("Driver Reserve created");
        }
      })
      .catch((error) => {
        navigate(`/driver-reserve-main/${driverFK}`);

        let msg = "";
        if (error.response) {
          msg = "Something went wrong !! Failed to save the record !!";
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

  /**
   * API call for fetching a single record
   */
  const fetchDriverReserveData = () => {
    setLoading(true);
    DriverReserveService.getDriverReserve(id)
      .then((response) => {
        dispatch(setFormData(response.data));
        dispatch(setViewDetail(true));
      })
      .catch((err) => {
        navigate(`/driver-reserve-main/${driverFK}`);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    if (id) {
      fetchDriverReserveData();
      getAdjustButtonFlag();
    }
  }, []);

  /**
   * API call for getting the enable adjustflag
   */
  const getAdjustButtonFlag = () => {
    const payload = {
      objectKey: objectKey,
      driverReservePK: id,
    };
    DriverReserveService.getAdjustButtonFlag(payload)
      .then((response) => {
        const enableFlag = response.data?.[0]?.EnableFlag;
        setIsAjustEnable(enableFlag);
      })
      .catch((err) => {
        navigate(`/driver-reserve-main/${driverFK}`);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (
      ((((!duplicateDescription && percentageRequired && Number(driverReserves?.deductionPercentage) > 0) ||
        (!duplicateDescription && mileageRequired && Number(driverReserves?.deductionMileageRate) > 0.0) ||
        (!percentageRequired && !mileageRequired)) &&
        ((!percentageRequired && !mileageRequired) ||
          (!newRestricted && Number(driverReserves?.amountToBeReserved) > 0))) ||
        (newRestricted && driverReserves?.reserveFK)) &&
      driverReserves?.reserveFK !== null
    ) {
      dispatch(setDisableSave(false));
    } else {
      dispatch(setDisableSave(true));
    }
  }, [percentageRequired, mileageRequired, driverReserves, duplicateDescription, newRestricted]);

  const activateUsers = () => {
    setActivateShow(false);
    setLoading(true);
    DriverReserveService.activateDriverReserve(
      id,
      driverReserves?.driverId,
      driverReserves?.amountToBeReserved
    )
      .then((response) => {
        toast.success("Driver Reserve Activated");
        fetchDriverReserveData();
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const deactivateUsers = () => {
    setDeactivateShow(false);
    setLoading(true);
    DriverReserveService.deactivateDriverReserve(
      id,
      driverReserves?.driverId,
      driverReserves?.amountToBeReserved
    )
      .then((response) => {
        toast.success("Driver Reserve Deactivated");
        fetchDriverReserveData();
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate(`/driver-reserve-main/${driverFK}`);
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      toast.success("Changes Cancelled");
    } else {
      navigate(`/driver-reserve-main/${driverFK}`);
      dispatch(setViewDetail(false));
      dispatch(setDriverReserves(null));
      toast.success("Changes Cancelled");
    }
  };

  const handleActivateClose = () => {
    if (driverReserves?.active) {
      setDeactivateShow(false);
    } else {
      setActivateShow(false);
    }
  };

  const handleActivateShow = () => {
    if (driverReserves?.active) {
      setDeactivateShow(true);
    } else {
      setActivateShow(true);
    }
  };

  const handleActiveSave = (e) => {
    e.preventDefault();
    if (driverReserves?.active) {
      const updatedReserve = { ...driverReserves, active: false };
      deactivateUsers();
      dispatch(setDriverReserves(updatedReserve));
    } else {
      const updatedReserve = { ...driverReserves, active: true };
      activateUsers();
      dispatch(setDriverReserves(updatedReserve));
    }
  };

  const handleActiveYes = () => {
    if (driverReserves?.active) {
      setDeactivateShow(false);
    } else {
      setActivateShow(false);
    }
  };

  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    setLoading(true);
    setDeleteShow(false);
    DriverReserveService.deleteDriverReserve(id)
      .then((response) => {
        navigate(`/driver-reserve-main/${driverFK}`);
        toast.success("Driver Reserve Deleted");
      })
      .catch((error) => {
        setErrorShow(true);
        setErrorMsg(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => setLoading(false));
    setDeleteDriverReserve(false);
  };

  useEffect(() => {
    if (deniedPermissions) {
      setUserNotPermitted(deniedPermissions.includes(editPermission));
    }
    return () => {
      dispatch(setFormData(null));
    };
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={!viewDetail}
          disabled={!isAjustEnable}
          onClick={() => {
            navigate(`/driver-reserve-adjustment/${driverFK}/${id}`);
          }}
        >
          Adjust
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={!viewDetail}
          disabled={
            driverActive || requiredReserve || (!requiredReserve && restrictedReserve && userNotPermitted)
          }
          onClick={handleActivateShow}
          style={!driverReserves?.active ? { backgroundColor: Colors.red } : { backgroundColor: "" }}
        >
          Active
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={() => {
            saveRecord();
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

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={!viewDetail}
          disabled={!overrideAmounts ? (restricted && !userNotPermitted ? false : true) : false}
          onClick={() => {
            dispatch(setViewDetail(false));
          }}
        >
          Edit
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={!viewDetail}
          onClick={handleDelete}
        >
          Delete
        </button>

        {/* cancel model for save*/}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Driver Reserves Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        <ModalComponent
          show={activateShow}
          onHide={handleActivateClose}
          title={"Activate Driver Reserve"}
          body={"Please confirm you want to Activate this Driver Reserve"}
          handleYES={handleActiveSave}
          handleNO={handleActivateClose}
        />

        <ModalComponent
          show={deactivateShow}
          onHide={handleActivateClose}
          title={"Deactivate Driver Reserve"}
          body={"Please confirm you want to deactivate this Driver Reserve"}
          handleYES={handleActiveSave}
          handleNO={handleActivateClose}
        />

        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Driver Reserve"}
          body={"Please confirm you want to Delete this Driver Reserve"}
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
              OK
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

export default DriverRserveFooter;
