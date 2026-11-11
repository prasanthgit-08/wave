import React, { useState } from "react";
import ProjectReportService from "../../../../../services/Reports/ProjectReportService";
import { toast } from "react-hot-toast";
import LoadingIcon from "../../../../common/LoadingIcon";
import PDFPreviewPopup from "../../../../common/PDFPreviewPopup";

function Footer({ formData, setFormData, handleCancel }) {
  const [base64PDF, setBase64PDF] = useState();
  // const [type,setType] = useState();
  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  const retrunNewFormData = (type) => {
    return { ...formData, type: type };
  };

  const getProjectReport = (type) => {
    setLoading(true);
    ProjectReportService.getProjectReport(retrunNewFormData(type))
      .then((response) => {
        if (response.data.errorCode === 0) {
          toast.success(response.data.errorMessage);
          setBase64PDF(response.data.fileContent); // Replace with your actual Base64-encoded PDF string
        } else {
          toast.error("Error while generating report");
          // toast.error(response.data.errorMessage);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const sendProjectReport = (type) => {
    setLoading(true);
    // AvailableDriverListService.sendAvaialbleDriverList(retrunNewFormData(type))
    // .then ((response => {
    //   if(response.data.errorCode ===0){
    //     toast.success("Email send Successfully");
    //     }else{
    //       toast.success("Error whilesending email");
    //     }

    // })).finally(() => {
    //   setLoading(false);
    // })
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap"></div>
      <div className="d-flex align-items-center flex-wrap">
        {loading && <LoadingIcon />}

        <div>
          <button
            disabled={loading}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              getProjectReport("display");
              // setType("display"); // Uncomment if needed
            }}
          >
            Displays
          </button>
          {base64PDF && <PDFPreviewPopup base64PDF={base64PDF} />}
        </div>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          disabled={loading}
          onClick={() => {
            getProjectReport("emailExcel");
          }}
        >
          Email Excel
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          disabled={loading}
          onClick={() => {
            getProjectReport("emailPdf");
          }}
        >
          Email PDF
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          disabled={loading}
          onClick={() => {
            getProjectReport("print");
          }}
        >
          Print
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          disabled={loading}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Footer;
