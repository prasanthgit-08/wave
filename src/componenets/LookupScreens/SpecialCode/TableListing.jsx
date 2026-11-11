/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedId,
  setTotalElements,
  setTotalPages,
  setSpecialCodeData,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setLoading,
} from "../../../redux/LookupScreens/SpecialCodeLookupSlice";
import SpecialCodesService from "../../../services/SpecialCodesService";
import UnitActivationService from "../../../services/UnitActivationService";
import LoadingIcon from "../../common/LoadingIcon";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  OrderEntry,
  MaintenanceProgram,
  customFetchFunction,
  UnitActivation,
  UndispatchedListing,
  yardInventory,
}) => {
  // -----------------------------------------------------------------------
  const specialCodeData = useSelector((state) => state.specialCodeLookup.specialCodeData);
  const changeColor = useSelector((state) => state.specialCodeLookup.changeColor);
  const loading = useSelector((state) => state.specialCodeLookup.loading);
  const pageNumberSpecialCodeLookup = useSelector(
    (state) => state.specialCodeLookup.pageNumberSpecialCodeLookup
  );
  const sortFlag = useSelector((state) => state.specialCodeLookup.normalSortFlag);
  const sortValue = useSelector((state) => state.specialCodeLookup.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.specialCodeLookup.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.specialCodeLookup.searchTerms);
  const selectedId = useSelector((state) => state.specialCodeLookup.selectedId);

  const dispatch = useDispatch();

  const getSpecialCodedetailsForMaintenance = () => {
    dispatch(setLoading(true));
    SpecialCodesService.getAllSpecialCodesForLookup(
      pageNumberSpecialCodeLookup,
      selectedSearchCriteria,
      searchTerms,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const data = response.data;
        const trimmedList = data.content?.map((specialCode) => ({
          ...specialCode,
          description: specialCode.description?.trim(),
        }));
        dispatch(setSpecialCodeData(trimmedList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setChangeColor(true));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally((err) => {
        dispatch(setLoading(false));
      });
  };

  const getSpecialCodedetailsForUnitActivation = () => {
    dispatch(setLoading(true));
    UnitActivationService.getAllSpecialCodesForLookup(
      pageNumberSpecialCodeLookup,
      selectedSearchCriteria,
      searchTerms,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const data = response.data;
        const trimmedList = data.content?.map((specialCode) => ({
          ...specialCode,
          description: specialCode.description?.trim(),
        }));
        dispatch(setSpecialCodeData(trimmedList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setChangeColor(true));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally((err) => {
        dispatch(setLoading(false));
      });
  };

  const getUndispatchedListingSpecialCode = () => {
    dispatch(setLoading(true));
    UnitActivationService.getUndispatchedSpecialCodesForLookup(
      pageNumberSpecialCodeLookup,
      selectedSearchCriteria,
      searchTerms,
      sortValue,
      sortFlag,
      12,
      "Lookup"
    )
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setSpecialCodeData(listingData));
        dispatch(setTotalElements(paginationData[0].TotalElements));
        dispatch(setTotalPages(paginationData[0].TotalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const getYardInventorySpecialCode = () => {
    dispatch(setLoading(true));
    UnitActivationService.getyardInventorySpecialCodesForLookup({
      pageNumberSpecialCodeLookup,
      selectedSearchCriteria,
      searchTerms,
      sortValue,
      sortFlag,
      pageSize: 12,
      resultType: 1,
    })
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setSpecialCodeData(listingData));
        dispatch(setTotalElements(paginationData[0].TotalElements));
        dispatch(setTotalPages(paginationData[0].TotalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      // Fetch Special Codes for MP
      if (MaintenanceProgram) {
        getSpecialCodedetailsForMaintenance();
      }

      // Fetch Yards using Optional Custom Fetch Function
      if (customFetchFunction) {
        customFetchFunction();
      }
      // UnitActivation
      if (UnitActivation) {
        getSpecialCodedetailsForUnitActivation();
      }
      //UndispatchedListing Report
      if (UndispatchedListing) {
        getUndispatchedListingSpecialCode();
      }
      if (yardInventory) {
        getYardInventorySpecialCode();
      }
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumberSpecialCodeLookup, searchTerms, sortValue, sortFlag]);

  const renderSpecialCodeListing = specialCodeData?.map((codes) => (
    <tr
      id="rowId"
      key={renderItemId(codes)}
      onClick={(event) => {
        handleLookupSelection(codes, event);
        dispatch(setSelectedId(renderItemId(codes)));
        dispatch(setChangeColor(true));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(codes) === selectedId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {codes.code || codes.Code} </td>
      <td className="f-w-600"> {codes.description || codes.Description || codes.SpecialCodeDescription} </td>
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
                onhandleNormalSort("code", !sortFlag);
              }}
            >
              Code
              {sortFlag && sortValue === "code" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "code" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
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
          </tr>
        </thead>
        {!loading && specialCodeData?.length !== 0 && <tbody>{renderSpecialCodeListing}</tbody>}
      </table>
      {loading ? (
        <LoadingIcon />
      ) : (
        (!specialCodeData || specialCodeData?.length === 0) && (
          <div className="noRecordsSmallerFont">No Records Available</div>
        )
      )}
    </div>
  );
};

export default TableListing;
