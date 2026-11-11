import React, { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import EditDriverService from "../../../../../../../services/EditDriverService";
import {} from "../../../../../../../redux/EditDriverFileSlice";

function EditDriverFileFooter() {
  const selectedDriverFormData = useSelector((state) => state.editDriverFileReducer.selectedDriverFormData);
  const enableSave = useSelector((state) => state.editDriverFileReducer.enableSave);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    EditDriverService.updateDriver(selectedDriverFormData)
      .then(() => {
        toast.success("Driver data updated.");
      })
      .catch((error) => {
        toast.error("Failed to update driver data.");
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
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="submit"
          disabled={!enableSave}
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

export default EditDriverFileFooter;
