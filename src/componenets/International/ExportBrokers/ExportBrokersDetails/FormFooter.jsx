import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../../common/Button";
import ModalComponent from "../../../common/ModalComponent";
import ExportBrokersService from "../../../../services/ExportBrokersService";
import { Button, Modal } from "react-bootstrap";
import {
  resetChanges,
  setAssignSortValue,
  setDisableSave,
  setSort,
  setViewDetail,
  toggleChangesCancelled,
} from "../../../../redux/ExportBrokersSlice";
import LoadingIcon from "../../../common/LoadingIcon";

const FormFooter = () => {
  const viewDetail = useSelector((state) => state.exportBrokersReducer.viewDetail);
  const disableSave = useSelector((state) => state.exportBrokersReducer.disableSave);
  const description = useSelector((state) => state.exportBrokersReducer.description);
  const name = useSelector((state) => state.exportBrokersReducer.name);
  const phone = useSelector((state) => state.exportBrokersReducer.phone);
  const fax = useSelector((state) => state.exportBrokersReducer.fax);
  const bolText = useSelector((state) => state.exportBrokersReducer.bolText);
  const email = useSelector((state) => state.exportBrokersReducer.email);
  const notes = useSelector((state) => state.exportBrokersReducer.notes);
  const exportBrokers = useSelector((state) => state.exportBrokersReducer.exportBrokers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, pageNo } = useParams();
  const params = useParams();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSequence, setCheckingSequence] = useState(false);

  const handleCancelShow = () => {
    if (viewDetail === false || id === undefined) {
      // edit page
      setCancelShow(true);
    } else {
      // view page
      setCancelShow(false);
      dispatch(setViewDetail(false));
      dispatch(setAssignSortValue(null));
      navigate("/export-brokers-browse");
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
      navigate("/export-brokers-browse");
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };
  //Delete Export Broker
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    ExportBrokersService.deleteExportBrokers(id)
      .then((response) => {
        navigate("/export-brokers-browse");
        toast.success("Export Broker Deleted");
      })
      .catch((error) => {
        setErrorShow(true);
        setErrorMsg(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      });
    setDeleteShow(false);
  };
  const handleSave = () => {
    setLoading(true);
    ExportBrokersService.saveExportBrokers(exportBrokers)
      .then((response) => {
        navigate("/export-brokers-browse");
        if (id) {
          toast.success("Export Broker Updated");
        } else {
          toast.success("Export Broker Created");
        }
      })
      .catch((error) => {
        navigate("/export-brokers-browse");
        if (id) {
          toast.error("Failed to Update Export Broker");
        } else {
          toast.error("Failed to Create Export Broker");
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
    ExportBrokersService.checkDescriptionExist(id, description)
      .then((response) => {
        if (response.data) {
          dispatch(setDisableSave(response.data));
        } else {
          handleSave();
        }
      })
      .catch((err) => {
        setCheckingSequence(false);
        dispatch(setDisableSave(true));
      })
      .finally(() => {
        setCheckingSequence(false);
      });
  };
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={viewDetail}
          disabled={disableSave}
          onClick={validateAndSave}
        >
          Save
        </button>
        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handleCancelShow}
        >
          Cancel
        </button>

        <button
          type="button"
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          hidden={!id || !viewDetail}
          onClick={() => {
            navigate("/export-brokers-browse/edit/" + id);
          }}
        >
          Ports
        </button>

        <ButtonComponent
          route={""}
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={!viewDetail}
          onClick={() => dispatch(setViewDetail(false))}
          label={"Edit"}
        />

        <ButtonComponent
          route={""}
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          hidden={!id || !viewDetail}
          onClick={handleDelete}
          label={"Delete"}
        />

        {/* Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Export Broker Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Export Broker"}
          body={"Please confirm you want to Delete this Export Broker"}
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
