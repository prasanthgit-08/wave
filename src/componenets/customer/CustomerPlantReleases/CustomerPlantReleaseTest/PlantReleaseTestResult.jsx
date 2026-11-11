import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../common/Header";
import PlantReleaseTestFooter from "./PlantReleaseTestFooter";
import { useNavigate, useParams } from "react-router-dom";
import { resetChanges } from "../../../../redux/CustomerPlantReleasesSlice";
import { Col, Form } from "react-bootstrap";

const PlantReleaseTestResult = () => {
  const testResponse = useSelector((state) => state.customerPlantReleaseReducer.testResponse);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customerPlantReleaseFk = params.id;
  const [unitData, ...optionalTabData] = testResponse || [];

  useEffect(() => {
    if (!unitData) {
      navigate(`/customer-plant-release-browse/${customerPlantReleaseFk}/test`);
    }
  }, []);

  const renderOptionalRows = () => {
    if (optionalTabData?.length === 0) {
      return (
        <tr>
          <td colSpan={2} className="text-center f-w-600">
            No Records Available
          </td>
        </tr>
      );
    }
    return optionalTabData?.map((item, index) => (
      <tr key={index}>
        <td>{item?.ColumnName}</td>
        <td>{item?.Value}</td>
      </tr>
    ));
  };

  return (
    <QuarterScreenWrapper>
      <Header
        closeNavigationURL={`/customer-plant-release-browse`}
        confirmClose
        closeModalTitle="Close Test Result"
        closeModalBody="Please confirm you want to close and go back to browse page"
        closeConfirmationHandler={() => {
          dispatch(resetChanges());
        }}
      />
      <div className="w-100 p-1">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight d-flex">
          <div className="w-100 ">
            <Col xs={9} className="ps-3">
              <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 `}>
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="unitNumber" className="col-form-label">
                    Unit Number
                  </Form.Label>
                </Col>
                <Col xs={5} md={5} sm={5} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="unitNumber"
                    name="unitNumber"
                    type="text"
                    value={unitData?.Value || ""}
                    disabled
                  />
                </Col>
              </Form.Group>
            </Col>
            <div
              className="fixTableHead border border-secondary"
              style={{ overflowY: "scroll", height: "390px" }}
            >
              <table className="table table-striped f-w-600">
                <thead>
                  <tr>
                    <th className="f-w-600">Units.Field</th>
                    <th className="f-w-600">Value</th>
                  </tr>
                </thead>
                <tbody>{renderOptionalRows()}</tbody>
              </table>
              {optionalTabData?.length === 0 && (
                <h2 className="empty-list" align="center">
                  No Records Available
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>

      <PlantReleaseTestFooter />
    </QuarterScreenWrapper>
  );
};

export default PlantReleaseTestResult;
