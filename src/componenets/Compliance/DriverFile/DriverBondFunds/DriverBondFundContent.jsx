import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Radio, RadioGroup } from "react-radio-group";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DriverService from "../../../../services/DriverService";
import {
  setDisableSave,
  setDriverBondFund,
  setOnCancel,
  setPostalCodeOnChange,
  setChangesCancelled,
} from "../../../../redux/DriverBondFundSlice";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import DriverBondFundService from "../../../../services/DriverBondFundService";
import CheckPayToLookup from "../../../LookupScreens/CheckPayTo/CheckPayToLookup";
import PostalCode from "../../../common/PostalCode";
import { setDealerCity, setDealerPostcode, setDealerStatecode } from "../../../../redux/EditDealerSlice";
import * as yup from "yup";
import { Formik } from "formik";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import CheckPayToService from "../../../../services/CheckPayToService";
import PostalCodeComponent from "../../../common/PostalCodeComponent";
import { PermissionKeyGeneratorUtil } from "../../../../utils/PermissionKeyGeneratorUtil";
import Input from "../../../../components/common/input";
const DriverBondFundContent = () => {
  const { driverId, pageNumber } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /**Values from driver Table */
  const [accumulatedReserves, setAccumulatedReserves] = useState(null);
  const [totalBond, setTotalBond] = useState(null);
  const [accumulatedBond, setAccumulatedBond] = useState("");
  const [defaultAccumulatedBond, setDefaultAccumulatedBond] = useState("");
  const [adjustmentAmount, setAdjustmentAmount] = useState("");
  const [radioValue, setRadioValue] = useState("add");
  const [reason, setReason] = useState("");
  const [postToDriversPay, setPostToDriversPay] = useState(false);
  const [printCheck, setPrintCheck] = useState(false);
  const [printCheckToDriver, setPrintCheckToDriver] = useState(false);
  /**CheckPay to autocomplete */
  const [checkPayToList, setCheckPayToList] = useState([]);
  const [checkPayToFK, setCheckPayToFK] = useState(null);
  const [checkPayToInput, setCheckPayToInput] = useState("");
  const [checkPayToData, setcheckPayToData] = useState(null);
  const [showCheckPayToLookup, setShowCheckPayToLookup] = useState(false);
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  /*****City,zip,state validation*********/
  const [city, setCity] = useState("");
  const [statecode, setStateCode] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [canadian, setCanadian] = useState(false);
  const [isPostalData, setPostalData] = useState(false);
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [zipPostLenght, setzipPostLenght] = useState();
  const [cityLength, setcityLength] = useState();
  const [zipIdChcek, setZipIdCheck] = useState("");
  const [checkPayFlag, setCheckPayFlag] = useState(false);
  const postalCodeOnChange = useSelector((state) => state.driverBondFundReducer.postalCodeOnChange);
  const onCancel = useSelector((state) => state.driverBondFundReducer.onCancel);
  const driverBondFund = useSelector((state) => state.driverBondFundReducer.driverBondFund);
  const changesCancelled = useSelector((state) => state.driverBondFundReducer.changesCancelled);
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [loader, setLoader] = useState(false);

  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermission = PermissionKeyGeneratorUtil("BONFUND", "edit");
  const [editIsDenied, seteditIsDenied] = useState(false);
  const [checkPaytoLoading, setCheckPaytoLoading] = useState(false);
  /**Fetch the driver details to set The Accumelated Bond
   * Accumulated Reserves and Total Bond
   */
  const fetchDriverDetailsForBondFund = () => {
    DriverService.getById(driverId)
      .then((res) => {
        setAccumulatedBond(res.data.accumulatedBond);
        setDefaultAccumulatedBond(res.data.accumulatedBond);
        setAccumulatedReserves(res.data.accumulatedReserve);
        setTotalBond(res.data.totalBond);
      })

      .catch((err) => console.log(err));
  };
  /*******Check Pay to Fetch function browse*******/
  const fetchCheckPayToByName = (string) => {
    setCheckPaytoLoading(true);
    DriverBondFundService.fetchCheckPayToByName(string)
      .then(({ data }) => {
        setCheckPayToList(data.content);
        setCheckPaytoLoading(false);
      })
      .catch((err) => {
        setCheckPaytoLoading(false);
      });
  };
  /************** Check Pay To By Id ***************/
  const fetchCheckPayToById = (id) => {
    if (id) {
      CheckPayToService.getCheckPayToById(id).then(({ data }) => {
        setcheckPayToData(data);
        setCheckPayToInput(data.description?.trim());
        setName(data.name);
        setAddress1(data.address1);
        setAddress2(data.address2);
        setCanadian(data.canadian);
        setStateCode(data.stateCode);
        setPostalCode(data.postalCode);
        setCity(data.city);
        setPostalCodePK(data.postalCodePK);
      });
    }
  };
  useEffect(() => {
    fetchCheckPayToById(checkPayToFK);
  }, [checkPayToFK]);

  /************** Check Pay To Lookup Show **************/
  const handleCheckPayToLookupModalShow = () => {
    setShowCheckPayToLookup(true);
  };
  /************** Check Pay To Lookup Handle function ***************/
  const handleCheckPayToLookupSelection = (checkPayTo) => {
    setCheckPayToFK(checkPayTo.id);
    setCheckPayToInput(checkPayTo.description?.trim());
    setShowCheckPayToLookup(false);
    setCheckPayFlag(true);
  };

  /************** Check Pay To Lookup Hide ***************/
  const hideCheckPayToLookup = () => {
    setShowCheckPayToLookup(false);
  };
  /****Fetch the Driver details for Bond Fund  */
  useEffect(() => {
    fetchDriverDetailsForBondFund();
  }, [driverId]);

  useEffect(() => {
    if (changesCancelled) {
      setAdjustmentAmount("");
      setRadioValue("add");
      setReason("");
      setPostToDriversPay(false);
      setPrintCheck(false);
      setPrintCheckToDriver(false);
      setCheckPayToList([]);
      setCheckPayToFK(null);
      setCheckPayToInput("");
      setName("");
      setAddress1("");
      setAddress2("");
      setCity("");
      setStateCode("");
      setPostalCode("");
      /****Reset the flag**/
      dispatch(setChangesCancelled(false));
      fetchDriverDetailsForBondFund();
    }
  }, [changesCancelled]);

  /**Number validation for Amount field */
  const isNumber = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d:.]/g, "");
    if (value) return number;
  };

  /** Set default value to Add if
   * accumulatedBond < 0 or
   * accumulatedBond + accumulatedReserves < 0
   */
  useEffect(() => {
    if (accumulatedBond < 0 || accumulatedBond + accumulatedReserves < 0) {
      setRadioValue("add");
    }
  }, [accumulatedBond, accumulatedReserves]);
  /**Clear the PrintCheck value */
  useEffect(() => {
    if (radioValue !== "subtract" || !postToDriversPay) {
      setPrintCheck(false); // Set default value to "Add"
    }
  }, [radioValue, postToDriversPay]);
  /**Save Validation */
  useEffect(() => {
    if (
      adjustmentAmount &&
      parseFloat(adjustmentAmount) > 0 &&
      reason &&
      (!postToDriversPay ||
        (postToDriversPay && !printCheck) ||
        (postToDriversPay && printCheck && printCheckToDriver) ||
        (postToDriversPay && printCheck && checkPayToFK && name && address1 && postalCodePK) ||
        (postToDriversPay && printCheck && name && address1 && postalCodePK))
    ) {
      /**enable save if all conditions**/
      dispatch(setDisableSave(false));
    } else {
      /***disable save***/
      dispatch(setDisableSave(true));
    }
  }, [
    adjustmentAmount,
    reason,
    postToDriversPay,
    printCheck,
    printCheckToDriver,
    checkPayToFK,
    name,
    address1,
    postalCodeOnChange,
    zipPostLenght,
    postalCodePK,
  ]);

  /****Clear the address fields if checkpay auto complete is empty */
  useEffect(() => {
    if (checkPayToFK === null || checkPayToInput === "") {
      setName("");
      setAddress1("");
      setAddress2("");
      setCity("");
      setPostalCode("");
      setStateCode("");
      setPostalCodePK(null);
    }
  }, [checkPayToFK, checkPayToInput]);

  /**Creation of Driver Bond Fund Object */
  useEffect(() => {
    dispatch(
      setDriverBondFund({
        driverFKInt: driverId,
        accumulatedBond: accumulatedBond,
        add: radioValue === "add",
        subtract: radioValue === "subtract",
        postToDriver: postToDriversPay,
        amount: adjustmentAmount,
        reason: reason,
        printCheck: printCheck,
        printCheckToDriver: printCheckToDriver,
        name: name ? name : "",
        address1: address1 ? address1 : "",
        address2: address2 ? address2 : "",
        city: city ? city : "",
        statecode: statecode ? statecode : "",
        postalcode: postalcode ? postalcode : "",
        canadian: canadian,
        editIsDenied: editIsDenied,
      })
    );
  }, [
    driverId,
    accumulatedBond,
    radioValue,
    postToDriversPay,
    adjustmentAmount,
    reason,
    printCheck,
    printCheckToDriver,
    name,
    address1,
    address2,
    city,
    statecode,
    postalcode,
    canadian,
    editIsDenied,
  ]);

  useEffect(() => {
    if (deniedPermissions) {
      seteditIsDenied(deniedPermissions.includes(editPermission));
    }
  }, [deniedPermissions, editPermission]);

  const handleMouseEventMain = (e) => {
    setZipIdCheck(e.target.dataset.id);
  };
  const changePostalCode = (e) => {
    dispatch(setPostalCodeOnChange(e));
  };

  /**Validation city,state,zip */
  const validationSchema = yup.object({
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),
  });

  return (
    <Formik
      initialValues={{
        city,
        statecode,
        postalcode,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        city: true,
        statecode: true,
        postalcode: true,
      }}
    >
      {(formik) => (
        <Form on={formik.handle}>
          <div className="w-100 p-2">
            {loader && (
              <div className="fade modal-backdrop show">
                <div className="pos-center">
                  <div className="loader"></div>
                </div>
              </div>
            )}
            <div className="shadow-sm rounded border quarterScreenFormContentHeight">
              <div className="m-b-10">
                <div className="p-15 w-100">
                  <Row className="m-0 p-0 ">
                    <Col sm={5} md={5} lg={5} xl={5} xs={5}>
                      {/* Accumulated Reserves */}
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={4} md={4} xs={4} className="p-0">
                          <Form.Label className="col-form-label dealer-label">
                            Accumulated Reserves
                          </Form.Label>
                        </Col>
                        <Col xs={2} md={2} sm={2} className="p-0 w-75px">
                          <Input
                            className={`customFormControl`}
                            id="accumulatedReserves"
                            name="accumulatedReserves"
                            type="accumulatedReserves"
                            value={accumulatedReserves}
                            maxLength={10}
                            disabled
                          />
                        </Col>
                      </Form.Group>
                      {/* Total Bond */}
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={4} md={4} xs={4} className="p-0">
                          <Form.Label className="col-form-label dealer-label">Total Bond</Form.Label>
                        </Col>

                        <Col xs={2} md={2} sm={2} className="p-0 w-75px">
                          <Input
                            className={`customFormControl`}
                            id="totalBond"
                            name="totalBond"
                            type="totalBond"
                            value={totalBond}
                            maxLength={10}
                            disabled
                          />
                        </Col>
                      </Form.Group>
                      {/* Accumulated Bond */}
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={4} md={4} xs={4} className="p-0">
                          <Form.Label className="col-form-label dealer-label">Accumulated Bond</Form.Label>
                        </Col>

                        <Col xs={2} md={2} sm={2} className="p-0 w-75px">
                          <Input
                            className={`customFormControl`}
                            id="accumulatedBond"
                            name="accumulatedBond"
                            type="accumulatedBond"
                            value={accumulatedBond}
                            maxLength={10}
                            disabled
                          />
                        </Col>
                      </Form.Group>
                      {/* Adjustment Amount */}
                      <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
                        <Col sm={4} md={4} xs={4} className="p-0">
                          <Form.Label className="col-form-label dealer-label">Adjustment Amount</Form.Label>
                        </Col>

                        <Col xs={2} md={2} sm={2} className="p-0 w-75px">
                          <Input
                            className={`customFormControl ${
                              !adjustmentAmount ||
                              parseFloat(adjustmentAmount) === 0 ||
                              adjustmentAmount === "."
                                ? "borderRed"
                                : "borderGreen"
                            }`}
                            id="adjustmentAmount"
                            name="adjustmentAmount"
                            type="adjustmentAmount"
                            value={adjustmentAmount}
                            maxLength={10}

                            onChange={(e) => {
                              e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                                setAdjustmentAmount(isNumber(e.target.value));
                            }}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col xs={4} md={4} sm={4} className="p-0">
                          <Form.Label className="col-form-label me-3  w-50px"></Form.Label>
                        </Col>
                        <Col xs={5} className="p-0">
                          <CustomRadioGroup
                            horizontal
                            selectedOption={radioValue}
                            options={[
                              { value: "add", label: "Add" },
                              { value: "subtract", label: "Subtract" },
                            ]}
                            onChange={(value) => {
                              setRadioValue(value);
                            }}
                            disabled={accumulatedBond < 0 && editIsDenied}
                          />
                        </Col>
                      </Form.Group>
                      {/* Post To Drivers Pay */}
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={4} md={4} xs={4} className="p-0">
                          <Form.Label className="col-form-label dealer-label">Post To Drivers Pay</Form.Label>
                        </Col>
                        <Col xs={3} md={3} sm={3} className="p-0">
                          <input
                            type="checkbox"
                            className="form-check-input p-0 "
                            name="postToDriversPay"
                            value={postToDriversPay}
                            checked={postToDriversPay}
                            onChange={(e) => {
                              const value = e.target.checked;
                              setPostToDriversPay(value);
                              if (!value) {
                                setPrintCheckToDriver(false);
                                setCheckPayToFK(null);
                                setCheckPayToInput("");
                                setName("");
                                setAddress1("");
                                setAddress2("");
                                setCity("");
                                setPostalCode("");
                                setStateCode("");
                                setPostalCodePK(null);
                              }
                            }}
                          />
                        </Col>
                      </Form.Group>
                      {/* Print Check */}
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={4} md={4} xs={4} className="p-0">
                          <Form.Label className="col-form-label dealer-label">Print Check</Form.Label>
                        </Col>
                        <Col xs={2} md={2} sm={2} className="p-0">
                          <input
                            type="checkbox"
                            className="form-check-input p-0 "
                            name="printCheck"
                            value={printCheck}
                            checked={printCheck}
                            disabled={!postToDriversPay || radioValue !== "subtract"}
                            onChange={(e) => {
                              const value = e.target.checked;
                              setPrintCheck(value);
                              if (!value) {
                                setPrintCheckToDriver(false);
                                setCheckPayToFK(null);
                                setCheckPayToInput("");
                                setName("");
                                setAddress1("");
                                setAddress2("");
                                setCity("");
                                setPostalCode("");
                                setStateCode("");
                                setPostalCodePK(null);
                              }
                            }}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col xs={7} className="ps-lg-5">
                      {/* Print Check To Driver */}
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={4} md={4} xs={4} className="p-0">
                          <Form.Label className="col-form-label dealer-label">
                            Print Check To Driver
                          </Form.Label>
                        </Col>
                        <Col xs={2} md={2} sm={2} className="p-0">
                          <input
                            type="checkbox"
                            name="printCheckToDriver"
                            value={printCheckToDriver}
                            className={`form-check-input p-0 ${
                              checkPayToFK ||
                              checkPayToInput ||
                              name ||
                              address1 ||
                              city ||
                              statecode ||
                              postalcode
                                ? ""
                                : printCheck
                                  ? printCheckToDriver
                                    ? "borderGreen"
                                    : "borderRed"
                                  : ""
                            }`}
                            checked={printCheckToDriver}
                            disabled={
                              !printCheck ||
                              checkPayToFK ||
                              checkPayToInput ||
                              name ||
                              address1 ||
                              address2 ||
                              city ||
                              postalcode ||
                              statecode
                            }
                            onChange={(e) => setPrintCheckToDriver(e.target.checked)}
                          />
                        </Col>
                      </Form.Group>
                      {/*Check Pay To*/}
                      <Form.Group className={`mt-2 m-b-10 align-items-center row  m-l-0 m-r-0 `}>
                        <Col sm={4} md={4} xs={4} className="p-0">
                          <Form.Label htmlFor="name" className="col-form-label dealer-label">
                            Check Pay To
                          </Form.Label>
                        </Col>

                        <Col xs={7} md={7} sm={7} className={`p-0 d-flex`}>
                          <AutoCompleteDropdown
                            arrayList={checkPayToList}
                            searchString={checkPayToInput}
                            customFormatSearchString={(searchString) => searchString}
                            renderItemId={(checkPayTo) => checkPayTo.id}
                            renderItemField={(checkPayTo) => checkPayTo.description}
                            handleSearchString={(string) => setCheckPayToInput(string)}
                            fetchDataBySearchString={fetchCheckPayToByName}
                            loading={checkPaytoLoading}
                            onSelect={handleCheckPayToLookupSelection}
                            disabled={
                              !printCheck ||
                              (!checkPayFlag &&
                                (address1 || address2 || name || postalcode || city || statecode)) ||
                              printCheckToDriver
                            }
                            clearInputCallback={() => {
                              setCheckPayToFK(null);
                              setCheckPayFlag(false);
                            }}
                            className={`${
                              printCheckToDriver ||
                              (!checkPayFlag && (name || address1 || city || statecode || postalcode))
                                ? ""
                                : printCheck
                                  ? checkPayToFK && checkPayToInput
                                    ? "borderGreen"
                                    : "borderRed"
                                  : ""
                            }`}
                            selectedId={checkPayToFK}
                          />
                          <LookupButton
                            onClick={handleCheckPayToLookupModalShow}
                            disabled={
                              !printCheck ||
                              (!checkPayFlag &&
                                (address1 || address2 || name || postalcode || city || statecode)) ||
                              printCheckToDriver
                            }
                          />
                        </Col>
                      </Form.Group>
                      {/* Name */}
                      <Form.Group className={`mt-5 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 `}>
                        <Col sm={4} md={4} xs={4} className="p-0">
                          <Form.Label htmlFor="name" className="col-form-label dealer-label">
                            Pay To The Order of
                          </Form.Label>
                        </Col>
                        <Col xs={7} md={7} className="p-0 me-2">
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                            }}
                            disabled={!printCheck || printCheckToDriver || checkPayToFK || checkPayToInput}
                            maxLength={30}

                            className={`customFormControl ${
                              printCheckToDriver || checkPayToFK || checkPayToInput
                                ? ""
                                : printCheck
                                  ? name
                                    ? "borderGreen"
                                    : "borderRed"
                                  : ""
                            }`}
                          />
                        </Col>
                      </Form.Group>
                      {/* Address1 */}
                      <Form.Group className={`mt-2 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 `}>
                        <Col sm={4} md={4} xs={4} className="p-0">
                          <Form.Label htmlFor="address1" className="col-form-label dealer-label"></Form.Label>
                        </Col>
                        <Col xs={7} md={7} className="p-0 me-2">
                          <Input
                            id="ad1"
                            name="ad1"
                            type="text"
                            value={address1}
                            onChange={(e) => {
                              setAddress1(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                            }}
                            disabled={!printCheck || printCheckToDriver || checkPayToFK || checkPayToInput}
                            maxLength={30}

                            className={`customFormControl ${
                              printCheckToDriver || checkPayToFK || checkPayToInput
                                ? ""
                                : printCheck
                                  ? address1
                                    ? "borderGreen"
                                    : "borderRed"
                                  : ""
                            }`}
                            spellCheck={false}
                          />
                        </Col>
                      </Form.Group>
                      {/* Address2 */}
                      <Form.Group className={`mt-2 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 `}>
                        <Col sm={4} md={4} xs={4} className="p-0">
                          <Form.Label htmlFor="address2" className="col-form-label dealer-label"></Form.Label>
                        </Col>
                        <Col xs={7} md={7} className="p-0 me-2">
                          <Input
                            id="ad2"
                            name="ad2"
                            type="text"
                            value={address2}
                            disabled={!printCheck || printCheckToDriver || checkPayToFK || checkPayToInput}
                            maxLength={30}
                            onChange={(e) => {
                              setAddress2(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                            }}
                            className={`customFormControl`}
                            spellCheck={false}
                          />
                        </Col>
                      </Form.Group>
                      <PostalCodeComponent
                        hideLabel
                        disabled={
                          !printCheck || printCheckToDriver || checkPayToFK || checkPayToInput ? true : false
                        }
                        city={checkPayToFK ? checkPayToData?.city?.trim() : city}
                        setCity={setCity}
                        stateCode={checkPayToFK ? checkPayToData?.stateCode?.trim() : statecode}
                        setStateCode={setStateCode}
                        postalCode={checkPayToFK ? checkPayToData?.postalCode?.trim() : postalcode}
                        setPostalCode={setPostalCode}
                        setPostalValues={setPostalValues}
                        postalOptions={postalOptions}
                        postalCodePK={postalCodePK}
                        setPostalCodePK={setPostalCodePK}
                        canadian={canadian}
                        setCanadian={setCanadian}
                        stateInputWidth={"55px"}
                        zipInputWidth={"100px"}
                        labelColNumber={4}
                      />
                    </Col>
                    <Col xs={12} className="ps-3">
                      <Form.Group className={`mt-3 m-b-10 align-items-start row  m-l-0 m-r-0 `}>
                        <Col sm={2} md={2} xs={2} className="p-0">
                          <Form.Label htmlFor="name" className="col-form-label dealer-label">
                            Reason
                          </Form.Label>
                        </Col>

                        <Col xs={9} md={9} className="p-0 me-2">
                          <textarea
                            rows={4}
                            cols={10}
                            type="text"
                            className={`customFormControl h-100 w-100 customFocusClass ${
                              reason && reason.length >= 1 ? "borderGreen" : "borderRed"
                            } `}
                            id="reason"
                            name="reason"
                            value={reason}
                            onChange={(e) => {
                              setReason(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                            }}
                            autoComplete="newpassword"
                            aria-autocomplete="none"
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
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DriverBondFundContent;
