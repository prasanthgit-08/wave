import { t } from "i18next";
import React, { useState } from "react";
import ModalComponent from "../../../common/ModalComponent";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTab, setViewDetail } from "../../../../redux/CompanySlice";

function CompanyHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [closeShow, setCloseShow] = useState(false);
  const viewDetail = useSelector((state) => state.companyReducer.viewDetail);

  const onHandleCloseShow = () => {
    if (viewDetail === true) {
      navigate("/");
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };
  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate("/");
    toast.success("Page Closed");
    dispatch(setViewDetail(true));
    dispatch(setCurrentTab("general"));
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={onHandleCloseShow}
        >
          {t("dealers.list.page.advanced.close.button")}
        </button>
      </div>

      <div className="col-xs-6">
        <ModalComponent
          show={closeShow}
          onHide={onHandleCloseNo}
          title={"Close Company Changes"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={onHandleCloseYes}
          handleNO={onHandleCloseNo}
        />
      </div>
    </div>
  );
}

export default CompanyHeader;
