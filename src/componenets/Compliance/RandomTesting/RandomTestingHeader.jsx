import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../common/ModalComponent";
import {
  setDisableProcess,
  setEmailSelection,
  setPrintSelection,
} from "../../../redux/Compliance/RandomTestingSlice";

const RandomTestingHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [closeShow, setCloseShow] = useState(false);
  const [viewDetail, setviewDetail] = useState(false);
  const onHandleCloseShow = () => {
    navigate(`/`);
    toast.success("Page Closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={onHandleCloseShow}
        >
          Close
        </button>{" "}
      </div>
      <div></div>
    </div>
  );
};

export default RandomTestingHeader;
