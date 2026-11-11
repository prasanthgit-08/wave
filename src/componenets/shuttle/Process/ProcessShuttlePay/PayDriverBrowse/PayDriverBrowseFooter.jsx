import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import ProcessPayService from "../../../../../services/ProcessPayService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ModalComponent from "../../../../common/ModalComponent";
import ButtonComponent from "../../../../common/Button";
import {
  resetSelection,
  selectAllRecord,
  setCompanyName,
  setDriverNameInput,
  setSelectedArrayList,
  setSelectedDriverID,
  setUnselectedArrayList,
  updateProcessPayData,
} from "../../../../../redux/ProcessPaySlice";
import LoadingIcon from "../../../../common/LoadingIcon";

function PayDriverBrowseFooter() {
  const [cancelShow, setCancelShow] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const processPayData = useSelector((state) => state.processShuttlePayReducer.processPayData);
  const selectedArrayList = useSelector((state) => state.processShuttlePayReducer.selectedArrayList);
  const unselectedArrayList = useSelector((state) => state.processShuttlePayReducer.unselectedArrayList);
  const pageNumber = useSelector((state) => state.processShuttlePayReducer.pageNumber);
  const loading = useSelector((state) => state.processShuttlePayReducer.loading);
  const selectAll = useSelector((state) => state.processShuttlePayReducer.selectAll);
  const selectedDriverID = useSelector((state) => state.processShuttlePayReducer.selectedDriverID);
  const isCurrentCompany = useSelector((state) => state.processShuttlePayReducer.isCurrentCompany);
  const companyName = useSelector((state) => state.processShuttlePayReducer.companyName);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saveProcess = () => {
    setSaveLoading(true);
    ProcessPayService.saveProcessPay(
      selectedArrayList,
      selectedDriverID,
      unselectedArrayList,
      companyName,
      isCurrentCompany
    )
      .then((res) => {
        dispatch(setSelectedDriverID(""));
        dispatch(setDriverNameInput(""));
        navigate("/shuttle-process-pay-driver-selection");
        dispatch(setSelectedArrayList([]));
        dispatch(setUnselectedArrayList([]));
        dispatch(setCompanyName(""));
        setSaveLoading(false);
        toast.success("The record is processed");
      })
      .catch((error) => {
        setSaveLoading(false);
        dispatch(setSelectedArrayList([]));
        dispatch(setUnselectedArrayList([]));
        toast.error("Something went wrong!");
      });
  };

  const handleCancelShow = () => {
    setCancelShow(true);
  };

  const handleCancelYes = () => {
    setCancelShow(false);
    toast.success("Changes Cancelled");
    navigate("/shuttle-process-pay-driver-selection");
    dispatch(resetSelection());
  };
  const handleCancelNo = () => setCancelShow(false);

  //To retain the selection of one page while navigating to other page. Only color change.
  useEffect(() => {
    if (!loading) {
      let duplicateElements = selectedArrayList.filter((element) =>
        processPayData?.some((data) => data.unitShuttlePK === element.unitShuttlePK)
      );

      if (duplicateElements?.length > 0) {
        duplicateElements?.forEach((unit) => {
          const indexToUpate = processPayData?.findIndex(
            (element) => element.unitShuttlePK === unit.unitShuttlePK
          );
          // Making post true for all selected elements for corresponding indexes
          dispatch(updateProcessPayData({ index: indexToUpate }));
        });
      }
    }
  }, [loading, pageNumber]);

  useEffect(() => {
    if (!loading) {
      if (selectAll) {
        dispatch(selectAllRecord());
      }
    }
  }, [pageNumber, loading]);

  return (
    <div className=" d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap">
      {saveLoading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          disabled={!selectedArrayList || selectedArrayList?.length === 0}
          onClick={() => {
            saveProcess();
          }}
        >
          Process
        </button>

        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          label={"Cancel"}
          onClick={handleCancelShow}
        />
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Process Shuttle Pay Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
    </div>
  );
}

export default PayDriverBrowseFooter;
