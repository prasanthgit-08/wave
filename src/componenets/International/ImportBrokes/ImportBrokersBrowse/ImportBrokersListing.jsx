import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ImportBrokersService from "../../../../services/ImportBrokersService";
import {
  setChangeColor,
  setDescription,
  setEditFormData,
  setId,
  setImportBrokersData,
  setName,
  setSortFlag,
  setSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../redux/ImportBrokersSlice";
import LoadingIcon from "../../../common/LoadingIcon";
function ImportBrokersListing({ loading7, setLoading7 }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [adSort] = useState(false);
  const pageNumber = useSelector((state) => state.importBrokersReducer.pageNumber);
  const totalPages = useSelector((state) => state.importBrokersReducer.totalPages);
  const totalElements = useSelector((state) => state.importBrokersReducer.totalElements);
  const importBrokersData = useSelector((state) => state.importBrokersReducer.importBrokersData);
  const searchTerms = useSelector((state) => state.importBrokersReducer.searchTerms);
  const selectedSearchCriteria = useSelector((state) => state.importBrokersReducer.selectedSearchCriteria);
  const id = useSelector((state) => state.importBrokersReducer.id);
  const changeColor = useSelector((state) => state.importBrokersReducer.changeColor);
  let sortValue = useSelector((state) => state.importBrokersReducer.sortValue);
  let sortFlag = useSelector((state) => state.importBrokersReducer.sortFlag);
  const onhandleNormalSort = (value, val) => {
    dispatch(setSortValue(value));
    dispatch(setSortFlag(val));
    sortValue = value;
    sortFlag = val;
  };
  const fetchImportBrokersData = () => {
    setLoading7(true);
    ImportBrokersService.getAllImportBrokers(
      selectedSearchCriteria,
      searchTerms,
      pageNumber,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const { data } = response;
        setLoader(false);
        dispatch(setImportBrokersData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })

      .catch((err) => {
        setLoader(false);
        setLoading7(false);
      })
      .finally(() => {
        setLoading7(false);
      });
  };
  useEffect(() => {
    setLoading7(true);
    const debounceFunction = setTimeout(() => {
      fetchImportBrokersData();
    }, 500);
    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, searchTerms, pageNumber, sortValue, sortFlag]);

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
              {!sortFlag && sortValue === "name" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>
        {
          <tbody>
            {loader
              ? null
              : importBrokersData.map((code) => (
                  <tr
                    id="rowId"
                    key={code.importBrokerPK}
                    onClick={(e) => dispatch(setChangeColor(false))}
                    onDoubleClick={(event) => {
                      dispatch(setDescription(""));
                      dispatch(setName(""));
                      dispatch(setId(code.importBrokerPK));
                      dispatch(setChangeColor(true));
                      dispatch(setViewDetail(true));
                      setEditFormData(null);
                      setTimeout(() => {
                        navigate(`/import-brokers/${code.importBrokerPK}/${pageNumber}`);
                      }, 100);
                    }}
                    className={code.importBrokerPK === id && changeColor ? "tableSelected" : ""}
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
          importBrokersData.length === 0 && (
            <h2 className="empty-list" align="center">
              {t("AlternateContact.list.empty.message")}
            </h2>
          )}
    </div>
  );
}

export default ImportBrokersListing;
