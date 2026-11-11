import React from "react";
import { useEffect } from "react";
import ExportBrokersService from "../../../../services/ExportBrokersService";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetRightNormalSort,
  setAssignSortValue,
  setAssignedPageNumber,
  setAssignedPortsList,
  setAssignedTotalElements,
  setAssignedTotalPages,
  setBrokerPageNumber,
  setBrokerPortsList,
  setBrokerTotalElements,
  setBrokerTotalPages,
  setEditPageLoading,
  setSort,
  setAssignedListingLoader,
} from "../../../../redux/ExportBrokersSlice";
import { useState } from "react";
import LoadingText from "../../../common/LoadingText";

const AssignedBrokersListing = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const brokerPageNumber = useSelector((state) => state.exportBrokersReducer.brokerPageNumber);
  const brokerPortsList = useSelector((state) => state.exportBrokersReducer.brokerPortsList);
  const sort = useSelector((state) => state.exportBrokersReducer.sort); //sort
  const assignSortValue = useSelector((state) => state.exportBrokersReducer.assignSortValue);
  const assignedListingLoader = useSelector((state) => state.exportBrokersReducer.assignedListingLoader);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const listAssignedPorts = () => {
    dispatch(setAssignedListingLoader(true));
    ExportBrokersService.getAssignedPorts(id, brokerPageNumber, sort, assignSortValue)
      .then((response) => {
        dispatch(setBrokerPortsList(response.data.content));
        dispatch(setBrokerTotalElements(response.data.totalElements));
        dispatch(setBrokerTotalPages(response.data.totalPages));
      })
      .catch(() => {
        console.error();
      })
      .finally(() => {
        dispatch(setAssignedListingLoader(false));
      });
  };
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      listAssignedPorts();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [id, brokerPageNumber, assignSortValue, sort]);

  return (
    <div className="fixTableHead">
      {
        <table className="table table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                onClick={() => {
                  dispatch(setSort());
                  dispatch(setAssignSortValue("usCity"));
                }}
                className="f-w-600"
              >
                Ports Of Entry
                {sort && assignSortValue === "usCity" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sort && assignSortValue === "usCity" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {!assignedListingLoader &&
              brokerPortsList.length !== 0 &&
              brokerPortsList?.map((portsofentry) => (
                <tr>
                  <td className="f-w-600">
                    {portsofentry.usCity}, {portsofentry.stateCode}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      }
      {!assignedListingLoader && brokerPortsList.length === 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}
      {/* {saving&&(<div className='loadingStyling'>
          Saving
          </div>)} */}
    </div>
  );
};

export default AssignedBrokersListing;
