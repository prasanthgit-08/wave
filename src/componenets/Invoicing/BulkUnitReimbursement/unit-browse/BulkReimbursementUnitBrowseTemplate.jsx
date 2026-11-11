import React, { useState } from "react";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import BulkReimbursementUnitBrowse from "./BulkReimbursementUnitBrowse";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { ThreeForthScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import ButtonComponent from "../../../common/Button";
import {
  resetFields,
  resetState,
  setUnitPageNumber,
  setUnitSearchCriteria,
  setUnitSearchTerm,
} from "../../../../redux/Invoicing/BulkUnitReimbursementSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BulkReimbursementUnitBrowseTemplate = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  window.addEventListener("popstate", () => {
    dispatch(resetState());
    dispatch(resetFields());

    navigate(`/bulk-reimbursement-invoice-selection`);
  });

  const unitPageNumber = useSelector((state) => state.bulkUnitReimbursementReducer.unitPageNumber);
  const unitSearchTerm = useSelector((state) => state.bulkUnitReimbursementReducer.unitSearchTerm);
  const unitSearchCriteria = useSelector((state) => state.bulkUnitReimbursementReducer.unitSearchCriteria);
  const unitTotalPages = useSelector((state) => state.bulkUnitReimbursementReducer.unitTotalPages);
  const unitTotalElements = useSelector((state) => state.bulkUnitReimbursementReducer.unitTotalElements);
  const unitListingData = useSelector((state) => state.bulkUnitReimbursementReducer.unitListingData);

  const handleCancel = (e) => {
    e.preventDefault();

    navigate("/bulk-reimbursement-invoice-selection");
    toast.success("Changes Cancelled");
  };

  const paginationProps = {
    pageNumber: unitPageNumber,
    setPageNumber: setUnitPageNumber,
    totalPages: unitTotalPages,
    totalElements: unitTotalElements,
    listingData: unitListingData,
    loading,
  };
  return (
    <QuarterScreenTemplate
      tableListingHeight={"424px"}
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          closeButtonRoute={"/"}
          handleCloseOnClick={() => {
            dispatch(setUnitPageNumber(0));
          }}
          globalSearchTerm={unitSearchTerm}
          setGlobalSearchTerm={setUnitSearchTerm} // Updated function
          firstRadioGroupValue={unitSearchCriteria}
          setFirstRadioGroupValue={setUnitSearchCriteria} // Updated function
          setPageNumber={setUnitPageNumber}
        />
      }
      TableListingComponent={<BulkReimbursementUnitBrowse loading={loading} setLoading={setLoading} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={ThreeForthScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
        />
      }
      FooterComponent={
        <div className="d-flex align-items-center justify-content-end my-2 flex-wrap">
          <div className="d-flex align-items-center flex-wrap">
            <ButtonComponent
              route={""}
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              onClick={handleCancel}
              label={"Cancel"}
            />
          </div>
        </div>
      }
    />
  );
};

export default BulkReimbursementUnitBrowseTemplate;
