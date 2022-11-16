import React, { Component } from "react";
import { useRef } from "react";

class FormStore {
  constructor() {
    this.store = {}; //状态值 name===>value
    this.filedEntities = [];
  }
  registerFiledEntities=(entity)=> {
    this.filedEntities.push(entity);
  }
  getFieldsValue = () => {
    return {
      ...this.store,
    };
  };
  getFieldValue = (name) => {
    return this.store[name];
  };
  setFieldsValue = (newStore) => {
    //update store
    this.store = {
      ...this.store,
      ...newStore,
    };
    //update comp
    console.log(this.store, "store");
    this.filedEntities.forEach((item)=>{
      Object.keys(newStore).forEach(i=>{
        if(i===item.props.name){
          item.onStoreChange()
        }
      })
    })
  };
  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
      registerFiledEntities:this.registerFiledEntities
    };
  };
}

function useForm() {
  //卸载之前都是指向的同一个值
  const formRef = useRef();
  if (!formRef.current) {
    const formStore = new FormStore();
    formRef.current = formStore.getForm();
  }
  return [formRef.current];
}
export default useForm;
