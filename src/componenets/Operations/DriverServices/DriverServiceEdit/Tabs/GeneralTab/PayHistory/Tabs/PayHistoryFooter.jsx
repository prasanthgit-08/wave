import React, { useState } from "react";
import PreviewPopup from "../../../../../../../common/PreviewPopup";
import DriverPayHistoryService from "../../../../../../../../services/DriverPayHistoryService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import CustomRadioGroup from "../../../../../../../common/CustomRadioGroup";
import ReceiverSelectionModal from "../../../../../../../common/ReceiverSelectionModal ";

function PayHistoryFooter() {
  const [showPreview, setShowPreview] = useState(false);
  const [base64PDF, setBase64PDF] = useState();
  const [loading, setLoading] = useState(false);
  const [emailType, setEmailType] = useState("emailPdf");
  const [showReciever, setShowReciever] = useState(false);
  const [reciver, setReciver] = useState("user");

  const driverId = useSelector((state) => state.driverPayHistoryReducer.driverId);
  const fromDate = useSelector((state) => state.driverPayHistoryReducer.fromDate);
  const toDate = useSelector((state) => state.driverPayHistoryReducer.toDate);
  const activeTab = useSelector((state) => state.driverPayHistoryReducer.activeTab);
  const checkDetailList = useSelector((state) => state.driverPayHistoryReducer.checkDetailList);
  const checkHeaderList = useSelector((state) => state.driverPayHistoryReducer.checkHeaderList);
  const summaryLoading = useSelector((state) => state.driverPayHistoryReducer.loading);
  const detailLoading = useSelector((state) => state.driverPayHistoryReducer.detailLoading);
  const checkQueuedList = useSelector((state) => state.driverPayHistoryReducer.checkQueuedList);
  const queuedLoading = useSelector((state) => state.driverPayHistoryReducer.queuedLoading);

  const listLoading =
    activeTab === "summaryTab" ? summaryLoading : activeTab === "queuedTab" ? queuedLoading : detailLoading;
  const activeList =
    activeTab === "summaryTab" ? checkHeaderList : activeTab === "queuedTab" ? checkQueuedList : checkDetailList;

  /* nothing can be printed or mailed while the list is being fetched or an export is running */
  const exportDisabled = loading || listLoading || !(activeList && activeList?.length > 0);

  const exportSummary = (type, isuser) => {
    setLoading(true);
    DriverPayHistoryService.exportSummary(driverId, fromDate, toDate, type, isuser)
      .then((response) => {
        const { data } = response;
        if (data.errorCode === 1) {
          toast.error(data.errorMessage);
        } else {
          toast.success(data.errorMessage);
          if (data.fileContent) {
            setShowPreview(true);
            setBase64PDF(data.fileContent);
          }
        }
      })
      .catch(() => {
        toast.error("Error Occured");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // the Detail and Queued tabs share this export; tabType is "queued" for Queued and null for Detail
  const exportDetail = (type, isUser, tabType = null) => {
    setLoading(true);
    DriverPayHistoryService.exportDetail(driverId, fromDate, toDate, type, isUser, tabType)
      .then((response) => {
        const { data } = response;
        if (data.errorCode === 1) {
          toast.error(data.errorMessage);
        } else {
          toast.success(data.errorMessage);
          if (data.fileContent) {
            setShowPreview(true);
            setBase64PDF(data.fileContent);
          }
        }
      })
      .catch(() => {
        toast.error("Error Occured");
      })
      .finally(() => {
        setLoading(false);
        setReciver("user");
      });
  };
  const handleExport = (program, type, isUser) => {
    if (program === "summaryTab") {
      exportSummary(type, isUser);
    } else if (program === "queuedTab") {
      exportDetail(type, isUser, "queued");
    } else {
      exportDetail(type, isUser);
    }
  };

  const handleEmail = (type) => {
    setEmailType(type);
    setShowReciever(true);
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          type="button"
          onClick={() => {
            handleExport(activeTab, "display");
          }}
          disabled={exportDisabled}
        >
          Print
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          type="button"
          onClick={() => {
            handleEmail("emailPdf");
          }}
          disabled={exportDisabled}
        >
          Email
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          type="button"
          onClick={() => {
            handleEmail("emailExcel");
          }}
          disabled={exportDisabled}
        >
          Excel
        </button>
      </div>
      <PreviewPopup show={showPreview} onHide={() => setShowPreview(false)} base64PDF={base64PDF} />
      <ReceiverSelectionModal
        show={showReciever}
        onHide={() => {
          setReciver("user");
          setShowReciever(false);
        }}
        reciver={reciver}
        setReciver={setReciver}
        handleExport={() => handleExport(activeTab, emailType, reciver === "user")}
        body={
          <CustomRadioGroup
            options={[
              { value: "user", label: "User", disabled: false },
              { value: "driver", label: "Driver", disabled: false },
            ]}
            horizontal
            onChange={(value) => setReciver(value)}
            selectedOption={reciver}
            defaultWidth
          />
        }
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
}

export default PayHistoryFooter;
