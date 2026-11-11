import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  resetChanges,
  setChangesCancelled,
  setIsStateAndTowableUnique,
  setViewDetail,
} from "../../../redux/StatePermitsSlice";
import ButtonComponent from "../../common/Button";
import ModalComponent from "../../common/ModalComponent";
import StatePermitsService from "../../../services/StatePermitsService";
import LoadingIcon from "../../common/LoadingIcon";

function FormFooter() {
  const { id, pageNumber } = useParams();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [loader, setLoader] = useState(false);

  const viewDetail = useSelector((state) => state.statePermitsReducer.viewDetail);
  const stateId = useSelector((state) => state.statePermitsReducer.stateFK);
  const towable = useSelector((state) => state.statePermitsReducer.towable);
  const motorized = useSelector((state) => state.statePermitsReducer.motorized);
  const statePermitPK = useSelector((state) => state.statePermitsReducer.statePermitPK);
  const emailText = useSelector((state) => state.statePermitsReducer.emailText);
  const pickupStateInput = useSelector((state) => state.statePermitsReducer.pickupStateInput);
  const pickupStateId = useSelector((state) => state.statePermitsReducer.pickupStateId);
  const changesCancelled = useSelector((state) => state.statePermitsReducer.changesCancelled);
  const isStateAndTowableUnique = useSelector((state) => state.statePermitsReducer.isStateAndTowableUnique);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = {
    statePermitPK: statePermitPK || null,
    stateId: stateId,
    towable: towable,
    motorized: motorized,
    emailText: emailText,
  };

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));

      navigate(`/state-permits`);
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      dispatch(setChangesCancelled(true));
      dispatch(setViewDetail(true));

      setCancelShow(false);
      toast.success("Changes Cancelled");
    } else {
      navigate(`/state-permits`);
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      toast.success("Changes Cancelled");
    }
  };

  const saveRecord = () => {
    setLoader(true);
    StatePermitsService.createOrUpdateRecord(formData)
      .then((res) => {
        navigate(`/state-permits`);
        if (id) toast.success("State Permit  Updated");
        else toast.success("State Permit  Created");
      })
      .catch((err) => {
        navigate(`/state-permits-edit/${statePermitPK}/${pageNumber}`);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    StatePermitsService.deleteStatePermits(id)
      .then((response) => {
        navigate(`/state-permits`);
        toast.success("State Permit Deleted");
        dispatch(resetChanges());
      })
      .catch((err) => {
        navigate(`/state-permits`);
        toast.error("Something went wrong");
      });
    setDeleteShow(false);
  };
  useEffect(() => {
    if (
      pickupStateInput !== "" &&
      stateId !== "" &&
      emailText !== "" &&
      (towable || motorized) &&
      isStateAndTowableUnique &&
      id !== ""
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [pickupStateInput, emailText, towable, motorized, isStateAndTowableUnique, pickupStateId, stateId, id]);
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loader && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={() => saveRecord()}
        >
          Save
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={false}
          onClick={handleCancel}
        >
          Cancel
        </button>

        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={"Edit"}
          hidden={!id || viewDetail === false}
          onClick={() => {
            dispatch(setViewDetail(false));
            dispatch(setIsStateAndTowableUnique(true));
          }}
        />
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!id || viewDetail === false}
          onClick={handleDelete}
          disabled={""}
        >
          Delete
        </button>

        {/* model Active*/}

        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel State Permit Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete State Permit "}
          body={"Please confirm you want to delete this State Permit"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
        {/* model Active*/}
      </div>
    </div>
  );
}

export default FormFooter;
