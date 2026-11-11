/* eslint-disable react-hooks/exhaustive-deps */
import { t } from "i18next";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderEntryService from "../../../services/OrderEntryService";
import {
  setMiscDealerData,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setTotalElements,
  setTotalPages,
  setSelectedId,
  setLoading,
} from "../../../redux/LookupScreens/MiscDealerLookupSlice";
import { setMiscDeliveryID, setMiscPickupID } from "../../../redux/OrderEntryFilterSlice";
import { setMiscellaneousDealerId } from "../../../redux/UndispatchSlice";
import RerouteService from "../../../services/RerouteService";
import UnitAddressesService from "../../../services/UnitAddressesService";
import { Delayed_Breakdown_Fees_Base_URL } from "../../../services/constants/applicationConstants";

const TableListing = ({
  onHide,
  OEMiscPickupTab,
  OEMiscDeliveryTab,
  undispatch,
  handleLookupSelection,
  Reroute,
  companyPK,
  renderItemId,
  companyFK,
}) => {
  // -------------------------------------------------------------
  const [dealerListingData, setDealerListingData] = useState([]);
  const [adSort] = useState(false);

  const miscDealerData = useSelector((state) => state.miscDealerLookupReducer.miscDealerData);
  const changeColor = useSelector((state) => state.miscDealerLookupReducer.changeColor);
  const loading = useSelector((state) => state.miscDealerLookupReducer.loading);
  const selectedId = useSelector((state) => state.miscDealerLookupReducer.selectedId);
  const pageNumber = useSelector((state) => state.miscDealerLookupReducer.pageNumber);
  let sortFlag = useSelector((state) => state.miscDealerLookupReducer.normalSortFlag);
  let sortValue = useSelector((state) => state.miscDealerLookupReducer.normalSortValue);
  const showAdvanceSort = useSelector((state) => state.miscDealerLookupReducer.showAdvanceSort);
  const searchedDealer = useSelector((state) => state.miscDealerLookupReducer.searchedDealer);
  const selectedSearchCriteria = useSelector((state) => state.miscDealerLookupReducer.selectedSearchCriteria);
  const advanceSortingOrder = useSelector((state) => state.miscDealerLookupReducer.advanceSortingOrder);
  const searchTerms = useSelector((state) => state.miscDealerLookupReducer.searchTerms);
  const showAdvanceSearch = useSelector((state) => state.miscDealerLookupReducer.showAdvanceSearch);

  const [loading1, setLoading1] = useState(false);

  const dispatch = useDispatch();

  const fetchMiscDealer = async () => {
    OrderEntryService.fetchMiscDealer(
      pageNumber,
      searchedDealer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const data = response.data;
        const miscDealers = data.content?.map((dealer) => ({ ...dealer, name: dealer.name?.trim() }));
        dispatch(setMiscDealerData(miscDealers));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const fetchMiscDealerForReroute = async () => {
    RerouteService.fetchMiscDealer(
      pageNumber,
      searchedDealer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      companyPK
    )
      .then(({ data }) => {
        const pagination = data.slice(data.length - 1);
        const cleanedDealers = data
          .filter((item) => item.Type !== "Pagination") // Omit pagination entry
          .map((dealer) =>
            Object.fromEntries(
              Object.entries(dealer).map(([key, value]) => {
                const newKey = key.charAt(0).toLowerCase() + key.slice(1);
                let newValue = typeof value === "string" ? value?.trim() : value;
                if (newValue === undefined || newValue === null || newValue === "") {
                  newValue = "";
                }
                return [newKey, newValue];
              })
            )
          );

        dispatch(setMiscDealerData(cleanedDealers));
        dispatch(setTotalElements(pagination[0]?.totalElements));
        dispatch(setTotalPages(pagination[0]?.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const fetchMiscDealerCrossDB = async () => {
    dispatch(setLoading(true));
    UnitAddressesService.fetchMiscDealer(
      pageNumber,
      searchedDealer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      showAdvanceSearch,
      showAdvanceSort,
      companyFK
    )
      .then((response) => {
        const data = response.data;
        const listingData = data.filter((item) => item.Type !== "Pagination");
        const paginationData = data.slice(data.length - 1);

        dispatch(setMiscDealerData(listingData));
        if (paginationData) {
          dispatch(setTotalElements(paginationData[0]?.totalElements));
          dispatch(setTotalPages(paginationData[0]?.totalPages));
        }
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
    sortValue = value;
    sortFlag = val;
    if (Reroute) {
      fetchMiscDealerForReroute();
    } else if (undispatch) {
      fetchMiscDealerCrossDB();
    } else {
      fetchMiscDealer();
    }
  };

  const handleOEMiscPickupTab = (dealer, event) => {
    dispatch(setMiscPickupID(dealer.unitAddressPK));
    onHide();
  };

  const hanldeOEMiscDeliveryTab = (dealer, event) => {
    dispatch(setMiscDeliveryID(dealer.unitAddressPK));
    onHide();
  };

  const handleUndispatchSplittrip = (dealer, event) => {
    dispatch(setMiscellaneousDealerId(dealer.unitAddressPK || dealer.UnitAddressPK));
    onHide();
  };
  useEffect(() => {
    if (undispatch) {
      const debounceFunction = setTimeout(() => {
        fetchMiscDealerCrossDB();
      }, 100);

      return () => {
        clearTimeout(debounceFunction);
      };
    } else if (Reroute) {
      const debounceFunction = setTimeout(() => {
        fetchMiscDealerForReroute();
      }, 100);

      return () => {
        clearTimeout(debounceFunction);
      };
    } else {
      const debounceFunction = setTimeout(() => {
        fetchMiscDealer();
      }, 100);

      return () => {
        clearTimeout(debounceFunction);
      };
    }
  }, [selectedSearchCriteria, searchedDealer, advanceSortingOrder, pageNumber, showAdvanceSort, searchTerms]);

  useEffect(() => {
    if (miscDealerData != null) {
      setDealerListingData(miscDealerData);
    }
  }, [miscDealerData, sortFlag, sortValue]);

  const renderDealerListingData = dealerListingData.map((dealer) => (
    <tr
      id="rowId"
      key={(renderItemId && renderItemId(dealer)) || dealer.unitAddressPK}
      onClick={(event) => {
        /**
         * Calling different handler functions based on where the Lookup Screen is called from
         */
        if (OEMiscPickupTab) {
          handleOEMiscPickupTab(dealer, event);
        } else if (OEMiscDeliveryTab) {
          hanldeOEMiscDeliveryTab(dealer, event);
        } else if (undispatch) // added for Undispatch
        {
          handleUndispatchSplittrip(dealer, event);
        } else if (Reroute) {
          handleLookupSelection(dealer, event);
        }
        // TODO: add common functionalities here
        // *************************************
        dispatch(setSelectedId((renderItemId && renderItemId(dealer)) || dealer.unitAddressPK));
        dispatch(setChangeColor(true));
      }}
      onDoubleClick={(event) => {}}
      className={
        (renderItemId && renderItemId(dealer) === selectedId) ||
        (dealer.unitAddressPK === selectedId && changeColor)
          ? "tableSelected"
          : " "
      }
    >
      <td className="f-w-600"> {undispatch ? dealer.name : dealer.name} </td>
      <td className="f-w-600"> {undispatch ? dealer.city : dealer.city} </td>
      <td className="f-w-600"> {undispatch ? dealer.stateCode : dealer.stateCode} </td>
    </tr>
  ));

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                if (showAdvanceSort !== true)
                  if (adSort === false) {
                    onhandleNormalSort("name", !sortFlag);
                  }
              }}
            >
              {t("dealers.list.page.table.heading.name")}
              {showAdvanceSort !== true && sortFlag && sortValue === "name" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "name" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                if (showAdvanceSort !== true)
                  if (adSort === false) {
                    onhandleNormalSort("city", !sortFlag);
                  }
              }}
            >
              {t("dealers.list.page.table.heading.city")}
              {showAdvanceSort !== true && sortFlag && sortValue === "city" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "city" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                if (showAdvanceSort !== true)
                  if (adSort === false) {
                    onhandleNormalSort("stateCode", !sortFlag);
                  }
              }}
            >
              {t("dealers.list.page.table.heading.state")}
              {showAdvanceSort !== true && sortFlag && sortValue === "stateCode" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "stateCode" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        {!loading && dealerListingData.length !== 0 && <tbody>{renderDealerListingData}</tbody>}
      </table>
      {loading ? (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      ) : (
        dealerListingData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
