import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Col, Row } from "react-bootstrap";
import {
  setCustomerNotes,
  setDelayCustomerNotes,
  setDelayInHouseNotes,
  setInHouseNotes,
} from "../../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import ModalComponent from "../../../../common/ModalComponent";
import { parseLocalDate, formatDate, formatDateWithTime } from "../../../../../utils/dateUtils";
const BreakdownComments = () => {
  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });
  const [showComment, setShowComment] = useState(true);
  const [custDelayComment, setCustDelayComment] = useState(false);
  const [inHouseComment, setinHouseComment] = useState(false);
  const [currentInHouseInput, setCurrentInHouseInput] = useState("");
  const [currentCustDelayInput, setCurrentCustDelayInput] = useState("");
  const [commonComment, setCommonComment] = useState("");
  const user = useSelector((state) => state.delayProcessing.user);
  const delayCustomerNotes = useSelector((state) => state.delaybreakdown.delayCustomerNotes);
  const delayInHouseNotes = useSelector((state) => state.delaybreakdown.delayInHouseNotes);
  const customerNotes = useSelector((state) => state.delaybreakdown.customerNotes);
  const inHouseNotes = useSelector((state) => state.delaybreakdown.inHouseNotes);
  const viewOnly = useSelector((state) => state.delaybreakdown.viewOnly);
  const editTabData = useSelector((state) => state.delaybreakdown.editTabData);
  const editBrkdownOfExistingDelayUnitFlag = useSelector(
    (state) => state.delaybreakdown.editBrkdownOfExistingDelayUnitFlag
  );

  const dispatch = useDispatch();

  const [closeShow, setCloseShow] = useState(false);

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    setShowComment(true);
    setCloseShow(false);
  };
  const utcTime = new Date().toISOString(); // Current time in UTC
  const localTime = parseLocalDate(utcTime).toLocaleString(); // Convert to local system time

  useEffect(() => {
    if (editTabData) {
      dispatch(setDelayCustomerNotes(editTabData.BreakdownCustomerNotes?.trim() || ""));
      dispatch(setDelayInHouseNotes(editTabData.BreakdownInHouseNotes?.trim() || ""));
    }
  }, [editTabData]);

  return (
    <div className={"p-15 w-100"}>
      <Row className="m-0 p-0">
        <Col xs={6} sm={6} md={6} lg={6} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-3 align-items row  m-l-0 m-r-0">
            <label className="col-form-label dealer-label p-0 m-b-20">In House Breakdown Comments</label>

            <Col sm={11} md={11} className="p-0">
              <textarea
                rows={25}
                cols={12}
                type="inHouseDelayComments"
                className="customFormControl h-100 "
                name="inHouseDelayComments"
                disabled
                value={delayInHouseNotes?.replace(/<BreakdownNotes>/g, "")}
                autoComplete="off"
                onChange={(e) => {
                  dispatch(setDelayInHouseNotes(`${e.target.value}\n`));
                  dispatch(
                    setInHouseNotes(
                      delayInHouseNotes?.replace(/<BreakdownNotes>/g, "")
                        ? `${delayInHouseNotes?.replace(/<BreakdownNotes>/g, "")}\n${e.target.value}\n[${localTime}]\t${user}\n`
                        : `${e.target.value}\n[${localTime}]\t${user}\n`
                    )
                  );
                }}
              />
            </Col>
          </Form.Group>
          {/* Empty Tag for styling */}
          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 hide-elements">
            <Col xs={8} className="p-0">
              <input
                type="text"
                className={`customFormControl`}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <button
            className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
            type="button"
            hidden={!editBrkdownOfExistingDelayUnitFlag}
            onClick={() => {
              setShowComment(false);
              setCustDelayComment(false);
              setinHouseComment(true);
              setCommonComment("");
            }}
          >
            In House Comment
          </button>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-3 align-items row  m-l-0 m-r-0">
            <label className="col-form-label dealer-label p-0 m-b-20">Customer Breakdown Comments</label>

            <Col sm={11} md={11} className="p-0">
              <textarea
                rows={25}
                cols={12}
                disabled
                className="customFormControl h-100 "
                name="customerDelayComments"
                value={delayCustomerNotes?.replace(/<BreakdownNotes>/g, "")}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  dispatch(setDelayCustomerNotes(`${e.target.value}\n`));
                  dispatch(
                    setCustomerNotes(
                      delayCustomerNotes?.replace(/<BreakdownNotes>/g, "")
                        ? `${delayCustomerNotes?.replace(/<BreakdownNotes>/g, "")}\n${e.target.value}\n[${localTime}]\t${user}\n`
                        : `${e.target.value}\n[${localTime}]\t${user}\n`
                    )
                  );
                }}
              />
            </Col>
          </Form.Group>
          {/* Empty Tag for styling */}
          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 hide-elements">
            <Col xs={8} className="p-0">
              <input
                type="text"
                className={`customFormControl`}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <button
            className={`btn btn-secondary  btn-sm m-l-5 m-r-5 m-b-5`}
            type="button"
            hidden={!editBrkdownOfExistingDelayUnitFlag}
            onClick={() => {
              setShowComment(false);
              setCustDelayComment(true);
              setinHouseComment(false);
              setCommonComment("");
            }}
          >
            Customer Comment
          </button>
        </Col>
      </Row>
      <Row className="m-0 p-10 popup-overlay" hidden={showComment}>
        <Col sm={12} md={12} lg={12} xl={12} xs={12} className="popup">
          <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-dark border-2">
            <button
              className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
              onClick={() => {
                setCloseShow(true);
              }}
            >
              Close
            </button>
          </div>

          <Form.Group className="form-group m-t-5 form-group m-t-5 m-b- align-items row m-l-0 m-r-0 ">
            <Col sm={1} md={1} xs={1} className="p-0">
              <Form.Label className="customColFormLabel">Comment</Form.Label>
            </Col>

            <Col sm={9} md={9} className="p-0">
              <textarea
                rows={18}
                cols={10}
                type="comments"
                className="customFormControl h-100 "
                name="comments"
                aria-autocomplete="list"
                autoComplete="off"
                value={commonComment}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setCommonComment(e.target.value);
                    if (inHouseComment) {
                      setCurrentInHouseInput(e.target.value);
                    } else {
                      setCurrentCustDelayInput(e.target.value);
                    }
                  }
                }}
              />
            </Col>
          </Form.Group>
          <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap navigate(-1)border-2">
            <div className="d-flex align-items-center flex-wrap m-r-10"></div>
            <div className="d-flex align-items-center flex-wrap">
              <button
                className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
                type="button"
                onClick={() => {
                  setShowComment(true);
                  if (inHouseComment && currentInHouseInput?.trim()?.length > 0) {
                    dispatch(
                      setDelayInHouseNotes(
                        `${delayInHouseNotes?.replace(/<BreakdownNotes>/g, "")}\n${currentInHouseInput}\n[${formatDateWithTime(localTime)}]\t${user}`
                      )
                    );
                    dispatch(
                      setInHouseNotes(
                        inHouseNotes
                          ? `${inHouseNotes}\n${currentInHouseInput}\n[${formatDateWithTime(localTime)}]\t${user}`
                          : `${currentInHouseInput}\n[${formatDateWithTime(localTime)}]\t${user}`
                      )
                    );
                  }
                  if (custDelayComment && currentCustDelayInput?.trim()?.length > 0) {
                    dispatch(
                      setDelayCustomerNotes(
                        `${delayCustomerNotes?.replace(/<BreakdownNotes>/g, "")}\n${currentCustDelayInput}\n[${formatDateWithTime(localTime)}]\t${user}`
                      )
                    );

                    dispatch(
                      setCustomerNotes(
                        customerNotes
                          ? `${customerNotes}\n${currentCustDelayInput}\n[${formatDateWithTime(localTime)}]\t${user}`
                          : `${currentCustDelayInput}\n[${formatDateWithTime(localTime)}]\t${user}`
                      )
                    );
                  }
                }}
              >
                Save
              </button>
              <button
                className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
                type="button"
                onClick={() => {
                  // setShowComment(true);

                  setCommonComment("");
                  setCurrentInHouseInput("");
                  setCurrentCustDelayInput("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Col>
      </Row>

      <ModalComponent
        show={closeShow}
        onHide={handleCloseNo}
        title={"Close Adding Breakdown Comments "}
        body="Please confirm you want to close the program without saving your changes"
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
};

export default BreakdownComments;
