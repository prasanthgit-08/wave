import styles from "../../../../styles/QuarterScreen.module.css";
import EquipmentReturnHeader from "./EquipmentReturnHeader";
import EquipmentReturnContent from "./EquipmentReturnContent";
import Footer from "../Footer";

function EquipmentReturnTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <EquipmentReturnHeader styles={styles} />
        <EquipmentReturnContent styles={styles} />
        <Footer equipmentReturn />
      </div>
    </div>
  );
}
export default EquipmentReturnTemplate;
