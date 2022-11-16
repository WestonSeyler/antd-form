import React from "react";
import FieldContext from "./FiledContext";

export default function Form({ children,form,onFinishFailed,onFinish  },ref) {
  form.setCallbacks({
    onFinish,
    onFinishFailed,
  });
  return ( 
    <form action="" onSubmit={(e)=>{
      e.preventDefault()
      form.submit()
      }}>
      <FieldContext.Provider value={form}>{children}</FieldContext.Provider>
    </form>
  ); 
}
