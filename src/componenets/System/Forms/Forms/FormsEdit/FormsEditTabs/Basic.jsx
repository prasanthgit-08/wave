import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsDescriptionUnique,
  setIsBasicTabValid,
  setSaveFormObject,
  setIsObjectLockUnique,
  setFormPathExists,
  setProjectPathExists,
} from "../../../../../../redux/FormsSlice";
import { useParams } from "react-router-dom";
import FormsService from "../../../../../../services/FormsService";
import useDebouncer from "../../../../../../hooks/useDebouncer";
import Input from "../../../../../../components/common/input";

function Basic() {
  const dispatch = useDispatch();
  const [formPK, setFormPK] = useState(null);
  const [description, setDescription] = useState("");
  const [objectKey, setObjectKey] = useState("");
  const [reload, setReload] = useState(false);
  const [outbound, setOutbound] = useState(false);
  const [motorized, setMotorized] = useState(false);
  const [towable, setTowable] = useState(false);
  const [emailed, setEmailed] = useState(false);
  const [printout, setPrintout] = useState(false);
  const [generateForm, setGenerateForm] = useState(false);
  const [formPath, setFormPath] = useState("");
  const [projectPath, setProjectPath] = useState("");
  const [formXMLFormat, setFormXMLFormat] = useState("");
  const responseData = useSelector((state) => state.forms.responseData);
  const viewDetail = useSelector((state) => state.forms.viewDetail);
  const isDescriptionUnique = useSelector((state) => state.forms.isDescriptionUnique);
  const isObjectKeyUnique = useSelector((state) => state.forms.isObjectKeyUnique);
  const formPathExists = useSelector((state) => state.forms.formPathExists);
  const projectPathExists = useSelector((state) => state.forms.projectPathExists);

  const { id } = useParams();

  useEffect(() => {
    if (responseData != null) {
      setFormPK(responseData ? responseData.formPK || "" : "");
      setDescription(responseData ? responseData.description || "" : "");
      setObjectKey(responseData ? responseData.objectKey?.trim() || "" : "");
      setReload(responseData ? responseData.reload || false : "");
      setOutbound(responseData ? responseData.outbound || false : "");
      setMotorized(responseData ? responseData.motorized || false : "");
      setTowable(responseData ? responseData.towable || false : "");
      setEmailed(responseData ? responseData.emailed || false : "");
      setPrintout(responseData?.printOut ? responseData?.printOut : false);
      setGenerateForm(responseData ? responseData.generateForm || false : "");
      setFormPath(responseData ? responseData.formPath?.trim() || "" : "");
      setProjectPath(responseData ? responseData.projectPath?.trim() || "" : "");
      setFormXMLFormat(responseData ? responseData.projectXML || "" : "");
      dispatch(setFormPathExists(true));
      dispatch(setProjectPathExists(true));
    }
  }, [responseData, viewDetail]);

  useEffect(() => {
    dispatch(
      setSaveFormObject({
        formPK: id,
        description: description,
        objectKey: objectKey,
        reload: reload,
        outbound: outbound,
        motorized: motorized,
        towable: towable,
        emailed: emailed,
        printOut: printout,
        generateForm: generateForm,
        formPath: formPath,
        projectPath: projectPath,
        projectXML: formXMLFormat,
      })
    );
  }, [
    description,
    objectKey,
    reload,
    outbound,
    motorized,
    towable,
    emailed,
    printout,
    generateForm,
    formPath,
    projectPath,
    formXMLFormat,
  ]);

  const handleCheckUniqueDescription = (description) => {
    FormsService.checkUniqueDescription(description, id)
      .then((res) => {
        dispatch(setIsDescriptionUnique(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setIsDescriptionUnique(true));
      });
  };

  const handleCheckUniqueObjectKey = (objectKey) => {
    FormsService.checkUniqueObjectKey(objectKey, id)
      .then((res) => {
        dispatch(setIsObjectLockUnique(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setIsObjectLockUnique(true));
      });
  };

  useEffect(() => {
    if (generateForm === false) {
      setProjectPath("");
      setFormXMLFormat("");
    } else {
      setFormPath("");
    }
  }, [generateForm]);

  useEffect(() => {
    if (responseData === undefined || responseData === null) {
    }
  });
  useEffect(() => {
    if (
      description &&
      isObjectKeyUnique &&
      isDescriptionUnique &&
      objectKey &&
      ((!generateForm && formPath && formPathExists && !(formPath.trim() === "/")) ||
        (generateForm && projectPath && projectPathExists))
    ) {
      dispatch(setIsBasicTabValid(true));
    } else {
      dispatch(setIsBasicTabValid(false));
    }
  }, [
    description,
    isDescriptionUnique,
    objectKey,
    formPath,
    generateForm,
    projectPath,
    projectPathExists,
    formPathExists,
    isObjectKeyUnique,
  ]);

  useEffect(() => {
    if (!id) {
      setFormPK("");
      setDescription("");
      setObjectKey("");
      setReload(false);
      setOutbound(false);
      setMotorized(false);
      setTowable(false);
      setEmailed("");
      setPrintout("");
      setGenerateForm("");
      setFormPath("");
      setProjectPath("");
      setFormXMLFormat("");

      dispatch(setIsDescriptionUnique(true));

      dispatch(setIsObjectLockUnique(true));
    }
  }, []);

  const handleDirectoryExistsCheck = (value, field) => {
    if (!viewDetail) {
      FormsService.checkDirectoryExists(
        value
          .replace(/[\\/]+/g, "\\")
          .replace(/^[./\\]+/, "")
          .replace(/^[^a-zA-Z]+/, ""),
        formPK
      )
        .then((res) => {
          if (field === "projectPath") {
            dispatch(setProjectPathExists(res.data));
          } else if (field === "formPath") {
            dispatch(setFormPathExists(res.data));
          }
        })
        .catch((error) => {
          console.error("error..");
        });
    }
  };

  const debounceHandleDirectoryExistsCheck = useDebouncer(handleDirectoryExistsCheck, 500);

  return (
    <>
      <div className="p-2 ps-3 w-100  ">
        <div className="d-flex">
          <Col xs={5}>
            <Form.Group className={`mt-4 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 `}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Description
                </Form.Label>
              </Col>

              <Col xs={5} md={5} className="p-0 me-2">
                <Input
                  className={`${"customFormControl"} ${
                    viewDetail ? "" : description?.trim() && isDescriptionUnique ? "borderGreen" : "borderRed"
                  }`}
                  id="description"
                  name="description"
                  value={description}
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled={viewDetail}
                  onChange={(e) => {
                    if (!e.target.value.startsWith(" ")) {
                      setDescription(e.target.value);
                      dispatch(setIsDescriptionUnique(true));
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value) {
                      handleCheckUniqueDescription(description);
                    }
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-3 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 `}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Object Key
                </Form.Label>
              </Col>

              <Col xs={2} md={2} className="p-0 me-2">
                <input
                  id="objectKey"
                  name="objectKey"
                  value={objectKey}
                  disabled={viewDetail}
                  type="text"
                  className={`${"customFormControl"} ${
                    viewDetail ? "" : objectKey?.trim() && isObjectKeyUnique ? "borderGreen" : "borderRed"
                  }`}
                  maxLength={50}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onInput={(e) => {
                    if (!e.target.value.startsWith(" ")) {
                      setObjectKey(e.target.value);
                      dispatch(setIsObjectLockUnique(true));
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value) {
                      handleCheckUniqueObjectKey(objectKey);
                    }
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 ">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="mb-0">Reload</Form.Label>
              </Col>
              <Col xs={3} sm={3} md={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="reload"
                  name="reload"
                  value={reload}
                  checked={reload}
                  disabled={viewDetail}
                  onChange={(e) => setReload(e.target.checked)}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 ">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="mb-0">Outbound</Form.Label>
              </Col>
              <Col xs={3} sm={3} md={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="outbound"
                  name="outbound"
                  value={outbound}
                  checked={outbound}
                  disabled={viewDetail}
                  onChange={(e) => setOutbound(e.target.checked)}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 ">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="mb-0">Motorized</Form.Label>
              </Col>
              <Col xs={3} sm={3} md={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="motorized"
                  name="motorized"
                  value={motorized}
                  checked={motorized}
                  disabled={viewDetail}
                  onChange={(e) => setMotorized(e.target.checked)}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 ">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="mb-0">Towable</Form.Label>
              </Col>
              <Col xs={3} sm={3} md={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="towable"
                  name="towable"
                  value={towable}
                  checked={towable}
                  disabled={viewDetail}
                  onChange={(e) => setTowable(e.target.checked)}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 ">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="mb-0">Emailed</Form.Label>
              </Col>
              <Col xs={3} sm={3} md={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="emailed"
                  name="emailed"
                  value={emailed}
                  checked={emailed}
                  disabled={viewDetail}
                  onChange={(e) => setEmailed(e.target.checked)}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 ">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="mb-0">Printout</Form.Label>
              </Col>
              <Col xs={3} sm={3} md={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="printout"
                  name="printout"
                  value={printout}
                  checked={printout}
                  disabled={viewDetail}
                  onChange={(e) => setPrintout(e.target.checked)}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 ">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="mb-0">Generate Form</Form.Label>
              </Col>
              <Col xs={3} sm={3} md={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="generateForm"
                  name="generateForm"
                  value={generateForm}
                  checked={generateForm}
                  disabled={viewDetail}
                  onChange={(e) => {
                    setGenerateForm(e.target.checked);
                    if (e.target.checked) {
                      setFormPath("");
                    } else {
                      setProjectPath("");
                    }
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group className={`mt-3 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 `}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Form Path
                </Form.Label>
              </Col>

              <Col xs={9} md={9} className="p-0 me-2">
                <input
                  id="formPath"
                  name="formPath"
                  value={formPath}
                  type="text"
                  className={`${"customFormControl"} ${
                    viewDetail
                      ? ""
                      : !generateForm
                        ? formPath && formPathExists && !(formPath.trim() === "/")
                          ? "borderGreen"
                          : "borderRed"
                        : ""
                  }`}
                  maxLength={100}
                  disabled={viewDetail || generateForm}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onInput={(e) => {
                    setFormPath(
                      e.target.value
                        .replace(/[\\]+/g, "/")
                        .replace(/\/+/g, "/")
                        .replace(/^[.]+/, "")
                        .replace(/^\/[^a-zA-Z]*$/, "/")
                    );
                    dispatch(
                      setFormPathExists(debounceHandleDirectoryExistsCheck(e.target.value, "formPath"))
                    );
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group className={`mt-3 mb-4 pb-0 align-items-center row  m-l-0 m-r-0 `}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Project Path
                </Form.Label>
              </Col>

              <Col xs={9} md={9} className="p-0 me-2">
                <input
                  id="projectPath"
                  name="projectPath"
                  value={projectPath}
                  type="text"
                  className={`${"customFormControl"} ${
                    viewDetail
                      ? ""
                      : generateForm
                        ? projectPath && projectPathExists
                          ? "borderGreen"
                          : "borderRed"
                        : ""
                  }`}
                  maxLength={100}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled={viewDetail || !generateForm}
                  onInput={(e) => {
                    let input = e.target.value; // Remove backslashes and normalize multiple slashes to a single forward slash

                    input = input.replace(/\\/g, "/").replace(/\/+/g, "/"); // Remove leading "./", "/", or other non-alphabet characters

                    input = input.replace(/^[./\/]+/, "").replace(/^[^a-zA-Z]+/, "");

                    setProjectPath(input);
                    dispatch(setProjectPathExists(debounceHandleDirectoryExistsCheck(input, "projectPath")));
                  }}
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={7}>
            <Form.Group className={`mt-2 mb-2 pb-0 align-items-center row  m-l-0 m-r-0 `}>
              <Col sm={12} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Form XML Format
                </Form.Label>
              </Col>

              <Col xs={12} className="p-0 mt-3">
                <textarea
                  name="formXMLFormat"
                  id="formXMLFormat"
                  value={formXMLFormat}
                  cols="30"
                  rows="31"
                  className="w-100"
                  disabled={viewDetail || !generateForm}
                  onInput={(e) => {
                    setFormXMLFormat(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
          </Col>
        </div>
      </div>
    </>
  );
}

export default Basic;
