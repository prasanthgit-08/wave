import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import UserLookup from "../../../../LookupScreens/User/UserLookup";
import toast from "react-hot-toast";
import BlockedLogReportService from "../../../../../services/Reports/BlockedLogReportService";
import ComplianceItemsLookup from "../../../../LookupScreens/ComplianceItems/ComplianceItemsLookup";
import ReportComponent from "../../../../common/ReportComponent";

const BlockedLogReport = () => {
  const [displayCountOnly, setDisplayCountOnly] = useState(false);

  const [dispatchUserFK, setDispatchUserFK] = useState(null);
  const [dispatchUserName, setDispatchUserName] = useState("");
  const [dispatchUserData, setDispatchUserData] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showUserLookup, setShowUserLookup] = useState(false);
  const [showComplianceLookup, setShowComplianceLookup] = useState(false);

  const [complianceItemFK, setComplianceItemFK] = useState(null);
  const [complianceItemName, setComplianceItemName] = useState("");
  const [complianceItemData, setComplianceItemData] = useState([]);
  const [complianceInput, setComplianceInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [dispatcherLoader, setDispatcherLoader] = useState(false);
  const [complianceLoader, setComplianceLoader] = useState(false);
  const [isTabValid, setIsTabValid] = useState(false);
  const [showCountModal, setShowCountModal] = useState(false);
  const [recordCountMessage, setRecordCountMessage] = useState("");
  const BLOCKED_LOG_REPORT_ID = process.env.REACT_APP_SP_BLOCKED_LOG_REPORT;

  const returnFormData = (type) => {
    return {
      displayCountOnly,
      dispatcherPK: dispatchUserFK,
      complianceItemPK: complianceItemFK,
      type: type,
    };
  };

  const getDispatchUser = (string) => {
    setDispatcherLoader(true);
    BlockedLogReportService.fetchDispatcherBlockedLogAutoComplete(string)
      .then((response) => {
        const data = response.data;

        setDispatchUserData(data);
      })
      .finally(() => {
        setDispatcherLoader(false);
      });
  };

  const getComplianceItems = (string) => {
    setComplianceLoader(true);
    BlockedLogReportService.fetchComplianceBlockedLogAutoComplete(string)
      .then(({ data }) => {
        setComplianceItemData(data.slice(0, data.length - 1));
      })
      .finally(() => {
        setComplianceLoader(false);
      });
  };

  const handleUserSelection = (item) => {
    setDispatchUserFK(item.UserPK);
    setDispatchUserName(item.Name);
    setUserInput(item.Name?.trim());
  };

  const handleComplianceSelection = (item) => {
    setComplianceItemFK(item.ComplianceItemPK);
    setComplianceItemName(item.Description);
    setComplianceInput(item.Description?.trim());
  };

  const handleUserLookup = () => {
    setShowUserLookup(true);
  };

  const handleComplianceLookup = () => {
    setShowComplianceLookup(true);
  };
  const handleUserLookupSelection = (item) => {
    setDispatchUserFK(item.userPK);
    setDispatchUserName(item.name);
    setUserInput(item.name?.trim());
    setShowUserLookup(false);
  };

  const handleComplianceLookupSelection = (selectedItem) => {
    setComplianceInput(selectedItem.Description);
    setComplianceItemFK(selectedItem.ComplianceItemPK);
    setShowComplianceLookup(false); // Close the popup on selection
  };

  const getBlockedLogReport = (type) => {
    setLoading(true);
    BlockedLogReportService.getBlockedLogReport(returnFormData(type))
      .then((response) => {
        const { data } = response;

        if (data.errorCode === 1) {
          toast.error(data.errorMessage);
        } else {
          setRecordCountMessage(data.errorMessage);
          setShowCountModal(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resetAllVariables = () => {
    setDisplayCountOnly(false);
    setDispatchUserFK(null);
    setUserInput("");
    setComplianceItemFK(null);
    setComplianceInput("");
  };

  const handleCloseCountModal = () => {
    setShowCountModal(false);
  };

  // Validation: If both Dispatcher and Compliance Item are selected
  useEffect(() => {
    if (!complianceItemFK || (!dispatchUserFK && userInput)) {
      setIsTabValid(false);
    } else {
      setIsTabValid(true);
    }
  }, [dispatchUserFK, complianceItemFK, userInput]);

  const body = (
    <>
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col xs={11}>
                  {/* Display Count Only */}
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
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
                        onChange={(e) => setDisplayCountOnly(e.target.checked)}
                      />
                    </Col>
                  </Form.Group>

                  {/* Dispatcher */}
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={2} className="p-0">
                      <Form.Label className="customColFormLabel">Dispatcher</Form.Label>
                    </Col>
                    <Col xs={5} className="p-0 d-flex">
                      <AutoCompleteDropdown
                        arrayList={dispatchUserData}
                        searchString={userInput}
                        renderItemId={(item) => item.UserPK}
                        renderItemField={(item) => item.Name}
                        handleSearchString={(string) => setUserInput(string)}
                        fetchDataBySearchString={getDispatchUser}
                        onSelect={handleUserSelection}
                        selectedId={dispatchUserFK}
                        clearInputCallback={() => setDispatchUserFK(null)}
                        handleAutoCompleteClose={() => setDispatchUserFK(null)}
                        className={dispatchUserFK || !userInput ? "" : "borderRed"}
                        loading={dispatcherLoader}
                      />
                      <LookupButton onClick={handleUserLookup} />
                    </Col>
                  </Form.Group>

                  {/* Compliance Item */}
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={2} className="p-0">
                      <Form.Label className="customColFormLabel">Compliance Item</Form.Label>
                    </Col>
                    <Col xs={5} className="p-0 d-flex">
                      <AutoCompleteDropdown
                        arrayList={complianceItemData}
                        searchString={complianceInput}
                        renderItemId={(item) => item.ComplianceItemPK}
                        renderItemField={(item) => item.Description}
                        handleSearchString={(string) => setComplianceInput(string)}
                        fetchDataBySearchString={getComplianceItems}
                        onSelect={handleComplianceSelection}
                        selectedId={complianceItemFK}
                        clearInputCallback={() => setComplianceItemFK("")}
                        handleAutoCompleteClose={() => setComplianceItemFK(null)}
                        className={!complianceItemFK ? "borderRed" : "borderGreen"}
                        loading={complianceLoader}
                      />
                      <LookupButton onClick={handleComplianceLookup} />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
          <Modal show={showCountModal} onHide={handleCloseCountModal} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title className="font-18 h-100">Driver Compliance Items</Modal.Title>
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
        show={showUserLookup}
        onHide={() => setShowUserLookup(false)}
        renderItemId={(user) => user.userPK}
        handleLookupSelection={handleUserLookupSelection}
        MaintenanceProgram
      />

      <ComplianceItemsLookup
        show={showComplianceLookup}
        onHide={() => setShowComplianceLookup(false)}
        renderItemId={(d) => d.ComplianceItemPK}
        handleLookupSelection={handleComplianceLookupSelection}
        blockedLogReport
      />
    </>
  );

  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        // setValues(initialValues);
        resetAllVariables();
      }}
      handleDisplay={displayCountOnly ? getBlockedLogReport : null}
      isEmailExcelDisabled={displayCountOnly}
      isEmailPdfDisabled={displayCountOnly}
      isPrintDisabled={displayCountOnly}
      id={BLOCKED_LOG_REPORT_ID}
      isTabValid={isTabValid}
      payload={returnFormData()}
    />
  );
};

export default BlockedLogReport;
