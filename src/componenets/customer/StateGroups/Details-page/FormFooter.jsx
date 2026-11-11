import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../../common/Button";
import ModalComponent from "../../../common/ModalComponent";
import {
  resetChanges,
  resetNormalSort,
  setAssignedPageNo,
  setAssignedPageNumber,
  setAssignSortFlag,
  setAssignSortValue,
  setCloseFlag,
  setLeftPageNumber,
  setViewDetail,
  toggleChangesCancelled,
} from "../../../../redux/StateGroupsSlice";
import StateGroupsService from "../../../../services/StateGroupsService";
import { Button, Modal } from "react-bootstrap";
const FormFooter = () => {
  const { id } = useParams();
  const [load, setLoad] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [disableSave, setDisableSave] = useState(false);
  const [deleteStateGroupPopUp, setDeleteStateGroupPopUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const viewDetail = useSelector((state) => state.stateGroupReducer.viewDetail);
  const description = useSelector((state) => state.stateGroupReducer.description);
  const checkDescription = useSelector((state) => state.stateGroupReducer.checkDescription);
  const saveData = useSelector((state) => state.stateGroupReducer.saveData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      // edit page
      setCancelShow(true);
    } else {
      // view page
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/state-groups");
      dispatch(setAssignSortFlag(false));
      dispatch(setAssignSortValue(null));
      dispatch(setAssignedPageNo(0));
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(toggleChangesCancelled());
      dispatch(resetChanges());
      toast.success("Changes Cancelled");
    } else {
      navigate("/state-groups");
      dispatch(setViewDetail(false));
      dispatch(resetChanges());

      toast.success("Changes Cancelled");
    }
  };

  const handleDelete = () => setDeleteStateGroupPopUp(true);
  const handleDeleteNo = () => setDeleteStateGroupPopUp(false);
  const handleDeleteYes = () => {
    StateGroupsService.delete(id)
      .then((response) => {
        navigate("/state-groups");
        toast.success("State Group Deleted");
      })
      .catch((error) => {
        setErrorShow(true);
        setErrorMsg(error?.response?.data?.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(error?.response?.data?.errorMsg || "Something went wrong!! Failed to delete!!");
      });
    setDeleteStateGroupPopUp(false);
  };

  useEffect(() => {
    if (description !== "" && !checkDescription) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [description, checkDescription]);

  const save = () => {
    setLoad(true);
    StateGroupsService.createStateGrops(saveData)

      .then((res) => {
        setLoad(false);
        if (id) {
          toast.success("State Group Updated");
        } else {
          toast.success("State Group Created");
        }

        dispatch(resetChanges());
        dispatch(resetNormalSort());

        navigate("/state-groups");
      })
      .catch((err) => {
        setLoad(false);
        navigate("/state-groups");
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  const validateAndSave = () => {
    setLoad(true);
    StateGroupsService.DescriptionExist(description, id)
      .then((response) => {
        if (response?.data) {
          setLoad(false);
          setDisableSave(response?.data);
        } else {
          save();
        }
      })
      .catch((err) => {
        setLoad(false);
        setDisableSave(true);
      });
  };
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={validateAndSave}
        >
          Save
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={() => {
            navigate("/state-groups/states-list/" + id);
            dispatch(setCloseFlag(true));
            dispatch(setLeftPageNumber(0));
            dispatch(setAssignedPageNumber(0));
            dispatch(resetNormalSort());
          }}
          hidden={!id || viewDetail === false}
        >
          States
        </button>

        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={!id || viewDetail === false}
          onClick={() => dispatch(setViewDetail(false))}
          label={"Edit"}
        />

        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={!id || viewDetail === false}
          onClick={handleDelete}
          label={"Delete"}
        />

        {/* Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel State Group Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteStateGroupPopUp}
          onHide={handleDeleteNo}
          title={"Delete State Group"}
          body={"Please confirm you want to Delete this State Group"}
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
        {load && (
          <div className="fade modal-backdrop show">
            {" "}
            <div className="pos-center">
              {" "}
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormFooter;
