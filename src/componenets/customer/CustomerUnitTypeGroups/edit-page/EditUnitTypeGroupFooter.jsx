import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetNormalSort,
  resetStates,
  setAssignedPageNumber,
  setChangesInSelection,
  setLeftPageNumber,
  setPageNumberUT,
  setReverseFlag,
  setSaveFlag,
} from "../../../../redux/CustomerUnitTypeGroupSlice";
import CustomerUnitTypeGroupsService from "../../../../services/CustomerUnitTypeGroupsService";
import ModalComponent from "../../../common/ModalComponent";

const EditUnitTypeGroupFooter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCancel, setshowCancel] = useState(false);
  const [loading, setLoading] = useState(false);
  const reverseFlag = useSelector((state) => state.customerUnitTypeGroupReducer.reverseFlag);
  const initialList = useSelector((state) => state.customerUnitTypeGroupReducer.initialList);
  const saveList = useSelector((state) => state.customerUnitTypeGroupReducer.saveList);
  const deleteList = useSelector((state) => state.customerUnitTypeGroupReducer.deleteList);
  const exceptList = useSelector((state) => state.customerUnitTypeGroupReducer.exceptList);
  const pageNumber = useSelector((state) => state.customerUnitTypeGroupReducer.pageNumber);
  const radioValue = useSelector((state) => state.customerUnitTypeGroupReducer.radioValue);
  const onCancel = () => {
    setshowCancel(true);
  };

  const handleCancelNo = () => {
    setshowCancel(false);
  };

  const handleCancelYes = () => {
    dispatch(resetNormalSort());
    dispatch(setAssignedPageNumber(0));
    dispatch(setReverseFlag(false));
    dispatch(setLeftPageNumber(0));
    dispatch(setPageNumberUT(0));
    dispatch(resetStates());
    dispatch(setChangesInSelection(false));
    toast.success("Changes Cancelled");
    navigate("/customer-unit-type-groups-add/" + id + "/" + pageNumber);
  };
  const onSave = () => {
    setLoading(true);
    dispatch(setSaveFlag(true));
    CustomerUnitTypeGroupsService.saveMemberGroups(
      id,
      initialList,
      deleteList,
      saveList,
      exceptList,
      reverseFlag,
      radioValue
    )
      .then(() => {
        setLoading(false);
        dispatch(setSaveFlag(false));
        dispatch(resetNormalSort());
        dispatch(setPageNumberUT(0));
        navigate("/customer-unit-type-groups-add/" + id + "/" + pageNumber);
        dispatch(setAssignedPageNumber(0));
        toast.success("Unit Type Groups Saved");
        dispatch(setChangesInSelection(false));
      })
      .catch((err) => {
        setLoading(false);
        navigate("/customer-unit-type-groups-add/" + id + "/" + pageNumber);
        toast.error("Something went wrong");
        console.log(err);
      });
  };

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
          title={"Cancel Unit Type Group Selection "}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {loading && (
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

export default EditUnitTypeGroupFooter;
