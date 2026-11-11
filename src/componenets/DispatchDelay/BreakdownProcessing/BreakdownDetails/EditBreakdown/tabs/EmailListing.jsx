import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AscendingIcon from "../../../../../common/AscendingIcon";
import DescendingIcon from "../../../../../common/DescendingIcon";
import LoadingText from "../../../../../common/LoadingText";
import {
  setEditmailListData,
  setEditEmailList,
  setEditSelectedIndex,
  setEditEmailName,
  setEditEmail,
  setEditView,
  resetEditEmailChanges,
} from "../../../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import BreakdownProcessingService from "../../../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";

const EmailListing = () => {
  const { breakdownFK } = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [isEmailClicked, setIsEmailClicked] = useState(false);
  const { editEmailList, editSelectedIndex, breakdownDetailFlag } = useSelector(
    (state) => state.delaybreakdown
  );
  const breakdownCompanyName = localStorage.getItem("breakdownCompanyName");

  /**
   *  used to get email  listing data
   **/
  const getEditBreakdownData = () => {
    setLoading(true);

    BreakdownProcessingService.getBreakdownViewDetails(
      "Email",
      breakdownFK,
      0,
      10,
      null,
      false,
      breakdownCompanyName
    )
      .then((res) => {
        const data = res?.data;
        const paginationObject = data?.find((item) => item.Type === "Pagination");
        const emailList = data?.filter((item) => item.Type !== "Pagination");
        dispatch(setEditmailListData(emailList));
        dispatch(setEditEmailList(emailList));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching breakdown details:", error);
        dispatch(setEditmailListData([]));
        dispatch(setEditEmailList([]));
        setLoading(false);
      });
  };
  useEffect(() => {
    if (breakdownFK && breakdownDetailFlag) {
      getEditBreakdownData();
    }
  }, [breakdownFK, breakdownDetailFlag]);

  //On click of a email record
  const handleClickNew = (data, index) => {
    dispatch(setEditSelectedIndex(index));
    const selectedItem = data;
    dispatch(setEditEmailName(selectedItem?.Name));
    dispatch(setEditEmail(selectedItem?.Email));
    dispatch(setEditView(false));
  };

  //setting values when selecting a record from the detail list
  useEffect(() => {
    if (editEmailList && editSelectedIndex != null) {
      dispatch(setEditEmailName(editEmailList[editSelectedIndex]?.Name));
      dispatch(setEditEmail(editEmailList[editSelectedIndex]?.Email));
    } else {
      // Reset fields for a new record
      dispatch(resetEditEmailChanges());
    }
  }, [editEmailList, editSelectedIndex]);

  const [sortConfig, setSortConfig] = useState({ key: "null", direction: "asc" });

  const sortedData = React.useMemo(() => {
    let sortableItems = [...editEmailList];
    if (sortConfig.key !== "null") {
      sortableItems?.sort((a, b) => {
        const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
        const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [editEmailList, sortConfig]);
  const requestSort = (key) => {
    setIsEmailClicked(true);
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
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
                {sortConfig.key === "Name" && isEmailClicked ? (
                  sortConfig.direction === "asc" ? (
                    <AscendingIcon />
                  ) : (
                    <DescendingIcon />
                  )
                ) : null}
              </th>
              <th className="f-w-600" onClick={() => requestSort("Email")}>
                Email{" "}
                {sortConfig.key === "Email" ? (
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
            {loading
              ? null
              : sortedData?.length >= 1 &&
                sortedData?.map((data, index) => (
                  <tr
                    key={index}
                    onClick={() => handleClickNew(data, index)}
                    className={editSelectedIndex === index ? "tableSelected" : ""}
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
