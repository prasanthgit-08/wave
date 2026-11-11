import React from "react";
import ButtonComponent from "../../../common/Button";
import { t } from "i18next";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import ShuttleCitysService from "../../../../services/ShuttleCitysService";
import {
  setViewDetail,
  resetChanges,
  setEditFormData,
  setOutbound,
  setReload,
  setRadioValue,
  setCheckCity,
} from "../../../../redux/ShuttleCitysSlice";
import LoadingIcon from "../../../common/LoadingIcon";

const ShuttleCitysFormFooter = () => {
  const { pageNumber } = useParams();
  const city = useSelector((state) => state.shuttleCitysReducer.city);
  const outbound = useSelector((state) => state.shuttleCitysReducer.outbound);
  const reload = useSelector((state) => state.shuttleCitysReducer.reload);
  const radioValue = useSelector((state) => state.shuttleCitysReducer.radioValue);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [showDeleteDependency, setShowDeleteDependency] = useState(false);
  const [dependencyError, setDependencyError] = useState("");
  const [disableSave, setDisableSave] = useState(true);
  const [loading, setLoading] = useState(false);
  const [checkingSequence, setCheckingSequence] = useState(false);

  const primaryKey = useSelector((state) => state.shuttleCitysReducer.primaryKey);
  const editFormData = useSelector((state) => state.shuttleCitysReducer.editFormData);
  const viewDetail = useSelector((state) => state.shuttleCitysReducer.viewDetail);
  const checkCity = useSelector((state) => state.shuttleCitysReducer.checkCity);
  const formData = {
    shuttleCityPK: id,
    city,
    outbound,
    reload,
  };

  useEffect(() => {}, [editFormData, viewDetail]);

  const saveOrUpdateShuttleCitys = () => {
    setLoading(true);
    ShuttleCitysService.createShuttleCitys(formData)
      .then((response) => {
        navigate("/shuttle-citys");
        if (id) {
          toast.success("Shuttle City Updated");
        } else toast.success(" Shuttle City Created");
      })
      .catch((error) => {
        navigate("/shuttle-citys");
        toast.error("something went wrong");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
    dispatch(resetChanges());
  };
  const validateAndSave = () => {
    setCheckingSequence(true);
    ShuttleCitysService.checkCityExist(city, id)
      .then((response) => {
        if (response.data) {
          setDisableSave(response.data);
        } else {
          saveOrUpdateShuttleCitys();
        }
      })
      .catch((err) => {
        setDisableSave(true);
        setCheckingSequence(false);
      })
      .finally(() => {
        setCheckingSequence(false);
      });
  };

  useEffect(() => {
    if (city !== "" && !checkCity && (outbound || reload)) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [city, outbound, reload, checkCity]);

  const handleCancelShow = () => {
    if (viewDetail === false || id === undefined) {
      // edit page
      setCancelShow(true);
    } else {
      // view page
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/shuttle-citys");
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(setCheckCity(""));
      ShuttleCitysService.getShuttleCitysById(id)
        .then((response) => {
          const { data } = response;
          dispatch(setEditFormData(data));
          dispatch(setViewDetail(true));
          dispatch(setOutbound(data.outbound));
          dispatch(setReload(data.reload));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/shuttle-citys");
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };

  //Delete contacts
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    ShuttleCitysService.deleteShuttleCitys(id)
      .then((response) => {
        navigate("/shuttle-citys/");
        toast.success(" Shuttle City Deleted");
      })
      .catch((error) => {
        setShowDeleteDependency(true);
        setDependencyError(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      });
    setDeleteShow(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {(checkingSequence || loading) && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          route={""}
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={viewDetail === true}
          disabled={disableSave || checkingSequence}
          onClick={() => {
            validateAndSave();
          }}
        >
          Save
        </button>

        <button
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={handleCancelShow}
        >
          Cancel
        </button>

        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          label="Edit"
          hidden={!id || viewDetail === false}
          onClick={() => dispatch(setViewDetail(false))}
        />

        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          label="Delete"
          hidden={!id || viewDetail === false}
          onClick={handleDelete}
        />

        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Shuttle City Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Shuttle City"}
          body={"Please confirm you want to Delete this Shuttle City"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />

        {/* DepedencyModal */}
        <ModalComponent
          show={showDeleteDependency}
          onHide={() => setShowDeleteDependency(false)}
          showError
          showOK
          title={"Delete Failed!"}
          body={dependencyError}
        />
      </div>
    </div>
  );
};
export default ShuttleCitysFormFooter;
