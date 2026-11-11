import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Colors } from "../../../../styles/values/colors";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import {
  resetStates,
  setViewDetail,
  setChangesCancelled,
  setDateFlag,
  setCheckName,
  setOnCancel,
} from "../../../../redux/CustomerProspectsSlice";
import CustomerProspectsSevice from "../../../../services/CustomerProspectsSevice";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import { Button, Modal } from "react-bootstrap";
const CustomerProspectsFooter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cancelShow, setCancelShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [activeShow, setActiveShow] = useState(false);
  const handleActiveShow = () => setActiveShow(true);
  const handleActiveClose = () => setActiveShow(false);
  const [deletePopUp, setDeletePopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [load, setLoad] = useState(false);
  const [active, setActive] = useState("");
  const viewDetail = useSelector((state) => state.customerProspectsReducer.viewDetail);
  const saveData = useSelector((state) => state.customerProspectsReducer.saveData);
  const editFormData = useSelector((state) => state.customerProspectsReducer.editFormData);
  const managerId = useSelector((state) => state.customerProspectsReducer.managerId);
  const managerInput = useSelector((state) => state.customerProspectsReducer.managerInput);
  const address1 = useSelector((state) => state.customerProspectsReducer.address1);

  const name = useSelector((state) => state.customerProspectsReducer.name);

  const phone = useSelector((state) => formatPhoneNumber(state.customerProspectsReducer.phone));
  const email = useSelector((state) => state.customerProspectsReducer.email);
  const checkName = useSelector((state) => state.customerProspectsReducer.checkName);
  const postalCodeNew = useSelector((state) => state.customerProspectsReducer.postalCodeNew);
  const stateCodeNew = useSelector((state) => state.customerProspectsReducer.stateCodeNew);
  const cityNew = useSelector((state) => state.customerProspectsReducer.cityNew);
  const zipPostLengthNew = useSelector((state) => state.customerProspectsReducer.zipPostLengthNew);
  const canadianNew = useSelector((state) => state.customerProspectsReducer.canadianNew);
  const postalCodeOnChange = useSelector((state) => state.customerProspectsReducer.postalCodeOnChange);
  const commodityType = useSelector((state) => state.customerProspectsReducer.commodityType);
  const contact = useSelector((state) => state.customerProspectsReducer.contact);
  const customerProspectsPostalCodePK = useSelector(
    (state) => state.customerProspectsReducer.customerProspectsPostalCodePK
  );
  const isCallDateValid = useSelector((state) => state.customerProspectsReducer.isCallDateValid);
  //cancel
  const handleCancelShow = () => {
    if (viewDetail === false || id === undefined) {
      // edit page
      setCancelShow(true);
    } else {
      // view page
      setCancelShow(false);
      dispatch(setViewDetail(false));

      navigate("/customer-prospects");
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(setDateFlag(false));
      dispatch(setCheckName(false));
      dispatch(setOnCancel(true));
      dispatch(setChangesCancelled());
      toast.success("Changes Cancelled");
    } else {
      navigate("/customer-prospects");
      dispatch(setViewDetail(false));
      dispatch(resetStates());
      dispatch(setOnCancel(true));
      toast.success("Changes Cancelled");
    }
  };
  //delete
  const handleDelete = () => setDeletePopup(true);
  const handleDeleteNo = () => setDeletePopup(false);
  const handleDeleteYes = () => {
    CustomerProspectsSevice.delete(id)
      .then((response) => {
        navigate("/customer-prospects");
        toast.success("Customer Prospect Deleted");
      })
      .catch((error) => {
        setErrorShow(true);
        setErrorMsg(error?.response?.data?.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(error?.response?.data?.errorMsg || "Something went wrong!! Failed to delete!!");
      });
    setDeletePopup(false);
  };

  //save
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;
  useEffect(() => {
    if (
      name !== "" &&
      contact !== "" &&
      commodityType !== "" &&
      isCallDateValid &&
      address1 !== "" &&
      managerId !== null &&
      managerInput !== "" &&
      phone !== "" &&
      phone?.match(phoneRegex) &&
      (email === "" || email?.match(emailRegex)) &&
      !checkName &&
      customerProspectsPostalCodePK
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    name,
    phone,
    email,
    checkName,
    managerInput,
    managerId,
    address1,
    postalCodeOnChange,
    cityNew,
    zipPostLengthNew,
    postalCodeNew,
    canadianNew,
    stateCodeNew,
    contact,
    commodityType,
    customerProspectsPostalCodePK,
    isCallDateValid,
  ]);
  const save = () => {
    setLoad(true);
    CustomerProspectsSevice.create(saveData)

      .then((res) => {
        setLoad(false);
        if (id) {
          dispatch(setDateFlag(false));
          toast.success("Customer Prospect Updated");
        } else {
          toast.success("Customer Prospect Created");
        }
        navigate("/customer-prospects");
      })
      .catch((err) => {
        setLoad(false);
        navigate("/customer-prospects");
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  //Activate-Deactivate
  useEffect(() => {
    if (editFormData != null && null != editFormData.active) {
      setActive(editFormData.active);
    }
  }, [editFormData]);

  const handleActiveSave = (e) => {
    if (active === true) {
      deActivateCustomerProspects();
    } else {
      activateCustomerProspects();
    }
  };
  const activateCustomerProspects = () => {
    CustomerProspectsSevice.activateCustomerProspects(id)
      .then(() => {
        setActiveShow(false);
        setActive(true);
        toast.success("Customer Prospect Activated");
      })
      .catch((error) => {});
  };
  const deActivateCustomerProspects = () => {
    CustomerProspectsSevice.deActivateCustomerProspects(id)
      .then(() => {
        setActiveShow(false);
        setActive(false);
        toast.success("Customer Prospect Deactivated");
      })
      .catch((error) => {});
  };

  const validateAndSave = () => {
    setLoad(true);
    CustomerProspectsSevice.nameExistCheck(name, id)
      .then((response) => {
        if (response?.data) {
          setLoad(false);
          setDisableSave(response?.data);
        } else {
          save();
        }
      })
      .catch((err) => {
        setLoad(false);
        setDisableSave(true);
      });
  };
  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!id || viewDetail === false}
          onClick={handleActiveShow}
          style={active === false ? { backgroundColor: Colors.red } : { backgroundColor: "" }}
        >
          Active
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={validateAndSave}
        >
          Save
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleCancelShow}
        >
          Cancel
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={!id || viewDetail === false}
          onClick={() => {
            dispatch(setViewDetail(false));
            dispatch(setDateFlag(true));
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={!id || viewDetail === false}
          onClick={handleDelete}
        >
          Delete
        </button>
        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Customer Prospect Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />{" "}
        *{/*Delete confirmation Modal */}
        <ModalComponent
          show={deletePopUp}
          onHide={handleDeleteNo}
          title={"Delete Customer Prospect"}
          body={"Please confirm you want to Delete this Customer Prospect"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
        {/* model Active*/}
        <ModalComponent
          show={activeShow}
          onHide={handleActiveClose}
          title={active === true ? "Deactivate Customer Prospect" : "Activate Customer Prospect"}
          body={
            active === true
              ? " Please confirm you want to Deactivate this Customer Prospect"
              : " Please confirm you want to Activate this Customer Prospect"
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
};

export default CustomerProspectsFooter;
