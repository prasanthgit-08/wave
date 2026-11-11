import { t } from "i18next";
import { Formik, Field } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PrinterService from "../../../services/PrinterService";

import {
  setPrinterData,
  setPrinterDescription,
  setPrinterDuplex,
  setPrinterDuplexCode,
  setPrinterMultiTray,
  setPrinterWhiteControlCode,
  setPrinterYellowControlCode,
  setPrinterPinkControlCode,
  setPrinterCollateStaple,
  setPrinterCollateControlCode,
  setPrinterStapleControlCode,
  setPrinterDatafrmDB,
  setViewDetail,
  setPrinterURL,
  setDescriptionValid,
  setDescriptionError,
  setNameValid,
  setName,
  setPrinterUrlValid,
} from "../../../redux/EditPrinterSlice";
import LoadingIcon from "../../common/LoadingIcon";
import Input from "../../../components/common/input";
// import { setDescriptionError } from "../../../redux/PrinterSearchFilterSlice";

function FormContent() {
  const [printerId, setPrinterPK] = useState("");
  const [incompletedealerPK, setIncompletedealerPK] = useState("");

  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [duplex, setDuplex] = useState(false);

  const [duplexCode, setDuplexCode] = useState("");
  const [multiTrayPrinter, setMultiTrayPrinter] = useState(false);
  const [whiteControlCode, setWhiteControlCode] = useState("");
  const [yellowControlCode, setYellowControlCode] = useState("");
  const [pinkControlCode, setPinkControlCode] = useState("");
  const [collateStaple, setCollateStaple] = useState(false);
  const [collateControlCode, setCollateControlCode] = useState("");
  const [stapleControlCode, setStapleControlCode] = useState("");
  const [loader, setLoader] = useState(false);

  // const [descriptionError, setDescriptionError] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const pageNumber = params.pageNumber;
  const printerPK = params.id;
  const navigate = useNavigate();
  const descriptionError = useSelector((state) => state.editPrinterReducer.descriptionError);
  const viewDetail = useSelector((state) => state.editPrinterReducer.viewDetail);
  const printerData = useSelector((state) => state.editPrinterReducer.printerData);
  const savePrinter = useSelector((state) => state.editPrinterReducer.savePrinter);
  const data = useSelector((state) => state.editPrinterReducer.printerData);
  const datafromDB = useSelector((state) => state.editPrinterReducer.printerDatafrmDB);
  const nameValid = useSelector((state) => state.editPrinterReducer.nameValid);
  const name = useSelector((state) => state.editPrinterReducer.name);
  const printerUrlValid = useSelector((state) => state.editPrinterReducer.printerUrlValid);
  const descriptionValid = useSelector((state) => state.editPrinterReducer.descriptionValid);

  useEffect(() => {
    //this is for doing the validation in FormFooter so that save button is enabled.

    dispatch(setPrinterDescription(description));
    dispatch(setPrinterURL(url));
    dispatch(setPrinterDuplex(duplex));
    if (!duplex) {
      setDuplexCode(""); //when the duplex is checked then we can give value in duplex code. on unchecking we need tp delete it
    }
    dispatch(setPrinterDuplexCode(duplexCode));
    dispatch(setPrinterMultiTray(multiTrayPrinter));
    if (!multiTrayPrinter) {
      setWhiteControlCode("");
      setYellowControlCode("");
      setPinkControlCode("");
    }
    dispatch(setPrinterWhiteControlCode(whiteControlCode));
    dispatch(setPrinterYellowControlCode(yellowControlCode));
    dispatch(setPrinterPinkControlCode(pinkControlCode));
    dispatch(setPrinterCollateStaple(collateStaple));
    if (!collateStaple) {
      setCollateControlCode("");
      setStapleControlCode("");
    }
    dispatch(setPrinterCollateControlCode(collateControlCode));
    dispatch(setPrinterStapleControlCode(stapleControlCode));
  }, [
    description,
    url,
    duplex,
    duplexCode,
    multiTrayPrinter,
    whiteControlCode,
    yellowControlCode,
    pinkControlCode,
    collateStaple,
    collateControlCode,
    stapleControlCode,
  ]);

  //this is for setting UI fields to Printdata object(Json)
  useEffect(() => {
    printerFormData();
  }, [
    description,
    url,
    duplex,
    duplexCode,
    multiTrayPrinter,
    whiteControlCode,
    yellowControlCode,
    pinkControlCode,
    collateStaple,
    collateControlCode,
    stapleControlCode,
    name,
  ]);

  //from UI State to printerVO
  const printerFormData = () => {
    dispatch(
      setPrinterData({
        printerPK: printerPK,
        description: description,
        printerURL: url,
        duplex: duplex,
        duplexControlCode: duplexCode,
        multiTrayPrinter: multiTrayPrinter,
        whiteTrayControlCode: whiteControlCode,
        yellowTrayControlCode: yellowControlCode,
        pinkTrayControlCode: pinkControlCode,
        collateStaple: collateStaple,
        collateControlCode: collateControlCode,
        stapleControlCode: stapleControlCode,
        printerName: name,
      })
    );
  };
  //for Editing the record, add printer and edit printer pages are same
  //after getting the data, call useEffect() method to set values
  useEffect(() => {
    if (window.location.pathname === "/edit-printer/" + printerPK + "/" + pageNumber) {
      getPrinterById(printerPK);
    }
  }, [printerPK]);

  const getPrinterById = (id) => {
    setLoader(true);
    if (id) {
      PrinterService.getPrinterById(id)
        .then((response) => {
          const data = response.data;
          dispatch(setViewDetail(true));
          setDescriptionError("");
          //data is null if the user has deletes a record .If the user press the back button , navigate to printers main page
          if (data === null || data === "" || data === "undefined") {
            navigate("/printer");
          } else {
            dispatch(setPrinterDatafrmDB(data));
          }
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
        });
    }
  };
  useEffect(() => {
    if (datafromDB != null) {
      setPrinterPK(datafromDB.printerPK);
      setDescription(datafromDB.description != null ? datafromDB.description?.trim() : "");
      setUrl(datafromDB.printerURL != null ? datafromDB.printerURL?.trim() : "");

      setDuplex(datafromDB.duplex);
      setDuplexCode(datafromDB.duplexControlCode != null ? datafromDB.duplexControlCode?.trim() : "");
      setMultiTrayPrinter(datafromDB.multiTrayPrinter);
      setWhiteControlCode(
        datafromDB.whiteTrayControlCode != null ? datafromDB.whiteTrayControlCode?.trim() : ""
      );
      setYellowControlCode(
        datafromDB.yellowTrayControlCode != null ? datafromDB.yellowTrayControlCode?.trim() : ""
      );
      setPinkControlCode(
        datafromDB.pinkTrayControlCode != null ? datafromDB.pinkTrayControlCode?.trim() : ""
      );
      setCollateStaple(datafromDB.collateStaple != null ? datafromDB.collateStaple : "");
      setCollateControlCode(
        datafromDB.collateControlCode != null ? datafromDB.collateControlCode?.trim() : ""
      );
      setStapleControlCode(datafromDB.stapleControlCode != null ? datafromDB.stapleControlCode?.trim() : "");
      dispatch(setName(datafromDB.printerName != null ? datafromDB.printerName?.trim() : ""));
      // dispatch(setDescriptionError(""));
    }
  }, [datafromDB, viewDetail]);

  const handleCheckDescription = (e) => {
    PrinterService.checkDescription(e.target.value, printerPK)
      .then((res) => {
        if (res.data.length > 0) {
          //setDescriptionError(res.data);
          dispatch(setDescriptionError(res.data));
          dispatch(setDescriptionValid(false));
        } else {
          //setDescriptionError("");
          dispatch(setDescriptionError(""));
          dispatch(setDescriptionValid(true));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheckName = (e) => {
    PrinterService.checkName(e.target.value, printerPK)
      .then((res) => {
        if (res.data.length > 0) {
          dispatch(setNameValid(false));
        } else {
          dispatch(setNameValid(true));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheckURL = (e) => {
    PrinterService.checkUrl(e.target.value, printerPK)
      .then((res) => {
        if (res.data.length > 0) {
          dispatch(setPrinterUrlValid(false));
        } else {
          dispatch(setPrinterUrlValid(true));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validationSchema = yup.object({
    duplex: yup.boolean(),
    duplexCode: yup.string().when("duplex", {
      is: true,
      then: yup.string().required(),
      otherwise: yup.string(),
    }),
    multiTrayPrinter: yup.boolean(),
    whiteControlCode: yup.string().when("multiTrayPrinter", {
      is: true,
      then: yup.string().required(),
    }),
    yellowControlCode: yup.string().when("multiTrayPrinter", {
      is: true,
      then: yup.string().required(),
    }),
    pinkControlCode: yup.string().when("multiTrayPrinter", {
      is: true,
      then: yup.string().required(),
    }),
    collateStaple: yup.boolean(),
    collateControlCode: yup.string().when("collateStaple", {
      is: true,
      then: yup.string().required(),
    }),
    stapleControlCode: yup.string().when("collateStaple", {
      is: true,
      then: yup.string().required(),
      otherwise: yup.string(),
    }),
    url: yup
      .string()
      ?.trim()
      .matches(
        /^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/gm
      )
      .required(),
    description: yup.string()?.trim().required(),
  });

  return (
    <Formik
      initialValues={{
        description,
        url,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        url: true,
      }}
    >
      {(formik) => (
        <Form on={formik.handle}>
          <div className="p-2">
            <div className="p-15 shadow-sm rounded border halfScreenFormContentHeight">
              {loader && <LoadingIcon />}

              <Row className="m-0 p-0">
                <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                  <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        {t("edit.printer.page.description")}
                      </Form.Label>
                    </Col>

                    <Col xs={6} md={6} className="p-0">
                      <input
                        className={`customFormControl ${
                          viewDetail === true
                            ? ""
                            : description != undefined &&
                                description != null &&
                                description?.trim().length >= 1 &&
                                descriptionValid
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        onBeforeInput={(e) => {
                          if (e.data === " " && (e.target.value === "" || /^\s*$/.test(e.target.value))) {
                            e.preventDefault();
                          }
                        }}
                        id="description"
                        name="description"
                        type="text"
                        value={description}
                        maxLength={30}
                        disabled={viewDetail}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setDescription(e.target.value);
                          dispatch(setDescriptionError(true));
                          dispatch(setDescriptionValid(true));
                        }}
                        onBlur={(e) => {
                          if (e.target.value) {
                            handleCheckDescription(e);
                          }
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="margin-box-5 mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        {t("edit.printer.page.url")}
                      </Form.Label>
                    </Col>

                    <Col xs={6} md={6} className="p-0">
                      <input
                        type="text"
                        className={`customFormControl ${
                          viewDetail
                            ? ""
                            : !printerUrlValid
                              ? "borderRed"
                              : formik.errors.url === undefined && url.length > 1
                                ? "borderGreen"
                                : formik.errors.url !== undefined
                                  ? "borderRed"
                                  : ""
                        }`}
                        onBeforeInput={(e) => {
                          if (e.data === " " && (e.target.value === "" || /^\s*$/.test(e.target.value))) {
                            e.preventDefault();
                          }
                        }}
                        id="url"
                        name="url"
                        value={url}
                        maxLength={30}
                        disabled={viewDetail}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          formik.handleChange(e);
                          const inputValue = e.target.value.replace(/[^0-9.]/g, "");
                          setUrl(inputValue);
                          dispatch(setPrinterUrlValid(true));
                        }}
                        onBlur={(e) => {
                          if (!formik.errors.url) {
                            handleCheckURL(e);
                          }
                        }}
                        /* style={{
                          borderColor: viewDetail
                            ? "black"
                            : formik.errors.url === undefined && url.length > 1
                              ? "green"
                              : formik.errors.url !== undefined
                                ? "red"
                                : "",
                        }} */
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Printer Name
                      </Form.Label>
                    </Col>

                    <Col xs={6} md={6} className="p-0">
                      <input
                        className={`customFormControl ${
                          viewDetail === true
                            ? ""
                            : name !== undefined && name !== null && name?.trim().length >= 1 && nameValid
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        onBeforeInput={(e) => {
                          if (e.data === " " && (e.target.value === "" || /^\s*$/.test(e.target.value))) {
                            e.preventDefault();
                          }
                        }}
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        maxLength={50}
                        disabled={viewDetail}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          formik.handleChange(e);
                          dispatch(setName(e.target.value));
                          dispatch(setNameValid(true));
                        }}
                        onBlur={(e) => {
                          if (e.target.value) {
                            handleCheckName(e);
                          }
                        }}
                      />
                    </Col>

                    {/* <Row className={`${!viewDetail && !nameValid ? "" : "hide-elements"} m-t-1`}>
                      <Col xs={3} md={3} sm={3}></Col>
                      <Col style={{ paddingLeft: "5px" }}>
                        <p className="p-0 text-danger" style={{ height: "7px" }}>
                          {" "}
                          {`Printer Name  '${name}' already exists!` }
                          </p>
                      </Col>
                    </Row> */}
                  </Form.Group>

                  <Form.Group className="printerTopMargin form-group  m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className=" col-form-label dealer-label">
                        {t("edit.printer.page.duplex")}
                      </Form.Label>
                    </Col>

                    <Col xs={2} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="duplex"
                        name="duplex"
                        value={duplex}
                        checked={duplex}
                        disabled={viewDetail}
                        onChange={(e) => setDuplex(e.target.checked)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="margin-box-5 mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label htmlFor="duplexCode" className="col-form-label dealer-label">
                        {t("edit.printer.page.duplexControlCode")}
                      </Form.Label>
                    </Col>

                    <Col xs={6} md={6} className="p-0">
                      <Field
                        className={`customFormControl ${
                          viewDetail === true || !duplex
                            ? ""
                            : duplex && duplexCode.length >= 1
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        id="duplexCode"
                        name="duplexCode"
                        type="search"
                        value={duplexCode}
                        maxLength={30}
                        disabled={viewDetail || !duplex}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setDuplexCode(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="printerTopMargin form-group m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className=" col-form-label dealer-label">
                        {t("edit.printer.page.multiTrayPrinter")}
                      </Form.Label>
                    </Col>

                    <Col xs={3} md={3} sm={3} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="multiTrayPrinter"
                        name="multiTrayPrinter"
                        value={multiTrayPrinter}
                        checked={multiTrayPrinter}
                        disabled={viewDetail}
                        onChange={(e) => setMultiTrayPrinter(e.target.checked)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className=" form-group margin-box-5  mt-3  m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.printer.page.whiteControlCode")}
                      </Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <Field
                        className={`customFormControl ${
                          viewDetail === true || !multiTrayPrinter
                            ? ""
                            : multiTrayPrinter && whiteControlCode.length >= 1
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        id="whiteControlCode"
                        name="whiteControlCode"
                        type="search"
                        value={whiteControlCode}
                        maxLength={30}
                        disabled={viewDetail || !multiTrayPrinter}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setWhiteControlCode(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="margin-box-5 form-group mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.printer.page.yellowControlCode")}
                      </Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <Field
                        className={`customFormControl ${
                          viewDetail === true || !multiTrayPrinter
                            ? ""
                            : multiTrayPrinter && yellowControlCode.length >= 1
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        id="yellowControlCode"
                        name="yellowControlCode"
                        type="search"
                        value={yellowControlCode}
                        maxLength={30}
                        disabled={viewDetail || !multiTrayPrinter}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setYellowControlCode(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="margin-box-5 form-group mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.printer.page.pinkControlCode")}
                      </Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <Field
                        className={`customFormControl ${
                          viewDetail === true || !multiTrayPrinter
                            ? ""
                            : multiTrayPrinter && pinkControlCode.length >= 1
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        id="pinkControlCode"
                        name="pinkControlCode"
                        type="search"
                        value={pinkControlCode}
                        maxLength={30}
                        disabled={viewDetail || !multiTrayPrinter}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setPinkControlCode(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                </Col>

                <Col xs={6} md={6} className="d-flex flex-column justify-content-center m-t-5">
                  <Form.Group className="form-group m-t-5 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className=" col-form-label dealer-label">
                        {t("edit.printer.page.collateStaple")}
                      </Form.Label>
                    </Col>

                    <Col xs={3} md={3} sm={3} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="collateStaple"
                        name="collateStaple"
                        value={collateStaple}
                        checked={collateStaple}
                        disabled={viewDetail}
                        onChange={(e) => setCollateStaple(e.target.checked)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="margin-box-5 form-group mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.printer.page.collateControlCode")}
                      </Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <Field
                        className={`customFormControl ${
                          viewDetail === true || !collateStaple
                            ? ""
                            : collateStaple && collateControlCode.length >= 1
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        id="collateControlCode"
                        name="collateControlCode"
                        type="search"
                        value={collateControlCode}
                        maxLength={30}
                        disabled={viewDetail || !collateStaple}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setCollateControlCode(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="margin-box-5 form-group mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.printer.page.stapleControlCode")}
                      </Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <Field
                        className={`customFormControl ${
                          viewDetail === true || !collateStaple
                            ? ""
                            : collateStaple && stapleControlCode.length >= 1
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        id="stapleControlCode"
                        name="stapleControlCode"
                        type="search"
                        value={stapleControlCode}
                        maxLength={30}
                        disabled={viewDetail || !collateStaple}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setStapleControlCode(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
export default FormContent;
