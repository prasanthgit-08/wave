import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setListingData,
  setTotalPages,
  setTotalElements,
  setId,
  setChangeColor,
  setViewDetail,
  setNormalSortValue,
  setNormalSortFlag,
  resetChanges,
  setEditFormData,
} from "../../../../../redux/EmailRecipientSlice";
import EmailRecipientService from "../../../../../services/EmailRecipientService";
import TruncatedStringWithTooltip from "../../../../common/TruncatedStringWithTooltip";
import LoadingText from "../../../../common/LoadingText";

const TableListing = ({ loading, setLoading }) => {
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pageNumber = useSelector((state) => state.emailRecipient.pageNumber);
  const searchTerm = useSelector((state) => state.emailRecipient.searchTerm);
  const searchCriteria = useSelector((state) => state.emailRecipient.searchCriteria);
  const listingData = useSelector((state) => state.emailRecipient.listingData);
  const changeColor = useSelector((state) => state.emailRecipient.changeColor);
  const id = useSelector((state) => state.emailRecipient.id);
  const sortValue = useSelector((state) => state.emailRecipient.normalSortValue);
  const sortFlag = useSelector((state) => state.emailRecipient.normalSortFlag);
  const databaseTable = useSelector((state) => state.emailFormats.databaseTableName);
  const recordPrimaryKey = useSelector((state) => state.emailFormats.recordPrimaryKey);

  // Only update the sort state; the debounced effect below refetches when it changes.
  // Fetching here as well caused a duplicate API call on every sort click.
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  const fetchAllEmailRecipientsData = () => {
    setLoading(true);
    EmailRecipientService.listAllEmailRecipients(
      searchTerm,
      searchCriteria,
      pageNumber,
      sortValue,
      sortFlag,
      param.emailMaintenanceId,
      databaseTable,
      2
    )
      .then((response) => {
        const { data } = response;
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchAllEmailRecipientsData();
    }, 500);
    return () => {
      clearTimeout(debounceFunction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCriteria, searchTerm, pageNumber, sortValue, sortFlag]);

  const handleDoubleClick = (value) => {
    dispatch(resetChanges());
    dispatch(setEditFormData(null));
    dispatch(setId(value));
    dispatch(setChangeColor(true));
    dispatch(setViewDetail(true));
    navigate("/email-recipients/" + param.emailMaintenanceId + "/" + pageNumber + "/new-page/" + value);
  };

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              onClick={() => {
                onhandleNormalSort("name", !sortFlag);
              }}
              className="f-w-600 col-3"
            >
              Name
              {sortFlag && sortValue === "name" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "name" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
            <th
              onClick={() => {
                onhandleNormalSort("email", !sortFlag);
              }}
              className="f-w-600 col-3 ps-2"
            >
              Email
              {sortFlag && sortValue === "email" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "email" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>

        <tbody>
          {!loading &&
            listingData.map((emailRecipient) => (
              <tr
                key={emailRecipient.emailRecipientPK}
                className={id === emailRecipient.emailRecipientPK && changeColor ? "tableSelected" : ""}
                onClick={() => {
                  dispatch(setId(emailRecipient.emailRecipientPK));
                }}
                onDoubleClick={() => {
                  handleDoubleClick(emailRecipient.emailRecipientPK);
                }}
              >
                <td>
                  {emailRecipient.displayName || emailRecipient.recipientUserFK?.name || "Dynamic Recipient"}
                </td>
                <td>
                  <TruncatedStringWithTooltip
                    text={
                      emailRecipient.displayEmail ||
                      emailRecipient.recipientUserFK?.email ||
                      (emailRecipient.recipientFieldName ? emailRecipient.recipientFieldName : "")
                    }
                    charLimit={100}
                  />
                </td>
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
