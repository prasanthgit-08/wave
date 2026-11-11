/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setFormId,
  setTotalElements,
  setTotalPages,
  setFormsData,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setLoading,
} from "../../../redux/LookupScreens/FormsLookupSlice";
import FormsService from "../../../services/FormsService";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  orderEntry,
  MaintenanceProgram,
  customFetchFunction,
  FormTypeObjectKey,
}) => {
  // -----------------------------------------------------------------------
  const formsData = useSelector((state) => state.formsReducer.formsData);
  const changeColor = useSelector((state) => state.formsReducer.changeColor);
  const loading = useSelector((state) => state.formsReducer.loading);
  const pageNumber = useSelector((state) => state.formsReducer.pageNumber);
  let sortFlag = useSelector((state) => state.formsReducer.normalSortFlag);
  let sortValue = useSelector((state) => state.formsReducer.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.formsReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.formsReducer.searchTerms);
  const formId = useSelector((state) => state.formsReducer.formId);

  const dispatch = useDispatch();

  const FetchFormsForMaintenance = () => {
    dispatch(setLoading(true));
    FormsService.getFormsForLookup(
      selectedSearchCriteria,
      searchTerms,
      pageNumber,
      sortValue,
      sortFlag,
      FormTypeObjectKey
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
        FetchFormsForMaintenance();
      }
      if (customFetchFunction) {
        customFetchFunction();
      }
    }, 300);

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
        dispatch(setFormId(renderItemId(form)));
        dispatch(setChangeColor(true));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(form) === formId && changeColor ? "tableSelected" : " "}
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
        <div className="loadingStyling">LOADING...</div>
      ) : (
        formsData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
