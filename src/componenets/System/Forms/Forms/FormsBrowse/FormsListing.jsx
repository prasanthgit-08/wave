import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormsService from "../../../../../services/FormsService";
import {
  setChangeColor,
  setId,
  setListingData,
  setSortFlag,
  setSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../../redux/FormsSlice";
import { useEffect } from "react";
import { t } from "i18next";
import LoadingText from "../../../../common/LoadingText";

function FormsListing({ loading, setLoading }) {
  const listingData = useSelector((state) => state.forms.listingData);
  const searchTerm = useSelector((state) => state.forms.searchTerm);
  const searchCriteria = useSelector((state) => state.forms.searchCriteria);
  const pageNumber = useSelector((state) => state.forms.pageNumber);
  const id = useSelector((state) => state.forms.id);
  const sortFlag = useSelector((state) => state.forms.sortFlag);
  const sortValue = useSelector((state) => state.forms.sortValue);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onhandleNormalSort = (value, val) => {
    dispatch(setSortValue(value));
    dispatch(setSortFlag(val));
  };

  const fetchFormData = () => {
    FormsService.getFormsForMaintenance(searchTerm, searchCriteria, pageNumber, sortValue, sortFlag)
      .then((response) => {
        const { data } = response;
        setLoading(false);
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchFormData();
    }, 500);
    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchCriteria, searchTerm, pageNumber, sortValue, sortFlag]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              onClick={() => {
                onhandleNormalSort("description", !sortFlag);
              }}
              className="f-w-600"
            >
              Description
              {sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            listingData.map((form) => (
              <tr
                key={form.formPK}
                className={id === form.formPK ? "tableSelected" : ""}

                onClick={() => dispatch(setId(null))}

                onDoubleClick={() => {
                  dispatch(setId(form.formPK));
                  dispatch(setViewDetail(true));
                  setTimeout(() => {
                    navigate(`/forms-maintenance/${form.formPK}/${pageNumber}`);
                  }, 40);
                }}
              >
                <td>{form.description}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {loading ? (
        <LoadingText />
      ) : (
        listingData.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("dealers.list.empty.message")}
          </h2>
        )
      )}
    </div>
  );
}

export default FormsListing;
