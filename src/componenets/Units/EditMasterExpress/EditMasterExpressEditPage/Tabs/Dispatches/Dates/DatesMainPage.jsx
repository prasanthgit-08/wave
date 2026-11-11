import { Row } from "react-bootstrap";
import DatesTabColumn1 from "./DatesTabColumn1";
import DatesTabColumn2 from "./DatesTabColumn2";
import { useDispatch } from "react-redux";
import { setIsDatesTabValid } from "../../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function DatesMainPage({ styles }) {
  const dispatch = useDispatch();

  //States From Redux *
  const isDatesTabColumn1Valid = useSelector(
    (state) => state.editMasterExpressTabsReducer.isDatesTabColumn1Valid
  );
  const isDatesTabColumn2Valid = useSelector(
    (state) => state.editMasterExpressTabsReducer.isDatesTabColumn2Valid
  );

  //Dates Tab Validation
  useEffect(() => {
    if (isDatesTabColumn1Valid && isDatesTabColumn2Valid) {
      dispatch(setIsDatesTabValid(true));
    } else {
      dispatch(setIsDatesTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDatesTabColumn1Valid, isDatesTabColumn2Valid]);
  return (
    <div className="p-1 ps-2">
      <Row>
        <DatesTabColumn1 />
        <DatesTabColumn2 />
      </Row>
    </div>
  );
}

export default DatesMainPage;
