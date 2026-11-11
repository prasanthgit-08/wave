import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "../../../common/PaginationComponent";
import {
  setEquipmentReturnList,
  setPageEquipmentNumber,
} from "../../../../redux/Invoicing/PaperworkProcessingSlice";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import usePagination from "../../../../hooks/usePagination";
import { t } from "i18next";

function EquipmentReturnContent() {
  const dispatch = useDispatch();
  const pageEquipmentNumber = useSelector((state) => state.paperworkProcessing.pageEquipmentNumber);
  const equipmentReturnList = useSelector((state) => state.paperworkProcessing.equipmentReturnList);
  const [loading, setLoading] = useState(false);
  const pagination = usePagination(equipmentReturnList, pageEquipmentNumber, 11);
  const { paginatedArray, totalElements, totalPages } = pagination;

  const paginationProps = {
    pageNumber: pageEquipmentNumber,
    setPageNumber: setPageEquipmentNumber,
    totalElements: totalElements,
    totalPages: totalPages,
    listingData: paginatedArray,
  };

  return (
    <div className="customMaintenanceFormWidthContainer">
      <div className="add-form-component border border-dark border-2 border-bottom-0 border-left-0">
        <div className="d-flex col-12 fit-heightDispatchBrowse" style={{ maxHeight: "440px" }}>
          <div className="flex-grow-1">
            <div className="fixTableHead h-100" style={{ display: "flex", flexDirection: "column" }}>
              <table className="table border-bottom f-w-600">
                <thead>
                  <tr>
                    <th className="f-w-600">Description</th>
                    <th className="f-w-600">Number</th>
                    <th className="f-w-600">Serial Number</th>
                    <th className="f-w-600">Deposit</th>
                    <th className="f-w-600">Checked In</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" align="center">
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    paginatedArray.length > 0 &&
                    paginatedArray.map((item, index) => (
                      <tr
                        id="rowId"
                        key={item.equipmentHistoryPK}
                        onClick={() => {}}
                        onDoubleClick={() => {}}
                        className={`${item.checkInUserFK !== null ? "tableSelected" : ""}`}
                      >
                        <td>{item.description}</td>
                        <td>{item.equipmentNumber}</td>
                        <td>{item.serialNumber}</td>
                        <td>{item.depositAmount}</td>
                        <td style={{ minWidth: "100px" }}>
                          <input
                            type="checkbox"
                            className="form-check-input p-0"
                            id=""
                            name=""
                            onChange={(e) =>
                              dispatch(
                                setEquipmentReturnList({
                                  type: "update",
                                  id: item.equipmentHistoryPK,
                                  payload: e.target.checked,
                                })
                              )
                            }
                            checked={item.checkInUserFK !== null}
                            disabled={false}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {paginatedArray.length === 0 && (
                <h2 className="empty-list" align="center">
                  {t("dealers.list.empty.message")}
                </h2>
              )}
            </div>
          </div>
          <PaginationComponent
            {...paginationProps}
            recordsPerPage={QuarterScreen_RecordsPerPage}
            firstPage
            lastPage
            singleArrowUp
            singleArrowDown
            doubleArrowUp
            doubleArrowDown
            hideBorderBottom
            hideBorderRight
            hideBorderTop
          />
        </div>
      </div>
    </div>
  );
}

export default EquipmentReturnContent;
