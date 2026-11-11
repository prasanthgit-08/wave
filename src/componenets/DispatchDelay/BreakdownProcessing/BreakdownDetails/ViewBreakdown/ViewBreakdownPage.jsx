import React, { useEffect, useState } from "react";
import Header from "../../../../common/Header";
import CommonFooter from "../../../../common/CommonFooter";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import General from "./tabs/General";
import Emails from "./tabs/Emails";
import BreakdownComments from "./tabs/BreakdownComments";
import BreakdownInstructions from "./tabs/BreakdownInstructions";
import Resources from "./tabs/Resources";
import Documents from "./tabs/Documents";
import { useDispatch, useSelector } from "react-redux";
import {
  setBreakdownDetailFlag,
  setViewBreakdownActiveTab,
  resetEditEmailChanges,
  setEditView,
  setEditSelectedIndex,
  setEditAddFlag,
  setDelayBreakdownDocumentFiles,
  setEditEmailList,
  resetBreakdowbBrowsePage,
  setNavigateToInvoice,
  setCreditCardFlag,
  setPaidFlag,
  setCreditCardPayment,
  setUnitFK,
  setCustomerFK,
  setNavigateToSettlement,
  setRepaired,
  setFurtherRepairRequired,
  setSisterUnitFk,
  setUnitFkScanInvoice,
  setRepairPlantFlag,
} from "../../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import BreakdownProcessingService from "../../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";
import {
  setBreakdownFK,
  setDelayedUnitExpsnseId,
  setDelayedUnitId,
  setValidEntry,
  setViewDetail,
} from "../../../../../redux/DelayUnitExpenseSlice";
import DelayUnitExpenseService from "../../../../../services/DispatchDelay/BreakdownProcessing/DelayUnitExpenseService";
import { PermissionKeyGeneratorUtil } from "../../../../../utils/PermissionKeyGeneratorUtil";
import {
  setChangeColor,
  setDisplayFlag,
  setEditFlag,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
} from "../../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownFeesSlice";
import EditMasterExpressShuttle from "../../../../Units/EditMasterExpress/EditMasterExpressShuttle/EditMasterExpressShuttle";
import { setShowBreakdownShuttle } from "../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

const ViewBreakdownPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const viewBreakdownActiveTab = useSelector((state) => state.delaybreakdown.viewBreakdownActiveTab);
  const paidFlag = useSelector((state) => state.delaybreakdown.paidFlag);
  const editView = useSelector((state) => state.delaybreakdown.editView);
  const delayedUnitExpsnseId = useSelector((state) => state.delayUnitExpenseSlice.delayedUnitExpsnseId);
  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermission = PermissionKeyGeneratorUtil("breakdown", "edit");
  const { breakdownFK } = useParams();
  const breakdownCompanyName = localStorage.getItem("breakdownCompanyName");
  const breakdownUnitFK = localStorage.getItem("breakdownUnitFK");
  const breakdownDriverFK = localStorage.getItem("breakdownDriverFK");
  const delayedUnitFK = localStorage.getItem("delayedUnitFK");
  const [flag, setFlag] = useState(false);
  const [disableExpense, setDisableExpense] = useState(false);
  const [hasValidExpenseRecord, setHasValidExpenseRecord] = useState(false);
  const [loader1, setLoader1] = useState(false);
  //Used for Breakdown Shuttle
  const showBreakdownShuttle = useSelector(
    (state) => state.editMasterExpressTabsReducer.showBreakdownShuttle
  );
  const [unitPK, setUnitPK] = useState("");
  const [loader, setLoader] = useState(false);
  const [plantList, setPlantList] = useState([]);
  const [delayBreakdownShuttleData, setDelayBreakdownShuttleData] = useState([]);
  const [isShuttleButtonDisabled, setIsShuttleButtonDisabled] = useState(false);
  const repaired = useSelector((state) => state.delaybreakdown.repaired);
  const furtherRepairRequired = useSelector((state) => state.delaybreakdown.furtherRepairRequired);
  const [isInvoiceButtonDisabled, setIsInvoiceButtonDisabled] = useState(false);

  /********Used for getting the repair Plant Status****/
  const fetchRepairPlantStatusByName = (string) => {
    BreakdownProcessingService.geActiveRepairPlantForAutoComplete(
      string,
      breakdownCompanyName,
      breakdownUnitFK
    )
      .then((response) => {
        const data = response?.data;
        const listingData = data?.filter((item) => item.Type !== "Pagination" && item.Type !== "plantEnabled");

        const plantList = (listingData || []).map((plant) => ({
          ...plant,
          name: plant?.name?.trim() || "",
        }));
        const plantEnabled = data?.find((item) => item.Type === "plantEnabled");
        if (plantEnabled) {
          dispatch(setRepairPlantFlag(plantEnabled?.PlantEnabled));
        }
        setPlantList(plantList);
      })
      .catch((err) => {});
  };

  /* Used for Breakdown Invoice */
  useEffect(() => {
    BreakdownProcessingService.getBreakdownInvoiceData(breakdownFK, breakdownCompanyName, "", false)
      .then((response) => {
        const data = response?.data;
        setFlag(data?.isDelayPresent?.[0]?.IsDelayPresent === 1);
        dispatch(setCreditCardFlag(data?.isDelayPresent?.[0]?.FODInvoice === 1));
        dispatch(setPaidFlag(data?.isDelayPresent?.[0]?.IsPaidPresent === 1));
        dispatch(setRepaired(data?.isDelayPresent?.[0]?.repaired || false));
        dispatch(setFurtherRepairRequired(data?.isDelayPresent?.[0]?.furtherRepairsRequired || false));
        dispatch(setCreditCardPayment(data?.isDelayPresent?.[0]?.CreditCardPayment || ""));
        dispatch(setUnitFK(data?.isDelayPresent?.[0]?.UnitFK || null));
        dispatch(setCustomerFK(data?.isDelayPresent?.[0]?.customerFK || null));
      })
      .catch(() => {});
  }, [breakdownFK, breakdownCompanyName]);

  /* Used for setting expense validations */
  useEffect(() => {
    if (delayedUnitFK && breakdownFK) {
      setLoader1(true);
      DelayUnitExpenseService.getData("validate", delayedUnitFK, 0, breakdownFK, {})
        .then(({ data }) => {
          dispatch(setDelayedUnitExpsnseId(data?.DelayedUnitExpensePK || 0));
          setHasValidExpenseRecord(data?.DriverFlag || 0);
          dispatch(setDelayedUnitId(delayedUnitFK || 0));
        })
        .catch()
        .finally(() => {
          setLoader1(false);
        });
    }
  }, [delayedUnitFK]);

  useEffect(() => {
    if (delayedUnitExpsnseId || !deniedPermissions?.includes(editPermission)) {
      setDisableExpense(false);
      dispatch(setViewDetail(delayedUnitExpsnseId));
    } else {
      setDisableExpense(true);
    }
  }, [hasValidExpenseRecord, deniedPermissions, editPermission, delayedUnitExpsnseId]);

  /* End expense validations */

  /* Function to determine if a button should be displayed */
  const shouldHideButton = (keyword) => pathname?.includes(keyword);

  {
    /* Shuttle Button */
  }
  const handleShuttle = () => {
    dispatch(setShowBreakdownShuttle(true));
  };

  /* Settlement Button */
  const handleSettlement = () => {
    dispatch(setNavigateToSettlement(true));
    navigate(`/delay-settlement/${breakdownFK}/${delayedUnitFK}/${encodeURIComponent(breakdownCompanyName)}`);
  };

  /**  Invoice Button */
  const handleInvoice = () => {
    dispatch(setNavigateToInvoice(true));
    navigate("/delay-unit-breakdown-invoice/" + breakdownFK);
  };

  /* Expense Button */
  const handleExpenses = () => {
    dispatch(setValidEntry(true));
    dispatch(setBreakdownFK(breakdownFK));
    navigate(`/delay-unit-expense/${delayedUnitFK}/${breakdownFK}`);
  };

  /* Fees Button */
  const handleFees = () => {
    dispatch(setDisplayFlag(true));
    navigate("/delayed-unit-fees-view/" + breakdownFK);
    dispatch(setNormalSortValue(null));
    dispatch(setNormalSortFlag(false));
    dispatch(setPageNumber(0));
    dispatch(setChangeColor(false));
    dispatch(setEditFlag(false));
  };

  {
    /* Edit Button */
  }
  const handleEdit = () => {
    navigate("/breakdown-processing/edit-breakdown/" + Number(breakdownFK));
    /********Used for getting the repair Plant Status****/
    if (unitPK) {
      fetchRepairPlantStatusByName();
    }
    dispatch(setBreakdownDetailFlag(true));
    dispatch(setEditEmailList([]));
    dispatch(resetEditEmailChanges());
    dispatch(setEditView(false));
    dispatch(setEditSelectedIndex(null));
    dispatch(setEditAddFlag(false));
    dispatch(setRepairPlantFlag(""));
    dispatch(setDelayBreakdownDocumentFiles({ actionType: "clear" }));
  };

  // Set the initial active tab to 'general' when the component mounts
  useEffect(() => {
    dispatch(setViewBreakdownActiveTab("general"));
  }, []);

  {
    /* Cancel Button */
  }
  const handleCancel = () => {
    navigate(
      "/breakdown/browse/" +
        breakdownCompanyName +
        "/" +
        Number(breakdownUnitFK) +
        "/" +
        Number(breakdownDriverFK) +
        "/" +
        Number(delayedUnitFK)
    );
    dispatch(setViewBreakdownActiveTab("general"));
  };

  //used for Breakdown Shuttle

  useEffect(() => {
    if (breakdownFK) {
      setLoader(true);

      BreakdownProcessingService.getDelayBreakdownInformation(breakdownFK)
        .then((response) => {
          const data = response?.data?.delayUnitBreakdownDetails[0];
          setDelayBreakdownShuttleData(data);
          dispatch(setSisterUnitFk(data?.SisterUnitFK));
          dispatch(setUnitFkScanInvoice(data?.unitfk));
          setUnitPK(data?.unitfk);
          setLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    }
  }, [breakdownFK]);
  //used disable shuttle button
  useEffect(() => {
    if (delayBreakdownShuttleData) {
      const breaksownNotRepaired =
        delayBreakdownShuttleData?.Repaired === false &&
        delayBreakdownShuttleData?.FurtherRepairsRequired === false;

      if (
        !delayBreakdownShuttleData?.SisterUnitFK &&
        delayBreakdownShuttleData?.PickupCustomerPlantFK &&
        (delayBreakdownShuttleData?.InYard || delayBreakdownShuttleData?.AtPickup) &&
        breaksownNotRepaired &&
        !delayBreakdownShuttleData?.partialtrip
      ) {
        setIsShuttleButtonDisabled(false);
      } else {
        setIsShuttleButtonDisabled(true);
      }
    }
  }, [delayBreakdownShuttleData]);

  const buttons = [
    { label: "Shuttle", onClick: handleShuttle, disabled: isShuttleButtonDisabled },
    {
      label: "Settlement",
      onClick: handleSettlement,

      disabled: !(paidFlag == 1 && repaired == 0 && furtherRepairRequired == 0),
    },
    {
      label: "Invoice",
      onClick: handleInvoice,
      disabled: !(flag == 1 && repaired == 0 && furtherRepairRequired == 0),

      hidden: !shouldHideButton("view-breakdown") || editView,
    },
    {
      label: "Expenses",
      onClick: handleExpenses,
      disabled: disableExpense,
      hidden: !shouldHideButton("view-breakdown") || editView,
    },
    { label: "Fees", onClick: handleFees, hidden: !shouldHideButton("view-breakdown") || editView },
    { label: "Edit", onClick: handleEdit },
    { label: "Cancel", onClick: handleCancel },
  ];

  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header
          programName="Delay Processing"
          closeHandler={() => {
            dispatch(setViewBreakdownActiveTab("general"));
            dispatch(resetBreakdowbBrowsePage());
          }}
          closeNavigationURL={`/delay-processing/delayed-details/${breakdownCompanyName}/${Number(
            breakdownUnitFK
          )}/${Number(breakdownDriverFK)}/${Number(delayedUnitFK)}`}
        />
        <div className="p-2">
          <div className="shadow-sm rounded border threeFourthScreenFormContentHeight">
            <Tabs
              activeKey={viewBreakdownActiveTab}
              onSelect={(key) => dispatch(setViewBreakdownActiveTab(key))}
              id="uncontrolled-tab-example"
              className="m-b-2"
            >
              <Tab eventKey="general" title={"General"}>
                <General />
              </Tab>
              <Tab eventKey="emails" title={"Emails"}>
                <Emails />
              </Tab>
              <Tab eventKey="breakdownComments" title={"Breakdown Comments"}>
                <BreakdownComments />
              </Tab>
              <Tab eventKey="breakdownInstructions" title={"Breakdown Instructions"}>
                <BreakdownInstructions />
              </Tab>
              <Tab eventKey="resources" title={"Resources"}>
                <Resources />
              </Tab>
              <Tab eventKey="documents" title={"Documents"}>
                <Documents />
              </Tab>
            </Tabs>
          </div>
        </div>
        <CommonFooter buttons={buttons} />
        <EditMasterExpressShuttle
          show={showBreakdownShuttle}
          onHide={() => dispatch(setShowBreakdownShuttle(false))}
          unitPK={unitPK}
        />
        {loader && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBreakdownPage;
