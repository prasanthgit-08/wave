import React, { useEffect, useState } from "react";
import ButtonComponent from "../../../../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  resetDriverDrugTestData,
  resetDriverDrugTests,
  setCancelled,
  setDriverDrugTestData,
  setDrugLoading,
  setFormData,
  setIsCloseButtonPopUp,
  setIsTabIdentify,
  setNotify,
  setOnCancel,
  setOverWritePermission,
  setResultClicked,
  setResultuser,
  setViewDetail,
} from "../../../../../../redux/DriverDrugTestsSlice";
import DriverDrugTestsService from "../../../../../../services/DriverDrugTestsService";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ModalComponent from "../../../../../common/ModalComponent";
import PreviewPopup from "../../../../../common/PreviewPopup";
import ExportModal from "../../../../../common/ExportModal";
import LoadingIcon from "../../../../../common/LoadingIcon";

const FormEditFooter = () => {
  const { driverId, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tmrShow, setTmrShow] = useState(false);
  const driverDrugTestData = useSelector((state) => state.driverDrugTests.driverDrugTestData);
  const viewDetail = useSelector((state) => state.driverDrugTests.viewDetail);
  const resultClicked = useSelector((state) => state.driverDrugTests.resultClicked);
  const isGeneralTabValid = useSelector((state) => state.driverDrugTests.isGeneralTabValid);
  const isDrugTabValid = useSelector((state) => state.driverDrugTests.isDrugTabValid);
  const isAlcoholTabValid = useSelector((state) => state.driverDrugTests.isAlcoholTabValid);
  const isClinicTabValid = useSelector((state) => state.driverDrugTests.isClinicTabValid);
  const formData = useSelector((state) => state.driverDrugTests.formData);
  const overWritePermission = useSelector((state) => state.driverDrugTests.overWritePermission);
  const drugLoading = useSelector((state) => state.driverDrugTests.drugLoading);

  const [cancelShow, setCancelShow] = useState(false);
  const [option1, setOption1] = useState(""); // For Select Print or Email
  const [option2, setOption2] = useState(""); // For select User or Driver

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userPK = loggedInUser?.userPK;

  const [database, setDatabase] = useState("DriverDrugTests");
  const [fileContent, setFileContent] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loader, setLoader] = useState(false);
  const [base64PDF, setBase64PDF] = useState();
  const [loading, setLoading] = useState(false);
  const [drugTestMailObjectKey, setDrugTestMailObjectKey] = useState(["HRZ_DRUG_TEST"]);
  const [drugTestPrintObjectKey, setDrugTestPrintObjectKey] = useState("HRZ_DRG_TEST_FORM");

  const handleSave = () => {
    dispatch(setDrugLoading(true));
    DriverDrugTestsService.saveDriverDrugTests(driverDrugTestData)
      .then((response) => {
        if (id) {
          toast.success("Driver Drug Test Updated");
        } else {
          toast.success("Driver Drug Test Created");
        }
        dispatch(setViewDetail(true));
        dispatch(resetDriverDrugTestData());
        navigate(`/driver-drugtests/${driverId}`);
      })
      .catch((error) => {
        dispatch(setViewDetail(true));
        dispatch(resetDriverDrugTestData());
        navigate(`/driver-drugtests/${driverId}`);
        toast.error("Something Went Wrong");
      })
      .finally(() => {
        dispatch(setDrugLoading(false));
      });
  };

  const notifyAction = () => {
    if (!formData?.notificationDate) {
      DriverDrugTestsService.notifyAction(id)
        .then((res) => {
          dispatch(setNotify(true));
          dispatch(setNotify(false));
          fetchRecordById();
          handlePrint();
        })
        .catch((error) => {
          console.log("Error ", error);
        });
    } else {
      handlePrint();
    }
  };

  const fetchRecordById = () => {
    setLoading(true);
    DriverDrugTestsService.getDriverDrugTestsById(id)
      .then((response) => {
        const data = response.data;
        dispatch(setFormData(data));
        dispatch(setViewDetail(true));
        dispatch(setResultClicked(false));
      })
      .catch((error) => {
        console.log("Error ", error);
      });
    setTimeout(() => {
      setLoading(false);
    }, 50);
  };

  const resultButtonAction = () => {
    dispatch(setResultClicked(true));
    dispatch(setResultuser(userPK));
    dispatch(setIsCloseButtonPopUp(true));
  };

  const handleCancel = () => {
    if (viewDetail === false || resultClicked === true || id === undefined) {
      setCancelShow(true);
    } else {
      dispatch(setCancelled(true));
      setCancelShow(false);
      dispatch(setViewDetail(false));

      dispatch(setResultClicked(false));
      dispatch(setResultuser(formData?.resultsUserId || null));
      navigate(`/driver-drugtests/${driverId}`);
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    dispatch(setCancelled(true));
    if (id) {
      dispatch(setViewDetail(true));
      dispatch(setIsCloseButtonPopUp(true));
      dispatch(setResultClicked(false));
      setCancelShow(false);
      toast.success("Changes Cancelled");
      setTimeout(() => {
        dispatch(setOnCancel(true));
      }, 50);
      dispatch(setResultuser(formData?.resultsUserId || null));
    } else {
      dispatch(setViewDetail(false));
      navigate(`/driver-drugtests/${driverId}`);
      dispatch(resetDriverDrugTests());
      toast.success("Changes Cancelled");
      setTimeout(() => {
        dispatch(setOnCancel(true));
      }, 50);
    }
  };

  const handleTest = (email, print, emailToDriver, emailToUser) => {
    const selectionRequestVO = {
      manualemail: false,
      isYardPrint: false,
      isPrint: print,
      emailToCustomer: false,
      emailTocustomerPlant: false,
      emailToDealer: false,
      emailToUser: emailToUser,
      emailToDriver: emailToDriver,
      miscellaneousCustomerFlag: false,
      printYardFlag: false,

      primaryKey: id,
      entityName: database,

      isEmail: email || false,

      emailObjectKeyList: email ? drugTestMailObjectKey : [],
      printObjectKey: print ? drugTestPrintObjectKey : "",

      documentType: "",
      isDocumentSave: false,
      userPK: userPK,
    };
    DriverDrugTestsService.sendEmail(selectionRequestVO)
      .then((response) => {
        if (response && response.data) {
          setTmrShow(false);
          if (print) {
            const attachments = response.data[0].attachments;

            if (attachments && typeof attachments === "object") {
              const firstFileKey = Object.keys(attachments)[0]; // e.g. "ifta.pdf"
              const fileBase64 = attachments[firstFileKey];

              if (fileBase64) {
                setFileContent(fileBase64);
                setShowPreview(true);
                toast.success("Form generated successfully");
              } else {
                toast.error("No file content found");
              }
            } else {
              toast.error("Invalid Data");
            }
          } else {
            toast.success("Email Send Successfully");
          }
        } else {
          toast.error("Invalid Data");
        }
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const hidepopup = () => {
    setShowPreview(false);
  };

  const handlePrint = () => {
    setTmrShow(true);
  };

  const handleOption1Change = (event) => {
    const { value } = event.target;
    setOption1(event.target.value);
    if (value === "print") {
      setOption2("");
    }
  };

  const handleOption2Change = (event) => {
    setOption2(event.target.value);
  };

  const handleExport = () => {
    setLoader(true);
    handleTest(option1 === "email", option1 === "print", option2 === "driver", option2 === "user");
    setTmrShow(false);
    setOption1("");
    setOption2("");
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        {drugLoading && <LoadingIcon />}
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={notifyAction}
          hidden={!viewDetail || resultClicked}
          disabled={!formData?.selectionDate || formData?.resultsDate}
        >
          Notify
        </button>
        <PreviewPopup show={showPreview} base64PDF={fileContent} onHide={hidepopup} />
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={resultButtonAction}
          hidden={resultClicked || !viewDetail}
          disabled={!formData?.notificationDate || formData?.resultsDate || formData?.notTested}
        >
          Result
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={!resultClicked && viewDetail}
          disabled={!isGeneralTabValid || !isAlcoholTabValid || !isDrugTabValid || !isClinicTabValid}
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          route={""}
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={!viewDetail || resultClicked}
          onClick={() => {
            dispatch(setViewDetail(false));
            dispatch(setIsCloseButtonPopUp(true));
            if (!overWritePermission) {
              dispatch(setIsTabIdentify("clinic"));
            }
          }}
          label={"Edit"}
        >
          Edit
        </button>

        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Driver Drug Test Changes"}
          body={"Please confirm you want to cancel  changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        <ExportModal
          show={tmrShow}
          title="Export Option"
          onHide={() => {
            setTmrShow(false);
            setOption1("");
            setOption2("");
          }}
          option1={option1}
          option2={option2}
          onOption1Change={handleOption1Change}
          onOption2Change={handleOption2Change}
          exportHandler={handleExport}
          disabled={!option1 || (option1 !== "print" && !option2)}
        />

        <PreviewPopup show={showPreview} onHide={() => setShowPreview(false)} base64PDF={fileContent} />
        {loader && <LoadingIcon />}
      </div>
    </div>
  );
};

export default FormEditFooter;
