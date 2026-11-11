import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FormTypesService from "../../../../../services/FormTypesService";
import {
  setListingData,
  setTotalPages,
  setTotalElements,
  setId,
  setChangeColor,
  setViewDetail,
  setNormalSortValue,
  setNormalSortFlag,
  setFormTypeValid,
} from "../../../../../redux/FormTypesSlice";
import LoadingText from "../../../../common/LoadingText";

function FormTypesListing({ loading, setLoading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageNumber = useSelector((state) => state.formTypes.pageNumber);
  const searchTerm = useSelector((state) => state.formTypes.searchTerm);
  const searchCriteria = useSelector((state) => state.formTypes.searchCriteria);
  const listingData = useSelector((state) => state.formTypes.listingData);
  const changeColor = useSelector((state) => state.formTypes.changeColor);
  const id = useSelector((state) => state.formTypes.id);
  const sortValue = useSelector((state) => state.formTypes.normalSortValue);
  const sortFlag = useSelector((state) => state.formTypes.normalSortFlag);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  const fetchFormTypeData = () => {
    setLoading(true);
    FormTypesService.getFormTypesForMaintenance(searchTerm, searchCriteria, pageNumber, sortValue, sortFlag)
      .then((response) => {
        const { data } = response;
        setLoading(false);
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
      fetchFormTypeData();
    }, 500);
    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchCriteria, searchTerm, pageNumber, sortValue, sortFlag]);

  const handleDoubleClick = (value) => {
    dispatch(setId(value));
    dispatch(setChangeColor(true));
    dispatch(setViewDetail(true));
    dispatch(setFormTypeValid(true));
    navigate(`/form-types/${value}/${pageNumber}`);
  };

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              onClick={() => {
                onhandleNormalSort("objectKey", !sortFlag);
              }}
              className="f-w-600 col-2 ps-2"
            >
              Object Key
              {sortFlag && sortValue === "objectKey" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "objectKey" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              onClick={() => {
                onhandleNormalSort("description", !sortFlag);
              }}
              className="f-w-600 col-4"
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
            listingData.map((formType) => (
              <tr
                key={formType.formTypePK}
                className={id === formType.formTypePK && changeColor ? "tableSelected" : ""}
                onClick={() => {
                  dispatch(setId(formType.formTypePK));
                }}
                onDoubleClick={() => {
                  handleDoubleClick(formType.formTypePK);
                }}
              >
                <td>{formType.objectKey}</td>
                <td>{formType.description}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {loading ? (
        <LoadingText />
      ) : (
        listingData?.length === 0 && (
          <h2 className="empty-list" align="center">
            No Records Available
          </h2>
        )
      )}
    </div>
  );
}

export default FormTypesListing;
