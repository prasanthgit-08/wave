import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../../../common/Button";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetDispatchSelectionFilters,
  resetOutputconfirmationScreen,
  setActive,
  setActiveString,
  setDeleased,
  setDispatchId,
  setDriverId,
  setFirstName,
  setLastName,
  setListingData,
  setPageNumber,
  setSearchCriteria,
  setSortType,
  setSortValue,
} from "../../../../redux/ReprintBolSlice";
import { useEffect, useState } from "react";
import ModalComponent from "../../../common/ModalComponent";

function ReprintDriverSelectionFooter({ handleClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const driverId = useSelector((state) => state.reprintBolReducer.driverId);

  const nextEnabled = useSelector((state) => state.reprintBolReducer.nextEnabled);
  const dispatchId = useSelector((state) => state.reprintBolReducer.dispatchId);
  const { id } = useParams();
  const [warningModal, setWarningModal] = useState(false);

  const rePrintBOL = useSelector((state) => state.reprintBolReducer.rePrintBOL);
  const listingData = useSelector((state) => state.reprintBolReducer.listingData);

  useEffect(() => {
    if (driverId && nextEnabled === 0) {
      setWarningModal(true);
    } else if (driverId && nextEnabled === 1) {
      setWarningModal(false);
    } else if (driverId && nextEnabled === 2) {
      setWarningModal(false);
    }
  }, [nextEnabled, driverId]);

  const handleOK = () => {
    setWarningModal(false);
  };

  useEffect(() => {
    if (!rePrintBOL) {
      navigate("/reprint-selection-screen");
    }
  }, [rePrintBOL]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={() => {
            dispatch(setListingData([]));

            if (driverId && nextEnabled === 1) {
              navigate(`/reprint-dispatch-confirmation-screen/${dispatchId}`);
            } else if (driverId && nextEnabled === 2) {
              navigate(`/reprint-dispatch-selection-screen`);
            }
          }}

          disabled={!driverId || !nextEnabled}
        >
          Next
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            navigate(`/reprint-selection-screen`);
            dispatch(setSearchCriteria("Beginning"));
            dispatch(setActiveString("All"));
            dispatch(setActive(null));
            dispatch(setDeleased(null));
            dispatch(setFirstName(""));
            dispatch(setLastName(""));
            dispatch(setDriverId(null));

            dispatch(setSortType(null));
            dispatch(setPageNumber(0));
            dispatch(resetOutputconfirmationScreen());
            dispatch(resetDispatchSelectionFilters());

            dispatch(setDispatchId(null));

            handleClose();
          }}
        >
          Cancel
        </button>
      </div>
      <ModalComponent
        show={warningModal}
        onHide={handleOK}
        title={"Warning!!"}
        body={"Driver does not have any Active Dispatch"}
        handleOK={handleOK}
        showOK
      />
    </div>
  );
}

export default ReprintDriverSelectionFooter;
