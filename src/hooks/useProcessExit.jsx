import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { executeProcessExit, getProcessByRoute } from "../utils/processExitManager";

const useProcessExit = () => {
  const location = useLocation();

  const previousPath = useRef(location.pathname);

  useEffect(() => {
    const previousProcess = getProcessByRoute(previousPath.current);

    const currentProcess = getProcessByRoute(location.pathname);

    if (previousProcess && previousProcess !== currentProcess) {
      executeProcessExit(previousPath.current);
    }

    previousPath.current = location.pathname;
  }, [location.pathname]);
};

export default useProcessExit;
