import { parseLocalDate } from "../../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DateInputField from "../../../../../common/DateInputField";
import DriverDeleaseService from "../../../../../../services/DriverDeleaseService";
import {
  setAddressed,
  setAddressedDate,
  setChangeColor,
  setCompletedCheckFlag,
  setDeleaseItemsListComplete,
  setDeleaseItemsListingData,
  setDriverDeleasedCheckedList,
  setDriverDeleaseitemsFullList,
  setIncompletedriverDeleaseitems,
  setItemsListingData,
  setItemsTotalElements,
  setItemsTotalPages,
  setItemDateValid,
} from "../../../../../../redux/DriverDeleaseSlice";
import { t } from "i18next";
import { setNormalSortFlag, setNormalSortValue } from "../../../../../../redux/DeleaseItemsSlice";
import formatDatetimeToDate from "../../../../../../utils/formatDateTimeToDate";

const ItemsTabBrowseList = () => {
  const { id, driverId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adSort] = useState(false);
  const [description, setDescription] = useState("");
  const [dateRequired, setDateRequired] = useState(false);
  const [addressedUserFK, setAddressedUserFK] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addressedUserName, setAddressedUserName] = useState("");
  const invalidItemDatePKs = useSelector((state) => state.driverDeleaseReducer.invalidItemDatePKs);
  const addressed = useSelector((state) => state.driverDeleaseReducer.addressed);
  const addressedDate = useSelector((state) => state.driverDeleaseReducer.addressedDate);
  const itemsListingData = useSelector((state) => state.driverDeleaseReducer.itemsListingData);
  const itemsPageNumber = useSelector((state) => state.driverDeleaseReducer.itemsPageNumber);
  const viewDetail = useSelector((state) => state.driverDeleaseReducer.viewDetail);
  const changeColor = useSelector((state) => state.driverDeleaseReducer.changeColor);
  const deleaseItemsListingData = useSelector((state) => state.driverDeleaseReducer.deleaseItemsListingData);
  const data = id ? itemsListingData : deleaseItemsListingData;
  const changedArray = useSelector((state) => state.driverDeleaseReducer.changedArray);
  const status = useSelector((state) => state.driverDeleaseReducer.status);
  const driverDeleasedCheckedList = useSelector(
    (state) => state.driverDeleaseReducer.driverDeleasedCheckedList
  );
  let normalSortValue = useSelector((state) => state.deleaseItemsReducer.normalSortValue);
  let normalSortFlag = useSelector((state) => state.deleaseItemsReducer.normalSortFlag);
  const driverDeleaseitemsFullList = useSelector(
    (state) => state.driverDeleaseReducer.driverDeleaseitemsFullList
  );
  const incompletedriverDeleaseitems = useSelector(
    (state) => state.driverDeleaseReducer.incompletedriverDeleaseitems
  );
  const completedCheckFlag = useSelector((state) => state.driverDeleaseReducer.completedCheckFlag);
  const allItemsCompletedFlag = useSelector((state) => state.driverDeleaseReducer.allItemsCompletedFlag);
  const deleaseItemsListComplete = useSelector(
    (state) => state.driverDeleaseReducer.deleaseItemsListComplete
  );
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
    normalSortValue = value;
    normalSortFlag = val;
  };

  const formatDate = (dateString) => {
    const date = parseLocalDate(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };
  /*****
   * API call to fetch the list
   * from Driver Delease Items
   * for edit operation
   * ******/
  const fetchDriverDeleaseItemsData = () => {
    DriverDeleaseService.getDriverDeleaseItems(id, itemsPageNumber, normalSortValue, normalSortFlag)
      .then((response) => {
        const { data } = response;
        setLoading(false);
        dispatch(setItemsListingData(data.content));
        dispatch(setItemsTotalElements(data.totalElements));
        dispatch(setItemsTotalPages(data.totalPages));
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  /******
   * Fetch all driver delease items list for the corresponding id
   * and extract the items where addressed= false to
   * IncompletedriverDeleaseitems
   * *****/
  const fetchAllDriverDeleaseItemsData = () => {
    DriverDeleaseService.getAllDriverDeleaseItemsList(id)
      .then((response) => {
        const fullList = response.data;
        /****Filter items where addressed is false****/
        const incompleteItems = fullList.filter((item) => item.addressed === false);
        setTimeout(() => {
          /***Dispatch the full list****/
          dispatch(setDriverDeleaseitemsFullList(fullList));
          /***Dispatch the filtered incomplete items list***/
          dispatch(setIncompletedriverDeleaseitems(incompleteItems));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /******
   * Fetch the complete list of Driver delease Items corresponding id
   *
   * *****/
  useEffect(() => {
    if (id) {
      fetchAllDriverDeleaseItemsData(id);
    }
  }, [id]);

  /******Fetch the complete List of Delease Items for
   * saving the Items in Driver Delease Items Table
   *
   * *****/
  const listDeleaseItemsData = () => {
    DriverDeleaseService.listAllDeleaseItems(driverId, status)
      .then((response) => {
        const fullList = response.data;
        /****Filter items where addressed is false****/
        setTimeout(() => {
          /****Dispatch the full  Delease Itms list****/
          dispatch(setDeleaseItemsListComplete(fullList));
        });
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    listDeleaseItemsData();
  }, [driverId, status]);
  /*******
   * To make the completed but enable/disable
   * based on the check whether all completed flags are checked
   *
   * ******/
  const compareLists = () => {
    if (id && incompletedriverDeleaseitems.length !== 0) {
      const checkedPKList = driverDeleasedCheckedList || [];
      const incompletePKSet = new Set(incompletedriverDeleaseitems.map((item) => item.driverDeleaseItemPK));
      const checkedPKSet = new Set(checkedPKList);
      const allItemsChecked = [...incompletePKSet].every((driverDeleaseItemPK) =>
        checkedPKSet.has(driverDeleaseItemPK)
      );
      dispatch(setCompletedCheckFlag(allItemsChecked));
    }
  };

  /********
   * Check whether all the Items
   * completed is checked in items tab
   * ****/
  useEffect(() => {
    if (id && incompletedriverDeleaseitems.length !== 0 && driverDeleasedCheckedList.length !== 0) {
      compareLists();
    }
  }, [id, driverDeleasedCheckedList, incompletedriverDeleaseitems]);

  /****Fetch Delease Items Data for add ***/
  const fetchDeleaseItemsData = () => {
    DriverDeleaseService.getDeleaseItems(driverId, itemsPageNumber, status, normalSortValue, normalSortFlag)
      .then((response) => {
        const { data } = response;
        setLoading(false);
        const modifiedList = data.content.map((element) => ({
          ...element,
          addressedDate: formatDatetimeToDate(element.addressedDate),
        }));
        dispatch(setDeleaseItemsListingData(modifiedList));
        dispatch(setItemsTotalElements(data.totalElements));
        dispatch(setItemsTotalPages(data.totalPages));
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  /******Hanlde checkbox changes *****/

  const handleCheckboxChange = (index, date, checked) => {
    const item = itemsListingData[index];
    const driverDeleaseItemPK = item.driverDeleaseItemPK;
    const isChecked = !item.addressed;
    /***Determine the new checked status
     * Update the addressed status and checked list
     * ***/
    dispatch(setAddressed(index));
    dispatch(setDriverDeleasedCheckedList({ driverDeleaseItemPK, isChecked }));
    /**Optionally, directly update the local state for immediate feedback
    This might involve using local component state or similar methods****/
    if (checked && !date) {
      dispatch(setAddressedDate({ index, date: new Date() }));
    }
  };

  const handleDateChange = (index, date) => {
    dispatch(setAddressedDate({ index, date }));
  };
  /****Fetch items from driver delease Items table */
  useEffect(() => {
    if (id) {
      fetchDriverDeleaseItemsData();
    } else if (status === "inactive" || status === "terminated") {
      fetchDeleaseItemsData();
    }
  }, [status, itemsPageNumber, normalSortValue, normalSortFlag]);

  const getDateFromChangedArray = (driverDeleaseItemPK) => {
    const item = changedArray.find((record) => record.driverDeleaseItemPK === driverDeleaseItemPK);
    return item
      ? item.addressedDate
        ? formatDatetimeToDate(item.addressedDate)
        : formatDatetimeToDate(new Date())
      : "";
  };

  /*****
   * For edit operation the list should be
   *  fetched from the DriverDeleaseItems table
   * for add operation the list
   * should be fetched from the Delease Items table
   * ****/
  /*****
   * Check whether the list of items in driverDeleaseitemsFullList
   * contains addressed flag is true
   ******/
  const checkAllItemsAddressed = () => {
    if (id) {
      /***Log the full list to verify its content***/
      /***Check if all items have addressed=true***/
      const allAddressed = driverDeleaseitemsFullList.every((item) => item.addressed === true);
      /***Dispatch the action to update the flag***/
      dispatch(setCompletedCheckFlag(allAddressed));
    } else {
      console.log("ID is not present, skipping check");
    }
  };
  useEffect(() => {
    checkAllItemsAddressed();
  }, [driverDeleaseitemsFullList, id]);

  return (
    <div className="fixTableHead ">
      <div>
        <table className="table table-striped f-w-600 mb-0">
          <thead>
            {/**If Id present then there should be 4 Table Heading if
             * Id not present then these should be only 1 table heading
             ***/}
            {id ? (
              <tr disabled>
                <th
                  className="f-w-600"
                  onClick={() => {
                    if (adSort === false) {
                      onhandleNormalSort("description", !normalSortFlag);
                    }
                  }}
                >
                  Description
                  {normalSortFlag && normalSortValue === "description" && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {!normalSortFlag && normalSortValue === "description" && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>{" "}
                <th className="f-w-800">Completed</th>
                <th className="f-w-600" style={{ width: "100px" }}>
                  Date Completed
                </th>
                {/* <th className="f-w-600"  >Completed By</th> */}
                <th className="f-w-600" style={{ textAlign: "center" }}>
                  Completed By
                </th>
              </tr>
            ) : (
              <tr>
                <th
                  className="f-w-600"
                  onClick={() => {
                    if (adSort === false) {
                      onhandleNormalSort("description", !normalSortFlag);
                    }
                  }}
                >
                  Description
                  {normalSortFlag && normalSortValue === "description" && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {!normalSortFlag && normalSortValue === "description" && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>
              </tr>
            )}
          </thead>
          <tbody>
            {/**If Id present then Page should show the details from
             *  Driver Delease Items table
             * If Id not present then page should show details from
             * Delease Items table
             ***/}
            {loading
              ? null
              : (id ? itemsListingData : deleaseItemsListingData)?.map((code, index) => (
                  <tr
                    id="rowId"
                    key={id ? code.driverDeleaseItemPK : code.deleaseItemPK}
                    onClick={(e) => dispatch(setChangeColor(false))}
                  >
                    <td className="f-w-600">{code.description}</td>
                    {id && (
                      <>
                        <td className="f-w-600" style={{ height: "43px" }}>
                          <input
                            type="checkbox"
                            className="form-check-input p-0"
                            id={`completed-${index}`}
                            name={`completed-${index}`}
                            checked={
                              code.addressed || driverDeleasedCheckedList.includes(code.driverDeleaseItemPK)
                            }
                            disabled={viewDetail || (code.addressed && code.alreadyAddressed)}
                            onChange={(e) =>
                              handleCheckboxChange(index, code.addressedDate, e.target.checked)
                            }
                          />
                        </td>
                        <td className="f-w-600">
                          {code.dateRequired && (
                            <DateInputField
                              date={code?.addressedDate}
                              max={new Date()}
                              name="completedDate"
                              className={`customFormControl ${
                                invalidItemDatePKs.includes(code.driverDeleaseItemPK) ? "borderRed" : ""
                              }`}
                              setDate={(date) => handleDateChange(index, date)}
                              setIsDateValid={(isValid) =>
                                dispatch(
                                  setItemDateValid({ driverDeleaseItemPK: code.driverDeleaseItemPK, isValid })
                                )
                              }
                              disabled={
                                viewDetail ||
                                (code.addressed && code.alreadyAddressed) ||
                                !driverDeleasedCheckedList.includes(code.driverDeleaseItemPK)
                              }
                            />
                          )}
                        </td>
                        {/* <td className="f-w-600">{code.addressed ? code.addressedUser : null}</td> */}
                        <td className="f-w-600" style={{ textAlign: "center" }}>
                          {code.addressed ? code.addressedUser : null}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
          </tbody>
        </table>
        {!loading && (id ? itemsListingData : deleaseItemsListingData)?.length === 0 && (
          <h2 className="empty-list" align="center" style={{ marginTop: "20px" }}>
            {t("AlternateContact.list.empty.message")}
          </h2>
        )}
      </div>
    </div>
  );
};

export default ItemsTabBrowseList;
