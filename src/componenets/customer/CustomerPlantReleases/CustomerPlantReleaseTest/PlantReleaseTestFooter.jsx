import React, { useEffect, useState } from "react";
import {
  resetChanges,
  setTestFile,
  setTestResponse,
  setViewDetail,
} from "../../../../redux/CustomerPlantReleasesSlice";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingIcon from "../../../common/LoadingIcon";
import CustomerPlantReleaseService from "../../../../services/CustomerPlantReleaseService";
import { Button, Modal } from "react-bootstrap";

const PlantReleaseTestFooter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const customerPlantReleaseFk = params.id;

  const testFile = useSelector((state) => state.customerPlantReleaseReducer.testFile);
  const [loading, setLoading] = useState(false);
  const [disableFlag, setDisableFlag] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);

  const hasFile = testFile && testFile.file;

  useEffect(() => {
    if (window.location.pathname === `/customer-plant-release-browse/${customerPlantReleaseFk}/testResult`) {
      setDisableFlag(true);
    }
  }, [window.location.pathname]);

  const handleNext = () => {
    setLoading(true);
    CustomerPlantReleaseService.SaveUploadFiles(testFile?.file, customerPlantReleaseFk, "TEST")
      .then((response) => {
        const data = response?.data;
        if (data?.error.errorCode === "SQL_ERROR_1") {
          setErrorShow(true);
          setErrorMsg("Invalid File Upload");
        } else {
          dispatch(setTestResponse(data?.response?.CustomerOrderPlantReleases));
          dispatch(setTestFile([]));
          navigate(`/customer-plant-release-browse/${customerPlantReleaseFk}/testResult`);
          toast.success("File Uploaded Successfully");
        }
      })
      .catch(() => {
        setErrorShow(true);
        setErrorMsg("Something went Wrong!");
      })
      .finally(() => {
        dispatch(setTestFile([]));
        setLoading(false);
        dispatch(setViewDetail(true));
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={disableFlag}
          onClick={handleNext}
          disabled={!hasFile}
        >
          Next
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={disableFlag}
          onClick={() => {
            navigate(`/customer-plant-release-browse/${customerPlantReleaseFk}`);
            dispatch(setViewDetail(true));
          }}
        >
          Cancel
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={!disableFlag}
          onClick={() => {
            dispatch(resetChanges());
            navigate(`/customer-plant-release-browse`);
          }}
        >
          Done
        </button>
        <Modal show={errorShow} onHide={() => setErrorShow(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 temp-red-color">Alert!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="font-14 h-100">{errorMsg}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setErrorShow(false)}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default PlantReleaseTestFooter;
