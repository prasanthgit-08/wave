import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  setChangeColor,
  setDeleaseCodeData,
  setEditFormData,
  setId,
  setNormalSortFlag,
  setNormalSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../../redux/DeleaseCodeSlice";
import DeleaseCodeService from "../../../../../services/DeleaseCodeService";
import LoadingText from "../../../../common/LoadingText";

const DeleaseCodeList = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adSort] = useState(false);
  const searchTerm = useSelector((state) => state.deleaseCodeReducer.searchTerm);
  const selectedSearchCriteria = useSelector((state) => state.deleaseCodeReducer.selectedSearchCriteria);
  const deleaseCodeData = useSelector((state) => state.deleaseCodeReducer.deleaseCodeData);
  const pageNumber = useSelector((state) => state.deleaseCodeReducer.pageNumber);
  const selectedStatus = useSelector((state) => state.deleaseCodeReducer.selectedStatus);

  const id = useSelector((state) => state.deleaseCodeReducer.id);
  const changeColor = useSelector((state) => state.deleaseCodeReducer.changeColor);
  let sortValue = useSelector((state) => state.deleaseCodeReducer.normalSortValue);
  let sortFlag = useSelector((state) => state.deleaseCodeReducer.normalSortFlag);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;
    // fetchDeleaseCode();
  };
  const fetchDeleaseCode = () => {
    setLoading(true);
    DeleaseCodeService.getAllDeleaseCodes(
      selectedSearchCriteria,
      searchTerm,
      pageNumber,
      sortValue,
      sortFlag,
      selectedStatus
    )
      .then((response) => {
        const { data } = response;
        setLoading(false);
        dispatch(setDeleaseCodeData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchDeleaseCode();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag, selectedStatus]);
  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("deleaseCode", !sortFlag);
                }
              }}
            >
              Code
              {sortFlag && sortValue === "deleaseCode" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "deleaseCode" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

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
          </tr>
        </thead>
        <tbody>
          {!loading &&
            deleaseCodeData?.map((code) => (
              <tr
                id="rowId"
                key={code.deleaseCodePK}
                onClick={(e) => dispatch(setChangeColor(false))}
                onDoubleClick={(event) => {
                  dispatch(setId(code.deleaseCodePK));
                  dispatch(setChangeColor(true));
                  dispatch(setViewDetail(true));
                  dispatch(setEditFormData(null));
                  setTimeout(() => {
                    navigate("/delease-code-new/" + code.deleaseCodePK + "/" + pageNumber);
                  }, 100);
                }}
                className={code.deleaseCodePK === id && changeColor ? "tableSelected" : ""}
              >
                <td className="f-w-600">{code.deleaseCode.toUpperCase()}</td>
                <td className="f-w-600">{code.description}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading ? (
        <LoadingText />
      ) : (
        deleaseCodeData.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("AlternateContact.list.empty.message")}
          </h2>
        )
      )}
    </div>
  );
};

export default DeleaseCodeList;
