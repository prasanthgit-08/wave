import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setInvoiceHoldOverrideValid,
  setInvoiceHoldReason,
  setInvoiceHoldTabValid,
  setRealseHoldStatus,
  setReleaseHoldPermission,
  setSelectedUnit,
  setUnitOnInvoiceHold,
  updateSelectedUnitsList,
} from "../../../../../redux/Invoicing/PaperworkProcessingSlice";
import OverrideCodeModalComponent from "../../../../common/OverrideCodeModalComponent";
import { PROGRAMS } from "../../../../../constants/permissionConstants";
import { usePermission } from "../../../../../hooks/usePermission";

const ACTION_BUTTON_CLASS = "btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5";

const InvoiceHold = () => {
  const dispatch = useDispatch();
  const { checkPermission, getPermissionKey } = usePermission();

  const unitOnInvoiceHold = useSelector((state) => state.paperworkProcessing.unitOnInvoiceHold);
  const releaseHoldPermission = useSelector((state) => state.paperworkProcessing.releaseHoldPermission);
  const selectedUnit = useSelector((state) => state.paperworkProcessing.selectedUnit);
  const selectedUnitsList = useSelector((state) => state.paperworkProcessing.selectedUnitsList);
  const invoiceHoldReason = useSelector((state) => state.paperworkProcessing.invoiceHoldReason);
  const selectedUnitsListIndex = useSelector((state) => state.paperworkProcessing.selectedUnitsListIndex);

  const invoiceHoldOverrideValid = useSelector((state) => state.paperworkProcessing.invoiceHoldOverrideValid);

  const [showOverrideModal, setShowOverrideModal] = useState(false);
  // Seeded from the store so an override survives leaving and returning to Unit View.
  const [validOverride, setValidOverride] = useState(Boolean(invoiceHoldOverrideValid));
  const prevValidOverride = useRef(validOverride);

  // Derived from the store on every render, so each effect/handler below reads
  // the same snapshot the JSX does.
  const isMultiUnit = selectedUnitsList?.length > 1;
  const allUnitsOffHold = selectedUnitsList?.every((unit) => unit.unitOnInvoiceHold === false);
  const activeUnitOffHold = isMultiUnit
    ? !selectedUnitsList?.[selectedUnitsListIndex]?.unitOnInvoiceHold
    : !unitOnInvoiceHold;

  useEffect(() => {
    dispatch(setReleaseHoldPermission(checkPermission(PROGRAMS.PAPERWORK_RELEASE_HOLD, "edit")));
  }, [unitOnInvoiceHold]);

  // Single-unit view only: mirror the selected unit's hold reason into the store.
  useEffect(() => {
    if (isMultiUnit) return;

    dispatch(
      setInvoiceHoldReason(selectedUnit?.unitOnInvoiceHold ? selectedUnit.invoiceHoldReason || "" : "")
    );
  }, [selectedUnit, selectedUnitsList]);

  // A successful override clears the hold on the active unit.
  useEffect(() => {
    dispatch(setInvoiceHoldOverrideValid(validOverride));

    // Only a fresh override (false -> true) releases the active unit. A restored override
    // was already applied to its own unit and must not be re-applied to the current one.
    const isNewOverride = validOverride && !prevValidOverride.current;
    prevValidOverride.current = validOverride;
    if (!isNewOverride) return;

    setShowOverrideModal(false);
    dispatch(
      updateSelectedUnitsList({
        index: selectedUnitsListIndex,
        payload: {
          unitOnInvoiceHold: false,
          unitOnInvoiceHoldUI: true,
          realseHoldStatus: false,
          overrideStatus: false,
        },
      })
    );
    dispatch(setSelectedUnit({ ...selectedUnit, unitOnInvoiceHoldUI: true, unitOnInvoiceHold: false }));
  }, [validOverride]);

  // Tab validity without the release-hold permission: only an override can satisfy it.
  useEffect(() => {
    if (releaseHoldPermission) return;

    dispatch(setInvoiceHoldTabValid(Boolean(validOverride && allUnitsOffHold)));
  }, [validOverride, selectedUnitsList]);

  // Tab validity with the release-hold permission: the holds themselves must be cleared.
  useEffect(() => {
    if (!releaseHoldPermission) return;

    dispatch(setInvoiceHoldTabValid(Boolean(isMultiUnit ? allUnitsOffHold : !unitOnInvoiceHold)));
  }, [unitOnInvoiceHold, selectedUnitsList]);

  const handleOverride = () => {
    setValidOverride(false);
    setShowOverrideModal(true);
  };

  const handleReleaseHold = () => {
    dispatch(
      updateSelectedUnitsList({
        index: selectedUnitsListIndex,
        payload: {
          unitOnInvoiceHold: false,
          unitOnInvoiceHoldUI: true,
        },
      })
    );
    dispatch(setSelectedUnit({ ...selectedUnit, unitOnInvoiceHold: false, unitOnInvoiceHoldUI: true }));

    // Intentionally reads the pre-dispatch list: true only when every unit was still on hold.
    if (selectedUnitsList?.every((unit) => unit.unitOnInvoiceHold === true)) {
      dispatch(setUnitOnInvoiceHold(false));
      dispatch(setRealseHoldStatus(false));
    }
  };

  const handleHideOverrideModal = () => {
    setShowOverrideModal(false);
    dispatch(setRealseHoldStatus(false));
  };

  return (
    <div className="p-2">
      <div className="col-12" style={{ height: "410px" }}>
        <textarea
          placeholder="Unit invoice hold notes if unit hold"
          className="w-100 h-100"
          id=""
          name=""
          cols="30"
          rows="10"
          value={invoiceHoldReason}
          disabled
        />
      </div>

      <div className="mt-3 d-flex justify-content-center">
        <button
          className={ACTION_BUTTON_CLASS}
          type="button"
          onClick={handleReleaseHold}
          disabled={!releaseHoldPermission || activeUnitOffHold}
        >
          Release Hold
        </button>
        <button
          className={ACTION_BUTTON_CLASS}
          type="button"
          onClick={handleOverride}
          // previously also gated on: selectedUnit?.unitOnInvoiceHoldUI ||
          disabled={releaseHoldPermission || activeUnitOffHold || (validOverride && allUnitsOffHold)}
        >
          Override
        </button>

        <OverrideCodeModalComponent
          permissionObjectKey={getPermissionKey("INV_OVERRIDE", "edit")}
          show={showOverrideModal}
          onHide={handleHideOverrideModal}
          open={() => setShowOverrideModal(true)}
          body="User does not have the permission to release hold. Do you want to Override with another user."
          className={""}
          handleYES={true}
          handleNO={true}
          permission={checkPermission("INV_OVERRIDE", "edit")}
          validOverride={validOverride}
          setValidOverride={setValidOverride}
          color={""}
        />
      </div>
    </div>
  );
};

export default InvoiceHold;
