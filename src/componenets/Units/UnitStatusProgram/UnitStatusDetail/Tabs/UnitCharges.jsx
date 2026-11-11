import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { EditMasterUnitSelection_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import { Col, Form } from "react-bootstrap";
import { setPageNumber } from "../../../../../redux/CustomerPlantSearchFilterSlice";
import {
  setUnitChangesPageNumber,
  setUnitChangesSortFlag,
  setUnitChangesSortValue,
  setUnitChangesTotalElements,
  setUnitChangesTotalPages,
} from "../../../../../redux/UnitStatus/UnitStatusSlice";
import UnitStatusService from "../../../../../services/Units/UnitStatusService";
import { customFormatDate } from "../../../../../utils/validation/DateFormatUtils";
import { useParams } from "react-router-dom";
import LoadingText from "../../../../common/LoadingText";
import NoRecordsMessage from "../../../../common/NoRecordsMessage";

function UnitChanges({ data }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedRow, setSelectedRow] = useState(null);
  const [changeColor, setChangeColor] = useState(false);
  const [unitChangeslData, setUnitChangesData] = useState(data?.data || []);
  const unitChangesPageNumber = useSelector((state) => state.unitStatusReducer.unitChangesPageNumber);
  const unitChangesTotalPages = useSelector((state) => state.unitStatusReducer.unitChangesTotalPages);
  const unitChangesTotalElements = useSelector((state) => state.unitStatusReducer.unitChangesTotalElements);
  const unitChangesSortFlag = useSelector((state) => state.unitStatusReducer.unitChangesSortFlag);
  const unitChangesSortValue = useSelector((state) => state.unitStatusReducer.unitChangesSortValue);
  const selectedId = useSelector((state) => state.unitStatusReducer.selectedId);
  const activeTab = useSelector((state) => state.unitStatusReducer.activeTab);
  const [loading, setLoading] = useState(true);

  const paginationProps = {
    pageNumber: unitChangesPageNumber,
    setPageNumber: setUnitChangesPageNumber,
    totalPages: unitChangesTotalPages,
    totalElements: unitChangesTotalElements,
    listingData: unitChangeslData,
  };
  const [selectedUnitChanges, setSelectedUnitChanges] = useState({
    UnitNumberChangePK: "",
    User: "",
    OldUnitnumber: "",
    NewUnitnumber: "",
    AddDate: "",
    TextFieldBelow: "",
  });
  const onhandleNormalSort = (value, val) => {
    dispatch(setUnitChangesSortFlag(val));
    dispatch(setUnitChangesSortValue(value));
  };
  const handleRowClick = (item) => {
    setSelectedRow(item.UnitNumberChangePK);
    setChangeColor(true);
    setSelectedUnitChanges({
      UnitNumberChangePK: item.UnitNumberChangePK,
      User: item.User?.trim(),
      OldUnitnumber: item.OldUnitnumber,
      NewUnitnumber: item.NewUnitnumber,
      AddDate: item.AddDate,
      TextFieldBelow: item.TextFieldBelow,
    });
  };
  const getAllUnitNumbersList = () => {
    UnitStatusService.getUnitStatusDataForOpenBalance(
      id,
      "UnitNumberChanges",
      unitChangesPageNumber,
      7,
      unitChangesSortValue,
      unitChangesSortFlag
    )
      .then((response) => {
        const { data } = response;
        const listingData = data.filter((item) => item.Type !== "Pagination");
        const paginationData = data.find((item) => item.Type === "Pagination");

        setUnitChangesData(listingData);
        if (paginationData) {
          dispatch(setUnitChangesTotalElements(paginationData.TotalElements));
          dispatch(setUnitChangesTotalPages(paginationData.TotalPages));
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id && activeTab === "UnitNumberChanges") {
      getAllUnitNumbersList();
    }
  }, [unitChangesPageNumber, unitChangesSortFlag, unitChangesSortValue, activeTab]);
  return (
    <div className="p-1 ps-2">
      <Col xs={12}>
        <div className="d-flex h-350px mt-4" style={{ marginLeft: "50px", marginRight: "50px" }}>
          <div className="w-100 border border-2 border-dark">
            <div className="fixTableHead unitSelection">
              <table className="table table-striped f-w-600">
                <thead>
                  <tr disabled>
                    <th
                      className="f-w-600 "
                      onClick={() => {
                        onhandleNormalSort("User", !unitChangesSortFlag);
                      }}
                    >
                      User{" "}
                      {unitChangesSortFlag && unitChangesSortValue === "User" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!unitChangesSortFlag && unitChangesSortValue === "User" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>

                    <th
                      className="f-w-600 col-4"
                      onClick={() => {
                        onhandleNormalSort("OldUnitnumber", !unitChangesSortFlag);
                      }}
                    >
                      Old Number{" "}
                      {unitChangesSortFlag && unitChangesSortValue === "OldUnitnumber" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!unitChangesSortFlag && unitChangesSortValue === "OldUnitnumber" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      className="f-w-600 "
                      onClick={() => {
                        onhandleNormalSort("NewUnitnumber", !unitChangesSortFlag);
                      }}
                    >
                      New Number{" "}
                      {unitChangesSortFlag && unitChangesSortValue === "NewUnitnumber" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!unitChangesSortFlag && unitChangesSortValue === "NewUnitnumber" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      className="f-w-600 col-2"
                      onClick={() => {
                        onhandleNormalSort("AddDate", !unitChangesSortFlag);
                      }}
                    >
                      {" "}
                      Date{" "}
                      {unitChangesSortFlag && unitChangesSortValue === "AddDate" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!unitChangesSortFlag && unitChangesSortValue === "AddDate" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {!loading &&
                    unitChangeslData.length > 0 &&
                    unitChangeslData.map((item, index) => (
                      <tr
                        key={index}
                        onClick={() => handleRowClick(item)}
                        style={{ cursor: "pointer" }}
                        className={`${item.UnitNumberChangePK === selectedRow && changeColor ? "tableSelected" : ""}`}
                      >
                        <td>{item.User}</td>
                        <td>{item.OldUnitnumber}</td>
                        <td>{item.NewUnitnumber}</td>
                        <td>{customFormatDate(item.AddDate)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {loading && <LoadingText smallerFont />}
              {!loading && unitChangeslData?.length === 0 && <NoRecordsMessage />}
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
        <Form.Group
          className={`mt-5 form-group  align-items-start  row  m-l-0 m-r-0 ms-0
          `}
        >
          <Col sm={1} md={1} xs={1} className="p-0">
            <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
          </Col>

          <Col xs={8} className="p-1 h">
            <textarea
              rows={8}
              cols={8}
              type="search"
              className="customFormControl w-100"
              disabled
              style={{
                marginLeft: "120px",
                resize: "none",
                display: "fixed",
                height: "150px",
                boxShadow: "none",
                fontSize: "12px",
              }}
              value={selectedUnitChanges.TextFieldBelow}
            />
          </Col>
        </Form.Group>
      </Col>
    </div>
  );
}

export default UnitChanges;
