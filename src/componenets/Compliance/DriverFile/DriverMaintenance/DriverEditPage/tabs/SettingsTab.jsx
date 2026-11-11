import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../common/LookupButton";
import DateInputField from "../../../../../common/DateInputField";
import { useSelector } from "react-redux";
import {
  setAdsLogin,
  setAdsLoginValid,
  setCompanyData,
  setIsSettingsTabValid,
  setSaveFormData,
} from "../../../../../../redux/DriverMaintenanceSlice";
import { useDispatch } from "react-redux";
import RegionsLookup from "../../../../../LookupScreens/Regions/RegionsLookup";
import DriverService from "../../../../../../services/DriverService";
import { useParams } from "react-router-dom";
import DriverLookup from "../../../../../LookupScreens/Driver/DriverLookup";
import { PermissionKeyGeneratorUtil } from "../../../../../../utils/PermissionKeyGeneratorUtil";
import { getCurrentCompany } from "../../../../../../utils/utils";
import Input from "../../../../../../components/common/input";
import { getEnum } from "../../../../../../utils/enumUtils";

const SettingsTab = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const [regionData, setRegionData] = useState([]);
  const [showLookup, setShowLookup] = useState(false);
  const [regionId, setRegionId] = useState(null);
  const [regionInput, setRegionInput] = useState("");
  const [powerOfAttorneyOnFile, setPowerOfAttorneyOnFile] = useState(false);
  const [hasTollPass, setHasTollPass] = useState(false);
  const [hasPersonalCreditCard, setHasPersonalCreditCard] = useState(false);
  const [twic, setTwic] = useState(false);
  const [clearingHouse, setClearingHouse] = useState(false);
  const [consent, setConsent] = useState(false);
  const [dashCamera, setDashCamera] = useState(false);
  const [disc, setDisc] = useState("");
  const [twoWeeks, setTwoWeeks] = useState(false);
  const [hasPrinter, setHasPrinter] = useState(false);
  const [campfireCrew, setCampfireCrew] = useState(false);
  const [refferal, setRefferal] = useState(false);
  const [lastTransportCompany, setLastTransportCompany] = useState("");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [hundredStore, setHundredStore] = useState(false);
  const [hundredStoreDate, setHundredStoreDate] = useState("");
  const [tractorQualified, setTractorQualified] = useState(false);
  const [busQualified, setBusQualified] = useState(false);
  const [tankerQualified, setTankerQualified] = useState(false);
  const [transportation, setTransportation] = useState("");
  const [hitchTowbar, setHitchTowbar] = useState(false);
  const [towcar, setTowcar] = useState(false);
  const [towCarWeight, setTowCarWeight] = useState("");
  const [bobtailDriver, setBobtailDriver] = useState();
  const [coDriver, setCoDriver] = useState();
  const [towcarDescription, setTowcarDescription] = useState("");
  const [towcarLicense, setTowcarLicense] = useState("");
  const [towcarLicenseState, setTowcarLicenseState] = useState("");
  const [stateCodeExist, setStateCodeExist] = useState(true);
  const [safetyMiles, setSafetyMiles] = useState(0);
  const [totalMiles, setTotalMiles] = useState(0);
  const [dhp, setDhp] = useState("");
  const [mpw, setMpw] = useState("");
  const [hasOpenDamage, setHasOpenDamage] = useState(false);
  const [missedCheckinCalls, setMissedCheckinCalls] = useState(0);
  const [upsNumber, setUpsNumber] = useState("");
  const [loungeDoorCode, setLoungeDoorCode] = useState("");
  const [multipleReloadDispatches, setMultipleReloadDispatches] = useState(false);
  const [multipleOutboundDispatches, setMultipleOutboundDispatches] = useState(false);
  const [adsReloads, setAdsReloads] = useState(true);
  const [adsOutbounds, setAdsOutbounds] = useState(true);
  const [adsPassword, setAdsPassword] = useState("");
  const [primaryDriverId, setprimaryDriverId] = useState(null);
  const [primaryDriverInput, setprimaryDriverInput] = useState("");
  const [primayDriverData, setPrimayDriverData] = useState([]);
  const [driverLookUpShow, setDriverLookUpShow] = useState(false);
  const [borderConnectRegistered, setBorderConnectRegistered] = useState(false);
  const [isHundredStoreDateValidation, setHundredStoreDateValidation] = useState(true);
  const [hundredStoreDateInput, setHundredStoreDateInput] = useState("");
  const [regionLoading, setRegionLoading] = useState(false);
  const [driverLoading, setDriverLoading] = useState(false);
  const driverActive = useSelector((state) => state.driverMaintenanceReducer.driverActive);
  const driverDeleased = useSelector((state) => state.driverMaintenanceReducer.driverDeleased);
  const viewDetail = useSelector((state) => state.driverMaintenanceReducer.viewDetail);
  const editFormData = useSelector((state) => state.driverMaintenanceReducer.editFormData);
  const motorizedDriver = useSelector((state) => state.driverMaintenanceReducer.motorizedDriver);
  const towableDriver = useSelector((state) => state.driverMaintenanceReducer.towableDriver);
  const saveFormData = useSelector((state) => state.driverMaintenanceReducer.saveFormData);
  const companyData = useSelector((state) => state.driverMaintenanceReducer.companyData);
  const isSettingsTabValid = useSelector((state) => state.driverMaintenanceReducer.isSettingsTabValid);
  const displayFlag = useSelector((state) => state.driverMaintenanceReducer.displayFlag);
  const adsLogin = useSelector((state) => state.driverMaintenanceReducer.adsLogin);
  const adsLoginValid = useSelector((state) => state.driverMaintenanceReducer.adsLoginValid);
  //for driverlookup
  const advancedSearchPayload = useSelector((state) => state.driverLookup.advancedSearchPayload);
  const showAdvancedSort = useSelector((state) => state.driverLookup.showAdvancedSort);
  const advancedSortingOrder = useSelector((state) => state.driverLookup.advancedSortingOrder);
  const normalSortFlag = useSelector((state) => state.driverLookup.normalSortFlag);
  const normalSortValue = useSelector((state) => state.driverLookup.normalSortValue);
  const searchTerm = useSelector((state) => state.driverLookup.searchTerm);
  const selectedSearchCriteria = useSelector((state) => state.driverLookup.selectedSearchCriteria);
  const advancedSearchString = useSelector((state) => state.driverLookup.advancedSearchString);
  const advancedSearchByInputs = useSelector((state) => state.driverLookup.advancedSearchByInputs);
  const pageNumber = useSelector((state) => state.driverLookup.pageNumber);
  const driverType = useSelector((state) => state.driverLookup.driverType);
  const statusType = useSelector((state) => state.driverLookup.statusType);
  const cityType = useSelector((state) => state.driverLookup.cityType);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const transportationData = getEnum("transportation");

  const setSettingsTabData = (formData) => {
    setPowerOfAttorneyOnFile(formData?.powerOfAttorneyOnFile || false);
    setHasTollPass(formData?.hasTollPass || false);
    setHasPersonalCreditCard(formData?.hasPersonalCreditCard || false);
    setTwic(formData?.twic || false);
    setClearingHouse(formData?.clearingHouse || false);
    setConsent(formData?.consent || false);
    setDashCamera(formData?.dashCamera || false);
    setDisc(formData?.disc?.trim() || "");
    setTwoWeeks(formData?.twoWeeks || false);
    setHasPrinter(formData?.hasPrinter || false);
    setCampfireCrew(formData?.campfireCrew || false);
    setRefferal(formData?.refferal || false);
    setLastTransportCompany(formData?.lastTransportCompany?.trim() || "");
    setHasPhoto(formData?.hasPhoto || false);
    setHundredStore(formData?.hundredStore || false);
    setHundredStoreDate(formData?.hundredStoreDate || "");
    setTractorQualified(formData?.tractorQualified || false);
    setBusQualified(formData?.busQualified || false);
    setTankerQualified(formData?.tankerQualified || false);
    setTransportation(formData?.transportation?.trim() || "");
    setHitchTowbar(formData?.hitchTowbar || false);
    setTowcar(formData?.towcar || false);
    setTowCarWeight(formData?.towCarWeight);
    setBobtailDriver(formData?.bobtailDriver);
    setCoDriver(formData?.coDriver);
    setTowcarDescription(formData?.towcarDescription?.trim() || "");
    setTowcarLicense(formData?.towcarLicense?.trim() || "");
    setTowcarLicenseState(formData?.towcarLicenseState?.trim() || "");
    setprimaryDriverId(formData?.primaryDriverFK || null);
    setSafetyMiles(formData?.safetyMiles);
    setTotalMiles(formData?.totalMiles);
    setDhp(formData?.dhp);
    setMpw(formData?.mpw);
    setHasOpenDamage(formData?.hasOpenDamage || false);
    setMissedCheckinCalls(formData?.missedCheckinCalls);
    setUpsNumber(formData?.upsNumber);
    setMultipleReloadDispatches(formData?.multipleReloadDispatches || false);
    setMultipleOutboundDispatches(formData?.multipleOutboundDispatches || false);
    setAdsReloads(formData?.adsReloads || false);
    setAdsOutbounds(formData?.adsOutbounds || false);
    setAdsPassword(formData?.adsPassword || "");
    dispatch(setAdsLogin(formData?.adsLogin || ""));
    setRegionId(formData?.regionFK || null);
    setLoungeDoorCode(formData?.loungeDoorCode);
    setBorderConnectRegistered(formData?.borderConnectRegistered || false);
  };
  useEffect(() => {
    if (viewDetail && editFormData != null) {
      setSettingsTabData(editFormData);
      setprimaryDriverInput(editFormData?.driverFileData?.PrimaryDriverName?.trim() || null);
      setRegionInput(editFormData?.driverFileData?.RegionCode?.trim() || null);
    }
    if (!viewDetail && saveFormData !== null && displayFlag) {
      setSettingsTabData(saveFormData);
      setprimaryDriverInput(saveFormData?.primaryDriverInput?.trim() || null);
      setRegionInput(saveFormData?.regionInput?.trim() || null);
    }
  }, [editFormData, viewDetail, displayFlag]);

  const settingsTabData = () => {
    dispatch(
      setSaveFormData({
        powerOfAttorneyOnFile: powerOfAttorneyOnFile,
        hasTollPass: hasTollPass,
        hasPersonalCreditCard: hasPersonalCreditCard,
        twic: twic,
        clearingHouse: clearingHouse,
        consent: consent,
        dashCamera: dashCamera,
        disc: disc,
        twoWeeks: twoWeeks,
        hasPrinter: hasPrinter,
        campfireCrew: campfireCrew,
        refferal: refferal,
        lastTransportCompany: lastTransportCompany,
        hasPhoto: hasPhoto,
        hundredStore: hundredStore,
        hundredStoreDate: hundredStoreDate,
        tractorQualified: tractorQualified,
        busQualified: busQualified,
        tankerQualified: tankerQualified,
        transportation: transportation,
        hitchTowbar: hitchTowbar,
        towcar: towcar,
        towCarWeight: towCarWeight ? towCarWeight : 0,
        bobtailDriver: bobtailDriver,
        coDriver: coDriver,
        towcarDescription: towcarDescription,
        towcarLicense: towcarLicense,
        towcarLicenseState: towcarLicenseState,
        primaryDriverFK: primaryDriverId ? primaryDriverId : null,
        safetyMiles: safetyMiles,
        totalMiles: totalMiles,
        dhp: dhp,
        mpw: mpw,
        hasOpenDamage: hasOpenDamage,
        missedCheckinCalls: missedCheckinCalls,
        upsNumber: upsNumber,
        multipleReloadDispatches: multipleReloadDispatches,
        multipleOutboundDispatches: multipleOutboundDispatches,
        adsReloads: adsReloads,
        adsOutbounds: adsOutbounds,
        adsPassword: adsPassword,
        adsLogin: adsLogin,
        regionFK: regionId,
        borderConnectRegistered: borderConnectRegistered,
        loungeDoorCode: loungeDoorCode,
        primaryDriverInput,
        regionInput,
      })
    );
  };

  useEffect(() => {
    settingsTabData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    powerOfAttorneyOnFile,
    hasTollPass,
    hasPersonalCreditCard,
    twic,
    clearingHouse,
    consent,
    dashCamera,
    disc,
    twoWeeks,
    hasPrinter,
    campfireCrew,
    refferal,
    lastTransportCompany,
    hasPhoto,
    hundredStore,
    hundredStoreDate,
    tractorQualified,
    busQualified,
    tankerQualified,
    transportation,
    hitchTowbar,
    towcar,
    towCarWeight,
    bobtailDriver,
    coDriver,
    towcarDescription,
    towcarLicense,
    towcarLicenseState,
    primaryDriverId,
    safetyMiles,
    totalMiles,
    dhp,
    mpw,
    hasOpenDamage,
    missedCheckinCalls,
    upsNumber,
    multipleReloadDispatches,
    multipleOutboundDispatches,
    adsReloads,
    adsOutbounds,
    regionId,
    adsPassword,
    adsLogin,
    borderConnectRegistered,
    loungeDoorCode,
    primaryDriverInput,
    regionInput,
  ]);

  /**
   * Fetch all Region
   * Used for  Region Autocomplete
   */
  const handlerRegionLookupSelection = (item) => {
    setRegionId(item.regionPK);
    setRegionInput(item.regionCode?.trim());
    setShowLookup(false);
  };
  const handleRegionLookup = () => {
    setShowLookup(true);
  };
  const fetchRegionValues = (string) => {
    setRegionLoading(true);
    DriverService.getAllRegionsByName(string)
      .then((response) => {
        const data = response.data.content;
        const regionList = data?.map((region) => ({
          ...region,
          regionCode: region.regionCode?.trim(),
        }));
        setRegionData(regionList);
        setRegionLoading(false);
      })
      .catch((err) => {
        setRegionLoading(false);
        console.log(err);
      });
  };

  /**
   * Fetch all Drivers
   * Used for Primary Driver  Autocomplete
   */
  const handleDriverLookupSelection = (item) => {
    setprimaryDriverId(item.driverPK);
    setprimaryDriverInput(item.firstName?.trim() + (item.lastName ? " " + item.lastName?.trim() : ""));
    setDriverLookUpShow(false);
  };
  const handleDriverLookupModalShow = () => {
    setDriverLookUpShow(true);
  };
  const fetchDriverValues = (string) => {
    setDriverLoading(true);
    DriverService.getPrimaryDriversForAutocomplete(
      string,
      !driverDeleased ? "Active" : "All",
      id,
      primaryDriverId
    )
      .then((response) => {
        const data = response.data.content;

        const driversList = data?.map((driver) => ({
          ...driver,
          firstName: driver.firstName?.trim(),
        }));
        setPrimayDriverData(driversList);
        setDriverLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setDriverLoading(false);
      });
  };

  /**
   * Used for setting field values
   */
  useEffect(
    () => {
      if (!id) {
        if (companyData) {
          setLoungeDoorCode(companyData?.nextDebitCardDriverNumber);
        } else {
          setLoungeDoorCode("");
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id, companyData]
  );

  useEffect(
    () => {
      if (saveFormData?.bobtailDriver === false && saveFormData?.coDriver === false) {
        setprimaryDriverId(null);
        setprimaryDriverInput("");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [saveFormData?.bobtailDriver, saveFormData?.coDriver]
  );

  useEffect(() => {
    if (saveFormData?.motorized === false) {
      setBusQualified(false);
      setTankerQualified(false);
      setTractorQualified(false);
      setHitchTowbar(false);
      setTowcar(false);
      setTransportation("");
    }
  }, [saveFormData?.motorized]);

  useEffect(() => {
    if (saveFormData?.towable === false) {
      setBobtailDriver(false);
      setCoDriver(false);
    }
  }, [saveFormData?.towable]);

  const isNumber = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d]/g, "");
    if (value) return number;
  };

  const isDISC = (value) => {
    if (!value) return ""; //
    const disc = value.replace(/[^DISCdisc]/g, "");
    return disc.toUpperCase();
  };

  useEffect(() => {
    const company = getCurrentCompany();
    if (company) {
      dispatch(setCompanyData(company));
    }
  }, [dispatch]);

  /**
   * Used to State Code exist or not
   */
  const checkStateCodeExistOrNot = (towcarLicenseState) => {
    DriverService.checkStateCodeExist(towcarLicenseState)
      .then((response) => {
        setStateCodeExist(response.data);
      })
      .catch((err) => {
        setStateCodeExist(false);
      });
  };
  /**
   * Tab validation
   */
  useEffect(() => {
    if (
      regionId &&
      regionInput !== "" &&
      (!safetyMiles || (safetyMiles && safetyMiles <= 2147483647)) &&
      (!totalMiles || (totalMiles && totalMiles <= 2147483647)) &&
      (!missedCheckinCalls || (missedCheckinCalls && missedCheckinCalls <= 32767)) &&
      (!loungeDoorCode || (loungeDoorCode && loungeDoorCode <= 2147483647)) &&
      ((hundredStore && hundredStoreDate && isHundredStoreDateValidation) || !hundredStore) &&
      ((towcar &&
        towcarDescription &&
        towcarLicense &&
        towcarLicenseState &&
        stateCodeExist &&
        towCarWeight &&
        towCarWeight <= 32767) ||
        !towcar) &&
      ((!bobtailDriver && !coDriver) ||
        ((bobtailDriver || coDriver) && primaryDriverId && primaryDriverInput)) &&
      ((adsLogin !== "" && adsPassword !== "" && adsLoginValid) || (adsLogin === "" && adsPassword === ""))
    ) {
      dispatch(setIsSettingsTabValid(true));
    } else {
      dispatch(setIsSettingsTabValid(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isHundredStoreDateValidation,
    regionId,
    regionInput,
    hundredStore,
    hundredStoreDate,
    towcar,
    towcarDescription,
    towcarLicense,
    towCarWeight,
    stateCodeExist,
    coDriver,
    bobtailDriver,
    primaryDriverId,
    primaryDriverInput,
    dhp,
    mpw,
    isHundredStoreDateValidation,
    adsLogin,
    adsLoginValid,
    adsPassword,
    totalMiles,
    safetyMiles,
    missedCheckinCalls,
    loungeDoorCode,
  ]);
  //permission implementation
  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermission = PermissionKeyGeneratorUtil("DRIVER", "edit");
  const [editIsDenied, seteditIsDenied] = useState(false);
  useEffect(() => {
    if (deniedPermissions) {
      seteditIsDenied(!deniedPermissions.includes(editPermission));
    }
  }, [deniedPermissions, editPermission]);

  const handleCheckUniqueAdsLogin = (value) => {
    DriverService.checkUniqueAdsLogin(value, id)
      .then((res) => {
        dispatch(setAdsLoginValid(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="p-15 w-100">
      <Row className="m-0 p-0">
        <Col xs={4} sm={4} md={4} lg={4} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Region</Form.Label>
            </Col>
            <Col xs={7} md={7} sm={7} className={`p-0 d-flex`}>
              <AutoCompleteDropdown
                arrayList={regionData}
                searchString={regionInput}
                renderItemId={(region) => region.regionPK}
                renderItemField={(region) => region.regionCode}
                handleSearchString={(string) => setRegionInput(string)}
                fetchDataBySearchString={fetchRegionValues}
                onSelect={handlerRegionLookupSelection}
                clearInputCallback={() => {
                  setRegionId(null);
                }}
                loading={regionLoading}
                selectedId={regionId}
                disabled={viewDetail}
                className={`customFormControl ${
                  viewDetail ? "" : regionId && regionInput ? "borderGreen" : "borderRed"
                }
         `}
              />
              <LookupButton onClick={handleRegionLookup} disabled={viewDetail} />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Power Of Attorney</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={powerOfAttorneyOnFile}
                checked={powerOfAttorneyOnFile}
                disabled={viewDetail}
                onChange={(e) => {
                  setPowerOfAttorneyOnFile(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Has Toll Pass</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={hasTollPass}
                checked={hasTollPass}
                disabled={viewDetail}
                onChange={(e) => {
                  setHasTollPass(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Has Personal Credit Card</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={hasPersonalCreditCard}
                checked={hasPersonalCreditCard}
                disabled={viewDetail}
                onChange={(e) => {
                  setHasPersonalCreditCard(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">TWIC Card</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={twic}
                checked={twic}
                disabled={viewDetail}
                onChange={(e) => {
                  setTwic(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Clearing House</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={clearingHouse}
                checked={clearingHouse}
                disabled={viewDetail}
                onChange={(e) => {
                  setClearingHouse(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Consent</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={consent}
                checked={consent}
                disabled={viewDetail}
                onChange={(e) => {
                  setConsent(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Has Dashboard Camera</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={dashCamera}
                checked={dashCamera}
                disabled={viewDetail}
                onChange={(e) => {
                  setDashCamera(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">D_I_S_C</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-25px">
              <Input
                className="customFormControl"
                id="disc"
                name="disc"
                type="text"
                value={disc}
                maxLength={1}
                disabled={viewDetail}
                onChange={(e) => {
                  setDisc(isDISC(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Two Weeks</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={twoWeeks}
                checked={twoWeeks}
                disabled={viewDetail}
                onChange={(e) => {
                  setTwoWeeks(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Has In Cab Printer</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={hasPrinter}
                checked={hasPrinter}
                disabled={viewDetail}
                onChange={(e) => {
                  setHasPrinter(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Campfire Crew</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={campfireCrew}
                checked={campfireCrew}
                disabled={viewDetail}
                onChange={(e) => {
                  setCampfireCrew(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Referal</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={refferal}
                checked={refferal}
                disabled={viewDetail}
                onChange={(e) => {
                  setRefferal(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Last Transport Company</Form.Label>
            </Col>

            <Col xs={8} md={8} sm={8} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={lastTransportCompany}
                maxLength={30}
                disabled={viewDetail}
                onChange={(e) => {
                  setLastTransportCompany(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Has Badge Photo</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={hasPhoto}
                checked={hasPhoto}
                disabled={viewDetail}
                onChange={(e) => {
                  setHasPhoto(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
        </Col>

        <Col sm={4} md={4} xs={4} className="ps-lg-5">
          <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">100 Store</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={hundredStore}
                checked={hundredStore}
                disabled={viewDetail}
                onChange={(e) => {
                  const value = e.target.checked;

                  setHundredStore(value);
                  if (!value) {
                    setHundredStoreDate("");
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">100 Store Date</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={hundredStoreDate}
                setDate={setHundredStoreDate}
                disabled={viewDetail || !hundredStore}
                setIsDateValid={setHundredStoreDateValidation}
                className={`customFormControl ${
                  viewDetail === true || !hundredStore
                    ? ""
                    : hundredStore && hundredStoreDate && isHundredStoreDateValidation
                      ? "borderGreen"
                      : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Tractor Qualified</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={tractorQualified}
                checked={tractorQualified}
                disabled={viewDetail || !motorizedDriver}
                onChange={(e) => {
                  setTractorQualified(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Bus Qualified</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={busQualified}
                checked={busQualified}
                disabled={viewDetail || !motorizedDriver}
                onChange={(e) => {
                  setBusQualified(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Tanker Qualified</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={tankerQualified}
                checked={tankerQualified}
                disabled={viewDetail || !motorizedDriver}
                onChange={(e) => {
                  setTankerQualified(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Transporation</Form.Label>
            </Col>
            <Col xs={7} md={7} sm={7} className="p-0">
              <Form.Select
                className="customFormControl"
                name="creditCardPayments"
                disabled={viewDetail || !motorizedDriver}
                value={transportation}
                onChange={(e) => {
                  setTransportation(e.target.value);
                }}
              >
                <option value="">--Select--</option>

                {transportationData?.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Hitch Towbar</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={hitchTowbar}
                checked={hitchTowbar}
                disabled={viewDetail || !motorizedDriver}
                onChange={(e) => {
                  setHitchTowbar(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Towcar</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={towcar}
                checked={towcar}
                disabled={viewDetail || !motorizedDriver}
                onChange={(e) => {
                  const value = e.target.checked;
                  setTowcar(value);
                  if (!value) {
                    setTowcarDescription("");
                    setTowcarLicense("");
                    setTowCarWeight("");
                    setTowcarLicenseState("");
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Towcar Description</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className={`customFormControl ${
                  viewDetail === true || !towcar
                    ? ""
                    : towcar && !towcarDescription
                      ? "borderRed"
                      : "borderGreen"
                }`}
                id="customer"
                name="customer"
                type="customer"
                value={towcarDescription}
                maxLength={30}
                disabled={viewDetail || !motorizedDriver || !towcar}
                onChange={(e) => {
                  setTowcarDescription(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Towcar License/State</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <Input
                className={`customFormControl ${
                  viewDetail === true || !towcar ? "" : towcar && !towcarLicense ? "borderRed" : "borderGreen"
                }`}
                id="customer"
                name="customer"
                type="customer"
                value={towcarLicense}
                maxLength={10}
                disabled={viewDetail || !motorizedDriver || !towcar}
                onChange={(e) => {
                  setTowcarLicense(e.target.value);
                }}
              />
            </Col>
            <Col xs={1} md={1} sm={1} className="p-r-0 w-40px">
              <Input
                className={`customFormControl l ${
                  viewDetail === true || !towcar
                    ? ""
                    : towcar && towcarLicenseState.length === 2 && stateCodeExist
                      ? "borderGreen"
                      : "borderRed"
                }`}
                name="extn"
                value={towcarLicenseState?.toUpperCase()}
                maxLength={2}
                disabled={viewDetail || !motorizedDriver || !towcar}
                onChange={(e) => {
                  const value = e.target.value;
                  setStateCodeExist(false);
                  setTowcarLicenseState(e.target.value);

                  if (value.length === 2) {
                    checkStateCodeExistOrNot(value);
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Towcar Weight</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <Input
                className={`customFormControl ${
                  viewDetail === true || !towcar
                    ? ""
                    : towcar && towCarWeight && towCarWeight <= 32767
                      ? "borderGreen"
                      : "borderRed"
                }`}
                id="customer"
                name="customer"
                type="customer"
                value={towCarWeight}
                maxLength={5}
                disabled={viewDetail || !motorizedDriver || !towcar}
                onChange={(e) => {
                  setTowCarWeight(isNumber(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Bobtail Driver</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={bobtailDriver}
                checked={bobtailDriver}
                disabled={viewDetail || !towableDriver || coDriver}
                onChange={(e) => {
                  setBobtailDriver(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Co Driver</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={coDriver}
                checked={coDriver}
                disabled={viewDetail || !towableDriver || bobtailDriver}
                onChange={(e) => {
                  setCoDriver(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Primary Driver</Form.Label>
            </Col>
            <Col xs={8} md={8} sm={8} className={`p-0 d-flex`}>
              <AutoCompleteDropdown
                arrayList={primayDriverData}
                searchString={primaryDriverInput}
                renderItemId={(item) => item.driverPK}
                renderItemField={(item) =>
                  item.firstName?.trim() + (item.lastName ? " " + item.lastName?.trim() : "")
                }
                handleSearchString={(string) => setprimaryDriverInput(string)}
                fetchDataBySearchString={fetchDriverValues}
                onSelect={handleDriverLookupSelection}
                clearInputCallback={() => {
                  setprimaryDriverId(null);
                }}
                selectedId={primaryDriverId}
                loading={driverLoading}
                disabled={viewDetail || (!coDriver && !bobtailDriver) || !towableDriver}
                towardsTop
                className={`customFormControl ${
                  viewDetail || (!coDriver && !bobtailDriver) || !towableDriver
                    ? ""
                    : (coDriver || bobtailDriver) && primaryDriverId && primaryDriverInput
                      ? "borderGreen"
                      : "borderRed"
                }
     `}
              />
              <LookupButton
                onClick={handleDriverLookupModalShow}
                disabled={viewDetail || (!coDriver && !bobtailDriver)}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col sm={4} md={4} xs={4} className="ps-lg-5">
          <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">Safety Miles</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <Input
                className={`customFormControl ${
                  viewDetail === true ? "" : safetyMiles <= 2147483647 ? "" : "borderRed"
                }`}
                id="customer"
                name="customer"
                type="customer"
                value={safetyMiles}
                maxLength={10}
                disabled={!editIsDenied || viewDetail}
                onChange={(e) => {
                  setSafetyMiles(isNumber(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">Loaded Miles</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <Input
                className={`customFormControl ${
                  viewDetail === true ? "" : totalMiles <= 2147483647 ? "" : "borderRed"
                }`}
                id="customer"
                name="customer"
                type="customer"
                value={totalMiles}
                maxLength={10}
                disabled={!editIsDenied || viewDetail}
                onChange={(e) => {
                  setTotalMiles(isNumber(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">Deadhead Percentage</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-40px">
              <Input
                className={`customFormControl`}
                id="customer"
                name="customer"
                type="customer"
                value={dhp}
                maxLength={2}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">Miles Per Week</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-60px">
              <Input
                className={`customFormControl`}
                maxLength={5}
                id="customer"
                name="customer"
                type="customer"
                value={mpw}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">Has Damage</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={hasOpenDamage}
                checked={hasOpenDamage}
                disabled={!loggedInUser?.master || viewDetail}
                onChange={(e) => {
                  setHasOpenDamage(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">Missed Checkin Calls</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-60px">
              <Input
                className={`customFormControl ${
                  viewDetail === true ? "" : missedCheckinCalls <= 32767 ? "" : "borderRed"
                }`}
                id="customer"
                name="customer"
                type="customer"
                value={missedCheckinCalls}
                maxLength={5}
                disabled={!loggedInUser?.master || viewDetail}
                onChange={(e) => {
                  setMissedCheckinCalls(isNumber(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">Border Connect Registered</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={borderConnectRegistered}
                checked={borderConnectRegistered}
                disabled={viewDetail}
                onChange={(e) => {
                  setBorderConnectRegistered(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">UPS Number</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={upsNumber}
                maxLength={10}
                disabled={!loggedInUser?.master || viewDetail}
                onChange={(e) => {
                  setUpsNumber(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">Lounge Door Code</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <Input
                className={`customFormControl ${
                  viewDetail === true ? "" : loungeDoorCode <= 2147483647 ? "" : "borderRed"
                }`}
                id="customer"
                name="customer"
                type="customer"
                value={loungeDoorCode}
                maxLength={10}
                disabled={!loggedInUser?.master || viewDetail}
                onChange={(e) => {
                  setLoungeDoorCode(isNumber(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">Multiple Reload Dispatches</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={multipleReloadDispatches}
                checked={multipleReloadDispatches}
                disabled={viewDetail}
                onChange={(e) => {
                  setMultipleReloadDispatches(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">Multiple Outbound Dispatches</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={multipleOutboundDispatches}
                checked={multipleOutboundDispatches}
                disabled={viewDetail}
                onChange={(e) => {
                  setMultipleOutboundDispatches(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">ADS Reloads</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                disabled={viewDetail}
                className="form-check-input p-0 "
                value={adsReloads}
                checked={adsReloads}
                onChange={(e) => {
                  setAdsReloads(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">ADS Outbounds</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                disabled={viewDetail}
                className="form-check-input p-0 "
                value={adsOutbounds}
                checked={adsOutbounds}
                onChange={(e) => {
                  setAdsOutbounds(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">ADS Login</Form.Label>
            </Col>
            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className={`customFormControl ${
                  viewDetail === true || (adsLogin === "" && adsPassword === "")
                    ? ""
                    : (adsLogin !== "" && adsLoginValid) ||
                        (adsPassword !== "" && adsLogin !== "" && adsLoginValid) ||
                        (adsPassword === "" && adsLogin === "")
                      ? ""
                      : "borderRed"
                }`}
                id="customer"
                name="customer"
                type={"text"}
                value={adsLogin}
                maxLength={128}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  const value = e.target.value;
                  dispatch(setAdsLogin(e.target.value));
                  dispatch(setAdsLoginValid(true));
                  if (!value) {
                    setAdsPassword("");
                  }
                }}
                //   onBlur={(e) => {
                //     handleCheckUniqueAdsLogin(e.target.value);
                //    }}

                onBlur={(e) => {
                  const value = e.target.value?.trim();
                  if (value) {
                    handleCheckUniqueAdsLogin(value);
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">ADS Password</Form.Label>
            </Col>
            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className={`customFormControl ${
                  !viewDetail && adsLogin && (!adsPassword || adsPassword === null || adsPassword === "")
                    ? "borderRed"
                    : ""
                }`}
                id="adsPswd"
                name="adsPswd"
                value={adsPassword}
                maxLength={50}
                disabled={viewDetail || adsLogin === "" || adsLogin === null || adsLogin === undefined}
                aria-autocomplete="list"
                type="password"
                autoComplete="one-time-code"
                spellCheck={false}
                onChange={(e) => {
                  setAdsPassword(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>

      <RegionsLookup
        show={showLookup}
        onHide={() => setShowLookup(false)}
        renderItemId={(regions) => regions.regionPK}
        handleLookupSelection={handlerRegionLookupSelection}
        MaintenanceProgram
      />
      <DriverLookup
        show={driverLookUpShow}
        onHide={() => setDriverLookUpShow(false)}
        renderItemId={(driver) => driver.driverPK}
        handleLookupSelection={handleDriverLookupSelection}
        showActiveOnly={!driverDeleased}
        customServiceCallback={() =>
          DriverService.getPrimaryDriverLookup(
            searchTerm,
            statusType,
            driverType,
            cityType,
            pageNumber,
            selectedSearchCriteria,
            advancedSearchPayload,
            advancedSortingOrder,
            normalSortValue,
            normalSortFlag,
            advancedSearchString,
            advancedSearchByInputs,
            id,
            primaryDriverId
          )
        }
      />
    </div>
  );
};

export default SettingsTab;
