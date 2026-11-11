import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setPageNumber,
  setNormalSortFlag,
  setNormalSortValue,
  setCheckinId,
  setUnitNumber,
  setDriverCheckinId,
  resetState,
} from "../../../../../../../../redux/EditCheckinSlice";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../../../../../../common/PaginationComponent";
import toast from "react-hot-toast";
import AutoComplete from "../../../../../../../../components/common/autoComplete";
import EditCheckinService from "../../../../../../../../services/EditCheckinService";
import { Col, Form } from "react-bootstrap";

function EditCheckinSelection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const driverId = params.id;
  const pageNumber = useSelector((state) => state.editCheckinReducer.pageNumber);
  const totalPages = useSelector((state) => state.editCheckinReducer.totalPages);
  const totalElements = useSelector((state) => state.editCheckinReducer.totalElements);
  const listingData = useSelector((state) => state.editCheckinReducer.listingData);
  const unitNumber = useSelector((state) => state.editCheckinReducer.unitNumber);
  const driverCheckinId = useSelector((state) => state.editCheckinReducer.driverCheckinId);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  const navigateToHome = () => {
    dispatch(setPageNumber(0));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(""));
    dispatch(setCheckinId(null));
    dispatch(setUnitNumber(""));
    dispatch(setDriverCheckinId(null));
    resetState();
    navigate(`/driver-service-selection/${driverId}/form`);
    toast.success("Page closed");
  };

  return (
    <>
      <div>
        <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
          <Col xs={3} className="ms-3 d-flex">
            <Col xs={3} className="pt-1 pe-1">
              <Form.Label className={`customColFormLabel text-capitalize`} id="UnitNumber">
                Unit Number
              </Form.Label>
            </Col>
            <AutoComplete
              searchString={unitNumber}
              handleSearchString={(string) => dispatch(setUnitNumber(string))}
              onSelect={(item) => {
                dispatch(setUnitNumber(item.UnitNumber?.trim()));
                dispatch(setDriverCheckinId(item.DriverCheckInPK));
                dispatch(setPageNumber(0));
              }}
              selectedId={driverCheckinId}
              renderItemId={(dirver) => dirver.DriverCheckInPK}
              renderItemField={(dirver) => dirver.UnitNumber}
              queryKey={["unitDetails"]}
              queryFn={(term) =>
                EditCheckinService.getEditCheckinRecords(0, "", false, driverId, unitNumber, "autocomplete")
              }
              className={`${unitNumber && !driverCheckinId ? "borderRed" : ""}`}
              clearInputCallback={() => {
                dispatch(setDriverCheckinId(null));
              }}
            />
          </Col>
          <div>
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type=""
              onClick={navigateToHome}
            >
              Close
            </button>
          </div>
        </div>

        <div className="col-xs-6"></div>
      </div>

      <div className="container-fluid table-bordered ">
        <div className=" ">
          <div className="row " style={{ minHeight: "617px" }}>
            <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
              <div className="d-flex h-100">
                <div className="w-100">
                  <TableListing unitNumber={driverCheckinId ? unitNumber : ""} />
                </div>
                <PaginationComponent
                  {...paginationProps}
                  firstPage
                  lastPage
                  doubleArrowUp
                  doubleArrowDown
                  singleArrowUp
                  singleArrowDown
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary invisible  btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default EditCheckinSelection;
