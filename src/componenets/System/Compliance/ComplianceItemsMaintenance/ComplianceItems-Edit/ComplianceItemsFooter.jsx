import React from "react";
import { t } from "i18next";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import ModalComponent from "../../../../common/ModalComponent";
import {
  resetChanges,
  setViewDetail,
  toggleChangesCancelled,
} from "../../../../../redux/ComplianceItemsSlice";
import ComplianceItemsService from "../../../../../services/ComplianceItemsService";
import { Colors } from "../../../../../styles/values/colors";
import { Button, Modal } from "react-bootstrap";
import LoadingIcon from "../../../../common/LoadingIcon";
const ComplianceItemsFooter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [activeShow, setActiveShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleActiveShow = () => setActiveShow(true);
  const handleActiveClose = () => setActiveShow(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [active, setActive] = useState("");
  const [load, setLoad] = useState(false);
  const viewDetail = useSelector((state) => state.complianceItemsReducer.viewDetail);
  const saveFormData = useSelector((state) => state.complianceItemsReducer.saveFormData);
  const useLastDate = useSelector((state) => state.complianceItemsReducer.useLastDate);
  const useNextDate = useSelector((state) => state.complianceItemsReducer.useNextDate);
  const useBlockDate = useSelector((state) => state.complianceItemsReducer.useBlockDate);
  const description = useSelector((state) => state.complianceItemsReducer.description);
  const driverDescription = useSelector((state) => state.complianceItemsReducer.driverDescription);
  const objectKey = useSelector((state) => state.complianceItemsReducer.objectKey);
  const restricted = useSelector((state) => state.complianceItemsReducer.restricted);
  const checkObjectKeyExist = useSelector((state) => state.complianceItemsReducer.checkObjectKeyExist);
  const checkDescriptionExist = useSelector((state) => state.complianceItemsReducer.checkDescriptionExist);
  const editFormData = useSelector((state) => state.complianceItemsReducer.editFormData);
  const checkDriverDescriptionExist = useSelector(
    (state) => state.complianceItemsReducer.checkDriverDescriptionExist
  );

  //cancel
  const handleCancelShow = () => {
    if (viewDetail === false || id === undefined) {
      // edit page
      setCancelShow(true);
    } else {
      // view page
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/compilance-items");
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(toggleChangesCancelled());
      toast.success("Changes Cancelled");
    } else {
      navigate("/compilance-items");
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      toast.success("Changes Cancelled");
    }
  };
  //delete
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    setLoading(true);
    ComplianceItemsService.deleteComplianceItems(id)
      .then((response) => {
        navigate("/compilance-items");
        toast.success("Compliance Item Deleted");
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => setLoading(false));
    setDeleteShow(false);
  };
  //save
  useEffect(() => {
    if (
      description !== "" &&
      driverDescription !== "" &&
      !checkDescriptionExist &&
      !checkDriverDescriptionExist &&
      (useBlockDate === true || useNextDate === true || useLastDate === true) &&
      ((restricted == false && objectKey === "" && !checkObjectKeyExist) ||
        (restricted == false && objectKey && !checkObjectKeyExist) ||
        (restricted == true && objectKey !== "" && !checkObjectKeyExist))
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [
    description,
    driverDescription,
    checkDescriptionExist,
    useBlockDate,
    useLastDate,
    useNextDate,
    restricted,
    objectKey,
    checkDriverDescriptionExist,
    checkObjectKeyExist,
  ]);
  const saveData = () => {
    setLoad(true);
    ComplianceItemsService.createComplianceItems(saveFormData)

      .then((res) => {
        if (id) {
          toast.success("Compliance Item Updated");
        } else {
          toast.success("Compliance Item Created");
        }
        setLoad(false);
        navigate("/compilance-items");
      })
      .catch((err) => {
        navigate("/compilance-items");
        setLoad(false);
        toast.error("Something went wrong");
        console.log(err);
      });
  };
  //Activate-Deactivate
  useEffect(() => {
    if (editFormData != null && null != editFormData.active) {
      setActive(editFormData.active);
    }
  }, [editFormData]);

  const handleActiveSave = (e) => {
    setActiveShow(false);
    if (active === true) {
      deActivateComplianceItems();
    } else {
      activateComplianceItems();
    }
  };
  const activateComplianceItems = () => {
    setLoading(true);
    ComplianceItemsService.activateComplianceItems(id)
      .then(() => {
        setActiveShow(false);
        setActive(true);
        toast.success("Compliance Item Activated");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => setLoading(false));
  };
  const deActivateComplianceItems = () => {
    setLoading(true);
    ComplianceItemsService.deActivateComplianceItems(id)
      .then(() => {
        setActiveShow(false);
        setActive(false);
        toast.success("Compliance Item Deactivated");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => setLoading(false));
  };

  const validateAndSave = () => {
    setLoad(true);
    ComplianceItemsService.checkuniquesave(description, driverDescription, objectKey, id)
      .then((response) => {
        if (response.data) {
          setLoad(true);
          setDisableSave(response.data);
          setLoad(false);
        } else {
          saveData();
        }
      })
      .catch((err) => {
        setLoad(true);
        setDisableSave(true);
      });
  };
  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!id || viewDetail === false}
          onClick={handleActiveShow}
          style={active === false ? { backgroundColor: Colors.red } : { backgroundColor: "" }}
        >
          Active
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={validateAndSave}
        >
          Save
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleCancelShow}
        >
          Cancel
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={!id || viewDetail === false}
          onClick={() => dispatch(setViewDetail(false))}
        >
          Edit
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={!id || viewDetail === false}
          onClick={handleDelete}
        >
          Delete
        </button>
        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Compliance Item Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Compliance Item"}
          body={"Please confirm you want to Delete this Compliance Item"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
        {/* model Active*/}
        <ModalComponent
          show={activeShow}
          onHide={handleActiveClose}
          title={active === true ? "Deactivate Compliance Item" : "Activate Compliance Item"}
          body={
            active === true
              ? " Please confirm you want to Deactivate this Compliance Item"
              : " Please confirm you want to Activate this Compliance Item"
          }
          handleYES={handleActiveSave}
          handleNO={handleActiveClose}
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
      {load && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceItemsFooter;
