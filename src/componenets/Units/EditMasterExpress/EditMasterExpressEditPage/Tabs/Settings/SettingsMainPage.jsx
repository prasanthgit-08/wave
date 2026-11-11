import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row } from "react-bootstrap";
import SettingsTabColumn1 from "./SettingsTabColumn1";
import SettingsTabColumn2 from "./SettingsTabColumn2";
import SettingsTabColumn3 from "./SettingsTabColumn3";
import SettingsTabColumn4 from "./SettingsTabColumn4";
import { setIsSettingsTabValid } from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

const SettingsMainPage = ({ styles }) => {
  const dispatch = useDispatch();
  const isSettingsTabColumn3Valid = useSelector(
    (state) => state.editMasterExpressTabsReducer.isSettingsTabColumn3Valid
  );
  const isSettingsTabColumn4Valid = useSelector(
    (state) => state.editMasterExpressTabsReducer.isSettingsTabColumn4Valid
  );

  useEffect(() => {
    if (isSettingsTabColumn3Valid && isSettingsTabColumn4Valid) {
      dispatch(setIsSettingsTabValid(true));
    } else {
      dispatch(setIsSettingsTabValid(false));
    }
    // eslint-disable-next-line
  }, [isSettingsTabColumn3Valid, isSettingsTabColumn4Valid]);

  return (
    <div className="p-1 ps-2">
      <Row>
        {/* Column -1 */}
        <SettingsTabColumn1 styles={styles} />
        {/* Column -2 */}
        <SettingsTabColumn2 styles={styles} />
        {/* Column -3 */}
        <SettingsTabColumn3 styles={styles} />
        {/* Column -4 */}
        <SettingsTabColumn4 styles={styles} />
      </Row>
    </div>
  );
};

export default SettingsMainPage;
