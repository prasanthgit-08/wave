import { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import TextArea from "../../../../../components/common/textArea";
import { useFormContext } from "react-hook-form";
import { setOrderEntrySchemaConditions } from "../../../../../store/slices/unit.slice";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "../../../../../components/common/checkbox";
import useDebouncer from "../../../../../hooks/useDebouncer";
import { useWatch } from "react-hook-form";
const InvoiceHold = ({ styles }) => {
  const dispatch = useDispatch();
  const {
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useFormContext();
  const customerDataId = useWatch({ name: "customer.customerDataId" });

  //Debounce function
  const debounceUpdate = useDebouncer(() => {
    const invoiceHolds = getValues("invoiceHolds");

    dispatch(
      setOrderEntrySchemaConditions({
        invoiceHolds: { ...invoiceHolds },
      })
    );
  }, 100);
  //Updating invoiceHolds fields dynamically
  const updateInvoiceHoldFields = (fields) => {
    Object.entries(fields).forEach(([key, value]) => {
      setValue(`invoiceHolds.${key}`, value);
    });

    debounceUpdate();
  };
  const invoiceHolds = useWatch({ name: "invoiceHolds" });

  useEffect(() => {
    if (!customerDataId) return;
    updateInvoiceHoldFields({ invoiceHold: false, invoiceHoldNotes: "" });
  }, [customerDataId]);
  return (
    <div className={`px-4 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight} border-bottom `}>
      <Col xs={12}>
        <div>
          <Form.Group className="mt-3 form-group row align-items-center ms-2">
            <Col xs={1} className="p-0" style={{ marginLeft: "300px" }}>
              {" "}
              <Form.Label className={`customColFormLabel mb-0`}>Invoice Hold</Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <Checkbox
                name="invoiceHolds.invoiceHold"
                control={control}
                onChange={(value) => {
                  updateInvoiceHoldFields({ invoiceHold: value });

                  if (!value) {
                    updateInvoiceHoldFields({ invoiceHoldNotes: "" });
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 form-group row align-items ms-2">
            <Col xs={1} className="p-0" style={{ marginLeft: "300px" }}>
              <Form.Label className="customColFormLabel mb-0">Invoice Hold Notes</Form.Label>
            </Col>

            {/* TextArea column */}
            <Col xs={3} className="p-0">
              <TextArea
                name="invoiceHolds.invoiceHoldNotes"
                disabled={!invoiceHolds.invoiceHold}
                rows={25}
                cols={90}
                type="text"
                className="form-control h-350px textarea-responsive"
                width="800px"
                control={control}
                onChange={(e) => updateInvoiceHoldFields({ invoiceHoldNotes: e.target.value })}
                required={invoiceHolds.invoiceHold && invoiceHolds.invoiceHoldNotes}
              />
            </Col>
          </Form.Group>
        </div>{" "}
      </Col>
    </div>
  );
};

export default InvoiceHold;
