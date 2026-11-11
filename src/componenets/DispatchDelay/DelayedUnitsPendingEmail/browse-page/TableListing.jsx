import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DelayedUnitPendingEmailService from "../../../../services/DelayedUnitPendingEmailService";
import { updateField } from "../../../../redux/DelayedUnitsPendingEmailSlice";
import formatDatetimeToDate from "../../../../utils/formatDateTimeToDate";
import LoadingIcon from "../../../common/LoadingIcon";
import LoadingText from "../../../common/LoadingText";
import useDebouncer from "../../../../hooks/useDebouncer";

const TableListing = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectionType, setSelectionType] = useState("Browse");
  const [delayedUnitPendingEmailPK, setDelayedUnitPendingEmailPK] = useState(0);

  const searchTerm = useSelector((state) => state.delayedUnitsPendingEmail.searchTerm);
  const searchCriteria = useSelector((state) => state.delayedUnitsPendingEmail.searchCriteria);
  const sortValue = useSelector((state) => state.delayedUnitsPendingEmail.sortValue);
  const sortFlag = useSelector((state) => state.delayedUnitsPendingEmail.sortFlag);
  const selectedStatus = useSelector((state) => state.delayedUnitsPendingEmail.selectedStatus);
  const listingData = useSelector((state) => state.delayedUnitsPendingEmail.listingData);
  const pageNumber = useSelector((state) => state.delayedUnitsPendingEmail.pageNumber);
  const selectedId = useSelector((state) => state.delayedUnitsPendingEmail.selectedId);
  const selectedPK = useSelector((state) => state.delayedUnitsPendingEmail.selectedPK);
  const searchStatus = useSelector((state) => state.delayedUnitsPendingEmail.searchStatus);
  const type = useSelector((state) => state.delayedUnitsPendingEmail.type);
  const tempEmailBody = useSelector((state) => state.delayedUnitsPendingEmail.tempEmailBody);
  const operationFlag = useSelector((state) => state.delayedUnitsPendingEmail.operationFlag);

  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const onhandleNormalSort = (value, val) => {
    updateData("sortValue", value);
    updateData("sortFlag", val);
  };

  const fetchTableDatas = () => {
    setLoading(true); // Start loading before API call
    DelayedUnitPendingEmailService.getDelayedUnitPendingEmailRecords(
      searchCriteria,
      searchTerm,
      pageNumber,
      sortValue,
      sortFlag,
      selectionType,
      delayedUnitPendingEmailPK,
      searchStatus,
      type,
      0, // Operation flag for fetch
      "" // email body
    )
      .then((response) => {
        if (response && response?.data) {
          const { data } = response;
          const browseData = data?.slice(0, data?.length - 1); // Slice everything except the last item
          const pagination = data?.slice(data?.length - 1); // Get only the last item (or empty array if data is empty)
          updateData("totalPages", pagination[0]?.TotalPages);
          updateData("totalElements", pagination[0]?.TotalElements);
          updateData("listingData", browseData || []);
        } else {
          console.error("Unexpected API response format:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching delayed unit pending email record:", error);
      })
      .finally(() => {
        setLoading(false); // Ensure loading is stopped after API call
      });
  };

  const debounceFetch = useDebouncer(fetchTableDatas, 500);

  useEffect(() => {
    setLoading(true);
    debounceFetch();
    updateData("isSaveFlag", false);
    if (operationFlag == 2 || operationFlag == 1) {
      updateData("selectedId", null);
    }
  }, [searchTerm, searchCriteria, searchStatus, type, sortValue, sortFlag, pageNumber]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("AddDate", !sortFlag);
              }}
            >
              Date
              {sortFlag && sortValue === "AddDate" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "AddDate" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("unitNumber", !sortFlag);
              }}
            >
              Unit Number
              {sortFlag && sortValue === "unitNumber" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "unitNumber" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("type", !sortFlag);
              }}
            >
              Type
              {sortFlag && sortValue === "type" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "type" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("action", !sortFlag);
              }}
            >
              Action
              {sortFlag && sortValue === "action" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "action" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("name", !sortFlag);
              }}
            >
              User
              {sortFlag && sortValue === "name" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "name" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>

        <tbody>
          {loading
            ? null
            : listingData?.length >= 1 &&
              listingData?.map((data) => (
                <tr
                  id="rowId"
                  key={data?.delayedUnitPendingEmailPK}
                  onDoubleClick={() => {
                    updateData("selectedId", data?.delayedUnitPendingEmailPK);
                    updateData("selectedPK", data?.delayedUnitPendingEmailPK);
                    updateData("operationFlag", 0);
                    setTimeout(() => {
                      navigate(`/delay-units-pending-email/add/${data?.delayedUnitPendingEmailPK}`);
                    }, 100);
                  }}
                  className={data?.delayedUnitPendingEmailPK === selectedPK ? "tableSelected" : ""}
                >
                  <td className="f-w-600">{formatDatetimeToDate(data?.AddDate, "MM/DD/YY")}</td>
                  <td className="f-w-600"> {data?.unitNumber} </td>
                  <td className="f-w-600"> {data?.type} </td>
                  <td className="f-w-600">{data?.action} </td>
                  <td className="f-w-600">{data?.name} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {loading ? (
        <LoadingText />
      ) : (
        listingData?.length === 0 && (
          <h2 className="empty-list" align="center">
            No Records Available
          </h2>
        )
      )}
    </div>
  );
};

export default TableListing;
