import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  setViewBreakdownEmailListingData,
  setViewBreakdownEmailTotalElements,
  setViewBreakdownEmailTotalPages,
} from "../../../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import BreakdownProcessingService from "../../../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";
import LoadingText from "../../../../../common/LoadingText";

const Emails = () => {
  const dispatch = useDispatch();
  const breakdownCompanyName = localStorage.getItem("breakdownCompanyName");
  const breakdownUnitFK = localStorage.getItem("breakdownUnitFK");
  const { breakdownFK } = useParams();
  const viewBreakdownActiveTab = useSelector((state) => state.delaybreakdown.viewBreakdownActiveTab);
  const viewBreakdownEmailListingData = useSelector(
    (state) => state.delaybreakdown.viewBreakdownEmailListingData
  );
  const [loading, setLoading] = useState(false);

  // Fetching emails data when the component mounts or when the active tab changes
  useEffect(() => {
    const fetchEmailsData = () => {
      setLoading(true);
      BreakdownProcessingService.getBreakdownViewDetails(
        "EMAIL",
        breakdownFK,
        0,
        10,
        null,
        false,
        breakdownCompanyName
      )
        .then((response) => {
          const { data } = response;

          const listingData = data?.filter((item) => item.Type !== "Pagination");
          const paginationData = data?.find((item) => item.Type === "Pagination");

          dispatch(setViewBreakdownEmailListingData(listingData));
          if (paginationData) {
            dispatch(setViewBreakdownEmailTotalElements(paginationData.TotalElements || 0));
            dispatch(setViewBreakdownEmailTotalPages(paginationData.TotalPages || 0));
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("### Error fetching emails data:", error);
          // Handle error appropriately
        });
    };

    if (viewBreakdownActiveTab === "emails") {
      fetchEmailsData();
    }
  }, [viewBreakdownActiveTab]);

  return (
    <div className="container-fluid table-bordered">
      <div className=" ">
        <div className="row border border-dark border-1 fit-halfScreenFormContentHeight">
          <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
            <div className="d-flex h-375px">
              <div className="w-100 scrollable-list">
                <div className="fixTableHead">
                  <div>
                    <table className="table table-striped f-w-600 mb-0">
                      <thead>
                        <tr disabled>
                          <th className="f-w-600">Name </th>
                          <th className="f-w-600">Email </th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewBreakdownEmailListingData?.length > 0 &&
                          viewBreakdownEmailListingData?.map((data, index) => (
                            <tr id="rowId" key={data?.delayedUnitPK}>
                              <td className={"f-w-600"}>{data?.Name}</td>
                              <td className={"f-w-600"}>{data?.Email}</td>
                            </tr>
                          ))}
                        {loading
                          ? ""
                          : viewBreakdownEmailListingData?.length === 0 && (
                              <h2 className="empty-list" align="center">
                                No Records Available
                              </h2>
                            )}
                      </tbody>

                      {loading && <LoadingText />}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emails;
