import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import PrintCheckService from "../../../../services/PrintCheckService";
import { resetChanges, setPrintCheckFlag, setReverseFlag } from "../../../../redux/PrintCheckSlice";
import ModalComponent from "../../../common/ModalComponent";
import { useAppNavigate } from "../../../../hooks/useAppNavigate";
const CheckStubFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { goBack } = useAppNavigate();
  const [disableSave, setDisableSave] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const source = useSelector((state) => state.printCheckReducer.source);
  const who = useSelector((state) => state.printCheckReducer.who);
  const reason = useSelector((state) => state.printCheckReducer.reason);
  const checkAmount = useSelector((state) => state.printCheckReducer.checkAmount);
  const driverId = useSelector((state) => state.printCheckReducer.driverId);
  const address1 = useSelector((state) => state.printCheckReducer.address1);
  const address2 = useSelector((state) => state.printCheckReducer.address2);
  const postalCodeNew = useSelector((state) => state.printCheckReducer.postalCodeNew);
  const stateCodeNew = useSelector((state) => state.printCheckReducer.stateCodeNew);
  const cityNew = useSelector((state) => state.printCheckReducer.cityNew);
  const postalCodePKNew = useSelector((state) => state.printCheckReducer.postalCodePKNew);
  const name = useSelector((state) => state.printCheckReducer.name);
  const transportCompanyId = useSelector((state) => state.printCheckReducer.transportCompanyId);
  const textArray = useSelector((state) => state.printCheckReducer.textArray);
  const checkPayId = useSelector((state) => state.printCheckReducer.checkPayId);
  const checkPayFlag = useSelector((state) => state.printCheckReducer.checkPayFlag);
  const canadianNew = useSelector((state) => state.printCheckReducer.canadianNew);
  const printCheckFlag = useSelector((state) => state.printCheckReducer.printCheckFlag);
  /**Save */
  const save = () => {
    setSaving(true);
    PrintCheckService.save(
      source,
      who,
      reason,
      checkAmount,
      checkPayId,
      address1,
      address2,
      name,
      cityNew,
      canadianNew,
      stateCodeNew,
      postalCodeNew,
      transportCompanyId,
      driverId,
      textArray
    )
      .then(() => {
        setSaving(false);
        dispatch(resetChanges());

        toast.success("Print Check Saved");
        navigate(`/print-check-options-screen`);
      })
      .catch(() => {
        dispatch(resetChanges());
        dispatch(setReverseFlag(false));
        setSaving(false);
        navigate(`/print-check-options-screen`);
        toast.success("Something  went wrong");
      });
  };
  useEffect(() => {
    if (
      checkAmount &&
      checkAmount > 0 &&
      reason &&
      ((who === "Driver" && driverId) ||
        (who == "Miscellaneous" &&
          name &&
          address1 &&
          postalCodePKNew &&
          ((!checkPayFlag && !checkPayId) || (checkPayFlag && checkPayId))) ||
        (who === "Transport Company" && transportCompanyId))
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    who,
    driverId,
    checkAmount,
    reason,
    transportCompanyId,
    checkPayFlag,
    checkPayId,
    address1,
    name,
    postalCodePKNew,
  ]);
  const handleCancelShow = () => {
    setCancelShow(true);
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    navigate(`/print-check-options-screen`);
    dispatch(resetChanges());
    dispatch(setReverseFlag(false));
    dispatch(setPrintCheckFlag(false));
    toast.success("Changes Cancelled");
    setCancelShow(false);
  };
  useEffect(() => {
    if (!printCheckFlag) {
      navigate(`/print-check-options-screen`);
    }
  }, [printCheckFlag]);
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          disabled={disableSave}
          onClick={save}
        >
          Save
        </button>
        <button
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={() => {
            goBack();
            dispatch(setReverseFlag(true));
          }}
        >
          Back
        </button>
        <button
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={handleCancelShow}
        >
          Cancel
        </button>
        {saving && (
          <div className="fade modal-backdrop show">
            {" "}
            <div className="pos-center">
              {" "}
              <div className="loader"></div>
            </div>
          </div>
        )}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Print Check Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
    </div>
  );
};

export default CheckStubFooter;
