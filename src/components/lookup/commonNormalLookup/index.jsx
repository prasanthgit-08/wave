import CommonTable from "../../common/commonTable";
import CustomPagination from "../../common/customPagination";
import SearchFilterSort from "../../common/searchFilterSort";
import NormalLookup from "../NormalLookup";
import useCommonNormalLookup from "./useCommonNormalLookup";

const CommonNormalLookup = ({
  show,
  onHide,
  id,
  selecedId,
  lookupTitle,
  handleLookupSelection,
  fetchFunction,
  doubleClickSelection,
  columns,
  unitType,
  firstPage = true,
  lastPage = true,
  singleArrowUp = true,
  singleArrowDown = true,
  doubleArrowUp = false,
  doubleArrowDown = false,
  tripleArrowUp = false,
  tripleArrowDown = false,
}) => {
  const {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    loading,
    filterData,
    setFilterData,
    listingData,
    typing,
  } = useCommonNormalLookup({ show, fetchFunction });

  if (!show) return null;

  return (
    <NormalLookup
      show={show}
      onHide={onHide}
      lookupTitle={lookupTitle}
      SearchFilterComponent={
        <SearchFilterSort
          onHide={onHide}
          filterData={filterData}
          setFilterData={setFilterData}
          loading={loading || typing}
          unitType={unitType}
        />
      }
      TableListingComponent={
        <CommonTable
          id={id}
          selecedId={selecedId}
          loading={loading || typing}
          columns={columns}
          filterData={filterData}
          setFilterData={setFilterData}
          listingData={listingData}
          doubleClickSelection={(row) => {
            doubleClickSelection && doubleClickSelection(row);
            onHide();
          }}
          handleSelect={(row) => {
            handleLookupSelection && handleLookupSelection(row);
            !doubleClickSelection && onHide();
          }}
        />
      }
      PaginationComponent={
        <CustomPagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          totalPages={totalPages}
          totalElements={totalElements}
          loading={loading || typing}
          firstPage={firstPage}
          lastPage={lastPage}
          singleArrowUp={singleArrowUp}
          singleArrowDown={singleArrowDown}
          doubleArrowUp={doubleArrowUp}
          doubleArrowDown={doubleArrowDown}
          tripleArrowUp={tripleArrowUp}
          tripleArrowDown={tripleArrowDown}
        />
      }
    />
  );
};

export default CommonNormalLookup;

// <CommonNormalLookup
//   show={deliveryShuttleCityModal}
//   onHide={() => setDeliveryShuttleCityModal(false)}
//   lookupTitle={"Shuttle City Selection"}
//   columns={[{ label: "City", key: "city" }]}
//   handleLookupSelection={handleDeliveryShuttleCitySelection}
//   fetchFunction={fetchCityDetails}
// />
