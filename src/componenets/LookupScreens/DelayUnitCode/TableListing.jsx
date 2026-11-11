import React, { useEffect, useState } from "react";
import {
  setFormsData,
  setTotalElements,
  setTotalPages,
  setLoading,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setId,
} from "../../../redux/LookupScreens/DealyUnitCodeLookupSlice";
import DelayUnitCodesService from "../../../services/DelayUnitCodesService";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import DelayProcessingService from "../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import BreakdownProcessingService from "../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";
import { useParams } from "react-router-dom";
import DelayDamageService from "../../../services/DispatchDelay/DelayProcessing/DelayDamageService";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  status,
  BreakdownProgram,
  weather,
  roadType,
  roadCondition,
  customServiceCallback,
  fetchFunction,
  renderCol1,
}) => {
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState("");
  const formsData = useSelector((state) => state.delayCodeUnitLookupReducer.formsData);
  const changeColor = useSelector((state) => state.delayCodeUnitLookupReducer.changeColor);
  const loading = useSelector((state) => state.delayCodeUnitLookupReducer.loading);
  const pageNumber = useSelector((state) => state.delayCodeUnitLookupReducer.pageNumber);
  let sortFlag = useSelector((state) => state.delayCodeUnitLookupReducer.normalSortFlag);
  let sortValue = useSelector((state) => state.delayCodeUnitLookupReducer.normalSortValue);
  const selectedSearchCriteria = useSelector(
    (state) => state.delayCodeUnitLookupReducer.selectedSearchCriteria
  );
  const searchTerms = useSelector((state) => state.delayCodeUnitLookupReducer.searchTerms);
  const id = useSelector((state) => state.delayCodeUnitLookupReducer.id);
  const filterActive = useSelector((state) => state.delayCodeUnitLookupReducer.filterActive);

  const { companyName } = useParams();

  const fetchUnitDelayCode = () => {
    dispatch(setLoading(true));
    DelayProcessingService.getDelayUnitCodesForlookup(
      searchTerms,
      selectedSearchCriteria,
      pageNumber,
      sortValue,
      sortFlag,
      status,
      companyName
    )
      .then((response) => {
        const data = response.data;
        const formList = data.content?.map((forms) => ({
          ...forms,
          description: forms.description?.trim(),
        }));
        dispatch(setFormsData(formList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => dispatch(setLoading(false)));
  };

  const getType = () => {
    if (weather) {
      return "Weather";
    } else if (roadType) {
      return "RoadType";
    } else if (roadCondition) {
      return "RoadCondition";
    }
  };

  /*****Used for Delay Damages Claims Tab */
  const fetchUnitCodesForClaims = (flag) => {
    dispatch(setLoading(true));
    DelayDamageService.getdelayUnitCodeForAutoComplete(
      searchTerms,
      pageNumber,
      11,
      selectedSearchCriteria,
      sortValue,
      sortFlag,
      getType()
    )
      .then((response) => {
        const data = response.data;
        const formList = data.response.DelayedCodeList?.map((forms) => ({
          ...forms,
          description: forms.Description?.trim(),
        }));
        dispatch(setFormsData(formList));
        const pagination = data.response.PageDetails[0]; // Get only the last item (or empty array if data is empty)
        dispatch(setTotalElements(pagination.TotalElements));
        dispatch(setTotalPages(pagination.TotalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => dispatch(setLoading(false)));
  };

  const fetchUnitBreakdownCode = () => {
    dispatch(setLoading(true));
    BreakdownProcessingService.getBreakdownUnitCodesForAutoComplete(
      searchTerms,
      selectedSearchCriteria,
      pageNumber,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const data = response.data;
        const formList = data.content?.map((forms) => ({
          ...forms,
          description: forms.description?.trim(),
        }));
        dispatch(setFormsData(formList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => dispatch(setLoading(false)));
  };
  /*****Used for Delay ,Breakdown,Damage  Program */
  const customFetchCallback = (customServiceCallback) => {
    customServiceCallback()
      .then((response) => {
        const data = response.data;
        const listingData = data.filter((item) => item.Type !== "Pagination");
        const paginationData = data.find((item) => item.Type === "Pagination");

        dispatch(setFormsData(listingData));

        if (paginationData) {
          dispatch(setTotalElements(paginationData.TotalElements || 0));
          dispatch(setTotalPages(paginationData.TotalPages || 0));
        }
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
    sortValue = value;
    sortFlag = val;

    // Hanle Optional Custom Fetch Function
  };

  const fetchCallbackForSP = (fetchFunction) => {
    dispatch(setLoading(true));
    fetchFunction({
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      pageNumber: pageNumber,
      sortValue,
      sortType: sortFlag,
    })
      .then((response) => {
        const { data } = response;
        const paginationData = data?.find((item) => item?.Type === "Pagination");
        const filteredList = data?.filter((item) => item?.Type !== "Pagination");
        dispatch(setFormsData(filteredList || []));
        dispatch(setTotalElements(paginationData.TotalElements || 0));
        dispatch(setTotalPages(paginationData.TotalPages || 0));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      })
      .finally(() => dispatch(setLoading(false)));
  };

  useEffect(() => {
    if (MaintenanceProgram || weather || roadType || roadCondition || BreakdownProgram) {
      dispatch(setLoading(true));
    }
    const debounceFunction = setTimeout(() => {
      if (MaintenanceProgram) {
        fetchUnitDelayCode();
      } else if (weather || roadType || roadCondition) {
        fetchUnitCodesForClaims(filterType);
      } else if (BreakdownProgram) {
        fetchUnitBreakdownCode();
      }
      if (customServiceCallback) {
        customFetchCallback(customServiceCallback);
      }

      if (fetchFunction) {
        fetchCallbackForSP(fetchFunction);
      }
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumber, searchTerms, sortValue, sortFlag]);

  const renderStateListing = formsData.map((form) => (
    <tr
      id="rowId"
      key={renderItemId(form)}
      onClick={(event) => {
        handleLookupSelection(form, event);
        dispatch(setId(renderItemId(form)));
        dispatch(setChangeColor(true));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(form) === id && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {(renderCol1 && renderCol1(form)) || form.description} </td>
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
          </tr>
        </thead>
        {!loading && formsData.length !== 0 && <tbody>{renderStateListing}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        formsData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
