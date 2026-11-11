import React, { useEffect, useState } from "react";
import ModalComponent from "../../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { resetDefaults, resetFields, updateField } from "../../../../redux/Operations/BulkEmailSlice";
import { useNavigate } from "react-router-dom";
import BulkEmailsService from "../../../../services/operations/BulkEmailsService";
import toast from "react-hot-toast";
import UsersService from "../../../../services/UsersService";

const BulkEmailsFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showCancelModal, setshowCancelModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const hasAttachments = useSelector((state) => state.bulkEmails.hasAttachments);
  const showAttachments = useSelector((state) => state.bulkEmails.showAttachments);
  const pastAttachmets = useSelector((state) => state.bulkEmails.pastAttachmets);
  const status = useSelector((state) => state.bulkEmails.status);
  const division = useSelector((state) => state.bulkEmails.division);
  const who = useSelector((state) => state.bulkEmails.who);
  const which = useSelector((state) => state.bulkEmails.which);
  const lastDispatch = useSelector((state) => state.bulkEmails.lastDispatch);
  const deleaseDate = useSelector((state) => state.bulkEmails.deleaseDate);
  const birthDay = useSelector((state) => state.bulkEmails.birthDay);
  const lastDispatchValid = useSelector((state) => state.bulkEmails.lastDispatchValid);
  const deleaseDateValid = useSelector((state) => state.bulkEmails.deleaseDateValid);
  const birthDayValid = useSelector((state) => state.bulkEmails.birthDayValid);
  const lastOrderDate = useSelector((state) => state.bulkEmails.lastOrderDate);
  const lastOrderDateValid = useSelector((state) => state.bulkEmails.lastOrderDateValid);
  const subject = useSelector((state) => state.bulkEmails.subject);
  const body = useSelector((state) => state.bulkEmails.body);
  const recipientFile = useSelector((state) => state.bulkEmails.recipientFile);

  const process = useSelector((state) => state.bulkEmails.process);
  const nextPage = useSelector((state) => state.bulkEmails.nextPage);
  const selectedId = useSelector((state) => state.bulkEmails.selectedId);

  const generalManager = useSelector((state) => state.bulkEmails.generalManager);
  const salesManager = useSelector((state) => state.bulkEmails.salesManager);
  const serviceManager = useSelector((state) => state.bulkEmails.serviceManager);
  const deliveryContact = useSelector((state) => state.bulkEmails.deliveryContact);
  const dispatchContact = useSelector((state) => state.bulkEmails.dispatchContact);
  const orderContact = useSelector((state) => state.bulkEmails.orderContact);

  const uploadList = useSelector((state) => state.bulkEmails.uploadList);
  const dispatcher = useSelector((state) => state.bulkEmails.dispatcher);
  const dispatchDelayContacts = useSelector((state) => state.bulkEmails.dispatchDelayContacts);
  const breakdownContacts = useSelector((state) => state.bulkEmails.breakdownContacts);
  const damageContacts = useSelector((state) => state.bulkEmails.damageContacts);
  const shuttleDelayContacts = useSelector((state) => state.bulkEmails.shuttleDelayContacts);
  const lotPointContacts = useSelector((state) => state.bulkEmails.lotPointContacts);
  const lotSupervisor = useSelector((state) => state.bulkEmails.lotSupervisor);
  const dispatcherFK = useSelector((state) => state.bulkEmails.dispatcherFK);

  const [permissionLoader, setPermissionLoader] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userID = loggedInUser?.userPK;

  // Driver date filters: at least one valid date is required, and no shown date field may hold invalid text
  const hasValidDriverDate =
    status === "Deleased"
      ? (lastDispatch && lastDispatchValid) || (deleaseDate && deleaseDateValid) || (birthDay && birthDayValid)
      : lastDispatch && lastDispatchValid;
  const hasInvalidDriverDate =
    status === "Deleased" ? !lastDispatchValid || !deleaseDateValid || !birthDayValid : !lastDispatchValid;
  const driverDatesBlocked = !hasValidDriverDate || hasInvalidDriverDate;

  const saveList = {
    AttachFiles: hasAttachments ? 1 : 0,
    Type: who,
    SubType: who === "Customer" ? which : "",
    Status: status,
    Division: division,
    LastDispatch: lastDispatch || "",
    DeleaseDate: deleaseDate || "",
    Birthday: birthDay || "",
    LastOrderDate: lastOrderDate || "",
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
    LotPointContacts: lotPointContacts ? 1 : 0,
    LotSupervisor: lotSupervisor ? 1 : 0,
    EmailSubject: subject,
    EmailBody: body,
    DispatcherUserFK: dispatcherFK,
  };

  const handleCancelNo = () => {
    setshowCancelModal(false);
  };
  const handleCancelYes = () => {
    if (!showAttachments && !pastAttachmets && !nextPage) {
      dispatch(resetFields());
    } else {
      dispatch(resetDefaults());
    }
    setshowCancelModal(false);

    // toast.success("Changes Cancelled.")
  };
  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const handleNext = () => {
    if (process === "Review" && !selectedId) {
      navigate("/bulk-emails-browse");
    } else if (hasAttachments && !showAttachments) {
      updateData("showAttachments", true);
    } else if (!pastAttachmets) {
      // updateData("showAttachments", false);
      updateData("pastAttachmets", true);
    } else if (status !== "Active" && !nextPage) {
      updateData("nextPage", true);
    } else {
      navigate("/bulk-emails-text");
    }
  };

  const exportList = () => {
    setLoading(true);
    BulkEmailsService.exportExcel(saveList)
      .then(({ data }) => {
        if (data.errorCode === "0") {
          toast.success("Export Succesfull");
          navigate("/bulk-emails-selection");
          dispatch(resetDefaults());
        } else {
          toast.error(data.errorMessage);
        }
      })
      .catch(() => {
        toast.error("Error while exporting list.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getDispatchUserByPermission = () => {
    setPermissionLoader(true);
    UsersService.getDispatcherUserByPermission(userID)
      .then((res) => {
        const response = res?.data;
        if (response[0]?.IsDispatcher) {
          updateData("dispatcherFK", loggedInUser?.userPK);
          updateData("dispatcherInput", loggedInUser?.name?.trim());
        }
      })
      .catch(() => {})
      .finally(() => {
        setPermissionLoader(false);
      });
  };

  useEffect(() => {
    return () => {
      getDispatchUserByPermission();
    };
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={() => {
            exportList();
          }}
          hidden={selectedId || !pastAttachmets || who === "Email List"}
          disabled={
            (who === "Driver" && status !== "Active" && (!nextPage || driverDatesBlocked)) ||
            (pastAttachmets && who?.trim() === "Email List" && !recipientFile) ||
            (who === "Customer" &&
              pastAttachmets &&
              (!lastOrderDate ||
                !lastOrderDateValid ||
                !(
                  dispatchContact ||
                  orderContact ||
                  dispatcher ||
                  dispatchDelayContacts ||
                  breakdownContacts ||
                  damageContacts ||
                  shuttleDelayContacts ||
                  lotPointContacts ||
                  lotSupervisor
                ))) ||
            (who === "Dealer" &&
              pastAttachmets &&
              (!lastOrderDate ||
                !lastOrderDateValid ||
                !(
                  generalManager ||
                  salesManager ||
                  serviceManager ||
                  orderContact ||
                  dispatchContact ||
                  deliveryContact
                )))
          }
        >
          Export
        </button>

        <button
          onClick={handleNext}
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          disabled={
            (who === "Driver" && status !== "Active" && nextPage && driverDatesBlocked) ||
            (showAttachments && uploadList?.length < 1) ||
            (pastAttachmets && who?.trim() === "Email List" && !recipientFile) ||
            (who === "Customer" &&
              pastAttachmets &&
              (!lastOrderDate ||
                !lastOrderDateValid ||
                !(
                  dispatchContact ||
                  orderContact ||
                  dispatcher ||
                  dispatchDelayContacts ||
                  breakdownContacts ||
                  damageContacts ||
                  shuttleDelayContacts ||
                  lotPointContacts ||
                  lotSupervisor
                ))) ||
            (who === "Dealer" &&
              pastAttachmets &&
              (!lastOrderDate ||
                !lastOrderDateValid ||
                !(
                  generalManager ||
                  salesManager ||
                  serviceManager ||
                  orderContact ||
                  dispatchContact ||
                  deliveryContact
                )))
          }
        >
          Next
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={() => {
            handleCancelYes();
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
    </div>
  );
};

export default BulkEmailsFooter;
