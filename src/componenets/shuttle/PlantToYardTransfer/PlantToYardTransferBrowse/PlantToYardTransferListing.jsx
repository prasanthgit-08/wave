import { t } from "i18next";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PlantToYardTransferService from "../../../../services/PlantToYardTransferService";
import { useEffect } from "react";
import {
  setChangeColor,
  setPlantToYardTransferPK,
  setViewDetail,
  setSort,
  setSortValue,
  setListingData,
  setTotalElements,
  setTotalPages,
  setCustomerFK,
} from "../../../../redux/PlantToYardTransfersSlice";
import LoadingIcon from "../../../common/LoadingIcon";

function PlantToYardTransferListing({ loading7, setLoading7 }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const pageNumber = useSelector((state) => state.plantToYardTransfersReducer.pageNumber);
  const listingData = useSelector((state) => state.plantToYardTransfersReducer.listingData);
  const advanceSearchTermCustomer = useSelector(
    (state) => state.plantToYardTransfersReducer.advanceSearchTermCustomer
  );
  const advanceSearchTermPlant = useSelector(
    (state) => state.plantToYardTransfersReducer.advanceSearchTermPlant
  );
  const advanceSearchTermYard = useSelector(
    (state) => state.plantToYardTransfersReducer.advanceSearchTermYard
  );
  const plantToYardTransferPK = useSelector(
    (state) => state.plantToYardTransfersReducer.plantToYardTransferPK
  );
  const changeColor = useSelector((state) => state.plantToYardTransfersReducer.changeColor);
  let sortFlag = useSelector((state) => state.plantToYardTransfersReducer.sortFlag);
  let sortValue = useSelector((state) => state.plantToYardTransfersReducer.sortValue);
  const searchCriteria = useSelector((state) => state.plantToYardTransfersReducer.searchCriteria);
  const searchTerm = useSelector((state) => state.plantToYardTransfersReducer.searchTerm);
  const viewDetail = useSelector((state) => state.plantToYardTransfersReducer.viewDetail);

  const fetchPlantToYardData = () => {
    setLoading7(true);
    PlantToYardTransferService.fetchAllPlantToYardTransfers(
      pageNumber,
      searchTerm,
      searchCriteria,
      advanceSearchTermCustomer,
      advanceSearchTermPlant,
      advanceSearchTermYard,
      sortFlag,
      sortValue
    )
      .then((response) => {
        const data = response.data;
        setLoader(true);
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
        setLoading7(false);
      })
      .finally(() => {
        setLoading7(false);
      });
  };

  useEffect(() => {
    setLoading7(true);
    const debounceFunction = setTimeout(() => {
      fetchPlantToYardData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchCriteria,
    advanceSearchTermCustomer,
    advanceSearchTermPlant,
    advanceSearchTermYard,
    pageNumber,
    searchTerm,
    sortFlag,
    sortValue,
  ]);

  const onhandleNormalSort = (value, val) => {
    dispatch(setSortValue(value));
    dispatch(setSort(val));
    sortValue = value;
    sortFlag = val;
  };

  return (
    <div className="fixTableHead">
      {loading7 && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("customerFK", !sortFlag);
              }}
            >
              Customer
              {sortFlag && sortValue === "customerFK" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "customerFK" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("customerPlantFK", !sortFlag);
              }}
            >
              Plant
              {sortFlag && sortValue === "customerPlantFK" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "customerPlantFK" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("yardFK", !sortFlag);
              }}
            >
              Yard
              {sortFlag && sortValue === "yardFK" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "yardFK" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {listingData.map((plantToYard) => (
            <tr
              id="row-id"
              key={plantToYard.plantToYardTransferPK}
              onClick={() => {
                dispatch(setChangeColor(false));
              }}
              onDoubleClick={() => {
                dispatch(setPlantToYardTransferPK(plantToYard.plantToYardTransferPK));
                dispatch(setCustomerFK(plantToYard.customerfk));
                dispatch(setChangeColor(true));
                dispatch(setViewDetail(true));
                setTimeout(() => {
                  navigate(
                    "/plant-to-yard-transfer/" +
                      plantToYard.plantToYardTransferPK +
                      "/" +
                      plantToYard.customerfk
                  );
                }, 100);
              }}
              className={
                plantToYard.plantToYardTransferPK === Number(plantToYardTransferPK) && changeColor
                  ? "tableSelected"
                  : ""
              }
            >
              <td className="f-w-600">{plantToYard.customer}</td>
              <td className="f-w-600">{plantToYard.plant}</td>
              <td className="f-w-600">{plantToYard.yard}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loader && !loading7 && listingData.length === 0 && (
        <h2 className="empty-list" align="center">
          {t("empty.list.message")}
        </h2>
      )}
    </div>
  );
}

export default PlantToYardTransferListing;
