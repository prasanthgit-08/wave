import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetFields, updateField } from "../../../../redux/DelayedUnitsPendingEmailSlice";
import DelayedUnitPendingEmailService from "../../../../services/DelayedUnitPendingEmailService";
import LoadingIcon from "../../../common/LoadingIcon";
import ModalComponent from "../../../common/ModalComponent";

const FormHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [closeShow, setCloseShow] = useState(false);

  const [loading, setLoading] = useState(true);
  const [selectionType, setSelectionType] = useState("All");
  const [cancelShow, setCancelShow] = useState(false);

  const selectedId = useSelector((state) => state.delayedUnitsPendingEmail.selectedId);
  const listingData = useSelector((state) => state.delayedUnitsPendingEmail.listingData);
  const isSaveFlag = useSelector((state) => state.delayedUnitsPendingEmail.isSaveFlag);
  const tempEmailBody = useSelector((state) => state.delayedUnitsPendingEmail.tempEmailBody);
  const operationFlag = useSelector((state) => state.delayedUnitsPendingEmail.operationFlag);
  const emailBody = useSelector((state) => state.delayedUnitsPendingEmail.emailBody);
  const addDate = useSelector((state) => state.delayedUnitsPendingEmail.addDate);
  const viewPage = useSelector((state) => state.delayedUnitsPendingEmail.viewPage);

  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const fetchTableDatas = () => {
    updateData("emailBody", "");
    setLoading(true); // Start loading before API call
    DelayedUnitPendingEmailService.getDelayedUnitPendingEmailRecords(
      "",
      "",
      0,
      "",
      false,
      selectionType,
      selectedId,
      "",
      "",
      operationFlag,
      emailBody
    )
      .then((response) => {
        if (response && response?.data) {
          const { data } = response;

          const permission = data?.slice(data?.length - 1); // Get only the last item (or empty array if data is empty)

          updateData("listingData", data[0]);
          updateData("emailBody", data[0]?.BodyText?.trim());
          updateData("addDate", data[0]?.AddDate);
          updateData("userPermission", permission[0]?.Permission);
          setLoading(false);

          if (operationFlag == 2) {
            updateData("selectedId", null);
          }

          if (operationFlag == 1) {
            toast.success("Email send");
            navigate(`/delay-units-pending-email`);
          }
        } else {
          console.error("Unexpected API response format:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching bulk invoice data:", error);
      })
      .finally(() => {
        setLoading(false); // Ensure loading is stopped after API call
      });
  };

  useEffect(() => {
    if (selectedId == null) {
      navigate(`/delay-units-pending-email`);
    } else {
      fetchTableDatas();
    }
  }, [operationFlag]);

  const handleClose = () => {
    if (viewPage === false && selectedId) {
      setCloseShow(true);
    } else {
      dispatch(resetFields());

      navigate(`/`);
      toast.success("Page closed");
    }
  };

  const handleCloseYes = () => {
    dispatch(resetFields());
    navigate(`/`);
    toast.success("Page closed");
  };
  const handleCloseNo = () => {
    setCloseShow(false);
  };

  return (
    <div>
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={handleClose}
        >
          Close
        </button>
      </div>
      <div className="col-xs-6">
        <Modal show={closeShow} onHide={() => setCloseShow(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100">Close Delayed Unit Pending Email Changes </Modal.Title>
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
  );
};

export default FormHeader;
