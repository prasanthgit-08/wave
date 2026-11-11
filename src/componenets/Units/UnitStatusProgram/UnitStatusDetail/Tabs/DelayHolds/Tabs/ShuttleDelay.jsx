import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "../../../../../../common/PaginationComponent";
import { EditMasterUnitSelection_RecordsPerPage } from "../../../../../../../services/constants/applicationConstants";
import { Col, Form } from "react-bootstrap";
import UnitStatusService from "../../../../../../../services/Units/UnitStatusService";
import {
  setShuttleDelayPageNumber,
  setShuttleDelaySortFlag,
  setShuttleDelaySortValue,
  setShuttleDelayTotalElements,
  setShuttleDelayTotalPages,
} from "../../../../../../../redux/UnitStatus/UnitStatusSlice";
import { customFormatDate } from "../../../../../../../utils/validation/DateFormatUtils";
import LoadingText from "../../../../../../common/LoadingText";
import NoRecordsMessage from "../../../../../../common/NoRecordsMessage";

function ShuttleDelay({ data, activeSubTab }) {
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState(null);
  const [changeColor, setChangeColor] = useState(false);

  const shuttleDelayPageNumber = useSelector((state) => state.unitStatusReducer.shuttleDelayPageNumber);
  const shuttleDelaySortFlag = useSelector((state) => state.unitStatusReducer.shuttleDelaySortFlag);

  const shuttleDelaySortValue = useSelector((state) => state.unitStatusReducer.shuttleDelaySortValue);

  const [shuttleDelayData, setShuttleDelayData] = useState(data?.data || []);

  const shuttleDelayTotalElements = useSelector((state) => state.unitStatusReducer.shuttleDelayTotalElements);
  const shuttleDelayTotalPages = useSelector((state) => state.unitStatusReducer.shuttleDelayTotalPages);
  const selectedId = useSelector((state) => state.unitStatusReducer.selectedId);
  const [loading, setLoading] = useState(true);

  const getAllHoldsList = () => {
    UnitStatusService.getUnitStatusDataForHolds(
      selectedId,
      "Delay/Holds-ShuttleDelays",
      shuttleDelayPageNumber,
      15,
      shuttleDelaySortValue,
      shuttleDelaySortFlag
    )
      .then((response) => {
        const { data } = response;

        const listingData = data.filter((item) => item.Type !== "Pagination");
        const paginationData = data.find((item) => item.Type === "Pagination");
        setShuttleDelayData(listingData);

        // Dispatch pagination metadata
        if (paginationData) {
          dispatch(setShuttleDelayPageNumber(paginationData.PageNumber));
          dispatch(setShuttleDelayTotalElements(paginationData.TotalElements));
          dispatch(setShuttleDelayTotalPages(paginationData.TotalPages));
        }
      })
      .catch((error) => {
        // dispatch(setUnitsLoading(false));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setShuttleDelaySortFlag(val));

    dispatch(setShuttleDelaySortValue(value));
  };
  useEffect(() => {
    if (selectedId && activeSubTab === "Delay/Holds-ShuttleDelays") {
      getAllHoldsList();
    }
  }, [shuttleDelayPageNumber, shuttleDelaySortValue, shuttleDelaySortFlag, activeSubTab]);

  const handleRowClick = (item) => {
    setSelectedRow(item.UnitShuttleDelayPK);
    setChangeColor(true);
    setSelectedShuttleDelayRecord({
      Notes: item.Notes,
    });
  };

  const [selectedShuttleDelayRecord, setSelectedShuttleDelayRecord] = useState({
    Notes: "",
  });

  const paginationProps = {
    pageNumber: shuttleDelayPageNumber,
    setPageNumber: setShuttleDelayPageNumber,
    totalPages: shuttleDelayTotalPages,
    totalElements: shuttleDelayTotalElements,
    listingData: shuttleDelayData,
  };

  return (
    <div className="p-1 ps-2">
      <Col xs={12}>
        <div className="d-flex h-100">
          <div className="w-100 border border-2 border-dark">
            <div className="fixTableHead unitSelection h-350px">
              <table className="table table-striped f-w-600">
                <thead>
                  <tr disabled>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("DelayDate", !shuttleDelaySortFlag);
                      }}
                    >
                      Delay Date
                      {shuttleDelaySortFlag && shuttleDelaySortValue === "DelayDate" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!shuttleDelaySortFlag && shuttleDelaySortValue === "DelayDate" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>

                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("ReportedBy", !shuttleDelaySortFlag);
                      }}
                    >
                      Reported By{" "}
                      {shuttleDelaySortFlag && shuttleDelaySortValue === "ReportedBy" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!shuttleDelaySortFlag && shuttleDelaySortValue === "ReportedBy" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("AuthorizedBy", !shuttleDelaySortFlag);
                      }}
                    >
                      Authorized By
                      {shuttleDelaySortFlag && shuttleDelaySortValue === "AuthorizedBy" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!shuttleDelaySortFlag && shuttleDelaySortValue === "AuthorizedBy" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("Reason", !shuttleDelaySortFlag);
                      }}
                    >
                      Reason
                      {shuttleDelaySortFlag && shuttleDelaySortValue === "Reason" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!shuttleDelaySortFlag && shuttleDelaySortValue === "Reason" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("DelayReleaseDate", !shuttleDelaySortFlag);
                      }}
                    >
                      Released Date
                      {shuttleDelaySortFlag && shuttleDelaySortValue === "DelayReleaseDate" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!shuttleDelaySortFlag && shuttleDelaySortValue === "DelayReleaseDate" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("ReleaseUser", !shuttleDelaySortFlag);
                      }}
                    >
                      Released By
                      {shuttleDelaySortFlag && shuttleDelaySortValue === "ReleaseUser" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!shuttleDelaySortFlag && shuttleDelaySortValue === "ReleaseUser" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {!loading &&
                    shuttleDelayData?.length > 0 &&
                    shuttleDelayData.map((item, index) => (
                      <tr
                        key={index}
                        onClick={() => handleRowClick(item)}
                        style={{
                          cursor: "pointer",
                          backgroundColor: selectedRow === item.UnitShuttleDelayPK ? "#cce5ff" : "white",
                          transition: "background-color 0.3s ease",
                        }}
                        className={
                          selectedRow === item.UnitShuttleDelayPK && changeColor ? "tableSelected" : ""
                        }
                      >
                        <td className="f-w-600">{customFormatDate(item.DelayDate)}</td>
                        <td className="f-w-600">{item?.ReportedBy}</td>
                        <td className="f-w-600">{item?.AuthorizedBy}</td>
                        <td className="f-w-600">{item?.Reason}</td>
                        <td className="f-w-600">{customFormatDate(item?.DelayReleaseDate)}</td>
                        <td className="f-w-600">{item?.ReleaseUser}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {loading && <LoadingText smallerFont />}
              {!loading && shuttleDelayData?.length === 0 && <NoRecordsMessage />}
            </div>
          </div>
          <PaginationComponent
            {...paginationProps}
            recordsPerPage={EditMasterUnitSelection_RecordsPerPage}
            firstPage
            lastPage
            singleArrowUp
            singleArrowDown
          />
        </div>
        <div className="mt-3">
          <Form.Group
            className={`mt-2 form-group  align-items-start  row  m-l-0 m-r-0 ms-0
      `}
          >
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label
                className="customColFormLabel"
                id="miscellaneousPickup"
                style={{ textAlign: "right", display: "block", width: "95%" }}
              >
                Notes
              </Form.Label>
            </Col>

            <Col xs={7} className="p-0 h">
              <textarea
                rows={10}
                cols={10}
                type="search"
                className="customFormControl w-100"
                disabled
                style={{
                  resize: "none",
                  display: "fixed",
                  height: "150px",
                  boxShadow: "none",
                  fontSize: "12px",
                }}
                value={selectedShuttleDelayRecord.Notes}
              />
            </Col>
          </Form.Group>
        </div>
      </Col>
    </div>
  );
}

export default ShuttleDelay;
