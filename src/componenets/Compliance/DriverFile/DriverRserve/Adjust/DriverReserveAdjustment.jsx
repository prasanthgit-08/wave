import React, { useEffect, useState } from "react";
import QuarterScreenWrapper from "../../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../../common/Header";
import CommonFooter from "../../../../common/CommonFooter";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import PostalCodeComponent from "../../../../common/PostalCodeComponent";
import { useNavigate, useParams } from "react-router-dom";
import DriverReserveService from "../../../../../services/DriverReserveService";
import { useDispatch, useSelector } from "react-redux";
import {
  setReserveAdjustData,
  toggleCancelChanges,
  setReserveAdjustPayload,
} from "../../../../../redux/DriverReserveSlice";
import CustomRadioGroup from "../../../../common/CustomRadioGroup";
import DriverBondFundService from "../../../../../services/DriverBondFundService";
import CheckPayToLookup from "../../../../LookupScreens/CheckPayTo/CheckPayToLookup";
import { PermissionKeyGeneratorUtil } from "../../../../../utils/PermissionKeyGeneratorUtil";
import { preventNegative } from "../../../../../utils/utils";
import LoadingIcon from "../../../../common/LoadingIcon";
import CheckPayToService from "../../../../../services/CheckPayToService";
import ModalComponent from "../../../../common/ModalComponent";
import toast from "react-hot-toast";
import Input from "../../../../../components/common/input";

const DriverReserveAdjustment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, driverFK } = useParams();

  const reserveAdjustData = useSelector((state) => state.driverReserveReducer.reserveAdjustData);
  const reserveAdjustPayload = useSelector((state) => state.driverReserveReducer.reserveAdjustPayload);
  const cancelChanges = useSelector((state) => state.driverReserveReducer.cancelChanges);

  const [loading, setLoading] = useState(true);
  const [disableSave, setDisableSave] = useState(true);
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
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [loader, setLoader] = useState(false);

  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermission = PermissionKeyGeneratorUtil("DRIVERRESERVES", "edit");
  const [editIsDenied, seteditIsDenied] = useState(false);
  const [checkPaytoLoading, setCheckPaytoLoading] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [changesCancelled, setChangesCancelled] = useState(false);
  const isNegativeReserveDenied = editIsDenied;

  const isRadioButtonDisabled =
    editIsDenied &&
    (Number(reserveAdjustData?.AccumulatedReserve) < 0 || Number(reserveAdjustData?.CurrentAmount) < 0);

  /*******
   * Save and Adjust Driver Reserve
   * ******/
  const handleSave = () => {
    setLoading(true);
    DriverReserveService.saveandAdjustDriverReserve(reserveAdjustPayload)
      .then((response) => {
        dispatch(toggleCancelChanges(true));
        setChangesCancelled(true);
        navigate(`/driver-reserve-adjustment/${driverFK}/${id}`);
        toast.success("Driver Reserve Funds Created");
      })
      .catch((error) => {
        dispatch(toggleCancelChanges(true));
        setChangesCancelled(true);
        navigate(`/driver-reserve-adjustment/${driverFK}/${id}`);
        toast.error("Failed to Create Driver Reserve Fund");
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
      setChangesCancelled(false);
      fetchReserveAdjust();
    }
  }, [changesCancelled]);

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    dispatch(toggleCancelChanges(true));
    setChangesCancelled(true);
    navigate(`/driver-reserve-adjustment/${driverFK}/${id}`);
    setCancelShow(false);
    toast.success("Changes cancelled");
  };

  /******Get the Check Pay to Details****/
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

  /*******
   * Get the detail of Reserve Record
   * ******/
  const fetchReserveAdjust = () => {
    setLoading(true);
    DriverReserveService.getReserveAdjust({
      driverReservePK: id,
    })
      .then((response) => {
        const data = response?.data[0];
        dispatch(setReserveAdjustData(data));
        if (
          !isNegativeReserveDenied &&
          (Number(data?.AccumulatedReserve) < 0 ||
            Number(data?.CurrentAmount) < 0 ||
            (Number(data?.AccumulatedReserve) < 0 && Number(data?.CurrentAmount) < 0))
        ) {
          setRadioValue("add");
        }
      })
      .catch((error) => {})
      .finally(() => setLoading(false));
  };

  const handleCheckPayToLookupSelection = (checkPayTo) => {
    setCheckPayToFK(checkPayTo.id);
    setCheckPayToInput(checkPayTo.description?.trim());
    setShowCheckPayToLookup(false);
    setCheckPayFlag(true);
  };

  /*****
   * Setting The Adjustment Amount
   ******/
  const handleAdjustmentAmountChange = (e) => {
    if (
      radioValue === "subtract" &&
      isNegativeReserveDenied &&
      Number(reserveAdjustData?.AccumulatedReserve) > 0 &&
      Number(reserveAdjustData?.CurrentAmount) > 0
    ) {
      const minValue = Math.min(
        Number(reserveAdjustData?.ReserveAmount),
        Number(reserveAdjustData?.CurrentAmount)
      );
      if (Number(e.target.value) > Number(minValue)) {
        setAdjustmentAmount(minValue);
      } else {
        setAdjustmentAmount(preventNegative(e.target.value));
      }
    } else {
      setAdjustmentAmount(preventNegative(e.target.value));
    }
  };

  /*****Set the data from Checkpayto */
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

  /****Save Validation****/
  useEffect(() => {
    if (
      Number(adjustmentAmount) > 0 &&
      reason &&
      (!postToDriversPay ||
        (postToDriversPay && !printCheck) ||
        (postToDriversPay && printCheck && printCheckToDriver) ||
        (postToDriversPay && printCheck && checkPayToFK && name && address1 && postalCodePK) ||
        (postToDriversPay && printCheck && name && address1 && postalCodePK))
    ) {
      /**enable save if all conditions**/
      setDisableSave(false);
    } else {
      /***disable save***/
      setDisableSave(true);
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

  useEffect(() => {
    fetchCheckPayToById(checkPayToFK);
  }, [checkPayToFK]);

  useEffect(() => {
    fetchReserveAdjust();
  }, []);

  /****Clear the address fields if checkpay auto complete is empty *****/
  useEffect(() => {
    if (!checkPayToFK || checkPayToInput === "") {
      setName("");
      setAddress1("");
      setAddress2("");
      setCity("");
      setPostalCode("");
      setStateCode("");
      setPostalCodePK(null);
    }
  }, [checkPayToFK, checkPayToInput]);

  /*****Clear States is post to driver is false****/
  useEffect(() => {
    if (!postToDriversPay) {
      setName("");
      setAddress1("");
      setAddress2("");
      setCity("");
      setPostalCode("");
      setStateCode("");
      setPostalCodePK(null);
      setPrintCheck(false);
      setPrintCheckToDriver(false);
      setCheckPayToInput("");
      setCheckPayToFK(null);
    }
  }, [postToDriversPay]);

  /****
   * Clear the address fields if add is
   * selected from subtract
   * ****/
  useEffect(() => {
    if (radioValue === "add") {
      setName("");
      setAddress1("");
      setAddress2("");
      setCity("");
      setPostalCode("");
      setStateCode("");
      setPostalCodePK(null);
      setPrintCheck(false);
      setCheckPayToFK(null);
      setCheckPayToInput("");
      setPrintCheckToDriver(false);
    }
  }, [radioValue]);

  useEffect(() => {
    if (cancelChanges) {
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
      dispatch(toggleCancelChanges(false));
    }
  }, [cancelChanges]);

  /**Creation of Driver Bond Fund Object */
  useEffect(() => {
    dispatch(
      setReserveAdjustPayload({
        driverReservePK: id,
        accumulatedReserve: reserveAdjustData?.AccumulatedReserve,
        currentAmount: reserveAdjustData?.CurrentAmount,
        add: radioValue === "add" ? 1 : 0,
        subtract: radioValue === "subtract" ? 1 : 0,
        amount: adjustmentAmount,
        reason: reason,
        postToDriver: postToDriversPay ? 1 : 0,
        printCheck: printCheck ? 1 : 0,
        canadian: canadian ? 1 : 0,
        printCheckToDriver: printCheckToDriver ? 1 : 0,
        name: name ? name : "",
        address1: address1 ? address1 : "",
        address2: address2 ? address2 : "",
        city: city ? city : "",
        statecode: statecode ? statecode : "",
        postalcode: postalcode ? postalcode : "",
      })
    );
  }, [
    id,
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
    // editIsDenied,
  ]);

  const buttons = [
    {
      label: "Save",
      onClick: handleSave,
      disabled: disableSave,
    },
    {
      label: "Cancel",
      onClick: () => {
        setCancelShow(true);
      },
    },
  ];

  /*****Setting the edit permission for buttons****/
  useEffect(() => {
    if (deniedPermissions) {
      seteditIsDenied(deniedPermissions.includes(editPermission));
    }
  }, [deniedPermissions, editPermission]);

  return (
    <QuarterScreenWrapper>
      {loading && <LoadingIcon />}
      <Header
        confirmClose
        closeNavigationURL={`/driver-reserve-main/${driverFK}/${id}`}
        programName="Driver Reserve Adjustment"
        closeModalBody="Please confirm you want to close the program without Processing"
      />{" "}
      <div className="w-100 p-1">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-2 w-100 mt-0">
              <Row>
                <Col xs={6}>
                  <Form.Group className=" mt-2 form-group  align-items-center row m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className="customColFormLabel">Description</Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <Input
                        name="description"
                        id="description"
                        type="text"
                        className={`customFormControl`}
                        value={reserveAdjustData?.Description}
                        disabled
                        maxLength={30}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className=" mt-2 form-group  align-items-center row m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className="customColFormLabel">Used For</Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0">
                      <Input
                        name="description"
                        id="description"
                        type="text"
                        className={`customFormControl`}
                        value={reserveAdjustData?.UsedFor}
                        disabled
                        maxLength={30}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className={` mt-2 align-items-center row  m-l-0 m-r-0 mt-0`}>
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label htmlFor="accumulatedBond" className="col-form-label">
                        Accumulated Reserve
                      </Form.Label>
                    </Col>
                    <Col xs={3} md={3} sm={3} className="p-0">
                      <Input
                        className={`customFormControl`}
                        id="accumulatedBond"
                        name="accumulatedBond"
                        type="search"
                        value={reserveAdjustData?.AccumulatedReserve}
                        disabled
                        maxLength={8}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label htmlFor="awardAmount" className="col-form-label">
                        Reserve Amount
                      </Form.Label>
                    </Col>
                    <Col xs={3} md={3} sm={3} className="p-0">
                      <Input
                        className={`customFormControl`}
                        id="reserveBond"
                        name="reserveBond"
                        type="search"
                        value={reserveAdjustData?.ReserveAmount}
                        disabled
                        maxLength={8}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label htmlFor="currentAmount" className="col-form-label">
                        Current Amount
                      </Form.Label>
                    </Col>
                    <Col xs={3} md={3} sm={3} className="p-0">
                      <Input
                        className={`customFormControl`}
                        id="currentAmount"
                        name="currentAmount"
                        type="search"
                        value={reserveAdjustData?.CurrentAmount}
                        disabled
                        maxLength={8}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label htmlFor="adjustmentAmount" className="col-form-label">
                        Adjustment Amount
                      </Form.Label>
                    </Col>
                    <Col xs={3} md={3} sm={3} className="p-0">
                      <Input
                        className={`customFormControl ${
                          Number(adjustmentAmount) > 0 ? "borderGreen" : "borderRed"
                        }`}
                        id="adjustmentAmount"
                        name="adjustmentAmount"
                        type="search"
                        value={adjustmentAmount}
                        onChange={handleAdjustmentAmountChange}
                        maxLength={8}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label htmlFor="adjustmentAmount" className="col-form-label m-l-100"></Form.Label>
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
                        disabled={isRadioButtonDisabled}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-2 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Post To Drivers Pay </Form.Label>
                    </Col>
                    <Col xs={2} md={2} sm={2} className="p-0">
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 `}
                        name="postToDriversPay"
                        value={postToDriversPay}
                        checked={postToDriversPay}
                        onChange={(e) => setPostToDriversPay(e.target.checked)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-2 m-b-15 align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Print Check </Form.Label>
                    </Col>
                    <Col xs={2} md={2} sm={2} className="p-0">
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 `}
                        name="emailSelection"
                        value={printCheck}
                        checked={printCheck}
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
                        disabled={!(radioValue === "subtract" && postToDriversPay)}
                      />
                    </Col>
                  </Form.Group>
                </Col>

                <Col xs={6}>
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Print Check To driver </Form.Label>
                    </Col>
                    <Col xs={2} md={2} sm={2} className="p-0">
                      <input
                        type="checkbox"
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
                        name="emailSelection"
                        value={printCheckToDriver}
                        checked={printCheckToDriver}
                        onChange={(e) => setPrintCheckToDriver(e.target.checked)}
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
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col xs={4} md={4} sm={4} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Check Pay To</Form.Label>
                    </Col>
                    <Col xs={7} md={7} sm={7} className={`p-0 d-flex`}>
                      <AutoCompleteDropdown
                        arrayList={checkPayToList}
                        searchString={checkPayToInput}
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
                        disabled={
                          !printCheck ||
                          (!checkPayFlag &&
                            (address1 || address2 || name || postalcode || city || statecode)) ||
                          printCheckToDriver
                        }
                        customFormatSearchString={(searchString) => searchString}
                        renderItemId={(checkPayTo) => checkPayTo.id}
                        renderItemField={(checkPayTo) => checkPayTo.description}
                        handleSearchString={(string) => setCheckPayToInput(string)}
                        fetchDataBySearchString={fetchCheckPayToByName}
                        loading={checkPaytoLoading}
                        onSelect={handleCheckPayToLookupSelection}
                        clearInputCallback={() => {
                          setCheckPayToFK(null);
                          setCheckPayFlag(false);
                        }}
                        selectedId={checkPayToFK}
                      />
                      <LookupButton
                        onClick={() => setShowCheckPayToLookup(true)}
                        disabled={
                          !printCheck ||
                          (!checkPayFlag &&
                            (address1 || address2 || name || postalcode || city || statecode)) ||
                          printCheckToDriver
                        }
                      />
                      <CheckPayToLookup
                        show={showCheckPayToLookup}
                        onHide={() => setShowCheckPayToLookup(false)}
                        renderItemId={(checkPayTo) => checkPayTo.checkPayToPK}
                        MaintenanceProgram
                        handleLookupSelection={handleCheckPayToLookupSelection}
                      />
                    </Col>
                  </Form.Group>

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
                        className={`customFormControl ${
                          printCheck
                            ? printCheckToDriver || checkPayToFK || checkPayToInput
                              ? ""
                              : name
                                ? "borderGreen"
                                : "borderRed"
                            : ""
                        }`}
                        disabled={!printCheck || printCheckToDriver || checkPayToFK || checkPayToInput}
                        maxLength={30}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                      />
                    </Col>
                  </Form.Group>
                  {/* Address1 */}
                  <Form.Group className={`mt-3 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 `}>
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
                        className={`customFormControl ${
                          printCheck
                            ? printCheckToDriver || checkPayToFK || checkPayToInput
                              ? ""
                              : address1
                                ? "borderGreen"
                                : "borderRed"
                            : ""
                        }`}
                        disabled={!printCheck || printCheckToDriver || checkPayToFK || checkPayToInput}
                        maxLength={30}
                        autoComplete="one-time-code"
                        aria-autocomplete="list"
                        spellCheck={false}
                      />
                    </Col>
                  </Form.Group>
                  {/* Address2 */}
                  <Form.Group className={`mt-3 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 `}>
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label htmlFor="address2" className="col-form-label dealer-label"></Form.Label>
                    </Col>
                    <Col xs={7} md={7} className="p-0 me-2">
                      <Input
                        id="ad2"
                        name="ad2"
                        type="text"
                        value={address2}
                        className={`customFormControl`}
                        disabled={!printCheck || printCheckToDriver || checkPayToFK || checkPayToInput}
                        maxLength={30}
                        autoComplete="one-time-code"
                        aria-autocomplete="list"
                        onChange={(e) => {
                          setAddress2(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                        }}
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
                    zipInputWidth={"95px"}
                    labelColNumber={4}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className={`mt-2 m-b-10 align-items-center row  m-l-0 m-r-0`}>
                    <Col xs={2} md={2} sm={2} className="p-0" style={{ height: "100px" }}>
                      <Form.Label htmlFor="name" style={{ marginTop: "0px" }} className=" ">
                        Reason
                      </Form.Label>
                    </Col>

                    <Col sm={9} md={9} xs={9} className="p-0">
                      <textarea
                        rows={3}
                        cols={20}
                        type="text"
                        className={`customFormControl ${reason ? "borderGreen" : "borderRed"}`}
                        id="reason"
                        name="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        style={{
                          resize: "none",
                          display: "fixed",
                          minHeight: "100px",
                          minWidth: "610px",
                          boxShadow: "none",
                          fontSize: "12px",
                          overflowY: "auto",
                          outline: "none",
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      <CommonFooter buttons={buttons} />
      {/* edit Cancel Confirmation Modal */}
      <ModalComponent
        show={cancelShow}
        onHide={handleCancelNo}
        title={"Cancel Driver Reserve Adjustment Changes"}
        body={"Please confirm you want to cancel your changes"}
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />
    </QuarterScreenWrapper>
  );
};

export default DriverReserveAdjustment;
