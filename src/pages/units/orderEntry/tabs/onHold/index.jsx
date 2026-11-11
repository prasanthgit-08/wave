import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import TextArea from "../../../../../components/common/textArea";
import { useFormContext, useWatch } from "react-hook-form";
import { setOrderEntrySchemaConditions } from "../../../../../store/slices/unit.slice";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../../components/common/input";
import DateInput from "../../../../../components/common/dateInput";
import useDebouncer from "../../../../../hooks/useDebouncer";

const OnHold = ({ styles }) => {
  const unit = useWatch({ name: "unit" });
  const dispatch = useDispatch();
  const {
    watch,
    setValue,
    trigger,
    getValues,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useFormContext();
  const onHold = useWatch({ name: "onHold" });
  const customer = useWatch({ name: "customer" });
  const selectedCustomer = useSelector((state) => state.unit.selectedCustomer);

  const debounceUpdate = useDebouncer(() => {
    const onHold = getValues("onHold");

    dispatch(
      setOrderEntrySchemaConditions({
        onHold: { ...onHold },
      })
    );
  }, 100);

  // // Updating onhold fields dynamically
  const updateOnHoldValues = (fields) => {
    Object.entries(fields).forEach(([key, value]) => {
      setValue(`onHold.${key}`, value);
    });

    debounceUpdate();
  };

  /**
   * Used to clear fields when onhold=false
   */
  useEffect(() => {
    if (!unit.unitOnHold) {
      updateOnHoldValues({
        reasonForHold: "",
        authorizedBy: "",
        releaseDate: "",
        notes: "",
      });
    }
  }, [unit.unitOnHold]);

  return (
    <div className={`px-4 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight} border-bottom `}>
      <div className="col-5">
        <Row>
          <Col>
            <Form.Group className="mt-3 form-group  align-items-center row  ms-2">
              <Col xs={3} className="p-0">
                <Form.Label htmlFor="name" className="customColFormLabel">
                  Reason For Hold
                </Form.Label>
              </Col>

              <Col xs={6} className="p-0">
                <Input
                  required
                  className={`customFormControl`}
                  name={"onHold.reasonForHold"}
                  type="search"
                  control={control}
                  maxLength={30}
                  onChange={(e) => updateOnHoldValues({ reasonForHold: e.target.value })}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mt-3 form-group  align-items-center row  ms-2">
              <Col xs={3} className="p-0">
                <Form.Label htmlFor="name" className="customColFormLabel">
                  Authorized By
                </Form.Label>
              </Col>

              <Col xs={6} className="p-0">
                <Input
                  required
                  className={`customFormControl`}
                  name={"onHold.authorizedBy"}
                  type="search"
                  control={control}
                  maxLength={30}
                  onChange={(e) => updateOnHoldValues({ authorizedBy: e.target.value })}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mt-3 form-group  align-items-center row  ms-2">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="name" className="customColFormLabel">
                  Release Date
                </Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "95px" }}>
                <DateInput
                  date={onHold.releaseDate}
                  setDate={(date) => updateOnHoldValues({ releaseDate: date })}
                  setIsDateValid={(valid) => updateOnHoldValues({ releaseDateValid: valid })}
                  name={"onHold.releaseDate"}
                  className={errors?.onHold?.releaseDateValid ? "borderRed" : ""}
                  min={new Date()}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mt-3 form-group  row  ms-2">
              <Col xs={12} className="p-0">
                <Form.Label htmlFor="name" className="customColFormLabel">
                  Notes
                </Form.Label>
              </Col>

              <Col xs={12} className="p-0 mt-1">
                <TextArea
                  rows={10}
                  cols={50}
                  name="onHold.notes"
                  control={control}
                  type="text"
                  className="form-control h-300px"
                  required
                  onChange={(e) => updateOnHoldValues({ notes: e.target.value })}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OnHold;
