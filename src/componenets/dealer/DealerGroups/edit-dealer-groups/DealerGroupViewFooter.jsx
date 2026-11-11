import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../common/ModalComponent";
import DealerGroupService from "../../../../services/DealerGroupService";
import {
  setAssignedDealerList,
  setDescription,
  setEdit,
  setIsUniqueDescription,
  setLoading,
  setNotes,
  setTotalDealerList,
} from "../../../../redux/EditDealerGroupslice";
import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import LoadingIcon from "../../../common/LoadingIcon";

const DealerGroupViewFooter = ({ dealerListViewLength }) => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const id = params.dealerGroupPK;
  const pageNumber = params.pageNumber;
  const [showCancel, setshowCancel] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [showDelete, setshowDelete] = useState(false);
  const [loadSave, setLoadSave] = useState(false);

  const edit = useSelector((state) => state.editDealerGroupReducer.edit);
  const description = useSelector((state) => state.editDealerGroupReducer.description);
  const notes = useSelector((state) => state.editDealerGroupReducer.notes);
  const isUniqueDescription = useSelector((state) => state.editDealerGroupReducer.isUniqueDescription);
  const initialDescription = useSelector((state) => state.editDealerGroupReducer.initialDescription);
  const initialNotes = useSelector((state) => state.editDealerGroupReducer.initialNotes);
  const descriptions = useSelector((state) => state.editDealerGroupReducer.description);
  const loading = useSelector((state) => state.editDealerGroupReducer.loading);

  const onEdit = () => {
    dispatch(setEdit(true));
  };
  const handleDeleteNo = () => {
    setshowDelete(false);
  };
  const handleDeleteYes = () => {
    dispatch(setLoading(true));
    setshowDelete(false);
    DealerGroupService.deleteDealerGroup(id)
      .then((response) => {
        if (response?.data) {
          toast.success("Dealer Group Deleted");
          navigate("/dealer-group");
        } else {
          setErrorShow(true);
          setErrorMsg(/* error.response.data.errorMsg || */ "Something went wrong!! Failed to delete!!");
        }
      })
      .catch((error) => {
        setErrorShow(true);
        setErrorMsg(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  const onDealers = () => {
    dispatch(setTotalDealerList([]));
    dispatch(setAssignedDealerList([]));
    navigate("/add-dealer-details/" + id + "/" + pageNumber);
  };

  const onCancel = () => {
    if (!edit) {
      toast.success("Changes Cancelled");
      navigate("/dealer-group");
      dispatch(setIsUniqueDescription(true));
    } else {
      setshowCancel(true);
    }
  };

  const checkUniqueDescription = () => {
    if (descriptions !== initialDescription || !id) {
      setLoadSave(true);
      DealerGroupService.isUniqueDescription(descriptions).then((response) => {
        if (response.data) {
          dispatch(setIsUniqueDescription(true));
          saveDealerGroup();
        } else {
          dispatch(setIsUniqueDescription(false));
          setLoadSave(false);
        }
      });
    } else {
      dispatch(setIsUniqueDescription(true));
      saveDealerGroup();
    }
  };

  const saveDealerGroup = () => {
    setLoadSave(true);
    DealerGroupService.saveDealerGroup(description, notes, id).then(() => {
      if (id) {
        toast.success("Dealer Group Updated");
      } else {
        toast.success("Dealer Group Created");
      }
      setLoadSave(false);
    });
    navigate("/dealer-group");
  };

  const handleCancelNo = () => {
    setshowCancel(false);
  };

  const handleCancelYes = () => {
    if (id) {
      dispatch(setEdit(false));
      dispatch(setDescription(initialDescription));
      dispatch(setNotes(initialNotes));
    } else {
      navigate("/dealer-group");
    }
    setshowCancel(false);
    dispatch(setIsUniqueDescription(true));
    toast.success("Changes Cancelled");
  };

  useEffect(() => {
    if (window.location.pathname === "/add-dealer-group/" + id + "/" + pageNumber) {
      dispatch(setEdit(false));
    } else {
      dispatch(setEdit(true));
    }
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={!edit}
          disabled={!description || !isUniqueDescription}
          onClick={() => {
            checkUniqueDescription();
          }}
        >
          {loadSave ? (
            <div className="loader-container">
              <div className="loader_YardCheckin"></div>
            </div>
          ) : (
            "Save"
          )}
        </button>

        <button
          onClick={onCancel}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
        >
          Cancel
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={onDealers}
          hidden={edit}
        >
          Dealers
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={onEdit}
          hidden={edit}
        >
          Edit
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            setshowDelete(true);
          }}
          hidden={edit}
        >
          Delete
        </button>
      </div>
      <ModalComponent
        show={showCancel}
        onHide={handleCancelNo}
        title={"Cancel Dealer Group Changes"}
        body={"Please confirm you want to cancel your changes"}
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />
      <ModalComponent
        show={showDelete}
        onHide={handleDeleteNo}
        title={"Delete Dealer Group"}
        body={"Please confirm you want to delete this Dealer Group"}
        handleYES={handleDeleteYes}
        handleNO={handleDeleteNo}
      />
      <Modal show={errorShow} onHide={() => setErrorShow(false)} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className="font-18 h-100 temp-red-color">Delete failed!</Modal.Title>
        </Modal.Header>

        <Modal.Body className="font-14 h-100">
          {dealerListViewLength > 0 ? "Dependency relationships exist can't be deleted" : errorMsg}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={() => setErrorShow(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DealerGroupViewFooter;
