import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../common/ModalComponent";
import DriverBondFundService from "../../../../services/DriverBondFundService";
import toast from "react-hot-toast";
import { setChangesCancelled } from "../../../../redux/DriverBondFundSlice";

const DriverBondFundFooter = () => {
  const { driverId, pageNumber } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [viewDetail, setviewDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const driverBondFund = useSelector((state) => state.driverBondFundReducer.driverBondFund);
  const disableSave = useSelector((state) => state.driverBondFundReducer.disableSave);
  /****Save Bond Fund ***/
  const handleSave = () => {
    setLoading(true);
    DriverBondFundService.saveDriverBondFundRecord(driverBondFund)
      .then((response) => {
        dispatch(setChangesCancelled(true));
        navigate(`/bond-fund/${driverId}`);
        toast.success("Driver Bond Fund Created");
      })
      .catch((error) => {
        dispatch(setChangesCancelled(true));
        navigate(`/bond-fund/${driverId}`);
        toast.error("Failed to Create Driver Bond Fund");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancelShow = () => {
    if (viewDetail === true) {
      navigate(`/`);
      setCancelShow(false);
      toast.success("Changes Cancelled");
    } else {
      setCancelShow(true);
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    dispatch(setChangesCancelled(true));
    navigate(`/bond-fund/${driverId}`);
    setCancelShow(false);
    toast.success("Changes cancelled");
  };
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          disabled={disableSave}
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handleCancelShow}
        >
          Cancel
        </button>
        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Driver Bond Fund Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {loading && (
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

export default DriverBondFundFooter;
