import { processConfigs } from "../constants/processLockConfig";

const routeProcessMap = {};

Object.entries(processConfigs).forEach(([key, config]) => {
  config.routes.forEach((route) => {
    routeProcessMap[route] = key;
  });
});

export const getProcessByRoute = (route) => {
  if (routeProcessMap[route]) {
    return routeProcessMap[route];
  }

  for (const routeKey in routeProcessMap) {
    if (route.startsWith(`${routeKey}/`)) {
      return routeProcessMap[routeKey];
    }
  }

  return null;
};

export const executeProcessExit = async (route) => {
  const processKey = getProcessByRoute(route);

  if (!processKey) return;

  const config = processConfigs[processKey];
  const sessionId = localStorage.getItem("sessionId");
  const recordKey = localStorage.getItem("recordKey");
  if (!sessionId || !Number(recordKey)) return;

  const response = await config.onExit({
    ...config,
    sessionId,
    recordKey: Number(recordKey) || 0,
    processName: config.processName,
    eventName: config.eventName,
    lockType: "",
  });
};
