/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setListingData,
  setFormData,
  setSelectedId,
  setSortFlag,
  setSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetail,
  setEmailSenderTypesvalid,
} from "../../../../../redux/EmailSenderTypesSlice";
import EmailSenderTypesService from "../../../../../services/EmailSenderTypesService";
import LoadingText from "../../../../common/LoadingText";

const TableListing = ({ loading, setLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const listingData = useSelector((state) => state.emailSenderTypes.listingData);
  const searchTerm = useSelector((state) => state.emailSenderTypes.searchTerm);
  const searchCriteria = useSelector((state) => state.emailSenderTypes.searchCriteria);
  const pageNumber = useSelector((state) => state.emailSenderTypes.pageNumber);
  const selectedId = useSelector((state) => state.emailSenderTypes.selectedId);
  const sortFlag = useSelector((state) => state.emailSenderTypes.sortFlag);
  const sortValue = useSelector((state) => state.emailSenderTypes.sortValue);

  const onhandleNormalSort = (sortValue) => {
    dispatch(setSortValue(sortValue));
    dispatch(setSortFlag(!sortFlag));
  };

  const fetchTableData = () => {
    setLoading(true);
    EmailSenderTypesService.getAll(searchTerm, searchCriteria, pageNumber, sortValue, sortFlag)
      .then((response) => {
        const { data } = response;
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerm, searchCriteria, pageNumber, sortValue, sortFlag]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("description");
              }}
            >
              Description
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
            listingData?.map((data) => (
              <tr
                id="rowId"
                key={data.emailSenderTypePK}
                onClick={() => dispatch(setSelectedId(null))}
                onDoubleClick={() => {
                  dispatch(setSelectedId(data.emailSenderTypePK));
                  dispatch(setViewDetail(true));
                  dispatch(setFormData(null));
                  dispatch(setEmailSenderTypesvalid(true));
                  setTimeout(() => {
                    navigate(`/email-sender-types/${data.emailSenderTypePK}`);
                  }, 100);
                }}
                className={data.emailSenderTypePK === selectedId ? "tableSelected" : ""}
              >
                <td className="f-w-600"> {data.description} </td>
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
