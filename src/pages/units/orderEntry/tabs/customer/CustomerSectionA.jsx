import { Col } from "react-bootstrap";
import { useFormContext, useWatch } from "react-hook-form";
import CustomPagination from "../../../../../components/common/customPagination";
import CommonTable from "../../../../../components/common/commonTable";
import { memo } from "react";

const CustomerSectionA = ({
  customerList,
  loading,
  pageNumber,
  setPageNumber,
  totalPages,
  totalElements,
  handleCustomerDataSelection,
}) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const customerDataId = useWatch({ name: "customer.customerDataId" });

  return (
    <>
      <Col xs={5} className={"h-100 ps-0"}>
        {/* Customer Table */}
        <div className="d-flex h-100">
          <div className="w-100">
            <div className="border border-secondary h-100">
              <CommonTable
                id={"customerPK"}
                selecedId={customerDataId}
                disabledHead={true}
                loading={loading}
                listingData={customerList}
                columns={[
                  { label: "Customer", key: "name", className: "col-7" },
                  { label: "City", key: "city", className: "col-4" },
                  { label: "State", key: "stateCode", className: "col-1" },
                ]}
                handleSelect={(row) => {
                  handleCustomerDataSelection(row);
                }}
              />
            </div>
          </div>
          <CustomPagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalPages={totalPages}
            totalElements={totalElements}
            loading={loading}
            firstPage
            lastPage
            tripleArrowUp
            tripleArrowDown
            doubleArrowUp
            doubleArrowDown
            singleArrowUp
            singleArrowDown
            recordsPerPage={30}
          />
        </div>
      </Col>
    </>
  );
};

export default memo(CustomerSectionA);
