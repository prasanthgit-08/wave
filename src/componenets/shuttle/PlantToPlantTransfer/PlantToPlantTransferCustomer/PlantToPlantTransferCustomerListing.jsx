import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PlantToPlantTransferService from "../../../../services/PlantToPlantTransferService";
import {
  setCustomerChangeColor,
  setCustomerData,
  setCustomerId,
  setCustomerSortFieldName,
  setCustomerSortValue,
  setCustomerTotalElements,
  setCustomerTotalPages,
  setCustomerLoader,
  setViewDetail,
} from "../../../../redux/PlantToPlantTransferSlice";
import toast from "react-hot-toast";
import { t } from "i18next";
import LoadingIcon from "../../../common/LoadingIcon";

function PlantToPlantTransferCustomerListing() {
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
  } = useSelector((state) => state.plantToPlantTransferReducer);

  let { customerSortFieldName, customerSortValue } = useSelector(
    (state) => state.plantToPlantTransferReducer
  );

  const onhandleNormalSort = (fieldName) => {
    if (!showCustomerAdvancedSort) {
      dispatch(setCustomerSortFieldName(fieldName));
      dispatch(setCustomerSortValue(!customerSortValue));
      customerSortFieldName = fieldName;
      customerSortValue = !customerSortValue;
    }
  };

  // fetching the customer data for listing
  const fetchCustomerData = () => {
    PlantToPlantTransferService.getCustomers(
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
      {customerLoader && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600 col-3 font-12"
              onClick={() => {
                onhandleNormalSort("description");
              }}
            >
              {t("plantToPlantTransfers.customer.listing.page.table.heading.description")}
              {customerSortFieldName === "description" && customerSortValue && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {customerSortFieldName === "description" && !customerSortValue && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10" aria-hidden="true"></i>
              )}
            </th>

            <th
              className="f-w-600 col-3 font-12"
              onClick={() => {
                onhandleNormalSort("name");
              }}
            >
              {t("plantToPlantTransfers.customer.listing.page.table.heading.name")}
              {customerSortFieldName === "name" && customerSortValue && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {customerSortFieldName === "name" && !customerSortValue && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10" aria-hidden="true"></i>
              )}
            </th>
            <th
              className="f-w-600 col-2 font-12"
              onClick={() => {
                onhandleNormalSort("dba");
              }}
            >
              {t("plantToPlantTransfers.customer.listing.page.table.heading.dba")}
              {customerSortFieldName === "dba" && customerSortValue && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {customerSortFieldName === "dba" && !customerSortValue && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10" aria-hidden="true"></i>
              )}
            </th>
            <th
              className="f-w-600 col-2 font-12"
              onClick={() => {
                onhandleNormalSort("city");
              }}
            >
              {t("plantToPlantTransfers.customer.listing.page.table.heading.city")}
              {customerSortFieldName === "city" && customerSortValue && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {customerSortFieldName === "city" && !customerSortValue && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10" aria-hidden="true"></i>
              )}
            </th>
            <th
              className="f-w-600 col-1 font-12"
              onClick={() => {
                onhandleNormalSort("stateCode");
              }}
            >
              {t("plantToPlantTransfers.customer.listing.page.table.heading.state")}
              {customerSortFieldName === "stateCode" && customerSortValue && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {customerSortFieldName === "stateCode" && !customerSortValue && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10" aria-hidden="true"></i>
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
                  dispatch(setCustomerId(customer.customerPK));
                  setTimeout(() => {
                    navigate("/plant-to-plant-transfer-customer/" + customer.customerPK + "/add");
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
}

export default PlantToPlantTransferCustomerListing;
