import React, { useEffect, useState } from "react";
import LoadingText from "../../../common/LoadingText";
import { useDispatch } from "react-redux";
import CheckRejectedLoadService from "../../../../services/CheckRejectedLoadService";
import {
  addToResetList,
  removeFromResetList,
  setBrowseData,
  setCheckPageNumber,
  setNormalSortFlag,
  setNormalSortValue,
  setTotalElements,
  setTotalPages,
} from "../../../../redux/CheckRejectedLoadsSlice";
import { useSelector } from "react-redux";
import { customFormatDate } from "../../../../utils/validation/DateFormatUtils";
import TruncatedStringWithTooltip from "../../../common/TruncatedStringWithTooltip";
import LoadingIcon from "../../../common/LoadingIcon";

const CheckRejectedList = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [numberOfElements, setNumberOfElements] = useState(null);
  const checkPageNumber = useSelector((state) => state.checkRejectedLoadReducer.checkPageNumber);
  const normalSortFlag = useSelector((state) => state.checkRejectedLoadReducer.normalSortFlag);
  const normalSortValue = useSelector((state) => state.checkRejectedLoadReducer.normalSortValue);
  const browseData = useSelector((state) => state.checkRejectedLoadReducer.browseData);
  const resetList = useSelector((state) => state.checkRejectedLoadReducer.resetList);
  const resetFlag = useSelector((state) => state.checkRejectedLoadReducer.resetFlag);

  const fetchBrowseData = () => {
    setLoading(true);
    CheckRejectedLoadService.getCheckRejectedBrowseData(checkPageNumber, 16, normalSortValue, normalSortFlag)
      .then(({ data }) => {
        dispatch(setBrowseData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        setIsFirstPage(data.first);
        setIsLastPage(data.last);
        setNumberOfElements(data.numberOfElements);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (isLastPage && !isFirstPage && numberOfElements === 0) {
      dispatch(setCheckPageNumber(checkPageNumber - 1));
    }
  }, [isFirstPage, isLastPage, numberOfElements]);

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchBrowseData();
    }, 500);
    return () => {
      clearTimeout(debounceFunction);
    };
  }, [checkPageNumber, normalSortFlag, normalSortValue, resetFlag]);

  const handleNormalSort = (val, data) => {
    dispatch(setNormalSortValue(val));
    dispatch(setNormalSortFlag(data));
  };

  return (
    <div className="fixTableHead ">
      {loading && <LoadingIcon />}
      <div>
        <table className="table table-striped f-w-600 ">
          <thead>
            <tr disabled>
              <th className="f-w-600" style={{ width: "70px" }}>
                Reset
              </th>
              <th
                th
                style={{ width: "230px" }}
                onClick={() => {
                  handleNormalSort("driverName", !normalSortFlag);
                }}
              >
                Driver
                {normalSortFlag && normalSortValue === "driverName" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!normalSortFlag && normalSortValue === "driverName" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th className="f-w-600" style={{ width: "240px" }}>
                Unit Number
              </th>
              <th className="f-w-600" style={{ width: "140px" }}>
                Amount
              </th>
              <th className="f-w-600" style={{ width: "110px" }}>
                Date
              </th>
              <th className="f-w-600" style={{ width: "700px" }}>
                Result
              </th>
            </tr>{" "}
          </thead>
          <tbody>
            {!loading &&
              browseData?.map((item, index) => (
                <tr id="rowId" key={index} onClick={() => {}}>
                  {" "}
                  <td className="f-w-100">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="multiUnitRelease"
                      name="multiUnitRelease"
                      checked={resetList.includes(item.debitCardDetailPK)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          dispatch(addToResetList(item.debitCardDetailPK));
                        } else {
                          dispatch(removeFromResetList(item.debitCardDetailPK));
                        }
                      }}
                    />
                  </td>
                  <td>
                    <TruncatedStringWithTooltip text={item.driverName} charLimit={15} />
                  </td>
                  <td>
                    <TruncatedStringWithTooltip text={item.comment} charLimit={15} />
                  </td>
                  <td className="f-w-600"> {item.postAmount} </td>
                  <td className="f-w-600"> {customFormatDate(item.addDate)} </td>
                  <td>
                    <TruncatedStringWithTooltip text={item.result} charLimit={50} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {browseData?.length === 0 && !loading && (
          <h2 className="empty-list" align="center">
            No Records Available
          </h2>
        )}

        {loading && <LoadingText />}
      </div>
    </div>
  );
};

export default CheckRejectedList;
