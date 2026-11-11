import React from "react";
import DealerGroupService from "../../../../services/DealerGroupService";
import ModalComponent from "../../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  setSaving,
  setSaveList,
  resetArrays,
  setinitialList,
  setDeleteList,
  resetDealerSelectionSearch,
} from "../../../../redux/EditDealerGroupslice";

const DealerDeatilsEditFooter = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showCancel, setshowCancel] = useState(false);

  const initialList = useSelector((state) => state.editDealerGroupReducer.initialList);
  const saveList = useSelector((state) => state.editDealerGroupReducer.saveList);
  const deleteList = useSelector((state) => state.editDealerGroupReducer.deleteList);
  const searchList = useSelector((state) => state.editDealerGroupReducer.searchList);
  const exceptList = useSelector((state) => state.editDealerGroupReducer.exceptList);
  const changesInDealerSelection = useSelector(
    (state) => state.editDealerGroupReducer.changesInDealerSelection
  );

  const reverseIsActive = useSelector((state) => state.editDealerGroupReducer.reverseIsActive);

  const id = params.dealerGroupPK;
  const pageNumber = params.pageNumber;

  const onCancel = () => {
    setshowCancel(true);
  };

  const handleCancelNo = () => {
    setshowCancel(false);
  };

  const handleCancelYes = () => {
    navigate("/add-dealer-group/" + id + "/" + pageNumber);
    dispatch(setSaveList());
    dispatch(setDeleteList());
    dispatch(resetDealerSelectionSearch());
  };

  const onSave = () => {
    dispatch(setSaving(true));
    if (reverseIsActive) {
      dispatch(setinitialList([]));
    }
    DealerGroupService.saveDealers(id, initialList, deleteList, saveList, searchList, exceptList).then(() => {
      navigate("/add-dealer-group/" + id + "/" + pageNumber);
      dispatch(setSaveList());
      dispatch(resetArrays());
      setTimeout(() => {
        dispatch(setSaving(false));
      }, 20);
    });
  };
  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={onSave}
          disabled={!changesInDealerSelection}
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
      </div>
      <ModalComponent
        show={showCancel}
        onHide={handleCancelNo}
        title={"Cancel Dealer Selection Screen"}
        body={"Please confirm you want to cancel your changes"}
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />
    </div>
  );
};

export default DealerDeatilsEditFooter;
