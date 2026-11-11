import { t } from "i18next";
import { Button, Col, Row } from "react-bootstrap";
import { Radio, RadioGroup } from "react-radio-group";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../../../common/Button";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetOutputconfirmationScreen,
  setActive,
  setActiveString,
  setDeleased,
  setDriverId,
  setFirstName,
  setLastName,
  setPageNumber,
  setSearchCriteria,
  setSortType,
  setSortValue,
} from "../../../../redux/ReprintBolSlice";
import { useEffect } from "react";

function ReprintDriverSelectionFilter() {
  const dispatch = useDispatch();

  const searchCriteria = useSelector((state) => state.reprintBolReducer.searchCriteria);
  const activeString = useSelector((state) => state.reprintBolReducer.activeString);
  const navigate = useNavigate();
  const driverId = useSelector((state) => state.reprintBolReducer.driverId);
  const rePrintBOL = useSelector((state) => state.reprintBolReducer.rePrintBOL);

  const HandleSearchCriteria = (value) => {
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria(value));
  };

  const HandleActiveValue = (value) => {
    dispatch(setPageNumber(0));
    dispatch(setActiveString(value));
    switch (value) {
      case "All":
        dispatch(setActive(null));
        dispatch(setDeleased(null));
        break;
      case "Active":
        dispatch(setActive(true));
        dispatch(setDeleased(null));
        break;
      case "Inactive":
        dispatch(setActive(false));
        dispatch(setDeleased(null));
        break;
      case "Deleased":
        dispatch(setActive(null));
        dispatch(setDeleased(true));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    return () => {
      HandleSearchCriteria("Beginning");
      HandleActiveValue("Active");
      dispatch(setFirstName(""));
      dispatch(setLastName(""));
      dispatch(setSortType(null));
      dispatch(setSortValue(null));
      dispatch(setPageNumber(0));
    };
  }, []);
  useEffect(() => {
    if (!rePrintBOL) {
      navigate("/reprint-selection-screen");
    }
  }, [rePrintBOL]);

  return (
    <div>
      <div className="border-bottom border-dark border-2 p-t-10 p-b-10">
        <Col md={12}>
          <Row className="m-0 p-0 justify-content-between">
            <Col md={7} sm={7} lg={7} xs={7} className="p-l-0">
              <div className="d-flex align-items-center justify-content-end">
                <div className="d-flex align-items-center me-5">
                  <RadioGroup
                    name="searchCriteria"
                    selectedValue={searchCriteria}
                    onChange={HandleSearchCriteria}
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
                  <RadioGroup name="status" selectedValue={activeString} onChange={HandleActiveValue}>
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

                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Deleased" />
                      <label className="f-w-600 m-l-5">Deleased</label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </Col>

            <Col md={3} sm={3} lg={3} xs={3} className="p-l-0 d-flex justify-content-end  align-items-center">
              <div className="d-flex  ">
                <span className="m-l-10">
                  <button
                    onClick={() => {
                      navigate("/");
                      dispatch(setSearchCriteria("Beginning"));
                      dispatch(setActiveString("Active"));
                      dispatch(setActive(null));
                      dispatch(setDeleased(null));
                      dispatch(setFirstName(""));
                      dispatch(setLastName(""));
                      dispatch(setDriverId(null));

                      dispatch(setSortType(null));
                      dispatch(setSortValue(null));
                      dispatch(setPageNumber(0));
                      dispatch(resetOutputconfirmationScreen());
                    }}
                    className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                  >
                    Close
                  </button>
                </span>
              </div>
            </Col>
          </Row>
        </Col>
      </div>
    </div>
  );
}

export default ReprintDriverSelectionFilter;
