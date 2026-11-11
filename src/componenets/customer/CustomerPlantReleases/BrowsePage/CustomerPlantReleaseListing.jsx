import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setBrowseLoading,
  setChangeColor,
  setEditFormData,
  setId,
  setPlantReleaseColumnList,
  setPlantReleasesData,
  setSortType,
  setSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../redux/CustomerPlantReleasesSlice";
import { t } from "i18next";
import LoadingIcon from "../../../common/LoadingIcon";
import CustomerPlantReleaseService from "../../../../services/CustomerPlantReleaseService";

const CustomerPlantReleaseListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [adSort] = useState(false);
  const pageNumber = useSelector((state) => state.customerPlantReleaseReducer.pageNumber);
  const plantReleaseData = useSelector((state) => state.customerPlantReleaseReducer.plantReleasesData);
  const searchTerm = useSelector((state) => state.customerPlantReleaseReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.customerPlantReleaseReducer.searchCriteria);
  const id = useSelector((state) => state.customerPlantReleaseReducer.id);
  const changeColor = useSelector((state) => state.customerPlantReleaseReducer.changeColor);
  const browseLoading = useSelector((state) => state.customerPlantReleaseReducer.browseLoading);
  let sortValue = useSelector((state) => state.customerPlantReleaseReducer.sortValue);
  let sortType = useSelector((state) => state.customerPlantReleaseReducer.sortType);

  const onhandleNormalSort = (value, val) => {
    dispatch(setSortValue(value));
    dispatch(setSortType(val));
    sortValue = value;
    sortType = val;
  };

  const fetchData = () => {
    dispatch(setBrowseLoading(true));
    CustomerPlantReleaseService.getAllCustomerPlantReleases(
      searchCriteria,
      searchTerm,
      pageNumber,
      sortValue,
      sortType
    )
      .then((response) => {
        const data = response?.data;
        const listingData = data?.slice(0, data?.length - 1);
        const paginationData = data?.slice(data?.length - 1);
        dispatch(setPlantReleasesData(listingData));
        dispatch(setTotalElements(paginationData[0].TotalElements));
        dispatch(setTotalPages(paginationData[0].TotalPages));
      })
      .catch((err) => {
        dispatch(setBrowseLoading(false));
      })
      .finally(() => {
        dispatch(setBrowseLoading(false));
      });
  };

  useEffect(() => {
    dispatch(setBrowseLoading(true));
    const debounceFunction = setTimeout(() => {
      fetchData();
    }, 400);
    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchCriteria, searchTerm, pageNumber, sortValue, sortType]);

  return (
    <div className="fixTableHead">
      {browseLoading && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("description", !sortType);
                }
              }}
            >
              Description
              {sortType && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        {
          <tbody>
            {browseLoading
              ? null
              : plantReleaseData?.map((code) => (
                  <tr
                    id="rowId"
                    key={code.CustomerPlantReleasePK}
                    onClick={(e) => dispatch(setChangeColor(false))}
                    onDoubleClick={(event) => {
                      dispatch(setEditFormData(null));
                      dispatch(setPlantReleaseColumnList({ actionType: "clear" }));
                      dispatch(setId(code.CustomerPlantReleasePK));
                      dispatch(setChangeColor(true));
                      dispatch(setViewDetail(true));
                      setTimeout(() => {
                        navigate(`${code.CustomerPlantReleasePK}`);
                      }, 100);
                    }}
                    className={code.CustomerPlantReleasePK === id && changeColor ? "tableSelected" : ""}
                  >
                    <td className="f-w-600">{code.Description}</td>
                  </tr>
                ))}
          </tbody>
        }
      </table>
      {!browseLoading && plantReleaseData?.length === 0 && (
        <h2 className="empty-list" align="center">
          {t("AlternateContact.list.empty.message")}
        </h2>
      )}
    </div>
  );
};

export default CustomerPlantReleaseListing;
