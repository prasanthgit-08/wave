import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form } from "react-bootstrap";
import { setNotes, setDispatchNotesRedux } from "../../../../../redux/OrderEntryFilterSlice";

function Notes({ styles }) {
  const dispatch = useDispatch();

  const [unitNotes, setUnitNotes] = useState("");
  const [dispatchNotes, setDispatchNotes] = useState("");
  const currentDate = new Date().toLocaleString();
  const dataResetFlag = useSelector((state) => state.orderEntryReducer.dataReset);
  const selectedCustomerId = useSelector((state) => state.orderEntryReducer.selectedCustomerId);

  useEffect(() => {
    dispatch(setNotes(unitNotes));
  }, [unitNotes]);

  useEffect(() => {
    dispatch(setDispatchNotesRedux(dispatchNotes));
  }, [dispatchNotes]);

  useEffect(() => {
    setUnitNotes("");
    setDispatchNotes("");
  }, [selectedCustomerId, dataResetFlag]);

  return (
    <div className={`p-2 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight}`}>
      <div className="col-8 m-auto">
        <Col lg={12} sm={12} md={12} xs={12}>
          <Form.Group className="mt-3 form-group row ms-2">
            <Col sm={12} xs={12} className="p-0 mt-3">
              <Form.Label className={` customColFormLabel`}>Unit Notes</Form.Label>
            </Col>
            <Col lg={12} xs={12} md={12} sm={12} className="p-0 mt-1">
              <textarea
                rows={10}
                cols={70}
                type="text"
                className="form-control h-300px "
                id="unitNotes"
                name="unitNotes"
                value={unitNotes}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setUnitNotes(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 form-group row ms-2">
            <Col sm={12} xs={12} className="p-0 mt-3">
              <Form.Label className={` customColFormLabel`}>Dispatch Notes</Form.Label>
            </Col>
            <Col lg={12} xs={12} md={12} sm={12} className="p-0 mt-1">
              <textarea
                rows={10}
                cols={70}
                type="text"
                className="form-control h-300px "
                id="dispatchNotes"
                name="dispatchNotes"
                value={dispatchNotes}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setDispatchNotes(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </div>
    </div>
  );
}

export default Notes;
