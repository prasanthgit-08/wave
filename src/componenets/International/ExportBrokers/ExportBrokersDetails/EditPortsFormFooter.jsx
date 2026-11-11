import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../../common/Button";
import ModalComponent from "../../../common/ModalComponent";
import ExportBrokersService from "../../../../services/ExportBrokersService";
import { Button, Modal } from "react-bootstrap";
import {
  resetChanges,
  resetRightNormalSort,
  setBrokerPageNumber,
  setViewDetail,
  toggleChangesCancelled,
} from "../../../../redux/ExportBrokersSlice";
import {
  resetLeftNormalSort,
  resetPortsPageNormalSort,
  setChangesInPortsSelection,
  setHasInitials,
  setLeftLoading,
  setLeftPageNumber,
  setReverseList,
  setRightLoading,
  setSaving,
} from "../../../../redux/EditExportBrokersSlice";
import LoadingIcon from "../../../common/LoadingIcon";

const EditPortsFormFooter = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showCancel, setshowCancel] = useState(false);
  const viewDetail = useSelector((state) => state.exportBrokersReducer.viewDetail);
  const disableSave = useSelector((state) => state.exportBrokersReducer.disableSave);
  const changesInPortsSelection = useSelector(
    (state) => state.editExportBrokersReducer.changesInPortsSelection
  );
  const reverseList = useSelector((state) => state.editExportBrokersReducer.reverseList);
  const initialList = useSelector((state) => state.editExportBrokersReducer.initialList);
  const saveList = useSelector((state) => state.editExportBrokersReducer.saveList);
  const deleteList = useSelector((state) => state.editExportBrokersReducer.deleteList);
  const exceptList = useSelector((state) => state.editExportBrokersReducer.exceptList);
  const leftPageNumber = useSelector((state) => state.editExportBrokersReducer.leftPageNumber);
  const pageNumber = useSelector((state) => state.exportBrokersReducer.pageNumber);
  const leftLoading = useSelector((state) => state.editExportBrokersReducer.leftLoading);
  const rightLoading = useSelector((state) => state.editExportBrokersReducer.rightLoading);

  const [copyList, setCopyList] = useState([...initialList]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const onCancel = () => {
    setshowCancel(true);
  };

  const handleCancelNo = () => {
    setshowCancel(false);
  };

  const handleCancelYes = () => {
    navigate("/export-brokers-browse/" + id + "/" + pageNumber);
    toast.success("Changes canelled");
    dispatch(setHasInitials(false));
    dispatch(resetPortsPageNormalSort());
    dispatch(setBrokerPageNumber(0));
    dispatch(setReverseList(false));
    dispatch(setLeftPageNumber(0));
    dispatch(setChangesInPortsSelection(false));
    dispatch(resetChanges());
    setTimeout(() => {
      dispatch(setRightLoading(true));
      dispatch(setLeftLoading(true));
    }, 100);
  };
  const onSave = () => {
    setLoading(true);
    dispatch(setSaving(true));
    ExportBrokersService.saveMemberPorts(id, initialList, deleteList, saveList, exceptList, reverseList)
      .then(() => {
        dispatch(setSaving(false));
        dispatch(resetPortsPageNormalSort());
        dispatch(setBrokerPageNumber(0));
        dispatch(setChangesInPortsSelection(false));
        setLoading(false);
        toast.success("Ports Saved");
        navigate("/export-brokers-browse/" + id + "/" + pageNumber);
      })
      .catch(() => {
        console.error();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    dispatch(resetPortsPageNormalSort());
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        {loading && <LoadingIcon />}
        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={onSave}
          disabled={leftLoading || rightLoading}
        >
          Save
        </button>

        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={onCancel}
          disabled={leftLoading || rightLoading}
        >
          Cancel
        </button>
        {/* Cancel Confirmation Modal */}
        <ModalComponent
          show={showCancel}
          onHide={handleCancelNo}
          title={"Cancel Ports Selection Screen"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
    </div>
  );
};

export default EditPortsFormFooter;
