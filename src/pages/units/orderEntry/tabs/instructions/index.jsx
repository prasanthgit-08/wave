import { Col, Form } from "react-bootstrap";
import TextArea from "../../../../../components/common/textArea";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

const Instructions = ({ styles }) => {
  const { control } = useFormContext();
  const selectedCustomer = useSelector((state) => state.unit.selectedCustomer);
  const selectedPlant = useSelector((state) => state.unit.selectedPlant);

  return (
    <div className={`px-4 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight} border-bottom `}>
      <Col xs={12}>
        <div>
          <Form.Group className="mt- form-group row ms-2">
            <Col xs={12} className="p-0 mt-3 ml-5" style={{ marginLeft: "300px" }}>
              <Form.Label className={` customColFormLabel`}>Customers Order Entry Instructions</Form.Label>
            </Col>

            <Col xs={13} className="p-0 mt-1" style={{ marginLeft: "300px" }}>
              <TextArea
                value={
                  selectedPlant?.customerPlantPK
                    ? selectedPlant?.orderInstructions || ""
                    : selectedCustomer?.orderEntryInstructions || ""
                }
                name=""
                rows={19}
                cols={120}
                control={control}
                type="text"
                className="form-control h-300px textarea-responsive"
                width="800px"
                disabled
                required={false}
              />
            </Col>
          </Form.Group>
        </div>{" "}
      </Col>
    </div>
  );
};

export default Instructions;
