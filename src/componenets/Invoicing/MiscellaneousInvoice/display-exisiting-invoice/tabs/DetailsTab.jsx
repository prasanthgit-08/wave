import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { setPageNumber } from "../../../../../redux/YardCheckinSlice";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import {
  setExistingInvoiceDetails,
  setSelectedExistingInvoice,
} from "../../../../../redux/Invoicing/MiscInvoiceSlice";
import MiscInvoiceService from "../../../../../services/Invoicing/MiscInvoiceService";
import LoadingIcon from "../../../../common/LoadingIcon";

const DetailsTab = () => {
  const dispatch = useDispatch();
  const { invoiceFK, existingInvoiceDetails, existingInvoices, selectedExistingInvoice } = useSelector(
    (state) => state.miscInvoiceReducer
  );
  const selectedInvoice = existingInvoices?.find((invoice) => invoice.InvoicePK === invoiceFK);
  const [loader, setLoader] = useState(false);
  /******
   * setting the selected Invoice number
   * *****/
  useEffect(() => {
    if (invoiceFK) {
      dispatch(setSelectedExistingInvoice(selectedInvoice));
    }
  }, [invoiceFK]);

  /****
   * Api call to get the existing invoice details records
   * for corresponding invoice record
   * *****/
  const getExistingInvoices = (id) => {
    if (invoiceFK !== undefined) {
      setLoader(true);
      MiscInvoiceService.getExistingInvoiceDetailsByInvoiceId(invoiceFK)
        .then((response) => {
          const data = response?.data;
          /***Dispatch actions to set state in Redux****/
          dispatch(setExistingInvoiceDetails(data?.invoiceDetails));
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    }
  };
  useEffect(() => {
    if (invoiceFK) {
      getExistingInvoices(invoiceFK);
    }
  }, [invoiceFK]);

  return (
    <div className="m-1">
      <div className="shadow-sm rounded border p-1" style={{ height: "380px" }}>
        <div className="ps-3 mb-4 ">
          {loader && <LoadingIcon />}
          <Col xs={12} className="ps-3">
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="invoiceText1">
                  Invoice Text
                </Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <input
                  className={`customFormControl`}
                  id="invoiceText1"
                  name="invoiceText1"
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                  value={selectedExistingInvoice?.InvoiceText1 ? selectedExistingInvoice.InvoiceText1 : null}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label
                  htmlFor="name"
                  className={`col-form-label  dealer-label`}
                  id="invoiceText2"
                ></Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <input
                  className={`customFormControl`}
                  id="invoiceText2"
                  name="invoiceText2"
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                  value={selectedExistingInvoice?.InvoiceText2 ? selectedExistingInvoice.InvoiceText2 : null}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label
                  htmlFor="name"
                  className={`col-form-label  dealer-label`}
                  id="invoiceText3"
                ></Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <input
                  className={`customFormControl`}
                  id="invoiceText3"
                  name="invoiceText3"
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                  value={selectedExistingInvoice?.InvoiceText3 ? selectedExistingInvoice.InvoiceText3 : null}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label
                  htmlFor="name"
                  className={`col-form-label  dealer-label`}
                  id="invoiceText4"
                ></Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <input
                  className={`customFormControl`}
                  id="invoiceText4"
                  name="invoiceText4"
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                  value={selectedExistingInvoice?.InvoiceText4 ? selectedExistingInvoice.InvoiceText4 : null}
                />
              </Col>
            </Form.Group>
          </Col>
          <div className="d-flex h-70 mt-2">
            <div className="w-100 border-1 border border-dark border">
              <div className="fixTableHead" style={{ overflowY: "scroll", height: "200px" }}>
                <table className="table table-striped f-w-600">
                  <thead>
                    <tr>
                      <th className="f-w-600 col-7">Description </th>
                      <th className="f-w-600 col-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {existingInvoiceDetails.map((invoiceDetail) => (
                      <tr key={invoiceDetail?.InvoicePK}>
                        <td>{invoiceDetail.Description}</td>
                        <td>{invoiceDetail?.Amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsTab;
