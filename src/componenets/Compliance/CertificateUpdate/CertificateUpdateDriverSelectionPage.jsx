/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import QuarterScreenWrapper from "../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../common/Header";
import CommonFooter from "../../common/CommonFooter";
import LookupButton from "../../common/LookupButton";
import LoadingIcon from "../../common/LoadingIcon";
import { PaginationComponent } from "../../common/PaginationComponent";
import DriverLookup from "../../LookupScreens/Driver/DriverLookup";
import useDebouncer from "../../../hooks/useDebouncer";
import CertificateUpdateService from "../../../services/Compliance/CertificateUpdateService";
import {
  setDriverData,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  resetCertificateUpdate,
} from "../../../redux/Compliance/CertificateUpdateSlice";
import CertificateUpdateDriverListing from "./CertificateUpdateDriverListing";

const PAGE_SIZE = 10;

const CertificateUpdateDriverSelectionPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userPK = loggedInUser?.userPK;
  const { type, availableDate, nextDate } = state || {};

  useEffect(() => {
    if (!type || !availableDate || !nextDate) {
      navigate("/certificate-update", { replace: true });
    }
  }, [type, availableDate, nextDate]);

  // Reset the browse state when leaving the screen
  useEffect(() => {
    return () => dispatch(resetCertificateUpdate());
  }, []);

  const driverData = useSelector((state) => state.certificateUpdateReducer.driverData);
  const pageNumber = useSelector((state) => state.certificateUpdateReducer.pageNumber);
  const totalPages = useSelector((state) => state.certificateUpdateReducer.totalPages);
  const totalElements = useSelector((state) => state.certificateUpdateReducer.totalElements);

  const [nameFirst, setNameFirst] = useState("");
  const [nameSecond, setNameSecond] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [sortValue, setSortValue] = useState("");
  const [sortType, setSortType] = useState(1);
  const [selectedDriverPK, setSelectedDriverPK] = useState(null);
  const [loader, setLoader] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [showLookup, setShowLookup] = useState(false);
  const [lookupSelected, setLookupSelected] = useState(false);

  const hasSearch = Boolean(firstName || lastName);

  const fetchDrivers = () => {
    if (lookupSelected) return;
    if (!hasSearch) {
      dispatch(setDriverData([]));
      dispatch(setTotalPages(0));
      dispatch(setTotalElements(0));
      return;
    }
    setLoader(true);
    CertificateUpdateService.browseDrivers({
      userPK,
      firstName,
      lastName,
      sortValue,
      sortType: Boolean(sortType),
      pageNumber: pageNumber + 1,
      size: PAGE_SIZE,
    })
      .then((res) => {
        const data = res?.data?.response;
        dispatch(setDriverData(data?.drivers || []));
        dispatch(setTotalPages(data?.pagination?.[0]?.TotalPages || 0));
        dispatch(setTotalElements(data?.pagination?.[0]?.TotalElements || 0));
      })
      .catch((err) => console.error("Error fetching drivers:", err))
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    fetchDrivers();
  }, [firstName, lastName, pageNumber, sortValue, sortType, lookupSelected]);

  const handleSort = (column) => {
    setSortValue(column);
    setSortType(sortType ? 0 : 1);
    dispatch(setPageNumber(0));
  };

  const handleFirstNameChange = useDebouncer((value) => {
    setLookupSelected(false);
    setFirstName(value.trim());
    dispatch(setPageNumber(0));
    setSelectedDriverPK(null);
  }, 400);

  const handleLastNameChange = useDebouncer((value) => {
    setLookupSelected(false);
    setLastName(value.trim());
    dispatch(setPageNumber(0));
    setSelectedDriverPK(null);
  }, 400);

  const handleLookupSelection = (driver) => {
    const first = driver?.firstName ?? driver?.FirstName ?? "";
    const last = driver?.lastName ?? driver?.LastName ?? "";
    setNameFirst(first);
    setNameSecond(last);
    setFirstName(first);
    setLastName(last);
    dispatch(setPageNumber(0));
    dispatch(setTotalPages(0));
    dispatch(setTotalElements(0));
    dispatch(
      setDriverData([
        {
          DriverPK: driver?.driverPK,
          FirstName: first,
          LastName: last,
          City: driver?.city ?? driver?.City ?? "",
          State: driver?.state ?? driver?.State ?? "",
        },
      ])
    );
    setSelectedDriverPK(driver?.driverPK ?? null);
    setLookupSelected(true);
    setShowLookup(false);
  };

  const handleUpdate = () => {
    if (!selectedDriverPK) return;
    setUpdating(true);
    CertificateUpdateService.updateCertificate({
      userPK,
      driverPK: selectedDriverPK,
      type,
      availableDate,
      nextDate,
    })
      .then(() => {
        toast.success("Certificate updated successfully");
        navigate("/certificate-update");
      })
      .catch((err) => {
        console.error("Error updating certificate:", err);
        toast.error("Failed to update certificate");
      })
      .finally(() => setUpdating(false));
  };

  const handleCancel = () => {
    setSelectedDriverPK(null);
    setLookupSelected(false);
    dispatch(resetCertificateUpdate());
    navigate("/certificate-update");
  };

  const paginationProps = {
    loader,
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: driverData,
  };

  const footerButtons = [
    {
      label: updating ? (
        <div className="loader-container">
          <div className="loader_YardCheckin"></div>
        </div>
      ) : (
        "Update"
      ),
      onClick: handleUpdate,
      disabled: !selectedDriverPK || updating,
    },
    {
      label: "Cancel",
      onClick: handleCancel,
    },
  ];

  return (
    <QuarterScreenWrapper>
      <Header closeNavigationURL="/certificate-update" />

      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          {loader && <LoadingIcon />}

          <Col className="p-15" xs={10}>
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-2">
              <Col xs={3} className="p-0 text-end">
                <Form.Label className="customColFormLabel me-3">Driver</Form.Label>
              </Col>

              <Col xs={3} className="p-0">
                <input
                  type="text"
                  className="form-controlDriverService"
                  placeholder="ENTER FIRST NAME"
                  value={nameFirst}
                  style={{ width: "171px" }}
                  onChange={(e) => {
                    setNameFirst(e.target.value);
                    handleFirstNameChange(e.target.value);
                  }}
                />
              </Col>

              <Col xs={3} className="d-flex" style={{ marginLeft: "-28px" }}>
                <input
                  type="text"
                  className="form-controlDriverService"
                  placeholder="ENTER LAST NAME"
                  value={nameSecond}
                  onChange={(e) => {
                    setNameSecond(e.target.value);
                    handleLastNameChange(e.target.value);
                  }}
                />
              </Col>
              <LookupButton onClick={() => setShowLookup(true)} style={{ marginLeft: "-2px" }} />
            </Form.Group>
          </Col>

          <div className="my-2 mx-2">
            <div className="d-flex border border-1 border-dark" style={{ height: "330px" }}>
              <div className="flex-grow-1">
                <CertificateUpdateDriverListing
                  loader={loader}
                  driverData={driverData}
                  selectedDriverPK={selectedDriverPK}
                  setSelectedDriverPK={setSelectedDriverPK}
                  sortValue={sortValue}
                  sortType={sortType}
                  handleSort={handleSort}
                />
              </div>

              <PaginationComponent {...paginationProps} firstPage lastPage singleArrowUp singleArrowDown />
            </div>
          </div>
        </div>
      </div>

      <DriverLookup
        show={showLookup}
        onHide={() => setShowLookup(false)}
        renderItemId={(driver) => driver.driverPK}
        handleLookupSelection={handleLookupSelection}
        MaintenanceProgram
        showActiveOnly
      />

      <CommonFooter buttons={footerButtons} />
    </QuarterScreenWrapper>
  );
};

export default CertificateUpdateDriverSelectionPage;
