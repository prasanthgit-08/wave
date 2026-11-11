import React from "react";
import { Modal } from "react-bootstrap";
import Header from "../../../common/Header";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import FormHeader from "./FormHeader";

const EditMasterExpressShuttle = ({ show, onHide, unitPK }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      unitPK={unitPK}
      backdrop="static"
      keyboard={false}
      className="quarterScreenModal"
    >
      <Modal.Body>
        <QuarterScreenWrapper>
          <FormHeader onHide={onHide} />
          <FormContent unitPK={unitPK} />
          <FormFooter onHide={onHide} />
        </QuarterScreenWrapper>
      </Modal.Body>
    </Modal>
  );
};

export default EditMasterExpressShuttle;
