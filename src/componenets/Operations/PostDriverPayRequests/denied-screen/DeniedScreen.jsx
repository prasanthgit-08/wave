import React, { useEffect, useState } from "react";
import Header from "../../../common/Header";
import CommonFooter from "../../../common/CommonFooter";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PostpayRequestService from "../../../../services/PostpayRequestService";
import { toast } from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { setNavigateToMainPage } from "../../../../redux/PostPayRequestSlice";
import LoadingIcon from "../../../common/LoadingIcon";
const DeniedScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [reasonDenied, setReasonDenied] = useState("");
  const [cancelShow, setCancelShow] = useState(false);
  const [deniedLoading, setDeniedLoading] = useState(false);
  const navigateToMainPage = useSelector((state) => state.postPayRequestSlice.navigateToMainPage);

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    // navigate("/post-driver-pay-requests");
    dispatch(setNavigateToMainPage(true));
    // dispatch(setViewDetail(false));
    toast.success("Changes Cancelled");
  };

  const handleCancel = () => setCancelShow(true);

  const isOnlyWhitespace = (str) => {
    return str?.trim().length === 0;
  };

  const handleSave = async () => {
    setDeniedLoading(true);
    try {
      const response = await PostpayRequestService.savePostDriverPayRequest({
        denied: true,
        deniedReason: reasonDenied?.trim(),
        paid: false,
        driverPayRequestsPK: id,
        otherAmountDPM: 0.0,
      });

      if (response.ErrorCode === 0) {
        toast.success("Request denied successfully");
        navigate("/post-driver-pay-requests");
      } else {
        toast.error(response.ErrorMessage || "Failed to deny request");
      }
    } catch {
      console.error();
    } finally {
      setDeniedLoading(false);
    }
  };

  useEffect(() => {
    if (navigateToMainPage) {
      navigate("/post-driver-pay-requests");
    }
  }, [navigateToMainPage]);

  return (
    <div className="add-form-component p-0 customContainer">
      {deniedLoading && <LoadingIcon />}
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header
          confirmClose
          programName={"Post Driver Pay Requests"}
          closeConfirmationHandler={() => {
            dispatch(setNavigateToMainPage(true));
          }}
        />
        <div className="p-2">
          <div className="p-15 shadow-sm rounded border halfScreenFormContentHeight">
            <Row className="m-0 p-0">
              <Col xs={12}>
                <Form.Group
                  className="mb-3 align-items-center row m-l-0 m-r-0"
                  style={{ marginTop: "130px" }}
                >
                  <Col xs={1} className="p-0 d-flex align-self-start">
                    <Form.Label className={`customColFormLabel`}>Reason Denied</Form.Label>
                  </Col>

                  <Col xs={9} md={9} className="p-0 ">
                    <textarea
                      name="reasonDenied"
                      id="reasonDenied"
                      style={{ width: "100%" }}
                      rows="9"
                      className={`customFocusClass ${
                        !isOnlyWhitespace(reasonDenied) && reasonDenied.length > 0
                          ? "borderGreen"
                          : "borderRed"
                      }`}
                      value={reasonDenied}
                      onChange={(e) => {
                        // Prevent starting with space
                        if (e.target.value.length > 0 && e.target.value[0] === " ") {
                          return;
                        }
                        setReasonDenied(e.target.value);
                      }}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
        <CommonFooter
          buttons={[
            {
              label: "Save",
              onClick: handleSave,
              disabled: isOnlyWhitespace(reasonDenied) && !reasonDenied.length > 0,
            },
            {
              label: "Cancel",
              onClick: handleCancel,
              disabled: false,
            },
          ]}
        />
        {/* Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Denied Reason Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
    </div>
  );
};

export default DeniedScreen;
