import { useRef } from "react";
import CommonTable from "../../common/commonTable";
import CustomPagination from "../../common/customPagination";
import DynamicInput from "../../common/dynamicInput";
import SearchFilterSort from "../../common/searchFilterSort";
import AdvancedLookup from "../AdvancedLookup";
import useCommonAdvancedLookup from "./useCommonAdvancedLookup";
import RadioOrder from "../../common/radioOrder";

const CommonAdvancedLookup = ({
  show,
  onHide,
  id,
  selecedId,
  lookupTitle,
  showAdvancedSearchFlag = false,
  showAdvancedSortFlag = false,
  fetchFunction,
  columns,
  handleLookupSelection,
  doubleClickSelection,
  dynamicInputTargetKey,
  dynamicInputDefaultFields,
  dynamicInputlist,
  radioOrderObj,
}) => {
  const {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
    loading,
    typing,
    filterData,
    setFilterData,
    handleSubmit,
    showAdvancedSort,
    setShowAdvancedSort,
    showAdvancedSearch,
    setShowAdvancedSearch,
    refetch,
  } = useCommonAdvancedLookup({ show, fetchFunction });

  const isModalClosingRef = useRef(false);
  const closingRef = useRef(false);

  const onClose = () => {
    isModalClosingRef.current = true;
    closingRef.current = true;
    onHide && onHide();
    setShowAdvancedSort(false);
    setShowAdvancedSearch(false);
  };

  return (
    <AdvancedLookup
      show={show}
      onHide={onClose}
      lookupTitle={lookupTitle}
      SearchFilterComponent={
        <SearchFilterSort
          showAdvancedSearchFlag={showAdvancedSearchFlag}
          showAdvancedSortFlag={showAdvancedSortFlag}
          filterData={filterData}
          setFilterData={setFilterData}
          onHide={onHide}
          loading={loading}
          handleSubmit={handleSubmit}
          setShowAdvancedSort={setShowAdvancedSort}
          showAdvancedSearch={showAdvancedSearch}
          setShowAdvancedSearch={setShowAdvancedSearch}
        />
      }
      TableListingComponent={
        <CommonTable
          id={id}
          selecedId={selecedId}
          loading={loading || typing}
          disabledHead={showAdvancedSort}
          columns={columns}
          filterData={filterData}
          setFilterData={setFilterData}
          listingData={listingData}
          doubleClickSelection={(row) => {
            doubleClickSelection && doubleClickSelection(row);
            onClose();
          }}
          handleSelect={(row) => {
            handleLookupSelection && handleLookupSelection(row);
            !doubleClickSelection && onClose();
          }}
        />
      }
      PaginationComponent={
        <CustomPagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          totalPages={totalPages}
          totalElements={totalElements}
          loading={loading}
          firstPage
          lastPage
          tripleArrowUp
          tripleArrowDown
          doubleArrowUp
          doubleArrowDown
          singleArrowUp
          singleArrowDown
          // recordsPerPage={30}
        />
      }
      showAdvancedSearch={showAdvancedSearch}
      AdvancedSearchComponent={
        <DynamicInput
          targetKey={dynamicInputTargetKey}
          defaultFields={dynamicInputDefaultFields}
          list={dynamicInputlist}
          filterData={filterData}
          setFilterData={setFilterData}
          fetchData={refetch}
          modalClosingRef={closingRef}
        />
      }
      showAdvancedSort={showAdvancedSort}
      AdvancedSortComponent={
        <RadioOrder
          sections={radioOrderObj?.sections} // RADIO_OBJ is the static value, it is given out side of the component for to aviod unwanted rendering
          levels={radioOrderObj?.levels}
          fieldNames={radioOrderObj?.fieldNames}
          filterData={filterData}
          setFilterData={setFilterData}
          modalClosingRef={isModalClosingRef}
          fetchData={refetch}
        />
      }
    />
  );
};

export default CommonAdvancedLookup;
