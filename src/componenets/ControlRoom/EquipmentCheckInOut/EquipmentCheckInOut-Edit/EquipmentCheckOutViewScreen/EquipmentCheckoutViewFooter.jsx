import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetChanges,
  setCheckDetail,
  setDriverInput,
  setUnitInput,
} from "../../../../../redux/EquipmentCheckInOutSlice";
import EquipmentCheckInOutService from "../../../../../services/EquipmentCheckInOutService";
import ModalComponent from "../../../../common/ModalComponent";

const EquipmentCheckoutViewFooter = () => {
  const [disableSave, setDisableSave] = useState(true);
  const [cancelShow, setCancelShow] = useState(false);
  const { id, pageNumber } = useParams();
  const [show, setShow] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const checkDetail = useSelector((state) => state.equipmentCheckInOutReducer.checkDetail);
  const saveFormData = useSelector((state) => state.equipmentCheckInOutReducer.saveFormData);
  const driverInput = useSelector((state) => state.equipmentCheckInOutReducer.driverInput);
  const driverId = useSelector((state) => state.equipmentCheckInOutReducer.driverId);
  const unitInput = useSelector((state) => state.equipmentCheckInOutReducer.unitInput);
  const unitId = useSelector((state) => state.equipmentCheckInOutReducer.unitId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //save
  const saveCheckout = () => {
    setIsLoading(true);
    EquipmentCheckInOutService.save(saveFormData)
      .then((response) => {
        dispatch(setCheckDetail(false));

        navigate("/equipment-check-in-out-browse-page");
        toast.success("Equipment Checked Out");
        console.log("sucesss");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        dispatch(setCheckDetail(false));
        setIsLoading(false);
        navigate("/equipment-check-in-out-browse-page");
        toast.error("Something went wrong");
      });
  };
  const handleNo = () => {
    setShow(false);
  };
  const handleYes = () => {
    setShow(false);
    saveCheckout();
  };
  //cancel

  const handleCancel = () => {
    if (checkDetail === true) {
      setCancelShow(true);
    } else {
      setCancelShow(true);
      navigate("/equipment-check-in-out-browse-page");
      dispatch(resetChanges());
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (checkDetail === true) {
      setCancelShow(false);
      navigate("/equipment-check-out-page/" + id + "/" + pageNumber);
      toast.success("Changes Cancelled");
      dispatch(setCheckDetail(false));
      dispatch(setDriverInput(""));
      dispatch(setUnitInput(""));
    } else {
      navigate("/equipment-check-in-out-browse-page");
      dispatch(resetChanges());

      toast.success("Changes Cancelled");
    }
  };
  useEffect(() => {
    if (unitId && unitInput !== "" && (!driverInput || driverId)) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [unitId, unitInput, driverId, driverInput]);
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={checkDetail === true}
          onClick={() => {
            dispatch(setCheckDetail(true));

            navigate("/equipment-check-out-page/" + id + "/" + pageNumber);
          }}
        >
          Check Out
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!checkDetail}
          disabled={disableSave}
          onClick={() => {
            setShow(true);
          }}
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
      </div>
      <ModalComponent
        show={cancelShow}
        onHide={handleCancelNo}
        title={"Cancel Check Out Changes"}
        body={"Please confirm you want to cancel your changes"}
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />

      <ModalComponent
        show={show}
        onHide={handleNo}
        title={"Check Out Confirmation"}
        className="modalMinWidth600px"
        body={"Please confirm you want to check out this equipment with this Driver for this Unit"}
        handleYES={handleYes}
        handleNO={handleNo}
      />
      {isLoading ? (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default EquipmentCheckoutViewFooter;
