import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  setRegionsDataList,
  setTotalElements,
  setTotalPages,
  setLoader,
  setId,
  setSortFlag,
  setSortValue,
  setChangeColor,
} from "../../../redux/RegionsSearchFilterSlice";
import RegionsService from "../../../services/RegionsService";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import LoadingText from "../../common/LoadingText";
export const UpdatedRegionsListing = ({ loading, setLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pageNumber = useSelector((state) => state.regionsSearchReducer.pageNumber);
  const searchReduxCriteria = useSelector((state) => state.regionsSearchReducer.searchCriteria);
  const searchReduxTerm = useSelector((state) => state.regionsSearchReducer.searchTerm);
  const regionsDataList = useSelector((state) => state.regionsSearchReducer.regionsDataList);
  const RegId = useSelector((state) => state.regionsSearchReducer.id);
  let sortFlag = useSelector((state) => state.regionsSearchReducer.sortFlag);
  let sortValue = useSelector((state) => state.regionsSearchReducer.sortValue);
  const changeColor = useSelector((state) => state.regionsSearchReducer.changeColor);

  const handleDoubleClick = (id, pageNumber) => {
    dispatch(setChangeColor(true));
    dispatch(setId(id));
    setTimeout(() => {
      navigate("/add-region/" + id + "/" + pageNumber);
    }, 100);
  };
  const handleNormalSort = (val, data) => {
    dispatch(setSortValue(val));
    dispatch(setSortFlag(data));
  };
  const getRegions = () => {
    setLoading(true);
    RegionsService.getRegions(pageNumber, searchReduxTerm, searchReduxCriteria, sortValue, sortFlag)
      .then((response) => {
        const data = response.data;

        dispatch(setRegionsDataList(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoader(false));
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      getRegions();
    }, 500);

    return () => clearTimeout(debounceFunction);
  }, [pageNumber, searchReduxCriteria, searchReduxTerm, sortFlag, sortValue]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                handleNormalSort("regionCode", !sortFlag);
              }}
            >
              {t("Regions.regionCode")}
              {sortFlag && sortValue === "regionCode" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "regionCode" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                handleNormalSort("description", !sortFlag);
              }}
            >
              {t("Regions.description")}
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
            regionsDataList.map((region) => (
              <tr
                key={region.regionPK}
                className={RegId === region.regionPK && changeColor ? "tableSelected" : ""}
                onClick={() => {
                  dispatch(setChangeColor(false));
                  dispatch(setId(region.regionPK));
                }}
                onDoubleClick={() => {
                  handleDoubleClick(region.regionPK, pageNumber);
                }}
              >
                <td className="f-w-600">{region.regionCode}</td>
                <td className="f-w-600">{region.description}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {regionsDataList.length === 0 && !loading && (
        <h2 className="empty-list" align="center">
          No Records Available
        </h2>
      )}
      {loading && <LoadingText />}
    </div>
  );
};
