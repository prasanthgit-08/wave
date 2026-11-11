import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { t } from "i18next";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import { useState } from "react";
import YardToYardShuttleService from "../../../../services/YardToYardShuttleService";
import YardLookup from "../../../LookupScreens/Yard/YardLookup";
import { useEffect } from "react";
import LookupButton from "../../../common/LookupButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  setViewDetail,
  setSaveData,
  setSaveDisable,
  setYardToYardShuttlePK,
} from "../../../../redux/YardToYardShuttleSlice";
import { correctDecimalInputOnBlur, isOnlyDot } from "../../../../utils/utils";
import LoadingIcon from "../../../common/LoadingIcon";
import Input from "../../../../components/common/input";
function YardToYardFormContent({ selectedId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const active = 1;
  const size = 100;
  const searchCriteria = "Beginning";
  const page = 0;

  const [yardOne, setYardOne] = useState("");
  const [yardOnePK, setYardOnePK] = useState(null);
  const [yardTwo, setYardTwo] = useState("");
  const [yardTwoPK, setYardTwoPK] = useState(null);
  const [towableShuttleFee, setTowableShuttleFee] = useState(null);
  const [motorizedShuttleFee, setMotorizedShuttleFee] = useState(null);
  const [miles, setMiles] = useState(null);

  const [yardsData, setYardsData] = useState([]);
  const [pickUpYardToYardSelection, setPickUpYardToYardSelection] = useState(false);
  const [dropOffYardToYardSelection, setDropOffYardToYardSelection] = useState(false);
  const [isExisting, setIsExisting] = useState(false);
  const [checkingIsExists, setCheckingIsExists] = useState(false);
  const [hasFee, setHasFee] = useState(false);

  const [editFormData, setEditFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [yardLoading, setYardLoading] = useState(false);
  const { viewDetail, yardToYardShuttlePK } = useSelector((state) => state.yardToYardShuttleReducer);

  /**
   * This function calls the srvice which fetches the yard-to-yard-shuttle detail by ID(YardToYardShuttlesPK)
   */
  const fetchYardToYardDetailsById = () => {
    setLoading(true);
    YardToYardShuttleService.fetchYardToYardDetailsById(selectedId)
      .then((response) => {
        dispatch(setViewDetail(true));
        const yard = response.data;
        setEditFormData(yard);
      })
      .catch((error) => {
        console.error(error.response.data.errorMsg || "Error in fetching details by id.....");
        toast.error(error.response.data.errorMsg || "Error in fetching details by id.....");
        navigate("/yard-to-yard-shuttle");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * For searching the yard according to string(which is being typed on the yard field) using searchCriteria as "Beginning"
   */
  const fetchYardDetailByName = (string) => {
    setYardLoading(true);
    YardToYardShuttleService.fetchYardDetailsByName(string, page, active, size, searchCriteria)
      .then((response) => {
        const data = response.data.content;
        const yardList = data?.map((yard) => ({
          ...yard,
          description: yard.description?.trim(),
        }));
        setYardsData(yardList);
        setYardLoading(false);
      })
      .catch((err) => {
        console.error(err.response.data.errorMsg || "Error while fetching yard names");
        setYardLoading(false);
      });
  };

  /**
   * This function calls the service which checks whether the data for the currently entered combination of yards exist or not
   */
  const isExistingService = () => {
    YardToYardShuttleService.isExisting(yardOnePK, yardTwoPK)
      .then((res) => {
        const data = res.data;
        setIsExisting(data);
        setCheckingIsExists(false);
      })
      .catch((error) => {
        toast.error(error.response.data.errorMsg || "Error at checking existing yard to yard combination");
        console.error(error.response.data.errorMsg || "Error at checking existing yard to yard combination");
      });
  };

  useEffect(() => {
    if (editFormData !== null) {
      setYardOne(editFormData.pickUpYard);
      setYardOnePK(editFormData.pickUpYardfk);
      setYardTwo(editFormData.dropOffYard);
      setYardTwoPK(editFormData.dropOffYardfk);
      setTowableShuttleFee(
        Number(editFormData.towableShuttleFee) === 0 ? "" : editFormData.towableShuttleFee.toFixed(2)
      );
      setMotorizedShuttleFee(
        Number(editFormData.motorizedShuttleFee) === 0 ? "" : editFormData.motorizedShuttleFee.toFixed(2)
      );
      setMiles(editFormData.miles);
    }
  }, [editFormData, viewDetail]);

  /**
   * Used to check whether the combination of yards already exist or not
   */
  useEffect(() => {
    setIsExisting(false);
    if (yardOnePK && yardTwoPK) {
      if (!viewDetail) {
        setCheckingIsExists(true);
        isExistingService();
      }
    }
    // eslint-disable-next-line
  }, [yardOnePK, yardTwoPK]);

  useEffect(() => {
    const motorizedFilled = motorizedShuttleFee === "" || Number(motorizedShuttleFee) > 0;
    const towableFilled = towableShuttleFee === "" || Number(towableShuttleFee) > 0;
    dispatch(
      setSaveData({
        yardToYardShuttlesPK: selectedId || yardToYardShuttlePK || null,
        pickUpYardfk: yardOnePK,
        dropOffYardfk: yardTwoPK,
        towableShuttleFee: Number(towableShuttleFee) || 0.0,
        motorizedShuttleFee: Number(motorizedShuttleFee) || 0.0,
        miles: Number(miles) || 0,
      })
    );

    if (!isExisting && yardOnePK && yardTwoPK && miles > 0 && miles <= 32767) {
      if (motorizedFilled && towableFilled && (motorizedShuttleFee || towableShuttleFee)) {
        dispatch(setSaveDisable(false));
      } else if (motorizedFilled && towableShuttleFee === null) {
        dispatch(setSaveDisable(false));
      } else if (towableFilled && motorizedShuttleFee === null) {
        dispatch(setSaveDisable(false));
      } else {
        dispatch(setSaveDisable(true));
      }
    } else {
      dispatch(setSaveDisable(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedId,
    yardToYardShuttlePK,
    yardOnePK,
    yardTwoPK,
    towableShuttleFee,
    motorizedShuttleFee,
    miles,
    hasFee,
    isExisting,
    checkingIsExists,
  ]);

  useEffect(() => {
    dispatch(setYardToYardShuttlePK(selectedId || null));
    if (selectedId) {
      fetchYardToYardDetailsById();
    }
  }, []);

  return (
    <div className="p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight p-15">
        <Row className="m-0 p-0">
          <Col sm={7} md={7} lg={7} xl={7} xs={7}>
            <Form.Group className=" m-t-32  m-b-10 align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0 text-start">
                <Form.Label htmlFor="name" className=" mb-0  me-4">
                  {t("YardTOYardShuttle.list.page.table.heading.yardOne")}
                </Form.Label>
              </Col>
              <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                <AutoCompleteDropdown
                  arrayList={yardsData}
                  searchString={yardOne}
                  renderItemId={(yard) => yard.yardPK}
                  renderItemField={(yard) => yard.description}
                  handleSearchString={(string) => setYardOne(string)}
                  fetchDataBySearchString={fetchYardDetailByName}
                  loading={yardLoading}
                  onSelect={(yard) => {
                    if (yardTwoPK) setCheckingIsExists(true);
                    setYardOne(yard.description);
                    setYardOnePK(yard.yardPK);
                  }}
                  selectedId={yardOnePK}
                  clearInputCallback={() => {
                    setYardOnePK(null);
                  }}
                  className={`${
                    viewDetail || selectedId ? "" : yardOnePK && !isExisting ? "borderGreen" : "borderRed"
                  }`}
                  disabled={selectedId ? true : false}
                />
                <LookupButton
                  disabled={selectedId ? true : false}
                  onClick={() => setPickUpYardToYardSelection(true)}
                />
              </Col>
            </Form.Group>
            <Form.Group className=" m-t-32  m-b-10 align-items-center row   m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0 text-start">
                <Form.Label htmlFor="name" className=" mb-0  me-4">
                  {t("YardTOYardShuttle.list.page.table.heading.yardTwo")}
                </Form.Label>
              </Col>
              <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                <AutoCompleteDropdown
                  arrayList={yardsData}
                  searchString={yardTwo}
                  renderItemId={(yard) => yard.yardPK}
                  renderItemField={(yard) => yard.description}
                  handleSearchString={(string) => setYardTwo(string)}
                  fetchDataBySearchString={fetchYardDetailByName}
                  loading={yardLoading}
                  onSelect={(yard) => {
                    if (yardOnePK) setCheckingIsExists(true);
                    setYardTwo(yard.description);
                    setYardTwoPK(yard.yardPK);
                  }}
                  selectedId={yardTwoPK}
                  clearInputCallback={() => {
                    setYardTwoPK(null);
                  }}
                  className={`${
                    viewDetail || selectedId ? "" : yardTwoPK && !isExisting ? "borderGreen" : "borderRed"
                  }`}
                  disabled={selectedId ? true : false}
                />
                <LookupButton
                  disabled={selectedId ? true : false}
                  onClick={() => setDropOffYardToYardSelection(true)}
                />
              </Col>
            </Form.Group>
            <Form.Group className=" mt-5 m-b-10 align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0 text-start">
                <Form.Label htmlFor="name" className=" mb-0  me-4">
                  {t("YardTOYardShuttle.add.page.field.towableShuttleFee")}
                </Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0 w-70px">
                <Input
                  className={`${styles.formControl} ${
                    !viewDetail
                      ? !towableShuttleFee
                        ? motorizedShuttleFee
                          ? ""
                          : "borderRed"
                        : Number(towableShuttleFee) === 0 || isOnlyDot(towableShuttleFee)
                          ? "borderRed"
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
                  onBlur={(e) => setTowableShuttleFee(correctDecimalInputOnBlur(e.target.value))}
                  disabled={viewDetail}
                />
              </Col>
            </Form.Group>

            <Form.Group className=" mt-4 m-b-10 align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0 text-start">
                <Form.Label htmlFor="name" className=" mb-0 capitalize me-4">
                  {t("YardTOYardShuttle.add.page.field.motorizedShuttleFee")}
                </Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0 w-70px">
                <Input
                  className={`${styles.formControl} ${
                    !viewDetail
                      ? !motorizedShuttleFee
                        ? towableShuttleFee
                          ? ""
                          : "borderRed"
                        : Number(motorizedShuttleFee) === 0 || isOnlyDot(motorizedShuttleFee)
                          ? "borderRed"
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
                  onBlur={(e) => setMotorizedShuttleFee(correctDecimalInputOnBlur(e.target.value))}
                  disabled={viewDetail}
                />
              </Col>
            </Form.Group>

            <Form.Group className=" mt-4 m-b-10 align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0 text-start">
                <Form.Label htmlFor="name" className="mb-0 capitalize me-4">
                  {t("YardTOYardShuttle.add.page.field.miles")}
                </Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0 w-70px">
                <Input
                  className={`${styles.formControl} ${
                    !viewDetail &&
                    (miles === null || miles === "" || miles <= 0 || miles > 32767
                      ? "borderRed"
                      : "borderGreen")
                  }`}
                  name="miles"
                  type="text"
                  maxLength={5}
                  value={miles || ""}
                  onChange={(e) => {
                    e.target.value.match(/^\d{0,5}?$/) && e.target.value <= 32767 && setMiles(e.target.value);
                  }}
                  disabled={viewDetail}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <YardLookup
          show={pickUpYardToYardSelection}
          onHide={() => setPickUpYardToYardSelection(false)}
          renderItemId={(yard) => yard.yardPK}
          handleLookupSelection={(yard) => {
            setYardOnePK(yard.yardPK);
            setYardOne(yard.description);
            setPickUpYardToYardSelection(false);
          }}
          MaintenanceProgram
        />
        <YardLookup
          show={dropOffYardToYardSelection}
          onHide={() => setDropOffYardToYardSelection(false)}
          renderItemId={(yard) => yard.yardPK}
          handleLookupSelection={(yard) => {
            setYardTwoPK(yard.yardPK);
            setYardTwo(yard.description);
            setDropOffYardToYardSelection(false);
          }}
          MaintenanceProgram
        />
      </div>
    </div>
  );
}

export default YardToYardFormContent;
