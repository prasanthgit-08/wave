import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import ModalComponent from "../../../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FormsService from "../../../../../services/FormsService";
import toast from "react-hot-toast";
import {
  resetForms,
  setFormPathExists,
  setIsDescriptionUnique,
  setIsObjectLockUnique,
  setProjectPathExists,
  setViewDetail,
  setClearDetailForm,
  setResponseData,
  setRecordPrimaryKey,
  setTableName,
  toggleChangesCancelled,
} from "../../../../../redux/FormsSlice";
import PreviewPopup from "../../../../common/PreviewPopup";
import LoadingIcon from "../../../../common/LoadingIcon";
import EmailFormatService from "../../../../../services/EmailFormatService";

function FormsEditFooter() {
  const viewDetail = useSelector((state) => state.forms.viewDetail);
  const isBasicTabValid = useSelector((state) => state.forms.isBasicTabValid);
  const isDetailTabValid = useSelector((state) => state.forms.isDetailTabValid);
  const saveFormObject = useSelector((state) => state.forms.saveFormObject);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, pageNumber } = useParams();

  const [disableSave, setDisableSave] = useState(true);
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [primaryKey, setPrimaryKey] = useState("");
  const [testShow, setTestShow] = useState(false);
  const [database, setDatabase] = useState("");
  const [valid, setValid] = useState(true);
  const [fileContent, setFileContent] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loader, setLoader] = useState(false);
  const [validationLoader, setValidationLoader] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userPK = loggedInUser?.userPK;

  useEffect(() => {
    if (isBasicTabValid && isDetailTabValid) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [isBasicTabValid, isDetailTabValid]);

  const saveOrEditForm = () => {
    setValidationLoader(true);
    FormsService.checkUniqueSave(saveFormObject.objectKey, saveFormObject.description, id)
      .then((res) => {
        if (res.data) {
          save();
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(setIsObjectLockUnique(true));
      })
      .finally(() => setValidationLoader(false));
  };

  const save = () => {
    setLoader(true);
    FormsService.saveOrEditForm(saveFormObject)
      .then((response) => {
        navigate("/forms-maintenance");
        if (id) {
          toast.success("Form Updated");
        } else {
          toast.success("Form Created");
        }
      })
      .catch((error) => {
        navigate("/forms-maintenance");
        let msg = "";
        if (error.response) {
          msg = error.response.data.errorMsg;
        }
        if (msg === null || msg === "" || msg === undefined) {
          msg = "Something went wrong !! Failed to save the record !!";
        }
        toast.error(msg);
      })
      .finally(() => setLoader(false));
  };

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      dispatch(setIsDescriptionUnique(true));
      dispatch(setIsObjectLockUnique(true));
      dispatch(setFormPathExists(true));
      dispatch(setProjectPathExists(true));
      dispatch(setResponseData(null));
      dispatch(toggleChangesCancelled());
      navigate("/forms-maintenance");
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    dispatch(setIsDescriptionUnique(true));
    dispatch(setIsObjectLockUnique(true));
    dispatch(setClearDetailForm(true));
    dispatch(setResponseData(null));
    dispatch(toggleChangesCancelled());
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      toast.success("Changes Cancelled");
    } else {
      navigate("/forms-maintenance");
      dispatch(setViewDetail(false));
      dispatch(resetForms());
      toast.success("Changes Cancelled");
    }
  };

  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    setLoader(true);
    FormsService.deleteFormById(id)
      .then((response) => {
        navigate("/forms-maintenance");
        toast.success("Form Deleted");
        dispatch(resetForms);
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => setLoader(false));
    setDeleteShow(false);
  };

  const handleTest = async () => {
    setLoader(true);
    const check = await EmailFormatService.tableNameExistsCheck(database);
    if (!check.data) {
      setLoader(false);
      setValid(false);
      toast.error("Invalid table name");
      return;
    }

    const selectionRequestVO = {
      primaryKey: primaryKey,
      primaryKeyName: "",
      entityName: database,
      emailObjectKeyList: [""],
      emailObjectKey: "",
      printObjectKey: saveFormObject.objectKey,
      documentType: "",
      userPK: userPK,
      emailToUser: false,
      emailToDriver: false,
      emailToDealer: false,
      emailToCustomer: false,
      emailTocustomerPlant: false,
      email: false,
      print: true,
      isYardPrint: false,
      printerName: "",
    };
    setTestShow(false);
    FormsService.generateForms(selectionRequestVO)
      .then((response) => {
        if (response && response.data) {
          handleCancelNo();

          const attachments = response.data[0].attachments;

          if (attachments && typeof attachments === "object") {
            const firstFileKey = Object.keys(attachments)[0]; // e.g. "ifta.pdf"
            const fileBase64 = attachments[firstFileKey];

            if (fileBase64) {
              setFileContent(fileBase64);
              setShowPreview(true);
              toast.success("Form generated successfully");
            } else {
              toast.error("No file content found");
            }
          } else {
            toast.error("Invalid Data");
          }
        }
      })
      .catch((err) => {
        setLoader(false);
        toast.error("Error occured generating  Form");
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const hidepopup = () => {
    setShowPreview(false);
  };

  const testBody = () => {
    return (
      <>
        <Form.Group className="margin-box-5  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} xs={3}>
            <Form.Label className=" col-form-label dealer-label">Primary Key</Form.Label>
          </Col>
          <Col xs={4} md={4} sm={4} className="p-0">
            <input
              className={`customFormControl ${!primaryKey ? "borderRed" : "borderGreen"}`}
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
        <Form.Group className="margin-box-5  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} xs={3}>
            <Form.Label className=" col-form-label dealer-label">Table Name</Form.Label>
          </Col>
          <Col xs={4} md={4} sm={4} className="p-0">
            <input
              className={`customFormControl ${!database || !valid ? "borderRed" : "borderGreen"} `}
              id="database"
              name="database"
              value={database}
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
              onInput={(e) => {
                // let value = e.target.value.replace(/[^0-9]/g, ""); // Allow all digits, including 0
                // // If value starts with 0 and has more characters, remove the leading 0
                // if (value.length > 1 && value.startsWith("0")) {
                //   value = value.replace(/^0+/, "");
                // }
                setValid(true);
                setDatabase(e.target.value);
                dispatch(setTableName(e.target.value));
              }}
            />
          </Col>
        </Form.Group>
      </>
    );
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={viewDetail === false}
          disabled={saveFormObject?.formXMLFormat?.trim()}
          onClick={() => {
            setPrimaryKey("");
            setDatabase("");
            setTestShow(true);
          }}
        >
          Test
        </button>
      </div>
      <PreviewPopup show={showPreview} base64PDF={fileContent} onHide={hidepopup} />
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          disabled={disableSave}
          hidden={viewDetail === true}
          onClick={() => {
            saveOrEditForm();
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
        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Form Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Form"}
          body={"Please confirm you want to Delete this Form"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
        <Modal show={errorShow} onHide={() => setErrorShow(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 temp-red-color">Delete failed!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="font-14 h-100">{errorMsg}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setErrorShow(false)}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>

        <ModalComponent
          customButton
          buttonText={"Test"}
          show={testShow}
          onHide={() => {
            setTestShow(false);
          }}
          title={"Test Email"}
          body={testBody()}
          handleYES={handleTest}
          handleNO={() => {
            setTestShow(false);
          }}
          disableCustomButton={!(primaryKey && database)}
        />

        {(loader || validationLoader) && <LoadingIcon />}
      </div>
    </div>
  );
}

export default FormsEditFooter;
