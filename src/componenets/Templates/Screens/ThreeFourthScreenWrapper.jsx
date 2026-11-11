import React from "react";
import { THREE_FOURTH_SCREEN_HEIGHT, THREE_FOURTH_SCREEN_WIDTH } from "../../../constants/screenSizes";

function ThreeFourthScreenWrapper({ children }) {
  return (
    <div className=" table-bordered customContainer">
      <div
        className="border border-dark border-2 quarterScreenWidth"
        style={{
          width: THREE_FOURTH_SCREEN_WIDTH,
          minWidth: THREE_FOURTH_SCREEN_WIDTH,
          margin: "1px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default ThreeFourthScreenWrapper;
