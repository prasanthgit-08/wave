import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItemsPageNumber } from "../../../../../../redux/DriverDeleaseSlice";
import { PaginationComponent } from "../../../../../common/PaginationComponent";
import ItemsTabBrowseList from "./ItemsTabBrowseList";
import { useParams } from "react-router-dom";

const ItemsTabBrowse = () => {
  const { id } = useParams();
  const { driverId } = useParams();
  const dispatch = useDispatch();
  const itemsTotalPages = useSelector((state) => state.driverDeleaseReducer.itemsTotalPages);
  const itemsTotalElements = useSelector((state) => state.driverDeleaseReducer.itemsTotalElements);
  const itemsPageNumber = useSelector((state) => state.driverDeleaseReducer.itemsPageNumber);
  const itemsListingData = useSelector((state) => state.driverDeleaseReducer.itemsListingData);
  const deleaseItemsListingData = useSelector((state) => state.driverDeleaseReducer.deleaseItemsListingData);

  const paginationProps = {
    pageNumber: itemsPageNumber,
    setPageNumber: setItemsPageNumber,
    totalPages: itemsTotalPages,
    totalElements: itemsTotalElements,
    listingData: id ? itemsListingData : deleaseItemsListingData,
  };
  return (
    <div className="container-fluid table-bordered">
      <div className=" ">
        <div className="row border border-dark border-1 halfScreenFormContentHeight">
          <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
            <div className="d-flex h-100">
              <div className="w-100">
                <ItemsTabBrowseList />
              </div>
              <PaginationComponent {...paginationProps} firstPage lastPage singleArrowUp singleArrowDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsTabBrowse;
