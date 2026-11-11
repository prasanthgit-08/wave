import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UsersService from "../../../../../../../../services/UsersService";
import { setShowOverrideModal, setUnitDatesFlag } from "../../../../../../../../redux/DispatchesSlice";
import { PermissionKeyGeneratorUtil } from "../../../../../../../../utils/PermissionKeyGeneratorUtil";

function POESelctionFooter() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOverrideScreen, setIsOverrideScreen] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const selectedPOE = useSelector((state) => state.dispatchesReducer.selectedPOE);
  const disablePOEContinue = useSelector((state) => state.dispatchesReducer.disablePOEContinue);

  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const overridePermission = PermissionKeyGeneratorUtil("DISP", "PEOR");

  const handleOverrideOnClick = () => {
    if (hasPermission) {
      navigate("/driver-dispatch/port-of-entry-override");
    } else {
      dispatch(setShowOverrideModal(true));
    }
  };

  const handleContinue = () => {
    dispatch(setUnitDatesFlag(true));
    navigate("/single-unit-confirmation");
    setIsOverrideScreen(false);
  };

  useEffect(() => {
    if (window.location.pathname === "/driver-dispatch/port-of-entry-override") {
      setIsOverrideScreen(true);
    } else {
      setIsOverrideScreen(false);
    }
  });

  useEffect(() => {
    if (deniedPermissions) {
      setHasPermission(!deniedPermissions.includes(overridePermission));
    }
  }, []);

  return (
    <div className="text-center border border-dark border-top-0 border-2 p-2 ">
      <div className="d-flex  align-items-center justify-content-end  flex-wrap">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={() => {
              handleOverrideOnClick();
            }}
            hidden={isOverrideScreen}
          >
            Override
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={handleContinue}
            disabled={!selectedPOE || disablePOEContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default POESelctionFooter;
