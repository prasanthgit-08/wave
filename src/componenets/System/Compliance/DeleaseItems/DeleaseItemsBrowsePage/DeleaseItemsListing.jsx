/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { t } from "i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setChangeColor,
  setDeleaseItemsData,
  setId,
  setNormalSortFlag,
  setNormalSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../../redux/DeleaseItemsSlice";
import DeleaseItemsService from "../../../../../services/DeleaseItemsService";
import LoadingText from "../../../../common/LoadingText";
const DeleaseItemsListing = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageNumber = useSelector((state) => state.deleaseItemsReducer.pageNumber);
  const deleaseItemsData = useSelector((state) => state.deleaseItemsReducer.deleaseItemsData);
  const [DeleaseItemsListingData, setDeleaseItemsListingData] = useState([]);
  const sortFlag = useSelector((state) => state.deleaseItemsReducer.normalSortFlag);

  const sortValue = useSelector((state) => state.deleaseItemsReducer.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.deleaseItemsReducer.selectedSearchCriteria);
  const searchTerm = useSelector((state) => state.deleaseItemsReducer.searchTerm);

  const viewDetail = useSelector((state) => state.deleaseItemsReducer.viewDetail);
  const id = useSelector((state) => state.deleaseItemsReducer.id);
  const changeColor = useSelector((state) => state.deleaseItemsReducer.changeColor);
  const selecteActiveType = useSelector((state) => state.deleaseItemsReducer.selecteActiveType);

  useEffect(() => {
    if (deleaseItemsData != null) {
      setDeleaseItemsListingData(deleaseItemsData);
    }
  }, [deleaseItemsData, pageNumber, sortFlag, sortValue, viewDetail]);

  // Only update the sort state; the debounced effect below refetches when it changes.
  // Fetching here as well caused a duplicate API call on every sort click.
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };
  const fetchDeleaseItems = async () => {
    setLoading(true);
    DeleaseItemsService.getAlldeleaseItems(
      pageNumber,
      selectedSearchCriteria,
      searchTerm,
      selecteActiveType,
      id,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const data = response.data;

        dispatch(setDeleaseItemsData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const handleDoubleClick = (value) => {
    dispatch(setId(value));
    dispatch(setChangeColor(true));
    dispatch(setViewDetail(true));
    navigate(`/delease-items/${value}/${pageNumber}`);
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchDeleaseItems();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerm, selectedSearchCriteria, selecteActiveType, pageNumber, sortValue, sortFlag]);

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
            deleaseItemsData?.map((deleaseItems) => (
              <tr
                key={deleaseItems.deleaseItemPK}
                className={id === deleaseItems.deleaseItemPK && changeColor ? "tableSelected" : ""}
                onClick={(e) => {
                  dispatch(setId(deleaseItems.deleaseItemPK));
                  dispatch(setChangeColor(false));
                }}
                onDoubleClick={() => {
                  handleDoubleClick(deleaseItems.deleaseItemPK);
                }}
              >
                <td>{deleaseItems.description}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading ? (
        <LoadingText />
      ) : (
        deleaseItemsData?.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("dealers.list.empty.message")}
          </h2>
        )
      )}
    </div>
  );
};

export default DeleaseItemsListing;
