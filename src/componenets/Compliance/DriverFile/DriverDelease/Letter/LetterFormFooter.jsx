import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../../common/ModalComponent";
import DriverDeleaseService from "../../../../../services/DriverDeleaseService";
import {
  setAdminFee,
  setBondBalance,
  setChangesCancelled,
  setChargeAdminFee,
  setDisablePrint,
  setPayBalance,
  setReserveBalance,
} from "../../../../../redux/DriverDeleaseSlice";
import toast from "react-hot-toast";
import DeleteComponent from "../../../../common/DeleteComponent";
import PreviewPopup from "../../../../common/PreviewPopup";

const LetterFormFooter = () => {
  const { id, driverId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cancelShow, setCancelShow] = useState(false);
  const [objectKey, setObjectKey] = useState("DELEASEPDF");
  const [printStatus, setPrintStatus] = useState(false);
  const [showPreview, setshowPreview] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [blobFileId, setBlobFileId] = useState(null);
  const [show, setShow] = useState(false);
  const viewDetail = useSelector((state) => state.driverDeleaseReducer.viewDetail);
  const hasActiveDamage = useSelector((state) => state.driverDeleaseReducer.hasActiveDamage);
  const rehire = useSelector((state) => state.driverDeleaseReducer.rehire);
  const chargeAdminFee = useSelector((state) => state.driverDeleaseReducer.chargeAdminFee);
  const payBalance = useSelector((state) => state.driverDeleaseReducer.payBalance);
  const bondBalance = useSelector((state) => state.driverDeleaseReducer.bondBalance);
  const reserveBalance = useSelector((state) => state.driverDeleaseReducer.reserveBalance);
  const adminFee = useSelector((state) => state.driverDeleaseReducer.adminFee);
  const disablePrint = useSelector((state) => state.driverDeleaseReducer.disablePrint);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);
  const DeletePrimaryOk = () => {
    setShow(false);
  };
  const handleCancel = () => {
    setCancelShow(true);
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    dispatch(setChangesCancelled(true));
    dispatch(setChargeAdminFee(false));
    dispatch(setDisablePrint(false));
    navigate(`/driver-delease/${driverId}/${id}/delease-letters`);
    setCancelShow(false);
    toast.success("Changes cancelled");
  };
  /******API call to get the Pay Balance ******/
  const fetchPayBalance = () => {
    DriverDeleaseService.getCheckPayBalanceByDriverId(driverId)
      .then((res) => {
        dispatch(setPayBalance(res.data));
      })
      .catch((err) => console.log(err));
  };
  /******API Call to get the Admin fee*****/
  const getAdminFeeForLetter = () => {
    if (chargeAdminFee) {
      DriverDeleaseService.getTheAdminFee(hasActiveDamage, rehire).then((response) => {
        setTimeout(() => {
          dispatch(setAdminFee(response.data));
        });
      });
    }
  };

  /********Handle the Print functionality for Printing the Termination Letter******/
  const handlePreviewLetter = async () => {
    setLoading(true);
    try {
      const response = await DriverDeleaseService.printTerminationLettersForDriver(
        driverId,
        hasActiveDamage,
        rehire,
        chargeAdminFee,
        id,
        objectKey
      );
      /**Check if the response contains the failure message***/
      if (response.data === null) {
        toast.error("Failed to generate the termination letter. Please try again.");
        /****Exit early if there's an error****/
        return;
      }
      setFileContent(response.data.fileContent);
      setBlobFileId(response.data.documentBLOBPK);
      toast.success("Driver Termination Letter Generated Successfully");
      setshowPreview(true);
      await DriverDeleaseService.balanceDriverBondFunds(driverId, bondBalance);
      const bondResponse = await DriverDeleaseService.getBondBalanceByDriverId(driverId);
      if (!bondResponse || bondResponse.status !== 200) {
        toast.error("Failed to balance Driver Bond Funds.");
        return;
      }
      dispatch(setBondBalance(bondResponse.data));
      /****Balance Driver Reserve Funds****/
      await DriverDeleaseService.balanceDriverReserveFunds(driverId, reserveBalance);
      const reserveResponse = await DriverDeleaseService.getReserveBalanceByDriverId(driverId);
      if (!reserveResponse || reserveResponse.status !== 200) {
        toast.error("Failed to balance Driver Reserve Funds.");
        return;
      }
      dispatch(setReserveBalance(reserveResponse.data));
      /****Get Admin Fee****/
      const adminFeeResponse = await DriverDeleaseService.getTheAdminFee(hasActiveDamage, rehire);
      if (!adminFeeResponse || adminFeeResponse.status !== 200) {
        toast.error("Failed to retrieve Admin Fee.");
        return;
      }
      dispatch(setAdminFee(adminFeeResponse.data));
      /****Create Check Detail Record for Admin Fee**/
      await DriverDeleaseService.createChecKDetailForAdMinFee(driverId, adminFee, chargeAdminFee);
      /***Update UI and finalize****/
      setPrintStatus(true);
      fetchPayBalance();
      dispatch(setChargeAdminFee(false));
      navigate(`/driver-delease/${driverId}/${id}/delease-letters`);
      setLoading(false);
    } catch (error) {
      handleShow();
      setLoading(false);
      console.log("Error:", error);
      navigate(`/driver-delease/${driverId}/${id}/delease-letters`);
    }

    dispatch(setDisablePrint(true));
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={() => handlePreviewLetter()}
          disabled={disablePrint || adminFee === 0 || !chargeAdminFee}
        >
          Terminate
        </button>

        <PreviewPopup show={showPreview} onHide={() => setshowPreview(false)} base64PDF={fileContent} />

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={""}
          onClick={handleCancel}
        >
          Cancel
        </button>
        {/* Model Cancel*/}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Driver Delease Letter Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        <DeleteComponent
          show={show}
          onHide={DeletePrimaryOk}
          title={<span style={{ color: "red" }}>Warning: Connect MiniSoft Server</span>}
          body={
            <span style={{ color: "red" }}>Not able to print Termination Letter,Connect Minisoft Server</span>
          }
          handleOK={DeletePrimaryOk}
        />
      </div>
    </div>
  );
};

export default LetterFormFooter;
