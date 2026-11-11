import React from "react";
import { QUARTER_SCREEN_HEIGHT, QUARTER_SCREEN_WIDTH } from "../../../constants/screenSizes";

function QuarterScreenWrapper({ children }) {
  return (
    <div className="add-form-component p-0 customContainer">
      <div
        className="border border-dark border-2 quarterScreenWidth"
        style={{
          width: QUARTER_SCREEN_WIDTH,
          // height: QUARTER_SCREEN_HEIGHT,
          minWidth: QUARTER_SCREEN_WIDTH,
          margin: "1px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default QuarterScreenWrapper;
