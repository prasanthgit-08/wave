import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import { Button, Modal } from "react-bootstrap";
import {
  resetCustomerOrders,
  setPageNumber,
  setViewDetail,
  toggleChangesCancelled,
  setColumnId,
  setColumnsEditFormData,
  setTestFile,
  setDisableSave,
  setSpecialCondition,
  triggerAddCondition,
} from "../../../../redux/CustomerOrdersSlice";
import { resetChanges } from "../../../../redux/CustomerOrdersSlice";
import CustomerOrdersService from "../../../../services/CustomerOrdersService";
import LoadingIcon from "../../../common/LoadingIcon";
function CustomerOrderFooter() {
  const { id, pageNumber } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validateloading, setValidateLoading] = useState(false);
  const viewDetail = useSelector((state) => state.customerOrdersReducer.viewDetail);
  const disableSave = useSelector((state) => state.customerOrdersReducer.disableSave);
  const customerOrders = useSelector((state) => state.customerOrdersReducer.customerOrders);
  const customerOrdersColumnList = useSelector(
    (state) => state.customerOrdersReducer.customerOrdersColumnList
  );
  const description = useSelector((state) => state.customerOrdersReducer.description);
  const specialConditionsList = useSelector((state) => state.customerOrdersReducer.specialConditionsList);
  const activeOrderTab = useSelector((state) => state.customerOrdersReducer.activeOrderTab);
  const editFormData = useSelector((state) => state.customerOrdersReducer.editFormData);
  const radioValue = useSelector((state) => state.customerOrdersReducer.radioValue);
  const delimited = useSelector((state) => state.customerOrdersReducer.delimited);
  const delimiter = useSelector((state) => state.customerOrdersReducer.delimiter);
  const hasHeaders = useSelector((state) => state.customerOrdersReducer.hasHeaders);
  const headerRows = useSelector((state) => state.customerOrdersReducer.headerRows);
  const customerId = useSelector((state) => state.customerOrdersReducer.customerId);
  const customerInput = useSelector((state) => state.customerOrdersReducer.customerInput);

  const savedConditions = Object.keys(editFormData?.specialConditionsObj || {})
    .sort((a, b) => (parseInt(a.replace(/\D/g, ""), 10) || 0) - (parseInt(b.replace(/\D/g, ""), 10) || 0))
    .map((key) => editFormData.specialConditionsObj[key]);

  const conditionsChanged =
    (specialConditionsList || [])?.length !== savedConditions?.length ||
    (specialConditionsList || [])?.some((condition, index) => condition !== savedConditions[index]);

  const hasChanges = editFormData
    ? description !== (editFormData.Description || "") ||
      String(customerId ?? "") !== String(editFormData.CustomerFK ?? "") ||
      customerInput !== (editFormData.Customer || "") ||
      radioValue !== editFormData.FileType ||
      delimited !== Boolean(editFormData.Delimited) ||
      delimiter !== (editFormData.Delimiter || "") ||
      hasHeaders !== Boolean(editFormData.HasHeaders) ||
      String(headerRows ?? "") !== String(editFormData.HeaderRows || "") ||
      conditionsChanged
    : !!(
        description ||
        customerId ||
        customerInput ||
        delimited ||
        delimiter ||
        hasHeaders ||
        headerRows ||
        conditionsChanged ||
        (radioValue && radioValue !== "txtFile")
      );

  // Shape the conditions list into { Condition1: "...", Condition2: "...", ... } for the payload.
  const buildSpecialConditions = (list) =>
    (list || [])?.reduce((acc, text, index) => {
      acc[`Condition${index + 1}`] = text;
      return acc;
    }, {});

  const handleCancelShow = () => {
    if (viewDetail === false || id === undefined) {
      //edit page
      if (!hasChanges) {
        handleCancelYes();
        return;
      }
      setCancelShow(true);
    } else {
      //view page
      setCancelShow(false);
      dispatch(resetCustomerOrders());
      dispatch(setViewDetail(false));
      navigate("/customer-orders");
      if (hasChanges) toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(toggleChangesCancelled());
      if (hasChanges) toast.success("Changes Cancelled");
    } else {
      navigate("/customer-orders");
      dispatch(setViewDetail(false));
      dispatch(resetCustomerOrders());
      dispatch(setSpecialCondition(""));
      if (hasChanges) toast.success("Changes Cancelled");
    }
  };

  //Delete Customer Order
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    setLoading(true);
    CustomerOrdersService.deleteCustomerOrders(id)
      .then((response) => {
        dispatch(setSpecialCondition(""));
        navigate("/customer-orders");
        toast.success("Customer Order Deleted");
      })
      .catch((error) => {
        setErrorShow(true);
        setErrorMsg(error?.response?.data?.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => {
        setLoading(false);
        setDeleteShow(false);
      });
  };

  //Create or Update Customer Order Record
  const handleSave = () => {
    setLoading(true);
    CustomerOrdersService.createorUpdateCustomerOrders({
      ...customerOrders,
      specialConditionsObj: buildSpecialConditions(specialConditionsList),
    })
      .then((response) => {
        navigate("/customer-orders");
        if (id) {
          toast.success("Customer Orders Updated");
        } else {
          toast.success("Customer Orders Created");
        }
        dispatch(setSpecialCondition(""));
      })
      .catch((error) => {
        navigate("/customer-orders");
        dispatch(setSpecialCondition(""));
        if (id) {
          toast.error("Failed to Update Customer Orders");
        } else {
          toast.error("Failed to Create Customer Orders");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const validateSave = () => {
    setValidateLoading(true);
    CustomerOrdersService.checkDescriptionExist(id, description)
      .then((res) => {
        if (res?.data) {
          dispatch(setDisableSave(true));
        } else {
          handleSave();
        }
      })
      .catch((err) => {
        dispatch(setDisableSave(false));
      })
      .finally(() => {
        setValidateLoading(false);
      });
  };
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        {(loading || validateloading) && <LoadingIcon />}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={!viewDetail}
          onClick={() => {
            navigate(`/customer-orders-column/${id}/${pageNumber}`);
            dispatch(setColumnId(null));
            dispatch(setColumnsEditFormData(null));
          }}
        >
          Columns
        </button>
      </div>

      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={!viewDetail}
          onClick={() => {
            navigate(`/customer-orders/test/${id}/${pageNumber}`);
            dispatch(setTestFile([]));
          }}
          disabled={customerOrdersColumnList?.length === 0}
        >
          Test
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={viewDetail || activeOrderTab !== "conditions"}
          onClick={() => dispatch(triggerAddCondition())}
        >
          Add Condition
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={viewDetail}
          disabled={disableSave}
          onClick={validateSave}
        >
          Save
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handleCancelShow}
        >
          Cancel
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={(e) => {
            dispatch(setViewDetail(false));
          }}
          hidden={!viewDetail}
        >
          Edit
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={!viewDetail || !id}
          onClick={handleDelete}
        >
          Delete
        </button>
        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Customer Order Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Customer Order"}
          body={"Please confirm you want to Delete this Customer Order"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
        <Modal show={errorShow} onHide={() => setErrorShow(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 temp-red-color">Delete failed!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="font-14 h-100">{errorMsg}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setErrorShow(false)}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
export default CustomerOrderFooter;
