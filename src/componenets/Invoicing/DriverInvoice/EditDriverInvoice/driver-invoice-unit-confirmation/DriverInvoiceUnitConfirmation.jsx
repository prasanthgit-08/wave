import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFields,
  setEmailToDriver,
  setEmaiToUser,
  setViewDetail,
} from "../../../../../redux/DriverInvoiceSlice";
import DriverInvoiceUnitConfirmationContent from "./DriverInvoiceUnitConfirmationContent";
import QuarterScreenWrapper from "../../../../Templates/Screens/QuarterScreenWrapper";
import ButtonComponent from "../../../../common/Button";

const DriverInvoiceUnitConfirmation = () => {
  const params = useParams();
  const unitId = params.unitId;
  const driverId = params.driverId;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const unitFK = useSelector((state) => state.driverInvoiceReducer.unitFK);

  return (
    <QuarterScreenWrapper>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            navigate(`/`);
          }}
        >
          Close
        </button>
      </div>
      <>
        <DriverInvoiceUnitConfirmationContent />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              const path = driverId
                ? `/driver-invoice-unit-selection/${driverId}`
                : `/driver-invoice-unit-selection`;

              navigate(path);
            }}
          >
            Back
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              dispatch(setViewDetail(true));
              dispatch(setEmaiToUser(false));
              dispatch(setEmailToDriver(false));

              const path = driverId
                ? `/driver-invoice-detail/${driverId}/${unitId}`
                : `/driver-invoice-detail/${unitId || unitFK}`;

              navigate(path);
            }}
          >
            Next
          </button>

          <ButtonComponent
            route={"/driver-invoice-browse"}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={() => {
              dispatch(resetFields());
            }}
            label={"Cancel"}
          />
        </div>
      </div>
    </QuarterScreenWrapper>
  );
};

export default DriverInvoiceUnitConfirmation;
