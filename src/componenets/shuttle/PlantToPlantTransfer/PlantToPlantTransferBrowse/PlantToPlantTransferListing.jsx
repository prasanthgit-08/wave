import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  setChangeColor,
  setLoader,
  setPlantToPlantTransferData,
  setSortFieldName,
  setSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetail,
  setId,
} from "../../../../redux/PlantToPlantTransferSlice";
import PlantToPlantTransferService from "../../../../services/PlantToPlantTransferService";
import toast from "react-hot-toast";
import { t } from "i18next";
import LoadingIcon from "../../../common/LoadingIcon";

function PlantToPlantTransferListing({ loading7, setLoading7 }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { sortFieldName, sortValue } = useSelector((state) => state.plantToPlantTransferReducer);
  const {
    loader,
    plantToPlantTransferData,
    pageNumber,
    advancedSearchObject,
    searchCriteria,
    searchTerm,
    id,
    changeColor,
  } = useSelector((state) => state.plantToPlantTransferReducer);

  const onhandleNormalSort = (fieldName) => {
    dispatch(setSortFieldName(fieldName));
    dispatch(setSortValue(!sortValue));
    sortFieldName = fieldName;
    sortValue = !sortValue;
  };

  // fetching the data for listing
  const fetchPlantToPlantTransfers = () => {
    setLoading7(true);
    PlantToPlantTransferService.fetchPlantToPlantTransfers(
      pageNumber,
      advancedSearchObject,
      searchCriteria,
      searchTerm,
      sortFieldName,
      sortValue
    )
      .then((response) => {
        const data = response.data;
        dispatch(setPlantToPlantTransferData(data.content));
        dispatch(setLoader(false));
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
      fetchPlantToPlantTransfers();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCriteria, advancedSearchObject, pageNumber, searchTerm, sortFieldName, sortValue]);

  return (
    <div className="fixTableHead">
      {loading7 && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead className="plantTableHeight">
          <tr disabled>
            <th
              className="f-w-600 col-4 font-12"
              onClick={() => {
                onhandleNormalSort("customer");
              }}
            >
              {t("plantToPlantTransfers.listing.page.table.heading.customer")}
              {sortFieldName === "customer" && sortValue && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortFieldName === "customer" && !sortValue && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10" aria-hidden="true"></i>
              )}
            </th>

            <th
              className="col-4 font-12"
              onClick={() => {
                onhandleNormalSort("plantOne");
              }}
            >
              {t("plantToPlantTransfers.listing.page.table.heading.plantOne")}
              {sortFieldName === "plantOne" && sortValue && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortFieldName === "plantOne" && !sortValue && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10" aria-hidden="true"></i>
              )}
            </th>
            <th
              className="f-w-600 col-4 font-12"
              onClick={() => {
                onhandleNormalSort("plantTwo");
              }}
            >
              {t("plantToPlantTransfers.listing.page.table.heading.plantTwo")}
              {sortFieldName === "plantTwo" && sortValue && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortFieldName === "plantTwo" && !sortValue && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10" aria-hidden="true"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {plantToPlantTransferData !== [] &&
            plantToPlantTransferData.length > 0 &&
            plantToPlantTransferData.map((plantToPlantTransfer) => (
              <tr
                id="rowId"
                key={plantToPlantTransfer.plantToPlantTransfersPK}
                onClick={(e) => dispatch(setChangeColor(false))}
                onDoubleClick={(e) => {
                  dispatch(setChangeColor(true));
                  dispatch(setViewDetail(true));
                  dispatch(setId(plantToPlantTransfer.plantToPlantTransfersPK));
                  setTimeout(() => {
                    navigate("/plant-to-plant-transfer/" + plantToPlantTransfer.plantToPlantTransfersPK);
                  }, 100);
                }}
                className={
                  plantToPlantTransfer.plantToPlantTransfersPK === id && changeColor ? "tableSelected" : ""
                }
              >
                <td className="f-w-600"> {plantToPlantTransfer.customerName} </td>
                <td className="f-w-600"> {plantToPlantTransfer.customerPlant1FK.name} </td>
                <td className="f-w-600"> {plantToPlantTransfer.customerPlant2FK.name} </td>
              </tr>
            ))}
        </tbody>
      </table>
      {!loader && !loading7 && plantToPlantTransferData.length === 0 && (
        <h2 className="empty-list" align="center">
          {t("empty.list.message")}
        </h2>
      )}
    </div>
  );
}

export default PlantToPlantTransferListing;
