import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetDatas,
  setEditMode,
  setBirthday,
  setCallback,
  setContact,
  setEmail,
  setFax,
  setName,
  setNote,
  setLastCall,
  setPhone,
  setPosition,
  setContactExistData,
  setContactExist,
} from "../../../../redux/DealerContacts";
import DealerContacts from "../../../../services/DealerContacts";
import ButtonComponent from "../../../common/Button";
import ModalComponent from "../../../common/ModalComponent";
import LoadingIcon from "../../../common/LoadingIcon";

function DealerContactFooter({ editDealerMaintenanceLocks }) {
  const params = useParams();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const id = params.id;
  const dcfk = params.dcfk;
  const pagenum = params.pageNumber;
  const [load, setLoad] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const phoneRegex = /^\([\d]{3}\)[\d]{3}-[\d]{4}$/gm;

  const [deleteModal, setDeleteModal] = useState(false);
  const [saveDisable, setSaveDisable] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { contact, name, position, phone, fax, email, birthday, callback, lastcall, note, editMode } =
    useSelector((state) => state.dealerContacts);
  const contactExist = useSelector((state) => state.dealerContacts.contactExist);
  const isBirtdayValid = useSelector((state) => state.dealerContacts.isBirtdayValid);
  const isCallBackValid = useSelector((state) => state.dealerContacts.isCallBackValid);
  const isLastCallValid = useSelector((state) => state.dealerContacts.isLastCallValid);
  const saveHandler = () => {
    setLoad(true);
    DealerContacts.saveDealerContacts(
      id,
      contact,
      name,
      position,
      phone.replace(/\s+/g, ""),
      fax.replace(/\s+/g, ""),
      email,
      birthday,
      callback,
      lastcall,
      note,
      dcfk
    )
      .then((res) => {
        setLoad(false);
        if (res.status == 200) {
          dispatch(resetDatas());
          navigation("/dealer-contacts/" + id + "/" + pagenum);
          if (dcfk) {
            toast.success("Dealer Contact Updated");
          } else {
            toast.success("Dealer Contact Created");
          }
        }
      })
      .catch((err) => {
        setLoad(false);
        console.log(err);
      });
  };

  const handleEditCancel = () => {
    setCancelModal(true);
  };

  const handleCancelYes = () => {
    if (dcfk) {
      dispatch(setEditMode(false));
      setCancelModal(false);
      dispatch(setContactExistData(""));
      dispatch(setContactExist(false));

      DealerContacts.getDealerContacts(dcfk)
        .then((res) => {
          const data = res.data;

          dispatch(setContact(data.contact));
          dispatch(setName(data.name));
          dispatch(setPhone(data.phone));
          dispatch(setPosition(data.position));
          dispatch(setFax(data.fax));
          dispatch(setEmail(data.email));
          dispatch(setBirthday(data.birthday));
          dispatch(setCallback(data.callback));
          dispatch(setLastCall(data.lastcall));
          dispatch(setNote(data.notes));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigation("/dealer-contacts/" + id + "/" + pagenum);
    }

    toast.success("Changes cancelled");
  };

  const handleCancelNo = () => {
    setCancelModal(false);
  };

  const handleCancel = () => {
    navigation("/dealer-contacts/" + id + "/" + pagenum);
    toast.success("Changes cancelled");
  };
  const handleDeleteNo = () => {
    setDeleteModal(false);
  };

  const handleDeleteYes = async () => {
    const res = await editDealerMaintenanceLocks("DeleteLock", "Delete");
    if (!res) {
      setDeleteModal(false);
      return;
    }

    setDeleteLoader(true);
    DealerContacts.deleteDealerContact(dcfk)
      .then((res) => {
        toast.success("Dealer Contact Deleted");
        setDeleteModal(false);
        navigation("/dealer-contacts/" + id + "/" + pagenum);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setDeleteLoader(false);
      });
  };

  const deleteHandler = () => {
    setDeleteModal(true);
  };

  useEffect(() => {
    if (contact && !contactExist && name && isBirtdayValid && isLastCallValid && isCallBackValid) {
      if (
        (email && !email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/)) ||
        (phone && !phone.match(phoneRegex)) ||
        (fax && !fax.match(phoneRegex))
      ) {
        setSaveDisable(true);
      } else {
        setSaveDisable(false);
      }
    } else {
      setSaveDisable(true);
    }
  }, [contact, contactExist, email, phone, fax, name, , isBirtdayValid, isCallBackValid, isLastCallValid]);

  const validateAndSave = () => {
    setLoading(true);
    DealerContacts.checkContactExist(id, dcfk, contact)
      .then((response) => {
        if (response.data) {
          setSaveDisable(response.data);
        } else {
          saveHandler();
        }
      })
      .catch((err) => {
        setSaveDisable(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEdit = async () => {
    const res = await editDealerMaintenanceLocks("EditLock", "Edit");
    if (!res) {
      return;
    }
    dispatch(setEditMode(true));
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap">
        {editMode && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={validateAndSave}
            disabled={saveDisable}
          >
            Save
          </button>
        )}

        <button
          className="btn  btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={editMode ? handleEditCancel : handleCancel}
        >
          {" "}
          Cancel{" "}
        </button>

        {!editMode && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={handleEdit}
          >
            {" "}
            Edit{" "}
          </button>
        )}

        {!editMode && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={deleteHandler}
          >
            {" "}
            Delete{" "}
          </button>
        )}

        {/* edit Cancel Confirmation Modal */}

        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteModal}
          onHide={handleDeleteNo}
          title={"Delete Dealer Contact"}
          body={"Please confirm you want to Delete this Dealer Contact"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />

        {/* cancel */}

        <ModalComponent
          show={cancelModal}
          onHide={handleCancelNo}
          title={"Cancel Dealer Contact Changes"}
          body={"Please confirm you want to cancel the program without saving your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        {(load || deleteLoader) && (
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
}

export default DealerContactFooter;
