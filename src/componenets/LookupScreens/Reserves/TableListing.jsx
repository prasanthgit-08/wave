import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChangeColor,
  setNormalSortValue,
  setReservesData,
  setSelectedId,
  setTotalElements,
  setTotalPages,
} from "../../../redux/LookupScreens/ReservesLookupSlice";
import { setNormalSortFlag } from "../../../redux/LookupScreens/ReservesLookupSlice";
import ReservesService from "../../../services/ReservesService";
import { setLoading } from "../../../redux/LookupScreens/ReservesLookupSlice";
const TableListing = ({
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
  customServiceCallback,
  driverFK,
  Driver,
  DriverReserve,
  lease,
  irp,
  eld,
  isEquipmentFlag,
  onHide,
}) => {
  const reservesData = useSelector((state) => state.reservesLookup.reservesData);
  const pageNumber = useSelector((state) => state.reservesLookup.pageNumber);
  const sortFlag = useSelector((state) => state.reservesLookup.normalSortFlag);
  const sortValue = useSelector((state) => state.reservesLookup.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.reservesLookup.selectedSearchCriteria);
  const searchTerm = useSelector((state) => state.reservesLookup.searchTerm);
  const selectedId = useSelector((state) => state.reservesLookup.selectedId);
  const loading = useSelector((state) => state.reservesLookup.loading);
  const changeColor = useSelector((state) => state.reservesLookup.changeColor);
  const dispatch = useDispatch();

  const FetchReservesForMaintenance = () => {
    dispatch(setLoading(true));
    ReservesService.getReservesForLookup(selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag)
      .then((response) => {
        const { data } = response;
        const descriptionList = data.content?.map((reserves) => ({
          ...reserves,
          description: reserves.description?.trim(),
        }));
        dispatch(setReservesData(descriptionList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => dispatch(setLoading(false)));
  };

  const customFetchCallback = (customServiceCallback) => {
    dispatch(setLoading(true));
    customServiceCallback()
      .then((response) => {
        const { data } = response;
        const descriptionList = data.content?.map((reserves) => ({
          ...reserves,
          description: reserves.description?.trim(),
        }));
        dispatch(setReservesData(descriptionList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => dispatch(setLoading(false)));
  };
  const FetchReservesForEquipment = () => {
    dispatch(setLoading(true));
    ReservesService.getReservesForLookupforEquipment(
      selectedSearchCriteria,
      searchTerm,
      pageNumber,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const { data } = response;
        dispatch(setReservesData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => dispatch(setLoading(false)));
  };

  const FetchReservesForDriverSubPrograms = () => {
    dispatch(setLoading(true));
    ReservesService.getReservesForLookup(
      selectedSearchCriteria,
      searchTerm,
      pageNumber,
      sortValue,
      sortFlag,
      lease,
      eld,
      irp
    )
      .then((response) => {
        const { data } = response;
        const descriptionList = data.content?.map((reserves) => ({
          ...reserves,
          description: reserves.description?.trim(),
        }));
        dispatch(setReservesData(descriptionList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => dispatch(setLoading(false)));
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  useEffect(() => {
    if (
      MaintenanceProgram ||
      isEquipmentFlag ||
      customServiceCallback ||
      Driver ||
      DriverReserve ||
      isEquipmentFlag
    ) {
      dispatch(setLoading(true));
    }
    const debounceFunction = setTimeout(() => {
      if (MaintenanceProgram) {
        FetchReservesForMaintenance();
      }
      if (customFetchFunction) {
        customFetchFunction();
      }
      if (customServiceCallback) {
        customFetchCallback(customServiceCallback);
      }
      if (Driver) {
        FetchReservesForDriverSubPrograms();
      }
      if (DriverReserve) {
        customFetchCallback(() =>
          ReservesService.getReservesForDriverReserveLookup(
            selectedSearchCriteria,
            searchTerm,
            pageNumber,
            sortValue,
            sortFlag,
            driverFK
          )
        );
      }

      if (isEquipmentFlag) {
        FetchReservesForEquipment();
      }
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumber, searchTerm, sortValue, sortFlag]);

  const renderReservesListingData = reservesData.map((reserves) => (
    <tr
      id="rowId"
      key={renderItemId(reserves)}
      onClick={(event) => {
        handleLookupSelection(reserves, event);
        dispatch(setChangeColor(true));
        dispatch(setSelectedId(renderItemId(reserves)));
        onHide();
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(reserves) === selectedId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {reserves.description} </td>
      <td className="f-w-600"> {reserves.type} </td>
    </tr>
  ));

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("description", !sortFlag);
              }}
            >
              Description
              {sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("reserveTypes", !sortFlag);
              }}
            >
              Reserve Types
              {sortFlag && sortValue === "reserveTypes" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "reserveTypes" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        {!loading && reservesData.length !== 0 && <tbody>{renderReservesListingData}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        reservesData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
