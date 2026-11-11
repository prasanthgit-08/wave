import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setChangeColor,
  setSelectedId,
  setNormalSortValue,
  setNormalSortFlag,
  setListingData,
  setTotalElements,
  setTotalPages,
  setLoader,
  setYardFK,
  setIsEmailUnique,
  setViewDetail,
} from "../../../../redux/YardEmailSlice";
import YardEmailService from "../../../../services/YardEmailService";

function TableListing({ loading, setLoading }) {
  const [loader, setLoader] = useState(true);

  const params = useParams();
  const yardFK = params.id;
  const listingData = useSelector((state) => state.yardEmailReducer.listingData);
  const pageNumber = useSelector((state) => state.yardEmailReducer.pageNumber);
  const SelectedId = useSelector((state) => state.yardEmailReducer.selectedId);
  const ChangeColor = useSelector((state) => state.yardEmailReducer.changeColor);
  const searchTerm = useSelector((state) => state.yardEmailReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.yardEmailReducer.searchCriteria);
  let sortFlag = useSelector((state) => state.yardEmailReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.yardEmailReducer.normalSortValue);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;
  };
  const fetchTableData = () => {
    setLoader(true);
    YardEmailService.getYardEmailData(searchTerm, searchCriteria, pageNumber, yardFK, sortValue, sortFlag)
      .then((response) => {
        const { data } = response;
        setLoader(false);
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [yardFK, searchTerm, searchCriteria, pageNumber, sortFlag]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("name", !sortFlag);
              }}
            >
              Name
              {sortFlag && sortValue === "name" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "name" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("email", !sortFlag);
              }}
            >
              Email
              {sortFlag && sortValue === "email" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "email" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>

        <tbody>
          {loader
            ? null
            : listingData.length >= 1 &&
              listingData.map((data) => (
                <tr
                  id="rowId"
                  key={data.yardEmailPK}
                  onClick={() => dispatch(setChangeColor(false))}
                  onDoubleClick={() => {
                    dispatch(setViewDetail(true));

                    dispatch(setSelectedId(data.yardEmailPK));
                    dispatch(setIsEmailUnique(false));
                    dispatch(setChangeColor(true));
                    setTimeout(() => {
                      navigate(
                        `/yard-email-maintenance/edit-record/${data.yardFK}/${data.yardEmailPK}/${pageNumber}`
                      );
                    }, 100);
                  }}
                  className={data.yardEmailPK === SelectedId && ChangeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600">{data.name} </td>
                  <td className="f-w-600">{data.email}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {loader ? (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
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

export default TableListing;
