import React, { useEffect } from "react";
import { Col, Form } from "react-bootstrap";
import {
  setDelimited,
  setDelimiter,
  setDescription,
  setDisableSave,
  setEditFormData,
  setHasHeaders,
  setHeaderRows,
  setIsPlantReleaseLoading,
  setFileType,
  setPlantReleases,
  setIsDescriptionUnique,
  setViewDetail,
  resetChanges,
} from "../../../../redux/CustomerPlantReleasesSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import CustomerPlantReleaseFooter from "./CustomerPlantReleaseFooter";
import Header from "../../../common/Header";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import CustomerPlantReleaseService from "../../../../services/CustomerPlantReleaseService";
import LoadingIcon from "../../../common/LoadingIcon";

const CustomerPlantReleaseContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const description = useSelector((state) => state.customerPlantReleaseReducer.description);
  const fileType = useSelector((state) => state.customerPlantReleaseReducer.fileType);
  const delimited = useSelector((state) => state.customerPlantReleaseReducer.delimited);
  const delimiter = useSelector((state) => state.customerPlantReleaseReducer.delimiter);
  const hasHeaders = useSelector((state) => state.customerPlantReleaseReducer.hasHeaders);
  const headerRows = useSelector((state) => state.customerPlantReleaseReducer.headerRows);
  const viewDetail = useSelector((state) => state.customerPlantReleaseReducer.viewDetail);
  const editFormData = useSelector((state) => state.customerPlantReleaseReducer.editFormData);
  const isDescriptionUnique = useSelector((state) => state.customerPlantReleaseReducer.isDescriptionUnique);
  const isPlantReleaseLoading = useSelector(
    (state) => state.customerPlantReleaseReducer.isPlantReleaseLoading
  );
  const uniqueLoading = useSelector((state) => state.customerPlantReleaseReducer.uniqueLoading);
  const editPageLoading = useSelector((state) => state.customerPlantReleaseReducer.editPageLoading);
  const deleteLoading = useSelector((state) => state.customerPlantReleaseReducer.deleteLoading);

  //fetching data in editMode
  useEffect(() => {
    if (id) {
      dispatch(setIsPlantReleaseLoading(true));
      CustomerPlantReleaseService.getPlantReleasesById({ id, flag: null })
        .then((response) => {
          const { data } = response;

          dispatch(setEditFormData(data?.customerPlantReleasesColumns));
          dispatch(setViewDetail(true));
          dispatch(setDescription(data?.customerPlantReleasesColumns?.[0]?.description || ""));
          dispatch(setHasHeaders(data?.customerPlantReleasesColumns?.[0]?.hasHeaders || false));
          dispatch(setHeaderRows(data?.customerPlantReleasesColumns?.[0]?.headerRows || ""));
          dispatch(setDelimited(data?.customerPlantReleasesColumns?.[0]?.delimited || false));
          dispatch(setDelimiter(data?.customerPlantReleasesColumns?.[0]?.delimiter || ""));

          if (data?.customerPlantReleasesColumns?.[0]?.txtFile) dispatch(setFileType("txtFile"));
          else if (data?.customerPlantReleasesColumns?.[0]?.csvFile) dispatch(setFileType("csvFile"));
          else if (data?.customerPlantReleasesColumns?.[0]?.xlsxFile) dispatch(setFileType("xlsxFile"));
          else dispatch(setFileType("txtFile"));
        })
        .catch((err) => {
          dispatch(setIsPlantReleaseLoading(false));
          navigate("/customer-plant-release-browse");
        })
        .finally(() => {
          dispatch(setIsPlantReleaseLoading(false));
        });
    }
  }, [id]);

  //save validation
  useEffect(() => {
    if (
      description &&
      isDescriptionUnique &&
      ((hasHeaders && Number(headerRows) > 0 && Number(headerRows) <= 999) || !hasHeaders)
    ) {
      dispatch(setDisableSave(false));
    } else {
      dispatch(setDisableSave(true));
    }
  }, [description, isDescriptionUnique, fileType, hasHeaders, headerRows]);

  //Save object for backend
  useEffect(() => {
    dispatch(
      setPlantReleases({
        customerPlantReleaseFK: Number(id) || null,
        description: description,
        txt: fileType === "txtFile",
        csv: fileType === "csvFile",
        xls: fileType === "xlsxFile",
        delimited: delimited,
        delimiter: delimiter,
        hasHeader: hasHeaders,
        headerRows: headerRows,
      })
    );
  }, [description, fileType, delimited, delimiter, hasHeaders, headerRows, id, editFormData]);

  const isNumber = (value) => {
    if (!value) return value;
    const days = value?.replace(/[^\d]/g, "");
    if (value) return days;
  };

  return (
    <>
      <QuarterScreenWrapper>
        {(isPlantReleaseLoading || uniqueLoading || editPageLoading || deleteLoading) && <LoadingIcon />}
        <Header
          closeNavigationURL={`/customer-plant-release-browse`}
          confirmClose={!viewDetail && id}
          closeModalTitle="Close Plant Release Maintenance"
          closeModalBody="Please confirm you want to close and go back to browse page"
          closeConfirmationHandler={() => {
            dispatch(resetChanges());
          }}
        />
        <div className="w-100 p-1">
          <div className="shadow-sm rounded border quarterScreenFormContentHeight">
            <div className="m-b-10">
              <div className="p-15 w-100">
                <Col xs={9} className="ps-3">
                  <Form.Group
                    className={`mt-5 m-b-10 align-items-center row m-l-0 m-r-0 ${styles.colFormLabel}`}
                  >
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label htmlFor="description" className={QuarterScreen.colFormLabel}>
                        Description
                      </Form.Label>
                    </Col>
                    <Col xs={7} md={7} className="p-0">
                      <input
                        id="description"
                        name="description"
                        type="text"
                        value={description}
                        maxLength={30}
                        disabled={viewDetail}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onChange={(e) => {
                          dispatch(setDescription(e.target.value));
                          dispatch(setIsDescriptionUnique(true));
                        }}
                        className={`${QuarterScreen.formControl} ${
                          !viewDetail && !isPlantReleaseLoading
                            ? description
                              ? isDescriptionUnique
                                ? "borderGreen"
                                : "borderRed"
                              : "borderRed"
                            : ""
                        }`}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-3">
                    <Col xs={2} className="p-0">
                      <Form.Label className="customColFormLabel">File Type</Form.Label>
                    </Col>

                    <Col xs={8} className="p-0 ">
                      <CustomRadioGroup
                        name="fileType"
                        horizontal
                        horizontalAlignmentClassName="pe-4"
                        selectedOption={fileType}
                        disabled={viewDetail}
                        onChange={(value) => {
                          dispatch(setFileType(value));
                          if (value === "txtFile") {
                            if (delimited) {
                              dispatch(setDelimiter("TAB"));
                            }
                          } else if (value === "csvFile" || value === "xlsxFile") {
                            if (delimited) {
                              dispatch(setDelimiter(","));
                            }
                          }
                        }}
                        options={[
                          { value: "txtFile", label: "TXT", width: "70px" },
                          { value: "csvFile", label: "CSV", disabled: false },
                          { value: "xlsxFile", label: "XLSX", disabled: false },
                        ]}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Has Headers
                      </Form.Label>
                    </Col>

                    <Col xs={3} md={3} sm={3} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="hasHeaders"
                        name="hasHeaders"
                        checked={hasHeaders}
                        disabled={viewDetail}
                        onChange={(e) => {
                          dispatch(setHasHeaders(e.target.checked));
                          if (!e.target.checked) {
                            dispatch(setHeaderRows(""));
                          }
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label htmlFor="name" className={QuarterScreen.colFormLabel}>
                        Header Rows
                      </Form.Label>
                    </Col>

                    <Col xs={2} md={2} className="p-0" style={{ width: "50px" }}>
                      <input
                        id="headerRows"
                        name="headerRows"
                        type="text"
                        maxLength={3}
                        value={headerRows}
                        autoComplete="off"
                        aria-autocomplete="list"
                        disabled={viewDetail || !hasHeaders}
                        onChange={(e) => {
                          dispatch(setHeaderRows(isNumber(e.target.value)));
                        }}
                        className={`${QuarterScreen.formControl} ${
                          !viewDetail
                            ? hasHeaders
                              ? headerRows > 0 && headerRows <= 999
                                ? "borderGreen"
                                : "borderRed"
                              : ""
                            : ""
                        }`}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Delimited
                      </Form.Label>
                    </Col>

                    <Col xs={3} md={3} sm={3} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="delimited"
                        name="delimited"
                        checked={delimited}
                        disabled={viewDetail}
                        onChange={(e) => {
                          dispatch(setDelimited(e.target.checked));
                          if (fileType === "txtFile" && e.target.checked) {
                            dispatch(setDelimiter("TAB"));
                          } else if (
                            (fileType === "csvFile" || fileType === "xlsxFile") &&
                            e.target.checked
                          ) {
                            // csvFile or xlsxFile
                            dispatch(setDelimiter(","));
                          } else {
                            dispatch(setDelimiter(""));
                          }
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Delimiter
                      </Form.Label>
                    </Col>

                    <Col xs={3} md={3} className="p-0" style={{ width: "120px" }}>
                      <input
                        id="delimiter"
                        name="delimiter"
                        type="text"
                        value={delimiter}
                        maxLength={10}
                        disabled
                        autoComplete="off"
                        aria-autocomplete="list"
                        onChange={(e) => {
                          dispatch(setDelimiter(e.target.value));
                        }}
                        className={`${QuarterScreen.formControl}`}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </div>
            </div>
          </div>
        </div>
        <CustomerPlantReleaseFooter />
      </QuarterScreenWrapper>
    </>
  );
};

export default CustomerPlantReleaseContent;
