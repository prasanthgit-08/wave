import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setEditedUnitDispatchDataToSaveForDispatchesTab } from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

function Notes({ styles }) {
  const dispatch = useDispatch();
  //Local States
  const [lateYardExitNote, setLateYardExitNote] = useState("");
  const [latePaperworkNote, setLatePaperworkNote] = useState("");
  const [dispatchNote, setDispatchNote] = useState("");
  const [missingPaperworkNote, setMissingPaperworkNote] = useState("");

  //States From Redux
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);

  //Populating selected unit details
  useEffect(() => {
    if (selectedUnitData != null) {
      setLateYardExitNote(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.lateYardExitNotes || "");
      setDispatchNote(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.notes || "");
      setLatePaperworkNote(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.latePaperworkNotes || ""
      );
      setMissingPaperworkNote(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.missingPaperworkNotes || ""
      );
    }
    // eslint-disable-next-line
  }, [selectedUnitData, viewDetail]);

  /*** Implementation Of Save - Setting edited unit data for save ***/
  const settingEditedUnitDataToSave = () => {
    dispatch(
      setEditedUnitDispatchDataToSaveForDispatchesTab({
        lateYardExitNotes: lateYardExitNote,
        notes: dispatchNote,
        latePaperworkNotes: latePaperworkNote,
        missingPaperworkNotes: missingPaperworkNote,
      })
    );
  };

  useEffect(() => {
    settingEditedUnitDataToSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lateYardExitNote, dispatchNote, latePaperworkNote, missingPaperworkNote]);

  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={6}>
          {/* Late Yard Exit Notes */}
          <Form.Group className="mt-3 align-items-center   m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel mb-1`}>Late Yard Exit Notes</Form.Label>
            </Col>
            <Col sm={12} md={12} className="p-0 ">
              <textarea
                rows={13}
                cols={24}
                //     className={`w-100`}
                className={`customFormControl h-100`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                name="lateYardExitNote"
                value={lateYardExitNote}
                disabled={
                  viewDetail || !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched
                }
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  setLateYardExitNote(value);
                }}
              />
            </Col>
          </Form.Group>

          {/* Dispatch Notes */}
          <Form.Group className="mt-3 align-items-center   m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel mb-1`}>Dispatch Notes</Form.Label>
            </Col>
            <Col sm={12} md={12} className="p-0 ">
              <textarea
                rows={13}
                cols={24}
                //     className={`w-100`}
                className={`customFormControl h-100`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                name="dispatchNote"
                value={dispatchNote}
                disabled={
                  viewDetail || !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched
                }
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  setDispatchNote(value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={6}>
          {/* Late Paperwork Notes */}
          <Form.Group className="mt-3 align-items-center   m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel mb-1`}>Late Paperwork Notes</Form.Label>
            </Col>
            <Col sm={12} md={12} className="p-0 ">
              <textarea
                rows={13}
                cols={24}
                className={`customFormControl h-100`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                name="latePaperworkNote"
                value={latePaperworkNote}
                disabled={
                  viewDetail ||
                  (!selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatched &&
                    !selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delivered)
                }
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  setLatePaperworkNote(value);
                }}
              />
            </Col>
          </Form.Group>

          {/* Missing Paperwork Notes */}
          <Form.Group className="mt-3 align-items-center   m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel mb-1`}>Missing Paperwork Notes</Form.Label>
            </Col>
            <Col sm={12} md={12} className="p-0 ">
              <textarea
                rows={13}
                cols={24}
                className={`customFormControl h-100`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                name="missingPaperworkNote"
                value={missingPaperworkNote}
                disabled={
                  viewDetail ||
                  (!selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatched &&
                    !selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delivered)
                }
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  setMissingPaperworkNote(value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default Notes;
