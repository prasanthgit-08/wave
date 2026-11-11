import React from "react";
import { Col, Row, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setPageNumber } from "../../../../redux/PlantReleaseSlice";
import PlantReleaseService from "../../../../services/PlantReleaseService";
import { PaginationComponent } from "../../../common/PaginationComponent";
import MultiBrowseList from "./MultiBrowseList";
const MultiBrowseContent = () => {
  const dispatch = useDispatch();
  const browseData = useSelector((state) => state.plantReleaseReducer.browseData);
  const totalPages = useSelector((state) => state.plantReleaseReducer.totalPages);

  const totalElements = useSelector((state) => state.plantReleaseReducer.totalElements);
  const pageNumber = useSelector((state) => state.plantReleaseReducer.pageNumber);

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
        <div className="row border border-dark border-1 fit-heightPlantRelease">
          <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
            <div className="d-flex h-100">
              <div className="w-100">
                <MultiBrowseList />
              </div>
              <PaginationComponent {...paginationProps} firstPage lastPage singleArrowUp singleArrowDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiBrowseContent;
