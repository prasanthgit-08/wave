import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ImportBrokersService from "../../../../services/ImportBrokersService";
import toast from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import { Button, Modal } from "react-bootstrap";
import {
  resetChanges,
  setDisableSave,
  setViewDetail,
  toggleChangesCancelled,
  setEditFormData,
} from "../../../../redux/ImportBrokersSlice";
import LoadingIcon from "../../../common/LoadingIcon";

function ImportBrokersFooter() {
  const viewDetail = useSelector((state) => state.importBrokersReducer.viewDetail);
  const disableSave = useSelector((state) => state.importBrokersReducer.disableSave);
  const description = useSelector((state) => state.importBrokersReducer.description);
  const name = useSelector((state) => state.importBrokersReducer.name);
  const phone = useSelector((state) => state.importBrokersReducer.phone);
  const fax = useSelector((state) => state.importBrokersReducer.fax);
  const formFK = useSelector((state) => state.importBrokersReducer.formFK);
  const notes = useSelector((state) => state.importBrokersReducer.notes);
  // const  importBrokers = useSelector((state) => state.importBrokersReducer.importBrokers);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const editFormData = useSelector((state) => state.importBrokersReducer.editFormData);
  const [checkingSequence, setCheckingSequence] = useState(false);

  const importBrokers = {
    importBrokerPK: id,
    description: description,
    name: name,
    phone: phone?.replace(/\s+/g, ""),
    formFK: formFK,
    fax: fax?.replace(/\s+/g, ""),
    notes: notes,
    addUserFK: id ? editFormData?.addUserFK : null,
  };
  //Cancel button
  const handleCancelShow = () => {
    if (viewDetail === false || id === undefined) {
      // edit page
      setCancelShow(true);
    } else {
      // view page
      setCancelShow(false);
      dispatch(setViewDetail(false));
      dispatch(setEditFormData(null));
      // dispatch(resetChanges());
      navigate("/import-brokers");
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
      navigate("/import-brokers");
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };
  //Delete import Broker
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    ImportBrokersService.deleteImportBrokers(id)
      .then((response) => {
        navigate("/import-brokers");
        toast.success("Import Broker Deleted");
      })
      .catch((error) => {
        setErrorShow(true);
        setErrorMsg(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      });
    setDeleteShow(false);
  };
  const handleSave = () => {
    setLoading(true);
    ImportBrokersService.saveImportBrokers(importBrokers)
      .then((response) => {
        navigate("/import-brokers");
        if (id) {
          toast.success("Import Broker Updated");
        } else {
          toast.success("Import Broker Created");
        }
      })
      .catch((error) => {
        navigate("/import-brokers");
        if (id) {
          toast.error("Failed to Update Import Broker");
        } else {
          toast.error("Failed to Create Import Broker");
        }
      })
      .finally(() => {
        setLoading(false);
        dispatch(resetChanges()); // Moved inside finally
      });
  };

  /*****Validate the save operation****/
  const validateAndSave = () => {
    setCheckingSequence(true);
    ImportBrokersService.checkDescriptionExist(id, description)
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
          disabled={disableSave}
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
          title={"Cancel Import Broker Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Import Broker"}
          body={"Please confirm you want to Delete this Import Broker"}
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

export default ImportBrokersFooter;
