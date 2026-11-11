import React from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUnitsLoading } from "../../../../../../../../redux/PostNoCheckinSlice";

function PostNoCheckinFooter() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const driverFK = useSelector((state) => state.postNoCheckinReducer.driverFK);

  const handleNext = () => {
    navigate(`/postNoCheckin/${driverFK}`);
    dispatch(setUnitsLoading(true));
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PostNoCheckinFooter;
