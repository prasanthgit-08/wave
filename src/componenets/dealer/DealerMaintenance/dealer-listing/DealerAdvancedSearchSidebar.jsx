/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../../common/InputField";
import {
  setAdvancedSearchByInputs,
  setAdvancedSearchByPayload,
  setAdvancedSearchString,
  setCheckAllAdvancedSearchBy,
} from "../../../../redux/DealerSearchFilterSlice";
import { setPageNumber } from "../../../../redux/PaginationSlice";

const DealerAdvancedSearchSidebar = () => {
  const advancedSearchString = useSelector((state) => state.dealerSearchReducer.advancedSearchString);
  const advancedSearchByInputs = useSelector((state) => state.dealerSearchReducer.advancedSearchByInputs);
  const checkAllAdvancedSearchBy = useSelector((state) => state.dealerSearchReducer.checkAllAdvancedSearchBy);

  const dispatch = useDispatch();

  const onChangeAdvancedSearchByInputs = (event) => {
    const { name, checked } = event.target;
    dispatch(setAdvancedSearchByInputs({ name, checked }));
  };

  /**
   * Update Payload Object for Advanced Search API Call
   */
  useEffect(() => {
    dispatch(
      setAdvancedSearchByPayload({
        isAddressSelected: advancedSearchByInputs.address,
        isPostalCodeSelected: advancedSearchByInputs.postalCode,
        isPhoneSelected: advancedSearchByInputs.phone,
        isContactsSelected: advancedSearchByInputs.contacts,
        isNotesSelected: advancedSearchByInputs.notes,
        isStoreCodeSelected: advancedSearchByInputs.storeCode,
      })
    );
  }, [advancedSearchByInputs]);

  /**
   * Clear search string if none of the options is selected
   */
  useEffect(() => {
    if (Object.values(advancedSearchByInputs).every((value) => value === false)) {
      dispatch(setAdvancedSearchString(""));
    }
  }, [advancedSearchByInputs]);

  return (
    <form className="col-12 m-t-15 m-b-15">
      <div className="form-group d-flex flex-column m-b-10">
        <label className="hide-elements">Common Search Field</label>
        <InputField
          type="search"
          name="name"
          maxLength={30}
          value={advancedSearchString}
          disabled={
            // Disable save if none of the options is selected
            Object.values(advancedSearchByInputs).every((value) => value === false)
          }
          onInput={(e) => {
            dispatch(setAdvancedSearchString(e.target.value));
          }}
          className="form-control rounded-0 h-25px"
          onFocus={(e) => {
            dispatch(setPageNumber(0));
            e.target.setAttribute("autocomplete", "off");
          }}
        />
      </div>

      <div className="form-group d-flex margin-box-5-fix">
        <input
          type="checkbox"
          className="form-check-input"
          id="all"
          name="all"
          value={checkAllAdvancedSearchBy}
          checked={checkAllAdvancedSearchBy}
          onChange={(e) => {
            dispatch(setCheckAllAdvancedSearchBy(e.target.checked));
          }}
        />
        <label htmlFor="all" className="mx-2">
          All
        </label>
      </div>
      <div className="form-group d-flex margin-box-5-fix">
        <input
          type="checkbox"
          className="form-check-input"
          id="ad1"
          name="ad1"
          value={advancedSearchByInputs.address}
          checked={advancedSearchByInputs.address}
          disabled={checkAllAdvancedSearchBy}
          onChange={(e) => onChangeAdvancedSearchByInputs(e)}
          autoComplete="one-time-code"
          spellCheck={false}
          aria-autocomplete="list"
        />
        <label htmlFor="address" className="mx-2">
          Address
        </label>
      </div>
      <div className="form-group d-flex margin-box-5-fix">
        <input
          type="checkbox"
          className="form-check-input"
          id="postalCode"
          name="postalCode"
          value={advancedSearchByInputs.postalCode}
          checked={advancedSearchByInputs.postalCode}
          disabled={checkAllAdvancedSearchBy}
          onChange={(e) => onChangeAdvancedSearchByInputs(e)}
        />
        <label htmlFor="postalCode" className="mx-2">
          Postal Code
        </label>
      </div>
      <div className="form-group d-flex margin-box-5-fix">
        <input
          type="checkbox"
          className="form-check-input"
          id="phone"
          name="phone"
          value={advancedSearchByInputs.phone}
          checked={advancedSearchByInputs.phone}
          disabled={checkAllAdvancedSearchBy}
          onChange={(e) => onChangeAdvancedSearchByInputs(e)}
        />
        <label htmlFor="phone" className="mx-2">
          Phone
        </label>
      </div>
      <div className="form-group d-flex margin-box-5-fix">
        <input
          type="checkbox"
          className="form-check-input"
          id="contacts"
          name="contacts"
          value={advancedSearchByInputs.contacts}
          checked={advancedSearchByInputs.contacts}
          disabled={checkAllAdvancedSearchBy}
          onChange={(e) => onChangeAdvancedSearchByInputs(e)}
        />
        <label htmlFor="contacts" className="mx-2">
          Contacts
        </label>
      </div>
      <div className="form-group d-flex margin-box-5-fix">
        <input
          type="checkbox"
          className="form-check-input"
          id="notes"
          name="notes"
          value={advancedSearchByInputs.notes}
          checked={advancedSearchByInputs.notes}
          disabled={checkAllAdvancedSearchBy}
          onChange={(e) => onChangeAdvancedSearchByInputs(e)}
        />
        <label htmlFor="notes" className="mx-2">
          Notes
        </label>
      </div>
      <div className="form-group d-flex margin-box-5-fix">
        <input
          type="checkbox"
          className="form-check-input"
          id="storeCode"
          name="storeCode"
          value={advancedSearchByInputs.storeCode}
          checked={advancedSearchByInputs.storeCode}
          disabled={checkAllAdvancedSearchBy}
          onChange={(e) => onChangeAdvancedSearchByInputs(e)}
        />
        <label htmlFor="storeCode" className="mx-2">
          Store Code
        </label>
      </div>
      <div className="form-group d-flex margin-box-5-fix hide-elements">
        <input
          type="checkbox"
          className="form-check-input"
          id="toBeDetermined"
          name="toBeDetermined"
          disabled
        />
        <label htmlFor="toBeDetermined" className="mx-2 disabled-op-70">
          To Be Determined
        </label>
      </div>
    </form>
  );
};

export default DealerAdvancedSearchSidebar;
