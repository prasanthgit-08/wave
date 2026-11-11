import { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import TextArea from "../../../../../components/common/textArea";
import { useFormContext } from "react-hook-form";
import { setOrderEntrySchemaConditions } from "../../../../../store/slices/unit.slice";
import { useDispatch, useSelector } from "react-redux";
const Notes = ({ styles }) => {
  const dispatch = useDispatch();
  const { watch, setValue, trigger, getValues, control } = useFormContext();

  const notes = getValues("notes");

  useEffect(() => {
    dispatch(setOrderEntrySchemaConditions({ notes: { ...notes } }));
  }, [notes]);

  return (
    <div className={`px-4 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight} border-bottom `}>
      <Col xs={12}>
        <div>
          <Form.Group className="mt-3 form-group row ms-2">
            <Col xs={12} className="p-0 mt-3 ml-5" style={{ marginLeft: "300px" }}>
              <Form.Label className={` customColFormLabel`}>Unit Notes</Form.Label>
            </Col>

            <Col xs={13} className="p-0 mt-1" style={{ marginLeft: "300px" }}>
              <TextArea
                name="notes.unitNotes"
                control={control}
                rows={16}
                cols={120}
                type="text"
                className="form-control h-300px textarea-responsive"
                width="1000px"
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 form-group row ms-2">
            <Col xs={12} className="p-0 mt-3" style={{ marginLeft: "300px" }}>
              <Form.Label className={` customColFormLabel`}>Dispatch Notes</Form.Label>
            </Col>
            <Col xs={12} className="p-0 mt-1" style={{ marginLeft: "300px" }}>
              <TextArea
                name="notes.dispatchNotes"
                control={control}
                rows={16}
                cols={90}
                type="text"
                className="form-control h-300px textarea-responsive"
                width="1000px"
              />
            </Col>
          </Form.Group>
        </div>{" "}
      </Col>
    </div>
  );
};

export default Notes;
