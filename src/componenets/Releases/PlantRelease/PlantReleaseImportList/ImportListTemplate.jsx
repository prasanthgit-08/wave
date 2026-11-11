import React, { useEffect, useState } from "react";
import HalfScreenWrapper from "../../../Templates/Screens/HalfScreenWrapper";
import { setTestFile, setTestResponse } from "../../../../redux/PlantReleaseSlice";
import ImportContent from "./ImportContent";
import CommonFooter from "../../../common/CommonFooter";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CustomerPlantReleaseService from "../../../../services/CustomerPlantReleaseService";
import PlantReleaseHeader from "../PlantReleaseHeader";
import DeleteComponent from "../../../common/DeleteComponent";
const ImportListTemplate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [processLoading, setProcessLoading] = useState(false);
  const importList = useSelector((state) => state.plantReleaseReducer.importList);
  const testFile = useSelector((state) => state.plantReleaseReducer.testFile);
  const customerPlantReleaseId = useSelector((state) => state.plantReleaseReducer.customerPlantReleaseId);
  const [previouslyReleasedVINs, setPreviouslyReleasedVINs] = useState("");
  const [unitNotFoundVINs, setUnitNotFoundVINs] = useState("");
  const [lockedUnits, setLockedUnits] = useState("");
  const [releasedVINs, setReleasedVINs] = useState("");
  const [messageShow, setMessageShow] = useState(false);

  const rightButtons = [
    {
      label: "Process",
      onClick: () => onProcess(),
      disabled: !customerPlantReleaseId || testFile?.length === 0,
    },
  ];
  const leftButtons = [
    {
      label: "Test",
      onClick: () => onTest(),
      disabled: !customerPlantReleaseId || testFile?.length === 0,
    },
  ];

  /**
   * Process api
   */
  const onProcess = () => {
    setProcessLoading(true);
    CustomerPlantReleaseService.SaveUploadFiles(testFile?.file, customerPlantReleaseId, "check")
      .then((response) => {
        const data = response?.data;
        const d1 = response?.data?.response;
        const message = d1?.CustomerOrderPlantReleases?.[0]?.Msg;

        if (data?.error?.errorCode === "1" || message || data?.error?.errorCode == "SQL_ERROR_1") {
          handleAlert();
        }
        const plantReleases = response?.data?.response?.CustomerOrderPlantReleases || [];

        const vinList = plantReleases.map((item) => item.VIN).join(",");

        setPreviouslyReleasedVINs(vinList);
        const unitsNotFound = response?.data?.response?.unitsNotFound || [];

        const list = unitsNotFound.map((item) => item.VIN).join(",");

        setUnitNotFoundVINs(list);

        const lockedUnitList = response?.data?.response?.LockedUnits || [];

        const unitlist = lockedUnitList.map((item) => item.VIN).join(",");
        setLockedUnits(unitlist);

        const currentlyReleased = response?.data?.response?.existingPlantReleases || [];

        const released = currentlyReleased.map((item) => item.VIN).join(",");
        const releasedPKs = currentlyReleased
          .map((item) => Number(item.UnitPK))
          .filter(Boolean)
          .join(",");
        setReleasedVINs(released);
        const existing = localStorage.getItem("releasedUnitIds");
        const existingUnits = existing ? existing.split(",") : [];

        const newUnits = releasedPKs ? releasedPKs.split(",") : [];

        const updatedUnits = [...new Set([...existingUnits, ...newUnits])];
        //releasedUnitIds - used to send email
        localStorage.setItem("releasedUnitIds", updatedUnits.join(","));
        if (vinList || list || released) {
          handleMessageShow();
        }
      })
      .catch(() => {
        toast.success("Failed to upload file");
        dispatch(setTestFile([]));
        dispatch(setTestResponse(""));
      })
      .finally(() => {
        setProcessLoading(false);
      });
  };

  /**
   * Used for popup message
   */
  const handleMessageShow = () => setShow(true);
  const ShowMessage = () => {
    setShow(false);
    dispatch(setTestFile([]));
    dispatch(setTestResponse(""));
  };

  /**
   * Used for popup message -alert
   */
  const handleAlert = () => setMessageShow(true);
  const Message = () => {
    setMessageShow(false);
    dispatch(setTestFile([]));
    dispatch(setTestResponse(""));
  };

  /**
   * Test api
   */
  const onTest = () => {
    setLoading(true);
    CustomerPlantReleaseService.SaveUploadFiles(testFile?.file, customerPlantReleaseId, "TEST")
      .then((response) => {
        const data = response?.data;
        const d1 = response?.data?.response;

        const message = d1?.CustomerOrderPlantReleases?.[0]?.Msg;

        if (data?.error?.errorCode === "1" || message || data?.error?.errorCode == "SQL_ERROR_1") {
          handleAlert();
        } else {
          dispatch(setTestResponse(data?.response?.CustomerOrderPlantReleases));
          navigate("/plant-release-test-result-screen");
          toast.success("File Uploaded Successfully");
        }
      })
      .catch(() => {
        toast.success("Failed to upload file");
        dispatch(setTestFile([]));
        dispatch(setTestResponse(""));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * Used for reload
   */
  useEffect(() => {
    if (importList === false) {
      navigate("/plant-release-selection-screen");
    }
  }, [importList]);

  return (
    <HalfScreenWrapper>
      <PlantReleaseHeader />

      <ImportContent loading={loading} processLoading={processLoading} />
      <DeleteComponent
        show={show}
        onHide={ShowMessage}
        title={"Success"}
        body={
          <div
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              paddingRight: "10px",
            }}
          >
            <p className="text-break">
              <strong style={{ fontWeight: "700" }}>Units have been released for the VINs:</strong>
              <br />
              {releasedVINs?.split(",")?.map((vin, index) => (
                <span key={index}>
                  {vin.trim()}
                  <br />
                </span>
              ))}
            </p>
            <p className="text-break">
              <strong style={{ fontWeight: "700" }}>Units have already been released for the VINs:</strong>
              <br />
              {previouslyReleasedVINs?.split(",")?.map((vin, index) => (
                <span key={index}>
                  {vin.trim()}
                  <br />
                </span>
              ))}
            </p>

            <p className="text-break">
              <strong style={{ fontWeight: "700" }}>Units were not found for the VINs:</strong>
              <br />
              {unitNotFoundVINs?.split(",")?.map((vin, index) => (
                <span key={index}>
                  {vin.trim()}
                  <br />
                </span>
              ))}
            </p>
            <p className="text-break">
              <strong style={{ fontWeight: "700" }}>Locked Units:</strong>
              <br />
              {lockedUnits?.split(",")?.map((vin, index) => (
                <span key={index}>
                  {vin.trim()}
                  <br />
                </span>
              ))}
            </p>
          </div>
        }
        handleOK={ShowMessage}
      />

      <DeleteComponent
        show={messageShow}
        onHide={Message}
        title={"Alert"}
        body={
          <div>
            <p> {"Invalid File Uploaded"} </p>
          </div>
        }
        handleOK={Message}
      />
      <CommonFooter rightButtons={rightButtons} leftButtons={leftButtons} />
    </HalfScreenWrapper>
  );
};

export default ImportListTemplate;
