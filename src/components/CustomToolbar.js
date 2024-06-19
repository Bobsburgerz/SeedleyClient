import React from "react";
import formats from './ToolbarOptions.js';

const renderSingle = (formatData, index) => {
  const { className, value } = formatData;
  return (
    <button key={index} className={className} value={value}></button>
  );
};

const CustomToolbar = () => (
  <div id="toolbar">
    {formats.map((classes, index) => (
      <span key={index} className="ql-formats">
        {classes.map((formatData, innerIndex) => (
          <React.Fragment key={innerIndex}>
            {formatData.options
              ? null // Skip rendering options
              : renderSingle(formatData, innerIndex)}
          </React.Fragment>
        ))}
      </span>
    ))}
  </div>
);

export default CustomToolbar;
