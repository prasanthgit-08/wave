import { parseLocalDate } from "../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../../../common/Button";
import ModalComponent from "../../../../common/ModalComponent";
import DriverComplianceItemsService from "../../../../../services/DriverComplianceItemsService";
import { Button, Modal } from "react-bootstrap";
import {
  setChangesCancelled,
  setViewDetail,
  setDriverFK,
  setBlockFlag,
  setChangeColorOfHistory,
  setNumber,
  setSortValue,
  setSortFlag,
  setHistoryBlockReason,
} from "../../../../../redux/DriverComplianceItemsSlice";

function FormFooter({ setCheck }) {
  const { driverId, id } = useParams();

  const [cancelShow, setCancelShow] = useState(false);
  const [disableSave, setDisableSave] = useState(false);
  const [useBlockModal, setUseBlockModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const description = useSelector((state) => state.DriverComplianceItemsReducer.description);
  const lastComplianceDate = useSelector((state) => state.DriverComplianceItemsReducer.lastComplianceDate);
  const nextComplianceDate = useSelector((state) => state.DriverComplianceItemsReducer.nextComplianceDate);
  const blockDate = useSelector((state) => state.DriverComplianceItemsReducer.blockDate);
  const blockReason = useSelector((state) => state.DriverComplianceItemsReducer.blockReason);
  const driverFK = useSelector((state) => state.DriverComplianceItemsReducer.driverFK);
  const complianceItemId = useSelector((state) => state.DriverComplianceItemsReducer.complianceItemId);
  const useBlockDate = useSelector((state) => state.DriverComplianceItemsReducer.useBlockDate);
  const viewDetail = useSelector((state) => state.DriverComplianceItemsReducer.viewDetail);
  const lastComplianceDateValid = useSelector(
    (state) => state.DriverComplianceItemsReducer.lastComplianceDateValid
  );
  const nextComplianceDateValid = useSelector(
    (state) => state.DriverComplianceItemsReducer.nextComplianceDateValid
  );
  const blockDateValid = useSelector((state) => state.DriverComplianceItemsReducer.blockDateValid);
  const complianceNotes = useSelector((state) => state.DriverComplianceItemsReducer.complianceNotes);
  const blockFlag = useSelector((state) => state.DriverComplianceItemsReducer.blockFlag);

  const saveRecord = () => {
    setLoading(true);
    DriverComplianceItemsService.createOrUpdateRecord(formRecords)
      .then((res) => {
        if (localStorage.getItem("driverComplianceFromDriver") === "true") {
          localStorage.removeItem("driverComplianceFromDriver");
        }
        navigate(`/driver-compliance-items/${driverId}`);
        if (id) toast.success("Driver Compliance Item  Updated");
        else toast.success("Driver Compliance Item  Created");
      })
      .catch((err) => {
        navigate(`/driver-compliance-items-view/${driverId}/${id}`);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const UnBlockRecord = (id) => {
    setLoading(true);
    DriverComplianceItemsService.unBlockRecord(id)
      .then((res) => {
        if (blockFlag) {
          setCheck((prev) => !prev);
        }
        dispatch(setBlockFlag(true));
        setLoading(false);
        toast.success("Driver Compliance Item Unblocked");
        navigate(`/driver-compliance-items-view/${driverId}/${id}`);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Something went wrong");
        navigate(`/driver-compliance-items-view/${driverId}/${id}`);
      });
  };
  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      if (localStorage.getItem("driverComplianceFromDriver") === "true") {
        localStorage.removeItem("driverComplianceFromDriver");
      }
      setCancelShow(true);
    } else {
      if (localStorage.getItem("driverComplianceFromDriver") === "true") {
        localStorage.removeItem("driverComplianceFromDriver");
      }
      setCancelShow(false);
      dispatch(setChangesCancelled(true));
      dispatch(setChangeColorOfHistory(false));
      dispatch(setHistoryBlockReason(""));
      dispatch(setNumber(0));
      dispatch(setSortValue(null));
      dispatch(setSortFlag(false));
      dispatch(setViewDetail(false));
      navigate(`/driver-compliance-items/${driverId}`);
      toast.success("Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      if (localStorage.getItem("driverComplianceFromDriver") === "true") {
        localStorage.removeItem("driverComplianceFromDriver");
      }
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(setChangesCancelled(true));
      dispatch(setChangeColorOfHistory(false));
      dispatch(setHistoryBlockReason(""));
      dispatch(setNumber(0));
      dispatch(setSortValue(null));
      dispatch(setSortFlag(false));
      toast.success("Changes Cancelled");
    } else {
      if (localStorage.getItem("driverComplianceFromDriver") === "true") {
        localStorage.removeItem("driverComplianceFromDriver");
      }
      navigate(`/driver-compliance-items/${driverId}`);
      dispatch(setViewDetail(false));
      toast.success("Cancelled");
    }
  };
  useEffect(() => {
    if (
      (useBlockDate && !blockDate && blockReason) ||
      (useBlockDate && blockDate && !blockReason) ||
      !blockDateValid ||
      !lastComplianceDateValid ||
      !nextComplianceDateValid
    ) {
      setDisableSave(true);
    } else {
      setDisableSave(false);
    }
  }, [
    useBlockDate,
    blockDate,
    blockReason,
    blockDateValid,
    lastComplianceDateValid,
    nextComplianceDateValid,
  ]);

  useEffect(() => {
    dispatch(setDriverFK(driverId));
  }, [driverId, dispatch]);

  const formRecords = {
    driverComplianceItemPK: id,
    driverId: driverFK || driverId,
    description: description,
    complianceItemId: complianceItemId,
    complianceNotes: complianceNotes,
    blockDate: blockDate,
    nextDate: nextComplianceDate,
    lastDate: lastComplianceDate,
    blockReason: blockReason,
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={viewDetail}
          onClick={saveRecord}
          disabled={disableSave}
        >
          Save
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={!viewDetail || !useBlockDate}
          disabled={!blockDate || !blockReason || parseLocalDate(blockDate) > new Date()}
          onClick={() => {
            setUseBlockModal(true);
          }}
        >
          UnBlock
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
          hidden={!viewDetail}
          onClick={() => {
            dispatch(setViewDetail(false));
          }}
        />

        {/* model Active*/}

        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Driver Compliance Item Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {/* model Active*/}
      </div>

      <Modal show={useBlockModal} onHide={() => setUseBlockModal(false)} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className="font-18 h-100 ">Unblock Driver Compliance Item</Modal.Title>
        </Modal.Header>
        <Modal.Body className="font-14 h-100">
          Please confirm you want to Unblock this Driver Compliance Item
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              UnBlockRecord(id);
              setUseBlockModal(false);
            }}
          >
            Yes
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setUseBlockModal(false);
            }}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
      {loading && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormFooter;
