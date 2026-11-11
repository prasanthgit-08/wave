import React from "react";
import { useDispatch } from "react-redux";
import { setShowEditMasterExpressShuttle } from "../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

const FormHeader = ({ onHide }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        {/* Close */}
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={() => {
            onHide();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FormHeader;
