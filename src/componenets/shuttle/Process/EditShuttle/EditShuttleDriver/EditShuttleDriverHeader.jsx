import React from "react";
import ButtonComponent from "../../../../common/Button";
import { t } from "i18next";
import { useDispatch } from "react-redux";
import {
  resetDriver,
  setDriverData,
  setDriverId,
  setDriverNameInput,
  setFromDate,
  setToDate,
} from "../../../../../redux/EditShuttleSlice";
import toast from "react-hot-toast";

function EditShuttleDriverHeader() {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-bottom border-dark border-2">
        {/* Close Button */}
        <ButtonComponent
          route={"/" || ""}
          className={"btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"}
          label={t("close.button")}
          onClick={() => {
            dispatch(resetDriver());
            toast.success("Page Closed");
          }}
        />
      </div>
    </div>
  );
}

export default EditShuttleDriverHeader;
