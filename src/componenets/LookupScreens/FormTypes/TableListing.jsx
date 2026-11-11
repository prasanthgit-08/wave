/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setFormTypesId,
  setTotalElements,
  setTotalPages,
  setFormTypesData,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setLoading,
} from "../../../redux/LookupScreens/FormTypesLookupSlice";
import StateService from "../../../services/StateService";
import FormTypesService from "../../../services/FormTypesService";

const TableListing = ({ renderItemId, handleLookupSelection, MaintenanceProgram, customFetchFunction }) => {
  // -----------------------------------------------------------------------
  const formTypesData = useSelector((state) => state.formTypesReducer.formTypesData);
  const changeColor = useSelector((state) => state.formTypesReducer.changeColor);
  const loading = useSelector((state) => state.formTypesReducer.loading);
  const pageNumber = useSelector((state) => state.formTypesReducer.pageNumber);
  let sortFlag = useSelector((state) => state.formTypesReducer.normalSortFlag);
  let sortValue = useSelector((state) => state.formTypesReducer.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.formTypesReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.formTypesReducer.searchTerms);
  const formId = useSelector((state) => state.formTypesReducer.formTypesId);

  const dispatch = useDispatch();

  const FetchFormTypesForMaintenance = () => {
    dispatch(setLoading(true));
    FormTypesService.getFormsTypesForLookup(
      selectedSearchCriteria,
      searchTerms,
      pageNumber,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const data = response.data;
        const formTypesList = data.content?.map((formTypes) => ({
          ...formTypes,
          description: formTypes.description?.trim(),
        }));
        dispatch(setFormTypesData(formTypesList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {})
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
    sortValue = value;
    sortFlag = val;
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      if (MaintenanceProgram) {
        FetchFormTypesForMaintenance();
      }
      if (customFetchFunction) {
        customFetchFunction();
      }
    }, 300);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumber, searchTerms, sortValue, sortFlag]);

  const renderStateListing = formTypesData.map((form) => (
    <tr
      id="rowId"
      key={renderItemId(form)}
      onClick={(event) => {
        dispatch(setFormTypesId(renderItemId(form)));
        dispatch(setChangeColor(true));
        setTimeout(() => {
          handleLookupSelection(form, event);
        }, 50);
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(form) === formId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {form.objectKey} </td>

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
                onhandleNormalSort("objectKey", !sortFlag);
              }}
            >
              Object Key
              {sortFlag && sortValue === "objectKey" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "objectKey" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
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
        {!loading && formTypesData.length !== 0 && <tbody>{renderStateListing}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        formTypesData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
