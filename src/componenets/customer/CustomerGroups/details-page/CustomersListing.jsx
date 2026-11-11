import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import LoadingText from "../../../common/LoadingText";
import {
  setAssignSortFlag,
  setAssignSortValue,
  setCustomerList,
  setCustomerTotalElements,
  setCustomerTotalPages,
} from "../../../../redux/CustomerGroupsSlice";
import CustomerGroupService from "../../../../services/CustomerGroupService";

const CustomersListing = () => {
  const params = useParams();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const customerPageNumber = useSelector((state) => state.customerGroups.customerPageNumber);
  const customerList = useSelector((state) => state.customerGroups.customerList);
  const assignSortFlag = useSelector((state) => state.customerGroups.assignSortFlag);
  const assignSortValue = useSelector((state) => state.customerGroups.assignSortValue);
  /**
   * Used  get all Customers assigned for the selected CustomerGroupFK
   **/
  const listAssignedUnitTypes = () => {
    setLoading(true);
    CustomerGroupService.getAssignedCustomers(id, customerPageNumber, assignSortFlag, assignSortValue)
      .then((response) => {
        dispatch(setCustomerList(response?.data?.content));
        dispatch(setCustomerTotalElements(response?.data?.totalElements));
        dispatch(setCustomerTotalPages(response?.data?.totalPages));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      listAssignedUnitTypes();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [id, customerPageNumber, assignSortValue, assignSortFlag]);

  return (
    <div className="fixTableHead">
      {!loading && (
        <table className="table table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                onClick={() => {
                  dispatch(setAssignSortValue("name"));
                  dispatch(setAssignSortFlag());
                }}
                className="f-w-600"
              >
                Customer
                {assignSortFlag && assignSortValue === "name" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!assignSortFlag && assignSortValue === "name" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              customerList?.length !== 0 &&
              customerList?.map((item) => (
                <tr>
                  <td className="f-w-600">{item.name}</td>
                </tr>
              ))}
            {loading && <LoadingText smallerFont />}
          </tbody>
        </table>
      )}
      {!loading && customerList?.length === 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}

      {loading && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersListing;
