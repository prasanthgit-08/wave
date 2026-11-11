import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import OrderEntryService from "../../../../../services/OrderEntryService";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsOpenBalanceValid,
  setUnitOpenBalanceData,
  setOpenBalanceArray,
  resetChangesOpenBalance,
  setUpdatOpenBalanceArray,
  setRemainingAmt,
  setDupLoadForOpenBal,
  setIsSaving,
  setIsOpenBalancesDetailsInComplete,
  setisOpenBalancesDetailsPartial,
  setEnableAppliedAmount,
  setChangeColor,
  setAppliedAmount,
  setInvoiceAmountForOpenBalances,
} from "../../../../../redux/OrderEntryFilterSlice";
import useDebouncer from "../../../../../hooks/useDebouncer";
import LoadingText from "../../../../common/LoadingText";

function OpenBalances({ styles }) {
  const [remainingAmtLocal, setRemainingAmtLocal] = useState(0);
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState("");
  const changeColor = useSelector((state) => state.orderEntryReducer.changeColor);
  const invoiceAmount = useSelector((state) => state.orderEntryReducer.invoiceAmountForOpenBalances);
  const appliedAmount = useSelector((state) => state.orderEntryReducer.appliedAmount);
  const isOpenBalancesDetailsInComplete = useSelector(
    (state) => state.orderEntryReducer.isOpenBalancesDetailsInComplete
  );
  const [totalApplied, setTotalApplied] = useState(0);

  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isToggled, setIsToggled] = useState(false);
  const enableAppliedAmount = useSelector((state) => state.orderEntryReducer.enableAppliedAmount);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [noRecords, setNoRecords] = useState(false);
  const [balanceAmountOfSelectedRecord, setBalanceAmountOfSelectedRecord] = useState(0);
  const openBalanceObjArr = useSelector((state) => state.orderEntryReducer.openBalanceArray);
  const [remainingAmountOnSelectingRecord, setRemainingAmountOnSelectingRecord] = useState(0);
  let editedPartialOrInCompleteOpenBalanceOnce = false;
  const [editedPartialOrInCompleteOpenBalanceOnceLocal, setEditedPartialOrInCompleteOpenBalanceOnceLocal] =
    useState(false);
  const selectedCustomerId = useSelector((state) => state.orderEntryReducer.selectedCustomerId);
  const useOpenBalance = useSelector((state) => state.orderEntryReducer.useOpenBalance);
  const remainingAmtRedux = useSelector((state) => state.orderEntryReducer.remainingAmt);
  const dupLoadForOpenBal = useSelector((state) => state.orderEntryReducer.dupLoadForOpenBal);
  const dataResetFlag = useSelector((state) => state.orderEntryReducer.dataReset);
  const isSaving = useSelector((state) => state.orderEntryReducer.isSaving);
  //invoice from unit tab
  const invoiceAmountFromUnit = useSelector((state) => state.orderEntryReducer.invoiceAmount);
  const batchLoadCustomerTab = useSelector((state) => state.orderEntryReducer.batchLoadCustomerTab);
  const totalBatchLoadCount = useSelector((state) => state.orderEntryReducer.totalBatchLoadCount);
  const zero = 0;
  const editPartialOrInCompleteOpenBalance = useSelector(
    (state) => state.orderEntryReducer.editPartialOrInCompleteOpenBalance
  );

  const fetchOpenBalances = useDebouncer(() => fetchOpenBalanceById(), 2000);

  //for setting invoice amount and also passing it to backend for calculation purposes
  useEffect(() => {
    if (useOpenBalance) {
      if (
        invoiceAmountFromUnit !== null &&
        invoiceAmountFromUnit !== undefined &&
        invoiceAmountFromUnit !== "" &&
        invoiceAmountFromUnit !== NaN
      ) {
        batchLoadCustomerTab
          ? dispatch(
              setInvoiceAmountForOpenBalances(Number(invoiceAmountFromUnit * totalBatchLoadCount).toFixed(2))
            )
          : dispatch(setInvoiceAmountForOpenBalances(Number(invoiceAmountFromUnit).toFixed(2)));
      } else {
        dispatch(setInvoiceAmountForOpenBalances(zero.toFixed(2)));
      }
      if (openBalanceObjArr !== null && openBalanceObjArr.length > 0) {
        var openBalnceDuplicate = [...openBalanceObjArr];
        openBalanceObjArr.forEach(function (obj, index) {
          let currentObj = {
            ...obj,
            invoice: batchLoadCustomerTab
              ? Number(invoiceAmountFromUnit * totalBatchLoadCount)
              : Number(invoiceAmountFromUnit),
            chargePerUnit: invoiceAmountFromUnit ? Number(invoiceAmountFromUnit) : 0,
          };
          openBalnceDuplicate[index] = currentObj;
        });
        dispatch(setUpdatOpenBalanceArray(openBalnceDuplicate));
      }
    }
  }, [useOpenBalance, invoiceAmountFromUnit, batchLoadCustomerTab, remainingAmtRedux]);

  useEffect(() => {
    if (selectedCustomerId !== null && useOpenBalance) {
      setLoading(true);
      const debounceFunction = setTimeout(() => {
        fetchOpenBalances();
      }, 100);

      dispatch(resetChangesOpenBalance());
      dispatch(setEnableAppliedAmount(false));
      dispatch(setAppliedAmount(zero.toFixed(2)));
      setSelectedIndex(0);
      setSelectedId("");
      setRemainingAmtLocal(remainingAmtRedux);
      return () => {
        clearTimeout(debounceFunction);
      };
    }
  }, [useOpenBalance, batchLoadCustomerTab, invoiceAmountFromUnit]);

  //For handling duplicate loads
  useEffect(() => {
    if (dupLoadForOpenBal) {
      if (selectedCustomerId !== null && useOpenBalance) {
        fetchOpenBalanceById();
      }
      dispatch(setDupLoadForOpenBal(false));
      dispatch(resetChangesOpenBalance());
      dispatch(setAppliedAmount(zero.toFixed(2)));
      dispatch(setEnableAppliedAmount(false));
      setSelectedIndex(0);
      setSelectedId("");
    }
    // eslint-disable-next-line
  }, [dupLoadForOpenBal, dataResetFlag, batchLoadCustomerTab, invoiceAmountFromUnit]);

  useEffect(() => {
    if (
      invoiceAmountFromUnit === undefined ||
      invoiceAmountFromUnit === "" ||
      Number(invoiceAmountFromUnit) === 0
    ) {
      dispatch(setIsOpenBalanceValid(false));
    } else if (Number(invoiceAmount) === Number(appliedAmount) || remainingAmtRedux === 0) {
      if (batchLoadCustomerTab && totalBatchLoadCount === 0) {
        dispatch(setIsOpenBalanceValid(false));
      } else {
        dispatch(setIsOpenBalanceValid(true));
        dispatch(setIsOpenBalancesDetailsInComplete(false));
        dispatch(setisOpenBalancesDetailsPartial(false));
      }
    } else if (appliedAmount >= 0) {
      dispatch(setIsOpenBalanceValid(false));
      if (Number(appliedAmount) === 0) {
        dispatch(setisOpenBalancesDetailsPartial(false));
        dispatch(setIsOpenBalancesDetailsInComplete(true));
      } else if (Number(appliedAmount) < Number(invoiceAmount) && remainingAmtRedux > 0) {
        dispatch(setIsOpenBalancesDetailsInComplete(false));
        dispatch(setisOpenBalancesDetailsPartial(true));
      } else if (Number(invoiceAmount) === Number(appliedAmount) || remainingAmtRedux === 0) {
        dispatch(setIsOpenBalancesDetailsInComplete(false));
        dispatch(setisOpenBalancesDetailsPartial(false));
      } else {
        dispatch(setIsOpenBalancesDetailsInComplete(false));
      }
    } else {
      dispatch(setIsOpenBalanceValid(false));
    }
  }, [remainingAmtRedux]);

  /**applied amount updation**/
  useEffect(() => {
    if (useOpenBalance) {
      handleAppliedAmt();
    }
    // eslint-disable-next-line
  }, [appliedAmount, selectedId]);

  /**remaining amount calculation and updation**/
  useEffect(() => {
    if (useOpenBalance) {
      handleRemainingAmt();
    }
    // eslint-disable-next-line
  }, [openBalanceObjArr, invoiceAmountFromUnit, totalBatchLoadCount]);

  useEffect(() => {
    if (isSaving) {
      setSelectedIndex(0);
      setSelectedId("");
      dispatch(setEnableAppliedAmount(false));
      dispatch(setChangeColor(false));
      setIsSaving(false);
      dispatch(setEnableAppliedAmount(false));
    }
  }, [isSaving]);

  //api call for fetching the open balance account for a selected customer
  const fetchOpenBalanceById = () => {
    setLoading(true);
    dispatch(setOpenBalanceArray(null));
    if (selectedCustomerId !== null) {
      OrderEntryService.getOpenBalances(selectedCustomerId)
        .then((resp) => {
          const data = resp.data;
          setLoading(false);
          data.length > 0 ? setNoRecords(true) : setNoRecords(false);
          data.map((cob) =>
            dispatch(
              setOpenBalanceArray({
                openBalancePK: cob.customerOpenBalancePK,
                amount: cob.amount,
                balance: cob.balance,
                balanceDuplicate: cob.balance,
                description: cob.description,
                applied: 0,
                isApplied: false,
                invoice: 0,
                chargePerUnit: 0,
              })
            )
          );
        })
        .catch((err) => {
          setLoading(false);
        })
        .finally(() => setLoading(false));
    }
  };

  // Function for applied amount text field validation
  const appliedAmountFormatHandler = (e) => {
    const appliedAmountValidate = minMaxCalculation(
      e.target.value,
      0,
      balanceAmountOfSelectedRecord,
      remainingAmountOnSelectingRecord
    );
    dispatch(setAppliedAmount(appliedAmountValidate));
  };

  //function to calculate the applied amount sum for calculating remaining amount
  function getSum() {
    let sum = 0;
    openBalanceObjArr.forEach(function (item, index) {
      let appliedAmt = Number(item.applied);
      //If Applied Amount is empty, explicitly set amt as 0;
      if (isNaN(item.applied)) {
        appliedAmt = 0;
      }
      if (isNaN(sum)) {
        sum = 0;
      }
      sum = Number(sum) + Number(appliedAmt);
    });
    return sum.toFixed(2);
  }

  //function to calculate the applied amount sum for calculating remaining amount
  // other than the applied amount of currently selected customer open balance
  function getSumForAccountsOtherThanSelected(openBalanceObjArr) {
    let sum = 0;
    openBalanceObjArr.forEach(function (item, index) {
      let appliedAmt = Number(item.applied);
      //If Applied Amount is empty, explicitly set amt as 0;
      if (isNaN(item.applied)) {
        appliedAmt = 0;
      }
      if (isNaN(sum)) {
        sum = 0;
      }
      sum = Number(sum) + Number(appliedAmt);
    });
    return sum.toFixed(2);
  }

  // Function for calculating remaining amount
  const handleRemainingAmt = () => {
    let appliedSum = getSum();
    setTotalApplied(appliedSum);
    let remainingAmt = 0;
    if (batchLoadCustomerTab) {
      if (
        (typeof invoiceAmountFromUnit === "number" || typeof invoiceAmountFromUnit === "string") &&
        !isNaN(invoiceAmountFromUnit)
      ) {
        remainingAmt = Number((invoiceAmountFromUnit * totalBatchLoadCount).toFixed(2)) - Number(appliedSum);
      } else {
        remainingAmt = 0;
      }
    } else {
      if (
        (typeof invoiceAmountFromUnit === "number" || typeof invoiceAmountFromUnit === "string") &&
        !isNaN(invoiceAmountFromUnit)
      ) {
        remainingAmt = Number(invoiceAmountFromUnit).toFixed(2) - Number(appliedSum);
      } else {
        remainingAmt = 0;
      }
    }
    if (isNaN(remainingAmt)) {
      remainingAmt = 0;
    } else {
      dispatch(setRemainingAmt(remainingAmt));
    }
  };

  //Function for setting value to 0 if applied amount is ""
  const handleAppliedAmtBlur = () => {
    if (appliedAmount === null || appliedAmount === undefined || appliedAmount === "") {
      dispatch(setAppliedAmount(parseFloat(zero.toFixed(2))));
    } else {
      dispatch(setAppliedAmount(parseFloat(appliedAmount)));
    }
  };

  //Function for calculating balance and applied amount in the listing table
  const handleAppliedAmt = () => {
    let openArrayDuplicate = [...openBalanceObjArr];
    let index = selectedIndex;
    let selectedObj = openBalanceObjArr.find((item) => item.openBalancePK === selectedId);
    if (selectedObj !== undefined && selectedObj !== null) {
      let balanceAmt = 0;
      let appliedAmt = 0;

      if (/^[.]+$/.test(appliedAmount)) {
        balanceAmt = 0;
      } else {
        if (selectedObj.balanceDuplicate !== 0 && appliedAmount <= selectedObj.balanceDuplicate) {
          balanceAmt = selectedObj.balance - appliedAmount;
          appliedAmt = Number(appliedAmount);
        } else {
          balanceAmt = selectedObj.balance - appliedAmount;
          appliedAmt = Number(appliedAmount);
        }
      }

      selectedObj = {
        ...selectedObj,
        balanceDuplicate: balanceAmt > selectedObj.balance ? selectedObj.balance : balanceAmt,
        applied: appliedAmt,
      };

      if (!selectedObj.isApplied) {
        selectedObj.isApplied = true;
      }
      openArrayDuplicate[index] = selectedObj;
      dispatch(setUpdatOpenBalanceArray(openArrayDuplicate));
      dispatch(setUnitOpenBalanceData(selectedObj));
    }
  };

  //for calculating the maximum amount to the debited from the selected customer's open balance account
  function minMaxCalculation(value, min, balanceAmt, remainingAmtRedux) {
    if (!value) return value;

    const number = value.replace(/[^\d.]/g, "");
    const parts = number.split("."); // split the number by the period

    // check if there are more than 2 parts or if the first part has more than 7 digits
    if (parts.length > 2 || parts[0].length > 8) {
      return number.slice(0, -1); // remove the last entered character
    }
    // check if there is a second part and if it has more than 2 digits
    if (parts.length === 2 && parts[1].length > 2) {
      return number.slice(0, -1); // remove the last entered character
    }
    var max = 0;
    if (balanceAmt < remainingAmtRedux) {
      max = balanceAmt;
    } else {
      max = remainingAmtRedux;
    }

    if (Number(number) > Number(max)) {
      const maxConst = max.toString();
      const maxParts = maxConst.split(".");

      if (parts[0].length > 0) {
        if (Number(parts[0]) >= max) {
          if (Number(parts[0]) > max || (Number(parts[0]) == max && parts[1] && parts[1].length > 0)) {
            parts[0] = parts[0].slice(0, -1);
          }
        } else if (parts[0] === maxParts[0]) {
          parts[0] = parts[0].slice(0, -1);
        } else if (parts[1] && parts[1].length > 0) {
          parts[1] = parts[1].slice(0, -1);
        }
      } else {
        if (parts[1]) {
          parts[1] = parts[1].slice(0, -1);
        }
      }
      return parts.join(".");
    } else if (number < min) return min;
    else return number;
  }

  return (
    <div className={`p-2 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight}`}>
      <div className="mt-4">
        <Row className={styles.creditCardTable}>
          <Col md={5} xs={5} className={" ps-0 p-l-10"}>
            <div
              className={`border border-secondary ${styles.plantNameTable}`}
              style={{
                padding: "0",
                height: "300px",
                overflowY: "scroll",
              }}
            >
              <table className="table border-bottom  table-striped f-w-600">
                <thead>
                  <tr disabled>
                    <th className="col-6">Description</th>

                    <th className="col-2">Amount</th>

                    <th className="col-2">Balance</th>

                    <th className="col-1">Applied</th>
                  </tr>
                </thead>
                {!loading && openBalanceObjArr.length !== 0 && (
                  <tbody>
                    {openBalanceObjArr.map((cob, index) => (
                      <tr
                        id="rowId"
                        onClick={() => {
                          setSelectedIndex(index);
                          setSelectedId(cob.openBalancePK);
                          dispatch(setChangeColor(true));
                          setBalanceAmount(cob.balance);
                          setBalanceAmountOfSelectedRecord(cob.balance);

                          editedPartialOrInCompleteOpenBalanceOnce =
                            editedPartialOrInCompleteOpenBalanceOnceLocal;

                          let openBalanceObjArrList = openBalanceObjArr.filter(
                            (item) => item.openBalancePK !== cob.openBalancePK
                          );

                          let totalAppliedAmount = getSumForAccountsOtherThanSelected(openBalanceObjArrList);

                          let calculatedRemainingAmount = invoiceAmount - totalAppliedAmount;

                          setRemainingAmountOnSelectingRecord(calculatedRemainingAmount);
                          setEditedPartialOrInCompleteOpenBalanceOnceLocal(true);
                          dispatch(setEnableAppliedAmount(true));
                          setIsToggled(true);

                          // if (!cob.isApplied) {
                          if (remainingAmtRedux.toFixed(2) <= cob.balance) {
                            dispatch(setAppliedAmount(remainingAmtRedux.toFixed(2)));
                          } else {
                            dispatch(setAppliedAmount(cob.balance));
                          }
                          // } else {
                          //   dispatch(setAppliedAmount(cob.applied));
                          // }
                        }}

                        className={cob.openBalancePK === selectedId && changeColor ? "tableSelected" : ""}
                      >
                        <td> {cob.description} </td>
                        <td> {cob.amount.toFixed(2)} </td>
                        <td> {cob.balanceDuplicate.toFixed(2)} </td>
                        <td>
                          {" "}
                          {changeColor
                            ? selectedId === cob.openBalancePK
                              ? Number(cob.applied).toFixed(2) // appliedAmount
                              : Number(cob.applied).toFixed(2)
                            : Number(cob.applied).toFixed(2)}{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
              {loading && <LoadingText />}
              {!loading && openBalanceObjArr.length === 0 && (
                <p className="pt-3" align="center" style={{ fontSize: "0.8rem" }}>
                  No Records Available
                </p>
              )}
            </div>
          </Col>
          <Col lg={5} sm={5} md={5} xs={5} className={"ps-0"}>
            <div className="ms-4 p-t-25">
              <Form.Group
                className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 
                ${noRecords ? "" : "hide-elements"}
                
                `}
              >
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Invoice Amount</Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="p-0">
                  <input
                    className={`customFormControl  `}
                    id="invoiceamt"
                    name="invoiceamt"
                    value={invoiceAmount}
                    type="search"
                    disabled={true}
                    style={{ width: "77px" }}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
                  noRecords ? "" : "hide-elements"
                }`}
              >
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Applied Amount</Form.Label>
                </Col>

                <Col id="appliedAmount" xs={2} md={2} sm={2} className="p-0">
                  <input
                    className={`customFormControl  
                    ${
                      !enableAppliedAmount
                        ? ""
                        : Number(totalApplied) < invoiceAmountFromUnit || remainingAmtRedux > 0
                          ? "borderRed"
                          : remainingAmtRedux === 0 && Number(appliedAmount) > 0
                            ? "borderGreen"
                            : ""
                    }`}
                    type="text"
                    value={appliedAmount}
                    style={{ width: "77px" }}
                    onBlur={(e) => handleAppliedAmtBlur(e)}
                    disabled={invoiceAmount > 0 && enableAppliedAmount ? false : true}
                    maxLength={30}
                    onInput={(event) => {
                      appliedAmountFormatHandler(event);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
                  noRecords ? "" : "hide-elements"
                }`}
              >
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Remaining Amount</Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="remainamt"
                    name="remainamt"
                    value={Number(remainingAmtRedux).toFixed(2)}
                    type="text"
                    style={{ width: "77px" }}
                    disabled={true}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default OpenBalances;
