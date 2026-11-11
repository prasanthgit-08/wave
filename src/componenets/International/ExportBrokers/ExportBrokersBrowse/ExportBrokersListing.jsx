import { t } from "i18next";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ButtonComponent from "../../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setAssignSortValue,
  setChangeColor,
  setDescription,
  setExportBrokersData,
  setId,
  setName,
  setSortFlag,
  setSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../redux/ExportBrokersSlice";
import ExportBrokersService from "../../../../services/ExportBrokersService";
import { useEffect } from "react";
import LoadingIcon from "../../../common/LoadingIcon";

function ExportBrokersListing({ loading7, setLoading7 }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adSort] = useState(false);
  const [loader, setLoader] = useState(true);
  const pageNumber = useSelector((state) => state.exportBrokersReducer.pageNumber);
  const totalPages = useSelector((state) => state.exportBrokersReducer.totalPages);
  const totalElements = useSelector((state) => state.exportBrokersReducer.totalElements);
  const exportBrokersData = useSelector((state) => state.exportBrokersReducer.exportBrokersData);
  const searchTerms = useSelector((state) => state.exportBrokersReducer.searchTerms);
  const selectedSearchCriteria = useSelector((state) => state.exportBrokersReducer.selectedSearchCriteria);
  const id = useSelector((state) => state.exportBrokersReducer.id);
  const changeColor = useSelector((state) => state.exportBrokersReducer.changeColor);
  let sortValue = useSelector((state) => state.exportBrokersReducer.sortValue);
  let sortFlag = useSelector((state) => state.exportBrokersReducer.sortFlag);
  const onhandleNormalSort = (value, val) => {
    dispatch(setSortValue(value));
    dispatch(setSortFlag(val));
    sortValue = value;
    sortFlag = val;
    //fetchData();
  };
  const fetchExportBrokersData = () => {
    setLoading7(true);
    ExportBrokersService.getAllExportBrokers(
      selectedSearchCriteria,
      searchTerms,
      pageNumber,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const { data } = response;
        setLoader(false);
        dispatch(setExportBrokersData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })

      .catch((err) => {
        setLoading7(false);
        setLoader(false);
      })
      .finally(() => {
        setLoading7(false);
      });
  };
  useEffect(() => {
    setLoading7(true);
    const debounceFunction = setTimeout(() => {
      fetchExportBrokersData();
    }, 500);
    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, searchTerms, pageNumber, sortValue, sortFlag]);

  return (
    <>
      <div className="fixTableHead">
        {loading7 && <LoadingIcon />}
        <table className="table table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                className="f-w-600"
                onClick={() => {
                  if (adSort === false) {
                    onhandleNormalSort("description", !sortFlag);
                  }
                }}
              >
                Description
                {sortFlag && sortValue === "description" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortFlag && sortValue === "description" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600"
                onClick={() => {
                  if (adSort === false) {
                    onhandleNormalSort("name", !sortFlag);
                  }
                }}
              >
                Name
                {sortFlag && sortValue === "name" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortFlag && sortValue === "name" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          {
            <tbody>
              {loader
                ? null
                : exportBrokersData.map((code) => (
                    <tr
                      id="rowId"
                      key={code.exportBrokerPK}
                      onClick={(e) => dispatch(setChangeColor(false))}
                      onDoubleClick={(event) => {
                        dispatch(setDescription(""));
                        dispatch(setName(""));
                        dispatch(setId(code.exportBrokerPK));
                        dispatch(setChangeColor(true));
                        dispatch(setViewDetail(true));
                        dispatch(setAssignSortValue(null));
                        setTimeout(() => {
                          navigate(`/export-brokers-browse/${code.exportBrokerPK}/${pageNumber}`);
                        }, 100);
                      }}
                      className={code.exportBrokerPK === id && changeColor ? "tableSelected" : ""}
                    >
                      <td className="f-w-600">{code.description}</td>
                      <td className="f-w-600">{code.name}</td>
                    </tr>
                  ))}
            </tbody>
          }
        </table>
        {loader
          ? ""
          : !loading7 &&
            exportBrokersData.length === 0 && (
              <h2 className="empty-list" align="center">
                {t("AlternateContact.list.empty.message")}
              </h2>
            )}
      </div>
    </>
  );
}

export default ExportBrokersListing;
