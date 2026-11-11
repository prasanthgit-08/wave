import { t } from "i18next";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setAddress1,
  setAlternatePhone,
  setChangeColor,
  setDate,
  setDispatcher,
  setDispatcherCellPhone,
  setDispatcherEmail,
  setDispatcherPhone,
  setEIN,
  setEmail,
  setFAXNumber,
  setHaulAndTow,
  setInsuranceAddress2,
  setListingData,
  setLowboy,
  setMotorized,
  setName,
  setNormalSortFlag,
  setNormalSortValue,
  setPhone,
  setPopup,
  setSelectedId,
  setTotalElements,
  setTotalPages,
  setTowaway,
  setTransportCompanyPK,
  setTruckCamper,
  setViewDetail,
  setSelectedStatus,
  setActive,
  setIsNameExist,
  setIsEinExist,
  setEditFormData,
} from "../../../redux/TransportCompaniesSlice";
import { useEffect } from "react";
import TransportCompanysService from "../../../services/TransportCompanysService";

const TableListing = ({ setLoading, loading }) => {
  const [adSort] = useState(false);
  const [loader, setLoader] = useState(true);

  const listingData = useSelector((state) => state.transportCompaniesReducer.listingData);
  const searchTerm = useSelector((state) => state.transportCompaniesReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.transportCompaniesReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.transportCompaniesReducer.pageNumber);
  const selectedId = useSelector((state) => state.transportCompaniesReducer.selectedId);
  const changeColor = useSelector((state) => state.transportCompaniesReducer.changeColor);
  const selectedStatus = useSelector((state) => state.transportCompaniesReducer.selectedStatus);
  let sortFlag = useSelector((state) => state.transportCompaniesReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.transportCompaniesReducer.normalSortValue);
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchTableDatas = () => {
    setLoader(true);
    TransportCompanysService.getTransportCompanyList(
      searchCriteria,
      searchTerm,
      pageNumber,
      sortValue,
      sortFlag,
      selectedStatus
    )
      .then((response) => {
        const { data } = response;

        setLoading(false);
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoader(false);
      });
  };
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchTableDatas();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchCriteria, searchTerm, pageNumber, sortFlag, selectedStatus]);

  useEffect(() => {
    if (listingData !== null) {
      dispatch(setListingData(listingData));
    }
  }, [listingData, pageNumber, sortFlag, selectedStatus]);

  useEffect(() => {
    dispatch(setTransportCompanyPK(null));
    dispatch(setName(""));
    dispatch(setAddress1(""));
    dispatch(setInsuranceAddress2(""));
    dispatch(setPhone(""));
    dispatch(setAlternatePhone(""));
    dispatch(setFAXNumber(""));
    dispatch(setEIN(""));
    dispatch(setEmail(""));
    dispatch(setDispatcher(""));
    dispatch(setDispatcherPhone());
    dispatch(setDispatcherCellPhone(""));
    dispatch(setDispatcherEmail(""));
    dispatch(setTowaway(false));
    dispatch(setHaulAndTow(false));
    dispatch(setLowboy(false));
    dispatch(setPopup(false));
    dispatch(setTruckCamper(false));
    dispatch(setMotorized(false));
    dispatch(setIsNameExist(false));
    dispatch(setIsEinExist(false));
  }, []);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              onClick={() => {
                onhandleNormalSort("name", !sortFlag);
              }}
              className="f-w-600"
            >
              Name
              {sortFlag && sortValue === "name" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "name" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>

        <tbody>
          {!loader &&
            listingData.length >= 1 &&
            listingData.map((data) => (
              <tr
                id="rowId"
                key={data.transportCompanyPK}
                onClick={() => dispatch(setChangeColor(false))}
                onDoubleClick={() => {
                  dispatch(setViewDetail(true));
                  dispatch(setSelectedId(data.transportCompanyPK));
                  dispatch(setChangeColor(true));
                  dispatch(setActive(data.active));
                  dispatch(setEditFormData(null));
                  setTimeout(() => {
                    navigate(`/transport-companies-view/${data.transportCompanyPK}`);
                  }, 100);
                }}
                className={`${data.transportCompanyPK === selectedId && changeColor ? "tableSelected" : ""} `}
              >
                <td className="f-w-600">{data.name}</td>
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
        listingData?.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("dealers.list.empty.message")}
          </h2>
        )
      )}
    </div>
  );
};

export default TableListing;
