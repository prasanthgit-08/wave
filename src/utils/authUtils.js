export const handleSessionClear = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("usernameInDB");
  localStorage.removeItem("forcePasswordChange");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessTokenExpiry");
  localStorage.removeItem("refreshTokenExpiry");
  localStorage.removeItem("tokenExpiryTime");
  localStorage.removeItem("menuList");
  localStorage.setItem("logout", Date.now());
  localStorage.removeItem("tokenSetTime");
  localStorage.removeItem("loggedInUserData");
  localStorage.removeItem("currentCompany");
  localStorage.removeItem("deniedPermissions");
  localStorage.removeItem("enums");
};
