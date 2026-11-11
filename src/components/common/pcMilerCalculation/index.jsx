import { Button, Modal } from "react-bootstrap";
import CustomButton from "../button";
import Loading from "../loading";
import { useState } from "react";

const PcMilerCalculation = ({
  className = "",
  payload,
  calculateService,
  existingMiles = 0,
  onSuccess,
  onError,
  disabled = false,
  label = "PC Miler",
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleClick = () => {
    if (existingMiles > 0) setShowConfirmModal(true);
    else handleConfirm();
  };

  const handleConfirm = async () => {
    try {
      setLoader(true);
      setShowConfirmModal(false);

      const res = await calculateService(payload);

      if (res?.data) {
        const distance = res.data.distance ? Math.round(res.data.distance) : 0;

        onSuccess?.(distance);
      }
    } catch (err) {
      const msg = "PC Miler is not available";
      setErrorMsg(msg);
      setShowErrorModal(true);
      onError?.(msg);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <CustomButton
        className={`btn btn-secondary font-12 m-0 btn-sm ${className}`}
        type="button"
        loading={false}
        size="small"
        onClick={handleClick}
        disabled={loader || disabled}
        label={label}
      />

      {loader && <Loading />}

      {/* Confirm Modal */}
      <Modal show={showConfirmModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton onHide={() => setShowConfirmModal(false)}>
          <Modal.Title>Warning !!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to override the miles?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConfirm}>
            YES
          </Button>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            NO
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={showErrorModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton onHide={() => setShowErrorModal(false)}>
          <Modal.Title>Warning !!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{errorMsg}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PcMilerCalculation;
