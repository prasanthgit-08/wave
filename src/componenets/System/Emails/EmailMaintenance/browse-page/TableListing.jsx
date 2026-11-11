import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmailFormatService from "../../../../../services/EmailFormatService";
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
} from "../../../../../redux/EmailFormatsSlice";
import LoadingText from "../../../../common/LoadingText";

const TableListing = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageNumber = useSelector((state) => state.emailFormats.pageNumber);
  const searchTerm = useSelector((state) => state.emailFormats.searchTerm);
  const searchCriteria = useSelector((state) => state.emailFormats.searchCriteria);
  const listingData = useSelector((state) => state.emailFormats.listingData);
  const changeColor = useSelector((state) => state.emailFormats.changeColor);
  const id = useSelector((state) => state.emailFormats.id);
  const sortValue = useSelector((state) => state.emailFormats.normalSortValue);
  const sortFlag = useSelector((state) => state.emailFormats.normalSortFlag);

  // Only update the sort state; the debounced effect below refetches when it changes.
  // Fetching here as well caused a duplicate API call on every sort click.
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  const fetchAllEmailFormatsData = () => {
    setLoading(true);
    EmailFormatService.listAllEmailFormats(searchTerm, searchCriteria, pageNumber, sortValue, sortFlag)
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
      fetchAllEmailFormatsData();
    }, 500);
    return () => {
      clearTimeout(debounceFunction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCriteria, searchTerm, pageNumber, sortValue, sortFlag]);

  const handleDoubleClick = (value) => {
    dispatch(setId(value));
    dispatch(setChangeColor(true));
    dispatch(setViewDetail(true));
    dispatch(setEditFormData(null));
    dispatch(resetChanges());
    navigate(`/email-maintenance/${value}/${pageNumber}`);
  };

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              onClick={() => {
                onhandleNormalSort("description", !sortFlag);
              }}
              className="f-w-600 col-4"
            >
              Description
              {sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              onClick={() => {
                onhandleNormalSort("objectKey", !sortFlag);
              }}
              className="f-w-600 col-2 ps-2"
            >
              Object Key
              {sortFlag && sortValue === "objectKey" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "objectKey" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {!loading &&
            listingData.map((emailFormat) => (
              <tr
                key={emailFormat.emailFormatPK}
                className={id === emailFormat.emailFormatPK && changeColor ? "tableSelected" : ""}
                onClick={() => {
                  dispatch(setId(emailFormat.emailFormatPK));
                }}
                onDoubleClick={() => {
                  handleDoubleClick(emailFormat.emailFormatPK);
                }}
              >
                <td>{emailFormat.description}</td>
                <td>{emailFormat.objectKey}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* {loading
        ? ""
        : listingData.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )} */}
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
