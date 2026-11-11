import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../../../../../componenets/common/AutoCompleteDropdown";
import UnitConfirmationFooter from "./UnitConfirmationFooter";
import DispatchesService from "../../../../../../../../services/DispatchesService";
import { useSelector, useDispatch } from "react-redux";
import { setDispatchViewObject } from "../../../../../../../../redux/DispatchesSlice";
import UnitConfirmationHeader from "./UnitConfirmationHeader";

function TowableUnitConfirmation() {
  const dispatch = useDispatch();
  const [driverPulloutFee, setDriverPulloutFee] = useState(0);
  const [totalFee, setTotalFee] = useState(0);

  const dispatchPK = useSelector((state) => state.dispatchesReducer.selectedDispatchPK);
  const divisionStatus = useSelector((state) => state.dispatchesReducer.divisionStatus);
  const regionStatus = useSelector((state) => state.dispatchesReducer.regionStatus);
  const driverData = useSelector((state) => state.dispatchesReducer.driverData);

  useEffect(() => {
    if (divisionStatus != null && divisionStatus === "towaway") {
      DispatchesService.getDispatchesViewData(dispatchPK, driverData?.payPickupFee)
        .then((response) => {
          const data = response.data;
          let dispatchViewObject = null;
          if (data !== null) {
            data.driverQual = 0;
            dispatchViewObject = data;
            setDriverPulloutFee(data.totalPulloutFee);
            let amt = data.totalPulloutFee;
            let totalCharges =
              Number(data.flatRate || 0) +
              Number(data.additionalFee || 0) -
              (Number(amt || 0) + Number(data.driverQual || 0));
            setTotalFee(totalCharges);
            dispatch(setDispatchViewObject({ ...dispatchViewObject, totalCharges }));
          }
        })
        .catch((err) => {});
    }
  }, [dispatchPK, divisionStatus, regionStatus]);

  return (
    <div className="customMaintenanceFormWidthContainer">
      <div className="add-form-component customMaintenanceFormWidth p-20">
        <UnitConfirmationHeader />
        <div className="shadow-sm rounded border h-800px  p-2">
          <Row>
            <Col xs={6}>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Pickup
                  </Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input type="text" className="customFormControl" />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input type="text" className="customFormControl" />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input type="text" className="customFormControl" />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0 d-flex">
                  <div className="col-7">
                    <input type="text" className="customFormControl " />
                  </div>
                  <div className="col-1 mx-4">
                    <input type="text" className="customFormControl " />
                  </div>
                  <div className="col-3">
                    <input type="text" className="customFormControl " />
                  </div>
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-start row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Pickup Hours
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0 d-flex">
                  <textarea className="customTextAreaDriver" name="" id="" cols="30" rows="6"></textarea>
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Unit Number
                  </Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input type="text" className="customFormControl" />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Model
                  </Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input type="text" className="customFormControl" />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Unit Type
                  </Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input type="text" className="customFormControl" />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Special
                  </Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input type="text" className="customFormControl" />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Miles
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0 d-flex align-items-center">
                  <div className="col-1">
                    <input type="text" className="customFormControl" />
                  </div>
                  <p className="mx-2 mb-0 col-form-label">@</p>
                  <div className="col-1">
                    <input type="text" className="customFormControl" />
                  </div>
                  <p className="mx-2 mb-0 col-form-label">=</p>
                  <div className="col-1">
                    <input type="text" className="customFormControl" />
                  </div>
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Pickup Fee
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0 d-flex align-items-center">
                  <div className="col-1">
                    <input type="text" className="customFormControl invisible" />
                  </div>
                  <p className="mx-2 mb-0 col-form-label invisible">@</p>
                  <div className="col-1">
                    <input type="text" className="customFormControl invisible" />
                  </div>
                  <p className="ms-2 me-2 mb-0 col-form-label">-</p>
                  <div className="col-1">
                    <input type="text" className="customFormControl" />
                  </div>
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Driver Qual
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0 d-flex align-items-center">
                  <div className="col-1 invisible">
                    <input type="text" className="customFormControl " />
                  </div>
                  <p className="mx-2 mb-0 col-form-label invisible">@</p>
                  <div className="col-1 invisible">
                    <input type="text" className="customFormControl " />
                  </div>
                  <p className="ms-2 me-2 mb-0 col-form-label">-</p>
                  <div className="col-1">
                    <input type="text" className="customFormControl" />
                  </div>
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Total Fee
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0 d-flex align-items-center">
                  <div className="col-1 invisible">
                    <input type="text" className="customFormControl " />
                  </div>
                  <p className="mx-2 mb-0 col-form-label invisible">@</p>
                  <div className="col-1 invisible">
                    <input type="text" className="customFormControl " />
                  </div>
                  <p className="mx-2 mb-0 col-form-label ">=</p>
                  <div className="col-1">
                    <input type="text" className="customFormControl" />
                  </div>
                </Col>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Delivery
                  </Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input type="text" className="customFormControl" />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input type="text" className="customFormControl" />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input type="text" className="customFormControl" />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0 d-flex">
                  <div className="col-7">
                    <input type="text" className="customFormControl " />
                  </div>
                  <div className="col-1 mx-4">
                    <input type="text" className="customFormControl " />
                  </div>
                  <div className="col-3">
                    <input type="text" className="customFormControl " />
                  </div>
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-start row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Delivery Hours
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0 d-flex">
                  <textarea className="customTextAreaDriver" name="" id="" cols="30" rows="6"></textarea>
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                  <div className="col-3">
                    <p className="mb-0">Truck</p>
                  </div>
                  <div className="col-3 mx-4">
                    <p className="mb-0">Trailer</p>
                  </div>
                  <div className="col-3">
                    <p className="mb-0">Total</p>
                  </div>
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    GVWR
                  </Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                  <div className="col-3">
                    <input type="text" className="customFormControl " />
                  </div>
                  <div className="col-3 mx-4">
                    <input type="text" className="customFormControl " />
                  </div>
                  <div className="col-3">
                    <input type="text" className="customFormControl " />
                  </div>
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Scale Weight
                  </Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                  <div className="col-3">
                    <input type="text" className="customFormControl " />
                  </div>
                  <div className="col-3 mx-4">
                    <input type="text" className="customFormControl " />
                  </div>
                  <div className="col-3">
                    <input type="text" className="customFormControl " />
                  </div>
                </Col>
              </Form.Group>
              <Form.Group className="margin-box-5 form-group m-t-5 m-b-10 align-items-center d-flex tabs-row m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <div className="p-0 w-75px">
                    <Form.Label className="col-form-label dealer-label m-l-0">Truck</Form.Label>
                  </div>
                </Col>

                <Col xs={4} md={4} sm={4} className="d-flex">
                  {/*  Autocomplete */}
                  <AutoCompleteDropdown
                    className={`customFormControl`}
                    arrayList={[]}
                    searchString={""}
                    renderItemId={(plant) => plant.customerPlantPK}
                    renderItemField={(plant) => plant.name}
                    handleSearchString={(string) => {}}
                    fetchDataBySearchString={() => {}}
                    onSelect={() => {}}
                    clearInputCallback={() => {}}
                  />
                </Col>
              </Form.Group>
              <div className="d-flex">
                <div className="col-5">
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Reimburse Tolls
                      </Form.Label>
                    </Col>

                    <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                      <input type="checkbox" />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Reimburse Permits
                      </Form.Label>
                    </Col>

                    <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                      <input type="checkbox" />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Reimburse wash
                      </Form.Label>
                    </Col>

                    <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                      <input type="checkbox" />
                    </Col>
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Maximum Tolls
                      </Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0 d-flex">
                      <input type="text" className="customFormControl" />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Maximum Permits
                      </Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0 d-flex">
                      <input type="text" className="customFormControl" />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Maximum Wash
                      </Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0 d-flex">
                      <input type="text" className="customFormControl" />
                    </Col>
                  </Form.Group>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <UnitConfirmationFooter />
      </div>
    </div>
  );
}

export default TowableUnitConfirmation;
