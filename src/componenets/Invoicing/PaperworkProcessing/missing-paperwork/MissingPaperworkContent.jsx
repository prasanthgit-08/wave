import { Tab, Tabs } from "react-bootstrap";
import UnitInformation from "../missing-paperwork/tabs/UnitInformation";
import Notes from "../missing-paperwork/tabs/Notes";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  restoreInvoiceHoldSnapshot,
  setEmailText,
  setInvoiceHoldReason,
  setUnitOnInvoiceHold,
} from "../../../../redux/Invoicing/PaperworkProcessingSlice";

function MissingPaperworkContent() {
  const dispatch = useDispatch();
  const emailText = useSelector((state) => state.paperworkProcessing.emailText);
  const unitOnInvoiceHold = useSelector((state) => state.paperworkProcessing.unitOnInvoiceHold);
  const invoiceHoldReason = useSelector((state) => state.paperworkProcessing.invoiceHoldReason);
  const notes = useSelector((state) => state.paperworkProcessing.notes);
  const missingPaperworkObject = useSelector((state) => state.paperworkProcessing.missingPaperworkObject);
  const releaseHoldPermission = useSelector((state) => state.paperworkProcessing.releaseHoldPermission);
  const selectedUnit = useSelector((state) => state.paperworkProcessing.selectedUnit);

  // Same disabled rule as in Notes.js so the tab color matches the textarea behavior.
  const isHoldNotesDisabled =
    !unitOnInvoiceHold || (!releaseHoldPermission && Boolean(selectedUnit?.unitOnInvoiceHold));

  // If disabled (no permission / not on hold), no color. Otherwise red/green based on reason.
  const notesTabClass = isHoldNotesDisabled
    ? ""
    : unitOnInvoiceHold
      ? !invoiceHoldReason?.trim()
        ? "color-red"
        : "color-green"
      : "";

  // Restore state when component mounts
  useEffect(() => {
    if (missingPaperworkObject) {
      if (missingPaperworkObject.emailText !== undefined) {
        dispatch(setEmailText(missingPaperworkObject.emailText || ""));
      }
      if (missingPaperworkObject.notes !== undefined) {
        // Notes are handled in the Notes component
      }
      if (missingPaperworkObject.unitOnInvoiceHold !== undefined) {
        dispatch(setUnitOnInvoiceHold(missingPaperworkObject.unitOnInvoiceHold || false));
      }
      if (missingPaperworkObject.invoiceHoldReason !== undefined) {
        dispatch(setInvoiceHoldReason(missingPaperworkObject.invoiceHoldReason || ""));
      }
    }
  }, []);

  // Leaving without saving (e.g. browser back) keeps the Unit View invoice hold as it was.
  // No-op when Back/Cancel already restored it or Save cleared it.
  useEffect(() => {
    return () => {
      dispatch(restoreInvoiceHoldSnapshot());
    };
  }, []);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border halfScreenFormContentHeight">
        <Tabs defaultActiveKey="unitInformation" className="m-b-2" unmountOnExit={false}>
          <Tab
            eventKey="unitInformation"
            title={"Unit Information"}
            tabClassName={!emailText ? "color-red" : "color-green"}
          >
            <UnitInformation />
          </Tab>

          <Tab eventKey="notes" title={"Notes"} tabClassName={notesTabClass}>
            <Notes />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default MissingPaperworkContent;
