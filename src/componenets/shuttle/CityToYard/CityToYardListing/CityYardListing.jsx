import { t } from "i18next";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setChangeColor,
  setCity,
  setDescription,
  setListingData,
  setNormalSortFlag,
  setNormalSortValue,
  setSelectedId,
  setTotalElements,
  setTotalPages,
  setViewDetail,
  setEditFormData,
} from "../../../../redux/CityToYardSlice";
import CityYardService from "../../../../services/CityYardService";
import LoadingIcon from "../../../common/LoadingIcon";

const CityYardListing = ({ loading7, setLoading7 }) => {
  const searchTerm = useSelector((state) => state.cityToYardReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.cityToYardReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.cityToYardReducer.pageNumber);
  const listingData = useSelector((state) => state.cityToYardReducer.listingData);
  const selectedId = useSelector((state) => state.cityToYardReducer.selectedId);
  const viewDetail = useSelector((state) => state.cityToYardReducer.viewDetail);
  const searchDescription = useSelector((state) => state.cityToYardReducer.searchDescription);

  const searchCity = useSelector((state) => state.cityToYardReducer.searchCity);

  const showAdvanceSearch = useSelector((state) => state.cityToYardReducer.showAdvanceSearch);
  const changeColor = useSelector((state) => state.cityToYardReducer.changeColor);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adSort] = useState(false);

  const [loader, setLoader] = useState(true);

  let sortFlag = useSelector((state) => state.cityToYardReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.cityToYardReducer.normalSortValue);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;
    fetchTableData();
  };

  const fetchTableData = () => {
    setLoading7(true);

    CityYardService.getCityToYardData(
      searchTerm,
      searchCriteria,
      pageNumber,
      searchCity,
      searchDescription,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const { data } = response;
        setLoading7(false);
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading7(false);
      });
  };

  useEffect(() => {
    if (listingData != null) {
      setListingData(listingData);
    }
  }, [listingData, sortFlag, sortValue, viewDetail]);

  useEffect(() => {
    setLoading7(true);
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerm, searchCriteria, pageNumber, showAdvanceSearch, searchCity, searchDescription]);

  return (
    <div className="fixTableHead" style={{ height: "625px" }}>
      {loading7 && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr>
            <th
              className="f-w-600 col-3"

              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("city", !sortFlag);
                }
              }}
            >
              City
              {sortFlag && sortValue === "city" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "city" && <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>

            <th
              className="f-w-600 col-3"
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("description", !sortFlag);
                }
              }}
            >
              Yard
              {sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-3"
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("towableshuttlefee", !sortFlag);
                }
              }}
            >
              Towable
              {sortFlag && sortValue === "towableshuttlefee" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "towableshuttlefee" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-3"
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("motorizedshuttlefee", !sortFlag);
                }
              }}
            >
              Motorized
              {sortFlag && sortValue === "motorizedshuttlefee" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "motorizedshuttlefee" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {!loading7 &&
            listingData.length >= 1 &&
            listingData.map((data) => (
              <tr
                id="rowId"
                key={data.cityToYardShuttlePK}
                onClick={() => dispatch(setChangeColor(false))}
                onDoubleClick={() => {
                  dispatch(setSelectedId(data.cityToYardShuttlePK));
                  dispatch(setChangeColor(true));
                  dispatch(setViewDetail(true));
                  dispatch(setEditFormData(null));

                  setTimeout(() => {
                    navigate(`/city-to-yard/add/${data.cityToYardShuttlePK}/${pageNumber}`);
                  }, 100);
                }}
                className={data.cityToYardShuttlePK === selectedId && changeColor ? "tableSelected" : ""}
              >
                <td className="f-w-600">{data.city}</td>
                <td className="f-w-600">{data.description}</td>
                <td className="f-w-600">{data.towableShuttleFee.toFixed(2)}</td>
                <td className="f-w-600">{data.motorizedShuttleFee.toFixed(2)}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {loading7 ? (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      ) : (
        !loading7 &&
        listingData.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("dealers.list.empty.message")}
          </h2>
        )
      )}
    </div>
  );
};

export default CityYardListing;
