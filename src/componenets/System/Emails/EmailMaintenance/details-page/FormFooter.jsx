import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Form, Col } from "react-bootstrap";
import ModalComponent from "../../../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EmailFormatService from "../../../../../services/EmailFormatService";
import toast from "react-hot-toast";
import {
  resetChanges,
  setViewDetail,
  setChangesCancelled,
  setIsDescriptionUnique,
  setRecordPrimaryKey,
  setIsTableExists,
} from "../../../../../redux/EmailFormatsSlice";
import {
  setId,
  setPageNumber,
  setSearchTerm,
  setSearchCriteria,
  setListingData,
  setNormalSortValue,
  setNormalSortFlag,
} from "../../../../../redux/EmailRecipientSlice";
import { resetEmailAttachment } from "../../../../../redux/EmailAttachmentSlice";
import LoadingIcon from "../../../../common/LoadingIcon";

const FormFooter = () => {
  const { id, pageNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailFormatPK = useSelector((state) => state.emailFormats.emailFormatPK);
  const objectKey = useSelector((state) => state.emailFormats.objectKey);
  const description = useSelector((state) => state.emailFormats.description);
  const senderUserId = useSelector((state) => state.emailFormats.senderUserFK);
  const emailSenderTypeId = useSelector((state) => state.emailFormats.senderTypeFK);
  const databaseTable = useSelector((state) => state.emailFormats.databaseTableName);
  const xmlText = useSelector((state) => state.emailFormats.emailBodyFormat);
  const subject = useSelector((state) => state.emailFormats.emailSubject);
  const isDescriptionUnique = useSelector((state) => state.emailFormats.isDescriptionUnique);
  const isObjectKeyUnique = useSelector((state) => state.emailFormats.isObjectKeyUnique);
  const isTableExists = useSelector((state) => state.emailFormats.isTableExists);
  const isFormatTabValid = useSelector((state) => state.emailFormats.isFormatTabValid);
  const isSubjectTabValid = useSelector((state) => state.emailFormats.isSubjectTabValid);

  const viewDetail = useSelector((state) => state.emailFormats.viewDetail);
  const [disableSave, setDisableSave] = useState(true);
  const [cancelShow, setCancelShow] = useState(false);
  const [testShow, setTestShow] = useState(false);
  const [emailTestSuccess, setEmailTestSuccess] = useState(false);
  const [emailTestError, setEmailTestError] = useState(false);
  const [emailTestErrorMsg, setEmailTestErrorMsg] = useState("");
  const [testEmailLoader, setTestEmailLoader] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);

  //local state
  const [primaryKey, setPrimaryKey] = useState("");
  const [loader, setLoader] = useState(false);
  const [checking, setCheking] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userPK = loggedInUser?.userPK;

  const EmailFormatFormData = {
    emailFormatPK,
    objectKey,
    description,
    senderUserId,
    emailSenderTypeId,
    databaseTable,
    xmlText,
    subject,
  };

  const EmailGenerationData = {
    manualemail: false,
    isYardPrint: false,
    isPrint: false,
    emailToCustomer: false,
    emailTocustomerPlant: false,
    emailToDealer: false,
    emailToUser: true,
    emailToDriver: false,
    miscellaneousCustomerFlag: false,
    printYardFlag: false,

    primaryKey: primaryKey,
    entityName: databaseTable,

    isEmail: true,
    emailObjectKeyList: objectKey ? [objectKey] : [],
    documentType: "",
    isDocumentSave: false,
    userPK: userPK,
  };

  const saveEmailFormats = () => {
    setLoader(true);
    EmailFormatService.saveEmailFormats(EmailFormatFormData)
      .then((response) => {
        navigate("/email-maintenance");
        if (id) {
          toast.success("Email Updated");
        } else {
          toast.success("Email Created");
        }
        dispatch(resetChanges());
      })
      .catch((error) => {
        setLoader(false);
        navigate("/email-maintenance");
        let msg = "";
        if (error.response) {
          msg = error.response.data.errorMsg;
        }
        if (msg === null || msg === "" || msg === undefined) {
          msg = "Something went wrong !! Failed to save the record !!";
        }
        toast.error(msg);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const validateAndSaveEmailFormats = () => {
    setCheking(true);
    //Save only if  all validations are ok
    EmailFormatService.validateEmailFormats(EmailFormatFormData)
      .then((res) => {
        if (res.data) {
          saveEmailFormats();
        }
      })
      .catch((err) => {
        toast.error("tab validation failed");
      })
      .finally(() => setCheking(false));
  };

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      dispatch(setIsDescriptionUnique(true));
      dispatch(setIsTableExists(true));
      dispatch(resetChanges());
      navigate("/email-maintenance");
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => setCancelShow(false);

  const handleCancelYes = () => {
    dispatch(setIsDescriptionUnique(true));
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(setIsTableExists(true));
      dispatch(setChangesCancelled(true));
      toast.success("Changes Cancelled");
    } else {
      navigate("/email-maintenance");
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      toast.success("Changes Cancelled");
    }
  };

  const handleDelete = () => setDeleteShow(true);

  const handleDeleteNo = () => setDeleteShow(false);

  const handleDeleteYes = () => {
    EmailFormatService.deleteEmailFormat(id)
      .then((response) => {
        navigate("/email-maintenance");
        toast.success("Email Deleted");
        dispatch(resetChanges);
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        navigate(`/email-maintenance/${id}/${pageNumber}`);
      });
    setDeleteShow(false);
  };

  const testEmailFormat = () => {
    setTestEmailLoader(true);
    EmailFormatService.emailGeneration(EmailGenerationData)
      .then((res) => {
        if (res.data) {
          setEmailTestSuccess(true);
        } else {
          toast.error("No Record Exist!");
        }
        setTestEmailLoader(false);
        setTestShow(false);
      })
      .catch((err) => {
        setTestEmailLoader(false);
        setEmailTestErrorMsg(err.response?.data?.message || "Sorry, something went wrong.Please try again.");
        setTestShow(false);
        setEmailTestError(true);
      });
  };

  useEffect(() => {
    if (
      objectKey?.trim() !== "" &&
      isObjectKeyUnique &&
      description?.trim() !== "" &&
      isDescriptionUnique &&
      (senderUserId !== "" || emailSenderTypeId !== "") &&
      databaseTable?.trim() !== "" &&
      isTableExists &&
      xmlText?.trim() !== "" &&
      subject?.trim() !== ""
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [
    objectKey,
    description,
    senderUserId,
    emailSenderTypeId,
    databaseTable,
    xmlText,
    subject,
    isObjectKeyUnique,
    isDescriptionUnique,
    isTableExists,
  ]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {(loader || checking || testEmailLoader) && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          type=""
          hidden={!viewDetail}
          // disabled
          onClick={() => {
            navigate(`/email-attachment/${id}/${pageNumber}`);
            dispatch(resetEmailAttachment());
          }}
        >
          Attachments
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          type=""
          hidden={!viewDetail}
          onClick={() => {
            dispatch(setId(""));
            dispatch(setSearchTerm(""));
            dispatch(setSearchCriteria("Beginning"));
            dispatch(setPageNumber(0));
            dispatch(setListingData([]));
            dispatch(setNormalSortFlag(false));
            dispatch(setNormalSortValue(null));
            navigate(`/email-recipients/${id}/${pageNumber}`);
          }}
        >
          Recipients
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          type="button"
          hidden={!viewDetail}
          onClick={() => {
            setPrimaryKey("");
            setTestShow(true);
          }}
        >
          Test
        </button>
      </div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          type="button"
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={() => {
            // setSaveShow(true);
            validateAndSaveEmailFormats();
          }}
        >
          Save
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!viewDetail}
          onClick={() => {
            dispatch(setViewDetail(false));
          }}
        >
          Edit
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!viewDetail}
          onClick={handleDelete}
        >
          Delete
        </button>

        {/* Cancel Confirmation Modal */}
        {
          <ModalComponent
            show={cancelShow}
            onHide={handleCancelNo}
            title={"Cancel Email Changes"}
            body={"Please confirm you want to cancel your changes"}
            handleYES={handleCancelYes}
            handleNO={handleCancelNo}
          />
        }

        {/* Test Button Confirmation Modal */}
        {
          <Modal show={testShow} onHide={() => setTestShow(false)} backdrop="static" keyboard={false}>
            {testEmailLoader === true ? (
              <Modal.Header>
                <Modal.Title className="font-18 h-100 temp-black-color mb-3">Test Email </Modal.Title>
              </Modal.Header>
            ) : (
              <Modal.Header closeButton>
                <Modal.Title className="font-18 h-100 temp-black-color mb-3">Test Email </Modal.Title>
              </Modal.Header>
            )}
            {/* <Modal.Header closeButton>
              <Modal.Title className="font-18 h-100 temp-black-color mb-3">Test Email </Modal.Title>
            </Modal.Header> */}
            <Modal.Body className="font-14 h-100 text-center">
              <Form.Group className="margin-box-5  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} xs={3}>
                  <Form.Label className=" col-form-label dealer-label">Primary Key</Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="p-0">
                  <input
                    className={`customFormControl  `}
                    id="primaryKey"
                    name="primaryKey"
                    value={primaryKey}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    onInput={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, ""); // Allow all digits, including 0
                      // If value starts with 0 and has more characters, remove the leading 0
                      if (value.length > 1 && value.startsWith("0")) {
                        value = value.replace(/^0+/, "");
                      }
                      setPrimaryKey(value);
                      dispatch(setRecordPrimaryKey(value));
                    }}
                  />
                </Col>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  testEmailFormat();
                  setTestShow(false);
                }}
                disabled={!primaryKey}
              >
                {testEmailLoader === true ? (
                  <div className="loader-container">
                    <div className="loader_YardCheckin"></div>
                  </div>
                ) : (
                  "Test"
                )}
              </Button>
            </Modal.Footer>
          </Modal>
        }
        {/* Test Email Success Modal */}
        {
          <Modal
            show={emailTestSuccess}
            onHide={() => setEmailTestSuccess(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title className="font-18 h-100 temp-black-color">Success</Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-14 h-100">
              Email Sent Successfully. Please check your email to verify.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setEmailTestSuccess(false)}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        }
        {/* Test Email Error Modal */}
        {
          <Modal
            show={emailTestError}
            onHide={() => setEmailTestError(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title className="font-18 h-100 temp-red-color">Error</Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-14 h-100">{emailTestErrorMsg}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setEmailTestError(false)}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        }
        {/*Delete confirmation Modal */}
        {
          <ModalComponent
            show={deleteShow}
            onHide={handleDeleteNo}
            title={"Delete Email"}
            body={"Please confirm you want to delete this email"}
            handleYES={handleDeleteYes}
            handleNO={handleDeleteNo}
          />
        }
        {
          <Modal show={errorShow} onHide={() => setErrorShow(false)} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title className="font-18 h-100 temp-red-color">Delete failed!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-14 h-100">{errorMsg}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setErrorShow(false)}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        }
      </div>
    </div>
  );
};

export default FormFooter;
