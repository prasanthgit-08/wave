import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import useOpenBalances from "./useOpenBalances";
import CommonTable from "../../../../../components/common/commonTable";

const OpenBalances = ({ styles }) => {
  const {
    loading,
    invoiceAmount,
    appliedAmount,
    remainingAmount,
    openBalancesArray,
    selectedId,
    isOpenBalanceValid,
    handleRecordOnClick,
    handleAppliedAmountOnChange,
    handleAppliedAmtBlur,
  } = useOpenBalances();

  return (
    <div className={`p-2 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight}`}>
      <div className="mt-4">
        <Row className={styles.creditCardTable}>
          <Col md={6} xs={6} className="ps-0 p-l-10 ">
            <div
              className={`border border-secondary ${styles.plantNameTable}`}
              style={{ padding: 0, height: "300px", overflowY: "auto" }}
            >
              <CommonTable
                id={"openBalancePK"}
                selecedId={selectedId}
                disabledHead={true}
                loading={loading}
                listingData={openBalancesArray}
                columns={[
                  { label: "Description", key: "description" },
                  {
                    label: "Amount",
                    key: "amount",
                    render: (item) => Number(item.amount || 0).toFixed(2),
                  },
                  {
                    label: "Balance",
                    key: "balanceDuplicate",
                    render: (item) => Number(item.balanceDuplicate || 0).toFixed(2),
                  },
                  {
                    label: "Applied",
                    key: "applied",
                    render: (item) => Number(item.applied || 0).toFixed(2),
                  },
                ]}
                handleSelect={(row) => {
                  handleRecordOnClick(row);
                }}
              />
            </div>
          </Col>

          <Col md={5} xs={5}>
            <div className="ms-4 p-t-25">
              {/* Invoice Amount */}
              <Form.Group className="mt-3 row align-items-center">
                <Col sm={3} className="p-0">
                  <Form.Label>Invoice Amount</Form.Label>
                </Col>
                <Col sm={3} className="p-0">
                  <input className="customFormControl" value={Number(invoiceAmount)?.toFixed(2)} disabled />
                </Col>
              </Form.Group>

              {/* Applied Amount */}
              <Form.Group className="mt-3 row align-items-center">
                <Col sm={3} className="p-0">
                  <Form.Label>Applied Amount</Form.Label>
                </Col>

                <Col sm={3} className="p-0">
                  <input
                    className={`customFormControl ${
                      selectedId
                        ? isOpenBalanceValid
                          ? appliedAmount
                            ? "borderGreen"
                            : ""
                          : "borderRed"
                        : ""
                    }`}
                    type="text"
                    value={appliedAmount}
                    disabled={!selectedId}
                    onChange={(e) => handleAppliedAmountOnChange(e.target.value)}
                    onBlur={handleAppliedAmtBlur}
                  />
                </Col>
              </Form.Group>

              {/* Remaining Amount */}
              <Form.Group className="mt-3 row align-items-center">
                <Col sm={3} className="p-0">
                  <Form.Label>Remaining Amount</Form.Label>
                </Col>

                <Col sm={3} className="p-0">
                  <input className="customFormControl" value={remainingAmount} disabled />
                </Col>
              </Form.Group>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OpenBalances;
