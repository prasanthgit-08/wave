import React, { useEffect, useState } from "react";
import RandomTestingService from "../../../services/Compliance/RandomTestingService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DeleteComponent from "../../common/DeleteComponent";
import PreviewPopup from "../../common/PreviewPopup";
import {
  setEmailSelection,
  setIsValidateFlag,
  setPrintSelection,
} from "../../../redux/Compliance/RandomTestingSlice";

const RandomTestingFooter = () => {
  const randomTestingData = useSelector((state) => state.randomTestingReducer.randomTestingData);
  const disableProcess = useSelector((state) => state.randomTestingReducer.disableProcess);
  const printSelection = useSelector((state) => state.randomTestingReducer.printSelection);
  const emailSelection = useSelector((state) => state.randomTestingReducer.emailSelection);

  const isValidateFlag = useSelector((state) => state.randomTestingReducer.isValidateFlag);
  const [show, setShow] = useState(false);
  const [showDriver, setShowDriver] = useState(false);

  const [showPreview, setshowPreview] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleShow = () => setShow(true);

  const DeletePrimaryOk = () => {
    navigate(`/random-testing`);
    setShow(false);
  };
  /****
   * Show the pop up of No eligible driver Records are present
   ****/
  const NoRecorsFound = () => {
    setShowErrorPopup(false);
    navigate(`/`);
  };

  const handleProcess = () => {
    setLoader(true);
    RandomTestingService.processRandomTesting(randomTestingData)
      .then((response) => {
        if (response.data.errorCode === 1) {
          setErrorMsg(response.data.errorMessage);
          setShowErrorPopup(true);
          setLoader(false);
          return;
        }
        setFileContent(response.data.fileContent);
        if (printSelection && !!response.data.fileContent) {
          setshowPreview(true);
        }
        toast.success("Random Testing Process Completed");
        validateDrugTestDate();
        dispatch(setPrintSelection(false));
        dispatch(setEmailSelection(false));
        setLoader(false);
      })
      .catch((error) => {
        toast.error("Failed to process Random Testing");
        setLoader(false);
      });
  };

  /*****
   * Check whether the Company's drug test date
   * is more than 30 days from current date
   *****/
  const validateDrugTestDate = () => {
    RandomTestingService.validateDrugTestDate()
      .then((response) => {
        const validateFlag = response.data?.response?.isDateExceeded?.[0]?.LastDrugRandomFlag;
        dispatch(setIsValidateFlag(validateFlag));
        if (validateFlag === 0 && !printSelection && !emailSelection) {
          handleShow();
        }
      })
      .catch((error) => {
        navigate(`/`);
        toast.error("Failed to process Random Testing");
      });
  };
  /****
   * API call to validate drug test
   */
  useEffect(() => {
    validateDrugTestDate();
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        {loader && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleProcess}
          disabled={disableProcess || !isValidateFlag}
        >
          {loader === true ? (
            <div className="loader-container">
              <div className="loader_YardCheckin"></div>
            </div>
          ) : (
            "Process"
          )}
        </button>
        <DeleteComponent
          show={show}
          onHide={DeletePrimaryOk}
          title={<span style={{ color: "red" }}>Warning: Less than 30 Days Since Random Test</span>}
          body={
            <span style={{ color: "red" }}>
              {" "}
              It has been less than 30 days since the Drug Random Test was Done
            </span>
          }
          handleOK={DeletePrimaryOk}
        />
        <DeleteComponent
          show={showErrorPopup}
          onHide={NoRecorsFound}
          title={<span style={{ color: "red" }}>Warning</span>}
          body={<span style={{ color: "red" }}>No Eligible Driver Records Found</span>}
          handleOK={NoRecorsFound}
        />

        <PreviewPopup show={showPreview} onHide={() => setshowPreview(false)} base64PDF={fileContent} />
      </div>
    </div>
  );
};

export default RandomTestingFooter;
