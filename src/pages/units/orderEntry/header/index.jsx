import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OEHeader = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={() => {
              navigate("/");
              toast.success("Page Closed");
            }}
          >
            Close
          </button>
        </div>
      </div>

      <div className="col-xs-6">
        <Modal
          //   show={closeShow}
          //   onHide={onHandleCloseNo}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100">Close Order Entry Changes</Modal.Title>
          </Modal.Header>
          <Modal.Body className="font-14 h-100">
            Please confirm you want to close the program without saving your changes
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary">Yes</Button>
            <Button variant="secondary">No</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default OEHeader;
