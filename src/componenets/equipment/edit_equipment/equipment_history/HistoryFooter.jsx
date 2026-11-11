import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setListingHistoryData,
  setPageNumber,
  setPageNumberHistory,
  setSortFlag,
  setSortValue,
  setViewDetail,
} from "../../../../redux/EquipmentsSlice";

// this file is for equipment history in future
function HistoryFooter() {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedId = useSelector((state) => state.equipmentReducer.selectedId);
  const pageNumber = useSelector((state) => state.equipmentReducer.pageNumberHistory);

  const handleCancel = () => {
    dispatch(setListingHistoryData([]));
    dispatch(setViewDetail(true));
    dispatch(setSortValue(""));
    dispatch(setSortFlag(false));
    dispatch(setPageNumberHistory(0));

    navigate(`/equipment-maintenance-edit/${id}/${pageNumber}`);
    toast.success("Changes Cancelled");
  };

  return (
    <div
      className="pt-1 d-flex align-items-center justify-content-end  p-b-6 flex-wrap "
      style={{ margin: "1px" }}
    >
      <div className="d-flex align-items-center flex-wrap ">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-6"
          type="button"
          hidden={false}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default HistoryFooter;
