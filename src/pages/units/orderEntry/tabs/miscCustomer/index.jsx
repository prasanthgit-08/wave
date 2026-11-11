import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Input from "../../../../../components/common/input";
import { useFormContext, useWatch } from "react-hook-form";
import useMiscCustomer from "./useMiscCustomer";
import PostalCode from "../../../../../components/common/postalCode";
import CustomButton from "../../../../../components/common/button";
import CommonAdvancedLookup from "../../../../../components/lookup/commonAdvancedLookup";
import {
  CSTMR_DYNAMIC_INPUT_DEFAULT,
  CSTMR_DYNAMIC_INPUT_LIST,
  CSTMR_RADIO_OBJ,
} from "../../../../../constants/componentData.constant";
import OrderEntryServices from "../../../../../service/orderEntry/orderEntry.service";
import { useSelector } from "react-redux";
import Loading from "../../../../../components/common/loading";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";

const MiscCustomer = ({ styles }) => {
  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();

  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const selectedCustomer = useSelector((state) => state.unit.selectedCustomer);
  const quickPayCustomer = selectedCustomer?.quickPayCustomer ?? null;
  const name = useWatch({ name: "customer.name" });

  const {
    customerLoading,
    updateMiscCustomerFields,
    handleMiscellanousCustomerSelection,
    miscCustomerModel,
    setMiscCustomerModel,
  } = useMiscCustomer();

  return (
    <div>
      {customerLoading && <Loading />}
      <div className={`p-2 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight}`}>
        <Row>
          <Col sm={6} xs={6}>
            <p className="">Miscellaneous Customer</p>

            <div className="p-l-25">
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} className="p-0" />
                <Col xs={4} className={`p-0 ${styles.selectContainer}`}>
                  <CustomButton
                    className={`customFormControl bg-secondary bg-opacity-25 no-hover`}
                    label="Miscellaneous Customer Selection"
                    onClick={() => setMiscCustomerModel(true)}
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
                    name={"miscCustomer.name"}
                    type="search"
                    control={control}
                    maxLength={30}
                    onChange={(e) => updateMiscCustomerFields({ name: e.target.value })}
                    value={name}
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
                    className={`customFormControl`}
                    name={"miscCustomer.address1"}
                    onChange={(e) => updateMiscCustomerFields({ address1: e.target.value })}
                    type="text"
                    control={control}
                    maxLength={30}
                    required
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
                    className={`customFormControl`}
                    name={"miscCustomer.address2"}
                    onChange={(e) => updateMiscCustomerFields({ address2: e.target.value })}
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
                city={watch("miscCustomer.city") || ""}
                setCity={(data) => updateMiscCustomerFields({ city: data })}
                stateCode={watch("miscCustomer.stateCode") || ""}
                setStateCode={(data) => updateMiscCustomerFields({ stateCode: data })}
                postalCode={watch("miscCustomer.postalCode") || ""}
                setPostalCode={(value) => updateMiscCustomerFields({ postalCode: value })}
                setPostalValues={setPostalValues}
                postalOptions={postalOptions}
                postalCodePK={watch("miscCustomer.postalCodePK")}
                setPostalCodePK={(data) => updateMiscCustomerFields({ postalCodePK: data })}
                canadian={watch("miscCustomer.postalCodePK")}
                setCanadian={(data) => updateMiscCustomerFields({ canadian: data })}
              />

              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Phone</Form.Label>
                </Col>

                <Col xs={2} className="p-0 w-105px">
                  <Input
                    className={`customFormControl`}
                    name={"miscCustomer.phone"}
                    onChange={(e) => {
                      e.target.value = formatPhoneNumber(e.target.value);
                      updateMiscCustomerFields({ phone: e.target.value });
                    }}
                    type="search"
                    control={control}
                    maxLength={30}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label className={`customColFormLabel`}>FAX</Form.Label>
                </Col>

                <Col xs={2} className="p-0 w-105px">
                  <Input
                    className={`customFormControl`}
                    name={"miscCustomer.fax"}
                    onChange={(e) => {
                      e.target.value = formatPhoneNumber(e.target.value);
                      updateMiscCustomerFields({ fax: e.target.value });
                    }}
                    type="search"
                    control={control}
                    maxLength={30}
                    onBlur={() => {}}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Email</Form.Label>
                </Col>

                <Col xs={6} className="p-0">
                  <Input
                    className={`customFormControl`}
                    name={"miscCustomer.email"}
                    onChange={(e) => updateMiscCustomerFields({ email: e.target.value })}
                    type="search"
                    control={control}
                    maxLength={70}
                    onBlur={() => {}}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Contact</Form.Label>
                </Col>

                <Col xs={6} className="p-0">
                  <Input
                    className={`customFormControl`}
                    name={"miscCustomer.contact"}
                    onChange={(e) => updateMiscCustomerFields({ contact: e.target.value })}
                    type="search"
                    control={control}
                    maxLength={42}
                    onBlur={() => {}}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className={`mt-3 align-items-center row  m-l-0 m-r-0 ${
                  quickPayCustomer ? "" : "hide-elements"
                }`}
              >
                <Col xs={3} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Quick Pay Terms</Form.Label>
                </Col>

                <Col xs={6} className="p-0">
                  <Input
                    className={`customFormControl`}
                    name={"miscCustomer.quickPayTerms"}
                    onChange={(e) => updateMiscCustomerFields({ quickPayTerms: e.target.value })}
                    type="search"
                    control={control}
                    maxLength={30}
                    onBlur={() => {}}
                    required
                  />
                </Col>
              </Form.Group>
            </div>
          </Col>
        </Row>
      </div>

      {/* MiscCustomer Lookup Modal */}
      <CommonAdvancedLookup
        id={"customerAddressPK"}
        show={miscCustomerModel}
        onHide={() => setMiscCustomerModel(false)}
        lookupTitle={"Miscellaneous Customer Selection"}
        columns={[
          { label: "Name", key: "name" },
          { label: "City", key: "city" },
          { label: "State", key: "stateCode" },
        ]}
        dynamicInputTargetKey={"customerAddresses"}
        dynamicInputDefaultFields={CSTMR_DYNAMIC_INPUT_DEFAULT}
        dynamicInputlist={CSTMR_DYNAMIC_INPUT_LIST}
        showAdvancedSearchFlag
        showAdvancedSortFlag
        radioOrderObj={CSTMR_RADIO_OBJ}
        handleLookupSelection={handleMiscellanousCustomerSelection}
        fetchFunction={(params) =>
          OrderEntryServices.fetchMiscCustomer({
            ...params,
          })
        }
      />
    </div>
  );
};

export default MiscCustomer;
