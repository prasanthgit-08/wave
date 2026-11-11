import { Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import shuttleInquiryService from "../../../../../services/shuttle/process/ShuttleInquiryService";

import moment from "moment";
import DateInputField from "../../../../common/DateInputField";
import LoadingIcon from "../../../../common/LoadingIcon";
import { setEditFormData, resetChanges } from "../../../../../redux/ShuttleInquirySlice";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";
import { setInnerSortFlag, setInnerSortValue, setSelectedId } from "../../../../../redux/ApproveHeldSlice";

function ShuttleInquiryDetailContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, approveHeldUnitShuttlePK } = useParams();
  const selectedShuttleID = useSelector((state) => state.shuttleInquiryReducer.selectedId);
  const [selectedShuttleData, setSelectedShuttleData] = useState("");
  const [loader, setLoader] = useState(false);
  const [showPopUp, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const idSelected = useSelector((state) => state.approveHeldShuttleReducer.id);
  const pageNumber = useSelector((state) => state.approveHeldShuttleReducer.pageNumber);

  const navigateToListPage = () => {
    navigate("/shuttle-inquiry-browse");
  };

  const navigateToHome = () => {
    if (id) {
      navigate(`/approve-held-shuttle/add/${idSelected}/${pageNumber}`);
      dispatch(setSelectedId(null));
    } else {
      dispatch(resetChanges());
      navigate("/");
    }
  };

  useEffect(() => {
    if (approveHeldUnitShuttlePK || selectedShuttleID) {
      setLoader(true);
      shuttleInquiryService
        .getShuttleData(approveHeldUnitShuttlePK || selectedShuttleID)
        .then((response) => {
          const data = response.data;

          selectedShuttleID && dispatch(setEditFormData(data));
          setSelectedShuttleData(data);
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
          setShowPopup(true);
          setErrorMessage("Could not connect to service");
        });
    } else {
      navigate("/shuttle-inquiry-selection");
    }
  }, []);

  const warningPopupModalHide = () => {
    setErrorMessage("");
    setShowPopup(false);

    navigate("/shuttle-inquiry-browse");
  };

  return (
    <>
      <div>
        <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={navigateToHome}
          >
            Close
          </button>
        </div>

        <div className="col-xs-6">{}</div>
      </div>
      <div className="p-2">
        <div className="shadow-sm rounded border halfScreenFormContentHeight">
          <Row className="p-15">
            <Col xs={6} className="ps-4">
              <Form.Group className="mt-1  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Driver
                  </Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    className="customFormControl"
                    id="name"
                    name="name"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={
                      (selectedShuttleData.firstName ? selectedShuttleData.firstName?.trim() : "") +
                      " " +
                      (selectedShuttleData.lastName ? selectedShuttleData.lastName : "")
                    }
                    disabled
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Unit Number
                  </Form.Label>
                </Col>

                <Col xs={3} className="p-0">
                  <input
                    className="customFormControl"
                    id="unitNumber"
                    name="unitNumber"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                    value={selectedShuttleData.unitNumber}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Company
                  </Form.Label>
                </Col>

                <Col xs={3} className="p-0">
                  <input
                    className="customFormControl"
                    id="unitCompanyName"
                    name="unitCompanyName"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={selectedShuttleData.unitCompanyName}
                    disabled
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Date Added
                  </Form.Label>
                </Col>

                <Col xs={2} className="p-0">
                  <DateInputField
                    date={
                      selectedShuttleData.addDate
                        ? moment(selectedShuttleData.addDate).format("MM/DD/YYYY")
                        : ""
                    }
                    disabled
                    placeholder={" "}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Source
                  </Form.Label>
                </Col>

                <Col xs={2} className="p-0">
                  <input
                    className="customFormControl"
                    id="name"
                    name="name"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                    value={selectedShuttleData.source}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0 text-start">
                  <Form.Label className={` col-form-label me-4`}>Shuttle Type</Form.Label>
                </Col>

                <Col xs={5} md={5} sm={5} className={`p-0 d-flex`}>
                  <Col className="d-flex align-items-center">
                    <input type="radio" disabled checked={selectedShuttleData.shuttle} />{" "}
                    <label className="ms-2" htmlFor="">
                      Shuttle
                    </label>{" "}
                  </Col>
                  <Col className="d-flex align-items-center">
                    <input type="radio" checked={selectedShuttleData.returned} disabled />{" "}
                    <label className="ms-2" htmlFor="">
                      Return
                    </label>{" "}
                  </Col>
                  <Col className="d-flex align-items-center">
                    <input type="radio" checked={selectedShuttleData.dryRun} disabled />{" "}
                    <label className="ms-1" htmlFor="">
                      Dry Run
                    </label>{" "}
                  </Col>
                  <Col className="d-flex align-items-center">
                    <input type="radio" disabled checked={selectedShuttleData.bonus} />{" "}
                    <label className="ms-2" htmlFor="">
                      Bonus
                    </label>{" "}
                  </Col>
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0 text-start">
                  <Form.Label className=" col-form-label me-4">Additional Shuttle</Form.Label>
                </Col>

                <Col xs={5} md={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0"
                    id="additionalShuttle"
                    disabled
                    checked={selectedShuttleData.additionalShuttle}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="customColFormLabel me-4">
                    Additional Shuttle Added By
                  </Form.Label>
                </Col>

                <Col xs={3} md={3} className="p-0">
                  <input
                    className="customFormControl"
                    id="additionalShuttleAddedBy"
                    name="additionalShuttleAddedBy"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                    value={selectedShuttleData.additionalShuttleAddedBy}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Shuttle Amount
                  </Form.Label>
                </Col>

                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    className="customFormControl"
                    id="amount"
                    name="amount"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                    value={selectedShuttleData.amount}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0 text-start ">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    {selectedShuttleData.whatPickUp}
                  </Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    className="customFormControl"
                    id="pickUpLocation"
                    name="pickUpLocation"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                    value={selectedShuttleData.pickUpLocation}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    {selectedShuttleData.whatDelivery}
                  </Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    className="customFormControl"
                    id="dropLocation"
                    name="dropLocation"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                    value={selectedShuttleData.dropLocation}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Row / Position
                  </Form.Label>
                </Col>

                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    className="customFormControl"
                    id="yardRow"
                    name="yardRow"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                    value={selectedShuttleData.yardRow}
                  />
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0 ms-3">
                  <input
                    className="customFormControl"
                    id="yardPosition"
                    name="yardPosition"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                    value={selectedShuttleData.yardPosition}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="form-group mt-3  align-items-start row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0 text-start">
                  <label className="col-form-label me-4">Reason</label>
                </Col>

                <Col xs={6} md={6} className="p-0">
                  <textarea
                    rows={6}
                    cols={20}
                    type="search"
                    className="customFormControl h-100 "
                    disabled
                    value={
                      selectedShuttleData.additionalShuttleReason
                        ? selectedShuttleData.additionalShuttleReason
                        : selectedShuttleData.bonusReason
                          ? selectedShuttleData.bonusReason
                          : selectedShuttleData.dryrunReason
                            ? selectedShuttleData.dryrunReason
                            : ""
                    }
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col xs={6} className="ps-4">
              {/* <Form.Group className="mt-2 invisible  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className='p-0 text-start'>
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                  
                  </Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    className="customFormControl"
                    id="name"
                    name="name"
                   type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  
                   
                  />
                </Col>
              </Form.Group> */}
              <Form.Group className="mt-1  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Posted By
                  </Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    className="customFormControl"
                    id="postedBy"
                    name="postedBy"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                    value={selectedShuttleData.postUserName}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Post Date
                  </Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0">
                  <DateInputField
                    date={
                      selectedShuttleData.postDate
                        ? moment(selectedShuttleData.postDate).format("MM/DD/YYYY")
                        : ""
                    }
                    disabled
                    placeholder={" "}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 invisible  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4"></Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    className="customFormControl"
                    id="name"
                    name="name"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Edited By
                  </Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    className="customFormControl"
                    id="editedBy"
                    name="editedBy"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                    value={selectedShuttleData.editUserName}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Edit Date
                  </Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0">
                  <DateInputField
                    date={
                      selectedShuttleData.editDate
                        ? moment(selectedShuttleData.editDate).format("MM/DD/YYYY")
                        : ""
                    }
                    disabled
                    placeholder={" "}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 invisible  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4"></Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    className="customFormControl"
                    id="name"
                    name="name"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Paid By
                  </Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    className="customFormControl"
                    id="name"
                    name="name"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                    value={selectedShuttleData.paidUserName}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Paid Date
                  </Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0">
                  <DateInputField
                    date={
                      selectedShuttleData.paidDate
                        ? moment(selectedShuttleData.paidDate).format("MM/DD/YYYY")
                        : ""
                    }
                    disabled
                    placeholder={" "}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="margin invisible  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4"></Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    className="customFormControl"
                    id="name"
                    name="name"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Denied By
                  </Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    className="customFormControl"
                    id="name"
                    name="name"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                    value={selectedShuttleData.deniedUserName}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Date Denied
                  </Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0">
                  <DateInputField
                    date={
                      selectedShuttleData.deniedDate
                        ? moment(selectedShuttleData.deniedDate).format("MM/DD/YYYY")
                        : ""
                    }
                    disabled
                    placeholder={" "}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="form-group mt-3  align-items-start row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <label className="col-form-label me-4">Reason Denied</label>
                </Col>

                <Col xs={6} md={6} className="p-0">
                  <textarea
                    rows={6}
                    cols={20}
                    type="search"
                    className="customFormControl h-100 "
                    disabled
                    value={selectedShuttleData.deniedReason}
                  />
                </Col>
              </Form.Group>

              {loader === true && <LoadingIcon />}
            </Col>
          </Row>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={navigateToListPage}
            hidden={approveHeldUnitShuttlePK}
          >
            Done
          </button>

          {approveHeldUnitShuttlePK && (
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type=""
              onClick={() => {
                navigate(`/approve-held-shuttle-unit-browse/${id}`);
                dispatch(setInnerSortFlag(false));
                dispatch(setInnerSortValue(null));
              }}
            >
              Return
            </button>
          )}

          {/* model Active*/}
          {}
        </div>
      </div>
      <div>
        <WarningModalPopUp
          show={showPopUp}
          onHide={warningPopupModalHide}
          title="Error"
          body={errorMessage}
          handleOK={warningPopupModalHide}
          showOK={true}
          color="red"
        />
      </div>
    </>
  );
}

export default ShuttleInquiryDetailContent;
