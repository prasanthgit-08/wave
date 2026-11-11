import { t } from "i18next";
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Form } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CheckCallList from "./CheckCallList";
import { useDispatch, useSelector } from "react-redux";
import DriverDeleaseRequestsService from "../../../../../../services/DriverDeleaseRequestsService";
import { setIsProcessedBit } from "../../../../../../redux/DriverServiceSlice";
import {
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setStatewiseList,
} from "../../../../../../redux/DriverFlashSlice";
import { setIsValidEntry, setMaintenancePgm } from "../../../../../../redux/DriverDispatchHoldSlice";
import { resetBrowse } from "../../../../../../redux/LoadHistorySlice";
import { resetBrowsePage } from "../../../../../../redux/UndispatchSlice";
import { PermissionKeyGeneratorUtil } from "../../../../../../utils/PermissionKeyGeneratorUtil";
import { setRefundData } from "../../../../../../redux/ReleaseReserveSlice";
import DriverService from "../../../../../../services/DriverService";
import {
  setCompanyFK,
  setCompanyName,
  setPageNumberForUnitSelection,
  setUnitCompanyList,
  setUnitData,
} from "../../../../../../redux/DriverCheckinSlice";

function General({ driverData, disabled }) {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const active = useSelector((state) => state.driverServicesSlice.activeDriver);
  const isProcessedBit = useSelector((state) => state.driverServicesSlice.isProcessedBit);
  const deleased = useSelector((state) => state.driverServicesSlice.deleasedDriver);
  const pageNumber = useSelector((state) => state.driverServicesSlice.pageNumber);
  const totalElements = useSelector((state) => state.driverServicesSlice.totalElements);
  const totalPages = useSelector((state) => state.driverCheckinReducer.totalPages);
  const driverPictureId = useSelector((state) => state.driverServicesSlice.driverPictureId);
  const textareaRef = useRef(null);
  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermission = PermissionKeyGeneratorUtil("editcheckin", "NEW");
  const [disableEditCheckinButton, setDisableEditCheckinButton] = useState(false);
  const [displayImage, setDisplayImage] = useState(null);

  useEffect(() => {
    if (deniedPermissions) {
      setDisableEditCheckinButton(deniedPermissions?.includes(editPermission));
    }
  }, []);

  const paginationProps = {
    pageNumber,
    // setPageNumber,
    totalPages,
    totalElements,
    listingData: driverData,
  };

  /**Check whether records with Processed bit true for the selected driver
   * in Driver Delease
   * to make Request Delese button enable.
   */
  useEffect(() => {
    /**  Directly calling the API when the component mounts or driverId changes*/
    DriverDeleaseRequestsService.checkProcessedRecord(driverId)
      .then((res) => {
        dispatch(setIsProcessedBit(res.data));
      })
      .catch((err) => {
        console.error("error", err);
      });
  }, [driverId]);

  /**Set the Processed bit to false*/
  useEffect(() => {
    dispatch(setIsProcessedBit(false));
  }, []);
  useEffect(() => {
    // localStorage.removeItem("fromServiceCheckin");
    localStorage.removeItem("driverId");
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the textarea when content changes
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [driverData?.driverServicesNotes]);

  //added for edit driver files
  const [editDriverPermissionDenied, setEditDriverPermissionDenied] = useState(false);
  const editDriverPermission = PermissionKeyGeneratorUtil("EDITDRIVER", "NEW");
  useEffect(() => {
    setEditDriverPermissionDenied(deniedPermissions?.includes(editDriverPermission));
  }, [deniedPermissions]);

  /**Used to fetch driver image**/
  useEffect(() => {
    if (driverPictureId) {
      DriverService.getDriverPicById(driverPictureId)
        .then((res) => {
          const fileType = res.headers["content-type"];
          const blob = new Blob([res.data], { type: fileType });
          const url = URL.createObjectURL(blob);
          setDisplayImage(url);
        })
        .catch((error) => {
          console.error("Error fetching driver picture:", error);
        });
    }
  }, [driverPictureId]);

  return (
    <div>
      <div className="d-flex  p-2">
        <Col xs={2} md={2} className="mt-5">
          <div className="d-flex">
            <button
              className="btn btn-secondary  w-120px  driverServiceTabsButtons m-l-5 m-r-5 "
              type=""
              onClick={() => {
                navigate(`/driver-dispatch/${driverId}`);
              }}
              disabled={!active}
            >
              Dispatch
            </button>
            <button
              className="btn btn-secondary  w-120px driverServiceTabsButtons ms-3 m-r-5 "
              type=""
              onClick={() => {
                navigate(`/report-card/${driverId}`);
              }}
              disabled={!active}
            >
              Report Card
            </button>
          </div>
          <div className="d-flex mt-3">
            <button
              className="btn btn-secondary  w-120px driverServiceTabsButtons m-l-5 m-r-5 "
              type=""
              onClick={() => {
                localStorage.setItem("RerouteSource", "Operations");
                navigate(`/reroutes-unit-selection/${driverId}`);
              }}
            >
              Reroute
            </button>
            <button
              className="btn btn-secondary  w-120px driverServiceTabsButtons ms-3 m-r-5 "
              type=""
              onClick={() => {
                navigate(`/pay-history/${driverId}`);
              }}
            >
              Pay History
            </button>
          </div>
          <div className="d-flex mt-3">
            <button
              className="btn btn-secondary  w-120px driverServiceTabsButtons m-l-5 m-r-5 "
              type=""
              onClick={() => {
                // Set the localStorage items
                localStorage.setItem("fromServiceCheckin", "true");
                localStorage.setItem("driverId", driverId);
                dispatch(setPageNumberForUnitSelection(0));
                dispatch(setCompanyName(""));
                dispatch(setCompanyFK(null));
                dispatch(setUnitCompanyList([]));
                dispatch(setUnitData([]));

                // Check if driverId is set in localStorage
                const storedDriverId = localStorage.getItem("driverId");
                if (storedDriverId) {
                  // Navigate to the new route
                  navigate(`/unit-selection/${storedDriverId}`, {
                    state: {
                      returnTo: location?.pathname,
                      origin: "CHECKIN",
                      driverId: storedDriverId,
                    },
                  });
                } else {
                  // Optionally, handle the case where driverId is not set in localStorage
                  console.error("Driver ID is not set in localStorage");
                }
              }}
            >
              Check In
            </button>
            <button
              className="btn btn-secondary  w-120px driverServiceTabsButtons ms-3 m-r-5 "
              type=""
              onClick={() => {
                dispatch(setNormalSortFlag(true));
                dispatch(setNormalSortValue("statecode"));
                dispatch(setPageNumber(0));
                dispatch(setStatewiseList([]));
                navigate(`/driver-flash/${driverId}`);
              }}
            >
              Driver Flash
            </button>
          </div>
          <div className="d-flex mt-3">
            <button
              className="btn btn-secondary  w-120px driverServiceTabsButtons m-l-5 m-r-5 "
              type=""
              onClick={() => {
                dispatch(resetBrowsePage());
                navigate(`/undispatch/${driverId}`);
              }}
            >
              Undispatch
            </button>
            <button
              className="btn btn-secondary  w-120px driverServiceTabsButtons ms-3 m-r-5 "
              type=""
              onClick={() => {
                navigate(`/driver-service-selection/${driverId}/driver-awards`);
              }}
            >
              Driver Award
            </button>
          </div>
          <div className="d-flex mt-3">
            <button
              className="btn btn-secondary  w-120px driverServiceTabsButtons m-l-5 m-r-5 "
              type=""
              onClick={() => {
                navigate(`/load-History/${driverId}`);
                dispatch(resetBrowse());
              }}
            >
              Load History
            </button>
            <button
              className="btn btn-secondary  w-120px driverServiceTabsButtons ms-3 m-r-5 "
              type=""
              onClick={() => {
                navigate(`/driver-referrals/${driverId}`);
              }}
              /**enable the button only if the driver
               * is not deleased */
              disabled={deleased}
            >
              Driver Referrals
            </button>
          </div>
          <div className="d-flex mt-3">
            <button
              className="btn btn-secondary  w-120px  driverServiceTabsButtons m-l-5 m-r-5 "
              type=""
              onClick={() => {
                navigate(`/postNoCheckinHistory/${driverId}`);
              }}
              disabled={!active}
            >
              Post No CheckIn
            </button>
            <button
              className="btn btn-secondary  w-120px driverServiceTabsButtons ms-3 m-r-5 "
              type=""
              onClick={() => {
                navigate(`/driver-checkin-history/${driverId}`);
              }}
            >
              Check In History
            </button>
          </div>
          <div className="d-flex mt-3">
            <button
              className="btn btn-secondary  w-120px driverServiceTabsButtons m-l-5 m-r-5 "
              type=""
              onClick={() => {
                navigate(`/delease-request/${driverId}`);
              }}
              /**enable the button only if the driver is active
               * and processed bit true */
              disabled={!active || isProcessedBit}
            >
              Request Delease
            </button>
            <button
              className="btn btn-secondary  w-120px driverServiceTabsButtons ms-3 m-r-5 "
              type=""
              onClick={() => {
                navigate(`/driver-service-selection/${driverId}/dispatch-document`);
              }}
            >
              Dispatch Docs
            </button>
          </div>
          <div className="d-flex mt-3">
            <button
              className="btn btn-secondary  driverServiceTabsButtons m-l-5 m-r-5 "
              style={{ width: "105px" }}
              type=""
              onClick={() => {
                navigate(`/driver-service-selection/${driverId}/thank-you-card`);
              }}
            >
              Thank You Card
            </button>
            <button
              className="btn btn-secondary   driverServiceTabsButtons  m-r-5 "
              style={{ width: "104px", marginLeft: "17px" }}
              type=""
              onClick={() => {
                dispatch(setRefundData(null));
                navigate(`/release-reserve/${driverId}`);
              }}
            >
              Release Reserve
            </button>
          </div>

          <div className="d-flex mt-3">
            <button
              className="btn btn-secondary  w-120px driverServiceTabsButtons m-l-5 m-r-5 "
              type=""
              onClick={() => {
                navigate(`/add-notes/${driverId}`);
              }}
            >
              Add Notes
            </button>
            <button
              className="btn btn-secondary  w-120px driverServiceTabsButtons ms-3 m-r-5 "
              type=""
              onClick={() => {
                navigate(`/settlements/${driverId}`);
              }}
            >
              Settlements{" "}
            </button>
          </div>
          <div className="d-flex mt-3">
            <button
              className="btn btn-secondary  w-120px driverServiceTabsButtons m-l-5 m-r-5 "
              type=""
              disabled={editDriverPermissionDenied}
              onClick={() => {
                navigate(`/driver-edit-file/${driverId}`);
              }}
            >
              Edit Driver Files
            </button>
            <button
              className="btn btn-secondary   w-120px driverServiceTabsButtons ms-3 m-r-5 "
              type=""
              onClick={() => {
                navigate(`/payment-requests/${driverId}`);
              }}
            >
              Payment Requests
            </button>
          </div>
          <div className="d-flex mt-3">
            <button
              className="btn btn-secondary  w-120px driverServiceTabsButtons m-l-5 m-r-5 "
              type=""
              onClick={() => {
                navigate(`/add-comments/${driverId}`);
              }}
            >
              Add Comment
            </button>
            <button
              className="btn btn-secondary   w-120px driverServiceTabsButtons ms-3 m-r-5 "
              type=""
              onClick={() => {
                navigate(`/edit-checkin-browse/${driverId}`);
              }}
              disabled={disableEditCheckinButton}
            >
              Edit Check In
            </button>
          </div>

          <div className="d-flex mt-3">
            <button
              className="btn btn-secondary  w-120px driverServiceTabsButtons m-l-5 m-r-5 "
              type=""
              onClick={() => {
                dispatch(setMaintenancePgm(false));
                dispatch(setIsValidEntry(true));
                localStorage.setItem("driverDispatchHoldPgm", 0);
                navigate(`/driverservice/driver-dispatchhold/${driverId}`);
              }}
              /**enable the button only if the driver is active  */
              disabled={!active}
            >
              Dispatch Hold
            </button>
            <button
              className="btn btn-secondary invisible  w-120px driverServiceTabsButtons ms-3 m-r-5 "
              type=""
            ></button>
          </div>
          <div className="d-flex mt-3">
            <button
              className="btn btn-secondary  w-120px driverServiceTabsButtons m-l-5 m-r-5 "
              type=""
              onClick={() => {
                navigate(`/dispatch-restrictions/${driverId}`);
              }}
            >
              No Dispatch
            </button>
            <button
              className="btn btn-secondary invisible  w-120px driverServiceTabsButtons ms-3 m-r-5 "
              type=""
            ></button>
          </div>
        </Col>
        <Col xs={10} md={10}>
          <div className="d-flex">
            <Col xs={6} className="ps-3">
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    {t("edit.dealer.page.general.tab.name")}
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    disabled={disabled}
                    className="form-controlDriverService"
                    id="name"
                    name="name"
                    type="search"
                    value={driverData?.name}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-1 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0"></Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    disabled={disabled}
                    className="form-controlDriverService"
                    value={driverData?.lastName}
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-1 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0"></Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    disabled={disabled}
                    className="form-controlDriverService"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={driverData?.mailingAddress1}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-1 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0"></Col>
                <Col xs={4} md={4} sm={4} className="p-0 ">
                  <input
                    disabled={disabled}
                    className="form-controlDriverService "
                    id="city"
                    name="city"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={driverData?.mailingCity}
                  />
                </Col>
                <Col xs={1} md={1} sm={1} className="p-r-0">
                  <input
                    disabled={disabled}
                    className="form-controlDriverService"
                    id="stateCide"
                    name="stateCide"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={driverData?.mailingStateCode}
                  />
                </Col>

                <Col xs={2} md={2} sm={2} className="p-r-0">
                  <input
                    disabled={disabled}
                    className="form-controlDriverService"
                    id="mailingPostalCode"
                    name="mailingPostalCode"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={driverData?.mailingPostalCode}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  Home Phone
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    disabled={disabled}
                    className="form-controlDriverService"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={driverData?.homePhone}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  Cell Phone
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    disabled={disabled}
                    className="form-controlDriverService"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={driverData?.cellPhone}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  Nickname
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    disabled={disabled}
                    className="form-controlDriverService"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={driverData?.nickName}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  Spouse
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    disabled={disabled}
                    className="form-controlDriverService"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={driverData?.spouseName}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  Hobby
                </Col>

                <Col xs={5} md={5} sm={5} className="p-0">
                  <input
                    disabled={disabled}
                    className="form-controlDriverService"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={driverData?.hobby}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  Other Interests
                </Col>

                <Col xs={5} md={5} sm={5} className="p-0">
                  <input
                    disabled={disabled}
                    className="form-controlDriverService"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={driverData?.otherInterests}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  Dispatcher
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    disabled={disabled}
                    className="form-controlDriverService"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={driverData?.dispatcher}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <div className="d-flex">
                <Col xs={6}>
                  <Form.Group className="mt-2 align-items-center row invisible  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
                    </Col>

                    <Col xs={7} md={7} sm={7} className="p-0">
                      <input
                        disabled={disabled}
                        className="form-controlDriverService"
                        id="name"
                        name="name"
                        type="search"
                        maxLength={30}
                        autoComplete="off"
                        aria-autocomplete="list"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Safety Miles
                      </Form.Label>
                    </Col>

                    <Col xs={3} md={3} sm={3} className="p-0">
                      <input
                        disabled={disabled}
                        className="form-controlDriverService"
                        type="search"
                        maxLength={30}
                        autoComplete="off"
                        aria-autocomplete="list"
                        value={driverData?.safetyMiles}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Current Payback
                      </Form.Label>
                    </Col>

                    <Col xs={3} md={3} sm={3} className="p-0">
                      <input
                        disabled={disabled}
                        className="form-controlDriverService"
                        type="search"
                        maxLength={30}
                        autoComplete="off"
                        aria-autocomplete="list"
                        value={driverData?.currentPayback}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Current Settlement
                      </Form.Label>
                    </Col>

                    <Col xs={3} md={3} sm={3} className="p-0">
                      <input
                        disabled={disabled}
                        className="form-controlDriverService"
                        type="search"
                        maxLength={30}
                        autoComplete="off"
                        aria-autocomplete="list"
                        value={driverData?.currentSettlement}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Current Units
                      </Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0">
                      <input
                        disabled={disabled}
                        className="form-controlDriverService"
                        type="search"
                        maxLength={30}
                        autoComplete="off"
                        aria-autocomplete="list"
                        value={driverData?.currentUnits}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        License Type
                      </Form.Label>
                    </Col>

                    <Col xs={3} md={3} sm={3} className="p-0">
                      <input
                        disabled={disabled}
                        className="form-controlDriverService"
                        type="search"
                        maxLength={30}
                        autoComplete="off"
                        aria-autocomplete="list"
                        value={driverData?.driversLicenseType}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  invisible  m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
                    </Col>

                    <Col xs={3} md={3} sm={3} className="p-0">
                      <input
                        disabled={disabled}
                        className="form-controlDriverService"
                        type="search"
                        maxLength={30}
                        autoComplete="off"
                        aria-autocomplete="list"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <div className="text-end h-100">
                    <img className="" src={displayImage} style={{ height: "150px", maxWidth: "200px" }} />
                  </div>
                </Col>
              </div>

              <Form.Group className="mt-2 align-items-start d-flex Driver   m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="w-120px">
                  <Form.Label htmlFor="name" className="col-form-label  dealer-label">
                    Notes
                  </Form.Label>
                </Col>

                <Col className="p-0  overflow-auto">
                  <div className="h-156px">
                    <textarea
                      ref={textareaRef}
                      className="form-controlDriverService h-100"
                      disabled={disabled}
                      type="search"
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={driverData?.driverServicesNotes}
                    />
                  </div>
                </Col>
              </Form.Group>
            </Col>
          </div>

          <Form.Group className="mt-3 ps-3 align-items-start d-flex  m-l-0 m-r-0">
            <div className="p-0 tableNameWidth">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Check Calls
              </Form.Label>
            </div>

            <div className="p-0 flex-fill DriverServiceGeneraltabListWidth h-250px">
              <CheckCallList />
            </div>
          </Form.Group>
        </Col>
      </div>
    </div>
  );
}

export default General;
