import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SettlementService from "../../../../../../../services/SettlementService";
import { setRadioValue, setTotalFund } from "../../../../../../../redux/SettlementsSlice";

function FormFooter() {
  const params = useParams();
  const driverId = params.driverId;

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const totalFund = useSelector((state) => state.settlementsReducer.totalFund);
  const taxableAmount = useSelector((state) => state.settlementsReducer.taxableAmount);
  const reimbursmentAmount = useSelector((state) => state.settlementsReducer.reimbursmentAmount);
  const radioValue = useSelector((state) => state.settlementsReducer.radioValue);
  const settlementData = useSelector((state) => state.settlementsReducer.settlementData);
  const formData = {
    driverId: driverId,
    totalFund: totalFund,
    taxableAmount: taxableAmount,
    reimbursmentAmount: reimbursmentAmount,
    radioValue: radioValue === "Debit Card" ? "debit" : "check",
  };
  const saveRecord = () => {
    setLoading(true);
    SettlementService.createOrUpdateRecord(formData)

      .then((res) => {
        if (id) {
          toast.success("Settlement Updated");
        } else {
          toast.success("Settlement Created");
        }
        dispatch(setTotalFund(null));
        dispatch(setRadioValue("Debit Card"));

        navigate(`/driver-service-selection/${driverId}/form`);
      })
      .catch((err) => {
        navigate(`/driver-service-selection/${driverId}/form`);
        toast.error("Something went wrong");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5`}
          type=""
          hidden={""}
          disabled={totalFund <= 0 || settlementData.length === 0}
          onClick={saveRecord}
        >
          Save
        </button>
        {loading && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FormFooter;
