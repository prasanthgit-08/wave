/* eslint-disable react-hooks/exhaustive-deps */
import { t } from "i18next";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderEntryService from "../../../services/OrderEntryService";
import {
  setLoading,
  setTotalElements,
  setTotalPages,
} from "../../../redux/LookupScreens/MiscCustomerLookupSlice";

import {
  setMiscCustomerData,
  setNormalSortValue,
  setNormalSortFlag,
  setId,
  setChangeColor,
} from "../../../redux/LookupScreens/MiscCustomerLookupSlice";
import { setMiscCustomerId } from "../../../redux/OrderEntryFilterSlice";

const TableListing = ({ onHide, OEMiscCustomerTab }) => {
  // ------------------------------------------------------------------
  const [customerListingData, setCustomerListingData] = useState([]);
  const [adSort] = useState(false);
  const miscCustomerData = useSelector((state) => state.miscCustomerLookupReducer.miscCustomerData);
  const id = useSelector((state) => state.miscCustomerLookupReducer.id);
  const changeColor = useSelector((state) => state.miscCustomerLookupReducer.changeColor);
  const loading = useSelector((state) => state.miscCustomerLookupReducer.loading);
  const pageNumber = useSelector((state) => state.miscCustomerLookupReducer.pageNumber);
  let sortFlag = useSelector((state) => state.miscCustomerLookupReducer.normalSortFlag);
  let sortValue = useSelector((state) => state.miscCustomerLookupReducer.normalSortValue);
  const showAdvanceSort = useSelector((state) => state.miscCustomerLookupReducer.showAdvanceSort);
  const searchedCustomer = useSelector((state) => state.miscCustomerLookupReducer.searchedCustomer);
  const selectedSearchCriteria = useSelector(
    (state) => state.miscCustomerLookupReducer.selectedSearchCriteria
  );
  const advanceSortingOrder = useSelector((state) => state.miscCustomerLookupReducer.advanceSortingOrder);
  const searchTerms = useSelector((state) => state.miscCustomerLookupReducer.searchTerms);
  const dispatch = useDispatch();

  const fetchMiscCustomerAddress = async () => {
    OrderEntryService.fetchMiscCustomerAddress(
      pageNumber,
      searchedCustomer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const data = response.data;
        const miscCustomers = data.content?.map((customer) => ({ ...customer, name: customer.name?.trim() }));
        dispatch(setMiscCustomerData(miscCustomers));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
    sortValue = value;
    sortFlag = val;
    fetchMiscCustomerAddress();
  };

  const handleOEMiscCustomerTab = (customer, event) => {
    dispatch(setMiscCustomerId(customer.customerAddressPK));
    onHide();
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchMiscCustomerAddress();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    selectedSearchCriteria,
    searchedCustomer,
    advanceSortingOrder,
    pageNumber,
    showAdvanceSort,
    searchTerms,
  ]);

  useEffect(() => {
    if (miscCustomerData != null) {
      setCustomerListingData(miscCustomerData);
    }
  }, [miscCustomerData, sortFlag, sortValue]);

  const renderMiscCutomerListingData = customerListingData.map((customer) => (
    <tr
      id="rowId"
      key={customer.customerAddressPK}
      onClick={(event) => {
        /**
         * Calling different handler functions based on where the Lookup Screen is called from
         */
        if (OEMiscCustomerTab) {
          handleOEMiscCustomerTab(customer, event);
        }
        // TODO: add common functionalities here
        // *************************************
        dispatch(setId(customer.customerAddressPK));
        dispatch(setChangeColor(true));
      }}
      onDoubleClick={(event) => {}}
      className={customer.customerAddressPK === id && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {customer.name} </td>
      <td className="f-w-600"> {customer.city} </td>
      <td className="f-w-600"> {customer.stateCode} </td>
    </tr>
  ));

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
                    onhandleNormalSort("name", !sortFlag);
                  }
              }}
            >
              {t("dealers.list.page.table.heading.name")}
              {showAdvanceSort !== true && sortFlag && sortValue === "name" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
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
                    onhandleNormalSort("city", !sortFlag);
                  }
              }}
            >
              {t("dealers.list.page.table.heading.city")}
              {showAdvanceSort !== true && sortFlag && sortValue === "city" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
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
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "stateCode" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        {!loading && customerListingData.length !== 0 && <tbody>{renderMiscCutomerListingData}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        customerListingData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
