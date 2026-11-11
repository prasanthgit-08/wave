import React, { useEffect, useState } from "react";
import ButtonComponent from "../../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import CompanyService from "../../../../services/CompanyService";
import { setCurrentTab, setViewDetail } from "../../../../redux/CompanySlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import { setCompanyData } from "../../../../redux/CompanySlice";
import { setLoading } from "../../../../redux/CompanySlice";
import { setOnCancel } from "../../../../redux/CompanySlice";

function CompanyFooter() {
  const viewDetail = useSelector((state) => state.companyReducer.viewDetail);
  const isGeneralTabValid = useSelector((state) => state.companyReducer.isGeneralTabValid);
  const isSwitchesTabValid = useSelector((state) => state.companyReducer.isSwitchesTabValid);
  const isDriverTabValid = useSelector((state) => state.companyReducer.isDriverTabValid);
  const isNextsTabValid = useSelector((state) => state.companyReducer.isNextsTabValid);
  const isBonusesTabValid = useSelector((state) => state.companyReducer.isBonusesTabValid);
  const isDefaultsTabValid = useSelector((state) => state.companyReducer.isDefaultsTabValid);
  const isUsersTabValid = useSelector((state) => state.companyReducer.isUsersTabValid);
  const saveCompanyObject = useSelector((state) => state.companyReducer.saveCompanyObject);
  const [disableSave, setDisableSave] = useState(true);
  const [cancelShow, setCancelShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      isGeneralTabValid &&
      isSwitchesTabValid &&
      isDriverTabValid &&
      isNextsTabValid &&
      isBonusesTabValid &&
      isDefaultsTabValid &&
      isUsersTabValid
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [
    isGeneralTabValid,
    isSwitchesTabValid,
    isDriverTabValid,
    isNextsTabValid,
    isBonusesTabValid,
    isDefaultsTabValid,
    isUsersTabValid,
  ]);

  const getCompanyData = () => {
    dispatch(setLoading(true));
    CompanyService.getCompanyData()
      .then((response) => {
        const data = response.data;
        dispatch(setCompanyData(data));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLoading(false));
      });
  };

  const updateCompany = (e) => {
    CompanyService.updateCompanyData(saveCompanyObject)
      .then((response) => {
        getCompanyData();
        setTimeout(() => {
          toast.success("Company Updated");
          dispatch(setCurrentTab("general"));
        }, 50);
      })
      .catch((error) => {
        toast.error("Error while updating Company");
        dispatch(setLoading(false));
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(setViewDetail(true));
        }, 75);
      });
  };
  const handleCancelShow = () => {
    setCancelShow(true);
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    setCancelShow(false);
    dispatch(setViewDetail(true));
    dispatch(setLoading(false));
    toast.success("Changes Cancelled");
    dispatch(setCurrentTab("general"));
    setTimeout(() => {
      dispatch(setOnCancel(true));
    }, 20);
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          disabled={disableSave}
          hidden={viewDetail === true}
          onClick={() => {
            dispatch(setLoading(true));
            updateCompany();
          }}
        >
          Save
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          s
          onClick={handleCancelShow}
          hidden={viewDetail}
        >
          Cancel
        </button>

        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={"Edit"}
          onClick={() => {
            dispatch(setViewDetail(false));
          }}
          hidden={!viewDetail}
        />
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Company Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
    </div>
  );
}

export default CompanyFooter;
