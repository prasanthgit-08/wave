import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setDriverId,
  setSelectedDriverData,
  setSelectedDriverFormData,
  setIsDriverLoading,
  setPostalCodeOnChange,
  setPhysicalPostalCodeOnChange,
  setOnCancel,
} from "../../../../../../../redux/EditDriverFileSlice";
import {
  setDealerCity,
  setDealerPostcode,
  setDealerStatecode,
} from "../../../../../../../redux/EditDealerSlice";
import ModalComponent from "../../../../../../common/ModalComponent";

function EditDriverFileHeader() {
  const { driverId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [closeShow, setCloseShow] = useState(false);

  const onHandleCloseYes = () => {
    dispatch(setSelectedDriverData(""));
    dispatch(setSelectedDriverFormData(""));
    dispatch(setIsDriverLoading(false));
    dispatch(setPostalCodeOnChange(false));
    dispatch(setPhysicalPostalCodeOnChange(false));
    dispatch(setOnCancel(false));
    dispatch(setDealerCity(""));
    dispatch(setDealerPostcode(""));
    dispatch(setDealerStatecode(""));
    navigate(`/driver-service-selection/${driverId}/form`);
    setCloseShow(false);
    toast.success("Page Closed");
  };

  const onHandleCloseNo = () => setCloseShow(false);

  const onHandleCloseShow = () => setCloseShow(true);

  useEffect(() => {
    dispatch(setDriverId(driverId));
  }, [driverId]);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={onHandleCloseShow}
        >
          Close
        </button>
        <ModalComponent
          show={closeShow}
          onHide={onHandleCloseNo}
          title={"Close Driver Changes"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={onHandleCloseYes}
          handleNO={onHandleCloseNo}
        />
      </div>
    </div>
  );
}

export default EditDriverFileHeader;
