import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DateInputField from "../../../common/DateInputField";
import { useDispatch, useSelector } from "react-redux";
import {
  updateField,
  updateScannedFiles,
  updateUploadedFiles,
} from "../../../../redux/Invoicing/TollsByPlateSlice";
import CustomDropzone from "../../../common/CustomDropzone";
import DWTComponent from "../../../../modules/dwt";

const TollsByPlateDetails = () => {
  const dispatch = useDispatch();

  const tollAgency = useSelector((state) => state.tollsByPlate.tollAgency);
  const plate = useSelector((state) => state.tollsByPlate.plate);
  const reference = useSelector((state) => state.tollsByPlate.reference);
  const invoiceNumber = useSelector((state) => state.tollsByPlate.invoiceNumber);
  const amount = useSelector((state) => state.tollsByPlate.amount);
  const tollDate = useSelector((state) => state.tollsByPlate.tollDate);
  const selectedSource = useSelector((state) => state.tollsByPlate.selectedSource);
  const selectedDescription = useSelector((state) => state.tollsByPlate.selectedDescription);
  const selectedPlate = useSelector((state) => state.tollsByPlate.selectedPlate);
  const selectedDriver = useSelector((state) => state.tollsByPlate.selectedDriver);
  const source = useSelector((state) => state.tollsByPlate.source);
  const description = useSelector((state) => state.tollsByPlate.description);
  const driver = useSelector((state) => state.tollsByPlate.driver);
  const plateNumber = useSelector((state) => state.tollsByPlate.plateNumber);
  const uploadedFiles = useSelector((state) => state.tollsByPlate.uploadedFiles);
  const scannedFiles = useSelector((state) => state.tollsByPlate.scannedFiles);
  const detailsLoading = useSelector((state) => state.tollsByPlate.detailsLoading);
  const isTollDateValid = useSelector((state) => state.tollsByPlate.isTollDateValid);
  const isUploadActive = useSelector((state) => state.tollsByPlate.isUploadActive);
  const isScanActive = useSelector((state) => state.tollsByPlate.isScanActive);

  // Regex to allow at most 2 digits before the decimal and 2 digits after
  const regex = /^\d{0,5}(\.\d{0,2})?$/;
  const testregex = /^\d{1,5}(\.\d{0,2})?$/;

  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const updateAmount = (value) => {
    if (value === ".") {
      updateData("amount", "0.");
    } else {
      updateData("amount", value);
    }
  };

  useEffect(() => {
    if (selectedPlate) {
      updateData("plate", selectedPlate);
      updateData("driver", selectedDriver);
      updateData("source", selectedSource);
      updateData("description", selectedDescription);
    } else {
      updateData("plate", plateNumber);
    }
  }, []);

  return (
    <div className="p-2  " style={{ height: "440px" }}>
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            {detailsLoading && (
              <div className="fade modal-backdrop show">
                <div className="pos-center">
                  <div className="loader"></div>
                </div>
              </div>
            )}
            <Row>
              <Col xs={6} className="m-l-2">
                <Form.Group className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0`}>
                  <Col xs={3} className="p-0">
                    <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                      Driver
                    </Form.Label>
                  </Col>

                  <Col xs={9} className="p-0 h">
                    <input
                      onChange={(e) => updateData("driver", e.target.value)}
                      className={`customFormControl `}
                      name=""
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={30}
                      value={driver}
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
      `}
                >
                  <Col xs={3} className="p-0">
                    <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                      Plate Number
                    </Form.Label>
                  </Col>

                  <Col xs={3} className="p-0 h">
                    <input
                      onChange={(e) => updateData("plate", e.target.value)}
                      className={`customFormControl `}
                      name=""
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={30}
                      disabled
                      value={plate}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
      `}
                >
                  <Col xs={3} className="p-0">
                    <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                      Description
                    </Form.Label>
                  </Col>

                  <Col xs={6} className="p-0 h">
                    <input
                      onChange={(e) => updateData("description", e.target.value)}
                      className={`customFormControl `}
                      name=""
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={30}
                      value={description}
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
              `}
                >
                  <Col xs={3} className="p-0">
                    <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                      Source
                    </Form.Label>
                  </Col>

                  <Col xs={6} className="p-0 h">
                    <input
                      onChange={(e) => updateData("source", e.target.value)}
                      className={`customFormControl `}
                      name=""
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={30}
                      value={source}
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
      `}
                >
                  <Col xs={3} className="p-0">
                    <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                      Toll Date
                    </Form.Label>
                  </Col>

                  <Col xs={3} className="p-0 h">
                    <DateInputField
                      setDate={(e) => updateData("tollDate", e)}
                      date={tollDate}
                      max={new Date()}
                      reduxSetDate={(value) => {}}
                      setIsDateValid={(val) => {
                        updateData("isTollDateValid", val);
                      }}
                      className={`${tollDate && isTollDateValid ? "borderGreen" : "borderRed"}`}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
              `}
                >
                  <Col xs={3} className="p-0">
                    <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                      Amount
                    </Form.Label>
                  </Col>

                  <Col xs={2} className="p-0 h">
                    <input
                      onChange={(e) =>
                        (e.target.value === "" || regex.test(e.target.value)) && updateAmount(e.target.value)
                      }
                      value={amount}
                      name=""
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={30}
                      className={`customFormControl ${
                        amount && amount != 0 && testregex.test(amount) ? "borderGreen" : "borderRed"
                      }`}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
              `}
                >
                  <Col xs={3} className="p-0">
                    <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                      Invoice Number
                    </Form.Label>
                  </Col>

                  <Col xs={3} className="p-0 h">
                    <input
                      onChange={(e) => updateData("invoiceNumber", e.target.value)}
                      className={`customFormControl ${invoiceNumber ? "borderGreen" : "borderRed"}`}
                      name=""
                      value={invoiceNumber}
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={15}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
              `}
                >
                  <Col xs={3} className="p-0">
                    <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                      Reference
                    </Form.Label>
                  </Col>

                  <Col xs={5} className="p-0 h">
                    <input
                      onChange={(e) => updateData("reference", e.target.value)}
                      className={`customFormControl ${reference ? "borderGreen" : "borderRed"}`}
                      value={reference}
                      name=""
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={21}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
              `}
                >
                  <Col xs={3} className="p-0">
                    <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                      Toll Agency
                    </Form.Label>
                  </Col>

                  <Col xs={6} className="p-0 h">
                    <input
                      onChange={(e) => updateData("tollAgency", e.target.value)}
                      className={`customFormControl ${tollAgency ? "borderGreen" : "borderRed"}`}
                      value={tollAgency}
                      name=""
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={30}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6} className="pe-4 p-16 position-relative" style={{ minHeight: "300px" }}>
                {isUploadActive && (
                  <CustomDropzone
                    previewWidthNumber={10}
                    dropzoneWidthNumber={10}
                    height={"150px"}
                    files={uploadedFiles}
                    setFiles={(files) => dispatch(updateUploadedFiles(files))}
                    dropzoneStyle={{ width: "390px" }}
                    dropzoneClassName={"m-t-12"}
                    customDropzoneMessage={`Drag 'n' Drop PDF files / Attach from your computer`}
                    fileType={"PDF"}
                    previewWrapperCustomClass={"pe px-0 mt-2"}
                  />
                )}

                {isScanActive && (
                  <DWTComponent
                    files={scannedFiles}
                    setFiles={(files) => dispatch(updateScannedFiles(files))}
                  />
                )}

                <div className="position-absolute w-100 ms-2" style={{ bottom: "-10px", left: "0" }}>
                  <button
                    className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5  ${
                      isUploadActive
                        ? "btn-warning"
                        : uploadedFiles?.length > 0
                          ? "btn-success"
                          : "btn-secondary"
                    }`}
                    type=""
                    onClick={() => {
                      const state = isUploadActive;
                      updateData("isUploadActive", !state);
                    }}
                    disabled={isScanActive}
                  >
                    Upload
                  </button>
                  <button
                    className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                    type=""
                    onClick={() => {
                      const state = isScanActive;
                      updateData("isScanActive", !state);
                    }}
                    disabled={isUploadActive}
                  >
                    Scan
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TollsByPlateDetails;
