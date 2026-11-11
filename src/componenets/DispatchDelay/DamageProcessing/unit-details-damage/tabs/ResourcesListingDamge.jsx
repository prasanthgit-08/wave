import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import AscendingIcon from "../../../../common/AscendingIcon";
import DescendingIcon from "../../../../common/DescendingIcon";

import {
  setResourceDamageData,
  setNotes,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayDamageSlice";
import DelayDamageService from "../../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";

const ResourcesListingDamge = () => {
  const dispatch = useDispatch();
  const id = useParams().unitfk;

  const unitPK = useSelector((state) => state.delayDamage.unitPK);

  const resourceDamageData = useSelector((state) => state.delayDamage.resourceDamageData);

  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });
  const [clickedRowIndex, setClickedRowIndex] = useState(null);
  const { companyName } = useParams();
  const location = useLocation();
  const pathname = location.pathname;
  const [sortConfig, setSortConfig] = useState({ key: "null", direction: "asc" });

  /**
   * Fetch Resources for Damage Details
   */
  const getResources = async () => {
    try {
      const response = await DelayDamageService.getDelayDamageDetails("Resources", id);
      if (response?.data != null) {
        dispatch(setResourceDamageData(response?.data));
      } else {
        console.log("No Resources Data Found");
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getResources();
    }
  }, [id]);

  // Handler for cell click
  const handleClick = (index) => {
    setClickedRowIndex(index);
  };

  const sortedData = React.useMemo(() => {
    if (!resourceDamageData) return [];
    let sortableItems = [...resourceDamageData];
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
  }, [resourceDamageData, sortConfig]);

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
              <th className="f-w-600" onClick={() => requestSort("Description")}>
                Description{" "}
                {sortConfig.key === "Description" ? (
                  sortConfig.direction === "asc" ? (
                    <AscendingIcon />
                  ) : (
                    <DescendingIcon />
                  )
                ) : null}
              </th>
              <th className="f-w-600" onClick={() => requestSort("Phone")}>
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
            {!resourceDamageData || resourceDamageData?.length < 1
              ? null
              : sortedData?.map((data, index) => (
                  <tr
                    id="rowId"
                    key={data?.Description}
                    onClick={() => {
                      dispatch(setNotes(data?.Notes));
                      handleClick(index);
                    }}
                    className={clickedRowIndex === index ? "tableSelected" : ""}
                  >
                    <td className="f-w-600 pointer">{data?.Description}</td>
                    <td className="f-w-600 pointer">{data?.Phone}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResourcesListingDamge;
