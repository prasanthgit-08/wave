import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingText from "../../../../../common/LoadingText";
import DriverCheckinHistoryService from "../../../../../../services/DriverCheckinHistoryService";
function GeneralTabList() {
  const { driverId } = useParams();
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDriverCheckinHistory = () => {
    setLoading(true);
    DriverCheckinHistoryService.getDriverCheckinHistory(0, "CheckInDate", false, driverId)
      .then((response) => {
        const { data } = response;
        setLoading(false);
        const listingData = data.filter((item) => item.Type !== "Pagination");
        const firstFive = listingData.slice(0, 5);
        setHistoryData(firstFive);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching driver check-in history:", err);
      });
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchDriverCheckinHistory();
    }, 50);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [driverId]);

  return (
    <div className="fixTableHead border border-2 h-100" style={{ overflow: "auto" }}>
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th>Date & Time</th>
            <th>Unit Number </th>
            <th>City, State</th>
            <th>Entered By User</th>
          </tr>
        </thead>

        <tbody>
          {loading
            ? null
            : historyData?.map((driverCheckinHistory) => (
                <tr id="rowId">
                  <td>
                    {driverCheckinHistory?.CheckInDate
                      ? moment(driverCheckinHistory.CheckInDate).format("MM/DD/YY HH:mm:ss")
                      : ""}
                  </td>

                  <td className="f-w-600">{driverCheckinHistory.UnitNumber}</td>

                  <td>{driverCheckinHistory.CityState}</td>
                  <td className="f-w-600">{driverCheckinHistory.EnteredByUser}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {historyData?.length === 0 && (
        <h2 className="empty-list" align="center">
          No Records Available
        </h2>
      )}
      {loading && <LoadingText />}
    </div>
  );
}

export default GeneralTabList;
