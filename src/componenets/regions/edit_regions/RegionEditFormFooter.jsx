import React, { useState } from "react";
import QuarterScreen from "../../../styles/QuarterScreen.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setSaveRegion,
  setEditDetails,
  setCancelChange,
  setUnqiueRegionCode,
} from "../../../redux/EditRegionSlice";
import RegionsService from "../../../services/RegionsService";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../common/ModalComponent";
import ButtonComponent from "../../common/Button";
import { toast } from "react-hot-toast";
import { Modal, Button } from "react-bootstrap";
import LoadingIcon from "../../common/LoadingIcon";

function RegionEditFormFooter() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const regionId = params.regionId;
  const pageNumber = params.pageNumber;
  const regionCode = useSelector((state) => state.editRegionReducer.regionCode);
  const description = useSelector((state) => state.editRegionReducer.description);
  const regionData = useSelector((state) => state.editRegionReducer.regionDataList);
  const addDate = useSelector((state) => state.editRegionReducer.addDate);
  const addUserFK = useSelector((state) => state.editRegionReducer.addUserFK);
  const editDetail = useSelector((state) => state.editRegionReducer.editDetail);
  const uniqueRgCode = useSelector((state) => state.editRegionReducer.uniqueRgCode);
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const onHandleSave = () => {
    if (regionCode?.trim() === regionData?.regionCode?.trim()) {
      save();
    } else if (regionCode !== "") {
      RegionsService.isValid(regionCode).then((response) => {
        dispatch(setUnqiueRegionCode(response.data));
        if (response.data) {
          save();
        }
      });
    }
  };
  const save = () => {
    setLoading(true);
    RegionsService.saveRegion(regionId, regionCode, description, addDate, addUserFK)
      .then(() => {
        if (regionId) {
          toast.success("Region Updated");
        } else {
          toast.success("Region Created");
        }
        dispatch(setSaveRegion(true));
        navigate("/regions");
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const onHandleDelete = () => {
    setDeleteShow(true);
  };

  const handleDeleteNo = () => {
    setDeleteShow(false);
  };
  const handleDeleteYes = () => {
    setDeleteShow(false);
    setLoading(true);
    RegionsService.deleteregion(regionId)
      .then((response) => {
        navigate("/regions");
        toast.success("Region Deleted");
      })
      .catch((error) => {
        setErrorShow(true);
        setErrorMsg(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => setLoading(false));
  };

  const onHandleCancel = () => {
    if (editDetail) {
      setCancelShow(true);
    } else {
      toast.success("Changes Cancelled");
      navigate("/regions");
    }
  };
  const handleCancelYes = () => {
    if (regionId) {
      dispatch(setUnqiueRegionCode(true));
      navigate("/add-region/" + regionId + "/" + pageNumber);
      dispatch(setEditDetails(false));
      dispatch(setCancelChange(true));
      setCancelShow(false);
      toast.success("Changes Cancelled");
    } else {
      navigate("/regions");
    }
  };

  const handleCancelNo = () => {
    setCancelShow(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <div>
          <button
            className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
            onClick={onHandleSave}
            hidden={!editDetail}
            disabled={!uniqueRgCode || !regionCode || !description}
          >
            Save
          </button>
          <button
            className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
            onClick={onHandleCancel}
          >
            Cancel
          </button>
        </div>

        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          label={"Edit"}
          hidden={editDetail}
          onClick={() => {
            dispatch(setEditDetails(true));
          }}
        />
        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          label={"Delete"}
          hidden={editDetail}
          onClick={onHandleDelete}
        />

        <ModalComponent
          show={cancelShow && editDetail}
          onHide={handleCancelNo}
          title={"Cancel Region Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Region "}
          body={"Please confirm you want to Delete this Region"}
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

export default RegionEditFormFooter;
