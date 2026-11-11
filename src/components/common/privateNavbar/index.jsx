// import MenuItems from '../header/MenuItems';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MenuItems from "../../../componenets/header/MenuItems";
import { CompanyName } from "../../../constants/backendUrl.constant";
import { logout } from "../../../store/slices/userAuth.slice";

const PrivateNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  const isLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);
  const menuList = JSON.parse(localStorage.getItem("menuList"));
  const username = localStorage.getItem("username");
  const usernameInDB = localStorage.getItem("usernameInDB");
  const accessToken = localStorage.getItem("accessToken");
  const forcePasswordChange = localStorage.getItem("forcePasswordChange");

  const handleLogout = async () => {
    try {
      if (username) {
        dispatch(logout(username));
        // navigate('/auth/login');
      }
    } catch (error) {
      console.error("logout error");
    }
  };

  // Navigate to foce password change
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

  return isLoggedIn ? (
    <>
      <nav
        className={`navbar navbar-expand-sm p-0 navBardCustom justify-content-between ${
          CompanyName ? CompanyName : "bg bg-dark"
        }`}
      >
        <ul className="menus m-0">
          <li className="menu-items">
            <Link to="/">
              <i className="fa-solid fa-house" />
            </Link>
          </li>
          {menuList?.map((menu, index) => {
            const depthLevel = 0;
            return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
          })}
        </ul>
        <div
          className="p-r-15 d-flex align-items-center flex-nowrap"
          style={{ minWidth: "100px", whiteSpace: "nowrap" }}
        >
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
            {menuList.map((menu, index) => {
              const depthLevel = 0;
              return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
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

export default PrivateNavbar;
