import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setViewDetail,
  setChangeColor,
  setId,
  setNormalSortValue,
  setNormalSortFlag,
  setShuttleCitysData,
  setSearchCriteria,
  setSearchTerm,
  setTotalElements,
  setTotalPages,
  setBrowseNavigation,
  setLoader,
  resetChanges,
} from "../../../../redux/ShuttleCitysSlice";
import ShuttleCitysService from "../../../../services/ShuttleCitysService";
import LoadingIcon from "../../../common/LoadingIcon";

const ShuttleCitysListing = ({ loading7, setLoading7 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  //const loader = useSelector((state) => state.shuttleCitysReducer.loader);
  const searchTerm = useSelector((state) => state.shuttleCitysReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.shuttleCitysReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.shuttleCitysReducer.pageNumber);
  const shuttleCitysData = useSelector((state) => state.shuttleCitysReducer.shuttleCitysData);
  const id = useSelector((state) => state.shuttleCitysReducer.id);
  const changeColor = useSelector((state) => state.shuttleCitysReducer.changeColor);
  let sortFlag = useSelector((state) => state.shuttleCitysReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.shuttleCitysReducer.normalSortValue);
  // Only update the sort state; the debounced effect below refetches when it changes.
  // Fetching here as well caused a duplicate API call on every sort click.
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  const fetchShuttleCitys = () => {
    setLoading7(true);
    ShuttleCitysService.getShuttleCitys(searchCriteria, searchTerm, pageNumber, sortValue, sortFlag)
      .then((response) => {
        const data = response.data;
        setLoader(false);
        dispatch(setShuttleCitysData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setBrowseNavigation(data));
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
      fetchShuttleCitys();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerm, searchCriteria, pageNumber, sortValue, sortFlag]);

  return (
    <div className="fixTableHead">
      {loading7 && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("city", !sortFlag);
              }}
            >
              City
              {sortFlag && sortValue === "city" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "city" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>
        <tbody>
          {loader
            ? null
            : shuttleCitysData.map((data) => (
                <tr
                  id="rowId"
                  key={data.shuttleCityPK}
                  onClick={(e) => dispatch(setChangeColor(false))}
                  onDoubleClick={(event) => {
                    dispatch(setId(data.shuttleCityPK));
                    dispatch(setChangeColor(true));
                    dispatch(resetChanges());
                    setTimeout(() => {
                      navigate("/add-shuttle-citys/" + data.shuttleCityPK + "/" + pageNumber);
                    }, 100);
                  }}
                  className={data.shuttleCityPK === id && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600">{data.city}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {loader
        ? ""
        : shuttleCitysData.length === 0 &&
          !loading7 && (
            <h2 className="empty-list" align="center">
              {t("ShuttleCitys.list.empty.message")}
            </h2>
          )}
    </div>
  );
};

export default ShuttleCitysListing;
