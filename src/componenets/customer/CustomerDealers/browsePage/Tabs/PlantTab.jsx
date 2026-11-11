import React from "react";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCustomerSelectedId,
  setPlantData,
  setPlantGroupSelectionId,
  setPlantLoading,
  setPlantSelectedId,
  setPlantSort,
  setPlantSortValue,
  setPlantTotalElements,
  setPlantTotalPages,
} from "../../../../../redux/CustomerDealerSlice";
import { setPlantPageNumber } from "../../../../../redux/CustomerDealerSlice";
import CustomerDealersService from "../../../../../services/CustomerDealersService";
import {
  setChangeColor,
  setSelectionId,
  setSelectionGroup,
  setDstStateCode,
  setDstCity,
} from "../../../../../redux/EditCustomerDealerSlice";

const PlantTab = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = params.id;

  const plantData = useSelector((state) => state.customerDealersFilter.plantData);
  const plantPageNumber = useSelector((state) => state.customerDealersFilter.plantPageNumber);
  const plantTotalPages = useSelector((state) => state.customerDealersFilter.plantTotalPages);
  const plantTotalElements = useSelector((state) => state.customerDealersFilter.plantTotalElements);
  const changeColor = useSelector((state) => state.editcustomerDealers.changeColor);
  const plantSort = useSelector((state) => state.customerDealersFilter.plantSort);
  const plantSortValue = useSelector((state) => state.customerDealersFilter.plantSortValue);
  const plantId = useSelector((state) => state.customerDealersFilter.plantSelectedId);
  const plantLoading = useSelector((state) => state.customerDealersFilter.plantLoading);

  const fetchplantPlants = () => {
    dispatch(setPlantLoading(true));
    CustomerDealersService.fetchCustomerPlants(id, plantPageNumber, plantSort, plantSortValue)
      .then((response) => {
        dispatch(setPlantData(response?.data?.content));
        dispatch(setPlantTotalElements(response?.data?.totalElements));
        dispatch(setPlantTotalPages(response?.data?.totalPages));
      })
      .finally(() => {
        dispatch(setPlantLoading(false));
      });
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchplantPlants();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [plantPageNumber, plantSort, plantSortValue]);

  const paginationProps = {
    pageNumber: plantPageNumber,
    setPageNumber: setPlantPageNumber,
    totalPages: plantTotalPages,
    totalElements: plantTotalElements,
    listingData: plantData,
    recordsPerPage: 14,
  };

  return (
    <div className={`col-8 mx-auto `}>
      <div className="d-flex h-550px border border-dark border-1 mt-3">
        <div className="w-100">
          <div className="fixTableHead">
            <table className="table table-striped f-w-600">
              <thead>
                <tr>
                  <th
                    className="f-w-600"
                    onClick={() => {
                      dispatch(setPlantSort());
                      dispatch(setPlantSortValue("name"));
                    }}
                  >
                    Name{" "}
                    {plantSort && plantSortValue === "name" && (
                      <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true" />
                    )}
                    {!plantSort && plantSortValue === "name" && (
                      <i className="fa fa-sort-alpha-desc font-20 m-l-10" />
                    )}
                  </th>
                  <th
                    className="f-w-600"
                    onClick={() => {
                      dispatch(setPlantSort());
                      dispatch(setPlantSortValue("brand"));
                    }}
                  >
                    DBA
                    {plantSort && plantSortValue === "brand" && (
                      <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true" />
                    )}
                    {!plantSort && plantSortValue === "brand" && (
                      <i className="fa fa-sort-alpha-desc font-20 m-l-10" />
                    )}
                  </th>
                  <th
                    className="f-w-600"
                    onClick={() => {
                      dispatch(setPlantSort());
                      dispatch(setPlantSortValue("city"));
                    }}
                  >
                    City
                    {plantSort && plantSortValue === "city" && (
                      <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true" />
                    )}
                    {!plantSort && plantSortValue === "city" && (
                      <i className="fa fa-sort-alpha-desc font-20 m-l-10" />
                    )}
                  </th>
                  <th
                    className="f-w-600"
                    onClick={() => {
                      dispatch(setPlantSort());
                      dispatch(setPlantSortValue("stateCode"));
                    }}
                  >
                    State
                    {plantSort && plantSortValue === "stateCode" && (
                      <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true" />
                    )}
                    {!plantSort && plantSortValue === "stateCode" && (
                      <i className="fa fa-sort-alpha-desc font-20 m-l-10" />
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {plantData?.map((plant) => (
                  <tr
                    id="rowId"
                    key={plant.customerPlantId}
                    onClick={(e) => {
                      dispatch(setChangeColor(false));
                    }}
                    onDoubleClick={(e) => {
                      dispatch(setChangeColor(true));
                      dispatch(setPlantSelectedId(plant.customerDealerPK));
                      dispatch(setCustomerSelectedId(""));
                      dispatch(setPlantGroupSelectionId(""));
                      dispatch(setSelectionGroup("Plant"));
                      dispatch(setSelectionId(plant.customerPlantId));
                      dispatch(setDstCity(plant.plantCity));
                      dispatch(setDstStateCode(plant.plantState));
                      setTimeout(() => {
                        navigate("/edit-customer-dealer/Plant/" + id + "/" + plant.customerDealerPK);
                      }, 75);
                    }}
                    className={plant.customerDealerPK === plantId && changeColor ? "tableSelected" : " "}
                  >
                    <td className="f-w-600"> {plant.plantName} </td>
                    <td className="f-w-600"> {plant.plantDBA} </td>
                    <td className="f-w-600"> {plant.plantCity} </td>
                    <td className="f-w-600"> {plant.plantState} </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!plantLoading && plantData?.length === 0 && (
              <h2 className="empty-list" align="center">
                No Records Available
              </h2>
            )}

            {plantLoading && (
              <div className="fade modal-backdrop show">
                <div className="pos-center">
                  <div className="loader"></div>
                </div>
              </div>
            )}
          </div>
        </div>
        <PaginationComponent singleArrowDown singleArrowUp lastPage firstPage {...paginationProps} />
      </div>
    </div>
  );
};

export default PlantTab;
