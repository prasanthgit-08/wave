import React, { useEffect, useState } from "react";
import QuarterScreenWrapper from "../../../../../../../Templates/Screens/QuarterScreenWrapper";
import PostNoCheckinHeader from "../PostNoCheckinHeader";
import PostNoCheckinFooter from "./PostNoCheckinFooter";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PostNoCheckinService from "../../../../../../../../services/operations/PostNoCheckinService";
import {
  setDriverFK,
  setPageNumber,
  setPostNoCheckinHistoryList,
  setTotalElements,
  setTotalPages,
  setUnitsLoading,
  setHistoryLoading,
} from "../../../../../../../../redux/PostNoCheckinSlice";
import moment from "moment";
import { PaginationComponent } from "../../../../../../../common/PaginationComponent";
import PostNoCheckinHistoryListing from "./PostNoCheckinHistoryListing";
import { Row } from "react-bootstrap";

function PostNoCheckinHistoryContent() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const pageNumber = useSelector((state) => state.postNoCheckinReducer.pageNumber);
  const totalPages = useSelector((state) => state.postNoCheckinReducer.totalPages);
  const totalElements = useSelector((state) => state.postNoCheckinReducer.totalElements);
  const unitsLoading = useSelector((state) => state.postNoCheckinReducer.unitsLoading);
  const historyLoading = useSelector((state) => state.postNoCheckinReducer.historyLoading);
  const postNoCheckinHistoryList = useSelector(
    (state) => state.postNoCheckinReducer.postNoCheckinHistoryList
  );

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: postNoCheckinHistoryList,
  };

  /**
   *  Driver No Checkin History Browse Fetch function
   **/
  const getDriverNoCheckinHistory = (driverId) => {
    if (driverId) {
      dispatch(setHistoryLoading(true));
      PostNoCheckinService.getDriverNoCheckinHistory(driverId, pageNumber)
        .then((response) => {
          const { data } = response;
          if (data) {
            dispatch(setPostNoCheckinHistoryList(data.content || []));
            dispatch(setTotalElements(data.totalElements || 0));
            dispatch(setTotalPages(data.totalPages || 0));
          } else {
            dispatch(setPostNoCheckinHistoryList([]));
            dispatch(setTotalElements(0));
            dispatch(setTotalPages(0));
          }
          dispatch(setHistoryLoading(false));
        })
        .catch((error) => {
          dispatch(setHistoryLoading(false));
        });
    }
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      getDriverNoCheckinHistory(id);
      dispatch(setDriverFK(id));
    }, 5);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [pageNumber, id]);

  return (
    <QuarterScreenWrapper>
      <PostNoCheckinHeader />
      <div className="container-fluid table-bordered ">
        <Row style={{ height: "442px" }}>
          <div className="col-12 border border-dark border-2 border-top-0 border-right-0 border-bottom-0 px-0 p-r-0 p-l-0">
            <div className="d-flex h-100">
              <div className="w-100">
                <PostNoCheckinHistoryListing />
              </div>
              <PaginationComponent
                {...paginationProps}
                loading={historyLoading}
                firstPage
                lastPage
                singleArrowUp
                singleArrowDown
                hideBorderRight
                hideBorderBottom
                hideBorderTop
                recordsPerPage={11}
              />
            </div>
          </div>
        </Row>
      </div>
      <PostNoCheckinFooter />
    </QuarterScreenWrapper>
  );
}

export default PostNoCheckinHistoryContent;
