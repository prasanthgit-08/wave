import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  setChangeColor,
  setCustomerOrdersColumnList,
  setCustomerOrdersData,
  setEditFormData,
  setId,
  setLoading,
  setSortType,
  setSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../redux/CustomerOrdersSlice";
import CustomerOrdersService from "../../../../services/CustomerOrdersService";
import LoadingIcon from "../../../common/LoadingIcon";
function CustomerOrderListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adSort] = useState(false);
  const pageNumber = useSelector((state) => state.customerOrdersReducer.pageNumber);
  const totalPages = useSelector((state) => state.customerOrdersReducer.totalPages);
  const totalElements = useSelector((state) => state.customerOrdersReducer.totalElements);
  const customerOrdersData = useSelector((state) => state.customerOrdersReducer.customerOrdersData);
  const searchTerm = useSelector((state) => state.customerOrdersReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.customerOrdersReducer.searchCriteria);
  const id = useSelector((state) => state.customerOrdersReducer.id);
  const changeColor = useSelector((state) => state.customerOrdersReducer.changeColor);
  let sortValue = useSelector((state) => state.customerOrdersReducer.sortValue);
  let sortType = useSelector((state) => state.customerOrdersReducer.sortType);
  const loading = useSelector((state) => state.customerOrdersReducer.loading);
  /******
   * Normal Sort
   *****/
  const onhandleNormalSort = (value, val) => {
    dispatch(setSortValue(value));
    dispatch(setSortType(val));
    sortValue = value;
    sortType = val;
  };

  const fetchData = () => {
    dispatch(setLoading(true));
    CustomerOrdersService.getAllCustomerOrders(searchCriteria, searchTerm, pageNumber, sortValue, sortType)
      .then((response) => {
        const data = response?.data;
        dispatch(setLoading(false));
        dispatch(setCustomerOrdersData(data?.customerOrders));
        dispatch(setTotalElements(data?.pagination?.[0]?.TotalElements));
        dispatch(setTotalPages(data?.pagination?.[0]?.TotalPages));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  //API call to fetch the List of Customer Orders as pages
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchData();
    }, 100);
    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchCriteria, searchTerm, pageNumber, sortValue, sortType]);
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
                  onhandleNormalSort("description", !sortType);
                }
              }}
            >
              Description
              {sortType && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("customer", !sortType);
                }
              }}
            >
              Customer
              {sortType && sortValue === "customer" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "customer" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        {
          <tbody>
            {loading
              ? null
              : customerOrdersData?.map((code) => (
                  <tr
                    id="rowId"
                    key={code.customerOrderPK}
                    onClick={(e) => dispatch(setChangeColor(false))}
                    onDoubleClick={(event) => {
                      dispatch(setEditFormData(null));
                      dispatch(setCustomerOrdersColumnList({ actionType: "clear" }));
                      dispatch(setId(code.CustomerOrderPK));
                      dispatch(setChangeColor(true));
                      dispatch(setViewDetail(true));
                      setTimeout(() => {
                        navigate(`/customer-orders/${code.CustomerOrderPK}/${pageNumber}`);
                      }, 100);
                    }}
                    className={code.CustomerOrderPK === id && changeColor ? "tableSelected" : ""}
                  >
                    <td className="f-w-600">{code.Description}</td>
                    <td className="f-w-600">{code.Name}</td>
                  </tr>
                ))}
          </tbody>
        }
      </table>
      {loading
        ? ""
        : customerOrdersData?.length === 0 && (
            <h2 className="empty-list" align="center">
              {t("AlternateContact.list.empty.message")}
            </h2>
          )}
    </div>
  );
}
export default CustomerOrderListing;
