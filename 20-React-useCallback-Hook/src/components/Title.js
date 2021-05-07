import React from "react";

const Title = () => {
  console.log(`Rendering Title Component`);
  return <div>Use Callback Hook</div>;
};

export default React.memo(Title);
