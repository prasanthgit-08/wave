import React, { useState } from "react";
import { useEffect } from "react";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import CustomerPlantMaintenanceService from "../../../../services/CustomerPlantMaintenanceService";
import {
  setNormalSortValue,
  setNormalSortFlag,
  setId,
  setChangeColor,
  setTotalElements,
  setTotalPages,
  setBrowseNavigation,
  setLoader,
} from "../../../../redux/UsePlantCustomerSearchFilterSlice";

import {
  setCustomerPlantData,
  setViewDetail,
  setPlantData,
  setPlantLoader,
} from "../../../../redux/CustomerPlantMaintenanceSlice";
import { resetPlantSearchFilter } from "../../../../redux/CustomerPlantSearchFilterSlice";
import LoadingText from "../../../common/LoadingText";
const ListCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [adSort] = useState(false);
  const [customerPlantListingData, setCustomerPlantListingData] = useState([]);
  const customerPlantData = useSelector((state) => state.customerPlantmaintanceReducer.customerPlantData);
  const loader = useSelector((state) => state.usePlantCustomerSearchFilterReducer.loader);

  const showAdvanceSort = useSelector((state) => state.usePlantCustomerSearchFilterReducer.showAdvanceSort);

  let sortFlag = useSelector((state) => state.usePlantCustomerSearchFilterReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.usePlantCustomerSearchFilterReducer.normalSortValue);

  const selectedStatus = useSelector((state) => state.usePlantCustomerSearchFilterReducer.selectedStatus);

  const pageNumber = useSelector((state) => state.usePlantCustomerSearchFilterReducer.pageNumber);

  const searchedCustomer = useSelector((state) => state.usePlantCustomerSearchFilterReducer.searchedCustomer);

  const selectedSearchCriteria = useSelector(
    (state) => state.usePlantCustomerSearchFilterReducer.selectedSearchCriteria
  );

  const advanceSortingOrder = useSelector(
    (state) => state.usePlantCustomerSearchFilterReducer.advanceSortingOrder
  );

  const searchTerms = useSelector((state) => state.usePlantCustomerSearchFilterReducer.searchTerms);

  const selectedCustomerStatus = useSelector(
    (state) => state.usePlantCustomerSearchFilterReducer.selectedCustomerStatus
  );

  const viewDetail = useSelector((state) => state.customerPlantmaintanceReducer.viewDetail);

  const changeColor = useSelector((state) => state.usePlantCustomerSearchFilterReducer.changeColor);

  const id = useSelector((state) => state.usePlantCustomerSearchFilterReducer.id);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;

    fetchCustomer();
  };

  useEffect(() => {
    if (customerPlantData != null) {
      setCustomerPlantListingData(customerPlantData);
    }
  }, [customerPlantData, sortFlag, sortValue, viewDetail]);

  const fetchCustomer = async () => {
    dispatch(setLoader(true));
    CustomerPlantMaintenanceService.getAlluseplantsCustomers(
      selectedStatus,
      pageNumber,
      searchedCustomer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      selectedCustomerStatus,
      setViewDetail
    )
      .then((response) => {
        const data = response.data;
        dispatch(setCustomerPlantData(data.content));
        dispatch(setLoader(false));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setBrowseNavigation(data));
      })
      .catch((err) => {
        dispatch(setLoader(false));
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  return (
    <div className="fixTableHead">
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
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
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
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
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
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
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
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
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
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {loader
            ? null
            : customerPlantData.map((customer) => (
                <tr
                  id="rowId"
                  key={customer.customerPK}
                  onClick={(e) => dispatch(setChangeColor(false))}
                  onDoubleClick={(event) => {
                    dispatch(setPlantLoader(true));
                    dispatch(setId(customer.customerPK));
                    dispatch(setChangeColor(true));
                    dispatch(setViewDetail(true));
                    dispatch(setPlantData([]));
                    dispatch(resetPlantSearchFilter());

                    setTimeout(() => {
                      navigate("/plant-browse-page/" + customer.customerPK + "/" + pageNumber);
                    }, 100);
                  }}
                  className={customer.customerPK === id && changeColor ? "tableSelected" : ""}
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
        : customerPlantData.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
      {loader && <LoadingText />}
    </div>
  );
};
export default ListCustomer;
