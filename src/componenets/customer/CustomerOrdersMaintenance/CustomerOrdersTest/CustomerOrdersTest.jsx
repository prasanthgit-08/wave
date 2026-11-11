import TestFooter from "./TestFooter";
import TestHeader from "./TestHeader";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import TestFileSelectionContent from "./TestFileSelectionContent";
const CustomerOrdersTest = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <TestHeader />
        <TestFileSelectionContent styles={styles} />
        <TestFooter />
      </div>
    </div>
  );
};

export default CustomerOrdersTest;
