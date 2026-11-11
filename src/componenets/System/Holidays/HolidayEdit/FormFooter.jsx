import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetChanges,
  setChangesCancelled,
  setIsDateValid,
  setViewDetail,
} from "../../../../redux/HolidaysSlice";
import HolidaysService from "../../../../services/HolidaysService";

import styles from "../../../../styles/QuarterScreen.module.css";
import ButtonComponent from "../../../common/Button";
import ModalComponent from "../../../common/ModalComponent";
import LoadingIcon from "../../../common/LoadingIcon";

function FormFooter({ styles }) {
  const { id, pageNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disableSave, setDisableSave] = useState(true);
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const viewDetail = useSelector((state) => state.holidaysReducer.viewDetail);
  const holidayPK = useSelector((state) => state.holidaysReducer.holidayPK);
  const date = useSelector((state) => state.holidaysReducer.date);
  const description = useSelector((state) => state.holidaysReducer.description);
  const us = useSelector((state) => state.holidaysReducer.us);
  const canadian = useSelector((state) => state.holidaysReducer.canadian);
  const isDateValid = useSelector((state) => state.holidaysReducer.isDateValid);
  const atleastOneCheck = useSelector((state) => state.holidaysReducer.atleastOneCheck);
  const changesCancelled = useSelector((state) => state.holidaysReducer.changesCancelled);

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));

      navigate(`/holidays`);
      toast.success("Changes Cancelled");
    }
  };

  // save validation

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(setIsDateValid(true));
      dispatch(setChangesCancelled(true));
      toast.success("Changes Cancelled");
    } else {
      navigate(`/holidays/`);
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      toast.success("Changes Cancelled");
    }
  };
  const checkDateExist = () => {
    setLoading(true);
    HolidaysService.checkDateExist(date?.date, id)
      .then((res) => {
        dispatch(setIsDateValid(res.data ? true : false));
        if (res.data) {
          saveRecord();
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const formData = {
    holidayPK,
    date: date?.date,
    description,
    us,
    canadian,
  };
  const saveRecord = () => {
    setLoading(true);
    HolidaysService.createOrUpdateRecord(formData)

      .then((res) => {
        if (id) {
          toast.success("Holiday Updated");
        } else {
          toast.success("Holiday Created");
        }
        navigate(`/holidays`);
      })
      .catch((err) => {
        navigate(`/holidays/${id}/${pageNumber}`);
        toast.error("Something went wrong");
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    setDeleteShow(false);
    setLoading(true);
    HolidaysService.deleteRecord(id)
      .then((response) => {
        navigate(`/holidays`);
        toast.success(" Holiday Deleted");
      })
      .catch((err) => {
        toast.error("Something went wrong");
        navigate(`/holidays/${id}/${pageNumber}`);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (description !== "" && date?.date && date?.isDateValid && isDateValid && !atleastOneCheck) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [date, description, isDateValid, atleastOneCheck, us, canadian]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          type=""
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={() => checkDateExist()}
        >
          Save
        </button>

        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={!id || viewDetail === false}
          onClick={() => {
            dispatch(setViewDetail(false));
          }}
          label={"Edit"}
        />

        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={!id || viewDetail === false}
          onClick={handleDelete}
          label={"Delete"}
        />

        {/* Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Holiday  Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Holiday  "}
          body={"Please confirm you want to delete this Holiday"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
      </div>
    </div>
  );
}

export default FormFooter;
