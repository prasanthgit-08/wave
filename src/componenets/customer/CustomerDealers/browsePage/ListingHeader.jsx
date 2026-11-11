import React from "react";
import { Col, Row } from "react-bootstrap";
import ButtonComponent from "../../../common/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import {
  clearAdvancedSearch,
  resetDealerDetails,
  resetSearchSettings,
  setActiveTab,
  setCustomerPageNumber,
  setCustomerSort,
  setCustomerSortValue,
  setPlantGroupPageNumber,
  setPlantGroupSelectionId,
  setPlantGroupSort,
  setPlantGroupSortValue,
  setPlantPageNumber,
  setPlantSelectedId,
  setPlantSort,
  setPlantSortValue,
} from "../../../../redux/CustomerDealerSlice";
import { setCustomerDealerId } from "../../../../redux/EditCustomerDealerSlice";
import { setActiveTab as setActiveBrowseTab } from "../../../../redux/EditCustomerDealerSlice";

const ListingHeader = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const id = params.id;
  const pageNumber = params.pageNumber;

  const handleNewOnClick = () => {
    setTimeout(() => {
      navigate("/add-customer-dealers/" + id + "/" + pageNumber);
      dispatch(setActiveBrowseTab("Dealer"));
      dispatch(setCustomerSort(false));
      dispatch(setCustomerSortValue(null));
      dispatch(setPlantSort(false));
      dispatch(setPlantSortValue(null));
      dispatch(setPlantGroupSort(false));
      dispatch(setPlantGroupSortValue(null));
      dispatch(setPlantGroupSelectionId());
      dispatch(setPlantSelectedId());
      dispatch(setCustomerDealerId());
      dispatch(setCustomerPageNumber(0));
      dispatch(setPlantGroupPageNumber(0));
      dispatch(setPlantPageNumber(0));
    }, 20);
  };

  const handleCloseOnClick = () => {
    setTimeout(() => {
      navigate("/");
    }, 100);
    toast.success("Page Closed");
    dispatch(resetSearchSettings());
    dispatch(clearAdvancedSearch());
    dispatch(resetDealerDetails());
    dispatch(setActiveTab("Dealer"));
    dispatch(setCustomerSort(false));
    dispatch(setCustomerSortValue(null));
    dispatch(setPlantSort(false));
    dispatch(setPlantSortValue(null));
    dispatch(setPlantGroupSort(false));
    dispatch(setPlantGroupSortValue(null));
    dispatch(setPlantGroupSelectionId());
    dispatch(setPlantSelectedId());
    dispatch(setCustomerDealerId(""));
    dispatch(setCustomerPageNumber(0));
    dispatch(setPlantGroupPageNumber(0));
    dispatch(setPlantPageNumber(0));
  };

  return (
    <div>
      <Row className=" p-t-10 p-b-10">
        <Col md={12}>
          <Row className="m-0 p-0 border-bottom border-dark border-2">
            <Col md={8} sm={8} lg={8} xs={8} className="p-l-0">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center customSearchBox ">
                  <span className="p-r-20">
                    {
                      <ButtonComponent
                        className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                        label={"New"}
                        onClick={handleNewOnClick}
                      />
                    }
                  </span>
                </div>
              </div>
            </Col>

            <Col md={4} sm={4} lg={4} xs={4} className="p-l-0">
              <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap ">
                <span className="m-l-10">
                  <ButtonComponent
                    className={"btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"}
                    label={"Close"}
                    onClick={handleCloseOnClick}
                  />
                </span>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ListingHeader;
