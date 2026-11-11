import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetChanges,
  setChangesCancelled,
  setShuttleCityFK,
  setViewDetail,
  setYardFK,
} from "../../../../redux/CityToYardSlice";
import CityYardService from "../../../../services/CityYardService";
import ButtonComponent from "../../../common/Button";
import ModalComponent from "../../../common/ModalComponent";
import LoadingIcon from "../../../common/LoadingIcon";

function CityYardFooter() {
  const { id, pageNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewDetail = useSelector((state) => state.cityToYardReducer.viewDetail);
  const cityToYardShuttlePK = useSelector((state) => state.cityToYardReducer.cityToYardShuttlePK);
  const city = useSelector((state) => state.cityToYardReducer.city);
  const description = useSelector((state) => state.cityToYardReducer.description);
  const towableShuttleFee = useSelector((state) => state.cityToYardReducer.towableShuttleFee);
  const towableShuttleReturn = useSelector((state) => state.cityToYardReducer.towableShuttleReturn);
  const towableDriverFee = useSelector((state) => state.cityToYardReducer.towableDriverFee);
  const motorizedShuttleFee = useSelector((state) => state.cityToYardReducer.motorizedShuttleFee);
  const motorizedShuttleReturn = useSelector((state) => state.cityToYardReducer.motorizedShuttleReturn);
  const motorizedDriverFee = useSelector((state) => state.cityToYardReducer.motorizedDriverFee);
  const miles = useSelector((state) => state.cityToYardReducer.miles);
  const yardfk = useSelector((state) => state.cityToYardReducer.yardFK);
  const shuttleCityfk = useSelector((state) => state.cityToYardReducer.shuttleCityFK);
  const isYardCityUnique = useSelector((state) => state.cityToYardReducer.isYardCityUnique);

  const [disableSave, setDisableSave] = useState(true);
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const formData = {
    cityToYardShuttlePK,
    yardfk,
    shuttleCityfk,
    motorizedShuttleFee,
    motorizedShuttleReturn,
    motorizedDriverFee,
    miles,
    towableShuttleFee,
    towableShuttleReturn,
    towableDriverFee,
  };

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate(`/city-to-yard`);
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(setChangesCancelled(true));
      toast.success("Changes Cancelled");
    } else {
      navigate(`/city-to-yard`);
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      toast.success("Changes Cancelled");
    }
  };

  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    CityYardService.deleteRecord(id)
      .then((response) => {
        navigate(`/city-to-yard`);
        toast.success("City To Yard Shuttle Deleted");
      })
      .catch((err) => {
        toast.error("Something went wrong");
        navigate(`/city-to-yard`);
      });
    setDeleteShow(false);
  };

  const saveRecord = () => {
    setSaveLoading(true);
    CityYardService.createOrUpdateRecord(formData)

      .then((res) => {
        if (id) {
          toast.success("City To Yard Shuttle Updated");
        } else {
          toast.success("City To Yard Shuttle Created");
        }
        setSaveLoading(false);

        navigate(`/city-to-yard`);
      })
      .catch((err) => {
        navigate(`/city-to-yard/add/${id}/${pageNumber}`);
        toast.error("Something went wrong");
        setSaveLoading(false);

        console.log(err);
      });
  };

  const isInvalidDecimal = (value) => {
    const trimmed = value?.toString()?.trim();

    return trimmed === "." || /^(\d+)\.$/.test(trimmed);
  };
  useEffect(() => {
    const motorizedFilled =
      Number(motorizedShuttleFee) !== 0 &&
      Number(motorizedShuttleReturn) !== 0 &&
      Number(motorizedDriverFee) !== 0;
    const towableFilled =
      Number(towableShuttleReturn) !== 0 && Number(towableDriverFee) !== 0 && Number(towableShuttleFee) !== 0;
    const allFieldsValidFormat = [
      motorizedShuttleFee,
      motorizedShuttleReturn,
      motorizedDriverFee,
      towableShuttleFee,
      towableShuttleReturn,
      towableDriverFee,
    ].every((val) => !isInvalidDecimal(val));

    if (
      miles >= 1 &&
      miles !== "" &&
      isYardCityUnique === false &&
      shuttleCityfk !== "" &&
      yardfk !== "" &&
      allFieldsValidFormat &&
      (towableShuttleFee === "" ||
        (towableShuttleReturn !== "" &&
          towableDriverFee !== "" &&
          Number(towableShuttleReturn) !== 0 &&
          Number(towableDriverFee) !== 0)) &&
      (towableShuttleReturn === "" ||
        (towableShuttleFee !== "" &&
          towableDriverFee !== "" &&
          Number(towableDriverFee) !== 0 &&
          Number(towableShuttleFee) !== 0)) &&
      (towableDriverFee === "" ||
        (towableShuttleReturn !== "" &&
          towableShuttleFee !== "" &&
          Number(towableShuttleReturn) !== 0 &&
          Number(towableShuttleFee) !== 0)) &&
      (motorizedShuttleFee === "" ||
        (motorizedShuttleReturn !== "" &&
          motorizedDriverFee !== "" &&
          Number(motorizedShuttleReturn) !== 0 &&
          Number(motorizedDriverFee) !== 0)) &&
      (motorizedShuttleReturn === "" ||
        (motorizedShuttleFee !== "" &&
          motorizedDriverFee !== "" &&
          Number(motorizedShuttleFee) !== 0 &&
          Number(motorizedDriverFee) !== 0)) &&
      (motorizedDriverFee === "" ||
        (motorizedShuttleReturn !== "" &&
          motorizedShuttleFee !== "" &&
          Number(motorizedShuttleFee) !== 0 &&
          Number(motorizedShuttleReturn) !== 0)) &&
      ((towableShuttleFee !== "" &&
        towableShuttleReturn !== "" &&
        towableDriverFee !== "" &&
        Number(towableShuttleReturn) !== 0 &&
        Number(towableDriverFee) !== 0 &&
        Number(towableShuttleFee) !== 0) ||
        (motorizedShuttleFee !== "" &&
          motorizedShuttleReturn !== "" &&
          motorizedDriverFee !== "" &&
          Number(motorizedShuttleFee) !== 0 &&
          Number(motorizedShuttleReturn) !== 0 &&
          Number(motorizedDriverFee) !== 0)) &&
      towableShuttleFee <= 99999.99 &&
      towableShuttleReturn <= 99999.99 &&
      towableDriverFee <= 99999.99 &&
      motorizedShuttleFee <= 99999.99 &&
      motorizedShuttleReturn <= 99999.99 &&
      motorizedDriverFee <= 99999.99 &&
      miles <= 32767 &&
      miles >= -32768
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [
    miles,
    towableShuttleFee,
    towableShuttleReturn,
    towableDriverFee,
    motorizedShuttleFee,
    motorizedShuttleReturn,
    motorizedDriverFee,
    isYardCityUnique,
    yardfk,
    shuttleCityfk,
  ]);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        {saveLoading && <LoadingIcon />}
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            hidden={viewDetail === true}
            disabled={disableSave}
            onClick={() => saveRecord()}
          >
            Save
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <ButtonComponent
            route={""}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            label={"Edit"}
            hidden={!id || viewDetail === false}
            onClick={() => {
              dispatch(setViewDetail(false));
            }}
          />

          <ButtonComponent
            route={""}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            hidden={!id || viewDetail === false}
            onClick={handleDelete}
            label={"Delete"}
          />

          <ModalComponent
            show={cancelShow}
            onHide={handleCancelNo}
            title={"Cancel City To Yard Shuttle  Changes"}
            body={"Please confirm you want to cancel your changes"}
            handleYES={handleCancelYes}
            handleNO={handleCancelNo}
          />

          <ModalComponent
            show={deleteShow}
            onHide={handleDeleteNo}
            title={"Delete City To Yard Shuttle "}
            body={"Please confirm you want to delete this City To Yard Shuttle"}
            handleYES={handleDeleteYes}
            handleNO={handleDeleteNo}
          />
        </div>
      </div>
    </div>
  );
}

export default CityYardFooter;
