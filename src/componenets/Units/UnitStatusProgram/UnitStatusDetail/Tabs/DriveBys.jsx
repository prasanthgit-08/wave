import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { setPageNumber } from "../../../../../redux/CustomerPlantSearchFilterSlice";
import { EditMasterUnitSelection_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import {
  setDriveByPageNumber,
  setDriveBySortFlag,
  setDriveBySortValue,
  setDriveByTotalElements,
  setDriveByTotalPages,
} from "../../../../../redux/UnitStatus/UnitStatusSlice";
import UnitStatusService from "../../../../../services/Units/UnitStatusService";
import { useParams } from "react-router-dom";
import LoadingText from "../../../../common/LoadingText";
import NoRecordsMessage from "../../../../common/NoRecordsMessage";

function DriveBys({ data }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedRow, setSelectedRow] = useState(null);
  const [changeColor, setChangeColor] = useState(false);
  const [unitDriveByData, setUnitdriveByData] = useState(data?.data || []);
  const selectedId = useSelector((state) => state.unitStatusReducer.selectedId);
  const driveByPageNumber = useSelector((state) => state.unitStatusReducer.driveByPageNumber);
  const driveByTotalElements = useSelector((state) => state.unitStatusReducer.driveByTotalElements);
  const driveByTotalPages = useSelector((state) => state.unitStatusReducer.driveByTotalPages);
  const driveBySortFlag = useSelector((state) => state.unitStatusReducer.driveBySortFlag);
  const activeTab = useSelector((state) => state.unitStatusReducer.activeTab);
  const [loading, setLoading] = useState(true);

  const driveBySortValue = useSelector((state) => state.unitStatusReducer.driveBySortValue);
  const paginationProps = {
    pageNumber: driveByPageNumber,
    setPageNumber: setDriveByPageNumber,
    totalPages: driveByTotalPages,
    totalElements: driveByTotalElements,
    listingData: unitDriveByData,
  };
  const [selectedDriveBy, setSelectedDriveBy] = useState({
    AuthorizedBy: "",
    Name: "",
    Address1: "",
    Address2: "",
    City: "",
    StateCode: "",
    PostalCode: "",
    Contact: "",
    comment1: "",
    comment2: "",
    comment3: "",
    comment4: "",
  });

  const onhandleNormalSort = (value, val) => {
    dispatch(setDriveBySortFlag(val));

    dispatch(setDriveBySortValue(value));
  };
  const handleRowClick = (item) => {
    setSelectedRow(item.UnitDriveByPK);
    setChangeColor(true);
    setSelectedDriveBy({
      AuthorizedBy: item.AuthorizedBy,
      Name: item.Name,
      Address1: item.Address1,
      Address2: item.Address2,
      City: item.city,
      StateCode: item.stateCode,
      PostalCode: item.PostalCode,
      Contact: item.Contact,
      comment1: item.comment1,
      comment2: item.comment2,
      comment3: item.comment3,
      comment4: item.comment4,
    });
  };

  const getAllUnitNumbersList = () => {
    UnitStatusService.getUnitStatusDataForUnitLocation(
      id,
      "DriveBys",
      driveByPageNumber,
      15,
      driveBySortValue,
      driveBySortFlag
    )
      .then((response) => {
        const { data } = response;
        const listingData = data.filter((item) => item.Name && item.city && item.stateCode);
        const paginationData = data.find((item) => item.Type === "Pagination");
        setUnitdriveByData(listingData);
        // Dispatch pagination metadata
        if (paginationData) {
          dispatch(setDriveByPageNumber(paginationData.PageNumber));
          dispatch(setDriveByTotalElements(paginationData.TotalElements));
          dispatch(setDriveByTotalPages(paginationData.TotalPages));
        }
      })
      .catch((error) => {
        // dispatch(setUnitsLoading(false));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id && activeTab === "DriveBys") {
      getAllUnitNumbersList();
    }
  }, [activeTab, driveByPageNumber, driveBySortValue, driveBySortFlag]);

  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={5}>
          <div className="d-flex h-100 mt-3">
            <div className="w-100 border border-2 border-dark">
              <div className="fixTableHead h-550px">
                <table className="table table-striped f-w-600">
                  <thead>
                    <tr disabled>
                      <th
                        className="f-w-600"
                        onClick={() => {
                          onhandleNormalSort("Name", !driveBySortFlag);
                        }}
                      >
                        Name
                        {driveBySortFlag && driveBySortValue === "Name" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!driveBySortFlag && driveBySortValue === "Name" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>

                      <th
                        className="f-w-600"
                        onClick={() => {
                          onhandleNormalSort("city", !driveBySortFlag);
                        }}
                      >
                        City{" "}
                        {driveBySortFlag && driveBySortValue === "city" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!driveBySortFlag && driveBySortValue === "city" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                      <th
                        className="f-w-600"
                        onClick={() => {
                          onhandleNormalSort("stateCode", !driveBySortFlag);
                        }}
                      >
                        State
                        {driveBySortFlag && driveBySortValue === "stateCode" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!driveBySortFlag && driveBySortValue === "stateCode" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {!loading &&
                      unitDriveByData?.length > 0 &&
                      unitDriveByData?.map((item, index) => (
                        <tr
                          key={index}
                          onClick={() => handleRowClick(item)}
                          className={`${item.UnitDriveByPK === selectedRow && changeColor ? "tableSelected" : ""}`}
                        >
                          <td>{item.Name}</td>
                          <td>{item.city}</td>
                          <td>{item.stateCode}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {loading && <LoadingText smallerFont />}
                {!loading && unitDriveByData?.length === 0 && <NoRecordsMessage />}
              </div>
            </div>
            <PaginationComponent
              {...paginationProps}
              recordsPerPage={EditMasterUnitSelection_RecordsPerPage}
              firstPage
              lastPage
              singleArrowUp
              singleArrowDown
            />
          </div>
        </Col>
        <Col xs={5} className=" mt-4 ps-5 ms-5">
          {/* <p>Miscellaneous Pickup Dealer</p> */}
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Authorized By
              </Form.Label>
            </Col>

            <Col xs={6} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={selectedDriveBy.AuthorizedBy}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row invisible  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={2} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Name
              </Form.Label>
            </Col>

            <Col xs={6} className="p-0 h">
              <input
                className={`customFormControl`}
                name=""
                type="text"
                value={selectedDriveBy.Name}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Address
              </Form.Label>
            </Col>

            <Col xs={6} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={selectedDriveBy.Address1}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={6} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={selectedDriveBy.Address2}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>City,State,ZIP</Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" value={selectedDriveBy.City} readOnly />
            </Col>
            {/* <Col xs={}>
        </Col> */}
            <div className="p-0 w-30px mx-1">
              <input
                className={`customFormControl `}
                type="text"
                value={selectedDriveBy.StateCode}
                readOnly
              />
            </div>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                className={`customFormControl w-80px`}
                type="text"
                value={selectedDriveBy.PostalCode}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row invisible  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={2} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Contact
              </Form.Label>
            </Col>

            <Col xs={6} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={selectedDriveBy.Contact}
                readOnly
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-2 form-group  align-items-center row invisible  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={2} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Drive By Instructions
              </Form.Label>
            </Col>

            <Col xs={6} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={selectedDriveBy.comment1}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={6} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={selectedDriveBy.comment2}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={6} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={selectedDriveBy.comment3}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={6} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={selectedDriveBy.comment4}
                readOnly
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default DriveBys;
