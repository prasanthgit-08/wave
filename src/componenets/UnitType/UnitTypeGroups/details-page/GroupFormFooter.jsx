import { toast } from "react-hot-toast";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import ModalComponent from "../../../common/ModalComponent";
import {
  resetChanges,
  setAssignSortFlag,
  setAssignSortValue,
  setUnitTypePageNumber,
  setViewDetail,
  toggleChangesCancelled,
} from "../../../../redux/UnitTypeGroupSlice";
import UnitTypeGroupsService from "../../../../services/UnitTypeGroupsService";
import { Modal, Button } from "react-bootstrap";

const GroupFormFooter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [load, setLoad] = useState(false);
  const description = useSelector((state) => state.unitTypeGroupReducer.description);
  const unitClass = useSelector((state) => state.unitTypeGroupReducer.unitClass);
  const motorized = useSelector((state) => state.unitTypeGroupReducer.motorized);
  const towable = useSelector((state) => state.unitTypeGroupReducer.towable);
  const checkDescription = useSelector((state) => state.unitTypeGroupReducer.checkDescription);

  const viewDetail = useSelector((state) => state.unitTypeGroupReducer.viewDetail);

  const saveData = useSelector((state) => state.unitTypeGroupReducer.saveData);
  const radioValue = useSelector((state) => state.unitTypeGroupReducer.radioValue);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);

  //cancel
  const handleCancelShow = () => {
    if (viewDetail === false || id === undefined) {
      // edit page
      setCancelShow(true);
    } else {
      // view page
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/unit-type-groups");

      dispatch(setAssignSortFlag(false));
      dispatch(setAssignSortValue(null));
      dispatch(setUnitTypePageNumber(0));
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(toggleChangesCancelled());
      toast.success("Changes Cancelled");
    } else {
      navigate("/unit-type-groups");
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
    dispatch(resetChanges());
  };
  //DELETE
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    UnitTypeGroupsService.delete(id)
      .then((response) => {
        navigate("/unit-type-groups");
        toast.success("Unit Type Group Deleted");
      })
      .catch((error) => {
        setErrorShow(true);
        setErrorMsg(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      });
    setDeleteShow(false);
  };

  const save = () => {
    setLoad(true);
    UnitTypeGroupsService.save(saveData)

      .then((response) => {
        setLoad(false);
        navigate("/unit-type-groups");
        dispatch(setAssignSortValue(null));
        dispatch(setUnitTypePageNumber(0));

        if (id) {
          toast.success("Unit Type Group Updated");
        } else toast.success("Unit Type Group Created");
      })
      .catch((error) => {
        navigate("/unit-type-groups");
        setLoad(false);
        toast.error("something went wrong");
        console.log(error);
      });
  };

  useEffect(() => {
    if (
      description !== "" &&
      unitClass !== "" &&
      unitClass >= 1 &&
      unitClass <= 9 &&
      unitClass.length === 1 &&
      (radioValue == "Motorized" || radioValue == "Towable") &&
      !checkDescription
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description, checkDescription, radioValue, unitClass]);

  const validateAndSave = () => {
    setLoad(true);
    UnitTypeGroupsService.checkDescriptionExist(id, description)
      .then((response) => {
        if (response.data) {
          setLoad(false);
          setDisableSave(response.data);
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
          route={""}
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={validateAndSave}
        >
          Save
        </button>
        <button
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={handleCancelShow}
        >
          Cancel
        </button>
        <button
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          disabled={radioValue === null}
          hidden={!id || viewDetail === false}
          onClick={() => {
            navigate("/unit-type-groups/unit-type-list/" + id);
          }}
        >
          Unit Types
        </button>
        <button
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={!id || viewDetail === false}
          onClick={() => dispatch(setViewDetail(false))}
        >
          Edit
        </button>
        <button
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={!id || viewDetail === false}
          onClick={handleDelete}
        >
          Delete
        </button>

        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Unit Type Group Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Unit Type Group "}
          body={"Please confirm you want to Delete this Unit Type Group "}
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

export default GroupFormFooter;
