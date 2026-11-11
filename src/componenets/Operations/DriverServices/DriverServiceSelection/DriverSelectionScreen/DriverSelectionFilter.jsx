import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Radio, RadioGroup } from "react-radio-group";
import ButtonComponent from "../../../../common/Button";
import {
  setActive,
  setSearchCriteria,
  setFirstName,
  setLastName,
  setDriverId,
  setSortType,
  setSortValue,
  setPageNumber,
  setDeleased,
  setActiveString,
  setDriverType,
  setDispatcherInput,
  setDispatcherId,
} from "../../../../../redux/DriverServiceSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import UsersService from "../../../../../services/UsersService";
import UserLookup from "../../../../LookupScreens/User/UserLookup";

function DriverSelectionFilter() {
  const dispatch = useDispatch();

  const { searchCriteria, activeString, driverType, dispatcherId, dispatcherInput } = useSelector(
    (state) => state.driverServicesSlice
  );
  const [dispatcerList, setDispatcerList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDispatcherLookup, setShowDispatcherLookup] = useState(false);

  const handleSearchCriteria = (value) => {
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria(value));
  };

  const handleActiveValue = (value) => {
    dispatch(setPageNumber(0));
    dispatch(setActiveString(value));
    if (value === "All") {
      dispatch(setActive(null));
      dispatch(setDeleased(null));
    } else if (value === "Active") {
      dispatch(setActive(true));
      dispatch(setDeleased(null));
    } else if (value === "Inactive") {
      dispatch(setActive(false));
      dispatch(setDeleased(null));
    } else if (value === "Deleased") {
      dispatch(setActive(null));
      dispatch(setDeleased(true));
    }
  };

  const handleDriverTypeValue = (value) => {
    dispatch(setPageNumber(0));
    dispatch(setDriverType(value));
  };

  const handleDispatcherSelection = (dispatcher) => {
    dispatch(setDispatcherId(dispatcher?.UserPK));
    dispatch(setDispatcherInput(dispatcher?.Name));
  };

  const fetchDispatcherList = (string) => {
    setLoading(true);
    UsersService.getAllDispatchUser({
      searchTerm: string,
      type: "AutoComplete",
    })
      .then((response) => {
        const { data } = response;
        setDispatcerList(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="border-bottom border-dark border-2 p-t-10 p-b-10">
        <Col md={12}>
          <Row className="m-0 p-0 justify-content-between align-items-center">
            <Col md={10} sm={10} lg={10} xs={10} className="p-l-0 d-flex align-items-center flex-nowrap">
              <div className="d-flex align-items-center flex-nowrap m-l-50">
                <div className="w-100px">
                  <Form.Label className="customColFormLabel">Dispatcher</Form.Label>
                </div>
                <div className="d-flex m-l-10 w-275px">
                  <AutoCompleteDropdown
                    arrayList={dispatcerList}
                    searchString={dispatcherInput}
                    renderItemId={(item) => item?.UserPK}
                    renderItemField={(item) => item?.Name}
                    loading={loading}
                    handleSearchString={(string) => dispatch(setDispatcherInput(string))}
                    fetchDataBySearchString={fetchDispatcherList}
                    onSelect={handleDispatcherSelection}
                    selectedId={dispatcherId}
                    clearInputCallback={() => dispatch(setDispatcherId(""))}
                    className={dispatcherId || !dispatcherInput ? "" : "borderRed"}
                  />
                  <LookupButton onClick={() => setShowDispatcherLookup(true)} />
                </div>
              </div>
              <div className="d-flex align-items-center flex-nowrap m-l-70">
                <div className="d-flex align-items-center w-125px">
                  <RadioGroup
                    name="searchCriteria"
                    selectedValue={searchCriteria}
                    onChange={handleSearchCriteria}
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

                <div className="d-flex flex-column w-125px m-l-30">
                  <RadioGroup name="status" selectedValue={activeString} onChange={handleActiveValue}>
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="All" />
                      <label className="f-w-600 m-l-5">All</label>
                    </div>

                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Active" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.active")}</label>
                    </div>

                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Inactive" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.inactive")}</label>
                    </div>

                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Deleased" />
                      <label className="f-w-600 m-l-5">Deleased</label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="d-flex flex-column w-125px m-l-30">
                  <RadioGroup name="driverType" selectedValue={driverType} onChange={handleDriverTypeValue}>
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="All" />
                      <label className="f-w-600 m-l-5">All</label>
                    </div>

                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Towaway" />
                      <label className="f-w-600 m-l-5">Towaway</label>
                    </div>

                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Motorized" />
                      <label className="f-w-600 m-l-5">Driveaway</label>
                    </div>

                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Flatbed" />
                      <label className="f-w-600 m-l-5">Flatbed</label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </Col>

            <Col md={2} sm={2} lg={2} xs={2} className="p-l-0 d-flex justify-content-end align-items-center">
              <div className="d-flex  ">
                <span className="m-l-10">
                  <ButtonComponent
                    onClick={() => {
                      dispatch(setSearchCriteria("Beginning"));
                      dispatch(setActiveString("All"));
                      dispatch(setActive(null));
                      dispatch(setDeleased(null));
                      dispatch(setFirstName(""));
                      dispatch(setLastName(""));
                      dispatch(setDriverId(null));
                      dispatch(setSortType(null));
                      dispatch(setSortValue(null));
                      dispatch(setPageNumber(0));
                      window.location.href = "/";
                    }}
                    route={""}
                    className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                    label={"Close"}
                  />
                </span>
              </div>
            </Col>
          </Row>
        </Col>
      </div>

      <UserLookup
        show={showDispatcherLookup}
        onHide={() => setShowDispatcherLookup(false)}
        renderItemId={(user) => user.userPK}
        handleLookupSelection={(user) => {
          dispatch(setDispatcherId(user?.userPK));
          dispatch(setDispatcherInput(user?.name?.trim()));
          setShowDispatcherLookup(false);
        }}
        MaintenanceProgram
      />
    </div>
  );
}

export default DriverSelectionFilter;
