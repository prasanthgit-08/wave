import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DelayProcessingService from "../../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import {
  setViewDelayEmailListingData,
  setViewDelayEmailTotalElements,
  setViewDelayEmailTotalPages,
} from "../../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import LoadingText from "../../../../../common/LoadingText";

const Emails = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { delayedUnitPK, companyName } = useParams();
  const viewDelayActiveTab = useSelector((state) => state.delayProcessing.viewDelayActiveTab);
  const viewDelayEmailListingData = useSelector((state) => state.delayProcessing.viewDelayEmailListingData);

  // Fetching emails data when the component mounts or when the active tab changes
  useEffect(() => {
    const fetchEmailsData = () => {
      setLoading(true);
      DelayProcessingService.fetchViewDelayDetails(delayedUnitPK, "email", companyName)
        .then((response) => {
          const { data } = response;

          const listingData = data?.filter((item) => item.Type !== "Pagination");
          const paginationData = data?.find((item) => item.Type === "Pagination");

          dispatch(setViewDelayEmailListingData(listingData));
          setLoading(false);
          if (paginationData) {
            dispatch(setViewDelayEmailTotalElements(paginationData.TotalElements || 0));
            dispatch(setViewDelayEmailTotalPages(paginationData.TotalPages || 0));
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error("### Error fetching emails data:", error);
          // Handle error appropriately
        });
    };

    if (viewDelayActiveTab === "emails") {
      fetchEmailsData();
    }
  }, [viewDelayActiveTab]);

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
                        {viewDelayEmailListingData?.length > 0 &&
                          viewDelayEmailListingData?.map((data, index) => (
                            <tr id="rowId" key={data?.delayedUnitPK}>
                              <td className={"f-w-600"}>{data?.name}</td>
                              <td className={"f-w-600"}>{data?.email}</td>
                            </tr>
                          ))}
                        {loading
                          ? ""
                          : viewDelayEmailListingData?.length === 0 && (
                              <h2 className="empty-list" align="center">
                                No Records Available
                              </h2>
                            )}
                      </tbody>
                    </table>
                    {loading && <LoadingText smallerFont />}
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
