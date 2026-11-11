import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingText from "../../../../../common/LoadingText";
import {
  setNotes,
  setResourceNormalSortFlag,
  setResourceTotalElements,
  setResourceList,
  setResourceNormalSortValue,
  setResourceTotalPages,
} from "../../../../../../redux/DispatchDelay/DamageProcessing/DamageSlice";
import DelayDamageService from "../../../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";

const ResourcesListing = () => {
  const [loading, setLoading] = useState(false);
  const { companyName, driverfk, unitfk } = useParams();
  const dispatch = useDispatch();
  const [clickedRowIndex, setClickedRowIndex] = useState(null);
  const { resourcePageNumber, resourceNormalSortValue, resourceNormalSortFlag, resourceList } = useSelector(
    (state) => state.damageReducer
  );

  /**
   *  used to get listing data
   **/

  const getDamageDetails = () => {
    setLoading(true);
    DelayDamageService.getNewDelayDamgeDetails(
      "Resources",
      unitfk,
      companyName,
      resourcePageNumber,
      10,
      resourceNormalSortValue,
      resourceNormalSortFlag
    )
      .then((response) => {
        const { data } = response;
        const paginationObject = data?.find((item) => item.Type === "Pagination");
        const resources = data?.filter((item) => item.Type !== "Pagination");

        dispatch(setResourceList(resources));

        if (paginationObject) {
          dispatch(setResourceTotalElements(paginationObject?.TotalElements));
          dispatch(setResourceTotalPages(paginationObject?.TotalPages));
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (unitfk) {
      getDamageDetails();
    }
  }, [unitfk, resourcePageNumber, resourceNormalSortFlag, resourceNormalSortValue]);

  const handleNormalSort = (val, data) => {
    dispatch(setResourceNormalSortValue(val));
    dispatch(setResourceNormalSortFlag(data));
  };
  return (
    <div className="fixTableHead">
      <div>
        <table className="table table-striped f-w-600 mb-0">
          <thead>
            <tr disabled>
              <th
                className="f-w-600"
                onClick={() => {
                  handleNormalSort("Description", !resourceNormalSortFlag);
                }}
              >
                Description
                {resourceNormalSortFlag && resourceNormalSortValue === "Description" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!resourceNormalSortFlag && resourceNormalSortValue === "Description" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-500"
                onClick={() => {
                  handleNormalSort("Phone", !resourceNormalSortFlag);
                }}
              >
                Phone
                {resourceNormalSortFlag && resourceNormalSortValue === "Phone" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!resourceNormalSortFlag && resourceNormalSortValue === "Phone" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? null
              : resourceList?.length >= 1 &&
                resourceList?.map((data, index) => (
                  <tr
                    id="rowId"
                    key={index}
                    onClick={() => {
                      setClickedRowIndex(index);
                      dispatch(setNotes(data?.Notes));
                    }}
                    className={clickedRowIndex === index ? "tableSelected" : ""}
                  >
                    <td className="f-w-600 ">{data?.Description}</td>
                    <td className="f-w-600 ">{data?.Phone}</td>
                  </tr>
                ))}
          </tbody>
        </table>
        {loading
          ? ""
          : resourceList?.length === 0 && (
              <h2 className="empty-list" align="center">
                No Records Available
              </h2>
            )}
        {loading && <LoadingText />}
      </div>
    </div>
  );
};

export default ResourcesListing;
