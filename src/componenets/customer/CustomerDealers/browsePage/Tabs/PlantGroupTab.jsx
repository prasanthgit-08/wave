import React, { useEffect } from "react";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { useNavigate, useParams } from "react-router-dom";
import CustomerDealersService from "../../../../../services/CustomerDealersService";
import { useDispatch, useSelector } from "react-redux";
import {
  setCustomerSelectedId,
  setPlantGroupData,
  setPlantGroupLoading,
  setPlantGroupPageNumber,
  setPlantGroupSelectionId,
  setPlantGroupSort,
  setPlantGroupSortValue,
  setPlantGroupTotalElements,
  setPlantGroupTotalPages,
  setPlantSelectedId,
} from "../../../../../redux/CustomerDealerSlice";
import {
  setChangeColor,
  setSelectionId,
  setSelectionGroup,
  setDstStateCode,
  setDstCity,
} from "../../../../../redux/EditCustomerDealerSlice";

const PlantGroupTab = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = params.id;

  const plantGroupData = useSelector((state) => state.customerDealersFilter.plantGroupData);
  const plantGroupPageNumber = useSelector((state) => state.customerDealersFilter.plantGroupPageNumber);
  const plantGroupTotalPages = useSelector((state) => state.customerDealersFilter.plantGroupTotalPages);
  const plantGroupTotalElements = useSelector((state) => state.customerDealersFilter.plantGroupTotalElements);
  const changeColor = useSelector((state) => state.editcustomerDealers.changeColor);
  const plantGroupSort = useSelector((state) => state.customerDealersFilter.plantGroupSort);
  const plantGroupSortValue = useSelector((state) => state.customerDealersFilter.plantGroupSortValue);
  const plantGroupId = useSelector((state) => state.customerDealersFilter.plantGroupSelectionId);
  const plantGroupLoading = useSelector((state) => state.editcustomerDealers.plantGroupLoading);

  const fetchCustomerPlantGroups = () => {
    dispatch(setPlantGroupLoading(true));
    CustomerDealersService.fetchCustomerPlantGroups(
      id,
      plantGroupPageNumber,
      plantGroupSortValue,
      plantGroupSort
    )
      .then((response) => {
        dispatch(setPlantGroupData(response?.data?.content));
        dispatch(setPlantGroupTotalElements(response?.data?.totalElements));
        dispatch(setPlantGroupTotalPages(response?.data?.totalPages));
      })
      .finally(() => {
        dispatch(setPlantGroupLoading(false));
      });
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchCustomerPlantGroups();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [plantGroupPageNumber, plantGroupSort, plantGroupSortValue]);

  const paginationProps = {
    pageNumber: plantGroupPageNumber,
    setPageNumber: setPlantGroupPageNumber,
    totalPages: plantGroupTotalPages,
    totalElements: plantGroupTotalElements,
    listingData: plantGroupData,
    recordsPerPage: 14,
  };

  return (
    <div className={`col-8 mx-auto`}>
      <div className="d-flex h-550px border border-dark border-1 mt-3">
        <div className="w-100">
          <div className="fixTableHead">
            <table className="table table-striped f-w-600">
              <thead>
                <tr>
                  <th
                    className="f-w-600"
                    onClick={() => {
                      dispatch(setPlantGroupSort());
                      dispatch(setPlantGroupSortValue("description"));
                    }}
                  >
                    Description
                    {plantGroupSort && plantGroupSortValue === "description" && (
                      <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true" />
                    )}
                    {!plantGroupSort && plantGroupSortValue === "description" && (
                      <i className="fa fa-sort-alpha-desc font-20 m-l-10" />
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {plantGroupData?.map((plantGroup) => (
                  <tr
                    id="rowId"
                    key={plantGroup.customerDealerPK}
                    onClick={(e) => {
                      dispatch(setChangeColor(false));
                    }}
                    onDoubleClick={(e) => {
                      dispatch(setChangeColor(true));
                      dispatch(setPlantGroupSelectionId(plantGroup.customerPlantGroupId));
                      dispatch(setPlantSelectedId(""));
                      dispatch(setCustomerSelectedId(""));
                      dispatch(setSelectionGroup("PlantGroup"));
                      dispatch(setSelectionId(plantGroup.customerPlantGroupId));
                      dispatch(setDstCity(""));
                      dispatch(setDstStateCode(""));
                      setTimeout(() => {
                        navigate(
                          "/edit-customer-dealer/Plant-Group/" + id + "/" + plantGroup.customerDealerPK
                        );
                      }, 75);
                    }}
                    className={
                      plantGroup.customerPlantGroupId === plantGroupId && changeColor ? "tableSelected" : " "
                    }
                  >
                    <td className="f-w-600"> {plantGroup.plantGroupDescription} </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!plantGroupLoading && plantGroupData?.length === 0 && (
              <h2 className="empty-list" align="center">
                No Records Available
              </h2>
            )}
          </div>
        </div>
        <PaginationComponent singleArrowDown singleArrowUp lastPage firstPage {...paginationProps} />
        {plantGroupLoading && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantGroupTab;
