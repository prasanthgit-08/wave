import MenuItems from "../header/MenuItems";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { CompanyName } from "../../services/constants/applicationConstants";
import AuthService from "../../services/AuthService";
import { logoutUser } from "../../redux/AuthSlice";
import { handleSessionClear } from "../../utils/authUtils";
import Loading from "../../components/common/loading";
import PlantReleaseService from "../../services/PlantReleaseService";
import { addRoute } from "../../utils/routeHistory";
import packageJson from "../../../package.json";
import { executeProcessExit } from "../../utils/processExitManager";

const flowRoutes = [
  "/plant-release-selection-screen",
  "/plant-release-option-screen",
  "/plant-release-multibrowse-screen",
  "/plant-release-single-screen",
  "/plant-release-dealy-screen",
  "/plant-release-importlist-screen",
  "/plant-release-test-result-screen",
];

const Navbar = () => {
  const [apiLoading, setApiLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mailTriggered, setMailTriggered] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoggedInNew = useSelector((state) => state.userAuth.isLoggedIn); // new redux state
  const loading = useSelector((state) => state.userAuth.loading);
  const menuList = JSON.parse(localStorage.getItem("menuList"));
  const username = localStorage.getItem("username");
  const usernameInDB = localStorage.getItem("usernameInDB");
  const accessToken = localStorage.getItem("accessToken");
  const forcePasswordChange = localStorage.getItem("forcePasswordChange");
  const plantReleaseExit = localStorage.getItem("plantReleaseExit");
  const releasedUnitIds = localStorage.getItem("releasedUnitIds") || "";

  const planReleaseMail = async () => {
    if (mailTriggered) return;
    setMailTriggered(true);

    try {
      await PlantReleaseService.generateBolAndSendEmail(releasedUnitIds);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      localStorage.removeItem("releasedUnitIds");
      localStorage.removeItem("plantReleaseExit");

      setMailTriggered(false); // reset for future reuse
    }
  };

  // Navigate to foce password change

  const handleLogout = async () => {
    try {
      if (!username) return;
      if (loading || apiLoading) return;
      setMobileMenu(false);

      setApiLoading(true);

      if (plantReleaseExit === "true" && releasedUnitIds) {
        await planReleaseMail();
      }

      // Release current process lock
      await executeProcessExit(location.pathname);

      await AuthService.logout(username);

      toast.success("Logout Successful!");
      dispatch(logoutUser());
      handleSessionClear();

      navigate("/login"); //  happens AFTER everything
    } catch (error) {
      console.error("logout error", error);
    } finally {
      setApiLoading(false);
    }
  };

  useEffect(() => {
    if (forcePasswordChange == "true") {
      navigate("/auth/force-password-change");
    }
  }, [forcePasswordChange]);

  // Automatically logout the user after token expires
  useEffect(() => {
    const checkTokenExpiry = () => {
      const refreshTokenExpiryMinutes = parseInt(localStorage.getItem("refreshTokenExpiry"), 10);
      const tokenSetTime = parseInt(localStorage.getItem("tokenSetTime"), 10);
      const currentTime = Date.now();

      const refreshTokenExpiryMs = refreshTokenExpiryMinutes * 60 * 1000;
      const expiryTime = tokenSetTime + refreshTokenExpiryMs;

      if (!accessToken || currentTime > expiryTime) {
        handleLogout();
      }
    };

    // Initial check on component mount
    // checkTokenExpiry();

    // Set interval to check token expiry every minute
    const interval = setInterval(checkTokenExpiry, 60000); // Check every 1 minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [accessToken]);

  useEffect(() => {
    const isInFlow = flowRoutes.includes(location.pathname);

    if (
      plantReleaseExit === "true" &&
      releasedUnitIds &&
      !isInFlow &&
      !mailTriggered // prevents duplicate
    ) {
      planReleaseMail();
    }
  }, [location.pathname, plantReleaseExit, mailTriggered]);

  useEffect(() => {
    addRoute(location.pathname);
  }, [location.pathname]);

  return isLoggedIn && isLoggedInNew ? (
    <>
      {(loading || apiLoading) && <Loading />}
      <nav
        className={`navbar navbar-expand-sm p-0 navBardCustom justify-content-between ${
          CompanyName ? CompanyName : "bg bg-dark"
        }`}
      >
        <ul className="menus m-0">
          <li className="menu-items">
            <Link to="/">
              {/* Home */}
              <i className="fa-solid fa-house" />
            </Link>
          </li>
          {menuList?.map((menu, index) => {
            const depthLevel = 0;

            if (!menu.enabled) {
              menu.submenu = undefined;
            }
            return (
              <MenuItems
                items={menu}
                key={index}
                depthLevel={depthLevel}
                close={() => setMobileMenu(false)}
              />
            );
          })}
        </ul>
        <div
          className="p-r-15 d-flex align-items-center flex-nowrap"
          style={{ minWidth: "100px", whiteSpace: "nowrap" }}
        >
          <label className="text-white m-r-10 font-12 text-wrap d-inline-block">
            {"v" + packageJson.version?.split("-")[0]}
          </label>
          <label className="text-white m-r-10 font-12">{usernameInDB}</label>
          <button className="btn btn-light btn-small-width font-12 logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className={`mobileNav p-2 ${CompanyName ? CompanyName : "bg bg-dark"}`}>
        <div className="d-flex">
          <div className="me-3">
            <Link to="/">
              {/* Home */}
              <i className="fa-solid text-white fa-house" />
            </Link>
          </div>
          <div
            onClick={() => {
              setMobileMenu(!mobileMenu);
            }}
          >
            <i className="fa-solid text-white fa-bars"></i>
          </div>
        </div>
        {mobileMenu && (
          <ul className="mobilemenu menus bg-dark m-0">
            {menuList?.map((menu, index) => {
              const depthLevel = 0;

              if (!menu.enabled) {
                menu.submenu = undefined;
              }

              return (
                <MenuItems
                  items={menu}
                  key={index}
                  depthLevel={depthLevel}
                  close={() => setMobileMenu(false)}
                />
              );
            })}
            <li className="p-2">
              <div className="p-r-15 text-end">
                <button className="btn btn-light btn-small-width font-12 logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </li>
          </ul>
        )}
      </div>
    </>
  ) : null;
};

export default Navbar;
