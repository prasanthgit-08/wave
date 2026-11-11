import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../../common/Button";
import CustomerDelayServices from "../../../../services/CustomerDelayServices";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import ModalComponent from "../../../common/ModalComponent";
import CustomerDelayContent from "./CustomerDelayContent";
import { useDispatch, useSelector } from "react-redux";
import {
  setBreakdown,
  setDamage,
  setDelay,
  setDescription,
  setNotes,
  setPhone,
  setEditMode,
  setCustomerFKRedux,
  setNormalSortFlag,
  setNormalSortValue,
  setSearchTerms,
  setSearchCriteria,
  setListingData,
  setPageNumber,
  setDelaySelectedId,
} from "../../../../redux/CustomerDelaySlice";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import LoadingIcon from "../../../common/LoadingIcon";

const CustomerDelayTemplate = () => {
  const { cpk, id, pageNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [closeShow, setCloseShow] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [edit, setEdit] = useState(false);
  const [cancelSavePopUp, setCancelSavePopUp] = useState(false);
  const [editModePopup, setEditModePopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [checkDesc, setCheckDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);

  useEffect(() => {
    if (cpk) {
      dispatch(setCustomerFKRedux(cpk));
    }
  }, [cpk]);

  // Handler functions
  const onHandleCloseShow = () => {
    setCloseShow(true);
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
  };

  const onHandleCloseNo = () => {
    setCloseShow(false);
    setCancelSavePopUp(false);
  };

  const onHandleCloseYes = () => {
    navigate("/add-customer/" + cpk + "/" + pageNumber);
    toast.success("Page Closed");
    dispatch(setSearchTerms(""));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setListingData([]));
    dispatch(setPageNumber(0));
    dispatch(setDelaySelectedId(""));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    resetDatas();
  };

  // Edit page cancel button handler
  const handlerEditCancel = () => {
    toast.success("Cancelled");
    resetDatas();
  };

  // View page cancel button handler
  const handlerSaveCancel = () => {
    navigate("/customer-delay/" + cpk + "/" + pageNumber);
    toast.success("Changes Cancelled");
    resetDatas();
  };

  // View page close button on top
  const handlerEditCLose = () => {
    toast.success("Page Closed");
    dispatch(setSearchTerms(""));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setListingData([]));
    dispatch(setPageNumber(0));
    dispatch(setDelaySelectedId(""));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    resetDatas();
  };

  const editModeCancelHandler = () => {
    setEditModePopup(true);
  };

  // Edit page cancel button handler
  const saveCancel = () => {
    setCancelSavePopUp(true);
  };

  // Edit button handlers
  const editButtonHandler = () => {
    dispatch(setEditMode(false));
  };

  const handleEditNo = () => {
    setEditModePopup(false);
  };

  const handleEditYes = () => {
    setEditModePopup(false);
    if (id) {
      setEdit(true);
      dispatch(setEditMode(true));
      // Get each Customer Delay Resource details
      CustomerDelayServices.getCustomerDelayId(id).then((res) => {
        const { data } = res;
        dispatch(setDescription(data.description));
        dispatch(setPhone(data.phone));
        dispatch(setDelay(data.delay));
        dispatch(setBreakdown(data.breakdown));
        dispatch(setDamage(data.damage));
        dispatch(setNotes(data.notes));
      });
    }
    toast.success("Changes Cancelled");
  };

  // Getting data from redux
  const discription = useSelector((state) => state.customerDelaySlice.description);
  const phone = useSelector((state) => formatPhoneNumber(state?.customerDelaySlice?.phone));
  const delay = useSelector((state) => state.customerDelaySlice.delay);
  const breakdown = useSelector((state) => state.customerDelaySlice.breakdown);
  const damage = useSelector((state) => state.customerDelaySlice.damage);
  const notes = useSelector((state) => state.customerDelaySlice.notes);
  const isEditMode = useSelector((state) => state.customerDelaySlice.editMode);

  // Set data on fields on edit page
  useEffect(() => {
    if (id) {
      setLoading(true);
      setEdit(true);
      dispatch(setEditMode(true));
      // Get each Customer Delay Resource details
      CustomerDelayServices.getCustomerDelayId(id)
        .then((res) => {
          const { data } = res;
          dispatch(setDescription(data.description));
          dispatch(setPhone(data.phone));
          dispatch(setDelay(data.delay));
          dispatch(setBreakdown(data.breakdown));
          dispatch(setDamage(data.damage));
          dispatch(setNotes(data.notes));
        })
        .catch((err) => {
          console.log(err);
          navigate("/customer-delay/" + cpk + "/" + pageNumber);
        })
        .finally(() => setLoading(false));
    } else {
      resetDatas();
    }
  }, []);

  // disable the save button

  useEffect(() => {
    if (
      discription &&
      (!phone || phone.match(/^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm)) &&
      (delay || damage || breakdown) &&
      !checkDesc
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [discription, phone, delay, damage, breakdown, checkDesc]);

  // Reset the FormData
  const resetDatas = () => {
    dispatch(setEditMode(false));
    dispatch(setDescription(""));
    dispatch(setPhone(""));
    dispatch(setDelay(false));
    dispatch(setBreakdown(false));
    dispatch(setDamage(false));
    dispatch(setNotes(""));
  };

  // Validate before save
  const validateAndSave = () => {
    setDisabled(true);
    CustomerDelayServices.checkDescriptionExist(id, discription, cpk)
      .then((response) => {
        if (response.data) {
          setDisabled(true);
          setCheckDesc(response.data);
        } else {
          saveHandler();
        }
      })
      .catch((err) => {
        setDisabled(true)(true);
      })
      .finally(() => setDisabled(false));
  };

  // Create Delay Resource for a Customer
  const saveHandler = () => {
    setLoading(true);
    CustomerDelayServices.create(
      discription,
      phone.replace(/\s+/g, ""),
      cpk,
      id,
      delay,
      breakdown,
      damage,
      notes
    )
      .then((res) => {
        navigate("/customer-delay/" + cpk + "/" + pageNumber);
        if (id) {
          toast.success("Customer Delay Resources Updated");
        } else {
          toast.success("Customer Delay Resources Created");
        }
        resetDatas();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Delete a Data Popup

  const deleteHandler = () => {
    setDeletePopup(true);
  };

  const handleDeleteNo = () => {
    setDeletePopup(false);
  };

  // Delete yes on popup

  const handleDeleteYes = () => {
    // Delete a Delay Resource
    setLoading(true);
    CustomerDelayServices.deleteCustomerDelay(id)
      .then((response) => {
        navigate("/customer-delay/" + cpk + "/" + pageNumber);
        toast.success(" Customer Delay Resources Deleted");
        resetDatas();
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => setLoading(false));
    setDeletePopup(false);
  };

  return (
    <div className={`add-form-component p-0 ${QuarterScreen.container} `}>
      {loading && <LoadingIcon />}
      <div className={`border border-dark border-2 ${QuarterScreen.width} `}>
        <div className="">
          <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
            {!isEditMode && (
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                type=""
                onClick={onHandleCloseShow}
              >
                Close
              </button>
            )}

            {isEditMode && (
              <ButtonComponent
                route={"/add-customer/" + cpk + "/" + pageNumber}
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                label={"Close"}
                hidden={!edit}
                onClick={handlerEditCLose}
              />
            )}
          </div>

          <div className="col-xs-6">
            <Modal show={closeShow} onHide={onHandleCloseNo} backdrop="static" keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title className="font-18 h-100">Close Customer Delay Resources Changes</Modal.Title>
              </Modal.Header>

              <Modal.Body className="font-14 h-100">
                Please confirm you want to close the program without saving your changes
              </Modal.Body>

              <Modal.Footer>
                <Button variant="primary" onClick={onHandleCloseYes}>
                  {" "}
                  Yes{" "}
                </Button>
                <Button variant="secondary" onClick={onHandleCloseNo}>
                  {" "}
                  No{" "}
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>

        <div className=" ">
          <CustomerDelayContent setCheckDesc={setCheckDesc} checkDesc={checkDesc} />
        </div>

        <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
          <div className="d-flex align-items-center flex-wrap m-r-10"></div>
          <div className="d-flex align-items-center flex-wrap">
            {!isEditMode && (
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                type=""
                onClick={validateAndSave}
                disabled={disabled}
              >
                Save
              </button>
            )}
            <ButtonComponent
              label={"Cancel"}
              hidden={edit}
              route={""}
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              onClick={saveCancel}
            />
            {!isEditMode && (
              <ButtonComponent
                route={""}
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                label={"Cancel"}
                hidden={!edit}
                onClick={editModeCancelHandler}
              />
            )}

            {isEditMode && (
              <ButtonComponent
                route={"/customer-delay/" + cpk + "/" + pageNumber}
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                label={"Cancel"}
                hidden={!edit}
                onClick={handlerEditCancel}
              />
            )}

            {edit && (
              <ButtonComponent
                label={"Edit"}
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                route={""}
                hidden={!isEditMode}
                onClick={editButtonHandler}
              />
            )}

            {edit && (
              <ButtonComponent
                route={""}
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                label={"Delete"}
                onClick={deleteHandler}
                hidden={!isEditMode}
              />
            )}

            {/* Modal Active*/}

            <ModalComponent
              show={editModePopup}
              onHide={handleEditNo}
              title={"Cancel Customer Delay Resources Changes"}
              body={"Please confirm you want to cancel your changes"}
              handleYES={handleEditYes}
              handleNO={handleEditNo}
            />

            <ModalComponent
              show={deletePopup}
              onHide={handleDeleteNo}
              title={"Delete Customer Delay Resources"}
              body={"Please confirm you want to Delete this Customer Delay Resources"}
              handleYES={handleDeleteYes}
              handleNO={handleDeleteNo}
            />

            <ModalComponent
              show={cancelSavePopUp}
              onHide={onHandleCloseNo}
              title={"Cancel Customer Delay Resources Changes"}
              body={"Please confirm you want to cancel your changes"}
              handleYES={handlerSaveCancel}
              handleNO={onHandleCloseNo}
            />

            {/* Delete Error */}
            <Modal show={errorShow} onHide={() => setErrorShow(false)} backdrop="static" keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title className="font-18 h-100 temp-red-color">Delete failed!</Modal.Title>
              </Modal.Header>
              <Modal.Body className="font-14 h-100">{errorMsg}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setErrorShow(false)}>
                  OK
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDelayTemplate;
