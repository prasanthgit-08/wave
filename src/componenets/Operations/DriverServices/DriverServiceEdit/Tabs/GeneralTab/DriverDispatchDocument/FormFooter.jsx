import React, { useState } from "react";
import { useSelector } from "react-redux";
import DispatchDocumentsService from "../../../../../../../services/DispatchDocumentsService";
import toast from "react-hot-toast";
import PreviewPopup from "../../../../../../common/PreviewPopup";

const FormFooter = () => {
  const selectedId = useSelector((state) => state.dispatchDocuments.selectedId);
  const [fileContent, setFileContent] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loader, setLoader] = useState(false);
  const [database, setDatabase] = useState("Dispatches");
  const driverDispatctObjectKey = "DISP_HORIZON";
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userPK = loggedInUser?.userPK;

  const handlePrint = (email, print, printPopup, emailToDriver, emailToUser) => {
    const selectionRequestVO = {
      manualemail: false,
      isYardPrint: false,
      isPrint: false,
      isEmail: true,
      isEmailAttachmentDocumentPrint: printPopup,
      emailToCustomer: false,
      emailTocustomerPlant: false,
      emailToDealer: false,
      emailToUser: emailToUser,
      emailToDriver: emailToDriver,
      miscellaneousCustomerFlag: false,
      printYardFlag: false,
      isMailSend: printPopup ? false : true,
      userPK: userPK,

      primaryKey: selectedId,
      entityName: database,
      emailObjectKeyList: [driverDispatctObjectKey],
    };
    setLoader(true);
    DispatchDocumentsService.sendEmail(selectionRequestVO)
      .then((response) => {
        if (printPopup) {
          const attachments = response.data[0].attachments;

          if (attachments && typeof attachments === "object") {
            const firstFileKey = Object.keys(attachments)[0]; // e.g. "ifta.pdf"
            const fileBase64 = attachments[firstFileKey];

            if (fileBase64) {
              setFileContent(fileBase64);
              setShowPreview(true);
              toast.success("Form generated successfully");
            } else {
              toast.error("No file content found");
            }
          } else {
            toast.error("Invalid Data");
          }
        } else if (email && response) {
          toast.success("Email sent successfully");
        } else {
          toast.error("Error occured email  send");
        }
      })
      .catch((err) => {
        setLoader(false);
        toast.error("Error occured generating  Form");
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          disabled={!selectedId}
          onClick={() => {
            handlePrint(true, false, false, true, false);
          }}
        >
          Driver
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          disabled={!selectedId}
          onClick={() => {
            handlePrint(true, false, false, false, true);
          }}
        >
          User
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          disabled={!selectedId}
          onClick={() => {
            handlePrint(false, false, true, false, false);
          }}
        >
          Print
        </button>
        <PreviewPopup show={showPreview} onHide={() => setShowPreview(false)} base64PDF={fileContent} />

        {loader && (
          <div className="fade modal-backdrop show">
            {" "}
            <div className="pos-center">
              {" "}
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormFooter;
