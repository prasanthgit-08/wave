import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { useSelector, useDispatch } from "react-redux";
import ButtonComponent from "../../common/Button";
import { useParams, useNavigate } from "react-router-dom";
import ModalComponent from "../../common/ModalComponent";
import { Modal, Button } from "react-bootstrap";
import { Colors } from "../../../styles/values/colors";
import styles from "../../../styles/ThreeQuarterScreen.module.css";
import {
  setViewDetail,
  setIsGeneralTabValid,
  setIsSettingsTabValid,
  setIsSettingsTabRequired,
  setYardFormData,
  setEditYardData,
  setYardReload,
  setYardOutbound,
  toggleChangesCancelled,
  setIsSettingColor,
  setCheckDEscriptionExist,
  setOnCancel,
} from "../../../redux/YardMaintenanceSlice";
import YardService from "../../../services/YardService";
import { toast } from "react-hot-toast";
import {
  setChangeColor,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
} from "../../../redux/YardEmailSlice";
import LoadingIcon from "../../common/LoadingIcon";
const FormFooter = () => {
  const { id, pageNumber } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [activeShow, setActiveShow] = useState(false);
  const [active, setActive] = useState("");
  const [load, setLoad] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const handleActiveShow = () => setActiveShow(true);
  const handleActiveClose = () => setActiveShow(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const viewDetail = useSelector((state) => state.yardMaintenanceReducer.viewDetail);
  const yardFormData = useSelector((state) => state.yardMaintenanceReducer.yardFormData);
  const editYardData = useSelector((state) => state.yardMaintenanceReducer.editYardData);
  const yardZipLength = useSelector((state) => state.yardMaintenanceReducer.yardZipLength);
  const isGeneralTabValid = useSelector((state) => state.yardMaintenanceReducer.isGeneralTabValid);
  const isSettingsTabValid = useSelector((state) => state.yardMaintenanceReducer.isSettingsTabValid);
  //General Tab
  const yardName = useSelector((state) => state.yardMaintenanceReducer.yardName);
  const yardPostalCode = useSelector((state) => state.yardMaintenanceReducer.yardPostalCode);
  const yardAddress = useSelector((state) => state.yardMaintenanceReducer.yardAddress);
  const yardCity = useSelector((state) => state.yardMaintenanceReducer.yardCity);
  const yardStatecode = useSelector((state) => state.yardMaintenanceReducer.yardStatecode);
  const yardCanadian = useSelector((state) => state.yardMaintenanceReducer.yardCanadian);
  const yardPostcode = useSelector((state) => state.yardMaintenanceReducer.yardPostcode);
  const yardPhone = useSelector((state) => state.yardMaintenanceReducer.yardPhone);
  const yardFax = useSelector((state) => state.yardMaintenanceReducer.yardFax);
  const checkDEscriptionExist = useSelector((state) => state.yardMaintenanceReducer.checkDEscriptionExist);
  const yardDescription = useSelector((state) => state.yardMaintenanceReducer.yardDescription);
  const dealerInput = useSelector((state) => state.yardMaintenanceReducer.dealerInput);
  const dealerLookupFK = useSelector((state) => state.yardMaintenanceReducer.dealerLookupFK);
  const userLookupFK = useSelector((state) => state.yardMaintenanceReducer.userLookupFK);
  const userInput = useSelector((state) => state.yardMaintenanceReducer.userInput);
  const userManagerInput = useSelector((state) => state.yardMaintenanceReducer.userManagerInput);
  const userManagerFK = useSelector((state) => state.yardMaintenanceReducer.userManagerFK);
  const accessGroup = useSelector((state) => state.yardMaintenanceReducer.accessGroup);
  const yardHasOpener = useSelector((state) => state.yardMaintenanceReducer.yardHasOpener);
  const postalCodeOnChange = useSelector((state) => state.yardMaintenanceReducer.postalCodeOnChange);

  const checkYardCode = useSelector((state) => state.yardMaintenanceReducer.checkYardCode);

  const yardSisterCode = useSelector((state) => state.yardMaintenanceReducer.yardSisterCode);

  const yardPostalCodePK = useSelector((state) => state.yardMaintenanceReducer.yardPostalCodePK);
  //Settings Tab

  const printerFK = useSelector((state) => state.yardMaintenanceReducer.printerFK);

  const yardHasPrinter = useSelector((state) => state.yardMaintenanceReducer.yardHasPrinter);
  const printerInput = useSelector((state) => state.yardMaintenanceReducer.printerInput);
  const yardDriverMilesAdjustment = useSelector(
    (state) => state.yardMaintenanceReducer.yardDriverMilesAdjustment
  );
  const yardInvoiceMilesAdjustment = useSelector(
    (state) => state.yardMaintenanceReducer.yardInvoiceMilesAdjustment
  );
  const yardCapacity = useSelector((state) => state.yardMaintenanceReducer.yardCapacity);
  const yardAcres = useSelector((state) => state.yardMaintenanceReducer.yardAcres);
  const bolPrinterInput = useSelector((state) => state.yardMaintenanceReducer.bolPrinterInput);

  const bolPrinterFK = useSelector((state) => state.yardMaintenanceReducer.bolPrinterFK);
  const kioskPrinterInput = useSelector((state) => state.yardMaintenanceReducer.kioskPrinterInput);
  const kioskPrinterFK = useSelector((state) => state.yardMaintenanceReducer.kioskPrinterFK);
  const onCancel = useSelector((state) => state.yardMaintenanceReducer.onCancel);

  const [loading, setLoading] = useState(false);

  const [checkingSequence, setCheckingSequence] = useState(false);
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  //General Tab validation
  useEffect(() => {
    if (
      yardName !== "" &&
      (!yardSisterCode || (yardSisterCode && !checkYardCode)) &&
      yardDescription != "" &&
      !checkDEscriptionExist &&
      yardAddress !== "" &&
      yardPostcode &&
      String(yardPostcode).match(/^((\d{5}-\d{4})|(\d{5}))$/) &&
      yardPostalCodePK &&
      (yardPhone === "" || yardPhone.match(phoneRegex)) &&
      (yardFax === "" || yardFax.match(phoneRegex)) &&
      ((dealerLookupFK === "" && dealerInput === "") || (dealerLookupFK !== "" && dealerInput !== "")) &&
      ((userLookupFK === "" && userInput === "") || (userLookupFK !== "" && userInput !== "")) &&
      ((userManagerFK === "" && userManagerInput === "") || (userManagerInput !== "" && userManagerFK !== ""))
    ) {
      dispatch(setIsGeneralTabValid(true));
    } else {
      dispatch(setIsGeneralTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    yardName,
    yardDescription,
    yardAddress,
    yardCity,
    yardFax,
    yardPhone,
    checkDEscriptionExist,
    yardCanadian,
    yardPostcode,
    yardStatecode,
    yardZipLength,
    dealerLookupFK,
    dealerInput,
    userLookupFK,
    userInput,
    userManagerFK,
    userManagerInput,
    postalCodeOnChange,
    yardSisterCode,
    checkYardCode,
    yardPostalCodePK,
  ]);

  useEffect(() => {
    if (
      (!yardHasPrinter ||
        (printerInput !== "" &&
          printerFK !== "" &&
          (bolPrinterFK || bolPrinterInput === "") &&
          (kioskPrinterFK || kioskPrinterInput === ""))) &&
      (yardDriverMilesAdjustment === "" ||
        (yardDriverMilesAdjustment >= 0 && yardDriverMilesAdjustment <= 32767)) &&
      (yardInvoiceMilesAdjustment === "" ||
        (yardInvoiceMilesAdjustment >= 0 && yardInvoiceMilesAdjustment <= 32767)) &&
      (yardCapacity === "" || (yardCapacity >= 0 && yardCapacity <= 32767)) &&
      (yardAcres === "" || (yardAcres >= 0 && yardAcres <= 32767)) &&
      (!yardHasOpener || (accessGroup !== "" && accessGroup <= 2147483647))
    ) {
      dispatch(setIsSettingsTabValid(true));

      if (yardHasPrinter || yardHasOpener) {
        dispatch(setIsSettingsTabRequired(true));
      } else {
        dispatch(setIsSettingsTabRequired(true));
      }
    } else {
      dispatch(setIsSettingsTabValid(false));
    }
  }, [
    yardHasPrinter,
    printerInput,
    printerFK,
    bolPrinterInput,
    bolPrinterFK,
    kioskPrinterFK,
    kioskPrinterInput,
    yardAcres,
    yardCapacity,
    yardDriverMilesAdjustment,
    yardInvoiceMilesAdjustment,
    yardHasOpener,
    accessGroup,
  ]);

  useEffect(() => {
    if (isGeneralTabValid === true && isSettingsTabValid === true) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [isGeneralTabValid, isSettingsTabValid]);

  const ClearData = () => {
    useEffect(() => {});
  };
  const handleCancelShow = () => {
    if (viewDetail === false || id === undefined) {
      // edit page
      setCancelShow(true);
    } else {
      // view page
      setCancelShow(false);
      dispatch(setViewDetail(false));
      dispatch(setCheckDEscriptionExist(""));
      navigate("/yard-maintenance");
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      dispatch(toggleChangesCancelled());
      setCancelShow(false);
      dispatch(setCheckDEscriptionExist(""));
      dispatch(setViewDetail(true));
      dispatch(setYardFormData(null));
      setTimeout(() => {
        dispatch(setOnCancel(true));
      }, 50);
      toast.success("Changes Cancelled");
    } else {
      navigate("/yard-maintenance");
      dispatch(setCheckDEscriptionExist(""));
      dispatch(setViewDetail(false));
      dispatch(setOnCancel(true));
      dispatch(setYardFormData(null));
      toast.success("Changes Cancelled");
    }
  };

  useEffect(() => {
    if (editYardData != null && null != editYardData.active) {
      setActive(editYardData.active);
    }
  }, [editYardData]);

  const handleActiveSave = (e) => {
    if (active === true) {
      deActivateYard();
    } else {
      activateYard();
    }
  };

  const activateYard = () => {
    setActiveShow(false);
    setLoading(true);
    YardService.activateYard(id)
      .then(() => {
        setActiveShow(false);
        setActive(true);
        toast.success("Yard Activated");
      })
      .catch((error) => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deActivateYard = () => {
    setActiveShow(false);
    setLoading(true);
    YardService.deactivateYard(id)
      .then(() => {
        setActiveShow(false);
        setActive(false);
        toast.success("Yard Deactivated");
      })
      .catch((error) => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //Save or Update Yard
  const saveOrUpdateYard = (e) => {
    setLoad(true);

    YardService.createYard(yardFormData)

      .then(() => {
        if (id) {
          toast.success("Yard Updated");
          dispatch(setViewDetail(true));
        } else {
          toast.success("Yard Created");
          dispatch(setViewDetail(true));
        }
        setLoad(false);
        navigate("/yard-maintenance");
      })
      .catch((error) => {
        setLoad(false);
        navigate("/yard-maintenance");
        toast.error("Something Went Wrong");
      });
  };

  //delete
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    YardService.deleteYard(id)
      .then((response) => {
        navigate("/yard-maintenance");
        toast.success("Yard Deleted");
      })
      .catch((error) => {
        setErrorShow(true);
        setErrorMsg(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      });
    setDeleteShow(false);
  };
  const validateAndSave = () => {
    setCheckingSequence(true);
    YardService.descriptionExistCheck(yardDescription, id)
      .then((response) => {
        if (response.data) {
          setDisableSave(response.data);
        } else {
          saveOrUpdateYard();
        }
      })
      .catch((err) => {
        setDisableSave(true);
        setCheckingSequence(false);
      })
      .finally(() => {
        setCheckingSequence(false);
      });
  };
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      {(checkingSequence || loading) && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap">
        <ButtonComponent
          route={`/yard-email-maintenance/${id}/${pageNumber}`}
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5 `}
          label={"BOL Emails"}
          hidden={!id || viewDetail === false}
          onClick={() => {
            dispatch(setSearchTerm(""));
            dispatch(setSearchCriteria("Beginning"));
            dispatch(setPageNumber(0));
            dispatch(setChangeColor(false));
            dispatch(setNormalSortValue(null));
            dispatch(setNormalSortFlag(false));
          }}
        />
      </div>

      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5 `}
          label={"Active"}
          hidden={!id || viewDetail === false}
          onClick={handleActiveShow}
          style={active === false ? { backgroundColor: Colors.red } : { backgroundColor: "" }}
        >
          Active
        </button>
        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-6 m-r-5 m-b-5 `}
          type="button"
          hidden={viewDetail === true}
          disabled={disableSave || checkingSequence}
          onClick={validateAndSave}
        >
          Save
        </button>
        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5 `}
          type="button"
          onClick={handleCancelShow}
        >
          Cancel
        </button>

        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5 `}
          label={"Edit"}
          hidden={!id || viewDetail === false}
          onClick={() => dispatch(setViewDetail(false))}
        />

        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5 `}
          label={"Delete"}
          hidden={!id || viewDetail === false}
          onClick={handleDelete}
        />

        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Yard Maintenance Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Yard"}
          body={"Please confirm you want to Delete this Yard"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />

        {/* model Active*/}
        <ModalComponent
          show={activeShow}
          onHide={handleActiveClose}
          title={active === true ? "Deactivate Yard" : "Activate Yard"}
          body={
            active === true
              ? " Please confirm you want to Deactivate this Yard"
              : " Please confirm you want to Activate this Yard"
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
    </div>
  );
};

export default FormFooter;
