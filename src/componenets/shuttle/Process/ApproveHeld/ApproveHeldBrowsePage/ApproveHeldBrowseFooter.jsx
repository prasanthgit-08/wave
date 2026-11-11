import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setApproveOrDeigned, setViewDetail } from "../../../../../redux/ApproveHeldSlice";
import { Col, Row } from "react-bootstrap";

function ApproveHeldBrowseFooter() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.approveHeldShuttleReducer.id);
  const pageNumber = useSelector((state) => state.approveHeldShuttleReducer.pageNumber);

  return (
    <Row>
      <Col xs={12} className="px-0">
        <div className="w-100 d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border border-dark border-2 border-top-0">
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center flex-wrap">
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
                type="button"
                onClick={() => {
                  dispatch(setApproveOrDeigned(false));
                  dispatch(setViewDetail(true));
                  navigate(`/approve-held-shuttle/add/${id}/${pageNumber}`);
                }}
                disabled={!id}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
export default ApproveHeldBrowseFooter;
