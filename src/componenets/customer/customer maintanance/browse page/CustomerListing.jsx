import React, { useState } from "react";
import { useEffect } from "react";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import CustomerService from "../../../../services/CustomerService";
import { setEditCustomerData, setViewDetail } from "../../../../redux/CustomerMaintenanceSlice";
import {
  setNormalSortValue,
  setNormalSortFlag,
  setCustomerData,
  setId,
  setChangeColor,
  setLoader,
} from "../../../../redux/CustomerSearchFilterSlice";
import { setTotalElements, setTotalPages, setBrowseNavigation } from "../../../../redux/PaginationSlice";
import LoadingIcon from "../../../common/LoadingIcon";

export const CustomerListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [CustomerListingData, setCustomerListingData] = useState([]);
  const [adSort] = useState(false);

  const customerData = useSelector((state) => state.customerSearchFilterReducer.customerData);

  const loader = useSelector((state) => state.customerSearchFilterReducer.loader);

  const showAdvanceSort = useSelector((state) => state.customerSearchFilterReducer.showAdvanceSort);

  let sortFlag = useSelector((state) => state.customerSearchFilterReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.customerSearchFilterReducer.normalSortValue);

  const selectedStatus = useSelector((state) => state.customerSearchFilterReducer.selectedStatus);

  const pageNumber = useSelector((state) => state.paginationReducer.pageNumber);

  const searchedCustomer = useSelector((state) => state.customerSearchFilterReducer.searchedCustomer);

  const selectedSearchCriteria = useSelector(
    (state) => state.customerSearchFilterReducer.selectedSearchCriteria
  );

  const advanceSortingOrder = useSelector((state) => state.customerSearchFilterReducer.advanceSortingOrder);

  const searchTerm = useSelector((state) => state.customerSearchFilterReducer.searchTerms);

  const selectedCustomerStatus = useSelector(
    (state) => state.customerSearchFilterReducer.selectedCustomerStatus
  );

  const viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);

  const changeColor = useSelector((state) => state.customerSearchFilterReducer.changeColor);

  const id = useSelector((state) => state.customerSearchFilterReducer.id);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;

    fetchCustomers();
  };

  useEffect(() => {
    if (customerData != null) {
      setCustomerListingData(customerData);
    }
  }, [customerData, sortFlag, sortValue, viewDetail]);

  const fetchCustomers = async () => {
    dispatch(setLoader(true));
    CustomerService.getAllCustomers(
      selectedStatus,
      pageNumber,
      searchedCustomer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerm,
      sortValue,
      sortFlag,
      selectedCustomerStatus,
      setViewDetail
    )
      .then((response) => {
        const data = response?.data;
        dispatch(setLoader(false));
        dispatch(setCustomerData(data?.content));
        dispatch(setTotalElements(data?.totalElements));
        dispatch(setTotalPages(data?.totalPages));
        dispatch(setBrowseNavigation(data));
      })
      .catch((err) => console.error(err))
      .finally(() => dispatch(setLoader(false)));
  };

  useEffect(() => {
    dispatch(setLoader(true));
    const debounceFunction = setTimeout(() => {
      fetchCustomers();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    selectedCustomerStatus,
    selectedStatus,
    selectedSearchCriteria,
    searchedCustomer,
    advanceSortingOrder,
    pageNumber,
    showAdvanceSort,
    searchTerm,
  ]);

  return (
    <div className="fixTableHead">
      {loader && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                if (showAdvanceSort !== true)
                  if (adSort === false) {
                    onhandleNormalSort("description", !sortFlag);
                  }
              }}
            >
              {t("customers.browse.page.table.heading.description")}
              {showAdvanceSort !== true && sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                if (showAdvanceSort !== true)
                  if (adSort === false) {
                    onhandleNormalSort("name", !sortFlag);
                  }
              }}
            >
              {t("dealers.list.page.table.heading.name")}
              {showAdvanceSort !== true && sortFlag && sortValue === "name" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "name" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                if (showAdvanceSort !== true)
                  if (adSort === false) {
                    onhandleNormalSort("dba", !sortFlag);
                  }
              }}
            >
              {t("dealers.list.page.table.heading.dba")}
              {showAdvanceSort !== true && sortFlag && sortValue === "dba" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "dba" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                if (showAdvanceSort !== true)
                  if (adSort === false) {
                    onhandleNormalSort("city", !sortFlag);
                  }
              }}
            >
              {t("dealers.list.page.table.heading.city")}
              {showAdvanceSort !== true && sortFlag && sortValue === "city" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "city" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                if (showAdvanceSort !== true)
                  if (adSort === false) {
                    onhandleNormalSort("stateCode", !sortFlag);
                  }
              }}
            >
              {t("dealers.list.page.table.heading.state")}
              {showAdvanceSort !== true && sortFlag && sortValue === "stateCode" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "stateCode" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {loader
            ? null
            : CustomerListingData?.map((customer) => (
                <tr
                  id="rowId"
                  key={customer.customerPK != null ? customer.customerPK : customer.incompletecustomerPK}
                  onClick={(e) => dispatch(setChangeColor(false))}
                  onDoubleClick={(event) => {
                    dispatch(setEditCustomerData(null));
                    dispatch(
                      setId(customer.active === true ? customer.customerPK : customer.incompletecustomerPK)
                    );
                    dispatch(setChangeColor(true));
                    setTimeout(() => {
                      navigate(
                        (customer.active === true || customer.active === false) &&
                          selectedCustomerStatus === "Complete"
                          ? "/add-customer/" + customer.customerPK + "/" + pageNumber
                          : "/add-incompleteCustomer/" + customer.incompletecustomerPK + "/" + pageNumber
                      );
                    }, 100);
                  }}
                  className={
                    (customer.active === true ||
                    (customer.active === false && selectedCustomerStatus === "Complete")
                      ? customer.customerPK === id
                      : customer.incompletecustomerPK === id) && changeColor
                      ? "tableSelected"
                      : " "
                  }
                >
                  <td className="f-w-600"> {customer.description} </td>
                  <td className="f-w-600"> {customer.name} </td>
                  <td className="f-w-600"> {customer.dba} </td>
                  <td className="f-w-600"> {customer.city} </td>
                  <td className="f-w-600"> {customer.stateCode} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {loader
        ? ""
        : customerData?.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
    </div>
  );
};
