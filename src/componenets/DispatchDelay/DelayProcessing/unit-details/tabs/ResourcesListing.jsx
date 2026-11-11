import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import DelayProcessingService from "../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import { setNotes } from "../../../../../redux/EditMaster/UnitSelectionSlice";
import AscendingIcon from "../../../../common/AscendingIcon";
import DescendingIcon from "../../../../common/DescendingIcon";

const ResourcesListing = () => {
  const { companyName, unitfk, driverfk } = useParams();

  const dispatch = useDispatch();
  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });
  const [clickedRowIndex, setClickedRowIndex] = useState(null);
  const [resourceData, setResourceData] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;

  /**
   *  Delay Fetch Resources function
   **/
  const getResources = () => {
    let delayedUnitId = 0;
    let customerPlantId = 0;
    let customerId = 0;
    if (pathname?.includes("delayed-details")) {
      delayedUnitId = rowData?.delayedUnitPK;
      customerPlantId = rowData?.unit?.customerPlantFK;
      customerId = rowData?.unit?.customerFK;
    }

    if (pathname?.includes("unit-details")) {
      delayedUnitId = rowData?.unitPK;
      customerPlantId = rowData?.customerPlantIntFK;
      customerId = rowData?.customerIntFK;
    }

    DelayProcessingService.getResourcesForDelay(companyName, unitfk, customerPlantId, customerId)
      .then((response) => {
        if (response?.data != null) {
          setResourceData(response?.data);
        } else {
          console.log("No Resources Data Found");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getResources();
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
              <th className="f-w-600" onClick={() => requestSort("description")}>
                Description{" "}
                {sortConfig.key === "description" ? (
                  sortConfig.direction === "asc" ? (
                    <AscendingIcon />
                  ) : (
                    <DescendingIcon />
                  )
                ) : null}
              </th>
              <th className="f-w-600" onClick={() => requestSort("phone")}>
                Phone{" "}
                {sortConfig.key === "phone" ? (
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
                      dispatch(setNotes(data?.notes));
                      handleClick(data?.description);
                    }}
                    className={clickedRowIndex === data?.description ? "tableSelected" : ""}
                  >
                    <td className="f-w-600 pointer">{data?.description}</td>
                    <td className="f-w-600 pointer">{data?.phone}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResourcesListing;
