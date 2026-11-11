import React, { useState } from "react";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import SequenceSearchFilter from "./SequenceSearchFilter";
import SequenceListing from "./SequenceListing";
import { useDispatch, useSelector } from "react-redux";
import { resetSearch, setCurrentPage } from "../../../../redux/CustomerDealerRoutesSlice";
import CustomerDealerRoutesService from "../../../../services/CustomerDealerRoutesService";
import { useNavigate, useParams } from "react-router-dom";

const RoutesSequenceMainPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const id = params.id;
  const group = params.group;
  const dealerId = params.dealerId;

  const [loading, setLoading] = useState(false);

  const pageNumber = useSelector((state) => state.customerDealerRoutes.currentPage);
  const listingData = useSelector((state) => state.customerDealerRoutes.sequencePageListingData);
  const disableSave = useSelector((state) => state.customerDealerRoutes.disableSaveSequence);

  const onClickSave = () => {
    setLoading(true);
    CustomerDealerRoutesService.saveSequence(listingData).then((response) => {
      dispatch(resetSearch());
      setLoading(false);
      navigate("/customer-dealer-routes/" + id + "/" + group + "/" + dealerId);
    });
  };

  const paginationProps = {
    pageNumber,
    setPageNumber: setCurrentPage,
    totalPages: Math.ceil(listingData.length / QuarterScreen_RecordsPerPage),
    totalElements: listingData.length,
    listingData: listingData,
  };

  return (
    <>
      <QuarterScreenTemplate
        SearchFilterComponent={
          <SequenceSearchFilter
            searchTerm={""}
            searchCriteria={"Beginning"}
            pageNumber
            closeRoute={"/edit-customer-dealer/" + group + "/" + dealerId + "/" + id}
            setSearchTerm={() => {}}
            setSearchCriteria={() => {}}
            setPageNumber={() => {}}
            fetchTableData={() => {}}
            handleClickSave={() => {
              onClickSave();
            }}
            handleClickClose={() => {
              dispatch(resetSearch());
            }}
            disableSave={disableSave}
          />
        }
        TableListingComponent={<SequenceListing />}
        PaginationComponent={
          <PaginationComponent
            {...paginationProps}
            recordsPerPage={QuarterScreen_RecordsPerPage}
            firstPage
            lastPage
            singleArrowUp
            singleArrowDown
          />
        }
      />
      {loading && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoutesSequenceMainPage;
