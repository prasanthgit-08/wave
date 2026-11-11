import React from "react";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import ContactFooter from "./ContactFooter";
import PlantContactContent from "./PlantContactContent";
import PlantContactHeader from "./PlantContactHeader";
const PlantContactTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <PlantContactHeader />
        <PlantContactContent />
        <ContactFooter />
      </div>
    </div>
  );
};

export default PlantContactTemplate;
