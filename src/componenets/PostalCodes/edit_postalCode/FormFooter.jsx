import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import ButtonComponent from "../../common/Button";
import ModalComponent from "../../common/ModalComponent";
import { Modal, Button } from "react-bootstrap";

import { Colors } from "../../../styles/values/colors";
import {
  resetChanges,
  setChangesCancelled,
  setCity,
  setPostalCode,
  setSearchedPostalCode,
  setStateCode,
  setViewDetail,
} from "../../../redux/PostalCodeSlice";
import PostalCodeService from "../../../services/PostalCodeService";
import { setIsPlateStateValid } from "../../../redux/PostalCodeSlice";
import LoadingIcon from "../../common/LoadingIcon";

function FormFooter() {
  const [cancelShow, setCancelShow] = useState(false);
  const [disableSave, setdisableSave] = useState(true);
  const [deleteShow, setDeleteShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showDeleteError, setShowDeleteError] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id, pageNumber } = useParams();
  const viewDetail = useSelector((state) => state.postalCodeReducer.viewDetail);
  const postalCodePK = useSelector((state) => state.postalCodeReducer.postalCodePK);
  const canadian = useSelector((state) => state.postalCodeReducer.canadian);
  const city = useSelector((state) => state.postalCodeReducer.city);

  const stateCode = useSelector((state) => state.postalCodeReducer.stateCode);

  const postalCode = useSelector((state) => state.postalCodeReducer.postalCode);
  const editFormData = useSelector((state) => state.postalCodeReducer.editFormData);
  const latitude = useSelector((state) => state.postalCodeReducer.latitude);
  const longitude = useSelector((state) => state.postalCodeReducer.longitude);
  const isPlateStateValid = useSelector((state) => state.postalCodeReducer.isPlateStateValid);

  //starting save funtionality
  const saveRecord = () => {
    setLoading(true);
    PostalCodeService.createOrUpdateRecord(formData)
      .then((res) => {
        navigate(`/postalcode`);
        if (id) toast.success("Postal Code Updated");
        else toast.success("Postal Code Created");
      })
      .catch((err) => {
        navigate(`/postalcode-add/${id}/${pageNumber}`);
        toast.error("Something went wrong");
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    setDeleteShow(false);
    setLoading(true);
    PostalCodeService.deleteRecord(id)
      .then((response) => {
        setLoading(false);
        navigate(`/postalcode`);
        toast.success("Postal Code Deleted");
        dispatch(resetChanges());
      })
      .catch((err) => {
        setShowDeleteError(true);
        setLoading(false);
        setDeleteErrorMessage(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        navigate(`/postalcode`);
      });
  };

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      dispatch(setPostalCode(""));
      dispatch(setCity(""));
      dispatch(setStateCode(""));
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate(`/postalcode`);
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(setChangesCancelled(true));
      toast.success("Changes Cancelled");
    } else {
      navigate(`/postalcode`);
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };

  const isDesimalInvalid = (value) => {
    if (value === "." || value?.toString().endsWith(".") || value?.toString().endsWith("-")) {
      return true;
    }
    return false;
  };

  const checkStateValid = async () => {
    if (stateCode) {
      try {
        setLoading(true);
        const response = await PostalCodeService.checkState(stateCode);
        if (response.data) setLoading(false);

        return response.data;
      } catch (err) {
        console.log(err);
        setLoading(false);
        return false;
      }
    }
    return false;
  };

  const formData = {
    postalCodePK: postalCodePK,
    postalCode: postalCode,
    city: city,
    stateCode: stateCode.toUpperCase(),
    canadian: canadian,
    latitude: latitude,
    longitude: longitude,
  };
  useEffect(() => {
    if (
      !isDesimalInvalid(latitude) &&
      !isDesimalInvalid(longitude) &&
      latitude !== "" &&
      longitude !== "" &&
      id !== "" &&
      postalCode !== "" &&
      city !== "" &&
      stateCode !== "" &&
      isPlateStateValid &&
      longitude >= -180.0 &&
      longitude <= 190.0 &&
      latitude >= -90.0 &&
      latitude <= 90.0 &&
      ((!canadian && postalCode.match(/^\d{5}(-\d{4})?$/)) ||
        (canadian && postalCode.match(/^[A-Z]\d[A-Z] \d[A-Z]\d$/)))
    ) {
      setdisableSave(false);
    } else {
      setdisableSave(true);
    }
  }, [id, postalCode, city, stateCode, latitude, longitude, isPlateStateValid, canadian]);

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        {loading && <LoadingIcon />}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={async () => {
            if (loading) return;
            const isValid = await checkStateValid();
            if (isValid) {
              saveRecord();
            } else {
              toast.error("Invalid State Code");
              setLoading(false);
            }
          }}
        >
          {loading === true ? (
            <div className="loader-container">
              <div className="loader_YardCheckin"></div>
            </div>
          ) : (
            "Save"
          )}
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
          hidden={!id || viewDetail === false}
          onClick={() => {
            dispatch(setViewDetail(false));
            dispatch(setIsPlateStateValid(true));
          }}
          label={"Edit"}
        />

        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={"Delete"}
          hidden={!id || viewDetail === false}
          onClick={handleDelete}
        />
        {/* model Active*/}

        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Postal Code Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Postal Code "}
          body={"Please confirm you want to Delete this Postal Code"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />

        {/* Delete Error */}
        <ModalComponent
          show={showDeleteError}
          onHide={() => setShowDeleteError(false)}
          title={"Delete failed!"}
          body={deleteErrorMessage}
          showError
          closeButton
        />
      </div>
    </div>
  );
}

export default FormFooter;
