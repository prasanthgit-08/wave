import React, { useEffect, useState } from "react";
import ButtonComponent from "../../../common/Button";
import { t } from "i18next";
import { useParams, useNavigate } from "react-router-dom";
import CustomerOpenBalanceService from "../../../../services/CustomerOpenBalanceService";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import {
  setViewDetail,
  setCustomerOpenBalanceData,
  setCobData,
  setCustomerFK,
  toggleChangesCancelled,
  resetChanges,
} from "../../../../redux/customerOpenBalanceSlice";
import ModalComponent from "../../../common/ModalComponent";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import { Button, Modal } from "react-bootstrap";
export default function COBEditFooter() {
  const { id } = useParams();
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cobData = useSelector((state) => state.customerOpenBalanceReducer.customerOpenBalanceData);
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [active, setActive] = useState(false);
  const [activeShow, setActiveShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  let viewDetail = useSelector((state) => state.customerOpenBalanceReducer.viewDetail);
  const params = useParams();
  const customerFK = params.customerId;
  const customerPageNumber = params.customerPageNumber;
  const customerOpenBalancePK = params.id;
  const description = useSelector((state) => state.customerOpenBalanceReducer.description);
  const amount = useSelector((state) => state.customerOpenBalanceReducer.amount);
  const balance = useSelector((state) => state.customerOpenBalanceReducer.balance);
  const checkDescriptionExist = useSelector((state) => state.customerOpenBalanceReducer.cobDescriptionExist);
  useEffect(() => {
    dispatch(setCustomerFK(customerFK));
  }, [customerFK]);

  const editCustomerOpenBalanceData = useSelector(
    (state) => state.customerOpenBalanceReducer.customerOpenBalances
  );

  const [disableSave, setDisableSave] = useState(true);

  useEffect(() => {
    const isValidAmount = amount && !isNaN(parseFloat(amount));

    if (description && balance && isValidAmount && !checkDescriptionExist) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [description, amount, checkDescriptionExist, balance]);

  //Save or Update CustomerOpenBalances
  const saveOrUpdateCustomerOpenBalance = (e) => {
    setLoad(true);
    CustomerOpenBalanceService.createCustomerOpenBalances(editCustomerOpenBalanceData)
      .then((response) => {
        setLoad(false);
        navigate("/customer-open-balance/" + customerFK + "/" + customerPageNumber);
        if (id) toast.success("Customer Open Balance Updated");
        else toast.success("Customer Open Balance Created");
      })
      .catch((error) => {
        setLoad(false);
      });
  };

  const handleCancelShow = () => {
    if (viewDetail === false || id === undefined) {
      // edit page
      setCancelShow(true);
    } else {
      // view page
      setCancelShow(false);
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      navigate("/customer-open-balance/" + customerFK + "/" + customerPageNumber);
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(toggleChangesCancelled());
      toast.success("Changes Cancelled");
    } else {
      navigate("/customer-open-balance/" + customerFK + "/" + customerPageNumber);
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };
  //delete
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    setLoad(true);
    CustomerOpenBalanceService.deleteRecord(customerOpenBalancePK)
      .then((response) => {
        navigate("/customer-open-balance/" + customerFK + "/" + customerPageNumber);
        dispatch(setViewDetail(false));
        toast.success("Customer Open Balance Deleted");
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => setLoad(false));
    setDeleteShow(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(setViewDetail(false));
  };

  const onhandleActivate = () => setActiveShow(true);
  const handleActiveClose = () => setActiveShow(false);

  const handleActiveSave = (e) => {
    setLoad(true);
    setActiveShow(false);
    CustomerOpenBalanceService.activateDeactivate(editCustomerOpenBalanceData)
      .then((response) => {
        const data = response.data;
        dispatch(setCustomerOpenBalanceData(data));
        if (data.active === true) {
          setActiveShow(false);
          toast.success("Customer Open Balance is Activated");
        } else {
          setActiveShow(false);
          toast.success("Customer Open Balance is Deactivated");
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoad(false));
  };
  const validateAndSave = () => {
    setLoad(true);
    CustomerOpenBalanceService.checkDescription(description, customerOpenBalancePK, customerFK)
      .then((response) => {
        if (response.data) {
          setLoad(false);
          setDisableSave(true);
        } else {
          saveOrUpdateCustomerOpenBalance();
        }
      })
      .catch((err) => {
        setLoad(false);
        setDisableSave(true);
      });
  };
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={!id || viewDetail === false}
          label={t("edit.customerOpenBalance.page.resources.tab.active")}
          onClick={(e) => {
            onhandleActivate(e);
          }}
          style={cobData.active == false ? { backgroundColor: "red" } : { backgroundColor: "" }}
        />
        <button
          route={""}
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={viewDetail === true}
          disabled={disableSave}
          label={t("edit.customerOpenBalance.page.resources.tab.save")}
          onClick={validateAndSave}
        >
          Save
        </button>
        <button
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={handleCancelShow}
        >
          Cancel
        </button>

        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={!id || viewDetail === false}
          label={t("edit.customerOpenBalance.page.resources.tab.edit")}
          onClick={(e) => {
            handleEdit(e);
          }}
        />
        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={!id || viewDetail === false}
          label={t("edit.customerOpenBalance.page.resources.tab.delete")}
          onClick={handleDelete}
        />

        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Customer Open Balance Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Customer Open Balance"}
          body={"Please confirm you want to Delete this Customer Open Balance"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />

        {/* model Active*/}
        <ModalComponent
          show={activeShow}
          onHide={handleActiveClose}
          title={
            cobData.active === true ? "Deactivate Customer Open Balance" : "Activate Customer Open Balance"
          }
          body={
            cobData.active === true
              ? " Please confirm you want to Deactivate this Customer Open Balance"
              : " Please confirm you want to Activate this Customer Open Balance"
          }
          handleYES={handleActiveSave}
          handleNO={handleActiveClose}
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
      {load && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
}
