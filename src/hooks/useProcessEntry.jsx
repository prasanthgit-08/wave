import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { processConfigs } from "../constants/processLockConfig";
import { getCurrentCompany, getSessionId } from "../utils/utils";
const useProcessEntry = () => {
  const location = useLocation();

  const [error, setError] = useState(null);
  const [exitUrl, setExitUrl] = useState("/");

  useEffect(() => {
    const executeProcessEntry = async () => {
      try {
        const process = Object.values(processConfigs).find((config) =>
          location.pathname?.includes(config.startRoute)
        );

        const recordKey = localStorage.getItem("recordKey");
        if (!process?.startRoute || !Number(recordKey)) return;
        const userData = localStorage.getItem("loggedInUserData");
        const user = JSON.parse(userData);
        const res = await process.enter?.({
          ...process,
          processName: process.processName,
          recordKey: recordKey || 0,
          sessionId: getSessionId({ userId: user?.userPK, processName: process.processName }),
          userId: user?.userPK,
          companyName: process.companyName || getCurrentCompany()?.name,
        });

        if (res?.data?.Result?.[0]?.ErrorCode === 1) {
          setError(res?.data?.Result?.[0]?.ErrorMsg);
          setExitUrl(process?.exitUrl);
        } else {
          localStorage.setItem("sessionId", res?.data?.sessionId || null);
        }
      } catch (err) {
        console.error("Error executing process entry:", err);
      }
    };

    executeProcessEntry();
  }, [location.pathname]);

  return { error, clearError: () => setError(null), exitUrl };
};

export default useProcessEntry;
