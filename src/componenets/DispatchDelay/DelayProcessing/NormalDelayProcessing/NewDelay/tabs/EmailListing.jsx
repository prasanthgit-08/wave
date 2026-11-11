import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import DelayProcessingService from "../../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import AscendingIcon from "../../../../../common/AscendingIcon";
import DescendingIcon from "../../../../../common/DescendingIcon";
import {
  setEmail,
  setEmailName,
  setEmailPK,
  setNewEmailList,
  setSelectedIndex,
  resetEmailChanges,
  setEditMode,
  setEmailListData,
} from "../../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import LoadingText from "../../../../../common/LoadingText";

const EmailListing = () => {
  const [loading, setLoading] = useState(false);
  const { unitfk, companyName } = useParams();
  const selectedIndex = useSelector((state) => state.delayProcessing.selectedIndex);
  const location = useLocation();
  const dispatch = useDispatch();
  const [isEmailClicked, setIsEmailClicked] = useState(false);
  const { newEmailList, emailSortValue, emailSortFlag } = useSelector((state) => state.delayProcessing);
  const [sortConfig, setSortConfig] = useState({ key: "null", direction: "asc" });

  /**
   *  used to get email  listing data
   **/
  const getNewDelayDetails = () => {
    setLoading(true);
    DelayProcessingService.fetchNewDelayDetails(
      unitfk,
      "email",
      companyName,
      0,
      10,
      emailSortValue,
      emailSortFlag
    )
      .then((response) => {
        const { data } = response;

        // Filter out actual email/resource data (exclude Pagination object)
        const emailData = data?.filter((item) => item.Type !== "Pagination");
        dispatch(setEmailListData(emailData));
        const listingData = emailData?.map((item) => ({
          ...item,
        }));
        dispatch(setNewEmailList(listingData));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (unitfk) {
      getNewDelayDetails();
    }
  }, [unitfk, emailSortValue, emailSortFlag]);

  {
    /* On click of a email record*/
  }
  const handleClickNew = (data, index) => {
    dispatch(setSelectedIndex(index));
    const selectedItem = data;
    dispatch(setEmailName(selectedItem?.name));
    dispatch(setEmail(selectedItem?.email));
    dispatch(setEditMode(false));
  };

  //setting values when selecting a record from the detail list
  useEffect(() => {
    if (newEmailList && selectedIndex != null) {
      dispatch(setEmailName(newEmailList[selectedIndex]?.name));
      dispatch(setEmail(newEmailList[selectedIndex]?.email));
    } else {
      // Reset fields for a new record
      dispatch(resetEmailChanges());
    }
  }, [selectedIndex]);

  //normal sort

  const sortedData = React.useMemo(() => {
    let sortableItems = [...newEmailList];
    if (sortConfig.key !== "null") {
      sortableItems?.sort((a, b) => {
        const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
        const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";
        if (aValue < bValue) return sortConfig?.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig?.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [newEmailList, sortConfig]);
  const requestSort = (key) => {
    setIsEmailClicked(true);
    let direction = "asc";
    if (sortConfig?.key === key && sortConfig?.direction === "asc") {
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
                {sortConfig?.key === "name" && isEmailClicked ? (
                  sortConfig?.direction === "asc" ? (
                    <AscendingIcon />
                  ) : (
                    <DescendingIcon />
                  )
                ) : null}
              </th>
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
            </tr>
          </thead>
          <tbody>
            {loading
              ? null
              : sortedData?.length >= 1 &&
                sortedData?.map((data, index) => (
                  <tr
                    key={index}
                    onClick={() => handleClickNew(data, index)}
                    className={selectedIndex === index ? "tableSelected" : ""}
                  >
                    <td className="f-w-600"> {data?.name} </td>
                    <td className="f-w-600"> {data?.email} </td>
                  </tr>
                ))}
          </tbody>
        </table>
        {loading
          ? ""
          : sortedData?.length === 0 && (
              <h2 className="empty-list" align="center">
                No Records Available
              </h2>
            )}
        {loading && <LoadingText />}
      </div>
    </div>
  );
};

export default EmailListing;
