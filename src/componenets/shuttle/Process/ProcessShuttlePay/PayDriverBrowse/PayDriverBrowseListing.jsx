import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProcessPayService from "../../../../../services/ProcessPayService";
import {
  resetSelection,
  setNormalSortFlag,
  setNormalSortValue,
  setProcessPayData,
  setTotalElements,
  setTotalPages,
  updateProcessPayData,
  setLoading,
} from "../../../../../redux/ProcessPaySlice";
import { t } from "i18next";
import { setSelectedArrayList } from "../../../../../redux/ProcessPaySlice";
import LoadingText from "../../../../common/LoadingText";
import LoadingIcon from "../../../../common/LoadingIcon";

function PayDriverBrowseListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.processShuttlePayReducer.loading);
  const selectedDriverID = useSelector((state) => state.processShuttlePayReducer.selectedDriverID);
  const processPayData = useSelector((state) => state.processShuttlePayReducer.processPayData);
  const pageNumber = useSelector((state) => state.processShuttlePayReducer.pageNumber);
  const sortValue = useSelector((state) => state.processShuttlePayReducer.normalSortValue);
  const sortFlag = useSelector((state) => state.processShuttlePayReducer.normalSortFlag);
  const companyName = useSelector((state) => state.processShuttlePayReducer.companyName);
  const isCurrentCompany = useSelector((state) => state.processShuttlePayReducer.isCurrentCompany);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  const fetchAllUnitsForDrivers = () => {
    dispatch(setLoading(true));
    ProcessPayService.getAllUnitsForDrivers(
      pageNumber,
      selectedDriverID,
      sortValue,
      sortFlag,
      companyName,
      isCurrentCompany
    )
      .then((response) => {
        const data = response.data;
        if (data) {
          const proccessPayData = data.content?.map((data) => ({ ...data, post: false }));
          dispatch(setProcessPayData(proccessPayData));
          dispatch(setTotalElements(data.totalElements));
          dispatch(setTotalPages(data.totalPages));
        } else {
          dispatch(setProcessPayData([]));
        }
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    dispatch(setNormalSortValue(null));
    dispatch(setNormalSortFlag(false));
    dispatch(setSelectedArrayList([]));
    dispatch(resetSelection());
  }, []);

  useEffect(() => {
    if (selectedDriverID) {
      fetchAllUnitsForDrivers();
    } else {
      navigate("/shuttle-process-pay-driver-selection");
    }
  }, [selectedDriverID, pageNumber, sortValue, sortFlag, isCurrentCompany]);

  return (
    <div className="fixTableHead">
      {loading && <LoadingIcon />}
      <table className="table table-striped ">
        <thead>
          <tr disabled>
            <th className="f-w-600 col-1">Post</th>
            <th className="f-w-600 col-1">Shuttle Pay</th>
            <th
              className="f-w-600 col-2"
              onClick={() => {
                onhandleNormalSort("unitLast5", !sortFlag);
              }}
            >
              Unit Last 5
              {sortValue === "unitLast5" ? (
                sortFlag ? (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                ) : (
                  <i class="fa fa-sort-alpha-desc font-20 m-l-10" />
                )
              ) : null}
            </th>

            <th className="f-w-600 col-2">Shuttle Type</th>
            <th className="f-w-600 col-3">Pickup</th>
            <th className="f-w-600 col-3">Delivery</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? null
            : processPayData?.map((processpay, index) => (
                <tr key={processpay.unitShuttlePK + index} className={processpay.post ? "tableSelected" : ""}>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="post"
                      name="post"
                      checked={processpay.post}
                      onChange={(e) => {
                        dispatch(
                          updateProcessPayData({
                            index,
                            id: isCurrentCompany ? processpay.unitShuttlePK : processpay.sisterUnitShuttleFK,
                          })
                        );
                      }}
                    />
                  </td>
                  <td>{processpay.amount}</td>
                  <td>{processpay.unitLast5}</td>
                  <td>{processpay.shuttleType}</td>
                  <td>{processpay.pickUp}</td>
                  <td>{processpay.delivery}</td>
                </tr>
              ))}
        </tbody>
      </table>

      {loading ? (
        <LoadingText />
      ) : (
        processPayData?.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("dealers.list.empty.message")}
          </h2>
        )
      )}
    </div>
  );
}

export default PayDriverBrowseListing;
