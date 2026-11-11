import { formatForApi } from "../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../../../common/Button";
import ModalComponent from "../../../../common/ModalComponent";
import { Button, Modal } from "react-bootstrap";
import ReservesService from "../../../../../services/ReservesService";
import {
  resetChanges,
  setCancelFlag,
  setIsToDateValidation,
  setViewDetail,
} from "../../../../../redux/ReservesSlice";
import LoadingIcon from "../../../../common/LoadingIcon";
import { Colors } from "../../../../../styles/values/colors";
function ReservesFormFooter() {
  const { id, pageNumber } = useParams();

  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [reserveTypeData, setReserveTypeData] = useState([]);
  const [dateErr, setDateErr] = useState(false);
  const today = formatForApi(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeShow, setActiveShow] = useState(false);
  const [active, setActive] = useState(true);
  const [dependency, setDependency] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dependencyErrorMsg, setDependencyErrorMsg] = useState("");
  const [showDependencyModal, setShowDependencyModal] = useState(false);
  const editFormData = useSelector((state) => state.reservesReducer.editFormData);
  const isToDateValidation = useSelector((state) => state.reservesReducer.isToDateValidation);
  const viewDetail = useSelector((state) => state.reservesReducer.viewDetail);
  const description = useSelector((state) => state.reservesReducer.description);
  const reserveTypeInput = useSelector((state) => state.reservesReducer.reserveTypeInput);
  const isDescriptionUnique = useSelector((state) => state.reservesReducer.isDescriptionUnique);
  const reservePK = useSelector((state) => state.reservesReducer.reservePK);
  const reserveTypeId = useSelector((state) => state.reservesReducer.reserveTypeId);
  const reserveTypeFK = useSelector((state) => state.reservesReducer.reserveTypeFK);
  const amountToBeReserved = useSelector((state) => state.reservesReducer.amountToBeReserved);
  const deductMonthly = useSelector((state) => state.reservesReducer.deductMonthly);
  const deductYearly = useSelector((state) => state.reservesReducer.deductYearly);
  const deductionDate = useSelector((state) => state.reservesReducer.deductionDate);
  const deductDelease = useSelector((state) => state.reservesReducer.deductDelease);
  const percentageRequired = useSelector((state) => state.reservesReducer.percentageRequired);
  const deductionPercentage = useSelector((state) => state.reservesReducer.deductionPercentage);
  const mileageRequired = useSelector((state) => state.reservesReducer.mileageRequired);
  const deductionMileageRate = useSelector((state) => state.reservesReducer.deductionMileageRate);
  const restricted = useSelector((state) => state.reservesReducer.restricted);
  const concurrent = useSelector((state) => state.reservesReducer.concurrent);
  const required = useSelector((state) => state.reservesReducer.required);
  const overrideAmounts = useSelector((state) => state.reservesReducer.overrideAmounts);
  const reserveTypeSelection = useSelector((state) => state.reservesReducer.reserveTypeSelection);
  const monthlyActivityOverride = useSelector((state) => state.reservesReducer.monthlyActivityOverride);

  useEffect(() => {
    if (editFormData != null && editFormData.active != null) {
      setActive(editFormData.active);
    }
  }, [editFormData]);

  //starting save funtionality
  const saveRecord = () => {
    setLoading(true);
    ReservesService.createReserves(formData)
      .then((res) => {
        navigate(`/reserves`);
        if (id) toast.success("Reserve  Updated");
        else toast.success("Reserve Created");
      })
      .catch((err) => {
        navigate(`/reserves/${id}/${pageNumber}`);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const validateAndSave = () => {
    setLoading(true);
    ReservesService.checkDescriptionExist(id, description)
      .then((response) => {
        if (response.data) {
          setDisableSave(response.data);
          setLoading(false);
        } else {
          saveRecord();
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      dispatch(setCancelFlag(true));
      dispatch(setIsToDateValidation(true));
      setCancelShow(false);
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      navigate(`/reserves`);
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      dispatch(setCancelFlag(true));
      dispatch(setIsToDateValidation(true));
      setCancelShow(false);
      dispatch(setViewDetail(true));
      toast.success("Changes Cancelled");
    } else {
      dispatch(setCancelFlag(true));
      dispatch(setIsToDateValidation(true));
      navigate(`/reserves`);
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      toast.success("Changes Cancelled");
    }
  };

  const formData = {
    reservePK,
    reserveTypeId,
    description,
    amountToBeReserved,
    deductMonthly,
    monthlyActivityOverride,
    deductYearly,
    deductionDate,
    deductDelease,
    percentageRequired,
    deductionPercentage,
    mileageRequired,
    deductionMileageRate,
    restricted,
    concurrent,
    required,
    overrideAmounts,
  };

  const deactivateUsers = () => {
    setLoading(true);
    ReservesService.deactivateReserve(reservePK)
      .then((response) => {
        if (response.data === true) {
          setDependency(true);
          setActiveShow(false);
          setActive(false); //  move here, only update after success
          toast.success("Reserve Deactivated");
        } else {
          setDependency(false);
          setDependencyErrorMsg("Reserve cannot be deactivated due to existing dependencies!");
          setShowDependencyModal(true);
          setActiveShow(false);
        }
      })
      .catch((error) => {
        setDependencyErrorMsg("Something went wrong while deactivating!");
        setShowDependencyModal(true);
      })
      .finally(() => setLoading(false));
  };

  const activateUsers = () => {
    setLoading(true);
    ReservesService.activateReserve(reservePK)
      .then((response) => {
        setActiveShow(false);
        setActive(true); //  only here
        toast.success("Reserve Activated");
      })
      .catch((error) => {
        setDependencyErrorMsg("Something went wrong while activating!");
        setShowDependencyModal(true);
      })
      .finally(() => setLoading(false));
  };

  const handleActiveClose = () => setActiveShow(false);
  const handleActiveShow = () => setActiveShow(true);

  const handleActiveSave = (e) => {
    e.preventDefault();

    setActiveShow(false);
    if (active) {
      deactivateUsers(); // deactivateUsers itself will update state based on success/failure
    } else {
      activateUsers(); // activateUsers itself will update state
    }
  };

  useEffect(() => {
    if (
      description !== "" &&
      !isDescriptionUnique &&
      reserveTypeId &&
      (!amountToBeReserved || (Number(amountToBeReserved) > 0 && (percentageRequired || mileageRequired))) &&
      // blank or 0 = no monthly / delease deduction; both are valid
      (!deductMonthly || Number(deductMonthly) >= 0) &&
      // blank or 0 = no yearly deduction (optional); above 0 needs a valid deduction date
      (!deductYearly ||
        Number(deductYearly) === 0 ||
        (Number(deductYearly) > 0 && deductionDate && isToDateValidation)) &&
      (!deductDelease || Number(deductDelease) >= 0) &&
      ((percentageRequired && Number(deductionPercentage) > 0) || !percentageRequired) &&
      ((mileageRequired &&
        deductionMileageRate &&
        Number(deductionMileageRate) < 11 &&
        Number(deductionMileageRate) > 0) ||
        !mileageRequired) &&
      ((!percentageRequired && !mileageRequired) ||
        ((percentageRequired || mileageRequired) && Number(amountToBeReserved) > 0))
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [
    description,
    isDescriptionUnique,
    reserveTypeId,
    reserveTypeInput,
    amountToBeReserved,
    deductMonthly,
    deductYearly,
    deductionDate,
    deductDelease,
    percentageRequired,
    deductionPercentage,
    mileageRequired,
    deductionMileageRate,
    isToDateValidation,
  ]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap"></div>

      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={() => validateAndSave()}
        >
          Save
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5  m-b-5`}
          type="button"
          hidden={!viewDetail}
          onClick={handleActiveShow}
          style={active === false ? { backgroundColor: Colors.red } : { backgroundColor: "" }}
        >
          Active
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={false}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={"Edit"}
          hidden={!id || viewDetail === false}
          onClick={() => {
            // a new edit session - the next confirmed Cancel must turn the flag true again to reload
            dispatch(setCancelFlag(false));
            dispatch(setViewDetail(false));
          }}
        />
        {/* model Active*/}

        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Reserve Changes "}
          body={"Please confirm you want to cancel  changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        <ModalComponent
          show={activeShow}
          onHide={handleActiveClose}
          title={active ? "Deactivate Reserve" : "Activate Reserve"}
          body={
            active
              ? " Please confirm you want to Deactivate this Reserve"
              : " Please confirm you want to Activate this Reserve"
          }
          handleYES={handleActiveSave}
          handleNO={handleActiveClose}
        />

        <Modal
          show={showDependencyModal}
          onHide={() => setShowDependencyModal(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 temp-red-color">
              Deactivation failed due to dependency!
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="font-14 h-100">{dependencyErrorMsg}</Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDependencyModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default ReservesFormFooter;
