import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUnitBrowseList } from "../../redux/UnitActivationSlice";
import LoadingIcon from "../common/LoadingIcon";

function UnitActivationFooter({
  cancelButton,
  cancelHandler,
  saveButton,
  saveHandler,
  continueButton,
  continueHandler,
  continueDisable,
  activationDelay,
}) {
  const { saveDisable, loader, unitIndex, unitBrowseList } = useSelector(
    (state) => state.unitActivationReducer
  );
  const dispatch = useDispatch();
  return (
    <div>
      {loader && <LoadingIcon />}
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        {activationDelay && (
          <div className="d-flex justify-content-between flex-wrap w-90">
            <textarea
              className={`customFormControl align-items-left customFocusClass w-90 d-block ${
                unitBrowseList && !unitBrowseList[unitIndex]?.delayDispatch
                  ? ""
                  : unitBrowseList && unitBrowseList[unitIndex]?.delayDispatch
                    ? unitBrowseList[unitIndex]?.delayDispatchReason === "" ||
                      unitBrowseList[unitIndex]?.delayDispatchReason === null
                      ? "borderRed"
                      : "borderGreen"
                    : ""
              }`}
              style={{ height: "30px" }}
              type="text"
              id="delayDispatchReason"
              name="delayDispatchReason"
              maxLength={65535}
              value={unitBrowseList[unitIndex]?.delayDispatchReason}
              onChange={(e) => {
                dispatch(
                  updateUnitBrowseList({
                    key: "delayDispatchReason",
                    index: unitIndex,
                    value: e.target.value,
                  })
                );
              }}
              autoComplete="off"
              aria-autocomplete="list"
              disabled={!unitBrowseList[unitIndex]?.delayDispatch}
            />
            {saveButton && (
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                onClick={saveHandler}
                disabled={saveDisable}
              >
                Save
              </button>
            )}
          </div>
        )}

        {!activationDelay && saveButton && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={saveHandler}
            disabled={saveDisable}
          >
            Save
          </button>
        )}

        {continueButton && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            disabled={continueDisable}
            onClick={continueHandler}
          >
            Continue
          </button>
        )}

        {cancelButton && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={cancelHandler}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default UnitActivationFooter;
