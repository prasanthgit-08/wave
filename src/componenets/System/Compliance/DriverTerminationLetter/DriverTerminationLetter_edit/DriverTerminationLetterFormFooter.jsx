import React from "react";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  resetEdit,
  resetEditData,
  setEditPage,
  setUnqiueDescription,
} from "../../../../../redux/DriverTerminationLetterSlice";
import { useNavigate, useParams } from "react-router-dom";
import DriverTerminationLetterService from "../../../../../services/DriverTerminationLetterService";
import ModalComponent from "../../../../common/ModalComponent";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { PermissionKeyGeneratorUtil } from "../../../../../utils/PermissionKeyGeneratorUtil";
import LoadingIcon from "../../../../common/LoadingIcon";

const DriverTerminationLetterFormFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [showDelete, setShowDelete] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [disableSave, setDisableSave] = useState(false);

  const id = params.id;

  const description = useSelector((state) => state.driverTerminationLetterReducer.description);
  const uniqueCombination = useSelector((state) => state.driverTerminationLetterReducer.uniqueCombination);
  const damage = useSelector((state) => state.driverTerminationLetterReducer.damage);
  const rehire = useSelector((state) => state.driverTerminationLetterReducer.rehire);
  const adminCharge = useSelector((state) => state.driverTerminationLetterReducer.adminCharge);
  const adminAmount = useSelector((state) => state.driverTerminationLetterReducer.adminAmount);
  const adminDays = useSelector((state) => state.driverTerminationLetterReducer.adminDays);
  const formId = useSelector((state) => state.driverTerminationLetterReducer.formId);
  const letter = useSelector((state) => state.driverTerminationLetterReducer.letter);
  const editPage = useSelector((state) => state.driverTerminationLetterReducer.editPage);
  const unqiueDescription = useSelector((state) => state.driverTerminationLetterReducer.unqiueDescription);
  const viewData = useSelector((state) => state.driverTerminationLetterReducer.viewData);

  const [loading, setLoading] = useState(false);
  const [disableEdit, setDisableEdit] = useState(false);
  const [disableDelete, setDisableDelete] = useState(false);

  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermission = PermissionKeyGeneratorUtil("driverTerminationLetter", "edit");
  const deletePermission = PermissionKeyGeneratorUtil("driverTerminationLetter", "delete");

  const handleSave = () => {
    if (viewData) {
      if (description === viewData.description) {
        dispatch(setUnqiueDescription(true));
        save();
      } else {
        setLoading(true);
        DriverTerminationLetterService.checkUnique(description).then(({ data }) => {
          dispatch(setUnqiueDescription(data));
          if (data) {
            save();
          } else {
            setLoading(false);
          }
        });
      }
    } else if (description) {
      setLoading(true);
      DriverTerminationLetterService.checkUnique(description)
        .then(({ data }) => {
          dispatch(setUnqiueDescription(data));
          if (data) {
            save();
          } else {
            setLoading(false);
          }
        })
        .catch(() => {
          setLoading(false);
          toast.error("Unable to save.");
        });
    }
  };

  const save = () => {
    setLoading(true);
    DriverTerminationLetterService.saveDriverTerminationLetter(
      description,
      damage,
      rehire,
      adminCharge,
      adminAmount,
      adminDays,
      formId,
      letter,
      id
    )
      .then(() => {
        navigate("/driver-termination-letter");
        dispatch(resetEdit());
        if (id) {
          toast.success("Driver Termination Letter Updated");
        } else {
          toast.success("Driver Termination Letter Created");
        }
      })
      .finally(() => setLoading(false));
  };

  const handleDeleteYes = () => {
    setLoading(true);
    setShowDelete(false);
    DriverTerminationLetterService.deleteDriverTerminationLetter(id)
      .then((response) => {
        setShowDelete(false);
        navigate("/driver-termination-letter");
        toast.success("Driver Termination Letter Deleted");
        dispatch(resetEdit());
      })
      .catch(() => {
        setShowDelete(false);
      })
      .finally(() => setLoading(false));
  };

  const handleDeleteNo = () => {
    setShowDelete(false);
  };

  const handleCancel = () => {
    if (id) {
      if (editPage) {
        setShowCancel(true);
      } else {
        toast.success("Changes Cancelled");
        navigate("/driver-termination-letter");
      }
    } else {
      setShowCancel(true);
    }
  };

  const handleCancelNo = () => {
    setShowCancel(false);
  };

  const handleCancelYes = () => {
    setShowCancel(false);
    dispatch(setEditPage(false));

    if (!id) {
      navigate("/driver-termination-letter");
      dispatch(resetEdit());
    } else {
      dispatch(resetEditData());
    }
    toast.success("Changes Cancelled");
  };

  useEffect(() => {
    if (!description || !unqiueDescription) {
      setDisableSave(true);
    } else if (adminCharge && (!adminAmount || !(adminAmount > 0))) {
      setDisableSave(true);
    } else if (adminCharge && (!adminDays || adminDays <= 0)) {
      setDisableSave(true);
    } else if (!formId || !uniqueCombination || !(damage || adminCharge || rehire)) {
      setDisableSave(true);
    } else {
      setDisableSave(false);
    }
  }, [
    description,
    adminAmount,
    adminDays,
    formId,
    letter,
    unqiueDescription,
    uniqueCombination,
    adminCharge,
    damage,
    adminCharge,
    rehire,
  ]);

  useEffect(() => {
    if (deniedPermissions) {
      setDisableEdit(deniedPermissions.includes(editPermission));
      setDisableDelete(deniedPermissions.includes(deletePermission));
    }
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <div>
          <button
            className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
            onClick={handleSave}
            hidden={!editPage}
            disabled={disableSave}
          >
            Save
          </button>

          <button
            className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={editPage}
          onClick={() => {
            dispatch(setEditPage(true));
          }}
          disabled={disableEdit}
        >
          Edit
        </button>

        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={editPage}
          onClick={() => {
            setShowDelete(true);
          }}
          disabled={disableDelete}
        >
          Delete
        </button>

        <ModalComponent
          show={showCancel}
          onHide={handleCancelNo}
          title={"Cancel Driver Termination Letter Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        <ModalComponent
          show={showDelete}
          onHide={handleDeleteNo}
          title={"Delete Driver Termination Letter"}
          body={"Please confirm you want to Delete this Driver Termination Letter"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
      </div>
    </div>
  );
};

export default DriverTerminationLetterFormFooter;
