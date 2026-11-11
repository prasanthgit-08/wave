import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useEffect } from "react";
import DealerGroupService from "../../../../services/DealerGroupService";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetData,
  setAssignedPageNumber,
  setDescription,
  setIsUniqueDescription,
  setNotes,
  setinitialDescription,
  setinitialNotes,
} from "../../../../redux/EditDealerGroupslice";
import { useState } from "react";
import { ThreeForthScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import LoadingIcon from "../../../common/LoadingIcon";

const DealerGroupViewContent = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = params.dealerGroupPK;
  const pageNumber = params.pageNumber;

  const notes = useSelector((state) => state.editDealerGroupReducer.notes);
  const descriptions = useSelector((state) => state.editDealerGroupReducer.description);
  const edit = useSelector((state) => state.editDealerGroupReducer.edit);
  const viewDetail = useSelector((state) => state.editDealerGroupReducer.edit);
  const initialDescription = useSelector((state) => state.editDealerGroupReducer.initialDescription);

  const assignedPageNumber = useSelector((state) => state.editDealerGroupReducer.assignedPageNumber);
  const isUniqueDescription = useSelector((state) => state.editDealerGroupReducer.isUniqueDescription);

  const [loading, setLoading] = useState(false);

  const fetchDealerGroup = () => {
    dispatch(resetData());
    if (id) {
      setLoading(true);
      DealerGroupService.getDealerGroupById(id, assignedPageNumber)
        .then((response) => {
          if (response.data.errorCode == 1) {
            navigate("/dealer-group");
          } else {
            dispatch(setinitialDescription(response.data.description));
            dispatch(setinitialNotes(response.data.notes));
            dispatch(setNotes(response.data.notes));
            dispatch(setDescription(response.data.description));
            dispatch(setIsUniqueDescription(true));
          }
        })
        .catch((e) => {
          navigate("/dealer-group");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const checkUniqueDescription = () => {
    if (descriptions !== initialDescription || !id) {
      DealerGroupService.isUniqueDescription(descriptions).then((response) => {
        dispatch(setIsUniqueDescription(response.data));
      });
    } else {
      dispatch(setIsUniqueDescription(true));
    }
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchDealerGroup();
    }, 100);
    return () => {
      clearTimeout(debounceFunction);
    };
  }, [pageNumber]);

  useEffect(() => {
    dispatch(resetData());
  }, []);

  return (
    <>
      <Form.Group className="form-group mt-4 align-items-center row m-l-0 m-r-0">
        {loading && <LoadingIcon />}

        <Col xs={3} md={3} sm={3} className="p-0">
          <Form.Label className={"col-form-label font-13 ps-2"}>Description</Form.Label>
        </Col>
        <Col xs={8} md={8} sm={8} className="p-0">
          <input
            type="text"
            maxLength={30}
            className={`customFormControl ${
              viewDetail ? (isUniqueDescription && descriptions ? "borderGreen" : "borderRed") : "borderBlack"
            }`}
            value={descriptions}
            disabled={!edit}
            onChange={(e) => {
              dispatch(setDescription(e.target.value));
              dispatch(setIsUniqueDescription(true));
            }}
            onBlur={(e) => {
              if (e.target.value) {
                checkUniqueDescription(e.target.value);
              }
            }}
          />
        </Col>
        <Row className={`${!isUniqueDescription && viewDetail ? "" : "hide-elements"}`}>
          <Col xs={3} md={3} sm={3}></Col>
          <Col style={{ paddingLeft: "5px" }}></Col>
        </Row>
      </Form.Group>

      <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
        <Col sm={12} md={12} xs={12} className="p-0">
          <Form.Label className={"col-form-label font-13 ps-2 mb-2"}>Notes</Form.Label>
        </Col>

        <Col xs={11} md={11} sm={11} className="p-0">
          <textarea
            onChange={(e) => {
              dispatch(setNotes(e.target.value));
            }}
            disabled={!edit}
            rows={8}
            cols={5}
            type="text"
            className={`customFormControl h-100 font-12  ms-2`} /* textarea-height */
            value={notes}
            style={{
              resize: "none",
              display: "fixed",
              minHeight: "90px",
              minWidth: "100px",
              boxShadow: "none",
              fontSize: "12px",
            }}
            scroll
          />
        </Col>
      </Form.Group>
    </>
  );
};

export default DealerGroupViewContent;
