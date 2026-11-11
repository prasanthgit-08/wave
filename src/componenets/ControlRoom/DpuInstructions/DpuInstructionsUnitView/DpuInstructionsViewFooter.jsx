import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setViewCancel } from "../../../../redux/DpuInstructionsSlice";
import DpuInstructionsService from "../../../../services/DpuInstructionsService";
import PreviewPopup from "../../../common/PreviewPopup";
import LoadingIcon from "../../../common/LoadingIcon";

function DpuInstructionsViewFooter() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fileContent, setFileContent] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loader, setLoader] = useState(false);
  const [bolLoading, setBolLoading] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userPK = loggedInUser?.userPK;
  const selectId = useSelector((state) => state.dpuInstructionsReducer.selectId);

  const handleCancel = () => {
    dispatch(setViewCancel(true));
    navigate(`/dpu-unit-selection`);
    toast.success("Changes Cancelled");
  };

  const handleTest = () => {
    setBolLoading(true);
    const selectionRequestVO = {
      manualemail: false,
      isYardPrint: false,
      isPrint: true,
      emailToCustomer: false,
      emailTocustomerPlant: false,
      emailToDealer: false,
      emailToUser: false,
      emailToDriver: false,
      miscellaneousCustomerFlag: false,
      printYardFlag: false,
      primaryKey: selectId,
      entityName: "Units",
      isEmail: false,
      emailObjectKeyList: [],
      printObjectKey: "HRZ:ORD:NWBOL",
      documentType: "",
      isDocumentSave: false,
      userPK: userPK,
    };
    DpuInstructionsService.sendEmail(selectionRequestVO)
      .then((response) => {
        if (response && response.data) {
          const attachments = response.data[0].attachments;

          if (attachments && typeof attachments === "object") {
            const firstFileKey = Object.keys(attachments)[0];
            const fileBase64 = attachments[firstFileKey];

            if (fileBase64) {
              setBolLoading(false);
              setFileContent(fileBase64);
              setShowPreview(true);
              toast.success("Form generated successfully");
            } else {
              toast.error("No file content found");
            }
          } else {
            toast.error("Invalid Data");
          }
        } else {
          toast.error("Invalid Data");
        }
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const hidepopup = () => {
    setShowPreview(false);
  };

  return (
    <div className="d-flex  align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {bolLoading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleTest}
        >
          Print BOL
        </button>

        <PreviewPopup show={showPreview} base64PDF={fileContent} onHide={hidepopup} />

        <button className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5" onClick={handleCancel}>
          Cancel
        </button>

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
}

export default DpuInstructionsViewFooter;
