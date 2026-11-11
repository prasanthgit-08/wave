import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PlantToYardTransferService from "../../../../services/PlantToYardTransferService";
import {
  setCustomerChangeColor,
  setCustomerData,
  setCustomerSortFieldName,
  setCustomerSortValue,
  setCustomerTotalElements,
  setCustomerTotalPages,
  setCustomerLoader,
  setViewDetail,
  setCustomerFK,
  setPlantToYardTransferCustomer,
  setCustomerId,
} from "../../../../redux/PlantToYardTransfersSlice";
import toast from "react-hot-toast";
import { t } from "i18next";

export const PlantToYardTransferCustomerListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedCustomerStatus = "Complete";
  const usePlants = 1;

  const {
    customerPageNumber,
    customerData,
    customerSearchTerm,
    customerSearchCriteria,
    customerType,
    customerAdvancedSearchObject,
    customerAdvancedSortOrder,
    customerChangeColor,
    customerId,
    customerLoader,
    showCustomerAdvancedSort,
  } = useSelector((state) => state.plantToYardTransfersReducer);

  let { customerSortFieldName, customerSortValue } = useSelector(
    (state) => state.plantToYardTransfersReducer
  );

  const onhandleNormalSort = (fieldName) => {
    if (!showCustomerAdvancedSort) {
      dispatch(setCustomerSortFieldName(fieldName));
      dispatch(setCustomerSortValue(!customerSortValue));
      customerSortFieldName = fieldName;
      customerSortValue = !customerSortValue;
    }

    // if(customerSortFieldName === fieldName){             // for future reference
    //   customerSortValue = !customerSortValue
    //   dispatch(setCustomerSortValue(customerSortValue))
    // }else{
    //   customerSortFieldName = fieldName
    //   customerSortValue = true
    //   dispatch(setCustomerSortFieldName(fieldName))
    //   dispatch(setCustomerSortValue(true))
    // }
  };

  const fetchCustomerData = () => {
    PlantToYardTransferService.getCustomers(
      customerType,
      customerPageNumber,
      customerSearchTerm,
      customerSearchCriteria,
      customerAdvancedSearchObject,
      customerSortValue,
      customerSortFieldName,
      customerAdvancedSortOrder,
      selectedCustomerStatus,
      usePlants
    )
      .then((response) => {
        const data = response.data;
        dispatch(setCustomerData(data.content));
        dispatch(setCustomerLoader(false));
        dispatch(setCustomerTotalElements(data.totalElements));
        dispatch(setCustomerTotalPages(data.totalPages));
      })
      .catch((error) => {
        console.error(error.response.data.errorMsg || "Error while fetching customer data");
        toast.error(error.response.data.errorMsg || "Error while fetching customer data");
      });
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      dispatch(setCustomerLoader(true));
      fetchCustomerData();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    customerSearchCriteria,
    customerSearchTerm,
    customerSortFieldName,
    customerSortValue,
    customerAdvancedSearchObject,
    customerPageNumber,
    customerAdvancedSortOrder,
    customerType,
  ]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="col-3 font-14"
              onClick={() => {
                onhandleNormalSort("description");
              }}
            >
              {t("PlantToYardShuttle.customer.listing.page.table.heading.description")}
              {customerSortFieldName === "description" && customerSortValue && (
                <i className="fa fa-sort-alpha-asc font-18 m-l-10" aria-hidden="true"></i>
              )}
              {customerSortFieldName === "description" && !customerSortValue && (
                <i className="fa fa-sort-alpha-desc font-18 m-l-10" aria-hidden="true"></i>
              )}
            </th>

            <th
              className="col-3 font-14"
              onClick={() => {
                onhandleNormalSort("name");
              }}
            >
              {t("PlantToYardShuttle.customer.listing.page.table.heading.name")}
              {customerSortFieldName === "name" && customerSortValue && (
                <i className="fa fa-sort-alpha-asc font-18 m-l-10" aria-hidden="true"></i>
              )}
              {customerSortFieldName === "name" && !customerSortValue && (
                <i className="fa fa-sort-alpha-desc font-18 m-l-10" aria-hidden="true"></i>
              )}
            </th>
            <th
              className="col-2 font-14"
              onClick={() => {
                onhandleNormalSort("dba");
              }}
            >
              {t("PlantToYardShuttle.customer.listing.page.table.heading.dba")}
              {customerSortFieldName === "dba" && customerSortValue && (
                <i className="fa fa-sort-alpha-asc font-18 m-l-10" aria-hidden="true"></i>
              )}
              {customerSortFieldName === "dba" && !customerSortValue && (
                <i className="fa fa-sort-alpha-desc font-18 m-l-10" aria-hidden="true"></i>
              )}
            </th>
            <th
              className="col-2 font-14"
              onClick={() => {
                onhandleNormalSort("city");
              }}
            >
              {t("PlantToYardShuttle.customer.listing.page.table.heading.city")}
              {customerSortFieldName === "city" && customerSortValue && (
                <i className="fa fa-sort-alpha-asc font-18 m-l-10" aria-hidden="true"></i>
              )}
              {customerSortFieldName === "city" && !customerSortValue && (
                <i className="fa fa-sort-alpha-desc font-18 m-l-10" aria-hidden="true"></i>
              )}
            </th>
            <th
              className="col-1 font-14"
              onClick={() => {
                onhandleNormalSort("stateCode");
              }}
            >
              {t("PlantToYardShuttle.customer.listing.page.table.heading.state")}
              {customerSortFieldName === "stateCode" && customerSortValue && (
                <i className="fa fa-sort-alpha-asc font-18 m-l-10" aria-hidden="true"></i>
              )}
              {customerSortFieldName === "stateCode" && !customerSortValue && (
                <i className="fa fa-sort-alpha-desc font-18 m-l-10" aria-hidden="true"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {customerData !== [] &&
            customerData.length > 0 &&
            customerData.map((customer) => (
              <tr
                id="rowId"
                key={customer.customerPK}
                onClick={(e) => dispatch(setCustomerChangeColor(false))}
                onDoubleClick={(e) => {
                  dispatch(setCustomerChangeColor(true));
                  dispatch(setViewDetail(false));
                  dispatch(setCustomerFK(customer.customerPK));
                  dispatch(setCustomerId(customer.customerPK));
                  dispatch(setPlantToYardTransferCustomer(customer.name));
                  setTimeout(() => {
                    navigate("/plant-to-yard-transfer/" + customer.customerPK);
                  }, 100);
                }}
                className={
                  customer.customerPK === Number(customerId) && customerChangeColor ? "tableSelected" : ""
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
      {!customerLoader && customerData.length === 0 && (
        <h2 className="empty-list" align="center">
          {t("empty.list.message")}
        </h2>
      )}
    </div>
  );
};
