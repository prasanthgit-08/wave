import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ProcessPayService from "../../../../../services/ProcessPayService";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  setCompanyFK,
  setCompanyName,
  setCurrentCompanyName,
  setDriverData,
  setDriverNameInput,
  setDriverSelection,
  setIsCurrentCompany,
  setSelectedDriverID,
} from "../../../../../redux/ProcessPaySlice";

import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import DriverLookup from "../../../../LookupScreens/Driver/DriverLookup";
import { setCompanyDataforCount } from "../../../../../redux/ProcessPaySlice";
import { setChangeColor } from "../../../../../redux/ProcessPaySlice";
import NoRecordsMessage from "../../../../common/NoRecordsMessage";
import LoadingIcon from "../../../../common/LoadingIcon";
import { getCurrentCompany } from "../../../../../utils/utils";

function PayDriverSelectionContent() {
  const dispatch = useDispatch();

  const companyName = useSelector((state) => state.processShuttlePayReducer.companyName);
  const companyFK = useSelector((state) => state.processShuttlePayReducer.companyFK);
  const companyDataforCount = useSelector((state) => state.processShuttlePayReducer.companyDataforCount);
  const [driverNames, setDriverNames] = useState([]);
  const [driverLookUpShow, setDriverLookUpShow] = useState(false);
  const selectedDriverID = useSelector((state) => state.processShuttlePayReducer.selectedDriverID);
  const driverNameInput = useSelector((state) => state.processShuttlePayReducer.driverNameInput);
  const [selectedDriverOjbect, setSelectedDriverOjbect] = useState(null);
  const [loading, setLoading] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [driverLoading, setDriverLoading] = useState(false);

  const fetchDriverByName = (string) => {
    setDriverLoading(true);
    ProcessPayService.getAllProcessPay(string)
      .then((response) => {
        const data = response.data.content;
        if (string === "" && selectedDriverOjbect) {
          if (data?.every((element) => element.driverPK !== selectedDriverOjbect.driverPK)) {
            setDriverNames([selectedDriverOjbect, ...data]);
          } else {
            setDriverNames(data);
          }
        } else {
          setDriverNames(data);
        }
        setDriverLoading(false);
      })
      .catch((error) => {
        console.error("error", error);
      })
      .finally(() => setDriverLoading(false));
  };

  const handleDriverSelection = (driver) => {
    setSelectedDriverOjbect(driver);
    dispatch(
      setDriverNameInput(driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : ""))
    );
    dispatch(setSelectedDriverID(driver.driverPK));
    dispatch(setDriverData(driver));
    dispatch(setCompanyName(""));
    dispatch(setCompanyFK(null));
    setDriverLookUpShow(false);
  };

  useEffect(() => {
    if (selectedDriverID) {
      companyDetailsforDriver(selectedDriverID);
    }
  }, [selectedDriverID]);

  const companyDetailsforDriver = (selectedDriverID) => {
    setLoading(true);
    ProcessPayService.getCompanieyandCountforDriver(selectedDriverID)
      .then((response) => {
        const data = response.data;
        dispatch(setCompanyDataforCount(data));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleDriverLookupModalShow = () => {
    setDriverLookUpShow(true);
  };

  const handleDriverLookupModalHide = () => {
    setDriverLookUpShow(false);
  };

  /**
   * Fetch Current Company Name
   **/
  const currentCompanyData = getCurrentCompany();

  useEffect(() => {
    if (currentCompanyData) {
      const isSame = currentCompanyData.name?.trim() === companyName?.trim();

      dispatch(setIsCurrentCompany(isSame));
    }
  }, [currentCompanyData, companyName, dispatch]);

  return (
    <div className="p-2">
      {(companyLoading || loading) && <LoadingIcon />}
      <div className="p-15 shadow-sm rounded border halfScreenFormContentHeight">
        <Form.Group className="margin-box-1 form-group m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
          <Col xs={2} sm={2} className="p-0 text-start">
            <Form.Label className="customColFormLabel me-4">Driver</Form.Label>
          </Col>
          {/* Driver Selection Autocomplete */}
          <Col xs={4} md={4} sm={4} className="p-0 d-flex">
            <AutoCompleteDropdown
              arrayList={driverNames}
              maxLength={30}
              searchString={driverNameInput}
              renderItemId={(driver) => driver.driverPK}
              renderItemField={(driver) =>
                driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : "")
              }
              handleSearchString={(string) => dispatch(setDriverNameInput(string))}
              fetchDataBySearchString={fetchDriverByName}
              onSelect={handleDriverSelection}
              selectedId={selectedDriverID}
              clearInputCallback={() => {
                dispatch(setSelectedDriverID(null));
                dispatch(setCompanyFK(null));
                dispatch(setCompanyDataforCount([]));
                setSelectedDriverOjbect(null);
                dispatch(setCompanyName(""));
                dispatch(setCompanyFK(null));
              }}
              handleAutoCompleteClose={() => {
                dispatch(setCompanyFK(null));
                dispatch(setCompanyDataforCount([]));
              }}
              loading={driverLoading}
              className={`${!selectedDriverID ? "borderRed" : "borderGreen"}`}
              inputTextIndent={"5px"}
            />
            <LookupButton onClick={handleDriverLookupModalShow} />
          </Col>
        </Form.Group>

        <Form.Group className={`my-3 form-group m-b-10 align-items-center row  m-l-0 m-r-0`}>
          <Col xs={2} sm={2} className="p-0 text-start">
            <Form.Label className="customColFormLabel me-4">Units Company</Form.Label>
          </Col>
          <Col xs={3} md={3} sm={3} className="p-0 d-flex">
            <input
              className={"customFormControl"}
              value={companyName}
              type="text"
              maxLength={30}
              autoComplete="off"
              disabled
            />
          </Col>
        </Form.Group>

        <Row className="p-15 mt-5">
          <div
            className={`border border-secondary fixTableHead col-8 p-0`}

            style={{ overflowY: "auto", height: "198px" }}
          >
            <table className="table border-bottom  table-striped f-w-600">
              <thead>
                <tr>
                  <th className={`col-6`}>Units Company</th>
                  <th className="col-6">Count of Units</th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? null
                  : companyDataforCount?.map((companyDetails, index) => (
                      <tr
                        key={companyDetails.unitShuttlePK}
                        id="rowId"
                        onClick={(value) => {
                          dispatch(setChangeColor(true));
                          dispatch(setCompanyName(companyDetails.name));
                          dispatch(setCompanyFK(companyDetails.unitcompanyfk));
                        }}
                        className={companyFK === companyDetails.unitcompanyfk ? "tableSelected" : ""}
                      >
                        <td>{companyDetails.name}</td>
                        <td>{companyDetails.shuttleCount}</td>
                      </tr>
                    ))}
              </tbody>
            </table>

            {!loading && companyDataforCount.length === 0 && <NoRecordsMessage />}
          </div>
        </Row>
      </div>

      <DriverLookup
        show={driverLookUpShow}
        onHide={handleDriverLookupModalHide}
        renderItemId={(driver) => driver.driverPK}
        handleLookupSelection={handleDriverSelection}
        MaintenanceProgram
      />
    </div>
  );
}
export default PayDriverSelectionContent;
