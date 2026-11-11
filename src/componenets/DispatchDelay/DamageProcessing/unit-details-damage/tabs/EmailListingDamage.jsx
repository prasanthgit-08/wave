import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import DelayProcessingService from "../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import {
  setEmailData,
  setEmailList,
  setInitialEmailList,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import AscendingIcon from "../../../../common/AscendingIcon";
import DescendingIcon from "../../../../common/DescendingIcon";
import DelayDamageService from "../../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";
import {
  setEmailDamageData,
  setIsEmailClicked,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayDamageSlice";

const EmailListingDamage = ({ userDetails, sendDataToParent, action, setErrorFlag }) => {
  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });
  const viewOnly = useSelector((state) => state.delayDamage.viewOnly);
  const isEmailClicked = useSelector((state) => state.delayDamage.isEmailClicked);
  const emailDamageData = useSelector((state) => state.delayDamage.emailDamageData);

  const unitPK = useSelector((state) => state.delayDamage.unitPK);
  const id = useParams().unitfk;

  const [clickedRowIndex, setClickedRowIndex] = useState(null);
  const [clickedEmail, setClickedEmail] = useState(null);
  const { companyName } = useParams();
  const location = useLocation();
  const pathname = location.pathname;
  const dispatch = useDispatch();

  /**
   *  Delay Fetch Emails function
   **/
  const getEmails = () => {
    DelayProcessingService.getEmailsForDelay(companyName, rowData?.delayedUnitPK)
      .then((response) => {
        if (response?.data != null) {
          dispatch(setInitialEmailList(response?.data));
          dispatch(setEmailDamageData(response?.data));
          dispatch(setEmailList(response?.data));
        } else {
          console.log("No Email Data Found");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   *  New Delay Fetch Emails function
   **/
  const getCustomerEmails = () => {
    let customerId = 0;
    if (rowData?.customerPlantIntFK) {
      customerId = rowData?.customerPlantIntFK;
    } else if (rowData?.customerIntFK) {
      customerId = rowData?.customerIntFK;
    } else if (rowData?.customerAddressFK) {
      customerId = rowData?.customerAddressFK;
    } else {
      customerId = 0;
    }

    DelayProcessingService.getCustomerEmailDetails(companyName, customerId)
      .then((response) => {
        if (response?.data != null) {
          dispatch(setEmailDamageData(response?.data));
          dispatch(setEmailList(response?.data));
          userDetails = response?.data;
        } else {
          console.log("No Email Data Found");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addEmail = () => {
    if (action === "Edit" || action === "Delete") {
      dispatch(setEmailDamageData(userDetails));
      dispatch(setEmailList(userDetails));
    }
    if (action === "Add") {
      // Check if the item already exists based on a unique property, e.g., 'email'
      if (
        !emailDamageData?.some(
          (data) => data?.email && data?.email?.toLowerCase() === userDetails?.email?.toLowerCase()
        )
      ) {
        const updatedEmails = [...emailDamageData, userDetails];
        dispatch(setEmailDamageData(updatedEmails));
        dispatch(setEmailList(updatedEmails));
      } else {
        setErrorFlag(true);
      }
    }
    action = "";
  };

  useEffect(() => {
    if (userDetails !== undefined) {
      addEmail();
    }
  }, [userDetails]);

  const sendData = (index, email, name) => {
    sendDataToParent(index, email, name, emailDamageData);
    dispatch(setIsEmailClicked(true));
  };

  useEffect(() => {
    if (pathname?.includes("delayed-details")) {
      getEmails();
    } else {
      getCustomerEmails();
    }
  }, []);

  useEffect(() => {
    if (!isEmailClicked) {
      setSortConfig({ key: "null", direction: "asc" });
      setClickedEmail(null);
    }
  }, [isEmailClicked]);

  // Handler for cell click
  const handleClick = (index, email) => {
    setClickedRowIndex(index); // Toggle color on each click
    setClickedEmail(email);
  };

  const [sortConfig, setSortConfig] = useState({ key: "null", direction: "asc" });

  const sortedData = React.useMemo(() => {
    let sortableItems = [...emailDamageData];
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
  }, [emailDamageData, sortConfig]);

  const requestSort = (key) => {
    dispatch(setIsEmailClicked(true));
    let direction = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    const fetchEmailData = async () => {
      try {
        const response = await DelayDamageService.getDelayDamageDetails("Email", id);
        if (response?.data) {
          dispatch(setEmailDamageData(response?.data));
        } else {
          console.log("No Email Data Found");
        }
      } catch (error) {
        console.error("Error fetching email data:", error);
      }
    };

    fetchEmailData();
  }, [unitPK]);

  return (
    <div className="fixTableHead">
      <div>
        <table className="table table-striped f-w-600 mb-0">
          <thead>
            <tr disabled>
              <th className="f-w-600" onClick={() => requestSort("email")}>
                Email{" "}
                {sortConfig?.key === "email" ? (
                  sortConfig?.direction === "asc" ? (
                    <AscendingIcon />
                  ) : (
                    <DescendingIcon />
                  )
                ) : null}
              </th>
              <th className="f-w-600" onClick={() => requestSort("name")}>
                Name{" "}
                {sortConfig?.key === "name" && isEmailClicked ? (
                  sortConfig?.direction === "asc" ? (
                    <AscendingIcon />
                  ) : (
                    <DescendingIcon />
                  )
                ) : null}
              </th>
            </tr>
          </thead>
          <tbody>
            {!emailDamageData || emailDamageData?.length < 1
              ? null
              : sortedData?.map((data, index) => (
                  <tr
                    id="rowId"
                    key={index}
                    onClick={() => {
                      sendData(index, data?.email, data?.name);
                      handleClick(index, data?.email);
                    }}
                    className={isEmailClicked && clickedEmail === data?.email ? "tableSelected" : ""}
                  >
                    <td className={viewOnly ? "f-w-600" : "f-w-600 pointer"}>{data?.email}</td>
                    <td className={viewOnly ? "f-w-600" : "f-w-600 pointer"}>{data?.name}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmailListingDamage;
