import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../../common/ModalComponent";
import { setDispatchLoading, setViewDetail } from "../../../../../redux/DriverDispatchHoldSlice";
import DriverDispatchHoldsService from "../../../../../services/DriverDispatchHoldsService";
import { PermissionKeyGeneratorUtil } from "../../../../../utils/PermissionKeyGeneratorUtil";

const FormFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { driverId, id } = useParams();
  const [cancelShow, setCancelShow] = useState(false);
  const [editEnabled, setEditEnabled] = useState(false);
  const [checkDispatcher, setCheckDispatcher] = useState(false);

  const [disableEdit, setDisableEdit] = useState(false);
  const [disableRestricted, setDisableRestricted] = useState(false);
  const [disableDispatch, setDisableDispatch] = useState(false);

  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermission = PermissionKeyGeneratorUtil("DRIVERDISPATCHHOLD", "EDT");
  const supervisorPermisson = PermissionKeyGeneratorUtil("USER", "SUPPR");
  const restrictedPermission = PermissionKeyGeneratorUtil("DRIVERDISPATCHHOLD", "RSTPM");
  const dispatchPermission = PermissionKeyGeneratorUtil("DRIVERDISPATCHHOLD", "DSPPM");

  const viewDetail = useSelector((state) => state.driverDispatchHold.viewDetail);
  const disableSave = useSelector((state) => state.driverDispatchHold.disableSave);
  const driverDispatchHold = useSelector((state) => state.driverDispatchHold.driverDispatchHold);
  const maintenancePgm = useSelector((state) => state.driverDispatchHold.maintenancePgm);
  const restricted = useSelector((state) => state.driverDispatchHold.restricted);
  const dispatchers = useSelector((state) => state.driverDispatchHold.dispatchers);
  const formData = useSelector((state) => state.driverDispatchHold.formData);
  const dispatchLoading = useSelector((state) => state.driverDispatchHold.dispatchLoading);
  const driverDispatchHoldPgm = JSON.parse(localStorage.getItem("driverDispatchHoldPgm"));

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      if (window.location.pathname === "/driverservice/driver-dispatchhold/" + driverId + "/" + id) {
        navigate(`/driverservice/driver-dispatchhold/${driverId}`);
      } else {
        navigate(`/drivercompliance/driver-dispatchhold/${driverId}`);
      }
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
      if (window.location.pathname === "/driverservice/driver-dispatchhold/" + driverId + "/" + id) {
        navigate(`/driverservice/driver-dispatchhold/${driverId}`);
      } else {
        navigate(`/drivercompliance/driver-dispatchhold/${driverId}`);
      }

      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };

  const checkDispatchUser = () => {
    if (driverId) {
      DriverDispatchHoldsService.checkIfDispatchers(driverId)
        .then((response) => {
          const data = response.data;
          setCheckDispatcher(data);
        })
        .catch((error) => {
          console.error("error " + error);
        });
    }
  };
  useEffect(() => {
    checkDispatchUser();
  }, []);

  useEffect(() => {
    if (deniedPermissions) {
      setDisableEdit(deniedPermissions.includes(editPermission));
      setDisableDispatch(deniedPermissions.includes(supervisorPermisson));
      setDisableRestricted(deniedPermissions.includes(restrictedPermission));
    }
  }, [formData, restricted, deniedPermissions]);

  useEffect(() => {
    if (driverDispatchHoldPgm) {
      if (!disableEdit) {
        if (restricted) {
          if (!disableRestricted) {
            setEditEnabled(true);
          } else {
            setEditEnabled(false);
          }
        } else {
          setEditEnabled(true);
        }
      } else {
        setEditEnabled(false);
      }
    } else {
      if (dispatchers) {
        if (checkDispatcher || !disableDispatch) {
          setEditEnabled(true);
        } else {
          setEditEnabled(false);
        }
      } else {
        setEditEnabled(false);
      }
    }
  }, [
    checkDispatcher,
    restricted,
    dispatchers,
    driverDispatchHoldPgm,
    disableEdit,
    disableRestricted,
    disableDispatch,
  ]);

  const handleSave = () => {
    dispatch(setDispatchLoading(true));
    DriverDispatchHoldsService.saveDriverDispachHolds(driverDispatchHold)
      .then((response) => {
        if (window.location.pathname === "/driverservice/driver-dispatchhold/" + driverId + "/" + id) {
          navigate(`/driverservice/driver-dispatchhold/${driverId}`);
        } else {
          navigate(`/drivercompliance/driver-dispatchhold/${driverId}`);
        }
        if (id) {
          toast.success("Driver Dispatch Hold updated");
        } else {
          toast.success("Driver Dispatch Hold Created");
        }
      })
      .catch((error) => {
        if (window.location.pathname === "/driverservice/driver-dispatchhold/" + driverId + "/" + id) {
          navigate(`/driverservice/driver-dispatchhold/${driverId}`);
        } else {
          navigate(`/drivercompliance/driver-dispatchhold/${driverId}`);
        }
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
        dispatch(setDispatchLoading(false));
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type=""
          hidden={viewDetail}
          disabled={!disableSave}
          onClick={() => handleSave()}
        >
          Save
        </button>

        <button
          route={""}
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          disabled={!editEnabled}
          hidden={!viewDetail}
          onClick={() => dispatch(setViewDetail(false))}
        >
          Edit
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>

        {/* Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Driver Dispatch Hold Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
    </div>
  );
};

export default FormFooter;
