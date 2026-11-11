import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../common/ModalComponent";

import CustomerOrderColumnsService from "../../../../services/CustomerOrderColumnsService";
import {
  resetCustomerOrdersColumn,
  setCustomerOrdersColumnList,
} from "../../../../redux/CustomerOrdersSlice";
import LoadingIcon from "../../../common/LoadingIcon";

const CustomerOrderColumnsFooter = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { pageNumber } = useParams();
  const customerOrderFK = params.id;
  const [columnsSaveLoading, setColumnsSaveLoading] = useState(false);

  const customerOrdersColumnList = useSelector(
    (state) => state.customerOrdersReducer.customerOrdersColumnList
  );
  const columnFooterDisableSave = useSelector((state) => state.customerOrdersReducer.columnFooterDisableSave);

  /* Save the items to Customer Order table
   */
  const saveRecord = () => {
    setColumnsSaveLoading(true);
    CustomerOrderColumnsService.saveColumnFields(customerOrderFK, customerOrdersColumnList)
      .then(() => {
        navigate(`/customer-orders/${customerOrderFK}/${pageNumber}`);
        toast.success("Customer Order Columns Created");
        dispatch(resetCustomerOrdersColumn());
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setColumnsSaveLoading(false);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap">
      {columnsSaveLoading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""

          onClick={() => saveRecord()}
          disabled={columnFooterDisableSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CustomerOrderColumnsFooter;
