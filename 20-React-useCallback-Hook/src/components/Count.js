import React from "react";

const Count = ({ text, count }) => {
  console.log(`Rendering ${text} component`);
  return (
    <div>
      {text}- {count}
    </div>
  );
};

export default React.memo(Count);
