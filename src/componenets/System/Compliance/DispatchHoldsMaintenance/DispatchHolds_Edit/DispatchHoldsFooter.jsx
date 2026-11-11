import React, { useState } from "react";
import { useEffect } from "react";
import ButtonComponent from "../../../../common/Button";
import ModalComponent from "../../../../common/ModalComponent";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";

import DispatchHoldsService from "../../../../../services/DispatchHoldsService";
import { Colors } from "../../../../../styles/values/colors";
import { setSaveLoaded, setViewDetail } from "../../../../../redux/DispatchHoldSearchSlice";
import { Button, Modal } from "react-bootstrap";
import LoadingIcon from "../../../../common/LoadingIcon";

const DispatchHoldsFooter = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [activeShow, setActiveShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("");
  const handleActiveShow = () => setActiveShow(true);
  const handleActiveClose = () => setActiveShow(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [load, setLoad] = useState(false);
  const viewDetail = useSelector((state) => state.dispatchHoldSearchSliceReducer.viewDetail);
  const saveFormData = useSelector((state) => state.dispatchHoldSearchSliceReducer.saveFormData);
  const editFormData = useSelector((state) => state.dispatchHoldSearchSliceReducer.editFormData);
  const description = useSelector((state) => state.dispatchHoldSearchSliceReducer.description);
  const driverDescription = useSelector((state) => state.dispatchHoldSearchSliceReducer.driverDescription);
  const checkDescriptionExist = useSelector(
    (state) => state.dispatchHoldSearchSliceReducer.checkDescriptionExist
  );
  const checkDriverDescriptionExist = useSelector(
    (state) => state.dispatchHoldSearchSliceReducer.checkDriverDescriptionExist
  );
  const objectKey = useSelector((state) => state.dispatchHoldSearchSliceReducer.objectKey);
  const restricted = useSelector((state) => state.dispatchHoldSearchSliceReducer.restricted);
  const checkObjectKeyExist = useSelector(
    (state) => state.dispatchHoldSearchSliceReducer.checkObjectKeyExist
  );
  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/dispatch-hold");
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => {
    setCancelShow(false);
  };
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      toast.success("Changes Cancelled");
    } else {
      navigate("/dispatch-hold");
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };

  //Save or Update
  useEffect(() => {
    if (
      description !== "" &&
      driverDescription !== "" &&
      !checkDescriptionExist &&
      !checkDriverDescriptionExist &&
      ((restricted == false && objectKey === "" && !checkObjectKeyExist) ||
        (restricted == false && objectKey && !checkObjectKeyExist) ||
        (restricted == true && objectKey !== "" && !checkObjectKeyExist))
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [
    description,
    driverDescription,
    checkDescriptionExist,
    checkDriverDescriptionExist,
    objectKey,
    restricted,
    checkObjectKeyExist,
  ]);
  const saveOrUpdate = (e) => {
    dispatch(setSaveLoaded(true));
    dispatch(setViewDetail(true));
    setLoad(true);
    DispatchHoldsService.create(saveFormData)

      .then(() => {
        if (id) {
          toast.success("Dispatch Hold Updated");
        } else {
          toast.success("Dispatch Hold Created");
        }
        setLoad(false);
        navigate("/dispatch-hold");
      })
      .catch((error) => {
        setLoad(false);
        navigate("/dispatch-hold");
        toast.error("Something Went Wrong");
      })
      .finally(() => {
        dispatch(setSaveLoaded(false));
      });
  };

  //delete
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    setLoading(true);
    DispatchHoldsService.delete(id)
      .then((response) => {
        navigate("/dispatch-hold");
        toast.success("Dispatch Hold Deleted");
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => setLoading(false));
    setDeleteShow(false);
  };
  //Activate-Deactivate
  useEffect(() => {
    if (editFormData != null && null != editFormData.active) {
      setActive(editFormData.active);
    }
  }, [editFormData]);
  const handleActiveSave = (e) => {
    setActiveShow(false);
    if (active === true) {
      deActivate();
    } else {
      activate();
    }
  };
  const activate = () => {
    setLoading(true);
    DispatchHoldsService.activate(id)
      .then(() => {
        setActiveShow(false);
        setActive(true);
        toast.success("Dispatch Hold Activated");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => setLoading(false));
  };

  const deActivate = () => {
    setLoading(true);
    DispatchHoldsService.deactivate(id)
      .then(() => {
        setActiveShow(false);
        setActive(false);
        toast.success("Dispatch Hold Deactivated");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => setLoading(false));
  };

  const validateAndSave = () => {
    setLoad(true);
    DispatchHoldsService.checkuniquesave(description, driverDescription, objectKey, id)
      .then((response) => {
        if (response.data) {
          setLoad(false);
          setDisableSave(response.data);
        } else {
          saveOrUpdate();
        }
      })
      .catch((err) => {
        setLoad(true);
        setDisableSave(true);
      });
  };
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-6 m-r-5 m-b-6 `}
          type=""
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={validateAndSave}
        >
          Save
        </button>

        <button
          className={`btn btn-secondary ${styles.btnMediumWidth}  btn-sm m-l-5 m-r-5 m-b-6 `}
          type="button"
          hidden={!id || viewDetail === false}
          onClick={handleActiveShow}
          style={active === false ? { backgroundColor: Colors.red } : { backgroundColor: "" }}
        >
          Active
        </button>
        <button
          className={`btn btn-secondary ${styles.btnMediumWidth}  btn-sm m-l-5 m-r-5 m-b-6 `}
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-6 `}
          hidden={!id || viewDetail === false}
          onClick={() => dispatch(setViewDetail(false))}
          label={"Edit"}
        />

        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-6 `}
          hidden={!id || viewDetail === false}
          onClick={handleDelete}
          label={"Delete"}
        />

        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Dispatch Hold Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Dispatch Hold"}
          body={"Please confirm you want to Delete this Dispatch Hold"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
        {/* model Active*/}
        <ModalComponent
          show={activeShow}
          onHide={handleActiveClose}
          title={active === true ? "Deactivate Dispatch Hold" : "Activate Dispatch Hold"}
          body={
            active === true
              ? " Please confirm you want to Deactivate this Dispatch Hold"
              : " Please confirm you want to Activate this Dispatch Hold"
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
            <Button variant="primary" onClick={() => setErrorShow(false)}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>{" "}
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
  );
};
export default DispatchHoldsFooter;
