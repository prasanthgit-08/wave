import { t } from "i18next";
import ButtonComponent from "../../../../common/Button";
import { RadioGroup, Radio } from "react-radio-group";
import { Row, Col } from "react-bootstrap";
import InputField from "../../../../common/InputField";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  resetUserMaintenance,
  setAdvanceSortedValue,
  setAdvanceSortingCriteria,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchedUser,
  setSearchTerms,
  setSelectedSearchCriteria,
  setSelectedStatus,
  setSelectedUserStatus,
  setShowAdvanceSearch,
  setShowAdvanceSort,
} from "../../../../../redux/UserMaintenanceSearchFilterSlice";
import { useNavigate } from "react-router-dom";

export const UserMaintenanceSearchFilter = ({ setFirstField, setSecondField }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const selectedUserStatus = useSelector((state) => state.userMaintenanceReducer.selectedUserStatus);
  const selectedStatus = useSelector((state) => state.userMaintenanceReducer.selectedStatus);
  const selectedSearchCriteria = useSelector((state) => state.userMaintenanceReducer.selectedSearchCriteria);
  const showAdvanceSearch = useSelector((state) => state.userMaintenanceReducer.showAdvanceSearch);
  const showAdvanceSort = useSelector((state) => state.userMaintenanceReducer.showAdvanceSort);
  const searchTerms = useSelector((state) => state.userMaintenanceReducer.searchTerms);

  const onClose = async () => {
    window.location.reload();
  };

  const handleFirstRadioGroupOnChange = (value) => {
    dispatch(setSelectedSearchCriteria(value));
    dispatch(setPageNumber(0));
  };

  const handleSecondRadioGroupOnChange = (value) => {
    dispatch(setSelectedStatus(value));
    dispatch(setPageNumber(0));
  };

  const handleThirdRadioGroupOnChange = (value) => {
    dispatch(setSelectedUserStatus(value));
    dispatch(setPageNumber(0));
  };

  const globalSearchHandleChange = (event) => {
    dispatch(setSearchTerms(event.target.value));
    setSearchTerm(event.target.value);
    dispatch(setPageNumber(0));
  };

  const onChangeShowAdvanceSearch = (value) => {
    if (value === true) {
      setSearchTerm("");
      dispatch(setSearchTerms(""));
    } else {
      dispatch(setSearchedUser(null));
    }
    dispatch(setShowAdvanceSearch(value));
  };

  const handleClose = (value) => {
    navigate(`/`);
    dispatch(resetUserMaintenance());
  };

  const onChangeShowAdvanceSort = (value) => {
    if (value === true) {
      // show advanced sort
      dispatch(setNormalSortValue(null));
      dispatch(setNormalSortFlag(false));
    } else {
      // hide advanced sort
      dispatch(setAdvanceSortingCriteria(null));
      dispatch(setAdvanceSortedValue(null));
      setFirstField(null);
      setSecondField(null);
    }

    dispatch(setShowAdvanceSort(value));
  };

  useEffect(() => {
    if (searchTerm === "" && searchTerms !== "") {
      setSearchTerm(searchTerms);
    }
  }, []);

  const handleNewOnClick = () => {
    dispatch(resetUserMaintenance());
  };

  return (
    <div>
      <Row className="border border-dark border-2 p-t-10 p-b-10">
        <Col md={12}>
          <Row className="m-0 p-0">
            <Col md={8} sm={8} lg={7} xs={8} className="p-l-0">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center search-box">
                  <span className="p-r-20">
                    <ButtonComponent
                      route={"/user-maintenance/add"}
                      className="btn btn-secondary btn-sm font-12 btn-small-width"
                      label={t("dealers.list.page.new.button")}
                      onClick={() => {
                        handleNewOnClick();
                      }}
                    />
                  </span>

                  <span className="p-l-20">
                    <label className="f-w-600 m-r-15">{t("dealers.list.page.search.button")}</label>
                    <InputField
                      type="search"
                      name="searchTerm"
                      value={searchTerm}
                      autoComplete="off"
                      aria-autocomplete="list"
                      placeholder={t("dealers.list.page.global.search")}
                      className="search-input"

                      onChange={(e) => {
                        globalSearchHandleChange(e);
                      }}
                      disabled={showAdvanceSearch || (showAdvanceSort && disabled)}

                      autocomplete="autocomplete_off_randString"
                    />
                  </span>
                </div>

                <div className="d-flex align-items-center">
                  <RadioGroup
                    name="searchCriteria"
                    selectedValue={selectedSearchCriteria}
                    onChange={handleFirstRadioGroupOnChange}
                  >
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Beginning" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.begining")}</label>
                    </div>
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Contains" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.contains")}</label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="d-flex flex-column">
                  <RadioGroup
                    name="status"
                    selectedValue={selectedStatus}
                    onChange={handleSecondRadioGroupOnChange}
                  >
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="All" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.all")}</label>
                    </div>

                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Active" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.active")}</label>
                    </div>

                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Inactive" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.inactive")}</label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="d-flex flex-column">
                  <RadioGroup
                    name="userStatus"
                    selectedValue={selectedUserStatus}
                    onChange={handleThirdRadioGroupOnChange}
                  >
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="All" />
                      <label className="f-w-600 m-l-5">All</label>
                    </div>
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Actual" />
                      <label className="f-w-600 m-l-5">Actual</label>
                    </div>
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Pseudo" />
                      <label className="f-w-600 m-l-5">Pseudo</label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </Col>

            <Col md={4} sm={4} lg={4} xs={4} className="p-l-0">
              <div className="d-flex justify-content-end advanced-search-box">
                <div className="d-flex flex-column">
                  <span className="m-b-5">
                    <ButtonComponent
                      route={""}
                      className="btn btn-secondary font-12 btn-sm btn-medium-with"
                      label={t("dealers.list.page.advanced.search.button")}
                      onClick={() => {
                        onChangeShowAdvanceSearch(!showAdvanceSearch);
                      }}
                    />
                  </span>

                  <span className="m-t-5">
                    <ButtonComponent
                      route={""}
                      className="btn btn-secondary font-12 btn-sm btn-medium-with"
                      label={t("dealers.list.page.advanced.sort.button")}
                      onClick={() => {
                        onChangeShowAdvanceSort(!showAdvanceSort);
                      }}
                    />
                  </span>
                </div>

                <span className="m-l-10">
                  <ButtonComponent
                    route={"/"}
                    className="btn btn-secondary btn-sm font-12 btn-small-width close-button"
                    label={t("dealers.list.page.advanced.close.button")}
                    onClick={() => {
                      handleClose();
                      onClose();
                    }}
                  />
                </span>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default UserMaintenanceSearchFilter;
