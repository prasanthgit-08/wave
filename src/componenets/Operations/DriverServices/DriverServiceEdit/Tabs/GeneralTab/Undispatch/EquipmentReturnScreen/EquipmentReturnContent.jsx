import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PaginationComponent } from "../../../../../../../common/PaginationComponent";
import EquipmentReturnList from "./EquipmentReturnList";
import { setEquipmentHistoryPageNumber } from "../../../../../../../../redux/UndispatchSlice";
import { useNavigate, useParams } from "react-router-dom";
const EquipmentReturnContent = () => {
  const navigate = useNavigate();
  const { dispatchId, driverId } = useParams();
  const equipmentHistoryData = useSelector((state) => state.undispatchReducer.equipmentHistoryData);
  const equipmentHistoryTotalPages = useSelector(
    (state) => state.undispatchReducer.equipmentHistoryTotalPages
  );

  const equipmentHistoryTotalElements = useSelector(
    (state) => state.undispatchReducer.equipmentHistoryTotalElements
  );
  const equipmentHistoryPageNumber = useSelector(
    (state) => state.undispatchReducer.equipmentHistoryPageNumber
  );
  const undispatchFlag = useSelector((state) => state.undispatchReducer.undispatchFlag);
  const paginationProps = {
    pageNumber: equipmentHistoryPageNumber,
    setPageNumber: setEquipmentHistoryPageNumber,
    totalPages: equipmentHistoryTotalPages,
    totalElements: equipmentHistoryTotalElements,
    listingData: equipmentHistoryData,
  };

  useEffect(() => {
    if (!undispatchFlag) {
      navigate(`/undispatch/${driverId}`);
    }
  }, [undispatchFlag]);
  return (
    <div className="container-fluid table-bordered">
      <div className=" ">
        <div className="row border border-dark border-1 fit-quarterScreenFormContentHeight">
          <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
            <div className="d-flex h-440px">
              <div className="w-100">
                <EquipmentReturnList />
              </div>
              <PaginationComponent {...paginationProps} firstPage lastPage singleArrowUp singleArrowDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentReturnContent;
