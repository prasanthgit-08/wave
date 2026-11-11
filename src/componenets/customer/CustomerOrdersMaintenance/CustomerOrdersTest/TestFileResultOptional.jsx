import React from "react";
import { useSelector } from "react-redux";

const TestFileResultOptional = () => {
  const testResponse = useSelector((state) => state.customerOrdersReducer.testResponse);
  const optionalTabData = testResponse?.ExceptionsXML || [];

  const renderOptionalRows = () => {
    return optionalTabData?.map((item, index) => (
      <tr key={index}>
        <td>{item?.Column}</td>
        <td>{item?.DestinationValue}</td>
      </tr>
    ));
  };

  return (
    <div>
      <div className="fixTableHead border border-secondary" style={{ overflowY: "scroll", height: "385px" }}>
        <table className="table table-striped f-w-600">
          <thead>
            <tr>
              <th className="f-w-600">Units.Field</th>
              <th className="f-w-600">Value</th>
            </tr>
          </thead>
          <tbody>{renderOptionalRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default TestFileResultOptional;
