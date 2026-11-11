import { useState, useEffect, useRef } from "react";
import Dropdown from "../header/Dropdown";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UI_Url } from "../../services/constants/applicationConstants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetAllState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { clearRouteHistory } from "../../utils/routeHistory";

const MenuItems = ({ items, depthLevel, close }) => {
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let ref = useRef();
  const lastUrlRef = useRef(null);
  let menuColor = false;

  const handleClick = (e) => {
    e.preventDefault();

    const targetUrl = UI_Url + items.url;

    if (!items.enabled || !items.url) return;
    if (lastUrlRef.current === targetUrl || location.pathname === targetUrl) {
      setDropdown(false);
      close?.();
      return;
    }

    lastUrlRef.current = targetUrl;

    dispatch(resetAllState()); // reset first
    close?.();
    localStorage.removeItem("editYardDelay");
    localStorage.removeItem("checkinDelay");
    localStorage.removeItem("urlNavigation");
    setTimeout(() => {
      clearRouteHistory();
      navigate(targetUrl); // then navigate
    }, 0);
  };

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  const onMouseLeave = () => {
    // window.innerWidth > 960 && setDropdown(false);
  };

  const menuListView = () => {
    if (items.submenu === undefined && items.url === undefined) {
      menuColor = true;
    }
    if (items.submenu !== undefined) {
      if (items.url === undefined) {
        menuColor = true;
      }
      for (var i = 0; i < items.submenu?.length; i++) {
        if (items.submenu !== undefined && items.submenu[i].url !== undefined) {
          menuColor = false;
        }
        for (var j = 0; j < items.submenu[i].submenu?.length; j++) {
          if (items.submenu[i].submenu !== undefined && items.submenu[i].submenu[j].url !== undefined) {
            menuColor = false;
          }
        }
      }
    }
  };

  menuListView();

  // Only render an href when there is a real target, otherwise "open in new tab" lands on ".../undefined"
  const hasUrl = typeof items.url === "string" && items.url.trim() !== "";
  const linkHref = hasUrl ? UI_Url + items.url : undefined;

  useEffect(() => {
    setDropdown(false);
    lastUrlRef.current = null;
  }, [location.pathname]);

  return (
    <li className="menu-items p-l-10 p-r-10" ref={ref}>
      {items.submenu ? (
        <>
          <a
            className={`linkClass d-flex align-items-center justify-content-between bl ${
              menuColor ? "temp-color-red" : ""
            } `}
            href={linkHref}
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={(e) => {
              e.preventDefault();
              setDropdown((prev) => !prev);
            }}
            title={!items.enabled ? items.title : ""}
          >
            {items.url} {items.title}{" "}
            {depthLevel > 0 ? (
              <span className={dropdown ? "animatedSvg" : ""}>
                <FontAwesomeIcon className="font-15 f-w-500" icon={faAngleDoubleRight} />
              </span>
            ) : (
              <span className="arrow" />
            )}
          </a>
          <Dropdown depthLevel={depthLevel} submenus={items.submenu} dropdown={dropdown} close={close} />
        </>
      ) : (
        <a
          className={`linkClass ${menuColor ? "temp-color-red" : ""} ${
            !items.enabled ? "disabled-link" : ""
          }`}
          onClick={handleClick}
          href={items.enabled ? linkHref : undefined}
          title={items.enabled ? items.title : "This item is disabled"}
          style={{ cursor: items.enabled ? "pointer" : "not-allowed" }}
        >
          {items.title}
        </a>
      )}
    </li>
  );
};

export default MenuItems;
