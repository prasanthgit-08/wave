import { Col, Form, Modal, Row } from "react-bootstrap";
import UnitSectionA from "./UnitSectionA";
import UnitSectionB from "./UnitSectionB";
import UnitSectionC from "./UnitSectionC";
import useUnit from "./useUnit";
import { memo } from "react";
import CommonModal from "../../../../../components/common/commonModal";
import { useDispatch } from "react-redux";
import { setUnitOverride } from "../../../../../store/slices/unit.slice";
import Loading from "../../../../../components/common/loading";

const Unit = ({ styles }) => {
  const {
    updateUnitFields,
    handleUnitTypeSelection,
    checkUnitNumberUniqe,
    handleSpecialCodeSelection,
    handlePickupDealerSelection,
    handleDeliveryDealerSelection,
    handleBrokerSelection,
    handlePortDetailsSelection,
    handleMultiUnitLoadSelection,
    customerRatesList,
    flaterateLoading,
    requiredCDLAHidden,
    invalidDate,
    setInvalidDate,
    invalidDateError,
    unitNumberOverRide,
    setUnitNumberOverRide,
    multiUnitFilteredList,
    invalidEarliestDeliveryDate,
    setInvalidEarliestDeliveryDate,
    invalidEarliestDeliveryDateError,
    invalidLatestDeliveryDate,
    setInvalidLatestDeliveryDate,
    invalidLatestDeliveryDateError,
    invalidEarliestPickupDate,
    setInvalidEarliestPickupDate,
    invalidEarliestPickupDateError,
    invalidLatestPickupDate,
    setInvalidLatestPickupDate,
    invalidLatestPickupDateError,
    cityMaxLimit,
    setCityMaxLimit,
    showMoreInfo,
    setShowMoreInfo,
    multiUnitLoadData,
    handleCityMaxLimitClose,
    multiLoadPcMilerDistance,
    showMultiLoadDistance,
    setShowMultiLoadDistance,
    citiesWithStatecode,
    distanceConfirmationYes,
    distanceLoading,
    loading,
    ratesLoading,
    fetchCalculateRatesDebouncer,
  } = useUnit();

  const dispatch = useDispatch();

  return (
    <div style={{ minWidth: "1230px !important" }}>
      {(loading || ratesLoading) && <Loading />}
      <div
        style={{ minWidth: "1230px !important" }}
        className={`p-2 mb-0  ${styles.miscConatiner} ${styles.orderEntryHeight} `}
      >
        <Row>
          {/* section A */}
          <UnitSectionA
            styles={styles}
            updateUnitFields={updateUnitFields}
            handleUnitTypeSelection={handleUnitTypeSelection}
            checkUnitNumberUniqe={checkUnitNumberUniqe}
            handleSpecialCodeSelection={handleSpecialCodeSelection}
            handlePickupDealerSelection={handlePickupDealerSelection}
            handleDeliveryDealerSelection={handleDeliveryDealerSelection}
            customerRatesList={customerRatesList}
          />

          {/* section B */}
          <UnitSectionB
            styles={styles}
            updateUnitFields={updateUnitFields}
            handleBrokerSelection={handleBrokerSelection}
            handlePortDetailsSelection={handlePortDetailsSelection}
            flaterateLoading={flaterateLoading}
            fetchCalculateRatesDebouncer={fetchCalculateRatesDebouncer}
          />

          {/* section C */}
          <UnitSectionC
            styles={styles}
            updateUnitFields={updateUnitFields}
            handleMultiUnitLoadSelection={handleMultiUnitLoadSelection}
            requiredCDLAHidden={requiredCDLAHidden}
            invalidDate={invalidDate}
            setInvalidDate={setInvalidDate}
            invalidDateError={invalidDateError}
            multiUnitFilteredList={multiUnitFilteredList}
            invalidEarliestDeliveryDate={invalidEarliestDeliveryDate}
            setInvalidEarliestDeliveryDate={setInvalidEarliestDeliveryDate}
            invalidEarliestDeliveryDateError={invalidEarliestDeliveryDateError}
            invalidLatestDeliveryDate={invalidLatestDeliveryDate}
            setInvalidLatestDeliveryDate={setInvalidLatestDeliveryDate}
            invalidLatestDeliveryDateError={invalidLatestDeliveryDateError}
            invalidEarliestPickupDate={invalidEarliestPickupDate}
            setInvalidEarliestPickupDate={setInvalidEarliestPickupDate}
            invalidEarliestPickupDateError={invalidEarliestPickupDateError}
            invalidLatestPickupDate={invalidLatestPickupDate}
            setInvalidLatestPickupDate={setInvalidLatestPickupDate}
            invalidLatestPickupDateError={invalidLatestPickupDateError}
            cityMaxLimit={cityMaxLimit}
            setCityMaxLimit={setCityMaxLimit}
            showMoreInfo={showMoreInfo}
            setShowMoreInfo={setShowMoreInfo}
            multiUnitLoadData={multiUnitLoadData}
            handleCityMaxLimitClose={handleCityMaxLimitClose}
            multiLoadPcMilerDistance={multiLoadPcMilerDistance}
            showMultiLoadDistance={showMultiLoadDistance}
            setShowMultiLoadDistance={setShowMultiLoadDistance}
            citiesWithStatecode={citiesWithStatecode}
            distanceConfirmationYes={distanceConfirmationYes}
            distanceLoading={distanceLoading}
          />
        </Row>
        <div className={`col-xs-12`}>
          {/* Unit Override Modal */}
          {unitNumberOverRide && (
            <CommonModal
              show={unitNumberOverRide}
              onHide={() => {
                setUnitNumberOverRide("");
                updateUnitFields({ unitNumber: "" });
              }}
              title={"Warning!"}
              body={unitNumberOverRide}
              handleYES={() => {
                dispatch(setUnitOverride(true));
                setUnitNumberOverRide("");
              }}
              handleNO={() => {
                dispatch(setUnitOverride(false));
                setUnitNumberOverRide("");
                updateUnitFields({ unitNumber: "" });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Unit);
