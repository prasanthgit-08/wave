import React, { useState } from "react";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import DealerEmailFooter from "./DealerEmailFooter";
import DealerEmailFormContent from "./DealerEmailFormContent";
import DealerEmailHeader from "./DealerEmailHeader";
import CommonModal from "../../../../components/common/commonModal";
import { lockScreens } from "../../../../constants/processLockConfig";
import { addOrEditDealerMaintenanceLocks } from "../../../../service/processLockHandlers";
import Loading from "../../../../components/common/loading";
const DealerEmailForm = () => {
  const [loading, setLoading] = useState(false);
  const [lockError, setLockError] = useState("");

  const editDealerMaintenanceLocks = async (lockType = "EditLock", eventName = "Edit") => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <div className={`add-form-component p-0 customContainer`}>
      {loading && <Loading />}
      <div className={`border border-dark border-2 quarterScreenWidth`} style={{ margin: "1px" }}>
        <DealerEmailHeader />
        <DealerEmailFormContent />
        <DealerEmailFooter editDealerMaintenanceLocks={editDealerMaintenanceLocks} />

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
      </div>
    </div>
  );
};

export default DealerEmailForm;
