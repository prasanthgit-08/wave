import React from "react";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import FormHeader from "./FormHeader";
import { useParams } from "react-router-dom";

function PlantToPlantTransferFormTemplate() {
  const params = useParams();

  const id = params.id;
  const customerId = params.customerId;

  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <FormHeader />
        <FormContent id={id} customerId={customerId} />
        <FormFooter id={id} />
      </div>
    </div>
  );
}

export default PlantToPlantTransferFormTemplate;
