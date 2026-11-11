import React from "react";
import { useParams } from "react-router-dom";
import UserMaintenanceFormContent from "./UserMaintenanceFormContent";
import UserMaintenanceFormFooter from "./UserMaintenanceFormFooter";
import UserMaintenanceFormHeader from "./UserMaintenanceFormHeader";

function UserMaintenanceFormTemplate() {
  const params = useParams();

  const id = params.id;

  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <UserMaintenanceFormHeader />
        <UserMaintenanceFormContent id={id} />
        <UserMaintenanceFormFooter />
      </div>
    </div>
  );
}

export default UserMaintenanceFormTemplate;
