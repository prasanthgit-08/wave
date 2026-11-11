import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UndispatchService from "../../../../../../../../services/UndispatchService";
import {
  addToCheckinList,
  removeFromCheckinList,
  setEquipmentHistoryData,
  setEquipmentHistorySortFlag,
  setEquipmentHistorySortValue,
  setEquipmentHistoryTotalElements,
  setEquipmentHistoryTotalPages,
  setEquipmentReturned,
} from "../../../../../../../../redux/UndispatchSlice";
import LoadingText from "../../../../../../../common/LoadingText";
const EquipmentReturnList = () => {
  const dispatch = useDispatch();
  const [load, setload] = useState(false);

  const { dispatchId } = useParams();
  const equipmentHistorySortFlag = useSelector((state) => state.undispatchReducer.equipmentHistorySortFlag);
  const equipmentHistorySortValue = useSelector((state) => state.undispatchReducer.equipmentHistorySortValue);
  const equipmentHistoryData = useSelector((state) => state.undispatchReducer.equipmentHistoryData);
  const equipmentHistoryPageNumber = useSelector(
    (state) => state.undispatchReducer.equipmentHistoryPageNumber
  );

  const checkedinList = useSelector((state) => state.undispatchReducer.checkedinList);
  const fetchEquipmentHistoryList = () => {
    setload(true);
    UndispatchService.getEquipmentHistoryData(
      dispatchId,
      equipmentHistoryPageNumber,
      11,
      equipmentHistorySortValue,
      equipmentHistorySortFlag
    )
      .then(({ data }) => {
        dispatch(setEquipmentHistoryData(data.content));
        dispatch(setEquipmentHistoryTotalElements(data.totalElements));
        dispatch(setEquipmentHistoryTotalPages(data.totalPages));
        setload(false);
      })
      .catch(() => {
        setload(false);
      });
  };

  useEffect(() => {
    fetchEquipmentHistoryList();
  }, [equipmentHistoryPageNumber, equipmentHistorySortValue, equipmentHistorySortFlag]);
  const handleNormalSort = (val, data) => {
    dispatch(setEquipmentHistorySortValue(val));
    dispatch(setEquipmentHistorySortFlag(data));
  };

  return (
    <div className="fixTableHead ">
      <div>
        <table className="table table-striped f-w-600 mb-0">
          <thead>
            <tr disabled>
              <th className="f-w-600">Returned</th>
              <th
                className="f-w-600"
                onClick={() => {
                  handleNormalSort("equipmentNumber", !equipmentHistorySortFlag);
                }}
              >
                Equipment Number
                {equipmentHistorySortFlag && equipmentHistorySortValue === "equipmentNumber" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!equipmentHistorySortFlag && equipmentHistorySortValue === "equipmentNumber" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600"
                onClick={() => {
                  handleNormalSort("equipmentDescription", !equipmentHistorySortFlag);
                }}
              >
                Description
                {equipmentHistorySortFlag && equipmentHistorySortValue === "equipmentDescription" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!equipmentHistorySortFlag && equipmentHistorySortValue === "equipmentDescription" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>{" "}
          </thead>
          <tbody>
            {!load &&
              equipmentHistoryData?.map((item, index) => (
                <tr id="rowId" key={index} onClick={() => {}}>
                  {" "}
                  <td className="f-w-600">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="multiUnitRelease"
                      name="multiUnitRelease"
                      checked={checkedinList.includes(item.equipmentHistoryPK)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          dispatch(addToCheckinList(item.equipmentHistoryPK));
                        } else {
                          dispatch(removeFromCheckinList(item.equipmentHistoryPK));
                        }
                      }}
                    />
                  </td>
                  <td className="f-w-600"> {item.equipmentNumber} </td>
                  <td className="f-w-600"> {item.equipmentDescription} </td>
                </tr>
              ))}
          </tbody>
        </table>

        {equipmentHistoryData?.length === 0 && !load && (
          <h2 className="empty-list" align="center">
            No Records Available
          </h2>
        )}

        {load && <LoadingText />}
      </div>
    </div>
  );
};

export default EquipmentReturnList;
