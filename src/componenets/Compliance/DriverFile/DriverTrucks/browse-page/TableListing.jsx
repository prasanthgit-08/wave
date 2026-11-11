import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setListingData,
  setTotalPages,
  setTotalElements,
  setNormalSortValue,
  setNormalSortFlag,
  setViewDetails,
  setSelectedId,
  setChangeColor,
  setFormData,
} from "../../../../../redux/DriverTrucksSlice";
import DriverTrucksService from "../../../../../services/DriverFile/DriverTrucksService";
import LoadingIcon from "../../../../common/LoadingIcon";

const TableListing = ({ loading7, setLoading7 }) => {
  const { driverId } = useParams();
  const listingData = useSelector((state) => state.driverTrucks.listingData);
  const searchTerm = useSelector((state) => state.driverTrucks.searchTerm);
  const searchCriteria = useSelector((state) => state.driverTrucks.searchCriteria);
  const selectedStatus = useSelector((state) => state.driverTrucks.selectedStatus);
  const pageNumber = useSelector((state) => state.driverTrucks.pageNumber);
  const totalPages = useSelector((state) => state.driverTrucks.totalPages);
  const totalElements = useSelector((state) => state.driverTrucks.totalElements);
  const normalSortValue = useSelector((state) => state.driverTrucks.normalSortValue);
  const normalSortFlag = useSelector((state) => state.driverTrucks.normalSortFlag);
  const changeColor = useSelector((state) => state.driverTrucks.changeColor);
  const selectedId = useSelector((state) => state.driverTrucks.selectedId);
  const [hasLoaded, setHasLoaded] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchTableDatas = () => {
    setLoading7(true);
    DriverTrucksService.getTruckId(
      searchTerm,
      searchCriteria,
      selectedStatus,
      pageNumber,
      normalSortValue,
      normalSortFlag,
      driverId
    )
      .then((response) => {
        const { data } = response;

        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
        setLoading7(false);
        console.log(err);
      })
      .finally(() => {
        setLoading7(false);
        setHasLoaded(true);
      });
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };
  useEffect(() => {
    setLoading7(true);
    const debounceFunction = setTimeout(() => {
      fetchTableDatas();
    }, 500);
    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchCriteria, searchTerm, pageNumber, normalSortFlag, normalSortFlag, selectedStatus]);

  useEffect(() => {
    dispatch(setFormData(null));
  }, []);

  return (
    <div className="fixTableHead">
      {loading7 && <LoadingIcon />}
      <table className="table table-striped">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("description", !normalSortFlag);
              }}
            >
              Description
              {normalSortFlag && normalSortValue === "description" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("make", !normalSortFlag);
              }}
            >
              Make
              {normalSortFlag && normalSortValue === "make" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "make" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("model", !normalSortFlag);
              }}
            >
              Model
              {normalSortFlag && normalSortValue === "model" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "model" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {listingData.length >= 1 &&
            listingData.map((data) => (
              <tr
                id="rowId"
                key={data.driverTruckPK}
                onClick={() => {
                  dispatch(setSelectedId(null));
                  dispatch(setChangeColor(false));
                }}
                onDoubleClick={() => {
                  dispatch(setSelectedId(data.driverTruckPK));
                  dispatch(setChangeColor(true));

                  dispatch(setViewDetails(true));

                  setTimeout(() => {
                    navigate(`/driver-trucks/${driverId}/${data.driverTruckPK}`);
                  }, 100);
                }}
                className={`${data.driverTruckPK === selectedId && changeColor ? "tableSelected" : ""} `}
              >
                <td className="f-w-600">{data.description}</td>
                <td className="f-w-600">{data.make}</td>
                <td className="f-w-600">{data.model}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {hasLoaded && !loading7 && listingData?.length === 0 && (
        <h2 className="empty-list" align="center">
          No Records Available
        </h2>
      )}
    </div>
  );
};

export default TableListing;
