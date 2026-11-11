import React from "react";
import { Col, Form, Modal, Row, Button } from "react-bootstrap";
import Input from "../../../../../components/common/input";
import CommonTable from "../../../../../components/common/commonTable";
import LoadingIcon from "../../../../../componenets/common/LoadingIcon";
import useUnitRoutes from "./useUnitRoutes";
import PcMilerCalculation from "../../../../../components/common/pcMilerCalculation";
import pcMilerServices from "../../../../../service/pcMiler/pcMiler.service";
import { useFormContext, useWatch } from "react-hook-form";

const UnitRoutes = ({ styles }) => {
  const {
    selectedIndex,
    unitRoutesListing,
    populateFormFields,
    disableMoveUp,
    handleMoveUp,
    disableMoveDown,
    handleMoveDown,
    name,
    address1,
    address2,
    city,
    stateCode,
    postalCode,
    handleOptize,
    loader,
    recalculateRates,
  } = useUnitRoutes();

  const { setValue } = useFormContext();

  const invoiceMiles = useWatch({ name: "unit.invoiceMiles" });

  return (
    <div className={`p-2 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight}`}>
      {loader && <LoadingIcon />}
      {/* ROW 1 */}
      <Row className="h-100">
        {/* COL 1 - TABLE */}
        <Col xs={5} className={styles.driveByTableHeight}>
          {" "}
          <div className={`border border-secondary overflow-auto h-100`}>
            <CommonTable
              id={"id"}
              selectedIndex={selectedIndex}
              disabledHead={true}
              listingData={unitRoutesListing}
              columns={[
                { label: "Name", key: "name", className: "col-8" },
                { label: "City", key: "city", className: "col-3" },
                { label: "State", key: "stateCode", className: "col-1" },
              ]}
              handleSelect={(row, index) => {
                populateFormFields(row, index);
              }}
            />
          </div>
        </Col>

        {/* COL 2 - BUTTONS */}
        <Col xs={2}>
          <div className="d-flex flex-column mt-3">
            <span className="p-1">
              <button
                className={`btn btn-secondary font-12 btn-sm  w-110px`}
                disabled={disableMoveUp}
                type="button"
                onClick={handleMoveUp}
              >
                Move Up
              </button>
            </span>
            <span className="p-1">
              <button
                className={`btn btn-secondary font-12 btn-sm w-110px`}
                disabled={disableMoveDown}
                type="button"
                onClick={handleMoveDown}
              >
                Move down
              </button>
            </span>
            <span className="p-1">
              <PcMilerCalculation
                calculateService={pcMilerServices.calculateTripDistance}
                className="w-110px"
                payload={{ drivebyunit: unitRoutesListing }}
                existingMiles={invoiceMiles}
                disabled={unitRoutesListing?.length > 2 ? false : true}
                onSuccess={(distance) => {
                  setValue("unit.invoiceMiles", String(distance));
                  setValue("unit.driverMiles", String(distance));
                  recalculateRates();
                }}
                onError={(err) => {
                  console.log("errr", err);
                }}
              />
            </span>
            <span className="p-1">
              <button
                className={`btn btn-secondary font-12 btn-sm w-110px `}
                disabled={unitRoutesListing?.length > 3 ? false : true}
                type="button"
                onClick={handleOptize}
              >
                Optimize
              </button>
            </span>
          </div>
        </Col>

        {/* COL 3 */}
        <Col xs={5} className="mt-5">
          <Form>
            <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
              <Col xs={3}>
                <Form.Label className={`customColFormLabel`}>Name</Form.Label>
              </Col>
              <Col xs={5}>
                <Input
                  className={`customFormControl`}
                  value={name}
                  id="name"
                  name="name"
                  type="text"
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
              <Col xs={3}>
                <Form.Label className={`customColFormLabel`}>Address</Form.Label>
              </Col>
              <Col xs={5}>
                <Input
                  className={`customFormControl`}
                  id="ad1"
                  name="ad1"
                  value={address1}
                  type="text"
                  disabled
                  autoComplete="one-time-code"
                  spellCheck={false}
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
              <Col xs={3}></Col>
              <Col xs={5}>
                <Input
                  className={`customFormControl`}
                  id="ad2"
                  name="ad2"
                  value={address2}
                  type="text"
                  disabled
                  autoComplete="one-time-code"
                  spellCheck={false}
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <div>
              <div className="mt-4 align-items-center row  m-l-0 m-r-0">
                <Col xs={3}>
                  <label className="col-form-label dealer-label">City, State, ZIP</label>
                </Col>

                <Col xs={4}>
                  <Input
                    className={`customFormControl`}
                    id="city"
                    name="city"
                    value={city}
                    type="text"
                    disabled
                  />
                </Col>

                {/* State */}
                <Col xs={1} md={1} sm={1} className="p-r-0">
                  <Input
                    className={`customFormControl`}
                    id="stateCode"
                    name="stateCode"
                    value={stateCode?.toUpperCase()}
                    type="text"
                    disabled
                  />
                </Col>

                {/* Zip Code */}
                <Col xs={2} md={2} className="p-r-0">
                  <Input
                    className={`customFormControl`}
                    id="postalCode"
                    name="postalCode"
                    value={postalCode?.toUpperCase()}
                    type="text"
                    disabled
                  />
                </Col>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UnitRoutes;
