// SpecialCodeSelector.jsx

import { Col, Form } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";

const SpecialCodeSelector = ({
  label,
  list,
  input,
  selectedId,
  fieldName,
  inputName,
  setFieldValue,
  setList,
  setId,
  fetchData,
  handleSelection,
  onLookupClick,
  showLabel = true,
  className,
  loader,
  maxHeight,
}) => (
  <Form.Group className="mt-0 m-b-10 align-items-center row m-l-0 m-r-0">
    {showLabel && (
      <Col sm={3} md={3} xs={3} className="p-0 w-135px">
        <Form.Label className="col-form-label">{label}</Form.Label>
      </Col>
    )}
    <Col xs={8} md={8} sm={8} className="d-flex">
      <AutoCompleteDropdown
        className={className}
        arrayList={list}
        searchString={input}
        handleSearchString={(string) => {
          setFieldValue(string);
        }}
        renderItemId={(item) => item.specialCodePK}
        renderItemField={(item) => item.code}
        fetchDataBySearchString={(value) => fetchData(value?.toUpperCase(), setList)}
        onSelect={(e) => handleSelection(e, fieldName, inputName)}
        selectedId={selectedId}
        clearInputCallback={() => setId(null)}
        loading={loader}
        maxHeight={maxHeight}
      />
      <LookupButton onClick={onLookupClick} />
    </Col>
  </Form.Group>
);

export default SpecialCodeSelector;
