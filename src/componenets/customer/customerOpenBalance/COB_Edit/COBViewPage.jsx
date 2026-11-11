import React, { useEffect, useState } from "react";
import {
  setCustomerOpenBalanceData,
  setViewDetail,
  resetChanges,
} from "../../../../redux/customerOpenBalanceSlice";
import CustomerOpenBalanceService from "../../../../services/CustomerOpenBalanceService";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import COBHeader from "./COBHeader";
import COBFooter from "./COBFooter";
import COBForm from "./COBForm";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import LoadingIcon from "../../../common/LoadingIcon";

const COBViewPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const customerOpenBalancePK = params.id;
  const dispatch = useDispatch();
  const customerFK = params.customerId;
  const customerPageNumber = params.customerPageNumber;
  const [loading, setLoading] = useState(false);

  const getCustomerOpenBalanceById = (customerOpenBalancePK) => {
    setLoading(true);
    CustomerOpenBalanceService.getCustomerOpenBalanceById(customerOpenBalancePK)
      .then((response) => {
        const data = response.data;
        dispatch(setCustomerOpenBalanceData(data));
        dispatch(setViewDetail(true));
      })
      .catch((error) => {
        navigate("/customer-open-balance/" + customerFK + "/" + customerPageNumber);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (customerOpenBalancePK) getCustomerOpenBalanceById(customerOpenBalancePK);
  }, [customerOpenBalancePK]);

  if (customerOpenBalancePK) {
    dispatch(setViewDetail(true));
  } else {
    dispatch(setViewDetail(false));
    dispatch(resetChanges());
  }

  return (
    <div className={`add-form-component p-0 ${QuarterScreen.container}`}>
      {loading && <LoadingIcon />}
      <div className={`border border-dark border-2 ${QuarterScreen.width}`} style={{ margin: "1px" }}>
        <COBHeader />
        <COBForm />
        <COBFooter />
      </div>
    </div>
  );
};

export default COBViewPage;
