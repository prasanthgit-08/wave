import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import { useNavigate, useParams } from "react-router-dom";

import DelayDamageService from "../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";

import {
  setDamageData,
  setChangeColor,
  setId,
  setNormalSortFlag,
  setNormalSortValue,
  setTotalElements,
  setTotalPages,
  setDocumentsData,
  setDocumentTotalElements,
  setDocuemntTotalPages,
  setDamageBrowseLoading,
} from "../../../../redux/DispatchDelay/DamageProcessing/DamageSlice";
import LoadingText from "../../../common/LoadingText";
import { formatDate } from "../../../../utils/dateUtils";
import { setReserveBondFundFK } from "../../../../redux/DispatchDelay/DelayProcessing/DelayUnitCheckRequestSlice";
import useDebouncer from "../../../../hooks/useDebouncer";

const TableListingDamage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companyName, driverfk, unitfk, delayedUnitPK } = useParams();
  const [loader, setLoader] = useState(true);

  // Redux selectors
  const pageNumber = useSelector((state) => state.damageReducer.pageNumber);
  const searchTerm = useSelector((state) => state.damageReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.damageReducer.searchCriteria);
  const damageData = useSelector((state) => state.damageReducer.damageData);
  const normalSortValue = useSelector((state) => state.damageReducer.normalSortValue);
  const normalSortFlag = useSelector((state) => state.damageReducer.normalSortFlag);
  const changeColor = useSelector((state) => state.damageReducer.changeColor);
  const id = useSelector((state) => state.damageReducer.id);

  const handleDoubleClick = (value) => {
    dispatch(setId(value));
    dispatch(setChangeColor(true));
    navigate(`/damage-processing/view-damage/${value}`);
    localStorage.setItem("damageCompanyName", companyName);
    localStorage.setItem("damageDriverFK", driverfk);
    localStorage.setItem("damageUnitFK", unitfk);
    localStorage.setItem("delayedUnitFK", delayedUnitPK);
    dispatch(setDocumentsData([]));
    dispatch(setReserveBondFundFK(null));
    dispatch(setDocumentTotalElements(0));
    dispatch(setDocuemntTotalPages(0));
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  const fetchTableData = () => {
    const payload = {
      pageNumber,
      pageSize: 12,
      sortValue: normalSortValue || "",
      sortType: normalSortFlag,
      searchCriteria,
      searchTerm,
      delayedUnitFK: delayedUnitPK,
      companyName: companyName,
    };

    DelayDamageService.getDelayDamageBrowse(payload)
      .then((response) => {
        if (response && response?.data) {
          const damageDetails = response?.data?.response?.damageDetails?.filter(
            (item) => "DelayedUnitDamagePK" in item
          );
          const paginationData = response?.data?.response?.pagination?.find(
            (item) => "TotalElements" in item
          );

          const uniqueDamageDetails = damageDetails?.filter(
            (record, index, self) =>
              index ===
              self?.findIndex(
                (r) =>
                  r?.DelayedUnitDamagePK === record?.DelayedUnitDamagePK &&
                  r?.AddDate === record?.AddDate &&
                  r?.Description?.trim() === record?.Description?.trim() &&
                  r?.ClaimNumber?.trim() === record?.ClaimNumber?.trim()
              )
          );
          dispatch(setDamageData(uniqueDamageDetails));
          dispatch(setTotalElements(paginationData?.TotalElements));
          dispatch(setTotalPages(paginationData?.TotalPages));
        }
        setLoader(false);
        dispatch(setDamageBrowseLoading(false));
      })
      .catch((err) => {
        console.error("Error fetching damage data:", err);
        setLoader(false);
        dispatch(setDamageBrowseLoading(false));
      });
  };
  const debounceFetchTableData = useDebouncer(fetchTableData, 500);
  useEffect(() => {
    debounceFetchTableData();
  }, [searchCriteria, searchTerm, pageNumber, normalSortValue, normalSortFlag, companyName]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr>
            <th onClick={() => onhandleNormalSort("Adddate", !normalSortFlag)} className="f-w-600 col-3">
              Date
              {normalSortFlag && normalSortValue === "Adddate" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "Adddate" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th onClick={() => onhandleNormalSort("Description", !normalSortFlag)} className="f-w-600 col-3">
              Damage Code
              {normalSortFlag && normalSortValue === "Description" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "Description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th onClick={() => onhandleNormalSort("claimNumber", !normalSortFlag)} className="f-w-600 col-3">
              Claim Number
              {normalSortFlag && normalSortValue === "claimNumber" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "claimNumber" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {loader
            ? null
            : damageData?.length > 0 &&
              damageData?.map((record) => (
                <tr
                  key={record?.DelayedUnitDamagePK}
                  className={record?.DelayedUnitDamagePK === id && changeColor ? "tableSelected" : ""}
                  onClick={(e) => dispatch(setChangeColor(false))}
                  onDoubleClick={() => handleDoubleClick(record.DelayedUnitDamagePK)}
                >
                  <td>{formatDate(record?.AddDate)}</td>
                  <td>{record?.Description}</td>
                  <td>{record?.ClaimNumber}</td>
                </tr>
              ))}
        </tbody>
      </table>

      {loader
        ? ""
        : damageData?.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
      {loader && <LoadingText />}
    </div>
  );
};

export default TableListingDamage;
