import React from "react";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import CustomerDealersService from "../../../../../services/CustomerDealersService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCustomerData,
  setCustomerLoading,
  setCustomerPageNumber,
  setCustomerSelectedId,
  setCustomerSort,
  setCustomerSortValue,
  setCustomerTotalElements,
  setCustomerTotalPages,
  setPlantGroupSelectionId,
  setPlantSelectedId,
} from "../../../../../redux/CustomerDealerSlice";
import {
  setChangeColor,
  setCustomerDealerId,
  setDstCity,
  setDstStateCode,
  setSelectionGroup,
  setSelectionId,
} from "../../../../../redux/EditCustomerDealerSlice";

const CustomerTab = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = params.id;

  const customerData = useSelector((state) => state.customerDealersFilter.customerData);
  const customerPageNumber = useSelector((state) => state.customerDealersFilter.customerPageNumber);
  const customerTotalPages = useSelector((state) => state.customerDealersFilter.customerTotalPages);
  const customerTotalElements = useSelector((state) => state.customerDealersFilter.customerTotalElements);
  const changeColor = useSelector((state) => state.editcustomerDealers.changeColor);
  const customerSort = useSelector((state) => state.customerDealersFilter.customerSort);
  const customerSortValue = useSelector((state) => state.customerDealersFilter.customerSortValue);
  const customerDealerId = useSelector((state) => state.editcustomerDealers.customerDealerId);
  const customerLoading = useSelector((state) => state.customerDealersFilter.customerLoading);

  const fetchCustomers = () => {
    dispatch(setCustomerLoading(true));
    CustomerDealersService.fetchCustomers(id, customerPageNumber, customerSort, customerSortValue)
      .then((response) => {
        dispatch(setCustomerData(response?.data?.content));
        dispatch(setCustomerTotalElements(response?.data?.totalElements));
        dispatch(setCustomerTotalPages(response?.data?.totalPages));
      })
      .finally(() => {
        dispatch(setCustomerLoading(false));
      });
  };
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchCustomers();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [customerPageNumber, customerSort, customerSortValue]);

  const paginationProps = {
    pageNumber: customerPageNumber,
    setPageNumber: setCustomerPageNumber,
    totalPages: customerTotalPages,
    totalElements: customerTotalElements,
    listingData: customerData,
    recordsPerPage: 14,
  };

  return (
    <div className={`col-8 mx-auto`}>
      <div className="d-flex h-550px border border-dark border-1 mt-3">
        <div className="w-100">
          <div className="fixTableHead">
            <table className="table table-striped f-w-600">
              <thead>
                <tr>
                  <th
                    className="f-w-600"
                    onClick={() => {
                      dispatch(setCustomerSort());
                      dispatch(setCustomerSortValue("description"));
                    }}
                  >
                    Description
                    {customerSort && customerSortValue === "description" && (
                      <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true" />
                    )}
                    {!customerSort && customerSortValue === "description" && (
                      <i className="fa fa-sort-alpha-desc font-20 m-l-10" />
                    )}
                  </th>
                  <th
                    className="f-w-600"
                    onClick={() => {
                      dispatch(setCustomerSort());
                      dispatch(setCustomerSortValue("name"));
                    }}
                  >
                    Name
                    {customerSort && customerSortValue === "name" && (
                      <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true" />
                    )}
                    {!customerSort && customerSortValue === "name" && (
                      <i className="fa fa-sort-alpha-desc font-20 m-l-10" />
                    )}
                  </th>
                  <th
                    className="f-w-600"
                    onClick={() => {
                      dispatch(setCustomerSort());
                      dispatch(setCustomerSortValue("dba"));
                    }}
                  >
                    DBA
                    {customerSort && customerSortValue === "dba" && (
                      <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true" />
                    )}
                    {!customerSort && customerSortValue === "dba" && (
                      <i className="fa fa-sort-alpha-desc font-20 m-l-10" />
                    )}
                  </th>
                  <th
                    className="f-w-600"
                    onClick={() => {
                      dispatch(setCustomerSort());
                      dispatch(setCustomerSortValue("city"));
                    }}
                  >
                    City
                    {customerSort && customerSortValue === "city" && (
                      <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true" />
                    )}
                    {!customerSort && customerSortValue === "city" && (
                      <i className="fa fa-sort-alpha-desc font-20 m-l-10" />
                    )}
                  </th>
                  <th
                    className="f-w-600"
                    onClick={() => {
                      dispatch(setCustomerSort());
                      dispatch(setCustomerSortValue("stateCode"));
                    }}
                  >
                    State
                    {customerSort && customerSortValue === "stateCode" && (
                      <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true" />
                    )}
                    {!customerSort && customerSortValue === "stateCode" && (
                      <i className="fa fa-sort-alpha-desc font-20 m-l-10" />
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {customerData?.map((customer) => (
                  <tr
                    id="rowId"
                    key={customer.customerDealerPK}
                    onClick={(e) => {
                      dispatch(setChangeColor(false));
                    }}
                    onDoubleClick={(e) => {
                      dispatch(setCustomerSelectedId(customer?.customerId));
                      dispatch(setChangeColor(true));
                      dispatch(setPlantSelectedId(""));
                      dispatch(setPlantGroupSelectionId(""));
                      dispatch(setSelectionGroup("Customer"));
                      dispatch(setSelectionId(customer?.customerId));
                      dispatch(setCustomerDealerId(customer?.customerDealerPK));
                      dispatch(setDstCity(customer?.customerCity));
                      dispatch(setDstStateCode(customer?.customerState));
                      setTimeout(() => {
                        navigate("/edit-customer-dealer/Customer/" + id + "/" + customer.customerDealerPK);
                      }, 75);
                    }}
                    className={
                      customerDealerId === customer?.customerDealerPK && changeColor ? "tableSelected" : " "
                    }
                  >
                    <td className="f-w-600"> {customer.customerDescription} </td>
                    <td className="f-w-600"> {customer.customerName} </td>
                    <td className="f-w-600"> {customer.customerDBA} </td>
                    <td className="f-w-600"> {customer.customerCity} </td>
                    <td className="f-w-600"> {customer.customerState} </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!customerLoading && customerData?.length === 0 && (
              <h2 className="empty-list" align="center">
                No Records Available
              </h2>
            )}
            {customerLoading && (
              <div className="fade modal-backdrop show">
                <div className="pos-center">
                  <div className="loader"></div>
                </div>
              </div>
            )}
          </div>
        </div>
        <PaginationComponent
          singleArrowDown
          singleArrowUp
          doubleArrowDown
          doubleArrowUp
          lastPage
          firstPage
          {...paginationProps}
        />
      </div>
    </div>
  );
};

export default CustomerTab;
