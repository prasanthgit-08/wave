import React, { useEffect, useState } from "react";
import {
  setChangeColor,
  setCheckAmount,
  setDriverData,
  setDriverId,
  setFirstName,
  setLastName,
  setPageNumber,
  setReason,
  setSortType,
  setSortValue,
  setTotalElements,
  setTotalPages,
} from "../../../../redux/PrintCheckSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import LoadingText from "../../../common/LoadingText";
import PrintCheckService from "../../../../services/PrintCheckService";

const DriversList = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const firstName = useSelector((state) => state.printCheckReducer.firstName);
  const lastName = useSelector((state) => state.printCheckReducer.lastName);
  const sortValue = useSelector((state) => state.printCheckReducer.sortValue);
  const sortType = useSelector((state) => state.printCheckReducer.sortType);
  const pageNumber = useSelector((state) => state.printCheckReducer.pageNumber);
  const driverData = useSelector((state) => state.printCheckReducer.driverData);
  const changeColor = useSelector((state) => state.printCheckReducer.changeColor);
  const driverId = useSelector((state) => state.printCheckReducer.driverId);

  const fetchDriver = () => {
    setLoading(true);
    PrintCheckService.getActiveDriver(pageNumber, firstName, lastName, sortValue, sortType)
      .then((res) => {
        dispatch(setDriverData(res.data.content));
        dispatch(setTotalElements(res.data.totalElements));
        dispatch(setTotalPages(res.data.totalPages));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchDriver();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [firstName, lastName, sortType, sortValue, pageNumber]);

  return (
    <div className="fixTableHead ">
      <div>
        <table className="table table-striped f-w-600 mb-0">
          <thead>
            <tr disabled>
              <th
                className="f-w-600"
                onClick={() => {
                  dispatch(setSortValue("firstName"));
                  if (sortType) {
                    dispatch(setSortType(false));
                  } else {
                    dispatch(setSortType(true));
                  }
                }}
              >
                First Name
                {sortValue === "firstName" && sortType && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {sortValue === "firstName" && !sortType && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600"
                onClick={() => {
                  dispatch(setSortValue("lastName"));
                  if (sortType) {
                    dispatch(setSortType(false));
                  } else {
                    dispatch(setSortType(true));
                  }
                }}
              >
                Last Name
                {sortValue === "lastName" && sortType && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {sortValue === "lastName" && !sortType && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>{" "}
          </thead>
          <tbody>
            {loading
              ? null
              : driverData?.map((data, index) => (
                  <tr
                    id="rowId"
                    key={data.driverPK}
                    onClick={() => {
                      dispatch(setDriverId(data.driverPK));
                      dispatch(setFirstName(data.firstName));
                      dispatch(setLastName(data.lastName));
                      dispatch(setChangeColor(true));
                      dispatch(setCheckAmount(""));
                      dispatch(setReason(""));
                      dispatch(setPageNumber(0));
                    }}
                    className={data.driverPK === driverId && changeColor ? "tableSelected" : ""}
                  >
                    {" "}
                    <td className="f-w-600"> {data.firstName} </td>
                    <td className="f-w-600"> {data.lastName} </td>
                  </tr>
                ))}
          </tbody>
        </table>

        {loading
          ? ""
          : driverData?.length === 0 && (
              <h2 className="empty-list" align="center">
                No Records Available
              </h2>
            )}
        {loading && <LoadingText />}
      </div>
    </div>
  );
};

export default DriversList;
