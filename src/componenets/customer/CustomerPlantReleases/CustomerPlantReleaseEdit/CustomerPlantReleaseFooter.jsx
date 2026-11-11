import React, { useState } from "react";
import {
  resetPlantReleases,
  setViewDetail,
  setAssignedPageNumber,
  setColumnId,
  setColumnsEditFormData,
  setTestFile,
  setDisableSave,
  setUniqueLoading,
  setIsDescriptionUnique,
  setDescription,
  setHasHeaders,
  setHeaderRows,
  setDelimited,
  setDelimiter,
  setFileType,
  resetChanges,
  setColumnsSaveLoading,
  setEditPageLoading,
  setDeleteLoading,
} from "../../../../redux/CustomerPlantReleasesSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import { Button, Modal } from "react-bootstrap";
import CustomerPlantReleaseService from "../../../../services/CustomerPlantReleaseService";

const CustomerPlantReleaseFooter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const viewDetail = useSelector((state) => state.customerPlantReleaseReducer.viewDetail);
  const disableSave = useSelector((state) => state.customerPlantReleaseReducer.disableSave);
  const plantReleases = useSelector((state) => state.customerPlantReleaseReducer.plantReleases);
  const editFormData = useSelector((state) => state.customerPlantReleaseReducer.editFormData);

  const restoreFromEditFormData = () => {
    if (editFormData) {
      const data = Array.isArray(editFormData) ? editFormData[0] : editFormData;
      dispatch(setDescription(data?.description || ""));
      dispatch(setHasHeaders(data?.hasHeaders || false));
      dispatch(setHeaderRows(data?.headerRows || ""));
      dispatch(setDelimited(data?.delimited || false));
      dispatch(setDelimiter(data?.delimiter || ""));

      if (data?.txtFile) dispatch(setFileType("txtFile"));
      else if (data?.csvFile) dispatch(setFileType("csvFile"));
      else if (data?.xlsxFile) dispatch(setFileType("xlsxFile"));
      else dispatch(setFileType("txtFile"));
    }
  };

  const handleCancelShow = () => {
    if (!viewDetail) {
      // EDIT MODE
      if (id) {
        setCancelShow(true);
      } else {
        // NEW MODE
        setCancelShow(true);
      }
    } else {
      // VIEW MODE
      dispatch(resetChanges());
      dispatch(setViewDetail(false));
      navigate("/customer-plant-release-browse");
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => setCancelShow(false);

  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      restoreFromEditFormData();
      dispatch(setViewDetail(true));
      toast.success("Changes Cancelled");
    } else {
      setCancelShow(false);
      dispatch(resetChanges());
      dispatch(setViewDetail(false));
      navigate("/customer-plant-release-browse");
      toast.success("Changes Cancelled");
    }
  };

  /*****Delete Customer Order*****/
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    dispatch(setDeleteLoading(true));
    CustomerPlantReleaseService.plantReleaseMaintenanceDelete(id)
      .then((response) => {
        navigate("/customer-plant-release-browse", { replace: true });
        toast.success("Customer Plant Release Deleted");
      })
      .catch((error) => {
        setErrorShow(true);
        setErrorMsg(error?.response?.data?.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => {
        dispatch(setDeleteLoading(false));
        setDeleteShow(false);
      });
  };

  /******Create or Update Customer Order Record*****/
  const handleSave = () => {
    dispatch(setEditPageLoading(true));
    CustomerPlantReleaseService.plantReleaseMaintenanceSave({ ...plantReleases })
      .then((response) => {
        navigate("/customer-plant-release-browse", { replace: true });
        dispatch(resetChanges());
        if (id) {
          toast.success("Customer Plant Release Description Updated");
        } else {
          toast.success("Customer Plant Release Description created");
        }
      })
      .catch((error) => {
        navigate("/customer-plant-release-browse", { replace: true });
        if (id) {
          toast.error("Failed to Update Customer Plant Release Description");
        } else {
          toast.error("Failed to Create Customer Plant Release Description");
        }
      })
      .finally(() => {
        dispatch(setEditPageLoading(false));
      });
  };

  const validateSave = () => {
    dispatch(setUniqueLoading(true));
    CustomerPlantReleaseService.plantReleaseMaintenanceSave({ ...plantReleases, flag: "UNIQUECHECK" })
      .then((res) => {
        if (res?.data === false) {
          /**Disable save****/
          dispatch(setIsDescriptionUnique(false));
          dispatch(setDisableSave(true));
        } else {
          dispatch(setIsDescriptionUnique(true));
          handleSave();
        }
      })
      .catch((err) => {
        dispatch(setDisableSave(false));
      })
      .finally(() => {
        dispatch(setUniqueLoading(false));
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={!viewDetail}
          onClick={() => {
            navigate(`/customer-plant-release-browse/${id}/columns`);
            dispatch(setAssignedPageNumber(0));
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
            navigate(`/customer-plant-release-browse/${id}/test`);
            dispatch(setTestFile([]));
          }}
        >
          Test
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={viewDetail}
          disabled={disableSave}
          onClick={() => {
            validateSave();
          }}
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
            dispatch(setIsDescriptionUnique(true));
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
          title={"Cancel Customer Plant Release Maintenance Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Customer Plant Release Maintenance "}
          body={"Please confirm you want to Delete this Customer Plant Release"}
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
};

export default CustomerPlantReleaseFooter;
