import React, { useState } from "react";
import { useEffect } from "react";
import { t } from "i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import CustomerPlantMaintenanceService from "../../../../services/CustomerPlantMaintenanceService";
import {
  setPlantData,
  setViewDetail,
  setPlantLoader,
  setplantYtdunit,
  setEditPlantData,
} from "../../../../redux/CustomerPlantMaintenanceSlice";
import {
  setId,
  setChangeColor,
  setPlantSortValue,
  setPlantSortFlag,
} from "../../../../redux/CustomerPlantSearchFilterSlice";

import { setTotalElements, setTotalPages } from "../../../../redux/CustomerPlantSearchFilterSlice";
import LoadingText from "../../../common/LoadingText";
import useDebouncer from "../../../../hooks/useDebouncer";

const CustomerPlantList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const customerId = params.customerId;
  const [plantListData, setPlantListData] = useState([]);
  const plantData = useSelector((state) => state.customerPlantmaintanceReducer.plantData);
  const plantLoader = useSelector((state) => state.customerPlantmaintanceReducer.plantLoader);
  const viewDetail = useSelector((state) => state.customerPlantmaintanceReducer.viewDetail);

  const changeColor = useSelector((state) => state.customerPlantSearchFilterReducer.changeColor);

  const id = useSelector((state) => state.customerPlantSearchFilterReducer.id);

  const selectedStatus = useSelector((state) => state.customerPlantSearchFilterReducer.selectedStatus);

  const pageNumber = useSelector((state) => state.customerPlantSearchFilterReducer.pageNumber);

  const searchedCustomerPlant = useSelector(
    (state) => state.customerPlantSearchFilterReducer.searchedCustomerPlant
  );

  const selectedSearchCriteria = useSelector(
    (state) => state.customerPlantSearchFilterReducer.selectedSearchCriteria
  );

  const searchTerms = useSelector((state) => state.customerPlantSearchFilterReducer.searchTerms);

  const selectedCustomerPlantStatus = useSelector(
    (state) => state.customerPlantSearchFilterReducer.selectedCustomerPlantStatus
  );
  let plantSortFlag = useSelector((state) => state.customerPlantSearchFilterReducer.plantSortFlag);
  let plantSortValue = useSelector((state) => state.customerPlantSearchFilterReducer.plantSortValue);

  const onhandleNormalSort = (value, val) => {
    dispatch(setPlantSortValue(value));
    dispatch(setPlantSortFlag(val));
    plantSortValue = value;
    plantSortFlag = val;
  };

  useEffect(() => {
    if (plantData != null) {
      setPlantListData(plantData);
    }
  }, [plantData, viewDetail, plantSortFlag, plantSortValue]);

  const fetchPlant = async () => {
    dispatch(setPlantLoader(true));
    CustomerPlantMaintenanceService.getAllPlantsByCustomer(
      selectedCustomerPlantStatus,
      selectedStatus,
      selectedSearchCriteria,
      searchedCustomerPlant,
      pageNumber,
      searchTerms,
      customerId,
      null,
      plantSortValue,
      plantSortFlag
    )
      .then((response) => {
        const data = response.data;
        dispatch(setPlantData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setPlantLoader(false));
      })
      .catch((err) => {
        dispatch(setPlantLoader(false));
      });
  };
  const debounceFetchPlant = useDebouncer(fetchPlant, 100);

  useEffect(() => {
    dispatch(setPlantLoader(true));
    debounceFetchPlant();
  }, [
    selectedCustomerPlantStatus,
    selectedStatus,
    selectedSearchCriteria,
    searchedCustomerPlant,
    pageNumber,
    searchTerms,
    customerId,
    plantSortFlag,
    plantSortValue,
  ]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("name", !plantSortFlag);
              }}
            >
              {t("customer.plant.list.page.table.heading.name")}

              {plantSortFlag && plantSortValue === "name" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!plantSortFlag && plantSortValue === "name" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("brand", !plantSortFlag);
              }}
            >
              {t("customer.plant.list.page.table.heading.brandname")}
              {plantSortFlag && plantSortValue === "brand" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!plantSortFlag && plantSortValue === "brand" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("productLine", !plantSortFlag);
              }}
            >
              {t("customer.plant.list.page.table.heading.productline")}
              {plantSortFlag && plantSortValue === "productLine" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!plantSortFlag && plantSortValue === "productLine" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {plantLoader
            ? ""
            : plantListData.map((plant) => (
                <tr
                  id="rowId"
                  key={
                    plant.customerPlantPK != null ? plant.customerPlantPK : plant.incompleteCustomerPlantPK
                  }
                  onClick={(e) => dispatch(setChangeColor(false))}
                  onDoubleClick={(event) => {
                    dispatch(setViewDetail(true));
                    dispatch(setEditPlantData(null));
                    dispatch(setChangeColor(true));
                    dispatch(
                      setId(
                        plant.customerPlantPK != null
                          ? plant.customerPlantPK
                          : plant.incompleteCustomerPlantPK
                      )
                    );
                    setTimeout(() => {
                      navigate(
                        (plant.active === true || plant.active === false) &&
                          selectedCustomerPlantStatus === "Complete"
                          ? "/add-customer-plant/" +
                              customerId +
                              "/" +
                              pageNumber +
                              "/" +
                              plant.customerPlantPK
                          : "/add-incomplete-customer-plant/" +
                              +customerId +
                              "/" +
                              pageNumber +
                              "/" +
                              plant.incompleteCustomerPlantPK
                      );
                    }, 100);
                  }}
                  className={
                    plant.customerPlantPK != null
                      ? plant.customerPlantPK === id
                        ? "tableSelected"
                        : ""
                      : plant.incompleteCustomerPlantPK === id
                        ? "tableSelected"
                        : ""
                  }
                >
                  <td className="f-w-600"> {plant.name} </td>
                  <td className="f-w-600"> {plant.brand} </td>
                  <td className="f-w-600"> {plant.productLine} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {plantLoader
        ? ""
        : plantListData?.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
      {plantLoader && <LoadingText />}
    </div>
  );
};
export default CustomerPlantList;
