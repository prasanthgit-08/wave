import React, { useState } from "react";
import { useEffect } from "react";
import SearchFilterCustomer from "./SearchFilterCustomer";
import ListCustomer from "./ListCustomer";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { AdvacedSearchCustomer } from "./AdvacedSearchCustomer";
import { useDispatch, useSelector } from "react-redux";
import { AdvancedSortCustomer } from "./AdvancedSortCustomer";
import {
  setAdvanceSortingCriteria,
  setPageNumber,
  setLoader,
} from "../../../../redux/UsePlantCustomerSearchFilterSlice";
import StandardMaintenanceTemplate from "../../../Templates/StandardMaintenanceTemplate";

const MainPageCustomer = () => {
  const dispatch = useDispatch();
  const [firstField, setFirstField] = useState(null);
  const [secondField, setSecondField] = useState(null);
  const [thirdField, setThirdField] = useState(null);
  const [fourthField, setFourthField] = useState(null);
  const [fifthField, setFifthField] = useState(null);
  const loader = useSelector((state) => state.usePlantCustomerSearchFilterReducer.loader);

  const customerPlantData = useSelector((state) => state.customerPlantmaintanceReducer.customerPlantData);

  const showAdvanceSearch = useSelector(
    (state) => state.usePlantCustomerSearchFilterReducer.showAdvanceSearch
  );

  const showAdvanceSort = useSelector((state) => state.usePlantCustomerSearchFilterReducer.showAdvanceSort);

  const advanceSortingOrder = useSelector(
    (state) => state.usePlantCustomerSearchFilterReducer.advanceSortingOrder
  );
  const pageNumber = useSelector((state) => state.usePlantCustomerSearchFilterReducer.pageNumber);
  const totalPages = useSelector((state) => state.usePlantCustomerSearchFilterReducer.totalPages);
  const totalElements = useSelector((state) => state.usePlantCustomerSearchFilterReducer.totalElements);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: customerPlantData,
  };

  useEffect(() => {
    dispatch(
      setAdvanceSortingCriteria({
        firstField: firstField,
        secondField: secondField,
        thirdField: thirdField,
        fourthField: fourthField,
        fifthField: fifthField,
      })
    );
  }, [firstField, secondField, thirdField, fourthField, fifthField]);

  useEffect(() => {
    if (null != advanceSortingOrder) {
      setFirstField(firstField !== null ? firstField : advanceSortingOrder.firstField);
      setSecondField(secondField !== null ? secondField : advanceSortingOrder.secondField);
      setThirdField(thirdField !== null ? thirdField : advanceSortingOrder.thirdField);
      setFourthField(fourthField !== null ? fourthField : advanceSortingOrder.fourthField);
      setFifthField(fifthField !== null ? fifthField : advanceSortingOrder.fifthField);
    } else {
      setFirstField(null);
      setSecondField(null);
      setThirdField(null);
      setFourthField(null);
      setFifthField(null);
    }
  }, [advanceSortingOrder]);

  return (
    <StandardMaintenanceTemplate
      SearchFilterComponent={<SearchFilterCustomer />}
      TableListingComponent={<ListCustomer />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          loading={loader}
          firstPage
          lastPage
          tripleArrowUp
          tripleArrowDown
          doubleArrowUp
          doubleArrowDown
          singleArrowUp
          singleArrowDown
        />
      }
      showAdvancedSearch={showAdvanceSearch}
      AdvancedSearchComponent={<AdvacedSearchCustomer />}
      showAdvancedSort={showAdvanceSort}
      AdvancedSortComponent={
        <AdvancedSortCustomer
          setFirstField={setFirstField}
          setSecondField={setSecondField}
          setThirdField={setThirdField}
          setFourthField={setFourthField}
          setFifthField={setFifthField}
        />
      }
    />
  );
};

export default MainPageCustomer;
