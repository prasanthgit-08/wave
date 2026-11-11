import { useDispatch, useSelector } from "react-redux";
import NoRecordsMessage from "../../../common/NoRecordsMessage";
import {
  resetDispatchSelectionFilters,
  resetOutputconfirmationScreen,
  setDispatchId,
  setDriverId,
  setNextEnabled,
  setSortType,
  setSortValue,
} from "../../../../redux/ReprintBolSlice";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function ReprintDriverSelectionListing({ loader }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const driverData = useSelector((state) => state.reprintBolReducer.driverData);
  const sortType = useSelector((state) => state.reprintBolReducer.sortType);
  const sortValue = useSelector((state) => state.reprintBolReducer.sortValue);
  const driverId = useSelector((state) => state.reprintBolReducer.driverId);
  const rePrintBOL = useSelector((state) => state.reprintBolReducer.rePrintBOL);

  useEffect(() => {
    if (!rePrintBOL) {
      navigate("/reprint-selection-screen");
    }
  }, [rePrintBOL]);

  const handleSort = (column) => {
    dispatch(setSortValue(column));
    dispatch(setSortType(sortType ? 0 : 1));
  };

  const renderDrivers =
    driverData?.length > 0 &&
    driverData?.map((i) => (
      <tr
        key={i.DriverPK}
        className={driverId === i.DriverPK ? "tableSelected" : ""}
        onClick={() => {
          if (i.DriverPK !== driverId) {
            dispatch(resetDispatchSelectionFilters());
            dispatch(resetOutputconfirmationScreen());
          }

          dispatch(setDriverId(i.DriverPK)); // 2

          dispatch(setNextEnabled(i.T_Enabled));
          dispatch(setDispatchId(i.DispatchPK));
        }}
      >
        <td>{i.FirstName}</td>
        <td>{i.LastName}</td>
        <td>{i.PhysicalCity}</td>
        <td>{i.PhysicalStateCode}</td>
      </tr>
    ));

  return (
    <div className="fixTableHead border border-2 h-100">
      <table className="table table-striped mb-0 f-w-600">
        <thead>
          <tr>
            <th onClick={() => handleSort("firstName")} className="fw-bold">
              First Name{" "}
              {sortValue === "firstName" && (
                <i
                  className={`fa ${sortType ? "fa-sort-alpha-asc" : "fa-sort-alpha-desc"} font-20 m-l-10`}
                ></i>
              )}
            </th>
            <th onClick={() => handleSort("lastName")} className="fw-bold">
              Last Name{" "}
              {sortValue === "lastName" && (
                <i
                  className={`fa ${sortType ? "fa-sort-alpha-asc" : "fa-sort-alpha-desc"} font-20 m-l-10`}
                ></i>
              )}
            </th>
            <th onClick={() => handleSort("PhysicalCity")} className="fw-bold">
              City{" "}
              {sortValue === "PhysicalCity" && (
                <i
                  className={`fa ${sortType ? "fa-sort-alpha-asc" : "fa-sort-alpha-desc"} font-20 m-l-10`}
                ></i>
              )}
            </th>
            <th onClick={() => handleSort("PhysicalStateCode")} className="fw-bold">
              State{" "}
              {sortValue === "PhysicalStateCode" && (
                <i
                  className={`fa ${sortType ? "fa-sort-alpha-asc" : "fa-sort-alpha-desc"} font-20 m-l-10`}
                ></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>{loader ? null : renderDrivers}</tbody>
      </table>
      {loader ? null : driverData?.length === 0 && <NoRecordsMessage />}
    </div>
  );
}

export default ReprintDriverSelectionListing;
