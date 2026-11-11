import { useRef } from "react";
import CustomPagination from "../../common/customPagination";
import DynamicInput from "../../common/dynamicInput";
import SearchFilterSort from "../../common/searchFilterSort";
import AdvancedLookup from "../AdvancedLookup";
import TableList from "./TableList";
import useLookupCustomerPlants from "./useLookupCustomerPlants";

const dynamicInputlist = [
  { label: "Name", name: "name" },
  { label: "Brand", name: "brand" },
  { label: "product Line", name: "productLine" },
];

const LookupCustomerPlants = ({
  show,
  onHide,
  type,
  customerFK,
  isDPUCustomer,
  handleLookupSelection,
  billingPlant,
}) => {
  const {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    loading,
    filterData,
    setFilterData,
    plantData,
    showAdvancedSearch,
    setShowAdvancedSearch,
    fetchData,
    handleSubmit,
  } = useLookupCustomerPlants({
    show,
    type,
    customerFK,
    isDPUCustomer,
    billingPlant,
  });

  const closingRef = useRef(false);

  const onClose = () => {
    closingRef.current = true;
    onHide && onHide();
    setShowAdvancedSearch(false);
  };

  if (!show) return null;
};

export default LookupCustomerPlants;
