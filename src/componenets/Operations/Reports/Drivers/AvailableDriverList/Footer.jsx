import React, { useEffect, useState } from "react";
import AvailableDriverListService from "../../../../../services/Reports/AvailableDriverListService";
import { toast } from "react-hot-toast";
import LoadingIcon from "../../../../common/LoadingIcon";
import PDFPreviewPopup from "../../../../common/PDFPreviewPopup";

function Footer({ formData, setFormData }) {
  const [base64PDF, setBase64PDF] = useState();
  const [type, setType] = useState();
  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  const retrunNewFormData = (type) => {
    return { ...formData, type: type };
  };

  const getAvailableDriverList = (type) => {
    setLoading(true);
    AvailableDriverListService.getAvailableDriverList(retrunNewFormData(type))
      .then((response) => {
        if (response.data.errorCode === 0) {
          setBase64PDF(response.data.fileContent); // Replace with your actual Base64-encoded PDF string
        } else {
          toast.success("Error while generating report");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const sendAvailableDriverList = (type) => {
    setLoading(true);
    AvailableDriverListService.sendAvaialbleDriverList(retrunNewFormData(type))
      .then((response) => {
        if (response.data.errorCode === 0) {
          toast.success("Email send Successfully");
        } else {
          toast.success("Error whilesending email");
        }
      })
      .finally(() => {
        setLoading(false);
      });
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
              getAvailableDriverList("display");
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
            sendAvailableDriverList("emailExcel"); /* setType("emailExcel") */
          }}
        >
          Email Excel
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          disabled={loading}
          onClick={() => {
            sendAvailableDriverList("emailPdf");
          }}
        >
          Email PDF
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          disabled={loading}
          onClick={() => {
            sendAvailableDriverList();
            setType("print");
          }}
        >
          Print
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          disabled={loading}
          onClick={""}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Footer;
