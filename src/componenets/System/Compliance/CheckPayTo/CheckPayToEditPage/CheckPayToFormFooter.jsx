import React from "react";
import { t } from "i18next";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import ButtonComponent from "../../../../common/Button";
import ModalComponent from "../../../../common/ModalComponent";
import {
  resetChanges,
  setDescriptionValid,
  setOnCancel,
  setViewDetail,
  toggleChangesCancelled,
} from "../../../../../redux/CheckPayToSlice";
import CheckPayToService from "../../../../../services/CheckPayToService";
import LoadingIcon from "../../../../common/LoadingIcon";
const CheckPayToFormFooter = () => {
  const name = useSelector((state) => state.checkPayToReducer.name);
  const description = useSelector((state) => state.checkPayToReducer.description);
  const postalCodeOnChange = useSelector((state) => state.checkPayToReducer.postalCodeOnChange);
  const address1 = useSelector((state) => state.checkPayToReducer.address1);
  const checkPayToCity = useSelector((state) => state.checkPayToReducer.checkPayToCity);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const viewDetail = useSelector((state) => state.checkPayToReducer.viewDetail);
  const checkPayPostalCodePK = useSelector((state) => state.checkPayToReducer.checkPayPostalCodePK);
  const [errorShow, setErrorShow] = useState(false);
  const checkPayToFormData = useSelector((state) => state.checkPayToReducer.checkPayToFormData);
  const [loading, setLoading] = useState(false);
  const descriptionValid = useSelector((state) => state.checkPayToReducer.descriptionValid);
  const checkPayzipPostLenght = useSelector((state) => state.checkPayToReducer.checkPayzipPostLenght);

  //save or update
  const saveOrUpdateAllContacts = () => {
    setLoading(true);
    CheckPayToService.saveCheckPayTo(checkPayToFormData)
      .then((response) => {
        navigate("/check-pay-to");
        if (id) {
          toast.success("Check Pay To Updated");
        } else toast.success(" Check Pay To Created");
      })
      .catch((error) => {
        navigate("/check-pay-to");
        toast.error("something went wrong");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const validateAndSave = () => {
    setLoading(true);
    CheckPayToService.checkDescriptionExist(description, id)
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setDisableSave(response.data);
        } else {
          saveOrUpdateAllContacts();
        }
      })
      .catch((err) => {
        setLoading(true);
        setDisableSave(true);
      });
  };
  //cancel
  const handleCancelShow = () => {
    dispatch(setDescriptionValid(true));
    if (viewDetail === false || id === undefined) {
      // edit page
      setCancelShow(true);
    } else {
      // view page
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/check-pay-to");
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      dispatch(setDescriptionValid(true));
      dispatch(toggleChangesCancelled());
      setCancelShow(false);
      dispatch(setViewDetail(true));
      setTimeout(() => {
        dispatch(setOnCancel(true));
      }, 50);
      toast.success("Changes Cancelled");
    } else {
      navigate("/check-pay-to");
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      dispatch(setOnCancel(true));
      toast.success("Changes Cancelled");
    }
  };

  //Delete contacts
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    setLoading(true);
    CheckPayToService.deleteCheckPayTo(id)
      .then((response) => {
        navigate("/check-pay-to");
        toast.success(" Check Pay To Deleted");

        dispatch(resetChanges());
      })
      .catch((error) => {
        setErrorShow(true);
        setErrorMsg(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(error.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => setLoading(false));
    setDeleteShow(false);
  };

  useEffect(() => {
    if (name !== "" && description !== "" && address1 !== "" && descriptionValid && checkPayPostalCodePK) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [
    name,
    checkPayPostalCodePK,
    description,
    descriptionValid,
    address1,
    checkPayToCity,
    checkPayzipPostLenght,
    postalCodeOnChange,
  ]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          label={t("edit.CheckPayTo.page.resources.tab.save")}
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={() => {
            validateAndSave();
            // saveOrUpdateAllContacts();
          }}
        >
          {" "}
          Save
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          label={t("edit.CheckPayTo.page.resources.tab.cancel")}
          type="button"
          onClick={handleCancelShow}
        >
          Cancel
        </button>
        <ButtonComponent
          route={""}
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          label={"Edit"}
          hidden={!id || viewDetail === false}
          onClick={() => dispatch(setViewDetail(false))}
        />
        <ButtonComponent
          route={""}
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          label={"Delete"}
          hidden={!id || viewDetail === false}
          onClick={handleDelete}
        />

        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Check Pay To Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Check Pay To"}
          body={"Please confirm you want to Delete this Check Pay To"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
        <ModalComponent
          show={errorShow}
          onHide={() => setErrorShow(false)}
          showError
          showOK
          title={"Delete Failed!"}
          body={errorMsg}
        />
      </div>
    </div>
  );
};

export default CheckPayToFormFooter;
