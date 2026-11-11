import React from "react";
import { Button, Modal } from "react-bootstrap";

const ExportModal = ({
  show,
  onHide,
  option1,
  option2,
  excelSelectionOption,
  onOption1Change,
  onOption2Change,
  exportHandler,
  handleExcelSelection,
  isExcelselectionEnabled,
  disabled,
  title = "",
}) => (
  <Modal centered show={show} onHide={onHide} backdrop="static" keyboard={false}>
    <Modal.Header className="d-flex align-items-center justify-content-between border border-dark border-2 border-bottom-1 border-top-1 border-left-1 border-right-1">
      <h5 className="mb-0">{title}</h5>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
    </Modal.Header>

    <Modal.Body className="font-14 border border-dark border-2 border-bottom-1 border-top-0 border-left-1 border-right-1">
      <div style={{ width: "180px", margin: "0 auto" }}>
        {/* Email / Print */}
        <div className="d-flex mb-3">
          <div style={{ width: "90px" }}>
            <label style={{ width: "45px" }} className="me-2">
              Email
            </label>
            <input
              type="radio"
              value="email"
              checked={option1 === "email"}
              onChange={onOption1Change}
              style={{ position: "relative", top: "2px" }}
            />
          </div>

          <div style={{ width: "90px" }}>
            <label style={{ width: "45px" }} className="me-2">
              Print
            </label>
            <input
              type="radio"
              value="print"
              checked={option1 === "print"}
              onChange={onOption1Change}
              style={{ position: "relative", top: "2px" }}
            />
          </div>
        </div>

        {/* Excel */}
        {isExcelselectionEnabled && (
          <div className="mb-3">
            <label style={{ width: "45px" }} className="me-2">
              Excel
            </label>
            <input
              type="checkbox"
              value="excel"
              checked={excelSelectionOption}
              onChange={handleExcelSelection}
              disabled={option1 !== "email"}
              style={{ position: "relative", top: "2px" }}
            />
          </div>
        )}

        {/* User / Driver */}
        <div className="d-flex">
          <div style={{ width: "90px" }}>
            <label style={{ width: "45px" }} className="me-2">
              User
            </label>
            <input
              type="radio"
              value="user"
              checked={option2 === "user"}
              onChange={onOption2Change}
              disabled={option1 !== "email"}
              style={{ position: "relative", top: "2px" }}
            />
          </div>

          <div style={{ width: "90px" }}>
            <label style={{ width: "45px" }} className="me-2">
              Driver
            </label>
            <input
              type="radio"
              value="driver"
              checked={option2 === "driver"}
              onChange={onOption2Change}
              disabled={option1 !== "email"}
              style={{ position: "relative", top: "2px" }}
            />
          </div>
        </div>
      </div>
    </Modal.Body>

    <Modal.Footer className="d-flex justify-content-end border border-dark border-2 border-bottom-1 border-top-0 border-left-1 border-right-1">
      <Button variant="secondary" onClick={exportHandler} disabled={disabled}>
        Export
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ExportModal;
