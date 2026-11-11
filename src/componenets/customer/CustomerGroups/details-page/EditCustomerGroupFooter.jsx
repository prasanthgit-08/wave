import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetNormalSort,
  setChangesInCustomerSelection,
  setCustomerPageNumber,
  setInitialListFetched,
  setReverseFlag,
  setSaveFlag,
} from "../../../../redux/CustomerGroupsSlice";
import CustomerGroupService from "../../../../services/CustomerGroupService";
import { toast } from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
const EditCustomerGroupFooter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showCancel, setshowCancel] = useState(false);
  const initialList = useSelector((state) => state.customerGroups.initialList);
  const reverseFlag = useSelector((state) => state.customerGroups.reverseFlag);
  const deleteList = useSelector((state) => state.customerGroups.deleteList);
  const saveList = useSelector((state) => state.customerGroups.saveList);
  const exceptList = useSelector((state) => state.customerGroups.exceptList);
  const pageNumber = useSelector((state) => state.customerGroups.pageNumber);
  const saveFlag = useSelector((state) => state.customerGroups.saveFlag);

  const onCancel = () => {
    setshowCancel(true);
  };
  const handleCancelNo = () => {
    setshowCancel(false);
  };
  const handleCancelYes = () => {
    dispatch(setInitialListFetched(false));
    dispatch(resetNormalSort());
    dispatch(setReverseFlag(false));
    dispatch(setCustomerPageNumber(0));
    dispatch(setChangesInCustomerSelection(false));
    toast.success("Changes Cancelled");
    navigate("/customer-groups/" + id + "/" + pageNumber);
  };
  /**
   * Used  Save Assigned Customers in to Customer
   * Group Members table for the selected CustomerGroupFK
   */
  const onSave = () => {
    dispatch(setSaveFlag(true));
    CustomerGroupService.saveCustomers(id, initialList, deleteList, saveList, exceptList, reverseFlag)
      .then(() => {
        // dispatch(setSaveFlag(false));
        dispatch(setInitialListFetched(false));
        dispatch(resetNormalSort());
        dispatch(setCustomerPageNumber(0));
        toast.success("Customer Saved");
        dispatch(setChangesInCustomerSelection(false));
        navigate("/customer-groups/" + id + "/" + pageNumber);
      })
      .catch((err) => console.error(err))
      .finally(() => dispatch(setSaveFlag(false)));
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
        {/* Cancel Confirmatio Modal */}
        <ModalComponent
          show={showCancel}
          onHide={handleCancelNo}
          title={"Cancel Customer Selection"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
      {saveFlag && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCustomerGroupFooter;
