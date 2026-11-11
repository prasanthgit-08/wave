import React, { useEffect, useState } from "react";
import ModalComponent from "../../../common/ModalComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { resetCustomerDispatchUsers } from "../../../../redux/CustomerDispatchUsersSlice";

const FormHeader = () => {
  const { customerId, customerPageNo } = useParams();
  const viewDetail = useSelector((state) => state.customerDispatchUsers.viewDetail);
  const [closeShow, setCloseShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customerDispatcUserValid = useSelector(
    (state) => state.customerDispatchUsers.customerDispatcUserValid
  );

  const handleClose = () => {
    if (viewDetail === true) {
      navigate(`/add-customer/${customerId}/${customerPageNo}`);
      setCloseShow(false);
      toast.success("Page Closed");
      dispatch(resetCustomerDispatchUsers());
    } else {
      setCloseShow(true);
    }
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate(`/add-customer/${customerId}/${customerPageNo}`);
    toast.success("Page closed");
    dispatch(resetCustomerDispatchUsers());
  };

  useEffect(() => {
    if (customerDispatcUserValid === false) {
      navigate(`/add-customer/${customerId}/${customerPageNo}`);
    }
  }, []);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={handleClose}
        >
          Close
        </button>
      </div>
      <ModalComponent
        show={closeShow}
        onHide={handleCloseNo}
        title="Close Customer Dispatch User"
        body="Please confirm you want to close the program without saving your changes"
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
};

export default FormHeader;
