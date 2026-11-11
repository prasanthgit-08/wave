import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import {
  setEmailData,
  setEmailList,
  setInitialEmailList,
  setIsEmailClicked,
} from "../../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import AscendingIcon from "../../../../common/AscendingIcon";
import DescendingIcon from "../../../../common/DescendingIcon";
import BreakdownProcessingService from "../../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";
import NoRecordsMessage from "../../../../common/NoRecordsMessage";

const BreakdownEmailListing = ({ userDetails, sendDataToParent, action, setErrorFlag }) => {
  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });
  const [selectedCompanyName, setCompanyName] = useState(() => {
    // Initialize state from localStorage
    return localStorage.getItem("selectedCompany");
  });
  const viewOnly = useSelector((state) => state.delaybreakdown.viewOnly);
  const isEmailClicked = useSelector((state) => state.delaybreakdown.isEmailClicked);
  const emailData = useSelector((state) => state.delaybreakdown.emailData);
  const [clickedRowIndex, setClickedRowIndex] = useState(null);
  const [clickedEmail, setClickedEmail] = useState(null);
  const params = useParams();
  const breakdownFK = params.breakdownFK;
  const dispatch = useDispatch();

  const addEmail = () => {
    if (action === "Edit" || action === "Delete") {
      dispatch(setEmailData(userDetails));
      dispatch(setEmailList(userDetails));
    }
    if (action === "Add") {
      // Check if the item already exists based on a unique property, e.g., 'email'
      if (
        !emailData?.some(
          (data) => data?.email && data?.email?.toLowerCase() === userDetails?.email?.toLowerCase()
        )
      ) {
        const updatedEmails = [...emailData, userDetails];
        dispatch(setEmailData(updatedEmails));
        dispatch(setEmailList(updatedEmails));
      } else {
        setErrorFlag(true);
      }
    }
    action = "";
  };

  const sendData = (index, email, name) => {
    sendDataToParent(index, email, name, emailData);
    dispatch(setIsEmailClicked(true));
  };

  useEffect(() => {
    if (!isEmailClicked) {
      setSortConfig({ key: "null", direction: "asc" });
      setClickedEmail(null);
    }
  }, [isEmailClicked]);

  useEffect(() => {
    if (userDetails !== undefined) {
      addEmail();
    }
  }, [userDetails]);

  // Handler for cell click
  const handleClick = (index, email) => {
    setClickedRowIndex(index); // Toggle color on each click
    setClickedEmail(email);
  };

  const [sortConfig, setSortConfig] = useState({ key: "null", direction: "asc" });

  const sortedData = React.useMemo(() => {
    let sortableItems = [...(emailData || [])];
    if (sortConfig !== null && sortConfig.key) {
      sortableItems?.sort((a, b) => {
        const key = sortConfig.key;
        const aValue = a[key] ? a[key].toLowerCase() : "";
        const bValue = b[key] ? b[key].toLowerCase() : "";

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [emailData, sortConfig]);

  const getRecordBasedPnUnit = () => {
    let unitId = null;
    if (rowData?.unitPK) {
      unitId = rowData?.unitPK;
    }
    if (rowData?.unitFK) {
      unitId = rowData?.unitFK;
    }
    BreakdownProcessingService.getDelayBreakdownDetails(
      "Email",
      unitId,
      selectedCompanyName,
      breakdownFK || 0
    )
      .then((res) => {
        const data = res?.data?.breakdownDetails;
        dispatch(setInitialEmailList(data));
        dispatch(setEmailData(data));
        dispatch(setEmailList(data));
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getRecordBasedPnUnit();
  }, []);

  const requestSort = (key) => {
    dispatch(setIsEmailClicked(true));
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
              <th className="f-w-600" onClick={() => requestSort("name")}>
                Name{" "}
                {sortConfig.key === "name" && isEmailClicked ? (
                  sortConfig.direction === "asc" ? (
                    <AscendingIcon />
                  ) : (
                    <DescendingIcon />
                  )
                ) : null}
              </th>
              <th className="f-w-600" onClick={() => requestSort("email")}>
                Email{" "}
                {sortConfig.key === "email" ? (
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
            {emailData && emailData?.length < 1
              ? null
              : sortedData?.map((data, index) => (
                  <tr
                    id="rowId"
                    key={index}
                    onClick={() => {
                      if (!viewOnly) {
                        sendData(index, data?.email, data?.name);
                        handleClick(index, data?.email);
                      }
                    }}
                    className={isEmailClicked && clickedEmail === data?.email ? "tableSelected" : ""}
                  >
                    <td className={viewOnly ? "f-w-600" : "f-w-600 pointer"}>{data?.name}</td>
                    <td className={viewOnly ? "f-w-600" : "f-w-600 pointer"}>{data?.email}</td>
                  </tr>
                ))}
          </tbody>
        </table>
        {sortedData?.length === 0 && <NoRecordsMessage />}
      </div>
    </div>
  );
};

export default BreakdownEmailListing;
