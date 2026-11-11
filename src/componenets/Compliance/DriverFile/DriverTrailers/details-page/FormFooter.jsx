import { parseLocalDate } from "../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../../../common/Button";
import ModalComponent from "../../../../common/ModalComponent";
import {
  resetDriverTrailers,
  resetDriverTrailersData,
  setActive,
  setDriverTrailersData,
  setFormData,
  setOnCancel,
  setViewDetail,
} from "../../../../../redux/DriverTrailersSlice";
import DriverTrailersService from "../../../../../services/DriverFile/DriverTrailersService";
import { Colors } from "../../../../../styles/values/colors";
import { Button, Modal } from "react-bootstrap";
import PreviewPopup from "../../../../common/PreviewPopup";
import ExportModal from "../../../../common/ExportModal";
import LoadingIcon from "../../../../common/LoadingIcon";
import SelectDropdown from "../../../../common/SelectDropdown";

const FormFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { driverId, recordId } = useParams();
  const id = recordId;

  const viewDetail = useSelector((state) => state.driverTrailers.viewDetail);
  const formData = useSelector((state) => state.driverTrailers.formData);
  const driverTrailersData = useSelector((state) => state.driverTrailers.driverTrailersData);
  const [recordCounts, setRecordCounts] = useState(0);
  const isGeneralTabValid = useSelector((state) => state.driverTrailers.isGeneralTabValid);
  const isComplianceTabValid = useSelector((state) => state.driverTrailers.isComplianceTabValid);
  const isLeaseTabValid = useSelector((state) => state.driverTrailers.isLeaseTabValid);
  const isMaintenanceTabValid = useSelector((state) => state.driverTrailers.isMaintenanceTabValid);
  const active = useSelector((state) => state.driverTrailers.active);

  const [activeShow, setActiveShow] = useState(false);
  const handleActiveShow = () => setActiveShow(true);
  const handleActiveClose = () => setActiveShow(false);
  const [isPrinciple, setiSPrinciple] = useState(true);
  const [cancelShow, setCancelShow] = useState(false);
  const [activeRecords, setActiveRecords] = useState(false); // For more than 3 records
  const [tmrShow, setTmrShow] = useState(false);

  const [descriptionUnique, setDescriptionUnique] = useState(false);

  const [option1, setOption1] = useState(""); // For Select TMR Month
  const [option2, setOption2] = useState(""); // For select Print or Email

  const [database, setDatabase] = useState("DriverTMRLogs");
  const [fileContent, setFileContent] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loader, setLoader] = useState(false);
  const [tmrCount, setTMRCount] = useState(0);
  const [activeLoading, setActiveLoading] = useState(false);
  const [loading9, setLoading9] = useState(false);
  const trailerEmailObjectKey = "HRZ:TRL:TMR:LOG";
  const trailerPrintObjectKey = "HRZ_TRL_TMR_REPT";
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userPK = loggedInUser?.userPK;
  const [tmrPK, setTmrPK] = useState(0);

  const [noTmrPopup, setNoTmrPopup] = useState(false);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  /*
  This handleSave method is used for saving or updating driver trailer details.
  if the url contains id then it is updated other wise a new trailer details is created.
*/

  const handleSave = async () => {
    try {
      setLoading9(true);

      const { description } = driverTrailersData;
      const res = await DriverTrailersService.checkDescriptionExist(driverId, description, id);

      if (res?.data === true) {
        setDescriptionUnique(true);
        setLoading9(false);
        return;
      }
      await DriverTrailersService.saveDriverTrailersDetails(driverTrailersData);

      if (id) {
        toast.success("Driver Trailer Updated");
      } else {
        toast.success("Driver Trailer Created");
      }

      dispatch(setViewDetail(true));
      dispatch(resetDriverTrailersData());

      navigate(`/driver-trailers/${driverId}`);
    } catch (error) {
      toast.error("Something Went Wrong");
      dispatch(setViewDetail(true));
      dispatch(resetDriverTrailersData());
      navigate(`/driver-trailers/${driverId}`);
    } finally {
      setLoading9(false);
    }
  };

  /* 
    This useEffect is used for set active value in the case of edit
  */

  useEffect(() => {
    if (formData != null && null != formData.active) {
      dispatch(setActive(formData?.active));
      setiSPrinciple(formData?.principle);
    }
  }, [formData]);

  useEffect(() => {
    DriverTrailersService.findActiveTrailers(driverId)
      .then((res) => {
        setRecordCounts(res.data);
      })
      .catch((error) => {
        console.log(error, "error ");
      });
  }, []);

  /*
        This handleActiveSave method is used for activating or deactivating a trailer.
        If active is true then deactivate it by setting active false
        If active is false then activate it by setting active true

  */

  const handleActiveSave = (e) => {
    if (active === true) {
      deActivateTrailer();
    } else {
      activateTrailer();
    }
  };

  /*
      To activateTrailer method is for activate a trailer which is not a principle trailer. 
      
      id                    : driverTrailerPK
      setActive             : True
      
      Returning value
     1                      : It is a principle trailer.
     0                      : It is not a principle trailer. We can activate and deactivate it
  */
  const activateTrailer = () => {
    setActiveLoading(true);
    setActiveShow(false);
    DriverTrailersService.activateTrailer(id)
      .then((res) => {
        dispatch(setActive(true));
        toast.success("Driver Trailer Activated");
      })
      .catch((error) => {
        console.log(error, "error ");
      })
      .finally(() => {
        setActiveLoading(false);
      });
  };

  /*
      To deactivate a trailer which is not a principle trailer.      
      id                    : driverTrailerPK
      setActive             : False      
      Returning value
     1                      : It is a principle trailer.
     0                      : It is not a principle trailer. We can activate and deactivate it
  */

  const deActivateTrailer = () => {
    if (recordCounts > 2 && isPrinciple) {
      setActiveRecords(true);
      setActiveShow(false);
    } else {
      setActiveShow(false);
      setActiveLoading(true);

      DriverTrailersService.activateTrailer(id)
        .then((res) => {
          dispatch(setActive(false));
          toast.success("Driver Trailer Deactivated");
        })
        .catch((error) => {
          console.log(error, "error ");
        })
        .finally(() => {
          setActiveLoading(false);
        });
    }
  };

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      dispatch(setFormData(null));
      navigate(`/driver-trailers/${driverId}`);
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      dispatch(setViewDetail(true));
      setCancelShow(false);
      toast.success("Changes Cancelled");
      setTimeout(() => {
        dispatch(setOnCancel(true));
      }, 50);
    } else {
      dispatch(setViewDetail(false));
      dispatch(setFormData(null));
      navigate(`/driver-trailers/${driverId}`);
      dispatch(resetDriverTrailers());
      toast.success("Changes Cancelled");
      setTimeout(() => {
        dispatch(setOnCancel(true));
      }, 50);
    }
  };

  const handleOK = () => {
    setActiveRecords(false);
  };

  const handleTMR = () => {
    setTmrShow(false);
  };

  const handleClickTMR = () => {
    setTmrShow(true);
  };

  const handleOption1Change = (selectedMonth) => {
    setOption1(selectedMonth);

    if (!selectedMonth) {
      setTMRCount(0);
      return;
    }

    const monthNumber = months.indexOf(selectedMonth) + 1;

    if (monthNumber < 1) {
      setTMRCount(0);
      return;
    }

    DriverTrailersService.findTMRRecords(driverId, id, monthNumber)
      .then((res) => {
        const tmrData = res?.data;

        if (!tmrData?.tmrLogPK) {
          toast.error("Unable to process TMR");
          return;
        }

        const count = res.data || 0;
        setTMRCount(count);
        setTmrPK(tmrData?.tmrLogPK);

        const dueDate = tmrData.dueDate;
        if (dueDate) {
          const isOverdue = checkTMRDueDateAndUpdateMaintenance(dueDate, id);
        }
      })
      .catch((error) => {
        setTMRCount(0);
      });
  };

  const checkTMRDueDateAndUpdateMaintenance = async (dueDate, driverTrailerPK) => {
    if (!dueDate) {
      return false;
    }

    const tmrDueDate = parseLocalDate(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    tmrDueDate.setHours(0, 0, 0, 0);

    if (tmrDueDate < today) {
      try {
        const currentTrailerData = { ...driverTrailersData };
        const updatedTrailerData = {
          ...currentTrailerData,
          maintenanceReportHold: true,
          maintenanceReportHoldDate: dueDate,
          nextMaintenanceReport: dueDate,
          nextMaintenanceReportDue: dueDate,
        };
        await DriverTrailersService.saveDriverTrailersDetails(updatedTrailerData);
        const freshResponse = await DriverTrailersService.getDriverTrailerById(driverTrailerPK);
        if (freshResponse?.data) {
          const freshData = freshResponse.data;
          dispatch(setDriverTrailersData(freshData));

          toast.success("Maintenance information updated for overdue TMR");
        }

        return true;
      } catch (error) {
        toast.error("Failed to update maintenance information");
        return false;
      }
    }
    return false;
  };

  const handleOption2Change = (event) => {
    setOption2(event.target.value);
  };

  const onHide = () => {
    setTmrShow(false);
    setOption1("");
    setOption2("");
  };

  const handleTest = (selectedMonth, selectedYear, print, email) => {
    const selectionRequestVO = {
      manualemail: false,
      isYardPrint: false,
      isPrint: print,
      emailToCustomer: false,
      emailTocustomerPlant: false,
      emailToDealer: false,
      emailToUser: false,
      emailToDriver: false,
      miscellaneousCustomerFlag: false,
      printYardFlag: false,

      primaryKey: tmrPK,
      primaryKeyName: "DriverTMRLogPK",
      entityName: database,

      isEmail: email || false,

      emailObjectKeyList: email ? [trailerEmailObjectKey] : [],
      printObjectKey: print ? trailerPrintObjectKey : "",

      documentType: "",
      isDocumentSave: false,
      userPK: userPK,

      tmrMonth: selectedMonth,
      tmrYear: selectedYear,
    };

    DriverTrailersService.sendEmail(selectionRequestVO)
      .then((response) => {
        if (response && response.data) {
          setTmrShow(false);

          if (print) {
            const attachments = response.data[0].attachments;

            if (attachments && typeof attachments === "object") {
              const firstFileKey = Object.keys(attachments)[0];
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
      .catch((error) => {
        toast.error("Unable to generate TMR");
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const hidepopup = () => {
    setShowPreview(false);
  };

  const handleExport = () => {
    if (!option1 || !option2) {
      return;
    }

    const selectedMonthNumber = months.indexOf(option1) + 1;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const selectedYear = selectedMonthNumber <= currentMonth ? currentYear : currentYear - 1;
    setTmrShow(false);
    setOption1("");
    setOption2("");
    setLoader(true);

    handleTest(selectedMonthNumber, selectedYear, option2 === "print", option2 === "email");
  };

  const tmrRecords = () => {
    DriverTrailersService.findTMRRecords(driverId, id, 8)
      .then((res) => {
        setTMRCount(res.data);
      })
      .catch((error) => {
        console.log(error, "error ");
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {(loading9 || activeLoading) && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={!viewDetail}
          disabled={!active}
          onClick={handleClickTMR}
        >
          TMR
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={!viewDetail}
          onClick={handleActiveShow}
          style={active === false ? { backgroundColor: Colors.red } : { backgroundColor: "" }}
        >
          Active
        </button>
        {/* <PreviewPopup show={showPreview} base64PDF={fileContent} onHide={hidepopup} /> */}
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type=""
          disabled={!isGeneralTabValid || !isComplianceTabValid || !isMaintenanceTabValid || !isLeaseTabValid}
          hidden={viewDetail}
          onClick={() => handleSave()}
        >
          Save
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <ButtonComponent
          route={""}
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={!viewDetail}
          onClick={() => {
            dispatch(setViewDetail(false));
          }}
          label={"Edit"}
        />

        {/* model Active*/}
        <ModalComponent
          show={activeShow}
          onHide={handleActiveClose}
          title={active === true ? "Deactivate Trailer" : "Activate Trailer"}
          body={
            active === true
              ? " Please confirm you want to Deactivate this Trailer"
              : " Please confirm you want to Activate this Trailer"
          }
          handleYES={handleActiveSave}
          handleNO={handleActiveClose}
        />

        {/* Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Trailer Maintenance Changes "}
          body={"Please confirm you want to cancel  changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        {/* Diplay Message for deactivation more than 3 records Modal */}
        <ModalComponent
          show={activeRecords}
          onHide={handleOK}
          title={"Assign a new principle trailer "}
          body={"You must assign a new principle trailer before deactivating it"}
          handleOK={handleOK}
          showOK
        />

        <ModalComponent
          centered
          show={tmrShow}
          contentClassName={"customModalContentWidth"}
          onHide={() => {
            setTmrShow(false);
            setOption1("");
            setOption2("");
          }}
          body={
            <>
              {/* MONTH */}

              <div className="mb-1 d-flex justify-content-center align-items-center gap-3">
                <label className="form-check-label">Month</label>

                <div style={{ width: "150px" }}>
                  <SelectDropdown
                    arrayList={months.map((month) => ({
                      id: month,
                      name: month,
                    }))}
                    selectedId={option1}
                    renderItemId={(item) => item.id}
                    renderItemField={(item) => item.name}
                    onSelect={(item) => handleOption1Change(item ? item.id : "")}
                    placeholder="--Select--"
                  />
                </div>
              </div>

              <div className="d-flex justify-content-center gap-4 mt-3">
                <div>
                  <label className="form-check-label me-2">Print</label>
                  <input
                    type="radio"
                    value="print"
                    checked={option2 === "print"}
                    disabled={!option1}
                    onChange={(e) => {
                      setOption2(e.target.value);
                    }}
                    className="form-check-input"
                  />
                </div>
                <div>
                  <label className="form-check-label me-2">Email</label>
                  <input
                    type="radio"
                    value="email"
                    checked={option2 === "email"}
                    disabled={!option1}
                    onChange={(e) => {
                      setOption2(e.target.value);
                    }}
                    className="form-check-input"
                  />
                </div>
              </div>
            </>
          }
          customButton={true}
          title={"Trailer TMR"}
          buttonText={"Export"}
          handleYES={handleExport}
          disableCustomButton={!option1 || !option2}
        />

        <PreviewPopup show={showPreview} onHide={() => setShowPreview(false)} base64PDF={fileContent} />
        {loader && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormFooter;
