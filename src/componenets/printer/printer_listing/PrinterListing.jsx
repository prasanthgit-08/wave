import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  setId,
  setChangeColor,
  setSortType,
  setSortValue,
  setLoader,
} from "../../../redux/PrinterSearchFilterSlice";
import { setPrinterDatafrmDB, setViewDetail, setName } from "../../../redux/EditPrinterSlice";
import { t } from "i18next";
import LoadingText from "../../common/LoadingText";

export const PrinterListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeColor = useSelector((state) => state.printerSearchReducer.changeColor);
  const pageNumber = useSelector((state) => state.printerSearchReducer.pageNumber);
  const id = useSelector((state) => state.printerSearchReducer.id);
  const printerDataList = useSelector((state) => state.printerSearchReducer.printerDataList);
  const selectedSearchCriteria = useSelector((state) => state.printerSearchReducer.selectedSearchCriteria);
  let { sortValue, sortType } = useSelector((state) => state.printerSearchReducer);
  const searchReduxCriteria = useSelector((state) => state.printerSearchReducer.searchCriteria);
  const searchReduxTerm = useSelector((state) => state.printerSearchReducer.searchTerms);
  const loader = useSelector((state) => state.printerSearchReducer.loader);
  const [searchTerm, setFormSearchTerm] = useState(searchReduxTerm);
  const [searchFormCriteria, setSearchFormCriteria] = useState(searchReduxCriteria);

  const handleDoubleClick = (value) => {
    dispatch(setId(value));
    dispatch(setChangeColor(true));
    dispatch(setPrinterDatafrmDB(null));
    dispatch(setName(""));

    dispatch(setViewDetail(true));
    navigate("/edit-printer/" + value + "/" + pageNumber);
  };

  const onhandleNormalSort = (fieldName) => {
    dispatch(setSortValue(fieldName));
    dispatch(setSortType(!sortType));
  };

  // displaying Data as table
  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("description");
              }}
            >
              Description
              {sortValue === "description" && sortType && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue === "description" && !sortType && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10" aria-hidden="true"></i>
              )}
            </th>
            {/* <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("printerURL");
              }}
            >
              URL
              {sortValue === "printerURL" && sortType && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue === "printerURL" && !sortType && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10" aria-hidden="true"></i>
              )}
            </th> */}
          </tr>
        </thead>
        <tbody>
          {loader
            ? null
            : printerDataList?.map((printer) => (
                <tr
                  key={printer.printerPK}
                  className={id == printer.printerPK && changeColor ? "tableSelected" : ""}
                  onClick={() => {
                    dispatch(setId(printer.printerPK));
                  }}
                  onDoubleClick={() => {
                    handleDoubleClick(printer.printerPK);
                  }}
                >
                  <td>{printer.description}</td>
                  {/* <td>{printer.printerURL}</td> */}
                </tr>
              ))}
        </tbody>
      </table>

      {loader ? (
        <LoadingText />
      ) : (
        printerDataList.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("dealers.list.empty.message")}
          </h2>
        )
      )}
    </div>
  );
};

export default PrinterListing;
