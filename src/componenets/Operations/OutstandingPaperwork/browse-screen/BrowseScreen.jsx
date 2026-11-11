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
  setLatePaperworkNotes,
  setPageNumber,
} from "../../../../redux/OutstandingPaperworkSlice";

const BrowseScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedDispatchPK = useSelector((state) => state.outstandingPaperwork.selectedDispatchPK);
  const latePaperworkNotes = useSelector((state) => state.outstandingPaperwork.latePaperworkNotes);
  const pageNumber = useSelector((state) => state.outstandingPaperwork.pageNumber);
  const totalPages = useSelector((state) => state.outstandingPaperwork.totalPages);
  const totalElements = useSelector((state) => state.outstandingPaperwork.totalElements);
  const browseList = useSelector((state) => state.outstandingPaperwork.browseList);
  const loading = useSelector((state) => state.outstandingPaperwork.loading);

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
      onClick: () => navigate(`/outstanding-paperwork-email-screen`),
      disabled: !selectedDispatchPK,
    },
    {
      label: "Comment",
      onClick: () => navigate(`/outstanding-paperwork-comments-screen`),
      disabled: !selectedDispatchPK,
    },
    { label: "Cancel", onClick: () => handleCancel(), disabled: false },
  ];

  const handleCancel = () => {
    dispatch(resetChanges());
    dispatch(setPageNumber(0));
    navigate(`/outstanding-paperwork-settings-screen`);
  };

  useEffect(() => {
    if (!loading) {
      const selectedRecord = browseList.find((record) => record.DispatchPK === selectedDispatchPK);

      if (selectedRecord) {
        dispatch(setLatePaperworkNotes(selectedRecord.LatePaperworkNotes || ""));
      }
    }
  }, [browseList, loading, selectedDispatchPK]);

  window.addEventListener("popstate", () => {
    dispatch(resetChanges());
    dispatch(setPageNumber(0));
    navigate(`/outstanding-paperwork-settings-screen`);
  });

  return (
    <div className="container-fluid table-bordered customContainer">
      <div className="row">
        <div
          className="border border-dark border-3"
          style={{
            maxWidth: THREE_FOURTH_SCREEN_WIDTH,
            minWidth: THREE_FOURTH_SCREEN_WIDTH,
            height: THREE_FOURTH_SCREEN_HEIGHT,
          }}
        >
          <Header closeHandler={() => dispatch(resetChanges())} hideBorderBottom />
          <div className="row border border-dark border-top border-2" style={{ height: "calc(100% - 97px)" }}>
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

            <div className="col-3 border-start border-dark border-1">
              <div className="h-100 p-2">
                <textarea
                  className="form-control h-100"
                  value={latePaperworkNotes}
                  onChange={() => {}}
                  placeholder="Late Paperwork Notes.."
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
