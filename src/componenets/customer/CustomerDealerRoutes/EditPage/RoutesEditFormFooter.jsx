import React, { useState } from "react";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import ButtonComponent from "../../../common/Button";
import ModalComponent from "../../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  resetData,
  resetEdit,
  setCancelChanges,
  setOnCancel,
  setViewDetail,
} from "../../../../redux/CustomerDealerRoutesSlice";
import { useNavigate, useParams } from "react-router-dom";
import CustomerDealerRoutesService from "../../../../services/CustomerDealerRoutesService";
import { toast } from "react-hot-toast";
import { Button, Modal } from "react-bootstrap";

const RoutesEditFormFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [loadng, setLoadng] = useState(false);

  const customerdealerid = params.customerdealerid;
  const routesid = params.routesid;
  const group = params.group;
  const dealerId = params.dealerId;

  const viewDetail = useSelector((state) => state.customerDealerRoutes.viewDetail);
  const saveDisable = useSelector((state) => state.customerDealerRoutes.disableSave);
  const isPOE = useSelector((state) => state.customerDealerRoutes.isPOE);
  const motorized = useSelector((state) => state.customerDealerRoutes.motorized);
  const towable = useSelector((state) => state.customerDealerRoutes.towable);
  const poeId = useSelector((state) => state.customerDealerRoutes.poeId);
  const city = useSelector((state) => state.customerDealerRoutes.city);
  const state = useSelector((state) => state.customerDealerRoutes.state);
  const postalCode = useSelector((state) => state.customerDealerRoutes.postalCode);

  const onHandleCancel = () => {
    if (viewDetail) {
      navigate("/customer-dealer-routes/" + customerdealerid + "/" + group + "/" + dealerId);
      toast.success("Changes Cancelled");
    } else {
      setCancelShow(true);
    }
  };

  const handleCancelNo = () => {
    setCancelShow(false);
  };

  const handleCancelYes = () => {
    if (routesid) {
      dispatch(resetEdit());
      dispatch(setCancelChanges(true));
      setTimeout(() => {
        dispatch(setOnCancel(true));
      }, 10);
    } else {
      dispatch(resetData());
      navigate("/customer-dealer-routes/" + customerdealerid + "/" + group + "/" + dealerId);
    }
    dispatch(setViewDetail(true));

    setCancelShow(false);
    toast.success("Changes Cancelled");
  };

  const onHandleDelete = () => {
    setDeleteShow(true);
  };

  const handleDeleteYes = () => {
    setLoadng(true);
    CustomerDealerRoutesService.deleteRoute(routesid)
      .then(() => {
        setDeleteShow(false);
        navigate("/customer-dealer-routes/" + customerdealerid + "/" + group + "/" + dealerId);
        dispatch(resetData());
        toast.success("Customer Dealer Route Deleted");
        setLoadng(false);
      })
      .catch((error) => {
        setDeleteShow(false);
        setErrorShow(true);
        setLoadng(false);
        setErrorMsg(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      });
  };

  const handleDeleteNo = () => {
    setDeleteShow(false);
  };

  const onHandleSave = () => {
    setLoadng(true);
    CustomerDealerRoutesService.saveRoute(
      customerdealerid,
      city,
      state,
      postalCode,
      isPOE,
      poeId,
      motorized,
      towable,
      routesid
    )
      .then(() => {
        setLoadng(false);
        navigate("/customer-dealer-routes/" + customerdealerid + "/" + group + "/" + dealerId);
        if (routesid) {
          toast.success("Customer Dealer Route Updated");
        } else {
          toast.success("Customer Dealer Route Created");
        }
      })
      .catch(() => {
        setLoadng(false);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <div>
          <button
            className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
            onClick={onHandleSave}
            hidden={viewDetail}
            disabled={saveDisable}
          >
            Save
          </button>
          <button
            className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
            onClick={onHandleCancel}
          >
            Cancel
          </button>
        </div>

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

        <ModalComponent
          show={cancelShow && !viewDetail}
          onHide={handleCancelNo}
          title={"Cancel Customer Dealer Route Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {loadng && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}

        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Customer Dealer Route "}
          body={"Please confirm you want to Delete this Customer Dealer Route "}
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

export default RoutesEditFormFooter;
