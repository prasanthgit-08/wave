import React, { useEffect, useState } from "react";
import FormHeader from "./FormHeader";
import { Tab, Tabs } from "react-bootstrap";
import General from "./tabs/General";
import Notes from "./tabs/Notes";
import FormFooter from "./FormFooter";
import HalfScreenWrapper from "../../../../Templates/Screens/HalfScreenWrapper";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import DelayUnitCheckRequestService from "../../../../../services/DispatchDelay/DelayProcessing/DelayUnitCheckRequestService";
import {
  setDelayRequestRecord,
  setViewDetail,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayUnitCheckRequestSlice";

function DelayUnitCheckRequestFormContent() {
  const { checkRequestid, id, driverfk } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  /*****
   * Get the Delay Check Request Record
   *****/
  useEffect(() => {
    if (checkRequestid) {
      setLoader(true);
      DelayUnitCheckRequestService.fetchDelayUnitCheckRequestRecord(checkRequestid)
        .then((response) => {
          const { data } = response;
          const checkRequestData = data[0];
          dispatch(setDelayRequestRecord(checkRequestData));
          dispatch(setViewDetail(true));
          setLoader(false);
        })
        .catch((err) => {
          navigate(`/delay-unit-check-request/${driverfk}/${id}`);
          setLoader(false);
        });
    }
  }, [checkRequestid]);
  return (
    <HalfScreenWrapper>
      <FormHeader />
      <div className="p-2">
        {loader && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
        <div className="shadow-sm rounded border halfScreenFormContentHeight">
          <Tabs defaultActiveKey="general" id="uncontrolled-tab-example" className="m-b-0">
            <Tab eventKey={"general"} title={"General"}>
              <General />
            </Tab>
            <Tab eventKey={"Notes"} title={"Notes"}>
              <Notes />
            </Tab>
          </Tabs>
        </div>
      </div>
      <FormFooter />
    </HalfScreenWrapper>
  );
}

export default DelayUnitCheckRequestFormContent;
