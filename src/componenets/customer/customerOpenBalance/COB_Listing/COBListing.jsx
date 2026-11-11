import React from "react";
import { t } from "i18next";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomerOpenBalanceService from "../../../../services/CustomerOpenBalanceService";
import {
  setCustomerOpenBalanceData,
  setTotalElements,
  setTotalPages,
  setBrowseNavigation,
  setId,
  setChangeColor,
  setViewDetail,
  setCustomerFK,
  setNormalSortValue,
  setNormalSortFlag,
  setCobData,
} from "../../../../redux/customerOpenBalanceSlice";

import { useNavigate, useParams } from "react-router-dom";
import LoadingText from "../../../common/LoadingText";

const COBListing = () => {
  const [customerOpenBalance, setCustomerOpenBalance] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageNumber = useSelector((state) => state.customerOpenBalanceReducer.pageNumber);
  let viewDetail = useSelector((state) => state.customerOpenBalanceReducer.viewDetail);
  const cobData = useSelector((state) => state.customerOpenBalanceReducer.cobData);
  const selecteActiveType = useSelector((state) => state.customerOpenBalanceReducer.selecteActiveType);
  const params = useParams();
  const customerId = params.customerPK;
  const customerFK = params.customerPK;
  const customerPageNumber = params.customerPageNumber;
  const [loader, setLoader] = useState(true);
  const selectedSearchCriteria = useSelector(
    (state) => state.customerOpenBalanceReducer.selectedSearchCriteria
  );

  const id = useSelector((state) => state.customerOpenBalanceReducer.id);

  const changeColor = useSelector((state) => state.customerOpenBalanceReducer.changeColor);

  const globalSearchTerm = useSelector((state) => state.customerOpenBalanceReducer.searchTerm);
  const sortFlag = useSelector((state) => state.customerOpenBalanceReducer.normalSortFlag);

  const sortValue = useSelector((state) => state.customerOpenBalanceReducer.normalSortValue);
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));
  };

  const fetchCustomerOpenBalance = () => {
    setLoader(true);
    CustomerOpenBalanceService.getAllCustomerOpenBalance(
      selecteActiveType,
      selectedSearchCriteria,
      globalSearchTerm,
      customerOpenBalance,
      customerFK,
      pageNumber,
      sortValue,
      sortFlag
    )
      .then((response) => {
        setLoader(false);
        const data = response.data;
        setCustomerOpenBalance(data.content);
        dispatch(setCobData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setBrowseNavigation(data));
      })
      .catch((err) => {
        setLoader(false);
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    setLoader(true);
    const debounceFunction = setTimeout(() => {
      fetchCustomerOpenBalance();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    customerId,
    selectedSearchCriteria,
    globalSearchTerm,
    pageNumber,
    sortValue,
    sortFlag,
    selecteActiveType,
  ]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th className="f-w-600">{t("customerOpenBalance.list.page.table.heading.user")}</th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("amount", !sortFlag);
              }}
            >
              {t("customerOpenBalance.list.page.table.heading.amount")}
              {sortFlag && sortValue === "amount" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "amount" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("balance", !sortFlag);
              }}
            >
              {t("customerOpenBalance.list.page.table.heading.balance")}
              {sortFlag && sortValue === "balance" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "balance" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("description", !sortFlag);
              }}
            >
              {t("customerOpenBalance.list.page.table.heading.description")}
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
          {loader
            ? null
            : cobData.map((cob) => (
                <tr
                  id="rowId"
                  key={cob.customerOpenBalancePK}
                  onClick={(e) => dispatch(setChangeColor(false))}
                  onDoubleClick={(event) => {
                    dispatch(setChangeColor(true));
                    dispatch(setViewDetail(true));
                    dispatch(setId(cob.customerOpenBalancePK));
                    setTimeout(() => {
                      navigate(
                        "/add-customer-open-balance/" +
                          cob.customerOpenBalancePK +
                          "/" +
                          customerId +
                          "/" +
                          customerPageNumber +
                          "/" +
                          pageNumber
                      );
                    }, 100);
                  }}
                  className={cob.customerOpenBalancePK === id && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600">{cob.customerFK.name}</td>
                  <td className="f-w-600">{cob.amount?.toFixed(2)}</td>
                  <td className="f-w-600">{cob.balance?.toFixed(2)}</td>
                  <td className="f-w-600">{cob.description}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {loader
        ? ""
        : cobData.length === 0 && (
            <h2 className="empty-list" align="center">
              {t("AlternateContact.list.empty.message")}
            </h2>
          )}
      {loader && <LoadingText />}
    </div>
  );
};

export default COBListing;
