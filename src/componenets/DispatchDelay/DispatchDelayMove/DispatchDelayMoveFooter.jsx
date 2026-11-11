import React, { useEffect, useState } from "react";
import DelayProcessingService from "../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Table } from "react-bootstrap";
import formatDatetimeToDate from "../../../utils/formatDateTimeToDate";
import NoRecordsMessage from "../../common/NoRecordsMessage";
import { useNavigate, useParams } from "react-router-dom";
import { formatPhoneNumber } from "../../../utils/validation/Phonevalidation";
import {
  setMiscMoveDeliveryDetails,
  setMoveData,
} from "../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import { emailRegex } from "../../../utils/validation/EmailRegex";
import { setMiscellaneousDealerId } from "../../../redux/UndispatchSlice";
import toast from "react-hot-toast";
import ModalComponent from "../../common/ModalComponent";

const DispatchDelayMoveFooter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { unitFK, driverFK, delayedUnitPK } = useParams();
  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });

  const [activeShow, setActiveShow] = useState(false);
  const [listingData, setListingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [delayType, setdelayType] = useState(null);
  const [saveEnable, setsaveEnable] = useState(false);
  const [firstClose, setfirstClose] = useState(false);

  const selectedCompanyName = useSelector((state) => state.unitSelection.selectedCompanyName);
  const moveData = useSelector((state) => state.delayProcessing.moveData);
  const delayMoveSave = useSelector((state) => state.delayProcessing.delayMoveSave);
  const miscMoveDeliveryDetails = useSelector((state) => state.delayProcessing.miscMoveDeliveryDetails);
  const miscellaneousDealerData = useSelector((state) => state.undispatchReducer.miscellaneousDealerData);
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const [cancelShow, setCancelShow] = useState(false);
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    handleActiveClose();
    if (firstClose) {
      navigate(
        `/delay-processing/delayed-details/${selectedCompanyName}/${unitFK}/${driverFK}/${delayedUnitPK}`
      );
      dispatch(setMoveData(null));
      dispatch(setMiscMoveDeliveryDetails(null));
      dispatch(setMiscellaneousDealerId(null));
    }
  };

  const handleActiveClose = () => {
    setActiveShow(false);
    setSelectedId(null);
    setCancelShow(false);
  };

  const getDelayDetails = () => {
    DelayProcessingService.getDelayDetails(delayedUnitPK, selectedCompanyName)
      .then((response) => {
        setActiveShow(response?.data?.length > 1);
        if (response?.data?.length > 1) {
          setSelectedId(null);
          setListingData(response?.data);
          setLoading(false);
          setLoader(false);
        } else {
          const firstElement = response?.data?.[0];
          setSelectedId(firstElement?.PK);
          setdelayType(firstElement?.Delay);
          saveDelayMoveDetails(firstElement?.Delay, firstElement?.PK);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveDelayMoveDetails = (delayType, selectedId) => {
    let updatedMoveData = {
      ...moveData,
      delayType: delayType,
      damageOrBreakdownId: selectedId,
      delayedunitfk: delayedUnitPK,
    };
    DelayProcessingService.saveDelayMoveDetails(updatedMoveData)
      .then((response) => {
        setActiveShow(false);
        if (response && response?.data) {
          const { data } = response;
          setListingData(null);
          setLoading(false);
          setLoader(false);
          if (response.status === 200) {
            toast.success("Move done successfully");
            navigate(
              `/delay-processing/delayed-details/${selectedCompanyName}/${unitFK}/${driverFK}/${delayedUnitPK}`
            );
          } else {
            toast.error("Move Failed");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (
      moveData?.isAlternateLoc &&
      miscMoveDeliveryDetails?.name &&
      miscMoveDeliveryDetails?.address1?.trim() &&
      miscMoveDeliveryDetails?.city?.trim() &&
      miscMoveDeliveryDetails?.stateCode?.trim() &&
      miscMoveDeliveryDetails?.postalCode?.trim() &&
      formatPhoneNumber(miscMoveDeliveryDetails?.phone) &&
      miscMoveDeliveryDetails?.phone?.length === 13 &&
      miscMoveDeliveryDetails?.deliveryContact?.trim() &&
      formatPhoneNumber(miscMoveDeliveryDetails?.deliveryContactPhone) &&
      miscMoveDeliveryDetails?.deliveryContactPhone?.length === 13 &&
      miscMoveDeliveryDetails?.email?.trim()?.match(emailRegex)
    ) {
      setsaveEnable(true);
    } else {
      setsaveEnable(false);
    }
  }, [moveData?.isAlternateLoc]);

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={() => {
            getDelayDetails();
          }}
          disabled={!delayMoveSave}
        >
          Save
        </button>{" "}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            setCancelShow(true);
            setfirstClose(true);
          }}
        >
          Close
        </button>
      </div>
      <Modal show={activeShow} size={"lg"} onHide={handleActiveClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Dispatch Delay Move</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="fixTableHead unitSelection border border-dark border-2">
            <table className="table table-striped f-w-600">
              <thead>
                <tr disabled>
                  <th className="f-w-600">Delay</th>
                  <th className="f-w-600">Description</th>
                  <th className="f-w-600">Date</th>
                </tr>
              </thead>

              <tbody>
                {loader
                  ? ""
                  : listingData?.length >= 1 &&
                    listingData?.map((data) => (
                      <tr
                        id="rowId"
                        onClick={() => {
                          setSelectedId(data?.PK);
                          setdelayType(data?.Delay);
                        }}
                        className={data?.PK === selectedId ? "tableSelected" : ""}
                      >
                        <td className="f-w-600"> {data?.Delay} </td>
                        <td className="f-w-600"> {data?.Description} </td>
                        <td className="f-w-600">{formatDatetimeToDate(data?.Date, "MM/DD/YY")}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
            {loader ? "" : listingData?.length === 0 && <NoRecordsMessage />}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              saveDelayMoveDetails(delayType, selectedId);
            }}
            disabled={!selectedId}
          >
            Save
          </Button>
          <Button
            variant="secondary"
            onClick={(e) => {
              setCancelShow(true);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Cancel Confirmation Modal */}
      <ModalComponent
        show={cancelShow}
        onHide={handleCancelNo}
        title={"Close Delay Move Changes"}
        body={"Please confirm you want to close the program without saving your changes"}
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />
    </div>
  );
};

export default DispatchDelayMoveFooter;
