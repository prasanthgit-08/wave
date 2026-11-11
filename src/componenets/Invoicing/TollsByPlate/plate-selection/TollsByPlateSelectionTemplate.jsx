import React from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import TollsByPlateSelection from "./TollsByPlateSelection";
import ButtonComponent from "../../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { ThreeForthScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import { t } from "i18next";
import InputField from "../../../common/InputField";
import { Col, Row } from "react-bootstrap";
import { resetFields, setPageNumber, updateField } from "../../../../redux/Invoicing/TollsByPlateSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const TollsByPlateSelectionTemplate = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const listingData = useSelector((state) => state.tollsByPlate.listingData);
  const pageNumber = useSelector((state) => state.tollsByPlate.pageNumber);
  const totalPages = useSelector((state) => state.tollsByPlate.totalPages);
  const totalElements = useSelector((state) => state.tollsByPlate.totalElements);

  const plateNumber = useSelector((state) => state.tollsByPlate.plateNumber);
  const selectedPlate = useSelector((state) => state.tollsByPlate.selectedPlate);
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const resetSelection = () => {
    updateData("selectedPlate", "");
    updateData("selectedDescription", "");
    updateData("selectedSource", "");
    updateData("selectedDriver", "");
    updateData("selectedDriverFK", "");
    updateData("pageNumber", 0);
  };

  const handleNoDriver = () => {
    updateData("description", "No Driver");
    navigate("/toll-by-plate/details");
  };

  const handleNext = () => {
    navigate("/toll-by-plate/details");
  };

  return (
    <QuarterScreenTemplate
      screenHeight={"540px"}
      quarterScreenBrowseHeight={"440px"}
      SearchFilterComponent={
        <Row className="border border-dark border-2 p-t-10 p-b-10">
          <Col md={12}>
            <Row className="m-0 p-0">
              <Col className="p-l-0">
                <div className="d-flex mt-2 align-items-center justify-content-between">
                  <div className="d-flex align-items-center customSearchBox">
                    <span className="p-l-20">
                      <label className="f-w-600 m-r-15 customLabel">Plate Number</label>
                      <InputField
                        type="search"
                        name="globalSearchTerm"
                        value={plateNumber}
                        autoComplete="off"
                        aria-autocomplete="list"
                        placeholder={t("global.search")}
                        onChange={(e) => {
                          dispatch(updateField({ field: "plateNumber", value: e.target.value }));
                          resetSelection();
                        }}
                        disabled={false}
                        autocomplete="autocomplete_off_randString"
                      />
                    </span>
                  </div>
                </div>
              </Col>
              <Col className="text-end">
                <span className="m-l-10">
                  <ButtonComponent
                    route={"/"}
                    className={`btn btn-secondary btn-sm font-12 customButtonSmallWidth `}
                    style={{
                      marginTop: "8px",
                      marginLeft: "30px",
                    }}
                    label={t("close.button")}
                    onClick={() => {
                      toast.success("Page Closed");
                      dispatch(resetFields());
                    }}
                  />
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
      }
      TableListingComponent={<TollsByPlateSelection />}
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
        <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap ">
          <div className="d-flex align-items-center flex-wrap">
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              onClick={handleNoDriver}
              disabled={!plateNumber || selectedPlate}
            >
              No Driver
            </button>
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-b-5"
              onClick={handleNext}
              disabled={!selectedPlate}
            >
              Next
            </button>
          </div>
        </div>
      }
    />
  );
};

export default TollsByPlateSelectionTemplate;
