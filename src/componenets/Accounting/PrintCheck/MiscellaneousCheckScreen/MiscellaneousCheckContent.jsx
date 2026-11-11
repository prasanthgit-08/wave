import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import {
  setAddress1,
  setAddress2,
  setCanandianNew,
  setCheckAmount,
  setCheckPayFlag,
  setCheckPayId,
  setCheckPayInput,
  setCityNew,
  setName,
  setPostalCodeNew,
  setPostalCodePKNew,
  setReason,
  setReverseFlag,
  setStateCodeNew,
  setcheckPayToData,
} from "../../../../redux/PrintCheckSlice";
import PrintCheckService from "../../../../services/PrintCheckService";
import CheckPayToLookup from "../../../LookupScreens/CheckPayTo/CheckPayToLookup";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CheckPayToService from "../../../../services/CheckPayToService";
import PostalCodeComponent from "../../../common/PostalCodeComponent";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import { useNavigate } from "react-router-dom";
import Input from "../../../../components/common/input";

const MiscellaneousCheckContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkPayToList, setCheckPayToList] = useState([]);

  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [zipPostLenght, setzipPostLenght] = useState();
  const [showCheckPayToLookup, setShowCheckPayToLookup] = useState(false);
  const checkPayInput = useSelector((state) => state.printCheckReducer.checkPayInput);
  const checkPayId = useSelector((state) => state.printCheckReducer.checkPayId);
  const checkPayToData = useSelector((state) => state.printCheckReducer.checkPayToData);
  const address1 = useSelector((state) => state.printCheckReducer.address1);
  const address2 = useSelector((state) => state.printCheckReducer.address2);
  const name = useSelector((state) => state.printCheckReducer.name);
  const reason = useSelector((state) => state.printCheckReducer.reason);
  const checkAmount = useSelector((state) => state.printCheckReducer.checkAmount);
  const source = useSelector((state) => state.printCheckReducer.source);
  const who = useSelector((state) => state.printCheckReducer.who);
  const checkPayFlag = useSelector((state) => state.printCheckReducer.checkPayFlag);
  const printCheckFlag = useSelector((state) => state.printCheckReducer.printCheckFlag);
  const companyData = useSelector((state) => state.printCheckReducer.companyData);
  const reverseFlag = useSelector((state) => state.printCheckReducer.reverseFlag);
  const postalCodeNew = useSelector((state) => state.printCheckReducer.postalCodeNew);
  const stateCodeNew = useSelector((state) => state.printCheckReducer.stateCodeNew);
  const cityNew = useSelector((state) => state.printCheckReducer.cityNew);
  const postalCodePKNew = useSelector((state) => state.printCheckReducer.postalCodePKNew);
  const canadianNew = useSelector((state) => state.printCheckReducer.canadianNew);
  const [checkPayLoading, setCheckPayLoading] = useState(false);

  /*******Check Pay to Fetch function browse*******/
  const fetchCheckPayToByName = (string) => {
    setCheckPayLoading(true);
    PrintCheckService.fetchCheckPayToByName(string)
      .then(({ data }) => {
        setCheckPayToList(data.content);
      })
      .finally(() => {
        setCheckPayLoading(false);
      });
  };
  const fetchCheckPayToById = (id) => {
    if (id) {
      CheckPayToService.getCheckPayToById(id).then(({ data }) => {
        if (data) {
          dispatch(setcheckPayToData(data));
          dispatch(setCheckPayInput(data.description?.trim()));
          dispatch(setName(data.name));
          dispatch(setAddress1(data.address1));
          dispatch(setAddress2(data.address2));
          dispatch(setPostalCodePKNew(data.postalCodePK));
          dispatch(setCityNew(data.city));
          dispatch(setPostalCodeNew(data.postalCode));
          dispatch(setStateCodeNew(data.stateCode));
        }
      });
    }
  };
  useEffect(() => {
    fetchCheckPayToById(checkPayId);
  }, [checkPayId]);
  /************** Check Pay To Lookup Show **************/
  const handleCheckPayToLookupModalShow = () => {
    setShowCheckPayToLookup(true);
  };
  /************** Check Pay To Lookup Handle function ***************/
  const handleCheckPayToLookupSelection = (checkPayTo) => {
    dispatch(setCheckPayId(checkPayTo.id));
    dispatch(setCheckPayInput(checkPayTo.description?.trim()));
    setShowCheckPayToLookup(false);
    dispatch(setCheckPayFlag(true));
  };

  /************** Check Pay To Lookup Hide ***************/
  const hideCheckPayToLookup = () => {
    setShowCheckPayToLookup(false);
  };

  useEffect(() => {
    if (postalCodeNew.match(/^((\d{5}-\d{4})|(\d{5}))$/)) {
      dispatch(setCanandianNew(false));
    } else if (postalCodeNew.match(/^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/)) {
      dispatch(setCanandianNew(true));
    }
  }, [postalCodeNew]);

  const isNumber = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d:.]/g, "");

    if (value) return number;
  };

  useEffect(() => {
    if (!printCheckFlag) {
      navigate(`/print-check-options-screen`);
    }
  }, [printCheckFlag]);

  useEffect(() => {
    if (!(name && address1 && postalCodePKNew)) {
      dispatch(setCheckAmount(""));
      dispatch(setReason(""));
    }
  }, [address1, name, postalCodePKNew]);

  //for clearing reverse flag if chekpay id exist
  useEffect(() => {
    if (checkPayId && checkPayFlag) {
      dispatch(setReverseFlag(false));
    }
  }, [printCheckFlag]);
  return (
    <div className="p-2">
      <div className="p-15 shadow-sm rounded border quarterScreenFormContentHeight">
        <Row className="m-0 p-10">
          <Col xs={12}>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label
                  htmlFor="name"
                  className="col-form-label dealer-label"
                  hidden={companyData?.allDriversPayTaxable}
                >
                  Source
                </Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <CustomRadioGroup
                  hidden={companyData?.allDriversPayTaxable}
                  name="Type1"
                  horizontal
                  horizontalAlignmentClassName={"me-4"}
                  options={["Taxable", "Reimbursement"]}
                  selectedOption={source}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Who
                </Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <CustomRadioGroup
                  name="Type"
                  horizontal
                  horizontalAlignmentClassName={"me-4"}
                  options={["Driver", "Transport Company", "Miscellaneous"]}
                  selectedOption={who}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label className="col-form-label dealer-label">Check Pay To</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className={`p-0 d-flex`}>
                <AutoCompleteDropdown
                  arrayList={checkPayToList}
                  searchString={checkPayInput}
                  customFormatSearchString={(searchString) => searchString}
                  renderItemId={(checkPayTo) => checkPayTo.id}
                  renderItemField={(checkPayTo) => checkPayTo.description}
                  handleSearchString={(string) => dispatch(setCheckPayInput(string))}
                  fetchDataBySearchString={fetchCheckPayToByName}
                  onSelect={handleCheckPayToLookupSelection}
                  className={`${
                    !checkPayFlag && (name || address1 || cityNew || stateCodeNew || postalCodeNew)
                      ? ""
                      : checkPayInput && checkPayId
                        ? "borderGreen"
                        : "borderRed"
                  }`}
                  selectedId={checkPayId}
                  loading={checkPayLoading}
                  clearInputCallback={() => {
                    if (!reverseFlag) {
                      dispatch(setCheckPayId(null));
                      dispatch(setCheckPayFlag(false));
                      dispatch(setName(""));
                      dispatch(setAddress1(""));
                      dispatch(setAddress2(""));
                      dispatch(setCityNew(""));
                      dispatch(setPostalCodeNew(""));
                      dispatch(setStateCodeNew(""));
                      dispatch(setPostalCodePKNew(""));
                    }
                  }}
                  disabled={
                    !checkPayFlag &&
                    (address1 || address2 || name || cityNew || stateCodeNew || postalCodeNew)
                  }
                />
                <LookupButton
                  onClick={handleCheckPayToLookupModalShow}
                  disabled={
                    !checkPayFlag &&
                    (address1 || address2 || name || cityNew || stateCodeNew || postalCodeNew)
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label className="col-form-label dealer-label">Name</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className={`p-0 d-flex`}>
                <Input
                  id="customer"
                  name="customer"
                  type="customer"
                  maxLength={30}
                  value={name}
                  onChange={(e) => {
                    dispatch(setName(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                  }}
                  disabled={checkPayId}
                  className={`customFormControl ${checkPayId ? "" : name ? "borderGreen" : "borderRed"}`}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label className="col-form-label dealer-label">Address</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className={`p-0 d-flex`}>
                <Input
                  id="customer"
                  name="customer"
                  type="customer"
                  value={address1}
                  maxLength={30}
                  onChange={(e) => {
                    dispatch(setAddress1(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                  }}
                  disabled={checkPayId}
                  className={`customFormControl ${checkPayId ? "" : address1 ? "borderGreen" : "borderRed"}`}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label className="col-form-label dealer-label"></Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className={`p-0 d-flex`}>
                <Input
                  id="customer"
                  name="customer"
                  type="customer"
                  value={address2}
                  onChange={(e) => {
                    dispatch(setAddress2(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                  }}
                  disabled={checkPayId}
                  className={`customFormControl `}
                />
              </Col>
            </Form.Group>
            <PostalCodeComponent
              disabled={checkPayId || checkPayInput ? true : false}
              city={checkPayId ? checkPayToData?.city?.trim() : cityNew}
              setCity={(city) => {
                dispatch(setCityNew(city));
              }}
              stateCode={checkPayId ? checkPayToData?.stateCode?.trim() : stateCodeNew}
              setStateCode={(state) => {
                dispatch(setStateCodeNew(state));
              }}
              postalCode={checkPayId ? checkPayToData?.postalCode?.trim() : postalCodeNew}
              setPostalCode={(postalCode) => {
                dispatch(setPostalCodeNew(postalCode));
              }}
              setPostalValues={setPostalValues}
              postalOptions={postalOptions}
              postalCodePK={postalCodePKNew}
              setPostalCodePK={(pk) => {
                dispatch(setPostalCodePKNew(pk));
              }}
              canadian={canadianNew}
              setCanadian={setCanandianNew}
              zipInputWidth={"100px"}
              labelColNumber={2}
            />

            <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label className="col-form-label dealer-label">Check Amount</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className={`p-0 d-flex w-75px`}>
                <Input
                  id="customer"
                  name="customer"
                  type="customer"
                  value={checkAmount}
                  disabled={!(name && address1 && postalCodePKNew)}
                  onChange={(e) => {
                    e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                      dispatch(setCheckAmount(isNumber(e.target.value)));
                  }}
                  className={`customFormControl ${!(name && address1 && postalCodePKNew) ? "" : checkAmount && checkAmount > 0 ? "borderGreen" : "borderRed"}`}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label className="col-form-label dealer-label">Reason</Form.Label>
              </Col>
              <Col xs={7} md={7} sm={7} className={`p-0 d-flex`}>
                <Input
                  id="customer"
                  name="customer"
                  type="customer"
                  value={reason}
                  disabled={!(name && address1 && postalCodePKNew)}
                  maxLength={60}
                  onChange={(e) => {
                    dispatch(setReason(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                  }}
                  className={`customFormControl ${!(name && address1 && postalCodePKNew) ? "" : reason ? "borderGreen" : "borderRed"}`}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <CheckPayToLookup
          show={showCheckPayToLookup}
          onHide={hideCheckPayToLookup}
          renderItemId={(checkPayTo) => checkPayTo.checkPayToPK}
          MaintenanceProgram
          handleLookupSelection={handleCheckPayToLookupSelection}
        />
      </div>
    </div>
  );
};

export default MiscellaneousCheckContent;
