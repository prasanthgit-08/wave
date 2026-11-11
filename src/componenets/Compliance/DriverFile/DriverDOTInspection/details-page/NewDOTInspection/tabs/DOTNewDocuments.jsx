import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

import CustomDropzone from "../../../../../../common/CustomDropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  setDriverDotInspectionDocumentFiles,
  setNewDocumentsTabValid,
  setDocumentsTabRedisKeys,
} from "../../../../../../../redux/Compliance/DriverDOTInspectionSlice";
import DWTComponent from "../../../../../../../modules/dwt";
import CustomDropzoneDisabled from "../../../../../../common/CustomDropzoneDisabled";
import DriverDOTInspectionService from "../../../../../../../services/Compliance/DriverDOTInspectionService";
import { setIsLoading } from "../../../../../../../redux/CustomerCreditCardSlice";
import LoadingIcon from "../../../../../../common/LoadingIcon";
import Input from "../../../../../../../components/common/input";

const DOTNewDocuments = () => {
  const dispatch = useDispatch();
  const [documentTypePK, setDocumentTypePK] = useState("");
  const [description, setDescription] = useState("");
  const [isUploadActive, setIsUploadActive] = useState(false);
  const [isScanActive, setIsScanActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [documentTypeLoading, setDocumentTypeLoading] = useState(false);

  const { uploadFiles, scanFiles } = useSelector(
    (state) => state.driverDOTInspection.driverDotInspectionDocumentFiles
  );

  const clearForm = () => {
    setDescription("");
    dispatch(setDriverDotInspectionDocumentFiles({ actionType: "clear" }));
  };

  const handleProcess = () => {
    setIsLoading(true);
    DriverDOTInspectionService.processCacheSave(documentTypePK, description, [...uploadFiles, ...scanFiles])
      .then((response) => {
        dispatch(
          setDocumentsTabRedisKeys({
            actionType: "update",
            payload: response.data,
          })
        );
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
        clearForm();
      });
  };

  const getDocumentTypeId = () => {
    setDocumentTypeLoading(true);
    DriverDOTInspectionService.getDocumentType()
      .then((response) => {
        const data = response?.data;
        if (data?.documentTypePK) {
          setDocumentTypePK(data?.documentTypePK);
        }
      })
      .catch((error) => {
        console.error("Error fetching document type:", error);
      })
      .finally(() => {
        setDocumentTypeLoading(false);
      });
  };

  useEffect(() => {
    getDocumentTypeId();
  }, []);

  useEffect(() => {
    if (
      isUploadActive ||
      isScanActive ||
      (description && uploadFiles?.length === 0 && scanFiles?.length === 0) ||
      (!description && (uploadFiles?.length !== 0 || scanFiles?.length !== 0))
    ) {
      dispatch(setNewDocumentsTabValid(false));
    } else {
      dispatch(setNewDocumentsTabValid(true));
    }
  }, [isUploadActive, isScanActive, description, uploadFiles, scanFiles]);

  return (
    <Form>
      <div className={"p-10 w-100"}>
        {(isLoading || documentTypeLoading) && <LoadingIcon />}
        <Row className="m-0 p-0">
          <Col xs={9}>
            <Form.Group className="mt-2  form-group  align-items-center row  m-l-0 m-r-0  ">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label">Description</Form.Label>
              </Col>

              <Col xs={3} md={3} sm={3} className="p-0 w-300">
                <Input
                  type="text"
                  id="Description"
                  className={`customFormControl ${
                    !description &&
                    (uploadFiles?.length > 0 || scanFiles?.length > 0 || isUploadActive || isScanActive)
                      ? "borderRed"
                      : ""
                  }`}

                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  name="Desc"
                  maxLength={30}
                />
              </Col>
            </Form.Group>

            <Form.Group className={`form-group align-items-center row m-l-0 m-r-0 mt-2`}>
              <Col xs={2} className="p-0">
                <Form.Label className="customColFormLabel"></Form.Label>
              </Col>

              <Col xs={1} className="p-0 w-125px">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                    isUploadActive ? "btn-danger" : uploadFiles?.length ? "btn-success" : "btn-secondary"
                  }`}
                  type="button"
                  onClick={() => setIsUploadActive((state) => !state)}
                  disabled={isScanActive}
                >
                  <i className="fa-solid fa-cloud-arrow-up me-1" />
                  Upload
                </button>
              </Col>
              <Col xs={2} className="p-0">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                    isScanActive ? "btn-danger" : scanFiles?.length ? "btn-success" : "btn-secondary"
                  }`}
                  type="button"
                  onClick={() => setIsScanActive((state) => !state)}
                  disabled={isUploadActive}
                >
                  <i class="fa-solid fa-expand me-2" />
                  Scan
                </button>
              </Col>
            </Form.Group>

            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-2">
              <Col xs={2} className="p-0" />
              <Col xs={10}>
                {/* Drag & Drop Component for Upload */}
                {isUploadActive && (
                  <CustomDropzone
                    files={uploadFiles}
                    setFiles={(files) =>
                      dispatch(
                        setDriverDotInspectionDocumentFiles({ actionType: "uploadFiles", payload: files })
                      )
                    }
                    fileType={"PDF"}
                    customDropzoneMessage={
                      uploadFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                  />
                )}
                {/* Scan Component for scanning documents */}
                {isScanActive && (
                  <DWTComponent
                    files={scanFiles}
                    setFiles={(files) =>
                      dispatch(
                        setDriverDotInspectionDocumentFiles({ actionType: "scanFiles", payload: files })
                      )
                    }
                  />
                )}
                {!isUploadActive && !isScanActive && <CustomDropzoneDisabled invisible />}
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row className="m-0 p-0 mt-2">
          <Col xs={9}>
            <Form.Group>
              <Col xs={12} className="d-flex justify-content-end">
                <button
                  className={`btn btn-secondary customButtonMediumWidth btn-sm me-4 mt-2 m-b-5`}
                  type="button"
                  onClick={() => handleProcess()}
                  disabled={
                    !(description && (uploadFiles?.length > 0 || scanFiles?.length > 0)) ||
                    isUploadActive ||
                    isScanActive
                  }
                >
                  Process
                </button>
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default DOTNewDocuments;
