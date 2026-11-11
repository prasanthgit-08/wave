// e.g. tlc_react/src/componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Reroute/useRerouteRefreshRedirect.js

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useDebouncer from "../../../../../../../../hooks/useDebouncer";

export function useRerouteRefreshRedirect() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const navigatedFromRerouteBrowse = useSelector((state) => state.rerouteReducer.navigatedFromRerouteBrowse);
  const source = localStorage.getItem("RerouteSource");

  const runInitial = useDebouncer(() => {
    if (!navigatedFromRerouteBrowse) {
      if (source === "EditMaster") {
        const unitId = localStorage.getItem("unitfk");
        if (unitId) {
          navigate(`/edit-master-express-edit-page/${unitId}/0`);
        }
      } else if (source === "Delay") {
        const driverfk = localStorage.getItem("driverId");
        const delayedUnitPK = localStorage.getItem("delayUnit");
        const companyName = localStorage.getItem("company");
        const unitId = localStorage.getItem("unitfk");
        navigate(`/delay-processing/delayed-details/${companyName}/${unitId}/${driverfk}/${delayedUnitPK}`);
      } else {
        const driverId = localStorage.getItem("driverId");
        if (driverId) {
          navigate(`/reroutes-unit-selection/${driverId}`);
        }
      }
    }
    setLoading(false);
  }, 0);

  // Run once on mount; debounce handles the “show page once, then redirect” timing
  useEffect(() => {
    runInitial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading };
}
