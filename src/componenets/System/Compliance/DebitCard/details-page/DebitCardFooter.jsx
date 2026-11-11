import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DebitCardService from "../../../../../services/DebitCardService";
import toast from "react-hot-toast";
import styles from "../../../../../styles/QuarterScreen.module.css";
import {
  resetChanges,
  setActive,
  setOnCancel,
  setProviderValid,
  setViewDetail,
  toggleChangesCancelled,
  setObjectkeyValid,
  setEditFormData,
} from "../../../../../redux/DebitCardSlice";
import { Colors } from "../../../../../styles/values/colors";
import ButtonComponent from "../../../../common/Button";
import ModalComponent from "../../../../common/ModalComponent";
import { t } from "i18next";
import LoadingIcon from "../../../../common/LoadingIcon";

const DebitCardFooter = () => {
  const provider = useSelector((state) => state.debitCardReducer.provider);
  const viewDetail = useSelector((state) => state.debitCardReducer.viewDetail);
  const providerValid = useSelector((state) => state.debitCardReducer.providerValid);
  const address1 = useSelector((state) => state.debitCardReducer.address1);
  const postalCodeOnChange = useSelector((state) => state.debitCardReducer.postalCodeOnChange);
  const debitData = useSelector((state) => state.debitCardReducer.debitData);
  const [disableSave, setDisableSave] = useState(true);
  const objectKey = useSelector((state) => state.debitCardReducer.objectKey);
  const objectkeyValid = useSelector((state) => state.debitCardReducer.objectkeyValid);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cancelShow, setCancelShow] = useState(false);
  const [activeShow, setActiveShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const editFormData = useSelector((state) => state.debitCardReducer.editFormData);

  const postalCodePK = useSelector((state) => state.debitCardReducer.postalCodePK);
  const active = useSelector((state) => state.debitCardReducer.active);

  const handleActiveShow = () => {
    setActiveShow(true);
  };

  const handleCheckUniqueFields = () => {
    setLoading(true);

    DebitCardService.checkProvider(debitData?.provider, id)
      .then((providerRes) => {
        dispatch(setProviderValid(providerRes.data));
        if (providerRes.data === true) {
          setLoading(false);
          return Promise.reject("provider-duplicate");
        }
        return DebitCardService.checkObjectkey(objectKey, id);
      })

      .then((objectKeyRes) => {
        dispatch(setObjectkeyValid(objectKeyRes.data));
        if (objectKeyRes.data === true) {
          setLoading(false);
          return;
        } else {
          saveDebitCard();
        }
      })

      .catch((err) => {
        if (err !== "provider-duplicate") {
          console.log(err);
        }
        setLoading(false);
      });
  };

  const saveDebitCard = () => {
    setLoading(true);
    DebitCardService.saveOrEditDebitCard(debitData)
      .then((response) => {
        navigate("/debit-card-listing");
        if (id) {
          toast.success("Debit Card Updated");
        } else {
          toast.success("Debit Card Created");
        }
        dispatch(resetChanges());
      })
      .catch((error) => {
        let msg = "";
        if (error.response) {
          msg = error.response.data.errorMsg || error.response.data;

          if (
            msg &&
            typeof msg === "string" &&
            (msg.includes("Violation of UNIQUE KEY constraint") || msg.includes("UC_DebitCards_ObjectKey"))
          ) {
            dispatch(setObjectkeyValid(true));
          }
        }
        if (!msg) {
          msg = "Something went wrong !! Failed to save the record !!";
        }
        toast.error(msg);
        setLoading(false);
      });
  };

  useEffect(() => {
    const providerFilled = provider && provider?.trim() !== "";
    const addressFilled = address1 && address1?.trim() !== "";
    const objectKeyFilled = objectKey && objectKey?.trim() !== "";

    const providerUnique = providerValid === false;
    const objectKeyUnique = objectkeyValid === false;

    if (
      providerFilled &&
      addressFilled &&
      !postalCodeOnChange &&
      postalCodePK &&
      objectKeyFilled &&
      providerUnique &&
      objectKeyUnique
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [provider, providerValid, address1, postalCodeOnChange, postalCodePK, objectKey, objectkeyValid]);

  const handleCancelShow = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));

      navigate("/debit-card-listing");
      toast.success("Changes Cancelled");
      dispatch(resetChanges());
    }
  };

  const handleCancelNo = () => setCancelShow(false);

  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setActive(true));
      dispatch(setViewDetail(true));
      toast.success("Changes Cancelled");
      dispatch(toggleChangesCancelled());
      dispatch(setEditFormData(null));
      setTimeout(() => {
        dispatch(setOnCancel(true));
      }, 50);
    } else {
      navigate("/debit-card-listing");
      dispatch(setViewDetail(false));
      dispatch(setOnCancel(true));
      dispatch(setEditFormData(null));
      toast.success("Changes Cancelled");
    }
    dispatch(setEditFormData(null));
    dispatch(resetChanges());
  };

  const handleActiveSave = (e) => {
    setActiveShow(false);
    if (active === true) {
      deactivateDebitCardData();
    } else {
      activateDebitCardData();
    }
  };

  const activateDebitCardData = () => {
    setLoading(true);
    DebitCardService.activateDebitCard(id)
      .then((res) => {
        setActiveShow(false);
        dispatch(setActive(true));
        toast.success("Debit Card Activated");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => setLoading(false));
  };

  const deactivateDebitCardData = () => {
    setLoading(true);
    DebitCardService.deactivateDebitCard(id)
      .then((response) => {
        setActiveShow(false);
        dispatch(setActive(false));
        toast.success("Debit Card Deactivated");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    if (!loading) {
      setIsReady(true);
    }
  }, [loading]);

  const getActiveButtonStyle = () => {
    if (loading) return {};
    if (active === false) return { backgroundColor: Colors.red };
    return {};
  };

  useEffect(() => {
    setLoading(false);
  }, [id]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        {viewDetail ? (
          <>
            <button
              className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
              type="button"
              onClick={handleActiveShow}
              style={getActiveButtonStyle()}
            >
              Active
            </button>
            <ButtonComponent
              route={""}
              className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
              label={t("edit.button")}
              onClick={() => dispatch(setViewDetail(false))}
            />
            <button
              className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
              type="button"
              onClick={handleCancelShow}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
              disabled={disableSave || loading}
              onClick={handleCheckUniqueFields}
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
          </>
        )}
      </div>

      <ModalComponent
        show={cancelShow}
        onHide={handleCancelNo}
        title={"Cancel Debit Card Changes"}
        body={"Please confirm you want to cancel your changes"}
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />
      <ModalComponent
        show={activeShow}
        onHide={() => setActiveShow(false)}
        title={active ? "Deactivate Debit Card" : "Activate Debit Card"}
        body={
          active
            ? "Please confirm you want to Deactivate this Debit Card"
            : "Please confirm you want to Activate this Debit Card"
        }
        handleYES={handleActiveSave}
        handleNO={() => setActiveShow(false)}
      />
    </div>
  );
};

export default DebitCardFooter;
