import { toast } from "react-hot-toast";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  setAssignSortFlag,
  setAssignSortValue,
  setCancelChanges,
  setIsDescriptionUnique,
  setPermissionPageNumber,
  setViewDetail,
  toggleChangesCancelled,
} from "../../../../../redux/PermissionGroupMaintenanceSlice";
import { Modal, Button } from "react-bootstrap";
import ModalComponent from "../../../../common/ModalComponent";
import PermissionGroupService from "../../../../../services/PermissionGroupService";
import LoadingIcon from "../../../../common/LoadingIcon";

const FormFooter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationLoader, setValidationLoader] = useState(false);

  const viewDetail = useSelector((state) => state.permissionGroupsReducer.viewDetail);
  const description = useSelector((state) => state.permissionGroupsReducer.description);
  const isDescriptionUnique = useSelector((state) => state.permissionGroupsReducer.isDescriptionUnique);
  const saveData = useSelector((state) => state.permissionGroupsReducer.saveData);
  //cancel
  const handleCancelShow = () => {
    if (viewDetail === false || id === undefined) {
      // edit page
      setCancelShow(true);
    } else {
      // view page
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/permission-groups");

      dispatch(setAssignSortFlag(false));
      dispatch(setAssignSortValue(null));
      dispatch(setPermissionPageNumber(0));
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(toggleChangesCancelled());
      dispatch(setCancelChanges(true));
      toast.success("Changes Cancelled");
    } else {
      navigate("/permission-groups");
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };
  const validateAndSave = () => {
    setValidationLoader(true);
    PermissionGroupService.checkDescriptionExist(id, description)
      .then((response) => {
        if (response.data) {
          save();
        } else {
          dispatch(setIsDescriptionUnique(false));
          setDisableSave(response.data);
        }
      })
      .catch((err) => {
        setDisableSave(false);
      })
      .finally(() => setValidationLoader(false));
  };
  const save = () => {
    setLoading(true);
    PermissionGroupService.save(saveData)
      .then((response) => {
        navigate("/permission-groups");
        dispatch(setAssignSortValue(null));
        dispatch(setPermissionPageNumber(0));

        if (id) {
          toast.success("Permission Group Updated");
        } else toast.success("Permission Group Created");
      })
      .catch((error) => {
        navigate("/permission-groups");

        toast.error("something went wrong");
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (description !== "" && isDescriptionUnique) {
      setDisableSave(true);
    } else {
      setDisableSave(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description, isDescriptionUnique]);

  //DELETE
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    setLoading(true);
    PermissionGroupService.delete(id)
      .then((response) => {
        navigate("/permission-groups");
        toast.success("Permission Group Deleted");
      })
      .catch((error) => {
        setErrorShow(true);
        setErrorMsg(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => setLoading(false));
    setDeleteShow(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap">
      {(loading || validationLoader) && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={viewDetail === true}
          disabled={!disableSave}
          onClick={() => validateAndSave()}
        >
          Save
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handleCancelShow}
        >
          Cancel
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!id || viewDetail === false}
          onClick={() => {
            navigate("/permission-groups/permission-list/" + id);
          }}
        >
          Permissions
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!id || viewDetail === false}
          onClick={() => dispatch(setViewDetail(false))}
        >
          Edit
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!id || viewDetail === false}
          onClick={handleDelete}
        >
          Delete
        </button>
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Permission Group Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Permission Group "}
          body={"Please confirm you want to Delete this Permission Group "}
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

export default FormFooter;
