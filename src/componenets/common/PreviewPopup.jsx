import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

/**
 * PreviewPopup - A reusable modal component for displaying PDF previews.
 */
const PreviewPopup = ({
  show,
  onHide,
  file,
  fileURL,
  /** Base64-encoded PDF string to display in the modal. */
  base64PDF,
  previewTitle = "PDF Preview",
  handleClose,
  /** Modal size, can be 'sm', 'md', 'lg', or 'xl'. Default is 'xl'. */
  size = "xl",
  height = "650px",
  /** Controls the visibility of the print button in the footer. */
  showPrintOption = false,
  handlePrint,
}) => {
  const [showPreview, setShowPreview] = useState(false);

  // Automatically show the modal when base64PDF/file is provided
  useEffect(() => {
    if (show === undefined && (base64PDF || file || fileURL)) {
      setShowPreview(true); // Open modal when base64PDF is available
    }
  }, [base64PDF, file, fileURL]);

  // Convert base64 string to a Blob URL
  // const byteCharacters = atob(base64PDF); // Your base64 PDF string
  // const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
  // const byteArray = new Uint8Array(byteNumbers);
  // const blob = new Blob([byteArray], { type: 'application/pdf' });
  // const blobURL = URL.createObjectURL(blob);
  const base64ToBlobURL = (base64File, fileType = "application/pdf") => {
    if (base64File) {
      const byteCharacters = atob(base64File); // Decode base64 string
      const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0)); // Convert to char codes
      const byteArray = new Uint8Array(byteNumbers); // Create byte array
      const blob = new Blob([byteArray], { type: fileType }); // Create Blob with the specified file type
      const blobURL = URL.createObjectURL(blob); // Create and return Blob URL

      return blobURL;
    } else {
      return null;
    }
  };
  const base64BlobURL = (base64PDF && base64ToBlobURL(base64PDF)) || null;

  return (
    <>
      {/* Modal to display the PDF */}
      <Modal
        backdrop="static"
        show={show || showPreview}
        onHide={() => {
          if (onHide) {
            onHide();
          } else {
            setShowPreview(false);
          }
        }}
        size={size}
      >
        <Modal.Header closeButton>
          <Modal.Title>{previewTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Embed file using iframe */}
          <iframe
            src={file || fileURL || base64BlobURL}
            width="100%"
            height={height}
            title={previewTitle}
          ></iframe>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex align-items-center justify-content-end">
            <div className="d-flex align-items-center flex-wrap">
              {(showPrintOption || handlePrint) && (
                <Button
                  variant="secondary"
                  className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
                  onClick={(e) => {
                    if (handlePrint) {
                      handlePrint();
                    }
                  }}
                >
                  Print
                </Button>
              )}
              <Button
                variant="secondary"
                className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
                onClick={(e) => {
                  if (handleClose) {
                    handleClose();
                  } else {
                    setShowPreview(false);
                    onHide && onHide();
                  }
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PreviewPopup;
