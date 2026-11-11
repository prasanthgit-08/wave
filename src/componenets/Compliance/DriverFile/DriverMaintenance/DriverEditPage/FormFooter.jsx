import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ButtonComponent from "../../../../common/Button";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import DriverService from "../../../../../services/DriverService";
import {
  setAdsLogin,
  setAdsLoginValid,
  setDisplayFlag,
  setDocumentFile,
  setEditFormData,
  setFileType,
  setImageFile,
  setMotorizedDriver,
  setOnCancel,
  setOrientationFlag,
  setPictureFile,
  setPictureFileName,
  setSaveFormData,
  setViewDetail,
} from "../../../../../redux/DriverMaintenanceSlice";
import { useDispatch } from "react-redux";
import ModalComponent from "../../../../common/ModalComponent";
import PictureScreenModal from "./PIctureScreen/PictureScreenModal";
import { setIsFromDriverDelease } from "../../../../../redux/DriverDeleaseSlice";
import { setIsDeleaseProcess } from "../../../../../redux/DriverDeleaseRequestsSlice";
import { setIsValidEntry } from "../../../../../redux/DriverDispatchHoldSlice";
import { setIsDrugTestForm } from "../../../../../redux/DriverDrugTestsSlice";
import { setIsTrailerForm } from "../../../../../redux/DriverTrailersSlice";
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";
const FormFooter = () => {
  const params = useParams();
  const id = params.id;
  const pageNumber = params.pageNumber;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [disableSave, setDisableSave] = useState(true);
  const [cancelShow, setCancelShow] = useState(false);
  const [showPictureModal, setShowPictureModal] = useState(false);
  const [saveFlag, setSaveFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uniqueness, setUniqueness] = useState(true);
  const viewDetail = useSelector((state) => state.driverMaintenanceReducer.viewDetail);
  const saveFormData = useSelector((state) => state.driverMaintenanceReducer.saveFormData);
  const pictureFile = useSelector((state) => state.driverMaintenanceReducer.pictureFile);
  const isGeneralTabValid = useSelector((state) => state.driverMaintenanceReducer.isGeneralTabValid);
  const isSettingsTabValid = useSelector((state) => state.driverMaintenanceReducer.isSettingsTabValid);
  const isComplianceTabValid = useSelector((state) => state.driverMaintenanceReducer.isComplianceTabValid);
  const isDriverFundTabValid = useSelector((state) => state.driverMaintenanceReducer.isDriverFundTabValid);
  const isDatesTabValid = useSelector((state) => state.driverMaintenanceReducer.isDatesTabValid);
  const isOthersTabValid = useSelector((state) => state.driverMaintenanceReducer.isOthersTabValid);
  const driverSSN = useSelector((state) => state.driverMaintenanceReducer.driverSSN);
  const adsLogin = useSelector((state) => state.driverMaintenanceReducer.adsLogin);
  const isAwardTabValid = useSelector((state) => state.driverMaintenanceReducer.isAwardTabValid);
  const [loadFlag, setLoadFlag] = useState(false);
  /* save Driver picture*/
  const saveDriver = async () => {
    let value = saveFormData?.debitCardNumber?.trim();
    if (value) {
      setLoadFlag(true);
      const res = await DriverService.checkDebitCardValidOrNot(saveFormData?.debitCardNumber);
      setLoading(false);
      if (res.data === false) {
        setLoadFlag(false);
        setDisableSave(true);
        return;
      }
    }

    let debitCardUnitNumber = saveFormData?.debitCardUnitNumber?.trim();
    if (debitCardUnitNumber) {
      setLoadFlag(true);
      const res = await DriverService.isDebitcardUnitnumberExist(debitCardUnitNumber, id);
      setLoading(false);
      if (res.data === true) {
        setLoadFlag(false);
        setDisableSave(true);
        return;
      }
    }

    const formData = new FormData();
    if (pictureFile && pictureFile.length > 0) {
      //used to save driver with picture
      pictureFile.forEach((file, index) => {
        formData.append("file", file);
      });
      setLoading(true);
      DriverService.savePicture(formData, saveFormData.pictureDocumentBLOBFK)
        .then((res) => {
          const pictureId = res.data.documentBLOBPK;
          if (pictureId != null) {
            const tempSaveFormData = {
              ...saveFormData,
              pictureDocumentBLOBFK: pictureId,
            };

            DriverService.createDriverRecord(tempSaveFormData)
              .then((res) => {
                if (id) {
                  toast.success("Driver Updated");
                } else {
                  toast.success("Driver Created");
                }
                navigate("/driver-maintenance");

                setLoadFlag(false);
              })
              .catch((err) => {
                setLoadFlag(false);
                console.log(err);
                toast.error("Something went wrong");
                navigate("/driver-maintenance");
              })
              .finally(() => setLoading(false));
          }
        })
        .catch((err) => {
          console.log(err);
          navigate("/driver-maintenance");
          toast.error("Failed to save picture");
          setLoadFlag(false);
        })
        .finally(() => {
          setLoadFlag(false);
          dispatch(setPictureFileName(""));
          dispatch(setAdsLogin(""));
          dispatch(setEditFormData(null));
        });
    } else {
      //used to save driver without picture
      setLoadFlag(true);
      setLoading(true);
      DriverService.createDriverRecord(saveFormData)
        .then((res) => {
          if (id) {
            toast.success("Driver Updated");
          } else {
            toast.success("Driver Created");
          }
          navigate("/driver-maintenance");

          setLoadFlag(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
          navigate("/driver-maintenance");
          setLoadFlag(false);
        })
        .finally(() => {
          setLoading(false);
          setLoadFlag(false);
          dispatch(setAdsLogin(""));
          dispatch(setEditFormData(null));
        });
    }
  };

  /**
   * Cancel
   */
  const handleCancelShow = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/driver-maintenance");
      toast.success("Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(setSaveFormData(undefined));
      dispatch(setOnCancel(true));
      dispatch(setPictureFile([]));
      dispatch(setDisplayFlag(false));
      toast.success("Changes Cancelled");
    } else {
      navigate("/driver-maintenance");
      dispatch(setViewDetail(false));
      dispatch(setOnCancel(true));
      toast.success("Changes Cancelled");
    }
  };

  const handlePicture = () => {
    dispatch(setDisplayFlag(true));
    if (pictureFile) {
      dispatch(setImageFile(pictureFile));
    }
    // a modal over the edit page, so the tabs are not unmounted and keep what was entered
    setShowPictureModal(true);
  };

  //tab validation
  /**
   * Save -Disable
   */
  useEffect(() => {
    if (
      isGeneralTabValid &&
      isSettingsTabValid &&
      isComplianceTabValid &&
      isDriverFundTabValid &&
      isDatesTabValid &&
      isOthersTabValid &&
      isAwardTabValid
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [
    isComplianceTabValid,
    isDriverFundTabValid,
    isDatesTabValid,
    isGeneralTabValid,
    isSettingsTabValid,
    isOthersTabValid,
    isAwardTabValid,
  ]);

  const handleCheckUniqueAdsLogin = () => {
    // Step 1: Check SSN uniqueness
    setSaveFlag(true);
    setLoading(true);
    DriverService.ssnExist(driverSSN, id)
      .then((ssnResponse) => {
        if (ssnResponse.data) {
          //  SSN already exists — disable save
          setDisableSave(true);
          setSaveFlag(false);
          setLoading(false);
        } else {
          //SSN is unique — check adsLogin
          setDisableSave(false);
          // setSaveFlag(true);

          setSaveFlag(true);
          DriverService.checkUniqueAdsLogin(adsLogin, id)
            .then((adsLoginResponse) => {
              if (!adsLoginResponse.data) {
                //  adsLogin already exists — block save
                setUniqueness(false);
                dispatch(setAdsLoginValid(false));
                setSaveFlag(false);
                setLoading(false);
              } else {
                // Both SSN and adsLogin are unique — proceed to save
                setUniqueness(true);
                dispatch(setAdsLoginValid(true));
                saveDriver();
              }
            })
            .catch((err) => {
              console.error("Error checking adsLogin:", err);
              setSaveFlag(false);
              setLoading(false);
            })
            .finally(() => setSaveFlag(false));
        }
      })
      .catch((err) => {
        console.error("Error checking SSN:", err);
        setSaveFlag(false);
      })
      .finally(() => setSaveFlag(false));
  };

  const handleOrientationClick = () => {
    dispatch(setOrientationFlag(true));
    navigate(`/driver-orientation-forms/${id}`);
  };
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10">
        <ButtonComponent
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          label={"Trucks"}
          hidden={!id || viewDetail === false}
          route={`/driver-trucks/${id}`}
        />
        <ButtonComponent
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5 "
          label={"Trailers"}
          hidden={!id || viewDetail === false}
          route={`/driver-trailers/${id}`}
          onClick={() => {
            dispatch(setIsTrailerForm(true));
          }}
        />
        <ButtonComponent
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5 "
          label={"TMR Logs"}
          hidden={!id || viewDetail === false}
          route={`/driver-TMRlogs/${id}`}
        />
        <ButtonComponent
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5 "
          label={"Compliance"}
          hidden={!id || viewDetail === false}
          route={`/driver-compliance-items/${id}`}
          onClick={() => {
            localStorage.setItem("driverComplianceFromDriver", true);
            localStorage.setItem("pageNumberForDriverComplianceItem", pageNumber);

            navigate(`/driver-compliance-items/${id}`);
          }}
        />
        <ButtonComponent
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5 "
          label={"Reserves"}
          hidden={!id || viewDetail === false}
          route={`/driver-reserve-main/${id}`}
        />
        <ButtonComponent
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5 "
          label={"Garnishments"}
          hidden={!id || viewDetail === false}
          route={`/driver-garnishment/${id}`}
        />
        <ButtonComponent
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5 "
          label={"Deleases"}
          hidden={!id || viewDetail === false}
          route={"/driver-delease/" + id}
          onClick={() => {
            /****set flags to indiacet whether this Program
             *  is called from the Driver Delease Button
             * *****/
            dispatch(setIsFromDriverDelease(true));
            dispatch(setIsDeleaseProcess(false));
          }}
        />
        <ButtonComponent
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5 "
          label={"Delease Requests"}
          hidden={!id || viewDetail === false}
          route={`/driver-delease-requests/${id}`}
        />
        <ButtonComponent
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5 "
          label={"Dispatch Holds"}
          hidden={!id || viewDetail === false}
          route={`/drivercompliance/driver-dispatchhold/${id}`}
          onClick={() => {
            localStorage.setItem("driverDispatchHoldPgm", 1);
            dispatch(setIsValidEntry(true));
          }}
        />
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5 "
          type="button"
          hidden={!id || viewDetail === false}
          onClick={handleOrientationClick}
        >
          Orientation
        </button>
      </div>
      <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0"> </Form.Group>
      <div className="d-flex align-items-center flex-wrap m-r-10 ">
        <ButtonComponent
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          label={"Equipment"}
          hidden={!id || viewDetail === false}
          route={`/assigned-equipment/${id}`}
        />
        <ButtonComponent
          route={`/bond-fund/${id}`}
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5 "
          label={"Bond Fund"}
          hidden={!id || viewDetail === false}
        />
        <ButtonComponent
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5 "
          label={"Drug Tests"}
          hidden={!id || viewDetail === false}
          route={`/driver-drugtests/${id}`}
          onClick={() => {
            dispatch(setIsDrugTestForm(true));
          }}
        />
        <ButtonComponent
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5 "
          label={"Report Card"}
          hidden={!id || viewDetail === false}
          route={`/compliance-report-card/${id}`}
        />
        <ButtonComponent
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5 "
          label={"Mileage Log"}
          hidden={!id || viewDetail === false}
          route={`/driver-mileagelog/${id}`}
        />
        <ButtonComponent
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5 "
          label={"Bond Log"}
          hidden={!id || viewDetail === false}
          route={`/driver-bond-fund-log/${id}`}
        />
        <ButtonComponent
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5 "
          label={"Reserves Log"}
          hidden={!id || viewDetail === false}
          route={`/driver-reserve-fund-log/${id}`}
        />
        <ButtonComponent
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5 "
          label={"DOT Inspection"}
          hidden={!id || viewDetail === false}
          route={`/driver-dot-inspection-browse/${id}`}
        />
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5"
          type="button"
          hidden={!id || viewDetail === false}
          onClick={() => navigate(`/driver-maintenance/${id}/holds`)}
        >
          Holds
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5 "
          type="button"
          hidden={!id || viewDetail === false}
          onClick={() => navigate(`/driver-pay-log/${id}`)}
        >
          Pay Log
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5 "
          type="button"
          hidden={!id || viewDetail === false}
          onClick={() => navigate(`/return-tmr/${id}`)}
        >
          Return TMR
        </button>
      </div>
      <div className="d-flex align-items-center flex-wrap w">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5 "
          type="button"
          onClick={handlePicture}
          disabled={viewDetail}
          hidden={viewDetail}
        >
          Picture
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5 "
          type="button"
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={handleCheckUniqueAdsLogin}
        >
          Save
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5 "
          type="button"
          onClick={handleCancelShow}
        >
          Cancel
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-r-5 m-b-5 "
          type="button"
          hidden={!id || viewDetail === false}
          onClick={() => dispatch(setViewDetail(false))}
        >
          Edit
        </button>
        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Driver Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        <PictureScreenModal show={showPictureModal} onHide={() => setShowPictureModal(false)} />
      </div>
      {(saveFlag || loadFlag || loading) && (
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

export default FormFooter;
