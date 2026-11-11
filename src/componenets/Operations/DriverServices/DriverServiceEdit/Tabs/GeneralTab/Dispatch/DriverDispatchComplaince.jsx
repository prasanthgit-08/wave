import React, { useEffect } from "react";
import DispatchFooter from "./DriverDispatchFooter";
import DispatchHeader from "./DriverDispatchHeader";
import DispatchesService from "../../../../../../../services/DispatchesService";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNormalSortFlag,
  setNormalSortValue,
  setTotalElements,
  setTotalPage,
  setPageNumber,
  setTotalPages,
  setHasExpiredItems,
  setEligibleTruckPKS,
  setEligibleDriverTrailerPKS,
  setEligibleTrailerPKS,
  setValidFlatbedTrailer,
  setValidFlatbedTruck,
  setValidHaulAndTowTruck,
  setHasCodriverComplianceExpired,
  setHasBobtaildriverComplianceExpired,
  setCodriver,
  setBobTaildriver,
  setHasFlatbedTrailer,
  setHasCodriverOrBobtaildriverPassport,
} from "../../../../../../../redux/DispatchesSlice";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { PaginationComponent } from "../../../../../../../componenets/common/PaginationComponent";
import formatDatetimeToDate from "../../../../../../../utils/formatDateTimeToDate";
import LoadingIcon from "../../../../../../common/LoadingIcon";

function DriverDispatchComplaince() {
  const { driverId } = useParams();
  const [complianceData, setComplianceData] = useState([]);

  const sortFlag = useSelector((state) => state.dispatchesReducer.normalSortFlag);

  const sortValue = useSelector((state) => state.dispatchesReducer.normalSortValue);
  const pageNumber = useSelector((state) => state.dispatchesReducer.pageNumber);
  const totalElements = useSelector((state) => state.dispatchesReducer.totalElements);
  const totalPages = useSelector((state) => state.dispatchesReducer.totalPages);
  const divisionStatus = useSelector((state) => state.dispatchesReducer.divisionStatus);
  const regionStatus = useSelector((state) => state.dispatchesReducer.regionStatus);
  const requireFlatbedFromRedux = useSelector((state) => state.dispatchesReducer.isFlatBedRequired);

  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [complianceItem, setComplicanceItem] = useState("");

  const fetchTableData = () => {
    setLoading1(true);
    DispatchesService.getAllCompliancedata(
      driverId,
      sortValue,
      sortFlag,
      pageNumber,
      divisionStatus,
      requireFlatbedFromRedux
    )
      .then((response) => {
        setLoading(false);
        setLoading1(false);
        const { data } = response;
        dispatch(setHasExpiredItems(data?.Pagination[0]?.BlockedDispatch));
        const truckValue = data.Pagination[0].TruckList;
        const truckArr = truckValue.split(",");
        dispatch(setEligibleTruckPKS(truckArr));
        const trailerValue = data.Pagination[0].TrailerList;
        const trailerArr = trailerValue.split(",");
        dispatch(setEligibleTrailerPKS(trailerArr));

        dispatch(setValidFlatbedTrailer(data?.Pagination[0]?.hasValidFlatbedTrailer));
        dispatch(setValidFlatbedTruck(data?.Pagination[0]?.hasValidNonHaulAndTowAndNonHalfton));
        dispatch(setValidHaulAndTowTruck(data?.Pagination[0]?.hasHaulAndTow));
        dispatch(setHasCodriverComplianceExpired(data?.Pagination[0]?.HasCodriverComplianceExpired));
        dispatch(
          setHasBobtaildriverComplianceExpired(data?.Pagination[0]?.HasBobtaildriverComplianceExpired)
        );
        dispatch(setHasFlatbedTrailer(data.Pagination[0].hasValidFlatbedTrailer));
        dispatch(
          setHasCodriverOrBobtaildriverPassport(data.Pagination[0].hasCodriverOrBobtaildriverPassport)
        );
        dispatch(setBobTaildriver(data.Pagination[0].BobTailDriverName));
        dispatch(setCodriver(data.Pagination[0].CoDriverName));

        if (data.Pagination[0]?.TotalElements === 0) {
          if (regionStatus === "reload") {
            if (
              divisionStatus === "flatbed" ||
              divisionStatus === "popup" ||
              divisionStatus === "truckCamper"
            ) {
              navigate(`/driver-dispatch-flatbed/${driverId}`);
            } else {
              navigate(`/driver-dispatch-reload/${driverId}`);
            }
          } else {
            if (
              divisionStatus === "flatbed" ||
              divisionStatus === "popup" ||
              divisionStatus === "truckCamper"
            ) {
              navigate(`/driver-dispatch-flatbed/${driverId}`);
            } else {
              navigate(`/driver-dispatch-outbound/${driverId}`);
            }
          }
        } else if (data?.ExpiredDetails?.length > 0) {
          setComplianceData(data?.ExpiredDetails);
          const browseData = data?.ExpiredDetails?.slice(1, data?.ExpiredDetails?.length);
          setComplicanceItem(browseData);
        }

        dispatch(setTotalElements(data?.Pagination[0]?.TotalElements));
        dispatch(setTotalPages(data?.Pagination[0]?.TotalPages));
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setLoading1(false);
      });
  };

  // Only update the sort state; the debounced effect below refetches when it changes.
  // Fetching here as well caused a duplicate API call on every sort click.
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [sortValue, sortFlag, pageNumber]);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: complianceData,
  };
  return loading ? (
    <LoadingIcon />
  ) : (
    <div className="customContainer">
      <div
        className="add-form-component threeFourthScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <DispatchHeader />
        <div className="d-flex col-12 border-dark border-1">
          <div className="h-700px flex-grow-1">
            <div className="fixTableHead  h-100">
              <table className="table border-bottom  f-w-600">
                <thead>
                  <tr>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("complienceItem", !sortFlag);
                      }}
                    >
                      Compliance Item
                      {sortFlag && sortValue === "complienceItem" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!sortFlag && sortValue === "complienceItem" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>

                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("expirationDate", !sortFlag);
                      }}
                    >
                      Expiration Date
                      {sortFlag && sortValue === "expirationDate" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!sortFlag && sortValue === "expirationDate" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
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
                        <td className="f-w-600">
                          {data.ExpirationDate
                            ? `${
                                formatDatetimeToDate(data.ExpirationDate).split("-")[1]
                              }/${formatDatetimeToDate(data.ExpirationDate)
                                .split("-")[2]
                                ?.trim()
                                .slice(
                                  0,
                                  2
                                )}/${formatDatetimeToDate(data.ExpirationDate).split("-")[0].slice(2)}`
                            : ""}
                        </td>
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
            recordsPerPage={3}
            firstPage
            lastPage
            singleArrowUp
            singleArrowDown
            loading={loading1}
          />
        </div>
        <DispatchFooter />
      </div>
    </div>
  );
}

export default DriverDispatchComplaince;
