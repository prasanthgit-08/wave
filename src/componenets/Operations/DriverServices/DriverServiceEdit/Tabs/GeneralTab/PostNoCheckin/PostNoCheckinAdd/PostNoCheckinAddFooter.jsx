import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ModalComponent from "../../../../../../../common/ModalComponent";
import {
  resetUnitDetails,
  setDispatchPK,
  setMissedDates,
  setPageNumberAdd,
  setSaveData,
} from "../../../../../../../../redux/PostNoCheckinSlice";

function PostNoCheckinAddFooter({ saveButton, saveHandler, cancelButton }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.postNoCheckinReducer.loader);
  const [cancelShow, setCancelShow] = useState(false);
  const saveDisable = useSelector((state) => state.postNoCheckinReducer.saveDisable);
  const dispatchPK = useSelector((state) => state.postNoCheckinReducer.dispatchPK);

  const navigate = useNavigate();

  /**
   * Cancel Handler
   **/

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    navigate(`/postNoCheckinHistory/${id}`);
    if (dispatchPK) {
      setCancelShow(false);
      dispatch(setDispatchPK(null));
      dispatch(setSaveData(null));
      dispatch(resetUnitDetails());
      toast.success("Changes Cancelled");
    } else {
      dispatch(setDispatchPK(null));
      dispatch(setSaveData(null));
      dispatch(resetUnitDetails());
      toast.success("Changes Cancelled");
    }
    dispatch(setPageNumberAdd(0));
  };
  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        {saveButton && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"

            onClick={saveHandler}
            disabled={saveDisable}
          >
            Save
          </button>
        )}
        {cancelButton && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"

            onClick={() => {
              if (dispatchPK) {
                setCancelShow(true);
              } else {
                setCancelShow(false);
                dispatch(setDispatchPK(null));
                dispatch(setPageNumberAdd(0));
                dispatch(setSaveData(null));
                dispatch(resetUnitDetails());
                navigate(`/postNoCheckinHistory/${id}`);
                toast.success("Changes Cancelled");
              }
            }}
          >
            Cancel
          </button>
        )}

        {/* Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Post No Checkin  Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
    </div>
  );
}

export default PostNoCheckinAddFooter;
