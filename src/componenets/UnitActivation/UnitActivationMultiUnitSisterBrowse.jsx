import React, { useEffect, useState } from "react";
import { PaginationComponent } from "../common/PaginationComponent";
import UnitActivationFooter from "./UnitActivationFooter";
import UnitActivationHeader from "./UnitActivationHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSaveList,
  setChangeColor,
  setLoader,
  setSaveDisable,
  setSelectedCompanies,
  updatePostArrayList,
  setPageNumber,
  setChangedPostArrayList,
  setDelay,
  setNewDelayNavigation,
} from "../../redux/UnitActivationSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import UnitActivationService from "../../services/UnitActivationService";
import toast from "react-hot-toast";
import DeleteComponent from "../common/DeleteComponent";
import usePagination from "../../hooks/usePagination";
import WarningModalPopUp from "../common/WarningModalPopUp";

function UnitActivationMultiUnitSisterBrowse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [sisterCompanies, setSisterCompanies] = useState([]);
  const [unitIndex, setUnitIndex] = useState(null);
  const [hardPostAddCount, setHardPostAddCount] = useState(0);
  const [hardPostUpdateCount, setHardPostUpdateCount] = useState(0);
  const [softPostAddCount, setSoftPostAddCount] = useState(0);
  const [softPostUpdateCount, setSoftPostUpdateCount] = useState(0);
  const [show, setShow] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [modalPopup, setModalPopUp] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [saveMessage, setSaveMessage] = useState("Data Successfully saved.");
  const [saveFailedList, setSaveFailedList] = useState([]);
  const {
    browseType,
    pageNumber,
    unitBrowseLoading,
    viewOnly,
    postArrayList,
    selectedCompanies,
    changedPostArrayList,
  } = useSelector((state) => state.unitActivationReducer);
  const dispatchDelayArrayList = useSelector((state) => state.unitActivationReducer.dispatchDelayArrayList);
  const sessionId = localStorage.getItem("sessionId") || null;

  const fetchSisterCompany = () => {
    UnitActivationService.getAllSisterCompanies()
      .then((response) => {
        setSisterCompanies(response.data);
      })
      .catch((error) => {});
  };

  const closeHandler = () => {
    if (dispatchDelayArrayList?.length > 0) {
      dispatch(setDelay("dispatch"));
      dispatch(
        setNewDelayNavigation({
          from: "delayDispatchMulti",
          navigateTo: "/unit-activation-selections",
        })
      );
      navigate(
        `/delay-processing/new-delayed-unit-confirmation/${dispatchDelayArrayList?.[0]?.company}/${
          dispatchDelayArrayList?.[0]?.unitPK
        }/${dispatchDelayArrayList?.[0]?.driverFK || 0}`
      );
    } else {
      dispatch(
        resetSaveList({
          key: "all",
        })
      );
      navigate("/unit-activation-selections");
      toast.success("Changes Cancelled");
    }
  };
  const saveHandler = () => {
    if (changedPostArrayList?.length > 0) {
      dispatch(setLoader(true));
      const payload = { UnitActivationVO: changedPostArrayList, SessionID: sessionId, isMultibrowse: true };

      UnitActivationService.saveUnitActivation(payload)
        .then((response) => {
          dispatch(setLoader(false));
          if (response.data !== "") {
            const data = response.data?.unitActivationSave?.[0];
            setHardPostAddCount(data.hardPostAddCount);
            setHardPostUpdateCount(data.hardPostUpdateCount);
            setSoftPostAddCount(data.softPostAddCount);
            setSoftPostUpdateCount(data.softPostUpdateCount);
            setSaveFailedList(
              response?.data?.unsavedList?.map((item) => `${item?.UnitNumber} - ${item?.failedUnits}`) || []
            );
            dispatch(
              resetSaveList({
                key: "post",
              })
            );
            if (
              Number(data.hardPostAddCount) > 0 ||
              Number(data.hardPostUpdateCount) > 0 ||
              Number(data.softPostAddCount) > 0 ||
              Number(data.softPostUpdateCount) > 0 ||
              response?.data?.unsavedList?.length > 0
            ) {
              handleShow();
            }
          }
        })
        .catch((err) => {
          dispatch(setLoader(false));
          if (err.response) {
            if (err?.response?.data?.dataObj) {
              setHardPostAddCount(err?.response?.data?.dataObj?.hardPostAddCount);
              setHardPostUpdateCount(err?.response?.data?.dataObj?.hardPostUpdateCount);
              setSoftPostAddCount(err?.response?.data?.dataObj?.softPostAddCount);
              setSoftPostUpdateCount(err?.response?.data?.dataObj?.softPostUpdateCount);
              setSaveFailedList(err?.response?.data?.dataObj?.saveFailed);
              dispatch(
                resetSaveList({
                  key: "post",
                })
              );
              if (
                Number(err?.response?.data?.dataObj?.hardPostAddCount) > 0 ||
                Number(err?.response?.data?.dataObj?.hardPostUpdateCount) > 0 ||
                Number(err?.response?.data?.dataObj?.softPostAddCount) > 0 ||
                Number(err?.response?.data?.dataObj?.softPostUpdateCount) > 0 ||
                err?.response?.data?.dataObj?.saveFailed?.length > 0
              ) {
                handleShow();
              }
            } else {
              // The request was made and the server responded with a status code
              setSaveError(true);
              setErrorMessage(
                err?.response?.data?.errorMsg || "Sorry, something went wrong.Please try again."
              );
              setModalPopUp(true);
            }
          } else if (err.request) {
            // The request was made but no response was received
            setSaveError(true);
            setErrorMessage("Sorry, it's unable to establish a connection to the remote service.");
            setModalPopUp(true);
          } else {
            // Something happened in setting up the request that triggered an Error
            setErrorMessage(err?.response?.data?.errorMsg || "Sorry, something went wrong.Please try again.");
          }
          setSaveError(true);
        });
    } else if (dispatchDelayArrayList?.length > 0) {
      dispatch(setDelay("dispatch"));
      dispatch(
        setNewDelayNavigation({
          from: "delayDispatchMulti",
          navigateTo: "/unit-activation-selections",
        })
      );
      navigate(
        `/delay-processing/new-delayed-unit-confirmation/${dispatchDelayArrayList?.[0]?.company}/${
          dispatchDelayArrayList?.[0]?.unitPK
        }/${dispatchDelayArrayList?.[0]?.driverFK || 0}`
      );
    } else {
      dispatch(
        resetSaveList({
          key: "all",
        })
      );
      navigate("/unit-activation-selections");
    }
  };

  /**
   * Used for popup message-multibrowse screen
   */
  const handleShow = () => setShow(true);
  const ShowMessage = () => {
    navigate("/unit-activation-selections");
    setShow(false);
  };

  /**
   * Calls warning popup modal
   * to show the status of error
   **/
  const warningPopupModalHide = () => {
    if (saveError === true) {
      dispatch(setLoader(false));
      setSaveError(false);
      setErrorMessage("");
      setSaveMessage("");
      setModalPopUp(false);
    } else {
      setModalPopUp(false);
    }
  };
  const postArrayListPagination = usePagination(postArrayList, pageNumber, 17);
  const { paginatedArray, totalElements, totalPages } = postArrayListPagination;

  const isRecordValid = (record) => {
    if (record && (record.hardPost || record.softPost) && record.sisterCompanyPKList?.length > 0) {
      return true; // Record is valid
    } else {
      return false; // Record is invalid
    }
  };

  const inValid = paginatedArray.some((record) => !isRecordValid(record));

  useEffect(() => {
    let changedArrayList = postArrayList?.filter(
      (element) =>
        element.activeDispatch !== element.alreadyActivated ||
        Number(element.bonusPoolRate) !== Number(element.previousBonusPoolRate) ||
        element.priority !== element.previousPriority ||
        element.driverViewOnly !== element.alreadyDriverViewOnly ||
        element.driverDispatch !== element.alreadyDriverDispatch ||
        element.unitOnHold !== element.alreadyOnHold ||
        element.delayDispatch !== element.alreadyDelayed ||
        element.unitOnShuttleDelay !== element.alreadyShuttleDelayed ||
        element.underDelay !== element.alreadyDispatchDelayed ||
        element.delayDispatchReason !== element.previousDelayDispatchReason ||
        element.postedTo !== element.alreadyPosted
    );

    // Compares changedArray <=> selectedDataArray && returns unique elements from changedArray
    const arrayToAdd = changedArrayList?.filter((item) =>
      changedPostArrayList?.every((data) => data.unitPK !== item.unitPK && data.company !== item.company)
    );
    if (arrayToAdd?.length > 0) {
      dispatch(setChangedPostArrayList(arrayToAdd));
    }
    dispatch(setPageNumber(0));
  }, []);

  useEffect(() => {
    if (browseType === "") navigate("/unit-activation-selections");
    else fetchSisterCompany();
  }, []);

  useEffect(() => {
    setUnitIndex(null);
    setId(null);
    dispatch(setSelectedCompanies([]));
  }, [pageNumber]);

  useEffect(() => {
    if (changedPostArrayList.length > 0 && !inValid) {
      dispatch(setSaveDisable(false));
    } else {
      dispatch(setSaveDisable(true));
    }
  }, [changedPostArrayList, inValid]);

  useEffect(() => {
    const inValid = changedPostArrayList.some((record) => !isRecordValid(record));
    setIsFormValid(!inValid);
  }, [changedPostArrayList]);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: paginatedArray,
  };

  return (
    <div className="UnitActivationSelectionMainCotainer">
      <div className="p-1 UnitActivationSelectionMultiBrowseCotainer">
        <UnitActivationHeader closeButton={true} closeHandler={closeHandler} />
        <div className="border-1 border border-dark border-top-0 border-bottom-0 flex-fill">
          <div className="p-r-0 p-l-0 h-100">
            <div className="d-flex h-100  border-1 border">
              <div className="fixTableHead  flex-grow-1 h-100">
                <table className="table table-striped f-w-600 mb-0">
                  <thead>
                    <tr disabled>
                      <th className="f-w-600">Unit Number</th>
                      <th className="f-w-600">Special</th>
                      <th className="f-w-600">Unit Type</th>
                      <th className="f-w-600">Customer</th>
                      <th className="f-w-600">Plant</th>
                      <th className="f-w-600">Pickup</th>
                      <th className="f-w-600">Dealer</th>
                      <th className="f-w-600">Del By Date </th>
                      <th className="f-w-600">Ordr Date</th>
                      <th className="f-w-600">Miles</th>
                    </tr>
                  </thead>

                  {unitBrowseLoading
                    ? null
                    : postArrayList?.length >= 1 && (
                        <tbody>
                          {paginatedArray?.map((units, index) => (
                            <tr
                              id="rowId"
                              key={`${units.unitPK}-${units.company}`}
                              className={`${
                                id === `${units.unitPK}-${units.company}` ? "tableSelected" : ""
                              } ${isRecordValid(units) ? "" : "invalidRecord"}`}
                              onClick={(event) => {
                                dispatch(setChangeColor(true));
                                setId(`${units.unitPK}-${units.company}`);
                                dispatch(setSelectedCompanies(units.sisterCompanyPKList || []));
                                setUnitIndex(index);
                              }}
                            >
                              <td className="f-w-600">{units.unitNumber}</td>
                              <td className="f-w-600">{units.specialCode}</td>
                              <td className="f-w-600">{units.unitType}</td>
                              <td className="f-w-600">{units.customer}</td>
                              <td className="f-w-600">{units.customerPlant}</td>
                              <td className="f-w-600">{units.pickupName}</td>
                              <td className="f-w-600">{units.pickupDealerName}</td>
                              <td className="f-w-600">
                                {units.deliverByDate ? moment(units.deliverByDate).format("MM/DD/YY") : ""}
                              </td>
                              <td className="f-w-600">
                                {units.orderDate ? moment(units.orderDate).format("MM/DD/YY") : ""}
                              </td>
                              <td className="f-w-600">{units.miles}</td>
                            </tr>
                          ))}
                        </tbody>
                      )}
                </table>
                {unitBrowseLoading
                  ? ""
                  : paginatedArray?.length === 0 && (
                      <div className="noRecordsSmallerFont">No Records Available</div>
                    )}
              </div>
              <PaginationComponent
                {...paginationProps}
                firstPage
                lastPage
                tripleArrowUp
                tripleArrowDown
                doubleArrowUp
                doubleArrowDown
                singleArrowUp
                singleArrowDown
                hideBorderTop
                hideBorderBottom
                recordsPerPage={5}
              />
              <div className="col-3 fixTableHead h-100">
                <table className="table table-striped  mb-0">
                  <thead>
                    <tr disabled>
                      <th className="f-w-600">Sister Company</th>
                      <th className="f-w-600">
                        <input
                          type="checkbox"
                          name="hardPost"
                          id="hardPost"
                          className={`form-check-input me-2 ${
                            unitIndex !== null &&
                            paginatedArray[unitIndex]?.canHardPost &&
                            !isRecordValid(paginatedArray[unitIndex])
                              ? "borderRed"
                              : ""
                          }`}
                          checked={paginatedArray[unitIndex]?.hardPost}
                          onChange={(e) => {
                            dispatch(
                              updatePostArrayList({
                                key: "hardPost",
                                index: unitIndex,
                                id: id,
                                value: e.target.checked,
                              })
                            );
                          }}
                          disabled={viewOnly || unitIndex === null || !paginatedArray[unitIndex]?.canHardPost}
                        />
                        Hard Post
                      </th>
                      <th className="f-w-600">
                        <input
                          type="checkbox"
                          name="softPost"
                          id="softPost"
                          className={`form-check-input me-2 ${
                            unitIndex !== null &&
                            paginatedArray[unitIndex]?.canSoftPost &&
                            !isRecordValid(paginatedArray[unitIndex])
                              ? "borderRed"
                              : ""
                          }`}
                          checked={paginatedArray[unitIndex]?.softPost}
                          onChange={(e) => {
                            dispatch(
                              updatePostArrayList({
                                key: "softPost",
                                index: unitIndex,
                                id: id,
                                value: e.target.checked,
                              })
                            );
                          }}
                          disabled={viewOnly || unitIndex === null || !paginatedArray[unitIndex]?.canSoftPost}
                        />
                        Soft Post
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sisterCompanies.length > 0 && (
                      <>
                        {sisterCompanies.map((sisterCompany, idx) => (
                          <tr
                            id="rowId"
                            key={sisterCompany.companyPK}
                            className={
                              selectedCompanies?.includes(sisterCompany.companyPK) ? "tableSelected" : ""
                            }
                          >
                            <td className="f-w-600">
                              <input
                                type="checkbox"
                                className={`form-check-input me-2 ${
                                  unitIndex !== null && !isRecordValid(paginatedArray[unitIndex])
                                    ? "borderRed"
                                    : ""
                                }`}
                                checked={
                                  paginatedArray[unitIndex]?.sisterCompanyPKList?.includes(
                                    sisterCompany.companyPK
                                  )
                                    ? true
                                    : false
                                }
                                onChange={(e) => {
                                  dispatch(
                                    updatePostArrayList({
                                      key: "company",
                                      index: unitIndex,
                                      id: id,
                                      value: e.target.checked,
                                      companyPK: sisterCompany.companyPK,
                                    })
                                  );
                                }}
                                disabled={
                                  viewOnly ||
                                  unitIndex === null ||
                                  (!paginatedArray[unitIndex]?.softPost &&
                                    !paginatedArray[unitIndex]?.hardPost)
                                }
                              />
                              {"  "}
                              {sisterCompany.name}
                            </td>
                            <td />
                            <td />
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <UnitActivationFooter saveButton={true} saveHandler={saveHandler} />
        <DeleteComponent
          show={show}
          onHide={ShowMessage}
          title={"Multibrowse Post to Sister Save"}
          body={
            <table style={{ borderCollapse: "collapse", width: "50%" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "5px" }}>Soft Post </td>
                  <td style={{ padding: "5px" }}>
                    New: <span style={{ color: "green" }}>{softPostAddCount}</span>
                  </td>
                  <td style={{ padding: "5px" }}>
                    Updated: <span style={{ color: "green" }}>{softPostUpdateCount}</span>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }}>Hard Post </td>
                  <td style={{ padding: "5px" }}>
                    New: <span style={{ color: "green" }}>{hardPostAddCount}</span>
                  </td>
                  <td style={{ padding: "5px" }}>
                    Updated: <span style={{ color: "green" }}>{hardPostUpdateCount}</span>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }}>Save Failed: </td>
                  <td style={{ padding: "5px", color: "red" }} colSpan={2}>
                    {saveFailedList?.join(", ") || "None"}
                  </td>
                </tr>
              </tbody>
            </table>
          }
          handleOK={ShowMessage}
        />
        <WarningModalPopUp
          show={modalPopup}
          onHide={warningPopupModalHide}
          title={saveError === true ? "Error" : "Success"}
          body={saveError === true ? errorMessage : saveMessage}
          handleOK={warningPopupModalHide}
          showOK={true}
          color={saveError === true ? "red" : "black"}
        />
      </div>
    </div>
  );
}
export default UnitActivationMultiUnitSisterBrowse;
