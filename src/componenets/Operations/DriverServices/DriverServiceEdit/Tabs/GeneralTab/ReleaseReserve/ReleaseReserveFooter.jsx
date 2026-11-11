import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReleaseReserveService from "../../../../../../../services/ReleaseReserveService";

const ReleaseReserveFooter = () => {
  const { driverId, pageNumber } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const releaseReserveFormData = useSelector((state) => state.releaseReserve.releaseReserveFormData);
  const disableSave = useSelector((state) => state.releaseReserve.disableSave);

  /******Save API for Delay Unit Check Request****/
  const handleSave = () => {
    setLoading(true);
    ReleaseReserveService.releaseReserveSave(releaseReserveFormData)
      .then((response) => {
        navigate(`/driver-service-selection/${driverId}/form`);
        toast.success("Driver Release Reserved Refunded");
      })
      .catch((error) => {
        navigate(`/driver-service-selection/${driverId}/form`);
        toast.error("Failed to Release Driver Reserve Release");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        {loading && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type=""
          disabled={disableSave}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ReleaseReserveFooter;
