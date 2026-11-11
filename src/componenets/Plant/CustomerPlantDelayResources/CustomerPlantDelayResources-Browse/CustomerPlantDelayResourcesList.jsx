import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setChangeColor,
  setEditFormData,
  setId,
  setNormalSortFlag,
  setNormalSortValue,
  setPlantDelayData,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../redux/CustomerPlantDelaySlice";
import PlantDelayResourcesService from "../../../../services/PlantDelayResourcesService";
import LoadingText from "../../../common/LoadingText";

const CustomerPlantDelayResourcesList = () => {
  const params = useParams();
  const plantId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [adSort] = useState(false);
  const searchTerm = useSelector((state) => state.customerPlantDelayReducer.searchTerm);
  const selectedSearchCriteria = useSelector(
    (state) => state.customerPlantDelayReducer.selectedSearchCriteria
  );
  const plantDelayData = useSelector((state) => state.customerPlantDelayReducer.plantDelayData);
  const pageNumber = useSelector((state) => state.customerPlantDelayReducer.pageNumber);

  const id = useSelector((state) => state.customerPlantDelayReducer.id);
  const changeColor = useSelector((state) => state.customerPlantDelayReducer.changeColor);
  const sortValue = useSelector((state) => state.customerPlantDelayReducer.normalSortValue);
  const sortFlag = useSelector((state) => state.customerPlantDelayReducer.normalSortFlag);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };
  const fetchData = () => {
    setLoader(true);
    PlantDelayResourcesService.getAllPlantDelayResources(
      selectedSearchCriteria,
      searchTerm,
      pageNumber,
      sortValue,
      sortFlag,
      plantId
    )
      .then((response) => {
        const { data } = response;
        setLoader(false);
        dispatch(setPlantDelayData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag, plantId]);
  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("description", !sortFlag);
                }
              }}
            >
              Description
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
            ? ""
            : plantDelayData.map((code) => (
                <tr
                  id="rowId"
                  key={code.customerDelayResourcePK}
                  onClick={(e) => dispatch(setChangeColor(false))}
                  onDoubleClick={(event) => {
                    dispatch(setEditFormData(null));
                    dispatch(setId(code.customerDelayResourcePK));
                    dispatch(setChangeColor(true));
                    dispatch(setViewDetail(true));
                    setTimeout(() => {
                      navigate(
                        "/customer-plant-delay-resources/" +
                          params.customerId +
                          "/" +
                          params.id +
                          "/" +
                          params.pageNumber +
                          "/" +
                          code.customerDelayResourcePK
                      );
                    }, 100);
                  }}
                  className={code.customerDelayResourcePK === id && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600">{code.description}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {loader
        ? ""
        : plantDelayData.length === 0 && (
            <h2 className="empty-list" align="center">
              {t("AlternateContact.list.empty.message")}
            </h2>
          )}
      {loader && <LoadingText />}
    </div>
  );
};

export default CustomerPlantDelayResourcesList;
