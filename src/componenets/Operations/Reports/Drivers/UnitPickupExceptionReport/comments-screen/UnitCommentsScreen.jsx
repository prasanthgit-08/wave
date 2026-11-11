import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../../../../common/ModalComponent";
import OutstandingPaperworkService from "../../../../../../services/operations/OutstandingPaperworkService";
import QuarterScreenWrapper from "../../../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../../../common/Header";
import { Col, Form, Row } from "react-bootstrap";
import CommonFooter from "../../../../../common/CommonFooter";
import { resetChanges, setPageNumber } from "../../../../../../redux/Reports/UnitPickupExceptionSlice";
import UnitPickupExceptionReportService from "../../../../../../services/Reports/UnitPickupExceptionReportService";

const UnitCommentsScreen = () => {
  const selectedDispatchPK = useSelector((state) => state.unitPickupException.selectedDispatchPK);

  const [additionalNotes, setAdditionalNotes] = useState("");
  const [cancelShow, setCancelShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = {
    selectedDispatchPK: selectedDispatchPK,
    additionalNotes: additionalNotes.replace(/\n/g, "\\n"),
  };

  const saveUnitAdditionalNotes = async () => {
    try {
      setLoading(true);
      const response = await UnitPickupExceptionReportService.saveUnitExceptionAdditionalNotes(params);
      if (response.data?.status === "success") {
        setLoading(false);
        toast.success(response.data?.message || "Comment saved successfully!");
        setAdditionalNotes("");
        navigate(-1);
      } else {
        setLoading(false);
        toast.error("Failed to save comment.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error saving comment:", error);
      toast.error("An error occurred while saving the comment.");
    }
  };

  const footerButtons = [
    { label: "Save", onClick: saveUnitAdditionalNotes, disabled: !additionalNotes?.trim() },
    { label: "Cancel", onClick: () => handleCancel() },
  ];

  const hasChanges = !!additionalNotes?.trim();

  const goBackToBrowse = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate(`/unit-pickup-exception-browse-screen`, { replace: true });
    }
  };

  const handleCancel = () => {
    if (!hasChanges) {
      goBackToBrowse();
      return;
    }
    setCancelShow(true);
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    goBackToBrowse();
    toast.success("Changes Cancelled");
  };

  useEffect(() => {
    const handlePopState = () => {
      dispatch(resetChanges());
      dispatch(setPageNumber(0));
      navigate(`/unit-pickup-exception-browse-screen`, { replace: true });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <QuarterScreenWrapper>
      <Header
        closeHandler={() => dispatch(resetChanges())}
        confirmClose={hasChanges}
        closeNavigationURL="/unit-pickup-exception-browse-screen"
        programName="Outstanding Paperwork"
      />
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col xs={11}>
                  <Form.Group className="form-group row m-l-0 m-r-0 mb-3 mt-4">
                    <Col xs={1} className="p-0">
                      <Form.Label className="customColFormLabel pt-0">Comment</Form.Label>
                    </Col>
                    <Col xs={11} className="p-0">
                      <textarea
                        type="text"
                        id="comment"
                        name="comment"
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        rows={18}
                        cols={23}

                        className={`customFormControl h-100 customFocusClass ${
                          !additionalNotes?.trim() ? "borderRed" : "borderGreen"
                        } `}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              {loading && (
                <div className="fade modal-backdrop show">
                  <div className="pos-center">
                    <div className="loader"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Cancel Confirmation Modal */}
      <ModalComponent
        show={cancelShow}
        onHide={handleCancelNo}
        title={"Cancel Comment"}
        body={"Please confirm you want to cancel your changes"}
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />

      <CommonFooter buttons={footerButtons} />
    </QuarterScreenWrapper>
  );
};

export default UnitCommentsScreen;
