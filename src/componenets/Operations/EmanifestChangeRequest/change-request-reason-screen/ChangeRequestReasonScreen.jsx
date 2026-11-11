import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CommonFooter from "../../../common/CommonFooter";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../common/Header";
import ModalComponent from "../../../common/ModalComponent";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  clearAdvancedSearch,
  resetDelayUnitSelectionFilters,
  resetUnitSelectionFilters,
  setSelectedItem,
} from "../../../../redux/EmanifestChangeRequestSlice";
import { useDispatch, useSelector } from "react-redux";
import EmanifestChangeRequestService from "../../../../services/EmanifestChangeRequestService";
import LoadingIcon from "../../../common/LoadingIcon";

const ChangeRequestReasonScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cancelShow, setCancelShow] = useState(false);
  const [comment, setComment] = useState("");
  const [database, setDatabase] = useState("Dispatches");
  const [emaifestMailObjectKey, setEmaifestMailObjectKey] = useState(["HRZ:EMANIFEST:CHG:REQ"]);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userPK = loggedInUser?.userPK;
  const [saveLoading, setSaveLoading] = useState(false);

  const selectedItem = useSelector((state) => state.emanifestChangeRequest.selectedItem);

  const footerButtons = [
    {
      label: "Save",
      onClick: () => {
        handleClickSave();
      },
      disabled: !comment?.trim(),
    },
    {
      label: "Cancel",
      onClick: () => {
        handleCancel();
      },
      disabled: false,
    },
  ];

  const clearFields = () => {
    dispatch(clearAdvancedSearch());
    dispatch(resetUnitSelectionFilters());
    dispatch(resetDelayUnitSelectionFilters());
    dispatch(setSelectedItem(null));
  };

  useEffect(() => {
    if (!selectedItem) {
      navigate(`/e-manifest-browse-screen`);
    }
  }, []);

  const handleCancel = () => {
    setCancelShow(true);
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    setCancelShow(false);
    navigate(`/e-manifest-dispatch-confirmation-screen`);
    toast.success("Changes Cancelled");
  };

  const handleClickSave = () => {
    setSaveLoading(true);
    const selectionRequestVO = {
      manualemail: false,
      isYardPrint: false,
      isPrint: false,
      emailToCustomer: false,
      emailTocustomerPlant: false,
      emailToDealer: false,
      emailToUser: false,
      emailToDriver: false,
      miscellaneousCustomerFlag: false,
      printYardFlag: false,
      primaryKey: selectedItem.DispatchPK,
      entityName: database,
      isEmail: true,
      emailObjectKeyList: emaifestMailObjectKey,
      documentType: "",
      isDocumentSave: false,
      userPK: userPK,
      emailContent: comment?.trim(),
    };

    EmanifestChangeRequestService.getEmanifestChangeRequestEmail(selectionRequestVO)
      .then((response) => {
        if (response && response.data) {
          toast.success("Email sent successfully");
        } else {
          toast.error("Error occured email  send");
        }
        navigate(`/e-manifest-browse-screen`);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  window.addEventListener("popstate", () => {
    navigate(`/e-manifest-browse-screen`);
  });

  return (
    <QuarterScreenWrapper>
      <Header
        programName="Emanifest Change Request"
        closeHandler={() => {
          clearFields();
        }}
        confirmClose={true}
      />
      <div className="w-100 p-2">
        {saveLoading && <LoadingIcon />}
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col xs={11}>
                  <Form.Group className="form-group row m-l-0 m-r-0 mb-3 mt-4">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel pt-0">Reason</Form.Label>
                    </Col>
                    <Col xs={8} className="p-0">
                      <textarea
                        rows={10}
                        cols={20}
                        style={{
                          resize: "none",
                          display: "fixed",
                          minHeight: "350px",
                          minWidth: "610px",
                          boxShadow: "none",
                          fontSize: "12px",
                        }}
                        type="text"
                        className={`customFormControl h-100 w-100 customFocusClass ${
                          !comment?.trim() ? "borderRed" : "borderGreen"
                        }`}
                        id="comment"
                        name="comment"
                        value={comment}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          setComment(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
          <ModalComponent
            show={cancelShow}
            onHide={handleCancelNo}
            title={"Cancel Emanifest Request Changes"}
            body={"Please confirm you want to cancel  changes"}
            handleYES={handleCancelYes}
            handleNO={handleCancelNo}
          />
        </div>
      </div>
      <CommonFooter buttons={footerButtons} />
    </QuarterScreenWrapper>
  );
};

export default ChangeRequestReasonScreen;
