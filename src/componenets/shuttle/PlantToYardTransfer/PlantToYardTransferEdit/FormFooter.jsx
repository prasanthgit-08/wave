import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setViewDetail,
  resetCustomerData,
  resetChanges,
  setSaveData,
  setCustomerFk,
} from "../../../../redux/PlantToYardTransfersSlice";
import PlantToYardTransferService from "../../../../services/PlantToYardTransferService";
import ModalComponent from "../../../common/ModalComponent";
import { t } from "i18next";
import { Modal, Button } from "react-bootstrap";
import LoadingIcon from "../../../common/LoadingIcon";

function FormFooter({ id }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);

  const viewDetail = useSelector((state) => state.plantToYardTransfersReducer.viewDetail);
  const saveData = useSelector((state) => state.plantToYardTransfersReducer.saveData);
  const saveEnable = useSelector((state) => state.plantToYardTransfersReducer.saveEnable);

  /**
   * For handling cancel
   */
  const handleCancelShow = () => {
    if (viewDetail && id) {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/plant-to-yard-transfer");
      toast.success("Changes cancelled");
    } else {
      setCancelShow(true);
    }
  };

  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      toast.success("Changes cancelled");
    } else {
      navigate("/plant-to-yard-transfer-customer");
      dispatch(setViewDetail(false));
      toast.success("Changes cancelled");
      dispatch(resetChanges());
    }
  };

  /**
   * For handling delete
   * After delete, the browser is navigated to previous page, which is the listing page "/plant-to-yard-transfer"
   */
  const handleDelete = () => setDeleteShow(true);

  const handleDeleteNo = () => setDeleteShow(false);

  const handleDeleteYes = () => {
    PlantToYardTransferService.deletePlantToYardTransfers(id)
      .then((response) => {
        navigate("/plant-to-yard-transfer");
        toast.success("Plant To Yard Shuttle Deleted");
      })
      .catch((error) => {
        console.error(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        toast.error(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      });
    setDeleteShow(false);
  };

  /**
   * This function calls the service which saves the data for the plant-to-yard
   * And reset the slice variables
   */
  const savePlantToYardShuttle = () => {
    setLoading(true);
    PlantToYardTransferService.saveOrUpdatePlantToYardTransfers(saveData)
      .then((response) => {
        navigate("/plant-to-yard-transfer");
        dispatch(resetCustomerData());
        let success = response.data;
        if (!success) {
          toast.success("Plant to Yard Transfer Updated");
        } else if (success) {
          toast.success("Plant to Yard Transfer Created");
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
          disabled={!saveEnable}
          onClick={savePlantToYardShuttle}
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
          {t("edit.customerOpenBalance.page.resources.tab.edit")}
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={!viewDetail}
          onClick={handleDelete}
        >
          {t("edit.customerOpenBalance.page.resources.tab.delete")}
        </button>

        <ModalComponent
          show={cancelShow}
          onHide={() => setCancelShow(false)}
          title={"Cancel Plant To Yard Shuttle Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={() => setCancelShow(false)}
        />

        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Plant To Yard Shuttle"}
          body={"Please confirm you want to Delete this Plant To Yard Shuttle"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
        <Modal show={errorShow} onHide={() => setErrorShow(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 temp-red-color">Validation failed!</Modal.Title>
          </Modal.Header>

          <Modal.Body className="font-14 h-100">
            {errorMsg && errorMsg?.length > 1
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

export default FormFooter;
