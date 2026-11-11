import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  removeFromUnSelectedList,
  removeSaveList,
  setAssignedCustomerList,
  setAssignedPageNumber,
  setAssignedTotalElements,
  setAssignedTotalPages,
  setChangesInCustomerSelection,
  setInitialListFetched,
  setRightSortFlag,
  setRightSortValue,
  setUnSelectedList,
  setinitialList,
  updateDeleteList,
  updateExceptList,
  updateUnSelectedList,
  setRightLoading,
} from "../../../../redux/CustomerGroupsSlice";
import LoadingText from "../../../common/LoadingText";
import CustomerGroupService from "../../../../services/CustomerGroupService";

const RightSideCustomerListing = () => {
  const dispatch = useDispatch();
  const [lastClick, setLastClick] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [numberOfElements, setNumberOfElements] = useState(null);

  const assignedCustomerList = useSelector((state) => state.customerGroups.assignedCustomerList);
  const assignedPageNumber = useSelector((state) => state.customerGroups.assignedPageNumber);
  const initialList = useSelector((state) => state.customerGroups.initialList);
  const selectedList = useSelector((state) => state.customerGroups.selectedList);
  const reverseFlag = useSelector((state) => state.customerGroups.reverseFlag);
  const deleteList = useSelector((state) => state.customerGroups.deleteList);
  const saveList = useSelector((state) => state.customerGroups.saveList);
  const exceptList = useSelector((state) => state.customerGroups.exceptList);
  const unSelectedList = useSelector((state) => state.customerGroups.unSelectedList);
  const rightSortValue = useSelector((state) => state.customerGroups.rightSortValue);
  const rightSortFlag = useSelector((state) => state.customerGroups.rightSortFlag);
  const initialListFetched = useSelector((state) => state.customerGroups.initialListFetched);
  const handleClick = (event, customer) => {
    if (event.ctrlKey && event.shiftKey) {
      event.preventDefault();
      const index1 = assignedCustomerList?.indexOf(customer);
      const index2 = assignedCustomerList?.indexOf(lastClick);
      var array;
      if (index1 < index2) {
        array = assignedCustomerList?.slice(index1, index2 + 1);
      } else {
        array = assignedCustomerList?.slice(index2, index1 + 1);
      }
      array?.map((obj) => {
        if (!unSelectedList?.includes(obj)) {
          dispatch(assignedCustomerList(obj));
        }
      });
    } else if (event.ctrlKey) {
      if (unSelectedList?.includes(customer)) {
        dispatch(removeFromUnSelectedList(customer));
      } else {
        dispatch(updateUnSelectedList(customer));
      }
      setLastClick(customer);
    } else if (event.shiftKey) {
      event.preventDefault();
      const index1 = assignedCustomerList?.indexOf(customer);
      const index2 = assignedCustomerList?.indexOf(lastClick);
      var array;
      if (index1 < index2) {
        array = assignedCustomerList?.slice(index1, index2 + 1);
      } else {
        array = assignedCustomerList?.slice(index2, index1 + 1);
      }
      array?.map((obj) => {
        if (!unSelectedList?.includes(obj)) {
          dispatch(updateUnSelectedList(obj));
        }
      });
    } else {
      const isPresent = unSelectedList?.find((obj) => obj.customerPK === customer.customerPK);
      if (isPresent) {
        dispatch(removeFromUnSelectedList(customer));
      } else {
        dispatch(setUnSelectedList(customer));
      }
      setLastClick(customer);
    }
  };

  const handleDoubleClick = (customer) => {
    dispatch(setChangesInCustomerSelection(true));
    if (reverseFlag) {
      dispatch(updateExceptList(customer));
    }

    if (initialList?.includes(customer)) {
      dispatch(updateDeleteList(customer));
    } else if (saveList?.includes(customer)) {
      dispatch(removeSaveList(customer));
    } else {
      dispatch(updateExceptList(customer));
    }
  };

  /**
   * Used  to get all Customers assigned for the selected CustomerGroupFK -list right side customers
   **/
  useEffect(() => {
    setLoading(true);
    dispatch(setRightLoading(true));
    const debounceFunction = setTimeout(() => {
      if (initialListFetched) {
        CustomerGroupService.getRightCustomers(
          reverseFlag,
          assignedPageNumber,
          initialList,
          deleteList,
          saveList,
          exceptList,
          rightSortFlag,
          rightSortValue
        ).then((response) => {
          const { data } = response;

          dispatch(setAssignedCustomerList(data?.content));
          dispatch(setAssignedTotalElements(data?.totalElements));
          dispatch(setAssignedTotalPages(data?.totalPages));
          dispatch(setRightLoading(false));
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
    initialList,
    reverseFlag,
    saveList,
    deleteList,
    assignedPageNumber,
    exceptList,
    rightSortFlag,
    rightSortValue,
  ]);

  /**
   * Used  to Fetch initial  Customer list for the selected CustomerGroupFK
   */
  const getInitialList = () => {
    CustomerGroupService.getInitialList(id).then((response) => {
      dispatch(setinitialList(response?.data));
      dispatch(setInitialListFetched(true));
    });
  };
  useEffect(() => {
    dispatch(setinitialList());
    getInitialList();
  }, []);
  useEffect(() => {
    if (isLastPage && !isFirstPage && numberOfElements === 0) {
      dispatch(setAssignedPageNumber(assignedPageNumber - 1));
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
                  dispatch(setRightSortFlag());
                  dispatch(setRightSortValue("name"));
                }}
              >
                Customer
                {rightSortFlag && rightSortValue === "name" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!rightSortFlag && rightSortValue === "name" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              assignedCustomerList?.length !== 0 &&
              assignedCustomerList?.map((customer) => (
                <tr
                  id="rowId"
                  key={customer.customerPK}
                  onClick={(event) => {
                    handleClick(event, customer);
                  }}
                  onDoubleClick={() => {
                    handleDoubleClick(customer.customerPK);
                    dispatch(removeFromUnSelectedList(customer));
                  }}
                  className={
                    unSelectedList?.some((element) => element.customerPK === customer.customerPK)
                      ? "tableSelected"
                      : ""
                  }
                >
                  <td>{customer.name}</td>
                </tr>
              ))}
            {loading && <LoadingText smallerFont />}
          </tbody>
        </table>
      }
      {!loading && assignedCustomerList?.length === 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}
    </div>
  );
};

export default RightSideCustomerListing;
