import React from "react";
import { Col, Form } from "react-bootstrap";

const CheckboxField = ({ label, value, disabled, topMargin = "mt-4" }) => (
  <Form.Group className={`${topMargin} align-items-center row m-l-0 m-r-0`}>
    <Col sm={3} md={3} xs={3} className="p-0">
      <Form.Label className="col-form-label dealer-label">{label}</Form.Label>
    </Col>
    <Col xs={1} md={1} sm={1} className="p-0">
      <input type="checkbox" className="form-check-input p-0" checked={value} disabled={disabled} />
    </Col>
  </Form.Group>
);

const TextField = ({ label, value, disabled, classField = false, topMargin = "mt-4" }) => (
  <Form.Group className={`${topMargin} align-items-center row m-l-0 m-r-0`}>
    <Col sm={3} md={3} xs={3} className="p-0">
      <Form.Label className="col-form-label dealer-label">{label}</Form.Label>
    </Col>
    {classField ? (
      <div className="p-0 w-35px">
        <input
          className="form-controlDriverService"
          type="search"
          maxLength={30}
          autoComplete="off"
          aria-autocomplete="list"
          value={value ?? ""}
          disabled={disabled}
        />
      </div>
    ) : (
      <Col
        xs={
          label === "Military Services" ? 4 : label === "EFS Driver ID" || label === "EFS Load Number" ? 2 : 1
        }
        className="p-0"
      >
        <input
          className="form-controlDriverService"
          type="search"
          maxLength={30}
          autoComplete="off"
          aria-autocomplete="list"
          value={value ?? ""}
          disabled={disabled}
        />
      </Col>
    )}
  </Form.Group>
);

function SettingsTab({ driverData, disabled }) {
  return (
    <div className="DriverServiceSettingHeight">
      <div className="d-flex p-2">
        <Col xs={5}>
          <CheckboxField label="Has ELD" value={driverData?.hasELD} disabled={disabled} topMargin="mt-3" />
          <CheckboxField label="Has Arizona Permit" value={driverData?.arizonaPermit} disabled={disabled} />
          <TextField label="Missed Callins" value={driverData?.missedCheckinCalls} disabled={disabled} />
          <TextField label="Military Services" value={driverData?.militaryService} disabled={disabled} />
          <CheckboxField label="Has Hitch Bar" value={driverData?.hitchTowbar} disabled={disabled} />
          <CheckboxField label="Tractor Qualified" value={driverData?.tractorQualified} disabled={disabled} />
          <CheckboxField label="Bus Qualified" value={driverData?.busQualified} disabled={disabled} />
          <TextField label="EFS Driver ID" value={driverData?.debitCardID} disabled={disabled} />
          <TextField label="EFS Load Number" value={driverData?.debitCardUnitNumber} disabled={disabled} />
          <CheckboxField label="Campfire Crew" value={driverData?.campfireCrew} disabled={disabled} />
          <CheckboxField label="Has In Cab Printer" value={driverData?.hasPrinter} disabled={disabled} />
          <CheckboxField label="Has Dashboard Camera" value={driverData?.dashCamera} disabled={disabled} />
        </Col>

        <Col xs={5}>
          <CheckboxField label="Bonus" value={driverData?.inBonusProgram} disabled={disabled} />
          <CheckboxField label="Has Passport" value={driverData?.passport} disabled={disabled} />
          <CheckboxField label="Has Easy Pass" value={driverData?.hasTollPass} disabled={disabled} />
          <TextField label="Two Car Weight" value={driverData?.towCarWeight} disabled={disabled} />

          <CheckboxField
            label="Motorized"
            value={driverData?.motorized}
            disabled={disabled}
            topMargin="mt-5"
          />
          <TextField
            label="Motorized Class"
            value={driverData?.motorizedClass}
            disabled={disabled}
            classField
          />
          <TextField label="Motorized Rank" value={driverData?.motorizedRank} disabled={disabled} />

          <CheckboxField label="Towable" value={driverData?.towable} disabled={disabled} />
          <TextField label="Towable Class" value={driverData?.towableClass} disabled={disabled} classField />
          <TextField label="Towable Rank" value={driverData?.towableRank} disabled={disabled} />

          <CheckboxField label="Flatbed" value={driverData?.flatbed} disabled={disabled} />
          <TextField label="Flatbed Rank" value={driverData?.flatbedRank} disabled={disabled} />
        </Col>
      </div>
    </div>
  );
}

export default SettingsTab;
