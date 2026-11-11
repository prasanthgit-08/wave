import React from "react";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import { t } from "i18next";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import ModalComponent from "../../../../common/ModalComponent";
import {
  resetChanges,
  setNormalSortFlag,
  setNormalSortValue,
  setViewDetail,
  toggleChangesCancelled,
} from "../../../../../redux/DeleaseCodeSlice";
import DeleaseCodeService from "../../../../../services/DeleaseCodeService";
import { Colors } from "../../../../../styles/values/colors";
import { Button, Modal } from "react-bootstrap";
const DeleaseCodeFooter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [activeShow, setActiveShow] = useState(false);
  const [active, setActive] = useState("");
  const handleActiveShow = () => setActiveShow(true);
  const handleActiveClose = () => setActiveShow(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [load, setLoad] = useState(false);

  const viewDetail = useSelector((state) => state.deleaseCodeReducer.viewDetail);
  const saveFormData = useSelector((state) => state.deleaseCodeReducer.saveFormData);
  const editFormData = useSelector((state) => state.deleaseCodeReducer.editFormData);
  const code = useSelector((state) => state.deleaseCodeReducer.code);
  const description = useSelector((state) => state.deleaseCodeReducer.description);
  const checkDescription = useSelector((state) => state.deleaseCodeReducer.checkDescription);
  const checkCode = useSelector((state) => state.deleaseCodeReducer.checkCode);
  //cancel
  const handleCancelShow = () => {
    if (viewDetail === false || id === undefined) {
      // edit page
      setCancelShow(true);
    } else {
      // view page
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/delease-code");
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
      navigate("/delease-code");
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
    dispatch(resetChanges());
  };
  //Save or Update
  useEffect(() => {
    if (code !== "" && !checkCode && description !== "" && !checkDescription) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [code, description, checkCode, checkDescription]);
  const save = () => {
    setLoad(true);
    DeleaseCodeService.createDeleaseCode(saveFormData)
      .then((response) => {
        setLoad(false);
        navigate("/delease-code");
        dispatch(resetChanges());
        if (id) {
          toast.success("Delease Code Updated");
        } else toast.success("Delease Code Created");
      })
      .catch((error) => {
        setLoad(false);
        navigate("/delease-code");
        dispatch(resetChanges());
        toast.error("something went wrong");
        console.log(error);
      });
  };
  //delete
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    setLoad(true);
    DeleaseCodeService.deleteDeleaseCode(id)
      .then((response) => {
        navigate("/delease-code");
        toast.success("Delease Code Deleted");
      })
      .catch((error) => {
        setErrorShow(true);
        setErrorMsg(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => setLoad(false));
    setDeleteShow(false);
  };
  //Active or Inactive
  useEffect(() => {
    if (editFormData != null && null != editFormData.active) {
      setActive(editFormData.active);
    }
  }, [editFormData]);
  const handleActiveSave = (e) => {
    setActiveShow(false);
    if (active === true) {
      deActivateDeleaseCode();
    } else {
      activateDeleaseCode();
    }
  };
  const activateDeleaseCode = () => {
    setLoad(true);
    DeleaseCodeService.activateDeleaseCode(id)
      .then(() => {
        setActiveShow(false);
        setActive(true);
        toast.success("Delease Code Activated");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => setLoad(false));
  };

  const deActivateDeleaseCode = () => {
    setLoad(true);
    DeleaseCodeService.deactivateDeleaseCode(id)
      .then(() => {
        setActiveShow(false);
        setActive(false);
        toast.success("Delease Code Deactivated");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => setLoad(false));
  };
  const validateAndSave = () => {
    setLoad(true);
    DeleaseCodeService.checkuniquesave(code, description, id)
      .then((response) => {
        if (response.data) {
          setLoad(false);
          setDisableSave(response.data);
        } else {
          save();
        }
      })
      .catch((error) => {
        toast.error("Something went wrong");
        setLoad(false);
      });
  };
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={!id || viewDetail === false}
          onClick={handleActiveShow}
          style={active === false ? { backgroundColor: Colors.red } : { backgroundColor: "" }}
        >
          Active
        </button>
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

        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Delease Code Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Delease Code "}
          body={"Please confirm you want to Delete this Delease Code "}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
        {/* model Active*/}
        <ModalComponent
          show={activeShow}
          onHide={handleActiveClose}
          title={active === true ? "Deactivate  Delease Code " : "Activate  Delease Code "}
          body={
            active === true
              ? " Please confirm you want to Deactivate this  Delease Code "
              : " Please confirm you want to Activate this  Delease Code "
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

export default DeleaseCodeFooter;
