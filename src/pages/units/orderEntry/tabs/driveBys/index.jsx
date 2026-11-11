import { Col, Form, Modal, Row, Button } from "react-bootstrap";
import useDriveBys from "./useDriveBys";
import CommonTable from "../../../../../components/common/commonTable";
import { useDispatch, useSelector } from "react-redux";
import DynamicText from "../../../../../components/common/dynamicText";
import Input from "../../../../../components/common/input";
import CommonAdvancedLookup from "../../../../../components/lookup/commonAdvancedLookup";
import {
  CSTMR_DYNAMIC_INPUT_DEFAULT,
  DEALER_DYNAMIC_INPUT_LIST,
  DEALER_RADIO_OBJ,
} from "../../../../../constants/componentData.constant";
import PostalCode from "../../../../../components/common/postalCode";
import DealerServices from "../../../../../service/dealer/dealer.service";
import OrderEntryServices from "../../../../../service/orderEntry/orderEntry.service";
import FlatRateComponent from "../../flatRateComponent";
import { triggerCalculateRates } from "../../../../../store/slices/unit.slice";

const DriveBys = ({ styles }) => {
  const {
    selectedIndex,
    driveBysListing,
    disableSelectDealer,
    disableSelectDriveBy,
    disableNew,
    disableEdit,
    disableSave,
    disableCancel,
    disableDelete,
    authorizedBy,
    editMode,
    isDealerRecord,
    name,
    address1,
    address2,
    city,
    stateCode,
    postalCode,
    postalOptions,
    postalCodePK,
    canadian,
    contact,
    instructions,
    showDealerLookup,
    showDriveBysLookup,
    populateFormFields,
    setShowDealerLookup,
    setShowDriveBysLookup,
    handleNew,
    handleEdit,
    handleSave,
    handleCancel,
    handleDelete,
    setAuthorizedBy,
    handleAuthorizedByOnBlur,
    setName,
    setAddress1,
    setAddress2,
    setCity,
    setStateCode,
    setPostalCode,
    setPostalValues,
    setPostalCodePK,
    setCanadian,
    setContact,
    setInstructions,
    handleDealerLookupSelection,
    handleDriveByLookupSelection,
  } = useDriveBys();

  const dispatch = useDispatch();
  const pcMilerVisible = useSelector((state) => state.unit.pcMilerVisible);

  return (
    <div className={`p-2 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight}`}>
      {/* ROW 1 */}
      <Row>
        {/* COL 1 - TABLE */}
        <Col xs={5} className={styles.driveByTableHeight}>
          <div className={`border border-secondary overflow-auto h-100`}>
            <CommonTable
              id={"id"}
              selectedIndex={selectedIndex}
              disabledHead={true}
              listingData={driveBysListing}
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
                className="btn btn-secondary font-12 btn-sm btn-medium-with"
                type="button"
                disabled={disableSelectDealer}
                onClick={() => setShowDealerLookup(true)}
              >
                Select Dealer
              </button>
            </span>
            <span className="p-1">
              <button
                className="btn btn-secondary font-12 btn-sm btn-medium-with"
                type="button"
                disabled={disableSelectDriveBy}
                onClick={() => setShowDriveBysLookup(true)}
              >
                Select DriveBy
              </button>
            </span>
            <span className="p-1"></span>
            <span className="p-1"></span>

            <span className="p-1">
              <button
                className="btn btn-secondary font-12 btn-sm btn-medium-with"
                type="button"
                onClick={handleNew}
                disabled={disableNew}
              >
                New
              </button>
            </span>

            <span className="p-1">
              <button
                className="btn btn-secondary font-12 btn-sm btn-medium-with"
                type="button"
                onClick={handleEdit}
                disabled={disableEdit}
              >
                Edit
              </button>
            </span>
            <span className="p-1">
              <button
                className="btn btn-secondary font-12 btn-sm btn-medium-with"
                type="button"
                onClick={handleSave}
                disabled={disableSave}
              >
                Save DriveBy
              </button>{" "}
            </span>
            <span className="p-1">
              <button
                className="btn btn-secondary font-12 btn-sm btn-medium-with"
                type="button"
                onClick={handleCancel}
                disabled={disableCancel}
              >
                Cancel
              </button>
            </span>
            <span className="p-1">
              <button
                className="btn btn-secondary font-12 btn-sm btn-medium-with"
                type="button"
                onClick={handleDelete}
                disabled={disableDelete}
              >
                Delete
              </button>
            </span>
          </div>
        </Col>

        {/* COL 3 */}
        <Col xs={5}>
          <Form>
            <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
              <Col xs={3} className="ps-0">
                <Form.Label className={`customColFormLabel`}>Authorized By</Form.Label>
              </Col>
              <Col sm={6} xs={6} className="ps-0">
                <Input
                  className={`customFormControl  ${authorizedBy ? "borderGreen" : "borderRed"}`}
                  id="authorizedBy"
                  name="authorizedBy"
                  value={authorizedBy}
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(e) => setAuthorizedBy(e.target.value)}
                  onBlur={handleAuthorizedByOnBlur}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
              <Col xs={3} className="ps-0">
                <Form.Label className={`customColFormLabel`}>Name</Form.Label>
              </Col>
              <Col sm={6} xs={6} className="ps-0">
                <Input
                  className={`customFormControl  ${
                    editMode && !isDealerRecord ? (name ? "borderGreen" : "borderRed") : ""
                  }`}
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled={!editMode || isDealerRecord}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
              <Col xs={3} className="ps-0">
                <Form.Label className={`customColFormLabel`}>Address</Form.Label>
              </Col>
              <Col sm={6} xs={6} className="ps-0">
                <Input
                  className={`customFormControl  ${
                    editMode && !isDealerRecord ? (address1 ? "borderGreen" : "borderRed") : ""
                  }`}
                  id="ad1"
                  name="ad1"
                  value={address1}
                  disabled={!editMode || isDealerRecord}
                  type="text"
                  maxLength={30}
                  autoComplete="one-time-code"
                  aria-autocomplete="list"
                  onChange={(e) => setAddress1(e.target.value)}
                  spellCheck={false}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
              <Col xs={3} className="ps-0"></Col>
              <Col sm={6} xs={6} className="ps-0">
                <Input
                  className={`customFormControl  `}
                  id="ad2"
                  name="ad2"
                  value={address2}
                  disabled={!editMode || isDealerRecord}
                  type="text"
                  maxLength={30}
                  autoComplete="one-time-code"
                  aria-autocomplete="list"
                  onChange={(e) => setAddress2(e.target.value)}
                  spellCheck={false}
                />
              </Col>
            </Form.Group>

            <div className=" mt-4">
              <PostalCode
                city={city}
                setCity={setCity}
                stateCode={stateCode}
                setStateCode={setStateCode}
                postalCode={postalCode}
                setPostalCode={setPostalCode}
                setPostalValues={setPostalValues}
                postalOptions={postalOptions}
                postalCodePK={postalCodePK}
                setPostalCodePK={setPostalCodePK}
                canadian={canadian}
                setCanadian={setCanadian}
                disabled={!editMode || isDealerRecord}
              />
            </div>

            <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
              <Col xs={3} className="ps-0">
                <Form.Label className={`customColFormLabel`}>Contact</Form.Label>
              </Col>
              <Col sm={6} xs={6} className="ps-0">
                <Input
                  className={`customFormControl  ${editMode ? (contact ? "borderGreen" : "borderRed") : ""}`}
                  id="contact"
                  name="contact"
                  type="text"
                  maxLength={30}
                  value={contact}
                  disabled={!editMode}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(e) => setContact(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4  align-items-start row  m-l-0 m-r-0">
              <Col xs={3} className="ps-0">
                <Form.Label className={`customColFormLabel`}>Drive By Instructions</Form.Label>
              </Col>
              <Col sm={7} xs={7} className="ps-0">
                <div /* style={readOnly ? { pointerEvents: "none" } : {}} */>
                  <DynamicText
                    numFields={4}
                    maxCharLimit={42}
                    inputValues={instructions}
                    setInputValues={setInstructions}
                    disabled={!editMode}
                    requireFirstField={editMode}
                  />
                </div>
              </Col>
            </Form.Group>
            <FlatRateComponent
              pcMilerVisible={pcMilerVisible}
              apiCall={() => dispatch(triggerCalculateRates())}
            />
          </Form>
        </Col>
      </Row>

      {/* Dealer Lookup Modal */}
      {showDealerLookup && (
        <CommonAdvancedLookup
          id={"dealerPK"}
          show={showDealerLookup}
          onHide={() => setShowDealerLookup(false)}
          lookupTitle={"Dealer Selection"}
          columns={[
            { label: "Name", key: "name" },
            { label: "DBA", key: "dba" },
            { label: "City", key: "city" },
            { label: "State", key: "stateCode" },
          ]}
          dynamicInputTargetKey={"dealer"}
          dynamicInputDefaultFields={CSTMR_DYNAMIC_INPUT_DEFAULT}
          dynamicInputlist={DEALER_DYNAMIC_INPUT_LIST}
          showAdvancedSearchFlag
          showAdvancedSortFlag
          radioOrderObj={DEALER_RADIO_OBJ}
          handleLookupSelection={handleDealerLookupSelection}
          fetchFunction={(params) =>
            DealerServices.fetchDealers({
              number: params.pageNumber,
              includePostalCodePK: true,
              ...params,
            })
          }
        />
      )}

      {/* DriveBy Lookup Modal */}
      {showDriveBysLookup && (
        <CommonAdvancedLookup
          id={"driveByPK"}
          show={showDriveBysLookup}
          onHide={() => setShowDriveBysLookup(false)}
          lookupTitle={"Drive By Selection"}
          columns={[
            { label: "Name", key: "name" },
            { label: "City", key: "city" },
            { label: "State", key: "stateCode" },
          ]}
          dynamicInputTargetKey={"driveBy"}
          dynamicInputDefaultFields={CSTMR_DYNAMIC_INPUT_DEFAULT}
          dynamicInputlist={DEALER_DYNAMIC_INPUT_LIST}
          // showAdvancedSearchFlag
          // showAdvancedSortFlag
          radioOrderObj={DEALER_RADIO_OBJ}
          handleLookupSelection={handleDriveByLookupSelection}
          fetchFunction={(params) =>
            OrderEntryServices.getAllDrivebys({
              number: params.pageNumber,
              includePostalCodePK: true,
              ...params,
            })
          }
        />
      )}
    </div>
  );
};

export default DriveBys;
