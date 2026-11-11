import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  removeDeleteList,
  removeExceptList,
  removeFromSelectedList,
  setChangesInCustomerSelection,
  setLeftCustomerList,
  setLeftLoading,
  setLeftPageNumber,
  setLeftTotalElements,
  setLeftTotalPages,
  setNormalSortFlag,
  setNormalSortValue,
  setSelectedList,
  updateSaveList,
  updateSelectedList,
} from "../../../../redux/CustomerGroupsSlice";
import { useDispatch } from "react-redux";
import LoadingText from "../../../common/LoadingText";

import CustomerGroupService from "../../../../services/CustomerGroupService";

const LeftSideCustomerListing = () => {
  const dispatch = useDispatch();
  const [lastClick, setLastClick] = useState();
  const [loading, setLoading] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [numberOfElements, setNumberOfElements] = useState(null);
  const leftCustomerList = useSelector((state) => state.customerGroups.leftCustomerList);
  const leftPageNumber = useSelector((state) => state.customerGroups.leftPageNumber);
  const normalSortValue = useSelector((state) => state.customerGroups.normalSortValue);
  const normalSortFlag = useSelector((state) => state.customerGroups.normalSortFlag);

  const initialList = useSelector((state) => state.customerGroups.initialList);
  const selectedList = useSelector((state) => state.customerGroups.selectedList);
  const reverseFlag = useSelector((state) => state.customerGroups.reverseFlag);
  const deleteList = useSelector((state) => state.customerGroups.deleteList);
  const saveList = useSelector((state) => state.customerGroups.saveList);
  const exceptList = useSelector((state) => state.customerGroups.exceptList);
  const initialListFetched = useSelector((state) => state.customerGroups.initialListFetched);

  const handleClick = (event, customer) => {
    if (event.ctrlKey) {
      if (event.shiftKey) {
        const index1 = leftCustomerList?.indexOf(customer);
        const index2 = leftCustomerList?.indexOf(lastClick);

        if (index1 < index2) {
          dispatch(updateSelectedList(leftCustomerList?.slice(index1, index2 + 1)));
        } else {
          dispatch(updateSelectedList(leftCustomerList?.slice(index2, index1 + 1)));
        }
      } else if (selectedList?.includes(customer)) {
        dispatch(removeFromSelectedList(customer));
      } else {
        dispatch(updateSelectedList(customer));
      }
      setLastClick(customer);
    } else if (event.shiftKey) {
      dispatch(setSelectedList());
      const index1 = leftCustomerList?.indexOf(customer);
      const index2 = leftCustomerList?.indexOf(lastClick);

      if (index1 < index2) {
        dispatch(setSelectedList(leftCustomerList?.slice(index1, index2 + 1)));
      } else {
        dispatch(setSelectedList(leftCustomerList?.slice(index2, index1 + 1)));
      }
    } else {
      const isPresent = selectedList?.find((obj) => obj.customerPK === customer.customerPK);
      if (isPresent) {
        dispatch(removeFromSelectedList(customer));
      } else {
        dispatch(setSelectedList(customer));
      }
      setLastClick(customer);
    }
  };

  const handleDoubleClick = (customer) => {
    dispatch(setChangesInCustomerSelection(true));
    if (initialList?.includes(customer)) {
      dispatch(removeDeleteList(customer));
    } else {
      if (exceptList?.includes(customer)) {
        dispatch(removeExceptList(customer));
      } else {
        dispatch(updateSaveList(customer));
      }
    }
  };

  /**
   * Used for to get all Customers -list left side customers
   **/
  useEffect(() => {
    setLoading(true);
    dispatch(setLeftLoading(true));
    const debounceFunction = setTimeout(() => {
      if (initialListFetched) {
        CustomerGroupService.getLeftCustomers(
          reverseFlag,
          leftPageNumber,
          initialList,
          deleteList,
          saveList,
          exceptList,
          normalSortFlag,
          normalSortValue
        ).then((response) => {
          const { data } = response;
          dispatch(setLeftCustomerList(data?.content));
          dispatch(setLeftTotalElements(data?.totalElements));
          dispatch(setLeftTotalPages(data?.totalPages));
          dispatch(setLeftLoading(false));
          setLastClick(data?.content[0]);
          setIsFirstPage(data?.first);
          setIsLastPage(data?.last);
          setNumberOfElements(data?.numberOfElements);
          setLoading(false);
        });
      }
    }, 200);

    return () => {
      clearTimeout(debounceFunction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    reverseFlag,
    initialList,
    saveList,
    deleteList,
    leftPageNumber,
    exceptList,
    normalSortFlag,
    normalSortValue,
  ]);
  useEffect(() => {
    if (isLastPage && !isFirstPage && numberOfElements === 0) {
      dispatch(setLeftPageNumber(leftPageNumber - 1));
    }
  }, [isFirstPage, isLastPage, numberOfElements]);
  return (
    <div className="fixTableHead no-select" style={{ padding: 0, flex: 1 }}>
      {
        <table className="table table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                className="f-w-600"
                onClick={() => {
                  dispatch(setNormalSortFlag());
                  dispatch(setNormalSortValue("name"));
                }}
              >
                Customer
                {normalSortFlag && normalSortValue === "name" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!normalSortFlag && normalSortValue === "name" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              leftCustomerList?.length !== 0 &&
              leftCustomerList?.map((customer) => (
                <tr
                  id="rowId"
                  key={customer.customerPK}
                  onClick={(event) => {
                    handleClick(event, customer);
                  }}
                  onDoubleClick={() => {
                    handleDoubleClick(customer.customerPK);
                    dispatch(removeFromSelectedList(customer));
                  }}
                  className={
                    selectedList?.some((element) => element.customerPK === customer.customerPK)
                      ? "tableSelected"
                      : ""
                  }
                >
                  <td className="f-w-600">{customer.name}</td>
                </tr>
              ))}
            {loading && <LoadingText smallerFont />}
          </tbody>
        </table>
      }
      {!loading && leftCustomerList?.length === 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}
    </div>
  );
};

export default LeftSideCustomerListing;
