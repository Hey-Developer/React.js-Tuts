import React from "react";

const Button = ({ handleClick, children }) => {
  console.log(`Rendering ${children} Button component`);

  return <button onClick={handleClick}>{children}</button>;
};

export default React.memo(Button);
