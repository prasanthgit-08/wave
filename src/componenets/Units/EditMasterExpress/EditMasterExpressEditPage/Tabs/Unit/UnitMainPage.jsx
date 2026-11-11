import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import UnitTabColumn1 from "./UnitTabColumn1";
import UnitTabColumn2 from "./UnitTabColumn2";
import UnitTabColumn3 from "./UnitTabColumn3";
import EditMasterExpressService from "../../../../../../services/Units/EditMasterExpressService";
import {
  setSelectedUnitData,
  setIsUnitDataLoading,
  setSelectedUnitId,
  setViewDetail,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressUnitSelectionSlice";
import { setIsUnitTabValid } from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

function UnitMainPage({ styles }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const unitPK = params.id;

  //States From Redux
  const isUnitTabTabColumn1Valid = useSelector(
    (state) => state.editMasterExpressTabsReducer.isUnitTabTabColumn1Valid
  );

  const isUnitTabTabColumn2Valid = useSelector(
    (state) => state.editMasterExpressTabsReducer.isUnitTabTabColumn2Valid
  );

  const isUnitTabTabColumn3Valid = useSelector(
    (state) => state.editMasterExpressTabsReducer.isUnitTabTabColumn3Valid
  );

  //Get Selected Unit Details
  const getUnitDataById = (unitPK) => {
    dispatch(setSelectedUnitData(""));
    dispatch(setIsUnitDataLoading(true));
    EditMasterExpressService.getUnitDataById(unitPK)
      .then((response) => {
        const data = response.data;
        dispatch(setViewDetail(true));

        //data is null if the user has deletes a record .If the user press the back button , navigate to  main page
        if (data === null || data === "" || data === "undefined") {
          navigate("/edit-master-express-unit-selection");
        } else {
          dispatch(setSelectedUnitData(data));
        }
      })
      .catch((error) => {
        dispatch(setIsUnitDataLoading(false));
      })
      .finally(() => dispatch(setIsUnitDataLoading(false)));
  };

  useEffect(() => {
    if (unitPK !== null) {
      getUnitDataById(unitPK);
      dispatch(setSelectedUnitId(unitPK));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitPK]);

  /**** Tab Validation - Unit Tab ****/
  useEffect(() => {
    if (isUnitTabTabColumn1Valid && isUnitTabTabColumn2Valid && isUnitTabTabColumn3Valid) {
      dispatch(setIsUnitTabValid(true));
    } else {
      dispatch(setIsUnitTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUnitTabTabColumn1Valid, isUnitTabTabColumn2Valid, isUnitTabTabColumn3Valid]);

  return (
    <div className="p-1 ps-2">
      <Row>
        {/* 1st Column */}
        <UnitTabColumn1 styles={styles} />
        {/* 2nd Column */}
        <UnitTabColumn2 styles={styles} />
        {/* 3rd Column */}
        <UnitTabColumn3 styles={styles} />
      </Row>
    </div>
  );
}

export default UnitMainPage;
