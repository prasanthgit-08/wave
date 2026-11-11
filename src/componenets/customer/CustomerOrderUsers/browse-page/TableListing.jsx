import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  setChangeColor,
  setEditFormData,
  setListingData,
  setNormalSortFlag,
  setNormalSortValue,
  setSelectedId,
  setTotalElements,
  setTotalPages,
  setViewDetail,
  resetFields,
} from "../../../../redux/CustomerOrderUsersSlice";
import CustomerOrderUsersService from "../../../../services/CustomerOrderUsersService";
import CustomerService from "../../../../services/CustomerService";
import { setOrderEntryUsers } from "../../../../redux/CustomerMaintenanceSlice";
import LoadingIcon from "../../../common/LoadingIcon";

const TableListing = () => {
  const [loading, setLoading] = useState(true);
  const { customerId, customerPageNo } = useParams();
  const listingData = useSelector((state) => state.customerOrderUsers.listingData);
  const searchTerm = useSelector((state) => state.customerOrderUsers.searchTerm);
  const searchCriteria = useSelector((state) => state.customerOrderUsers.searchCriteria);
  const pageNumber = useSelector((state) => state.customerOrderUsers.pageNumber);
  const selectedId = useSelector((state) => state.customerOrderUsers.selectedId);
  const changeColor = useSelector((state) => state.customerOrderUsers.changeColor);
  let sortFlag = useSelector((state) => state.customerOrderUsers.normalSortFlag);
  let sortValue = useSelector((state) => state.customerOrderUsers.normalSortValue);
  const orderEntryUsers = useSelector((state) => state.customerMaintenanceReducer.orderEntryUsers);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
    sortValue = value;
    sortFlag = val;
  };

  const getOrderEntryUsers = () => {
    CustomerService.getCustomerById(customerId).then((response) => {
      const data = response.data;
      dispatch(setOrderEntryUsers(data.orderEntryUsers));
    });
  };

  const fetchTableData = () => {
    setLoading(true);
    CustomerOrderUsersService.getTableData(
      customerId,
      searchTerm,
      searchCriteria,
      pageNumber,
      sortValue,
      sortFlag,
      orderEntryUsers
    )
      .then((response) => {
        const { data } = response;
        setLoading(false);
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getOrderEntryUsers();
  }, []);

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [customerId, searchTerm, searchCriteria, pageNumber, sortValue, sortFlag, orderEntryUsers]);
  return (
    <div className="fixTableHead">
      {loading && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("name", !sortFlag);
              }}
            >
              {t("customerOrderUsers.user")}
              {sortFlag && sortValue === "name" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "name" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>

        <tbody>
          {loading
            ? null
            : listingData.length >= 1 &&
              listingData.map((data) => (
                <tr
                  id="rowId"
                  key={data.customerOrderUserPK}
                  onClick={() => dispatch(setChangeColor(false))}
                  onDoubleClick={() => {
                    dispatch(setViewDetail(true));
                    dispatch(setChangeColor(true));
                    dispatch(setSelectedId(data.customerOrderUserPK));
                    dispatch(resetFields());
                    setTimeout(() => {
                      navigate(
                        `/customer-order-users/${customerId}/${customerPageNo}/${data.customerOrderUserPK}/${pageNumber}`
                      );
                    }, 100);
                  }}
                  className={data.customerOrderUserPK === selectedId && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600"> {data.orderUserfk.name} </td>
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
