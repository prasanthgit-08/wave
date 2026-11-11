/**
 * Tooltip Component
 * ************************************
 * This component provides a customizable tooltip that can be triggered by various actions.
 * The tooltip can also be edited by the user, if given permission.
 *
 * @component
 *
 * @prop {string} [programName] - Name of the program where the tooltip is being used.
 *                               This is required if customFetchFunction is not provided.
 *
 * @prop {string} [tabName] - Name of the tab where the tooltip is being used.
 *                            This is required if customFetchFunction is not provided.
 *
 * @prop {string} [fieldName] - Name of the field to which the tooltip is attached.
 *                             This is required if customFetchFunction is not provided.
 *
 * @prop {string} [placement='right'] - Tooltip position relative to the target.
 *                                     Possible values: 'right', 'left', 'top', 'bottom'.
 *
 * @prop {string} [trigger='click'] - Event which triggers the tooltip.
 *                                   Possible values: 'click', 'mouseenter', etc.
 *
 * @prop {string} [customContent] - Custom content to display in the tooltip.
 *
 * @prop {Function} [setCustomContent] - Function to set custom content.
 *
 * @prop {Function} [reduxSetCustomContent] - Redux action to set custom content.
 *
 * @prop {Function} [customFetchFunction] - Custom function to fetch content for the tooltip.
 *                                         If this is provided, programName, tabName, and fieldName are optional.
 *
 * @prop {Function} [customHandleSave] - Custom handler function called when the save action is triggered in edit mode.
 *
 * @prop {Function} [customHandleCancel] - Custom handler function called when the cancel action is triggered in edit mode.
 *
 * @prop {Function} [onChange] - Handler function called when the content changes in edit mode.
 *
 * @prop {boolean} [targetKeyPressed] - Indicates if a specific key, such as 'F2', is pressed.
 *
 * @prop {boolean} [overwriteTargetKey] - Flag to overwrite the default target key.
 *
 * @example
 * <Tooltip
 *   programName="OrderEntry"
 *   tabName="Unit"
 *   fieldName="unitType"
 *   ...
 * />
 */

import Tippy from "@tippyjs/react"; /**   for implementing tooltip */
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import useTargetKeyToggle from "../../hooks/useTargetKeyToggle";
import TooltipService from "../../services/TooltipService";

const Tooltip = ({
  programName,
  tabName,
  fieldName,
  placement,
  trigger,
  customContent,
  setCustomContent,
  reduxSetCustomContent,
  customFetchFunction,
  customHandleSave,
  customHandleCancel,
  onChange,
  targetKeyPressed,
  overwriteTargetKey,
}) => {
  const editPermission = true;
  const defaultTargetKey = useTargetKeyToggle("F2");
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");
  const [initialContent, setInitialContent] = useState({});

  const dispatch = useDispatch();

  const fetchTooltipMessage = () => {
    TooltipService.getTooltipMessage(programName, tabName, fieldName)
      .then((response) => {
        const { data } = response;
        if (setContent) setContent(data.description);
        setInitialContent(data);
      })
      .catch((err) => {
        console.error("Error fetching tooltip description", err);
      });
  };

  const updateTooltipDescription = () => {
    TooltipService.updateTooltipDescription(initialContent.id, content)
      .then((response) => {
        toast.success("Tooltip Description Updated");
      })
      .catch((error) => {
        toast.error("Error while Updating Description");
      });
  };

  // Ensure necessary props are provided
  if (!customFetchFunction && (!programName || !tabName || !fieldName)) {
    console.warn(
      "Tooltip component: Please provide customFetchFunction or the combination of programName, tabName, and fieldName."
    );
    return null; // Component will not render anything
  }

  if (overwriteTargetKey) {
    if (!targetKeyPressed) {
      return null; // Component will not render anything
    }
  } else if (!defaultTargetKey) {
    return null; // Component will not render anything
  }

  const renderContent = () => {
    return (
      <div>
        {!isEditing && (
          <div className="d-flex justify-content-between" style={{ minWidth: "150px" }}>
            <div style={{ minHeight: "1rem", maxHeight: "10rem", overflow: "auto" }}>
              {customContent || content}
            </div>
            {editPermission && (
              <div className="ms-2 d-flex flex-column justify-content-end">
                <i
                  className="fa-solid fa-pen-to-square customTooltipEditIcon"
                  onClick={() => setIsEditing(true)}
                />
              </div>
            )}
          </div>
        )}
        {isEditing && (
          <div>
            <textarea
              name="editTooltipInfo"
              id="editTooltipInfo"
              cols="40"
              rows="5"
              value={customContent || content}
              onChange={(e) => {
                if (setCustomContent) setCustomContent(e.target.value);
                else if (reduxSetCustomContent) dispatch(reduxSetCustomContent(e.target.value));
                else if (setContent) setContent(e.target.value);
                if (onChange) onChange(e);
              }}
            />
            <div className="d-flex justify-content-end">
              {/* Cancel Button */}
              <i
                className="fa-solid fa-xmark px-1 customTooltipCancelIcon"
                style={{ color: "red" }}
                onClick={() => {
                  setIsEditing(false);
                  if (customHandleCancel) customHandleCancel();
                  else setContent(initialContent.description);
                }}
              />
              {/* Save Button */}
              <i
                className="fa-solid fa-check px-1 customTooltipSaveIcon"
                style={{ color: "green" }}
                onClick={() => {
                  setIsEditing(false);
                  if (customHandleSave) customHandleSave();
                  else updateTooltipDescription();
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: "inline-block" }} className="customTooltip">
      {(targetKeyPressed || defaultTargetKey) && (
        <Tippy
          content={renderContent()}
          placement={placement || "right"}
          trigger={targetKeyPressed || defaultTargetKey ? `${trigger || "click"}` : ""}
          theme="white"
          interactive={true}
        >
          <i
            className="fa-solid fa-circle-info ps-2 customTooltipIcon"
            style={{ position: "relative", bottom: "0" }}
            onClick={() => {
              setIsEditing(false);
              if (customFetchFunction) {
                customFetchFunction();
              } else {
                fetchTooltipMessage(programName, tabName, fieldName);
              }
            }}
          />
        </Tippy>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  programName: PropTypes.string,
  tabName: PropTypes.string,
  fieldName: PropTypes.string,
  placement: PropTypes.oneOf(["right", "left", "top", "bottom"]),
  trigger: PropTypes.string,
  customContent: PropTypes.string,
  setCustomContent: PropTypes.func,
  reduxSetCustomContent: PropTypes.func,
  customFetchFunction: PropTypes.func,
  customHandleSave: PropTypes.func,
  customHandleCancel: PropTypes.func,
  onChange: PropTypes.func,
  targetKeyPressed: PropTypes.bool,
  overwriteTargetKey: PropTypes.bool,
};

Tooltip.defaultProps = {
  placement: "right",
  trigger: "click",
};

export default Tooltip;
