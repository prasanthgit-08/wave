import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import useOutsideClick from "../../hooks/useOutsideClick";

/**
 * SelectDropdown
  // Usage Example For Design
  // ************************
  <SelectDropdown
    arrayList={[]}
    selectedId={null}
    renderItemId={(item) => item.id}
    renderItemField={(item) => item.name}
    onSelect={(item) => {}}
    className=""
    placeholder="SELECT"
    noResultsMessage="No Records"
    maxHeight="250px"
    towardsTop={false}
    disabled={false}
    loading={false}
  />
*/

const SelectDropdown = ({
  // Array required for dropdown
  arrayList = [],
  // Function to return the required id/primaryKey to render | eg: user => user.userPK
  renderItemId = () => {},
  // Function to return the required field to render | eg: name, description, etc..
  renderItemField = () => {},
  // Id of the currently selected item, used to display the value inside the input field
  selectedId = null,
  /**
   * Function to handle selection from dropdown
   *    - the selected item is passed as the argument
   *    - null is passed when the '--Select--' option is clicked (unselect),
   *      so clear the id inside this function | eg: (item) => setPeriod(item ? item.periodID : "")
   */
  onSelect = () => {},
  /**
   * Pass 'borderRed' or 'borderGreen' class conditionally based on
   * whether the value inside the SelectDropdown is valid or not
   * Also pass other classes if required for styling changes
   */
  className = "",
  // Optional Props
  placeholder = "SELECT",
  noResultsMessage = "No Records",
  maxHeight = "250px",
  // Open the list above the input field instead of below it
  towardsTop = false,
  disabled = false,
  // Shows 'Loading...' in the open list instead of the items while the list is being fetched
  loading = false,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  // The exact row the user clicked. Several rows can share the same id (e.g. two records with the
  // same VIN), and matching on id alone would highlight all of them.
  const [clickedItem, setClickedItem] = useState(null);
  const wrapperRef = useRef(null);

  // Prefer the clicked row while it is still in the list and still holds the selected id; otherwise
  // (value set from outside, cleared, reset, list reloaded) fall back to the first matching row.
  const selectedItem =
    clickedItem && arrayList?.includes(clickedItem) && renderItemId(clickedItem) === selectedId
      ? clickedItem
      : arrayList?.find((item) => renderItemId(item) === selectedId);

  const handleSelect = (item) => {
    setClickedItem(item);
    onSelect(item);
    setShowDropdown(false);
  };

  // When user clicks outside the dropdown, hide the dropdown
  useOutsideClick(wrapperRef, "autocomplete-parent", () => setShowDropdown(false));

  const toggleDropdown = () => {
    if (disabled) return;
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="autocomplete-parent input-group" ref={wrapperRef}>
      <input
        type="text"
        readOnly
        value={selectedItem ? renderItemField(selectedItem)?.toUpperCase() : ""}
        className={`customFormControl autocomplete-input ${className || ""}`}
        placeholder={disabled ? "" : placeholder}
        disabled={disabled}
        onClick={toggleDropdown}
        // the readonly input gets a grey background by default, keep it white while enabled
        style={{ cursor: disabled ? "" : "pointer", backgroundColor: disabled ? "" : "#fff" }}
      />
      <div className={`autocomplete-icons-div ${disabled ? "hide-acd-div" : ""}`}>
        <i className="fa-solid fa-chevron-down autocomplete-down-arrow" onClick={toggleDropdown} />
      </div>

      {showDropdown && (
        <ul
          className={`autocomplete-dropdown select-dropdown-list ${towardsTop ? "drop-up" : ""}`}
          style={{ maxHeight: maxHeight }}
        >
          {loading ? (
            <li>Loading...</li>
          ) : arrayList?.length > 0 ? (
            <>
              <li className={!selectedItem ? "matchingElement" : ""} onClick={() => handleSelect(null)}>
                --Select--
              </li>
              {arrayList.map((item, index) => (
                <li
                  // index keeps keys unique when rows share an id
                  key={`${renderItemId(item)}-${index}`}
                  className={item === selectedItem ? "matchingElement" : ""}
                  onClick={() => handleSelect(item)}
                >
                  {renderItemField(item)}
                </li>
              ))}
            </>
          ) : (
            <li>{noResultsMessage}</li>
          )}
        </ul>
      )}
    </div>
  );
};

SelectDropdown.propTypes = {
  arrayList: PropTypes.arrayOf(PropTypes.object),
  renderItemId: PropTypes.func,
  renderItemField: PropTypes.func,
  selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelect: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  noResultsMessage: PropTypes.string,
  maxHeight: PropTypes.string,
  towardsTop: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

export default SelectDropdown;
