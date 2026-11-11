import React, { useState } from "react";
import DriverDrugTestsService from "../../../../../../services/DriverDrugTestsService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  resetAddTestData,
  setDrugLoading,
  setOnCancel,
  setViewDetail,
} from "../../../../../../redux/DriverDrugTestsSlice";
import ModalComponent from "../../../../../common/ModalComponent";

const FormAddFooter = () => {
  const { driverId, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cancelShow, setCancelShow] = useState(false);

  const addTestData = useSelector((state) => state.driverDrugTests.addTestData);
  const viewDetail = useSelector((state) => state.driverDrugTests.viewDetail);
  const isSaveEnabled = useSelector((state) => state.driverDrugTests.isSaveEnabled);
  const handleSave = () => {
    dispatch(setDrugLoading(true));
    DriverDrugTestsService.saveDriverDrugTests(addTestData)
      .then((response) => {
        if (id) {
          toast.success("Driver Drug Test Updated");
        } else {
          toast.success("Driver Drug Test Created");
        }
        dispatch(setViewDetail(true));
        dispatch(resetAddTestData());
        navigate(`/driver-drugtests/${driverId}`);
      })
      .catch((error) => {
        dispatch(setViewDetail(true));
        dispatch(resetAddTestData());
        navigate(`/driver-drugtests/${driverId}`);
        toast.error("Something Went Wrong");
      })
      .finally(() => {
        dispatch(setDrugLoading(false));
      });
  };
  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate(`/driver-drugtests/${driverId}`);
      toast.success("Changes Canceled");
    }
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      dispatch(setViewDetail(false));
      setCancelShow(false);
      toast.success("Changes Cancelled");
      setTimeout(() => {
        dispatch(setOnCancel(true));
      }, 50);
    } else {
      dispatch(setViewDetail(false));
      navigate(`/driver-drugtests/${driverId}`);
      dispatch(resetAddTestData());
      toast.success("Changes Cancelled");
      setTimeout(() => {
        dispatch(setOnCancel(true));
      });
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={handleSave}
          disabled={!isSaveEnabled}
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

        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Driver Drug Test Changes "}
          body={"Please confirm you want to cancel changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
    </div>
  );
};

export default FormAddFooter;
