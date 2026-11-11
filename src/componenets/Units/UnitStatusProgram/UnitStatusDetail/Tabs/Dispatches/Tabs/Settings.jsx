import React from "react";
import { Col, Form, Row } from "react-bootstrap";

function Settings({ data, activeSubTab }) {
  //  const dispatch = useDispatch();
  const unitData = data?.data?.[0] || "";
  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={3}>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Planet Shuttle
              </Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.PlantShuttle}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Round Trip Shuttle
              </Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input type="checkbox" className="form-check-input p-0" checked={unitData.RoundTrip} disabled />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Dealer Shuttle
              </Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.DealerShuttle}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Invoice Shuttle
              </Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.InvoiceShuttle}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center invisible row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input type="checkbox" className="form-check-input p-0" />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Delay Return
              </Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input type="checkbox" className="form-check-input p-0" checked={unitData.IsReturn} disabled />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Reload
              </Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input type="checkbox" className="form-check-input p-0" checked={unitData.Reload} disabled />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center invisible row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input type="checkbox" className="form-check-input p-0" />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Active
              </Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input type="checkbox" className="form-check-input p-0" checked={unitData.Active} disabled />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Dispatch Active
              </Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.ActiveDispatch}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Restricted Dispatch
              </Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.RestrictedDispatch}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Driver Dispatch
              </Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.DriverDispatch}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Driver View Only
              </Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.DriverViewOnly}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Dispatch Priority
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.Priority || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center invisible  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={1} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Reserved For Driver
              </Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input type="checkbox" className="form-check-input p-0" checked={unitData.Reserved} disabled />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center   row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Reserved Driver
              </Form.Label>
            </Col>

            <Col xs={7} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.NAME || ""}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={3}>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Dispatched
              </Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.Dispatched}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Multi Unit Dispatch
              </Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.MultiDispatch}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Required Flatbed
              </Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.RequireFlatbed}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center invisible row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <input type="checkbox" className="form-check-input p-0" />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Abandoned
              </Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <input type="checkbox" className="form-check-input p-0" checked={unitData.Abandoned} disabled />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                No Redispatch
              </Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.NoRedispatch}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Partial Trip
              </Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.PartialTrip}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center invisible row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <input type="checkbox" className="form-check-input p-0" />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Flat Rated
              </Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <input type="checkbox" className="form-check-input p-0" checked={unitData.FlatRated} disabled />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Minimum Pay
              </Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.MinimumPay}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Return Rated
              </Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.ReturnRated}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center invisible row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <input type="checkbox" className="form-check-input p-0" />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                No Pickup Pullout Fee
              </Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.NoPickupPulloutFee}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                No Delivery Pullout Fee
              </Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.NoDeliveryPulloutFee}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Delivery Bonus
              </Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.DeliveryBonus}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={3}>
          <Form.Group
            className={`mt-2 form-group  align-items-center   row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Bonus Pool In
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.BonusPoolIn || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center   row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Bonus Pool Out
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.BonusPoolOut || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center invisible  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={2} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                At Fault Damage
              </Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.AtFaultDamage}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center invisible  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={2} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Emanifest Processed
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0 h">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.EmanifestProcessed}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center invisible  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={2} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center   row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Late Paperwork
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.LatePaperwork || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center   row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Late Paperwork Fee
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={unitData?.LatePaperworkFee || ""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Missing Paperwork
              </Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={unitData.MissingPaperwork}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default Settings;
