import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CommonFooter from "../../../common/CommonFooter";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../common/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MissingPaperworkService from "../../../../services/operations/MissingPaperworkService";
import { resetChanges, setPageNumber } from "../../../../redux/MissingPaperworkSlice";
import ModalComponent from "../../../common/ModalComponent";

const CommentsScreen = () => {
  const selectedDispatchPK = useSelector((state) => state.missingPaperwork.selectedDispatchPK);
  const deliveryDateTo = useSelector((state) => state.missingPaperwork.deliveryDateTo);

  const [missingPaperworkNotes, setMissingPaperworkNotes] = useState("");
  const [cancelShow, setCancelShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saveMissingPaperworkNotes = async () => {
    try {
      setLoading(true);
      const response = await MissingPaperworkService.saveMissingPaperworkNotes(
        selectedDispatchPK,
        missingPaperworkNotes
      );
      if (response.data?.status === "success") {
        setLoading(false);
        toast.success(response.data?.message || "Comment saved successfully!");
        setMissingPaperworkNotes("");
        navigate(`/missing-paperwork-browse-screen`);
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
    { label: "Save", onClick: () => saveMissingPaperworkNotes(), disabled: !missingPaperworkNotes?.trim() },
    { label: "Cancel", onClick: () => handleCancel() },
  ];

  useEffect(() => {
    if (!deliveryDateTo) {
      navigate(`/missing-paperwork-settings-screen`);
    }
  }, []);

  const handleCancel = () => {
    setCancelShow(true);
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    navigate(`/missing-paperwork-browse-screen`);
    toast.success("Changes Cancelled");
  };

  window.addEventListener("popstate", () => {
    dispatch(resetChanges());
    dispatch(setPageNumber(0));
    navigate(`/missing-paperwork-settings-screen`);
  });

  return (
    <QuarterScreenWrapper>
      <Header closeHandler={() => dispatch(resetChanges())} confirmClose programName="Missing Paperwork" />
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col xs={12}>
                  <Form.Group className="form-group row m-l-0 m-r-0 mb-3 mt-4">
                    <Col xs={1} className="p-0">
                      <Form.Label className="customColFormLabel pt-0">Comment</Form.Label>
                    </Col>
                    <Col xs={10} className="p-0">
                      <textarea
                        type="text"
                        id="comment"
                        name="comment"
                        value={missingPaperworkNotes}
                        onChange={(e) => setMissingPaperworkNotes(e.target.value)}

                        rows={18}
                        cols={23}

                        className={`customFormControl h-100 customFocusClass ${
                          !missingPaperworkNotes?.trim() ? "borderRed" : "borderGreen"
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

export default CommentsScreen;
