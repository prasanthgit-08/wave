import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsOpenBalanceValid,
  setOpenBalancesArrayList,
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
  setPreviouslySelectedCustomerOpenBalanceIdList,
  setSelectedAppliedAmount,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressOpenBalancesTabSlice";
import { useParams } from "react-router-dom";

function OpenBalances({ styles }) {
  const dispatch = useDispatch();

  const invoiceAmount = useSelector(
    (state) => state.editMasterExpressOpenBalances.invoiceAmountForOpenBalances
  );
  const appliedAmount = useSelector((state) => state.editMasterExpressOpenBalances.appliedAmount);
  const remainingAmount = useSelector((state) => state.editMasterExpressOpenBalances.remainingAmt);
  const openBalancesArrayList = useSelector(
    (state) => state.editMasterExpressOpenBalances.openBalancesArrayList
  );
  const isOpenBalanceValid = useSelector((state) => state.editMasterExpressOpenBalances.isOpenBalanceValid);
  const selectedAppliedAmount = useSelector(
    (state) => state.editMasterExpressOpenBalances.selectedAppliedAmount
  );
  const prepaidAmount = useSelector((state) => state.editMasterExpressInvoiceTabReducer.prepaidAmount);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);

  const [selectedId, setSelectedId] = useState("");
  const selectedItem = openBalancesArrayList?.find((item) => item.openBalancePK === selectedId);
  const zeroFixed = Number(0).toFixed(2);

  const initialAppliedAmountsSum =
    openBalancesArrayList?.reduce((sum, item) => sum + parseFloat(item?.initailApplied), 0) || 0;
  const appliedAmountsSum =
    openBalancesArrayList?.reduce((sum, item) => sum + parseFloat(item?.applied), 0) || 0;

  const invoiceAmountForOpenBalances = useSelector(
    (state) => state.editMasterExpressOpenBalances.invoiceAmountForOpenBalances
  );
  const isOpenBalancesDisabled =
    Number(invoiceAmountForOpenBalances) === Number(0) ||
    selectedUnitData?.editMasterExpressCustomerTabDTO?.openBalancePayment === false ||
    selectedUnitData?.editMasterExpressInvoiceRatesData?.fodinvoiceAmount ===
      selectedUnitData?.editMasterExpressInvoiceRatesData?.prepaidAmount;

  const invoiceAmt = Number(invoiceAmount);
  const prepaidAmt = Number(prepaidAmount);
  const appliedSum = Number(appliedAmountsSum);
  const initialAppliedSum = Number(initialAppliedAmountsSum);

  /**
   * balanceAmount
   *
   * Represents the remaining payable balance for the invoice after considering:
   * - whether open balances are allowed
   * - prepaid amounts
   * - previously applied amounts
   * - current applied amounts
   *
   * This value is used to drive the "Remaining Amount" shown to the user.
   *
   * Business meaning of variables:
   * - invoiceAmt            → Total invoice amount
   * - prepaidAmt            → Amount prepaid before applying current payments
   * - appliedSum            → Total of currently applied amounts
   * - initialAppliedSum     → Amount that was already applied when the screen loaded
   * - isOpenBalancesDisabled→ Flag to force remaining balance to zero
   */
  const balanceAmount = isOpenBalancesDisabled
    ? 0
    : appliedSum === 0
      ? prepaidAmt > 0
        ? invoiceAmt - prepaidAmt + initialAppliedSum
        : invoiceAmt
      : invoiceAmt - (prepaidAmt > 0 ? prepaidAmt + (appliedSum - initialAppliedSum) : appliedSum);

  // Setting Remaining Amount based on applied amounts sum and balance amount
  useEffect(() => {
    if (balanceAmount > 0) {
      dispatch(setRemainingAmt(Number(balanceAmount).toFixed(2)));
    }
    if (balanceAmount <= 0) {
      dispatch(setRemainingAmt(Number(0).toFixed(2)));
    }
  }, [openBalancesArrayList]);

  // Tab Validation
  useEffect(() => {
    if (Number(remainingAmount) === 0) {
      dispatch(setIsOpenBalanceValid(true));
    } else {
      dispatch(setIsOpenBalanceValid(false));
    }
  }, [remainingAmount]);

  const handleRecordOnClick = (item, index, event) => {
    setSelectedId(item.openBalancePK);
    if (Number(remainingAmount) === 0 || appliedSum === invoiceAmt) {
      dispatch(setAppliedAmount(item?.applied));
    }

    if (Number(remainingAmount) > 0) {
      let newBalance = item?.newBalance;

      if (Number(newBalance) >= Number(remainingAmount)) {
        dispatch(setAppliedAmount((Number(item?.applied) + Number(remainingAmount))?.toFixed(2)));
        dispatch(setSelectedAppliedAmount((Number(item?.applied) + Number(remainingAmount))?.toFixed(2)));
        dispatch(
          setOpenBalancesArrayList({
            actionType: "update",
            payload: {
              openBalancePK: item.openBalancePK,
              newBalance: newBalance - remainingAmount,
              applied: Number(item?.applied) + Number(remainingAmount),
            },
          })
        );
      }

      if (Number(newBalance) < Number(remainingAmount)) {
        dispatch(setAppliedAmount((Number(item?.applied) + Number(newBalance))?.toFixed(2)));
        dispatch(setSelectedAppliedAmount((Number(item?.applied) + Number(newBalance))?.toFixed(2)));
        dispatch(
          setOpenBalancesArrayList({
            actionType: "update",
            payload: {
              openBalancePK: item.openBalancePK,
              newBalance: Number(zeroFixed),
              applied: Number(item?.applied) + Number(newBalance),
            },
          })
        );
      }
    }
  };

  const handleAppliedAmountOnChange = (value) => {
    // Replace a single '.' with '0.'
    if (value === ".") {
      value = "0.";
    }

    // Prevent multiple dots
    if ((value.match(/\./g) || []).length > 1) {
      return; // Ignore extra dots
    }

    // Optional: Allow only numbers and one dot
    if (!/^\d*\.?\d*$/.test(value)) {
      return; // Ignore invalid characters
    }

    if (Number(value) > Number(selectedAppliedAmount)) {
      dispatch(setAppliedAmount(selectedAppliedAmount));
    } else {
      dispatch(setAppliedAmount(value));
    }

    if (selectedItem) {
      if (value) {
        dispatch(
          setOpenBalancesArrayList({
            actionType: "update",
            payload: {
              openBalancePK: selectedItem.openBalancePK,
              newBalance:
                Number(value) > Number(selectedAppliedAmount)
                  ? Math.max(0, Number(selectedItem.balance) - Number(selectedAppliedAmount))
                  : Number(selectedItem.balance) +
                    Number(selectedItem?.previousAppliedAmount) -
                    Number(value),
              applied:
                Number(value) > Number(selectedAppliedAmount) ? Number(selectedAppliedAmount) : Number(value),
            },
          })
        );
      } else {
        dispatch(
          setOpenBalancesArrayList({
            actionType: "update",
            payload: {
              openBalancePK: selectedItem.openBalancePK,
              newBalance: Number(selectedItem.balance) + Number(selectedItem?.previousAppliedAmount),
              applied: Number(0)?.toFixed(2),
            },
          })
        );
      }
    }
  };

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedCustomerId = useSelector((state) => state.orderEntryReducer.selectedCustomerId);
  const useOpenBalance = useSelector((state) => state.orderEntryReducer.useOpenBalance);
  const dupLoadForOpenBal = useSelector((state) => state.editMasterExpressOpenBalances.dupLoadForOpenBal);
  const dataResetFlag = useSelector((state) => state.editMasterExpressOpenBalances.dataReset);
  const isSaving = useSelector((state) => state.editMasterExpressOpenBalances.isSaving);
  const isOpenBalancesDetailsInComplete = useSelector(
    (state) => state.editMasterExpressOpenBalances.isOpenBalancesDetailsInComplete
  );
  const batchLoadCustomerTab = useSelector((state) => state.orderEntryReducer.batchLoadCustomerTab);
  const zero = 0;
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const cancelledEdit = useSelector((state) => state.editMasterExpressTabsReducer.cancelledEdit);
  const params = useParams();
  const id = params.id;

  //for setting invoice amount and also passing it to backend for calculation purposes
  useEffect(() => {
    if (openBalancesArrayList !== null && openBalancesArrayList.length > 0) {
      var openBalnceDuplicate = [...openBalancesArrayList];
      openBalancesArrayList.forEach(function (obj, index) {
        let currentObj = {
          ...obj,
          invoice: invoiceAmt,
          chargePerUnit: invoiceAmount ? invoiceAmt : 0,
        };
        openBalnceDuplicate[index] = currentObj;
      });
      dispatch(setUpdatOpenBalanceArray(openBalnceDuplicate));
    }
    // }
  }, [invoiceAmount, remainingAmount]);

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchOpenBalanceById();
    }, 1000);

    dispatch(resetChangesOpenBalance());
    dispatch(setEnableAppliedAmount(false));
    dispatch(setAppliedAmount(zero?.toFixed(2)));
    setSelectedIndex(0);
    setSelectedId("");

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    invoiceAmount,
    cancelledEdit,
    selectedUnitData?.editMasterExpressOpenBlancesTabDTO?.openBalanceDTOList,
  ]);

  useEffect(() => {
    if (cancelledEdit) {
      dispatch(setPreviouslySelectedCustomerOpenBalanceIdList([]));
      setSelectedId("");
      setSelectedIndex(0);
    }
  }, [cancelledEdit]);

  //For handling duplicate loads
  useEffect(() => {
    if (dupLoadForOpenBal) {
      if (selectedCustomerId !== null && useOpenBalance) {
        fetchOpenBalanceById();
      }
      dispatch(setDupLoadForOpenBal(false));
      dispatch(resetChangesOpenBalance());
      dispatch(setAppliedAmount(zero?.toFixed(2)));
      dispatch(setEnableAppliedAmount(false));
      setSelectedIndex(0);
      setSelectedId("");
    }
  }, [dupLoadForOpenBal, dataResetFlag, batchLoadCustomerTab, invoiceAmount]);

  // Tab Validation/ partial & incomplete
  useEffect(() => {
    if (!selectedUnitData?.editMasterExpressUnitTabDTO?.openBalancePrepaid || isOpenBalancesDisabled) return;

    if (invoiceAmount === undefined || invoiceAmount === "" || Number(invoiceAmount) === 0) {
    } else if (Number(invoiceAmount) === Number(appliedAmount) || Number(remainingAmount) === 0) {
      dispatch(setisOpenBalancesDetailsPartial(false));
      dispatch(setIsOpenBalancesDetailsInComplete(false));
    } else if (Number(appliedAmount) >= 0) {
      if (
        selectedUnitData?.editMasterExpressUnitTabDTO?.openBalancePrepaid &&
        invoiceAmt === Number(remainingAmount)
      ) {
        dispatch(setisOpenBalancesDetailsPartial(false));
        dispatch(setIsOpenBalancesDetailsInComplete(true));
      } else if (
        selectedUnitData?.editMasterExpressUnitTabDTO?.openBalancePrepaid &&
        selectedUnitData?.editMasterExpressInvoiceRatesData?.prepaidAmount &&
        Number(appliedAmount) === 0 &&
        Number(remainingAmount) !== 0
      ) {
        dispatch(setisOpenBalancesDetailsPartial(true));
        dispatch(setIsOpenBalancesDetailsInComplete(false));
      } else if (
        selectedUnitData?.editMasterExpressUnitTabDTO?.openBalancePrepaid &&
        selectedUnitData?.editMasterExpressInvoiceRatesData?.prepaidAmount &&
        Number(appliedAmount) < invoiceAmt &&
        Number(remainingAmount) > 0
      ) {
        dispatch(setIsOpenBalancesDetailsInComplete(false));
        dispatch(setisOpenBalancesDetailsPartial(true));
      } else if (
        invoiceAmt > Number(appliedAmount) &&
        Number(appliedAmount) !== 0 &&
        Number(remainingAmount) !== 0
      ) {
        dispatch(setIsOpenBalancesDetailsInComplete(false));
        dispatch(setisOpenBalancesDetailsPartial(true));
      } else if (Number(appliedAmount) === 0 && Number(remainingAmount) !== 0) {
        dispatch(setIsOpenBalancesDetailsInComplete(true));
        dispatch(setisOpenBalancesDetailsPartial(false));
      }
    }
  }, [remainingAmount]);

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

  // API call for fetching the open balance account for a selected customer
  const fetchOpenBalanceById = () => {
    dispatch(setOpenBalancesArrayList({ actionType: "clear" }));
    if (selectedUnitData?.editMasterExpressOpenBlancesTabDTO?.openBalanceDTOList?.length !== 0) {
      const modifiedList = selectedUnitData?.editMasterExpressOpenBlancesTabDTO?.openBalanceDTOList?.map(
        (cob) => ({
          unitfk: id,
          openBalancePK: cob.customerOpenBalancePK,
          amount: cob.amount,
          balance: cob.balance,
          newBalance: cob.balance,
          description: cob.description,
          applied: cob.applied,
          initailApplied: cob.applied,
          previousAppliedAmount: cob.applied,
          isApplied: cob.applied > Number(0) ? true : false,
          invoice: 0,
          chargePerUnit: 0,
          existingTotalAmountFullyPaidFromOpenBalances: cob.existingTotalAmountFullyPaidFromOpenBalances,
        })
      );

      dispatch(setOpenBalancesArrayList({ actionType: "set", payload: modifiedList || [] }));
    }
  };

  //Function for setting value to 0 if applied amount is ""
  const handleAppliedAmtBlur = () => {
    if (!appliedAmount) {
      dispatch(setAppliedAmount(zeroFixed));
    } else {
      dispatch(setAppliedAmount(Number(appliedAmount)?.toFixed(2)));
    }
  };

  return (
    <div
      className={`p-2 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight}`}
      style={{ width: "1800px" }}
    >
      <div className="mt-4">
        <Row className={styles.creditCardTable}>
          <Col md={5} xs={5} className={" ps-0 p-l-10"}>
            <div
              className={`border border-secondary ${styles.plantNameTable}`}
              style={{
                padding: "0",
                height: "300px",
                overflowY: "auto",
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
                {openBalancesArrayList?.length !== 0 && (
                  <tbody>
                    {openBalancesArrayList?.map((item, index) => (
                      <tr
                        id="rowId"
                        key={item.openBalancePK}
                        onClick={(e) => {
                          if (!viewDetail) {
                            handleRecordOnClick(item, index, e);
                          }
                        }}
                        className={item.openBalancePK === selectedId ? "tableSelected" : ""}
                      >
                        <td> {item.description} </td>
                        <td> {item.amount?.toFixed(2)} </td>
                        <td> {item?.newBalance?.toFixed(2)} </td>
                        <td>{Number(item.applied)?.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
              {openBalancesArrayList.length === 0 && (
                <p className="pt-3" align="center" style={{ fontSize: "0.8rem" }}>
                  No Records Available
                </p>
              )}
            </div>
          </Col>
          <Col lg={5} sm={5} md={5} xs={5} className={"ps-0"}>
            <div className="ms-4 p-t-25">
              <Form.Group className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 `}>
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Invoice Amount</Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="p-0">
                  <input
                    className={`customFormControl  `}
                    id="invoiceamt"
                    name="invoiceamt"
                    value={invoiceAmount?.toFixed(2)}
                    type="search"
                    disabled={true}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0`}>
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Applied Amount</Form.Label>
                </Col>

                <Col id="appliedAmount" xs={2} md={2} sm={2} className="p-0">
                  <input
                    className={`customFormControl ${!viewDetail && selectedId ? (isOpenBalanceValid ? (appliedAmount ? "borderGreen" : "") : "borderRed") : ""}`}
                    type="text"
                    value={appliedAmount}
                    onBlur={(e) => handleAppliedAmtBlur(e)}
                    disabled={viewDetail || !selectedId}
                    maxLength={30}
                    onChange={(e) => handleAppliedAmountOnChange(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0`}>
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Remaining Amount</Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="remainamt"
                    name="remainamt"
                    value={Number(remainingAmount)?.toFixed(2)}
                    type="text"
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
