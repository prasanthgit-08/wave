import React from "react";
import ButtonComponent from "../../../../common/Button";
import { t } from "i18next";
import { useDispatch } from "react-redux";
import {
  setEditUnitData,
  setShuttleSave,
  setUnitNumberInput,
  setUnitNumberLast5,
  setUnitNumberPK,
} from "../../../../../redux/EditYardUnitSlice";
import toast from "react-hot-toast";

function EditYardUnitSelectionHeader() {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        {/* Close Button */}
        <ButtonComponent
          route={"/" || ""}
          className={"btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"}
          label={t("close.button")}
          onClick={() => {
            dispatch(setUnitNumberPK(null));
            dispatch(setUnitNumberInput(""));
            dispatch(setUnitNumberLast5(""));
            dispatch(setEditUnitData(null));
            dispatch(setShuttleSave(false));
            toast.success("Page Closed");
          }}
        />
      </div>

      <div className="col-xs-6"></div>
    </div>
  );
}

export default EditYardUnitSelectionHeader;
