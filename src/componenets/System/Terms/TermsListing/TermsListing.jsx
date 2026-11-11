import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TermsService from "../../../../services/TermsService";
import {
  setChangeColor,
  setId,
  setListingData,
  setTotalElements,
  setViewDetail,
  setTotalPages,
  setNormalSortValue,
  setNormalSortFlag,
} from "../../../../redux/TermsSlice";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import LoadingText from "../../../common/LoadingText";

function TermsListing({ loading, setLoading }) {
  const searchTerm = useSelector((state) => state.termsReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.termsReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.termsReducer.pageNumber);
  const changeColor = useSelector((state) => state.termsReducer.changeColor);
  const listingData = useSelector((state) => state.termsReducer.listingData);
  const id = useSelector((state) => state.termsReducer.id);
  const navigate = useNavigate();
  let sortValue = useSelector((state) => state.termsReducer.normalSortValue);
  let sortFlag = useSelector((state) => state.termsReducer.normalSortFlag);

  const handleDoubleClick = (value) => {
    dispatch(setId(value));
    dispatch(setChangeColor(true));
    dispatch(setViewDetail(true));
    navigate(`/terms-browse/${value}/${pageNumber}`);
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  const dispatch = useDispatch();

  const fetchTermsData = () => {
    setLoading(true);
    TermsService.getAllTerms(searchCriteria, searchTerm, pageNumber, sortValue, sortFlag)
      .then((response) => {
        const { data } = response;
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchTermsData();
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
              className="f-w-600 col-4"
              onClick={() => {
                onhandleNormalSort("description", !sortFlag);
              }}
            >
              Description
              {sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("terms", !sortFlag);
              }}
            >
              Terms
              {sortFlag && sortValue === "terms" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "terms" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>

        <tbody>
          {!loading &&
            listingData?.map((terms) => (
              <tr
                key={terms.termsPK}
                className={id === terms.termsPK && changeColor ? "tableSelected" : ""}
                onClick={() => {
                  dispatch(setId(terms.termsPK));
                }}
                onDoubleClick={() => {
                  handleDoubleClick(terms.termsPK);
                }}
              >
                <td>{terms.description}</td>
                <td>{terms.terms}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading ? (
        <LoadingText />
      ) : (
        listingData?.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("dealers.list.empty.message")}
          </h2>
        )
      )}
    </div>
  );
}

export default TermsListing;
