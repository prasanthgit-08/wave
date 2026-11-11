import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Modal } from "react-bootstrap";
import ButtonComponent from "../../../../../../../common/Button";
import ModalComponent from "../../../../../../../common/ModalComponent";
import {
  setPageNumber,
  setNormalSortFlag,
  setNormalSortValue,
  setViewDetail,
  setChangesCancelled,
  setFormDetails,
  setCityStateCheck,
} from "../../../../../../../../redux/EditCheckinSlice";
import EditCheckinService from "../../../../../../../../services/EditCheckinService";
import { PermissionKeyGeneratorUtil } from "../../../../../../../../utils/PermissionKeyGeneratorUtil";

function FormFooter() {
  const { id, checkinId } = useParams();
  const [activeShow, setActiveShow] = useState(false);

  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [disableDelete, setDisableDelete] = useState(true);
  const [disableUndeliver, setDisableUndeliver] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [unDeliverModal, setUnDeliverModal] = useState(false);
  const [unDeliverResponseSuccess, setUnDeliverResponseSuccess] = useState("");
  const [clearPickupModal, setClearPickupModal] = useState(false);
  const [disableEditUndeliver, setDisableEditUndeliver] = useState(false);
  const [clearPickupFlag, setClearPickupFlag] = useState(false);

  const editFormData = useSelector((state) => state.editCheckinReducer.editFormData);
  const formDetails = useSelector((state) => state.editCheckinReducer.formDetails);

  const masterUser = useSelector((state) => state.editCheckinReducer.masterUser);
  const preInvoiced = useSelector((state) => state.editCheckinReducer.preInvoiced);
  const postalCode = useSelector((state) => state.editCheckinReducer.postalCode);
  const invoiceTracking = useSelector((state) => state.editCheckinReducer.invoiceTracking);
  const viewDetail = useSelector((state) => state.editCheckinReducer.viewDetail);
  const cityStateCheck = useSelector((state) => state.editCheckinReducer.cityStateCheck);
  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermission = PermissionKeyGeneratorUtil("editCheckin", "UNDLVR");
  const deletePermission = PermissionKeyGeneratorUtil("editCheckin", "DELETE");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveRecord = () => {
    EditCheckinService.saveCheckinRecords(formData)
      .then((res) => {
        navigate(`/edit-checkin-browse/${id}`);
        toast.success("Checkin  Updated");
      })
      .catch((err) => {
        navigate(`/edit-checkin-form/${id}/${checkinId}`);
        toast.error("Something went wrong");
      });
  };

  const deleteRecord = () => {
    EditCheckinService.deleteCheckinRecord(formData)
      .then((res) => {
        navigate(`/edit-checkin-browse/${id}`);
        toast.success("Checkin   Deleted");
      })
      .catch((err) => {
        navigate(`/edit-checkin-form/${id}/${checkinId}`);
        toast.error("Something went wrong");
      });
  };

  const unDeliverRecord = () => {
    EditCheckinService.undeliverCheckinRecord(formData)
      .then((res) => {
        const result = res.data[0];

        if (result?.ErrorMessage === "Success") {
          if (result.InvoiceTracking && result.PreInvoiced && result.MasterUser === false) {
            setShowModal(true); //The Unit is already Invoiced, can't undeliver? popup
          } else if (result.InvoiceTracking && result.PreInvoiced && result.MasterUser) {
            setUnDeliverModal(true); // {`The Unit is already invoiced, continue with Undeliver.`}
          } else if (result?.ClearPickupFlag) {
            toast.success("Undeliver Process Updated");

            setClearPickupModal(true); // {`If you want to clear pickup?`}
            setUnDeliverResponseSuccess(result?.ErrorMessage);
          } else {
            navigate(`/edit-checkin-browse/${id}`);
          }
        } else {
          navigate(`/edit-checkin-browse/${id}`);
        }
      })
      .catch((err) => {
        navigate(`/edit-checkin-form/${id}/${checkinId}`);
        toast.error("Something went wrong");
      });
  };

  const unDeliverRecordProcess = () => {
    EditCheckinService.unDeliverRecordProcess(checkinId)
      .then((res) => {
        if (res.data[0]?.ErrorMessage === "Success") {
          toast.success("Undeliver Process Updated");
        }
        if (res.data[0]?.ErrorMessage === "Success" && res.data[0]?.ClearPickupFlag) {
          setClearPickupModal(true);

          setUnDeliverResponseSuccess(res.data[0]?.ErrorMessage);
        } else {
          navigate(`/edit-checkin-browse/${id}`);
        }
      })
      .catch((err) => {
        console.error("Error in undeliver process:", err);
        toast.error("Something went wrong");
        if (id && checkinId) {
          navigate(`/edit-checkin-form/${id}/${checkinId}`);
        }
      });
  };

  const undeliverClearpickup = () => {
    EditCheckinService.undeliverClearpickup(formData)
      .then((res) => {
        navigate(`/edit-checkin-browse/${id}`);
        toast.success("Check In   Updated");
      })
      .catch((err) => {
        navigate(`/edit-checkin-form/${id}/${checkinId}`);
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    if (editFormData?.DeleteFlag === "N") {
      setDisableDelete(true);
    } else {
      setDisableDelete(false);
    }
  }, [editFormData]);

  useEffect(() => {
    if (editFormData?.UndeliverdFlag === "N") {
      setDisableUndeliver(true);
    } else {
      setDisableUndeliver(false);
    }
  }, [editFormData]);

  const handleClose = () => setShowModal(false);
  const handleYes = () => {
    setClearPickupFlag(true);
    setShowModal(false);
  };

  const handleCloseUndeliver = () => setUnDeliverModal(false);
  const handleYesUndeliver = () => {
    unDeliverRecordProcess();
  };

  const handleCloseClearPickup = () => setClearPickupModal(false);
  const handleYesClearPickup = () => {
    undeliverClearpickup();
  };

  useEffect(() => {
    if (unDeliverResponseSuccess === "Success") {
      setClearPickupModal(true);
    } else {
      setClearPickupModal(false);
    }
  }, [unDeliverResponseSuccess]);

  const handleCancel = () => {
    if (viewDetail === false && checkinId) {
      setCancelShow(true);
    } else {
      // Commenting out for bugfix
      // dispatch(setFormDetails());
      setCancelShow(false);
      dispatch(setViewDetail(false));

      navigate(`/edit-checkin-browse/${id}`);
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (checkinId) {
      // Commenting out for bugfix
      //  dispatch(setFormDetails());
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(setChangesCancelled());
      navigate(`/edit-checkin-form/${id}/${checkinId}`);

      toast.success("Changes Cancelled");
    } else {
      setCancelShow(false);
      // Commenting out for bugfix
      // dispatch(setFormDetails());
      navigate(`/edit-checkin-browse/${id}`);
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };

  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    EditCheckinService.deleteCheckinRecord(formData)
      .then((res) => {
        navigate(`/edit-checkin-browse/${id}`);
        toast.success("Check In   Deleted");
      })
      .catch((err) => {
        navigate(`/edit-checkin-browse/${id}`);
        toast.error("Something went wrong");
      });
    setDeleteShow(false);
  };
  useEffect(() => {
    if (deniedPermissions) {
      setDisableEditUndeliver(deniedPermissions.includes(editPermission));
      setDisableDelete(deniedPermissions.includes(deletePermission));
    }
  }, []);

  const formData = {
    city: formDetails?.currentLocationCity,
    stateCode: formDetails?.currentLocationStateCode,
    driverCheckInPK: formDetails?.driverCheckInPK,
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className=" align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          disabled={disableEditUndeliver || disableUndeliver}

          onClick={() => {
            unDeliverRecord();
          }}
          hidden={!viewDetail}
        >
          Undeliver
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          disabled={!postalCode}
          onClick={() => saveRecord()}
          hidden={viewDetail}
        >
          Save
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={false}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            dispatch(setViewDetail(false));
            dispatch(setCityStateCheck(true));
          }}
          hidden={!viewDetail}
        >
          Edit
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handleDelete}
          disabled={disableDelete}
          hidden={!viewDetail}
        >
          Delete
        </button>

        {/* model Active*/}

        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Edit Check In Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Record"}
          body={"Please confirm you want to Delete this Edit Check In  record"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
        {/* model Active*/}

        <Modal show={errorShow} onHide={() => setErrorShow(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 temp-red-color">Delete failed!</Modal.Title>
          </Modal.Header>

          <Modal.Body className="font-14 h-100">{errorMsg}</Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setErrorShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 ">{"Edit Check  In Confirmation"}</Modal.Title>
          </Modal.Header>

          <Modal.Body className="font-14 h-100">{`The Unit is already Invoiced, can't undeliver?`}</Modal.Body>

          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                handleYes();
                handleClose();
              }}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={unDeliverModal} onHide={handleCloseUndeliver}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 ">{"Edit Check In Confirmation"}</Modal.Title>
          </Modal.Header>

          <Modal.Body className="font-14 h-100">
            {`The Unit is already invoiced, continue with Undeliver.`}
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                handleYesUndeliver();
                handleCloseUndeliver();
              }}
            >
              Yes
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                handleCloseUndeliver();
              }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={clearPickupModal}
          onHide={() => {
            handleCloseClearPickup();
            navigate(`/edit-checkin-browse/${id}`);
          }}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 ">{"Edit Check In Confirmation"}</Modal.Title>
          </Modal.Header>

          <Modal.Body className="font-14 h-100">{`If you want to clear pickup?`}</Modal.Body>

          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                handleYesClearPickup();
                handleCloseClearPickup();
              }}
            >
              Yes
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                handleCloseClearPickup();
                navigate(`/edit-checkin-browse/${id}`);
              }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default FormFooter;
