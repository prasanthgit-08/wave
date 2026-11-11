import { t } from "i18next";
import React from "react";
import { Col, Row } from "react-bootstrap";
import ButtonComponent from "../../../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { setInnerSortFlag, setInnerSortValue, setSelectedId } from "../../../../../redux/ApproveHeldSlice";

function ApproveHeldUnitBrowseHeader() {
  const dispatch = useDispatch();
  const idSelected = useSelector((state) => state.approveHeldShuttleReducer.id);
  const pageNumber = useSelector((state) => state.approveHeldShuttleReducer.pageNumber);

  const handleOnClick = () => {
    dispatch(setInnerSortValue(""));
    dispatch(setInnerSortFlag(false));
    dispatch(setSelectedId(null));
  };

  return (
    <div>
      <Row className="border border-dark border-2 p-t-10 p-b-10">
        <Col md={12}>
          <Row className="m-0 p-0">
            <Col md={12} sm={12} lg={12} xs={12} className="p-l-0">
              <div className="d-flex align-items-center ms-5 justify-content-between">
                <div className=" align-items-center"></div>
                <span className="m-l-10">
                  <ButtonComponent
                    route={`/approve-held-shuttle/add/${idSelected}/${pageNumber}`}
                    className={`btn btn-secondary btn-sm btn-medium-width  close-button`}
                    label={t("close.button")}
                    onClick={handleOnClick}
                  />
                </span>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ApproveHeldUnitBrowseHeader;
