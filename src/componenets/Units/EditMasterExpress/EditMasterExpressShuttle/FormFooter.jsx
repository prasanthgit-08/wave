import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setShowEditMasterExpressShuttle } from "../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";
import { useSelector } from "react-redux";
import EditMasterExpressService from "../../../../services/Units/EditMasterExpressService";
import { toast } from "react-hot-toast";
import PreviewPopup from "../../../common/PreviewPopup";
const FormFooter = ({ onHide }) => {
  const dispatch = useDispatch();
  /*** Redux States ***/
  const shuttleSaveData = useSelector((state) => state.editMasterExpressTabsReducer.shuttleSaveData);
  const shuttleSaveFlag = useSelector((state) => state.editMasterExpressTabsReducer.shuttleSaveFlag);
  const bolData = useSelector((state) => state.editMasterExpressTabsReducer.bolData);
  const printerDescription = useSelector((state) => state.editMasterExpressTabsReducer.printerDescription);

  const [loader, setLoader] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userPK = loggedInUser?.userPK;

  const saveShuttle = () => {
    setLoader(true);
    EditMasterExpressService.createShuttleRecord(shuttleSaveData)
      .then((response) => {
        const dispatchId = response.data;
        if (bolData?.printBOL) {
          const tempSaveFormData = {
            primaryKey: dispatchId,
            primaryKeyName: "DispatchPK",
            entityName: "Dispatches",
            emailObjectKeyList: ["DISP_HORIZON_TEST1"],
            emailObjectKey: "HRZ:DA",
            printObjectKey: "HRZ:DISP:NWBOL",
            documentType: "DISP_MAIL_DOCS",
            userPK: userPK,
            emailToUser: false,
            emailToDriver: false,
            emailToDealer: false,
            emailToCustomer: false,
            emailTocustomerPlant: false,
            email: false,
            print: true,
            isYardPrint: printerDescription ? true : false,
            printerName: printerDescription,
          };
          return EditMasterExpressService.generateandprintBol(tempSaveFormData).then(({ data }) => {
            setFileContent(data[0]?.attachments?.["BOL.pdf"]);
            setShowPreview(true);
          });
        } else {
          toast.success("Shuttle Record Created");
          setLoader(false);
          onHide();
        }
      })
      .catch((error) => {
        onHide();
        setLoader(false);
        console.error("Error:", error);
        toast.error("Something went wrong");
      });
  };

  const hidepopup = () => {
    onHide();
    setShowPreview(false);
    toast.success("Shuttle Record Created and Bol Generated");
    setLoader(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        {/* Save */}
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          disabled={shuttleSaveFlag}
          onClick={() => {
            saveShuttle();
          }}
        >
          Save
        </button>

        <PreviewPopup show={showPreview} base64PDF={fileContent} onHide={hidepopup} />
        {/* Cancel */}
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={() => {
            onHide();
          }}
        >
          Cancel
        </button>
      </div>
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
  );
};

export default FormFooter;
