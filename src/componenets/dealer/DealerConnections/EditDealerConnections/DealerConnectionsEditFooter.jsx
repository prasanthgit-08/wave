import React from "react";
import ModalComponent from "../../../common/ModalComponent";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import ButtonComponent from "../../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  resetChanges,
  setDriverMiles,
  setInvoiceMiles,
  setViewDetail,
} from "../../../../redux/DealerConnectionsSearchFilterSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import DealerConnectionsService from "../../../../services/DealerConnectionsService";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-hot-toast";
import LoadingIcon from "../../../common/LoadingIcon";

const DealerConnectionsEditFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const connectionPk = params.dealerConnectionPK;
  const id = params.dealerConnectionPK;

  const dealerOnePK = useSelector((state) => state.dealerConnectionReducer.dealerOnePK);
  const dealerTwoPK = useSelector((state) => state.dealerConnectionReducer.dealerTwoPK);
  const viewDetail = useSelector((state) => state.dealerConnectionReducer.viewDetail);
  const invoiceMiles = useSelector((state) => state.dealerConnectionReducer.invoiceMiles);
  const driverMiles = useSelector((state) => state.dealerConnectionReducer.driverMiles);
  const saveDisable = useSelector((state) => state.dealerConnectionReducer.saveDisable);
  const isExisting = useSelector((state) => state.dealerConnectionReducer.isExisting);
  const dealerConnectionData = useSelector((state) => state.dealerConnectionReducer.dealerconnectionData);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [deleteshow, setDeleteShow] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const onHandleDelete = () => {
    setDeleteShow(true);
  };

  const handleDeleteYes = () => {
    setDeleteLoading(true);
    DealerConnectionsService.deleteConnections(connectionPk)
      .then(() => {
        navigate("/dealer-connections");
        toast.success("Dealer connection deleted successfully");
      })
      .catch((error) => {
        setErrorShow(true);
        setErrorMsg(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => {
        setDeleteLoading(false);
      });

    setDeleteShow(false);
  };

  const handleDeleteNo = () => {
    setDeleteShow(false);
  };
  const onHandleSave = () => {
    setSaveLoading(true);
    DealerConnectionsService.saveDealerConnection(
      dealerOnePK,
      dealerTwoPK,
      invoiceMiles,
      driverMiles,
      connectionPk
    )
      .then((response) => {
        if (connectionPk) {
          toast.success("Dealer Connection Updated");
        } else {
          toast.success("Dealer Connection Created");
        }
        dispatch(resetChanges());
        navigate("/dealer-connections");
      })
      .catch(() => {
        dispatch(resetChanges());
        toast.error("Something went wrong!!");
        navigate("/dealer-connections");
        setSaveLoading(false);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const onHandleCancel = () => {
    if (viewDetail) {
      dispatch(resetChanges());
      toast.success("Changes Cancelled");
      navigate("/dealer-connections");
    } else {
      setCancelShow(true);
    }
  };

  const handleCancelNo = () => {
    setCancelShow(false);
  };
  const handleCancelYes = () => {
    setCancelShow(false);
    dispatch(setViewDetail(true));
    if (id) {
      dispatch(setDriverMiles(dealerConnectionData.driverMiles));
      dispatch(setInvoiceMiles(dealerConnectionData.invoiceMiles));
    }
    if (!id) {
      dispatch(resetChanges());
    }

    toast.success("Changes Cancelled");
    if (!connectionPk) {
      navigate("/dealer-connections");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {(saveLoading || deleteLoading) && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <div>
          <button
            className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
            onClick={onHandleSave}
            hidden={viewDetail}
            disabled={saveDisable || isExisting || !dealerOnePK || !dealerTwoPK}
          >
            Save
          </button>
          <button
            className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
            onClick={onHandleCancel}
          >
            Cancel
          </button>
          {
            <ModalComponent
              show={cancelShow && !viewDetail}
              onHide={handleCancelNo}
              title={"Cancel Dealer Connection"}
              body={"Please confirm you want to cancel your changes."}
              handleYES={handleCancelYes}
              handleNO={handleCancelNo}
            />
          }
        </div>

        <ButtonComponent
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          label={"Flatrates"}
          hidden={!id || viewDetail === false}
          route={`/dealer-connection-flatrate-browse/${id}`}
        />

        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          label={"Edit"}
          hidden={!viewDetail}
          onClick={() => {
            dispatch(setViewDetail(false));
          }}
        />
        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          label={"Delete"}
          hidden={!viewDetail}
          onClick={onHandleDelete}
        />

        {
          <ModalComponent
            show={deleteshow}
            onHide={handleDeleteNo}
            title={"Delete Dealer Connection"}
            body={"Please confirm you want to delete this dealer connection."}
            handleYES={handleDeleteYes}
            handleNO={handleDeleteNo}
          />
        }
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

export default DealerConnectionsEditFooter;
