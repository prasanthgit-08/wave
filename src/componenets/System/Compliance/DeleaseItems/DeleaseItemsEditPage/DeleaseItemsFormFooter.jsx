import React from "react";
import { t } from "i18next";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import ButtonComponent from "../../../../common/Button";
import ModalComponent from "../../../../common/ModalComponent";
import { Colors } from "../../../../../styles/values/colors";
import {
  resetChanges,
  setDescriptionValid,
  setViewDetail,
  toggleChangesCancelled,
} from "../../../../../redux/DeleaseItemsSlice";
import DeleaseItemsService from "../../../../../services/DeleaseItemsService";
import { Button } from "react-bootstrap";
import LoadingIcon from "../../../../common/LoadingIcon";
const DeleaseItemsFormFooter = () => {
  const description = useSelector((state) => state.deleaseItemsReducer.description);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeShow, setActiveShow] = useState(false);
  const [active, setActive] = React.useState("");
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const viewDetail = useSelector((state) => state.deleaseItemsReducer.viewDetail);
  const editFormData = useSelector((state) => state.deleaseItemsReducer.editFormData);
  const deleaseItemsFormData = useSelector((state) => state.deleaseItemsReducer.deleaseItemsFormData);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const descriptionValid = useSelector((state) => state.deleaseItemsReducer.descriptionValid);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editFormData != null && null != editFormData.active) {
      setActive(editFormData.active);
    }
  }, [editFormData]);

  const handleActiveClose = () => setActiveShow(false);
  const handleActiveShow = () => setActiveShow(true);

  const handleActiveSave = (e) => {
    setActiveShow(false);
    if (active === true) {
      deactivedeleaseItems();
    } else {
      activatedeleaseItems();
    }
  };
  const activatedeleaseItems = () => {
    let pk = deleaseItemsFormData.deleaseItemPK;

    setLoading(true);
    DeleaseItemsService.activatedeleaseItems(pk)
      .then((response) => {
        setActiveShow(false);
        setActive(true);

        toast.success("Delease Item Activated");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => setLoading(false));
  };

  const deactivedeleaseItems = () => {
    let pk = deleaseItemsFormData.deleaseItemPK;

    setLoading(true);
    DeleaseItemsService.deactivedeleaseItems(pk)
      .then((response) => {
        setActiveShow(false);
        setActive(false);
        toast.success("Delease Item Deactivated");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => setLoading(false));
  };
  //save or update
  const saveOrUpdateAllContacts = () => {
    setLoading(true);
    DeleaseItemsService.saveDeleaseItems(deleaseItemsFormData)
      .then((response) => {
        navigate("/delease-items");
        if (id) {
          toast.success("Delease item Updated");
        } else toast.success(" Delease item Created");
      })
      .catch((error) => {
        navigate("/delease-items");
        toast.error("something went wrong");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const validateAndSave = () => {
    setLoading(true);
    DeleaseItemsService.checkDescriptionExist(description, id)
      .then((response) => {
        if (response.data) {
          setDisableSave(response.data);
          setLoading(false);
        } else {
          saveOrUpdateAllContacts();
        }
      })
      .catch((err) => {
        setLoading(false);
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
      navigate("/delease-items");
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
      toast.success("Changes Cancelled");
    } else {
      navigate("/delease-items");
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      toast.success("Changes Cancelled");
    }
  };
  //Delete contacts
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    setLoading(true);
    DeleaseItemsService.deleteDeleaseItems(id)
      .then((response) => {
        navigate("/delease-items");
        toast.success("Delease Item Deleted");

        dispatch(resetChanges());
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => setLoading(false));
    setDeleteShow(false);
  };

  useEffect(() => {
    if (description !== "" && descriptionValid) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [description, descriptionValid]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={"Active"}
          hidden={!id || viewDetail === false}
          onClick={handleActiveShow}
          style={active === false ? { backgroundColor: Colors.red } : { backgroundColor: "" }}
        />
        <Button
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          label={t("edit.CheckPayTo.page.resources.tab.save")}
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={() => {
            validateAndSave();
          }}
        >
          {" "}
          Save
        </Button>

        <ModalComponent
          show={activeShow}
          onHide={handleActiveClose}
          title={active === true ? "Deactivate Delease Item" : "Activate Delease Item"}
          body={
            active === true
              ? " Please confirm you want to Deactivate this Delease Item"
              : " Please confirm you want to Activate this Delease Item"
          }
          handleYES={handleActiveSave}
          handleNO={handleActiveClose}
        />
        <button
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          label={t("edit.CheckPayTo.page.resources.tab.cancel")}
          type="button"
          onClick={handleCancelShow}
        >
          Cancel
        </button>
        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          label={"Edit"}
          hidden={!id || viewDetail === false}
          onClick={() => dispatch(setViewDetail(false))}
        />
        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          label={"Delete"}
          hidden={!id || viewDetail === false}
          onClick={handleDelete}
        />

        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Delease Item Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Delease Item"}
          body={"Please confirm you want to Delete this Delease Item"}
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

export default DeleaseItemsFormFooter;
