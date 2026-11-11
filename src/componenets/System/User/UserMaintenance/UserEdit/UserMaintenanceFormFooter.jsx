import React from "react";
import ButtonComponent from "../../../../common/Button";
import ModalComponent from "../../../../common/ModalComponent";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFields,
  resetUserMaintenance,
  setActive,
  setViewDetail,
} from "../../../../../redux/UserMaintenanceSearchFilterSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { t } from "i18next";
import UsersService from "../../../../../services/UsersService";
import { Button, Modal } from "react-bootstrap";
import { Colors } from "../../../../../styles/values/colors";
import LoadingIcon from "../../../../common/LoadingIcon";

function UserMaintenanceFormFooter() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userEditPermission = true;
  const viewUserPermissionsPermission = true;
  const viewUserPermissionsGroupsPermission = true;
  const overrideCode = useSelector((state) => state.userMaintenanceReducer.overrideCode);
  const phoneExtensionNumber = useSelector((state) => state.userMaintenanceReducer.phoneExtensionNumber);
  const directDialPhone = useSelector((state) => state.userMaintenanceReducer.directDialPhone);
  const companyEmail = useSelector((state) => state.userMaintenanceReducer.companyEmail);
  const login = useSelector((state) => state.userMaintenanceReducer.login);
  const decryptedPassword = useSelector((state) => state.userMaintenanceReducer.decryptedPassword);
  const pseudo = useSelector((state) => state.userMaintenanceReducer.pseudo);

  const [activeShow, setActiveShow] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorTitle, setErrorTitle] = useState("");
  const [deletingRecord, setDeletingRecord] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveLoading1, setSaveLoading1] = useState(false);
  const [loading, setLoading] = useState(false);

  const { id, active, viewDetail, saveData, saveDisable, selectedUserStatus, loader } = useSelector(
    (state) => state.userMaintenanceReducer
  );

  const status = selectedUserStatus;

  const handleCancelShow = () => {
    if (viewDetail && id) {
      dispatch(resetFields());
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/user-maintenance");
      toast.success("Changes Cancelled");
    } else {
      setCancelShow(true);
    }
  };

  const activateUsers = () => {
    setLoading(true);
    UsersService.activateUser(id)
      .then((response) => {
        // setActiveShow(false);
        setActive(true);
        toast.success("User Activated");
        setTimeout(() => {
          dispatch(setActive(true));
        }, 100);
      })
      .catch((error) => {})
      .finally(() => setLoading(false));
  };

  const deactivateUsers = () => {
    setLoading(true);
    UsersService.deactivateUser(id)
      .then((response) => {
        // setActiveShow(false);
        setActive(false);
        toast.success("User Deactivated");
        setTimeout(() => {
          dispatch(setActive(false));
        }, 100);
      })
      .catch((eroor) => {})
      .finally(() => setLoading(false));
  };

  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      toast.success("Changes Cancelled");
    } else {
      navigate("/user-maintenance");
      dispatch(resetFields());
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };
  const handleActiveClose = () => setActiveShow(false);
  const handleActiveShow = () => setActiveShow(true);

  const handleActiveSave = (e) => {
    e.preventDefault();
    handleActiveClose();
    if (active === true) {
      deactivateUsers();
    } else {
      activateUsers();
    }
  };

  const handleActiveYes = () => {
    setActiveShow(false);
    dispatch(setActive(!active));
  };

  const handleDeleteYes = () => {
    setDeletingRecord(true);
    UsersService.deleteUserData(id)
      .then((response) => {
        setDeletingRecord(false);
        navigate("/user-maintenance");
        toast.success("User Deleted");
      })
      .catch((error) => {
        setDeletingRecord(false);
        setErrorShow(true);
        console.error(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        setErrorTitle("Delete Failed!");
        setErrorMsg([error.response.data.errorMsg || "Something went wrong!! Failed to delete!!"]);
      });
    setDeleteShow(false);
  };

  const saveUserData = () => {
    setSaveLoading1(true);
    UsersService.saveUserData(saveData)
      .then((response) => {
        const { success, newRecord, message } = response.data;
        if (success && !newRecord) {
          navigate("/user-maintenance");
          toast.success("User Updated");
        } else if (success && newRecord) {
          navigate("/user-maintenance");
          toast.success("User Created");
        } else if (!success && !newRecord) {
          setSaveLoading1(false);
          setErrorShow(true);
          console.error(message);
          setErrorTitle("Save Failed!");
          setErrorMsg(message.split(", "));
        }
      })
      .catch((error) => {
        resetFields();
        dispatch(resetUserMaintenance());
        setErrorShow(true);
        setSaveLoading1(false);
        console.error(error.response.data.errorMsg);
        setErrorTitle("Save Failed!");
        setErrorMsg(error.response.data.errorMsg.split(", "));
      })
      .finally(() => setSaveLoading1(false));
  };
  const validateAndSave = () => {
    setSaveLoading(true);
    UsersService.checkuniquesave(
      id,
      overrideCode,
      phoneExtensionNumber,
      directDialPhone.slice(0, 5) + directDialPhone.slice(6),
      companyEmail,
      decryptedPassword,
      login,
      pseudo
    )
      .then((response) => {
        if (!response.data) {
          setDisableSave(response.data);
          setSaveLoading(false);
        } else {
          setSaveLoading(false);
          saveUserData();
        }
      })
      .catch((err) => {
        setDisableSave(true);
      })
      .finally(() => setSaveLoading(false));
  };

  return (
    <div
      className="d-flex align-items-center justify-content-between overflow-auto
     p-t-10 p-b-5 border-top border-dark border-2"
    >
      {(deletingRecord || saveLoading || loading || saveLoading1) && <LoadingIcon />}
      <div className="d-flex align-items-center  m-r-10">
        <ButtonComponent
          route={`/user-permission/${id}`}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={" Permissions"}
          hidden={!viewDetail || !viewUserPermissionsPermission}
        />

        <ButtonComponent
          route={`/user-permission-groups/${id}`}
          className="btn btn-secondary text-nowrap btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={" Permissions Groups"}
          hidden={!viewDetail || !viewUserPermissionsGroupsPermission}
        />
      </div>

      <div className="d-flex align-items-center ">
        <ButtonComponent
          route={""}
          className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5`}
          label={"Active"}
          hidden={!id || status === "InComplete" || viewDetail === false || loader}
          onClick={handleActiveShow}
          style={active ? { backgroundColor: "" } : { backgroundColor: Colors.red }}
        />

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          disabled={saveDisable}
          hidden={viewDetail}
          onClick={validateAndSave}
        >
          {t("save.button")}
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={handleCancelShow}
        >
          {t("cancel.button")}
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={!viewDetail || !userEditPermission}
          onClick={() => {
            dispatch(setViewDetail(false));
          }}
        >
          {t("edit.button")}
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={!viewDetail || !userEditPermission}
          onClick={() => setDeleteShow(true)}
        >
          {t("delete.button")}
        </button>

        <ModalComponent
          show={cancelShow}
          onHide={() => setCancelShow(false)}
          title={"Cancel User Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={() => setCancelShow(false)}
        />

        <ModalComponent
          show={deleteShow}
          onHide={() => setDeleteShow(false)}
          title={"Delete User"}
          body={"Please confirm you want to Delete this User"}
          handleYES={handleDeleteYes}
          handleNO={() => setDeleteShow(false)}
        />

        <ModalComponent
          show={activeShow}
          onHide={handleActiveClose}
          title={active === true ? "Deactivate User" : "Activate User"}
          body={
            active === true
              ? " Please confirm you want to Deactivate this User"
              : " Please confirm you want to Activate this User"
          }
          handleYES={handleActiveSave}
          handleNO={handleActiveClose}
        />
        <Modal show={errorShow} onHide={() => setErrorShow(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 temp-red-color">{errorTitle}</Modal.Title>
          </Modal.Header>

          <Modal.Body className="font-14 h-100">
            {errorMsg.length > 0
              ? errorMsg.map((error, i) => (
                  <span key={i}>
                    {error}
                    <br></br>
                  </span>
                ))
              : errorMsg}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={() => setErrorShow(false)}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default UserMaintenanceFormFooter;
