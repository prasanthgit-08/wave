import React, { useState } from "react";
import QuarterScreen from "../../../styles/QuarterScreen.module.css";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { UI_Url } from "../../../services/constants/applicationConstants";
import { setEditDetails } from "../../../redux/EditRegionSlice";
import { toast } from "react-hot-toast";
import { resetSearchSettings } from "../../../redux/RegionsSearchFilterSlice";

function RegionEditFormHeader() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editDetail = useSelector((state) => state.editRegionReducer.editDetail);
  const [cancelShow, setCancelShow] = useState(false);

  const onHandleCloseShow = () => {
    if (editDetail) {
      dispatch(resetSearchSettings());
      setCancelShow(true);
    } else {
      navigate("/");
      dispatch(resetSearchSettings());
      toast.success("Page Closed");
    }
  };
  const handleCloseNo = () => {
    setCancelShow(false);
  };
  const handleCloseYes = () => {
    navigate("/");
    dispatch(resetSearchSettings());
    dispatch(setEditDetails(false));
    toast.success("Page Closed");
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
      <button
        className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
        onClick={onHandleCloseShow}
      >
        Close
      </button>
      <ModalComponent
        show={cancelShow && editDetail}
        onHide={handleCloseNo}
        title={"Close Region Changes"}
        body={"Please confirm you want to close the program without saving your changes"}
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
}

export default RegionEditFormHeader;
