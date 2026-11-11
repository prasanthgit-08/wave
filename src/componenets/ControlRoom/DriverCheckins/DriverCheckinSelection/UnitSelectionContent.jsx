import React, { useState, useEffect } from "react";
import { Col, Form } from "react-bootstrap";
import {
  setCompanyName,
  setCompanyFK,
  setInitialApiLoader,
  setPageNumberForUnitSelection,
  setUnitCompanyList,
  setUnitSelectionLoader,
} from "../../../../redux/DriverCheckinSlice";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "../../../common/PaginationComponent";
import UnitSelectionListing from "./UnitSelectionListing";
import DriverCheckinService from "../../../../services/DriverCheckinService";
import LoadingIcon from "../../../common/LoadingIcon";
import CompanyService from "../../../../services/CompanyService";

function UnitSelectionContent({ loader }) {
  const dispatch = useDispatch();
  const [fromServiceCheckin, setFromServiceCheckin] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const pageNumberForUnitSelection = useSelector(
    (state) => state.driverCheckinReducer.pageNumberForUnitSelection
  );
  const totalElementsForUnit = useSelector((state) => state.driverCheckinReducer.totalElementsForUnit);
  const totalPagesForUnit = useSelector((state) => state.driverCheckinReducer.totalPagesForUnit);
  const unitData = useSelector((state) => state.driverCheckinReducer.unitData);
  const unitSelectionLoader = useSelector((state) => state.driverCheckinReducer.unitSelectionLoader);

  const companyName = useSelector((state) => state.driverCheckinReducer.companyName);
  const companyFK = useSelector((state) => state.driverCheckinReducer.companyFK);
  const firstName = useSelector((state) => state.driverCheckinReducer.firstName);
  const lastName = useSelector((state) => state.driverCheckinReducer.lastName);

  const unitCompanyList = useSelector((state) => state.driverCheckinReducer.unitCompanyList);

  const getCompanyNames = () => {
    dispatch(setUnitSelectionLoader(true));
    CompanyService.getAllCompanyData()
      .then((response) => {
        const value = response?.data?.find((item) => item.LocalCompany === true);
        dispatch(setCompanyFK(value.CompanyPK));
        dispatch(setCompanyName(value.Name));
        dispatch(setUnitCompanyList(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const fromServiceCheckinValue = localStorage.getItem("fromServiceCheckin") === "true";
    dispatch(setInitialApiLoader(false));
    setFromServiceCheckin(fromServiceCheckinValue);

    if (fromServiceCheckinValue && !isInitialized) {
      if (unitCompanyList.length === 0) {
        getCompanyNames();
      }
      setIsInitialized(true);
    }
  }, [unitCompanyList, isInitialized]);

  const paginationProps = {
    pageNumber: pageNumberForUnitSelection,
    setPageNumber: setPageNumberForUnitSelection,
    totalPages: totalPagesForUnit,
    totalElements: totalElementsForUnit,
    listingData: unitData,
  };

  return (
    <div className="p-2">
      <div className="p-15 shadow-sm rounded border halfScreenFormContentHeight" style={{ height: "601px" }}>
        {unitSelectionLoader && <LoadingIcon />}

        <>
          <Col className="p-15 mt-5 " md={10}>
            {!fromServiceCheckin && (
              <Form.Group className="margin-box-1 form-group m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-end">
                  <Form.Label className="col-form-label me-4">Driver</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0 ">
                  <input
                    type="text"
                    className="form-controlDriverService"
                    placeholder="ENTER FIRST NAME"
                    value={firstName}
                    disabled
                  />
                </Col>
                <Col xs={3} md={3} sm={3} className="d-flex">
                  <input
                    type="text"
                    className="form-controlDriverService"
                    placeholder="ENTER LAST NAME"
                    value={lastName}
                    disabled
                  />
                </Col>
              </Form.Group>
            )}

            {fromServiceCheckin ? (
              <Form.Group className="margin-box-1 form-group m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-end">
                  <Form.Label className="col-form-label me-4">Company</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0 ">
                  <Form.Select
                    className="customFormControl p-0"
                    value={`${companyFK}-${companyName}`}
                    onChange={(e) => {
                      const [companyId, companyName] = e.target.value.split("-");
                      dispatch(setCompanyName(companyName));
                      dispatch(setCompanyFK(companyId));
                      dispatch(setPageNumberForUnitSelection(0));
                    }}
                  >
                    {unitCompanyList.map((item) => (
                      <option value={`${item.CompanyPK}-${item.Name}`} key={item.CompanyPK}>
                        {item.Name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
            ) : (
              <Form.Group className="margin-box-1 form-group m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-end">
                  <Form.Label className="col-form-label me-4">Company</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0 ">
                  <input
                    type="text"
                    className="form-controlDriverService"
                    placeholder="ENTER COMPANY"
                    value={companyName}
                    disabled
                  />
                </Col>
              </Form.Group>
            )}
          </Col>

          <div className="h-400px mt-3 mx-2">
            <div className="d-flex border border-1 border-dark">
              <div className="flex-grow-1">
                <UnitSelectionListing loader={loader} />
              </div>

              <PaginationComponent {...paginationProps} firstPage lastPage singleArrowUp singleArrowDown />
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export default UnitSelectionContent;
