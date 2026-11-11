import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PlantToPlantTransferService from "../../../../services/PlantToPlantTransferService";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import {
  setCustomerId,
  setSaveData,
  setSaveDisable,
  setViewDetail,
} from "../../../../redux/PlantToPlantTransferSlice";
import CustomerPlantsLookup from "../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import toast from "react-hot-toast";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { correctDecimalInputOnBlur, isOnlyDot } from "../../../../utils/utils";
import LoadingIcon from "../../../common/LoadingIcon";
import { useAppNavigate } from "../../../../hooks/useAppNavigate";
import Input from "../../../../components/common/input";
function FormContent({ id, customerId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { goBack } = useAppNavigate();

  const active = true;
  const type = "Autocomplete";
  const size = 100;
  const page = 0;
  const isPlantToPlantTransfer = true;
  const searchCriteria = "Beginning";
  const [customerFK, setCustomerFK] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [plantOneId, setPlantOneId] = useState(null);
  const [plantOneName, setPlantOneName] = useState("");
  const [plantTwoId, setPlantTwoId] = useState(null);
  const [plantTwoName, setPlantTwoName] = useState("");
  const [motorizedInvoiceAmount, setMotorizedInvoiceAmount] = useState("");
  const [motorizedShuttleFee, setMotorizedShuttleFee] = useState("");
  const [miles, setMiles] = useState(0);
  const [towableInvoiceAmount, setTowableInvoiceAmount] = useState("");
  const [towableCDLInvoiceAmount, setTowableCDLInvoiceAmount] = useState("");
  const [towableShuttleFee, setTowableShuttleFee] = useState("");
  const [towableCDLShuttleFee, setTowableCDLShuttleFee] = useState("");
  const [customerPlants, setCustomerPlants] = useState([]);
  const [plantOneSelection, setPlantOneSelection] = useState(false);
  const [plantTwoSelection, setPlantTwoSelection] = useState(false);
  const [existingPlantCombination, setExistingPlantCombination] = useState(false);
  const [checkingIsExists, setCheckingIsExists] = useState(false);

  const viewDetail = useSelector((state) => state.plantToPlantTransferReducer.viewDetail);
  const customerIdRedux = useSelector((state) => state.plantToPlantTransferReducer.customerId);
  const [loading, setLoading] = useState(false);

  const [plantLoading, setPlantLoading] = useState(false);
  const saveData = useSelector((state) => state.plantToPlantTransferReducer.saveData);
  // fetch details by id
  const getPlantToPlantTransferById = () => {
    setLoading(true);
    PlantToPlantTransferService.getPlantToPlantTransferById(id)
      .then((response) => {
        const data = response.data;
        dispatch(setCustomerId(data.customerIntFK));
        setCustomerName(data.customerName);
        // setCustomerFK(data.)
        setPlantOneId(data.customerPlant1FK.customerPlantPK);
        setPlantOneName(data.customerPlant1FK.name);
        setPlantTwoId(data.customerPlant2FK.customerPlantPK);
        setPlantTwoName(data.customerPlant2FK.name);
        setMotorizedInvoiceAmount(
          Number(data.motorizedInvoiceAmount) === 0 ? "" : data.motorizedInvoiceAmount.toFixed(2)
        );
        setMotorizedShuttleFee(
          Number(data.motorizedShuttleFee) === 0 ? "" : data.motorizedShuttleFee.toFixed(2)
        );
        setMiles(data.miles);
        setTowableInvoiceAmount(
          Number(data.towableInvoiceAmount) === 0 ? "" : data.towableInvoiceAmount.toFixed(2)
        );
        setTowableCDLInvoiceAmount(
          Number(data.towableCDLInvoiceAmount) === 0 ? "" : data.towableCDLInvoiceAmount.toFixed(2)
        );
        setTowableShuttleFee(Number(data.towableShuttleFee) === 0 ? "" : data.towableShuttleFee.toFixed(2));
        setTowableCDLShuttleFee(
          Number(data.towableCDLShuttleFee) === 0 ? "" : data.towableCDLShuttleFee.toFixed(2)
        );
      })
      .catch((error) => {
        setTimeout(() => {
          goBack();
        }, 500);
        console.error(error.response.data.errorMsg || "Error at fetching data");
        toast.error(error.response.data.errorMsg || "Error at fetching data");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // fetch customer name
  const getCustomerName = () => {
    PlantToPlantTransferService.getCustomerName(customerId)
      .then((response) => {
        setCustomerName(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.errorMsg || "Error while fetching customer name");
        toast.error(error.response.data.errorMsg || "Error while fetching customer name");
      });
  };

  // fetch customer plants
  const fetchCustomerPlantDetails = (searchTerm) => {
    setPlantLoading(true);
    PlantToPlantTransferService.fetchCustomerPlantDetails(
      customerIdRedux,
      searchTerm,
      active,
      type,
      size,
      page,
      isPlantToPlantTransfer,
      searchCriteria
    )
      .then((response) => {
        const data = response.data.content;
        const plant = data?.map((plant) => ({
          ...plant,
          name: plant?.name?.trim(),
        }));
        setCustomerPlants(plant);
      })
      .catch((error) => {
        console.error(error.response.data.errorMsg);
        setPlantLoading(false);
      })
      .finally(() => {
        setPlantLoading(false);
      });
  };

  // check existing plant to plant combination
  const checkExistingPlantCombination = () => {
    PlantToPlantTransferService.checkExistingPlantCombination(plantOneId, plantTwoId, customerIdRedux)
      .then((response) => {
        setExistingPlantCombination(response.data);
        setCheckingIsExists(false);
      })
      .catch((error) => {
        toast.error(error.response.data.errorMsg || "Error at checking existing plant to plant combination");
        console.error(
          error.response.data.errorMsg || "Error at checking existing plant to plant combination"
        );
      });
  };
  useEffect(() => {
    if (plantOneId && plantTwoId) {
      if (!viewDetail) {
        setCheckingIsExists(true);
        checkExistingPlantCombination();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plantOneId, plantTwoId]);

  useEffect(() => {
    dispatch(
      setSaveData({
        plantToPlantTransfersPK: Number(id) || "",
        customerIntFK: Number(customerIdRedux) || "",
        customerPlant1IntFK: Number(plantOneId) || "",
        customerPlant2IntFK: Number(plantTwoId) || "",
        towableInvoiceAmount: Number(towableInvoiceAmount),
        towableCDLInvoiceAmount: Number(towableCDLInvoiceAmount),
        towableShuttleFee: Number(towableShuttleFee),
        towableCDLShuttleFee: Number(towableCDLShuttleFee),
        motorizedInvoiceAmount: Number(motorizedInvoiceAmount),
        motorizedShuttleFee: Number(motorizedShuttleFee),
        miles: Number(miles) || 0,
      })
    );
    const motorizedFilled =
      Boolean(String(motorizedInvoiceAmount ?? "")?.trim()) &&
      Number(motorizedInvoiceAmount) !== 0 &&
      !isOnlyDot(motorizedInvoiceAmount) &&
      Boolean(String(motorizedShuttleFee ?? "")?.trim()) &&
      Number(motorizedShuttleFee) !== 0 &&
      !isOnlyDot(motorizedShuttleFee);
    const towableFilled =
      Boolean(String(towableInvoiceAmount ?? "")?.trim()) &&
      Number(towableInvoiceAmount) !== 0 &&
      !isOnlyDot(towableInvoiceAmount) &&
      Boolean(String(towableCDLInvoiceAmount ?? "")?.trim()) &&
      Number(towableCDLInvoiceAmount) !== 0 &&
      !isOnlyDot(towableCDLInvoiceAmount) &&
      Boolean(String(towableShuttleFee ?? "")?.trim()) &&
      Number(towableShuttleFee) !== 0 &&
      !isOnlyDot(towableShuttleFee) &&
      Boolean(String(towableCDLShuttleFee ?? "")?.trim()) &&
      Number(towableCDLShuttleFee) !== 0 &&
      !isOnlyDot(towableCDLShuttleFee);

    if (
      !existingPlantCombination &&
      customerIdRedux &&
      plantOneId &&
      plantTwoId &&
      miles > 0 &&
      miles <= 32767
    ) {
      if (!checkingIsExists) {
        dispatch(setSaveDisable(false));
      }
      if (motorizedFilled && towableFilled) {
        dispatch(setSaveDisable(true));
      } else if (
        motorizedFilled &&
        towableInvoiceAmount === "" &&
        towableCDLInvoiceAmount === "" &&
        towableShuttleFee === "" &&
        towableCDLShuttleFee === ""
      ) {
        dispatch(setSaveDisable(true));
      } else if (towableFilled && motorizedInvoiceAmount === "" && motorizedShuttleFee === "") {
        dispatch(setSaveDisable(true));
      } else dispatch(setSaveDisable(false));
    } else {
      dispatch(setSaveDisable(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    customerId,
    customerIdRedux,
    plantOneId,
    plantTwoId,
    towableInvoiceAmount,
    towableCDLInvoiceAmount,
    towableShuttleFee,
    towableCDLShuttleFee,
    motorizedInvoiceAmount,
    motorizedShuttleFee,
    miles,
    existingPlantCombination,
    checkingIsExists,
  ]);

  useEffect(() => {
    if (viewDetail && id) {
      getPlantToPlantTransferById();
      dispatch(setViewDetail(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewDetail, id]);

  useEffect(() => {
    dispatch(setCustomerId(customerId || null));
    if (customerId) {
      getCustomerName();
      dispatch(setViewDetail(false));
    } else {
      dispatch(setViewDetail(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-100 p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="p-15 w-100">
          <Col sm={6} md={6} lg={6} xl={6} xs={6} className="ms-3">
            <Form.Group className="form-group mt-3  align-items-center row  m-l-0 m-r-0">
              <Col xs={5} sm={5} md={5} className="p-0 text-start">
                <Form.Label htmlFor="customer" className="col-form-label me-4">
                  {t("plantToPlantTransfers.listing.page.table.heading.customer")}
                </Form.Label>
              </Col>
              <Col xs={7} md={7} sm={7} className="p-0">
                <Input
                  className="plantToPlantFromDisabled h-25"
                  name="customer"
                  type="text"
                  maxLength={30}

                  value={customerName || ""}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4   align-items-center row  m-l-0 m-r-0">
              <Col xs={5} sm={5} md={5} className="p-0 text-start">
                <Form.Label htmlFor="plantOne" className="col-form-label  me-2">
                  {t("plantToPlantTransfers.listing.page.table.heading.plantOne")}
                </Form.Label>
              </Col>
              <Col xs={7} md={7} sm={7} className="p-0 d-flex">
                <AutoCompleteDropdown
                  arrayList={customerPlants}
                  searchString={plantOneName}
                  renderItemId={(customerPlant) => customerPlant.customerPlantPK}
                  renderItemField={(customerPlant) => customerPlant.name}
                  handleSearchString={(string) => setPlantOneName(string)}
                  fetchDataBySearchString={fetchCustomerPlantDetails}

                  onSelect={(plant) => {
                    if (plantTwoId) setCheckingIsExists(true);
                    setPlantOneId(plant.customerPlantPK);
                    setPlantOneName(plant.name);
                  }}
                  selectedId={plantOneId}
                  loading={plantLoading}
                  clearInputCallback={() => {
                    setPlantOneId(null);
                  }}
                  className={`${
                    id ? "" : plantOneId !== null && !existingPlantCombination ? "borderGreen" : "borderRed"
                  }`}
                  disabled={viewDetail || id ? true : false}
                />
                <LookupButton
                  disabled={viewDetail || id ? true : false}
                  onClick={() => setPlantOneSelection(true)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4   align-items-center row  m-l-0 m-r-0">
              <Col sm={5} md={5} xs={5} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label  me-4">
                  {t("plantToPlantTransfers.listing.page.table.heading.plantTwo")}
                </Form.Label>
              </Col>
              <Col xs={7} md={7} sm={7} className="p-0 d-flex">
                <AutoCompleteDropdown
                  arrayList={customerPlants}
                  searchString={plantTwoName}
                  renderItemId={(customerPlant) => customerPlant.customerPlantPK}
                  renderItemField={(customerPlant) => customerPlant.name}
                  handleSearchString={(string) => setPlantTwoName(string)}
                  fetchDataBySearchString={fetchCustomerPlantDetails}
                  onSelect={(plant) => {
                    if (plantOneId) setCheckingIsExists(true);
                    setPlantTwoId(plant.customerPlantPK);
                    setPlantTwoName(plant.name);
                  }}
                  selectedId={plantTwoId}
                  loading={plantLoading}
                  clearInputCallback={() => {
                    setPlantTwoId(null);
                  }}
                  className={`${
                    id ? "" : plantTwoId !== null && !existingPlantCombination ? "borderGreen" : "borderRed"
                  }`}
                  disabled={viewDetail || id ? true : false}
                />
                <LookupButton
                  disabled={viewDetail || id ? true : false}
                  onClick={() => setPlantTwoSelection(true)}
                />
              </Col>
            </Form.Group>
            <Form.Group className=" mt-1   align-items-center row  m-l-0 m-r-0">
              <Col sm={5} md={5} xs={5} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label  me-4"></Form.Label>
              </Col>
            </Form.Group>
          </Col>

          <Row className=" p-0 ms-3">
            <Col sm={6} md={6} lg={6} xl={6} xs={6} className="ps-0">
              <Form.Group className="form-group mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={5} sm={5} md={5} className="p-0 text-start">
                  <Form.Label htmlFor="motorizedInvoiceAmount" className="col-form-label me-4">
                    {t("plantToPlantTransfers.add.page.field.motorizedInvoiceAmount")}
                  </Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="p-0 ms-2">
                  <Input
                    className={`form-control h-25  ${
                      !viewDetail
                        ? !motorizedInvoiceAmount
                          ? towableInvoiceAmount ||
                            towableCDLInvoiceAmount ||
                            towableShuttleFee ||
                            towableCDLShuttleFee
                            ? motorizedShuttleFee
                              ? "borderRed"
                              : ""
                            : "borderRed"
                          : Number(motorizedInvoiceAmount) === 0 || isOnlyDot(motorizedInvoiceAmount)
                            ? "borderRed"
                            : "borderGreen"
                        : ""
                    }`}
                    name="motorizedInvoiceAmount"
                    type="text"
                    maxLength={8}
                    value={motorizedInvoiceAmount || ""}
                    onBeforeInput={(e) => {
                      const inputValue = e.target.value;
                      const selectionStart = e.target.selectionStart;
                      const selectionEnd = e.target.selectionEnd;
                      const newValue =
                        inputValue.slice(0, selectionStart) + e.data + inputValue.slice(selectionEnd);

                      const validFormat = /^(?!0\d)\d{0,6}(\.\d{0,2})?$/; // allows numbers like 0, 0., 123456.78
                      const startsWithZeroFollowedByDigit = /^0\d/;

                      if (
                        (!startsWithZeroFollowedByDigit.test(newValue) && !validFormat.test(newValue)) ||
                        (startsWithZeroFollowedByDigit.test(newValue) &&
                          newValue.length > 8 &&
                          newValue[1] !== ".") ||
                        parseFloat(newValue) > 999999.99
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "." || /^\d{0,5}(\.\d{0,2})?$/.test(val)) {
                        setMotorizedInvoiceAmount(val);
                      }
                    }}
                    onBlur={() =>
                      setMotorizedInvoiceAmount(correctDecimalInputOnBlur(motorizedInvoiceAmount))
                    }
                    disabled={viewDetail}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group mt-4  align-items-center row  m-l-0 m-r-0">
                <Col xs={5} sm={5} md={5} className="p-0 text-start">
                  <Form.Label htmlFor="motorizedShuttleFee" className="col-form-label me-4">
                    {t("plantToPlantTransfers.add.page.field.motorizedShuttleFee")}
                  </Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="p-0 ms-2">
                  <Input
                    className={`form-control h-25  ${
                      !viewDetail
                        ? !motorizedShuttleFee
                          ? towableInvoiceAmount ||
                            towableCDLInvoiceAmount ||
                            towableShuttleFee ||
                            towableCDLShuttleFee
                            ? motorizedInvoiceAmount
                              ? "borderRed"
                              : ""
                            : "borderRed"
                          : Number(motorizedShuttleFee) === 0 || isOnlyDot(motorizedShuttleFee)
                            ? "borderRed "
                            : "borderGreen"
                        : ""
                    }`}
                    name="motorizedShuttleFee"
                    type="text"
                    maxLength={8}

                    value={motorizedShuttleFee || ""}
                    onBeforeInput={(e) => {
                      const inputValue = e.target.value;
                      const selectionStart = e.target.selectionStart;
                      const selectionEnd = e.target.selectionEnd;
                      const newValue =
                        inputValue.slice(0, selectionStart) + e.data + inputValue.slice(selectionEnd);

                      // Define the regex patterns for validation
                      const validFormat = /^(?!0\d)\d{0,6}(\.\d{0,2})?$/; // Matches up to 6 digits optionally followed by a decimal point and up to 2 decimal digits
                      const startsWithZeroFollowedByDigit = /^0\d/; // Matches if the new value starts with '0' followed by another digit

                      // Check if the new value adheres to the format and doesn't start with '0' followed by a non-zero digit unless it is '0.'
                      if (
                        (!startsWithZeroFollowedByDigit.test(newValue) && !validFormat.test(newValue)) || // Ensure the new value adheres to the valid format
                        (startsWithZeroFollowedByDigit.test(newValue) &&
                          newValue.length > 8 &&
                          newValue[1] !== ".") || // Allow '0.' but not '0' followed by other digits
                        parseFloat(newValue) > 999999.99 // Check if the parsed float value exceeds the maximum allowed value
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setMotorizedShuttleFee(e.target.value);
                    }}
                    onBlur={() => setMotorizedShuttleFee(correctDecimalInputOnBlur(motorizedShuttleFee))}
                    disabled={viewDetail}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group invisible mt-4 m-b-10 align-items-center row  m-l-0 m-r-0">
                <Col xs={6} sm={6} md={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label"></Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0">
                  <Input />
                </Col>
              </Form.Group>

              <Form.Group className="form-group mt-4  align-items-center row  m-l-0 m-r-0">
                <Col xs={5} sm={5} md={5} className="p-0 text-start">
                  <Form.Label htmlFor="miles" className="col-form-label me-4">
                    {t("YardTOYardShuttle.add.page.field.miles")}
                  </Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0 w-50px">
                  <Input
                    className={`${"form-control ms-2 h-25 "} ${
                      viewDetail ? "" : miles > 0 ? "borderGreen" : "borderRed"
                    }`}
                    name="miles"
                    type="text"
                    maxLength={5}

                    value={miles || ""}
                    onChange={(e) => {
                      e.target.value.match(/^\d{0,5}?$/) &&
                        e.target.value <= 32767 &&
                        setMiles(e.target.value);
                    }}
                    disabled={viewDetail}
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col sm={5} md={6} lg={6} xl={6} xs={5}>
              <Form.Group className="form-group mt-3 align-items-center row  m-l-0 m-r-0">
                <Col xs={5} sm={5} md={5} className="p-0 text-start">
                  <Form.Label htmlFor="towableInvoiceAmount" className="col-form-label me-4">
                    {t("plantToPlantTransfers.add.page.field.towableInvoiceAmount")}
                  </Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="p-0">
                  <Input
                    className={`form-control h-25  ${
                      !viewDetail
                        ? !towableInvoiceAmount
                          ? motorizedShuttleFee || motorizedInvoiceAmount
                            ? towableCDLInvoiceAmount || towableShuttleFee || towableCDLShuttleFee
                              ? "borderRed"
                              : ""
                            : "borderRed"
                          : Number(towableInvoiceAmount) === 0 || isOnlyDot(towableInvoiceAmount)
                            ? " borderRed"
                            : "borderGreen"
                        : ""
                    }`}
                    name="towableInvoiceAmount"
                    type="text"
                    maxLength={8}

                    value={towableInvoiceAmount || ""}
                    onBeforeInput={(e) => {
                      const inputValue = e.target.value;
                      const selectionStart = e.target.selectionStart;
                      const selectionEnd = e.target.selectionEnd;
                      const newValue =
                        inputValue.slice(0, selectionStart) + e.data + inputValue.slice(selectionEnd);

                      // Define the regex patterns for validation
                      const validFormat = /^(?!0\d)\d{0,6}(\.\d{0,2})?$/; // Matches up to 6 digits optionally followed by a decimal point and up to 2 decimal digits
                      const startsWithZeroFollowedByDigit = /^0\d/; // Matches if the new value starts with '0' followed by another digit

                      // Check if the new value adheres to the format and doesn't start with '0' followed by a non-zero digit unless it is '0.'
                      if (
                        (!startsWithZeroFollowedByDigit.test(newValue) && !validFormat.test(newValue)) || // Ensure the new value adheres to the valid format
                        (startsWithZeroFollowedByDigit.test(newValue) &&
                          newValue.length > 8 &&
                          newValue[1] !== ".") || // Allow '0.' but not '0' followed by other digits
                        parseFloat(newValue) > 999999.99 // Check if the parsed float value exceeds the maximum allowed value
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                        setTowableInvoiceAmount(e.target.value);
                    }}
                    onBlur={() => setTowableInvoiceAmount(correctDecimalInputOnBlur(towableInvoiceAmount))}
                    disabled={viewDetail}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group mt-4  align-items-center row  m-l-0 m-r-0">
                <Col xs={5} sm={5} md={5} className="p-0 text-start">
                  <Form.Label htmlFor="towableCDLInvoiceAmount" className="col-form-label me-4">
                    {t("plantToPlantTransfers.add.page.field.towableCDLInvoiceAmount")}
                  </Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="p-0">
                  <Input
                    className={`form-control h-25  ${
                      !viewDetail
                        ? !towableCDLInvoiceAmount
                          ? motorizedShuttleFee || motorizedInvoiceAmount
                            ? towableInvoiceAmount || towableShuttleFee || towableCDLShuttleFee
                              ? "borderRed"
                              : ""
                            : "borderRed"
                          : Number(towableCDLInvoiceAmount) === 0 || isOnlyDot(towableCDLInvoiceAmount)
                            ? "borderRed "
                            : "borderGreen"
                        : ""
                    }`}
                    name="towableCDLInvoiceAmount"
                    type="text"
                    maxLength={8}

                    value={towableCDLInvoiceAmount || ""}
                    onBeforeInput={(e) => {
                      const inputValue = e.target.value;
                      const selectionStart = e.target.selectionStart;
                      const selectionEnd = e.target.selectionEnd;
                      const newValue =
                        inputValue.slice(0, selectionStart) + e.data + inputValue.slice(selectionEnd);

                      // Define the regex patterns for validation
                      const validFormat = /^(?!0\d)\d{0,6}(\.\d{0,2})?$/; // Matches up to 6 digits optionally followed by a decimal point and up to 2 decimal digits
                      const startsWithZeroFollowedByDigit = /^0\d/; // Matches if the new value starts with '0' followed by another digit

                      // Check if the new value adheres to the format and doesn't start with '0' followed by a non-zero digit unless it is '0.'
                      if (
                        (!startsWithZeroFollowedByDigit.test(newValue) && !validFormat.test(newValue)) || // Ensure the new value adheres to the valid format
                        (startsWithZeroFollowedByDigit.test(newValue) &&
                          newValue.length > 8 &&
                          newValue[1] !== ".") || // Allow '0.' but not '0' followed by other digits
                        parseFloat(newValue) > 999999.99 // Check if the parsed float value exceeds the maximum allowed value
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                        setTowableCDLInvoiceAmount(e.target.value);
                    }}
                    onBlur={() =>
                      setTowableCDLInvoiceAmount(correctDecimalInputOnBlur(towableCDLInvoiceAmount))
                    }
                    disabled={viewDetail}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group mt-4  align-items-center row  m-l-0 m-r-0">
                <Col xs={5} sm={5} md={5} className="p-0 text-start">
                  <Form.Label htmlFor="towableShuttleFee" className="col-form-label me-4">
                    {t("YardTOYardShuttle.add.page.field.towableShuttleFee")}
                  </Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="p-0">
                  <Input
                    className={`form-control h-25  ${
                      !viewDetail
                        ? !towableShuttleFee
                          ? motorizedShuttleFee || motorizedInvoiceAmount
                            ? towableInvoiceAmount || towableCDLInvoiceAmount || towableCDLShuttleFee
                              ? "borderRed"
                              : ""
                            : "borderRed"
                          : Number(towableShuttleFee) === 0 || isOnlyDot(towableShuttleFee)
                            ? "borderRed "
                            : "borderGreen"
                        : ""
                    }`}
                    name="towableShuttleFee"
                    type="text"
                    maxLength={8}
                    value={towableShuttleFee || ""}
                    onBeforeInput={(e) => {
                      const inputValue = e.target.value;
                      const selectionStart = e.target.selectionStart;
                      const selectionEnd = e.target.selectionEnd;
                      const newValue =
                        inputValue.slice(0, selectionStart) + e.data + inputValue.slice(selectionEnd);

                      // Define the regex patterns for validation
                      const validFormat = /^(?!0\d)\d{0,6}(\.\d{0,2})?$/; // Matches up to 6 digits optionally followed by a decimal point and up to 2 decimal digits
                      const startsWithZeroFollowedByDigit = /^0\d/; // Matches if the new value starts with '0' followed by another digit

                      // Check if the new value adheres to the format and doesn't start with '0' followed by a non-zero digit unless it is '0.'
                      if (
                        (!startsWithZeroFollowedByDigit.test(newValue) && !validFormat.test(newValue)) || // Ensure the new value adheres to the valid format
                        (startsWithZeroFollowedByDigit.test(newValue) &&
                          newValue.length > 8 &&
                          newValue[1] !== ".") || // Allow '0.' but not '0' followed by other digits
                        parseFloat(newValue) > 999999.99 // Check if the parsed float value exceeds the maximum allowed value
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setTowableShuttleFee(e.target.value);
                    }}
                    onBlur={() => setTowableShuttleFee(correctDecimalInputOnBlur(towableShuttleFee))}
                    disabled={viewDetail}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group mt-4  align-items-center row  m-l-0 m-r-0">
                <Col xs={5} sm={5} md={5} className="p-0 text-start">
                  <Form.Label htmlFor="towableCDLShuttleFee" className="col-form-label me-4">
                    {/* {t("YardTOYardShuttle.add.page.field.towableShuttleFee")} */}
                    Towable CDL Shuttle Fee
                  </Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="p-0">
                  <Input
                    className={`form-control h-25  ${
                      !viewDetail
                        ? !towableCDLShuttleFee
                          ? motorizedShuttleFee || motorizedInvoiceAmount
                            ? towableInvoiceAmount ||
                              towableCDLInvoiceAmount ||
                              towableShuttleFee ||
                              towableCDLShuttleFee
                              ? "borderRed"
                              : ""
                            : "borderRed"
                          : Number(towableCDLShuttleFee) === 0 || isOnlyDot(towableCDLShuttleFee)
                            ? "borderRed "
                            : "borderGreen"
                        : ""
                    }`}
                    name="towableCDLShuttleFee"
                    type="text"
                    maxLength={8}
                    value={towableCDLShuttleFee || ""}
                    onBeforeInput={(e) => {
                      const inputValue = e.target.value;
                      const selectionStart = e.target.selectionStart;
                      const selectionEnd = e.target.selectionEnd;
                      const newValue =
                        inputValue.slice(0, selectionStart) + e.data + inputValue.slice(selectionEnd);

                      // Define the regex patterns for validation
                      const validFormat = /^(?!0\d)\d{0,6}(\.\d{0,2})?$/; // Matches up to 6 digits optionally followed by a decimal point and up to 2 decimal digits
                      const startsWithZeroFollowedByDigit = /^0\d/; // Matches if the new value starts with '0' followed by another digit

                      // Check if the new value adheres to the format and doesn't start with '0' followed by a non-zero digit unless it is '0.'
                      if (
                        (!startsWithZeroFollowedByDigit.test(newValue) && !validFormat.test(newValue)) || // Ensure the new value adheres to the valid format
                        (startsWithZeroFollowedByDigit.test(newValue) &&
                          newValue.length > 8 &&
                          newValue[1] !== ".") || // Allow '0.' but not '0' followed by other digits
                        parseFloat(newValue) > 999999.99 // Check if the parsed float value exceeds the maximum allowed value
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                        setTowableCDLShuttleFee(e.target.value);
                    }}
                    onBlur={() => setTowableCDLShuttleFee(correctDecimalInputOnBlur(towableCDLShuttleFee))}
                    disabled={viewDetail}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          {/* both sorting is not implemented for customerPlantsLookup */}
          <CustomerPlantsLookup
            show={plantOneSelection}
            onHide={() => setPlantOneSelection(false)}
            renderItemId={(plant) => plant.customerPlantPK}
            handleLookupSelection={(plant) => {
              setPlantOneId(plant.customerPlantPK);
              setPlantOneName(plant.name);
              setPlantOneSelection(false);
            }}
            customerId={customerId}
            MaintenanceProgram
          />

          <CustomerPlantsLookup
            show={plantTwoSelection}
            onHide={() => setPlantTwoSelection(false)}
            renderItemId={(plant) => plant.customerPlantPK}
            handleLookupSelection={(plant) => {
              setPlantTwoId(plant.customerPlantPK);
              setPlantTwoName(plant.name);
              setPlantTwoSelection(false);
            }}
            customerId={customerId}
            MaintenanceProgram
          />
        </div>
      </div>
    </div>
  );
}

export default FormContent;
