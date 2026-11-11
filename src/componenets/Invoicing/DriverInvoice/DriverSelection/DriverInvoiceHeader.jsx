import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { RadioGroup, Radio } from "react-radio-group";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveDriver,
  setChangeColor,
  setDriverId,
  setDriverSearchCriteria,
  setFirstName,
  setLastName,
  setPageNumber,
  setSearchCriteria,
  setSearchTerms,
  setSelectedStatus,
  setSortType,
  setSortValue,
  setSelectedId,
} from "../../../../redux/DriverInvoiceSlice";
import ButtonComponent from "../../../common/Button";

function DriverInvoiceHeader() {
  const driverSearchCriteria = useSelector((state) => state.driverInvoiceReducer.driverSearchCriteria);
  const selectedStatus = useSelector((state) => state.driverInvoiceReducer.selectedStatus);

  const dispatch = useDispatch();
  const handleSecondRadioGroupOnChange = (value) => {
    dispatch(setSelectedStatus(value));
    dispatch(setPageNumber(0));
    if (value === "InActive" || value === "Deleased") {
      dispatch(setActiveDriver(false));
      dispatch(setSelectedId(null));
      dispatch(setDriverId(null));
    }
  };
  return (
    <div>
      <Row className="border border-dark  p-t-10 p-b-10 " style={{ width: "1450px" }}>
        <Col md={12}>
          <Row className="m-0 p-0  justify-content-center">
            <Col md={9} sm={8} lg={8} xs={8} className="p-l-0">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center customSearchBox" style={{ minWidth: "700px" }}>
                  <span className="p-r-20"></span>

                  <span className="p-l-20"></span>
                </div>

                <div className="d-flex align-items-center me-auto" style={{ minWidth: "120px" }}>
                  <RadioGroup
                    name="searchCriteria"
                    selectedValue={driverSearchCriteria}
                    onChange={(value) => {
                      dispatch(setDriverSearchCriteria(value));
                      dispatch(setPageNumber(0));
                    }}
                  >
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Beginning" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.begining")}</label>
                    </div>
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Contains" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.contains")}</label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="d-flex align-items-center " style={{ width: "250px" }}>
                  <RadioGroup
                    name="status"
                    selectedValue={selectedStatus}
                    onChange={handleSecondRadioGroupOnChange}
                  >
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="All" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.all")}</label>
                    </div>
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Active" />
                      <label className="f-w-600 m-l-5">Active</label>
                    </div>
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="InActive" />
                      <label className="f-w-600 m-l-5">Inactive</label>
                    </div>
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Deleased" />
                      <label className="f-w-600 m-l-5">Deleased</label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </Col>

            <Col
              md={1}
              sm={1}
              lg={1}
              xs={1}
              className="p-l-0 d-flex justify-content-end  align-items-center ms-auto"
              style={{ minWidth: "200px" }}
            >
              <div className="d-flex  ">
                <span className="m-l-10">
                  <ButtonComponent
                    route={"/"}
                    onClick={() => {
                      dispatch(setSearchTerms(""));
                      dispatch(setSearchCriteria("Beginning"));
                      dispatch(setSelectedStatus("All"));
                      dispatch(setFirstName(""));
                      dispatch(setLastName(""));
                      dispatch(setPageNumber(0));
                      dispatch(setSortValue(null));
                      dispatch(setSortType(null));
                      dispatch(setDriverId(null));
                      dispatch(setChangeColor(false));
                    }}
                    className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                    label={"Close"}
                  />
                </span>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default DriverInvoiceHeader;
