import { useDispatch, useSelector } from "react-redux";
import {
  setInvoiceHoldReason,
  setMissingPaperworkObject,
  setNotes,
  setUnitOnInvoiceHold,
} from "../../../../../redux/Invoicing/PaperworkProcessingSlice";
import { useEffect, useRef } from "react";

function Notes() {
  const unitOnInvoiceHold = useSelector((s) => s.paperworkProcessing.unitOnInvoiceHold);
  const selectedUnit = useSelector((s) => s.paperworkProcessing.selectedUnit);
  const invoiceHoldReason = useSelector((s) => s.paperworkProcessing.invoiceHoldReason);
  const notes = useSelector((s) => s.paperworkProcessing.notes);
  const releaseHoldPermission = useSelector((s) => s.paperworkProcessing.releaseHoldPermission);
  const missingPaperworkObject = useSelector((s) => s.paperworkProcessing.missingPaperworkObject);
  const dispatch = useDispatch();

  const userEditedRef = useRef(false);
  const isHoldNotesDisabled =
    !unitOnInvoiceHold || (!releaseHoldPermission && Boolean(selectedUnit?.unitOnInvoiceHold));
  const showHoldNotesValidation = !isHoldNotesDisabled;

  // Only apply border colors when the field is editable.
  // If disabled (no permission / not on hold), keep it normal.
  const holdNotesBorderClass = isHoldNotesDisabled
    ? ""
    : unitOnInvoiceHold
      ? !invoiceHoldReason?.trim()
        ? "borderRed"
        : "borderGreen"
      : "";

  useEffect(() => {
    userEditedRef.current = false;
  }, []);

  useEffect(() => {
    if (!selectedUnit || !selectedUnit.unitPK) return;
    if (userEditedRef.current) return;

    dispatch(setUnitOnInvoiceHold(Boolean(selectedUnit.unitOnInvoiceHold)));
    dispatch(setInvoiceHoldReason(selectedUnit.invoiceHoldReason || ""));
    dispatch(setNotes(selectedUnit.notes || ""));
  }, [selectedUnit, dispatch]);

  useEffect(() => {
    dispatch(
      setMissingPaperworkObject({
        ...missingPaperworkObject,
        notes,
        unitOnInvoiceHold,
        invoiceHoldReason,
      })
    );
  }, [notes, unitOnInvoiceHold, invoiceHoldReason]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="p-0">
      <div className="d-flex ps-4 mb-2 mt-3 col-12">
        <div className="" style={{ width: "157px" }}>
          Unit Notes
        </div>
        <div className="col-10 me-3">
          <textarea
            className="textColor-fromcontrol w-100 h-100"
            value={notes || ""}
            cols="30"
            rows="12"
            onChange={(e) => {
              userEditedRef.current = true;
              dispatch(setNotes(e.target.value));
            }}
          />
        </div>
      </div>

      <div className="d-flex ps-4 mb-2 mt-4 col-6">
        <div className="col-3">Invoice Hold</div>
        <div className="col-10 me-3">
          <input
            type="checkbox"
            checked={Boolean(unitOnInvoiceHold)}
            disabled={!releaseHoldPermission && Boolean(selectedUnit?.unitOnInvoiceHold)}
            onChange={(e) => {
              userEditedRef.current = true;
              const checked = e.target.checked;
              dispatch(setUnitOnInvoiceHold(checked));

              if (!checked) {
                dispatch(setInvoiceHoldReason(""));
              }
            }}
          />
        </div>
      </div>

      <div className="d-flex ps-4 mb-2 mt-4 col-12">
        <div className="" style={{ width: "157px" }}>
          Hold Notes
        </div>
        <div className="col-10 me-3">
          <textarea
            className={`textColor-fromcontrol w-100 h-100 ${holdNotesBorderClass}`}
            value={invoiceHoldReason || ""}
            disabled={isHoldNotesDisabled}
            cols="30"
            rows="12"
            onChange={(e) => {
              userEditedRef.current = true;
              dispatch(setInvoiceHoldReason(e.target.value));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Notes;
