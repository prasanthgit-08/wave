/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import SupplementalRatesService from "../../../../services/SupplementalRatesService";
import {
  setChangeColor,
  setEditFormData,
  setNormalSortFlag,
  setNormalSortValue,
  setPickupCustomerId,
  setPickupCustomerInput,
  setSelectId,
  setSupplementalRatesData,
  setTotalElements,
  setTotalPages,
  setViewDetail,
  setListingLoading,
} from "../../../../redux/SupplementalRatesSlice";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../../../common/LoadingIcon";

export const SupplementalListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adSort] = useState(false);

  const loading = useSelector((state) => state.supplementalRatesReducer.listingLoading);

  const supplementalRatesData = useSelector((state) => state.supplementalRatesReducer.supplementalRatesData);
  const pageNumber = useSelector((state) => state.supplementalRatesReducer.pageNumber);
  const searchTerms = useSelector((state) => state.supplementalRatesReducer.searchTerms);
  const searchCriteria = useSelector((state) => state.supplementalRatesReducer.searchCriteria);
  let sortFlag = useSelector((state) => state.supplementalRatesReducer.normalSortFlag);
  let sortValue = useSelector((state) => state.supplementalRatesReducer.normalSortValue);
  const advanceSortingOrder = useSelector((state) => state.supplementalRatesReducer.advanceSortingOrder);

  const changeColor = useSelector((state) => state.supplementalRatesReducer.changeColor);
  const searchDescription = useSelector((state) => state.supplementalRatesReducer.searchDescription);

  const searchCustomer = useSelector((state) => state.supplementalRatesReducer.searchCustomer);

  const searchPlant = useSelector((state) => state.supplementalRatesReducer.searchPlant);

  const searchPlantGroup = useSelector((state) => state.supplementalRatesReducer.searchPlantGroup);

  const searchCustomerGroup = useSelector((state) => state.supplementalRatesReducer.searchCustomerGroup);
  const selectId = useSelector((state) => state.supplementalRatesReducer.selectId);

  const fetchSupplementalRates = async () => {
    dispatch(setListingLoading(true));
    SupplementalRatesService.getSupplementalRatesRecords(
      searchCriteria,
      searchTerms,
      pageNumber,
      sortValue,
      sortFlag,
      searchDescription,
      searchCustomer,
      searchPlant,
      searchPlantGroup,
      searchCustomerGroup
    )
      .then((response) => {
        const data = response?.data;
        dispatch(setSupplementalRatesData(data?.content));
        dispatch(setTotalElements(data?.totalElements));
        dispatch(setTotalPages(data?.totalPages));
      })
      .catch((error) => {
        dispatch(setListingLoading(false));
      })
      .finally(() => {
        dispatch(setListingLoading(false));
      });
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));
  };
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchSupplementalRates();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    searchCriteria,
    sortValue,
    sortFlag,
    advanceSortingOrder,
    pageNumber,
    searchTerms,
    searchDescription,
    searchCustomer,
    searchPlant,
    searchPlantGroup,
    searchCustomerGroup,
  ]);

  return (
    <div className="fixTableHead">
      {loading && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("description", !sortFlag);
                }
              }}
            >
              Description
              {sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("customername", !sortFlag);
                }
              }}
            >
              Customer
              {sortFlag && sortValue === "customername" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "customername" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("plantName", !sortFlag);
                }
              }}
            >
              Plant
              {sortFlag && sortValue === "plantName" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "plantName" && <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>

            <th
              className="f-w-600"
              style={{ minWidth: "100px" }}
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("customerPlantGroupDesc", !sortFlag);
                }
              }}
            >
              {" "}
              Plant Group
              {sortFlag && sortValue === "customerPlantGroupDesc" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "customerPlantGroupDesc" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              style={{ minWidth: "100px" }}
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("customerGroupDesc", !sortFlag);
                }
              }}
            >
              {" "}
              Customer Group
              {sortFlag && sortValue === "customerGroupDesc" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "customerGroupDesc" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {loading
            ? null
            : supplementalRatesData?.map((supplemental) => (
                <tr
                  id="rowId"
                  key={supplemental.supplementalRatePK}
                  onClick={() => dispatch(setChangeColor(true))}
                  onDoubleClick={() => {
                    dispatch(setSelectId(supplemental.supplementalRatePK));
                    dispatch(setViewDetail(true));
                    dispatch(setChangeColor(true));
                    dispatch(setEditFormData(undefined));
                    setTimeout(() => {
                      navigate(`/supplemental-rates-add/${supplemental.supplementalRatePK}/${pageNumber}`);
                    }, 100);
                  }}
                  className={
                    supplemental.supplementalRatePK === selectId && changeColor ? "tableSelected" : ""
                  }
                >
                  <td className="f-w-600"> {supplemental.description} </td>
                  <td className="f-w-600"> {supplemental.customerName} </td>
                  <td className="f-w-600"> {supplemental.plantName} </td>
                  <td className="f-w-600"> {supplemental.plantGroupDescription} </td>
                  <td className="f-w-600"> {supplemental.customerGroupDescription} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {loading
        ? ""
        : supplementalRatesData?.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
    </div>
  );
};
