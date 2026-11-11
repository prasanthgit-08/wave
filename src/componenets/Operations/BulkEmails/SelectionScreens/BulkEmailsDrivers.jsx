import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { Radio, RadioGroup } from "react-radio-group";
import DateInputField from "../../../common/DateInputField";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../../../redux/Operations/BulkEmailSlice";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import DriverService from "../../../../services/DriverService";
import UsersService from "../../../../services/UsersService";
import UserLookup from "../../../LookupScreens/User/UserLookup";

const BulkEmailsDrivers = () => {
  const dispatch = useDispatch();

  const division = useSelector((state) => state.bulkEmails.division);
  const status = useSelector((state) => state.bulkEmails.status);
  const nextPage = useSelector((state) => state.bulkEmails.nextPage);
  const lastDispatch = useSelector((state) => state.bulkEmails.lastDispatch);
  const deleaseDate = useSelector((state) => state.bulkEmails.deleaseDate);
  const birthDay = useSelector((state) => state.bulkEmails.birthDay);
  const lastDispatchValid = useSelector((state) => state.bulkEmails.lastDispatchValid);
  const deleaseDateValid = useSelector((state) => state.bulkEmails.deleaseDateValid);
  const birthDayValid = useSelector((state) => state.bulkEmails.birthDayValid);
  const process = useSelector((state) => state.bulkEmails.process);
  const dispatcherFK = useSelector((state) => state.bulkEmails.dispatcherFK);
  const dispatcherInput = useSelector((state) => state.bulkEmails.dispatcherInput);

  const [showLookup, setShowLookup] = useState(false);
  const [dispatcherData, setDispatcherData] = useState([]);
  const [userLoading, setUserLoading] = useState(false);

  const fetchUsers = (searchString) => {
    setUserLoading(true);

    const serviceCall = DriverService.getAllUserDataForAutocompletewithDispatcherPermission(searchString);

    serviceCall
      .then((response) => {
        const data = response.data.content || [];

        const userList = data.map((user) => ({
          ...user,
          name: user.name?.trim(),
        }));

        setDispatcherData(userList);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        setUserLoading(false);
      });
  };

  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const handlerDispatcherLookupSelection = (item) => {
    updateData("dispatcherFK", item.userPK);
    updateData("dispatcherInput", item.name?.trim());
    setShowLookup(false);
  };

  const handleDispatcherLookup = () => {
    setShowLookup(true);
  };

  const hasValidDate =
    (lastDispatchValid && lastDispatch) || (deleaseDateValid && deleaseDate) || (birthDayValid && birthDay);

  // red when the field holds invalid text, or when no valid date is entered yet; green when filled and valid
  const getDateBorderClass = (date, isValid) => {
    if (process !== "New") return "";
    if (!isValid || !hasValidDate) return "borderRed";
    return date ? "borderGreen" : "";
  };

  return (
    <div>
      <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
        <Col sm={2} md={2} xs={2} className="p-0">
          <Form.Label className="col-form-label dealer-label p-l-15">Division</Form.Label>
        </Col>
        <Col xs={1} md={1} sm={1} className="p-0">
          <CustomRadioGroup
            name="Division"
            horizontal
            options={["All", "Motorized", "Towaway", "Single", "Flatbed"]}
            selectedOption={division}
            onChange={(value) => {
              updateData("division", value);
            }}
            disabled={nextPage || process !== "New"}
          />
        </Col>
      </Form.Group>

      <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
        <Col sm={2} md={2} xs={2} className="p-0">
          <Form.Label className="col-form-label dealer-label p-l-15">Status</Form.Label>
        </Col>
        <Col xs={1} md={1} sm={1} className="p-0">
          <CustomRadioGroup
            name="status"
            horizontal
            options={["Active", "Inactive", "Deleased"]}
            selectedOption={status}
            onChange={(value) => {
              updateData("status", value);
            }}
            disabled={nextPage || process !== "New"}
          />
        </Col>
      </Form.Group>
      <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
        <Col sm={2} md={2} xs={2} className="p-0">
          <Form.Label className="col-form-label dealer-label p-l-15">Dispatcher</Form.Label>
        </Col>
        <Col xs={7} md={7} sm={7} className={`p-0 d-flex`}>
          <AutoCompleteDropdown
            arrayList={dispatcherData}
            searchString={dispatcherInput}
            renderItemId={(item) => item.userPK}
            renderItemField={(item) => item.name}
            handleSearchString={(string) => updateData("dispatcherInput", string)}
            fetchDataBySearchString={fetchUsers}
            onSelect={handlerDispatcherLookupSelection}
            clearInputCallback={() => {
              updateData("dispatcherFK", null);
            }}
            disabled={nextPage || process !== "New"}
            selectedId={dispatcherFK}
            className={`customFormControl ${!dispatcherFK && dispatcherInput ? "borderRed" : ""}
               `}
            loading={userLoading}
          />
          <LookupButton onClick={handleDispatcherLookup} disabled={nextPage || process !== "New"} />
        </Col>
      </Form.Group>

      <Form.Group className="form-group invisible m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
        <Col sm={2} md={2} xs={2} className="p-0">
          <Form.Label className="col-form-label dealer-label p-l-15">Status</Form.Label>
        </Col>
        <Col xs={1} md={1} sm={1} className="p-0"></Col>
      </Form.Group>

      {nextPage && (status === "Deleased" || status === "Inactive") && (
        <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
          <Col sm={2} md={2} xs={2} className="p-0">
            <Form.Label className="col-form-label dealer-label p-l-15">Last Dispatch</Form.Label>
          </Col>
          <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "100px" }}>
            <DateInputField
              date={lastDispatch}
              disabled={process !== "New"}
              setDate={(val) => {
                updateData("lastDispatch", val);
              }}
              setIsDateValid={(val) => {
                updateData("lastDispatchValid", val);
              }}
              className={`customFormControl ${getDateBorderClass(lastDispatch, lastDispatchValid)}`}
            />
          </Col>
        </Form.Group>
      )}
      {nextPage && status === "Deleased" && (
        <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
          <Col sm={2} md={2} xs={2} className="p-0">
            <Form.Label className="col-form-label dealer-label p-l-15">Delease Date</Form.Label>
          </Col>
          <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "100px" }}>
            <DateInputField
              date={deleaseDate}
              setDate={(val) => {
                updateData("deleaseDate", val);
              }}
              setIsDateValid={(val) => {
                updateData("deleaseDateValid", val);
              }}
              className={`customFormControl ${getDateBorderClass(deleaseDate, deleaseDateValid)}`}
              disabled={process !== "New"}
            />
          </Col>
        </Form.Group>
      )}
      {nextPage && status === "Deleased" && (
        <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
          <Col sm={2} md={2} xs={2} className="p-0">
            <Form.Label className="col-form-label dealer-label p-l-15">Birthday</Form.Label>
          </Col>
          <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "100px" }}>
            <DateInputField
              date={birthDay}
              min={""}
              setDate={(val) => {
                updateData("birthDay", val);
              }}
              setIsDateValid={(val) => {
                updateData("birthDayValid", val);
              }}
              className={`customFormControl ${getDateBorderClass(birthDay, birthDayValid)}`}
              disabled={process !== "New"}
              format="MM/DD/YYYY"
            />
          </Col>
        </Form.Group>
      )}

      <UserLookup
        show={showLookup}
        onHide={() => setShowLookup(false)}
        renderItemId={(user) => user.userPK}
        handleLookupSelection={handlerDispatcherLookupSelection}
        DispatchUserFilter
      />
    </div>
  );
};

export default BulkEmailsDrivers;
