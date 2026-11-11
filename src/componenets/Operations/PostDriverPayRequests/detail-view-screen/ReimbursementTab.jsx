import { useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PostpayRequestService from "../../../../services/PostpayRequestService";

const ReimbursementTab = () => {
  const { id } = useParams();
  const reimbursementData = useSelector((state) => state.postPayRequestSlice.reimbursementData);

  return (
    <div className="p-0 w-100">
      <Row className="m-0 p-20">
        <Col xs={12}>
          <Form.Group className="mt-2 mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Motel</Form.Label>
            </Col>

            <Col xs={1} className="p-0" style={{ width: "75px" }}>
              <input
                type="text"
                maxLength={30}
                className={`customFormControl`}
                value={reimbursementData?.MotelAmount ?? 0}
                disabled
              />
            </Col>
            <Col xs={2} className="text-end">
              <Form.Label className="customColFormLabel pe-3">Reason</Form.Label>
            </Col>
            <Col xs={5} className="p-0">
              <input
                name="invoiceTolls"
                id="invoiceTolls"
                type="text"
                className={`customFormControl`}
                autoComplete="off"
                aria-autocomplete="list"
                value={reimbursementData?.MotelDescription || ""}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Repair</Form.Label>
            </Col>

            <Col xs={2} className="p-0" style={{ width: "75px" }}>
              <input
                type="text"
                maxLength={30}
                className={`customFormControl`}
                value={reimbursementData?.RepairAmount ?? 0}
                disabled
              />
            </Col>
            <Col xs={2} className="text-end">
              <Form.Label className="customColFormLabel pe-3">Reason</Form.Label>
            </Col>
            <Col xs={5} className="p-0">
              <input
                name="invoiceTolls"
                id="invoiceTolls"
                type="text"
                className={`customFormControl`}
                autoComplete="off"
                aria-autocomplete="list"
                value={reimbursementData?.RepairDescription || ""}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Fuel</Form.Label>
            </Col>

            <Col xs={2} className="p-0" style={{ width: "75px" }}>
              <input
                type="text"
                maxLength={30}
                className={`customFormControl`}
                value={reimbursementData?.FuelAmount ?? 0}
                disabled
              />
            </Col>
            <Col xs={2} className="text-end">
              <Form.Label className="customColFormLabel pe-3">Reason</Form.Label>
            </Col>
            <Col xs={5} className="p-0">
              <input
                name="invoiceTolls"
                id="invoiceTolls"
                type="text"
                className={`customFormControl`}
                autoComplete="off"
                aria-autocomplete="list"
                value={reimbursementData?.FuelDescription || ""}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Tolls</Form.Label>
            </Col>

            <Col xs={2} className="p-0" style={{ width: "75px" }}>
              <input
                type="text"
                maxLength={30}
                className={`customFormControl`}
                value={reimbursementData?.TollsAmount ?? 0}
                disabled
              />
            </Col>
            <Col xs={2} className="text-end">
              <Form.Label className="customColFormLabel pe-3">Reason</Form.Label>
            </Col>
            <Col xs={5} className="p-0">
              <input
                name="invoiceTolls"
                id="invoiceTolls"
                type="text"
                className={`customFormControl`}
                autoComplete="off"
                aria-autocomplete="list"
                value={reimbursementData?.TollsDescription || ""}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Permits</Form.Label>
            </Col>

            <Col xs={2} className="p-0" style={{ width: "75px" }}>
              <input
                type="text"
                maxLength={30}
                className={`customFormControl`}
                value={reimbursementData?.PermitsAmount ?? 0}
                disabled
              />
            </Col>
            <Col xs={2} className="text-end">
              <Form.Label className="customColFormLabel pe-3">Reason</Form.Label>
            </Col>
            <Col xs={5} className="p-0">
              <input
                name="invoiceTolls"
                id="invoiceTolls"
                type="text"
                className={`customFormControl`}
                autoComplete="off"
                aria-autocomplete="list"
                value={reimbursementData?.PermitsDescription || ""}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Wash</Form.Label>
            </Col>

            <Col xs={2} className="p-0" style={{ width: "75px" }}>
              <input
                type="text"
                maxLength={30}
                className={`customFormControl`}
                value={reimbursementData?.WashAmount ?? 0}
                disabled
              />
            </Col>
            <Col xs={2} className="text-end">
              <Form.Label className="customColFormLabel pe-3">Reason</Form.Label>
            </Col>
            <Col xs={5} className="p-0">
              <input
                name="invoiceTolls"
                id="invoiceTolls"
                type="text"
                className={`customFormControl`}
                autoComplete="off"
                aria-autocomplete="list"
                value={reimbursementData?.WashDescription || ""}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Other #1</Form.Label>
            </Col>

            <Col xs={2} className="p-0" style={{ width: "75px" }}>
              <input
                type="text"
                maxLength={30}
                className={`customFormControl`}
                value={reimbursementData?.OtherReimbursmentAmount1 ?? 0}
                disabled
              />
            </Col>
            <Col xs={2} className="text-end">
              <Form.Label className="customColFormLabel pe-3">Reason</Form.Label>
            </Col>
            <Col xs={5} className="p-0">
              <input
                name="invoiceTolls"
                id="invoiceTolls"
                type="text"
                className={`customFormControl`}
                autoComplete="off"
                aria-autocomplete="list"
                value={reimbursementData?.OtherReimbursmentDescription1 || ""}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Other #2</Form.Label>
            </Col>

            <Col xs={2} className="p-0" style={{ width: "75px" }}>
              <input
                type="text"
                maxLength={30}
                className={`customFormControl`}
                value={reimbursementData?.OtherReimbursmentAmount2 ?? 0}
                disabled
              />
            </Col>
            <Col xs={2} className="text-end">
              <Form.Label className="customColFormLabel pe-3">Reason</Form.Label>
            </Col>
            <Col xs={5} className="p-0">
              <input
                name="invoiceTolls"
                id="invoiceTolls"
                type="text"
                className={`customFormControl`}
                autoComplete="off"
                aria-autocomplete="list"
                value={reimbursementData?.OtherReimbursmentDescription2 || ""}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0 d-flex align-self-start">
              <Form.Label className={`customColFormLabel`}>Notes</Form.Label>
            </Col>

            <Col xs={9} className="p-0">
              <textarea
                name="driverpay"
                id="driverpay"
                style={{ width: "86%" }}
                rows="9"
                className={`customFocusClass `}
                value={reimbursementData?.ReimbursmentNotes || ""}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default ReimbursementTab;
