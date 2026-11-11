/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Dynamsoft from "dwt";
import toast from "react-hot-toast";

const DWTComponent = ({ files = [], setFiles, height = "230px", width = "400px", loadScanner = false }) => {
  const containerId = "dwtcontrolContainer";
  const DWTObjectRef = useRef(null);
  const [isDWTReady, setIsDWTReady] = useState(false);
  const [temporaryFiles, setTemporaryFiles] = useState(files?.length ? files : []);

  const acquireImage = async () => {
    if (DWTObjectRef.current) {
      try {
        await DWTObjectRef.current.SelectSourceAsync();
        await DWTObjectRef.current.AcquireImageAsync({ IfCloseSourceAfterAcquire: true });

        // Retrieve the last scanned image index
        const lastIndex = DWTObjectRef.current.HowManyImagesInBuffer - 1;

        // Convert the last scanned image to a PDF blob
        DWTObjectRef.current.ConvertToBlob(
          [lastIndex],
          Dynamsoft.DWT.EnumDWT_ImageType.IT_PDF,
          (blob) => {
            if (blob) {
              // Convert Blob to PDF file
              const pdfFile = new File([blob], `scanned-document-${temporaryFiles.length + 1}.pdf`, {
                type: "application/pdf",
              });

              // Limiting file size as 1.5MB
              if (pdfFile?.size > 1.5 * 1024 * 1024) {
                // 1.5 MB limit
                toast.error("Exceeded file size limit of 1.5 MB");
              } else {
                Object.assign(pdfFile, { preview: URL.createObjectURL(pdfFile) });
                setTemporaryFiles((prevFiles) => [...prevFiles, pdfFile]);
              }

              // Clear the scanner buffer after saving the file
              DWTObjectRef.current.RemoveAllImages();
            }
          },
          (errorCode, errorString) => {
            console.error("Error converting to PDF:", errorString);
          }
        );
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const removeFile = (fileName) => {
    setTemporaryFiles((currentFiles) => {
      const updatedFiles = currentFiles.filter((file) => file.name !== fileName);

      // Revoke the object URL associated with the removed file to prevent memory leaks
      const removedFile = currentFiles.find((file) => file.name === fileName);
      if (removedFile) {
        URL.revokeObjectURL(removedFile.preview);
      }

      return updatedFiles;
    });
  };

  useEffect(() => {
    Dynamsoft.DWT.RegisterEvent("OnWebTwainReady", () => {
      DWTObjectRef.current = Dynamsoft.DWT.GetWebTwain(containerId);
      setIsDWTReady(true);
    });

    Dynamsoft.DWT.ProductKey = process.env.REACT_APP_DWT_KEY;
    Dynamsoft.DWT.ResourcesPath = "/dwt-resources";
    Dynamsoft.DWT.Containers = [
      {
        WebTwainId: "dwtObject",
        ContainerId: containerId,
        // Width: '300px',
        // Height: '400px'
        // Setting Height & Width as 0 for hiding preview
        Width: "0",
        Height: "0",
      },
    ];

    Dynamsoft.DWT.Load();
  }, []);

  // List available Scanners after Setup
  useEffect(() => {
    if (isDWTReady) {
      acquireImage();
    }
  }, [isDWTReady]);

  // Update Files property with tempFiles
  useEffect(() => {
    setFiles && setFiles(temporaryFiles);
  }, [temporaryFiles]);

  useEffect(() => {
    // To revoke the data uris to avoid memory leaks, will run on unmount (allows browser to reclaim memory)
    return () => temporaryFiles.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        {/*** For future refrence ***/}
        {/* Moved functionlity to onLoad in useEffect */}
        {/* <button onClick={acquireImage} disabled={!isDWTReady} className="btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 btn-secondary">
          {isDWTReady ? "Select Scanner" : "Loading Scanner"}
        </button> */}
        <div id={containerId}></div>
        <div className="customDropzonePreview px-3" style={{ width: width, height: height }}>
          <h5 className="heading pb-1">Scanned Files:</h5>

          <ul className="filesList">
            {temporaryFiles?.map((file) => (
              <li key={file.name} className="fileListItem py-2 d-flex justify-content-between pe-1">
                {/* TODO: File preview as small image if required */}
                {/* <Image src={file.preview} alt={file.name} width={50} height={50} /> */}
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
      </div>
    </div>
  );
};

export default DWTComponent;
