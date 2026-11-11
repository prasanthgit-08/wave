import React from "react";
import { useSelector } from "react-redux";
import UnitSelectionList from "./UnitSelectionList";
import { PaginationComponent } from "../../../../../../../common/PaginationComponent";
import { setPageNumber } from "../../../../../../../../redux/UndispatchSlice";
const UnitSelectionContent = () => {
  const browseData = useSelector((state) => state.undispatchReducer.browseData);
  const pageNumber = useSelector((state) => state.undispatchReducer.pageNumber);
  const totalElements = useSelector((state) => state.undispatchReducer.totalElements);
  const totalPages = useSelector((state) => state.undispatchReducer.totalPages);
  const browseFlag = useSelector((state) => state.undispatchReducer.browseFlag);
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: browseData,
  };
  return (
    <div className="container-fluid table-bordered">
      <div className=" ">
        <div className="row border border-dark border-1 fit-quarterScreenFormContentHeight">
          <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
            <div className="d-flex h-440px">
              <div className="w-100">
                <UnitSelectionList />
              </div>
              <PaginationComponent
                {...paginationProps}
                firstPage
                lastPage
                singleArrowUp
                singleArrowDown
                loading={browseFlag}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitSelectionContent;
