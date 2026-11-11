import React, { useEffect, useState } from "react";
import { Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BreakdownProcessingService from "../../../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";
import {
  setViewBreakdownResourcesListingData,
  setViewBreakdownResourcesTotalElements,
  setViewBreakdownResourcesTotalPages,
} from "../../../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import LoadingText from "../../../../../common/LoadingText";
const Resources = () => {
  const dispatch = useDispatch();
  const breakdownCompanyName = localStorage.getItem("breakdownCompanyName");
  const breakdownUnitFK = localStorage.getItem("breakdownUnitFK");
  const { breakdownFK } = useParams();
  const viewBreakdownActiveTab = useSelector((state) => state.delaybreakdown.viewBreakdownActiveTab);
  const viewBreakdownResourcesListingData = useSelector(
    (state) => state.delaybreakdown.viewBreakdownResourcesListingData
  );
  const [loading, setLoading] = useState(false);
  const [currentRecordNotes, setCurrentRecordNotes] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // Fetching resources data when the component mounts or when the active tab changes
  useEffect(() => {
    const fetchResourcesData = () => {
      setLoading(true);
      BreakdownProcessingService.getBreakdownViewDetails(
        "RESOURCES",
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

          dispatch(setViewBreakdownResourcesListingData(listingData));
          if (paginationData) {
            dispatch(setViewBreakdownResourcesTotalElements(paginationData.TotalElements || 0));
            dispatch(setViewBreakdownResourcesTotalPages(paginationData.TotalPages || 0));
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("### Error fetching resources data:", error);
          // Handle error appropriately
        });
    };

    if (viewBreakdownActiveTab === "resources") {
      fetchResourcesData();
    }
  }, [viewBreakdownActiveTab]);

  return (
    <div>
      <div className="container-fluid table-bordered">
        <div className=" ">
          <div className="row border border-dark border-1 fit-halfScreenFormContentHeight">
            <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
              <div className="d-flex h-417px">
                <div className="w-100 scrollable-list">
                  <div className="fixTableHead">
                    <div>
                      <table className="table table-striped f-w-600 mb-0">
                        <thead>
                          <tr disabled>
                            <th className="f-w-600">Description </th>
                            <th className="f-w-600">Phone </th>
                          </tr>
                        </thead>
                        <tbody>
                          {viewBreakdownResourcesListingData?.length > 0 &&
                            viewBreakdownResourcesListingData?.map((data, index) => (
                              <tr
                                id="rowId"
                                key={data?.DelayResourcePK}

                                onClick={() => {
                                  setCurrentRecordNotes(data?.Notes || "");
                                  setSelectedId(data?.DelayResourcePK);
                                }}
                                className={selectedId === data?.DelayResourcePK ? "tableSelected" : ""}
                              >
                                <td className="f-w-600 pointer">{data?.Description}</td>
                                <td className="f-w-600 pointer">{data?.Phone}</td>
                              </tr>
                            ))}
                          {loading
                            ? ""
                            : viewBreakdownResourcesListingData?.length === 0 && (
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
      <Col xs={12} sm={12} md={12} lg={12} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
        <Form.Group className="mt-1 align-items row  m-l-0 m-r-0">
          <label className="col-form-label dealer-label p-0 m-b-1"></label>

          <Col sm={12} md={12} className="p-0">
            <textarea
              rows={11}
              cols={10}
              type="resourceNotes"
              className="customFormControl h-100 "
              name="resourceNotes"
              value={currentRecordNotes || ""}
              autoComplete="off"
              disabled
            />
          </Col>
        </Form.Group>
      </Col>
    </div>
  );
};

export default Resources;
