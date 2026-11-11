import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DelayDamageService from "../../../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";
import { setEditSaveFormData } from "../../../../../../redux/DispatchDelay/DamageProcessing/DamageSlice";

const DamageComments = () => {
  const dispatch = useDispatch();
  const { damageFK } = useParams();
  const [viewData, setViewData] = useState(null);
  const [delayInHouseNotes, setDelayInHouseNotes] = useState("");
  const [inHouseNotes, setInHouseNotes] = useState("");
  const [delayCustomerNotes, setDelayCustomerNotes] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  const [showComment, setShowComment] = useState(true);
  const [closeShow, setCloseShow] = useState(false);

  const [inHouseComment, setinHouseComment] = useState(false);
  const [custDelayComment, setCustDelayComment] = useState(false);
  const [currentInHouseInput, setCurrentInHouseInput] = useState("");
  const [currentCustDelayInput, setCurrentCustDelayInput] = useState("");
  const [commonComment, setCommonComment] = useState("");

  const damageDetailFlag = useSelector((state) => state.damageReducer.damageDetailFlag);
  const [delayInHouseText, setDelayInHouseText] = useState("");
  const [delayCustomerText, setDelayCustomerText] = useState("");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));

  //  Load initial viewData
  useEffect(() => {
    if (damageFK && damageDetailFlag) {
      DelayDamageService.getDelayDamageViewDetails(damageFK, "Comments", 0, 10, null, false)
        .then((res) => {
          const data = res?.data[0];
          setViewData(data);
        })
        .catch(console.error);
    }
  }, [damageFK, damageDetailFlag]);

  useEffect(() => {
    if (viewData) {
      const clean = (text) => text?.replace(/<DamageNotes>/g, "") || "";

      const convert = (text) => {
        return text?.replace(
          /\[(\d{1,2})\/(\d{1,2})\/(\d{4}),\s*(\d{2}:\d{2}:\d{2}\s*[AP]M)\]/g,
          (_, m, d, y, time) => {
            const month = String(m).padStart(2, "0");
            const day = String(d).padStart(2, "0");
            const year = y?.slice(-2);
            return `[${month}/${day}/${year}, ${time}]`;
          }
        );
      };

      setDelayInHouseNotes((prev) => `${prev}\n${convert(clean(viewData.DamageInHouseNotes))}`);
      setDelayCustomerNotes((prev) => `${prev}\n${convert(clean(viewData.DamageCustomerNotes))}`);
    }
  }, [viewData]);

  const getFormattedTimestamp = () => {
    const now = new Date();

    const day = String(now.getDate())?.padStart(2, "0");
    const month = String(now.getMonth() + 1)?.padStart(2, "0");
    const year = String(now.getFullYear());

    let hours = now.getHours();
    const minutes = String(now.getMinutes())?.padStart(2, "0");
    const seconds = String(now.getSeconds())?.padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedHours = String(hours).padStart(2, "0");

    return `[${month}/${day}/${year}, ${formattedHours}:${minutes}:${seconds} ${ampm}] ${loggedInUser?.name}`;
  };

  // Save handler
  const handleSave = () => {
    const timestamp = getFormattedTimestamp();

    if (inHouseComment && currentInHouseInput?.trim()?.length > 0) {
      const newEntry = `${currentInHouseInput?.trim()} \n${timestamp}`;
      setDelayInHouseNotes((prev) => (prev ? prev + "\n" : "") + newEntry + "\n");
      setDelayInHouseText((prev) => (prev ? prev + "\n" : "") + newEntry + "\n");
    }

    if (custDelayComment && currentCustDelayInput?.trim()?.length > 0) {
      const newEntry = `${currentCustDelayInput?.trim()} \n${timestamp}`;
      setDelayCustomerNotes((prev) => (prev ? prev + "\n" : "") + newEntry + "\n");
      setDelayCustomerText((prev) => (prev ? prev + "\n" : "") + newEntry + "\n");
    }

    // Reset input and close comment popup
    setCurrentInHouseInput("");
    setCurrentCustDelayInput("");
    setCommonComment("");
    setShowComment(true);
  };
  const commentsTabData = () => {
    dispatch(
      setEditSaveFormData({
        customerNotes: delayCustomerText ? `\n${delayCustomerText}` : null,
        inhouseNotes: delayInHouseText ? `\n${delayInHouseText}` : null,
      })
    );
  };
  useEffect(() => {
    commentsTabData();
  }, [delayCustomerText, delayInHouseText]);

  return (
    <div className={"p-15 w-100"}>
      <Row className="m-0 p-0">
        <Col xs={6} sm={6} md={6} lg={6} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-3 align-items row  m-l-0 m-r-0">
            <label className="col-form-label dealer-label p-0 m-b-20">In House Damage Comments</label>

            <Col sm={11} md={11} className="p-0">
              <textarea
                rows={20}
                cols={12}
                className="customFormControl h-100"
                name="inHouseDelayComments"
                disabled
                value={delayInHouseNotes}
                autoComplete="off"
              />
            </Col>
          </Form.Group>
          {/* Empty Tag for styling */}
          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 hide-elements">
            <Col xs={8} className="p-0">
              <input />
            </Col>
          </Form.Group>
          <button
            className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
            type="button"
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
            <label className="col-form-label dealer-label p-0 m-b-20">Customer Damage Comments</label>

            <Col sm={11} md={11} className="p-0">
              <textarea
                rows={20}
                cols={12}
                disabled
                className="customFormControl h-100"
                name="customerDelayComments"
                value={delayCustomerNotes}
                autoComplete="off"
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
                setShowComment(true);
                setCloseShow(false);
                setCommonComment("");
                setCurrentInHouseInput("");
                setCurrentCustDelayInput("");
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
                className="customFormControl h-100"
                name="comments"
                autoComplete="off"
                value={commonComment}
                onInput={(e) => {
                  const val = e.target.value;
                  setCommonComment(val);
                  if (inHouseComment) setCurrentInHouseInput(val);
                  if (custDelayComment) setCurrentCustDelayInput(val);
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
                onClick={handleSave}
                disabled={!commonComment}
              >
                Save
              </button>
              <button
                className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
                type="button"
                onClick={() => {
                  setShowComment(true);
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
    </div>
  );
};

export default DamageComments;
