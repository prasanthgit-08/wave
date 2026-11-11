import { parseLocalDate } from "../../../../../../../utils/dateUtils";
import React, { useState, useEffect } from "react";
import { PaginationComponent } from "../../../../../../common/PaginationComponent";
import { EditMasterUnitSelection_RecordsPerPage } from "../../../../../../../services/constants/applicationConstants";
import { Col } from "react-bootstrap";
import { setPageNumber } from "../../../../../../../redux/CustomerPlantSearchFilterSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  setShuttlePageNumber,
  setShuttleSortFlag,
  setShuttleSortValue,
  setShuttleTotalElements,
  setShuttleTotalPages,
  setUnitShuttleDetailData,
  setUnitShuttlePK,
} from "../../../../../../../redux/UnitStatus/UnitStatusSlice";
import UnitStatusService from "../../../../../../../services/Units/UnitStatusService";
import { customFormatDate } from "../../../../../../../utils/validation/DateFormatUtils";
import { format } from "date-fns";
import LoadingText from "../../../../../../common/LoadingText";
import NoRecordsMessage from "../../../../../../common/NoRecordsMessage";
function Shuttle({ data, activeSubTab }) {
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState(null);
  const [changeColor, setChangeColor] = useState(false);
  const [unitShuttleData, setUnitShuttleData] = useState(data?.data || []);
  const shuttlePageNumber = useSelector((state) => state.unitStatusReducer.shuttlePageNumber);
  const shuttleTotalPages = useSelector((state) => state.unitStatusReducer.shuttleTotalPages);
  const shuttleTotalElements = useSelector((state) => state.unitStatusReducer.shuttleTotalElements);
  const shuttleSortFlag = useSelector((state) => state.unitStatusReducer.shuttleSortFlag);
  const shuttleSortValue = useSelector((state) => state.unitStatusReducer.shuttleSortValue);
  const UnitShuttlePK = useSelector((state) => state.unitStatusReducer.UnitShuttlePK);
  const selectedId = useSelector((state) => state.unitStatusReducer.selectedId);
  const [loading, setLoading] = useState(true);

  const onhandleNormalSort = (value, val) => {
    dispatch(setShuttleSortFlag(val));
    dispatch(setShuttleSortValue(value));
  };

  const handleRowClick = (item) => {
    setSelectedRow(item.UnitShuttlePK);
    dispatch(setUnitShuttlePK(item.UnitShuttlePK));
    setChangeColor(true);
    dispatch(
      setUnitShuttleDetailData({
        Driver: item.Driver,
        Pickup: item.Pickup,
        Delivery: item.Delivery,
        Amount: item.Amount,
        UnitNumber: item.UnitNumber,
        Company: item.Company,
        DateAdded: format(parseLocalDate(item.DateAdded), "yyyy-MM-dd"),
        Source: item.Source,
        ShuttleType: item.ShuttleType,
        AdditionalShuttle: item.AdditionalShuttle,
        SecondShuttleUserFK: item.SecondShuttleUserFK,
        ShuttleAmount: item.ShuttleAmount,
        WhatPickupDynamic: item.WhatPickupDynamic,
        WhatPickup: item.WhatPickup,
        WhatDelivery: item.WhatDelivery,
        WhatDeliveryDynamic: item.WhatDeliveryDynamic,
        YardRow: item.YardRow,
        YardPosition: item.YardPosition,
        SecondShuttleReason: item.SecondShuttleReason,
        Name: item.Name,
        PostDate: item.PostDate,
        EditUserFK: item.EditUserFK,
        EditDate: item.EditDate,
        PaidUserFK: item.PaidUserFK,
        PaidDate: item.PaidDate,
        DeniedUserFK: item.DeniedUserFK,
        DeniedDate: item.DeniedDate,
        DeniedReason: item.DeniedReason,
      })
    );
  };
  const getAllUnitNumbersList = () => {
    UnitStatusService.getUnitStatusDataForOpenBalance(
      selectedId,
      "Shuttles-Shuttle",
      shuttlePageNumber,
      7,
      shuttleSortValue,
      shuttleSortFlag
    )
      .then((response) => {
        const { data } = response;
        const listingData = data.filter((item) => item.Type !== "Pagination");
        const paginationData = data.find((item) => item.Type === "Pagination");
        setUnitShuttleData(listingData);
        dispatch(setUnitShuttlePK(listingData.UnitShuttlePK));
        if (paginationData) {
          dispatch(setShuttleTotalElements(paginationData.TotalElements));
          dispatch(setShuttleTotalPages(paginationData.TotalPages));
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (selectedId && activeSubTab === "shuttle") {
      getAllUnitNumbersList();
    }
  }, [shuttlePageNumber, shuttleSortValue, shuttleSortFlag, activeSubTab]);

  const paginationProps = {
    pageNumber: shuttlePageNumber,
    setPageNumber: setShuttlePageNumber,
    totalPages: shuttleTotalPages,
    totalElements: shuttleTotalElements,
    listingData: unitShuttleData,
  };
  return (
    <div className="p-1 ps-2">
      <Col xs={12}>
        <div className="d-flex h-500px mt-4" style={{ marginLeft: "70px", marginRight: "70px" }}>
          <div className="w-100 border border-2 border-dark">
            <div className="fixTableHead unitSelection">
              <table className="table table-striped f-w-600">
                <thead>
                  <tr disabled>
                    <th
                      className="f-w-600 col-3"
                      onClick={() => {
                        onhandleNormalSort("Driver", !shuttleSortFlag);
                      }}
                    >
                      Driver{" "}
                      {shuttleSortFlag && shuttleSortValue === "Driver" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!shuttleSortFlag && shuttleSortValue === "Driver" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      className="f-w-600 col-4"
                      onClick={() => {
                        onhandleNormalSort("Pickup", !shuttleSortFlag);
                      }}
                    >
                      Pickup{" "}
                      {shuttleSortFlag && shuttleSortValue === "Pickup" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!shuttleSortFlag && shuttleSortValue === "Pickup" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      className="f-w-600 "
                      onClick={() => {
                        onhandleNormalSort("Delivery", !shuttleSortFlag);
                      }}
                    >
                      Delivery{" "}
                      {shuttleSortFlag && shuttleSortValue === "Delivery" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!shuttleSortFlag && shuttleSortValue === "Delivery" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      className="f-w-600 col-2"
                      onClick={() => {
                        onhandleNormalSort("Amount", !shuttleSortFlag);
                      }}
                    >
                      {" "}
                      Amount{" "}
                      {shuttleSortFlag && shuttleSortValue === "Amount" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!shuttleSortFlag && shuttleSortValue === "Amount" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {unitShuttleData.length > 0 &&
                    unitShuttleData.map((item, index) => (
                      <tr
                        key={index}
                        onClick={() => handleRowClick(item)}
                        style={{ cursor: "pointer" }}
                        className={`${item.UnitShuttlePK === selectedRow && changeColor ? "tableSelected" : ""}`}
                      >
                        <td>{item.Driver}</td>
                        <td>{item.Pickup}</td>
                        <td>{item.Delivery}</td>
                        <td>{item.Amount}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {loading && <LoadingText smallerFont />}
              {!loading && unitShuttleData?.length === 0 && <NoRecordsMessage />}
            </div>
          </div>
          <PaginationComponent
            {...paginationProps}
            recordsPerPage={EditMasterUnitSelection_RecordsPerPage}
            firstPage
            lastPage
            singleArrowUp
            singleArrowDown
          />
        </div>
      </Col>
    </div>
  );
}

export default Shuttle;
