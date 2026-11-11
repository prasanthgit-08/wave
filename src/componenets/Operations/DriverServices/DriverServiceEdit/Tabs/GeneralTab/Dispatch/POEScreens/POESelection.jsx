import React, { useEffect } from "react";
import { Col, Form } from "react-bootstrap";
import POESelctionFooter from "./POESelctionFooter";
import { useState } from "react";
import DispatchesService from "../../../../../../../../services/DispatchesService";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDispatchPK, setSelectedPOE, setShowOverrideModal } from "../../../../../../../../redux/DispatchesSlice";
import OverrideCodeModalComponent from "../../../../../../../../componenets/common/OverrideCodeModalComponent";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../../../../../../../common/LoadingIcon";

function POESelection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);

  const [pOE1, setPOE1] = useState("");
  const [pOE2, setPOE2] = useState("");
  const [pOE3, setPOE3] = useState("");
  const [pOE4, setPOE4] = useState("");
  const [pOE5, setPOE5] = useState("");

  const [pOE1Id, setPOE1Id] = useState(false);
  const [pOE2Id, setPOE2Id] = useState(false);
  const [pOE3Id, setPOE3Id] = useState(false);
  const [pOE4Id, setPOE4Id] = useState(false);
  const [pOE5Id, setPOE5Id] = useState(false);

  const [loading, setLoading] = useState(false);
  const [validOverride, setValidOverride] = useState(false);

  const showModal = useSelector((state) => state.dispatchesReducer.showOverrideModal);
  const selectedDispatchPK = useSelector((state) => state.dispatchesReducer.selectedDispatchPK);
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
    setLoading(true);
    DispatchesService.fetchPoeSelectionData(dispatchPK)
      .then(({ data }) => {
        setPOE1(data.poeString1 ? data.poeString1 : "");
        setPOE2(data.poeString2 ? data.poeString2 : "");
        setPOE3(data.poeString3 ? data.poeString3 : "");
        setPOE4(data.poeString4 ? data.poeString4 : "");
        setPOE5(data.poeString5 ? data.poeString5 : "");
        setPOE1Id(data.poeFK1 ? data.poeFK1 : "");
        setPOE2Id(data.poeFK2 ? data.poeFK2 : "");
        setPOE3Id(data.poeFK3 ? data.poeFK3 : "");
        setPOE4Id(data.poeFK4 ? data.poeFK4 : "");
        setPOE5Id(data.poeFK5 ? data.poeFK5 : "");
        data.defaultPOE && dispatch(setSelectedPOE(data.defaultPOE));
        data.poeFK1 === data.defaultPOE && onchecking(setCheck1);
        data.poeFK2 === data.defaultPOE && onchecking(setCheck2);
        data.poeFK3 === data.defaultPOE && onchecking(setCheck3);
        data.poeFK4 === data.defaultPOE && onchecking(setCheck4);
        data.poeFK5 === data.defaultPOE && onchecking(setCheck5);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (validOverride) {
      navigate("/driver-dispatch/port-of-entry-override");
    }
  }, [validOverride]);

  return (
    <div className="customContainer " style={{ margin: "1px" }}>
      <div className="add-form-component threeFourthScreenWidth">
        <div className="text-center border border-dark border-2 p-2 " style={{ height: "760px" }}>
          <div className="shadow-sm rounded border p-10 " style={{ height: "740px" }}>
            <Form.Group className={`mt-5 align-items-center row  m-l-0 m-r-0 `}>
              <Col sm={1} md={1} xs={1} className="p-0">
                <input
                  type="checkbox"
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
            <Form.Group className={`mt-4 align-items-center row  m-l-0 m-r-0 `}>
              <Col sm={1} md={1} xs={1} className="p-0">
                <input
                  type="checkbox"
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
            <Form.Group className={`mt-4 align-items-center row  m-l-0 m-r-0 `}>
              <Col sm={1} md={1} xs={1} className="p-0">
                <input
                  type="checkbox"
                  checked={check3}
                  onClick={() => {
                    dispatch(setSelectedPOE(pOE3Id));
                    onchecking(setCheck3);
                  }}
                  disabled={!pOE3Id}
                />
              </Col>

              <Col xs={3} md={3} className="p-0">
                <input
                  className={"customFormControl"}
                  id=""
                  name=""
                  type="search"
                  placeholder="Port of Entry Unadjusted Default"
                  maxLength={21}
                  disabled={true}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={pOE3}
                />
              </Col>
            </Form.Group>
            <Form.Group className={`mt-4 align-items-center row  m-l-0 m-r-0 `}>
              <Col sm={1} md={1} xs={1} className="p-0">
                <input
                  type="checkbox"
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
          <OverrideCodeModalComponent
            permissionObjectKey={"HRZN:DISP:PEOR"}
            show={showModal}
            onHide={() => {
              dispatch(setShowOverrideModal(false));
            }}
            open={() => {
              dispatch(setShowOverrideModal(true));
            }}
            body="Permission Not available. Do you want to enter a override code."
            className={""}
            handleYES={true}
            handleNO={true}
            validOverride={validOverride}
            setValidOverride={setValidOverride}
            color={""}
          />
        </div>
        {loading && <LoadingIcon />}
        <POESelctionFooter />
      </div>
    </div>
  );
}

export default POESelection;
