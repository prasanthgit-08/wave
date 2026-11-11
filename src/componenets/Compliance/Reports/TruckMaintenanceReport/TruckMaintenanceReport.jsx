import React, { useEffect, useState } from "react";
import ReportComponent from "../../../common/ReportComponent";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import { Button, Col, Form, Modal } from "react-bootstrap";
import LookupButton from "../../../common/LookupButton";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import { useFormik } from "formik";
import * as yup from "yup";
import BlockedLogReportService from "../../../../services/Reports/BlockedLogReportService";
import UserLookup from "../../../LookupScreens/User/UserLookup";
import TruckMaintenanceReportService from "../../../../services/Reports/TruckMaintenanceReportService";
import toast from "react-hot-toast";
import LoadingIcon from "../../../common/LoadingIcon";

const validationSchema = yup.object().shape({
  displayCountOnly: yup.boolean(),
  dispatcher: yup.string(),
  dispatcherName: yup.string(),
  dispatcherInput: yup.string(),
  status: yup.string(),
});

const TruckMaintenanceReport = () => {
  const formik = useFormik({
    initialValues: {
      displayCountOnly: false,
      dispatcher: null,
      dispatcherName: "",
      dispatcherInput: "",
      status: "blocked",
    },
    validationSchema: validationSchema,
  });

  const [loading, setLoading] = useState(false);
  const [dispatcherList, setDispatcherList] = useState([]);
  const [showDispatcherLookUp, setShowDispatcherLookUp] = useState(false);
  const [showCountModal, setShowCountModal] = useState(false);
  const [recordCountMessage, setRecordCountMessage] = useState("");
  const [dispatcherLoader, setDispatcherLoader] = useState(false);
  const [dispatchUserData, setDispatchUserData] = useState([]);
  const [isTabValid, setIsTabValid] = useState(false);
  const TRUCK_MAINTENENACE_REPORT_ID = process.env.REACT_APP_SP_TRUCK_MAINTENENACE_REPORT;

  const { values, setValues, setFieldValue, setFieldError, isValid, initialValues } = formik;

  const { displayCountOnly, dispatcher, dispatcherName, dispatcherInput, status } = values;

  const returnFormData = (type) => {
    return {
      displayCountOnly,
      dispatcher,
      status,
      type: type,
    };
  };

  const getTruckMaintenanceReport = () => {
    setLoading(true);
    TruckMaintenanceReportService.getTruckMaintenanceReport(displayCountOnly, dispatcher, status)
      .then((response) => {
        const { data } = response;
        setRecordCountMessage(data[0].DriverCount);
        setShowCountModal(true);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const getDispatchUser = (string) => {
    setDispatcherLoader(true);
    BlockedLogReportService.fetchDispatcherBlockedLogAutoComplete(string)
      .then((response) => {
        const data = response.data;
        if (data && data.length > 0 && data[0].Empty === true) {
          setDispatchUserData([]);
        } else {
          setDispatchUserData(data);
        }
      })
      .catch(() => {})
      .finally(() => {
        setDispatcherLoader(false);
      });
  };

  const handleDispatcherSelection = (item) => {
    setValues({
      ...values,
      dispatcher: item.UserPK || item.userPK,
      dispatcherName: item.Name || item.name,
      dispatcherInput: item.Name?.trim() || item.name?.trim(),
    });
    setShowDispatcherLookUp(false);
  };

  const handleCloseCountModal = () => {
    setShowCountModal(false);
  };

  useEffect(() => {
    if (!dispatcher && dispatcherInput) {
      setIsTabValid(false);
    } else {
      setIsTabValid(true);
    }
  }, [dispatcher, dispatcherInput]);

  const body = (
    <>
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-5 w-100 mt-0 m-l-10">
              {loading && <LoadingIcon />}

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-4">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Display Count Only</Form.Label>
                </Col>
                <Col xs={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0"
                    id="displayCountOnly"
                    name="displayCountOnly"
                    value={displayCountOnly}
                    checked={displayCountOnly}
                    onChange={(e) => setFieldValue("displayCountOnly", e.target.checked)}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Dispatcher</Form.Label>
                </Col>
                <Col xs={4} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={dispatchUserData}
                    searchString={dispatcherInput}
                    renderItemId={(item) => item.UserPK}
                    renderItemField={(item) => item.Name}
                    handleSearchString={(string) => setFieldValue("dispatcherInput", string)}
                    fetchDataBySearchString={getDispatchUser}
                    onSelect={handleDispatcherSelection}
                    selectedId={dispatcher}
                    clearInputCallback={() => setFieldValue("dispatcher", null)}
                    handleAutoCompleteClose={() => setFieldValue("dispatcher", null)}
                    className={dispatcher || !dispatcherInput ? "" : "borderRed"}
                    loading={dispatcherLoader}
                  />
                  <LookupButton onClick={() => setShowDispatcherLookUp(true)} />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-3">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Status</Form.Label>
                </Col>

                <Col sm={8} md={8} xs={8} className="p-0 ">
                  <CustomRadioGroup
                    name="status"
                    horizontal
                    horizontalAlignmentClassName="pe-3"
                    selectedOption={status}
                    onChange={(value) => setFieldValue("status", value)}
                    options={[
                      { value: "blocked", label: "Blocked", width: "90px" },
                      { value: "missing", label: "Missing", width: "96px" },
                    ]}
                  />
                </Col>
              </Form.Group>
            </div>
          </div>
          <Modal show={showCountModal} onHide={handleCloseCountModal} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title className="font-18 h-100">Driver Count</Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-14 h-100">{recordCountMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseCountModal}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>

      <UserLookup
        show={showDispatcherLookUp}
        onHide={() => setShowDispatcherLookUp(false)}
        renderItemId={(user) => user.userPK}
        handleLookupSelection={handleDispatcherSelection}
        MaintenanceProgram
      />
    </>
  );
  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        setValues(initialValues);
      }}
      handleDisplay={displayCountOnly ? getTruckMaintenanceReport : null}
      isEmailExcelDisabled={displayCountOnly}
      isEmailPdfDisabled={displayCountOnly}
      isPrintDisabled={displayCountOnly}
      id={TRUCK_MAINTENENACE_REPORT_ID}
      isTabValid={isTabValid}
      payload={returnFormData()}
    />
  );
};

export default TruckMaintenanceReport;
