import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCustomerData, setViewDetail } from "../../../../redux/PlantToPlantTransferSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { t } from "i18next";
import PlantToPlantTransferService from "../../../../services/PlantToPlantTransferService";
import ModalComponent from "../../../common/ModalComponent";
import { Button, Modal } from "react-bootstrap";
import LoadingIcon from "../../../common/LoadingIcon";
function FormFooter({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);

  const { viewDetail, saveDisable, saveData } = useSelector((state) => state.plantToPlantTransferReducer);
  const [loading, setLoading] = useState(false);
  const handleCancelShow = () => {
    if (viewDetail && id) {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/plant-to-plant-transfer");
      toast.success("Changes Cancelled");
    } else {
      setCancelShow(true);
    }
  };

  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      toast.success("Changes Cancelled");
    } else {
      navigate("/plant-to-plant-transfer-customer");
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };

  // for deleting the data using id
  const handleDeleteYes = () => {
    PlantToPlantTransferService.deletePlantToPlantTransfer(id)
      .then((response) => {
        // navigate(-1);
        navigate("/plant-to-plant-transfer");
        toast.success("Plant To Plant Transfer Deleted");
      })
      .catch((error) => {
        console.error(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        toast.error(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      });
    setDeleteShow(false);
  };

  // for saving the data
  const savePlantToPlantTransfer = () => {
    setLoading(true);
    PlantToPlantTransferService.savePlantToPlantTransfer(saveData)
      .then((response) => {
        navigate("/plant-to-plant-transfer");
        dispatch(resetCustomerData());
        let success = response.data;
        if (!success) {
          toast.success("Plant to Plant Transfer Updated");
        } else if (success) {
          toast.success("Plant to Plant Transfer Created");
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
          disabled={!saveDisable}
          onClick={savePlantToPlantTransfer}
        >
          {t("save.button")}
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
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
          title={"Cancel Plant To Plant Transfer Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={() => setCancelShow(false)}
        />

        <ModalComponent
          show={deleteShow}
          onHide={() => setDeleteShow(false)}
          title={"Delete Plant To Plant Transfer"}
          body={"Please confirm you want to Delete this Plant To Plant Transfer"}
          handleYES={handleDeleteYes}
          handleNO={() => setDeleteShow(false)}
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
