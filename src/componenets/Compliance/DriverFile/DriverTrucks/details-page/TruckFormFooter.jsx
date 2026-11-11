import { parseLocalDate } from "../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../../../common/Button";
import ModalComponent from "../../../../common/ModalComponent";
import {
  resetDriverTrucksData,
  setViewDetails,
  toggleChangesCancelled,
  setOnCancel,
  setActive,
  setSaveLoad,
  setDescriptionUnique,
  setPrintTruckData,
  setDriverTruckData,
} from "../../../../../redux/DriverTrucksSlice";
import DriverTrucksService from "../../../../../services/DriverFile/DriverTrucksService";
import { Colors } from "../../../../../styles/values/colors";
import { Button, Form } from "react-bootstrap";
import { setDescription } from "../../../../../redux/ComplianceItemsSlice";
import PreviewPopup from "../../../../common/PreviewPopup";
import LoadingIcon from "../../../../common/LoadingIcon";
import SelectDropdown from "../../../../common/SelectDropdown";

const TruckFormFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { driverId, recordId } = useParams();
  const id = recordId;
  const [cancelShow, setCancelShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [activeShow, setActiveShow] = useState(false);
  const [tmrCount, setTMRCount] = useState(0);
  const [fileContent, setFileContent] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const [loading, setLoading] = useState(false);
  const [noTmrPopup, setNoTmrPopup] = useState(false);
  const [isPrinciple, setIsPrinciple] = useState(false);
  const [recordCounts, setRecordCounts] = useState(0);
  const [activeRecords, setActiveRecords] = useState(false);
  const [uniqueness, setUniqueness] = useState(true);
  const viewDetails = useSelector((state) => state.driverTrucks.viewDetails);
  const driverTrucks = useSelector((state) => state.driverTrucks.driverTrucks);
  const formData = useSelector((state) => state.driverTrucks.formData);
  const driverTruckData = useSelector((state) => state.driverTrucks.driverTruckData);
  const isGeneralTabValid = useSelector((state) => state.driverTrucks.isGeneralTabValid);
  const isComplianceTabValid = useSelector((state) => state.driverTrucks.isComplianceTabValid);
  const isMaintenanceTabValid = useSelector((state) => state.driverTrucks.isMaintenanceTabValid);
  const isLeaseTabValid = useSelector((state) => state.driverTrucks.isLeaseTabValid);
  const active = useSelector((state) => state.driverTrucks.active);
  const showPrincipleModel = useSelector((state) => state.driverTrucks.showPrincipleModel);
  const printTruckData = useSelector((state) => state.driverTrucks.printTruckData);
  const [loader, setLoader] = useState(false);
  const [database, setDatabase] = useState("DriverTrucks");
  const [tmrShow, setTmrShow] = useState(false);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
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

  const truckPrintObjectKey = "HRZ_TRUCK_TMR_REPT";
  const truckEmailObjectKey = "HRZ_TRUCK_TMR_REPT";
  const userPK = loggedInUser?.userPK;

  const handleCancel = () => {
    if (viewDetails === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetails(false));
      navigate(`/driver-trucks/${driverId}`);
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => {
    setCancelShow(false);
  };

  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetails(true));
      dispatch(setDescriptionUnique(false));
      toast.success("Changes Cancelled");
      dispatch(toggleChangesCancelled());
      setTimeout(() => {
        dispatch(setOnCancel(true));
      }, 10);
    } else {
      navigate(`/driver-trucks/${driverId}`);
      dispatch(setViewDetails(false));
      dispatch(resetDriverTrucksData());
      toast.success("Changes Cancelled");
      setTimeout(() => {
        dispatch(setOnCancel(true));
      }, 10);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      dispatch(setSaveLoad(true));
      const { description } = driverTruckData;
      const res = await DriverTrucksService.checkDescriptionExist(driverId, description, id);
      if (res?.data === true) {
        setUniqueness(true);
        setLoading(false);
        dispatch(setSaveLoad(false));
        return;
      }
      await DriverTrucksService.saveDriverTruck(driverTruckData);
      if (id) {
        toast.success("Driver Truck Updated");
      } else {
        toast.success("Driver Truck Created");
      }
      setTimeout(() => {
        navigate(`/driver-trucks/${driverId}`);
        dispatch(setDescription(""));
        dispatch(setSaveLoad(false));
      }, 50);
    } catch (err) {
      toast.error("Something Went Wrong");
      dispatch(setSaveLoad(false));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    DriverTrucksService.findActiveTrucks(driverId)
      .then((res) => {
        setRecordCounts(res.data);
      })
      .catch((error) => {});
  }, [driverId]);

  useEffect(() => {
    if (
      isGeneralTabValid &&
      isComplianceTabValid &&
      isMaintenanceTabValid &&
      (isLeaseTabValid || isLeaseTabValid === null) &&
      uniqueness
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [isGeneralTabValid, isComplianceTabValid, isMaintenanceTabValid, isLeaseTabValid, uniqueness]);

  useEffect(() => {
    if (formData != null && formData.active != null) {
      dispatch(setActive(formData?.active));
      setIsPrinciple(formData?.principle);
    }
  }, [formData, dispatch]);

  const handleActiveShow = () => {
    setActiveShow(true);
  };

  const handleActiveClose = () => {
    setActiveShow(false);
  };

  const handleActiveSave = () => {
    if (active === true) {
      deActivateTruck();
    } else {
      activateTruck();
    }
  };

  const activateTruck = () => {
    setActiveShow(false);
    setLoading(true);

    DriverTrucksService.activateTruck(id)
      .then((res) => {
        dispatch(setActive(true));
        toast.success("Driver Truck Activated");
      })
      .catch((error) => {})
      .finally(() => setLoading(false));
  };

  const deActivateTruck = () => {
    if (recordCounts > 2 && isPrinciple) {
      setActiveRecords(true);
    } else {
      setLoading(true);
      setActiveShow(false);

      DriverTrucksService.activateTruck(id)
        .then((res) => {
          setActiveShow(false);
          dispatch(setActive(false));
          toast.success("Driver Truck Deactivated");
        })
        .catch((error) => {})
        .finally(() => setLoading(false));
    }
  };

  const handleOK = () => {
    setActiveRecords(false);
  };

  const handleClickTMR = () => {
    setTmrShow(true);
  };

  const handleOption1Change = (selectedMonth) => {
    setOption1(selectedMonth);
  };

  const handleOption2Change = (event) => {
    setOption2(event.target.value);
  };

  const handleTMR = () => {
    setTmrShow(false);
    setOption1("");
    setOption2("");
  };

  const checkTMRDueDateAndUpdateMaintenance = async (dueDate, driverTruckId) => {
    if (!dueDate) {
      console.log("No dueDate returned from TMR API");
      return false;
    }

    const tmrDueDate = parseLocalDate(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    tmrDueDate.setHours(0, 0, 0, 0);

    if (tmrDueDate < today) {
      console.log("TMR is overdue. Updating maintenance fields in database.");

      try {
        const currentTruckData = { ...driverTruckData };
        const updatedTruckData = {
          ...currentTruckData,
          maintenanceReportHold: true,
          maintenanceReportHoldDate: dueDate,
          nextMaintenanceReport: dueDate,
          nextMaintenanceReportDue: dueDate,
        };
        await DriverTrucksService.saveDriverTruck(updatedTruckData);
        const freshResponse = await DriverTrucksService.getDriverTruckById(driverTruckId);
        if (freshResponse?.data) {
          const freshData = freshResponse.data;
          dispatch(setDriverTruckData(freshData));

          toast.success("Maintenance information updated for overdue TMR");
        } else {
          console.error("No data returned from getDriverTruckById");
        }

        return true;
      } catch (error) {
        console.error("Error updating maintenance fields:", error);
        toast.error("Failed to update maintenance information");
        return false;
      }
    }
    console.log("TMR is not overdue. No maintenance update required.");
    return false;
  };

  const handleExport = async () => {
    if (!option1) {
      toast.error("Please select month");
      return;
    }

    if (!option2) {
      toast.error("Please select Print or Email");
      return;
    }

    const selectedMonthNumber = months.indexOf(option1) + 1;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const selectedYear = selectedMonthNumber <= currentMonth ? currentYear : currentYear - 1;

    const isPrint = option2 === "print";
    const isEmail = option2 === "email";
    setTmrShow(false);
    setOption1("");
    setOption2("");
    setLoader(true);

    try {
      const response = await DriverTrucksService.checkAndCreateTMR(driverId, id, selectedMonthNumber);
      const tmrData = response?.data;
      console.log("TMR Data:", tmrData);

      if (!tmrData?.tmrLogPK) {
        toast.error("Unable to process TMR");
        setLoader(false);
        return;
      }

      const tmrLogPK = tmrData.tmrLogPK;
      const dueDate = tmrData.dueDate;
      if (dueDate) {
        const isOverdue = await checkTMRDueDateAndUpdateMaintenance(dueDate, id);

        if (isOverdue) {
          console.log("TMR is overdue. Maintenance information updated successfully.");
        } else {
          console.log("TMR is not overdue. No maintenance update required.");
        }
      } else {
        console.log("Existing TMR found. No maintenance date update required.");
      }

      handleTest(tmrLogPK, selectedMonthNumber, selectedYear, isPrint, isEmail);
    } catch (error) {
      console.error("Error while checking/creating TMR record:", error);
      toast.error("Unable to process TMR");
      setLoader(false);
    }
  };

  const handleTest = (tmrLogPK, selectedMonth, selectedYear, print, email) => {
    const obj = {
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

      primaryKey: tmrLogPK,
      primaryKeyName: "DriverTMRLogPK",
      entityName: "DriverTMRLogs",
      isEmail: email || false,
      emailObjectKeyList: email ? [truckEmailObjectKey] : [],
      emailObjectKey: email ? truckEmailObjectKey : "",
      printObjectKey: print ? truckPrintObjectKey : "",

      documentType: "",
      isDocumentSave: false,
      userPK: userPK,

      tmrMonth: selectedMonth,
      tmrYear: selectedYear,
    };

    DriverTrucksService.composeEmail(obj)
      .then((response) => {
        if (response && response.data) {
          if (print) {
            const firstItem = response.data[0];
            const attachments = firstItem.attachments;
            const truckPdfBase64 = attachments["inspection.pdf"];

            setFileContent(truckPdfBase64);
            setShowPreview(true);
          } else {
            toast.success("Email Send Successfully");
          }
        } else {
          toast.error("Invalid Data");
        }
      })
      .catch((error) => {
        console.log(error, "Error while generating TMR");
        toast.error("Unable to generate TMR");
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}

      <div className="d-flex align-items-center flex-wrap m-r-10"></div>

      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!viewDetails}
          disabled={!active}
          onClick={handleClickTMR}
        >
          TMR
        </button>

        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!viewDetails}
          onClick={handleActiveShow}
          style={
            !active
              ? {
                  backgroundColor: Colors.red,
                }
              : {
                  backgroundColor: "",
                }
          }
        >
          Active
        </button>

        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={viewDetails}
          disabled={disableSave || showPrincipleModel}
          onClick={handleSave}
        >
          Save
        </button>

        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <ButtonComponent
          route={""}
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          onClick={() => dispatch(setViewDetails(false))}
          hidden={!viewDetails}
          label={"Edit"}
        />

        <ModalComponent
          show={activeShow}
          onHide={handleActiveClose}
          title={active === true ? "Deactivate Truck" : "Activate Truck"}
          body={
            active === true
              ? "Please confirm do you want to Deactivate this Truck"
              : "Please confirm do you want to Activate this Truck"
          }
          handleYES={handleActiveSave}
          handleNO={handleActiveClose}
        />

        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Driver Truck Changes "}
          body={"Please confirm you want to cancel changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        <ModalComponent
          show={activeRecords}
          onHide={handleOK}
          title={"Assign a new principle truck "}
          body={"You must assign a new principle truck before deactivating it"}
          handleOK={handleOK}
          showOK
        />

        <PreviewPopup
          show={showPreview}
          onHide={() => setShowPreview(false)}
          base64PDF={fileContent}
          handleClose={() => setShowPreview(false)}
        />

        <ModalComponent
          centered
          show={tmrShow}
          contentClassName={"customModalContentWidth"}
          onHide={handleTMR}
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

              {/* PRINT / EMAIL */}
              <div className="d-flex justify-content-center gap-4 mt-3">
                <div>
                  <label className="form-check-label me-2">Print</label>
                  <input
                    type="radio"
                    value="print"
                    checked={option2 === "print"}
                    disabled={!option1}
                    onChange={handleOption2Change}
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
                    onChange={handleOption2Change}
                    className="form-check-input"
                  />
                </div>
              </div>
            </>
          }
          customButton={true}
          title={"Truck TMR"}
          buttonText={"Export"}
          handleYES={handleExport}
          disableCustomButton={!option1 || !option2 || loader}
        />

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

export default TruckFormFooter;
