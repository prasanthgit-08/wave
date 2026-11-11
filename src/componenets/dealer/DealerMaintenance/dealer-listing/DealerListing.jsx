/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";

import DealerService from "../../../../services/DealerService";

import {
  setDealerData,
  setNormalSortValue,
  setNormalSortFlag,
  setId,
  setChangeColor,
} from "../../../../redux/DealerSearchFilterSlice";
import { setTotalElements, setTotalPages } from "../../../../redux/PaginationSlice";
import LoadingIcon from "../../../common/LoadingIcon";
import {
  setBolAtDispatchOrFaxBolAtOrderEntry,
  setFaxBolAtDispatch,
  setFaxBolAtOrderEntry,
  setFetchLoad,
  setViewDetail,
} from "../../../../redux/EditDealerSlice";

export const DealerListing = () => {
  const dealerData = useSelector((state) => state.dealerSearchReducer.dealerData);
  const pageNumber = useSelector((state) => state.paginationReducer.pageNumber);
  const selectedStatus = useSelector((state) => state.dealerSearchReducer.selectedStatus);
  const selectedSearchCriteria = useSelector((state) => state.dealerSearchReducer.selectedSearchCriteria);
  const searchedDealer = useSelector((state) => state.dealerSearchReducer.searchedDealer);
  const sortFlag = useSelector((state) => state.dealerSearchReducer.normalSortFlag);
  const sortValue = useSelector((state) => state.dealerSearchReducer.normalSortValue);
  const advanceSortingOrder = useSelector((state) => state.dealerSearchReducer.advanceSortingOrder);
  const searchTerm = useSelector((state) => state.dealerSearchReducer.searchTerms);
  const id = useSelector((state) => state.dealerSearchReducer.id);
  const changeColor = useSelector((state) => state.dealerSearchReducer.changeColor);
  const selectedDealerStatus = useSelector((state) => state.dealerSearchReducer.selectedDealerStatus);
  const showAdvanceSort = useSelector((state) => state.dealerSearchReducer.showAdvanceSort);
  const advancedSearchString = useSelector((state) => state.dealerSearchReducer.advancedSearchString);
  const advancedSearchByPayload = useSelector((state) => state.dealerSearchReducer.advancedSearchByPayload);

  const [loading, setLoading] = useState(true);
  const latestRequestId = useRef(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onhandleNormalSort = (value, val) => {
    if (!showAdvanceSort) {
      dispatch(setNormalSortValue(value));
      dispatch(setNormalSortFlag(val));
    }
  };
  const fetchDealers = async () => {
    const requestId = ++latestRequestId.current;
    // Only the latest request may update the list / loader; an older response arriving late
    // would otherwise show data that doesn't match the current sort.
    const isLatest = () => requestId === latestRequestId.current;
    DealerService.getDealers(
      selectedStatus,
      pageNumber,
      searchedDealer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerm,
      sortValue,
      sortFlag,
      selectedDealerStatus,
      advancedSearchString,
      advancedSearchByPayload
    )
      .then((response) => {
        // A 200 OK can still come back without a body; fall back to an empty list instead of throwing.
        const data = response?.data;
        const applyData = () => {
          if (!isLatest()) return;
          try {
            dispatch(setDealerData(data?.content || []));
            dispatch(setTotalElements(data?.totalElements || 0));
            dispatch(setTotalPages(data?.totalPages || 0));
          } finally {
            // Safety net: this runs from a setTimeout (outside the promise chain), so an error here
            // would never reach .catch() and the loader would stay on forever.
            setLoading(false);
            dispatch(setFetchLoad(false));
          }
        };
        if (searchTerm === "") {
          setTimeout(applyData, 650);
        } else {
          applyData();
        }
      })
      .catch(() => {
        if (!isLatest()) return;
        setLoading(false);
        dispatch(setFetchLoad(false));
      });
  };

  useEffect(() => {
    // Start the loader as soon as sort/search/paging changes (not after the debounce), so the
    // sort header can't be clicked again while waiting. The 500ms debounce itself is unchanged.
    setLoading(true);
    dispatch(setFetchLoad(true));
    const debounceFunction = setTimeout(() => {
      fetchDealers();
    }, 500);
    return () => clearTimeout(debounceFunction);
  }, [
    selectedDealerStatus,
    selectedStatus,
    selectedSearchCriteria,
    searchedDealer,
    sortValue,
    sortFlag,
    advanceSortingOrder,
    pageNumber,
    showAdvanceSort,
    searchTerm,
    advancedSearchString,
    advancedSearchByPayload,
  ]);

  useEffect(() => {
    dispatch(setBolAtDispatchOrFaxBolAtOrderEntry(false));
  }, []);

  return (
    <div className="fixTableHead">
      {/* Overlay on top of the table (keeps the current rows visible) and blocks clicks while loading */}
      {loading && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr>
            <th className="f-w-600 col-5" onClick={() => onhandleNormalSort("name", !sortFlag)}>
              {t("dealers.list.page.table.heading.name")}
              {showAdvanceSort !== true && sortValue === "name" && (
                <i
                  className={`fa ${sortFlag ? "fa-sort-alpha-asc" : "fa-sort-alpha-desc"} font-20 m-l-10`}
                  aria-hidden="true"
                />
              )}
            </th>

            <th className="f-w-600 col-3" onClick={() => onhandleNormalSort("dba", !sortFlag)}>
              {t("dealers.list.page.table.heading.dba")}
              {showAdvanceSort !== true && sortValue === "dba" && (
                <i
                  className={`fa ${sortFlag ? "fa-sort-alpha-asc" : "fa-sort-alpha-desc"} font-20 m-l-10`}
                  aria-hidden="true"
                />
              )}
            </th>

            <th className="f-w-600 col-2" onClick={() => onhandleNormalSort("city", !sortFlag)}>
              {t("dealers.list.page.table.heading.city")}
              {showAdvanceSort !== true && sortValue === "city" && (
                <i
                  className={`fa ${sortFlag ? "fa-sort-alpha-asc" : "fa-sort-alpha-desc"} font-20 m-l-10`}
                  aria-hidden="true"
                />
              )}
            </th>

            <th className="f-w-600 col-2" onClick={() => onhandleNormalSort("stateCode", !sortFlag)}>
              {t("dealers.list.page.table.heading.state")}
              {showAdvanceSort !== true && sortValue === "stateCode" && (
                <i
                  className={`fa ${sortFlag ? "fa-sort-alpha-asc" : "fa-sort-alpha-desc"} font-20 m-l-10`}
                  aria-hidden="true"
                />
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {dealerData.map((dealer) => {
            const dealerKey = dealer.dealerPK ?? dealer.incompletedealerPK;
            const isSelected =
              (dealer.active === true || (dealer.active === false && selectedDealerStatus === "Complete")
                ? dealer.dealerPK === id
                : dealer.incompletedealerPK === id) && changeColor;

            return (
              <tr
                key={dealerKey}
                onClick={() => dispatch(setChangeColor(false))}
                onDoubleClick={() => {
                  dispatch(setId(dealerKey));
                  dispatch(setViewDetail(true));
                  dispatch(setChangeColor(true));
                  dispatch(setFaxBolAtOrderEntry(false));
                  dispatch(setFaxBolAtDispatch(false));
                  setTimeout(() => {
                    const path =
                      dealer.active !== undefined && selectedDealerStatus === "Complete"
                        ? `/add-dealer/${dealer.dealerPK}/${pageNumber}`
                        : `/add-incompleteDealer/${dealer.incompletedealerPK}/${pageNumber}`;
                    navigate(path);
                  }, 100);
                }}
                className={isSelected ? "tableSelected" : ""}
              >
                <td className="f-w-600">{dealer.name}</td>
                <td className="f-w-600">{dealer.dba}</td>
                <td className="f-w-600">{dealer.city}</td>
                <td className="f-w-600">{dealer.stateCode}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {!loading && dealerData.length === 0 && (
        <h2 className="empty-list" align="center">
          No Records Available
        </h2>
      )}
    </div>
  );
};
