import React, { useEffect } from "react";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import {
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_WIDTH,
  QUARTER_SCREEN_HEIGHT,
} from "../../../../../constants/screenSizes";
import { Form } from "react-bootstrap";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  setRadioButtons,
  setSearchCriteria,
  setPageNumber,
  setSearchTerms,
  setSortValue,
  setSortType,
  setChangeColor,
  setSelectedPK,
  resetNewGeneralTab,
  setNewMaintenanceTabValid,
  resetNewDocumentsTab,
  resetBrowseData,
} from "../../../../../redux/Compliance/DriverDOTInspectionSlice";
import { useParams } from "react-router-dom";

const validationSchema = Yup.object().shape({
  notYetResponded: Yup.boolean(),
  isLoading: Yup.boolean(),
});

const DriverDOTInspectionBrowse = () => {
  const formik = useFormik({
    initialValues: {
      notYetResponded: false,
      isLoading: true,
    },
    validationSchema: validationSchema,
  });

  const { driverId } = useParams();
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.driverDOTInspection.searchTerm);
  const searchCriteria = useSelector((state) => state.driverDOTInspection.searchCriteria);
  const radioButtons = useSelector((state) => state.driverDOTInspection.radioButtons);
  const pageNumber = useSelector((state) => state.driverDOTInspection.pageNumber);
  const totalPages = useSelector((state) => state.driverDOTInspection.totalPages);
  const totalElements = useSelector((state) => state.driverDOTInspection.totalElements);
  const driverList = useSelector((state) => state.driverDOTInspection.driverList);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages: totalPages,
    totalElements: totalElements,
    listingData: driverList,
  };

  const { values, setFieldValue, initialValues } = formik;

  const { notYetResponded, isLoading } = values;

  const onClose = () => {
    dispatch(resetBrowseData());
  };

  useEffect(() => {
    if (radioButtons === "All" || radioButtons === "Paid" || radioButtons === "None") {
      setFieldValue("notYetResponded", false);
    }
  }, [radioButtons]);

  return (
    <QuarterScreenTemplate
      contentHieght={"94%"}
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={`/driver-dot-inspection-content/${driverId}`}
          handleNewOnClick={() => {
            dispatch(resetNewGeneralTab());
            dispatch(setNewMaintenanceTabValid(false));
            dispatch(resetNewDocumentsTab());
          }}
          customSecondRadioGroupOptions={["All", "Paid", "None", "Fined"]}
          secondRadioGroupValue={radioButtons}
          setSecondRadioGroupValue={setRadioButtons}
          closeButtonPosition="m-t-28"
          closeButtonRoute={`/driver-maintenance-add/${driverId}/0`}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerms}
          setPageNumber={setPageNumber}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}

          MiscellaneousContent2={
            <div>
              <label className="">Not Responded Yet</label>
              <input
                type="checkbox"
                className="form-check-input p-0 m-l-10"
                checked={notYetResponded}
                onChange={(e) => setFieldValue("notYetResponded", e.target.checked)}
                name="notYetResponded"
                disabled={radioButtons !== "Fined"}
              />
            </div>
          }
        />
      }
      TableListingComponent={<TableListing values={values} formik={formik} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={QuarterScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          loading={isLoading}
        />
      }
    />
  );
};

export default DriverDOTInspectionBrowse;
