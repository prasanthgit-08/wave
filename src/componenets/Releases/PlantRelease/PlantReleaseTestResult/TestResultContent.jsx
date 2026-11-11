import React, { useEffect, useState } from "react";
import HalfScreenWrapper from "../../../Templates/Screens/HalfScreenWrapper";
import Header from "../../../common/Header";
import CommonFooter from "../../../common/CommonFooter";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PlantReleaseHeader from "../PlantReleaseHeader";
const TestResultContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const importList = useSelector((state) => state.plantReleaseReducer.importList);
  const testResponse = useSelector((state) => state.plantReleaseReducer.testResponse);
  const [unitData, ...optionalTabData] = testResponse || [];

  const renderOptionalRows = () => {
    if (optionalTabData?.length === 0) {
      return <tr></tr>;
    }
    return optionalTabData?.map((item, index) => (
      <tr key={index}>
        <td>{item?.ColumnName}</td>
        <td>{item?.Value}</td>
      </tr>
    ));
  };
  const buttons = [{ label: "Done", onClick: () => onDone() }];

  /**
   *navigate back to prevoius screen
   */
  const onDone = () => {
    navigate("/plant-release-importlist-screen");
  };

  /**
   * Used for reload
   */
  useEffect(() => {
    if (importList === false) {
      navigate("/plant-release-selection-screen");
    }
  }, [importList]);
  return (
    <HalfScreenWrapper>
      <PlantReleaseHeader />
      <div className="d-flex align-items-center mb-1 mt-1">
        <label className="me-2 f-w-600" style={{ minWidth: "90px", textAlign: "right" }}>
          Unit Number
        </label>
        <input
          type="text"
          className={`customFormControl`}
          style={{ maxWidth: "220px" }}
          value={unitData?.Value}
          disabled
        />
      </div>

      <div className="fixTableHead border  border-secondary" style={{ overflowY: "scroll", height: "583px" }}>
        <table className="table table-striped f-w-600">
          <thead>
            <tr>
              <th className="f-w-600">Units.Field</th>
              <th className="f-w-600">Value</th>
            </tr>
          </thead>
          <tbody>{renderOptionalRows()}</tbody>
          {optionalTabData?.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
        </table>
      </div>
      <CommonFooter buttons={buttons} />
    </HalfScreenWrapper>
  );
};

export default TestResultContent;
