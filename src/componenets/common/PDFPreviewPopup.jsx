import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const PDFPreviewPopup = ({
  show,
  onHide,
  file,
  fileURL,
  base64PDF,
  previewTitle = "PDF Preview",
  handleClose,
  showPrintOption = false,
  handlePrint,
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [isMaximized, setIsMaximized] = useState(true); // State to control modal size

  // Automatically show the modal when base64PDF/file is provided
  useEffect(() => {
    if (show === undefined && (base64PDF || file || fileURL)) {
      setShowPreview(true); // Open modal when base64PDF is available
    }
  }, [base64PDF, file, fileURL]); // Only run this effect when base64PDF changes

  // Function to toggle maximize/minimize state
  const toggleSize = () => setIsMaximized((prev) => !prev);

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
        show={show || showPreview}
        onHide={() => {
          if (onHide) {
            onHide();
          } else {
            setShowPreview(false);
          }
        }}
        size={isMaximized ? "lg" : "sm"}
      >
        <Modal.Header closeButton>
          <Modal.Title>PDF Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Embed PDF using iframe */}
          <iframe
            src={file || fileURL || base64BlobURL}
            width="100%"
            height={isMaximized ? "600px" : "300px"} // Adjust height based on size
            title={previewTitle}
          ></iframe>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex align-items-center justify-content-end">
            <div className="d-flex align-items-center flex-wrap">
              {(showPrintOption || handlePrint) && (
                <Button
                  variant="secondary"
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
                onClick={(e) => {
                  if (handleClose) {
                    handleClose();
                    onHide && onHide();
                  } else {
                    setShowPreview(false);
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

export default PDFPreviewPopup;
