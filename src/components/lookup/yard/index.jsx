import CustomPagination from "../../common/customPagination";
import SearchFilterSort from "../../common/searchFilterSort";
import NormalLookup from "../NormalLookup";
import TableList from "./TableList";
import useLookupYard from "./useLookupYard";

const LookupYard = ({ show, onHide, type, customerFK, customerPlantPK, outbound, handleLookupSelection }) => {
  const {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    loading,
    filterData,
    setFilterData,
    yardData,
  } = useLookupYard({ show, type, customerFK, customerPlantPK, outbound });
  return null;
};

export default LookupYard;
