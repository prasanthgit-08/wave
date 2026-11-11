import { parseLocalDate } from "../../../../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Form, Col } from "react-bootstrap";
import DateInputField from "../../../../../../../../componenets/common/DateInputField";
import { useSelector, useDispatch } from "react-redux";
import {
  setPickupDate,
  setDeliveryDate,
  setDisableDispatch,
  setDisableDates,
} from "../../../../../../../../redux/DispatchesSlice";
import DispatchesService from "../../../../../../../../services/DispatchesService";
import { customFormatDate } from "../../../../../../../../utils/validation/DateFormatUtils";
import ModalComponent from "../../../../../../../../componenets/common/ModalComponent";
import formatDatetimeToDate from "../../../../../../../../utils/formatDateTimeToDate";
import LoadingIcon from "../../../../../../../common/LoadingIcon";

const UnitDates = ({ unitdate }) => {
  const dispatch = useDispatch();

  const pickupDate = useSelector((state) => state.dispatchesReducer.pickupDate);
  const deliveryDate = useSelector((state) => state.dispatchesReducer.deliveryDate);
  const dispatchViewObject = useSelector((state) => state.dispatchesReducer.dispatchViewObject);
  const disableDateFields = useSelector((state) => state.dispatchesReducer.disableDates);

  const [defaultPickup, setDefaultPickup] = useState(new Date());
  const [defaultDelivery, setDefaultDelivery] = useState(new Date());
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [isPickupDateValid, setIsPickupDateValid] = useState(true);
  const [isDeliveryDateValid, setIsDeliveryDateValid] = useState(true);

  // both dates are required: red when empty, or when typed text is invalid / outside min-max
  const getDateBorderClass = (date, isValid) => {
    if (disableDateFields) return "";
    return date && isValid ? "" : "borderRed";
  };

  useEffect(() => {
    if (!unitdate || disableDateFields) return; // already disabled when the locations are missing
    const datesValid = !!selectedPickup && !!selectedDelivery && isPickupDateValid && isDeliveryDateValid;
    dispatch(setDisableDispatch(!datesValid));
  }, [isPickupDateValid, isDeliveryDateValid, selectedPickup, selectedDelivery]);

  const [pickupMsg, setPickupMsg] = useState(null);
  const [deliveryMsg, setDeliveryMsg] = useState(null);

  const [maxPickup, setMaxPickup] = useState(null);
  const [maxDelivery, setMaxDelivery] = useState(null);
  const [minDelivery, setMinDelivery] = useState(null);
  const [deliverByDate, setDeliverByDate] = useState(null);
  const [pickupWarningPopup, setPickupWarningPopup] = useState(false);
  const [deliveryWarningPopup, setDeliveryWarningPopup] = useState(false);
  const [deliveryWarningAcceptRejectPopup, setDeliveryWarningAcceptRejectPopup] = useState(false);

  const [deliveryAccept, setDeliveryAccept] = useState(false);

  const [response, setResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const division = useSelector((state) => state.dispatchesReducer.divisionStatus);
  const index = useSelector((state) => state.dispatchesReducer.index);
  const dispatchViewData =
    division === "driveaway" || division === "towaway"
      ? dispatchViewObject
      : dispatchViewObject
        ? dispatchViewObject[index]
        : null;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setPickupWarningPopup(false);
    setDeliveryWarningPopup(false);
    if (!(
      (dispatchViewData?.dispatchesDateVO.pickupCustomerPlantFK != null ||
        dispatchViewData?.dispatchesDateVO.pickupDealerFK != null ||
        dispatchViewData?.dispatchesDateVO.pickupUnitAddressFK != null ||
        dispatchViewData?.dispatchesDateVO.pickupYardFK != null) &&
      (dispatchViewData?.dispatchesDateVO.deliveryCustomerPlantFK != null ||
        dispatchViewData?.dispatchesDateVO.deliveryDealerFK != null ||
        dispatchViewData?.dispatchesDateVO.deliveryUnitAddressFK != null ||
        dispatchViewData?.dispatchesDateVO.deliveryYardFK != null)
    )) {
      dispatch(setDisableDispatch(true));
      dispatch(setDisableDates(true));
    } else {
      if (dispatchViewData != null && unitdate && pickupDate == null && deliveryDate == null) {
        getPickupAndDeliveryDates(dispatchViewData);
        dispatch(setDisableDates(false));
        dispatch(setDisableDispatch(false));
      } else if (dispatchViewData != null && unitdate && (!selectedPickup || !selectedDelivery)) {
        //If user clears both dates and click previous and then come back these fields become empty.So we need to set the default dates
        //or condition is added for that.

        let dispatchData = { ...dispatchViewData };
        dispatchData.selectedPickupDate = null; // Set pickup  & deliverydate to null
        dispatchData.selectedDeliveryDate = null;
        getPickupAndDeliveryDates(dispatchData);
        dispatch(setDisableDispatch(false));
      }
    }
  }, [unitdate]);

  useEffect(() => {
    if (
      (selectedPickup != null && selectedPickup !== "" && pickupDate !== selectedPickup) ||
      (selectedPickup != null &&
        selectedPickup !== "" &&
        (selectedDelivery == null || selectedDelivery == ""))
    ) {
      DispatchesService.getPickupAndDeliveryDates(
        dispatchViewData,
        formatDatetimeToDate(selectedPickup),
        null,
        null
      )
        .then((response) => {
          const data = response.data;
          if (data?.errorMsg !== null) {
            setPickupWarningPopup(true);
            setErrorMsg(data.errorMsg);
          } else {
            //setSelectedDelivery(null);
            dispatch(setPickupDate(data.selectedPickupDate));
            dispatch(setDeliveryDate(data.defaultDeliveryDate));

            setDefaultDelivery(data.defaultDeliveryDate);
            setDefaultPickup(data.selectedPickupDate);

            setSelectedDelivery(parseLocalDate(data.defaultDeliveryDate));
            setPickupMsg(data.pickupDateMsg ? data.pickupDateMsg : "");
            setDeliveryMsg(data.deliveryDateMsg ? data.deliveryDateMsg : "");

            /*If Max date or deliverby date is a past date, we need to set default delivery date as the max delivery date */
            if (data?.maxDeliveryDate) {
              let maxDateinDB = parseLocalDate(data.maxDeliveryDate);
              setMaxDelivery(
                maxDateinDB <= parseLocalDate(data.defaultDeliveryDate)
                  ? parseLocalDate(data.defaultDeliveryDate)
                  : maxDateinDB
              );
            } else if (data?.deliverByDate) {
              let maxDeliverByDateinDB = parseLocalDate(data.deliverByDate);
              setMaxDelivery(
                maxDeliverByDateinDB <= parseLocalDate(data.defaultDeliveryDate)
                  ? parseLocalDate(data.defaultDeliveryDate)
                  : maxDeliverByDateinDB
              );
            } else {
              setMaxDelivery(null);
            }

            //if min delivery date ia s future date, that should be the min pick up date in calendar
            if (data?.minDeliveryDate) {
              let minDateinDB = parseLocalDate(data.minDeliveryDate);
              let mindateinUI = data.selectedPickupDate
                ? parseLocalDate(data.selectedPickupDate)
                : data.defaultPickupDate;
              setMinDelivery(
                minDateinDB >= parseLocalDate(mindateinUI) ? minDateinDB : parseLocalDate(mindateinUI)
              );
            } else {
              setMinDelivery(defaultPickup);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedPickup]);

  useEffect(() => {
    if (
      (selectedDelivery != null && selectedDelivery !== "" && selectedDelivery !== deliveryDate) ||
      deliveryAccept === true
    ) {
      DispatchesService.getPickupAndDeliveryDates(
        dispatchViewData,
        formatDatetimeToDate(pickupDate),
        formatDatetimeToDate(selectedDelivery),
        acceptDeliveryWarning
      )
        .then((response) => {
          const data = response.data;
          if (data?.errorMsg !== null) {
            if (data.errorMsg.indexOf("miles") !== -1) {
              setDeliveryWarningAcceptRejectPopup(true);
            } else {
              setDeliveryWarningPopup(true);
            }
            setErrorMsg(data.errorMsg);
            setPickupMsg(pickupMsg);
            setDeliveryMsg(deliveryMsg);
          } else {
            //  setDefaultDelivery(data.defaultDeliveryDate?data.defaultDeliveryDate:data.selectedDeliveryDate);
            dispatch(setDeliveryDate(selectedDelivery));
            setPickupMsg(pickupMsg);
            setDeliveryMsg(deliveryMsg);
            /*If Max date or deliverby date is a past date, we need to set default delivery date as the max delivery date */
            if (data?.maxDeliveryDate) {
              let maxDateinDB = parseLocalDate(data.maxDeliveryDate);
              setMaxDelivery(
                maxDateinDB <= parseLocalDate(data.selectedDeliveryDate)
                  ? parseLocalDate(data.selectedDeliveryDate)
                  : maxDateinDB
              );
            } else if (data?.deliverByDate) {
              let maxDeliverByDateinDB = parseLocalDate(data.deliverByDate);
              setMaxDelivery(
                maxDeliverByDateinDB <= parseLocalDate(data.selectedDeliveryDate)
                  ? parseLocalDate(data.selectedDeliveryDate)
                  : maxDeliverByDateinDB
              );
            } else {
              setMaxDelivery(null);
            }

            //if min delivery date ia s future date, that should be the min pick up date in calendar
            if (data?.minDeliveryDate) {
              let minDateinDB = parseLocalDate(data.minDeliveryDate);
              let mindateinUI = data.selectedPickupDate
                ? parseLocalDate(data.selectedPickupDate)
                : data.defaultPickupDate;
              setMinDelivery(
                minDateinDB >= parseLocalDate(mindateinUI) ? minDateinDB : parseLocalDate(mindateinUI)
              );
            } else {
              setMinDelivery(defaultPickup);
            }
          }
          setDeliveryAccept(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedDelivery]);

  const handlePickupWarning = () => {
    setPickupWarningPopup(false);
    setDefaultDelivery(parseLocalDate(response.defaultDeliveryDate));
    setSelectedPickup(defaultPickup);
    setSelectedDelivery(defaultDelivery);
  };

  const handleDeliveryWarning = () => {
    setDeliveryWarningPopup(false);
    setDeliveryWarningAcceptRejectPopup(false);
    setSelectedDelivery(defaultDelivery);
  };

  const changeSelectedPickupDate = (value) => {
    setSelectedPickup(value);
    //if value is empty or null, disable dispatch button
    if (value) {
      dispatch(setDisableDispatch(false));
    } else {
      dispatch(setDisableDispatch(true));
    }
  };
  const changeSelectedDispatchDate = (value) => {
    setSelectedDelivery(value);
    //if value is empty or null, disable dispatch button
    if (value) {
      dispatch(setDisableDispatch(false));
    } else {
      dispatch(setDisableDispatch(true));
    }
  };
  const acceptDeliveryWarning = () => {
    setDeliveryAccept(true);
    setDeliveryWarningPopup(false);
    setDeliveryWarningAcceptRejectPopup(false);
    setSelectedDelivery(selectedDelivery);
    setDefaultDelivery(deliveryDate);
  };
  const getPickupAndDeliveryDates = () => {
    DispatchesService.getPickupAndDeliveryDates(dispatchViewData, null, null)
      .then((response) => {
        setLoading(false);
        const data = response.data;
        setResponse(data);
        //Defaultpickup is for resetting to default values when error comes.For non error condition, this will be set again
        setDefaultPickup(data.defaultPickupDate);
        setDefaultDelivery(data.defaultDeliveryDate);

        setPickupMsg(data.pickupDateMsg ? data.pickupDateMsg : "");
        setDeliveryMsg(data.deliveryDateMsg ? data.deliveryDateMsg : "");

        /*If Max date or deliverby date is a past date, we need to set default delivery date as the max delivery date */
        if (data?.maxDeliveryDate) {
          let maxDateinDB = parseLocalDate(data.maxDeliveryDate);
          setMaxDelivery(maxDateinDB <= new Date() ? parseLocalDate(data.defaultDeliveryDate) : maxDateinDB);
        } else if (data?.deliverByDate) {
          let maxDeliverByDateinDB = parseLocalDate(data.deliverByDate);
          setMaxDelivery(
            maxDeliverByDateinDB <= new Date()
              ? parseLocalDate(data.defaultDeliveryDate)
              : maxDeliverByDateinDB
          );
        } else {
          setMaxDelivery(null);
        }

        if (data?.maxPickupDate) {
          let maxPickupInDB = parseLocalDate(data.maxPickupDate);
          setMaxPickup(
            maxPickupInDB < parseLocalDate(data.defaultPickupDate)
              ? parseLocalDate(data.defaultPickupDate)
              : maxPickupInDB
          );
        }
        dispatch(setPickupDate(data.defaultPickupDate));
        dispatch(setDeliveryDate(data.defaultDeliveryDate));

        //if min delivery date ia s future date, that should be the min pick up date in calendar
        if (data?.minDeliveryDate) {
          let minDateinDB = parseLocalDate(data.minDeliveryDate);
          let mindateinUI = data.selectedPickupDate
            ? parseLocalDate(data.selectedPickupDate)
            : data.defaultPickupDate;
          setMinDelivery(
            minDateinDB >= parseLocalDate(mindateinUI) ? minDateinDB : parseLocalDate(mindateinUI)
          );
        } else {
          setMinDelivery(pickupDate ? parseLocalDate(pickupDate) : parseLocalDate(data.defaultPickupDate));
        }
        //set selected pickup and delivery date to default Added for bug fixing
        setSelectedDelivery(data.defaultDeliveryDate);
        setSelectedPickup(data.defaultPickupDate);
        //Bug fixing ended
      })
      .catch((err) => {
        setLoading(false);
        dispatch(setDisableDispatch(true));
        console.log(err);
      });
  };

  return (
    <>
      {unitdate && loading ? (
        <LoadingIcon />
      ) : (
        unitdate && (
          <>
            <Form.Group className="mt-2 align-items-center row m-l-0 m-r-0">
              <Col sm={1} md={1} xs={1} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Pickup Date
                </Form.Label>
              </Col>

              <Col xs={1} md={1} sm={1} className="p-0 me-3">
                {
                  <DateInputField
                    disabled={disableDateFields}
                    date={selectedPickup}
                    setDate={(value) => changeSelectedPickupDate(value)}
                    setIsDateValid={setIsPickupDateValid}
                    className={getDateBorderClass(selectedPickup, isPickupDateValid)}
                    max={maxPickup ? parseLocalDate(maxPickup) : ""}
                    min={
                      response?.defaultPickupDate ? parseLocalDate(response.defaultPickupDate) : defaultPickup
                    }
                  />
                }
              </Col>

              <Col xs={4} md={4} sm={4} className="p-0">
                <input type="text" className="customFormControl" value={pickupMsg} disabled />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
              <Col sm={1} md={1} xs={1} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Delivery Date
                </Form.Label>
              </Col>

              <Col xs={1} md={1} sm={1} className="p-0 me-3">
                <DateInputField
                  disabled={disableDateFields}
                  date={selectedDelivery}
                  setDate={(value) => {
                    changeSelectedDispatchDate(value);
                  }} //changeSelectedPickupDate
                  setIsDateValid={setIsDeliveryDateValid}
                  className={getDateBorderClass(selectedDelivery, isDeliveryDateValid)}
                  min={selectedPickup ? parseLocalDate(selectedPickup) : parseLocalDate(minDelivery)}
                  max={maxDelivery ? parseLocalDate(maxDelivery) : ""}
                />
              </Col>

              <Col xs={4} md={4} sm={4} className="p-0">
                <input type="text" className="customFormControl" value={deliveryMsg} disabled />
              </Col>
            </Form.Group>
            <ModalComponent
              show={pickupWarningPopup}
              onHide={handlePickupWarning}
              title={"Warning"}
              body={errorMsg}
              okayButton
              showError
              handleOK={handlePickupWarning}
            />
            <ModalComponent
              show={deliveryWarningPopup}
              onHide={handleDeliveryWarning}
              title={"Warning"}
              body={errorMsg}
              okayButton
              showError
              handleOK={handleDeliveryWarning}
            />
            <ModalComponent
              acceptOrReject
              show={deliveryWarningAcceptRejectPopup}
              onHide={handleDeliveryWarning}
              title={"Warning"}
              body={errorMsg}
              showError
              handleAccept={acceptDeliveryWarning}
              handleReject={handleDeliveryWarning}
            />
          </>
        )
      )}
    </>
  );
};

export default UnitDates;
