import React, { useEffect, useState } from "react";
import { Form, Col } from "react-bootstrap";
import LoadingText from "../../../../../common/LoadingText";
import NoRecordsMessage from "../../../../../common/NoRecordsMessage";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DelayDamageService from "../../../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";
import {
  setViewDamageResourcesListingData,
  setViewDamageResourcesTotalElements,
  setViewDamageResourcesTotalPages,
} from "../../../../../../redux/DispatchDelay/DamageProcessing/DamageSlice";
import LoadingIcon from "../../../../../common/LoadingIcon";
const Resources = () => {
  const dispatch = useDispatch();
  const breakdownCompanyName = localStorage.getItem("breakdownCompanyName");
  const { damageFK } = useParams();
  const viewDamageActiveTab = useSelector((state) => state.damageReducer.viewDamageActiveTab);
  const viewDamageResourcesListingData = useSelector(
    (state) => state.damageReducer.viewDamageResourcesListingData
  );
  const [loading, setLoading] = useState(false);
  const [currentRecordNotes, setCurrentRecordNotes] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // Fetching resources data when the component mounts or when the active tab changes
  useEffect(() => {
    const fetchResourcesData = () => {
      setLoading(true);
      DelayDamageService.getDelayDamageViewDetails(damageFK, "resources", 0, 10, null, false)
        .then((response) => {
          const { data } = response;

          const listingData = data?.filter((item) => item.Type !== "Pagination");
          const paginationData = data?.find((item) => item.Type === "Pagination");

          dispatch(setViewDamageResourcesListingData(listingData));
          if (paginationData) {
            dispatch(setViewDamageResourcesTotalElements(paginationData.TotalElements || 0));
            dispatch(setViewDamageResourcesTotalPages(paginationData.TotalPages || 0));
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("### Error fetching resources data:", error);
          // Handle error appropriately
        });
    };

    fetchResourcesData();
  }, [viewDamageActiveTab]);

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
                          {viewDamageResourcesListingData?.length > 0 &&
                            viewDamageResourcesListingData?.map((data, index) => (
                              <tr
                                id="rowId"
                                key={data?.DelayResourcePK}
                                onClick={() => {
                                  setCurrentRecordNotes(data?.Notes || "");
                                  setSelectedId(data?.Description);
                                }}
                                className={selectedId === data?.Description ? "tableSelected" : ""}
                              >
                                <td className="f-w-600 pointer">{data?.Description}</td>
                                <td className="f-w-600 pointer">{data?.Phone}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                      {loading ? "" : viewDamageResourcesListingData?.length === 0 && <NoRecordsMessage />}
                      {loading && <LoadingIcon />}
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
