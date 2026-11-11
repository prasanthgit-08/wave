import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import Input from "../../../../../components/common/input";
import PostalCodeComponent from "../../../../../componenets/common/PostalCodeComponent";
import Checkbox from "../../../../../components/common/checkbox";
import TextArea from "../../../../../components/common/textArea";
import { useDispatch } from "react-redux";
import PostalCode from "../../../../../components/common/postalCode";
import {
  CSTMR_DYNAMIC_INPUT_DEFAULT,
  CSTMR_DYNAMIC_INPUT_LIST,
  CSTMR_RADIO_OBJ,
} from "../../../../../constants/componentData.constant";
import useMiscPickup from "./useMiscPickup";
import OrderEntryServices from "../../../../../service/orderEntry/orderEntry.service";
import CommonAdvancedLookup from "../../../../../components/lookup/commonAdvancedLookup";
import CustomButton from "../../../../../components/common/button";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import Loading from "../../../../../components/common/loading";
const MiscPickup = ({ styles }) => {
  const dispatch = useDispatch();
  const {
    watch,
    setValue,
    trigger,
    getValues,
    control,
    formState: { errors },
  } = useFormContext();

  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const miscPickup = getValues("miscPickup");

  const {
    updateMisDealerFields,
    handleMiscellanousDealerSelection,
    dealerloading,
    deliveryDealerModel,
    setDeliveryDealerModel,
  } = useMiscPickup();
  return (
    <div>
      {dealerloading && <Loading />}
      <div className={`p-2 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight}`}>
        <Row>
          <Col sm={6} xs={6}>
            <p className="">Miscellaneous Pickup Dealer</p>

            <div className="p-l-25">
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} className="p-0" />
                <Col xs={4} className={`p-0 ${styles.selectContainer}`}>
                  <CustomButton
                    className={`customFormControl bg-secondary bg-opacity-25 no-hover`}
                    label="Miscellaneous Dealer Selection"
                    onClick={() => setDeliveryDealerModel(true)}
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
                    className={`customFormControl`}
                    name={"miscPickup.name"}
                    type="search"
                    control={control}
                    maxLength={30}
                    onChange={(e) => {
                      updateMisDealerFields({ name: e.target.value });
                    }}
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
                    required
                    onChange={(e) => updateMisDealerFields({ address1: e.target.value })}
                    className={`customFormControl`}
                    name={"miscPickup.address1"}
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
                    onChange={(e) => updateMisDealerFields({ address2: e.target.value })}
                    className={`customFormControl`}
                    name={"miscPickup.address2"}
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
                city={watch("miscPickup.city") || ""}
                setCity={(data) => updateMisDealerFields({ city: data })}
                stateCode={watch("miscPickup.stateCode") || ""}
                setStateCode={(data) => updateMisDealerFields({ stateCode: data })}
                postalCode={watch("miscPickup.postalCode") || ""}
                setPostalCode={(value) => updateMisDealerFields({ postalCode: value })}
                setPostalValues={setPostalValues}
                postalOptions={postalOptions}
                postalCodePK={watch("miscPickup.postalCodePK")}
                setPostalCodePK={(data) => updateMisDealerFields({ postalCodePK: data })}
                canadian={watch("miscPickup.postalCodePK")}
                setCanadian={(data) => updateMisDealerFields({ canadian: data })}
              />

              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Phone</Form.Label>
                </Col>

                <Col xs={2} className="p-0 w-105px">
                  <Input
                    className={`customFormControl`}
                    name={"miscPickup.phone"}
                    type="search"
                    control={control}
                    maxLength={14}
                    onChange={(e) => {
                      e.target.value = formatPhoneNumber(e.target.value);
                      updateMisDealerFields({ phone: e.target.value });
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
                    onChange={(e) => updateMisDealerFields({ email: e.target.value })}
                    className={`customFormControl`}
                    name={"miscPickup.email"}
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
                    name={"miscPickup.contact"}
                    type="search"
                    control={control}
                    onChange={(e) => updateMisDealerFields({ contact: e.target.value })}
                    maxLength={42}
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
                    name={"miscPickup.contactPhone"}
                    type="search"
                    control={control}
                    maxLength={14}
                    onChange={(e) => {
                      e.target.value = formatPhoneNumber(e.target.value);
                      updateMisDealerFields({ contactPhone: e.target.value });
                    }}
                  />
                </Col>
              </Form.Group>
            </div>
          </Col>
        </Row>

        {/* ROW 2 */}
        <Row>
          <Col sm={12} xs={12}>
            <div className="p-l-25 mt-5">
              <Row>
                <Col xs={3}>
                  <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label className={`customColFormLabel`}>Open Sunday</Form.Label>
                    </Col>

                    <Col xs={1} md={1} sm={1} className="p-l-30">
                      <Checkbox
                        name="miscPickup.openSunday"
                        control={control}
                        onChange={(value) => updateMisDealerFields({ openSunday: value })}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label className={`customColFormLabel`}>Open Monday</Form.Label>
                    </Col>

                    <Col xs={1} md={1} sm={1} className="p-l-30">
                      <Checkbox
                        name="miscPickup.openMonday"
                        control={control}
                        onChange={(value) => updateMisDealerFields({ openMonday: value })}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label className={`customColFormLabel`}>Open Tuesday</Form.Label>
                    </Col>

                    <Col xs={1} md={1} sm={1} className="p-l-30">
                      <Checkbox
                        name="miscPickup.openTuesday"
                        control={control}
                        onChange={(value) => updateMisDealerFields({ openTuesday: value })}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label className={`customColFormLabel`}>Open Wednesday</Form.Label>
                    </Col>

                    <Col xs={1} md={1} sm={1} className="p-l-30">
                      <Checkbox
                        name="miscPickup.openWednesday"
                        control={control}
                        onChange={(value) => updateMisDealerFields({ openWednesday: value })}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label className={`customColFormLabel`}>Open Thursday</Form.Label>
                    </Col>

                    <Col xs={1} md={1} sm={1} className="p-l-30">
                      <Checkbox
                        name="miscPickup.openThursday"
                        control={control}
                        onChange={(value) => updateMisDealerFields({ openThursday: value })}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label className={`customColFormLabel`}>Open Friday</Form.Label>
                    </Col>

                    <Col xs={1} md={1} sm={1} className="p-l-30">
                      <Checkbox
                        name="miscPickup.openFriday"
                        control={control}
                        onChange={(value) => updateMisDealerFields({ openFriday: value })}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label className={`customColFormLabel`}>Open Saturday</Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-l-30">
                      <Checkbox
                        name="miscPickup.openSaturday"
                        control={control}
                        onChange={(value) => updateMisDealerFields({ openSaturday: value })}
                        className
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Label className="customColFormLabel mt-4">Drivers Email - Hours</Form.Label>

                  <div className="p-0">
                    <TextArea
                      name="miscPickup.driverEmailHours"
                      rows={12}
                      className="form-control h-250px textarea-responsive"
                      onChange={(e) => updateMisDealerFields({ driverEmailHours: e.target.value })}
                      control={control}
                    />
                  </div>
                </Col>

                <Col xs={4}>
                  <Form.Label className="customColFormLabel mt-4">Drivers Email - Directions</Form.Label>

                  <div className="p-0">
                    <TextArea
                      name="miscPickup.driverEmailDirections"
                      rows={8}
                      className="form-control h-250px textarea-responsive"
                      onChange={(e) => updateMisDealerFields({ driverEmailDirections: e.target.value })}
                      control={control}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {/* Misc Dealer Lookup Modal */}
        <CommonAdvancedLookup
          id={"unitAddressPK"}
          show={deliveryDealerModel}
          onHide={() => setDeliveryDealerModel(false)}
          lookupTitle={"Miscellaneous Dealer Selection"}
          columns={[
            { label: "Name", key: "name" },
            { label: "City", key: "city" },
            { label: "State", key: "stateCode" },
          ]}
          radioOrderObj={CSTMR_RADIO_OBJ}
          dynamicInputTargetKey={"unitAddresses"}
          dynamicInputDefaultFields={CSTMR_DYNAMIC_INPUT_DEFAULT}
          dynamicInputlist={CSTMR_DYNAMIC_INPUT_LIST}
          showAdvancedSearchFlag
          showAdvancedSortFlag
          handleLookupSelection={handleMiscellanousDealerSelection}
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

export default MiscPickup;
