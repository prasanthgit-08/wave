import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setAssignSortFlag,
  setAssignSortValue,
  setUnitTypeList,
  setUnitTypeTotalElements,
  setUnitTypeTotalPages,
} from "../../../../redux/UnitTypeGroupSlice";
import UnitTypeGroupsService from "../../../../services/UnitTypeGroupsService";
import LoadingText from "../../../common/LoadingText";
const UnitTypeListing = () => {
  const dispatch = useDispatch();
  const unitTypePageNumber = useSelector((state) => state.unitTypeGroupReducer.unitTypePageNumber);
  const unitTypeList = useSelector((state) => state.unitTypeGroupReducer.unitTypeList);
  const assignSortFlag = useSelector((state) => state.unitTypeGroupReducer.assignSortFlag);
  const assignSortValue = useSelector((state) => state.unitTypeGroupReducer.assignSortValue);
  const radioValue = useSelector((state) => state.unitTypeGroupReducer.radioValue);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const listAssignedUnitTypes = () => {
    setLoading(true);
    UnitTypeGroupsService.getAssignedUnitTypes(
      id,
      unitTypePageNumber,
      assignSortFlag,
      assignSortValue,
      radioValue
    )
      .then((response) => {
        dispatch(setUnitTypeList(response.data.content));
        dispatch(setUnitTypeTotalElements(response.data.totalElements));
        dispatch(setUnitTypeTotalPages(response.data.totalPages));
      })
      .catch(() => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (!radioValue) return;
    const debounceFunction = setTimeout(() => {
      listAssignedUnitTypes();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [id, unitTypePageNumber, assignSortValue, assignSortFlag, radioValue]);

  return (
    <div className="fixTableHead">
      {
        <table className="table table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                onClick={() => {
                  dispatch(setAssignSortFlag());
                  dispatch(setAssignSortValue("descriptionLong"));
                }}
                className="f-w-600"
              >
                Description
                {assignSortFlag && assignSortValue === "descriptionLong" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!assignSortFlag && assignSortValue === "descriptionLong" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              unitTypeList.length !== 0 &&
              unitTypeList?.map((item) => (
                <tr>
                  <td className="f-w-600">{item.descriptionLong}</td>
                </tr>
              ))}
          </tbody>
        </table>
      }
      {loading ? (
        <LoadingText />
      ) : (
        unitTypeList?.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default UnitTypeListing;
