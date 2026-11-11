/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import TableListing from "./TableListing";
import Header from "../../../common/Header";
import { THREE_FOURTH_SCREEN_HEIGHT, THREE_FOURTH_SCREEN_WIDTH } from "../../../../constants/screenSizes";
import CommonFooter from "../../../common/CommonFooter";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetChanges,
  setMissingPaperworkNotes,
  setPageNumber,
} from "../../../../redux/MissingPaperworkSlice";

const BrowseScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedDispatchPK = useSelector((state) => state.missingPaperwork.selectedDispatchPK);
  const missingPaperworkNotes = useSelector((state) => state.missingPaperwork.missingPaperworkNotes);
  const pageNumber = useSelector((state) => state.missingPaperwork.pageNumber);
  const totalPages = useSelector((state) => state.missingPaperwork.totalPages);
  const totalElements = useSelector((state) => state.missingPaperwork.totalElements);
  const browseList = useSelector((state) => state.missingPaperwork.browseList);
  const loading = useSelector((state) => state.missingPaperwork.loading);

  const paginationProps = {
    pageNumber,
    setPageNumber: setPageNumber,
    totalPages,
    totalElements,
    listingData: browseList,
  };

  const footerButtons = [
    {
      label: "Email",
      onClick: () => navigate(`/missing-paperwork-email-screen`),
      disabled: !selectedDispatchPK,
    },
    {
      label: "Comment",
      onClick: () => navigate(`/missing-paperwork-comments-screen`),
      disabled: !selectedDispatchPK,
    },
    { label: "Cancel", onClick: () => handleCancel(), disabled: false },
  ];

  const handleCancel = () => {
    dispatch(resetChanges());
    dispatch(setPageNumber(0));
    navigate(`/missing-paperwork-settings-screen`);
  };

  window.addEventListener("popstate", () => {
    dispatch(resetChanges());
    dispatch(setPageNumber(0));
    navigate(`/missing-paperwork-settings-screen`);
  });

  useEffect(() => {
    if (!loading) {
      const selectedRecord = browseList.find((record) => record.DispatchPK === selectedDispatchPK);

      if (selectedRecord) {
        dispatch(setMissingPaperworkNotes(selectedRecord.MissingPaperworkNotes || ""));
      }
    }
  }, [browseList, loading, selectedDispatchPK]);

  return (
    <div className="container-fluid table-bordered ">
      <div className="row">
        <div
          className="border border-dark border-3"
          style={{
            maxWidth: THREE_FOURTH_SCREEN_WIDTH,
            minWidth: THREE_FOURTH_SCREEN_WIDTH,
            height: THREE_FOURTH_SCREEN_HEIGHT,
          }}
        >
          <Header hideBorderBottom closeHandler={() => dispatch(resetChanges())} />
          <div className="row border border-dark border-1" style={{ height: "calc(100% - 97px)" }}>
            <div className="p-r-0 p-l-0 col-9">
              <div className="d-flex h-100">
                <div className="w-100" style={{ height: "450px" }}>
                  <TableListing />
                </div>
                <PaginationComponent
                  {...paginationProps}
                  loading={loading}
                  firstPage
                  lastPage
                  tripleArrowUp
                  tripleArrowDown
                  doubleArrowUp
                  doubleArrowDown
                  singleArrowUp
                  singleArrowDown
                />
              </div>
            </div>

            <div className="col-3 border-dark border-1">
              <div className="h-100 p-2">
                <textarea
                  className="form-control h-100"
                  value={missingPaperworkNotes}
                  onChange={() => {}}
                  placeholder="Missing Paperwork Notes.."
                  disabled
                />
              </div>
            </div>
          </div>
          <CommonFooter buttons={footerButtons} hideBorderTop />
        </div>
      </div>
    </div>
  );
};

export default BrowseScreen;
