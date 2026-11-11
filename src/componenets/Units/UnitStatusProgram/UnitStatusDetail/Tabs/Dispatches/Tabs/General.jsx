import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageNumber } from "../../../../../../../redux/CustomerPlantSearchFilterSlice";
import { Col, Form, Row } from "react-bootstrap";
import { PaginationComponent } from "../../../../../../common/PaginationComponent";
import { EditMasterUnitSelection_RecordsPerPage } from "../../../../../../../services/constants/applicationConstants";
import {
  setDispatchGeneralPageNumber,
  setDispatchGeneralSortFlag,
  setDispatchGeneralSortValue,
  setDispatchGeneralTotalElements,
  setDispatchGeneralTotalPages,
} from "../../../../../../../redux/UnitStatus/UnitStatusSlice";
import UnitStatusService from "../../../../../../../services/Units/UnitStatusService";
import TruncatedStringWithTooltip from "../../../../../../common/TruncatedStringWithTooltip";
import LoadingText from "../../../../../../common/LoadingText";
import NoRecordsMessage from "../../../../../../common/NoRecordsMessage";

function General({ data, activeSubTab }) {
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState(null);
  const [changeColor, setChangeColor] = useState(false);
  const [unitDispatchGeneralData, setUnitDispatchGeneralData] = useState(data?.data || []);
  const dispatchGeneralPageNumber = useSelector((state) => state.unitStatusReducer.dispatchGeneralPageNumber);
  const dispatchGeneralTotalPages = useSelector((state) => state.unitStatusReducer.dispatchGeneralTotalPages);
  const dispatchGeneralTotalElements = useSelector(
    (state) => state.unitStatusReducer.dispatchGeneralTotalElements
  );
  const dispatchGeneralSortFlag = useSelector((state) => state.unitStatusReducer.dispatchGeneralSortFlag);
  const dispatchGeneralSortValue = useSelector((state) => state.unitStatusReducer.dispatchGeneralSortValue);
  const selectedId = useSelector((state) => state.unitStatusReducer.selectedId);
  const [loading, setLoading] = useState(true);
  const [selectedDispatch, setSelectedDispatch] = useState({
    Driver: "",
    Pickup: "",
    PickupLocation: "",
    PickupAddress1: "",
    PickupAddress2: "",
    PickupCity: "",
    PickupState: "",
    PickupZip: "",
    Delivery: "",
    DeliveryLocation: "",
    DeliveryAddress1: "",
    DeliveryAddress2: "",
    DeliveryCity: "",
    DeliveryState: "",
    DeliveryZip: "",
    Truck: null,
    Trailer: null,
    PortOfEntry: null,
    PARS: null,
    PAPS: null,
    BOLNumber: null,
    LoadNumber: null,
  });
  const onhandleNormalSort = (value, val) => {
    dispatch(setDispatchGeneralSortFlag(val));
    dispatch(setDispatchGeneralSortValue(value));
  };
  const handleRowClick = (item) => {
    setSelectedRow(item.DispatchPK);
    setChangeColor(true);
    setSelectedDispatch({
      Driver: item.Driver,
      Pickup: item.Pickup,
      PickupLocation: item.PickupLocation,
      PickupAddress1: item.PickupAddress1,
      PickupAddress2: item.PickupAddress2,
      PickupCity: item.PickupCity,
      PickupState: item.PickupState,
      PickupZip: item.PickupZip,
      Delivery: item.Delivery,
      DeliveryLocation: item.DeliveryLocation,
      DeliveryAddress1: item.DeliveryAddress1,
      DeliveryAddress2: item.DeliveryAddress2,
      DeliveryCity: item.DeliveryCity,
      DeliveryState: item.DeliveryState,
      DeliveryZip: item.DeliveryZip,
      Truck: item.Truck,
      Trailer: item.Trailer,
      PortOfEntry: item.PortOfEntry,
      PARS: item.PARS,
      PAPS: item.PAPS,
      BOLNumber: item.BOLNumber,
      LoadNumber: item.LoadNumber,
    });
  };

  const getAllUnitNumbersList = () => {
    UnitStatusService.getUnitStatusDataForOpenBalance(
      selectedId,
      "Dispatches-General",
      dispatchGeneralPageNumber,
      7,
      dispatchGeneralSortValue,
      dispatchGeneralSortFlag
    )
      .then((response) => {
        const { data } = response;
        const listingData = data.filter((item) => item.Type !== "Pagination");
        const paginationData = data.find((item) => item.Type === "Pagination");
        setUnitDispatchGeneralData(listingData);
        if (paginationData) {
          dispatch(setDispatchGeneralTotalElements(paginationData.TotalElements));
          dispatch(setDispatchGeneralTotalPages(paginationData.TotalPages));
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (activeSubTab === "general") {
      getAllUnitNumbersList();
    }
  }, [dispatchGeneralPageNumber, dispatchGeneralSortValue, dispatchGeneralSortFlag, activeSubTab]);

  const paginationProps = {
    pageNumber: dispatchGeneralPageNumber,
    setPageNumber: setDispatchGeneralPageNumber,
    totalPages: dispatchGeneralTotalPages,
    totalElements: dispatchGeneralTotalElements,
    listingData: unitDispatchGeneralData,
  };
  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={6}>
          <div className="d-flex h-300px mt-2">
            <div className="w-100 border border-2 border-dark">
              <div className="fixTableHead unitSelection">
                <table className="table table-striped f-w-600">
                  <thead>
                    <tr disabled>
                      <th
                        className="f-w-600 col-4"
                        onClick={() => {
                          onhandleNormalSort("Driver", !dispatchGeneralSortFlag);
                        }}
                      >
                        Driver{" "}
                        {dispatchGeneralSortFlag && dispatchGeneralSortValue === "Driver" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!dispatchGeneralSortFlag && dispatchGeneralSortValue === "Driver" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                      <th
                        className="f-w-600 col-4"
                        onClick={() => {
                          onhandleNormalSort("Pickup", !dispatchGeneralSortFlag);
                        }}
                      >
                        Pickup{" "}
                        {dispatchGeneralSortFlag && dispatchGeneralSortValue === "Pickup" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!dispatchGeneralSortFlag && dispatchGeneralSortValue === "Pickup" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                      <th
                        className="f-w-600 col-4"
                        onClick={() => {
                          onhandleNormalSort("Delivery", !dispatchGeneralSortFlag);
                        }}
                      >
                        {" "}
                        Delivery{" "}
                        {dispatchGeneralSortFlag && dispatchGeneralSortValue === "Delivery" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!dispatchGeneralSortFlag && dispatchGeneralSortValue === "Delivery" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {!loading &&
                      unitDispatchGeneralData?.length > 0 &&
                      unitDispatchGeneralData.map((item, index) => (
                        <tr
                          key={index}
                          onClick={() => handleRowClick(item)}
                          style={{ cursor: "pointer" }}
                          className={`${item.DispatchPK === selectedRow && changeColor ? "tableSelected" : ""}`}
                        >
                          <td>{item.Driver}</td>
                          {/* <td>{item.Pickup}</td>
                        <td>{item.Delivery}</td> */}
                          <td>
                            <TruncatedStringWithTooltip text={item.Pickup} charLimit={25} />
                          </td>
                          <td>
                            <TruncatedStringWithTooltip text={item.Delivery} charLimit={25} />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {loading && <LoadingText smallerFont />}
                {!loading && unitDispatchGeneralData?.length === 0 && <NoRecordsMessage />}
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
          <div>
            <Form.Group
              className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
      `}
            >
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                  BOL Number
                </Form.Label>
              </Col>

              <Col xs={3} className="p-0 d-flex">
                <div className="col-5">
                  <input
                    className={`customFormControl 
        `}
                    name=""
                    type="text"
                    value={selectedDispatch.BOLNumber}
                    readOnly
                  />
                </div>
              </Col>
            </Form.Group>
            <Form.Group
              className={`mt-2 form-group  align-items-center  row  m-l-0 m-r-0 ms-0
      `}
            >
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                  Load Number
                </Form.Label>
              </Col>

              <Col xs={3} className="p-0 d-flex">
                <div className="col-5">
                  <input
                    className={`customFormControl 
        `}
                    name=""
                    type="text"
                    value={selectedDispatch.LoadNumber}
                    readOnly
                  />
                </div>
              </Col>
            </Form.Group>
          </div>
        </Col>
        <Col xs={6} className="ps-5">
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Pickup Location</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
        `}
                name="poNumber"
                type="text"
                value={selectedDispatch.PickupLocation}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Address</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
        `}
                name="poNumber"
                type="text"
                value={selectedDispatch.PickupAddress1}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
        `}
                name="poNumber"
                type="text"
                value={selectedDispatch.PickupAddress2}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>City,State,Zip</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
        `}
                name=""
                type="text"
                value={selectedDispatch.PickupCity}
                readOnly
              />
            </Col>
            <div className="px-1 w-35px">
              <input
                className="w-100 customFormControl"
                type="text"
                value={selectedDispatch.PickupState}
                readOnly
              />
            </div>
            <Col xs="1" className="px-0">
              <input
                className="w-100 customFormControl"
                type="text"
                value={selectedDispatch.PickupZip}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center invisible row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
        `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Delivery Location</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
        `}
                name="poNumber"
                type="text"
                value={selectedDispatch.DeliveryLocation}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Address</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
        `}
                name="poNumber"
                type="text"
                value={selectedDispatch.DeliveryAddress1}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
        `}
                name="poNumber"
                type="text"
                value={selectedDispatch.DeliveryAddress2}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>City,State,Zip</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
        `}
                name=""
                type="text"
                value={selectedDispatch.DeliveryCity}
                readOnly
              />
            </Col>
            <div className="px-1 w-35px">
              <input
                className="w-100 customFormControl"
                type="text"
                value={selectedDispatch.DeliveryState}
                readOnly
              />
            </div>
            <Col xs="1" className="px-0">
              <input
                className="w-100 customFormControl"
                type="text"
                value={selectedDispatch.DeliveryZip}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center invisible row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl 
        `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Truck</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
        `}
                name="poNumber"
                type="text"
                value={selectedDispatch.Truck}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Trailer</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
        `}
                name="poNumber"
                type="text"
                value={selectedDispatch.Trailer}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row invisible  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
        `}
                name="poNumber"
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Port of Entry</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
        `}
                name="poNumber"
                type="text"
                value={selectedDispatch.PortOfEntry}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>PARS</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                className={`customFormControl 
        `}
                name="poNumber"
                type="text"
                value={selectedDispatch.PARS}
                readOnly
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>PAPS</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                className={`customFormControl 
        `}
                name="poNumber"
                type="text"
                value={selectedDispatch.PAPS}
                readOnly
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default General;
