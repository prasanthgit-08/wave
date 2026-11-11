import React, { useEffect } from "react";
import { t } from "i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setViewDetail,
  setTotalPages,
  setTotalElements,
  setBrowseNavigation,
  setChangeColor,
  setId,
  setYardData,
  setLoader,
  setClearValue,
  setNormalSortValue,
  setNormalSortFlag,
  setYardFormData,
  setEditYardData,
  setDealerInput,
  setDealerLookupFK,
  setUserLookupFK,
  setUserInput,
  setUserManagerFK,
  setUserManagerInput,
} from "../../../redux/YardMaintenanceSlice";
import YardService from "../../../services/YardService";
import LoadingText from "../../common/LoadingText";
import LoadingIcon from "../../common/LoadingIcon";
function YardListing({ loading7, setLoading7 }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loader = useSelector((state) => state.yardMaintenanceReducer.loader);

  const selectedSearchCriteria = useSelector((state) => state.yardMaintenanceReducer.selectedSearchCriteria);
  const selectedStatus = useSelector((state) => state.yardMaintenanceReducer.selectedStatus);
  const pageNumber = useSelector((state) => state.yardMaintenanceReducer.pageNumber);
  const yardData = useSelector((state) => state.yardMaintenanceReducer.yardData);

  const id = useSelector((state) => state.yardMaintenanceReducer.id);
  const changeColor = useSelector((state) => state.yardMaintenanceReducer.changeColor);
  const searchTerm = useSelector((state) => state.yardMaintenanceReducer.searchTerm);
  let sortFlag = useSelector((state) => state.yardMaintenanceReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.yardMaintenanceReducer.normalSortValue);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;

    //fetchYard();
  };
  const fetchYard = () => {
    setLoading7(true);
    YardService.getAllYards(
      selectedSearchCriteria,
      searchTerm,
      pageNumber,
      selectedStatus,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const data = response.data;
        dispatch(setLoader(false));
        dispatch(setYardData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setBrowseNavigation(data));
      })
      .catch((err) => {
        dispatch(setLoader(false));
        setLoading7(false);
      })
      .finally(() => {
        setLoading7(false);
      });
  };
  useEffect(() => {
    //fetchYard();
  }, [searchTerm, selectedSearchCriteria, pageNumber, selectedStatus, sortFlag, sortValue]);

  useEffect(() => {
    setLoading7(true);
    const debounceFunction = setTimeout(() => {
      fetchYard();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerm, selectedSearchCriteria, pageNumber, selectedStatus, sortFlag, sortValue]);

  return (
    <div className="fixTableHead">
      {loading7 && <LoadingIcon />}
      <table className="table table-striped ">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("description", !sortFlag);
              }}
            >
              {t("yard.list.page.table.heading")}
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
          {loader
            ? null
            : yardData.map((yard) => (
                <tr
                  id="rowId"
                  key={yard.yardPK}
                  onClick={(e) => dispatch(setChangeColor(false))}
                  onDoubleClick={(event) => {
                    dispatch(setId(yard.yardPK));
                    dispatch(setChangeColor(true));
                    dispatch(setViewDetail(true));
                    dispatch(setClearValue());
                    dispatch(setEditYardData(undefined));
                    dispatch(setDealerInput(""));
                    dispatch(setDealerLookupFK(""));
                    dispatch(setUserLookupFK(""));
                    dispatch(setUserInput(""));
                    dispatch(setUserManagerFK(""));
                    dispatch(setUserManagerInput(""));
                    setTimeout(() => {
                      navigate("/add-yard-maintenance/" + yard.yardPK + "/" + pageNumber);
                    }, 100);
                  }}
                  className={yard.yardPK === id && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600">{yard.description}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {loader
        ? ""
        : !loading7 &&
          yardData?.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
      {loader && <LoadingText />}
    </div>
  );
}

export default YardListing;
