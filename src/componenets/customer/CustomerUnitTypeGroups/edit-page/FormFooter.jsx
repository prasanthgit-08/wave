import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../../common/Button";
import ModalComponent from "../../../common/ModalComponent";

import {
  resetNormalSort,
  resetStates,
  setAssignedPageNumber,
  setAssignSortFlag,
  setAssignSortValue,
  setChangesCancelled,
  setCheckDpu,
  setEditFormData,
  setIsDescriptionUnique,
  setLeftPageNumber,
  setMotorized,
  setPageNumberUT,
  setRadioValue,
  setViewDetail,
} from "../../../../redux/CustomerUnitTypeGroupSlice";
import { Button, Modal } from "react-bootstrap";
import CustomerUnitTypeGroupsService from "../../../../services/CustomerUnitTypeGroupsService";

function FormFooter() {
  const { id, pageNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [disableContinue, setDisableContinue] = useState(true);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const currentURL = window.location.pathname;
  const [loading, setLoading] = useState(false);

  const customerPlantId = useSelector((state) => state.customerUnitTypeGroupReducer.customerPlantId);
  const customerGroupId = useSelector((state) => state.customerUnitTypeGroupReducer.customerGroupId);
  const customerPlantGroupId = useSelector(
    (state) => state.customerUnitTypeGroupReducer.customerPlantGroupId
  );
  const customerSelection = useSelector((state) => state.customerUnitTypeGroupReducer.customerSelection);
  const customerInput = useSelector((state) => state.customerUnitTypeGroupReducer.customerInput);
  const customerId = useSelector((state) => state.customerUnitTypeGroupReducer.customerId);
  const searchCriteria = useSelector((state) => state.customerUnitTypeGroupReducer.searchCriteria);
  const customerPlantSelection = useSelector(
    (state) => state.customerUnitTypeGroupReducer.customerPlantSelection
  );
  const customerPlantGroupSelection = useSelector(
    (state) => state.customerUnitTypeGroupReducer.customerPlantGroupSelection
  );
  const customerPlantGroupInput = useSelector(
    (state) => state.customerUnitTypeGroupReducer.customerPlantGroupInput
  );
  const customerGroupSelection = useSelector(
    (state) => state.customerUnitTypeGroupReducer.customerGroupSelection
  );
  const customerGroupInput = useSelector((state) => state.customerUnitTypeGroupReducer.customerGroupInput);

  const viewDetail = useSelector((state) => state.customerUnitTypeGroupReducer.viewDetail);

  const customerPlantInput = useSelector((state) => state.customerUnitTypeGroupReducer.customerPlantInput);
  const description = useSelector((state) => state.customerUnitTypeGroupReducer.description);
  const type = useSelector((state) => state.customerUnitTypeGroupReducer.type);
  const notes = useSelector((state) => state.customerUnitTypeGroupReducer.notes);
  const customerunittypegroupPK = useSelector(
    (state) => state.customerUnitTypeGroupReducer.customerunittypegroupPK
  );
  const isDescriptionUnique = useSelector((state) => state.customerUnitTypeGroupReducer.isDescriptionUnique);
  const towable = useSelector((state) => state.customerUnitTypeGroupReducer.towable);
  const motorized = useSelector((state) => state.customerUnitTypeGroupReducer.motorized);
  const radioValue = useSelector((state) => state.customerUnitTypeGroupReducer.radioValue);
  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);

      dispatch(setViewDetail(false));
      dispatch(setAssignSortFlag(false));
      dispatch(setAssignSortValue(null));
      dispatch(setAssignedPageNumber(0));
      navigate(`/customer-unit-type-groups`);
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(setChangesCancelled());
      dispatch(setIsDescriptionUnique(false));

      toast.success("Changes Cancelled");
    } else {
      navigate(`/customer-unit-type-groups`);
      dispatch(setViewDetail(false));
      dispatch(setIsDescriptionUnique(false));

      toast.success("Changes Cancelled");
    }
  };
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    CustomerUnitTypeGroupsService.deleteRecord(id)
      .then((response) => {
        navigate(`/customer-unit-type-groups`);
        toast.success("Customer Unit Type Group Deleted");
        dispatch(setEditFormData(null));
        dispatch(resetStates());
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err?.response?.data?.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(err?.response?.data?.errorMsg || "Something went wrong!! Failed to delete!!");
      });
    setDeleteShow(false);
  };

  //starting save funtionality
  const saveRecord = () => {
    setLoading(true);
    CustomerUnitTypeGroupsService.createOrUpdateRecord(formData)
      .then((res) => {
        setLoading(false);
        if (id) toast.success("Customer Unit Type Group  Updated");
        else toast.success("Customer Unit Type Group Created");
        navigate(`/customer-unit-type-groups`);
        dispatch(resetStates());
        dispatch(resetNormalSort());
        dispatch(setAssignSortValue(null));
        dispatch(setPageNumberUT(0));
      })
      .catch((err) => {
        navigate(`/customer-unit-type-groups`);
        setLoading(false);
        toast.error("Something went wrong");
      });
  };
  //ending save functionality...........................................

  const handleContinue = () => {
    navigate(`/customer-unit-type-groups-add`);
    dispatch(setRadioValue("Motorized"));
  };

  const formData = {
    customerunittypegroupPK: id,
    description,
    notes: notes,
    customerId: customerId,
    customerPlantId: customerPlantId,
    customerPlantGroupId: customerPlantGroupId,
    customerGroupId: customerGroupId,
    //towable: towable,
    //torized: motorized,
    towable: radioValue === "Towable",
    motorized: radioValue === "Motorized",
  };

  useEffect(() => {
    if (customerId || customerPlantGroupId || customerPlantId || customerGroupId) {
      setDisableContinue(false);
    } else {
      setDisableContinue(true);
    }
  }, [customerId, customerPlantGroupId, customerPlantId, customerGroupId]);
  useEffect(() => {
    if (
      description != "" &&
      !isDescriptionUnique &&
      // (motorized || towable) &&

      (radioValue == "Motorized" || radioValue == "Towable") &&
      (customerGroupId || customerId || customerPlantGroupId || customerPlantId)
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [
    isDescriptionUnique,
    description,
    towable,
    motorized,
    customerGroupId,
    customerPlantGroupId,
    customerId,
    customerPlantId,
    radioValue,
  ]);

  const validateAndSave = () => {
    setLoading(true);
    CustomerUnitTypeGroupsService.checkDescriptionExist(description, id)
      .then((response) => {
        if (response?.data) {
          setLoading(false);
          setDisableSave(response?.data);
        } else {
          saveRecord();
        }
      })
      .catch((err) => {
        setLoading(false);
        setDisableSave(true);
      });
  };
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap">
      <div className="d-flex align-items-center flex-wrap"></div>

      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={
            currentURL === `/customer-unit-type-groups-add/${id}/${pageNumber}` ||
            currentURL === `/customer-unit-type-groups-add/${id}/${pageNumber}` ||
            currentURL === `/customer-unit-type-groups-add`
          }
          onClick={() => handleContinue()}
          disabled={disableContinue}
        >
          Continue
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={viewDetail || currentURL === `/customer-unit-type-groups-selection`}
          disabled={disableSave}
          onClick={validateAndSave}
        >
          Save
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          disabled={radioValue == null}
          hidden={!viewDetail || !id}
          onClick={() => {
            navigate("/customer-unit-type-groups/groups-list/" + id);

            dispatch(setLeftPageNumber(0));
            dispatch(setAssignedPageNumber(0));
            dispatch(resetNormalSort());
          }}
        >
          UT Groups
        </button>

        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={"Edit"}
          hidden={!viewDetail || currentURL === `/customer-unit-type-groups-selection`}
          onClick={() => {
            dispatch(setViewDetail(false));
          }}
        />
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!viewDetail || currentURL === `/customer-unit-type-groups-selection`}
          onClick={handleDelete}
          disabled={""}
        >
          Delete
        </button>

        {/* model Active*/}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel  Customer Unit Type Group Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Customer Unit Type Group"}
          body={"Please confirm you want to Delete this Customer Unit Type Group"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
        <Modal show={errorShow} onHide={() => setErrorShow(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 temp-red-color">Delete failed!</Modal.Title>
          </Modal.Header>

          <Modal.Body className="font-14 h-100">{errorMsg}</Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setErrorShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {loading && (
          <div className="fade modal-backdrop show">
            {" "}
            <div className="pos-center">
              {" "}
              <div className="loader"></div>
            </div>
          </div>
        )}
        {/* model Active*/}
      </div>
    </div>
  );
}

export default FormFooter;
