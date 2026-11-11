import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import General from "./tabs/General";
import Compliance from "./tabs/Compliance";
import Maintenance from "./tabs/Maintenance";
import Lease from "./tabs/Lease";
import { useDispatch, useSelector } from "react-redux";
import DriverTrailersService from "../../../../../services/DriverFile/DriverTrailersService";
import { useNavigate, useParams } from "react-router-dom";
import { setFormData, setIsTabIdentify, setViewDetail } from "../../../../../redux/DriverTrailersSlice";
import LoadingIcon from "../../../../common/LoadingIcon";

const FormContent = () => {
  const dispatch = useDispatch();

  const { driverId, recordId } = useParams();
  const viewDetail = useSelector((state) => state.driverTrailers.viewDetail);
  const isGeneralTabValid = useSelector((state) => state.driverTrailers.isGeneralTabValid);
  const isComplianceTabValid = useSelector((state) => state.driverTrailers.isComplianceTabValid);
  const isLeaseTabValid = useSelector((state) => state.driverTrailers.isLeaseTabValid);
  const isMaintenanceTabValid = useSelector((state) => state.driverTrailers.isMaintenanceTabValid);
  const isTabIdentify = useSelector((state) => state.driverTrailers.isTabIdentify);
  const isLeaseCondition = useSelector((state) => state.driverTrailers.isLeaseCondition);
  const active = useSelector((state) => state.driverTrailers.active);
  const saveLoaded = useSelector((state) => state.driverTrailers.saveLoaded);
  const selectedId = useSelector((state) => state.driverTrailers.selectedId);
  const [loading7, setLoading7] = useState(false);
  const leaseLoading = useSelector((state) => state.driverTrailers.leaseLoading);
  const ownerLoading = useSelector((state) => state.driverTrailers.ownerLoading);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setIsTabIdentify("general"));
    const debounceFunction = setTimeout(() => {}, 50);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, []);

  /*
      This fetchRecordById method is used for fetching a trailers detaisl based on a driverTrailerPK
      id      :  driverTrailerPK
      return data : Return data is stored in formData which is a redux variable to save the trailer details.

  */

  const fetchRecordById = () => {
    setLoading7(true);
    DriverTrailersService.getDriverTrailerById(recordId)
      .then((response) => {
        const data = response.data;
        dispatch(setFormData(data));
        dispatch(setViewDetail(true));
      })
      .catch((error) => {
        console.log(error, "error ");
      })
      .finally(() => setLoading7(false));
  };

  /*
  This useEffect is used call fetchRecordById when the page is loaded
*/

  useEffect(() => {
    if (recordId) {
      dispatch(setIsTabIdentify("general"));
      fetchRecordById();
    }
  }, [active]);

  return (
    <div className="p-2">
      {loading7 && <LoadingIcon />}
      {
        <div className={`shadow-sm rounded border halfScreenFormContentHeight`}>
          <Tabs
            Tabs
            defaultActiveKey="general"
            activeKey={isTabIdentify}
            onSelect={(k) => {
              dispatch(setIsTabIdentify(k));
            }}
            id="uncontrolled-tab-example"
            className="m-b-2"
          >
            <Tab
              title={"General"}
              eventKey="general"
              tabClassName={!viewDetail ? (isGeneralTabValid ? "color-green" : "color-red") : ""}
            >
              <General />
            </Tab>

            <Tab
              title={"Compliance"}
              eventKey="compliance"
              tabClassName={!viewDetail ? (isComplianceTabValid ? "color-green" : "color-red") : ""}
            >
              <Compliance />
            </Tab>

            <Tab
              title={"Maintenance"}
              eventKey="maintenance"
              tabClassName={!viewDetail ? (isMaintenanceTabValid ? "color-green" : "color-red") : ""}
            >
              <Maintenance />
            </Tab>

            <Tab
              title={"Lease"}
              eventKey="lease"
              tabClassName={!viewDetail ? (isLeaseTabValid ? "" : "color-red") : ""}
            >
              <Lease />
            </Tab>
          </Tabs>
          {saveLoaded && (
            <div className="fade modal-backdrop show">
              <div className="pos-center">
                <div className="loader"></div>
              </div>
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default FormContent;
