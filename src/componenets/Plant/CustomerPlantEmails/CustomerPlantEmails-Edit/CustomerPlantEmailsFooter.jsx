import React from "react";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import {
  resetChanges,
  setReportsAsCSV,
  setReportsAsExcel,
  setReportsAsPDF,
  setReportsAsText,
  setViewDetail,
  toggleChangesCancelled,
} from "../../../../redux/CustomerPlantEmailSlice";
import PlantEmailService from "../../../../services/PlantEmailService";
import { Modal, Button } from "react-bootstrap";
const CustomerPlantEmailsFooter = () => {
  const params = useParams();
  const emailPK = params.emailPk;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [load, setLoad] = useState(false);

  const name = useSelector((state) => state.customerPlantEmailReducer.name);
  const email = useSelector((state) => state.customerPlantEmailReducer.email);
  const viewDetail = useSelector((state) => state.customerPlantEmailReducer.viewDetail);
  const saveFormData = useSelector((state) => state.customerPlantEmailReducer.saveFormData);
  const isReportsTabValid = useSelector((state) => state.customerPlantEmailReducer.isReportsTabValid);
  const isDetailsTabValid = useSelector((state) => state.customerPlantEmailReducer.isDetailsTabValid);
  const isDispatchTabValid = useSelector((state) => state.customerPlantEmailReducer.isDispatchTabValid);
  //cancel
  const handleCancelShow = () => {
    if (viewDetail === false || emailPK === undefined) {
      // edit page
      setCancelShow(true);
    } else {
      // view page
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/customer-plant-emails/" + params.customerId + "/" + params.id + "/" + params.pageNumber);
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (emailPK) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(toggleChangesCancelled());
      toast.success("Changes Cancelled");
      PlantEmailService.getPlantEmailById(emailPK).then((response) => {
        const { data } = response;
        dispatch(setReportsAsCSV(data.reportsAsCSV));
        dispatch(setReportsAsExcel(data.reportsAsExcel));
        dispatch(setReportsAsText(data.reportsAsText));
        dispatch(setReportsAsPDF(data.reportsAsPDF));
      });
    } else {
      navigate("/customer-plant-emails/" + params.customerId + "/" + params.id + "/" + params.pageNumber);
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      toast.success("Changes Cancelled");
    }
  };
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    PlantEmailService.deletePlantEmail(emailPK)
      .then((response) => {
        navigate("/customer-plant-emails/" + params.customerId + "/" + params.id + "/" + params.pageNumber);
        toast.success("Customer Plant Email Deleted");
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      });
    setDeleteShow(false);
  };
  //tab validation
  useEffect(() => {
    if (isDetailsTabValid === true && isReportsTabValid === true && isDispatchTabValid === true) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [isDetailsTabValid, isReportsTabValid, isDispatchTabValid]);

  const saveData = () => {
    setLoad(true);
    PlantEmailService.createPlantEmail(saveFormData)

      .then((res) => {
        setLoad(false);
        if (emailPK) {
          toast.success("Customer Plant Email Updated");
        } else {
          toast.success("Customer Plant Email Created");
        }
        navigate("/customer-plant-emails/" + params.customerId + "/" + params.id + "/" + params.pageNumber);
        dispatch(resetChanges());
      })
      .catch((err) => {
        setLoad(false);
        navigate("/customer-plant-emails/" + params.customerId + "/" + params.id + "/" + params.pageNumber);
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  const validateAndSave = () => {
    setLoad(true);
    PlantEmailService.checkNameAndEmailValid(name, email, emailPK, params.id)
      .then((response) => {
        if (response.data) {
          setDisableSave(response.data);
          setLoad(false);
        } else {
          saveData();
        }
      })
      .catch((err) => {
        setLoad(false);
        setDisableSave(true);
      });
  };
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
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
          hidden={!emailPK || viewDetail === false}
          onClick={() => dispatch(setViewDetail(false))}
        >
          Edit
        </button>
        <button
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={!emailPK || viewDetail === false}
          onClick={handleDelete}
        >
          Delete
        </button>

        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Customer Plant Email Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Customer Plant Email "}
          body={"Please confirm you want to Delete this Customer Plant Email "}
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

export default CustomerPlantEmailsFooter;
