import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../../../../../componenets/common/AutoCompleteDropdown";
import LookupButton from "../../../../../../../../componenets/common/LookupButton";
import POESelctionFooter from "./POESelctionFooter";
import {
  setDisablePOEContinue,
  setSelectedDispatchPK,
  setSelectedPOE,
} from "../../../../../../../../redux/DispatchesSlice";
import DispatchesService from "../../../../../../../../services/DispatchesService";
import { useDispatch, useSelector } from "react-redux";
import PortOfEntryLookup from "../../../../../../../../componenets/LookupScreens/PortOfEntry/PortOfEntryLookup";
import PortsOfEntryService from "../../../../../../../../services/PortsOfEntryService";

function POESelectionTwo() {
  const dispatch = useDispatch();

  const [overridePoeFK, setOverridePoeFK] = useState("");
  const [overridePoe, setOverridePoe] = useState("");
  const [overridePoeList, setOverridePoeList] = useState([]);

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);

  const [pOE1, setPOE1] = useState("");
  const [pOE2, setPOE2] = useState("");
  const [pOE4, setPOE4] = useState("");
  const [pOE5, setPOE5] = useState("");

  const [pOE1Id, setPOE1Id] = useState(false);
  const [pOE2Id, setPOE2Id] = useState(false);
  const [pOE4Id, setPOE4Id] = useState(false);
  const [pOE5Id, setPOE5Id] = useState(false);

  const [showLookup, setShowLookup] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedDispatchPK = useSelector((state) => state.dispatchesReducer.selectedDispatchPK);

  const handleLookupSelection = (poe) => {
    setOverridePoeFK(poe.poePK);
    setOverridePoe(poe.usCity?.trim());
    setShowLookup(false);
    if (check3) {
      dispatch(setSelectedPOE(poe.poePK));
    }
  };

  const getPOEForListing = (string) => {
    setLoading(true);
    PortsOfEntryService.getAllPortsOfEntry("Beginning", string, 0, null, false, 100)
      .then(({ data }) => {
        setOverridePoeList(data.content);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onchecking = (docheck) => {
    setCheck1(false);
    setCheck2(false);
    setCheck3(false);
    setCheck4(false);
    setCheck5(false);
    docheck(true);
  };

  const fetchData = () => {
    // Redux is cleared on page refresh, so fall back to the dispatch PK kept in localStorage
    const dispatchPK = selectedDispatchPK || Number(localStorage.getItem("poeSelectedDispatchPK")) || null;
    if (!dispatchPK) return;
    if (selectedDispatchPK) {
      localStorage.setItem("poeSelectedDispatchPK", selectedDispatchPK);
    } else {
      dispatch(setSelectedDispatchPK(dispatchPK));
    }
    DispatchesService.fetchPoeOverrideData(dispatchPK)
      .then(({ data }) => {
        setPOE1(data.poeString1 ? data.poeString1 : "");
        setPOE2(data.poeString2 ? data.poeString2 : "");
        setOverridePoe(data.poeString3 ? data.poeString3 : "");
        setPOE4(data.poeString4 ? data.poeString4 : "");
        setPOE5(data.poeString5 ? data.poeString5 : "");
        setPOE1Id(data.poeFK1 ? data.poeFK1 : "");
        setPOE2Id(data.poeFK2 ? data.poeFK2 : "");
        setOverridePoeFK(data.poeFK3 ? data.poeFK3 : "");
        setPOE4Id(data.poeFK4 ? data.poeFK4 : "");
        setPOE5Id(data.poeFK5 ? data.poeFK5 : "");
        data.poeFK3 === data.defaultPOE && onchecking(setCheck3);
        dispatch(setSelectedPOE(data.poeFK3));
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (overridePoe && !overridePoeFK) {
      dispatch(setDisablePOEContinue(true));
    } else {
      dispatch(setDisablePOEContinue(false));
    }
  }, [overridePoe, overridePoeFK]);

  return (
    <div className="customContainer " style={{ margin: "1px" }}>
      <div className=" threeFourthScreenWidth">
        <div className=" border border-dark border-2 p-2 " style={{ height: "760px" }}>
          <div className="shadow-sm rounded border p-10" style={{ height: "740px" }}>
            <Form.Group className={`mt-5 align-items-center row  m-l-0 m-r-0 `}>
              <Col sm={1} md={1} xs={1} className="p-0">
                <input
                  type="checkbox"
                  value=""
                  checked={check1}
                  onClick={() => {
                    dispatch(setSelectedPOE(pOE1Id));
                    onchecking(setCheck1);
                  }}
                  disabled={!pOE1Id}
                />
              </Col>

              <Col xs={3} md={3} className="p-0">
                <input
                  className={"customFormControl"}
                  id=""
                  name=""
                  type="search"
                  placeholder="Port of Entry Option #-2"
                  maxLength={21}
                  disabled={true}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={pOE1}
                />
              </Col>
            </Form.Group>
            <Form.Group className={`mt-4 align-items-center row m-b-25 m-l-0 m-r-0 `}>
              <Col sm={1} md={1} xs={1} className="p-0">
                <input
                  type="checkbox"
                  value=""
                  checked={check2}
                  onClick={() => {
                    dispatch(setSelectedPOE(pOE2Id));
                    onchecking(setCheck2);
                  }}
                  disabled={!pOE2Id}
                />
              </Col>

              <Col xs={3} md={3} className="p-0">
                <input
                  className={"customFormControl"}
                  id=""
                  name=""
                  type="search"
                  placeholder="Port of Entry Option #-1"
                  maxLength={21}
                  disabled={true}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={pOE2}
                />
              </Col>
            </Form.Group>
            <Form.Group className=" mt-4 m-b-10 row d-flex  m-l-0 m-r-0">
              <Col sm={1} md={1} xs={1} className="p-0 ">
                <input
                  type="checkbox"
                  value=""
                  checked={check3}
                  onClick={() => {
                    dispatch(setSelectedPOE(overridePoeFK));
                    onchecking(setCheck3);
                  }}
                />
              </Col>

              <Col xs={3} md={3} sm={3} className="d-flex p-0 ">
                {/*  Autocomplete */}

                <AutoCompleteDropdown
                  className={`  ${!overridePoeFK && overridePoe !== "" ? "borderRed" : ""}`}
                  arrayList={overridePoeList}
                  searchString={overridePoe}
                  renderItemId={(poe) => poe.poePK}
                  renderItemField={(poe) => poe.usCity}
                  handleSearchString={(string) => {
                    setOverridePoe(string);
                  }}
                  fetchDataBySearchString={getPOEForListing}
                  onSelect={handleLookupSelection}
                  clearInputCallback={() => {
                    setOverridePoeFK(null);
                    dispatch(setSelectedPOE());
                  }}
                  selectedId={overridePoeFK}
                  textAlignLeft={true}
                  loading={loading}
                />
                <LookupButton
                  onClick={() => {
                    setShowLookup(true);
                  }}
                  disabled={""}
                />
              </Col>
            </Form.Group>
            <Form.Group className={`mt-4 align-items-center row  m-l-0 m-r-0 `}>
              <Col sm={1} md={1} xs={1} className="p-0">
                <input
                  type="checkbox"
                  value=""
                  checked={check4}
                  onClick={() => {
                    dispatch(setSelectedPOE(pOE4Id));
                    onchecking(setCheck4);
                  }}
                  disabled={!pOE4Id}
                />
              </Col>

              <Col xs={3} md={3} className="p-0">
                <input
                  className={"customFormControl"}
                  id=""
                  name=""
                  type="search"
                  placeholder="Port of Entry Option #+1"
                  maxLength={21}
                  disabled={true}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={pOE4}
                />
              </Col>
            </Form.Group>
            <Form.Group className={`mt-4 mb-5 align-items-center row  m-l-0 m-r-0 `}>
              <Col sm={1} md={1} xs={1} className="p-0">
                <input
                  type="checkbox"
                  value=""
                  checked={check5}
                  onClick={() => {
                    dispatch(setSelectedPOE(pOE5Id));
                    onchecking(setCheck5);
                  }}
                  disabled={!pOE5Id}
                />
              </Col>

              <Col xs={3} md={3} className="p-0">
                <input
                  className={"customFormControl"}
                  id=""
                  name=""
                  type="search"
                  placeholder="Port of Entry Option # +2"
                  maxLength={21}
                  disabled={true}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={pOE5}
                />
              </Col>
            </Form.Group>
          </div>
        </div>
        <POESelctionFooter />
      </div>
      <PortOfEntryLookup
        show={showLookup}
        onHide={() => {
          setShowLookup(false);
        }}
        renderItemId={(poe) => poe.poePK}
        handleLookupSelection={handleLookupSelection}
        brokerType={"export"}
        MaintenanceProgram
      />
    </div>
  );
}

export default POESelectionTwo;
