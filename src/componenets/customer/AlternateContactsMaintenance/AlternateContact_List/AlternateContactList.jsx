import React, { useEffect, useRef, useState } from "react";
import { t } from "i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setViewDetail,
  setChangeColor,
  setId,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedSearchCriteria,
  setSearchTerm,
  setAlternateContactData,
  setTotalElements,
  setTotalPages,
  setBrowseNavigation,
  setEditFormData,
} from "../../../../redux/AlternateContactSlice";
import AlternateContactService from "../../../../services/AlternateContactService";
import LoadingIcon from "../../../common/LoadingIcon";

/**
 * @param {boolean} loader - true while a list API call is pending (shared with the pagination component)
 * @param {Function} setLoader - setter for `loader`, owned by AlternateContactMainPage
 */
const AlternateContactList = ({ loader, setLoader }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Rows stay hidden only until the first response; later reloads keep them under the loader.
  const [initialLoading, setInitialLoading] = useState(true);
  const latestRequestId = useRef(0);
  const searchTerm = useSelector((state) => state.alternateContactReducer.searchTerm);
  const selectedSearchCriteria = useSelector((state) => state.alternateContactReducer.selectedSearchCriteria);
  const pageNumber = useSelector((state) => state.alternateContactReducer.pageNumber);
  const alternateContactData = useSelector((state) => state.alternateContactReducer.alternateContactData);
  const viewDetail = useSelector((state) => state.alternateContactReducer.viewDetail);
  const id = useSelector((state) => state.alternateContactReducer.id);
  const changeColor = useSelector((state) => state.alternateContactReducer.changeColor);
  const sortFlag = useSelector((state) => state.alternateContactReducer.normalSortFlag);

  const sortValue = useSelector((state) => state.alternateContactReducer.normalSortValue);

  // Only update the sort state; the debounced effect below refetches when it changes.
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  const fetchAlternateContact = () => {
    const requestId = ++latestRequestId.current;
    AlternateContactService.getAllAlternateContacts(
      selectedSearchCriteria,
      searchTerm,
      pageNumber,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const data = response?.data;
        dispatch(setAlternateContactData(data?.content || []));
        dispatch(setTotalElements(data?.totalElements || 0));
        dispatch(setTotalPages(data?.totalPages || 0));
        dispatch(setBrowseNavigation(data));
      })
      .catch(() => {})
      .finally(() => {
        // An older request finishing late must not hide the loader of a newer one.
        if (requestId !== latestRequestId.current) return;
        setInitialLoading(false);
        setLoader(false);
      });
  };

  useEffect(() => {
    // Show the loader for the whole wait (debounce + request) of search, sort and paging.
    setLoader(true);
    const debounceFunction = setTimeout(() => {
      fetchAlternateContact();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag]);
  return (
    <div className="fixTableHead">
      {loader && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("contact", !sortFlag);
              }}
            >
              {t("AlternateContact.list.page.table.heading.contact")}
              {sortFlag && sortValue === "contact" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "contact" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {initialLoading
            ? null
            : alternateContactData?.map((contact) => (
                <tr
                  id="rowId"
                  key={contact.alternateContactPK}
                  onClick={(e) => dispatch(setChangeColor(false))}
                  onDoubleClick={(event) => {
                    dispatch(setId(contact.alternateContactPK));
                    dispatch(setChangeColor(true));
                    dispatch(setViewDetail(true));
                    dispatch(setEditFormData(null));
                    setTimeout(() => {
                      navigate("/add-alternate-contacts/" + contact.alternateContactPK + "/" + pageNumber);
                    }, 100);
                  }}
                  className={contact.alternateContactPK === id && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600">{contact.contact}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {initialLoading || loader
        ? ""
        : alternateContactData?.length === 0 && (
            <h2 className="empty-list" align="center">
              {t("AlternateContact.list.empty.message")}
            </h2>
          )}
    </div>
  );
};

export default AlternateContactList;
