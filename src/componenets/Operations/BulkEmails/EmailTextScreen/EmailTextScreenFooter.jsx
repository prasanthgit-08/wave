import React, { useEffect, useState } from "react";
import ModalComponent from "../../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { resetDefaults, resetFields } from "../../../../redux/Operations/BulkEmailSlice";
import { useNavigate } from "react-router-dom";
import BulkEmailsService from "../../../../services/operations/BulkEmailsService";
import toast from "react-hot-toast";
import LoadingText from "../../../common/LoadingText";

const EmailTextScreenFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCancelModal, setshowCancelModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const process = useSelector((state) => state.bulkEmails.process);
  const selectedId = useSelector((state) => state.bulkEmails.selectedId);
  const hasAttachments = useSelector((state) => state.bulkEmails.hasAttachments);

  const who = useSelector((state) => state.bulkEmails.who);
  const which = useSelector((state) => state.bulkEmails.which);
  const status = useSelector((state) => state.bulkEmails.status);
  const division = useSelector((state) => state.bulkEmails.division);
  const lastDispatch = useSelector((state) => state.bulkEmails.lastDispatch);
  const deleaseDate = useSelector((state) => state.bulkEmails.deleaseDate);
  const birthDay = useSelector((state) => state.bulkEmails.birthDay);
  const lastOrderDate = useSelector((state) => state.bulkEmails.lastOrderDate);
  const orderContact = useSelector((state) => state.bulkEmails.orderContact);
  const dispatchContact = useSelector((state) => state.bulkEmails.dispatchContact);
  const dispatcher = useSelector((state) => state.bulkEmails.dispatcher);
  const dispatchDelayContacts = useSelector((state) => state.bulkEmails.dispatchDelayContacts);
  const breakdownContacts = useSelector((state) => state.bulkEmails.breakdownContacts);
  const damageContacts = useSelector((state) => state.bulkEmails.damageContacts);
  const shuttleDelayContacts = useSelector((state) => state.bulkEmails.shuttleDelayContacts);
  const lotPointContacts = useSelector((state) => state.bulkEmails.lotPointContacts);
  const lotSupervisor = useSelector((state) => state.bulkEmails.lotSupervisor);
  const generalManager = useSelector((state) => state.bulkEmails.generalManager);
  const salesManager = useSelector((state) => state.bulkEmails.salesManager);
  const serviceManager = useSelector((state) => state.bulkEmails.serviceManager);
  const deliveryContact = useSelector((state) => state.bulkEmails.deliveryContact);
  const subject = useSelector((state) => state.bulkEmails.subject);
  const body = useSelector((state) => state.bulkEmails.body);

  const recipientFile = useSelector((state) => state.bulkEmails.recipientFile);
  const uploadList = useSelector((state) => state.bulkEmails.uploadList);
  const dispatcherFK = useSelector((state) => state.bulkEmails.dispatcherFK);

  const saveList = {
    AttachFiles: hasAttachments ? 1 : 0,
    Type: who,
    SubType: who === "Customer" ? which : "",
    Status: who === "Driver" ? status : "",
    Division: who === "Driver" ? division : "",
    LastDispatch: lastDispatch,
    DeleaseDate: deleaseDate,
    Birthday: birthDay,
    LastOrderDate: lastOrderDate,
    GeneralManager: generalManager ? 1 : 0,
    SalesManager: salesManager ? 1 : 0,
    ServiceManager: serviceManager ? 1 : 0,
    OrderContacts: orderContact ? 1 : 0,
    DispatchContacts: dispatchContact ? 1 : 0,
    DeliveryContacts: deliveryContact ? 1 : 0,
    Dispatcher: dispatcher ? 1 : 0,
    DispatchDelayContacts: dispatchDelayContacts ? 1 : 0,
    BreakdownContacts: breakdownContacts ? 1 : 0,
    DamageContacts: damageContacts ? 1 : 0,
    ShuttleDelayContacts: shuttleDelayContacts ? 1 : 0,
    LotPointContact: lotPointContacts ? 1 : 0,
    LotSupervisor: lotSupervisor ? 1 : 0,
    EmailSubject: subject,
    EmailBody: body,
    dispatcherUserFK: dispatcherFK,
  };

  const handleCancelNo = () => {
    setshowCancelModal(false);
  };
  const handleCancelYes = () => {
    navigate("/bulk-emails-selection");
    dispatch(resetDefaults());
    setshowCancelModal(false);
    toast.success("Changes Cancelled.");
  };
  const handleSent = () => {
    setLoading(true);
    BulkEmailsService.sentEmail(saveList, recipientFile, uploadList, selectedId)
      .then(({ data }) => {
        if (data.errorCode === "0" || data.errorCode === 0) {
          toast.success("Email sent successful");
          dispatch(resetDefaults());
          navigate("/bulk-emails-selection");
        } else {
          toast.error(data.errorMessage);
          dispatch(resetDefaults());
          navigate("/bulk-emails-selection");
        }
      })
      .catch(() => {
        toast.error("Error sending email.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteRecord = () => {
    BulkEmailsService.deleteRecord(selectedId)
      .then(() => {
        toast.success("Record Deleted");
        dispatch(resetDefaults());
        navigate("/bulk-emails-selection");
      })
      .catch(() => {
        toast.error("Error while deleting record.");
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={() => {
            deleteRecord();
          }}
          hidden={process === "New"}
        >
          Delete
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={() => {
            handleSent();
          }}
          disabled={!subject?.trim() || !body?.trim()}
        >
          Send
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={() => {
            setshowCancelModal(true);
          }}
        >
          Cancel
        </button>
      </div>
      <ModalComponent
        show={showCancelModal}
        onHide={handleCancelNo}
        title={"Cancel Bulk Driver Emails"}
        body="Please confirm you want to cancel your changes."
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />
      {loading && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTextScreenFooter;
