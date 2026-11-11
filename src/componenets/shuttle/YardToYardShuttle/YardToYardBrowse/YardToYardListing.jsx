import React, { useEffect } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import YardToYardShuttleService from "../../../../services/YardToYardShuttleService";
import { toast } from "react-hot-toast";
import {
  setChangeColor,
  setYardToYardShuttlePK,
  setViewDetail,
  setSortValue,
  setSort,
  setLoader,
  setListingData,
  setTotalElements,
  setTotalPages,
} from "../../../../redux/YardToYardShuttleSlice";
import LoadingIcon from "../../../common/LoadingIcon";

function YardToYardListing({ loading7, setLoading7 }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { sort, sortValue } = useSelector((state) => state.yardToYardShuttleReducer);

  const {
    yardToYardShuttlePK,
    loader,
    listingData,
    changeColor,
    pageNumber,
    searchTerm,
    searchCriteria,
    advanceSearchTermOne,
    advanceSearchTermTwo,
  } = useSelector((state) => state.yardToYardShuttleReducer);

  const onhandleNormalSort = (fieldName) => {
    if (sortValue === fieldName) {
      sort = !sort;
      dispatch(setSort(sort));
    } else {
      sortValue = fieldName;
      sort = true;
      dispatch(setSortValue(fieldName));
      dispatch(setSort(true));
    }
  };

  /**
   * This function is used to call the service which returns the list off all the active yards.
   */
  const fetchYardToYardShuttle = () => {
    setLoading7(true);
    YardToYardShuttleService.fetchall(
      pageNumber,
      searchTerm,
      searchCriteria,
      sort,
      sortValue,
      advanceSearchTermOne,
      advanceSearchTermTwo
    )
      .then((response) => {
        const data = response.data;
        dispatch(setLoader(false));
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((error) => {
        console.error(error.response.data.errorMsg || "Error at listing data");
        toast.error(error.response.data.errorMsg || "Error at listing data");
        setLoading7(false);
      })
      .finally(() => {
        setLoading7(false);
      });
  };

  useEffect(() => {
    setLoading7(true);
    const debounceFunction = setTimeout(() => {
      dispatch(setLoader(true));
      fetchYardToYardShuttle();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCriteria, advanceSearchTermOne, advanceSearchTermTwo, pageNumber, searchTerm, sort, sortValue]);

  return (
    <div>
      <div className="fixTableHead">
        {loading7 && <LoadingIcon />}
        <table className="table table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                className="f-w-600 col-6"
                onClick={() => {
                  onhandleNormalSort("pickUpYardFK");
                }}
              >
                {t("YardTOYardShuttle.list.page.table.heading.yardOne")}
                {sort && sortValue === "pickUpYardFK" && (
                  <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sort && sortValue === "pickUpYardFK" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10" aria-hidden="true"></i>
                )}
              </th>
              <th
                className="f-w-600 col-6"
                onClick={() => {
                  onhandleNormalSort("dropOffYardFK");
                }}
              >
                {t("YardTOYardShuttle.list.page.table.heading.yardTwo")}
                {sort && sortValue === "dropOffYardFK" && (
                  <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sort && sortValue === "dropOffYardFK" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10" aria-hidden="true"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {listingData !== [] &&
              listingData.length > 0 &&
              listingData.map((yardToYardShuttle) => (
                <tr
                  id="rowId"
                  key={yardToYardShuttle.yardToYardShuttlesPK}
                  onClick={(e) => dispatch(setChangeColor(false))}
                  onDoubleClick={() => {
                    dispatch(setChangeColor(true));
                    dispatch(setViewDetail(true));
                    dispatch(setYardToYardShuttlePK(yardToYardShuttle.yardToYardShuttlesPK));
                    setTimeout(() => {
                      navigate("/yard-to-yard-shuttle/" + yardToYardShuttle.yardToYardShuttlesPK);
                    }, 100);
                  }}
                  className={
                    yardToYardShuttle.yardToYardShuttlesPK === Number(yardToYardShuttlePK) && changeColor
                      ? "tableSelected"
                      : ""
                  }
                >
                  <td className="f-w-600 col-6">{yardToYardShuttle.pickUpYard}</td>
                  <td className="f-w-600 col-6">{yardToYardShuttle.dropOffYard}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {!loading7 && !loader && listingData.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("empty.list.message")}
          </h2>
        )}
      </div>
    </div>
  );
}

export default YardToYardListing;
