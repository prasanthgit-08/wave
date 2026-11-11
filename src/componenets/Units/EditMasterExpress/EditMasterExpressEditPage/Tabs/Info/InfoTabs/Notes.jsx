import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditedUnitDataToSaveForInfoTab,
  setIsInfoNotesTabValid,
  setInfoCancelledFlag,
} from "../../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

function Notes({ styles }) {
  const dispatch = useDispatch();
  //Local States
  const [unitsNotes, setUnitsNotes] = useState("");
  const [dispatchNotes, setDispatchNotes] = useState("");
  const [cancelled, setCancelled] = useState(false);
  const [cancelledReason, setCancelledReason] = useState("");
  const loggedInUserData = JSON.parse(localStorage.getItem("loggedInUserData"));

  //States From Redux
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const isUnitDataLoading = useSelector((state) => state.editMasterExpress.isUnitDataLoading);

  //Populating selected unit details
  useEffect(() => {
    if (selectedUnitData != null) {
      setUnitsNotes(selectedUnitData?.editMasterExpressInfoTabDTO?.notes || "");
      setDispatchNotes(selectedUnitData?.editMasterExpressInfoTabDTO?.dispatchNotes || "");
      setCancelled(selectedUnitData?.editMasterExpressInfoTabDTO?.canceled || false);
      dispatch(setInfoCancelledFlag(selectedUnitData?.editMasterExpressInfoTabDTO?.canceled || false));
      setCancelledReason(selectedUnitData?.editMasterExpressInfoTabDTO?.canceledReason || "");
    }
    // eslint-disable-next-line
  }, [selectedUnitData, viewDetail]);

  /*** Implementation Of Save - Setting edited unit data for save ***/

  const now = new Date();

  // Format timestamp as [MM/DD/YYYY hh:mm:ss AM/PM]
  const timestamp =
    "[" +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    now.getDate().toString().padStart(2, "0") +
    "/" +
    now.getFullYear() +
    " " +
    now.toLocaleTimeString("en-US") +
    "]";
  const settingEditedUnitDataToSave = () => {
    // timestamp format removed on the basis of Tom suggestion
    dispatch(
      setEditedUnitDataToSaveForInfoTab({
        notes: unitsNotes ? unitsNotes : "",

        dispatchNotes: dispatchNotes ? dispatchNotes : "",
        canceled: cancelled,
        canceledReason: cancelledReason ? cancelledReason : "",
      })
    );
  };

  useEffect(() => {
    settingEditedUnitDataToSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitsNotes, dispatchNotes, cancelled, cancelledReason]);

  //Info - Notes Tab Validation
  useEffect(() => {
    if (!cancelled || (cancelled && cancelledReason?.trim() !== "")) {
      dispatch(setIsInfoNotesTabValid(true));
    } else {
      dispatch(setIsInfoNotesTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cancelled, cancelledReason]);

  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={6}>
          {/* Unit Notes */}
          <Form.Group className="mt-2 align-items-center   m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel mb-1`}>Unit Notes</Form.Label>
            </Col>
            <Col xs={11} md={11} sm={11} className="p-0 ">
              <textarea
                rows={13}
                cols={22}
                className={`customFormControl h-100`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                name="unitsNotes"
                value={unitsNotes}
                disabled={viewDetail}
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  setUnitsNotes(value);
                }}
              />
            </Col>
          </Form.Group>

          {/* Canceled */}
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
              selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched ||
              !selectedUnitData?.editMasterExpressInfoTabDTO?.isUnitHasDispatchRecord
                ? ""
                : "hide-elements"
            }`}
          >
            <Col sm={1} md={1} xs={1} className="p-0">
              <Form.Label className={` customColFormLabel`}>Canceled</Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                disabled={viewDetail}
                value={cancelled}
                checked={cancelled}
                onChange={(e) => {
                  setCancelled(e.target.checked);
                  dispatch(setInfoCancelledFlag(e.target.checked));
                  if (!e.target.checked) {
                    setCancelledReason("");
                  }
                }}
              />
            </Col>
          </Form.Group>

          {/* Canceled Reason */}
          <Form.Group
            className={`mt-2 align-items-center   m-l-0 m-r-0 ms-0 ${
              selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched ||
              !selectedUnitData?.editMasterExpressInfoTabDTO?.isUnitHasDispatchRecord
                ? ""
                : "hide-elements"
            }`}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel mb-1`}>Canceled Reason</Form.Label>
            </Col>
            <Col xs={11} md={11} sm={11} className="p-0 ">
              <textarea
                rows={13}
                cols={22}
                className={`customFormControl h-100 ${
                  // className={`w-100 ${
                  isUnitDataLoading || viewDetail || !cancelled
                    ? ""
                    : cancelled && cancelledReason?.trim() !== ""
                      ? "borderGreen"
                      : "borderRed"
                }`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                name="cancelledReason"
                value={cancelledReason}
                disabled={viewDetail || !cancelled}
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  setCancelledReason(value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>

        <Col xs={6}>
          {/* Dispatch Notes */}
          <Form.Group className="mt-2 align-items-center   m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel mb-1`}>Dispatch Notes</Form.Label>
            </Col>
            <Col xs={11} md={11} sm={11} className="p-0 ">
              <textarea
                rows={13}
                cols={22}
                type="text"
                className={`customFormControl h-100`}
                autoComplete="off"
                aria-autocomplete="list"
                name="dispatchNotes"
                value={dispatchNotes}
                disabled={viewDetail}
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  setDispatchNotes(value);
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
