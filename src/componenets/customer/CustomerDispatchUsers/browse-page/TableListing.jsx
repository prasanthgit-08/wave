import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChangeColor,
  setViewDetail,
  setSelectedId,
  setListingData,
  setTotalElements,
  setTotalPages,
  setOrderDispatchUsers,
  setNormalSortValue,
  setNormalSortFlag,
  setUsePlant,
} from "../../../../redux/CustomerDispatchUsersSlice";
import { useNavigate, useParams } from "react-router-dom";
import CustomerDispatchUsersService from "../../../../services/CustomerDispatchUsersService";

const TableListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customerId, customerPageNo } = useParams();

  const [loading, setLoading] = useState(true);

  let sortFlag = useSelector((state) => state.customerDispatchUsers.normalSortFlag);
  let sortValue = useSelector((state) => state.customerDispatchUsers.normalSortValue);
  const listingData = useSelector((state) => state.customerDispatchUsers.listingData);
  const searchTerm = useSelector((state) => state.customerDispatchUsers.searchTerm);
  const searchCriteria = useSelector((state) => state.customerDispatchUsers.searchCriteria);
  const pageNumber = useSelector((state) => state.customerDispatchUsers.pageNumber);
  const orderDispatchUsers = useSelector((state) => state.customerDispatchUsers.orderDispatchUsers);
  const selectedId = useSelector((state) => state.customerDispatchUsers.selectedId);
  const changeColor = useSelector((state) => state.customerDispatchUsers.changeColor);
  const usePlant = useSelector((state) => state.customerDispatchUsers.usePlant);
  const customerDispatcUserValid = useSelector(
    (state) => state.customerDispatchUsers.customerDispatcUserValid
  );

  const getOrderEntryUsers = () => {
    CustomerDispatchUsersService.getCustomerById(customerId).then((response) => {
      const data = response.data;
      dispatch(setOrderDispatchUsers(data.dispatchUsers));
      dispatch(setUsePlant(data.usePlants));
    });
  };

  const fetchTableData = () => {
    setLoading(true);
    CustomerDispatchUsersService.getTableData(
      customerId,
      searchTerm,
      searchCriteria,
      pageNumber,
      sortValue,
      sortFlag,
      orderDispatchUsers
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
    if (customerDispatcUserValid === false) {
      navigate(`/add-customer/${customerId}/${customerPageNo}`);
    }
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
  }, [customerId, searchTerm, searchCriteria, pageNumber, sortValue, sortFlag, orderDispatchUsers]);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("name", !sortFlag);
              }}
            >
              User
              {sortFlag && sortValue === "name" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "name" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>

        <tbody>
          {loading
            ? ""
            : listingData.length >= 0 &&
              listingData.map((data) => (
                <tr
                  id="rowId"
                  key={data.customerDispatchUserPK}
                  onClick={() => dispatch(setChangeColor(false))}
                  onDoubleClick={() => {
                    dispatch(setViewDetail(true));
                    dispatch(setChangeColor(true));
                    dispatch(setSelectedId(data.customerDispatchUserPK));
                    setTimeout(() => {
                      navigate(
                        `/customer-dispatch-users/${customerId}/${customerPageNo}/${data.customerDispatchUserPK}/${pageNumber}`
                      );
                    }, 100);
                  }}
                  className={data.customerDispatchUserPK === selectedId && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600"> {data.dispatchUserFK.name} </td>
                </tr>
              ))}
        </tbody>
      </table>

      {loading ? (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      ) : (
        listingData?.length === 0 && (
          <h2 className="empty-list" align="center">
            No Records Available
          </h2>
        )
      )}
    </div>
  );
};

export default TableListing;
