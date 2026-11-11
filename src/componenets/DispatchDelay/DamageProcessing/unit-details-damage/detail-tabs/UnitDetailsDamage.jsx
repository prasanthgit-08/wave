import React, { useEffect, useState } from "react";
import UnitDamageDetailsContent from "./UnitDetailsDamageContent";
import CommonFooter from "../../../../common/CommonFooter";
import Header from "../../../../common/Header";
import ThreeFourthScreenWrapper from "../../../../Templates/Screens/ThreeFourthScreenWrapper";
import { useDispatch, useSelector } from "react-redux";
import DelayDamageService from "../../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  setDisableDamageSave,
  setDocumentsTabRedisKeys,
  setViewDetail,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayDamageSlice";
import {
  resetChanges,
  setDamageSafetyFlag,
  setDelayDamageValue,
} from "../../../../../redux/DelayDamageSafetySlice";
import { setShowDamageShuttle } from "../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";
import EditMasterExpressShuttle from "../../../../Units/EditMasterExpress/EditMasterExpressShuttle/EditMasterExpressShuttle";
import BreakdownProcessingService from "../../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";

const UnitDetailsDamage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const [loader, setLoader] = useState(false);
  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });
  const [selectedCompanyName, setCompanyName] = useState(() => {
    // Initialize state from localStorage
    return localStorage.getItem("selectedCompany");
  });
  const viewDetail = useSelector((state) => state.delayDamage.viewDetail);
  const claimsVO = useSelector((state) => state.delayDamage.claimsVO);
  const emailVO = useSelector((state) => state.delayDamage.emailVO);
  const emailDamageData = useSelector((state) => state.delayDamage.emailDamageData);
  const damageInstructionsVO = useSelector((state) => state.delayDamage.damageInstructionsVO);
  const damageResourceVO = useSelector((state) => state.delayDamage.damageResourceVO);
  const damageCommentsVO = useSelector((state) => state.delayDamage.damageCommentsVO);
  const isClaimTabValid = useSelector((state) => state.delayDamage.isClaimTabValid);
  const generalVO = useSelector((state) => state.delayDamage.generalVO);
  const emailViewDamageData = useSelector((state) => state.delayDamage.emailViewDamageData);
  const instructionViewDamageData = useSelector((state) => state.delayDamage.instructionViewDamageData);
  const resourceDamageData = useSelector((state) => state.delayDamage.resourceDamageData);
  const damageCommentsViewDamageData = useSelector((state) => state.delayDamage.damageCommentsViewDamageData);
  const documentsTabRedisKeys = useSelector((state) => state.delayDamage.documentsTabRedisKeys);
  const disableDamageSave = useSelector((state) => state.delayDamage.disableDamageSave);

  const validGeneral = useSelector((state) => state.delayDamage.validGeneral);

  const showDamageShuttle = useSelector((state) => state.editMasterExpressTabsReducer.showDamageShuttle);
  const [unitPK, setUnitPK] = useState("");
  const [delayDamageData, setDelayDamageData] = useState([]);
  const [isShuttleButtonDisabled, setIsShuttleButtonDisabled] = useState(false);
  const [isSafetyButtonDisabled, setIsSafetyButtonDisabled] = useState(false);
  const handleShuttleOnClick = () => {
    dispatch(setShowDamageShuttle(true));
  };

  const handleEditOnClick = () => {
    dispatch(setViewDetail(false));
  };

  const handleSafetyOnClick = () => {
    dispatch(resetChanges());
    dispatch(setDamageSafetyFlag(true));

    navigate("/damage-processing-safety/" + id);
  };

  const handleCheckOnClick = () => {
    navigate(`/delay-unit-check-request/${id}`);
  };

  /******
   * Save  or Update the Delay Unit Damages
   * *****/
  const handleSaveDelayDamages = () => {
    const sampleSchema = {
      delayedUnitDamagePK: 42,
      dispatchDelayDamageVO: {
        claimNumber: "CLM12345",
        driverPK: "John Doe",
        unitNumber: "UNIT5678",
        vin: "1HGCM82633A123456",
        damageDate: "2025-04-16T01:25:00",
        reportedDate: "2025-04-16T01:25:00",
        damageCode: "DC001",
        customerDamageContact: "Jane Smith",
        customerDamagePhone: "123-456-7890",
        customerDamageFAX: "123-456-7899",
        repaired: true,
        repairDate: "2025-04-18",
        furtherRepairsRequired: false,
        deliveryTerminated: false,
        atRepairLocation: true,
        repairdealerFK: null,
        repairPlantFK: null,
        repairLocation1: "RepairShop A",
        repairLocation2: "Building B",
        repairLocation3: "Bay 3",
        repairLocation4: "Level 2",
        repairLocation5: "Zone R",
        repairLocation6: "Unit 12",
        nameUnder: "John Smith",
        workOrderNumber: "WO98765",
        contact: "David Green",
        phone: "987-654-3210",
        status: "In Progress",
        statusComment: "Repair scheduled",
      },
      delayedUnitEmailsVO: {
        emailEntries: [
          {
            delayedUnitEmailPK: 1,
            name: "John Doe",
            email: "john.doe@example.com",
          },
          {
            delayedUnitEmailPK: 2,
            name: "Jane Smith",
            email: "jane.smith@example.com",
          },
          {
            delayedUnitEmailPK: 3,
            name: "Michael Johnson",
            email: "michael.j@example.com",
          },
        ],
      },
      damageInstructionsVO: {
        damageInstructions: "Inspect the undercarriage before loading.",
      },
      damageResourceVO: {
        description: "Spare tire and jack needed",
        phone: "555-1234",
      },
      redisKeys: [
        "PAPERWORK_14 No Callin Report.pdf_8_1747048434665",
        "PAPERWORK_Git_tutorial.pdf_8_1747048434723",
      ],
      claimsVO: {},
    };
    const data = { emailEntries: emailDamageData };
    const payload = {
      dispatchDelayDamageVO: generalVO,
      claimsVO: claimsVO,
      delayedUnitEmailsVO: data,
      damageInstructionsVO: damageInstructionsVO,
      damageResourceVO: damageResourceVO,
      damageCommentsVO: damageCommentsVO,
      redisKeys: documentsTabRedisKeys,
      delayedUnitDamagePK: id,
    };
    DelayDamageService.editandSaveDelayDamage(payload)
      .then((response) => {
        sendNotificationEmail(id);
        navigate(
          "/damage-unit/add/" + selectedCompanyName + "/" + rowData?.delayedUnitPK + "/" + rowData?.driverFK
        );
        toast.success("Delay Unit Damages Updated");
      })
      .catch((error) => {
        navigate(
          "/damage-unit/add/" + selectedCompanyName + "/" + rowData?.delayedUnitPK + "/" + rowData?.driverFK
        );
        toast.error("Failed to Update Delay Unit Damages");
      });
  };

  const sendNotificationEmail = (damageFK) => {
    BreakdownProcessingService.sendUpdateNotificationEmail(selectedCompanyName, "DAMAGE", damageFK)
      .then((response) => {
        const data = response?.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    // TODO
    // Clear required states and navigate to required page

    // Clearing Documents Tab temporary data
    if (!viewDetail) {
      dispatch(setViewDetail(true));
    } else {
      navigate(
        "/damage-unit/add/" + selectedCompanyName + "/" + rowData?.delayedUnitPK + "/" + rowData?.driverFK
      );
    }
    dispatch(setDocumentsTabRedisKeys({ actionType: "clear" }));
  };

  useEffect(() => {
    if (validGeneral && isClaimTabValid) {
      dispatch(setDisableDamageSave(false));
    } else {
      dispatch(setDisableDamageSave(true));
    }
  }, [validGeneral, isClaimTabValid]);

  useEffect(() => {
    setLoader(true);
    DelayDamageService.getDelayDamageInformation(id)
      .then((response) => {
        const data = response?.data?.delayUnitDamageDetails[0];
        setDelayDamageData(data);
        setUnitPK(data?.unitfk);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  }, [id]);

  //used disable shuttle button
  useEffect(() => {
    if (delayDamageData) {
      const damageNotRepaired =
        delayDamageData?.Repaired === false && delayDamageData?.FurtherRepairsRequired === false;

      if (
        !delayDamageData?.SisterUnitFK &&
        delayDamageData?.PickupCustomerPlantFK &&
        (delayDamageData?.InYard || delayDamageData?.AtPickup) &&
        damageNotRepaired &&
        !delayDamageData?.partialtrip
      ) {
        setIsShuttleButtonDisabled(false);
      } else {
        setIsShuttleButtonDisabled(true);
      }
    }
  }, [delayDamageData]);

  /*********Used for Delay Damage Shuttle-ends**********/

  //used disable Safety Button

  useEffect(() => {
    if (
      delayDamageData?.DriverFK &&
      delayDamageData.Status?.toUpperCase() === "C" &&
      (delayDamageData.DriverAtFault || delayDamageData.DriverResponcible)
    ) {
      setIsSafetyButtonDisabled(false);
    } else {
      setIsSafetyButtonDisabled(true);
    }
  }, [delayDamageData]);

  const buttons = [
    {
      label: "Shuttle",
      onClick: () => {
        handleShuttleOnClick();
      },
      disabled: isShuttleButtonDisabled,
      hidden: !viewDetail,
    },
    {
      label: "Safety",
      onClick: () => handleSafetyOnClick(),
      disabled: isSafetyButtonDisabled,
      hidden: !viewDetail,
    },

    {
      label: "Checks",
      onClick: () => {
        handleCheckOnClick();
      },
      disabled: false,
      hidden: !viewDetail,
    },
    {
      label: "Save",
      onClick: () => {
        handleSaveDelayDamages();
      },
      hidden: viewDetail,
      disabled: disableDamageSave,
    },
    {
      label: "Edit",
      onClick: () => {
        handleEditOnClick();
      },
      hidden: !viewDetail,
    },
    {
      label: "Cancel",
      onClick: () => {
        handleCancel();
      },
    },
  ];

  return (
    <ThreeFourthScreenWrapper>
      <Header />
      <UnitDamageDetailsContent />
      <CommonFooter buttons={buttons} />

      <EditMasterExpressShuttle
        show={showDamageShuttle}
        onHide={() => dispatch(setShowDamageShuttle(false))}
        unitPK={unitPK}
      />
    </ThreeFourthScreenWrapper>
  );
};

export default UnitDetailsDamage;
