import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useFormContext, useWatch } from "react-hook-form";
import Input from "../../../../../components/common/input";
import Checkbox from "../../../../../components/common/checkbox";
import TextArea from "../../../../../components/common/textArea";
import PostalCode from "../../../../../components/common/postalCode";
import {
  CSTMR_DYNAMIC_INPUT_DEFAULT,
  CSTMR_DYNAMIC_INPUT_LIST,
  CSTMR_RADIO_OBJ,
} from "../../../../../constants/componentData.constant";
import OrderEntryServices from "../../../../../service/orderEntry/orderEntry.service";
import CommonAdvancedLookup from "../../../../../components/lookup/commonAdvancedLookup";
import CustomButton from "../../../../../components/common/button";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import useMiscDelivery from "./useMiscDelivery";
import DynamicText from "../../../../../components/common/dynamicText";
import Loading from "../../../../../components/common/loading";
const MiscDelivery = ({ styles }) => {
  const {
    updateMiscDeliveryDealerFields,
    handleDeliveryDealerSelection,
    deliveryDealerloading,
    miscDealerModel,
    setMiscDealerModel,
  } = useMiscDelivery();
  const {
    watch,
    control,
    formState: { errors },
  } = useFormContext();

  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);

  const miscValues = useWatch({ name: "miscDelivery" });

  return (
    <div>
      {deliveryDealerloading && <Loading />}
      <div className={`p-2 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight}`}>
        {/* ROW 1 */}
        <Row>
          {/* COL 1 */}
          <Col sm={6} xs={6}>
            <p className="">Miscellaneous Delivery Dealer</p>

            <div className="p-l-25">
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} className="p-0" />
                <Col xs={4} className={`p-0 ${styles.selectContainer}`}>
                  <CustomButton
                    className={`customFormControl bg-secondary bg-opacity-25 no-hover`}
                    label="Miscellaneous Dealer Selection"
                    onClick={() => setMiscDealerModel(true)}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label htmlFor="name" className={`customColFormLabel`}>
                    Name
                  </Form.Label>
                </Col>

                <Col xs={6} className="p-0">
                  <Input
                    required
                    onChange={(e) => updateMiscDeliveryDealerFields({ name: e.target.value })}
                    className={`customFormControl`}
                    name={"miscDelivery.name"}
                    type="search"
                    control={control}
                    maxLength={30}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label htmlFor="address1" className={`customColFormLabel`}>
                    Address
                  </Form.Label>
                </Col>

                <Col xs={6} className="p-0">
                  <Input
                    onChange={(e) => updateMiscDeliveryDealerFields({ address1: e.target.value })}
                    required
                    className={`customFormControl`}
                    name={"miscDelivery.address1"}
                    type="text"
                    control={control}
                    maxLength={30}
                    autoComplete="one-time-code"
                    spellCheck={false}
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-2  mb-3 align-items-center row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label htmlFor="address2" className={`customColFormLabel`}></Form.Label>
                </Col>

                <Col xs={6} className="p-0">
                  <Input
                    onChange={(e) => updateMiscDeliveryDealerFields({ address2: e.target.value })}
                    className={`customFormControl`}
                    name={"miscDelivery.address2"}
                    type="text"
                    control={control}
                    maxLength={30}
                    autoComplete="one-time-code"
                    spellCheck={false}
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>

              <PostalCode
                city={watch("miscDelivery.city")}
                setCity={(data) => updateMiscDeliveryDealerFields({ city: data })}
                stateCode={watch("miscDelivery.stateCode")}
                setStateCode={(data) => updateMiscDeliveryDealerFields({ stateCode: data })}
                postalCode={watch("miscDelivery.postalCode")}
                setPostalCode={(value) => updateMiscDeliveryDealerFields({ postalCode: value })}
                setPostalValues={setPostalValues}
                postalOptions={postalOptions}
                postalCodePK={watch("miscDelivery.postalCodePK")}
                setPostalCodePK={(data) => updateMiscDeliveryDealerFields({ postalCodePK: data })}
                canadian={watch("miscDelivery.postalCodePK")}
                setCanadian={(data) => updateMiscDeliveryDealerFields({ canadian: data })}
              />

              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Phone</Form.Label>
                </Col>

                <Col xs={2} className="p-0 w-105px">
                  <Input
                    className={`customFormControl`}
                    name={"miscDelivery.phone"}
                    type="search"
                    control={control}
                    maxLength={14}
                    onChange={(e) => {
                      e.target.value = formatPhoneNumber(e.target.value);
                      updateMiscDeliveryDealerFields({ phone: e.target.value });
                    }}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Email</Form.Label>
                </Col>

                <Col xs={6} className="p-0">
                  <Input
                    onChange={(e) => updateMiscDeliveryDealerFields({ email: e.target.value })}
                    className={`customFormControl`}
                    name={"miscDelivery.email"}
                    type="search"
                    control={control}
                    maxLength={70}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Contact</Form.Label>
                </Col>

                <Col xs={6} className="p-0">
                  <Input
                    required
                    className={`customFormControl`}
                    name={"miscDelivery.contact"}
                    type="search"
                    control={control}
                    maxLength={42}
                    onChange={(e) => updateMiscDeliveryDealerFields({ contact: e.target.value })}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Contact Phone</Form.Label>
                </Col>

                <Col xs={2} className="p-0 w-105px">
                  <Input
                    required
                    className={`customFormControl`}
                    name={"miscDelivery.contactPhone"}
                    type="search"
                    control={control}
                    maxLength={14}
                    onChange={(e) => {
                      e.target.value = formatPhoneNumber(e.target.value);
                      updateMiscDeliveryDealerFields({ contactPhone: e.target.value });
                    }}
                  />
                </Col>
              </Form.Group>
            </div>
          </Col>

          {/* COL 2 */}
          <Col sm={3} xs={3}>
            <p className={""}>BOL Text - Miscellaneous</p>

            <div>
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={10} xs={10}>
                  <DynamicText
                    numFields={7}
                    maxCharLimit={40}
                    inputValues={miscValues?.bolTextMiscellaneousInputValues}
                    setInputValues={(data) =>
                      updateMiscDeliveryDealerFields({ bolTextMiscellaneousInputValues: data })
                    }
                  />
                </Col>
              </Form.Group>
            </div>

            <p className={""}>BOL Text - Directions</p>

            <div>
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={10} xs={10}>
                  <DynamicText
                    numFields={7}
                    maxCharLimit={40}
                    inputValues={miscValues?.bolTextDirectionsInputValues}
                    setInputValues={(data) =>
                      updateMiscDeliveryDealerFields({ bolTextDirectionsInputValues: data })
                    }
                  />
                </Col>
              </Form.Group>
            </div>
          </Col>

          {/* COL 3 */}

          {/* COL 3 */}
          <Col sm={3} xs={3}>
            <p className={""}>BOL Text - Hours</p>

            <div>
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={10} xs={10}>
                  <DynamicText
                    numFields={3}
                    maxCharLimit={40}
                    inputValues={miscValues?.bolTextHoursInputValues}
                    setInputValues={(data) =>
                      updateMiscDeliveryDealerFields({ bolTextHoursInputValues: data })
                    }
                  />
                </Col>
              </Form.Group>
            </div>

            <p className={""}>BOL Text - Other</p>

            <div>
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={10} xs={10}>
                  <DynamicText
                    numFields={3}
                    maxCharLimit={40}
                    inputValues={miscValues?.bolTextOtherInputValues}
                    setInputValues={(data) =>
                      updateMiscDeliveryDealerFields({ bolTextOtherInputValues: data })
                    }
                  />
                </Col>
              </Form.Group>
            </div>
            <p className={`${""} mt-4`}>BOL Text - Wash Instructions</p>

            <div>
              <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
                <Col sm={10} xs={10}>
                  <DynamicText
                    numFields={5}
                    maxCharLimit={40}
                    inputValues={miscValues?.bolTextWashInstructionsInputValues}
                    setInputValues={(data) =>
                      updateMiscDeliveryDealerFields({ bolTextWashInstructionsInputValues: data })
                    }
                  />
                </Col>
              </Form.Group>
            </div>
          </Col>
        </Row>

        {/* ROW 2 */}
        <Row>
          {/* COL 1 */}
          <Col sm={6} xs={6}>
            <Row className="p-l-25">
              {/* Checkboxes */}
              <Col sm={5} xs={5}>
                <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
                  <Col sm={7} xs={7} className="p-0">
                    <Form.Label className={`customColFormLabel`}>Open Sunday</Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-l-30">
                    <Checkbox
                      name="miscDelivery.openSunday"
                      control={control}
                      onChange={(value) => updateMiscDeliveryDealerFields({ openSunday: value })}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={7} xs={7} className="p-0">
                    <Form.Label className={`customColFormLabel`}>Open Monday</Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-l-30">
                    <Checkbox
                      name="miscDelivery.openMonday"
                      control={control}
                      onChange={(value) => updateMiscDeliveryDealerFields({ openMonday: value })}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={7} xs={7} className="p-0">
                    <Form.Label className={`customColFormLabel`}>Open Tuesday</Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-l-30">
                    <Checkbox
                      name="miscDelivery.openTuesday"
                      control={control}
                      onChange={(value) => updateMiscDeliveryDealerFields({ openTuesday: value })}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={7} xs={7} className="p-0">
                    <Form.Label className={`customColFormLabel`}>Open Wednesday</Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-l-30">
                    <Checkbox
                      name="miscDelivery.openWednesday"
                      control={control}
                      onChange={(value) => updateMiscDeliveryDealerFields({ openWednesday: value })}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={7} xs={7} className="p-0">
                    <Form.Label className={`customColFormLabel`}>Open Thursday</Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-l-30">
                    <Checkbox
                      name="miscDelivery.openThursday"
                      control={control}
                      onChange={(value) => updateMiscDeliveryDealerFields({ openThursday: value })}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={7} xs={7} className="p-0">
                    <Form.Label className={`customColFormLabel`}>Open Friday</Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-l-30">
                    <Checkbox
                      name="miscDelivery.openFriday"
                      control={control}
                      onChange={(value) => updateMiscDeliveryDealerFields({ openFriday: value })}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={7} xs={7} className="p-0">
                    <Form.Label className={`customColFormLabel`}>Open Saturday</Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-l-30">
                    <Checkbox
                      name="miscDelivery.openSaturday"
                      control={control}
                      onChange={(value) => updateMiscDeliveryDealerFields({ openSaturday: value })}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col xs={7} className="m-t-32">
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={12} xs={12} className="p-0">
                    <Form.Label className={`customColFormLabel`}>Drivers Email - Hours</Form.Label>
                  </Col>
                  <div className="p-0">
                    <TextArea
                      name="miscDelivery.driverEmailHours"
                      rows={4}
                      className="form-control h-156px textarea-responsive"
                      onChange={(e) => updateMiscDeliveryDealerFields({ driverEmailHours: e.target.value })}
                      control={control}
                      required={false}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Col>

          {/* COL 2 */}
          <Col md={3} sm={6} xs={12} className="m-t-32">
            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={12} xs={12} className="p-0">
                <Form.Label className={`customColFormLabel`}>Drivers Email - Directions</Form.Label>
              </Col>
              <div className="p-0">
                <TextArea
                  name="miscDelivery.driverEmailDirections"
                  rows={4}
                  className="form-control h-156px textarea-responsive"
                  control={control}
                  required={false}
                  onChange={(e) => updateMiscDeliveryDealerFields({ driverEmailDirections: e.target.value })}
                />
              </div>
            </Form.Group>
          </Col>

          {/* COL 3 */}
          <Col md={3} sm={6} xs={12} className="m-t-32">
            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={12} xs={12} className="p-0">
                <Form.Label className={`customColFormLabel`}>Drivers Email - Wash Instructions</Form.Label>
              </Col>
              <div className="p-0">
                <TextArea
                  name="miscDelivery.driverEmailWashInstructions"
                  rows={10}
                  className="form-control h-156px textarea-responsive"
                  control={control}
                  required={false}
                  onChange={(e) =>
                    updateMiscDeliveryDealerFields({ driverEmailWashInstructions: e.target.value })
                  }
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Misc Dealer Lookup Modal */}
        <CommonAdvancedLookup
          id={"unitAddressPK"}
          show={miscDealerModel}
          onHide={() => setMiscDealerModel(false)}
          lookupTitle={"Miscellaneous Dealer Selection"}
          columns={[
            { label: "Name", key: "name" },
            { label: "City", key: "city" },
            { label: "State", key: "stateCode" },
          ]}
          dynamicInputTargetKey={"unitaddress"}
          dynamicInputDefaultFields={CSTMR_DYNAMIC_INPUT_DEFAULT}
          dynamicInputlist={CSTMR_DYNAMIC_INPUT_LIST}
          showAdvancedSearchFlag
          showAdvancedSortFlag
          radioOrderObj={CSTMR_RADIO_OBJ}
          handleLookupSelection={handleDeliveryDealerSelection}
          fetchFunction={(params) =>
            OrderEntryServices.fetchMiscDealer({
              ...params,
            })
          }
        />
      </div>
    </div>
  );
};

export default MiscDelivery;
