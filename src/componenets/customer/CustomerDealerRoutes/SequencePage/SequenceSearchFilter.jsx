import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Pagination } from "react-bootstrap";
import { t } from "i18next";
import ButtonComponent from "../../../common/Button";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import {
  setDisableDown,
  setDisableSaveSequence,
  setDisableUp,
  setLoadedPage,
  setSequencePagelistingData,
} from "../../../../redux/CustomerDealerRoutesSlice";

const SequenceSearchFilter = (props) => {
  const { saveRoute, closeRoute, handleClickSave, handleClickClose, disableSave } = props;

  const listingData = useSelector((state) => state.customerDealerRoutes.sequencePageListingData);
  const selectedId = useSelector((state) => state.customerDealerRoutes.selectedId);
  const currentPage = useSelector((state) => state.customerDealerRoutes.currentPage);
  const disableUp = useSelector((state) => state.customerDealerRoutes.disableUp);
  const disableDown = useSelector((state) => state.customerDealerRoutes.disableDown);

  const dispatch = useDispatch();

  const moveElement = (index, toIndex) => {
    if (
      index !== undefined &&
      toIndex !== undefined &&
      index >= 0 &&
      index < listingData.length &&
      toIndex >= 0 &&
      toIndex < listingData.length
    ) {
      dispatch(setDisableSaveSequence(false));
      const newItems = [...listingData];
      const temp = { ...newItems[index], sequence: newItems[toIndex].sequence };
      newItems[index] = { ...newItems[toIndex], sequence: newItems[index].sequence };
      newItems[toIndex] = temp;

      const cleanedArray = newItems.filter((item) => item !== null && item !== undefined && item !== "");
      dispatch(setSequencePagelistingData(cleanedArray));
      if (toIndex === 0 && toIndex === listingData.length - 1) {
        dispatch(setDisableDown(true));
        dispatch(setDisableUp(true));
      } else if (toIndex == 0) {
        dispatch(setDisableDown(false));
        dispatch(setDisableUp(true));
      } else if (toIndex === listingData.length - 1) {
        dispatch(setDisableDown(true));
        dispatch(setDisableUp(false));
      } else {
        dispatch(setDisableDown(false));
        dispatch(setDisableUp(false));
      }
    }
  };

  const itemsPerPage = 7;

  useEffect(() => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    dispatch(setLoadedPage(listingData?.slice(startIndex, endIndex)));
  }, [listingData, currentPage]);

  useEffect(() => {
    if (!selectedId) {
      dispatch(setDisableDown(true));
      dispatch(setDisableUp(true));
    }
  }, [selectedId]);

  return (
    <div>
      <Row className="border border-dark border-2 p-t-10 p-b-10">
        <Col md={12}>
          <Row className="m-0 p-0">
            <Col md={12} sm={12} lg={12} xs={12} className="p-l-0">
              <div className="d-flex align-items-center justify-content-between">
                <div className={`d-flex align-items-center ${QuarterScreen.searchBox}`}>
                  <span className="p-r-20">
                    <button
                      route={saveRoute}
                      className={`btn btn-secondary btn-sm ${QuarterScreen.btnSmallWidth} font-12`}
                      onClick={handleClickSave}
                      disabled={disableSave}
                    >
                      Save
                    </button>
                  </span>
                </div>

                <div className="d-flex align-items-center">
                  <Col md={12} sm={12} lg={12} xs={12} className="p-l-0"></Col>
                  <span className="p-l-20">
                    <Pagination>
                      <Pagination.Prev
                        style={
                          disableUp
                            ? { pointerEvents: "none", opacity: 0.3 }
                            : { pointerEvents: "fill", opacity: 1 }
                        }
                        className="prev-page"
                        onClick={() => {
                          const searchIndex = listingData.findIndex(
                            (item) => item["customerDealerRoutePK"] === selectedId
                          );

                          moveElement(searchIndex, searchIndex - 1);
                        }}
                      ></Pagination.Prev>

                      <Pagination.Last
                        style={
                          disableDown
                            ? { pointerEvents: "none", opacity: 0.3 }
                            : { pointerEvents: "fill", opacity: 1 }
                        }
                        onClick={() => {
                          const searchIndex = listingData.findIndex(
                            (item) => item["customerDealerRoutePK"] === selectedId
                          );

                          moveElement(searchIndex, searchIndex + 1);
                        }}
                        className="next-page"
                      ></Pagination.Last>
                    </Pagination>
                  </span>
                </div>

                <span className="m-l-10">
                  <ButtonComponent
                    route={closeRoute ? closeRoute : ""}
                    className={`btn btn-secondary btn-sm ${QuarterScreen.btnSmallWidth} font-12 close-button`}
                    label={t("quarter.screen.close")}
                    onClick={handleClickClose}
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
export default SequenceSearchFilter;
