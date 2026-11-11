import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import ButtonComponent from "../../common/Button";
import ModalComponent from "../../common/ModalComponent";
import { Button, Modal } from "react-bootstrap";
import { Colors } from "../../../styles/values/colors";
import {
  setViewDetail,
  setPrinterData,
  setSavePrinter,
  setDescriptionValid,
  resetChanges,
  setDescriptionError,
  setNameValid,
  setPrinterUrlValid,
} from "../../../redux/EditPrinterSlice";
import PrinterService from "../../../services/PrinterService";
import LoadingIcon from "../../common/LoadingIcon";
// import { setDescriptionError } from "../../../redux/PrinterSearchFilterSlice";

function FormFooter() {
  const [activeShow, setActiveShow] = useState(false);
  const [active, setActive] = React.useState("");
  const [cancelShow, setCancelShow] = useState(false);
  const [disableSave, setdisableSave] = useState(true);
  const handleDelete = () => setDeleteDealer(true);
  const handleDeleteNo = () => setDeleteDealer(false);
  const [deleteDealerPopUp, setDeleteDealer] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const id = params.id;
  const pageNum = params.pageNumber;
  let viewDetail = useSelector((state) => state.editPrinterReducer.viewDetail);
  let url = useSelector((state) => state.editPrinterReducer.printerURL);
  let description = useSelector((state) => state.editPrinterReducer.description);
  let duplex = useSelector((state) => state.editPrinterReducer.duplex);
  let duplexCode = useSelector((state) => state.editPrinterReducer.duplexControlCode);
  let multiTrayPrinter = useSelector((state) => state.editPrinterReducer.multiTrayPrinter);
  let whiteControlCode = useSelector((state) => state.editPrinterReducer.whiteControlCode);
  let yellowControlCode = useSelector((state) => state.editPrinterReducer.yellowControlCode);
  let pinkControlCode = useSelector((state) => state.editPrinterReducer.pinkControlCode);
  let collateStaple = useSelector((state) => state.editPrinterReducer.collateStaple);
  let collateControlCode = useSelector((state) => state.editPrinterReducer.collateControlCode);
  let stapleControlCode = useSelector((state) => state.editPrinterReducer.stapleControlCode);
  let printerData = useSelector((state) => state.editPrinterReducer.printerData);
  let printerDataFrmDB = useSelector((state) => state.editPrinterReducer.printerDatafrmDB);
  let descriptionValid = useSelector((state) => state.editPrinterReducer.descriptionValid);
  let nameValid = useSelector((state) => state.editPrinterReducer.nameValid);
  let name = useSelector((state) => state.editPrinterReducer.name);
  let printerUrlValid = useSelector((state) => state.editPrinterReducer.printerUrlValid);

  const handleActiveClose = () => setActiveShow(false);
  const handleActiveShow = () => setActiveShow(true);
  const ipRegex =
    /^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/gm;
  //validation .these values are dispatched from formContent
  useEffect(() => {
    let disableFlag = false;
    if (
      name &&
      description !== null &&
      description !== "" &&
      description !== undefined &&
      description?.trim().length > 0 &&
      url != null &&
      url !== "" &&
      url !== undefined &&
      url?.trim().length > 0 &&
      url?.trim().match(ipRegex)
    ) {
      if (!descriptionValid || !nameValid || !printerUrlValid) disableFlag = true;

      if (duplex) {
        if (duplexCode === null || duplexCode === "" || duplexCode === undefined) {
          disableFlag = true;
        }
      }
      if (multiTrayPrinter) {
        if (
          whiteControlCode === null ||
          whiteControlCode === "" ||
          whiteControlCode === undefined ||
          yellowControlCode === null ||
          yellowControlCode === "" ||
          yellowControlCode === undefined ||
          pinkControlCode === null ||
          pinkControlCode === "" ||
          pinkControlCode === undefined
        ) {
          disableFlag = true;
        }
      }
      if (collateStaple) {
        if (
          collateControlCode === null ||
          collateControlCode === "" ||
          collateControlCode === undefined ||
          stapleControlCode === null ||
          stapleControlCode === "" ||
          stapleControlCode === undefined
        ) {
          disableFlag = true;
        }
      }
    } else {
      disableFlag = true;
    }

    if (disableFlag) {
      setdisableSave(true);
    } else {
      setdisableSave(false);
    }
  }, [
    description,
    descriptionValid,
    url,
    multiTrayPrinter,
    whiteControlCode,
    yellowControlCode,
    pinkControlCode,
    duplex,
    duplexCode,
    collateStaple,
    collateControlCode,
    stapleControlCode,
    nameValid,
    name,
    printerUrlValid,
  ]);

  //Save or Update Printer
  const saveOrUpdatePrinter = (e) => {
    setLoading(true);
    dispatch(setSavePrinter(true));
    PrinterService.savePrinter(printerData)
      .then((response) => {
        navigate("/printer");
        if (id) {
          toast.success("Printer Updated");
        } else {
          toast.success("Printer Created");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  const handleDeleteYes = () => {
    setLoading(true);
    params.id = "undefined";
    PrinterService.deletePrinter(printerDataFrmDB.printerPK)
      .then((response) => {
        navigate("/printer");

        dispatch(resetChanges());
        toast.success("Printer Deleted");
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
      })
      .finally(() => setLoading(false));
    setDeleteDealer(false);
  };

  const onHandleChangeView = () => {
    dispatch(setViewDetail(false));
    dispatch(setNameValid(true));
    dispatch(setPrinterUrlValid(true));
  };

  const handleCancelShow = () => {
    dispatch(setDescriptionValid(true)); // for resetting error message
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));

      navigate("/printer", { state: { item: id, navValue: true, navPage: pageNum } });
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => {
    setCancelShow(false);
    dispatch(setViewDetail(false));
  };

  const handleCancelYes = () => {
    dispatch(setDescriptionValid(true)); // for resetting error message
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(setDescriptionError(""));
      toast.success("Changes Cancelled");
    } else {
      navigate("/printer");
      dispatch(setViewDetail(false));
      dispatch(setPrinterData(null));
      toast.success("Changes Cancelled");
    }
  };

  const handleCheckDescription = async (description) => {
    try {
      const res = await PrinterService.checkDescription(description, id);
      return res.data.length === 0;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const handleCheckName = async (printerName) => {
    try {
      const res = await PrinterService.checkName(printerName, id);
      return res.data.length === 0;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const handleCheckURL = async (printerURL) => {
    try {
      const res = await PrinterService.checkUrl(printerURL, id);
      return res.data.length === 0;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={viewDetail === false}
          onClick={handleCancelShow}
        >
          Cancel
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={async () => {
            setLoading(true);
            const [isDescriptionValid, isNameValid, isUrlValid] = await Promise.all([
              handleCheckDescription(printerData.description),
              handleCheckName(printerData.printerName),
              handleCheckURL(printerData.printerURL),
            ]);

            if (isDescriptionValid && isNameValid && isUrlValid) {
              saveOrUpdatePrinter();
            } else {
              setLoading(false);
            }
          }}
        >
          {loading ? (
            <div className="loader-container">
              <div className="loader_YardCheckin"></div>
            </div>
          ) : (
            "Save"
          )}
        </button>

        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={!id || viewDetail === false}
          onClick={onHandleChangeView}
          label={"Edit"}
        />

        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={!id || viewDetail === false}
          onClick={handleDelete}
          label={"Delete"}
        />
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={viewDetail === true}
          type="button"
          onClick={handleCancelShow}
        >
          Cancel
        </button>

        {/* model Active*/}

        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Printer Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteDealerPopUp}
          onHide={handleDeleteNo}
          title={"Delete Printer"}
          body={"Please confirm you want to delete this Printer"}
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

export default FormFooter;
