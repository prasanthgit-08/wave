import React from "react";
import CityYardContent from "./CityYardContent";
import CityYardFooter from "./CityYardFooter";
import CityYardHeader from "./CityYardHeader";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";

function CityYardTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <CityYardHeader />
        <CityYardContent styles={styles} />
        <CityYardFooter />
      </div>
    </div>
  );
}

export default CityYardTemplate;
