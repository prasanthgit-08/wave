import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import AscendingIcon from "../../../../common/AscendingIcon";
import DescendingIcon from "../../../../common/DescendingIcon";
import BreakdownProcessingService from "../../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";
import {
  setResourcesTabData,
  setNotes,
} from "../../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import NoRecordsMessage from "../../../../common/NoRecordsMessage";

const BreakdownResourcesListing = () => {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });
  const [selectedCompanyName, setCompanyName] = useState(() => {
    // Initialize state from localStorage
    return localStorage.getItem("selectedCompany");
  });
  const [clickedRowIndex, setClickedRowIndex] = useState(null);
  const { companyName } = useParams();
  const [resourceData, setResourceData] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;

  const getRecordBasedPnUnit = () => {
    let unitId = null;
    if (rowData?.unitPK) {
      unitId = rowData?.unitPK;
    }
    if (rowData?.unitFK) {
      unitId = rowData?.unitFK;
    }
    BreakdownProcessingService.getDelayBreakdownDetails("Resources", unitId, selectedCompanyName, 0)
      .then((res) => {
        const data = res?.data?.breakdownDetails;

        dispatch(setResourcesTabData(data[0]));
        setResourceData(data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    dispatch(setResourcesTabData(null));
    getRecordBasedPnUnit();
  }, []);

  // Handler for cell click
  const handleClick = (index) => {
    setClickedRowIndex(index); // Toggle color on each click
  };

  const [sortConfig, setSortConfig] = useState({ key: "null", direction: "asc" });

  const sortedData = React.useMemo(() => {
    let sortableItems = [...resourceData];
    if (sortConfig !== null) {
      sortableItems?.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [resourceData, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="fixTableHead">
      <div>
        <table className="table table-striped f-w-600 mb-0">
          <thead>
            <tr disabled>
              <th
                className="f-w-600"
                style={{ width: "100px", paddingLeft: "4px", paddingRight: "4px" }}
                onClick={() => requestSort("Description")}
              >
                Description{" "}
                {sortConfig.key === "Description" ? (
                  sortConfig.direction === "asc" ? (
                    <AscendingIcon />
                  ) : (
                    <DescendingIcon />
                  )
                ) : null}
              </th>
              <th
                className="f-w-600"
                style={{ width: "240px", paddingLeft: "4px", paddingRight: "4px" }}
                onClick={() => requestSort("Phone")}
              >
                Phone{" "}
                {sortConfig.key === "Phone" ? (
                  sortConfig.direction === "asc" ? (
                    <AscendingIcon />
                  ) : (
                    <DescendingIcon />
                  )
                ) : null}
              </th>
            </tr>
          </thead>
          <tbody>
            {resourceData?.length < 1
              ? null
              : sortedData?.map((data, index) => (
                  <tr
                    id="rowId"
                    key={index}
                    onClick={() => {
                      dispatch(setNotes(data?.Notes));
                      handleClick(data?.Description);
                    }}
                    className={clickedRowIndex === data?.Description ? "tableSelected" : ""}
                  >
                    <td className="f-w-600 pointer">{data?.Description}</td>
                    <td className="f-w-600 pointer">{data?.Phone}</td>
                  </tr>
                ))}
          </tbody>
        </table>
        {sortedData?.length === 0 && <NoRecordsMessage />}
      </div>
    </div>
  );
};

export default BreakdownResourcesListing;
