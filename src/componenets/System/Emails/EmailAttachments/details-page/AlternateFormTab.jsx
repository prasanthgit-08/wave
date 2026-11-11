import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setAlternateForm, setIsUniqueDescription } from "../../../../../redux/EmailAttachmentSlice";
import EmailAttachmentService from "../../../../../services/EmailAttachmentService";
import { useParams } from "react-router-dom";

const AlternateFormTab = () => {
  const dispatch = useDispatch();
  const { emailMaintenanceId, id, pageNumber } = useParams();
  const alternateForm = useSelector((state) => state.emailAttachmentReducer.alternateForm);
  const viewDetail = useSelector((state) => state.emailAttachmentReducer.viewDetail);
  const formDescriptionId = useSelector((state) => state.emailAttachmentReducer.formDescriptionId);
  const documentTypeDescriptionId = useSelector(
    (state) => state.emailAttachmentReducer.documentTypeDescriptionId
  );
  const responseData = useSelector((state) => state.emailAttachmentReducer.responseData);
  const isUniqueDescription = useSelector((state) => state.emailAttachmentReducer.isUniqueDescription);

  const checkUniqueDescription = (alternateForm) => {
    if (responseData === null || responseData.alternateForm?.trim() !== alternateForm?.trim()) {
      EmailAttachmentService.checkUniqueFormDescription(
        emailMaintenanceId,
        alternateForm,
        "AlternateForm",
        id
      )
        .then((response) => {
          dispatch(setIsUniqueDescription(response.data));
        })
        .catch((err) => {
          dispatch(setIsUniqueDescription(false));
        });
    } else {
      dispatch(setIsUniqueDescription(true));
    }
  };

  return (
    <div className="m-b-10">
      <div className="p-2 w-100">
        <Row className="m-0 p-10">
          <Col sm={12} md={12} lg={12} xl={12} xs={12}>
            <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
              <Col /* sm={2} md={2} */ xs={2} className="p-0">
                <label className="customColFormLabel p-0 m-b-20">Alternate Form</label>
              </Col>

              <Col /* sm={10} md={10} */ xs={10} className="p-0">
                <textarea
                  id="onlyEmailIf"
                  name="onlyEmailIf"
                  cols={20}
                  type="text"
                  className={`customFormControl ${
                    (!alternateForm && !formDescriptionId && !documentTypeDescriptionId) ||
                    (alternateForm && !isUniqueDescription)
                      ? "borderRed"
                      : ""
                  }`}
                  style={{
                    resize: "none",
                    display: "fixed",
                    height: "200px",
                    minWidth: "610px",
                    boxShadow: "none",
                    fontSize: "12px",
                  }}
                  value={alternateForm}
                  disabled={viewDetail || formDescriptionId || documentTypeDescriptionId}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    dispatch(setAlternateForm(e.target.value));
                    dispatch(setIsUniqueDescription(true));
                  }}
                  onBlur={() => {
                    checkUniqueDescription(alternateForm);
                  }}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AlternateFormTab;
