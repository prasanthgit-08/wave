import { useRef } from "react";
import CustomPagination from "../../common/customPagination";
import DynamicInput from "../../common/dynamicInput";
import RadioOrder from "../../common/radioOrder";
import SearchFilterSort from "../../common/searchFilterSort";
import AdvancedLookup from "../AdvancedLookup";
import TableList from "./TableList";
import useLookupCustomer from "./useLookupCustomer";

const RADIO_OBJ = {
  sections: [
    { label: "Name", value: "name" },
    { label: "City", value: "city" },
    { label: "State", value: "stateCode" },
  ],
  levels: ["1st", "2nd", "3rd"],
  fieldNames: ["firstField", "secondField", "thirdField", "fourthField", "fifthField"],
};

const dynamicInputlist = [
  { label: "Name", name: "name" },
  { label: "City", name: "city" },
  { label: "State", name: "stateCode", maxLength: 2, width: "40px", upperCase: true },
];

const LookupCustomer = ({ show, onHide, type, handleLookupSelection }) => {
  const {
    pageNumber,
    setPageNumber,
    filterData,
    setFilterData,
    totalPages,
    totalElements,
    loading,
    customersData,
    showAdvancedSort,
    setShowAdvancedSort,
    showAdvancedSearch,
    setShowAdvancedSearch,
    handleSubmit,
    fetchData,
  } = useLookupCustomer({ show, type });

  const isModalClosingRef = useRef(false);
  const closingRef = useRef(false);

  const onClose = () => {
    isModalClosingRef.current = true;
    closingRef.current = true;
    onHide && onHide();
    setShowAdvancedSort(false);
    setShowAdvancedSearch(false);
  };

  if (!show) return null;
};

export default LookupCustomer;
