import React from "react";

export default function TableHeaderButton({children}:{children:React.ReactElement}) {
  return (
    <>
      <div className="inline-flex gap-x-2">
        {children}
      </div>
    </>
  );
}
