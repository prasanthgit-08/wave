import React, { useEffect, useState } from "react";
import QuarterScreenWrapper from "../../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../../common/Header";
import CommonFooter from "../../../../common/CommonFooter";
import { Tabs, Tab } from "react-bootstrap";
import General from "../tabs/General";
import Rates from "../tabs/Rates";
import { useSelector } from "react-redux";
import DealerConnectionFlatRateService from "../../../../../services/DealerConnectionFlatRateService";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ModalComponent from "../../../../common/ModalComponent";
import toast from "react-hot-toast";
import LoadingIcon from "../../../../common/LoadingIcon";

const FlatrateDetails = () => {
  const [currentTab, setCurrentTab] = useState("general");
  const [viewDetail, setViewDetail] = useState(true);
  const [formData, setFormData] = useState({});
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const customerFK = useSelector((state) => state.dealerFlatRateConnectionSReducer.customerFK);
  const customerGroupFK = useSelector((state) => state.dealerFlatRateConnectionSReducer.customerGroupFK);
  const customerPlantFK = useSelector((state) => state.dealerFlatRateConnectionSReducer.customerPlantFK);
  const customerPlantGroupFK = useSelector(
    (state) => state.dealerFlatRateConnectionSReducer.customerPlantGroupFK
  );
  const customerUnitTypeGroupId = useSelector(
    (state) => state.dealerFlatRateConnectionSReducer.customerUnitTypeGroupId
  );

  const navigate = useNavigate();
  const location = useLocation();
  const { id, dealerId } = useParams();

  const customerId = useSelector((state) => state.dealerFlatRateConnectionSReducer.customerId);
  const customerPlantGroupId = useSelector(
    (state) => state.dealerFlatRateConnectionSReducer.customerPlantGroupId
  );
  const customerPlantId = useSelector((state) => state.dealerFlatRateConnectionSReducer.customerPlantId);
  const customerGroupId = useSelector((state) => state.dealerFlatRateConnectionSReducer.customerGroupId);

  const isRatesTabValid = useSelector((state) => state.dealerFlatRateConnectionSReducer.isRatesTabValid);

  const customerUnitTypeGroupInput = useSelector(
    (state) => state.dealerFlatRateConnectionSReducer.customerUnitTypeGroupInput
  );
  const isGeneralTabValid = viewDetail || !customerUnitTypeGroupInput || !!customerUnitTypeGroupId;
  const dealerConnectionFlatratePK = parseInt(dealerId);

  useEffect(() => {
    if (location.pathname.includes("dealer-connection-flatrate-getbyid-new")) {
      setViewDetail(false);
      setIsNewRecord(true);
    } else {
      setViewDetail(true);
      setIsNewRecord(false);
    }
  }, [location.pathname]);

  const handleEdit = () => setViewDetail(false);

  const handleCancel = () => {
    if (!viewDetail || isNewRecord) {
      setCancelShow(true);
    } else {
      navigate(`/dealer-connection-flatrate-browse/${id}`);
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => setCancelShow(false);

  const handleCancelYes = () => {
    setCancelShow(false);
    setViewDetail(true);
    toast.success("Changes Cancelled");
    navigate(`/dealer-connection-flatrate-browse/${id}`);
  };

  const handleSave = () => {
    setLoading(true);

    const isEdit = !isNewRecord && dealerId;
    const getValue = (val) => {
      if (val === "" || val === null || val === undefined) return null;
      return val;
    };
    const payload = {
      flag: isEdit ? "Edit" : "Save",
      dealerConnectionFK: id || null,
      dealerConnectionFlatratePK: isEdit ? Number(dealerId) : null,
      customerFK: customerFK || null,
      customerGroupFK: customerGroupFK || null,
      customerPlantFK: customerPlantFK || null,
      customerPlantGroupFK: customerPlantGroupFK || null,
      unitTypeGroup: customerUnitTypeGroupId || null,

      // Fix the field mapping - use the actual formData field names
      invoiceFlatrateMotorized: getValue(formData.invoiceFlatrateMotorized),
      invoiceFlatrateTowable: getValue(formData.invoiceFlatrateTowable),
      invoiceFlatrateTowableCDLA: getValue(formData.invoiceFlatrateTowableCDLA),
      invoiceFlatrateTowable2Units: getValue(formData.invoiceFlatrateHaulTow),
      invoiceFlatrateTowableLowboy: getValue(formData.invoiceFlatRateFlatbed),

      driverFlatrateMotorized: getValue(formData.driverFlatrateMotorized),
      driverFlatrateTowable: getValue(formData.driverFlatrateTowable),
      driverFlatrateTowableCDLA: getValue(formData.driverFlatrateTowableCDLA),
      driverFlatrateTowable2Units: getValue(formData.driverFlatarteHaulTow),
      driverFlatrateTowableLowboy: getValue(formData.driverFlatRateFlatbed),

      driverMaxTollsAmount: getValue(formData.driverMaxTollsAmount),
      maximumPermits: getValue(formData.maximumPermits),
      commission: getValue(formData.commission),
      description: formData.description || "",
      maximumWash: getValue(formData.maximumWash),
    };

    DealerConnectionFlatRateService.saveOrUpdateOrDeleteFlatRate(payload)
      .then(() => {
        setViewDetail(true);
        navigate(`/dealer-connection-flatrate-browse/${id}`);
        toast.success(isEdit ? "Dealer Connection Flatrate Updated" : "Dealer Connection Flatrate Saved");
      })
      .catch((err) => {
        console.error("Error saving:", err);
        toast.error("Error saving record");
      })
      .finally(() => setLoading(false));
  };

  const handleDeleteYes = () => {
    const payload = {
      flag: "Delete",
      dealerConnectionFK: id,
      dealerConnectionFlatratePK: dealerId,
      ...formData,
    };

    setDeleteShow(false);
    setLoading(true);

    DealerConnectionFlatRateService.saveOrUpdateOrDeleteFlatRate(payload)
      .then(() => {
        toast.success("Dealer Connection Flatrate Deleted");
        setViewDetail(true);
        navigate(`/dealer-connection-flatrate-browse/${id}`);
      })
      .catch((err) => {
        console.error("Error deleting:", err);
        toast.error("Something went wrong");
        navigate(`/dealer-connection-flatrate/${id}/${dealerId}`);
      })
      .finally(() => setLoading(false));
  };

  const handleDeleteNo = () => {
    setDeleteShow(false);
  };

  const buttons = [
    {
      label: "Edit",
      onClick: handleEdit,
      disabled: false,
      hidden: !viewDetail || isNewRecord,
    },
    {
      label: "Delete",
      onClick: () => setDeleteShow(true),
      disabled: false,
      hidden: !viewDetail || isNewRecord,
    },
    {
      label: "Save",
      onClick: handleSave,
      disabled: !isRatesTabValid || !isGeneralTabValid,
      hidden: viewDetail,
    },
    {
      label: "Cancel",
      onClick: handleCancel,
      disabled: false,
    },
  ];

  return (
    <QuarterScreenWrapper>
      <Header
        closeNavigationURL={`/add-dealer-connections/${id}/0`}
        programName="Dealer Connection Flatrate"
        confirmClose={!viewDetail}
      />
      <div className="p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <Tabs
            defaultActiveKey="general"
            className="m-b-0"
            onSelect={(key) => setCurrentTab(key)}
            activeKey={currentTab}
          >
            <Tab
              eventKey={"general"}
              title={"General"}
              tabClassName={!viewDetail ? (isGeneralTabValid ? "color-white" : "color-red") : ""}
            >
              <General
                dealerConnectionFlatratePK={dealerConnectionFlatratePK}
                formData={formData}
                setFormData={setFormData}
                viewDetail={viewDetail}
              />
            </Tab>

            <Tab
              title={"Rates"}
              eventKey="rates"
              tabClassName={!viewDetail ? (isRatesTabValid ? "color-green" : "color-red") : ""}
            >
              <Rates
                dealerConnectionFlatratePK={dealerConnectionFlatratePK}
                formData={formData}
                setFormData={setFormData}
                viewDetail={viewDetail}
              />
            </Tab>
          </Tabs>
        </div>
        {loading && <LoadingIcon />}
      </div>
      <CommonFooter buttons={buttons} />

      {cancelShow && (
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Dealer Connection Flatrate Changes"}
          body={"Please confirm you want to cancel changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      )}

      <ModalComponent
        show={deleteShow}
        onHide={() => setDeleteShow(false)}
        title={"Delete Dealer Connection Flatrate"}
        body={"Please confirm you want to delete this dealer connection flatrate."}
        handleYES={handleDeleteYes}
        handleNO={handleDeleteNo}
      />
    </QuarterScreenWrapper>
  );
};

export default FlatrateDetails;
