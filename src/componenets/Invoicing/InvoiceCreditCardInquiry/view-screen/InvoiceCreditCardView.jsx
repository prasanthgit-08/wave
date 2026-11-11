import React, { useEffect, useState } from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import { setPageNumberView } from "../../../../redux/Invoicing/CreditCardEnquirySlice";
import { useSelector, useDispatch } from "react-redux";
import { updateField } from "../../../../redux/Invoicing/CreditCardEnquirySlice";
import CreditCardEnquiryService from "../../../../services/Invoicing/CreditCardEnquiryService";
import { useNavigate, useParams } from "react-router-dom";
import NoRecordsMessage from "../../../common/NoRecordsMessage";
import moment from "moment";

export const InvoiceCreditCardView = () => {
  const { id } = useParams();
  const [listingData, setListingData] = useState([]);

  const {
    unitNumberInput,
    unitNumberPK,
    pageNumberView,
    totalPages,
    totalElements,
    selectedId,
    selectedIdTab2,
    unitNumberLast5,
    creditCardEnquiryList,
    creditCardEnquiryView,
    loading,
    loadingView,
    totalPagesView,
    totalElementsView,
    selectedPK,
  } = useSelector((state) => state.creditCardEnquirySlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Handler Functions */

  const updateValue = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  //Credit Enquiry View API
  const getCreditEnquiryByUnitNumber = (unitFK, unitNumber) => {
    updateValue("loadingView", true);
    let miscUnit = "";
    if (unitFK !== -1) unitNumber = miscUnit;
    CreditCardEnquiryService.getCreditCardEnquiryByUnitNumber({
      unitFK: unitFK,
      unitNumber: unitNumber,
      pageNumber: pageNumberView,
    })
      .then((response) => {
        const data = response?.data;
        const paginationData = data?.find((item) => item.Type === "Pagination");
        data?.pop();
        if (data?.length === 0) {
          updateValue("creditCardEnquiryView", []);
          updateValue("totalPagesView", paginationData.TotalPages);
          updateValue("totalElementsView", paginationData.TotalElements);
          updateValue("loadingView", false);
        } else {
          updateValue("creditCardEnquiryView", data);
          updateValue("totalPagesView", paginationData.TotalPages);
          updateValue("totalElementsView", paginationData.TotalElements);
          updateValue("loadingView", false);
        }
      })
      .catch((error) => {
        updateValue("loadingView", false);
      });
  };

  /** USE EFFECTS */

  useEffect(() => {
    if (selectedPK || selectedId) getCreditEnquiryByUnitNumber(selectedPK ? selectedPK : -1, selectedId);
  }, [pageNumberView]);

  useEffect(() => {
    if (selectedPK === null && selectedId === null) navigate(`/credit-card-enquiry/selection`);
  }, []);

  useEffect(() => {
    if (creditCardEnquiryView?.length > 0) {
      updateValue("loading", false);
    } else updateValue("loading", true);
  }, [creditCardEnquiryView]);

  const paginationProps = {
    pageNumber: pageNumberView,
    setPageNumber: setPageNumberView,
    totalPages: totalPagesView,
    totalElements: totalElementsView,
    listingData: creditCardEnquiryView,
  };
  return (
    <div className="d-flex m-2" style={{ height: "424px" }}>
      <div className="w-100 border-1 border border-dark border-right-0">
        <div className="fixTableHead">
          <table className="table table-striped f-w-600">
            <thead>
              <tr>
                <th className="f-w-600 ">CC Last 4</th>
                <th className="f-w-600 ">Amount</th>
                <th className="f-w-600 ">Source </th>
                <th className="f-w-600 ">Date</th>
                <th className="f-w-600">Status</th>
                <th className="f-w-600">Auth#</th>
              </tr>
            </thead>
            {loadingView
              ? null
              : creditCardEnquiryView?.length !== 0 && (
                  <tbody>
                    {creditCardEnquiryView?.map((credits, index) => (
                      <tr
                        id="rowId"
                        key={credits.CClast4}
                        onClick={(value) => {
                          updateValue("selectedIdTab2", credits.MonetraChargePK);
                        }}
                      >
                        <td className="f-w-600 ">{credits.CClast4}</td>
                        <td className="f-w-600 ">{credits.Amount}</td>
                        <td className="f-w-600 ">{credits.Source}</td>
                        <td className="f-w-600 ">{moment(credits.Date?.split("T")[0]).format("MM/DD/YY")}</td>
                        <td className="f-w-600 ">{credits.Status}</td>
                        <td className="f-w-600 ">{credits.AuthorizationNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                )}
          </table>
          {loadingView ? "" : creditCardEnquiryView?.length === 0 && <NoRecordsMessage />}
        </div>
        {loadingView && (
          <div className="fade modal-backdrop show">
            {" "}
            <div className="pos-center">
              {" "}
              <div className="loader"></div>
            </div>
             
          </div>
        )}
      </div>

      <PaginationComponent
        {...paginationProps}
        recordsPerPage={QuarterScreen_RecordsPerPage}
        firstPage
        lastPage
        singleArrowUp
        singleArrowDown
      />
    </div>
  );
};
