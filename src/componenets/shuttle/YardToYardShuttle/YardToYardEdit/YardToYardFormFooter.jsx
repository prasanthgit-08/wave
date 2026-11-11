import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import YardToYardShuttleService from "../../../../services/YardToYardShuttleService";
import ModalComponent from "../../../common/ModalComponent";
import { t } from "i18next";
import { Button, Modal } from "react-bootstrap";
import { setSaveData, setViewDetail } from "../../../../redux/YardToYardShuttleSlice";
import LoadingIcon from "../../../common/LoadingIcon";
import { useAppNavigate } from "../../../../hooks/useAppNavigate";
function YardToYardFormFooter({ selectedId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { goBack } = useAppNavigate();

  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const [errorShow, setErrorShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const { viewDetail, saveDisable, saveData } = useSelector((state) => state.yardToYardShuttleReducer);

  const handleCancelShow = () => {
    if (viewDetail && selectedId) {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/yard-to-yard-shuttle");
      toast.success("Changes Cancelled");
    } else {
      setCancelShow(true);
    }
  };

  const handleCancelYes = () => {
    if (selectedId) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      toast.success("Changes Cancelled");
    } else {
      navigate("/yard-to-yard-shuttle");
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };

  /**
   * For handling delete
   * After delete, the browser is navigated to previous page, which is the listing page "/yard-to-yard-shuttle"
   */
  const handleDeleteYes = () => {
    YardToYardShuttleService.deleteYardToYardShuttle(selectedId)
      .then((response) => {
        goBack();
        toast.success("Yard To Yard Shuttle Deleted");
      })
      .catch((error) => {
        console.error(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        toast.error(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      });
    setDeleteShow(false);
  };

  /**
   * This function calls the service which saves the data for the yard-to-yard-shuttle
   * And reset the slice variables
   */
  const saveYardToYardShuttle = () => {
    setLoading(true);
    YardToYardShuttleService.saveYardToYardShuttleData(saveData)
      .then((response) => {
        navigate("/yard-to-yard-shuttle");
        dispatch(setSaveData(null));
        let success = response.data;
        if (!success) {
          toast.success("Yard To Yard Shuttle Updated");
        } else if (success) {
          toast.success("Yard To Yard Shuttle Created");
        }
      })
      .catch((error) => {
        setErrorShow(true);
        console.error(error.response.data.errorMsg);
        setErrorMsg(error.response.data.errorMsg.split(", "));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={viewDetail}
          disabled={saveDisable}
          onClick={saveYardToYardShuttle}
        >
          {t("save.button")}
        </button>

        <button
          className="btn  btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={handleCancelShow}
        >
          {t("cancel.button")}
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={!viewDetail}
          onClick={() => {
            dispatch(setViewDetail(false));
          }}
        >
          {t("edit.button")}
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={!viewDetail}
          onClick={() => setDeleteShow(true)}
        >
          {t("delete.button")}
        </button>

        <ModalComponent
          show={cancelShow}
          onHide={() => setCancelShow(false)}
          title={"Cancel Yard To Yard Shuttle Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={() => setCancelShow(false)}
        />

        <ModalComponent
          show={deleteShow}
          onHide={() => setDeleteShow(false)}
          title={"Delete Yard To Yard Shuttle"}
          body={"Please confirm you want to Delete this Yard To Yard Shuttle"}
          handleYES={handleDeleteYes}
          handleNO={() => setDeleteShow(false)}
        />

        <Modal show={errorShow} onHide={() => setErrorShow(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 temp-red-color">Validation failed!</Modal.Title>
          </Modal.Header>

          <Modal.Body className="font-14 h-100">
            {errorMsg.length > 1
              ? errorMsg.map((error, i) => (
                  <span key={i}>
                    {error}
                    <br></br>
                  </span>
                ))
              : errorMsg}
          </Modal.Body>

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

export default YardToYardFormFooter;
