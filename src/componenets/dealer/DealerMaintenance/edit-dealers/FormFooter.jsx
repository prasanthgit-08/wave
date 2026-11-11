import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InCompleteDealerService from "../../../../services/InCompleteDealerService";
import DealerService from "../../../../services/DealerService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import ButtonComponent from "../../../common/Button";
import ModalComponent from "../../../common/ModalComponent";
import { Modal, Button } from "react-bootstrap";
import {
  setViewDetail,
  setTabValid,
  setPickupTabIsValid,
  setResourcesTabIsValid,
  setBolTextTabIsValid,
  setSettingsTabIsValid,
  setDealer,
  setDeliveryTabIsValid,
  setOnCancel,
  setEditDealer,
  setActivateLoader,
  setDeActivateLoader,
  setDeleteDealerLoader,
} from "../../../../redux/EditDealerSlice";
import { Colors } from "../../../../styles/values/colors";
import {
  setPageNumber,
  setSearchCrit,
  setSearchTerm,
  setSelectedId,
  setSortType,
  setSortValue,
} from "../../../../redux/DealerContacts";
import {
  setPageNumber as emailPageNumber,
  setSearchTerm as emailSearchTerm,
  setChangeColor,
  setNormalSortFlag,
  setNormalSortValue,
  setSelectedSearchCriteria,
} from "../../../../redux/DealerEmailSlice";
import LoadingIcon from "../../../common/LoadingIcon";
import { addOrEditDealerMaintenanceLocks } from "../../../../service/processLockHandlers";
import { lockScreens } from "../../../../constants/processLockConfig";
import CommonLockServices from "../../../../service/commonLock/commonLock.service";
import CommonModal from "../../../../components/common/commonModal";

function FormFooter() {
  const [activeShow, setActiveShow] = useState(false);
  const [active, setActive] = useState(true);
  const [cancelShow, setCancelShow] = useState(false);
  const [disableSave, setdisableSave] = useState(true);
  const handleDelete = () => setDeleteDealer(true);
  const handleDeleteNo = () => setDeleteDealer(false);
  const [deleteDealerPopUp, setDeleteDealer] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [lockError, setLockError] = useState("");
  const [inCompleteSaveLoading, setInCompleteSaveLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const pageNum = params.pageNumber;
  const dealerGroupInput = useSelector((state) => state.editDealerReducer.dealerGroupInput);
  const dealerGroupId = useSelector((state) => state.editDealerReducer.dealerGroupId);
  const masterDealerGroupInput = useSelector((state) => state.editDealerReducer.masterDealerGroupInput);
  const masterDealerGroupId = useSelector((state) => state.editDealerReducer.masterDealerGroupId);
  const brokerInput = useSelector((state) => state.editDealerReducer.brokerInput);
  const brokerId = useSelector((state) => state.editDealerReducer.brokerId);
  const customerInput = useSelector((state) => state.editDealerReducer.customerInput);
  const customerId = useSelector((state) => state.editDealerReducer.customerId);
  const dealer = useSelector((state) => state.editDealerReducer.dealer);
  const contactOnDelivery = useSelector((state) => state.editDealerReducer.contactOnDelivery);
  const postalCodeOnChange = useSelector((state) => state.editDealerReducer.postalCodeOnChange);
  const dealerZipPostLenght = useSelector((state) => state.editDealerReducer.dealerZipPostLenght);
  const bolAtDispatchOrFaxBolAtOrderEntry = useSelector(
    (state) => state.editDealerReducer.bolAtDispatchOrFaxBolAtOrderEntry
  );
  const closeBeginDateValid = useSelector((state) => state.editDealerReducer.closeBeginDateValid);
  const closeEndDateValid = useSelector((state) => state.editDealerReducer.closeEndDateValid);
  const faxBolAtOrderEntry = useSelector((state) => state.editDealerReducer.faxBolAtOrderEntry);
  const faxBolAtDispatch = useSelector((state) => state.editDealerReducer.faxBolAtDispatch);
  const isDealerLoading = useSelector((state) => state.editDealerReducer.isDealerLoading);

  let viewDetail = useSelector((state) => state.editDealerReducer.viewDetail);

  let dealerName = useSelector((state) => state.editDealerReducer.dealerName);
  let dealerAddress = useSelector((state) => state.editDealerReducer.dealerAddress);
  let dealerCity = useSelector((state) => state.editDealerReducer.dealerCity);
  let dealerState = useSelector((state) => state.editDealerReducer.dealerStatecode);
  let dealerCanedian = useSelector((state) => state.editDealerReducer.dealerCanadian);
  let dealerPost = useSelector((state) => state.editDealerReducer.dealerPostcode);
  let dealerPhone = useSelector((state) => state.editDealerReducer.dealerPhone);

  let dealerTollPhone = useSelector((state) => state.editDealerReducer.dealerTollPhone);
  let dealerFax = useSelector((state) => state.editDealerReducer.dealerFax);
  let dealerLogin = useSelector((state) => state.editDealerReducer.dealerLogin);
  let dealerPassword = useSelector((state) => state.editDealerReducer.dealerPassword);
  let beginDate = useSelector((state) => state.editDealerReducer.beginDate);
  let endDate = useSelector((state) => state.editDealerReducer.endDate);
  let deliveryPhone = useSelector((state) => state.editDealerReducer.deliveryPhone);
  let pickPhone = useSelector((state) => state.editDealerReducer.pickPhone);
  let gmPhone = useSelector((state) => state.editDealerReducer.gmPhone);
  let gmEmail = useSelector((state) => state.editDealerReducer.gmEmail);
  let smPhone = useSelector((state) => state.editDealerReducer.smPhone);
  let smEmail = useSelector((state) => state.editDealerReducer.smEmail);
  let servicePhone = useSelector((state) => state.editDealerReducer.servicePhone);
  let serviceEmail = useSelector((state) => state.editDealerReducer.serviceEmail);
  let rdPhone = useSelector((state) => state.editDealerReducer.rdPhone);
  let rdEmail = useSelector((state) => state.editDealerReducer.rdEmail);
  let gmExtn = useSelector((state) => state.editDealerReducer.gmExtn);
  let smExtn = useSelector((state) => state.editDealerReducer.smExtn);
  let salesExtn = useSelector((state) => state.editDealerReducer.salesExtn);
  let deliveryExtn = useSelector((state) => state.editDealerReducer.deliveryExtn);

  let cityLength = useSelector((state) => state.editDealerReducer.cityLength);

  let zipPostLenght = useSelector((state) => state.editDealerReducer.zipPostLenght);
  const dealerPostalCodePK = useSelector((state) => state.editDealerReducer.dealerPostalCodePK);
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  useEffect(() => {
    if (!closeBeginDateValid || !closeEndDateValid) {
      setdisableSave(true);
      return; // short-circuit rest of checks
    }

    if (dealerName != "" && dealerAddress != "" && dealerPostalCodePK) {
      if (dealerFax.length == 0 || dealerFax.match(phoneRegex)) {
        if (dealerTollPhone.length == 0 || dealerTollPhone.match(phoneRegex)) {
          if (
            rdEmail.length == 0 ||
            rdEmail.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/)
          ) {
            if (rdPhone.length == 0 || rdPhone.match(phoneRegex)) {
              if (
                serviceEmail.length == 0 ||
                serviceEmail.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/)
              ) {
                if (servicePhone.length == 0 || servicePhone.match(phoneRegex)) {
                  if (
                    smEmail.length == 0 ||
                    smEmail.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/)
                  ) {
                    if (smPhone.length == 0 || smPhone.match(phoneRegex)) {
                      if (
                        gmEmail.length == 0 ||
                        gmEmail.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/)
                      ) {
                        if (gmPhone.length == 0 || gmPhone.match(phoneRegex)) {
                          if (pickPhone.length == 0 || pickPhone.match(phoneRegex)) {
                            if (deliveryPhone?.length == 0 || deliveryPhone?.match(phoneRegex)) {
                              if (
                                (beginDate?.length == 0 && endDate?.length == 0) ||
                                (beginDate?.length != 0 && endDate?.length != 0)
                              ) {
                                if (
                                  (dealerLogin.length == 0 && dealerPassword.length == 0) ||
                                  (dealerLogin.length != 0 && dealerPassword.length != 0)
                                ) {
                                  if (dealerPhone.match(phoneRegex)) {
                                    if (dealerState.length == 2) {
                                      if (dealerPost) {
                                        setdisableSave(false);
                                      } else {
                                        setdisableSave(true);
                                      }
                                    } else {
                                      setdisableSave(true);
                                    }
                                  } else {
                                    setdisableSave(true);
                                  }
                                } else {
                                  setdisableSave(true);
                                }
                              } else {
                                setdisableSave(true);
                              }
                            } else {
                              setdisableSave(true);
                            }
                          } else {
                            setdisableSave(true);
                          }
                        } else {
                          setdisableSave(true);
                        }
                      } else {
                        setdisableSave(true);
                      }
                    } else {
                      setdisableSave(true);
                    }
                  } else {
                    setdisableSave(true);
                  }
                } else {
                  setdisableSave(true);
                }
              } else {
                setdisableSave(true);
              }
            } else {
              setdisableSave(true);
            }
          } else {
            setdisableSave(true);
          }
        } else {
          setdisableSave(true);
        }
      } else {
        setdisableSave(true);
      }
    } else {
      setdisableSave(true);
    }
    if (
      (gmExtn && gmExtn.length < 3) ||
      (salesExtn && salesExtn.length < 3) ||
      (smExtn && smExtn.length < 3) ||
      (deliveryExtn && deliveryExtn.length < 3) ||
      (!dealerGroupId && dealerGroupInput) ||
      (!customerId && dealer?.payCustomerForWash) ||
      (dealer?.canadian && !brokerId) ||
      (dealer?.masterDealer && masterDealerGroupId === null) ||
      dealer?.atleastOneDeliveryDateCheck ||
      dealer?.atleastOneCheckPickupDate ||
      contactOnDelivery === "" ||
      !deliveryPhone?.match(phoneRegex) ||
      ((faxBolAtDispatch || faxBolAtOrderEntry) && (!dealerFax || dealerFax?.trim() === ""))
    ) {
      setdisableSave(true);
    }
  }, [
    dealerName,
    dealerAddress,
    dealerCity,
    rdPhone,
    rdEmail,
    servicePhone,
    serviceEmail,
    smPhone,
    smEmail,
    dealerState,
    dealerPost,
    dealerPhone,
    dealerCanedian,
    dealerTollPhone,
    dealerFax,
    dealerLogin,
    dealerPassword,
    beginDate,
    endDate,
    deliveryPhone,
    pickPhone,
    gmPhone,
    gmEmail,
    zipPostLenght,
    masterDealerGroupId,
    masterDealerGroupInput,
    dealerGroupId,
    dealerGroupInput,
    brokerInput,
    brokerId,
    customerInput,
    customerId,
    dealer,
    postalCodeOnChange,
    dealerPostalCodePK,
    bolAtDispatchOrFaxBolAtOrderEntry,
    closeBeginDateValid,
    closeEndDateValid,
    faxBolAtDispatch,
    faxBolAtOrderEntry,
    smExtn,
    gmExtn,
    salesExtn,
    deliveryExtn,
  ]);

  useEffect(() => {
    // general tab validation

    dispatch(setTabValid(true));

    dispatch(setResourcesTabIsValid(true));

    if (dealerName != "" && dealerAddress != "" && dealerPostalCodePK) {
      if (dealerFax.length == 0 || dealerFax.match(phoneRegex)) {
        if (dealerTollPhone.length == 0 || dealerTollPhone.match(phoneRegex)) {
          if (
            (dealerLogin.length == 0 && dealerPassword.length == 0) ||
            (dealerLogin.length != 0 && dealerPassword.length != 0)
          ) {
            if (dealerPhone.match(phoneRegex)) {
              if (dealerState.length == 2) {
                if (dealerPost) {
                  dispatch(setTabValid(true));
                } else {
                  dispatch(setTabValid(false));
                }
              } else {
                dispatch(setTabValid(false));
              }
            } else {
              dispatch(setTabValid(false));
            }
          } else {
            dispatch(setTabValid(false));
          }
        } else {
          dispatch(setTabValid(false));
        }
      } else {
        dispatch(setTabValid(false));
      }
    } else {
      dispatch(setTabValid(false));
    }
    if (dealer?.atleastOneCheckPickupDate || (!pickPhone.match(phoneRegex) && pickPhone !== "")) {
      dispatch(setPickupTabIsValid(false));
    } else {
      dispatch(setPickupTabIsValid(true));
    }

    if (
      !(beginDate?.length > 0 && endDate?.length < 1) &&
      !(beginDate?.length < 1 && endDate?.length > 0) &&
      (!dealer?.payCustomerForWash || (dealer?.payCustomerForWash && customerId)) &&
      (!dealer?.canadian || brokerId)
    ) {
      dispatch(setSettingsTabIsValid(true));
    } else {
      dispatch(setSettingsTabIsValid(false));
    }

    // resource tab
    if (
      rdEmail.length === 0 ||
      rdEmail.match(/^([a-zA-Z0-9_.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/)
    ) {
      if (rdPhone.length === 0 || rdPhone.match(phoneRegex)) {
        if (
          serviceEmail.length === 0 ||
          serviceEmail.match(/^([a-zA-Z0-9_.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/)
        ) {
          if (servicePhone.length === 0 || servicePhone.match(phoneRegex)) {
            if (
              smEmail.length === 0 ||
              smEmail.match(/^([a-zA-Z0-9_.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/)
            ) {
              if (smPhone.length === 0 || smPhone.match(phoneRegex)) {
                if (
                  gmEmail.length === 0 ||
                  gmEmail.match(/^([a-zA-Z0-9_.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/)
                ) {
                  if (gmPhone.length === 0 || gmPhone.match(phoneRegex)) {
                    // Individual extension checks
                    if (!(gmExtn.length === 0 || gmExtn.length >= 3)) {
                      dispatch(setResourcesTabIsValid(false));
                      return;
                    }

                    if (!(salesExtn.length === 0 || salesExtn.length >= 3)) {
                      dispatch(setResourcesTabIsValid(false));
                      return;
                    }

                    if (!(smExtn.length === 0 || smExtn.length >= 3)) {
                      dispatch(setResourcesTabIsValid(false));
                      return;
                    }

                    if (!(deliveryExtn.length === 0 || deliveryExtn.length >= 3)) {
                      dispatch(setResourcesTabIsValid(false));
                      return;
                    }

                    dispatch(setResourcesTabIsValid(true));
                  } else {
                    dispatch(setResourcesTabIsValid(false));
                  }
                } else {
                  dispatch(setResourcesTabIsValid(false));
                }
              } else {
                dispatch(setResourcesTabIsValid(false));
              }
            } else {
              dispatch(setResourcesTabIsValid(false));
            }
          } else {
            dispatch(setResourcesTabIsValid(false));
          }
        } else {
          dispatch(setResourcesTabIsValid(false));
        }
      } else {
        dispatch(setResourcesTabIsValid(false));
      }
    } else {
      dispatch(setResourcesTabIsValid(false));
    }

    if (deliveryPhone !== "" && deliveryPhone?.match(phoneRegex) && contactOnDelivery !== "") {
      dispatch(setBolTextTabIsValid(true));
    } else {
      dispatch(setBolTextTabIsValid(false));
    }

    if (
      deliveryPhone !== "" &&
      deliveryPhone?.match(phoneRegex) &&
      !dealer?.atleastOneDeliveryDateCheck &&
      contactOnDelivery !== ""
    ) {
      dispatch(setDeliveryTabIsValid(true));
    } else {
      dispatch(setDeliveryTabIsValid(false));
    }
  }, [
    dealerName,
    zipPostLenght,
    dealerAddress,
    dealerCity,
    dealerFax,
    rdPhone,
    rdEmail,
    servicePhone,
    serviceEmail,
    smPhone,
    smEmail,
    gmEmail,
    gmPhone,
    pickPhone,
    dealerTollPhone,
    dealerState,
    dealerCanedian,
    dealerPost,
    dealerPhone,
    dealerLogin,
    dealerPassword,
    beginDate,
    endDate,
    deliveryPhone,
    dealer,
    contactOnDelivery,
    postalCodeOnChange,
    dealerPostalCodePK,
  ]);

  const dealerData = useSelector((state) => state.editDealerReducer.dealer);

  const formIsValid = useSelector((state) => state.editDealerReducer.formIsValid);

  const editDealerData = useSelector((state) => state.editDealerReducer.dealerData);

  const selectedDealerStatus = useSelector((state) => state.dealerSearchReducer.selectedDealerStatus);

  const status = selectedDealerStatus;

  const editDealerMaintenanceLocks = async (lockType = "EditLock", eventName = "Edit") => {
    try {
      setSaveLoading(true);
      const res = await addOrEditDealerMaintenanceLocks({
        processName: lockScreens.DEALER_MAINTENANCE,
        lockType: lockType,
        eventName,
      });
      if (res.data?.Result?.[0].ErrorCode === 1) {
        setLockError(res.data?.Result?.[0].ErrorMsg);
        return false;
      }

      return true;
    } catch (error) {
      return false;
    } finally {
      setSaveLoading(false);
    }
  };

  const cancelDealerMaintenanceLocks = async (lockType = "CancelEdit", eventName = "View") => {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) return;
    setSaveLoading(true);
    CommonLockServices.commonLockRelease({
      processName: lockScreens.DEALER_MAINTENANCE,
      lockType: lockType,
      sessionId: sessionId,
      eventName: "MAINTENANCE",
    })
      .then((res) => {
        console.log("Release lock response", res);
      })
      .catch((err) => {})
      .finally(() => setSaveLoading(false));
  };

  useEffect(() => {
    if (editDealerData != null && null != editDealerData.active) {
      setActive(editDealerData.active);
    }
  }, [editDealerData, formIsValid]);

  const handleActiveClose = () => setActiveShow(false);
  const handleActiveShow = () => setActiveShow(true);

  const handleActiveSave = async (e) => {
    e.preventDefault();

    const res = await editDealerMaintenanceLocks("ActiveLock", "Activate");
    if (!res) {
      setActiveShow(false);
      return;
    }

    if (active === true) {
      deActivateDealers();
    } else {
      activateDealers();
    }
  };

  //Save or Update incompleteDealer
  const saveOrUpdateIncompleteDealer = (e) => {
    setInCompleteSaveLoading(true);
    InCompleteDealerService.createDealer(dealerData)
      .then((response) => {
        navigate("/dealers");
        if (id) toast.success("IncompleteDealer Updated");
        else toast.success("IncompleteDealer Created");
        dispatch(setEditDealer(null));
      })
      .catch((error) => {})
      .finally(() => setInCompleteSaveLoading(false));
  };

  //Save or Update CompleteDealer
  const saveOrUpdateCompleteDealer = (e) => {
    setSaveLoading(true);
    DealerService.createDealer(dealerData)
      .then((response) => {
        navigate("/dealers");
        if (id) toast.success("Dealer Updated");
        else toast.success("Dealer Created");
      })
      .catch((error) => {})
      .finally(() => setSaveLoading(false));
  };

  const handleDeleteYes = async () => {
    const res = await editDealerMaintenanceLocks("DeleteLock", "Delete");
    if (!res) {
      setDeleteDealer(false);
      return;
    }
    dispatch(setDeleteDealerLoader(true));
    DealerService.deleteDealer(dealerData.dealerPK)
      .then((response) => {
        const result = response?.data?.[0];
        if (result?.Status === 0) {
          toast.success(result.Msg || "Dealer Deleted");
          navigate("/dealers");
        } else {
          setErrorShow(true);
          setErrorMsg(result?.Msg || "Something went wrong!! Failed to delete!!");
          console.error(result?.Msg || "Something went wrong!! Failed to delete!!");
        }
      })
      .catch((error) => {
        setErrorShow(true);
        setErrorMsg(error?.response?.data?.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(error?.response?.data?.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => {
        dispatch(setDeleteDealerLoader(false));
        setDeleteDealer(false);
      });
  };

  const activateDealers = () => {
    let pk = dealerData.dealerPK;
    setActiveShow(false);
    dispatch(setActivateLoader(true));
    DealerService.activateDealer(pk)
      .then((response) => {
        setActive(true);
        toast.success("Dealer Activated");
      })
      .catch((error) => {})
      .finally(() => {
        dispatch(setActivateLoader(false));
      });
  };

  const deActivateDealers = () => {
    let pk = dealerData.dealerPK;
    setActiveShow(false);
    dispatch(setDeActivateLoader(true));
    DealerService.deactivateDealer(pk)
      .then((response) => {
        setActive(false);
        toast.success("Dealer Deactivated");
      })
      .catch((error) => {})
      .finally(() => {
        dispatch(setDeActivateLoader(false));
      });
  };

  const onHandleChangeView = async () => {
    const res = await editDealerMaintenanceLocks("EditLock", "Edit");
    if (res) {
      dispatch(setViewDetail(false));
    }
  };

  const handleCancelShow = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/dealers", { state: { item: id, navValue: true, navPage: pageNum } });
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => {
    setCancelShow(false);
    dispatch(setViewDetail(false));
  };

  const handleCancelYes = () => {
    if (id && status === "Complete") {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(setDealer(null));
      dispatch(setOnCancel(true));
      toast.success("Changes Cancelled");
    } else {
      navigate("/dealers");
      dispatch(setViewDetail(false));
      dispatch(setDealer(null));
      dispatch(setOnCancel(true));
      toast.success("Changes Cancelled");
    }
  };

  useEffect(() => {
    if (viewDetail === true) {
      cancelDealerMaintenanceLocks("CancelEdit");
    }
  }, [viewDetail]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {(saveLoading || inCompleteSaveLoading) && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10">
        <ButtonComponent
          route={"/dealer-contacts/" + id + "/" + pageNum}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={" Contacts"}
          hidden={!id || viewDetail === false || status === "InComplete"}
          onClick={() => {
            dispatch(setPageNumber(0));
            dispatch(setSearchCrit("Beginning"));
            dispatch(setSearchTerm(""));
            dispatch(setSelectedId(""));
            dispatch(setSortType(null));
            dispatch(setSortValue(null));
          }}
        />

        <ButtonComponent
          route={`/dealer-email-maintenance/${id}`}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={" Emails"}
          hidden={!id || viewDetail === false || status === "InComplete"}
          onClick={() => {
            dispatch(emailSearchTerm(""));
            dispatch(setSelectedSearchCriteria("Beginning"));
            dispatch(emailPageNumber(0));
            dispatch(setChangeColor(false));
            dispatch(setNormalSortValue(null));
            dispatch(setNormalSortFlag(false));
          }}
        />
      </div>

      <div className="d-flex align-items-center flex-wrap">
        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={"Active"}
          hidden={!id || status === "InComplete" || viewDetail === false}
          onClick={handleActiveShow}
          style={{
            backgroundColor: isDealerLoading ? "" : active === false ? Colors.red : "",
          }}
        />
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={viewDetail === true}
          disabled={dealerName === "" || (id !== undefined && status === "Complete")}
          onClick={() => {
            saveOrUpdateIncompleteDealer();
          }}
        >
          {/* Saving progress is shown by the common LoadingIcon above, not inside the button */}
          Incomplete
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={() => {
            saveOrUpdateCompleteDealer();
          }}
        >
          Save
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handleCancelShow}
        >
          Cancel
        </button>

        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={!id || viewDetail === false || status === "InComplete"}
          onClick={onHandleChangeView}
          label={"Edit"}
        />

        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={!id || viewDetail === false || status === "InComplete"}
          onClick={handleDelete}
          label={"Delete"}
        />

        {/* model Active*/}
        <ModalComponent
          show={activeShow}
          onHide={handleActiveClose}
          title={active === true ? "Deactivate Dealer" : "Activate Dealer"}
          body={
            active === true
              ? " Please confirm you want to Deactivate this Dealer"
              : " Please confirm you want to Activate this Dealer"
          }
          handleYES={handleActiveSave}
          handleNO={handleActiveClose}
        />

        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Dealer Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        <CommonModal
          show={lockError}
          onHide={() => {
            setLockError("");
          }}
          title={`Warning !!`}
          body={lockError}
          handleOK={() => {
            setLockError("");
          }}
          showOK
          color={lockError ? "red" : ""}
        />

        {/* Delete confirmation Modal */}
        <ModalComponent
          show={deleteDealerPopUp}
          onHide={handleDeleteNo}
          title={"Delete Dealer"}
          body={"Please confirm you want to Delete this Dealer"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
        <Modal show={errorShow} onHide={() => setErrorShow(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 temp-red-color">Delete failed!</Modal.Title>
          </Modal.Header>

          <Modal.Body className="font-14 h-100">{errorMsg}</Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={() => setErrorShow(false)}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default FormFooter;
