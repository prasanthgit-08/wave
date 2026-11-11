import { parseLocalDate } from "../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import LoadingIcon from "../../../common/LoadingIcon";
import { PaginationComponent } from "../../../common/PaginationComponent";
import HoldService from "../../../../services/ComplianceHoldService/HoldService";
import { setTotalElementsData, setTotalPages, setPageNumber } from "../../../../redux/DriverHoldsSlice";
import ComplianceHeader from "./ComplianceHeader";
import ComplianceFooter from "./ComplianceFooter";

function ComplainceHoldContent() {
  const { id } = useParams();
  const [complianceData, setComplianceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [pageSize, setPageSize] = useState(11);

  const pageNumber = useSelector((state) => state.driverHoldsReducer.pageNumber);
  const totalPages = useSelector((state) => state.driverHoldsReducer.totalPages);
  const totalElementsData = useSelector((state) => state.driverHoldsReducer.totalElementsData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [complianceItem, setComplicanceItem] = useState("");

  const fetchTableData = () => {
    if (!id) {
      setLoading(false);
      setLoading1(false);
      return;
    }
    setLoading1(true);
    setLoading(true);
    HoldService.getAllCompliancedata(id, pageNumber, pageSize)
      .then((response) => {
        console.log("API Response:", response);
        setLoading(false);
        setLoading1(false);
        const { data } = response;
        if (data?.Pagination && data.Pagination.length > 0) {
          const paginationData = data.Pagination[0];
          dispatch(setTotalElementsData(paginationData.TotalElements || 0));
          dispatch(setTotalPages(paginationData.TotalPages || 0));
          if (data?.ExpiredDetails && data.ExpiredDetails.length > 0) {
            setComplianceData(data.ExpiredDetails);
            const browseData = data.ExpiredDetails.filter((item) => item.Heading !== 1);
            setComplicanceItem(browseData);
          } else {
            setComplianceData([]);
            setComplicanceItem("No Records");
          }
        } else {
          setComplianceData([]);
          setComplicanceItem("No Records");
        }
      })
      .catch((err) => {
        console.error("Error fetching compliance data:", err);
        setLoading(false);
        setLoading1(false);
        setComplianceData([]);
        setComplicanceItem("No Records");
      });
  };

  const formatDateToMMDDYY = (dateString) => {
    if (!dateString) return "";
    const date = parseLocalDate(dateString);
    if (isNaN(date)) return "";
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    if (id) {
      const debounceFunction = setTimeout(() => {
        fetchTableData();
      }, 300);

      return () => {
        clearTimeout(debounceFunction);
      };
    } else {
      console.warn("Waiting for id to be available");
    }
  }, [id, pageNumber, pageSize]);

  const paginationProps = {
    pageNumber,
    setPageNumber: setPageNumber,
    totalPages,
    totalElements: totalElementsData,
    numberOfElements: complianceData.length,
    listingData: complianceData,
    recordsPerPage: pageSize,
  };

  return loading ? (
    <LoadingIcon />
  ) : (
    <div className="customContainer">
      <div
        className="add-form-component quarterScreenWidth border border-dark border-2"
        style={{
          width: "960px",
          height: "540px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ComplianceHeader />

        <div className="d-flex border-dark border-1 flex-grow-1" style={{ overflow: "hidden" }}>
          <div className="flex-grow-1" style={{ overflowY: "auto" }}>
            <div className="fixTableHead h-100">
              <table className="table border-bottom f-w-600">
                <thead>
                  <tr>
                    <th className="f-w-600">Compliance Item</th>
                    <th className="f-w-600 text-center" style={{ width: "180px" }}>
                      Expiration Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {complianceData.length >= 1 &&
                    complianceItem !== "No Records" &&
                    complianceData.map((data) => (
                      <tr
                        key={data.SerialNumber}
                        className={
                          data.BlockedItem
                            ? "driverComplainceItemsDateCheck"
                            : data.Heading
                              ? "underlined-text"
                              : ""
                        }
                      >
                        <td className="f-w-600">{data.ComplienceItem}</td>
                        <td className="f-w-600 text-center">{formatDateToMMDDYY(data.ExpirationDate)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {loading
                ? ""
                : (complianceData.length === 0 || complianceItem === "No Records") && (
                    <p className="empty-list pt-3" align="center" style={{ fontSize: "0.8rem" }}>
                      No Records Available
                    </p>
                  )}
            </div>
          </div>
          {loading1 && <LoadingIcon />}
          <PaginationComponent
            {...paginationProps}
            recordsPerPage={pageSize}
            firstPage
            lastPage
            singleArrowUp
            singleArrowDown
            loading={loading1}
          />
        </div>
        <ComplianceFooter />
      </div>
    </div>
  );
}

export default ComplainceHoldContent;
