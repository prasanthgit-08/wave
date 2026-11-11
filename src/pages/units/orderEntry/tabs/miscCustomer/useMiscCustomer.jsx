import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import useDebouncer from "../../../../../hooks/useDebouncer";
import { useDispatch } from "react-redux";
import { setOrderEntrySchemaConditions } from "../../../../../store/slices/unit.slice";
import OrderEntryServices from "../../../../../service/orderEntry/orderEntry.service";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";

const useMiscCustomer = () => {
  const dispatch = useDispatch();

  const [miscCustomerModel, setMiscCustomerModel] = useState(false);
  const [selectedMiscCustomerData, setSelectedMiscCustomerData] = useState("");
  const { watch, setValue, getValues } = useFormContext();
  const [customerLoading, setCustomerLoading] = useState(false);

  // Debounce function
  const debounceUpdate = useDebouncer(() => {
    const miscCustomer = getValues("miscCustomer");

    dispatch(
      setOrderEntrySchemaConditions({
        miscCustomer: { ...miscCustomer },
      })
    );
  }, 150);

  // Updating miscCustomer fields dynamically
  const updateMiscCustomerFields = (fields) => {
    Object.entries(fields).forEach(([key, value]) => {
      setValue(`miscCustomer.${key}`, value, { shouldValidate: false });
    });

    debounceUpdate();
  };

  const handleMiscellanousCustomerSelection = async (item) => {
    setMiscCustomerModel(false);
    if (item.customerAddressPK) {
      findMiscellanousCustomer(item.customerAddressPK);
    }
  };

  const findMiscellanousCustomer = async (id) => {
    try {
      setCustomerLoading(true);
      const response = await OrderEntryServices.fetchMiscCustomersById(id);
      const data = response.data;
      setSelectedMiscCustomerData(data);
      setCustomerLoading(false);
    } catch (err) {
      setCustomerLoading(false);
      console.error("Error fetching miscellaneous customer:", err);
    }
  };

  useEffect(() => {
    updateMiscCustomerFields({
      name: selectedMiscCustomerData?.name?.trim(),
      address1: selectedMiscCustomerData?.address1?.trim(),
      address2: selectedMiscCustomerData?.address2?.trim(),
      city: selectedMiscCustomerData?.city?.trim(),
      stateCode: selectedMiscCustomerData?.stateCode?.trim(),
      postalCode: selectedMiscCustomerData?.postalCode?.trim(),
      phone: formatPhoneNumber(selectedMiscCustomerData?.phone?.trim()),
      fax: formatPhoneNumber(selectedMiscCustomerData?.fax?.trim()),
      email: selectedMiscCustomerData?.email?.trim(),
      contact: selectedMiscCustomerData?.contact?.trim(),
      postalCodePK: selectedMiscCustomerData?.postalCodePK,
      quickPayTerms: selectedMiscCustomerData?.quickPayTerms?.trim(),
    });
  }, [selectedMiscCustomerData]);

  return {
    miscCustomerModel,
    setMiscCustomerModel,
    updateMiscCustomerFields,
    handleMiscellanousCustomerSelection,
    customerLoading,
  };
};
export default useMiscCustomer;
