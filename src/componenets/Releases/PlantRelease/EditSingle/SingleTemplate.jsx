import React from "react";
import PlantReleaseFooter from "../PlantReleaseFooter";
import PlantReleaseHeader from "../PlantReleaseHeader";
import SingleContent from "./SingleContent";
const SingleTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <PlantReleaseHeader />
        <SingleContent />
        <PlantReleaseFooter />
      </div>
    </div>
  );
};

export default SingleTemplate;
