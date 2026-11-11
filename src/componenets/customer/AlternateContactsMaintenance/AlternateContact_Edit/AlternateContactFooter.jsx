import React from "react";
import ButtonComponent from "../../../common/Button";
import { t } from "i18next";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import {
  setViewDetail,
  resetChanges,
  toggleChangesCancelled,
  setNormalSortFlag,
  setNormalSortValue,
} from "../../../../redux/AlternateContactSlice";
import AlternateContactService from "../../../../services/AlternateContactService";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import { Button, Modal } from "react-bootstrap";
const AlternateContactFooter = () => {
  //redux
  const name = useSelector((state) => state.alternateContactReducer.name);
  const contact = useSelector((state) => state.alternateContactReducer.contact);
  const email = useSelector((state) => state.alternateContactReducer.email);
  const phone = useSelector((state) => formatPhoneNumber(state.alternateContactReducer.phone));
  const fax = useSelector((state) => formatPhoneNumber(state.alternateContactReducer.fax));
  const [load, setLoad] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const editFormData = useSelector((state) => state.alternateContactReducer.editFormData);
  const viewDetail = useSelector((state) => state.alternateContactReducer.viewDetail);
  const saveData = useSelector((state) => state.alternateContactReducer.contactData);

  const checkContact = useSelector((state) => state.alternateContactReducer.checkContact);
  useEffect(() => {}, [editFormData]);

  //Save or Update
  const saveOrUpdateAllContacts = () => {
    setLoad(true);
    AlternateContactService.createAlternateContacts(saveData)
      .then((response) => {
        navigate("/alternate-contacts");
        setLoad(false);
        if (id) {
          toast.success("Alternate Contact Updated");
        } else toast.success(" Alternate Contact Created");
        console.log("save or update success.........");
      })
      .catch((error) => {
        navigate("/alternate-contacts");
        toast.error("something went wrong");
        console.log(error);
        setLoad(false);
      });
    dispatch(resetChanges());
  };

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  useEffect(() => {
    if (contact !== "" && !checkContact && (name || phone || email || fax)) {
      if (phone === "" || phone.match(phoneRegex)) {
        if (fax === "" || fax.match(phoneRegex)) {
          if (email === "" || email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/)) {
            setDisableSave(false);
          } else {
            setDisableSave(true);
          }
        } else {
          setDisableSave(true);
        }
      } else {
        setDisableSave(true);
      }
    } else {
      setDisableSave(true);
    }
  }, [contact, name, email, phone, fax, checkContact]);

  //cancel
  const handleCancelShow = () => {
    if (viewDetail === false || id === undefined) {
      // edit page
      setCancelShow(true);
    } else {
      // view page
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/alternate-contacts");
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
      navigate("/alternate-contacts");
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };
  //Delete contacts
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    AlternateContactService.deleteAlternateContacts(id)
      .then((response) => {
        navigate("/alternate-contacts");
        toast.success(" Alternate contact Deleted");
        console.log("deleted.......");
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err?.response?.data?.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(err?.response?.data?.errorMsg || "Something went wrong!! Failed to delete!!");
      });
    setDeleteShow(false);
  };

  const validateAndSave = () => {
    setLoad(true);
    AlternateContactService.checkDescriptionExist(id, contact, name)
      .then((response) => {
        if (response?.data) {
          setDisableSave(response?.data);
          setLoad(false);
        } else {
          saveOrUpdateAllContacts();
        }
      })
      .catch((err) => {
        setLoad(false);
        setDisableSave(true);
      });
  };
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          route={""}
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          label={t("edit.AlternateContact.page.resources.tab.save")}
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={validateAndSave}
        >
          {" "}
          Save{" "}
        </button>
        <button
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          label={t("edit.AlternateContact.page.resources.tab.cancel")}
          type="button"
          onClick={handleCancelShow}
        >
          Cancel
        </button>
        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          label={t("edit.AlternateContact.page.resources.tab.edit")}
          hidden={!id || viewDetail === false}
          onClick={() => dispatch(setViewDetail(false))}
        />
        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          label={t("edit.AlternateContact.page.resources.tab.delete")}
          hidden={!id || viewDetail === false}
          onClick={handleDelete}
        />

        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Alternate Contact Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Alternate Contact"}
          body={"Please confirm you want to Delete this Alternate Contact"}
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
    </div>
  );
};
export default AlternateContactFooter;
