import React, { useState } from "react";
import { truncateString } from "../../utils/truncateString";
/**
 * TruncatedStringWithTooltip Component
 *
 * This component displays a truncated version of a string with a tooltip
 * that shows the full text on hover. The tooltip also applies a special
 * class if the text length exceeds a specified limit.
 *
 * @param {Object} props - The component props
 * @param {string} props.text - The text to be truncated and shown in the tooltip
 * @param {number} props.charLimit - The character limit for truncating the string
 * @param {number} [props.prperty=13] - The text length threshold for applying an extra class to the tooltip
 *
 * @returns {JSX.Element} The rendered TruncatedStringWithTooltip component
 */
const TruncatedStringWithTooltip = ({ text, charLimit, prperty = 13 }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const safeText = text && text.length > 500 ? text.slice(0, 500) + "..." : text;

  return (
    <div className="truncated-string" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {truncateString(text, charLimit)}
      {isHovered && (
        <div className={`tooltip-text ${text && text.length > prperty ? "extrLargeText" : ""}`}>
          {safeText}
        </div>
      )}
    </div>
  );
};

export default TruncatedStringWithTooltip;
