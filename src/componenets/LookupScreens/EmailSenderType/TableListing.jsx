/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setEmailSenderTypeId,
  setTotalElements,
  setTotalPages,
  setEmailSenderTypeData,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setLoading,
} from "../../../redux/LookupScreens/EmailSenderTypesLookupSlice";
import EmailSenderTypesService from "../../../services/EmailSenderTypesService";

const TableListing = ({ renderItemId, handleLookupSelection, MaintenanceProgram }) => {
  // -----------------------------------------------------------------------
  const emailSenderTypeData = useSelector((state) => state.EmailSenderTypesLookupReducer.emailSenderTypeData);
  const changeColor = useSelector((state) => state.EmailSenderTypesLookupReducer.changeColor);
  const loading = useSelector((state) => state.EmailSenderTypesLookupReducer.loading);
  const pageNumber = useSelector((state) => state.EmailSenderTypesLookupReducer.pageNumber);
  let sortFlag = useSelector((state) => state.EmailSenderTypesLookupReducer.normalSortFlag);
  let sortValue = useSelector((state) => state.EmailSenderTypesLookupReducer.normalSortValue);
  const searchCriteria = useSelector((state) => state.EmailSenderTypesLookupReducer.selectedSearchCriteria);
  const searchTerm = useSelector((state) => state.EmailSenderTypesLookupReducer.searchTerms);
  const emailSenderTypeId = useSelector((state) => state.EmailSenderTypesLookupReducer.emailSenderTypeId);

  const dispatch = useDispatch();

  const FetchEmailSenderTypesForMaintenance = () => {
    EmailSenderTypesService.getAll(searchTerm, searchCriteria, pageNumber, sortValue, sortFlag)
      .then((response) => {
        const { data } = response;
        dispatch(setLoading(false));
        dispatch(setEmailSenderTypeData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
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
        FetchEmailSenderTypesForMaintenance();
      }
    }, 300);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchCriteria, pageNumber, searchTerm, sortValue, sortFlag]);

  const renderStateListing = emailSenderTypeData.map((senderType) => (
    <tr
      id="rowId"
      key={renderItemId(senderType)}
      onClick={(event) => {
        handleLookupSelection(senderType, event);
        dispatch(setEmailSenderTypeId(renderItemId(senderType)));
        dispatch(setChangeColor(true));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(senderType) === emailSenderTypeId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {senderType.description} </td>
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
        {!loading && emailSenderTypeData.length !== 0 && <tbody>{renderStateListing}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        emailSenderTypeData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
