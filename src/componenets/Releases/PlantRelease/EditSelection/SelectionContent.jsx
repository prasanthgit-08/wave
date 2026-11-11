import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Form } from "react-bootstrap";
import {
  setBrowseUnits,
  setImportList,
  setSelectionRadioValue,
  setSingleUnits,
} from "../../../../redux/PlantReleaseSlice";
import LookupButton from "../../../common/LookupButton";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import PlantReleaseService from "../../../../services/PlantReleaseService";
import { getCurrentCompany } from "../../../../utils/utils";
const SelectionContent = () => {
  const [companyRequirePlantReleases, setCompanyRequirePlantReleases] = useState(false);
  const browseUnits = useSelector((state) => state.plantReleaseReducer.browseUnits);
  const singleUnits = useSelector((state) => state.plantReleaseReducer.singleUnits);
  const importList = useSelector((state) => state.plantReleaseReducer.importList);
  const selectionRadioValue = useSelector((state) => state.plantReleaseReducer.selectionRadioValue);
  const currentCompany = getCurrentCompany();

  useEffect(() => {
    if (currentCompany) {
      setCompanyRequirePlantReleases(currentCompany?.requirePlantReleases);
    }
  }, [currentCompany]);

  const dispatch = useDispatch();

  /**
   * Used for Radio button selection
   */
  useEffect(() => {
    if (singleUnits) {
      dispatch(setSelectionRadioValue("singleUnits"));
    } else if (browseUnits) {
      dispatch(setSelectionRadioValue("browseUnits"));
    } else if (importList) {
      dispatch(setSelectionRadioValue("importList"));
    }
  }, [singleUnits, browseUnits, importList]);

  useEffect(() => {
    if (selectionRadioValue === "singleUnits") {
      dispatch(setSingleUnits(true));
      dispatch(setBrowseUnits(false));
      dispatch(setImportList(false));
    } else if (selectionRadioValue === "browseUnits") {
      dispatch(setBrowseUnits(true));
      dispatch(setSingleUnits(false));
      dispatch(setImportList(false));
    } else if (selectionRadioValue === "importList") {
      dispatch(setImportList(true));
      dispatch(setBrowseUnits(false));
      dispatch(setSingleUnits(false));
    }
  }, [selectionRadioValue]);

  return (
    <div className="p-2">
      <div className="p-15 shadow-sm rounded border halfScreenFormContentHeight">
        <Row className="m-0 p-10">
          <Col className="p-5 mt-5 mb-3" xs={8}>
            <Form.Group className="mt-5 align-items-center row ml-5 m-l-75 ">
              <Col className="p-0 d-flex ">
                <div className="d-flex align-items-center">
                  <Form.Label className="col-form-label me-2 m-l-75" style={{ marginLeft: "150px" }}>
                    Browse Units
                  </Form.Label>
                  <input
                    type="radio"
                    className="form-check-input p-0"
                    id="browseUnits"
                    name="radioGroup"
                    value="browseUnits"
                    checked={selectionRadioValue === "browseUnits"}
                    disabled={!companyRequirePlantReleases}
                    onChange={(e) => {
                      dispatch(setSelectionRadioValue(e.target.value));
                    }}
                  />
                </div>
                <Col sm={1} md={1} xs={1}></Col>
                <div className="d-flex align-items-center">
                  <Form.Label className="col-form-label me-2">Single Units</Form.Label>

                  <input
                    type="radio"
                    className="form-check-input p-0"
                    id="singleUnits"
                    name="radioGroup"
                    value="singleUnits"
                    checked={selectionRadioValue === "singleUnits"}
                    disabled={!companyRequirePlantReleases}
                    onChange={(e) => {
                      dispatch(setSelectionRadioValue(e.target.value));
                    }}
                  />
                </div>
                <Col sm={1} md={1} xs={1}></Col>
                <div className="d-flex align-items-center">
                  <Form.Label className="col-form-label me-2 ">Import List</Form.Label>

                  <input
                    type="radio"
                    className="form-check-input p-0 w-20px"
                    id="importList"
                    name="radioGroup"
                    value="importList"
                    checked={selectionRadioValue === "importList"}
                    disabled={!companyRequirePlantReleases}
                    onChange={(e) => {
                      dispatch(setSelectionRadioValue(e.target.value));
                    }}
                  />
                </div>
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SelectionContent;
