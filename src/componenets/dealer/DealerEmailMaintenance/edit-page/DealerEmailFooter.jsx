import React from "react";
import ButtonComponent from "../../../common/Button";
import { t } from "i18next";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LoaderIcon, toast } from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import {
  setdealerEmailsPK,
  setChangeColor,
  setViewDetail,
  resetChanges,
  toggleChangesCancelled,
  setIsNameUnique,
  setIsEmailUnique,
  setName,
  setEditEmailData,
  setDeleteLoader,
} from "../../../../redux/DealerEmailSlice";
import DealerEmailMaintenanceService from "../../../../services/DealerEmailMaintenanceService";
import LoadingIcon from "../../../common/LoadingIcon";
const DealerEmailFooter = ({ setError, editDealerMaintenanceLocks }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, dealerEmailsPK, pageNumber } = useParams();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [dealerEmailLoader, setDealerEmailLoader] = useState(false);

  const name = useSelector((state) => state.dealerEmailReducer.name);
  const email = useSelector((state) => state.dealerEmailReducer.email);
  const viewDetail = useSelector((state) => state.dealerEmailReducer.viewDetail);
  const saveFormData = useSelector((state) => state.dealerEmailReducer.saveFormData);
  const isNameUnique = useSelector((state) => state.dealerEmailReducer.isNameUnique);
  const isEmailUnique = useSelector((state) => state.dealerEmailReducer.isEmailUnique);

  const emailBOLatDelivery = useSelector((state) => state.dealerEmailReducer.emailBOLatDelivery);
  const emailBolatYardExit = useSelector((state) => state.dealerEmailReducer.emailBolatYardExit);
  const dispatchUpdate = useSelector((state) => state.dealerEmailReducer.dispatchUpdate);
  const dispatchOnly = useSelector((state) => state.dealerEmailReducer.dispatchOnly);
  const emailBolOrderEntry = useSelector((state) => state.dealerEmailReducer.emailBolOrderEntry);
  const deliveryOnly = useSelector((state) => state.dealerEmailReducer.deliveryOnly);
  const emailBolDispatch = useSelector((state) => state.dealerEmailReducer.emailBolDispatch);

  const handleCancelShow = () => {
    if (viewDetail === false || dealerEmailsPK === undefined) {
      // edit page
      setCancelShow(true);
    } else {
      // view page
      setCancelShow(false);
      dispatch(setViewDetail(false));
      dispatch(setEditEmailData(null));

      navigate(`/dealer-email-maintenance/${id}`);
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    dispatch(setEditEmailData(null));
    navigate(`/dealer-email-maintenance/${id}`);
    if (dealerEmailsPK) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(toggleChangesCancelled(true));
      dispatch(setIsNameUnique(false));
      dispatch(setIsEmailUnique(false));

      toast.success("Changes Cancelled");
    } else {
      navigate(`/dealer-email-maintenance/${id}`);
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };
  //save
  useEffect(() => {
    if (
      !isNameUnique &&
      !isEmailUnique &&
      name !== "" &&
      email !== "" &&
      email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/) &&
      (dispatchUpdate ||
        dispatchOnly ||
        deliveryOnly ||
        emailBolOrderEntry ||
        emailBolDispatch ||
        emailBolatYardExit ||
        emailBOLatDelivery)
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [
    name,
    email,
    isNameUnique,
    isEmailUnique,
    dispatchUpdate,
    deliveryOnly,
    dispatchOnly,
    emailBolOrderEntry,
    emailBolDispatch,
    emailBolatYardExit,
    emailBOLatDelivery,
  ]);

  const saveOrUpdate = () => {
    setDealerEmailLoader(true);
    DealerEmailMaintenanceService.createDealerEmail(saveFormData)
      .then((response) => {
        navigate(`/dealer-email-maintenance/${id}`);
        if (dealerEmailsPK) {
          toast.success("Dealer Email Updated");
        } else toast.success(" Dealer Email Created");
        setDealerEmailLoader(false);
      })
      .catch((error) => {
        setDealerEmailLoader(false);

        navigate(`/dealer-email-maintenance/${id}`);
        toast.error("something went wrong");
        console.log(error);
      });
  };

  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = async () => {
    setDeleteShow(false);
    const res = await editDealerMaintenanceLocks("DeleteLock", "Delete");
    if (!res) {
      return;
    }

    dispatch(setDeleteLoader(true));
    DealerEmailMaintenanceService.deleteDealerEmail(dealerEmailsPK)
      .then((response) => {
        toast.success("Dealer Email Deleted");
        navigate(`/dealer-email-maintenance/${id}`);
        dispatch(setDeleteLoader(false));
      })
      .catch((err) => {
        dispatch(setDeleteLoader(false));
        toast.error("Something went wrong!!");
      });
    setDeleteShow(false);
  };

  const hanldeCheckForm = (name) => {
    if (name) {
      setDealerEmailLoader(true);
      return DealerEmailMaintenanceService.checkNameExist(id, dealerEmailsPK, name)
        .then((res) => {
          dispatch(setIsNameUnique(res.data));
          return res.data;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    }
    return Promise.resolve(true);
  };

  const hanldeCheckEmail = (email) => {
    if (email) {
      setDealerEmailLoader(true);
      return DealerEmailMaintenanceService.checkEmailExist(id, dealerEmailsPK, email)
        .then((res) => {
          dispatch(setIsEmailUnique(res.data));
          return res.data;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    }
    return Promise.resolve(true);
  };

  const handleEdit = async () => {
    const res = await editDealerMaintenanceLocks("EditLock", "Edit");
    if (!res) {
      return;
    }
    dispatch(setViewDetail(false));
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {dealerEmailLoader && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          route=""
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={t("edit.AlternateContact.page.resources.tab.save")}
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={async () => {
            const nameIsValid = await hanldeCheckForm(name);
            const emailIsValid = await hanldeCheckEmail(email);

            setDealerEmailLoader(false);

            if (!nameIsValid && !emailIsValid) {
              saveOrUpdate();
            }
          }}
        >
          Save
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={t("edit.AlternateContact.page.resources.tab.cancel")}
          type="button"
          hidden={false}
          onClick={handleCancelShow}
        >
          Cancel
        </button>
        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={t("edit.AlternateContact.page.resources.tab.edit")}
          hidden={!dealerEmailsPK || viewDetail === false}
          onClick={handleEdit}
        />
        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={t("edit.AlternateContact.page.resources.tab.delete")}
          hidden={!dealerEmailsPK || viewDetail === false}
          onClick={handleDelete}
        />

        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHdealerEmailsPKe={handleCancelNo}
          title={"Cancel Dealer Email Maintenance Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
          onHide={handleCancelNo}
        />
        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHdealerEmailsPKe={handleDeleteNo}
          title={"Delete  Dealer Email Maintenance "}
          body={"Please confirm you want to Delete this  Dealer Email Maintenance"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
          onHide={handleDeleteNo}
        />
      </div>
    </div>
  );
};

export default DealerEmailFooter;
