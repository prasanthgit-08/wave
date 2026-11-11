import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetBrowse, resetEdit } from "../../../../../../../../redux/LoadHistorySlice";

const DispatchDetailHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { driverId } = useParams();

  const onHandleCloseShow = () => {
    dispatch(resetBrowse());
    dispatch(resetEdit());
    navigate("/driver-service-selection/" + driverId + "/form");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={onHandleCloseShow}
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default DispatchDetailHeader;
