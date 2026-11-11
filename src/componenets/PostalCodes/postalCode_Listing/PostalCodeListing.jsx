import { t } from "i18next";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowAdvanceSort } from "../../../redux/DealerSearchFilterSlice";
import {
  setChangeColor,
  setEditFormData,
  setListingData,
  setLoader,
  setNormalSortFlag,
  setNormalSortValue,
  setSearchedPostalCode,
  setSearchedPostalCodeUpdate,
  setSelectedId,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../redux/PostalCodeSlice";
import PostalCodeService from "../../../services/PostalCodeService";
import { setBrowseNavigation } from "../../../redux/PaginationSlice";
import LoadingText from "../../common/LoadingText";

const PostalCodeListing = ({ loading, setLoading }) => {
  const [postalCodeListingData, setPostalCodeListingData] = useState([]);

  const searchedPostalCode = useSelector((state) => state.postalCodeReducer.searchedPostalCode);

  const dispatch = useDispatch();
  const [adSort] = useState(false);

  const pageNumber = useSelector((state) => state.postalCodeReducer.pageNumber);
  const advanceSortingOrder = useSelector((state) => state.postalCodeReducer.advanceSortingOrder);
  const showAdvanceSort = useSelector((state) => state.postalCodeReducer.showAdvanceSort);

  const viewDetail = useSelector((state) => state.postalCodeReducer.viewDetail);

  const selectedStatus = useSelector((state) => state.postalCodeReducer.selectedStatus);
  const listingData = useSelector((state) => state.postalCodeReducer.listingData);

  const searchCriteria = useSelector((state) => state.postalCodeReducer.searchCriteria);

  const searchTerms = useSelector((state) => state.postalCodeReducer.searchTerms);

  const changeColor = useSelector((state) => state.postalCodeReducer.changeColor);

  const navigate = useNavigate();

  const selectedId = useSelector((state) => state.postalCodeReducer.selectedId);

  const city = useSelector((state) => state.postalCodeReducer.city);
  const showAdvanceSearch = useSelector((state) => state.postalCodeReducer.showAdvanceSearch);

  const stateCode = useSelector((state) => state.postalCodeReducer.stateCode);
  const postalCode = useSelector((state) => state.postalCodeReducer.postalCode);
  const searchedPostalCodeUpdate = useSelector((state) => state.postalCodeReducer.searchedPostalCodeUpdate);
  const loader = useSelector((state) => state.postalCodeReducer.loader);

  let sortFlag = useSelector((state) => state.postalCodeReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.postalCodeReducer.normalSortValue);

  useEffect(() => {
    if (listingData != null) {
      setPostalCodeListingData(listingData);
    }
  }, [listingData, sortFlag, sortValue, viewDetail]);

  const fetchPostalCodes = async () => {
    setLoading(true);
    dispatch(setLoader(true));
    PostalCodeService.getPostalCodes(
      searchTerms,
      searchCriteria,
      pageNumber,
      searchedPostalCodeUpdate,
      advanceSortingOrder,
      selectedStatus,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const data = response.data;
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((error) => {
        console.error("Error fetching postal codes:", error);
      })
      .finally(() => {
        setLoading(false);
        dispatch(setLoader(false));
      });
  };
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;

    fetchPostalCodes();
  };

  useEffect(() => {
    if (!showAdvanceSearch) {
      dispatch(setSearchedPostalCodeUpdate(null));
    }
  }, [showAdvanceSearch]);

  useEffect(() => {
    setLoading(true);
    dispatch(setLoader(true));
    const debounceFunction = setTimeout(() => {
      fetchPostalCodes();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    searchTerms,
    searchCriteria,
    pageNumber,
    searchedPostalCodeUpdate,
    advanceSortingOrder,
    showAdvanceSort,
    selectedStatus,
    postalCode,
    city,
    stateCode,
    showAdvanceSearch,
  ]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                if (showAdvanceSort !== true)
                  if (adSort === false) {
                    onhandleNormalSort("postalCode", !sortFlag);
                  }
              }}
            >
              Postal Code
              {showAdvanceSort !== true && sortFlag && sortValue === "postalCode" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "postalCode" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                if (showAdvanceSort !== true)
                  if (adSort === false) {
                    onhandleNormalSort("city", !sortFlag);
                  }
              }}
            >
              {t("dealers.list.page.table.heading.city")}

              {showAdvanceSort !== true && sortFlag && sortValue === "city" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "city" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                if (showAdvanceSort !== true)
                  if (adSort === false) {
                    onhandleNormalSort("stateCode", !sortFlag);
                  }
              }}
            >
              {t("dealers.list.page.table.heading.state")}
              {showAdvanceSort !== true && sortFlag && sortValue === "stateCode" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "stateCode" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th className="f-w-600">{t("edit.dealer.page.general.tab.canadian")}</th>
          </tr>
        </thead>

        <tbody>
          {!loading &&
            listingData.map((data) => (
              <tr
                id="rowId"
                key={data.postalCodePK}
                onClick={() => dispatch(setChangeColor(false))}
                onDoubleClick={() => {
                  dispatch(setSelectedId(data.postalCodePK));
                  dispatch(setChangeColor(true));
                  dispatch(setViewDetail(true));
                  dispatch(setEditFormData(null));

                  setTimeout(() => {
                    navigate(`/postalcode-add/${data.postalCodePK}/${pageNumber}`);
                  }, 100);
                }}
                className={data.postalCodePK === selectedId && changeColor ? "tableSelected" : ""}
              >
                <td className="f-w-600"> {data.postalCode} </td>
                <td className="f-w-600"> {data.city} </td>
                <td className="f-w-600"> {data.stateCode.toUpperCase()} </td>
                <td className="f-w-600"> {data.canadian ? "Yes" : "No"} </td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading ? (
        <LoadingText />
      ) : (
        !loading &&
        listingData?.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("dealers.list.empty.message")}
          </h2>
        )
      )}
    </div>
  );
};

export default PostalCodeListing;
