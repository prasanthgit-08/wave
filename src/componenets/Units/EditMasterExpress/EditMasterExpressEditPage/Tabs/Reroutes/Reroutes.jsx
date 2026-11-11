import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import formatDatetimeToDate from "../../../../../../utils/formatDateTimeToDate";
import {
  setIsRerouteTabValid,
  setEditedUnitDataToSaveForRerouteTab,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";
import DateInputField from "../../../../../common/DateInputField";

function Reroutes({ styles }) {
  const dispatch = useDispatch();
  //Local States
  const [unitReroutePK, setUnitReroutePK] = useState("");
  const [rerouteDate, setRerouteDate] = useState("");
  const [authorizedBy, setAuthorizedBy] = useState("");
  const [oldInvoiceMiles, setOldInvoiceMiles] = useState(0);
  const [oldDriverMiles, setOldDriverMiles] = useState(0);
  const [invoiceMiles, setInvoiceMiles] = useState(0);
  const [driverMiles, setDriverMiles] = useState(0);
  const [invoiceFlatRate, setInvoiceFlatRate] = useState(0);
  const [driverFlatRate, setDriverFlatRate] = useState(0);
  const [oldInvoiceFlatRate, setOldInvoiceFlatRate] = useState(0);
  const [oldDriverFlatRate, setOldDriverFlatRate] = useState(0);
  const [notes, setNotes] = useState("");
  const [pickup, setPickup] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [originalLocationName, setOriginalLocationName] = useState("");
  const [originalLocationAddress1, setOriginalLocationAddress1] = useState("");
  const [originalLocationAddress2, setOriginalLocationAddress2] = useState("");
  const [originalLocationCity, setOriginalLocationCity] = useState("");
  const [originalLocationStateCode, setOriginalLocationStateCode] = useState("");
  const [originalLocationPostalCode, setOriginalLocationPostalCode] = useState("");
  const [reRoutedToLocationName, setReRoutedToLocationName] = useState("");
  const [reRoutedToLocationAddress1, setReRoutedToLocationAddress1] = useState("");
  const [reRoutedToLocationAddress2, setReRoutedToLocationAddress2] = useState("");
  const [reRoutedToLocationCity, setReRoutedToLocationCity] = useState("");
  const [reRoutedToLocationStateCode, setReRoutedToLocationStateCode] = useState("");
  const [reRoutedToLocationPostalCode, setReRoutedToLocationPostalCode] = useState("");
  const [reRoutedAtLocationName, setReRoutedAtLocationName] = useState("");
  const [reRoutedAtLocationAddress1, setReRoutedAtLocationAddress1] = useState("");
  const [reRoutedAtLocationAddress2, setReRoutedAtLocationAddress2] = useState("");
  const [reRoutedAtLocationPostalCode, setReRoutedAtLocationPostalCode] = useState("");
  const [reRoutedAtLocationCity, setReRoutedAtLocationCity] = useState("");
  const [reRoutedAtLocationStateCode, setReRoutedAtLocationStateCode] = useState("");
  const [dealerReroute, setdealerReroute] = useState(false);
  const [dealerCustomerName, setDealerCustomerName] = useState("");
  const [dealerResponcible, setDealerResponcible] = useState(0);

  //States From Redux
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const isUnitDataLoading = useSelector((state) => state.editMasterExpress.isUnitDataLoading);

  //Populating selected unit details
  useEffect(() => {
    if (selectedUnitData != null) {
      setUnitReroutePK(selectedUnitData?.editMaserExpressReroutesTabDTO?.unitReroutePK || "");
      setRerouteDate(
        formatDatetimeToDate(selectedUnitData?.editMaserExpressReroutesTabDTO?.rerouteDate) || ""
      );
      setAuthorizedBy(selectedUnitData?.editMaserExpressReroutesTabDTO?.authorizedBy?.trim() || "");
      setOldInvoiceMiles(selectedUnitData?.editMaserExpressReroutesTabDTO?.oldInvoiceMiles || "");
      setOldDriverMiles(selectedUnitData?.editMaserExpressReroutesTabDTO?.oldDriverMiles || "");
      setInvoiceMiles(selectedUnitData?.editMaserExpressReroutesTabDTO?.invoiceMiles || "");
      setDriverMiles(selectedUnitData?.editMaserExpressReroutesTabDTO?.driverMiles || "");
      setInvoiceFlatRate(selectedUnitData?.editMaserExpressReroutesTabDTO?.invoiceFlatRate || 0);
      setDriverFlatRate(selectedUnitData?.editMaserExpressReroutesTabDTO?.driverFlatRate || 0);
      setOldInvoiceFlatRate(selectedUnitData?.editMaserExpressReroutesTabDTO?.oldInvoiceFlatRate || 0);
      setOldDriverFlatRate(selectedUnitData?.editMaserExpressReroutesTabDTO?.oldDriverFlatRate || 0);
      setNotes(selectedUnitData?.editMaserExpressReroutesTabDTO?.notes || "");
      setPickup(selectedUnitData?.editMaserExpressReroutesTabDTO?.pickup || false);
      setDelivery(selectedUnitData?.editMaserExpressReroutesTabDTO?.delivery || false);
      setOriginalLocationName(selectedUnitData?.editMaserExpressReroutesTabDTO?.originalLocationName || "");
      setOriginalLocationAddress1(
        selectedUnitData?.editMaserExpressReroutesTabDTO?.originalLocationAddress1 || ""
      );
      setOriginalLocationAddress2(
        selectedUnitData?.editMaserExpressReroutesTabDTO?.originalLocationAddress2 || ""
      );
      setOriginalLocationCity(selectedUnitData?.editMaserExpressReroutesTabDTO?.originalLocationCity || "");
      setOriginalLocationStateCode(
        selectedUnitData?.editMaserExpressReroutesTabDTO?.originalLocationStateCode || ""
      );
      setOriginalLocationPostalCode(
        selectedUnitData?.editMaserExpressReroutesTabDTO?.originalLocationPostalCode || ""
      );
      setReRoutedAtLocationName(
        selectedUnitData?.editMaserExpressReroutesTabDTO?.reRoutedAtLocationName || ""
      );
      setReRoutedAtLocationAddress1(
        selectedUnitData?.editMaserExpressReroutesTabDTO?.reRoutedAtLocationAddress1 || ""
      );
      setReRoutedAtLocationAddress2(
        selectedUnitData?.editMaserExpressReroutesTabDTO?.reRoutedAtLocationAddress2 || ""
      );
      setReRoutedAtLocationPostalCode(
        selectedUnitData?.editMaserExpressReroutesTabDTO?.reRoutedAtLocationPostalCode || ""
      );
      setReRoutedAtLocationCity(
        selectedUnitData?.editMaserExpressReroutesTabDTO?.reRoutedAtLocationCity || ""
      );
      setReRoutedAtLocationStateCode(
        selectedUnitData?.editMaserExpressReroutesTabDTO?.reRoutedAtLocationStateCode || ""
      );

      setReRoutedToLocationName(
        selectedUnitData?.editMaserExpressReroutesTabDTO?.reRoutedToLocationName || ""
      );
      setReRoutedToLocationAddress1(
        selectedUnitData?.editMaserExpressReroutesTabDTO?.reRoutedToLocationAddress1 || ""
      );
      setReRoutedToLocationAddress2(
        selectedUnitData?.editMaserExpressReroutesTabDTO?.reRoutedToLocationAddress2 || ""
      );
      setReRoutedToLocationCity(
        selectedUnitData?.editMaserExpressReroutesTabDTO?.reRoutedToLocationCity || ""
      );
      setReRoutedToLocationStateCode(
        selectedUnitData?.editMaserExpressReroutesTabDTO?.reRoutedToLocationStateCode || ""
      );
      setReRoutedToLocationPostalCode(
        selectedUnitData?.editMaserExpressReroutesTabDTO?.reRoutedToLocationPostalCode || ""
      );

      setdealerReroute(selectedUnitData?.editMaserExpressReroutesTabDTO?.dealerReroute || false);
      setDealerCustomerName(
        selectedUnitData?.editMaserExpressReroutesTabDTO?.dealerCustomerName?.trim() || ""
      );
      setDealerResponcible(selectedUnitData?.editMaserExpressReroutesTabDTO?.dealerResponcible || 0);
    }
    // eslint-disable-next-line
  }, [selectedUnitData, viewDetail]);

  useEffect(() => {
    if (authorizedBy?.trim() !== "" && (!dealerReroute || (dealerReroute && dealerResponcible !== ""))) {
      dispatch(setIsRerouteTabValid(true));
    } else {
      dispatch(setIsRerouteTabValid(false));
    }
  }, [authorizedBy, dealerReroute, dealerResponcible]);

  /*** Implementation Of Save - Setting edited unit data for save ***/
  const settingEditedUnitDataToSave = () => {
    dispatch(
      setEditedUnitDataToSaveForRerouteTab({
        unitReroutePK: unitReroutePK,
        authorizedBy: authorizedBy,
        notes: notes,
        dealerResponcible: dealerResponcible,
      })
    );
  };

  useEffect(() => {
    settingEditedUnitDataToSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorizedBy, notes, dealerResponcible]);

  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={6}>
          {/* Reroute Date */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Reroute Date</Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0">
              <DateInputField date={rerouteDate} disabled />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center invisible row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={6} className="p-0">
              <input className={`customFormControl`} type="text" />
            </Col>
          </Form.Group>

          {/* Authorized By */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Authorized By</Form.Label>
            </Col>
            <Col xs={4} className="p-0">
              <input
                className={`customFormControl ${
                  isUnitDataLoading || viewDetail ? "" : authorizedBy !== "" ? "borderGreen" : "borderRed"
                }`}
                name="authorizedBy"
                type="text"
                value={authorizedBy}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail}
                onInput={(e) => {
                  let value = e.target.value;
                  if (value === " ") {
                    return;
                  }
                  setAuthorizedBy(value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row invisible  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={2} className="p-0">
              <input className={`customFormControl`} type="text" />
            </Col>
          </Form.Group>

          {/* Invoice,Driver */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={1} className="p-0 me-2">
              <Form.Label className={`customColFormLabel`}>Invoice</Form.Label>
            </Col>
            <Col xs={1} className="p-0">
              <Form.Label className={`customColFormLabel`}>Driver</Form.Label>
            </Col>
          </Form.Group>

          {/* Original Miles */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Original Miles</Form.Label>
            </Col>
            <Col xs={1} className="p-0 me-2">
              <input className={`customFormControl`} type="text" disabled value={oldInvoiceMiles} />
            </Col>
            <Col xs={1} className="p-0">
              <input className={`customFormControl`} type="text" disabled value={oldDriverMiles} />
            </Col>
          </Form.Group>

          {/* Reroute Miles */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Reroute Miles</Form.Label>
            </Col>
            <Col xs={1} className="p-0 me-2">
              <input className={`customFormControl`} type="text" disabled value={invoiceMiles} />
            </Col>
            <Col xs={1} className="p-0">
              <input className={`customFormControl`} type="text" disabled value={driverMiles} />
            </Col>
          </Form.Group>

          {/* Reroute Flatrate */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Reroute Flatrate</Form.Label>
            </Col>
            <Col xs={1} className="p-0 me-2">
              <input className={`customFormControl`} type="text" disabled value={invoiceFlatRate} />
            </Col>
            <Col xs={1} className="p-0">
              <input className={`customFormControl`} type="text" disabled value={driverFlatRate} />
            </Col>
          </Form.Group>

          {/* Original Flatrate */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Original Flatrate</Form.Label>
            </Col>
            <Col xs={1} className="p-0 me-2">
              <input className={`customFormControl`} type="text" disabled value={oldInvoiceFlatRate} />
            </Col>
            <Col xs={1} className="p-0">
              <input className={`customFormControl`} type="text" disabled value={oldDriverFlatRate} />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center invisible row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={1} className="p-0 me-2">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
            <Col xs={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>

          {/* Notes */}
          <Form.Group className="mt-2 align-items-start row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Notes</Form.Label>
            </Col>
            <Col xs={9} className="p-0">
              <textarea
                rows={9}
                className={`customFormControl h-100`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                name="notes"
                value={notes}
                disabled={viewDetail}
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  setNotes(value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={5} className="ms-2">
          {/* Reroute Location */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 `}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="engineType">
                Reroute Location
              </Form.Label>
            </Col>
            <Col xs={4} className={`p-0 ${styles.selectContainer}`}>
              <Col className="d-flex align-items-center">
                {/* Pickup */}
                <input type="radio" name="pickup" value={pickup} checked={pickup} disabled />
                <label className="ms-2">Pickup</label>
              </Col>
              {/* Delivery */}
              <Col className="d-flex align-items-center">
                <input type="radio" name="delivery" value={delivery} checked={delivery} disabled />
                <label className="ms-2">Delivery</label>
              </Col>
            </Col>
          </Form.Group>

          {/* Original Location - Start */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Original Location</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" value={originalLocationName} disabled />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Address</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" value={originalLocationAddress1} disabled />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" value={originalLocationAddress2} disabled />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>City,State,ZIP</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" value={originalLocationCity} disabled />
            </Col>
            <div className="p-0 w-30px mx-1">
              <input className={`customFormControl`} type="text" value={originalLocationStateCode} disabled />
            </div>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                className={`customFormControl w-80px`}
                type="text"
                value={originalLocationPostalCode}
                disabled
              />
            </Col>
          </Form.Group>
          {/* Original Location - End */}

          <Form.Group className="mt-2 align-items-center row invisible  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" />
            </Col>
            <div className="p-0 w-30px mx-1">
              <input className={`customFormControl`} type="text" />
            </div>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input className={`customFormControl`} type="text" />
            </Col>
          </Form.Group>

          {/* Rerouted At - Start*/}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Rerouted At</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" value={reRoutedAtLocationName} disabled />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Address</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                value={reRoutedAtLocationAddress1}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                value={reRoutedAtLocationAddress2}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>City,State,ZIP</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" value={reRoutedAtLocationCity} disabled />
            </Col>
            <div className="p-0 w-30px mx-1">
              <input
                className={`customFormControl`}
                type="text"
                value={reRoutedAtLocationStateCode}
                disabled
              />
            </div>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                className={`customFormControl w-80px`}
                type="text"
                value={reRoutedAtLocationPostalCode}
                disabled
              />
            </Col>
          </Form.Group>

          {/* Rerouted At - End*/}

          <Form.Group className="mt-2 align-items-center row invisible  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" />
            </Col>
            <div className="p-0 w-30px mx-1">
              <input className={`customFormControl`} type="text" />
            </div>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input className={`customFormControl`} type="text" />
            </Col>
          </Form.Group>

          {/* Reroute Location - Start*/}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Reroute Location</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" value={reRoutedToLocationName} disabled />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Address</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                value={reRoutedToLocationAddress1}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                value={reRoutedToLocationAddress2}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>City,State,ZIP</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" value={reRoutedToLocationCity} disabled />
            </Col>
            <div className="p-0 w-30px mx-1">
              <input
                className={`customFormControl`}
                type="text"
                value={reRoutedToLocationStateCode}
                disabled
              />
            </div>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                className={`customFormControl w-80px`}
                type="text"
                value={reRoutedToLocationPostalCode}
                disabled
              />
            </Col>
          </Form.Group>
          {/* Reroute Location - End*/}

          <Form.Group className="mt-2 align-items-center row invisible  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
            <div className="p-0 w-30px mx-1">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>

          {/* Dealer Reroute */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`}>Dealer Reroute</Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                value={dealerReroute}
                checked={dealerReroute}
                disabled
              />
            </Col>
          </Form.Group>

          {/* Dealer Customer */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Dealer Customer</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" disabled value={dealerCustomerName || ""} />
            </Col>
          </Form.Group>

          {/* Dealer Responsible Amount */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Dealer Responsible Amount</Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                className={`customFormControl ${
                  isUnitDataLoading || viewDetail || !dealerReroute
                    ? ""
                    : dealerReroute && dealerResponcible !== ""
                      ? "borderGreen"
                      : "borderRed"
                }`}
                type="text"
                value={dealerResponcible}
                onInput={(e) => {
                  let value = e.target.value;
                  if (value === ".") {
                    return;
                  }
                  if (value === "" || value.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    setDealerResponcible(value);
                  }
                }}
                disabled={isUnitDataLoading || viewDetail || !dealerReroute}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default Reroutes;
