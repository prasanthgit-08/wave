import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetChanges,
  setActive,
  setAddress1,
  setAlternatePhone,
  setChangesCancelled,
  setCity,
  setDispatcher,
  setDispatcherCellPhone,
  setDispatcherEmail,
  setDispatcherPhone,
  setEIN,
  setEmail,
  setFAXNumber,
  setHaulAndTow,
  setInsuranceAddress1,
  setInsuranceAddress2,
  setInsuranceCanadian,
  setInsuranceCity,
  setInsuranceCompany,
  setInsuranceContact,
  setInsuranceEmail,
  setInsuranceFAX,
  setInsuranceNotes,
  setInsurancePhone,
  setInsurancePolicyNumber,
  setInsurancePostalCode,
  setInsuranceStateCode,
  setIsEinExist,
  setIsNameExist,
  setLowboy,
  setMotorized,
  setName,
  setPhone,
  setPopup,
  setPostalCode,
  setSelectedStatus,
  setStateCode,
  setTowaway,
  setTransportCompanyPK,
  setTruckCamper,
  setViewDetail,
} from "../../../redux/TransportCompaniesSlice";
import ButtonComponent from "../../common/Button";
import ModalComponent from "../../common/ModalComponent";
import TransportCompanysService from "../../../services/TransportCompanysService";
import { Colors } from "../../../styles/values/colors";
import { Button, Modal } from "react-bootstrap";
import LoadingIcon from "../../common/LoadingIcon";

function FormFooter({ styles }) {
  const { id, pageNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeShow, setActiveShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isInsuranceFieldsEmpty, setIsInsuranceFieldsEmpty] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const [disableSave, setDisableSave] = useState(true);
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const viewDetail = useSelector((state) => state.transportCompaniesReducer.viewDetail);
  const canadianRedux = useSelector((state) => state.transportCompaniesReducer.canadianRedux);
  const changesCancelled = useSelector((state) => state.transportCompaniesReducer.changesCancelled);
  const name = useSelector((state) => state.transportCompaniesReducer.name);
  const address1 = useSelector((state) => state.transportCompaniesReducer.address1);
  const address2 = useSelector((state) => state.transportCompaniesReducer.address2);
  const phone = useSelector((state) => state.transportCompaniesReducer.phone);
  const alternatePhone = useSelector((state) => state.transportCompaniesReducer.alternatePhone);
  const fAXNumber = useSelector((state) => state.transportCompaniesReducer.fAXNumber);
  const ein = useSelector((state) => state.transportCompaniesReducer.ein);
  const email = useSelector((state) => state.transportCompaniesReducer.email);
  const dispatcher = useSelector((state) => state.transportCompaniesReducer.dispatcher);
  const dispatcherPhone = useSelector((state) => state.transportCompaniesReducer.dispatcherPhone);
  const dispatcherCellPhone = useSelector((state) => state.transportCompaniesReducer.dispatcherCellPhone);
  const dispatcherEmail = useSelector((state) => state.transportCompaniesReducer.dispatcherEmail);
  const dispatchEmail = useSelector((state) => state.transportCompaniesReducer.dispatchEmail);
  const towaway = useSelector((state) => state.transportCompaniesReducer.towaway);
  const haulAndTow = useSelector((state) => state.transportCompaniesReducer.haulAndTow);
  const lowboy = useSelector((state) => state.transportCompaniesReducer.lowboy);
  const popup = useSelector((state) => state.transportCompaniesReducer.popup);
  const truckCamper = useSelector((state) => state.transportCompaniesReducer.truckCamper);
  const motorized = useSelector((state) => state.transportCompaniesReducer.motorized);
  const transportCompanyPK = useSelector((state) => state.transportCompaniesReducer.transportCompanyPK);
  const city = useSelector((state) => state.transportCompaniesReducer.city);

  const postalCodePK = useSelector((state) => state.transportCompaniesReducer.postalCodePK);

  const stateCode = useSelector((state) => state.transportCompaniesReducer.stateCode);

  const postalCode = useSelector((state) => state.transportCompaniesReducer.postalCode);
  const insurancePolicyNumber = useSelector((state) => state.transportCompaniesReducer.insurancePolicyNumber);
  const insuranceEmail = useSelector((state) => state.transportCompaniesReducer.insuranceEmail);
  const insuranceFAX = useSelector((state) => state.transportCompaniesReducer.insuranceFAX);
  const insurancePhone = useSelector((state) => state.transportCompaniesReducer.insurancePhone);
  const insuranceContact = useSelector((state) => state.transportCompaniesReducer.insuranceContact);
  const insuranceAddress1 = useSelector((state) => state.transportCompaniesReducer.insuranceAddress1);
  const insuranceAddress2 = useSelector((state) => state.transportCompaniesReducer.insuranceAddress2);
  const insuranceCanadian = useSelector((state) => state.transportCompaniesReducer.insuranceCanadian);
  const insurancePostalCode = useSelector((state) => state.transportCompaniesReducer.insurancePostalCode);
  const insuranceStateCode = useSelector((state) => state.transportCompaniesReducer.insuranceStateCode);
  const insuranceCity = useSelector((state) => state.transportCompaniesReducer.insuranceCity);
  const notes = useSelector((state) => state.transportCompaniesReducer.notes);
  const insuranceCompany = useSelector((state) => state.transportCompaniesReducer.insuranceCompany);
  const einFormat = useSelector((state) => state.transportCompaniesReducer.einFormat);
  const active = useSelector((state) => state.transportCompaniesReducer.active);
  const isNameExist = useSelector((state) => state.transportCompaniesReducer.isNameExist);
  const isEinExist = useSelector((state) => state.transportCompaniesReducer.isEinExist);
  const postalCodeOnChange = useSelector((state) => state.transportCompaniesReducer.postalCodeOnChange);
  const dispatchEmailValid = useSelector((state) => state.transportCompaniesReducer.dispatchEmailValid);
  const dispatcherEmailValid = useSelector((state) => state.transportCompaniesReducer.dispatcherEmailValid);

  const insurancePostalCodePK = useSelector((state) => state.transportCompaniesReducer.insurancePostalCodePK);
  const insuranceEmailValid = useSelector((state) => state.transportCompaniesReducer.insuranceEmailValid);
  const emailFormat = useSelector((state) => state.transportCompaniesReducer.emailFormat);

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));

      navigate(`/transport-companies`);
      toast.success("Changes Cancelled");
    }
  };

  const activateTransportCompany = (id) => {
    setLoading(true);
    TransportCompanysService.activateTransportCompany(id)
      .then((response) => {
        setActiveShow(false);
        dispatch(setActive(true));

        toast.success("Transport Company Activated");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deActivateTransportCompany = (id) => {
    setLoading(true);
    TransportCompanysService.deActivateTransportCompany(id)
      .then((response) => {
        setActiveShow(false);
        dispatch(setActive(false));
        toast.success("Transport Company Deactivated");
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleActiveClose = () => setActiveShow(false);
  const handleActiveShow = () => setActiveShow(true);

  const handleActiveSave = (e) => {
    e.preventDefault();

    if (active === true) {
      deActivateTransportCompany(id);
    } else {
      activateTransportCompany(id);
    }
  };
  // save validation

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(setChangesCancelled(true));
      toast.success("Changes Cancelled");
    } else {
      navigate(`/transport-companies`);
      dispatch(setTransportCompanyPK(null));
      dispatch(setName(""));
      dispatch(setAddress1(""));
      dispatch(setInsuranceAddress2(""));
      dispatch(setPhone(""));
      dispatch(setAlternatePhone(""));
      dispatch(setFAXNumber(""));
      dispatch(setEIN(""));
      dispatch(setEmail(""));
      dispatch(setDispatcher(""));
      dispatch(setDispatcherPhone());
      dispatch(setDispatcherCellPhone(""));
      dispatch(setDispatcherEmail(""));
      dispatch(setTowaway(false));
      dispatch(setHaulAndTow(false));
      dispatch(setLowboy(false));
      dispatch(setPopup(false));
      dispatch(setTruckCamper(false));
      dispatch(setMotorized(false));
      dispatch(setInsuranceCompany(""));
      dispatch(setInsuranceAddress1(""));
      dispatch(setInsuranceAddress2(""));
      dispatch(setInsuranceCity(""));
      dispatch(setInsuranceStateCode(""));
      dispatch(setInsurancePostalCode(""));
      dispatch(setInsuranceContact(""));
      dispatch(setInsuranceEmail(""));
      dispatch(setInsuranceFAX(""));
      dispatch(setInsurancePhone(""));
      dispatch(setInsuranceCanadian(false));
      dispatch(setInsurancePolicyNumber(""));
      dispatch(setInsuranceNotes(""));
      dispatch(setCity(""));
      dispatch(setStateCode(""));
      dispatch(setPostalCode(""));
      dispatch(setViewDetail(false));
      // dispatch(resetChanges());
      toast.success("Changes Cancelled");
    }
  };

  const formData = {
    transportCompanyPK,
    name,
    address1,
    address2,
    phone,
    alternatePhone,
    faxNumber: fAXNumber,
    ein: ein,
    email,
    dispatcher,
    dispatcherPhone,
    dispatcherCellPhone,
    dispatcherEmail,
    dispatchEmail,
    towaway,
    haulAndTow,
    lowboy,
    popup,
    truckCamper,
    motorized,
    city: city,
    stateCode: stateCode,
    postalCode: postalCode,
    insuranceCompany: insuranceCompany,
    insurancePolicyNumber: insurancePolicyNumber,
    canadian: canadianRedux,
    insuranceEmail: insuranceEmail,
    insuranceFAX: insuranceFAX,
    insurancePhone: insurancePhone,
    insuranceContact: insuranceContact,
    insuranceAddress1: insuranceAddress1,
    insuranceAddress2: insuranceAddress2,
    insurancePostalCode: insurancePostalCode,
    insuranceStateCode: insuranceStateCode,
    insuranceCity: insuranceCity,
    notes: notes,
    active: transportCompanyPK ? active : true,
  };

  const saveRecord = () => {
    setSaveLoading(true);
    TransportCompanysService.createOrUpdateRecord(formData)

      .then((res) => {
        if (id) {
          toast.success("Transport Company Updated");
        } else {
          toast.success("Transport Company Created");
        }
        navigate(`/transport-companies`);
        setSaveLoading(false);
      })
      .catch((err) => {
        navigate(`/transport-companies-view/${id}`);
        toast.error("Something went wrong");
        setSaveLoading(false);

        console.log(err);
      });
  };

  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    TransportCompanysService.deleteRecord(id)
      .then((response) => {
        if (response.data === false || response?.data === false) {
          setErrorShow(true);
          setErrorMsg(response?.errorMsg || "Something went wrong!! Failed to delete!!");
          console.error(response?.errorMsg || "Something went wrong!! Failed to delete!!");
          return;
        }

        navigate(`/transport-companies`);
        toast.success("Transport Company Deleted");
        dispatch(resetChanges());
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err?.response?.data?.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(err?.response?.data?.errorMsg || "Something went wrong!! Failed to delete!!");
      });

    setDeleteShow(false);
  };

  const isLengthValid =
    phone?.length === 13 &&
    (alternatePhone?.length === 13 || !alternatePhone) && // Optional field
    ein?.length === 10 &&
    (dispatcherPhone?.length === 13 || !dispatcherPhone) && // Optional field
    (dispatcherCellPhone?.length === 13 || !dispatcherCellPhone) && // Optional field
    (insuranceContact?.length === 13 || !insuranceContact || insuranceContact?.trim() === "") && // Optional field
    (insurancePhone?.length === 13 || !insurancePhone || insurancePhone?.trim() === "") && // Optional field
    (fAXNumber?.length === 13 || !fAXNumber) &&
    (insuranceFAX?.length === 13 || !insuranceFAX);

  useEffect(() => {
    const areInsuranceFieldsValid =
      // Case 1: Enable save when insurancePostalCodePK is null and all three fields are empty
      (!insurancePostalCodePK &&
        !insurancePostalCode?.trim() &&
        !insuranceCity?.trim() &&
        !insuranceStateCode?.trim()) ||
      // Case 2: Enable save when insurancePostalCodePK exists and at least one of the fields is non-empty
      (insurancePostalCodePK &&
        (insurancePostalCode?.trim() || insuranceCity?.trim() || insuranceStateCode?.trim()));

    const isFormValid =
      name &&
      address1 &&
      phone &&
      ein &&
      einFormat &&
      dispatcher &&
      (towaway || haulAndTow || lowboy || popup || truckCamper || motorized) &&
      isEinExist &&
      isNameExist &&
      isLengthValid &&
      dispatcherPhone &&
      dispatcherEmail &&
      dispatchEmail &&
      (!email || emailFormat) &&
      !postalCodeOnChange &&
      dispatchEmailValid &&
      dispatcherEmailValid &&
      postalCodePK &&
      areInsuranceFieldsValid &&
      (!insuranceEmail || insuranceEmailValid); // Fixed precedence issue here

    setDisableSave(!isFormValid);
  }, [
    name,
    address1,
    phone,
    ein,
    einFormat,
    dispatcher,
    towaway,
    haulAndTow,
    lowboy,
    popup,
    truckCamper,
    motorized,
    isEinExist,
    isNameExist,
    isLengthValid,
    dispatcherPhone,
    dispatcherEmail,
    dispatchEmail,
    dispatchEmailValid,
    dispatcherEmailValid,
    postalCodeOnChange,
    postalCodePK,
    insurancePostalCodePK,
    insurancePostalCode,
    insuranceCity,
    insuranceStateCode,
    insuranceEmail,
    insuranceEmailValid, // Added missing dependencies
    city,
    stateCode,
    postalCode,
    insuranceContact,
    insurancePhone,
    fAXNumber,
    alternatePhone,
    emailFormat,
    email,
  ]);

  const handleCheckName = async () => {
    try {
      const res = await TransportCompanysService.checknameExist(name, id);
      dispatch(setIsNameExist(res.data));
      return res.data;
    } catch (err) {
      console.log(err);
      return true;
    }
  };

  const handleCheckEin = async () => {
    try {
      const res = await TransportCompanysService.checkEinExist(ein, id);
      dispatch(setIsEinExist(res.data));
      return res.data;
    } catch (err) {
      console.log(err);
      return true;
    }
  };

  useEffect(() => {
    const isEmpty = !insuranceCity && !insuranceStateCode && !insurancePostalCode;
    setIsInsuranceFieldsEmpty(isEmpty);
  }, [insuranceCity, insuranceStateCode, insurancePostalCode, insurancePostalCodePK]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {(loading || saveLoading) && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          type=""
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={async () => {
            // Show the loader during the name/EIN checks too; saveRecord keeps it on until the save finishes
            setSaveLoading(true);
            const nameExists = await handleCheckName();
            const einExists = await handleCheckEin();

            if (nameExists && einExists) {
              saveRecord();
            } else {
              setSaveLoading(false);
            }
          }}
        >
          Save
        </button>

        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={"Active"}
          hidden={!id || viewDetail === false}
          onClick={handleActiveShow}
          style={active === false ? { backgroundColor: Colors.red } : { backgroundColor: "" }}
        />
        {/* model Active*/}
        <ModalComponent
          show={activeShow}
          onHide={handleActiveClose}
          title={active === true ? "Deactivate Transport Company" : "Activate Transport Company"}
          body={
            active === true
              ? " Please confirm you want to Deactivate this Transport Company"
              : " Please confirm you want to Activate this Transport Company"
          }
          handleYES={handleActiveSave}
          handleNO={handleActiveClose}
        />

        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={!id || viewDetail === false}
          onClick={() => {
            dispatch(setViewDetail(false));
            dispatch(setIsEinExist(true));
            dispatch(setIsNameExist(true));
          }}
          label={"Edit"}
        />

        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={!id || viewDetail === false}
          onClick={handleDelete}
          label={"Delete"}
        />

        {/* Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Transport Company  Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Transport Company "}
          body={"Please confirm you want to delete this Transport Company"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
        <Modal show={errorShow} onHide={() => setErrorShow(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 temp-red-color">Delete failed!</Modal.Title>
          </Modal.Header>

          <Modal.Body className="font-14 h-100">{errorMsg}</Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setErrorShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default FormFooter;
