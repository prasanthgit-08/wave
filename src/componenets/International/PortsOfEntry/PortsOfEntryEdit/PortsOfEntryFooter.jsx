import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  resetChanges,
  setCanadianCity,
  setCanadianFlag,
  setDisableSave,
  setProvence,
  setSortFlag,
  setSortValue,
  setStateCode,
  setUsCity,
  setUsFlag,
  setViewDetail,
  toggleChangesCancelled,
} from "../../../../redux/PortsOfEntrySlice";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import PortsOfEntryService from "../../../../services/PortsOfEntryService";
import toast from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import { Button, Modal } from "react-bootstrap";
import LoadingIcon from "../../../common/LoadingIcon";

function PortsOfEntryFooter() {
  const viewDetail = useSelector((state) => state.portsOfEntryReducer.viewDetail);
  const disableSave = useSelector((state) => state.portsOfEntryReducer.disableSave);
  const portsOfEntry = useSelector((state) => state.portsOfEntryReducer.portsOfEntry);
  const sequence = useSelector((state) => state.portsOfEntryReducer.sequence);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSequence, setCheckingSequence] = useState(false);

  //Cancel button
  const handleCancelShow = () => {
    if (viewDetail === false || id === undefined) {
      // edit page
      setCancelShow(true);
    } else {
      // view page
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/port-of-entry");
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
      navigate("/port-of-entry");
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };
  //Delete ports of entry
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    PortsOfEntryService.deletePortsOfEntry(id)
      .then((response) => {
        navigate("/port-of-entry");
        toast.success(" Ports Of Entry Deleted");
      })
      .catch((error) => {
        setErrorShow(true);
        setErrorMsg(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      });
    setDeleteShow(false);
  };

  const handleSave = () => {
    setLoading(true);
    PortsOfEntryService.savePortsofEntry(portsOfEntry)
      .then((response) => {
        navigate("/port-of-entry");
        if (id) {
          toast.success("Ports Of Entry Updated");
        } else {
          toast.success("Ports Of Entry Created");
        }
      })
      .catch((error) => {
        navigate("/port-of-entry");
        if (id) {
          toast.error("Failed to Update Ports of Entry");
        } else {
          toast.error("Failed to Create Ports of Entry");
        }
      })
      .finally(() => {
        setLoading(false);
        dispatch(resetChanges());
      });
  };
  /*****Validate the save operation****/
  const validateAndSave = () => {
    setCheckingSequence(true);
    PortsOfEntryService.checkSequenceExist(id, sequence)
      .then((response) => {
        if (response.data) {
          dispatch(setDisableSave(response.data));
        } else {
          handleSave();
        }
      })
      .catch((err) => {
        dispatch(setDisableSave(true));
        setCheckingSequence(false);
      })
      .finally(() => {
        setCheckingSequence(false);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={viewDetail}
          disabled={disableSave || checkingSequence}
          onClick={validateAndSave}
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
          type=""
          onClick={(e) => {
            dispatch(setViewDetail(false));
            dispatch(setUsFlag(false));
            dispatch(setCanadianFlag(false));
          }}
          hidden={!viewDetail}
        >
          Edit
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={!viewDetail || !id}
          onClick={handleDelete}
        >
          Delete
        </button>
        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Ports Of Entry Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Ports Of Entry"}
          body={"Please confirm you want to Delete this Ports Of Entry"}
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
}

export default PortsOfEntryFooter;
