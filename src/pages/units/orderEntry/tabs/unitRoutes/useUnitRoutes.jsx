import { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setUnitRoutesListing, triggerCalculateRates } from "../../../../../store/slices/unit.slice";
import PcMilerService from "../../../../../services/PcMilerService";
import pcMilerServices from "../../../../../service/pcMiler/pcMiler.service";

const useUnitRoutes = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const isInitialRender = useRef(true);

  const unitRoutesListing = useSelector((state) => state.unit.unitRoutesListing);
  const selectedDeliveryDealer = useSelector((state) => state.unit.selectedDeliveryDealer);

  const pickupDealerFK = useWatch({ name: "unit.pickupDealerFK" });
  const deliveryDealerFK = useWatch({ name: "unit.deliveryDealerFK" });
  const miscellaneousPickup = useWatch({ name: "unit.miscellaneousPickup" });
  const miscellaneousDelivery = useWatch({ name: "unit.miscellaneousDelivery" });
  const poeFK = useWatch({ name: "unit.poeFK" });
  const pickupAtPlant = useWatch({ name: "customer.pickupAtPlant" });
  const pickupCustomerPlantFK = useWatch({ name: "customer.pickupCustomerPlantFK" });

  const [selectedIndex, setSelectedIndex] = useState(null);
  const poeRecordIndex = unitRoutesListing?.findIndex((item) => item?.poeFK);
  const unitRoutesLength = unitRoutesListing?.length;
  const isCanadianPickup = unitRoutesListing[0]?.isCanadian || false;
  const isCanadianDelivery = unitRoutesListing[unitRoutesLength - 1]?.isCanadian || false;
  const usToCanada = !isCanadianPickup && isCanadianDelivery;
  const canadaToUs = isCanadianPickup && !isCanadianDelivery;
  const usDriveBy = !isCanadianPickup && !isCanadianDelivery;
  const canadianDriveBy = isCanadianPickup && isCanadianDelivery;
  const selectedDriveBy = unitRoutesListing[selectedIndex];

  const [showPCMilerModal, setShowPCMilerModal] = useState(false);
  const [showPCMilerErrorModal, setShowPCMilerErrorModal] = useState(false);
  const [pcMilerError, setPcMilerError] = useState(false);
  const [loader, setLoader] = useState(false);

  // TODO: Handle Unit tab and miles adjustment dependencies (PC Miler & Optimize)
  const invoiceMiles = useSelector((state) => state.unit?.invoiceMiles);
  const selectedPickupYard = useSelector((state) => state.unit?.selectedPickupYard);

  const { setValue } = useFormContext();
  const disableMoveUp =
    selectedIndex === null ||
    unitRoutesListing?.length === 3 ||
    selectedIndex === 0 ||
    selectedIndex === unitRoutesListing?.length - 1 ||
    selectedIndex === 1 ||
    selectedIndex === poeRecordIndex ||
    (usToCanada && selectedDriveBy?.isCanadian && selectedIndex === poeRecordIndex + 1) ||
    (canadaToUs && !selectedDriveBy?.isCanadian && selectedIndex === poeRecordIndex + 1);

  const disableMoveDown =
    selectedIndex === null ||
    unitRoutesListing?.length === 3 ||
    selectedIndex === 0 ||
    selectedIndex === unitRoutesListing?.length - 1 ||
    selectedIndex === unitRoutesListing?.length - 2 ||
    selectedIndex === poeRecordIndex ||
    (usToCanada && !selectedDriveBy?.isCanadian && selectedIndex === poeRecordIndex - 1) ||
    (canadaToUs && selectedDriveBy?.isCanadian && selectedIndex === poeRecordIndex - 1);

  const populateFormFields = (item, index) => {
    setSelectedIndex(index);
    setName(item.name || "");
    setAddress1(item.address1 || "");
    setAddress2(item.address2 || "");
    setCity(item.city || "");
    setStateCode(item.stateCode || "");
    setPostalCode(item.postalCode || "");
  };

  const handleMoveUp = () => {
    dispatch(
      setUnitRoutesListing({
        actionType: "moveUp",
        payload: selectedIndex,
      })
    );
    setSelectedIndex(selectedIndex - 1);
  };

  const handleMoveDown = () => {
    dispatch(
      setUnitRoutesListing({
        actionType: "moveDown",
        payload: selectedIndex,
      })
    );
    setSelectedIndex(selectedIndex + 1);
  };

  const handleOptize = () => {
    setLoader(true);
    pcMilerServices
      .optimiseRoute(unitRoutesListing)
      .then((res) => {
        setLoader(false);
        if (res != null && res.data !== "") {
          let optimizedList = res.data;
          let data = optimizedList.pop();

          let distance = data.miles ? Math.round(data.miles) : 0;
          if (Number(data?.miles) > 0) {
            setValue("unit.invoiceMiles", String(distance));
            setValue("unit.driverMiles", String(distance));
          }
          if (data.miles) {
            // dispatch(setUnitRoutesArray(optimizedList));
            // Replace current unitRoutesList with optimized unitRoutesList
            dispatch(
              setUnitRoutesListing({
                actionType: "set",
                payload: optimizedList,
              })
            );
            setShowPCMilerErrorModal(false);
            dispatch(triggerCalculateRates());
          }
          setPcMilerError("");
        }
      })
      .catch((err) => {
        setShowPCMilerErrorModal(true);
        setPcMilerError("PC Miler is not available");
        setLoader(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (isInitialRender.current) return;
    if (!pickupDealerFK) {
      dispatch(setUnitRoutesListing({ actionType: "removePickup" }));
    }
  }, [pickupDealerFK]);

  useEffect(() => {
    if (isInitialRender.current) return;
    if (!miscellaneousPickup) {
      dispatch(setUnitRoutesListing({ actionType: "removeMiscPickup" }));
    }
  }, [miscellaneousPickup]);

  useEffect(() => {
    if (isInitialRender.current) return;
    if (!deliveryDealerFK) {
      dispatch(setUnitRoutesListing({ actionType: "removeDelivery" }));
    }
  }, [deliveryDealerFK]);

  useEffect(() => {
    if (isInitialRender.current) return;
    if (!miscellaneousDelivery) {
      dispatch(setUnitRoutesListing({ actionType: "removeMiscDelivery" }));
    }
  }, [miscellaneousDelivery]);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    if (!poeFK) {
      dispatch(setUnitRoutesListing({ actionType: "removePoe" }));
    }
  }, [poeFK]);

  return {
    selectedIndex,
    unitRoutesListing,
    disableMoveUp,
    disableMoveDown,
    loader,
    name,
    address1,
    address2,
    city,
    stateCode,
    postalCode,
    showPCMilerModal,
    showPCMilerErrorModal,
    pcMilerError,
    populateFormFields,
    handleMoveUp,
    handleMoveDown,
    handleOptize,
    setShowPCMilerModal,
    recalculateRates: () => dispatch(triggerCalculateRates()),
  };
};

export default useUnitRoutes;
