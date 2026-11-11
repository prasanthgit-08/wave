import React, { useEffect, useRef, useState } from "react";
import DealerGroupService from "../../../../services/DealerGroupService";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingIcon from "../../../common/LoadingIcon";
import CustomerUnitTypeGroupsService from "../../../../services/CustomerUnitTypeGroupsService";
import {
  setAssignSortFlag,
  setAssignSortValue,
  setTotalElementsUT,
  setTotalPagesUT,
  setUnitTypeGroupData,
} from "../../../../redux/CustomerUnitTypeGroupSlice";

const UnitTypeGroupsListing = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const assignSortFlag = useSelector((state) => state.customerUnitTypeGroupReducer.assignSortFlag);

  const assignSortValue = useSelector((state) => state.customerUnitTypeGroupReducer.assignSortValue);

  const pageNumberUT = useSelector((state) => state.customerUnitTypeGroupReducer.pageNumberUT);

  const unitTypeGroupData = useSelector((state) => state.customerUnitTypeGroupReducer.unitTypeGroupData);

  const radioValue = useSelector((state) => state.customerUnitTypeGroupReducer.radioValue);

  const isGroupLoading = useSelector((state) => state.customerUnitTypeGroupReducer.isGroupLoading);

  // Track requests currently in progress to prevent duplicate API calls.
  const requestInProgressRef = useRef(new Set());

  const listAssignedStates = () => {
    const requestKey = JSON.stringify({
      id,
      pageNumberUT,
      assignSortFlag,
      assignSortValue,
      radioValue,
    });

    // Avoid making the same API request while it is already running.
    if (requestInProgressRef.current.has(requestKey)) {
      return;
    }

    requestInProgressRef.current.add(requestKey);
    setLoading(true);

    CustomerUnitTypeGroupsService.getAssignedUnitTypeGroup(
      id,
      pageNumberUT,
      assignSortFlag,
      assignSortValue,
      radioValue
    )
      .then((response) => {
        dispatch(setUnitTypeGroupData(response?.data?.content));
        dispatch(setTotalElementsUT(response?.data?.totalElements));
        dispatch(setTotalPagesUT(response?.data?.totalPages));
      })
      .catch(() => {
        // Keep the existing error handling.
      })
      .finally(() => {
        requestInProgressRef.current.delete(requestKey);
        setLoading(false);
      });
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      if (radioValue != null) {
        listAssignedStates();
      }
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [id, pageNumberUT, assignSortValue, assignSortFlag, radioValue]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              onClick={() => {
                dispatch(setAssignSortFlag());
                dispatch(setAssignSortValue("description"));
              }}
              className="f-w-600"
            >
              Unit Type Groups
              {assignSortFlag && assignSortValue === "description" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!assignSortFlag && assignSortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {!loading &&
            unitTypeGroupData?.length !== 0 &&
            unitTypeGroupData?.map((item) => (
              <tr key={item.unitTypeGroupPK}>
                <td className="f-w-600">{item.description}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {!loading && unitTypeGroupData?.length === 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}

      {loading && !isGroupLoading && <LoadingIcon />}
    </div>
  );
};

export default UnitTypeGroupsListing;
