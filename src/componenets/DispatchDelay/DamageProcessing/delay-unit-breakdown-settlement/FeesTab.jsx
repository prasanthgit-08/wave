import React from "react";
import NoRecordsMessage from "../../../common/NoRecordsMessage";
import { Col, Row } from "react-bootstrap";

const FeesTab = () => {
  const loader = false;
  return (
    <Row className="mx-0 p-0 mt-3">
      <Col xs={12}>
        <div className="fixTableHead border border-secondary h-500px" style={{ overflowY: "auto" }}>
          <table className="table table-striped f-w-600">
            <thead>
              <tr disabled>
                <th className="f-w-600 " onClick={() => {}}>
                  Description
                </th>
                <th className="f-w-600 w-200px" onClick={() => {}}>
                  Invoice
                </th>
                <th className="f-w-600 w-200px" onClick={() => {}}>
                  Driver
                </th>

                <th className="f-w-600 w-200px" onClick={() => {}}>
                  Reimbursment
                </th>
              </tr>
            </thead>
            <tbody>
              {loader
                ? ""
                : []?.map((delayFee) => (
                    <tr key={delayFee.delayedUnitFeePK}>
                      <td>{delayFee.description?.trim()}</td>
                      <td>{delayFee.invoiceAmount}</td>
                      <td>{delayFee.driverAmount}</td>
                      <td>{delayFee.reimbursment ? "Yes" : "No"}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {loader ? null : (![] || []?.length === 0) && <NoRecordsMessage />}
        </div>
      </Col>
    </Row>
  );
};

export default FeesTab;
