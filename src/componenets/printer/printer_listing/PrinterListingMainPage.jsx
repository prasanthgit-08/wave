import { PaginationComponent } from "../../common/PaginationComponent";
import { No_Of_Record_per_page } from "../../../services/constants/applicationConstants";
import { useSelector } from "react-redux";
import { PrinterSearchFilter } from "./PrinterSearchFilter";
import { setPageNumber } from "../../../redux/PrinterSearchFilterSlice";
import PrinterListing from "./PrinterListing";
import QuarterScreenTemplate from "../../Templates/QuarterScreenTemplate";
import {
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_WIDTH,
  PRINTER_TABLE_LISTING_HEIGHT,
} from "../../../constants/screenSizes";

const PrinterListingMainPage = () => {
  const printerDataList = useSelector((state) => state.printerSearchReducer.printerDataList);
  const loader = useSelector((state) => state.printerSearchReducer.loader);
  const pageNumber = useSelector((state) => state.printerSearchReducer.pageNumber);
  const totalPages = useSelector((state) => state.printerSearchReducer.totalPages);
  const totalElements = useSelector((state) => state.printerSearchReducer.totalElements);
  const id = useSelector((state) => state.printerSearchReducer.id);

  // Pagination properties
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: printerDataList,
    loading: loader,
  };

  return (
    <QuarterScreenTemplate
      screenWidth={HALF_SCREEN_WIDTH}
      screenHeight={HALF_SCREEN_HEIGHT}
      tableListingHeight={PRINTER_TABLE_LISTING_HEIGHT}
      SearchFilterComponent={<PrinterSearchFilter />}
      TableListingComponent={<PrinterListing />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={No_Of_Record_per_page}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
        />
      }
    />
  );
};

export default PrinterListingMainPage;
