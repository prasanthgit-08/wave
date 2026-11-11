import React from "react";
import ButtonComponent from "../../../common/Button";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect, useState } from "react";
import TermsService from "../../../../services/TermsService";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  resetChanges,
  setDescriptionValid,
  setTermsCodeValid,
  setTermValid,
  setViewDetail,
  toggleChangesCancelled,
} from "../../../../redux/TermsSlice";
import ModalComponent from "../../../common/ModalComponent";
import { Button, Modal } from "react-bootstrap";
import LoadingIcon from "../../../common/LoadingIcon";

function TermsEditFooter({ styles }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const description = useSelector((state) => state.termsReducer.description);
  const terms = useSelector((state) => state.termsReducer.terms);
  const invoiceDays = useSelector((state) => state.termsReducer.invoiceDays);
  const termsCode = useSelector((state) => state.termsReducer.termsCode);
  const viewDetail = useSelector((state) => state.termsReducer.viewDetail);
  const descriptionValid = useSelector((state) => state.termsReducer.descriptionValid);
  const termValid = useSelector((state) => state.termsReducer.termValid);
  const termsCodeValid = useSelector((state) => state.termsReducer.termsCodeValid);

  const [disableSave, setDisableSave] = useState(true);
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const onHandleSave = () => {
    TermsService.saveTerms(id, description, terms, invoiceDays, termsCode)
      .then((response) => {
        navigate("/terms-browse");
        if (id) {
          toast.success("Term Updated");
        } else {
          toast.success("Term Created");
        }
      })
      .catch((error) => {
        navigate("/terms-browse");
        let msg = "";
        if (error.response) {
          msg = error.response.data.errorMsg;
        }
        if (msg === null || msg === "" || msg === undefined) {
          msg = "Something went wrong !! Failed to save the record !!";
        }
        toast.error(msg);
      })
      .finally(() => setLoading(false));
  };

  const uniqueSaveHandler = () => {
    setLoading(true);
    TermsService.checkUniqueSave(terms, description, id, termsCode)
      .then((response) => {
        if (response.data) {
          setDisableSave(true);
          setLoading(false);
        } else {
          onHandleSave();
        }
      })
      .catch((err) => {
        setDisableSave(true);
      });
  };

  const handleCancelShow = () => {
    dispatch(setDescriptionValid(true));
    dispatch(setTermValid(true));
    dispatch(setTermsCodeValid(true));

    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/terms-browse");
    }
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    dispatch(setDescriptionValid(true));
    dispatch(setTermValid(true));
    dispatch(setTermsCodeValid(true));
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      toast.success("Changes Cancelled");
      dispatch(toggleChangesCancelled());
    } else {
      navigate("/terms-browse");
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      toast.success("Changes Cancelled");
    }
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
    TermsService.deleteTerms(id)
      .then((response) => {
        navigate("/terms-browse");
        toast.success("Term Deleted");
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (
      description !== "" &&
      descriptionValid &&
      terms !== "" &&
      termValid &&
      termsCode !== "" &&
      termsCodeValid &&
      invoiceDays !== "" &&
      invoiceDays >= 0 &&
      invoiceDays <= 90
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [description, descriptionValid, terms, termValid, invoiceDays, termsCode, termsCodeValid]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          type=""
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={uniqueSaveHandler}
        >
          Save
        </button>

        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={handleCancelShow}
        >
          Cancel
        </button>

        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          label={"Edit"}
          hidden={!viewDetail}
          onClick={() => {
            dispatch(setViewDetail(false));
          }}
        />

        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          label={"Delete"}
          hidden={!viewDetail}
          onClick={onHandleDelete}
        />

        {/*Cancel Confirmation Modal*/}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Term  Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Term"}
          body={"Please confirm you want to delete this Term"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
        <Modal show={errorShow} onHide={() => setErrorShow(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 temp-red-color">Delete failed!</Modal.Title>
          </Modal.Header>

          <Modal.Body className="font-14 h-100">{errorMsg}</Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setErrorShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default TermsEditFooter;
