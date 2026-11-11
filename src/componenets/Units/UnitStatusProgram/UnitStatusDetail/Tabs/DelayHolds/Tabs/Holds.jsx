import React, { useEffect, useState } from "react";
import { PaginationComponent } from "../../../../../../common/PaginationComponent";
import { EditMasterUnitSelection_RecordsPerPage } from "../../../../../../../services/constants/applicationConstants";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form } from "react-bootstrap";
import { t } from "i18next";
import UnitStatusService from "../../../../../../../services/Units/UnitStatusService";
import {
  setHoldPageNumber,
  setHoldSortFlag,
  setHoldSortValue,
  setHoldTotalElements,
  setHoldTotalPages,
} from "../../../../../../../redux/UnitStatus/UnitStatusSlice";
import { customFormatDate } from "../../../../../../../utils/validation/DateFormatUtils";
import LoadingText from "../../../../../../common/LoadingText";
import NoRecordsMessage from "../../../../../../common/NoRecordsMessage";

function Holds({ data, activeSubTab }) {
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState(null);
  const [changeColor, setChangeColor] = useState(false);
  const holdPageNumber = useSelector((state) => state.unitStatusReducer.holdPageNumber);
  const holdSortFlag = useSelector((state) => state.unitStatusReducer.holdSortFlag);

  const holdSortValue = useSelector((state) => state.unitStatusReducer.holdSortValue);

  const [unitHoldsData, setUnitHoldsData] = useState(data || []);

  const holdTotalElements = useSelector((state) => state.unitStatusReducer.holdTotalElements);
  const holdTotalPages = useSelector((state) => state.unitStatusReducer.holdTotalPages);
  const selectedId = useSelector((state) => state.unitStatusReducer.selectedId);
  const [selectedHoldRecord, setSelectedHoldRecord] = useState({
    Notes: "",
  });
  const [loading, setLoading] = useState(true);

  const getAllHoldsList = () => {
    UnitStatusService.getUnitStatusDataForHolds(
      selectedId,
      "Delay/Holds-Holds",
      holdPageNumber,
      15,
      holdSortValue,
      holdSortFlag
    )
      .then((response) => {
        const { data } = response;

        const listingData = data.filter((item) => item.Type !== "Pagination");
        const paginationData = data.find((item) => item.Type === "Pagination");
        setUnitHoldsData(listingData);

        // Dispatch pagination metadata
        if (paginationData) {
          dispatch(setHoldPageNumber(paginationData.PageNumber));
          dispatch(setHoldTotalElements(paginationData.TotalElements));
          dispatch(setHoldTotalPages(paginationData.TotalPages));
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
    dispatch(setHoldSortFlag(val));

    dispatch(setHoldSortValue(value));
  };
  useEffect(() => {
    if (selectedId && activeSubTab === "Delay/Holds-Holds") {
      getAllHoldsList();
    }
  }, [holdPageNumber, holdSortValue, holdSortFlag, activeSubTab]);

  const handleRowClick = (item) => {
    setSelectedRow(item.UnitHoldPK);
    setChangeColor(true);
    setSelectedHoldRecord({
      Notes: item.Notes,
    });
  };

  const paginationProps = {
    pageNumber: holdPageNumber,
    setPageNumber: setHoldPageNumber,
    totalPages: holdTotalPages,
    totalElements: holdTotalElements,
    listingData: unitHoldsData,
  };
  return (
    <div className="p-1 ps-2">
      <Col xs={12}>
        <div className="d-flex h-100">
          <div className="w-100 border border-2 border-dark">
            <div className="fixTableHead h-350px">
              <table className="table table-striped f-w-600">
                <thead>
                  <tr disabled>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("HoldDate", !holdSortFlag);
                      }}
                    >
                      Hold Date
                      {holdSortFlag && holdSortValue === "HoldDate" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!holdSortFlag && holdSortValue === "HoldDate" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>

                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("HoldBy", !holdSortFlag);
                      }}
                    >
                      Hold By{" "}
                      {holdSortFlag && holdSortValue === "HoldBy" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!holdSortFlag && holdSortValue === "HoldBy" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("AuthorizedBy", !holdSortFlag);
                      }}
                    >
                      Authorized By
                      {holdSortFlag && holdSortValue === "AuthorizedBy" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!holdSortFlag && holdSortValue === "AuthorizedBy" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("Reason", !holdSortFlag);
                      }}
                    >
                      Reason
                      {holdSortFlag && holdSortValue === "Reason" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!holdSortFlag && holdSortValue === "Reason" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("HoldReleaseDate", !holdSortFlag);
                      }}
                    >
                      Release Date
                      {holdSortFlag && holdSortValue === "HoldReleaseDate" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!holdSortFlag && holdSortValue === "HoldReleaseDate" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("ReleaseUser", !holdSortFlag);
                      }}
                    >
                      Released By
                      {holdSortFlag && holdSortValue === "ReleaseUser" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!holdSortFlag && holdSortValue === "ReleaseUser" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {!loading &&
                    unitHoldsData.length > 0 &&
                    unitHoldsData.map((item, index) => (
                      <tr
                        key={index}
                        onClick={() => handleRowClick(item)}
                        className={`${item.UnitHoldPK === selectedRow && changeColor ? "tableSelected" : ""}`}
                      >
                        <td className="f-w-600">{customFormatDate(item.HoldDate)}</td>
                        <td className="f-w-600">{item?.HoldBy}</td>
                        <td className="f-w-600">{item?.AuthorizedBy}</td>
                        <td className="f-w-600">{item?.Reason}</td>
                        <td className="f-w-600">{customFormatDate(item.HoldReleaseDate)}</td>
                        <td className="f-w-600">{item?.ReleaseUser}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {loading && <LoadingText smallerFont />}
              {!loading && unitHoldsData?.length === 0 && <NoRecordsMessage />}
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
              {/* <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Notes
              </Form.Label> */}
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
                value={selectedHoldRecord.Notes}
              />
            </Col>
          </Form.Group>
        </div>
      </Col>
    </div>
  );
}

export default Holds;
