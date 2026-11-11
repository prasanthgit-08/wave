import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetNormalSort,
  setChangesInUnitTypeSelection,
  setReverseFlag,
  setSaveFlag,
  setUnitTypePageNumber,
} from "../../../../redux/UnitTypeGroupSlice";
import { toast } from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import UnitTypeGroupsService from "../../../../services/UnitTypeGroupsService";
import { setIsLoading } from "../../../../redux/CustomerCreditCardSlice";
import LoadingIcon from "../../../common/LoadingIcon";
const EditUnitTypeFooter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCancel, setshowCancel] = useState(false);
  const [loading, setLoading] = useState(false);

  const reverseFlag = useSelector((state) => state.unitTypeGroupReducer.reverseFlag);
  const initialList = useSelector((state) => state.unitTypeGroupReducer.initialList);
  const saveList = useSelector((state) => state.unitTypeGroupReducer.saveList);
  const deleteList = useSelector((state) => state.unitTypeGroupReducer.deleteList);
  const exceptList = useSelector((state) => state.unitTypeGroupReducer.exceptList);
  const pageNumber = useSelector((state) => state.unitTypeGroupReducer.pageNumber);
  const radioValue = useSelector((state) => state.unitTypeGroupReducer.radioValue);
  const leftLoading = useSelector((state) => state.unitTypeGroupReducer.leftLoading);
  const rightLoading = useSelector((state) => state.unitTypeGroupReducer.rightLoading);
  const onCancel = () => {
    setshowCancel(true);
  };

  const handleCancelNo = () => {
    setshowCancel(false);
  };

  const handleCancelYes = () => {
    dispatch(resetNormalSort());
    dispatch(setReverseFlag(false));
    dispatch(setUnitTypePageNumber(0));
    dispatch(setChangesInUnitTypeSelection(false));
    toast.success("Changes Cancelled");
    navigate("/unit-type-groups/" + id + "/" + pageNumber);
  };

  const onSave = () => {
    dispatch(setSaveFlag(true));
    setLoading(true);
    UnitTypeGroupsService.saveUnitTypeMembers(
      id,
      initialList,
      deleteList,
      saveList,
      exceptList,
      reverseFlag,
      radioValue
    )
      .then(() => {
        dispatch(setSaveFlag(false));
        dispatch(resetNormalSort());
        dispatch(setUnitTypePageNumber(0));
        toast.success("Unit Type Saved");
        dispatch(setChangesInUnitTypeSelection(false));
        navigate("/unit-type-groups/" + id + "/" + pageNumber);
      })
      .catch((err) => {
        setLoading(false);
        navigate("/unit-type-groups/" + id + "/" + pageNumber);
        toast.error("Something went wrong");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
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
          disabled={leftLoading || rightLoading}
        >
          Save
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={onCancel}
          disabled={leftLoading || rightLoading}
        >
          Cancel
        </button>
        {/* Cancel Confirmation Modal */}
        <ModalComponent
          show={showCancel}
          onHide={handleCancelNo}
          title={"Cancel Unit Type Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {loading && <LoadingIcon />}
      </div>
    </div>
  );
};
export default EditUnitTypeFooter;
