import React, { useEffect, useState } from "react";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import CommonFooter from "../../../common/CommonFooter";
import { PaginationComponent } from "../../../common/PaginationComponent";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import TableListing from "./TableListing";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import Header from "../../../common/Header";
import BreakdownFeesService from "../../../../services/DispatchDelay/BreakdownProcessing/BreakdownFeesService";
import {
  resetSearchFilter,
  setDisplayFlag,
  setPageNumber,
} from "../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownFeesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { PermissionKeyGeneratorUtil } from "../../../../utils/PermissionKeyGeneratorUtil";
const DelayedUnitFeesView = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const breakdownFK = params.breakdownFK;
  const navigate = useNavigate();
  const [cancelShow, setCancelShow] = useState(false);
  const [editDisable, setEditDisable] = useState(true);
  const [disableFeeEdit, setDisableFeeEdit] = useState(false);
  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermissionDelayFee = PermissionKeyGeneratorUtil("DELAYFEE", "edit");

  const { pageNumber, browseData, totalPages, totalElements, isLoading } = useSelector(
    (state) => state.breakdownFeesReducer
  );
  const paginationProps = {
    pageNumber: pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: browseData,
  };
  //used for Edit button disable condition
  useEffect(() => {
    BreakdownFeesService.getbreakdowninfo(breakdownFK)
      .then((response) => {
        const data = response?.data;

        // If the data exists, set the values
        if (data && data?.length > 0) {
          const [repairedValue, furtherRepairedRequired] = data[0];
          if (!repairedValue && !furtherRepairedRequired) {
            setEditDisable(false);
          }
        }
      })
      .catch(() => {});
  }, [breakdownFK]);

  const onEdit = () => {
    navigate(`/delayed-unit-fees-edit/` + breakdownFK);
  };
  const onCancel = () => {
    dispatch(setDisplayFlag(false));
    dispatch(resetSearchFilter());
    toast.success("Changes Cancelled");
    navigate(`/breakdown-processing/view-breakdown/` + breakdownFK);
  };
  const buttons = [
    { label: "Edit", onClick: () => onEdit(), disabled: editDisable || disableFeeEdit },
    { label: "Cancel", onClick: () => onCancel() },
  ];
  useEffect(() => {
    if (deniedPermissions) {
      setDisableFeeEdit(deniedPermissions?.includes(editPermissionDelayFee));
    }
  }, []);

  return (
    <>
      <QuarterScreenTemplate
        SearchFilterComponent={
          <Header
            hideBorderBottom
            programName="Delay Breakdown Fee"
            // confirmClose
            closeModalTitle="Delay Breakdown Fee"
            closeModalBody="Please confirm you want to close the program without saving your changes"
            closeHandler={() => {
              dispatch(resetSearchFilter());
              dispatch(setDisplayFlag(false));
            }}
            closeNavigationURL={`/breakdown-processing/view-breakdown/${breakdownFK}`}
          />
        }
        tableListingClassName={"border-2"}
        TableListingComponent={<TableListing />}
        tableListingHeight={"446px"}
        PaginationComponent={
          <PaginationComponent
            {...paginationProps}
            recordsPerPage={QuarterScreen_RecordsPerPage}
            firstPage
            lastPage
            singleArrowUp
            singleArrowDown
            hideBorderRight
            loading={isLoading}
          />
        }
        FooterComponent={<CommonFooter buttons={buttons} hideBorderTop />}
      />
    </>
  );
};
export default DelayedUnitFeesView;
