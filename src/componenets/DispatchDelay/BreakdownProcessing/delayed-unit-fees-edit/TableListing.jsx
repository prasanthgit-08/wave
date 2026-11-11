/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setBrowseData,
  setDescription,
  setDriverAmount,
  setInvoiceAmount,
  setInvoiced,
  setPay,
  setRadioValue,
  setReimbursement,
  setDealayUnitFeeId,
  setEditMode,
  setSelectedIndex,
  resetChanges,
  setEditFlag,
  setAllDriversPayTaxable,
  setFeeData,
  setCheckDescriptionExist,
} from "../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownFeesSlice";
import BreakdownFeesService from "../../../../services/DispatchDelay/BreakdownProcessing/BreakdownFeesService";
import LoadingIcon from "../../../common/LoadingIcon";
import NoRecordsMessage from "../../../common/NoRecordsMessage";

const TableListing = () => {
  const params = useParams();
  const breakdownFK = params.breakdownFK;
  const breakdownCompanyName = localStorage.getItem("breakdownCompanyName");
  const dispatch = useDispatch();
  const [load, setload] = useState(false);
  const {
    browseData,
    pageNumber,
    normalSortFlag,
    normalSortValue,
    selectedIndex,
    reimbursement,
    pay,
    radioValue,
  } = useSelector((state) => state.breakdownFeesReducer);

  //browse list
  const fetchBrowseData = () => {
    setload(true);
    BreakdownFeesService.fetchBrowseData(
      pageNumber,
      normalSortValue,
      normalSortFlag,
      breakdownFK,
      breakdownCompanyName,
      0
    )
      .then((response) => {
        const { data } = response;
        dispatch(setFeeData(data?.breakdownFeeDetails));
        const listingData = data?.breakdownFeeDetails?.map((item) => ({
          ...item,
          changed: 0,
        }));

        dispatch(setBrowseData(listingData));
        dispatch(setAllDriversPayTaxable(data?.alldriverspaytaxable[0].AllDriversPayTaxable));

        setload(false);
      })
      .catch(() => {
        setload(false);
      });
  };
  useEffect(() => {
    fetchBrowseData();
  }, []);

  //setting values when selecting a record from the detail list
  useEffect(() => {
    if (browseData && selectedIndex != null) {
      dispatch(setDescription(browseData[selectedIndex]?.description));
      dispatch(setInvoiced(browseData[selectedIndex]?.invoiced));
      dispatch(setDriverAmount(browseData[selectedIndex]?.driverAmount));
      dispatch(setReimbursement(browseData[selectedIndex]?.reimbursment));
      dispatch(setPay(browseData[selectedIndex]?.paid));
      dispatch(setInvoiceAmount(browseData[selectedIndex]?.invoiceAmount));
      if (browseData[selectedIndex]?.reimbursment) {
        dispatch(setRadioValue("Reimburse"));
      } else if (pay) {
        dispatch(setRadioValue("Pay"));
      }
    } else {
      // Reset fields for a new record
      dispatch(resetChanges());
    }
  }, [selectedIndex]);

  //On click of a fee record
  const handleClick = (data, index) => {
    dispatch(setCheckDescriptionExist(false));
    dispatch(setEditFlag(false));
    dispatch(setSelectedIndex(index));
    dispatch(setDealayUnitFeeId(data?.delayedUnitFeePK ?? null));
    const selectedItem = data;

    dispatch(setDescription(selectedItem?.description));
    dispatch(setInvoiced(selectedItem?.invoiced));
    dispatch(setDriverAmount(selectedItem?.driverAmount));
    dispatch(setReimbursement(selectedItem?.reimbursment));
    dispatch(setPay(selectedItem?.paid));
    dispatch(setInvoiceAmount(selectedItem?.invoiceAmount));

    dispatch(setEditMode(false));
    if (selectedItem?.reimbursment) {
      dispatch(setRadioValue("Reimburse"));
    } else {
      dispatch(setRadioValue("Pay"));
    }
  };

  return (
    <div
      className="fixTableHead border border-black"
      style={{ overflowY: "auto", height: "212px", borderColor: "black" }}
    >
      {load && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th className="f-w-600">Description</th>

            <th className="f-w-600">Invoice</th>
            <th className="f-w-600">Invoiced</th>
            <th className="f-w-600">Driver</th>
            <th className="f-w-600">Reimburse</th>
            <th className="f-w-600">Paid</th>
          </tr>
        </thead>

        <tbody>
          {load
            ? null
            : browseData?.length >= 1 &&
              browseData?.map((data, index) => (
                <tr
                  key={index}
                  onClick={() => handleClick(data, index)}
                  className={selectedIndex === index ? "tableSelected" : ""}
                >
                  <td className="f-w-600"> {data?.description} </td>
                  <td className="f-w-600"> {data?.invoiceAmount} </td>
                  <td className="f-w-600"> {data?.invoiced ? "Yes" : "No"} </td>
                  <td className="f-w-600"> {data?.driverAmount} </td>
                  <td className="f-w-600"> {data?.reimbursment ? "Yes" : "No"} </td>
                  <td className="f-w-600"> {data?.paid ? "Yes" : "No"} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {load ? "" : browseData?.length === 0 && <NoRecordsMessage />}
    </div>
  );
};
export default TableListing;
