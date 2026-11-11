import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import {
  resetDealerDetails,
  setChangeColor,
  setDealerData,
  setId,
  setSortFlag,
  setSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetails,
} from "../../../../redux/CustomerDealerSlice";
import { useState } from "react";
import CustomerDealersService from "../../../../services/CustomerDealersService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../../../common/LoadingIcon";

const DealerListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const showAdvanceSort = useSelector((state) => state.customerDealersFilter.showAdvancedSort);
  const sortFlag = useSelector((state) => state.customerDealersFilter.sortFlag);
  const sortValue = useSelector((state) => state.customerDealersFilter.sortValue);
  const dealerData = useSelector((state) => state.customerDealersFilter.dealerData);
  const id = useSelector((state) => state.customerDealersFilter.id);
  const searchTerm = useSelector((state) => state.customerDealersFilter.searchTerm);
  const searchCriteria = useSelector((state) => state.customerDealersFilter.searchCriteria);
  const pageNumber = useSelector((state) => state.customerDealersFilter.pageNumber);
  const activestate = useSelector((state) => state.customerDealersFilter.isActive);
  const advancedSearchString = useSelector((state) => state.customerDealersFilter.advancedSearchString);
  const advancedSearchByPayload = useSelector((state) => state.customerDealersFilter.advancedSearchByPayload);
  const advancedSortingOrder = useSelector((state) => state.customerDealersFilter.advanceSortingOrder);
  const searchedDealer = useSelector((state) => state.customerDealersFilter.searchedDealer);
  const changeColor = useSelector((state) => state.customerDealersFilter.changeColor);

  const listDealer = async () => {
    setLoading(true);
    CustomerDealersService.fetchDealers(
      activestate,
      pageNumber,
      searchedDealer,
      searchCriteria,
      advancedSortingOrder,
      searchTerm,
      sortValue,
      sortFlag,
      advancedSearchString,
      advancedSearchByPayload
    )
      .then((response) => {
        dispatch(setDealerData(response?.data?.content));
        dispatch(setTotalElements(response?.data?.totalElements));
        dispatch(setTotalPages(response?.data?.totalPages));
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onhandleNormalSort = (value, sort) => {
    dispatch(setSortFlag(sort));
    dispatch(setSortValue(value));
  };
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      listDealer();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    searchCriteria,
    searchedDealer,
    searchTerm,
    activestate,
    pageNumber,
    advancedSearchString,
    advancedSearchByPayload,
    advancedSortingOrder,
    sortFlag,
    showAdvanceSort,
    sortValue,
  ]);

  return (
    <div className="fixTableHead">
      {loading && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th className="f-w-600" onClick={() => onhandleNormalSort("name", !sortFlag)}>
              {t("dealers.list.page.table.heading.name")}
              {showAdvanceSort !== true && sortFlag && sortValue === "name" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true" />
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "name" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10" />
              )}
            </th>

            <th className="f-w-600" onClick={() => onhandleNormalSort("dba", !sortFlag)}>
              {t("dealers.list.page.table.heading.dba")}
              {showAdvanceSort !== true && sortFlag && sortValue === "dba" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true" />
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "dba" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10" />
              )}
            </th>
            <th className="f-w-600" onClick={() => onhandleNormalSort("city", !sortFlag)}>
              {t("dealers.list.page.table.heading.city")}
              {showAdvanceSort !== true && sortFlag && sortValue === "city" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true" />
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "city" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10" />
              )}
            </th>
            <th className="f-w-600" onClick={() => onhandleNormalSort("stateCode", !sortFlag)}>
              {t("dealers.list.page.table.heading.state")}
              {showAdvanceSort !== true && sortFlag && sortValue === "stateCode" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true" />
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "stateCode" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10" />
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {!loading &&
            dealerData?.map((dealer) => (
              <tr
                id="rowId"
                key={dealer?.dealerPK != null ? dealer?.dealerPK : dealer?.incompletedealerPK}
                onClick={(e) => {
                  dispatch(setChangeColor(false));
                }}
                onDoubleClick={() => {
                  dispatch(resetDealerDetails());
                  dispatch(setId(dealer?.dealerPK != null ? dealer?.dealerPK : dealer?.incompletedealerPK));
                  dispatch(setViewDetails(true));
                  dispatch(setChangeColor(true));
                  setTimeout(() => {
                    navigate("/customer-dealers-browse/" + dealer?.dealerPK + "/" + pageNumber);
                  }, 100);
                }}
                className={dealer?.dealerPK === id && changeColor ? "tableSelected" : " "}
              >
                <td className="f-w-600"> {dealer.name} </td>
                <td className="f-w-600"> {dealer.dba} </td>
                <td className="f-w-600"> {dealer.city} </td>
                <td className="f-w-600"> {dealer.stateCode} </td>
              </tr>
            ))}
        </tbody>
      </table>
      {!loading && dealerData?.length === 0 && (
        <h2 className="empty-list" align="center">
          No Records Available
        </h2>
      )}
    </div>
  );
};

export default DealerListing;
