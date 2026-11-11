import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "react-bootstrap";
import DriverDeleaseRequestsService from "../../../../../../../services/DriverDeleaseRequestsService";
function DriverDeleaseRequestsFooter() {
  const driverDeleaseRequests = useSelector(
    (state) => state.driverDeleaseRequestsReducer.driverDeleaseRequests
  );
  const disableSave = useSelector((state) => state.driverDeleaseRequestsReducer.disableSave);
  const { driverId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  /**Create a driver delease request */
  const handleSave = () => {
    setLoading(true);
    DriverDeleaseRequestsService.saveDriverDelease(driverDeleaseRequests)
      .then((response) => {
        navigate(`/driver-service-selection/${driverId}/form`);
        toast.success("Driver Delease Request Created");
      })
      .catch((error) => {
        navigate(`/driver-service-selection/${driverId}/form`);
        toast.error("Failed to Create Driver Delease Request");
      })
      .finally(() => {
        setLoading(false);
      });
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
}
export default DriverDeleaseRequestsFooter;
