import React, { useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setDeleteHasCreditCard, setDeleteReason } from "../../../../../../../../redux/UndispatchSlice";
import UndispatchService from "../../../../../../../../services/UndispatchService";
import { useNavigate, useParams } from "react-router-dom";
const DeleteUnitContent = () => {
  const { dispatchId, driverId } = useParams();
  const undispatchFlag = useSelector((state) => state.undispatchReducer.undispatchFlag);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteReason = useSelector((state) => state.undispatchReducer.deleteReason);

  useEffect(() => {
    UndispatchService.hasCreditCardOnDelete(dispatchId).then(({ data }) => {
      dispatch(setDeleteHasCreditCard(data));
    });
  }, []);

  useEffect(() => {
    if (!undispatchFlag) {
      navigate(`/undispatch/${driverId}`);
    }
  }, [undispatchFlag]);
  return (
    <div className="p-2">
      <div className="p-15 shadow-sm rounded border quarterScreenFormContentHeight">
        <Row className="m-0 p-10">
          <Col xs={12}>
            <Form.Group className="mt-5 align-items  row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <label className="col-form-label dealer-label p-0 m-b-20">Reason For Deleting Unit</label>
              </Col>

              <Col sm={8} md={8} className="p-0">
                <textarea
                  rows={10}
                  cols={10}
                  type="text"
                  name="notes"
                  value={deleteReason}
                  onInput={(e) => {
                    dispatch(setDeleteReason(e.target.value.replace(/^\s+/g, "")));
                  }}
                  className={`customFormControl h-100 $ ${deleteReason?.trim() ? "borderGreen" : "borderRed"}`}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DeleteUnitContent;
