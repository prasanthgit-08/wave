import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  setCanadianCity,
  setChangeColor,
  setEditFormData,
  setId,
  setPortsOfEntryData,
  setProvence,
  setSortFlag,
  setSortValue,
  setStateCode,
  setTotalElements,
  setTotalPages,
  setUsCity,
  setViewDetail,
} from "../../../../redux/PortsOfEntrySlice";
import PortsOfEntryService from "../../../../services/PortsOfEntryService";
import LoadingIcon from "../../../common/LoadingIcon";

function PortsOfEntryListing({ loading7, setLoading7 }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [adSort] = useState(false);
  const pageNumber = useSelector((state) => state.portsOfEntryReducer.pageNumber);
  const totalPages = useSelector((state) => state.portsOfEntryReducer.totalPages);
  const totalElements = useSelector((state) => state.portsOfEntryReducer.totalElements);
  const portsOfEntryData = useSelector((state) => state.portsOfEntryReducer.portsOfEntryData);
  const searchTerm = useSelector((state) => state.portsOfEntryReducer.searchTerm);
  const selectedSearchCriteria = useSelector((state) => state.portsOfEntryReducer.selectedSearchCriteria);
  const id = useSelector((state) => state.portsOfEntryReducer.id);
  const changeColor = useSelector((state) => state.portsOfEntryReducer.changeColor);
  let sortValue = useSelector((state) => state.portsOfEntryReducer.sortValue);
  let sortFlag = useSelector((state) => state.portsOfEntryReducer.sortFlag);
  const onhandleNormalSort = (value, val) => {
    dispatch(setSortValue(value));

    dispatch(setSortFlag(val));

    sortValue = value;

    sortFlag = val;
    //fetchData();
  };
  const fetchData = () => {
    setLoading7(true);
    PortsOfEntryService.getAllPortsOfEntry(
      selectedSearchCriteria,
      searchTerm,
      pageNumber,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const { data } = response;
        setLoader(false);
        dispatch(setPortsOfEntryData(data.content));
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
      fetchData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag]);
  return (
    <div className="fixTableHead">
      {loading7 && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("usCity", !sortFlag);
                }
              }}
            >
              US City
              {sortFlag && sortValue === "usCity" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "usCity" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("canadianCity", !sortFlag);
                }
              }}
            >
              Canadian City
              {sortFlag && sortValue === "canadianCity" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "canadianCity" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("sequence", !sortFlag);
                }
              }}
            >
              Sequence
              {sortFlag && sortValue === "sequence" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "sequence" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        {
          <tbody>
            {loader
              ? null
              : portsOfEntryData.map((code) => (
                  <tr
                    id="rowId"
                    key={code.poePK}
                    onClick={(e) => dispatch(setChangeColor(false))}
                    onDoubleClick={(event) => {
                      dispatch(setUsCity(""));
                      dispatch(setStateCode(""));
                      dispatch(setCanadianCity(""));
                      dispatch(setProvence(""));
                      dispatch(setId(code.poePK));
                      dispatch(setChangeColor(true));
                      dispatch(setViewDetail(true));
                      dispatch(setEditFormData(true));
                      setTimeout(() => {
                        navigate(`/port-of-entry/${code.poePK}/${pageNumber}`);
                      }, 100);
                    }}
                    className={code.poePK === id && changeColor ? "tableSelected" : ""}
                  >
                    <td className="f-w-600">{code.usCity}</td>
                    <td className="f-w-600">{code.canadianCity}</td>
                    <td className="f-w-600">{code.sequence}</td>
                  </tr>
                ))}
          </tbody>
        }
      </table>
      {loader
        ? ""
        : !loading7 &&
          portsOfEntryData.length === 0 && (
            <h2 className="empty-list" align="center">
              {t("AlternateContact.list.empty.message")}
            </h2>
          )}
    </div>
  );
}

export default PortsOfEntryListing;
