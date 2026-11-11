import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setChangesCancelled, setViewDetail } from "../../../../../../../../redux/DispatchRestrictionsSlice";
import ButtonComponent from "../../../../../../../common/Button";
import ModalComponent from "../../../../../../../common/ModalComponent";
import DispatchRestrictionsService from "../../../../../../../../services/DispatchRestrictionsService";

function Footer({ styles }) {
  const { driverId, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disableSave, setDisableSave] = useState(true);
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const viewDetail = useSelector((state) => state.dispatchRestrictionsReducer.viewDetail);
  const notes = useSelector((state) => state.dispatchRestrictionsReducer.notes);
  const allowDispatch = useSelector((state) => state.dispatchRestrictionsReducer.allowDispatch);
  const dispatchRestrictionsPK = useSelector(
    (state) => state.dispatchRestrictionsReducer.dispatchRestrictionsPK
  );
  const customerId = useSelector((state) => state.dispatchRestrictionsReducer.customerId);
  const dealerId = useSelector((state) => state.dispatchRestrictionsReducer.dealerId);
  const specialCodeId = useSelector((state) => state.dispatchRestrictionsReducer.specialCodeId);
  const stateCode = useSelector((state) => state.dispatchRestrictionsReducer.stateCode);
  const combinationCheck = useSelector((state) => state.dispatchRestrictionsReducer.combinationCheck);

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));

      navigate(`/dispatch-restrictions/${driverId}`);
      toast.success("Changes Cancelled");
    }
  };

  // save validation

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setChangesCancelled(true));
      dispatch(setViewDetail(true));
      toast.success("Changes Cancelled");
    } else {
      navigate(`/dispatch-restrictions/${driverId}`);
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };

  useEffect(() => {
    if ((stateCode || dealerId || customerId || specialCodeId) && notes && !combinationCheck) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [customerId, dealerId, notes, specialCodeId, stateCode, combinationCheck]);

  const formData = {
    driverDispatchRestrictionPK: dispatchRestrictionsPK,
    driverFK: driverId,
    stateCode,
    customerFK: customerId,
    specialCodeFK: specialCodeId,
    dealerFK: dealerId,
    notes,
    allowDispatch: allowDispatch ? allowDispatch : false,
  };
  const saveRecord = () => {
    setLoading(true);
    DispatchRestrictionsService.createOrUpdateRecord(formData)

      .then((res) => {
        if (id) {
          toast.success("Dispatch Restrictions Updated");
        } else {
          toast.success("Dispatch Restrictions Created");
        }
        navigate(`/dispatch-restrictions/${driverId}`);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    DispatchRestrictionsService.deleteRecord(id)
      .then((response) => {
        navigate(`/dispatch-restrictions/${driverId}`);
        toast.success("Dispatch Restrictions Deleted");
      })
      .catch((err) => {
        toast.error("Dependency relationships exist can't be deleted");
      });
    setDeleteShow(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        {loading && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          type=""
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={() => saveRecord()}
        >
          Save
        </button>

        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={!id || viewDetail === false}
          onClick={() => {
            dispatch(setViewDetail(false));
          }}
          label={"Edit"}
        />

        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={!id || viewDetail === false}
          onClick={handleDelete}
          label={"Delete"}
        />
        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>

        {/* Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Dispatch Restriction  Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Dispatch Restriction  "}
          body={"Please confirm you want to delete this Dispatch Restriction"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
      </div>
    </div>
  );
}

export default Footer;
