import { useState } from "react";
import CustomButton from "../button";
import { Button, Col, Form, Modal } from "react-bootstrap";
import Input from "../input";
import OrderEntryServices from "../../../service/orderEntry/orderEntry.service";
import { useDispatch, useSelector } from "react-redux";
import { setAllowedInvoicePercentage, setOrderEntrySchemaConditions } from "../../../store/slices/unit.slice";
import { useFormContext } from "react-hook-form";

const OverrideButton = ({ unitPercentage, onSuccess, onError }) => {
  const [showFlatRateModal, setShowFlatRateModal] = useState(false);
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [showOverrideErrorModal, setShowOverrideErrorModal] = useState(false);
  const [showOverrideErrorMessage, setShowOverrideErrorMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [userCode, setUserCode] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
  } = useFormContext();

  const selectedCustomer = useSelector((state) => state.unit.selectedCustomer);
  const allowedInvoicePercentage = useSelector((state) => state.unit.allowedInvoicePercentage);
  const invoiceAmount = useSelector((state) => state.unit.invoiceAmount);
  const driverAmount = useSelector((state) => state.unit.driverAmount);

  const dispatch = useDispatch();
  const handleOverrideOK = () => {
    // To be done : get override percentage of selected user
    //if override percentage is less than customers allowed percentage , show error
    //if the entered value is more than allowed what should we do ?
    setLoading(true);
    let overrideValue;

    OrderEntryServices.getOverInvoiceAmt(userCode)
      .then((res) => {
        overrideValue = res.data;
        //if no record present in the db with the given details
        if (!overrideValue) {
          setShowOverrideErrorModal(true);
          setShowOverrideErrorMessage("Invalid code or user has no permission !!");
          setShowOverrideModal(false);
        } else {
          //record is present but, find the sum
          let newOverrideVal = Number(overrideValue / 100) + Number(selectedCustomer.invoicePercentage);

          dispatch(setAllowedInvoicePercentage(newOverrideVal));

          if (newOverrideVal < 100) {
            if (unitPercentage > newOverrideVal) {
              setShowOverrideErrorModal(true);
              setShowOverrideErrorMessage(
                "New invoice percentage is insufficient !! Please try another code."
              );
            } else {
              dispatch(setAllowedInvoicePercentage(newOverrideVal));

              dispatch(
                setOrderEntrySchemaConditions({
                  allowedPercentage: false,
                })
              );
              dispatch(setAllowedInvoicePercentage(newOverrideVal));
              // dispatch(setFlatRateErrorMsg(""));
              setShowOverrideModal(false);
            }
          } else {
            setShowOverrideErrorMessage("Override Percentage is greater than 100");
            setShowOverrideErrorModal(true);
            setShowOverrideModal(false);
            //   dispatch(setReduxDriverFlatRate(0));
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <CustomButton
        className={`btn btn-secondary font-12 m-0 btn-sm w-70px`}
        type="button"
        loading={false}
        size="small"
        onClick={() => setShowFlatRateModal(true)}
        // disabled={loader || disabled}
        label={"Override"}
      />

      {showFlatRateModal && (
        <>
          {/*Invoice flatrate modal*/}
          <Modal
            show={showFlatRateModal}
            onHide={() => setShowFlatRateModal(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Warning !!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-14 h-100">
              <p>
                <p>
                  Invoice Amount : {invoiceAmount}, Driver Amount : {driverAmount}{" "}
                </p>
                <p>
                  Unit Percentage : {(unitPercentage * 100).toFixed(2)}%, Allowed Percentage :{" "}
                  {(allowedInvoicePercentage * 100).toFixed(2)}%
                </p>

                <p>{errors?.unit?.driverFlatRate?.message}</p>
                <p>Do you want to override the allowed percentage ? </p>
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowFlatRateModal(false);
                  setShowOverrideModal(true);
                }}
              >
                YES
              </Button>
              <Button variant="secondary" onClick={() => setShowFlatRateModal(false)}>
                NO
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}

      {showOverrideModal && (
        <>
          {/* Override flatrate modal*/}
          <Modal
            show={showOverrideModal}
            onHide={() => setShowOverrideModal(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Please enter the details for overriding the rate</Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-14 h-100">
              <p>
                {/* <div hidden="true">
                                  <Form.Group className="margin-box-5  align-items-center row  m-l-0 m-r-0" >
                                    <Col sm={3} xs={3}>
            
                                      <Form.Label
                                        className={` col-form-label `}
                                      >
                                        Name
                                      </Form.Label>
                                    </Col>
                                    <Col sm={6} xs={6} className="p-0 flex-shrink-0">
                                      <input
                                        className={`customFormControl  `}
                                        id="userName"
                                        name="userName"
                                        type="text"
                                        hidden="true"
                                        value={userName}
                                        maxLength={30}
                                        autoComplete="off"
                                        aria-autocomplete="list"
                                        onChange={(e) => setUserName("Mark")}
                                      />
       
                                    </Col>
                                  </Form.Group>
                                </div> */}
                <Form.Group className="margin-box-5  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3}>
                    <Form.Label
                      className={` col-form-label`}
                      style={{ "font-size": "12px", "text-transform": "capitalize" }}
                    >
                      {" "}
                      Code
                    </Form.Label>
                  </Col>
                  <Col sm={6} xs={6} className="p-0 flex-shrink-0">
                    <Input
                      className={`customFormControl`}
                      name={"userCode"}
                      type={"password"}
                      value={userCode}
                      maxLength={20}
                      onChange={(e) => setUserCode(e.target.value)}
                      autoComplete="new-password"
                      aria-autocomplete="list"
                      // control={control}
                    />
                  </Col>
                </Form.Group>
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" disabled={loading} onClick={handleOverrideOK}>
                OVERRIDE
              </Button>
              <Button variant="secondary" onClick={() => setShowOverrideModal(false)}>
                NO
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}

      {showOverrideErrorModal && (
        <>
          {/*Override Error modal*/}
          <Modal
            show={showOverrideErrorModal}
            onHide={() => setShowOverrideErrorModal(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Warning !!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-14 h-100">
              <p className="mb-0 text-danger">{showOverrideErrorMessage}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowOverrideErrorModal(false)}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default OverrideButton;
