import React, { useState, useEffect } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setChangeColor,
  setDuplicateCustomerError,
  setEditFormData,
  setListingData,
  setNormalSortFlag,
  setNormalSortValue,
  setPickupCustomerFK,
  setPickupCustomerPlantFK,
  setSelectedDPUId,
  setSelectedId,
  setTotalElements,
  setTotalPages,
  setViewDetail,
  resetFields,
} from "../../../../redux/CustomerDPURestrictionsSlice";
import CustomerDPURestrictionsService from "../../../../services/CustomerDPURestrictionsService";
import LoadingIcon from "../../../common/LoadingIcon";

const TableListing = ({ customerURL }) => {
  const listingData = useSelector((state) => state.customerDPURestrictions.listingData);
  const pageNumber = useSelector((state) => state.customerDPURestrictions.pageNumber);
  const selectedDPUId = useSelector((state) => state.customerDPURestrictions.selectedDPUId);
  const changeColor = useSelector((state) => state.customerDPURestrictions.changeColor);
  const searchTerm = useSelector((state) => state.customerDPURestrictions.searchTerm);
  const searchCriteria = useSelector((state) => state.customerDPURestrictions.searchCriteria);
  const viewDetail = useSelector((state) => state.customerDPURestrictions.viewDetail);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pickupCustomerFK = useSelector((state) => state.customerDPURestrictions.pickupCustomerFK);
  const pickupCustomerPlantFK = useSelector((state) => state.customerDPURestrictions.pickupCustomerPlantFK);
  const [dPURestrictionListingData, setDPURestrictionListingData] = useState([]);
  const { customerId, customerPageNo, recordId } = useParams();
  const [loading, setLoading] = useState(true);
  let sortFlag = useSelector((state) => state.customerDPURestrictions.normalSortFlag);

  let sortValue = useSelector((state) => state.customerDPURestrictions.normalSortValue);
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;
  };

  const fetchTableData = () => {
    setLoading(true);
    CustomerDPURestrictionsService.getTableData(
      customerId,
      searchTerm,
      searchCriteria,
      pageNumber,
      sortValue,
      sortFlag,
      setViewDetail
    )
      .then((response) => {
        const { data } = response;
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerm, searchCriteria, pageNumber, sortValue, sortFlag]);
  return (
    <div className="fixTableHead">
      {loading && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr>
            <th
              className="f-w-600 col-6"
              onClick={() => {
                onhandleNormalSort("customer", !sortFlag);
              }}
            >
              {t("customerDPU.customer")}
              {sortFlag && sortValue === "customer" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "customer" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600 col-6"
              onClick={() => {
                onhandleNormalSort("plant", !sortFlag);
              }}
            >
              {t("customerDPU.plant")}
              {sortFlag && sortValue === "plant" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "plant" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>

        <tbody>
          {loading
            ? ""
            : listingData.length >= 1 &&
              listingData.map((data) => (
                <tr
                  id="rowId"
                  key={data.customerDPURestrictionPK}
                  onClick={() => {
                    dispatch(setChangeColor(false));
                  }}
                  onDoubleClick={() => {
                    dispatch(setSelectedDPUId(data.customerDPURestrictionPK));
                    dispatch(setDuplicateCustomerError(false));
                    dispatch(setChangeColor(true));
                    dispatch(setViewDetail(true));
                    dispatch(resetFields());
                    setTimeout(() => {
                      navigate(
                        `/customer-dpu-restrictions/${customerURL}/${data.customerDPURestrictionPK}/${pageNumber}`
                      );
                    }, 100);
                  }}

                  className={
                    data.customerDPURestrictionPK === selectedDPUId && changeColor ? "tableSelected" : ""
                  }
                >
                  {/* hide customer if plant exists */}
                  <td className="f-w-600">{data.pickupCustomerFK ? data.pickupCustomerFK.name : ""}</td>
                  <td className="f-w-600">
                    {data.pickupcustomerplantFK ? data.pickupcustomerplantFK.name : ""}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      {loading
        ? ""
        : listingData.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
    </div>
  );
};

export default TableListing;
