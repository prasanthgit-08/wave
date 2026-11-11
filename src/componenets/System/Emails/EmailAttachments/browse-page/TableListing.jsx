import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EmailAttachmentService from "../../../../../services/EmailAttachmentService";
import {
  setChangeColor,
  setListingData,
  setSelectedId,
  setSortFlag,
  setSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../../redux/EmailAttachmentSlice";
import TruncatedStringWithTooltip from "../../../../common/TruncatedStringWithTooltip";
import LoadingText from "../../../../common/LoadingText";

const TableListing = ({ loading, setLoading }) => {
  const { emailMaintenanceId } = useParams();
  const listingData = useSelector((state) => state.emailAttachmentReducer.listingData);
  const searchTerm = useSelector((state) => state.emailAttachmentReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.emailAttachmentReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.emailAttachmentReducer.pageNumber);
  const selectedId = useSelector((state) => state.emailAttachmentReducer.selectedId);
  const emailFormatFK = useSelector((state) => state.emailAttachmentReducer.emailFormatFK);
  const sortFlag = useSelector((state) => state.emailAttachmentReducer.sortFlag);
  const sortValue = useSelector((state) => state.emailAttachmentReducer.sortValue);
  const changeColor = useSelector((state) => state.emailAttachmentReducer.changeColor);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();

  // Only update the sort state; the debounced effect below refetches when it changes.
  // Fetching here as well caused a duplicate API call on every sort click.
  const onhandleNormalSort = (value, val) => {
    dispatch(setSortValue(value));
    dispatch(setSortFlag(val));
  };

  const fetchFormData = () => {
    setLoading(true);
    EmailAttachmentService.getAll(
      searchTerm,
      searchCriteria,
      pageNumber,
      sortValue,
      sortFlag,
      emailMaintenanceId
    )
      .then((response) => {
        const { data } = response;
        setLoading(false);
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
      fetchFormData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerm, searchCriteria, pageNumber, sortValue, sortFlag]);

  const handleDoubleClick = (value) => {
    dispatch(setSelectedId(value));
    dispatch(setChangeColor(true));
    dispatch(setViewDetail(true));
    navigate(`/email-attachment/${param.emailMaintenanceId}/${pageNumber}/${value}`);
  };

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("description", !sortFlag);
              }}
            >
              Form
              {sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {!loading &&
            listingData?.map((emailAttachment) => (
              <tr
                key={emailAttachment.emailAttachmentPK}
                className={selectedId === emailAttachment.emailAttachmentPK ? "tableSelected" : ""}
                onClick={() => {
                  dispatch(setSelectedId(null));
                }}
                onDoubleClick={() => {
                  handleDoubleClick(emailAttachment.emailAttachmentPK);
                }}
              >
                <td>
                  <TruncatedStringWithTooltip
                    text={
                      emailAttachment?.formDescription
                        ? emailAttachment?.formDescription
                        : emailAttachment?.alternateForm
                          ? emailAttachment?.alternateForm
                          : emailAttachment?.documentTypeDescription
                    }
                    charLimit={100}
                    prperty={9}
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
