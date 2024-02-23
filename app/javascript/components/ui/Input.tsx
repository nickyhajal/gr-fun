import React from "react";

export default (props) => {
  return (
    <input
      {...props}
      className={`border border-black rounded-md p-2 ${props.className}`}
    />
  );
};
