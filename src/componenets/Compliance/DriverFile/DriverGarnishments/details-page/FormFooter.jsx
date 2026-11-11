import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  setCurrentTab,
  setDuplicateDescription,
  setLoading,
  setOnCancel,
  setSaveLoading,
  setViewDetail,
  toggleChangesCancelled,
  setDescription,
} from "../../../../../redux/DriverGarnishmentsSlice";
import DriverGarnishmentsService from "../../../../../services/DriverGarnishmentsService";
import toast from "react-hot-toast";
import ModalComponent from "../../../../common/ModalComponent";
import { setCheckPayzipPostLenght } from "../../../../../redux/CheckPayToSlice";
import LoadingIcon from "../../../../common/LoadingIcon";

const FormFooter = () => {
  const viewDetail = useSelector((state) => state.driverGarnishmentsReducer.viewDetail);
  const saveGarnishmentObject = useSelector((state) => state.driverGarnishmentsReducer.saveGarnishmentObject);
  const isGeneralTabValid = useSelector((state) => state.driverGarnishmentsReducer.isGeneralTabValid);
  const isCheckTabValid = useSelector((state) => state.driverGarnishmentsReducer.isCheckTabValid);
  const garnishmentDataById = useSelector((state) => state.driverGarnishmentsReducer.garnishmentDataById);
  const zipPostLenght = useSelector((state) => state.driverGarnishmentsReducer.zipPostLenght);
  const description = useSelector((state) => state.driverGarnishmentsReducer.description);
  const { id, driverGarnishmentPK } = useParams();
  const dispatch = useDispatch();
  const [disableSave, setDisableSave] = useState(true);
  const navigate = useNavigate();
  const [activeShow, setActiveShow] = useState(false);
  const [active, setActive] = useState(true);
  const [cancelShow, setCancelShow] = useState(false);
  const loading = useSelector((state) => state.driverGarnishmentsReducer.loading);
  useEffect(() => {
    if (garnishmentDataById != null && garnishmentDataById.active != null) {
      setActive(garnishmentDataById.active);
    }
  }, [garnishmentDataById]);

  const saveLoading = useSelector((state) => state.driverGarnishmentsReducer.saveLoading);

  useEffect(() => {
    if (isGeneralTabValid && isCheckTabValid) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [isGeneralTabValid, isCheckTabValid]);

  const updateCompany = (e) => {
    dispatch(setSaveLoading(true));
    DriverGarnishmentsService.saveGarnishment(saveGarnishmentObject)
      .then((response) => {
        navigate(`/driver-garnishment/${id}`);
        if (driverGarnishmentPK) {
          toast.success("Driver Garnishment Updated");
        } else {
          toast.success("Driver Garnishment Created");
        }
        dispatch(setCurrentTab("general"));
      })
      .catch((error) => {
        toast.error("Error while updating Driver Garnishment");
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setSaveLoading(false));
        dispatch(setDescription(""));
      });
  };

  //for activating and deactivating
  const activateUsers = () => {
    setActiveShow(false);
    dispatch(setLoading(true));
    DriverGarnishmentsService.activateGarnishment(driverGarnishmentPK)
      .then((response) => {
        if (response.data) {
          setActive(true);
          toast.success("Driver Garnishment Activated");
        } else {
          toast.error("something went wrong");
        }
      })
      .catch((error) => {})
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const deactivateUsers = () => {
    setActiveShow(false);
    dispatch(setLoading(true));
    DriverGarnishmentsService.deactivateGarnishment(driverGarnishmentPK)
      .then((response) => {
        if (response.data) {
          setActive(false);
          toast.success("Driver Garnishment Deactivated");
        } else {
          toast.error("something went wrong");
        }
      })
      .catch((eroor) => {})
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  const handleActiveClose = () => setActiveShow(false);
  const handleActiveShow = () => setActiveShow(true);

  const handleActiveSave = (e) => {
    e.preventDefault();

    if (active) {
      deactivateUsers();
    } else {
      activateUsers();
      setActive(true);
    }
  };

  //cancel
  const handleCancelShow = () => {
    if (viewDetail === false || driverGarnishmentPK === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate(`/driver-garnishment/${id}`);
      dispatch(setCheckPayzipPostLenght(zipPostLenght));
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (driverGarnishmentPK) {
      dispatch(setDuplicateDescription(false));
      setCancelShow(false);
      dispatch(setViewDetail(true));
      toast.success("Changes Cancelled");
      dispatch(setOnCancel(true));
      dispatch(toggleChangesCancelled());
    } else {
      navigate(`/driver-garnishment/${id}`);
      dispatch(setViewDetail(false));
      dispatch(setOnCancel(true));
      toast.success("Changes Cancelled");
    }
    dispatch(setDescription(""));
  };

  const validateAndSave = () => {
    DriverGarnishmentsService.checkDuplicateDescription(description, id, driverGarnishmentPK)
      .then((response) => {
        if (response.data) {
          setDisableSave(response.data);
        } else {
          updateCompany();
        }
      })
      .catch((err) => {
        setDisableSave(true);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {(saveLoading || loading) && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5  m-b-5`}
          type="button"
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={() => {
            dispatch(setLoading(true));
            validateAndSave();
          }}
        >
          Save
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5  m-b-5`}
          type="button"
          hidden={!viewDetail}
          onClick={handleActiveShow}
          style={active ? { backgroundColor: "" } : { backgroundColor: "red" }}
        >
          Active
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5  m-b-5`}
          label={t("edit.SpecialCodes.page.resources.tab.cancel")}
          type="button"
          onClick={handleCancelShow}
        >
          Cancel
        </button>
        <button
          route={""}
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5  m-b-5`}

          hidden={!driverGarnishmentPK || viewDetail === false}
          onClick={() => dispatch(setViewDetail(false))}
        >
          Edit
        </button>

        {/* cancel model for save*/}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Driver Garnishment Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        <ModalComponent
          show={activeShow}
          onHide={handleActiveClose}
          title={active ? "Deactivate Driver Garnishment" : "Activate Driver Garnishment"}
          body={
            active
              ? " Please confirm you want to Deactivate this Driver Garnishment"
              : " Please confirm you want to Activate this Driver Garnishment"
          }
          handleYES={handleActiveSave}
          handleNO={handleActiveClose}
        />
      </div>
    </div>
  );
};

export default FormFooter;
