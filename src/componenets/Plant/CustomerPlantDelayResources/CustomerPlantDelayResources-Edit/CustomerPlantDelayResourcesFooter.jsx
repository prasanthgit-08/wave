import React from "react";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import { t } from "i18next";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { Modal, Button } from "react-bootstrap";
import ModalComponent from "../../../common/ModalComponent";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import {
  setViewDetail,
  toggleChangesCancelled,
  resetChanges,
} from "../../../../redux/CustomerPlantDelaySlice";
import PlantDelayResourcesService from "../../../../services/PlantDelayResourcesService";
const CustomerPlantDelayResourcesFooter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const delayPk = params.delayPk;
  const plantId = params.id;
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [load, setLoad] = useState(false);
  const viewDetail = useSelector((state) => state.customerPlantDelayReducer.viewDetail);
  const saveData = useSelector((state) => state.customerPlantDelayReducer.saveData);
  const description = useSelector((state) => state.customerPlantDelayReducer.description);
  const delay = useSelector((state) => state.customerPlantDelayReducer.delay);
  const damage = useSelector((state) => state.customerPlantDelayReducer.damage);
  const breakdown = useSelector((state) => state.customerPlantDelayReducer.breakdown);
  const checkDescription = useSelector((state) => state.customerPlantDelayReducer.checkDescription);
  const phone = useSelector((state) => formatPhoneNumber(state.customerPlantDelayReducer.phone));
  //cancel
  const handleCancelShow = () => {
    if (viewDetail === false || delayPk === undefined) {
      // edit page
      setCancelShow(true);
    } else {
      // view page
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate(
        "/customer-plant-delay-resources/" + params.customerId + "/" + params.id + "/" + params.pageNumber
      );
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (delayPk) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(toggleChangesCancelled());
      toast.success("Changes Cancelled");
    } else {
      navigate(
        "/customer-plant-delay-resources/" + params.customerId + "/" + params.id + "/" + params.pageNumber
      );
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      toast.success("Changes Cancelled");
    }
  };
  //save
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  useEffect(() => {
    if (
      description !== "" &&
      (phone === "" || phone.match(phoneRegex)) &&
      (damage || breakdown || delay) &&
      !checkDescription
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description, phone, damage, breakdown, delay, checkDescription]);
  const save = () => {
    setLoad(true);
    PlantDelayResourcesService.createPlantDelay(saveData)

      .then((res) => {
        setLoad(false);
        if (delayPk) {
          toast.success("Customer Plant Delay Resource Updated");
        } else {
          toast.success("Customer Plant Delay Resource Created");
        }
        navigate(
          "/customer-plant-delay-resources/" + params.customerId + "/" + params.id + "/" + params.pageNumber
        );
      })

      .catch((err) => {
        setLoad(false);
        navigate(
          "/customer-plant-delay-resources/" + params.customerId + "/" + params.id + "/" + params.pageNumber
        );
        toast.error("Something went wrong");
        console.log(err);
      });
  };
  //delete
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    PlantDelayResourcesService.deletePlantdelay(delayPk)
      .then((response) => {
        navigate(
          "/customer-plant-delay-resources/" + params.customerId + "/" + params.id + "/" + params.pageNumber
        );
        toast.success("Customer Plant Delay Resource Deleted");
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      });
    setDeleteShow(false);
  };

  const validateAndSave = () => {
    setLoad(true);
    PlantDelayResourcesService.checkdescriptionExist(description, delayPk, plantId)
      .then((response) => {
        if (response.data) {
          setLoad(false);
          setDisableSave(true);
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
          hidden={!delayPk || viewDetail === false}
          onClick={() => dispatch(setViewDetail(false))}
        >
          Edit
        </button>
        <button
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={!delayPk || viewDetail === false}
          onClick={handleDelete}
        >
          Delete
        </button>

        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Customer Plant Delay Resource Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Customer Plant Delay Resource "}
          body={"Please confirm you want to Delete this Customer Plant Delay Resource "}
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

export default CustomerPlantDelayResourcesFooter;
