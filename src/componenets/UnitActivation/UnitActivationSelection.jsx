import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import UnitActivationFooter from "./UnitActivationFooter";
import UnitActivationHeader from "./UnitActivationHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setBrowseType,
  setInProgress,
  setUnitId,
  setUnitNumber,
  setUnitNumberLastFive,
  setRadioSelection,
} from "../../redux/UnitActivationSlice";
import "./UnitActivation.css";
import toast from "react-hot-toast";
import CustomRadioGroup from "../common/CustomRadioGroup";

function UnitActivationSelection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const radioSelection = useSelector((state) => state.unitActivationReducer.radioSelection);
  const browseType = useSelector((state) => state.unitActivationReducer.browseType);

  const closeHandler = () => {
    navigate("/");
    dispatch(setBrowseType(""));
    toast.success("Page Closed");
  };
  const continueHandler = () => {
    dispatch(setInProgress(false));
    if (browseType === "BrowseUnits") {
      navigate("/unit-activation-multi-unit");
    } else if (browseType === "SingleUnits") {
      navigate("/unit-activation-single-selection");
    }
  };

  useEffect(() => {
    dispatch(setBrowseType(""));
    dispatch(setUnitId(null));
    dispatch(setUnitNumber(""));
    dispatch(setUnitNumberLastFive(""));
    dispatch(setRadioSelection("weight"));
    localStorage.removeItem("urlNavigation");
  }, []);

  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <UnitActivationHeader closeButton={true} closeHandler={closeHandler} />
        <div className="w-100 p-2">
          <div className="shadow-sm rounded border quarterScreenFormContentHeight">
            <Row className="p-15 mb-3">
              <Col md={6} className=" ps-4">
                <Form.Group className="margin-box-1 mt-3 mb-5 align-items-center d-flex mt-2 m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label htmlFor="browseUnits" className="col-form-label dealer-label">
                      Browse Units
                    </Form.Label>
                  </Col>

                  <Col sm={2} md={2} xs={2} className="p-0 mt-1">
                    <input
                      type="checkbox"
                      id="browseUnits"
                      autoComplete="off"
                      checked={browseType === "BrowseUnits"}
                      onChange={(e) => {
                        e.target.checked
                          ? dispatch(setBrowseType("BrowseUnits"))
                          : dispatch(setBrowseType(""));
                      }}
                    />
                  </Col>
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <CustomRadioGroup
                      name="browseOption"
                      horizontal
                      horizontalAlignmentClassName="me-5"
                      selectedOption={browseType === "BrowseUnits" ? radioSelection : ""}
                      onChange={(value) => dispatch(setRadioSelection(value))}
                      disabled={browseType !== "BrowseUnits"}
                      options={[
                        {
                          value: "weight",
                          label: "Show Weight",
                        },
                        {
                          value: "delay",
                          label: "Show Delay",
                        },
                      ]}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="margin-box-1 mt-3 mb-5 align-items-center d-flex  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label htmlFor="singleUnits" className="col-form-label dealer-label">
                      Single Units
                    </Form.Label>
                  </Col>

                  <Col sm={4} md={4} xs={4} className="p-0 mt-1">
                    <input
                      type="checkbox"
                      id="singleUnits"
                      autoComplete="off"
                      checked={browseType === "SingleUnits"}
                      onChange={(e) => {
                        e.target.checked
                          ? dispatch(setBrowseType("SingleUnits"))
                          : dispatch(setBrowseType(""));
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
        <UnitActivationFooter
          saveButton={false}
          cancelButton={false}
          continueButton={true}
          continueDisable={browseType === ""}
          continueHandler={continueHandler}
        />
      </div>
    </div>
  );
}

export default UnitActivationSelection;
