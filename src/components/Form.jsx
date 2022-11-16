import React from "react";
import FieldContext from "./FiledContext";

export default function Form({ children,form  }) {
  return (
    <form action="">
      <FieldContext.Provider value={form}>{children}</FieldContext.Provider>
    </form>
  ); 
}
