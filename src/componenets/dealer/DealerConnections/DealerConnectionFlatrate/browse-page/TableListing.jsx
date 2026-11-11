import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedId,
  setViewDetail,
  setNavigateToMainPage,
  setNormalSortValue,
  setNormalSortFlag,
  setCustomerPlantGroupFK,
  setCustomerPlantFK,
  setCustomerGroupFK,
  setCustomerFK,
} from "../../../../../redux/DealerFlatRateConnectionSlice";
import { useNavigate, useParams } from "react-router-dom";
import LoadingText from "../../../../common/LoadingText";
import { customerFK } from "../../../../Operations/Reports/Units/ProjectReport/ProjectReport";

const TableListing = ({ loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const dealerConnectionFK = parseInt(id);

  const selectedId = useSelector((state) => state.dealerFlatRateConnectionSReducer.selectedId);
  const listingData = useSelector((state) => state.dealerFlatRateConnectionSReducer.listingData);
  const normalSortValue = useSelector((state) => state.dealerFlatRateConnectionSReducer.normalSortValue);
  const normalSortFlag = useSelector((state) => state.dealerFlatRateConnectionSReducer.normalSortFlag);
  const customerFk = useSelector((state) => state.dealerFlatRateConnectionSReducer.customerFk);

  const handleSort = (column) => {
    dispatch(setNormalSortValue(column));
    dispatch(setNormalSortFlag(normalSortValue === column ? !normalSortFlag : true));
  };

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr>
            <th className="f-w-600 col-4" onClick={() => handleSort("WhichOne")}>
              Which One
              {normalSortValue === "WhichOne" && (
                <i
                  className={`fa font-20 m-l-10 ${normalSortFlag ? "fa-sort-alpha-asc" : "fa-sort-alpha-desc"}`}
                />
              )}
            </th>
            <th className="f-w-600 col-4" onClick={() => handleSort("Identifier")}>
              Identifier
              {normalSortValue === "Identifier" && (
                <i
                  className={`fa font-20 m-l-10 ${normalSortFlag ? "fa-sort-alpha-asc" : "fa-sort-alpha-desc"}`}
                />
              )}
            </th>
            <th className="f-w-600 col-4" onClick={() => handleSort("CustomerUnitTypeGroup")}>
              Customer Unit Type Group
              {normalSortValue === "CustomerUnitTypeGroup" && (
                <i
                  className={`fa font-20 m-l-10 ${normalSortFlag ? "fa-sort-alpha-asc" : "fa-sort-alpha-desc"}`}
                />
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {!loading && listingData?.length > 0
            ? listingData.map((row) => (
                <tr
                  key={row.DealerConnectionFlatratePK}
                  onClick={() => dispatch(setSelectedId(null))}
                  onDoubleClick={() => {
                    dispatch(setSelectedId(row.DealerConnectionFlatratePK));
                    dispatch(setViewDetail(true));
                    dispatch(setNavigateToMainPage(false));

                    dispatch(setCustomerFK(row.CustomerFK || null));

                    dispatch(setCustomerGroupFK(row.CustomerGroupFK || null));
                    dispatch(setCustomerPlantFK(row.CustomerPlantFK || null));
                    dispatch(setCustomerPlantGroupFK(row.CustomerPlantGroupFK || null));

                    setTimeout(() => {
                      navigate(
                        `/dealer-connection-flatrate-getbyid/${dealerConnectionFK}/${row.DealerConnectionFlatratePK}`
                      );
                    }, 100);
                  }}
                  className={row.DealerConnectionFlatratePK === selectedId ? "tableSelected" : ""}
                >
                  <td className="f-w-600">{row.WhichOne || ""}</td>
                  <td className="f-w-600">{row.Identifier || ""}</td>
                  <td className="f-w-600">{row.CustomerUnitTypeGroup || ""}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>

      <div className="table-message">
        {loading ? (
          <LoadingText />
        ) : !loading && listingData.length === 0 ? (
          <h2 className="empty-list" align="center">
            No Records Available
          </h2>
        ) : null}
      </div>
    </div>
  );
};

export default TableListing;
