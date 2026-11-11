/* eslint-disable react-hooks/exhaustive-deps */

/**
 * AdvancedSearchByCheckboxes Component
 * ************************************
 * This component provides an advanced search form with a set of checkboxes.
 * Each checkbox corresponds to a field by which the user can refine search results.
 *
 * @component
 *
 * @prop {Array} checkboxesArrayList - An array of checkbox objects with `id` and `label` properties.
 *      For example:
 *      [
 *          {id: 'dba', label: 'DBA'},
 *          {id: 'address', label: 'Address'},
 *          ...
 *      ]
 *      The id should match keys in `advancedSearchByInputs`.
 *
 * @prop {string} advancedSearchString - The current search string.
 * @prop {Function} setAdvancedSearchString - Redux action to set the value of the search string.
 *
 * @prop {boolean} checkAllAdvancedSearchBy - Indicates if the "All" checkbox is checked.
 *      If true, all checkboxes in the list will be checked. Also, the action for this prop will
 *      update the individual checkbox states in the Redux store.
 * @prop {Function} setCheckAllAdvancedSearchBy - Redux action to set the state of the "All" checkbox
 *      and automatically updates all individual checkboxes to match its state.
 *
 * @prop {Object} advancedSearchByInputs - An object representing the state of each checkbox.
 *      For example:
 *      {
 *          dba: false,
 *          address: false,
 *          ...
 *      }
 * @prop {Function} setAdvancedSearchByInputs - Redux action to set the state of an individual checkbox.
 *      Expected payload format: {name: checkboxName, checked: true/false}
 *
 * @prop {Function} setPageNumber - Redux action or function to reset the page number, typically used in paginated results.
 *
 * @prop {Function} [handleCheckAllAdvancedSearchByOnChange] - Optional custom handler for when the "All" checkbox changes.
 *
 * @prop {Function} [handleAdvancedSearchByInputsOnChange] - Optional custom handler for when any individual checkbox changes.
 *
 * @prop {Function} [updateAdvancedSearchByPayload] - Optional function to update the payload object for the advanced search API call.
 *
 * @prop {ReactNode} [MiscellaneousContent] - Optional additional content or components to render at the end of the form.
 *
 * @example
 * <AdvancedSearchByCheckboxes
 *   checkboxesArrayList={[...]}
 *   advancedSearchString="test"
 *   checkAllAdvancedSearchBy={false}
 *   advancedSearchByInputs={{...}}
 *   setAdvancedSearchString={setAdvancedSearchStringAction}
 *   ...
 * />
 */

import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import InputField from "./InputField";

const AdvancedSearchByCheckboxes = ({
  checkboxesArrayList,
  advancedSearchString,
  checkAllAdvancedSearchBy,
  advancedSearchByInputs,
  setAdvancedSearchString,
  setCheckAllAdvancedSearchBy,
  setAdvancedSearchByInputs,
  setPageNumber,
  // Optional Properties
  handleCheckAllAdvancedSearchByOnChange,
  handleAdvancedSearchByInputsOnChange,
  updateAdvancedSearchByPayload,
  MiscellaneousContent,
}) => {
  const dispatch = useDispatch();

  const onChangeAdvancedSearchByInputs = (event) => {
    const { name, checked } = event.target;
    if (setAdvancedSearchByInputs) {
      dispatch(setAdvancedSearchByInputs({ name, checked }));
    }
  };

  /**
   * Clear search string if none of the options is selected
   */
  useEffect(() => {
    if (advancedSearchByInputs) {
      if (Object.values(advancedSearchByInputs).every((value) => value === false)) {
        if (setAdvancedSearchString) {
          dispatch(setAdvancedSearchString(""));
        }
      }
    }
  }, [advancedSearchByInputs]);

  /**
   * Update Payload Object for Advanced Search API Call (optional)
   *  - if using different payload object (in backend) instead of advancedSearchByInputs object
   */
  useEffect(() => {
    if (updateAdvancedSearchByPayload) {
      if (advancedSearchByInputs) {
        updateAdvancedSearchByPayload();
      }
    }
  }, [advancedSearchByInputs]);

  return (
    <div className="d-flex flex-column">
      <form className="col-12 m-t-15 m-b-15">
        <div className="form-group d-flex flex-column m-b-10">
          <label className="hide-elements">Common Search Field</label>
          <InputField
            type="search"
            name="name"
            maxLength={30}
            value={advancedSearchString}
            disabled={Object.values(advancedSearchByInputs).every((value) => value === false)}
            onInput={(e) => {
              if (setAdvancedSearchString) {
                dispatch(setAdvancedSearchString(e.target.value));
              }
            }}
            className="form-control rounded-0 h-25px"
            onFocus={(e) => {
              if (setPageNumber) {
                dispatch(setPageNumber(0));
              }
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
              if (handleCheckAllAdvancedSearchByOnChange) {
                handleCheckAllAdvancedSearchByOnChange(e);
              } else {
                if (setCheckAllAdvancedSearchBy) {
                  dispatch(setCheckAllAdvancedSearchBy(e.target.checked));
                }
              }
            }}
          />
          <label htmlFor="all" className="mx-2">
            All
          </label>
        </div>

        {checkboxesArrayList?.map((checkbox) => (
          <div key={checkbox.id} className="form-group d-flex margin-box-5-fix">
            <input
              type="checkbox"
              className="form-check-input"
              id={checkbox.id}
              name={checkbox.id}
              value={advancedSearchByInputs[checkbox.id]}
              checked={advancedSearchByInputs[checkbox.id]}
              disabled={checkAllAdvancedSearchBy}
              onChange={(e) => {
                if (handleAdvancedSearchByInputsOnChange) {
                  handleAdvancedSearchByInputsOnChange(e);
                } else {
                  onChangeAdvancedSearchByInputs(e);
                }
              }}
            />
            <label htmlFor={checkbox.id} className="mx-2">
              {checkbox.label}
            </label>
          </div>
        ))}

        <div className="form-group d-flex margin-box-5-fix" /* hide-elements */>
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

      {MiscellaneousContent ? MiscellaneousContent : null}
    </div>
  );
};

AdvancedSearchByCheckboxes.propTypes = {
  checkboxesArrayList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  advancedSearchString: PropTypes.string.isRequired,
  checkAllAdvancedSearchBy: PropTypes.bool.isRequired,
  advancedSearchByInputs: PropTypes.objectOf(PropTypes.bool).isRequired,
  setAdvancedSearchString: PropTypes.func.isRequired,
  setCheckAllAdvancedSearchBy: PropTypes.func.isRequired,
  setAdvancedSearchByInputs: PropTypes.func.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  handleCheckAllAdvancedSearchByOnChange: PropTypes.func,
  handleAdvancedSearchByInputsOnChange: PropTypes.func,
  updateAdvancedSearchByPayload: PropTypes.func,
  MiscellaneousContent: PropTypes.node,
};

AdvancedSearchByCheckboxes.defaultProps = {
  handleCheckAllAdvancedSearchByOnChange: null,
  handleAdvancedSearchByInputsOnChange: null,
  updateAdvancedSearchByPayload: null,
  MiscellaneousContent: null,
};

export default AdvancedSearchByCheckboxes;
