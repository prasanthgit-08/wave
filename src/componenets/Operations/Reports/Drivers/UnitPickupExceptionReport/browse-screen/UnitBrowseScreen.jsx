import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommonFooter from "../../../../../common/CommonFooter";
import Header from "../../../../../common/Header";
import {
  THREE_FOURTH_SCREEN_HEIGHT,
  THREE_FOURTH_SCREEN_WIDTH,
} from "../../../../../../constants/screenSizes";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../../../../common/PaginationComponent";
import {
  resetChanges,
  setBrowseList,
  setPageNumber,
  setSelectedDispatchPK,
  setUnitAdditionalNotes,
} from "../../../../../../redux/Reports/UnitPickupExceptionSlice";

const UnitBrowseScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    pageNumber,
    totalPages,
    totalElements,
    browseList,
    loading,
    selectedDispatchPK,
    unitAdditionalNotes,
  } = useSelector((state) => state.unitPickupException);

  const paginationProps = {
    pageNumber,
    setPageNumber: (page) => dispatch(setPageNumber(page)),
    totalPages,
    totalElements,
    listingData: browseList,
  };

  const footerButtons = [
    {
      label: "Comment",
      onClick: () => navigate(`/unit-pickup-exception-comments-screen`),
      disabled: !selectedDispatchPK,
    },
    {
      label: "Mail",
      onClick: () => navigate(`/unit-pickup-exception-mail-screen`),
      disabled: !selectedDispatchPK,
    },
    {
      label: "Cancel",
      onClick: () => handleCancel(),
      disabled: false,
    },
  ];

  const handleCancel = () => {
    dispatch(resetChanges());
    dispatch(setPageNumber(0));
    navigate(`/reports-unit-pickup-exception-report`);
  };

  useEffect(() => {
    if (!loading) {
      const selectedRecord = browseList.find((record) => record.DispatchPK === selectedDispatchPK);
      if (selectedRecord) {
        dispatch(setUnitAdditionalNotes(selectedRecord.Notes || ""));
      } else {
        dispatch(setUnitAdditionalNotes(""));
      }
    }
  }, [browseList, loading, selectedDispatchPK]);

  useEffect(() => {
    const handlePopState = () => {
      dispatch(resetChanges());
      dispatch(setPageNumber(0));
      navigate(`/reports-unit-pickup-exception-report`);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

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
          <Header closeHandler={() => handleCancel()} hideBorderBottom />
          <div className="row border border-dark border-top border-2" style={{ height: "calc(100% - 97px)" }}>
            <div className="p-r-0 p-l-0 col-9">
              <div className="d-flex h-100">
                <div className="w-100" style={{ height: "700px" }}>
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
                  value={loading ? "" : unitAdditionalNotes}
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

export default UnitBrowseScreen;
