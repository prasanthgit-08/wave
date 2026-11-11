import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetChanges,
  resetNormalSort,
  setAssignedPageNo,
  setChangesInStatesSelection,
  setLeftPageNumber,
  setReverseFlag,
  setSaveFlag,
} from "../../../../redux/StateGroupsSlice";
import StateGroupsService from "../../../../services/StateGroupsService";
import ModalComponent from "../../../common/ModalComponent";

const EditStateGroupFooter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCancel, setshowCancel] = useState(false);
  const [load, setLoad] = useState(false);
  const reverseFlag = useSelector((state) => state.stateGroupReducer.reverseFlag);
  const initialList = useSelector((state) => state.stateGroupReducer.initialList);
  const saveList = useSelector((state) => state.stateGroupReducer.saveList);
  const deleteList = useSelector((state) => state.stateGroupReducer.deleteList);
  const exceptList = useSelector((state) => state.stateGroupReducer.exceptList);
  const pageNumber = useSelector((state) => state.stateGroupReducer.pageNumber);
  const onCancel = () => {
    setshowCancel(true);
  };

  const handleCancelNo = () => {
    setshowCancel(false);
  };

  const handleCancelYes = () => {
    dispatch(resetNormalSort());
    dispatch(setAssignedPageNo(0));
    dispatch(setReverseFlag(false));
    dispatch(setLeftPageNumber(0));
    dispatch(resetChanges());
    dispatch(setChangesInStatesSelection(false));
    toast.success("Changes Cancelled");
    navigate("/state-groups-edit/" + id + "/" + pageNumber);
  };
  const onSave = () => {
    dispatch(setSaveFlag(true));
    setLoad(true);
    StateGroupsService.saveMemberStates(id, initialList, deleteList, saveList, exceptList, reverseFlag).then(
      () => {
        setLoad(false);
        dispatch(setSaveFlag(false));
        dispatch(resetNormalSort());
        // dispatch(setAssignedPageNo(0));
        toast.success("States Saved");
        dispatch(setChangesInStatesSelection(false));
        navigate("/state-groups-edit/" + id + "/" + pageNumber);
      }
    );
  };
  useEffect(() => {
    dispatch(resetNormalSort());
  }, []);
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={onSave}
        >
          Save
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
        {/* Cancel Confirmation Modal */}
        <ModalComponent
          show={showCancel}
          onHide={handleCancelNo}
          title={"Cancel States Selection Screen"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {load && (
          <div className="fade modal-backdrop show">
            {" "}
            <div className="pos-center">
              {" "}
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditStateGroupFooter;
