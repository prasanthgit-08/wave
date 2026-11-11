import React, { createRef, useEffect, useRef, useState } from "react";
import useDebouncer from "../../../hooks/useDebouncer";
import useOutsideClick from "../../../hooks/useOutsideClick";
import useInsideMouseMove from "../../../hooks/useInsideMouseMove";
import { removeLeadingWhitespace } from "../../../utils/utils";
import { useId } from "react";

const DropdownAutoComplete = ({
  /**
   * Required Props
   * **************
   */
  // Array required for dropdown
  arrayList = [],
  // searchTerm to enter inside the input field (use either local or redux state)
  searchString = "",
  // format searchString
  customFormatSearchString = false,
  // Function to handle searchTerm change, takes e.target.value as the argument
  handleSearchString = () => {},
  /**
   * API function call for setting value inside the dropdown array, takes searchString as the argument
   *    - fetches arrayList based on the searchString argument
   *    - the arrayList values passed to AutoCompleteDropdown should be trimmed
   *      (either from backend or frontend)
   */
  fetchDataBySearchString = () => {},
  // Function to return the required id/primaryKey to render | eg: dealer => dealer.dealerPK
  renderItemId = () => {},
  // Function to return the required field to render | eg: name, description, etc..
  renderItemField = () => {}, // dealer => dealer.name
  // -------------
  /**
   * Function to handle selection from dropdown
   * Set value for input field, set value for id, set value for selected object, etc...
   * Use either local state or global state (redux):
   *    - if you need the autocomplete value selected (and its id) outside the current component,
   *      then using global state will be better, otherwise use local state
   * You can also use the same function for Lookup & Autocomplete selection
   */
  onSelect = () => {},
  // --------------------
  /**
   * Function to call when the searchString is cleared/changed
   *    - Clear the value of id inside this function
   *    - pass any additional logic inside this function if required
   *    - this function is called when the searchString is cleared (emtpy string) or when it is changed..
   *      since a valid value should be selected from the autocomplete dropdown &
   *      the user cannot manully type/enter a valid value into the autocomplete input field
   *    - after clearing the id inside this function, we can check if the id is present or not
   *      & give appropraite border color using className property
   *      to indicate whether the value inside the AutoComplete input field is valid or not
   */
  clearInputCallback = () => {},
  handleAutoCompleteClose = () => {},
  // ----------------
  /**
   * Pass selectedId to display all values in dropdown when a value (with id) is already selected
   * (optional) use this property if the above feature is required..
   */
  selectedId = null,
  // ---------------
  /**
   * Pass 'borderRed' or 'borderGreen' class conditionally based on
   * whether the value inside the AutoCompleteDropdown is valid or not
   * Also pass other classes if required for styling changes
   */
  className = "",
  // --------------
  /**
   * Optional Props
   * **************
   */
  disabled = false,
  hidden = false,
  matchContains = false, // highlights first contains search matchingElement
  matchBeginning = false, // highlights first beginning search matchingElement (default)
  searchPlaceholder = "ENTER SEARCH TERM",
  hidePlaceholder = false,
  noResultsMessage = "No Records",
  maxLength = null,
  maxHeight = "250px",
  towardsTop = false,
  inputTextIndent = "",
  handleInputOnClick = () => {},
  loading = false,
  allowSearchOnLength = 0,
  setArrayList,
  // Usage Example - Implementation in Order Entry Custoemr Tab Pickup Plant
  // ***********************************************************************
  /* 
  const fetchPickupPlantdetailsByName = (string) => {
    OrderEntryService.fetchPickupPlantdetailsByName(selectedCustomerId, isCustomerDpu, string)
      .then((response) => {        
        const data = response.data.content;        
        const plantsList = data.content.map((plant) => ({...plant, name: plant.name?.trim()}));
        setPickupPlantDropdownData(plantsList);        
      })
  };
  const handlePickupPlantSelection = (plant) => {
    dispatch(setPickupPlantInput(plant.name));
    dispatch(setPickupCustomerPlantId(plant.customerPlantPK));
  }
  
  <AutoCompleteDropdown
    arrayList={pickupPlantDropdownData}
    searchString={pickupPlantInput}
    renderItemId={(plant) => plant.customerPlantPK}
    renderItemField={(plant) => plant.name}

    // if using local state
    handleSearchString={(string) => setPickupPlantInput(string)}
    // if using redux state
    handleSearchString={(string) => dispatch(setPickupPlantInput(string))}

    fetchDataBySearchString={fetchPickupPlantdetailsByName}

    onSelect={handlePickupPlantSelection}

    clearInputCallback={() => {
      dispatch(setPickupCustomerPlantId(null));      
    }}

    className={`${
      pickupAtPlant
        ? pickupCustomerPlantId === "" ||
          pickupCustomerPlantId === null ||
          pickupPlantInput === ""
          ? "borderRed"
          : "borderGreen"
        : ""
    }`}
    disabled={viewDetail}
  />

  */
}) => {
  // -------------------------------------------------------
  const [showDropdown, setShowDropdown] = useState(false);
  const [keyPressed, setKeyPressed] = useState(null);
  const [matchingElement, setMatchingElement] = useState(null);
  const [activeElementIndex, setActiveElementIndex] = useState(null);
  const [activeElement, setActiveElement] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [onFocusText, setOnFocusText] = useState(null);

  const uniqueId = useId();
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  // Initialize listItemRefs to be a ref object with its current property as an empty array
  const listItemRefs = useRef([]);
  /**
   * For each item in the arrayList, check if a ref already exists for that index.
   * If it does, use it; if not, create a new ref.
   */
  if (arrayList?.length > 0) {
    listItemRefs.current = arrayList?.map((_, i) => listItemRefs?.current[i] ?? createRef()); // ?? - Nullish Coalescing Operator
  }

  const fetchDataWithMinLength = (value) => {
    if (allowSearchOnLength > 0) {
      if (value?.length >= allowSearchOnLength) {
        fetchDataBySearchString(value);
      } else {
        setArrayList && setArrayList([]);
      }
    } else {
      fetchDataBySearchString(value);
    }
  };

  // Using custom hook for debouncing API call on event handler
  const debouncedSearchHandler = useDebouncer((value) => fetchDataWithMinLength(value), 500);

  // Event listener to capture the keystrokes
  const handleKeyDown = (e) => {
    if (e.key === "Tab" || e.key === "Enter") {
      setKeyPressed(e.key);
    } else {
      setShowDropdown(true);
    }

    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      if (activeElementIndex === null) {
        setActiveElementIndex(0);
      }
    }

    if (e.key === "ArrowUp" && activeElementIndex !== null && activeElementIndex > 0) {
      setActiveElementIndex(activeElementIndex - 1);
      setMatchingElement(null);
      setSelectedElement(null);
    }
    if (e.key === "ArrowDown" && activeElementIndex !== null && activeElementIndex < arrayList.length - 1) {
      setActiveElementIndex(activeElementIndex + 1);
      setMatchingElement(null);
      setSelectedElement(null);
    }

    if (e.key === "Escape") {
      setShowDropdown(false);
      setMatchingElement(null);
      setActiveElementIndex(null);
      setSelectedElement(null);
      inputRef.current.blur();
    }
  };

  /**
   * When user clicks outside the dropdown,
   * hide the dropdown, clear activeElement & matchingElement
   */
  useOutsideClick(wrapperRef, "autocomplete-parent", () => {
    setShowDropdown(false);
    setActiveElementIndex(null);
    setMatchingElement(null);
  });

  // When hovering over dropdown clear the activeElement
  useInsideMouseMove(dropdownRef, "autocomplete-dropdown", () => {
    setActiveElementIndex(null);
  });

  // Preloading API call
  useEffect(() => {
    if (!disabled && onFocusText !== null) {
      if (selectedId) {
        // if id is present show full list
        fetchDataBySearchString(onFocusText);
      } else {
        // else show the filtered list with searchString
        fetchDataWithMinLength(onFocusText);
      }
    }
  }, [disabled, onFocusText]);

  // For clearing states when searchString is empty
  useEffect(() => {
    if (searchString === "") {
      clearInputCallback && clearInputCallback();
      setActiveElementIndex(null);
      setMatchingElement(null);
      setSelectedElement(null);
    }
  }, [searchString]);

  // Finding a matching element whenever the searchString or arrayList changes
  useEffect(() => {
    if (searchString && arrayList.length > 0) {
      const matchingElement = arrayList?.find((element) => {
        if (matchContains)
          return renderItemField(element)?.toLowerCase().includes(searchString?.toLowerCase());
        if (matchBeginning)
          return renderItemField(element)?.toLowerCase().startsWith(searchString?.toLowerCase());
        // Default matching option - Beginning Search
        return renderItemField(element)?.toLowerCase().startsWith(searchString?.toLowerCase());
      });
      matchingElement && setMatchingElement(matchingElement);
    }
  }, [searchString, arrayList]);

  // Whenever the activeElementIndex changes, scroll the corresponding list item into view
  useEffect(() => {
    if (activeElementIndex !== null && listItemRefs.current[activeElementIndex]) {
      // referencing the acutal DOM element & invoke scrollIntoView()
      listItemRefs.current[activeElementIndex].current?.scrollIntoView({
        behavior: "auto", // auto, smooth
        block: "nearest", // start, center, end, nearest
        // inline: 'start' // start, center, end, nearest
      });
    }
  }, [activeElementIndex]);

  // Update activeElement as activeElementIndex changes
  useEffect(() => {
    if (activeElementIndex !== null) {
      const activeElement = arrayList?.find((_, index) => index === activeElementIndex);
      setActiveElement(activeElement);
    } else {
      setActiveElement(null);
    }
  }, [activeElementIndex]);

  // Tab/Enter autofill functionality
  useEffect(() => {
    // Handling the Tab/Enter functionality if a matching element (based on searchString) exists
    if ((keyPressed === "Tab" || keyPressed === "Enter") && matchingElement) {
      onSelect(matchingElement);
      setSelectedElement(matchingElement);
      setShowDropdown(false);
      setKeyPressed(null); // Reset the keyPressed state
      setMatchingElement(null);
      inputRef.current.blur();
    }

    // Handling Tab/Enter functionality with ArrowUp/ArrowDown Navigation
    if ((keyPressed === "Tab" || keyPressed === "Enter") && activeElement) {
      onSelect(activeElement);
      setSelectedElement(activeElement);
      setShowDropdown(false);
      setKeyPressed(null); // Reset the keyPressed state
      setActiveElement(null);
      inputRef.current.blur();
    }
  }, [keyPressed, matchingElement, activeElement]);

  // If selectedElement exists, set activeElement as selectedElement for navigation
  useEffect(() => {
    if (selectedElement) {
      setMatchingElement(null);
      const activeElementIndex = arrayList?.findIndex(
        (element) => renderItemId(element) === renderItemId(selectedElement)
      );
      setActiveElementIndex(activeElementIndex);
    }
  }, [selectedElement]);

  // If matchingElement exists, set activeElement as matchingElement for navigation
  useEffect(() => {
    if (matchingElement) {
      const activeElementIndex = arrayList?.findIndex(
        (element) => renderItemId(element) === renderItemId(matchingElement)
      );
      setActiveElementIndex(activeElementIndex);
    }
  }, [matchingElement]);

  return (
    <div className="autocomplete-parent input-group" ref={wrapperRef}>
      <input
        ref={inputRef}
        id={`autocompleteInput-${uniqueId}`}
        type="text"
        value={
          customFormatSearchString ? customFormatSearchString(searchString) : searchString?.toUpperCase()
        }
        className={`customFormControl autocomplete-input
          ${disabled ? "borderBlack" : className || ""}
          ${hidden ? "hide-elements" : ""}
        `}
        autoComplete="off"
        aria-autocomplete="list"
        onChange={(e) => {
          handleSearchString(removeLeadingWhitespace(e.target.value));
          clearInputCallback();
          setSelectedElement(null);
          // debouncing API call
          debouncedSearchHandler(e.target.value);
        }}
        onFocus={(e) => {
          setShowDropdown(true);
          if (selectedId) {
            // if id is present show full list
            // fetchDataBySearchString('');
            setOnFocusText("");
          } else {
            // else show the filtered list with searchString
            // fetchDataWithMinLength(searchString);
            setOnFocusText(searchString);
          }
        }}
        onBlur={(e) => {
          setTimeout(() => {
            setShowDropdown(false);
          }, 250);
        }}
        onClick={(e) => {
          if (handleInputOnClick) {
            handleInputOnClick(e);
          }
        }}
        onKeyDown={handleKeyDown}
        maxLength={maxLength}
        placeholder={hidePlaceholder || disabled ? "" : searchPlaceholder}
        disabled={disabled}
        style={{ textIndent: inputTextIndent }}
      />
      <div className={`autocomplete-icons-div ${disabled ? "hide-acd-div" : ""}`}>
        <i
          className="fa-solid fa-xmark autocomplete-close"
          name="autoCompleteClose"
          id="autoCompleteClose"
          onClick={() => {
            if (searchString) {
              handleSearchString("");
              fetchDataBySearchString("");
            }
            setShowDropdown(false);
            handleAutoCompleteClose && handleAutoCompleteClose();
          }}
        />
        <span className="autocomplete-line">|</span>
        <i
          className="fa-solid fa-chevron-down autocomplete-down-arrow"
          onClick={() => {
            if (selectedId) {
              setOnFocusText("");
              // fetchDataBySearchString('');
            } else {
              // fetchDataWithMinLength(searchString);
              setOnFocusText(searchString);
            }
            setShowDropdown(true);
          }}
        />
      </div>

      {showDropdown &&
        !loading &&
        (arrayList?.length > 0 ? (
          <ul
            ref={dropdownRef}
            className={`autocomplete-dropdown ${towardsTop ? "drop-up" : ""}`}
            style={{ maxHeight: maxHeight }}
          >
            {arrayList.map((item, index) => (
              <li
                ref={arrayList && listItemRefs.current[index]} // Attach the ref for corresponding list item using index
                key={renderItemId(item)}
                id="autoCompleteList"
                onClick={(e) => {
                  onSelect(item, e);
                  setSelectedElement(item);
                  setShowDropdown(false);
                }}
                className={`
                  ${activeElementIndex === index && "activeElement"}
                  ${
                    matchingElement &&
                    renderItemId(matchingElement) === renderItemId(item) /* ||
                      (selectedElement && renderItemId(selectedElement) === renderItemId(item)) */ &&
                    // Commented for record highlighting bugfix from Lookup
                    "matchingElement"
                  } 
                `}
              >
                {renderItemField(item)}
              </li>
            ))}
          </ul>
        ) : (
          <ul className={`autocomplete-dropdown ${towardsTop ? "drop-up" : ""}`}>
            <li onClick={() => handleSearchString("")}>{noResultsMessage}</li>
          </ul>
        ))}

      {showDropdown && loading && (
        <ul className={`autocomplete-dropdown ${towardsTop ? "drop-up" : ""}`}>
          <li onClick={() => {}}>Loading...</li>
        </ul>
      )}
    </div>
  );
};

export default DropdownAutoComplete;
