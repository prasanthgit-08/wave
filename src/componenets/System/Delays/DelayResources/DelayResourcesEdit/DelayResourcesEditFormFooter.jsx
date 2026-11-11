import React, { useEffect } from "react";
import QuarterStyles from "../../../../../styles/QuarterScreen.module.css";
import ButtonComponent from "../../../../common/Button";
import ModalComponent from "../../../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetEditScreen, setEdit } from "../../../../../redux/DelayResourcesSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import DelayResourceService from "../../../../../services/DelayResourceService";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import { Button, Modal } from "react-bootstrap";
import { PermissionKeyGeneratorUtil } from "../../../../../utils/PermissionKeyGeneratorUtil";
import LoadingIcon from "../../../../common/LoadingIcon";
const DelayResourcesEditFormFooter = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [disableEdit, setDisableEdit] = useState(false);
  const [disableDelete, setDisableDelete] = useState(false);

  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermission = PermissionKeyGeneratorUtil("DelayResources", "edit");
  const deletePermission = PermissionKeyGeneratorUtil("DelayResources", "delete");

  const id = params.id;
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const edit = useSelector((state) => state.delayResourcesFilter.edit);
  const description = useSelector((state) => state.delayResourcesFilter.description);
  const phone = useSelector((state) => state.delayResourcesFilter.phone);
  const notes = useSelector((state) => state.delayResourcesFilter.notes);
  const delay = useSelector((state) => state.delayResourcesFilter.delay);
  const breakdown = useSelector((state) => state.delayResourcesFilter.breakdown);
  const damage = useSelector((state) => state.delayResourcesFilter.damage);
  const disableSave = useSelector((state) => state.delayResourcesFilter.disableSave);
  const data = useSelector((state) => state.delayResourcesFilter.data);

  const onHandleCancel = () => {
    if (edit) {
      setCancelShow(true);
    } else {
      toast.success("Changes Cancelled");
      navigate("/delay-resources");
    }
  };
  const handleCancelYes = () => {
    if (id) {
      dispatch(setEdit(false));
      dispatch(resetEditScreen());
      toast.success("Changes Cancelled");
    } else {
      navigate("/delay-resources");
    }
    setCancelShow(false);
  };

  const handleCancelNo = () => {
    setCancelShow(false);
  };

  const onHandleDelete = () => {
    setDeleteShow(true);
  };

  const handleDeleteNo = () => {
    setDeleteShow(false);
  };
  const handleDeleteYes = () => {
    setDeleteShow(false);
    setLoading(true);
    DelayResourceService.deleteById(id)
      .then((response) => {
        setLoading(false);
        navigate("/delay-resources");
        toast.success("Delay Resource Deleted");
      })
      .catch((error) => {
        setErrorShow(true);
        setErrorMsg(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => setLoading(false));
  };

  const onHandleSave = () => {
    setLoading(true);
    DelayResourceService.saveDelayResource(
      description?.trim(),
      phone.replace(/\s+/g, ""),
      delay,
      breakdown,
      damage,
      notes,
      id
    )
      .then(() => {
        if (id) {
          toast.success("Delay Resource Updated");
        } else {
          toast.success("Delay Resource Created");
        }
        setLoading(false);
        navigate("/delay-resources");
      })
      .finally(() => setLoading(false));
  };

  const checkUnquieAndSave = () => {
    if (description && data && description?.trim() === data.description) {
      onHandleSave();
    } else if (description) {
      setLoading(true);
      DelayResourceService.isDescriptionUnique(description, id)
        .then(({ data }) => {
          if (data) {
            onHandleSave();
          } else {
            setLoading(false);
          }
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (deniedPermissions) {
      setDisableEdit(deniedPermissions.includes(editPermission));
      setDisableDelete(deniedPermissions.includes(deletePermission));
    }
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap">
        <div>
          <button
            className={`btn btn-secondary ${QuarterStyles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
            onClick={checkUnquieAndSave}
            hidden={!edit}
            disabled={disableSave}
          >
            Save
          </button>

          <button
            className={`btn btn-secondary ${QuarterStyles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
            onClick={onHandleCancel}
          >
            Cancel
          </button>
          <button
            route={""}
            className={`btn btn-secondary ${QuarterStyles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
            label={"Edit"}
            hidden={edit}
            onClick={() => {
              dispatch(setEdit(true));
            }}
            disabled={disableEdit}
          >
            Edit
          </button>
          <button
            route={""}
            className={`btn btn-secondary ${QuarterStyles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
            label={"Delete"}
            hidden={edit}
            onClick={onHandleDelete}
            disabled={disableDelete}
          >
            Delete
          </button>
        </div>
        <ModalComponent
          show={cancelShow && edit}
          onHide={handleCancelNo}
          title={"Cancel Delay Resource Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Delay Resource "}
          body={"Please confirm you want to Delete this Delay Resource"}
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

export default DelayResourcesEditFormFooter;
