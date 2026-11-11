import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import RegionsService from "../../../services/RegionsService";
import {
  resetEditRegions,
  setEditDetails,
  setRegionCode,
  setRegionsDataList,
  setDescription,
  setUnqiueRegionCode,
} from "../../../redux/EditRegionSlice";
import QuarterScreen from "../../../styles/QuarterScreen.module.css";
import LoadingIcon from "../../common/LoadingIcon";
import { setDate } from "../../../redux/HolidaysSlice";

function RegionEditFormContent() {
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const regionData = useSelector((state) => state.editRegionReducer.regionDataList);
  const regionCode = useSelector((state) => state.editRegionReducer.regionCode);
  const description = useSelector((state) => state.editRegionReducer.description);
  const editDetail = useSelector((state) => state.editRegionReducer.editDetail);
  const cancelChange = useSelector((state) => state.editRegionReducer.cancelChange);
  const uniqueRgCode = useSelector((state) => state.editRegionReducer.uniqueRgCode);
  const regionId = params.regionId;
  const pageNumber = params.pageNumber;

  const fetchRegion = (regionId) => {
    setLoading(true);
    dispatch(setRegionsDataList(null));
    dispatch(setRegionCode(""));
    dispatch(setDescription(""));
    RegionsService.getById(regionId)
      .then((response) => {
        dispatch(setRegionsDataList(response.data));
      })
      .catch((e) => {
        navigate("/regions");
      })
      .finally(() => setLoading(false));
  };

  const checkRegionCode = (val) => {
    if (val?.trim() === regionData?.regionCode?.trim()) {
      dispatch(setUnqiueRegionCode(true));
    } else if (val !== "") {
      RegionsService.isValid(val).then((response) => {
        dispatch(setUnqiueRegionCode(response.data));
      });
    }
  };

  useEffect(() => {
    if (regionData !== null) {
      dispatch(setDescription(regionData.description ? regionData.description?.trim() : ""));
      dispatch(setRegionCode(regionData.regionCode ? regionData.regionCode?.trim() : ""));
    }
  }, [cancelChange, regionData]);

  useEffect(() => {
    dispatch(setUnqiueRegionCode(true));
    if (window.location.pathname === "/add-region/" + regionId + "/" + pageNumber) {
      dispatch(setEditDetails(false));
      fetchRegion(regionId);
    } else {
      dispatch(resetEditRegions());
      dispatch(setRegionCode(""));
      dispatch(setEditDetails(true));
    }
  }, []);

  return (
    <Form>
      <div className="w-100 p-2">
        {Loading && <LoadingIcon />}
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                  <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={QuarterScreen.colFormLabel}>
                        {t("Regions.regionCode")}
                      </Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0">
                      <input
                        name="regionCode"
                        type="text"
                        value={regionCode.toUpperCase()}
                        disabled={!editDetail}
                        onChange={(e) => {
                          if (String(e.target.value).match(/^[A-Za-z]+$/) || e.target.value === "") {
                            dispatch(setUnqiueRegionCode(true));
                            dispatch(setRegionCode(e.target.value.toUpperCase()));
                          }
                        }}
                        onBlur={() => {
                          checkRegionCode(regionCode.toUpperCase());
                        }}
                        className={`${QuarterScreen.formControl} ${
                          editDetail
                            ? !uniqueRgCode || !regionCode
                              ? "borderRed"
                              : "borderGreen"
                            : "borderBlack"
                        }`}
                        maxLength={2}
                        id="regionCode"
                        autoComplete="off"
                        aria-autocomplete="list"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={QuarterScreen.colFormLabel}>
                        {t("Regions.description")}
                      </Form.Label>
                    </Col>
                    <Col xs={5} md={5} sm={5} className="ps-0">
                      <input
                        name="description"
                        type="text"
                        value={description}
                        className={`${QuarterScreen.formControl} ${
                          editDetail ? (description?.trim() ? "borderGreen" : "borderRed") : "borderBlack"
                        }`}
                        disabled={!editDetail}
                        onChange={(e) => {
                          if (e.target.value === " ") {
                            dispatch(setDescription(""));
                          } else {
                            dispatch(setDescription(e.target.value));
                          }
                        }}
                        maxLength={30}
                        id="description"
                        autoComplete="off"
                        aria-autocomplete="list"
                        style={{
                          borderColor: editDetail ? (description ? "green" : "red") : "black",
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default RegionEditFormContent;
