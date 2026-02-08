import React from "react";

const MockEditDeleteAction = ({ type }: { type: string; idemId: string }) => {
  return (
    <div>
      <button>Edit {type}</button>
      <button>Delete {type}</button>
    </div>
  );
};

export { MockEditDeleteAction };
