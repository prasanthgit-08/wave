import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function DriveByListing() {
  //Local States
  const [unitRoutesList, setUnitRoutesList] = useState([]);

  //Redux States
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const isUnitDataLoading = useSelector((state) => state.editMasterExpress.isUnitDataLoading);

  useEffect(
    () => {
      if (selectedUnitData != null) {
        setUnitRoutesList(selectedUnitData?.editMaserExpressDriveBysTabDTO);
      }
    },
    [selectedUnitData],
    viewDetail
  );

  return (
    <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
      <div className="d-flex h-100">
        <div className="w-100 border-2 border-dark border-right-0 border h-500px">
          <div className="fixTableHead">
            <table className="table table-striped ">
              <thead>
                <tr disabled>
                  <th className="f-w-600 col-4">Name</th>
                  <th className="f-w-600 col-4">City</th>
                  <th className="f-w-600">State</th>
                  <th className="f-w-600">Completed</th>
                  <th className="f-w-600">Canceled</th>
                </tr>
              </thead>
              <tbody>
                {isUnitDataLoading ? (
                  <tr>
                    <td colSpan="2" align="center">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  unitRoutesList !== 0 &&
                  unitRoutesList?.map((unitRoute, index) => (
                    <tr id="rowId" key={unitRoute.unitRoutePK}>
                      <td className="f-w-600">{unitRoute.name?.trim()} </td>
                      <td className="f-w-600">{unitRoute.city?.trim()} </td>
                      <td className="f-w-600">{unitRoute.stateCode?.trim()} </td>
                      <td className="f-w-600">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          disabled
                          checked={unitRoute.driveBysCompleted}
                        />
                      </td>
                      <td className="f-w-600">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          disabled
                          checked={unitRoute.driveBysCancelled}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriveByListing;
