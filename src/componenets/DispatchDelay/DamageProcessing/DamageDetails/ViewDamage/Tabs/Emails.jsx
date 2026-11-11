import React, { useEffect, useState } from "react";
import LoadingText from "../../../../../common/LoadingText";
import NoRecordsMessage from "../../../../../common/NoRecordsMessage";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DelayDamageService from "../../../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";
import {
  setViewDamageEmailListingData,
  setViewDamageEmailTotalElements,
  setViewDamageEmailTotalPages,
} from "../../../../../../redux/DispatchDelay/DamageProcessing/DamageSlice";

const Emails = () => {
  const dispatch = useDispatch();
  const { damageFK } = useParams();
  const viewDamageActiveTab = useSelector((state) => state.damageReducer.viewDamageActiveTab);
  const viewDamageEmailListingData = useSelector((state) => state.damageReducer.viewDamageEmailListingData);
  const [loading, setLoading] = useState(false);

  // Fetching emails data when the component mounts or when the active tab changes
  useEffect(() => {
    const fetchEmailsData = () => {
      dispatch(setViewDamageEmailListingData([]));
      setLoading(true);
      DelayDamageService.getDelayDamageViewDetails(damageFK, "email", 0, 10, null, false)
        .then((response) => {
          const { data } = response;

          const listingData = data?.filter((item) => item.Type !== "Pagination");
          const paginationData = data?.find((item) => item.Type === "Pagination");

          dispatch(setViewDamageEmailListingData(listingData));
          if (paginationData) {
            dispatch(setViewDamageEmailTotalElements(paginationData.TotalElements || 0));
            dispatch(setViewDamageEmailTotalPages(paginationData.TotalPages || 0));
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("### Error fetching emails data:", error);
          // Handle error appropriately
        });
    };

    if (viewDamageActiveTab === "emails") {
      fetchEmailsData();
    }
  }, [viewDamageActiveTab]);

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
                          <th className="f-w-600">Name</th>
                          <th className="f-w-600">Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewDamageEmailListingData?.length > 0 &&
                          viewDamageEmailListingData?.map((data, index) => (
                            <tr id="rowId" key={data?.DelayedUnitEmailPK}>
                              <td className={"f-w-600"}>{data?.Name}</td>
                              <td className={"f-w-600"}>{data?.Email}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    {!viewDamageEmailListingData?.length && loading && <LoadingText />}
                    {!loading && viewDamageEmailListingData?.length === 0 && <NoRecordsMessage />}
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
