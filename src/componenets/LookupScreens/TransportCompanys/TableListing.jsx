/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import StateService from "../../../services/StateService";

import {
  setTransportCompanysData,
  setTotalElements,
  setTotalPages,
  setLoading,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setTransportCompanysId,
} from "../../../redux/LookupScreens/TransportCompanysLookupSlice";
import TransportCompanysService from "../../../services/TransportCompanysService";

const TableListing = ({ renderItemId, handleLookupSelection, MaintenanceProgram }) => {
  // -----------------------------------------------------------------------
  const transportCompanysData = useSelector(
    (state) => state.transPortCompanysLookupReducer.transportCompanysData
  );
  const changeColor = useSelector((state) => state.transPortCompanysLookupReducer.changeColor);
  const loading = useSelector((state) => state.transPortCompanysLookupReducer.loading);
  const pageNumber = useSelector((state) => state.transPortCompanysLookupReducer.pageNumber);
  let sortFlag = useSelector((state) => state.transPortCompanysLookupReducer.normalSortFlag);
  let sortValue = useSelector((state) => state.transPortCompanysLookupReducer.normalSortValue);
  const selectedSearchCriteria = useSelector(
    (state) => state.transPortCompanysLookupReducer.selectedSearchCriteria
  );
  const searchTerms = useSelector((state) => state.transPortCompanysLookupReducer.searchTerms);
  const transportCompanysId = useSelector(
    (state) => state.transPortCompanysLookupReducer.transportCompanysId
  );

  const dispatch = useDispatch();

  const FetchTransortCompanysForMaintenance = () => {
    TransportCompanysService.getTransportCompanyForLookup(
      selectedSearchCriteria,
      searchTerms,
      pageNumber,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const data = response.data;
        const transportCompanyList = data.content?.map((data) => ({ ...data, name: data.name?.trim() }));
        dispatch(setTransportCompanysData(transportCompanyList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
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
        FetchTransortCompanysForMaintenance();
      }
    }, 300);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumber, searchTerms, sortValue, sortFlag]);

  const renderStateListing = transportCompanysData.map((data) => (
    <tr
      id="rowId"
      key={renderItemId(data)}
      onClick={(event) => {
        handleLookupSelection(data, event);
        dispatch(setTransportCompanysId(renderItemId(data)));
        dispatch(setChangeColor(true));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(data) === transportCompanysId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {data.name} </td>
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
                onhandleNormalSort("name", !sortFlag);
              }}
            >
              Name
              {sortFlag && sortValue === "name" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "name" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>
        {!loading && transportCompanysData.length !== 0 && <tbody>{renderStateListing}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        transportCompanysData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
