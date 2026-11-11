import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import AscendingIcon from "../../../../../common/AscendingIcon";
import DescendingIcon from "../../../../../common/DescendingIcon";
import LoadingText from "../../../../../common/LoadingText";
import {
  setEmailListData,
  setEmail,
  setEmailName,
  setEmailPK,
  setNewEmailList,
  setSelectedIndex,
  resetEmailChanges,
  setEditMode,
} from "../../../../../../redux/DispatchDelay/DamageProcessing/DamageSlice";
import DelayDamageService from "../../../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";

const EmailListing = () => {
  const [loading, setLoading] = useState(false);
  const { companyName, driverfk, unitfk } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isEmailClicked, setIsEmailClicked] = useState(false);
  const { newEmailList, selectedIndex } = useSelector((state) => state.damageReducer);
  /**
   *  used to get email  listing data
   **/
  const getNewDamageDetails = () => {
    setLoading(true);
    DelayDamageService.getNewDelayDamgeDetails("Email", unitfk, companyName, 0, 10, null, false)
      .then((res) => {
        const data = res?.data;
        const emailList = Array.isArray(data) ? data : [];
        dispatch(setEmailListData(emailList));
        dispatch(setNewEmailList(emailList));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching damage details:", error);
        dispatch(setEmailListData([]));
        dispatch(setNewEmailList([]));
        setLoading(false);
      });
  };
  useEffect(() => {
    if (unitfk) {
      getNewDamageDetails();
    }
  }, [unitfk]);

  //On click of a email record
  const handleClickNew = (data, index) => {
    dispatch(setSelectedIndex(index));
    const selectedItem = data;
    dispatch(setEmailName(selectedItem?.Name));
    dispatch(setEmail(selectedItem?.Email));
    dispatch(setEditMode(false));
  };

  //setting values when selecting a record from the detail list
  useEffect(() => {
    if (newEmailList?.length > 0 && selectedIndex != null) {
      dispatch(setEmailName(newEmailList[selectedIndex]?.Name));
      dispatch(setEmail(newEmailList[selectedIndex]?.Email));
    } else {
      // Reset fields for a new record
      dispatch(resetEmailChanges());
    }
  }, [selectedIndex]);

  const [sortConfig, setSortConfig] = useState({ key: "null", direction: "asc" });

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
              <th className="f-w-600" onClick={() => requestSort("Name")}>
                Name{" "}
                {sortConfig?.key === "Name" && isEmailClicked ? (
                  sortConfig?.direction === "asc" ? (
                    <AscendingIcon />
                  ) : (
                    <DescendingIcon />
                  )
                ) : null}
              </th>
              <th className="f-w-600" onClick={() => requestSort("Email")}>
                Email{" "}
                {sortConfig?.key === "Email" ? (
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
                    <td className="f-w-600"> {data?.Name} </td>
                    <td className="f-w-600"> {data?.Email} </td>
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
