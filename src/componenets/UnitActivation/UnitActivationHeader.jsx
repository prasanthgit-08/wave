import React from "react";

function UnitActivationHeader({
  closeButton,
  closeHandler,
  noDelayButton,
  delayHandler,
  noHoldButton,
  holdHandler,
}) {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        {closeButton && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={closeHandler}
          >
            Close
          </button>
        )}
        {noDelayButton && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={delayHandler}
          >
            No Delay
          </button>
        )}
        {noHoldButton && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={holdHandler}
          >
            No Hold
          </button>
        )}
      </div>
    </div>
  );
}

export default UnitActivationHeader;
