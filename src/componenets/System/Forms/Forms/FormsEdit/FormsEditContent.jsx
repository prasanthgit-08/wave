import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Basic from "./FormsEditTabs/Basic";
import Detail from "./FormsEditTabs/Detail";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTab, setResponseData, setViewDetail } from "../../../../../redux/FormsSlice";
import { useNavigate, useParams } from "react-router-dom";
import FormsService from "../../../../../services/FormsService";
import LoadingIcon from "../../../../common/LoadingIcon";

function FormsEditContent() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, pageNumber } = useParams();

  const viewDetail = useSelector((state) => state.forms.viewDetail);
  const isBasicTabValid = useSelector((state) => state.forms.isBasicTabValid);
  const isDetailTabValid = useSelector((state) => state.forms.isDetailTabValid);
  const changesCancelled = useSelector((state) => state.forms.changesCancelled);

  const handleTabSelection = (key) => {
    dispatch(setCurrentTab(key));
  };

  const getRecord = (id) => {
    setLoading(true);
    FormsService.getRecord(id)
      .then((res) => {
        const data = res.data;
        dispatch(setResponseData(data));
        dispatch(setViewDetail(true));
      })
      .catch((err) => {
        navigate(`/forms-maintenance`);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (id) getRecord(id);
  }, [id, changesCancelled]);

  useEffect(() => {
    if (id) dispatch(setViewDetail(true));
  }, []);

  return (
    <div className="p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border threeFourthScreenFormContentHeight" /* m-t-10 m-b-10 */>
        <Tabs
          defaultActiveKey="basic"
          id="uncontrolled-tab-example"
          className="m-b-2"
          onSelect={handleTabSelection}
        >
          <Tab
            tabClassName={!viewDetail ? (isBasicTabValid ? "color-green" : "color-red") : ""}
            eventKey="basic"
            title={"Basic"}
          >
            <Basic />
          </Tab>
          <Tab
            tabClassName={!viewDetail ? (isDetailTabValid ? "" : "color-red") : ""}
            eventKey="detail"
            title={"Detail"}
          >
            <Detail />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default FormsEditContent;
