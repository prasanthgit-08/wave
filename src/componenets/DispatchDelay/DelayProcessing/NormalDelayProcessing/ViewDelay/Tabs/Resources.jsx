import React, { useEffect, useState } from "react";
import { Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DelayProcessingService from "../../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import {
  setViewDelayResourcesListingData,
  setViewDelayResourcesTotalElements,
  setViewDelayResourcesTotalPages,
} from "../../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import LoadingText from "../../../../../common/LoadingText";
const Resources = () => {
  const dispatch = useDispatch();
  const { delayedUnitPK, companyName } = useParams();
  const viewDelayActiveTab = useSelector((state) => state.delayProcessing.viewDelayActiveTab);
  const viewDelayResourcesListingData = useSelector(
    (state) => state.delayProcessing.viewDelayResourcesListingData
  );
  const [loading, setLoading] = useState(false);
  const [currentRecordNotes, setCurrentRecordNotes] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [clickedRowIndex, setClickedRowIndex] = useState(null);
  // Fetching resources data when the component mounts or when the active tab changes
  useEffect(() => {
    const fetchResourcesData = () => {
      setLoading(true);
      DelayProcessingService.fetchViewDelayDetails(delayedUnitPK, viewDelayActiveTab, companyName)
        .then((response) => {
          const { data } = response;

          const listingData = data?.filter((item) => item.Type !== "Pagination");
          const paginationData = data?.find((item) => item.Type === "Pagination");
          setLoading(false);
          dispatch(setViewDelayResourcesListingData(listingData));
          if (paginationData) {
            dispatch(setViewDelayResourcesTotalElements(paginationData.TotalElements || 0));
            dispatch(setViewDelayResourcesTotalPages(paginationData.TotalPages || 0));
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error("### Error fetching resources data:", error);
          // Handle error appropriately
        });
    };

    if (viewDelayActiveTab === "resources") {
      fetchResourcesData();
    }
  }, [viewDelayActiveTab]);

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
                          {viewDelayResourcesListingData?.length > 0 &&
                            viewDelayResourcesListingData?.map((data, index) => (
                              <tr
                                id="rowId"
                                key={index}
                                onClick={() => {
                                  setCurrentRecordNotes(data?.Notes || "");
                                  setClickedRowIndex(index);
                                }}
                                className={clickedRowIndex === index ? "tableSelected" : ""}
                              >
                                <td className="f-w-600 pointer">{data?.Description}</td>
                                <td className="f-w-600 pointer">{data?.Phone}</td>
                              </tr>
                            ))}
                          {loading
                            ? ""
                            : viewDelayResourcesListingData?.length === 0 && (
                                <h2 className="empty-list" align="center">
                                  No Records Available
                                </h2>
                              )}
                          {loading && <LoadingText />}
                        </tbody>
                      </table>
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
