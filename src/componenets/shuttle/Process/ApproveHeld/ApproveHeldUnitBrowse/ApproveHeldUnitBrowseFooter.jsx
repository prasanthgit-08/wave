import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setApproveOrDeigned,
  setChangeColorUnit,
  setInnerSortFlag,
  setInnerSortValue,
  setSelectedId,
  setViewDetail,
} from "../../../../../redux/ApproveHeldSlice";
import { Col, Row } from "react-bootstrap";

function ApproveHeldUnitBrowseFooter() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const pageNumber = useSelector((state) => state.approveHeldShuttleReducer.pageNumber);
  const selectedId = useSelector((state) => state.approveHeldShuttleReducer.selectedId);

  return (
    <Row>
      <Col xs={12} className="px-0">
        <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border border-dark border-2 border-top-0">
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center flex-wrap">
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
                type="button"
                onClick={() => {
                  navigate(`/shuttle-inquiry-detail/${id}/${Number(selectedId)}`);
                }}
                disabled={!selectedId}
              >
                Detail
              </button>

              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
                type="button"
                onClick={() => {
                  dispatch(setApproveOrDeigned(false));
                  dispatch(setViewDetail(true));
                  navigate(`/approve-held-shuttle/add/${id}/${pageNumber}`);
                  dispatch(setChangeColorUnit(false));
                  dispatch(setSelectedId(null));
                  dispatch(setInnerSortValue(""));
                  dispatch(setInnerSortFlag(false));
                }}
              >
                Return
              </button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
export default ApproveHeldUnitBrowseFooter;
