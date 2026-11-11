import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DriverAddNotesService from "../../../../../../../../services/DriverAddNotesService";
import {
  resetChanges,
  setCurrentTab,
  setLoading,
  setDriverAddNotes,
} from "../../../../../../../../redux/DriverAddNotesSlice";

function DriverAddNotesFooter() {
  const driverAddNotesData = useSelector((state) => state.driverAddNotesReducer.driverAddNotesData);
  const disableSave = useSelector((state) => state.driverAddNotesReducer.disableSave);
  const { driverId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const driverServicesNotes = useSelector((state) => state.driverAddNotesReducer.driverServicesNotes);
  const dispatchNotes = useSelector((state) => state.driverAddNotesReducer.dispatchNotes);

  const handleSave = () => {
    dispatch(setLoading(true));
    DriverAddNotesService.saveDriverAddNotes(driverAddNotesData)
      .then((response) => {
        dispatch(
          setDriverAddNotes({
            ...driverServicesNotes,
            dispatchNotes,
          })
        );

        dispatch(setCurrentTab("notes"));
        toast.success("Add Notes Created");
        dispatch(resetChanges());
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          disabled={!driverServicesNotes && !dispatchNotes}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
export default DriverAddNotesFooter;
