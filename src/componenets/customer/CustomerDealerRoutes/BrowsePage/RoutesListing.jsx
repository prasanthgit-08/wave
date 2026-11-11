import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CustomerDealerRoutesService from "../../../../services/CustomerDealerRoutesService";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setChangeColor,
  setId,
  setListingData,
  setSortFlag,
  setSortValue,
  setTotalElements,
  setTotalPages,
} from "../../../../redux/CustomerDealerRoutesSlice";
import Loading from "../../../../components/common/loading";
import useDebouncer from "../../../../hooks/useDebouncer";

const RoutesListing = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  const listingData = useSelector((state) => state.customerDealerRoutes.listingData);
  const searchTerm = useSelector((state) => state.customerDealerRoutes.searchTerm);
  const searchCriteria = useSelector((state) => state.customerDealerRoutes.searchCriteria);
  const pageNumber = useSelector((state) => state.customerDealerRoutes.pageNumber);
  const sortValue = useSelector((state) => state.customerDealerRoutes.sortValue);
  const sortFlag = useSelector((state) => state.customerDealerRoutes.sortFlag);
  const selectedId = useSelector((state) => state.customerDealerRoutes.id);
  const changeColor = useSelector((state) => state.customerDealerRoutes.changeColor);
  const id = params.id;
  const group = params.group;
  const dealerId = params.dealerId;

  const getData = () => {
    setLoad(true);
    CustomerDealerRoutesService.fetchRoutesforCustomerDealer(
      pageNumber,
      searchTerm,
      searchCriteria,
      sortValue,
      sortFlag,
      id
    )
      .then((response) => {
        dispatch(setTotalElements(response.data.totalElements));
        dispatch(setTotalPages(response.data.totalPages));
        dispatch(setListingData(response.data.content));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoad(false));
  };

  const handleNormalSort = (value) => {
    dispatch(setSortFlag());
    dispatch(setSortValue(value));
  };

  const handleDoubleClick = (routesid) => {
    dispatch(setChangeColor(true));
    dispatch(setId(routesid));
    setTimeout(() => {
      navigate("/edit-customer-dealer-routes/" + id + "/" + routesid + "/" + group + "/" + dealerId);
    }, 100);
  };

  const debounceGetData = useDebouncer(getData, 500);

  useEffect(() => {
    setLoad(true);
    debounceGetData();
  }, [pageNumber, searchCriteria, searchTerm, id, sortFlag, sortValue]);

  return (
    <div className="fixTableHead">
      {load && <Loading />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                handleNormalSort("city");
              }}
            >
              City
              {sortFlag && sortValue === "city" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "city" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                handleNormalSort("stateCode");
              }}
            >
              State
              {sortFlag && sortValue === "stateCode" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "stateCode" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {!load &&
            listingData.map((route) => (
              <tr
                key={route.customerDealerRoutePK}
                className={selectedId === route.customerDealerRoutePK && changeColor ? "tableSelected" : ""}
                onClick={() => {
                  dispatch(setChangeColor(false));
                }}
                onDoubleClick={() => {
                  handleDoubleClick(route.customerDealerRoutePK);
                }}
              >
                <td className="f-w-600">{route.city}</td>
                <td className="f-w-600">{route.stateCode}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {listingData.length === 0 && !load && (
        <h2 className="empty-list" align="center">
          No Records Available
        </h2>
      )}
    </div>
  );
};

export default RoutesListing;
