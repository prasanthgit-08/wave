import React, { useEffect } from "react";
import { Col, Form } from "react-bootstrap";
import {
  setEditReason,
  setSaveEditInvoice,
  setPrint,
  setEmailToCustomer,
  setEmailToUser,
  setIncludeDocument,
} from "../../../../redux/Invoicing/EditInvoiceSlice";
import { useDispatch, useSelector } from "react-redux";

const InvoiceSaveContent = () => {
  const dispatch = useDispatch();
  const editReason = useSelector((state) => state.editInvoiceReducer.editReason);
  const print = useSelector((state) => state.editInvoiceReducer.print);
  const emailToCustomer = useSelector((state) => state.editInvoiceReducer.emailToCustomer);
  const includeDocument = useSelector((state) => state.editInvoiceReducer.includeDocument);
  const emailToUser = useSelector((state) => state.editInvoiceReducer.emailToUser);

  useEffect(() => {
    dispatch(
      setSaveEditInvoice({
        key: "editReason",
        payload: editReason,
      })
    );
    dispatch(
      setSaveEditInvoice({
        key: "print",
        payload: print,
      })
    );
    dispatch(
      setSaveEditInvoice({
        key: "emailToCustomer",
        payload: emailToCustomer,
      })
    );
    dispatch(
      setSaveEditInvoice({
        key: "emailToUser",
        payload: emailToUser,
      })
    );
    dispatch(
      setSaveEditInvoice({
        key: "includeDocument",
        payload: includeDocument,
      })
    );
  }, [editReason, print, emailToCustomer, emailToUser, includeDocument]);

  return (
    <div className="m-1">
      <div className="shadow-sm rounded border p-1" style={{ height: "432px" }}>
        <Col className="ps-3">
          <Form.Group className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0 `}>
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className={` col-form-label dealer-label`}>Print</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                value={print}
                checked={print}
                onChange={(e) => dispatch(setPrint(e.target.checked))}
              />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0 `}>
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className={` col-form-label dealer-label`}>Email To Customer</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                value={emailToCustomer}
                checked={emailToCustomer}
                onChange={(e) => dispatch(setEmailToCustomer(e.target.checked))}
              />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0 `}>
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className={` col-form-label dealer-label`}>Include Document</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                value={includeDocument}
                checked={includeDocument}
                disabled={!emailToCustomer && !emailToUser}
                onChange={(e) => dispatch(setIncludeDocument(e.target.checked))}
              />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0 `}>
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className={` col-form-label dealer-label`}>Email To User</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                value={emailToUser}
                checked={emailToUser}
                onChange={(e) => dispatch(setEmailToUser(e.target.checked))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row invisible  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`col-form-label  dealer-label`}></Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-start row  m-l-0 m-r-0 ms-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label htmlFor="name" className={`col-form-label  dealer-label`}>
                Reason For Edit
              </Form.Label>
            </Col>

            <Col xs={9} md={9} sm={9} className="p-0">
              <textarea
                rows={10}
                type="text"
                id="editReason"
                name="editReason"
                className={`customFormControl h-100 w-100 customFocusClass ${
                  editReason && editReason?.length >= 1 ? "borderGreen" : "borderRed"
                } `}
                value={editReason}
                onChange={(e) => dispatch(setEditReason(e.target.value.replace(/^\s+/, "")))}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
        </Col>
      </div>
    </div>
  );
};
export default InvoiceSaveContent;
