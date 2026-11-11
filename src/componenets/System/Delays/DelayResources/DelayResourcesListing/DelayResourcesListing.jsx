import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DelayResourceService from "../../../../../services/DelayResourceService";
import { useNavigate } from "react-router-dom";
import {
  setChangeColor,
  setId,
  setListingData,
  setSortFlag,
  setSortValue,
  setTotalElements,
  setTotalPages,
} from "../../../../../redux/DelayResourcesSlice";
import { useState } from "react";
import LoadingText from "../../../../common/LoadingText";

const DelayResourcesListing = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchTerm = useSelector((state) => state.delayResourcesFilter.searchTerm);
  const searchCriteria = useSelector((state) => state.delayResourcesFilter.searchCriteria);
  const pageNumber = useSelector((state) => state.delayResourcesFilter.pageNumber);
  const sortFlag = useSelector((state) => state.delayResourcesFilter.sortFlag);
  const sortValue = useSelector((state) => state.delayResourcesFilter.sortValue);
  const listingData = useSelector((state) => state.delayResourcesFilter.listingData);
  const selectedId = useSelector((state) => state.delayResourcesFilter.id);
  const changeColor = useSelector((state) => state.delayResourcesFilter.changeColor);

  // const [loading, setLoading] = useState(false);

  const fetchDelayResources = () => {
    setLoading(true);
    DelayResourceService.listDelayResources(pageNumber, searchTerm, searchCriteria, sortValue, sortFlag)
      .then(({ data }) => {
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setListingData(data.content));
        setLoading(true);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };
  const handleDoubleClick = (id) => {
    dispatch(setChangeColor(true));
    const debounceFunction = setTimeout(() => {
      navigate("/edit-delay-resources/" + id + "/" + pageNumber);
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchDelayResources();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchCriteria, searchTerm, pageNumber, sortFlag, sortValue]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                dispatch(setSortFlag(!sortFlag));
                dispatch(setSortValue("description"));
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
          </tr>
        </thead>
        <tbody>
          {!loading &&
            listingData?.map((resourse) => (
              <tr
                key={resourse.delayResourcePK}
                className={selectedId == resourse.delayResourcePK && changeColor ? "tableSelected" : ""}
                onClick={() => {
                  dispatch(setChangeColor(false));
                  dispatch(setId(resourse.delayResourcePK));
                }}
                onDoubleClick={() => {
                  handleDoubleClick(resourse.delayResourcePK);
                }}
              >
                <td className="f-w-600">{resourse.description}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {!loading && listingData.length === 0 && (
        <h2 className="empty-list" align="center">
          No Records Available
        </h2>
      )}
      {loading && <LoadingText />}
    </div>
  );
};

export default DelayResourcesListing;
