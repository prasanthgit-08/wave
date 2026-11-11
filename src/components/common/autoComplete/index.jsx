import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useId } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";
import useDebouncer from "../../../hooks/useDebouncer";
import useInsideMouseMove from "../../../hooks/useInsideMouseMove";
import { removeLeadingWhitespace } from "../../../utils/utils";
import { runWithAbortSignal } from "../../../config/axiosInterceptors";

const AutoComplete = ({
  arrayList = [],
  searchString = "",
  handleSearchString = () => {},
  onSelect = () => {},
  clearInputCallback = () => {},
  handleAutoCompleteClose = () => {},
  renderItemId = () => {},
  renderItemField = () => {},
  // fetchDataBySearchString, // optional manual fetch
  queryKey, // optional - for react query integration
  queryFn, // optional - for react query integration
  allowSearchOnLength = 0,
  setArrayList,
  disabled = false,
  className = "",
  selectedId = null,
  towardsTop = false,
  matchContains = false,
  matchBeginning = true,
  searchPlaceholder = "ENTER SEARCH TERM",
  noResultsMessage = "No Records",
  onLoding, // optional - for react query integration
  getData, // optional - for react query integration
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [matchingElement, setMatchingElement] = useState(null);
  const [typing, setTyping] = useState(false);

  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const dropdownRef = useRef(null);
  const listItemRefs = useRef([]);
  const uniqueId = useId();

  // ---------------- Debounced search handler ----------------
  const debouncedSearchHandler = useDebouncer((value) => {
    try {
      if (queryFn && queryKey) {
        refetch({ cancelRefetch: false }); // React Query refetch, reuses the in-flight call (if any)
      }
    } finally {
      setTyping(false);
    }
  }, 500);

  // ---------------- React Query integration ----------------
  let searchText = selectedId ? "" : searchString;
  const {
    data: queryData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: queryKey ? [...queryKey, searchText] : ["dropdown-autocomplete"],
    /**
     * React Query aborts the signal when the searchText (queryKey) changes before the call finishes,
     * runWithAbortSignal attaches it to the axios call, so the old API call is cancelled
     */
    queryFn: ({ signal }) =>
      queryFn ? runWithAbortSignal(signal, () => queryFn(searchText)) : Promise.resolve([]),
    enabled: false, // manual control
  });

  /**
   * Direct fetch (focus/arrow click) supersedes the pending debounced call,
   * avoids duplicate API calls (eg: paste + click on the input)
   */
  const fetchLatest = () => {
    debouncedSearchHandler.cancel();
    setTyping(false);
    refetch({ cancelRefetch: false });
  };

  let dataList = queryData?.content || queryData?.data?.content || queryData?.data || [];
  dataList = [...dataList, ...arrayList];
  // ---------------- Outside click & hover logic ----------------
  useOutsideClick(wrapperRef, "autocomplete-parent", () => {
    setShowDropdown(false);
    setActiveIndex(null);
  });

  useInsideMouseMove(dropdownRef, "autocomplete-dropdown", () => {
    setActiveIndex(null);
  });

  // ---------------- Input change handling ----------------
  const handleChange = (e) => {
    const value = removeLeadingWhitespace(e.target.value);
    clearInputCallback();
    handleSearchString(value);
    setTyping(true);
    setShowDropdown(true);

    if (allowSearchOnLength > 0 && value.length < allowSearchOnLength) {
      setArrayList && setArrayList([]);
      return;
    }

    debouncedSearchHandler(value);
  };

  // ---------------- Effects ----------------
  useEffect(() => {
    if (searchString === "") {
      clearInputCallback();
      setActiveIndex(null);
      setMatchingElement(null);
      // setSelectedElement(null);
    }
  }, [searchString]);

  useEffect(() => {
    if (searchString && dataList?.length > 0) {
      const match = dataList?.find((item) => {
        const text = renderItemField(item)?.toLowerCase();
        const term = searchString?.toLowerCase();
        if (matchContains) return text?.includes(term);
        if (matchBeginning) return text?.startsWith(term);
        return text?.startsWith(term);
      });
      setMatchingElement(match || null);
    }
  }, [searchString, dataList]);

  useEffect(() => {
    let loadingState = isFetching || typing;
    if (onLoding) {
      onLoding(loadingState);
    }
    if (getData) {
      getData(dataList);
    }
  }, [isFetching, typing]);

  // ---------------- Keyboard navigation handling ----------------
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showDropdown || isFetching || typing || dataList.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => (prev === null || prev === dataList.length - 1 ? 0 : prev + 1));
          break;

        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => (prev === null || prev === 0 ? dataList.length - 1 : prev - 1));
          break;

        case "Enter":
        case "Tab":
          if (activeIndex !== null) {
            e.preventDefault();
            const selectedItem = dataList[activeIndex];
            onSelect(selectedItem);
            setShowDropdown(false);
            setActiveIndex(null);
            inputRef.current.blur();
          } else if (matchingElement) {
            e.preventDefault();
            onSelect(matchingElement);
            setShowDropdown(false);
            setMatchingElement(null);
            inputRef.current.blur();
          }
          break;

        case "Escape":
          setShowDropdown(false);
          setActiveIndex(null);
          break;

        default:
          break;
      }
    };

    const input = inputRef.current;
    if (input) input.addEventListener("keydown", handleKeyDown);

    return () => {
      if (input) input.removeEventListener("keydown", handleKeyDown);
    };
  }, [showDropdown, dataList, activeIndex, matchingElement, isFetching, typing]);

  // ---------------- Render ----------------
  return (
    <div className="autocomplete-parent input-group" ref={wrapperRef}>
      <input
        ref={inputRef}
        id={`autocompleteInput-${uniqueId}`}
        type="text"
        value={searchString?.toUpperCase()}
        className={`customFormControl autocomplete-input ${!disabled && className}`}
        autoComplete="off"
        disabled={disabled}
        placeholder={searchPlaceholder}
        onChange={handleChange}
        onFocus={() => {
          if (selectedId) return;
          setShowDropdown(true);
          // if (queryFn && dataList?.length === 0) refetch();
          fetchLatest();
        }}
      />

      {/* icons */}
      <div className={`autocomplete-icons-div ${disabled ? "hide-acd-div" : ""}`}>
        <i
          className="fa-solid fa-xmark autocomplete-close"
          onClick={() => {
            handleSearchString("");
            clearInputCallback();
            setShowDropdown(false);
            handleAutoCompleteClose?.();
          }}
        />
        <span className="autocomplete-line">|</span>
        <i
          className="fa-solid fa-chevron-down autocomplete-down-arrow"
          onClick={() => {
            if (selectedId) return;
            setShowDropdown(true);
            // queryFn && dataList?.length === 0 && refetch();
            fetchLatest();
          }}
        />
      </div>

      {/* dropdown list */}
      {showDropdown && (
        <ul
          ref={dropdownRef}
          className={`autocomplete-dropdown ${towardsTop ? "drop-up" : ""}`}
          style={{ maxHeight: "250px" }}
        >
          {!isFetching &&
            !typing &&
            dataList.length > 0 &&
            dataList.map((item, index) => (
              <li
                key={renderItemId(item)}
                ref={(el) => (listItemRefs.current[index] = el)}
                onClick={() => {
                  onSelect(item);
                  setShowDropdown(false);
                }}
                className={`${activeIndex === index ? "activeElement" : ""} ${
                  matchingElement && renderItemId(matchingElement) === renderItemId(item)
                    ? "matchingElement"
                    : ""
                }`}
              >
                {renderItemField(item)}
              </li>
            ))}
        </ul>
      )}

      {showDropdown && (isFetching || typing) && (
        <ul className={`autocomplete-dropdown ${towardsTop ? "drop-up" : ""}`}>
          <li onClick={() => {}}>Loading...</li>
        </ul>
      )}

      {showDropdown && !isFetching && dataList.length === 0 && !typing && (
        <ul className={`autocomplete-dropdown ${towardsTop ? "drop-up" : ""}`}>
          <li onClick={() => fetchLatest()}>{noResultsMessage}</li>
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
