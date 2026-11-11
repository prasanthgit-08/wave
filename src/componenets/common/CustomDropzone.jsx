/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDropzone } from "react-dropzone";

/**
 * CustomDropzone Component
 * ************************************
 * This component provides a customizable dropzone for file uploads with preview functionality.
 *
 * @component
 *
 * @prop {Array} files - The initial list of files.
 *
 * @prop {Function} setFiles - Handler function called to update the list of files.
 *
 * @prop {string} [mimeType=''] - The MIME type of the files to be accepted. Defaults to accepting all file types.
 *
 * @prop {Array} [fileExtensionsArray] - Array of acceptable file extensions (e.g., ['.pdf', '.png']).
 *
 * @prop {Object} [acceptTypesObject=null] - Object specifying acceptable MIME types and file extensions (e.g., {'application/pdf': ['.pdf']}).
 *
 * @prop {string} [fileType] - A shorthand for specifying common file types (e.g., 'pdf', 'image').
 *
 * @prop {string} [customDropzoneMessage=''] - Custom message to display inside the dropzone.
 *
 * @prop {string} [customFileTypeName=''] - Custom name to display for the file type in the dropzone message.
 *
 * @prop {string} [dropzoneClassName=''] - Additional CSS classes for the dropzone.
 *
 * @prop {Object} [dropzoneStyle] - Inline styles for the dropzone.
 *
 * @prop {boolean} [disabled=false] - If true, the dropzone will be disabled.
 *
 * @prop {string} [height='232px'] - Height of the dropzone container.
 *
 * @prop {number} [previewWidthNumber=6] - Width of the preview section as a fraction of 12 (Bootstrap grid system).
 *
 * @prop {number} [dropzoneWidthNumber=6] - Width of the dropzone section as a fraction of 12 (Bootstrap grid system).
 *
 * @prop {boolean} [hidePreview=false] - If true, the file preview section will be hidden.
 *
 * @prop {number} [maxFiles] - Maximum number of files that can be uploaded.
 *
 * @prop {boolean} [overWritePreviousFiles=false] - If true, newly uploaded files will replace previous files.
 *
 * @example
 * <CustomDropzone
 *   files={customerPaperworkFiles}
 *   setFiles={(files) => dispatch(setCustomerPaperworkFiles(files))}
 *   fileType={'PDF'}
 *   customDropzoneMessage={
 *     customerPaperworkFiles?.length === 0
 *       ? `Please Scan / Drag-Drop / Attach at least one document`
 *       : `Drag 'n' Drop PDF files / Attach from your computer`
 *   }
 * />
 */

const CustomDropzone = ({
  files = [],
  setFiles,
  // Refer https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
  // for common MIME types (Media type or File type)
  // If no file type information is provided, all types are accpeted
  mimeType = "", // 'application/pdf'
  fileExtensionsArray, // ['.pdf']
  acceptTypesObject = null,
  fileType, // pdf, image etc.. add more cases as required
  // ****************************
  customDropzoneMessage = "",
  customFileTypeName = "",
  dropzoneClassName = "",
  dropzoneStyle,
  disabled = false,
  height = "232px",
  // sum of preview & dropzone width number should be 12
  previewWidthNumber = 6,
  dropzoneWidthNumber = 6,
  hidePreview = false,
  maxFiles,
  overWritePreviousFiles = false,
  disableOnClick = false,
  showPreviewListPlaceholder = true,
  invisible = false,
  previewWrapperCustomClass,
  dropzonePreviewCustomClass,
}) => {
  const [temporaryFiles, setTemporaryFiles] = useState([]);

  const objectUrlsRef = useRef(new Set());
  const filesSignatureRef = useRef("");

  const normalizeFiles = (list) => {
    if (!list) return [];
    return Array.isArray(list) ? list : Array.from(list);
  };

  const getFilesSignature = (list) => {
    // Prevent unnecessary state updates when the parent passes a new array
    // reference containing identical file items.
    const arr = normalizeFiles(list);
    return arr.map((f) => `${f?.name || ""}|${f?.size || 0}|${f?.lastModified || 0}`).join("~");
  };

  // Keep ref in sync with local state (no re-render; helps prevent sync loops).
  useEffect(() => {
    filesSignatureRef.current = getFilesSignature(temporaryFiles);
  }, [temporaryFiles]);

  // Track preview URLs created/used in this component, so we can revoke them on unmount.
  useEffect(() => {
    temporaryFiles.forEach((file) => {
      if (file?.preview) objectUrlsRef.current.add(file.preview);
    });
  }, [temporaryFiles]);

  // Note: we intentionally do NOT revoke object URLs on unmount.
  // This component stores `preview` URLs on the `files` prop via `setFiles`,
  // so the parent may keep using those URLs even after this component unmounts.

  // Set mimeType and fileExtensionsArray based on fileType or custom values
  let localMimeType = "";
  let localFileExtensionsArray = [];

  if (mimeType) {
    // Use custom values if provided
    localMimeType = mimeType;
    localFileExtensionsArray = fileExtensionsArray || [];
  } else {
    // Use defaults based on fileType
    switch (fileType?.toLowerCase()) {
      case "pdf":
        localMimeType = "application/pdf";
        localFileExtensionsArray = [".pdf"];
        break;
      case "image":
        localMimeType = "image/*";
        localFileExtensionsArray = [".jpg", ".jpeg", ".png", ".gif"];
        break;
      case "csv":
        localMimeType = "text/csv";
        localFileExtensionsArray = [".csv"];
        break;
      // Add more cases for other file types as needed
      default:
        // Default values if fileType is not recognized
        localMimeType = "";
        localFileExtensionsArray = [];
        break;
    }
  }

  /**
   * For updating temporaryFiles when files prop changes
   * This is useful when files are set from outside the component
   */
  useEffect(() => {
    const normalizedFiles = normalizeFiles(files);
    const nextSignature = getFilesSignature(normalizedFiles);

    // In case of a race (drop handler updates local state but parent update arrives later),
    // ensure we don't stay stuck with an empty list when the parent already has files.
    const shouldSync =
      (normalizedFiles.length > 0 && temporaryFiles.length === 0) ||
      nextSignature !== filesSignatureRef.current;

    if (shouldSync) {
      setTemporaryFiles(normalizedFiles);
    }
  }, [files, filesSignatureRef, temporaryFiles.length]);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles?.length) {
        setTemporaryFiles((previousFiles) => {
          let updatedFiles;

          if (overWritePreviousFiles) {
            updatedFiles = acceptedFiles.map((file) =>
              Object.assign(file, { preview: URL.createObjectURL(file) })
            );
          } else {
            // one accepted file should not be present in any of the previous files
            const filteredFiles = acceptedFiles?.filter((acceptedFile) =>
              previousFiles.every(
                (previousFile) =>
                  !(previousFile.name === acceptedFile.name && previousFile.size === acceptedFile.size)
              )
            );

            updatedFiles = [
              ...previousFiles,
              ...filteredFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })),
            ];
          }

          // Update parent state directly here — prevents infinite loop
          setFiles && setFiles(updatedFiles);

          return updatedFiles;
        });
      }
    },
    [setFiles, overWritePreviousFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // if no file type info is given, accept all types
    accept:
      !localMimeType && !acceptTypesObject && !fileType
        ? {}
        : acceptTypesObject || {
            [localMimeType]: localFileExtensionsArray,
            // Examples
            // ********
            // 'application/pdf': ['.pdf'],
            // 'image/png': ['.png'],
            // 'text/html': ['.html', '.htm'],
          },
    disabled: disabled,
    maxFiles: maxFiles,
    noClick: disableOnClick,
    // maxSize: 1024 * 1000, in bytes
  });

  const removeFile = (fileName) => {
    setTemporaryFiles((currentFiles) => {
      const updatedFiles = currentFiles.filter((file) => file.name !== fileName);

      // Revoke the object URL associated with the removed file to prevent memory leaks
      const removedFile = currentFiles.find((file) => file.name === fileName);
      if (removedFile) {
        URL.revokeObjectURL(removedFile.preview);
        objectUrlsRef.current.delete(removedFile.preview);
      }

      setFiles && setFiles(updatedFiles);

      return updatedFiles;
    });
  };

  // object URL cleanup handled above

  return (
    <Row className={`customDropzoneWrapper ${invisible ? "invisible" : ""}`} style={{ height: height }}>
      {disabled ? (
        <Col xs={12} className="customDropzone customDropzoneDisabled" />
      ) : (
        <>
          {/* Dropzone */}
          <Col
            {...getRootProps({
              className: `${dropzoneClassName} customDropzone`,
              style: dropzoneStyle,
              xs:
                temporaryFiles?.length === 0
                  ? showPreviewListPlaceholder
                    ? hidePreview
                      ? 12
                      : dropzoneWidthNumber
                    : 12
                  : hidePreview
                    ? 12
                    : dropzoneWidthNumber,
            })}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <>
                {fileType && !customDropzoneMessage && (
                  <p>Drag 'n' Drop {customFileTypeName || fileType} files / Attach from your computer</p>
                )}
                {customDropzoneMessage ||
                  (!fileType && <p>Drag 'n' Drop files / Attach from your computer</p>)}
              </>
            )}
          </Col>

          {/* Preview */}
          {!hidePreview && temporaryFiles?.length > 0 && (
            <Col
              xs={previewWidthNumber}
              className={`customDropzonePreviewWrapper ${previewWrapperCustomClass || "pe-0"}`}
            >
              <div className={`customDropzonePreview ${dropzonePreviewCustomClass || "px-3"}`}>
                <ul className="filesList">
                  {(Array.isArray(temporaryFiles) ? temporaryFiles : Array.from(temporaryFiles || []))
                    ?.slice()
                    .reverse()
                    .map((file) => (
                      <li key={file.name} className="fileListItem py-2 d-flex justify-content-between pe-1">
                        <div className="col-10 fileName ps-1">
                          <a href={file.preview} target="_blank" rel="noreferrer">
                            {file.name}
                          </a>
                        </div>
                        <div className="col-1 closeFileIcon">
                          <span className="mx-2" style={{ cursor: "pointer" }}>
                            <i className="fa-solid fa-xmark" onClick={() => removeFile(file.name)} />
                          </span>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </Col>
          )}

          {/* PreviewList Placeholder */}
          {temporaryFiles?.length === 0 && !hidePreview && showPreviewListPlaceholder && (
            <Col
              xs={previewWidthNumber}
              className={`customDropzonePreviewWrapper ${previewWrapperCustomClass || "pe-0"}`}
            >
              <div
                className={`customDropzonePreview ${dropzonePreviewCustomClass || "px-3"} d-flex align-items-center justify-content-center`}
              >
                <p>No files uploaded</p>
              </div>
            </Col>
          )}
        </>
      )}
    </Row>
  );
};

export default CustomDropzone;
