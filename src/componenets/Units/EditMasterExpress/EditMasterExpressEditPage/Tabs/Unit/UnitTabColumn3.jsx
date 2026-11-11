import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import DynamicTextFields from "../../../../../common/AutoWrapTextFields/DynamicTextFields";
import {
  setIsUnitTabTabColumn3Valid,
  setEditedUnitDataToSaveForUnitTab,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

const UnitTabColumn3 = ({ styles }) => {
  const dispatch = useDispatch();

  const [miscellaneousText1, setMiscellaneousText1] = useState("");
  const [miscellaneousText2, setMiscellaneousText2] = useState("");
  const [miscellaneousText3, setMiscellaneousText3] = useState("");
  const [miscellaneousText4, setMiscellaneousText4] = useState("");
  const [miscellaneousText5, setMiscellaneousText5] = useState("");
  const [miscellaneousText6, setMiscellaneousText6] = useState("");
  const [miscellaneousText7, setMiscellaneousText7] = useState("");
  const [bolTextMiscellaneousTextInputValues, setBolTextMiscellaneousTextInputValues] = useState(
    Array(7).fill("")
  );
  const [bank, setBank] = useState("");
  const [client, setClient] = useState("");
  const [plantOrderNumber, setPlantOrderNumber] = useState("");
  const [plantCode, setPlantCode] = useState("");

  //States From Redux
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const isUnitDataLoading = useSelector((state) => state.editMasterExpress.isUnitDataLoading);

  //Populating selected driver details
  useEffect(() => {
    if (selectedUnitData != null) {
      setMiscellaneousText1(
        selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousBOLText1?.trim() || ""
      );
      setMiscellaneousText2(
        selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousBOLText2?.trim() || ""
      );
      setMiscellaneousText3(
        selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousBOLText3?.trim() || ""
      );
      setMiscellaneousText4(
        selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousBOLText4?.trim() || ""
      );
      setMiscellaneousText5(
        selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousBOLText5?.trim() || ""
      );
      setMiscellaneousText6(
        selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousBOLText6?.trim() || ""
      );
      setMiscellaneousText7(
        selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousBOLText7?.trim() || ""
      );
      setBank(selectedUnitData?.editMasterExpressUnitTabDTO?.bank?.trim() || "");
      setClient(selectedUnitData?.editMasterExpressUnitTabDTO?.client?.trim() || "");
      setPlantOrderNumber(selectedUnitData?.editMasterExpressUnitTabDTO?.plantOrderNumber?.trim() || "");
      setPlantCode(selectedUnitData?.editMasterExpressUnitTabDTO?.plantCode?.trim() || "");
    }
    // eslint-disable-next-line
  }, [selectedUnitData, viewDetail]);

  useEffect(() => {
    const backendValues = [
      miscellaneousText1,
      miscellaneousText2,
      miscellaneousText3,
      miscellaneousText4,
      miscellaneousText5,
      miscellaneousText6,
      miscellaneousText7,
    ];
    setBolTextMiscellaneousTextInputValues(backendValues);
    // eslint-disable-next-line
  }, [
    miscellaneousText1,
    miscellaneousText2,
    miscellaneousText3,
    miscellaneousText4,
    miscellaneousText5,
    miscellaneousText6,
    miscellaneousText7,
    selectedUnitData,
    viewDetail,
  ]);

  /*** Tab Validation ***/
  useEffect(() => {
    if (
      (!selectedUnitData?.editMasterExpressUnitTabDTO?.requireBankClient ||
        (selectedUnitData?.editMasterExpressUnitTabDTO?.requireBankClient && bank !== "")) &&
      (!selectedUnitData?.editMasterExpressUnitTabDTO?.requireBankClient ||
        (selectedUnitData?.editMasterExpressUnitTabDTO?.requireBankClient && client !== ""))
    ) {
      dispatch(setIsUnitTabTabColumn3Valid(true));
    } else {
      dispatch(setIsUnitTabTabColumn3Valid(false));
    }
    // eslint-disable-next-line
  }, [bank, client, selectedUnitData]);

  /*** Implementation Of Save - Setting edited unit data for save ***/
  const settingEditedUnitDataToSave = () => {
    dispatch(
      setEditedUnitDataToSaveForUnitTab({
        miscellaneousBOLText: bolTextMiscellaneousTextInputValues,
        bank: bank,
        client: client,
        plantOrderNumber: plantOrderNumber,
        plantCode: plantCode,
      })
    );
  };

  useEffect(() => {
    settingEditedUnitDataToSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bolTextMiscellaneousTextInputValues, bank, client, plantOrderNumber, plantCode]);

  return (
    <Col xs={4}>
      {/* ********************* */}
      {/* miscellaneous BOL Text */}
      <Form.Group className="mt-3 align-items row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label htmlFor="name" className={`customColFormLabel`}>
            Miscellaneous BOL Text
          </Form.Label>
        </Col>

        <Col xs={8} md={8} sm={8} className="p-0 w-290">
          <DynamicTextFields
            numFields={7}
            maxCharLimit={30}
            inputValues={bolTextMiscellaneousTextInputValues}
            setInputValues={setBolTextMiscellaneousTextInputValues}
            disabled={viewDetail}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      <Form.Group className="mt-2 align-items-center invisible row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label htmlFor="name" className={`customColFormLabel`}></Form.Label>
        </Col>

        <Col xs={8} md={8} sm={8} className="p-0">
          <input className={`customFormControl`} type="text" autoComplete="off" aria-autocomplete="list" />
        </Col>
      </Form.Group>
      {/* Bank */}
      <Form.Group
        className={`mt-2 align-items-center  row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressUnitTabDTO?.requireBankClient ? "" : "hide-elements"
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Bank</Form.Label>
        </Col>

        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl 
            ${
              isUnitDataLoading || viewDetail
                ? ""
                : !selectedUnitData?.editMasterExpressUnitTabDTO?.requireBankClient
                  ? ""
                  : bank || bank.length >= 1
                    ? "borderGreen"
                    : "borderRed"
            }`}
            name="bank"
            type="text"
            autoComplete="off"
            aria-autocomplete="list"
            disabled={viewDetail}
            value={bank}
            maxLength={30}
            onInput={(e) => {
              let value = e.target.value;
              if (value !== "") {
                if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                  value = value.substring(1);
                }
              }
              setBank(value);
            }}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}
      {/* Client */}
      <Form.Group
        className={`mt-2 align-items-center  row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressUnitTabDTO?.requireBankClient ? "" : "hide-elements"
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Client</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl 
             ${
               isUnitDataLoading || viewDetail
                 ? ""
                 : !selectedUnitData?.editMasterExpressUnitTabDTO?.requireBankClient
                   ? ""
                   : client || client.length >= 1
                     ? "borderGreen"
                     : "borderRed"
             }`}
            type="text"
            name={client}
            autoComplete="off"
            aria-autocomplete="list"
            disabled={viewDetail}
            value={client}
            maxLength={30}
            onInput={(e) => {
              let value = e.target.value;
              if (value !== "") {
                if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                  value = value.substring(1);
                }
              }
              setClient(value);
            }}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}
      {/* Plant Order Number */}

      <Form.Group
        className={`mt-2 align-items-center  row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressUnitTabDTO?.pickupCustomerPlantPK !== null &&
          selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryDealerPK !== null
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Plant Order Number</Form.Label>
        </Col>

        <Col xs={4} md={4} sm={4} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            name={plantOrderNumber}
            autoComplete="off"
            aria-autocomplete="list"
            disabled={viewDetail}
            value={plantOrderNumber}
            maxLength={15}
            onInput={(e) => {
              let value = e.target.value;
              if (value !== "") {
                if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                  value = value.substring(1);
                }
              }
              setPlantOrderNumber(value);
            }}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}
      {/* Plant Code */}
      <Form.Group
        className={`mt-2 align-items-center  row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressUnitTabDTO?.pickupCustomerPlantPK !== null ? "" : "hide-elements"
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Plant Code</Form.Label>
        </Col>

        <Col xs={3} md={3} sm={3} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            autoComplete="off"
            aria-autocomplete="list"
            disabled={viewDetail}
            name={plantCode}
            maxLength={10}
            value={plantCode}
            onInput={(e) => {
              let value = e.target.value;
              if (value !== "") {
                if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                  value = value.substring(1);
                }
              }
              setPlantCode(value);
            }}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* BOL Number */}
      <Form.Group className="mt-2 align-items-center  row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>BOL Number</Form.Label>
        </Col>

        <Col xs={3} md={3} sm={3} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            disabled
            value={selectedUnitData?.editMasterExpressUnitTabDTO?.bolNumber || ""}
          />
        </Col>
      </Form.Group>
      <Form.Group className="mt-2 align-items-center invisible row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label htmlFor="name" className={`customColFormLabel`}></Form.Label>
        </Col>

        <Col xs={3} md={3} sm={3} className="p-0">
          <input className={`customFormControl`} type="text" autoComplete="off" aria-autocomplete="list" />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Commission */}
      <Form.Group className="mt-2 align-items-center  row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Commission</Form.Label>
        </Col>

        <Col xs={3} md={3} sm={3} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            disabled
            value={selectedUnitData?.editMasterExpressUnitTabDTO?.commission || 0.0}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Commission Driver */}
      <Form.Group className="mt-2 align-items-center  row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Commission Driver</Form.Label>
        </Col>

        <Col xs={8} md={8} sm={8} className="p-0 w-290">
          <input
            className={`customFormControl`}
            type="text"
            disabled
            value={selectedUnitData?.editMasterExpressUnitTabDTO?.commissionDriverName || ""}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Transport Company */}
      <Form.Group className="mt-2 align-items-center  row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Transport Company</Form.Label>
        </Col>

        <Col xs={8} md={8} sm={8} className="p-0 w-290">
          <input
            className={`customFormControl`}
            type="text"
            disabled
            value={selectedUnitData?.editMasterExpressUnitTabDTO?.transportCompanyName}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
    </Col>
  );
};

export default UnitTabColumn3;
