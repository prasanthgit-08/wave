import React, { useState } from "react";
import { useEffect } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import {
  resetChanges,
  toggleChangesCancelled,
  setViewDetail,
  setDisableSave,
} from "../../../../redux/CustomerContactSlice";
import CustomerContactService from "../../../../services/CustomerContactService";
import ButtonComponent from "../../../common/Button";
import ModalComponent from "../../../common/ModalComponent";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import LoadingIcon from "../../../common/LoadingIcon";
const CCFormFooter = () => {
  const { id } = useParams();
  const params = useParams();
  const { customerId, pageNumber } = useParams();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const disableSave = useSelector((state) => state.customerContactReducer.disableSave);
  const viewDetail = useSelector((state) => state.customerContactReducer.viewDetail);
  const primaryKey = useSelector((state) => state.customerContactReducer.primaryKey);
  const name = useSelector((state) => state.customerContactReducer.name);
  const contact = useSelector((state) => state.customerContactReducer.contact);
  const position = useSelector((state) => state.customerContactReducer.position);
  const phone = useSelector((state) => formatPhoneNumber(state.customerContactReducer.phone));
  const fax = useSelector((state) => formatPhoneNumber(state.customerContactReducer.fax));
  const email = useSelector((state) => state.customerContactReducer.email);
  const birthday = useSelector((state) => state.customerContactReducer.birthday);
  const callback = useSelector((state) => state.customerContactReducer.callback);
  const lastcall = useSelector((state) => state.customerContactReducer.lastcall);
  const notes = useSelector((state) => state.customerContactReducer.notes);
  const checkContact = useSelector((state) => state.customerContactReducer.checkContact);
  const formData = {
    customercontactpk: primaryKey,
    contact,
    name,
    position,
    phone: phone.replace(/\s+/g, ""),
    fax: fax.replace(/\s+/g, ""),
    email,
    birthday,
    callback,
    lastcall,
    notes,
    customerId,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/customer-contact/" + customerId + "/" + pageNumber);
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => {
    setCancelShow(false);
  };
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(toggleChangesCancelled());
      toast.success("Changes Cancelled");
    } else {
      navigate("/customer-contact/" + customerId + "/" + pageNumber);
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
    dispatch(resetChanges());
  };

  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    CustomerContactService.deleteContacts(id)
      .then((response) => {
        navigate("/customer-contact/" + customerId + "/" + pageNumber);
        toast.success("Customer Contact Deleted");
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
    setDeleteShow(false);
  };

  const saveOrUpdateCC = () => {
    setLoading(true);
    CustomerContactService.createContacts(formData)

      .then((res) => {
        if (id) {
          toast.success("Customer Contact Updated");
        } else {
          toast.success("Customer Contact Created");
        }
        navigate("/customer-contact/" + customerId + "/" + pageNumber);
      })
      .catch((err) => {
        navigate("/customer-contact/" + customerId + "/" + pageNumber);
        toast.error("Something went wrong");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });

    dispatch(resetChanges());
  };
  const validateAndSave = () => {
    CustomerContactService.checkContactExist(contact, customerId, id)
      .then((response) => {
        if (response.data) {
          dispatch(setDisableSave(response.data));
        } else {
          saveOrUpdateCC();
        }
      })
      .catch((err) => {
        dispatch(setDisableSave(true));
      });
  };
  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={() => {
            validateAndSave();
          }}
        >
          Save
        </button>

        <button
          className="btn  btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={!id || viewDetail === false}
          onClick={() => dispatch(setViewDetail(false))}
          label={"Edit"}
        />

        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={!id || viewDetail === false}
          onClick={handleDelete}
          label={"Delete"}
        />

        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Customer Contact Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Customer Contact"}
          body={"Please confirm you want to Delete this Customer Contact"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
      </div>
    </div>
  );
};

export default CCFormFooter;
