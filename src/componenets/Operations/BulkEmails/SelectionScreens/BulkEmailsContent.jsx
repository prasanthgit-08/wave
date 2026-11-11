import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Radio, RadioGroup } from "react-radio-group";
import BulkEmailsAttachment from "./BulkEmailsAttachment";
import BulkEmailsDrivers from "./BulkEmailsDrivers";
import BulkEmailsDealersScreen from "./BulkEmailsDealersScreen";
import BulkEmailsCustomer from "./BulkEmailsCustomer";
import BulkEmailsRecipenintList from "./BulkEmailsRecipenintList";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import { useDispatch, useSelector } from "react-redux";
import {
  setRecipientFile,
  updateField,
  updateMultipleFields,
} from "../../../../redux/Operations/BulkEmailSlice";
import BulkEmailsService from "../../../../services/operations/BulkEmailsService";
import { PermissionKeyGeneratorUtil } from "../../../../utils/PermissionKeyGeneratorUtil";

export const BulkEmailsContent = () => {
  const dispatch = useDispatch();

  const process = useSelector((state) => state.bulkEmails.process);
  const who = useSelector((state) => state.bulkEmails.who);
  const hasAttachments = useSelector((state) => state.bulkEmails.hasAttachments);
  const showAttachments = useSelector((state) => state.bulkEmails.showAttachments);
  const pastAttachmets = useSelector((state) => state.bulkEmails.pastAttachmets);
  const selectedId = useSelector((state) => state.bulkEmails.selectedId);

  const subject = useSelector((state) => state.bulkEmails.subject);
  const body = useSelector((state) => state.bulkEmails.body);

  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const reviewPermission = PermissionKeyGeneratorUtil("BLKE", "RVPR");
  const customerDealerBulkemailPermission = PermissionKeyGeneratorUtil("BLKE", "CDBEP");

  const [loading, setLoading] = useState(false);
  const [reviewPermissionDenied, setReviewPermissionDenied] = useState(true);
  const [customerDealerSentPermissionDenied, setCustomerDealerSentPermissionDenied] = useState(false);

  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const getPreviewData = () => {
    setLoading(true);
    BulkEmailsService.getPreview(selectedId)
      .then(({ data }) => {
        updateDefaultsForReview(data[0]);
        processBulkEmailBlobs(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const processBulkEmailBlobs = (data) => {
    const bulkEmailBlobs = data.filter((item) => "BulkEmailBLOBPK" in item);

    let recipientFile = null;
    const attachmentFiles = [];

    bulkEmailBlobs.forEach((blobData) => {
      // Decode base64 to binary
      const byteCharacters = atob(blobData.BLOB);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // Create Blob from byte array
      const blob = new Blob([byteArray], { type: blobData.mimeType || "" });

      // Create a File object with metadata
      const fileObject = new File([blob], blobData.FileName || "unknown_file", {
        type: blobData.mimeType || "",
        lastModified: Date.now(),
      });

      // Convert to the desired format
      const fileEntry = {
        file: fileObject,
        name: blobData.FileName,
        fileName: blobData.FileName,
        fileURL: URL.createObjectURL(fileObject), // Generate preview URL
      };

      if (blobData.EmailList === true) {
        if (!recipientFile) {
          recipientFile = fileEntry; // Store the first recipient file
        }
      } else {
        attachmentFiles.push(fileEntry); // Store remaining files as attachments
      }
    });

    // Dispatch recipientFile to Redux if it exists
    if (recipientFile) {
      dispatch(setRecipientFile(recipientFile));
      // updateData('recipientFile', recipientFile);
    }

    // Update attachment files
    updateData("uploadList", attachmentFiles);
  };

  useEffect(() => {}, [subject, body]);

  const updateDefaultsForReview = (data) => {
    const payload = {
      emailList: data.EmailList,
      hasAttachments: data.AttachFiles,
      birthDay: data.Birthday,
      body: data.Body,
      breakdownContacts: data.BreakdownContact,
      bulkEmailPK: data.BulkEmailPK,
      damageContacts: data.DamageContact,
      deleaseDate: data.DeleaseDate,
      deliveryContact: data.DeliveryContact,
      dispatchContact: data.DispatchContact,
      dispatchDelayContacts: data.DispatchDelayContact,
      dispatcher: data.Dispatcher,
      generalManager: data.GeneralManager,
      lastDispatch: data.LastDispatch,
      lastOrderDate: data.LastOrder,
      lotPointContacts: data.LotPointContact,
      lotSupervisor: data.LotSupervisor,
      orderContact: data.OrderContact,
      salesManager: data.SalesManager,
      serviceManager: data.ServiceManager,
      shuttleDelayContacts: data.ShuttleDelayContact,
      subject: data.Subject,
    };
    if (data.Driver) {
      payload.who = "Driver";
      if (data.AllDriver) {
        payload.division = "All";
      } else if (data.Motorized) {
        payload.division = "Motorized";
      } else if (data.Towable) {
        payload.division = "Towable";
      } else {
        payload.division = "Flatbed";
      }

      if (data.DriverActive) {
        payload.status = "Active";
      } else if (data.DriverInactive) {
        payload.status = "Inactive";
      } else {
        payload.status = "Deleased";
      }
    } else if (data.Dealer) {
      payload.who = "Dealer";
    } else if (data.EmailList) {
      payload.who = "Email List";
    } else {
      payload.who = "Customer";
      if (data.Plant) {
        payload.which = "Plant";
      } else {
        payload.which = "Customer";
      }
    }
    dispatch(updateMultipleFields(payload));
  };

  useEffect(() => {
    if (selectedId) {
      getPreviewData(selectedId);
    }
  }, []);

  useEffect(() => {
    if (deniedPermissions) {
      setReviewPermissionDenied(deniedPermissions.includes(reviewPermission));
      setCustomerDealerSentPermissionDenied(deniedPermissions.includes(customerDealerBulkemailPermission));
    }
  }, []);

  useEffect(() => {
    if (process === "Review") {
      updateData("hasAttachments", false);
      updateData("who", "Driver");
    }
  }, [process]);

  return (
    <Form>
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                  <Form.Group className="form-group  form-group  m-b-15 align-items-center row m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label className="col-form-label dealer-label p-l-15">Process</Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0">
                      <CustomRadioGroup
                        name={"process"}
                        horizontal
                        options={[
                          { value: "Review", disabled: reviewPermissionDenied },
                          { value: "New", disabled: false },
                        ]}
                        selectedOption={process}
                        onChange={(value) => {
                          updateData("process", value);
                        }}
                        disabled={showAttachments || pastAttachmets || selectedId}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group  form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label className="col-form-label dealer-label p-l-15">Attach Files</Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0">
                      <input
                        disabled={showAttachments || pastAttachmets || process === "Review"}
                        type="checkbox"
                        checked={hasAttachments}
                        onChange={(e) => {
                          updateData("hasAttachments", e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group  form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label className="col-form-label dealer-label p-l-15">Who</Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0">
                      <CustomRadioGroup
                        name={"who"}
                        horizontal
                        options={[
                          { value: "Driver", disabled: false },
                          { value: "Dealer", disabled: customerDealerSentPermissionDenied },
                          { value: "Customer", disabled: customerDealerSentPermissionDenied },
                          { value: "Email List", disabled: false },
                        ]}
                        selectedOption={who}
                        onChange={(value) => {
                          updateData("who", value);
                        }}
                        disabled={showAttachments || pastAttachmets || process === "Review"}
                      />
                    </Col>
                  </Form.Group>
                  {hasAttachments && showAttachments && !pastAttachmets && <BulkEmailsAttachment />}
                  {pastAttachmets && who === "Driver" && <BulkEmailsDrivers />}
                  {pastAttachmets && who === "Dealer" && <BulkEmailsDealersScreen />}
                  {pastAttachmets && who === "Customer" && <BulkEmailsCustomer />}
                  {pastAttachmets && who === "Email List" && <BulkEmailsRecipenintList />}
                </Col>
              </Row>
            </div>
          </div>
          {loading && (
            <div className="fade modal-backdrop show">
              <div className="pos-center">
                <div className="loader"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Form>
  );
};
