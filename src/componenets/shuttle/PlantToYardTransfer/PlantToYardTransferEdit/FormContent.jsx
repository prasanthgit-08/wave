import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCustomerFK,
  setCustomerPlantFk,
  setMiles,
  setMotorizedInvoiceAmount,
  setMotorizedInvoiceAmountReturn,
  setPlantToYardTransferCustomer,
  setPlantToYardTransferPK,
  setPlantToYardTransferPlant,
  setPlantToYardTransferYard,
  setSaveData,
  setSaveEnable,
  setTowableCDLInvoiceAmount,
  setTowableCDLInvoiceAmountReturn,
  setTowableInvoiceAmount,
  setTowableInvoiceAmountReturn,
  setViewDetail,
  setYardFk,
  setIsPlantToYardExisting,
  setMotorizedInvoiceAmountRoundTrip,
  setTowableInvoiceAmountRoundTrip,
  setTowableCDLInvoiceAmountRoundTrip,
} from "../../../../redux/PlantToYardTransfersSlice";
import PlantToYardTransferService from "../../../../services/PlantToYardTransferService";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import CustomerPlantsLookup from "../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import YardLookup from "../../../LookupScreens/Yard/YardLookup";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import { correctDecimalInputOnBlur, isOnlyDot } from "../../../../utils/utils";
import LoadingIcon from "../../../common/LoadingIcon";
import { useAppNavigate } from "../../../../hooks/useAppNavigate";
import Input from "../../../../components/common/input";
function FormContent({ id, custId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { goBack } = useAppNavigate();
  const type = "Autocomplete";
  const page = 0;
  const isPlantToYardTransfer = true;
  const [active] = useState(1);
  const [size] = useState(100);
  const [searchCriteria] = useState("Beginning");
  const [yardsData, setYardsData] = useState([]);
  const [yardSelection, setYardSelection] = useState(false);
  const [plantSelection, setPlantSelection] = useState(false);
  const [customerPlantsData, setCustomerPlantsData] = useState([]);
  const [towableFee, setTowableFee] = useState(false);
  const [motorizedFee, setMotorizedFee] = useState(false);
  const [loading, setLoading] = useState(false);
  const plantToYardTransferCustomerName = useSelector(
    (state) => state.plantToYardTransfersReducer.plantToYardTransferCustomerName
  );
  const plantToYardTransferPlantName = useSelector(
    (state) => state.plantToYardTransfersReducer.plantToYardTransferPlantName
  );
  const plantToYardTransferYardName = useSelector(
    (state) => state.plantToYardTransfersReducer.plantToYardTransferYardName
  );
  const plantToYardTransferPK = useSelector(
    (state) => state.plantToYardTransfersReducer.plantToYardTransferPK
  );
  const viewDetail = useSelector((state) => state.plantToYardTransfersReducer.viewDetail);
  const towableInvoiceAmount = useSelector((state) => state.plantToYardTransfersReducer.towableInvoiceAmount);
  const towableCDLInvoiceAmount = useSelector(
    (state) => state.plantToYardTransfersReducer.towableCDLInvoiceAmount
  );
  const towableInvoiceAmountReturn = useSelector(
    (state) => state.plantToYardTransfersReducer.towableInvoiceAmountReturn
  );
  const towableCDLInvoiceAmountReturn = useSelector(
    (state) => state.plantToYardTransfersReducer.towableCDLInvoiceAmountReturn
  );
  const towableInvoiceAmountRoundTrip = useSelector(
    (state) => state.plantToYardTransfersReducer.towableInvoiceAmountRoundTrip
  );
  const towableCDLInvoiceAmountRoundTrip = useSelector(
    (state) => state.plantToYardTransfersReducer.towableCDLInvoiceAmountRoundTrip
  );
  const motorizedInvoiceAmount = useSelector(
    (state) => state.plantToYardTransfersReducer.motorizedInvoiceAmount
  );
  const motorizedInvoiceAmountReturn = useSelector(
    (state) => state.plantToYardTransfersReducer.motorizedInvoiceAmountReturn
  );
  const motorizedInvoiceAmountRoundTrip = useSelector(
    (state) => state.plantToYardTransfersReducer.motorizedInvoiceAmountRoundTrip
  );
  const saveData = useSelector((state) => state.plantToYardTransfersReducer.saveData);
  const miles = useSelector((state) => state.plantToYardTransfersReducer.miles);
  const yardFK = useSelector((state) => state.plantToYardTransfersReducer.yardFK);
  const customerPlantFK = useSelector((state) => state.plantToYardTransfersReducer.customerPlantFK);
  const customerFK = useSelector((state) => state.plantToYardTransfersReducer.customerFK);
  const isPlantToYardExisting = useSelector(
    (state) => state.plantToYardTransfersReducer.isPlantToYardExisting
  );
  const [plant2Loading, setPlant2Loading] = useState(false);

  const [yardLoading, setYardLoading] = useState(false);

  useEffect(() => {
    if (viewDetail && id) fetchPlantToYardTransfersById();
    // eslint-disable-next-line
  }, [viewDetail, id]);

  useEffect(() => {
    if (id !== null && id !== undefined) {
      dispatch(setViewDetail(true));
    } else {
      dispatch(setViewDetail(false));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (customerPlantFK && yardFK) {
      !viewDetail && checkExisting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerPlantFK, yardFK]);

  const checkExisting = () => {
    PlantToYardTransferService.plantAndYardExists(customerPlantFK, yardFK, plantToYardTransferPK, customerFK)
      .then((res) => {
        dispatch(setIsPlantToYardExisting(res.data));
      })
      .catch((err) => {
        console.log("Error at fetching existing combination", err);
      });
  };

  /**
   * For searching the yard according to string(which is being typed on the yard field) using searchCriteria as "Beginning"
   * @param {*} string
   */

  const fetchYardDetailByName = (string) => {
    setYardLoading(true);
    PlantToYardTransferService.getShuttleYardByName(string, page, active, size, searchCriteria)
      .then((response) => {
        const data = response.data;
        const yardList = data.content?.map((yard) => ({
          ...yard,
          description: yard.description?.trim(),
        }));
        setYardsData(yardList);
      })
      .catch((err) => {
        setYardLoading(false);

        console.log("error at fetchYardDetailByName", err);
      })
      .finally(() => {
        setYardLoading(false);
      });
  };

  useEffect(() => {
    dispatch(setCustomerPlantFk(null));
    dispatch(setPlantToYardTransferPlant(""));
    dispatch(setYardFk(null));
    dispatch(setPlantToYardTransferYard(""));
    dispatch(setTowableCDLInvoiceAmount(""));
    dispatch(setTowableCDLInvoiceAmountReturn(""));
    dispatch(setTowableInvoiceAmount(""));
    dispatch(setTowableInvoiceAmountReturn(""));
    dispatch(setTowableInvoiceAmountRoundTrip(""));
    dispatch(setTowableCDLInvoiceAmountRoundTrip(""));
    dispatch(setMotorizedInvoiceAmount(""));
    dispatch(setMotorizedInvoiceAmountReturn(""));
    dispatch(setMotorizedInvoiceAmountRoundTrip(""));
    dispatch(setMiles(""));
  }, []);

  /**
   * For searching the plant (which is being typed on the plant field) using searchCriteria as "Beginning"
   */
  const fetchCustomerPlantDetails = (plantToYardTransferPlantName) => {
    setPlant2Loading(true);
    PlantToYardTransferService.fetchCustomerPlantDetails(
      custId,
      plantToYardTransferPlantName,
      active,
      type,
      size,
      page,
      isPlantToYardTransfer,
      searchCriteria
    )
      .then((response) => {
        const data = response.data.content;
        const plantList = data?.map((plant) => ({
          ...plant,
          name: plant.name?.trim(),
        }));
        setCustomerPlantsData(plantList);
      })
      .catch((error) => {
        console.error(error.response.data.errorMsg);
        setPlant2Loading(false);
      })
      .finally(() => {
        setPlant2Loading(false);
      });
  };

  /**
   * Function for fetching plant to yard details by id
   * @param {*} String
   */
  const fetchPlantToYardTransfersById = (String) => {
    setLoading(true);
    PlantToYardTransferService.fetchPlantToYardTransfersById(id)
      .then((response) => {
        const datas = response.data;
        dispatch(setPlantToYardTransferPlant(datas.plant));
        dispatch(setPlantToYardTransferYard(datas.yard));
        dispatch(setCustomerFK(datas.customerfk));
        dispatch(setPlantToYardTransferCustomer(datas.customer));
        dispatch(setCustomerPlantFk(datas.customerPlantfk));
        dispatch(setYardFk(datas.yardfk));
        dispatch(
          setTowableCDLInvoiceAmount(
            Number(datas.towableCDLInvoiceAmount) === 0 ? "" : datas.towableCDLInvoiceAmount.toFixed(2)
          )
        );
        dispatch(
          setTowableCDLInvoiceAmountReturn(
            Number(datas.towableCDLInvoiceAmountReturn) === 0
              ? ""
              : datas.towableCDLInvoiceAmountReturn.toFixed(2)
          )
        );
        dispatch(
          setTowableInvoiceAmount(
            Number(datas.towableInvoiceAmount) === 0 ? "" : datas.towableInvoiceAmount.toFixed(2)
          )
        );
        dispatch(
          setTowableInvoiceAmountReturn(
            Number(datas.towableInvoiceAmountReturn) === 0 ? "" : datas.towableInvoiceAmountReturn.toFixed(2)
          )
        );
        dispatch(
          setTowableInvoiceAmountRoundTrip(
            Number(datas.towableInvoiceAmountRoundTrip) === 0
              ? ""
              : datas.towableInvoiceAmountRoundTrip.toFixed(2)
          )
        );
        dispatch(
          setTowableCDLInvoiceAmountRoundTrip(
            Number(datas.towableCDLInvoiceAmountRoundTrip) === 0
              ? ""
              : datas.towableCDLInvoiceAmountRoundTrip.toFixed(2)
          )
        );
        dispatch(
          setMotorizedInvoiceAmount(
            Number(datas.motorizedInvoiceAmount) === 0 ? "" : datas.motorizedInvoiceAmount.toFixed(2)
          )
        );
        dispatch(
          setMotorizedInvoiceAmountReturn(
            Number(datas.motorizedInvoiceAmountReturn) === 0
              ? ""
              : datas.motorizedInvoiceAmountReturn.toFixed(2)
          )
        );
        dispatch(
          setMotorizedInvoiceAmountRoundTrip(
            Number(datas.motorizedInvoiceAmountRoundTrip) === 0
              ? ""
              : datas.motorizedInvoiceAmountRoundTrip.toFixed(2)
          )
        );
        dispatch(setMiles(datas.miles));
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

  /**
   * setting redux values as per the selection of yards
   */
  const handleYardSelection = (yards) => {
    dispatch(setYardFk(yards.yardPK));
    dispatch(setPlantToYardTransferYard(yards.description));
  };

  const handlePlantSelection = (plant) => {
    dispatch(setCustomerPlantFk(plant.customerPlantPK));
    dispatch(setPlantToYardTransferPlant(plant.name));
  };

  /**
   * For handling the onClick of lookup
   */
  const handleYardLookUpModal = () => {
    setYardSelection(true);
  };

  const handlePlantLookUpModal = () => {
    setPlantSelection(true);
  };

  /**
   * Used for hiding modal
   */
  const yardModalHide = () => {
    setYardSelection(false);
  };
  const plantModalHide = () => {
    setPlantSelection(false);
  };

  useEffect(() => {
    if (id === undefined) {
      dispatch(setCustomerPlantFk(null));
      dispatch(setPlantToYardTransferPK(null));
      dispatch(setPlantToYardTransferPlant(""));
      dispatch(setPlantToYardTransferYard(""));
      dispatch(setYardFk(null));
      dispatch(setMotorizedInvoiceAmount(""));
      dispatch(setMotorizedInvoiceAmountReturn(""));
      dispatch(setMotorizedInvoiceAmountRoundTrip(""));
      dispatch(setTowableInvoiceAmount(""));
      dispatch(setTowableCDLInvoiceAmount(""));
      dispatch(setTowableCDLInvoiceAmountReturn(""));
      dispatch(setTowableInvoiceAmountReturn(""));
      dispatch(setTowableInvoiceAmountRoundTrip(""));
      dispatch(setTowableCDLInvoiceAmountRoundTrip(""));
      dispatch(setMiles(null));
    }
  }, [id]);

  /**
   * For handling the data selecting from lookup
   */
  const handleYardLookUp = (yards) => {
    dispatch(setYardFk(yards.yardPK));
    dispatch(setPlantToYardTransferYard(yards.description?.trim()));
    setYardSelection(false);
  };
  const handlePlantLookUp = (plant) => {
    dispatch(setCustomerPlantFk(plant.customerPlantPK));
    dispatch(setPlantToYardTransferPlant(plant.name));
    setPlantSelection(false);
  };

  /** For saving */
  useEffect(() => {
    dispatch(
      setSaveData({
        plantToYardTransferPK: Number(plantToYardTransferPK) || "",
        customerfk: Number(customerFK) || "",
        customerPlantfk: Number(customerPlantFK) || "",
        yardfk: Number(yardFK) || "",
        towableInvoiceAmount: Number(towableInvoiceAmount || ""),
        towableCDLInvoiceAmount: Number(towableCDLInvoiceAmount) || "",
        towableInvoiceAmountReturn: Number(towableInvoiceAmountReturn) || "",
        towableCDLInvoiceAmountReturn: Number(towableCDLInvoiceAmountReturn) || "",
        towableInvoiceAmountRoundTrip: Number(towableInvoiceAmountRoundTrip) || "",
        towableCDLInvoiceAmountRoundTrip: Number(towableCDLInvoiceAmountRoundTrip) || "",
        motorizedInvoiceAmount: Number(motorizedInvoiceAmount) || "",
        motorizedInvoiceAmountReturn: Number(motorizedInvoiceAmountReturn) || "",
        motorizedInvoiceAmountRoundTrip: Number(motorizedInvoiceAmountRoundTrip) || "",
        miles: Number(miles) || "",
      })
    );

    // Amounts may be numbers (loaded from API) or strings (typed by user)
    const isAmountFilled = (value) =>
      String(value ?? "").trim() !== "" && Number(value) !== 0 && !isOnlyDot(value);
    const motorizedFilled =
      isAmountFilled(motorizedInvoiceAmount) &&
      isAmountFilled(motorizedInvoiceAmountReturn) &&
      isAmountFilled(motorizedInvoiceAmountRoundTrip);
    const towableFilled =
      isAmountFilled(towableInvoiceAmount) &&
      isAmountFilled(towableInvoiceAmountReturn) &&
      isAmountFilled(towableCDLInvoiceAmount) &&
      isAmountFilled(towableCDLInvoiceAmountReturn) &&
      isAmountFilled(towableInvoiceAmountRoundTrip) &&
      isAmountFilled(towableCDLInvoiceAmountRoundTrip);

    if (customerPlantFK && yardFK && miles > 0 && miles <= 32767 && !isPlantToYardExisting) {
      if (motorizedFilled && towableFilled) {
        dispatch(setSaveEnable(true));
      } else if (
        motorizedFilled &&
        towableInvoiceAmount === "" &&
        towableCDLInvoiceAmount === "" &&
        towableInvoiceAmountReturn === "" &&
        towableCDLInvoiceAmountReturn === "" &&
        towableInvoiceAmountRoundTrip === "" &&
        towableCDLInvoiceAmountRoundTrip === ""
      ) {
        dispatch(setSaveEnable(true));
      } else if (
        towableFilled &&
        motorizedInvoiceAmount === "" &&
        motorizedInvoiceAmountReturn === "" &&
        motorizedInvoiceAmountRoundTrip === ""
      ) {
        dispatch(setSaveEnable(true));
      } else {
        dispatch(setSaveEnable(false));
      }
    } else {
      dispatch(setSaveEnable(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    customerPlantFK,
    yardFK,
    towableInvoiceAmount,
    towableCDLInvoiceAmount,
    towableInvoiceAmountReturn,
    towableCDLInvoiceAmountReturn,
    towableInvoiceAmountRoundTrip,
    towableCDLInvoiceAmountRoundTrip,
    motorizedInvoiceAmount,
    motorizedInvoiceAmountReturn,
    motorizedInvoiceAmountRoundTrip,
    miles,
    isPlantToYardExisting,
  ]);

  /**For motorized and towable fee validations */
  useEffect(() => {
    if (
      !viewDetail &&
      ((towableInvoiceAmount !== "" && towableInvoiceAmount !== null) ||
        (towableCDLInvoiceAmount !== "" && towableCDLInvoiceAmount !== null) ||
        (towableInvoiceAmountReturn !== "" && towableInvoiceAmountReturn !== null) ||
        (towableCDLInvoiceAmountReturn !== "" && towableCDLInvoiceAmountReturn !== null) ||
        (towableInvoiceAmountRoundTrip !== "" && towableInvoiceAmountRoundTrip !== null) ||
        (towableCDLInvoiceAmountRoundTrip !== "" && towableCDLInvoiceAmountRoundTrip !== null))
    ) {
      setTowableFee(true);
      setMotorizedFee(false);
    } else if (
      !viewDetail &&
      ((motorizedInvoiceAmount !== "" && motorizedInvoiceAmount !== null) ||
        (motorizedInvoiceAmountReturn !== "" && motorizedInvoiceAmountReturn !== null) ||
        (motorizedInvoiceAmountRoundTrip !== "" && motorizedInvoiceAmountRoundTrip !== null))
    ) {
      setMotorizedFee(true);
      setTowableFee(false);
    } else if (
      towableInvoiceAmount === null ||
      towableInvoiceAmount === "" ||
      towableCDLInvoiceAmount === null ||
      towableCDLInvoiceAmount === "" ||
      towableInvoiceAmountReturn === null ||
      towableInvoiceAmountReturn === "" ||
      towableCDLInvoiceAmountReturn === null ||
      towableCDLInvoiceAmountReturn === "" ||
      towableInvoiceAmountRoundTrip === null ||
      towableInvoiceAmountRoundTrip === "" ||
      towableCDLInvoiceAmountRoundTrip === null ||
      towableCDLInvoiceAmountRoundTrip === "" ||
      motorizedInvoiceAmount === null ||
      motorizedInvoiceAmount === "" ||
      motorizedInvoiceAmountReturn === null ||
      motorizedInvoiceAmountReturn === "" ||
      motorizedInvoiceAmountRoundTrip === null ||
      motorizedInvoiceAmountRoundTrip === ""
    ) {
      setMotorizedFee(false);
      setTowableFee(false);
    }
  }, [
    towableInvoiceAmount,
    towableCDLInvoiceAmount,
    towableInvoiceAmountReturn,
    towableCDLInvoiceAmountReturn,
    towableInvoiceAmountRoundTrip,
    motorizedInvoiceAmount,
    motorizedInvoiceAmountReturn,
    viewDetail,
  ]);
  return (
    <div className="w-100 p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        {/* <div className="m-b-10"> */}
        <div className="p-15 w-100">
          <Col sm={7} md={7} lg={7} xl={7} xs={7}>
            <Form.Group className="form-group mt-3 align-items-center row  m-l-0 m-r-0">
              <Col xs={5} md={5} sm={5} className="p-0 text-start" style={{ width: "230px" }}>
                <Form.Label htmlFor="customer" className="col-form-label ms-2">
                  Customer
                </Form.Label>
              </Col>
              <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                <input
                  type="text"
                  className={styles.formControl}
                  name="pickupContact"
                  maxLength={30}

                  value={plantToYardTransferCustomerName || ""}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group mt-3 align-items-center row  m-l-0 m-r-0">
              <Col xs={5} md={5} sm={5} className="p-0 text-start" style={{ width: "230px" }}>
                <Form.Label htmlFor="name" className="col-form-label  ms-2">
                  Plant
                </Form.Label>
              </Col>
              <Col xs={6} md={6} sm={6} className="p-0 d-flex ">
                <AutoCompleteDropdown
                  arrayList={customerPlantsData}
                  searchString={plantToYardTransferPlantName}
                  renderItemId={(plant) => plant.customerPlantPK}
                  renderItemField={(plant) => plant.name}
                  handleSearchString={(string) => dispatch(setPlantToYardTransferPlant(string))}
                  fetchDataBySearchString={fetchCustomerPlantDetails}
                  onSelect={handlePlantSelection}
                  selectedId={customerPlantFK}
                  loading={plant2Loading}
                  clearInputCallback={() => {
                    dispatch(setCustomerPlantFk(null));
                    dispatch(setIsPlantToYardExisting(false));
                  }}
                  className={`${
                    plantToYardTransferPK !== undefined &&
                    plantToYardTransferPK !== null &&
                    plantToYardTransferPK !== ""
                      ? ""
                      : customerPlantFK === "" ||
                          customerPlantFK === null ||
                          plantToYardTransferPlantName === "" ||
                          isPlantToYardExisting
                        ? "borderRed"
                        : "borderGreen"
                  }`}
                  disabled={viewDetail || plantToYardTransferPK ? true : false}
                />
                <LookupButton
                  disabled={viewDetail || plantToYardTransferPK ? true : false}
                  onClick={handlePlantLookUpModal}
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group mt-3 align-items-center row  m-l-0 m-r-0">
              <Col xs={5} sm={5} md={5} className="p-0 text-start" style={{ width: "230px" }}>
                <Form.Label htmlFor="name" className="col-form-label  ms-2">
                  Yard
                </Form.Label>
              </Col>
              <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                <AutoCompleteDropdown
                  arrayList={yardsData}
                  searchString={plantToYardTransferYardName}
                  renderItemId={(yards) => yards.yardPK}
                  renderItemField={(yards) => yards.description}
                  handleSearchString={(string) => dispatch(setPlantToYardTransferYard(string))}
                  fetchDataBySearchString={fetchYardDetailByName}
                  onSelect={handleYardSelection}
                  selectedId={yardFK}
                  loading={yardLoading}
                  clearInputCallback={() => {
                    dispatch(setYardFk(null));
                    dispatch(setIsPlantToYardExisting(false));
                  }}
                  className={`${
                    plantToYardTransferPK !== undefined &&
                    plantToYardTransferPK !== null &&
                    plantToYardTransferPK !== ""
                      ? ""
                      : yardFK === "" ||
                          yardFK === null ||
                          yardFK === undefined ||
                          plantToYardTransferYardName === "" ||
                          isPlantToYardExisting
                        ? "borderRed"
                        : "borderGreen"
                  }`}
                  disabled={viewDetail || plantToYardTransferPK ? true : false}
                />
                <LookupButton
                  disabled={viewDetail || plantToYardTransferPK ? true : false}
                  onClick={handleYardLookUpModal}
                />
              </Col>
            </Form.Group>
            <Form.Group className=" mt-1   align-items-center row  m-l-5 m-r-0">
              <Col xs={5} sm={5} md={5} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label  me-4"></Form.Label>
              </Col>
            </Form.Group>

            <div className={`${viewDetail && `hide-elements`}`}></div>
          </Col>

          <Row className="p-15 w-120">
            <Col sm={6} md={6} lg={6} xl={6} xs={6}>
              <Form.Group className="form-group m-t-10 align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4 ">
                    Motorized Invoice Amount
                  </Form.Label>
                </Col>
                <div className="p-0 w-75px">
                  <input
                    type="text"
                    name="pickupContact"
                    maxLength={30}
                    className={`${styles.formControl} ${
                      !viewDetail
                        ? !motorizedInvoiceAmount
                          ? towableInvoiceAmount ||
                            towableCDLInvoiceAmount ||
                            towableCDLInvoiceAmountReturn ||
                            towableInvoiceAmountReturn ||
                            towableInvoiceAmountRoundTrip ||
                            towableCDLInvoiceAmountRoundTrip
                            ? motorizedInvoiceAmountReturn || motorizedInvoiceAmountRoundTrip
                              ? "borderRed"
                              : ""
                            : "borderRed"
                          : Number(motorizedInvoiceAmount) === 0 || isOnlyDot(motorizedInvoiceAmount)
                            ? "borderRed"
                            : "borderGreen"
                        : ""
                    }`}
                    value={motorizedInvoiceAmount || ""}
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
                        dispatch(setMotorizedInvoiceAmount(e.target.value));
                    }}
                    onBlur={(e) =>
                      dispatch(setMotorizedInvoiceAmount(correctDecimalInputOnBlur(e.target.value)))
                    }
                    disabled={viewDetail}
                  />
                </div>
              </Form.Group>
              <Form.Group className="form-group mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Motorized Return Invoice Amount
                  </Form.Label>
                </Col>
                <div className="p-0 w-75px">
                  <Input
                    type="text"
                    name="pickupContact"
                    maxLength={30}

                    value={motorizedInvoiceAmountReturn || ""}
                    onChange={(e) => {
                      e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                        dispatch(setMotorizedInvoiceAmountReturn(e.target.value));
                    }}

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
                    disabled={viewDetail}
                    onBlur={(e) =>
                      dispatch(setMotorizedInvoiceAmountReturn(correctDecimalInputOnBlur(e.target.value)))
                    }
                    className={`${styles.formControl} ${
                      !viewDetail
                        ? !motorizedInvoiceAmountReturn
                          ? towableInvoiceAmount ||
                            towableCDLInvoiceAmount ||
                            towableCDLInvoiceAmountReturn ||
                            towableInvoiceAmountReturn ||
                            towableInvoiceAmountRoundTrip ||
                            towableCDLInvoiceAmountRoundTrip
                            ? motorizedInvoiceAmount || motorizedInvoiceAmountRoundTrip
                              ? "borderRed"
                              : ""
                            : "borderRed"
                          : Number(motorizedInvoiceAmountReturn) === 0 ||
                              isOnlyDot(motorizedInvoiceAmountReturn)
                            ? "borderRed"
                            : "borderGreen"
                        : ""
                    }`}
                  />
                </div>
              </Form.Group>
              {/* New Enhancement */}
              <Form.Group className="form-group mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Motorized Round Trip Invoice Amount{" "}
                  </Form.Label>
                </Col>
                <div className="p-0 w-75px">
                  <Input
                    type="text"
                    name="pickupContact"
                    maxLength={30}

                    value={motorizedInvoiceAmountRoundTrip || ""}
                    onChange={(e) => {
                      e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                        dispatch(setMotorizedInvoiceAmountRoundTrip(e.target.value));
                    }}
                    onBlur={(e) =>
                      dispatch(setMotorizedInvoiceAmountRoundTrip(correctDecimalInputOnBlur(e.target.value)))
                    }
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
                    disabled={viewDetail}

                    className={`${styles.formControl} ${
                      !viewDetail
                        ? !motorizedInvoiceAmountRoundTrip
                          ? towableInvoiceAmount ||
                            towableCDLInvoiceAmount ||
                            towableCDLInvoiceAmountReturn ||
                            towableInvoiceAmountReturn ||
                            towableInvoiceAmountRoundTrip ||
                            towableCDLInvoiceAmountRoundTrip
                            ? motorizedInvoiceAmount || motorizedInvoiceAmountReturn
                              ? "borderRed"
                              : ""
                            : "borderRed"
                          : Number(motorizedInvoiceAmountRoundTrip) === 0 ||
                              isOnlyDot(motorizedInvoiceAmountRoundTrip)
                            ? "borderRed"
                            : "borderGreen"
                        : ""
                    }`}
                  />
                </div>
              </Form.Group>

              <Form.Group className="form-group invisible mt-4 m-b-10 align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label"></Form.Label>
                </Col>
                <div className="p-0 w-75px">
                  <Input type="text" className="form-control h-25" name="pickupContact" maxLength={30} />
                </div>
              </Form.Group>
              <Form.Group className="form-group mt-4 m-b-10 align-items-center row  m-l-0 m-r-0">
                <Col xs={6} sm={6} md={6} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Miles</Form.Label>
                </Col>
                <div className="p-0 w-50px">
                  <Input
                    type="text"
                    className={`${styles.formControl} ${
                      !viewDetail &&
                      (miles === null || miles === "" || miles <= 0 || miles > 32767
                        ? "borderRed"
                        : "borderGreen")
                    }`}
                    onKeyDown={(evt) =>
                      (evt.key === "e" || evt.key === "." || evt.key === "-" || evt.key === "+") &&
                      evt.preventDefault()
                    }
                    name="pickupContact"
                    maxLength={5}

                    value={miles || ""}
                    onChange={(e) => {
                      e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && dispatch(setMiles(e.target.value));
                    }}
                    disabled={viewDetail}
                  />
                </div>
              </Form.Group>
            </Col>

            <Col sm={6} md={6} lg={6} xl={6} xs={6}>
              <Form.Group className="form-group m-t-10 m-b-10 align-items-center row  m-l-0 m-r-0">
                <Col xs={7} sm={7} md={7} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Towable Invoice Amount</Form.Label>
                </Col>
                <div className="p-0 w-75px">
                  <Input
                    type="text"
                    className={`${styles.formControl} ${
                      !viewDetail
                        ? !towableInvoiceAmount
                          ? motorizedInvoiceAmount ||
                            motorizedInvoiceAmountReturn ||
                            motorizedInvoiceAmountRoundTrip
                            ? towableCDLInvoiceAmount ||
                              towableCDLInvoiceAmountReturn ||
                              towableInvoiceAmountReturn ||
                              towableInvoiceAmountRoundTrip ||
                              towableCDLInvoiceAmountRoundTrip
                              ? "borderRed"
                              : ""
                            : "borderRed"
                          : Number(towableInvoiceAmount) === 0 || isOnlyDot(towableInvoiceAmount)
                            ? "borderRed"
                            : "borderGreen"
                        : ""
                    }`}
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
                    name="pickupContact"
                    maxLength={30}

                    value={towableInvoiceAmount || ""}
                    onChange={(e) => {
                      e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                        dispatch(setTowableInvoiceAmount(e.target.value));
                    }}
                    onBlur={(e) =>
                      dispatch(setTowableInvoiceAmount(correctDecimalInputOnBlur(e.target.value)))
                    }
                    disabled={viewDetail}
                  />
                </div>
              </Form.Group>
              <Form.Group className="form-group mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                <Col xs={7} sm={7} md={7} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Towable CDL Invoice Amount</Form.Label>
                </Col>
                <div className="p-0 w-75px">
                  <Input
                    type="text"
                    className={`${styles.formControl} ${
                      !viewDetail
                        ? !towableCDLInvoiceAmount
                          ? motorizedInvoiceAmount ||
                            motorizedInvoiceAmountReturn ||
                            motorizedInvoiceAmountRoundTrip
                            ? towableInvoiceAmount ||
                              towableCDLInvoiceAmountReturn ||
                              towableInvoiceAmountReturn ||
                              towableInvoiceAmountRoundTrip ||
                              towableCDLInvoiceAmountRoundTrip
                              ? "borderRed"
                              : ""
                            : "borderRed"
                          : Number(towableCDLInvoiceAmount) === 0 || isOnlyDot(towableCDLInvoiceAmount)
                            ? "borderRed"
                            : "borderGreen"
                        : ""
                    }`}
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
                    name="pickupContact"
                    maxLength={30}

                    value={towableCDLInvoiceAmount || ""}
                    onChange={(e) => {
                      e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                        dispatch(setTowableCDLInvoiceAmount(e.target.value));
                    }}
                    onBlur={(e) =>
                      dispatch(setTowableCDLInvoiceAmount(correctDecimalInputOnBlur(e.target.value)))
                    }
                    disabled={viewDetail}
                  />
                </div>
              </Form.Group>
              <Form.Group className="form-group mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                <Col xs={7} sm={7} md={7} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Towable Return Invoice Amount</Form.Label>
                </Col>
                <div className="p-0 w-75px">
                  <Input
                    type="text"
                    className={`${styles.formControl} ${
                      !viewDetail
                        ? !towableInvoiceAmountReturn
                          ? motorizedInvoiceAmount ||
                            motorizedInvoiceAmountReturn ||
                            motorizedInvoiceAmountRoundTrip
                            ? towableInvoiceAmount ||
                              towableCDLInvoiceAmount ||
                              towableCDLInvoiceAmountReturn ||
                              towableInvoiceAmountRoundTrip ||
                              towableCDLInvoiceAmountRoundTrip
                              ? "borderRed"
                              : ""
                            : "borderRed"
                          : Number(towableInvoiceAmountReturn) === 0 || isOnlyDot(towableInvoiceAmountReturn)
                            ? "borderRed"
                            : "borderGreen"
                        : ""
                    }`}
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
                    name="pickupContact"
                    maxLength={30}
                    value={towableInvoiceAmountReturn || ""}
                    onChange={(e) => {
                      e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                        dispatch(setTowableInvoiceAmountReturn(e.target.value));
                    }}
                    onBlur={(e) =>
                      dispatch(setTowableInvoiceAmountReturn(correctDecimalInputOnBlur(e.target.value)))
                    }
                    disabled={viewDetail}
                  />
                </div>
              </Form.Group>
              <Form.Group className="form-group mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                <Col xs={7} sm={7} md={7} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Towable CDL Return Invoice Amount</Form.Label>
                </Col>
                <div className="p-0 w-75px">
                  <Input
                    type="text"
                    className={`${styles.formControl} ${
                      !viewDetail
                        ? !towableCDLInvoiceAmountReturn
                          ? motorizedInvoiceAmount ||
                            motorizedInvoiceAmountReturn ||
                            motorizedInvoiceAmountRoundTrip
                            ? towableInvoiceAmount ||
                              towableCDLInvoiceAmount ||
                              towableInvoiceAmountReturn ||
                              towableInvoiceAmountRoundTrip ||
                              towableCDLInvoiceAmountRoundTrip
                              ? "borderRed"
                              : ""
                            : "borderRed"
                          : Number(towableCDLInvoiceAmountReturn) === 0 ||
                              isOnlyDot(towableCDLInvoiceAmountReturn)
                            ? "borderRed"
                            : "borderGreen"
                        : ""
                    }`}
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
                    name="pickupContact"
                    maxLength={30}
                    value={towableCDLInvoiceAmountReturn || ""}
                    onChange={(e) => {
                      e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                        dispatch(setTowableCDLInvoiceAmountReturn(e.target.value));
                    }}
                    onBlur={(e) =>
                      dispatch(setTowableCDLInvoiceAmountReturn(correctDecimalInputOnBlur(e.target.value)))
                    }
                    disabled={viewDetail}
                  />
                </div>
              </Form.Group>
              {/* New Enhancement */}
              <Form.Group className="form-group mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                <Col xs={7} sm={7} md={7} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Towable Round Trip Invoice Amount </Form.Label>
                </Col>
                <div className="p-0 w-75px">
                  <Input
                    type="text"
                    className={`${styles.formControl} ${
                      !viewDetail
                        ? !towableInvoiceAmountRoundTrip
                          ? motorizedInvoiceAmount ||
                            motorizedInvoiceAmountReturn ||
                            motorizedInvoiceAmountRoundTrip
                            ? towableInvoiceAmount ||
                              towableCDLInvoiceAmount ||
                              towableCDLInvoiceAmountReturn ||
                              towableInvoiceAmountRoundTrip ||
                              towableCDLInvoiceAmountRoundTrip
                              ? "borderRed"
                              : ""
                            : "borderRed"
                          : Number(towableInvoiceAmountRoundTrip) === 0 ||
                              isOnlyDot(towableInvoiceAmountRoundTrip)
                            ? "borderRed"
                            : "borderGreen"
                        : ""
                    }`}

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
                    name="pickupContact"
                    maxLength={30}

                    value={towableInvoiceAmountRoundTrip || ""}
                    onChange={(e) => {
                      e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                        dispatch(setTowableInvoiceAmountRoundTrip(e.target.value));
                    }}
                    onBlur={(e) =>
                      dispatch(setTowableInvoiceAmountRoundTrip(correctDecimalInputOnBlur(e.target.value)))
                    }
                    disabled={viewDetail}
                  />
                </div>
              </Form.Group>
              {/* New Enhancement */}
              <Form.Group className="form-group mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                <Col xs={7} sm={7} md={7} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">
                    {" "}
                    Towable CDL Round Trip Invoice Amount{" "}
                  </Form.Label>
                </Col>
                <div className="p-0 w-75px">
                  <Input
                    type="text"
                    className={`${styles.formControl} ${
                      !viewDetail
                        ? !towableCDLInvoiceAmountRoundTrip
                          ? motorizedInvoiceAmount ||
                            motorizedInvoiceAmountReturn ||
                            motorizedInvoiceAmountRoundTrip
                            ? towableInvoiceAmount ||
                              towableCDLInvoiceAmount ||
                              towableCDLInvoiceAmountReturn ||
                              towableInvoiceAmountRoundTrip ||
                              towableInvoiceAmountRoundTrip
                              ? "borderRed"
                              : ""
                            : "borderRed"
                          : Number(towableCDLInvoiceAmountRoundTrip) === 0 ||
                              isOnlyDot(towableCDLInvoiceAmountRoundTrip)
                            ? "borderRed"
                            : "borderGreen"
                        : ""
                    }`}

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
                    name="pickupContact"
                    maxLength={30}

                    value={towableCDLInvoiceAmountRoundTrip || ""}
                    onChange={(e) => {
                      e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                        dispatch(setTowableCDLInvoiceAmountRoundTrip(e.target.value));
                    }}
                    onBlur={(e) =>
                      dispatch(setTowableCDLInvoiceAmountRoundTrip(correctDecimalInputOnBlur(e.target.value)))
                    }
                    disabled={viewDetail}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <YardLookup
            show={yardSelection}
            onHide={yardModalHide}
            renderItemId={(yards) => yards.yardPK}
            handleLookupSelection={handleYardLookUp}
            MaintenanceProgram
          />

          <CustomerPlantsLookup
            show={plantSelection}
            onHide={plantModalHide}
            renderItemId={(plant) => plant.customerPlantPK}
            handleLookupSelection={handlePlantLookUp}
            customerId={custId}
            MaintenanceProgram
          />
        </div>
      </div>
    </div>
    // </div>
  );
}

export default FormContent;
