import { useSelector } from "react-redux";
import CustomerMaintananceFormContent from "./CustomerMaintananceFormContent";
import CustomerMaintananceFormFooter from "./CustomerMaintananceFormFooter";
import CustomerMaintananceFormHeader from "./CustomerMaintananceFormHeader";

function CustomerMaintananceFormTemplate() {
  const isCustomerLoading = useSelector((state) => state.customerMaintenanceReducer.isCustomerLoading);

  return (
    <div className="customContainer">
      <div
        className="add-form-component threeFourthScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <CustomerMaintananceFormHeader />
        <CustomerMaintananceFormContent />
        <CustomerMaintananceFormFooter />
      </div>
    </div>
  );
}

export default CustomerMaintananceFormTemplate;
