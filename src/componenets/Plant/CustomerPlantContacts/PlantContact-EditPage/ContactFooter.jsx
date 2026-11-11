import React, { useState } from "react";
import { useEffect } from "react";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../common/ModalComponent";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import {
  resetChanges,
  setViewDetail,
  toggleChangesCancelled,
} from "../../../../redux/CustomerPlantContactSlice";
import PlantContactService from "../../../../services/PlantContactService";
import { Modal, Button } from "react-bootstrap";
const ContactFooter = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const contactPk = params.contactPk;
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const viewDetail = useSelector((state) => state.customerPlantContactReducer.viewDetail);
  const contactData = useSelector((state) => state.customerPlantContactReducer.contactData);
  const name = useSelector((state) => state.customerPlantContactReducer.name);
  const contact = useSelector((state) => state.customerPlantContactReducer.contact);
  const position = useSelector((state) => state.customerPlantContactReducer.position);
  const checkContact = useSelector((state) => state.customerPlantContactReducer.checkContact);
  const isBirtdayValid = useSelector((state) => state.customerPlantContactReducer.isBirtdayValid);
  const isCallBackValid = useSelector((state) => state.customerPlantContactReducer.isCallBackValid);
  const isLastCallValid = useSelector((state) => state.customerPlantContactReducer.isLastCallValid);

  const phone = useSelector((state) => formatPhoneNumber(state.customerPlantContactReducer.phone));
  const fax = useSelector((state) => formatPhoneNumber(state.customerPlantContactReducer.fax));
  const email = useSelector((state) => state.customerPlantContactReducer.email);
  //cancel
  const handleCancelShow = () => {
    if (viewDetail === false || contactPk === undefined) {
      // edit page
      setCancelShow(true);
    } else {
      // view page
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/customer-plant-contacts/" + params.customerId + "/" + params.id + "/" + params.pageNumber);
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (contactPk) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(toggleChangesCancelled());
      toast.success("Changes Cancelled");
    } else {
      navigate("/customer-plant-contacts/" + params.customerId + "/" + params.id + "/" + params.pageNumber);
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      toast.success("Changes Cancelled");
    }
  };
  //delete
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    PlantContactService.deleteContacts(contactPk)
      .then((response) => {
        navigate("/customer-plant-contacts/" + params.customerId + "/" + params.id + "/" + params.pageNumber);
        toast.success("Customer Plant Contact Deleted");
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      });
    setDeleteShow(false);
  };
  //save
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;
  useEffect(() => {
    if (
      contact !== "" &&
      name !== "" &&
      position !== "" &&
      (phone === "" || phone.match(phoneRegex)) &&
      (fax === "" || fax.match(phoneRegex)) &&
      (email === "" || email.match(emailRegex)) &&
      !checkContact &&
      isBirtdayValid &&
      isLastCallValid &&
      isCallBackValid
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    contact,
    phone,
    name,
    position,
    fax,
    email,
    checkContact,
    isBirtdayValid,
    isCallBackValid,
    isLastCallValid,
  ]);

  const saveData = () => {
    setLoad(true);
    PlantContactService.createContacts(contactData)

      .then((res) => {
        setLoad(false);
        if (contactPk) {
          toast.success("Customer Plant Contact Updated");
        } else {
          toast.success("Customer Plant Contact Created");
        }
        navigate("/customer-plant-contacts/" + params.customerId + "/" + params.id + "/" + params.pageNumber);
      })
      .catch((err) => {
        setLoad(false);
        navigate("/customer-plant-contacts/" + params.customerId + "/" + params.id + "/" + params.pageNumber);
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  const validateAndSave = () => {
    setLoad(true);
    PlantContactService.checkContactExist(contact, params.id, contactPk)
      .then((response) => {
        if (response.data) {
          setLoad(false);
          setDisableSave(response.data);
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
          type=""
          onClick={handleCancelShow}
        >
          Cancel
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={!contactPk || viewDetail === false}
          onClick={() => dispatch(setViewDetail(false))}
        >
          Edit
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={!contactPk || viewDetail === false}
          onClick={handleDelete}
        >
          Delete
        </button>
        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Customer Plant Contact Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Customer Plant Contact"}
          body={"Please confirm you want to Delete this Customer Plant Contact"}
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
export default ContactFooter;
