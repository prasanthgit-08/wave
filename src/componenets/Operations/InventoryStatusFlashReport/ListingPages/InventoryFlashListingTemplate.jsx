import React, { useState } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import InventoryFlashListingHeader from "./InventoryFlashListingHeader";
import InventoryFlashList from "./InventoryFlashList";
import InventoryFlashListingFooter from "./InventoryFlashListingFooter";
import { PaginationComponent } from "../../../common/PaginationComponent";
import usePagination from "../../../../hooks/usePagination";
import { useDispatch, useSelector } from "react-redux";
import { setPageNumber, setUpdatedPageNumber } from "../../../../redux/InventoryStatusFlashReportSlice";

const InventoryFlashListingTemplate = () => {
  const dispatch = useDispatch();

  const { listingData, index, keys, pageNumbers } = useSelector(
    (state) => state.inventoryStatusFlashReportSlice
  );

  const [loading, setLoading] = useState(true);

  const pagination = usePagination(listingData[keys[index]] || [], pageNumbers[keys[index]] || 0, 11);

  const { paginatedArray, totalElements, totalPages } = pagination;

  const paginationProps = {
    pageNumber: pageNumbers[keys[index]],
    setPageNumber: setUpdatedPageNumber,
    totalElements: totalElements,
    totalPages: totalPages,
    listingData: paginatedArray || [],
  };

  return (
    <QuarterScreenWrapper>
      <InventoryFlashListingHeader />
      <div className="container-fluid table-bordered">
        <div className=" ">
          <div className="row border border-dark border-1 fit-quarterScreenFormContentHeight ">
            <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
              <div className="d-flex " style={{ height: "444px" }}>
                <div className="w-100">
                  <InventoryFlashList
                    displayData={paginatedArray}
                    loading={loading}
                    setLoading={setLoading}
                  />
                </div>
                <PaginationComponent
                  {...paginationProps}
                  singleArrowUp
                  singleArrowDown
                  hideBorderBottom
                  hideBorderTop
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <InventoryFlashListingFooter />
    </QuarterScreenWrapper>
  );
};

export default InventoryFlashListingTemplate;
