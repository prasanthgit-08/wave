import React from "react";
import ButtonComponent from "../../../../common/Button";
import ModalComponent from "../../../../common/ModalComponent";

import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import DriverTMRLogsService from "../../../../../services/DriverTMRLogsService";
import {
  resetChanges,
  setViewDetail,
  toggleChangesCancelled,
  resetFields,
} from "../../../../../redux/DriverTMRLogsSlice";
import LoadingIcon from "../../../../common/LoadingIcon";
const DriverTMRLogsFooter = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = () => setDeleteReserveType(true);
  const handleDeleteNo = () => setDeleteReserveType(false);
  const [deleteReserveTypePopUp, setDeleteReserveType] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [cancelShow, setCancelShow] = useState(false);
  const pageNumber = useSelector((state) => state.driverTMRLogsReducer.pageNumber);
  const driverTrailerFK = useSelector((state) => state.driverTMRLogsReducer.driverTrailerFK);
  const driverTruckFK = useSelector((state) => state.driverTMRLogsReducer.driverTruckFK);
  const tmrperiod = useSelector((state) => state.driverTMRLogsReducer.tmrperiod);
  const notified = useSelector((state) => state.driverTMRLogsReducer.notified);
  const description = useSelector((state) => state.driverTMRLogsReducer.description);
  const returned = useSelector((state) => state.driverTMRLogsReducer.returned);
  const due = useSelector((state) => state.driverTMRLogsReducer.due);
  const returnUserFK = useSelector((state) => state.driverTMRLogsReducer.returnUserFK);
  const notes = useSelector((state) => state.driverTMRLogsReducer.notes);
  const driverTMRLogPK = useSelector((state) => state.driverTMRLogsReducer.driverTMRLogPK);
  const viewDetail = useSelector((state) => state.driverTMRLogsReducer.viewDetail);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const userFK = useSelector((state) => state.driverTMRLogsReducer.userFK);
  const isExpired = useSelector((state) => state.driverTMRLogsReducer.isExpired);
  const loginUserPK = useSelector((state) => state.driverTMRLogsReducer.loginUserPK);
  const [loading, setLoading] = useState(false);
  const isDueValid = useSelector((state) => state.driverTMRLogsReducer.isDueValid);
  const isReturnedValid = useSelector((state) => state.driverTMRLogsReducer.isReturnedValid);
  //save or update
  const saveOrUpdateDriverTMRLogs = () => {
    setLoading(true);
    DriverTMRLogsService.createDriverTMRLogs(listingDriverTMRLogsData)
      .then((response) => {
        navigate(`/driver-TMRlogs/${id}`);
        if (driverTMRLogPK) {
          toast.success("Driver TMR Log Updated");
        } else {
          toast.success("Driver TMR Log Created");
        }
      })
      .catch((error) => {
        navigate(`/driver-TMRlogs/${id}/${pageNumber}`);
        let msg = "";
        if (error.response) {
          msg = error.response.data.errorMsg;
        }
        if (msg === null || msg === "" || msg === undefined) {
          msg = "Something went wrong !! Failed to save the record !!";
        }
        toast.error(msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //save or update
  const returnedDriverTMRLogs = () => {
    DriverTMRLogsService.createDriverTMRLogs(returnedTMRLogsData)
      .then((response) => {
        navigate(`/driver-TMRlogs/${id}`);
        if (driverTMRLogPK) {
          toast.success("Driver TMR Log Returned");
        } else {
          toast.success("Driver TMR Log  Not Returned");
        }
      })
      .catch((error) => {
        navigate(`/driver-TMRlogs/${id}/${pageNumber}`);
        let msg = "";
        if (error.response) {
          console.log(error.response.data);
          msg = error.response.data.errorMsg;
        }
        if (msg === null || msg === "" || msg === undefined) {
          msg = "Something went wrong !! Failed to returned the record !!";
        }
        toast.error(msg);
      });
  };
  // console.log("Login User PK in Footer",loginUserPK);
  const returnedTMRLogsData = {
    driverTMRLogPK,
    driverFK: id,
    driverTrailerFK,
    driverTruckFK,
    tmrperiod,
    notified,
    due,
    returned: new Date(),
    returnUserFK: loginUserPK,
    notes,
  };

  const listingDriverTMRLogsData = {
    driverTMRLogPK,
    driverFK: id,
    driverTrailerFK,
    driverTruckFK,
    tmrperiod,
    notified,
    due,
    returned,
    returnUserFK,
    notes,
  };

  useEffect(() => {
    // Enable save if all conditions are satisfied
    if (
      description !== "" &&
      tmrperiod !== "" &&
      notified !== "" &&
      due !== "" &&
      isDueValid !== false &&
      isReturnedValid !== false &&
      (!returned || (returned && userFK))
    ) {
      // enable save
      setDisableSave(false);
    } else {
      // disable save
      setDisableSave(true);
    }
  }, [tmrperiod, description, notified, due, returned, userFK, isDueValid, isReturnedValid]);

  //cancel
  const handleCancelShow = () => {
    if (viewDetail === false || driverTMRLogPK === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      dispatch(resetFields());
      navigate(`/driver-TMRlogs/${id}`);
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (driverTMRLogPK) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      toast.success("Changes Cancelled");
      dispatch(toggleChangesCancelled());
    } else {
      navigate(`/driver-TMRlogs/${id}`);
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };

  //delete
  const handleDeleteYes = () => {
    if (returned === "") {
      DriverTMRLogsService.deleteDriverTMRLogs(driverTMRLogPK)
        .then((response) => {
          navigate(`/driver-TMRlogs/${id}`);
          toast.success("Driver TMR Log Deleted");
          dispatch(resetChanges());
          console.log("deleted...");
        })
        .catch((error) => {
          setErrorShow(true);
          setErrorMsg(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
          console.error(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        });
    } else {
      setErrorShow(true);
      setErrorMsg("Returned in not Null!! Failed to delete!!");
      // setErrorMsg("Something went wrong!! Failed to delete!!");
    }
    setDeleteReserveType(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={() => {
            saveOrUpdateDriverTMRLogs();
          }}
        >
          {" "}
          Save{" "}
        </button>
        <button
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={!driverTMRLogPK || viewDetail === false || returned || !isExpired}
          onClick={() => {
            returnedDriverTMRLogs();
          }}
        >
          {" "}
          Returned{" "}
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={t("edit.SpecialCodes.page.resources.tab.cancel")}
          type="button"
          onClick={handleCancelShow}
        >
          Cancel
        </button>
        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={t("edit.SpecialCodes.page.resources.tab.edit")}
          hidden={!driverTMRLogPK || viewDetail === false}
          onClick={() => {
            dispatch(setViewDetail(false));
          }}
        />

        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={t("edit.SpecialCodes.page.resources.tab.delete")}
          hidden={!driverTMRLogPK || viewDetail === false}
          onClick={handleDelete}
        />

        {/* {Modal for edit Cancel Confirmation}     */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Driver TMR Log Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        {/* {Modal for Delete Confirmation} */}
        <ModalComponent
          show={deleteReserveTypePopUp}
          onHide={handleDeleteNo}
          title={"Delete Driver TMR Log"}
          body={"Please Confirm you want to Delete this Driver TMR Log"}
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

export default DriverTMRLogsFooter;
