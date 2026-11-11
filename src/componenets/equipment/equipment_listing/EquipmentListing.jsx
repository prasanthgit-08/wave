import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setChangeColor,
  setIsPlateStateValid,
  setListingData,
  setSelectedId,
  setTotalElements,
  setTotalPages,
  setNormalSortValue,
  setNormalSortFlag,
  setReserveId,
  setReserveInput,
} from "../../../redux/EquipmentsSlice";
import EquipmentService from "../../../services/EquipmentService";

function EquipmentListing(props) {
  const { loading, setLoading } = props;
  const [loader, setLoader] = useState(true);

  const listingData = useSelector((state) => state.equipmentReducer.listingData);
  const searchTerms = useSelector((state) => state.equipmentReducer.searchTerms);
  const searchCriteria = useSelector((state) => state.equipmentReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.equipmentReducer.pageNumber);
  const selectedId = useSelector((state) => state.equipmentReducer.selectedId);
  const changeColor = useSelector((state) => state.equipmentReducer.changeColor);
  const selectedStatus = useSelector((state) => state.equipmentReducer.selectedStatus);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let sortFlag = useSelector((state) => state.equipmentReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.equipmentReducer.normalSortValue);
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;
  };

  const fetchTableData = () => {
    setLoader(true);
    EquipmentService.getEquipmentData(
      searchTerms,
      searchCriteria,
      pageNumber,
      selectedStatus,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const { data } = response;
        setLoading(false);
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

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
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("equipmentNumber", !sortFlag);
              }}
            >
              Number
              {sortFlag && sortValue === "equipmentNumber" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "equipmentNumber" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("description", !sortFlag);
              }}
            >
              Description{" "}
              {sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("serialNumber", !sortFlag);
              }}
            >
              Serial Number{" "}
              {sortFlag && sortValue === "serialNumber" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "serialNumber" && (
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
                key={data.equipmentPK}
                onClick={() => dispatch(setChangeColor(false))}
                onDoubleClick={() => {
                  dispatch(setSelectedId(data.equipmentPK));
                  dispatch(setChangeColor(true));
                  dispatch(setIsPlateStateValid(false));
                  dispatch(setReserveId(null));
                  dispatch(setReserveInput(""));
                  setTimeout(() => {
                    navigate(`/equipment-maintenance-edit/${data.equipmentPK}/${pageNumber}`);
                  }, 100);
                }}
                className={data.equipmentPK === selectedId && changeColor ? "tableSelected" : ""}
              >
                <td className="f-w-600"> {data.equipmentNumber} </td>
                <td className="f-w-600"> {data.description} </td>
                <td className="f-w-600"> {data.serialNumber} </td>
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
        listingData.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("dealers.list.empty.message")}
          </h2>
        )
      )}
    </div>
  );
}

export default EquipmentListing;
