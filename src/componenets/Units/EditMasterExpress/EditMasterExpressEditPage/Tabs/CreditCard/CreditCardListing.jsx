import React from "react";
import { PaginationComponent } from "../../../../../common/PaginationComponent";
import { setPageNumber } from "../../../../../../redux/YardMaintenanceSlice";
import { useSelector } from "react-redux";

function CreditCardListing() {
  const pageNumber = useSelector((state) => state.yardMaintenanceReducer.pageNumber);
  const totalPages = useSelector((state) => state.yardMaintenanceReducer.totalPages);
  const totalElements = useSelector((state) => state.yardMaintenanceReducer.totalElements);
  const yardData = useSelector((state) => state.yardMaintenanceReducer.yardData);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: yardData,
  };

  return (
    <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
      <div className="d-flex h-100">
        <div className="w-100 border-2 border-dark border-right-0 border h-500px">
          <div className="fixTableHead">
            <table className="table table-striped ">
              <thead>
                <tr disabled>
                  <th className="f-w-600 col-4">Card Number</th>
                  <th className="f-w-600 col-4">Authorized Amount</th>
                  <th className="f-w-600">Charged</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>hey</td>
                  <td>hey</td>
                  <td>hey</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <PaginationComponent
          {...paginationProps}
          recordsPerPage={12}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
        />
      </div>
    </div>
  );
}

export default CreditCardListing;
