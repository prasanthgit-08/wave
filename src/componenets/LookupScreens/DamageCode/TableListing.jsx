import React, { useEffect } from "react";
import {
  setFormsData,
  setTotalElements,
  setTotalPages,
  setLoading,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setId,
} from "../../../redux/LookupScreens/DamageCodeLookupSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import DelayProcessingService from "../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import { QuarterScreen_RecordsPerPage } from "../../../services/constants/applicationConstants";
import LoadingText from "../../common/LoadingText";

const TableListing = ({ renderItemId, handleLookupSelection, MaintenanceProgram, common }) => {
  const dispatch = useDispatch();
  const formsData = useSelector((state) => state.damageCodeLookup.formsData);
  const changeColor = useSelector((state) => state.damageCodeLookup.changeColor);
  const loading = useSelector((state) => state.damageCodeLookup.loading);
  const pageNumber = useSelector((state) => state.damageCodeLookup.pageNumber);
  const sortFlag = useSelector((state) => state.damageCodeLookup.normalSortFlag);
  const sortValue = useSelector((state) => state.damageCodeLookup.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.damageCodeLookup.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.damageCodeLookup.searchTerms);
  const id = useSelector((state) => state.damageCodeLookup.id);

  const fetchDamageCode = () => {
    dispatch(setLoading(true));
    DelayProcessingService.getDamageCode({
      searchTerm: searchTerms,
      searchCriteria: selectedSearchCriteria,
      pageNumber,
      type: "Lookup",
      sortType: sortFlag,
      sortValue,
      pageSize: QuarterScreen_RecordsPerPage,
    })
      .then((response) => {
        const data = response.data;
        const paginationData = data?.slice(data.length - 1);
        const browseData = data?.slice(0, data.length - 1);
        const damageCodeList = browseData?.map((damageCode) => ({
          ...damageCode,
          description: damageCode?.Description?.trim(),
        }));
        dispatch(setFormsData(damageCodeList));
        dispatch(setTotalElements(paginationData[0]?.TotalElements));
        dispatch(setTotalPages(paginationData[0]?.TotalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  useEffect(() => {
    dispatch(setLoading(true));
    const debounceFunction = setTimeout(() => {
      if (common) {
        fetchDamageCode();
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
      <td className="f-w-600"> {form.description} </td>
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
        <LoadingText />
      ) : (
        formsData.length === 0 && <div className="noRecordsSmallerFont">No Records Avaiable</div>
      )}
    </div>
  );
};

export default TableListing;
