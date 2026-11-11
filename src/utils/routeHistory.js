let routeHistory = [];

export const addRoute = (path) => {
  if (path === "/") {
    routeHistory = ["/"];
    return;
  }

  const lastPath = routeHistory[routeHistory.length - 1];

  // prevent duplicate same route
  if (lastPath !== path) {
    routeHistory.push(path);
  }
};

export const getPreviousRoute = () => {
  if (routeHistory.length < 2) return "/";

  // remove current route
  routeHistory.pop();

  // return previous route
  return routeHistory[routeHistory.length - 1] || "/";
};

export const clearRouteHistory = () => {
  routeHistory = [];
};

export const getRouteHistory = () => {
  return routeHistory;
};
