import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetState } from "../../../../../../../../redux/PaymentRequestSlice";

function Header() {
  const { driverId, id } = useParams();

  const [closeShow, setCloseShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const driversPayTabData = useSelector((state) => state.paymentRequestSlice.driversPayTabData);
  const viewDetail = useSelector((state) => state.paymentRequestSlice.viewDetail);

  const handleClose = () => {
    if (viewDetail === false) {
      setCloseShow(true);
    } else {
      dispatch(resetState());
      navigate(`/driver-service-selection/${driverId}/form`);
      toast.success("Page Closed");
      setCloseShow(false);
    }
  };
  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    dispatch(resetState());

    navigate(`/driver-service-selection/${driverId}/form`);
    toast.success("Page closed");
    setCloseShow(false);
  };
  return (
    <div>
      <div>
        <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
          <button
            className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
            type=""
            onClick={handleClose}
          >
            Close
          </button>
        </div>

        <div className="col-xs-6">
          <Modal show={closeShow} onHide={handleCloseNo} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title className="font-18 h-100">Close Payment Request </Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-14 h-100">
              Please confirm you want to close the program without saving your changes
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseYes}>
                Yes
              </Button>
              <Button variant="secondary" onClick={handleCloseNo}>
                No
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Header;
