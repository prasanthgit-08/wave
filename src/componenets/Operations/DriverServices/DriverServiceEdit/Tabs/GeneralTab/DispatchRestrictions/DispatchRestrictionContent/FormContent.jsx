import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DateInputField from "../../../../../../../common/DateInputField";
import {
  setAddDate,
  setAllowDispatch,
  setCustomerId,
  setCustomerName,
  setDealerId,
  setDealerName,
  setDispatchRestrictionsPK,
  setEditFormData,
  setNotes,
  setSpecialCodeDescription,
  setSpecialCodeId,
  setStateCode,
  setStateCodeName,
  setUserName,
  setViewDetail,
} from "../../../../../../../../redux/DispatchRestrictionsSlice";
import DispatchRestrictionsService from "../../../../../../../../services/DispatchRestrictionsService";
import LoadingIcon from "../../../../../../../common/LoadingIcon";

function FormContent({ styles }) {
  const { driverId, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewDetail = useSelector((state) => state.dispatchRestrictionsReducer.viewDetail);
  const addDate = useSelector((state) => state.dispatchRestrictionsReducer.addDate);
  const userName = useSelector((state) => state.dispatchRestrictionsReducer.userName);
  const notes = useSelector((state) => state.dispatchRestrictionsReducer.notes);
  const editFormData = useSelector((state) => state.dispatchRestrictionsReducer.editFormData);
  const customerName = useSelector((state) => state.dispatchRestrictionsReducer.customerName);
  const allowDispatch = useSelector((state) => state.dispatchRestrictionsReducer.allowDispatch);
  const customerId = useSelector((state) => state.dispatchRestrictionsReducer.customerId);
  const dealerId = useSelector((state) => state.dispatchRestrictionsReducer.dealerId);
  const specialCodeId = useSelector((state) => state.dispatchRestrictionsReducer.specialCodeId);
  const stateCode = useSelector((state) => state.dispatchRestrictionsReducer.stateCode);
  const dealerName = useSelector((state) => state.dispatchRestrictionsReducer.dealerName);
  const specialCodeDescription = useSelector(
    (state) => state.dispatchRestrictionsReducer.specialCodeDescription
  );
  const stateCodeName = useSelector((state) => state.dispatchRestrictionsReducer.stateCodeName);
  const changesCancelled = useSelector((state) => state.dispatchRestrictionsReducer.changesCancelled);
  const selectedId = useSelector((state) => state.dispatchRestrictionsReducer.selectedId);
  const [loading, setLoading] = useState(false);

  const fetchRecord = (id) => {
    setLoading(true);
    DispatchRestrictionsService.getRecordById(id)
      .then((res) => {
        const data = res.data;
        dispatch(setEditFormData(res.data));
        dispatch(setViewDetail(true));
      })
      .catch((err) => {
        navigate(`/dispatch-restrictions/${driverId}`);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (editFormData === undefined) {
      dispatch(setDispatchRestrictionsPK(null));
      dispatch(setAddDate(null));
      dispatch(setUserName(""));
      dispatch(setNotes(""));
      dispatch(setCustomerName(""));
      dispatch(setDealerName(""));
      dispatch(setSpecialCodeDescription(""));
      dispatch(setStateCode(""));
    }
    if (editFormData != null) {
      dispatch(
        setDispatchRestrictionsPK(
          editFormData.driverDispatchRestrictionPK ? editFormData.driverDispatchRestrictionPK : null
        )
      );
      dispatch(setAddDate(editFormData.addDate ? editFormData.addDate : null));
      dispatch(setUserName(editFormData.userName ? editFormData.userName?.trim() : ""));
      dispatch(setNotes(editFormData.notes ? editFormData.notes : ""));
      dispatch(setCustomerName(editFormData.customerName ? editFormData.customerName : ""));
      dispatch(setAllowDispatch(editFormData.allowDispatch != null ? editFormData.allowDispatch : false));
      dispatch(setDealerName(editFormData.dealerName ? editFormData.dealerName : ""));
      dispatch(setSpecialCodeDescription(editFormData.specialCodeName ? editFormData.specialCodeName : ""));
      dispatch(setStateCode(editFormData.stateCode ? editFormData.stateCode : ""));
      dispatch(setStateCodeName(editFormData.stateCodeName ? editFormData.stateCodeName : ""));

      dispatch(setSpecialCodeId(editFormData.specialCodeFK || null));
      dispatch(setCustomerId(editFormData.customerFK || null));
      dispatch(setDealerId(editFormData.dealerFK || null));
    }
  }, [editFormData, changesCancelled]);
  useEffect(() => {
    if (id || selectedId) fetchRecord(id || selectedId);
  }, [id, selectedId]);
  useEffect(() => {
    dispatch(setDispatchRestrictionsPK(null));
    dispatch(setAddDate(null));
    dispatch(setUserName(""));
    dispatch(setNotes(""));
    dispatch(setCustomerName(""));
    dispatch(setDealerName(""));
    dispatch(setSpecialCodeDescription(""));
    dispatch(setStateCodeName(""));
    dispatch(setStateCode(""));
  }, []);

  return (
    <form>
      {loading && <LoadingIcon />}
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10 p-10 m-0">
            <div className="p-15 w-100">
              <Col xl={8} lg={8} md={8} sm={8} xs={8} className="m-t-25">
                <Form.Group
                  className={`mt-2 m-b-10 align-items-center row m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "136px" }}>
                    <label className={styles.colFormLabel}>Added By</label>
                  </Col>
                  <Col xs={5} sm={5} md={5} className="p-0 m-l-15">
                    <input
                      className="customFormControl"
                      type="text"
                      name="addedBy"
                      maxLength={30}
                      value={userName}
                      disabled
                      autoComplete="off"
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-2 m-b-10 align-items-center row m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Add Date</Form.Label>
                  </Col>

                  <Col xs={3} md={3} lg={3} sm={3} className="p-0" style={{ maxWidth: "96px" }}>
                    <DateInputField
                      date={addDate}
                      setDate={(value) => dispatch(setAddDate(value))}
                      className="customFormControl"
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-2 m-b-5 align-items-center row m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Allow Dispatch</Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="allowDispatch"
                      name="allowDispatch"
                      checked={allowDispatch}
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-2 m-b-4 align-items-center row m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} md={3} sm={3} style={{ width: "140px" }} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {dealerId
                        ? "Dealer"
                        : customerId
                          ? "Customer"
                          : specialCodeId
                            ? "Special"
                            : stateCode
                              ? "State"
                              : ""}
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="d-flex">
                    <input
                      className="customFormControl"
                      id="customer"
                      name="customer"
                      type="text"
                      value={
                        dealerId
                          ? dealerName
                          : customerId
                            ? customerName
                            : specialCodeId
                              ? specialCodeDescription
                              : stateCode
                                ? stateCodeName
                                : ""
                      }
                      disabled
                      maxLength={50}
                      autoComplete="off"
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-3 m-b-10 align-items-center row m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} md={3} sm={3} className="p-0" style={{ height: "130px" }}>
                    <Form.Label htmlFor="permitInstructions" className="">
                      No Dispatch Reason
                    </Form.Label>
                  </Col>
                  <Col sm={9} md={9} xs={9} className="p-0">
                    <textarea
                      rows={10}
                      cols={25}
                      type="text"
                      className={`${viewDetail ? "" : notes ? "borderGreen" : "borderRed"} customFormControl`}
                      id="permitInstructions"
                      name="permitInstructions"
                      value={notes}
                      style={{
                        resize: "none",
                        minHeight: "130px",
                        minWidth: "600px",
                        fontSize: "12px",
                        outline: "none",
                      }}
                      onBeforeInput={(e) => {
                        if (e.target.value.length === 0 && e.data === " ") {
                          e.preventDefault();
                        }
                      }}
                      onInput={(e) => {
                        dispatch(setNotes(e.target.value));
                      }}
                      disabled={viewDetail}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FormContent;
