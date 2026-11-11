import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setChangeColor,
  setChangesCancelled,
  setIsStateAndTowableUnique,
  setListingData,
  setNormalSortFlag,
  setNormalSortValue,
  setSelectedId,
  setTotalElements,
  setTotalPages,
  setViewDetail,
  setEditFormData,
  setStatePermitPK,
  setStateFK,
  setTowable,
  setMotorized,
  setEmailText,
  setPickupStateId,
  setPickupStateInput,
} from "../../../redux/StatePermitsSlice";
import StatePermitsService from "../../../services/StatePermitsService";
import LoadingIcon from "../../common/LoadingIcon";

function StatePermitsListing({ loader, setLoader }) {
  const [adSort] = useState(false);

  const listingData = useSelector((state) => state.statePermitsReducer.listingData);
  const searchTerms = useSelector((state) => state.statePermitsReducer.searchTerms);
  const searchCriteria = useSelector((state) => state.statePermitsReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.statePermitsReducer.pageNumber);
  const selectedId = useSelector((state) => state.statePermitsReducer.selectedId);
  const changeColor = useSelector((state) => state.statePermitsReducer.changeColor);
  const viewDetail = useSelector((state) => state.statePermitsReducer.viewDetail);
  const selectedStatus = useSelector((state) => state.statePermitsReducer.selectedStatus);
  let sortFlag = useSelector((state) => state.statePermitsReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.statePermitsReducer.normalSortValue);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchTableData = () => {
    setLoader(true);
    StatePermitsService.fetchstatepermits(
      searchCriteria,
      searchTerms,
      pageNumber,
      selectedStatus,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const { data } = response;
        setLoader(false);
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((error) => {
        setLoader(false);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  // Only update the sort state; the debounced effect below refetches when it changes.
  // Fetching here as well caused a duplicate API call on every sort click.
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };
  useEffect(() => {
    if (listingData != null) {
      setListingData(listingData);
    }
  }, [listingData, sortFlag, sortValue, viewDetail]);
  useEffect(() => {
    setLoader(true);
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerms, searchCriteria, pageNumber, selectedStatus, sortValue, sortFlag]);

  return (
    <div className="fixTableHead">
      {loader && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("stateCode", !sortFlag);
                }
              }}
            >
              State
              {sortFlag && sortValue === "stateCode" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "stateCode" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("motorized", !sortFlag);
                }
              }}
            >
              Motorized
              {sortFlag && sortValue === "motorized" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "motorized" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("towable", !sortFlag);
                }
              }}
            >
              Towable
              {sortFlag && sortValue === "towable" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "towable" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {!loader &&
            listingData.length >= 1 &&
            listingData.map((data) => (
              <tr
                id="rowId"
                key={data.statePermitPK}
                onClick={() => dispatch(setChangeColor(false))}
                onDoubleClick={() => {
                  dispatch(setSelectedId(data.statePermitPK));

                  // Drop the previously opened record before navigating, so the edit page's first
                  // render (and its mount effects) never see it while the new record is loading.
                  dispatch(setEditFormData(undefined));
                  dispatch(setStatePermitPK(""));
                  dispatch(setStateFK(""));
                  dispatch(setTowable(false));
                  dispatch(setMotorized(false));
                  dispatch(setEmailText(""));
                  dispatch(setPickupStateId(null));
                  dispatch(setPickupStateInput(""));

                  dispatch(setChangeColor(true));
                  dispatch(setChangesCancelled(false));
                  dispatch(setIsStateAndTowableUnique(true));
                  dispatch(setViewDetail(true));

                  setTimeout(() => {
                    navigate(`/state-permits-edit/${data.statePermitPK}/${pageNumber}`);
                  }, 100);
                }}
                className={data.statePermitPK === selectedId && changeColor ? "tableSelected" : ""}
              >
                <td className="f-w-600"> {data.stateCode} </td>
                <td className="f-w-600"> {data.motorized ? "Yes" : "No"} </td>
                <td className="f-w-600"> {data.towable ? "Yes" : "No"} </td>
              </tr>
            ))}
        </tbody>
      </table>
      {loader ? (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      ) : (
        listingData?.length === 0 &&
        !loader && (
          <h2 className="empty-list" align="center">
            {t("dealers.list.empty.message")}
          </h2>
        )
      )}
    </div>
  );
}

export default StatePermitsListing;
