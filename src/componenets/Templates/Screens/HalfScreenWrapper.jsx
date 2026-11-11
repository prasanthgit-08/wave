import React from "react";
import { HALF_SCREEN_HEIGHT, HALF_SCREEN_WIDTH } from "../../../constants/screenSizes";

function HalfScreenWrapper({ children }) {
  return (
    <div className="customContainer">
      <div
        className="border border-dark border-2 "
        style={{
          margin: "1px",
          width: HALF_SCREEN_WIDTH,
          // height: HALF_SCREEN_HEIGHT,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default HalfScreenWrapper;
