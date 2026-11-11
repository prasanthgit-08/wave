import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { t } from "i18next";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styles from "../../../../../../styles/QuarterScreen.module.css";
import ComplianceHistoryListing from "../ComplianceHistoryListing";
import { setHistoryBlockReason, setNumber } from "../../../../../../redux/DriverComplianceItemsSlice";
import { PaginationComponent } from "../../../../../common/PaginationComponent";
import DriverComplianceItemsService from "../../../../../../services/DriverComplianceItemsService";

const History = () => {
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [viewDetail, setViewDetail] = useState(false);
  const [loadings, setLoadings] = useState(false);

  const historyBlockReason = useSelector((state) => state.DriverComplianceItemsReducer.historyBlockReason);
  const useBlockDate = useSelector((state) => state.DriverComplianceItemsReducer.useBlockDate);
  const number = useSelector((state) => state.DriverComplianceItemsReducer.number);
  const totalElementsOfHistory = useSelector(
    (state) => state.DriverComplianceItemsReducer.totalElementsOfHistory
  );
  const totalPagesOfHistory = useSelector((state) => state.DriverComplianceItemsReducer.totalPagesOfHistory);
  const complianceHistoryData = useSelector(
    (state) => state.DriverComplianceItemsReducer.complianceHistoryData
  );
  const driverComplianceItemHistoryPK = useSelector(
    (state) => state.DriverComplianceItemsReducer.driverComplianceItemHistoryPK
  );

  const fetchRecordForBlockReason = (driverComplianceItemHistoryPK) => {
    DriverComplianceItemsService.getComplianceHistoryRecord(driverComplianceItemHistoryPK)
      .then((res) => {
        if (!driverComplianceItemHistoryPK) {
          dispatch(setHistoryBlockReason(res.data[0].blockReasonHistory));
        } else dispatch(setHistoryBlockReason(res.data.blockReasonHistory));
        dispatch(setViewDetail(true));
      })
      .catch((err) => {});
  };
  useEffect(() => {
    if (driverComplianceItemHistoryPK) fetchRecordForBlockReason(driverComplianceItemHistoryPK);
  }, [driverComplianceItemHistoryPK]);

  //Validation
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const validationSchema = yup.object({
    name: yup.string().required(),
    address1: yup.string().required(),
    phone: yup.string().matches(phoneRegex),
    fax: yup.string().matches(phoneRegex),
    description: yup.string().required(),
    city: yup.string().required(),
    statecode: yup.string().required(),
    postalCode: yup
      .string()
      .required()
      .when("canadian", {
        is: true,
        then: yup.string().matches(/^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/),
        otherwise: yup.string().matches(/^((\d{5}-\d{4})|(\d{5}))$/),
      }),
  });

  const paginationProps = {
    pageNumber: number,
    setPageNumber: setNumber,
    totalPages: totalPagesOfHistory,
    totalElements: totalElementsOfHistory,
    listingData: complianceHistoryData,
  };
  return (
    <Formik
      initialValues={{
        description,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        description: true,
      }}
    >
      {(formik) => (
        <Form className="p-3" style={{ height: "375px" }}>
          <Row className="m-0 p-0 ">
            <div className="  p-15" style={{ minHeight: "250px" }}>
              <div className="d-flex border border-1 border-dark">
                <div className="flex-grow-1" style={{ overflow: "hidden" }}>
                  <ComplianceHistoryListing loader={loadings} />
                </div>
                <PaginationComponent
                  {...paginationProps}
                  recordsPerPage={5}
                  firstPage
                  lastPage
                  singleArrowUp
                  singleArrowDown
                />
              </div>
            </div>
            <Col sm={7} md={7} lg={7} xl={7} xs={7}>
              {useBlockDate ? (
                <Form.Group
                  className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} md={3} sm={3} className="p-0" style={{ height: "55px" }}>
                    <Form.Label htmlFor="name" style={{ marginTop: "0px" }} className=" ">
                      Block Reason
                    </Form.Label>
                  </Col>
                  <br></br>
                  <Col sm={9} md={9} xs={9} className="p-0">
                    <textarea
                      rows={3}
                      cols={20}
                      type="text"
                      className={`customFormControl`}
                      id="blockReason"
                      name="blockReason"
                      value={historyBlockReason}
                      style={{
                        resize: "none",
                        display: "fixed",
                        minHeight: "30px",
                        height: "60px",
                        minWidth: "610px",
                        boxShadow: "none",
                        fontSize: "12px",
                        overflowY: "auto",
                        outline: "none",
                      }}
                      disabled
                    />
                  </Col>
                </Form.Group>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default History;
