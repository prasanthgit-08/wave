import { useEffect, useMemo, useState, useCallback } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import OrderEntryServices from "../../../../../service/orderEntry/orderEntry.service";
import {
  setIsOpenBalancesDetailsInComplete,
  setisOpenBalancesDetailsPartial,
  setIsOpenBalanceValid,
} from "../../../../../store/slices/unit.slice";
import useDebouncer from "../../../../../hooks/useDebouncer";

const useOpenBalances = () => {
  const dispatch = useDispatch();

  const { setValue } = useFormContext();
  const selectedCustomerId = useSelector((state) => state.unit.selectedCustomer?.customerPK);
  const isOpenBalanceValid = useSelector((state) => state.unit.isOpenBalanceValid);
  const invoiceAmountFromUnit = useSelector((state) => state.unit.invoiceAmount);
  const openBalanceClear = useSelector((state) => state.unit.openBalanceClear);
  const openBalanceTriggerKey = useSelector((state) => state.unit.openBalanceTriggerKey);
  const batchLoadCount = useSelector((state) => state.unit.batchLoadCount);

  const [openBalancesArray, setOpenBalancesArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [appliedAmount, setAppliedAmount] = useState("0.00");
  const [remainingAmount, setRemainingAmount] = useState("0.00");
  const [invoiceAmount, setInvoiceAmount] = useState(0);

  const batchLoads = useWatch({ name: "customer.batchLoads" });
  const openBalancePrepaid = useWatch({ name: "customer.openBalancePrepaid" });

  const selectedItem = useMemo(
    () => openBalancesArray?.find((item) => item.openBalancePK === selectedId),
    [selectedId, openBalancesArray]
  );

  // Calculated sum of all applied - matching old getSum() function
  const totalApplied = useMemo(() => {
    let sum = 0;
    openBalancesArray.forEach((item) => {
      let appliedAmt = Number(item.applied || 0);
      if (isNaN(item.applied)) {
        appliedAmt = 0;
      }
      if (isNaN(sum)) {
        sum = 0;
      }
      sum = Number(sum) + Number(appliedAmt);
    });
    return Number(sum.toFixed(2));
  }, [openBalancesArray]);

  // Function to calculate sum excluding selected row - matching old getSumForAccountsOtherThanSelected
  const getSumForAccountsOtherThanSelected = (excludeId) => {
    let sum = 0;
    openBalancesArray.forEach((item) => {
      if (item.openBalancePK !== excludeId) {
        let appliedAmt = Number(item.applied || 0);
        if (isNaN(item.applied)) {
          appliedAmt = 0;
        }
        if (isNaN(sum)) {
          sum = 0;
        }
        sum = Number(sum) + Number(appliedAmt);
      }
    });
    return Number(sum.toFixed(2));
  };

  // Fetch Open Balances API
  const fetchOpenBalanceById = useCallback(() => {
    if (!selectedCustomerId) return;

    setLoading(true);
    OrderEntryServices.getOpenBalances(selectedCustomerId)
      .then((resp) => {
        const list = resp.data?.map((cob) => ({
          openBalancePK: cob.customerOpenBalancePK,
          customerOpenBalanceFK: cob.customerOpenBalancePK,
          amount: Number(Number(cob.amount || 0).toFixed(2)),
          balance: Number(Number(cob.balance || 0).toFixed(2)),
          balanceDuplicate: Number(Number(cob.balance || 0).toFixed(2)), // Original balance, used for calculations
          description: cob.description,
          applied: 0,
          isApplied: 0,
          invoice: 0,
          chargePerUnit: 0,
        }));
        setOpenBalancesArray(list || []);
        setSelectedId("");
        setAppliedAmount("0.00");
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, [selectedCustomerId]);

  // Row click: Auto apply remaining amount - matching old onClick logic
  const handleRecordOnClick = (item) => {
    // Get current item from array to ensure we have latest data
    const currentItem = openBalancesArray.find((x) => x.openBalancePK === item.openBalancePK) || item;

    // If clicking the same row that's already selected and has an applied amount, reset it to 0
    if (selectedId === item.openBalancePK && currentItem.applied > 0) {
      setAppliedAmount("0.00");

      // Reset the row's applied amount to 0
      setOpenBalancesArray((prev) =>
        prev.map((x) => {
          if (x.openBalancePK === item.openBalancePK) {
            return {
              ...x,
              applied: 0,
              balanceDuplicate: Number(x.balance.toFixed(2)), // Reset to original balance
              isApplied: 0,
            };
          }
          return x;
        })
      );
      return;
    }

    // Different row selected - calculate and allocate applied amount
    setSelectedId(item.openBalancePK);

    // Calculate remaining amount excluding this row's current applied amount
    // This gives us the "available remaining" that can be applied to this row
    const totalAppliedExcludingSelected = getSumForAccountsOtherThanSelected(item.openBalancePK);
    const calculatedRemainingAmount = Number(
      (Number(invoiceAmount) - totalAppliedExcludingSelected).toFixed(2)
    );

    // Determine initial applied amount based on remaining and balance
    // Use original balance for comparison (matching old logic that uses cob.balance)
    // The old code compares remainingAmtRedux with cob.balance (original balance)
    let initialAppliedAmount = 0;
    if (calculatedRemainingAmount <= currentItem.balance) {
      initialAppliedAmount = calculatedRemainingAmount;
    } else {
      initialAppliedAmount = currentItem.balance;
    }

    // Ensure non-negative and round to 2 decimal places
    if (initialAppliedAmount < 0) {
      initialAppliedAmount = 0;
    }
    initialAppliedAmount = Number(initialAppliedAmount.toFixed(2));

    setAppliedAmount(initialAppliedAmount.toFixed(2));

    // Update the row with initial applied amount - matching old handleAppliedAmt logic
    setOpenBalancesArray((prev) =>
      prev.map((x) => {
        if (x.openBalancePK === item.openBalancePK) {
          let balanceAmt = 0;
          if (/^[.]+$/.test(initialAppliedAmount.toString())) {
            balanceAmt = x.balance;
          } else {
            balanceAmt = Number((x.balance - initialAppliedAmount).toFixed(2));
            // Ensure balance doesn't exceed original or go below 0
            if (balanceAmt < 0) balanceAmt = 0;
            if (balanceAmt > x.balance) balanceAmt = Number(x.balance.toFixed(2));
          }

          return {
            ...x,
            applied: initialAppliedAmount,
            balanceDuplicate: Number((balanceAmt > x.balance ? x.balance : balanceAmt).toFixed(2)),
            isApplied: initialAppliedAmount > 0 ? 1 : 0,
          };
        }
        return x;
      })
    );
  };

  // MinMax calculation function - matching old minMaxCalculation()
  const minMaxCalculation = (value, min, balanceAmt, remainingAmtRedux) => {
    if (!value) return value;

    const number = value.replace(/[^\d.]/g, "");
    const parts = number.split(".");

    // Check if there are more than 2 parts or if the first part has more than 8 digits
    if (parts.length > 2 || parts[0].length > 8) {
      return number.slice(0, -1);
    }
    // Check if there is a second part and if it has more than 2 digits
    if (parts.length === 2 && parts[1].length > 2) {
      return number.slice(0, -1);
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
          if (Number(parts[0]) > max || (Number(parts[0]) === max && parts[1] && parts[1].length > 0)) {
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
  };

  const handleAppliedAmountOnChange = (value) => {
    if (!selectedItem) return;

    // Calculate remaining amount excluding selected row's current applied amount
    const totalAppliedExcludingSelected = getSumForAccountsOtherThanSelected(selectedItem.openBalancePK);
    const availableInvoiceAmount = Number((Number(invoiceAmount) - totalAppliedExcludingSelected).toFixed(2));

    // User current original balance (from API fetch)
    const originalBalance = selectedItem.balance;

    // Apply minMax calculation
    const appliedAmountValidate = minMaxCalculation(value, 0, originalBalance, availableInvoiceAmount);

    setAppliedAmount(appliedAmountValidate);

    // Update the row state
    const appliedAmt = Number(Number(appliedAmountValidate || 0).toFixed(2));
    let balanceAmt = 0;

    if (/^[.]+$/.test(appliedAmountValidate) || appliedAmountValidate === "") {
      balanceAmt = originalBalance;
    } else {
      balanceAmt = Number((originalBalance - appliedAmt).toFixed(2));
      // Clamp values
      if (balanceAmt < 0) balanceAmt = 0;
      if (balanceAmt > originalBalance) balanceAmt = originalBalance;
    }

    setOpenBalancesArray((prev) =>
      prev.map((x) =>
        x.openBalancePK === selectedItem.openBalancePK
          ? {
              ...x,
              balanceDuplicate: Number(balanceAmt.toFixed(2)),
              applied: appliedAmt || 0,
              isApplied: appliedAmt > 0 ? 1 : 0,
            }
          : x
      )
    );
  };

  const handleAppliedAmtBlur = () => {
    // Matching old handleAppliedAmtBlur
    if (appliedAmount === null || appliedAmount === undefined || appliedAmount === "") {
      setAppliedAmount("0.00");
      // Also update the row
      if (selectedItem) {
        setOpenBalancesArray((prev) =>
          prev.map((x) =>
            x.openBalancePK === selectedItem.openBalancePK
              ? {
                  ...x,
                  applied: 0,
                  balanceDuplicate: Number(x.balance.toFixed(2)),
                  isApplied: 0,
                }
              : x
          )
        );
      }
    } else {
      const numValue = parseFloat(appliedAmount);
      if (isNaN(numValue)) {
        setAppliedAmount("0.00");
      } else {
        const roundedValue = Number(numValue.toFixed(2));
        setAppliedAmount(roundedValue.toFixed(2));
        // Update the row with the final value
        if (selectedItem) {
          const appliedAmt = roundedValue;
          const balanceAmt = Number(Math.max(0, selectedItem.balance - appliedAmt).toFixed(2));
          setOpenBalancesArray((prev) =>
            prev.map((x) =>
              x.openBalancePK === selectedItem.openBalancePK
                ? {
                    ...x,
                    applied: appliedAmt,
                    balanceDuplicate: balanceAmt,
                    isApplied: appliedAmt > 0 ? 1 : 0,
                  }
                : x
            )
          );
        }
      }
    }
  };

  const debouceFetchOpenBalanceById = useDebouncer(fetchOpenBalanceById, 500);

  useEffect(() => {
    setValue("openBalances.openBalancesArray", openBalancesArray);
  }, [openBalancesArray, setValue]);

  useEffect(() => {
    batchLoads
      ? setInvoiceAmount(Number(invoiceAmountFromUnit * batchLoadCount).toFixed(2))
      : setInvoiceAmount(Number(invoiceAmountFromUnit).toFixed(2));
  }, [invoiceAmountFromUnit, batchLoads, batchLoadCount]);

  // Fetch on invoice change
  useEffect(() => {
    if (openBalancePrepaid && selectedCustomerId) {
      setLoading(true);
      debouceFetchOpenBalanceById();
    }
  }, [selectedCustomerId, openBalancePrepaid, openBalanceTriggerKey, invoiceAmount, fetchOpenBalanceById]);

  // Update remaining amount - matching old handleRemainingAmt()
  useEffect(() => {
    if (!invoiceAmount || Number(invoiceAmount) === 0) {
      setRemainingAmount("0.00");
      return;
    }
    const appliedSum = totalApplied;
    let remainingAmt = Number(invoiceAmount) - Number(appliedSum);
    if (isNaN(remainingAmt)) {
      remainingAmt = 0;
    }
    setRemainingAmount(remainingAmt.toFixed(2));
  }, [totalApplied, invoiceAmount]);

  // Validation logic - matching old validation useEffect
  useEffect(() => {
    if (!invoiceAmount || invoiceAmount === "" || Number(invoiceAmount) === 0) {
      dispatch(setIsOpenBalanceValid(false));
      dispatch(setIsOpenBalancesDetailsInComplete(true));
      return;
    }

    const remaining = Number(remainingAmount);
    const applied = Number(totalApplied);
    const invoice = Number(invoiceAmount);

    if (invoice === applied || remaining === 0) {
      dispatch(setIsOpenBalanceValid(true));
      dispatch(setIsOpenBalancesDetailsInComplete(false));
      dispatch(setisOpenBalancesDetailsPartial(false));
    } else if (applied >= 0) {
      dispatch(setIsOpenBalanceValid(false));
      if (applied === 0) {
        dispatch(setisOpenBalancesDetailsPartial(false));
        dispatch(setIsOpenBalancesDetailsInComplete(true));
      } else if (applied < invoice && remaining > 0) {
        dispatch(setIsOpenBalancesDetailsInComplete(false));
        dispatch(setisOpenBalancesDetailsPartial(true));
      } else if (invoice === applied || remaining === 0) {
        dispatch(setIsOpenBalancesDetailsInComplete(false));
        dispatch(setisOpenBalancesDetailsPartial(false));
      } else {
        dispatch(setIsOpenBalancesDetailsInComplete(false));
      }
    } else {
      dispatch(setIsOpenBalanceValid(false));
    }
  }, [remainingAmount, totalApplied, invoiceAmount, openBalanceTriggerKey, dispatch]);

  useEffect(() => {
    if (!openBalancePrepaid) {
      setOpenBalancesArray([]);
      setSelectedId("");
      setAppliedAmount("0.00");
      setRemainingAmount("0.00");
    } else {
      setRemainingAmount(invoiceAmountFromUnit);
    }
  }, [openBalancePrepaid]);

  // Reset when customer changes
  useEffect(() => {
    if (selectedCustomerId) {
      setSelectedId("");
      setAppliedAmount("0.00");
    }
  }, [selectedCustomerId]);

  useEffect(() => {
    if (openBalanceClear) {
      setOpenBalancesArray([]);
      setSelectedId("");
      setAppliedAmount("0.00");
      setRemainingAmount("0.00");
      dispatch(setIsOpenBalancesDetailsInComplete(true));
    }
  }, [openBalanceClear]);

  /**
   * Used to clear fields when creditCardPrepaid=false
   */

  return {
    invoiceAmount,
    appliedAmount,
    remainingAmount,
    loading,
    openBalancesArray,
    selectedId,
    isOpenBalanceValid,
    handleRecordOnClick,
    handleAppliedAmountOnChange,
    handleAppliedAmtBlur,
  };
};
export default useOpenBalances;
