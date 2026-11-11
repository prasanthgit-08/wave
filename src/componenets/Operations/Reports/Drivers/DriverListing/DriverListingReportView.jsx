/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import QuarterScreenWrapper from "../../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../../common/Header";
import ReportsFooter from "../../../../common/ReportsFooter";
import LoadingIcon from "../../../../common/LoadingIcon";
import ReportsService from "../../../../../services/Reports/ReportsService";
import { setDriverListingReportPayload } from "../../../../../redux/Reports/DriverListingReportSlice";

const DriverListingReportView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tableRef = useRef(null);

  const [columnsList, setColumnsList] = useState([]);
  const selectedColumns = columnsList.filter((item) => item?.checked);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTabValid, setIsTabValid] = useState(false);
  const [loader, setLoader] = useState(false);

  const driverListingReportPayload = useSelector(
    (state) => state.driverListingReport.driverListingReportPayload
  );

  const getDriverListingReport = () => {
    setLoading(true);
    ReportsService.generateDriverListingReport(driverListingReportPayload)
      .then((response) => {
        const { data } = response;
        if (data.errorCode === 1) {
          toast.error(data.errorMessage);
        } else {
          toast.success(data.errorMessage);
        }
      })
      .finally(() => {
        setLoading(false);
        resetSelection();
        navigate("/driver-listing-report");
      });
  };

  const handleSelectAll = (value) => {
    setSelectAll(value);
    if (value) {
      setColumnsList((state) => state.map((item) => ({ ...item, checked: true })));

      // Scroll to the top of the table container
      if (tableRef.current) {
        tableRef.current.scrollTop = 0;
      }
    } else {
      setColumnsList((state) => state.map((item) => ({ ...item, checked: false })));
    }
  };

  const resetSelection = () => {
    setSelectAll(false);
    setColumnsList((state) => state.map((item) => ({ ...item, checked: false })));
    dispatch(
      setDriverListingReportPayload({
        selectedColumns: [],
        allColumns: false,
      })
    );
    navigate("/driver-listing-report");
  };

  // Navigate to main page OR persist previous data
  useEffect(() => {
    if (!driverListingReportPayload || !driverListingReportPayload?.navigateToNext) {
      navigate("/driver-listing-report");
    }
  }, []);

  // Fetch Table Columns
  useEffect(() => {
    const fetchDriverListingColumns = () => {
      if (driverListingReportPayload?.driverOrTrucks) {
        setLoader(true);
        ReportsService.getDriverListingReportColumns(driverListingReportPayload?.driverOrTrucks)
          .then((response) => {
            const { data } = response;
            let columnsList = [];
            for (const key in data) {
              if (Object.prototype.hasOwnProperty.call(data, key)) {
                columnsList.push({ value: key, label: data[key], checked: false });
              }
            }
            setColumnsList(columnsList);
          })
          .catch(() => {})
          .finally(() => {
            setLoader(false);
          });
      }
    };

    fetchDriverListingColumns();
  }, []);

  // Update Payload object for API call
  useEffect(() => {
    if (selectAll || columnsList.some((column) => column?.checked))
      dispatch(
        setDriverListingReportPayload({
          selectedColumns: selectedColumns.filter((item) => item?.checked).map((item) => item.value),
          allColumns: selectAll,
        })
      );
  }, [columnsList, selectAll]);

  // Tab Validation
  useEffect(() => {
    if (selectedColumns.length > 0) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [selectedColumns]);

  // If unselecting any columns in selectAll mode, undo selectAll
  useEffect(() => {
    if (selectAll && columnsList.some((column) => !column?.checked)) {
      setSelectAll(false);
    }
  }, [columnsList]);

  return (
    <QuarterScreenWrapper>
      <Header closeHandler={() => dispatch(setDriverListingReportPayload())} />
      {(loading || loader) && <LoadingIcon />}
      {/* Form Contents */}
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <div
                  ref={tableRef}
                  className="fixTableHead border border-secondary px-0"
                  style={{ overflowY: "auto", height: "350px" }}
                >
                  <table className="table table-striped f-w-600 mb-0">
                    <thead>
                      <tr disabled>
                        <th className="f-w-600 col-2">Include</th>
                        <th className="f-w-600">Field</th>
                      </tr>
                    </thead>
                    <tbody>
                      {columnsList?.map((item, index) => (
                        <tr id="rowId" key={item?.value}>
                          <td className="f-w-600">
                            <input
                              type="checkbox"
                              className="form-check-input p-0"
                              id="multiUnitRelease"
                              name="multiUnitRelease"
                              checked={item?.checked}
                              // disabled={selectAll}
                              onChange={(e) => {
                                setColumnsList((state) =>
                                  state.map((item, i) =>
                                    i === index
                                      ? e.target.checked
                                        ? { ...item, checked: true }
                                        : { ...item, checked: false }
                                      : item
                                  )
                                );
                              }}
                            />
                          </td>
                          <td className="f-w-600">{item?.label}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-3">
                  <Col className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 me-3"
                      id="includeHistory"
                      name="includeHistory"
                      checked={selectAll}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                    <Form.Label className="customColFormLabel">Select All</Form.Label>
                  </Col>
                </Form.Group>
              </Row>
            </div>
          </div>
        </div>
      </div>
      <ReportsFooter
        hideDisplay
        hideEmailPdf
        hidePrint
        emailExcelDisabled={loading || !isTabValid}
        cancelDisabled={loading}
        onEmailExcelClick={() => getDriverListingReport()}
        onCancelClick={() => resetSelection()}
      />
    </QuarterScreenWrapper>
  );
};

export default DriverListingReportView;
